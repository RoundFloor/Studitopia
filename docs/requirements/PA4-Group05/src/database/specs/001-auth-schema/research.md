# Research & Technical Decisions: Authentication Schema

**Feature Branch**: `001-auth-schema`
**Feature Spec**: `specs/001-auth-schema/spec.md`
**Date**: 2026-11-14

## Overview

This document captures the architectural decisions, security trade-offs, and best practices evaluated for the Studitopia database authentication schema. All choices conform to the Studitopia Database Constitution (v1.2.0), particularly the Schema-First & Dependency-Ordered convention, Domain-as-Folder organization, and strict test-driven development.

---

## Technical Decision 1: Password Hashing & Credential Storage

### Decision
Use PostgreSQL's native `pgcrypto` extension using Blowfish crypt hashing (`bf` algorithm with cost factor 10):
```sql
STUDITOPIA.CRYPT(PPASSWORD, STUDITOPIA.GEN_SALT('bf', 10))
```
Store password hashes in `STUDITOPIA.ACCOUNT.PASSWORD` as `VARCHAR(60)`. Verification is evaluated via:
```sql
C.PASSWORD = STUDITOPIA.CRYPT(PPASSWORD, C.PASSWORD)
```

### Rationale
- **In-Database Verification**: Keeps authentication logic encapsulated within database functions, preventing plaintext password leakage over network boundaries when invoking SQL routines.
- **Salting & Timing-Attack Resistance**: `pgcrypto.crypt` generates unique 128-bit random salts per user, producing distinct hashes even for identical passwords, and uses constant-time comparison internally.
- **Cost Factor 10**: Balances cryptographic resistance against offline brute-force attacks with database CPU overhead (~50-80ms per hash computation), easily satisfying the sub-second login requirement (SC-004).

### Alternatives Considered
- **Application-Layer Hashing Only (Argon2id in Backend)**: While Argon2id is modern and memory-hard, delegating password verification entirely to an external service would require database functions to receive pre-computed hashes or delegate identity checks. Because database contracts enforce direct SQL verification and testability via `full-flow.spec.ts`, native `pgcrypto` provides complete self-contained transactional verification.
- **SHA-256 / SHA-512 with Manual Salt**: Cryptographically inadequate for passwords due to lack of adaptive work factor and vulnerability to GPU cracking.

---

## Technical Decision 2: Case-Insensitive Email and Username Handling

### Decision
Use PostgreSQL's `citext` extension scoped to the `STUDITOPIA` schema (`STUDITOPIA.CITEXT`), encapsulated in specialized PostgreSQL domains:
- `STUDITOPIA.TYPE_EMAIL`: `STUDITOPIA.CITEXT` with check constraints for standard RFC 5322 regex and length (8 to 254 characters).
- `STUDITOPIA.TYPE_USERNAME`: `STUDITOPIA.CITEXT` with check constraints for lowercase alphanumeric and dot characters, length 8 to 32 characters.

### Rationale
- **Duplicate Prevention**: Institutional emails (`Student@HCMUS.EDU.VN` vs `student.hcmus.edu.vn`) and usernames (`John.Doe` vs `john.doe`) must be uniquely resolved without relying on fragile application-layer `.toLowerCase()` normalization.
- **Transparent Indexing**: Standard unique B-tree indexes (`IDX_UNIQUE_EMAIL`, `IDX_UNIQUE_USERNAME`) automatically enforce case-insensitive uniqueness when backed by `CITEXT`.
- **Domain Constraint Enforcement**: PostgreSQL `DOMAIN` types enforce validation rules at the type level before data enters tables.

### Alternatives Considered
- **`LOWER()` Functional Indexes**: Standard `VARCHAR` with `CREATE UNIQUE INDEX ... ON ACCOUNT(LOWER(EMAIL))`. While functional, every lookup query must explicitly invoke `LOWER(PEMAIL)`. `CITEXT` eliminates this requirement and enforces consistent casing semantics across all functions and joins.
- **Application-Side String Normalization**: Fails if administrative or direct data migrations insert non-normalized strings.

---

## Technical Decision 3: University Domain Whitelisting Strategy

### Decision
Store authorized academic institution domains in a dedicated relational table:
`STUDITOPIA.DOMAIN` (`ID`, `DOMAIN` `STUDITOPIA.CITEXT`, `CREATE_TIME`) with unique index `IDX_DOMAIN`.

Validation occurs via:
```sql
IF (NOT EXISTS (SELECT 1 FROM STUDITOPIA.DOMAIN WHERE DOMAIN = SPLIT_PART(PEMAIL, '@', 2)::STUDITOPIA.CITEXT)) THEN
    RAISE EXCEPTION 'Domain of this email wasnt registered!' USING ERRCODE='46001';
END IF;
```

### Rationale
- **Dynamic Configuration**: Partner universities (e.g., HCMUS, HCMUT, UIT, UEL) can be added, updated, or decommissioned via simple data inserts without rebuilding or modifying database code.
- **Exact Domain Match**: Uses `SPLIT_PART(PEMAIL, '@', 2)` to match the exact host string against the domain catalog, preventing spoofing attempts (e.g. `user@fake-hcmus.edu.vn` or `user@hcmus.edu.vn.attacker.com`).

### Alternatives Considered
- **Hardcoded Regex in SQL Domain**: Hardcoding allowed domains directly in `TYPE_EMAIL` regex (e.g., `@(student\.hcmus\.edu\.vn|hcmut\.edu\.vn)$`). Rejected because adding a new partner university would require altering PostgreSQL types and risking downtime.

