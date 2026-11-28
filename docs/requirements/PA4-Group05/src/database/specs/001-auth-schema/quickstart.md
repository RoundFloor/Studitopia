# Quickstart & Validation Guide: Authentication Schema

**Feature Branch**: `001-auth-schema`
**Feature Spec**: [spec.md](./spec.md)
**Data Model**: [data-model.md](./data-model.md)
**Contracts**: [contracts/authentication-functions.md](./contracts/authentication-functions.md)
**Date**: 2026-11-14

This guide documents the procedures for compiling the dependency graph, deploying the authentication schema to a test database, and validating all functional flows and security boundaries end-to-end.

---

## 1. Prerequisites

- **Node.js**: v20 or higher
- **PostgreSQL**: v15 or higher running locally or in a container
- **Database Configuration**: Configured via environment or interactive runner in `build/env.json` pointing to an isolated test database.

---

## 2. Compilation & Graph Verification

The Studitopia database uses filename-declared dependencies to compile an acyclic execution order. Before running SQL migrations or tests, verify that all dependency graph contracts are valid:

```bash
# Compile TypeScript runner scripts and generate dependency graph
npm run compile
```

**Expected Outcome**:
- `build/tree.md` is generated, showing the resolved execution order starting from `init` -> `citext`/`pgcrypto` -> `email.init`/`username.init` -> `domain.init`/`account.email_username` -> `session.account` -> authentication functions.
- `build/mermaid.md` contains an acyclic graph of nodes.
- Process exits with code `0`.

---

## 3. Schema Deployment & Migration Execution

Apply all schema definitions, tables, and functions to the test database:

```bash
# Execute pending database nodes in dependency order
npm run all
```

**Expected Outcome**:
- `STUDITOPIA` schema created with `citext` and `pgcrypto` extensions.
- Domains `TYPE_EMAIL` and `TYPE_USERNAME` defined.
- Tables `DOMAIN`, `ACCOUNT`, and `SESSION` created with indexes.
- Default university domains seeded into `STUDITOPIA.DOMAIN`.
- Authentication functions compiled and registered.

---

## 4. End-to-End Validation Scenarios

Run the Vitest authentication test suite to validate all scenarios defined in the feature specification:

```bash
# Run the full authentication lifecycle test suite
npx vitest run tests/functions/authentication/full-flow.spec.ts
```

### Scenario Breakdown Verified by Test Suite

| Test Step | Action Under Test | Expected Result | Contract / Error Code |
|---|---|---|---|
| **1. Registration** | Register with valid institutional email (`student.hcmus.edu.vn`) | Account created in `INACTIVE` status; session issued | `STUDITOPIA.REGISTER` |
| **2. Unauthorized Domain** | Register with unauthorized domain (`gmail.com`) | Rejected with domain error | Code `46001` |
| **3. Duplicate Identity** | Register again with identical email or username | Rejected with conflict error | Code `47001` / `47002` |
| **4. Multi-Identifier Login** | Authenticate via username and password | New distinct session issued; status `INACTIVE` | `STUDITOPIA.LOGIN_BY_USERNAME` |
| **5. OTP Lifecycle** | Save OTP, retrieve OTP, activate account | Status transitions to `ACTIVE`; OTP purged | `SAVE_OTP`, `ACTIVE_ACCOUNT` |
| **6. Active Login by Email** | Authenticate via email and password | New session issued; status `ACTIVE` | `STUDITOPIA.LOGIN_BY_EMAIL` |
| **7. Multi-Device Concurrency** | Verify multiple sessions active concurrently | Both sessions valid | `STUDITOPIA.SESSION_CHECK` |
| **8. Session Invalidation (Logout)** | Call logout on first session | Session invalidated; subsequent calls fail | `STUDITOPIA.LOGOUT` -> Code `45005` |
| **9. Concurrent Isolation** | Access protected function with second session | Second session remains valid | Contract returns email successfully |

---

## 5. Clean Teardown & Reset

To reset the database to an empty state and confirm clean reverse migrations:

```bash
# Restore schema to empty state
npm run restore init

# Re-run all migrations to confirm idempotent rebuild
npm run all
```