---

## Technical Decision 4: Session Lifecycle & Multi-Device Access Model

### Decision
Implement server-side persistent sessions in `STUDITOPIA.SESSION`:
- Primary key: `ID INT GENERATED ALWAYS AS IDENTITY`
- Owner foreign key: `OWNER_ID INT REFERENCES STUDITOPIA.ACCOUNT(ID)`
- Lifetime: `EXPIRED_TIME TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30d'`
- Status: `TEXT DEFAULT 'ACTIVE' CHECK (STATUS IN ('ACTIVE', 'INACTIVE'))`
- Partial unique index: `IDX_SESSION_OWNER ON SESSION(ID, OWNER_ID) WHERE STATUS = 'ACTIVE'`

Session validation is encapsulated in `STUDITOPIA.SESSION_CHECK(SESSION_ID, USER_ID)`:
```sql
PERFORM * FROM STUDITOPIA.SESSION
WHERE ID = SESSION_ID AND OWNER_ID = USER_ID AND STATUS = 'ACTIVE' AND EXPIRED_TIME > NOW();
```

### Rationale
- **Multi-Device Support**: Each login creates an independent session record, enabling concurrent usage on multiple devices (phone, laptop, library workstation) without session clashes.
- **Instant Revocation (Logout)**: `LOGOUT(SESSION_ID, USER_ID)` immediately marks the session `INACTIVE` and sets `EXPIRED_TIME = NOW()`, instantaneously blocking subsequent requests on that device without invalidating other devices.
- **Session-User Binding**: Requiring both `SESSION_ID` and `USER_ID` verifies that the caller owns the presented session token.

### Alternatives Considered
- **Stateless JWTs in Application Layer**: JWTs cannot be immediately invalidated upon logout without an external token revocation list or Redis blacklist. In-database sessions provide immediate, authoritative revocation and state synchronization.

---

## Technical Decision 5: Two-Step Verification & Activation via One-Time Passcode (OTP)

### Decision
Store the transient verification passcode directly on the `ACCOUNT` record as `OTP INT DEFAULT NULL`. Provide guarded session-authenticated accessors:
- `STUDITOPIA.SAVE_OTP(SESSION_ID, USER_ID, POTP)`: stores the OTP.
- `STUDITOPIA.GET_OTP(SESSION_ID, USER_ID)`: retrieves the OTP for the active session.
- `STUDITOPIA.REMOVE_OTP(SESSION_ID, USER_ID)`: deletes the OTP.
- `STUDITOPIA.ACTIVE_ACCOUNT(SESSION_ID, USER_ID)`: verifies session, updates status to `ACTIVE`, and sets `OTP = NULL`.

### Rationale
- **Simplicity & Atomic Clearance**: Only one active registration/verification flow can be pending per student account. Transitioning the account status to `ACTIVE` atomically sets `OTP = NULL` in a single transaction.
- **Guarded Access**: Direct reads/writes to OTP are shielded behind `SESSION_CHECK`, ensuring only an authorized onboarding session for the specific user can interact with their verification token.

### Alternatives Considered
- **Separate OTP Table with Expiration Timestamps**: While viable for complex multi-factor scenarios, the single-column pattern on `ACCOUNT` suffices for initial student onboarding and guarantees zero orphaned records upon activation.

---

## Technical Decision 6: Dual Authentication Entry Points

### Decision
Provide dedicated SQL functions for both login identifiers:
- `STUDITOPIA.LOGIN_BY_USERNAME(PUSERNAME TEXT, PPASSWORD TEXT)`
- `STUDITOPIA.LOGIN_BY_EMAIL(PEMAIL TEXT, PPASSWORD TEXT)`

Both return a unified schema: `TABLE (SESSION_ID INT, USER_ID INT, ROLE TEXT, STATUS TEXT)`.

### Rationale
- **Query Performance & Index Optimizations**: Separating the entry points allows PostgreSQL query planner to use the exact unique index (`IDX_UNIQUE_USERNAME` or `IDX_UNIQUE_EMAIL`) without conditional `OR` branching.
- **Explicit Consumer Contract**: Backend API controllers can route username vs email login directly to the optimized function.
- **Generic Error Codes**: Both routines raise error `45007` ('INVALID CREDENTIALS') when the record is not found or password doesn't match, preventing username/email enumeration.

---

## Summary of SQL Error Codes

| Error Code | Error Message / Condition | Triggered By |
|---|---|---|
| `45001` | `INVALID DISPLAY NAME` | Display name regex / length violation in `REGISTER` |
| `45002` | `INVALID EMAIL NAME` | Email regex / length violation in `EMAIL_VALIDATION` |
| `45003` | `INVALID USERNAME NAME` | Username regex / length violation in `USERNAME_VALIDATION` |
| `45005` | `INVALID SESSION` | Expired, inactive, or non-matching session in `SESSION_CHECK` |
| `45007` | `INVALID CREDENTIALS` | Identifier not found or password mismatch in `LOGIN_BY_*` |
| `46001` | `Domain of this email wasnt registered!` | Unapproved academic domain in `EMAIL_VALIDATION` |
| `47001` | `Conflict email address!` | Duplicate email in `EMAIL_VALIDATION` |
| `47002` | `DUPPLICATE USERNAME` | Duplicate username in `USERNAME_VALIDATION` |
