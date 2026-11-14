# Implementation Plan: Authentication Schema

**Branch**: `001-auth-schema` | **Date**: 2026-11-14 | **Spec**: [specs/001-auth-schema/spec.md](./spec.md)

**Input**: Feature specification from `specs/001-auth-schema/spec.md`

## Summary

The authentication schema establishes the primary security, identity, and session management foundation for Studitopia. It provides PostgreSQL domain types for strict format verification, academic email domain whitelisting, cryptographic password hashing via `pgcrypto.crypt` (Blowfish cost factor 10), multi-device server-side session management (30-day lifetime), one-time passcode verification for email activation, and immediate session revocation upon logout.

The technical design follows the Studitopia Database Constitution (v1.2.0): schema-first dependency-ordered SQL nodes under `src/`, domain-as-folder organization, centralized configuration, and strict TDD validated by Vitest against an isolated live PostgreSQL instance.

---

## Technical Context

**Language/Version**: PostgreSQL 15+ / 16+, TypeScript 5+ (for runner/compiler/tests), Node.js v20+

**Primary Dependencies**: PostgreSQL extensions (`citext`, `pgcrypto`), Vitest, `pg` (node-postgres), `tsx`

**Storage**: PostgreSQL (dedicated `STUDITOPIA` schema)

**Testing**: Vitest (`npm test`), custom database runner (`scripts/sql.ts`), data-driven test cases (`tests/functions/authentication/pg.*.testcases.ts`)

**Target Platform**: Linux server / Dockerized PostgreSQL 15+ container

**Project Type**: Database schema & SQL domain package (PostgreSQL functions, tables, domains, custom scripts)

**Performance Goals**:
- Session validity checks (`SESSION_CHECK`): < 10ms
- Login credential verification and session issuance (`LOGIN_BY_*`): < 100ms
- Registration flow (`REGISTER`): < 150ms
- System throughput: Support 1000+ concurrent active sessions without connection or lock degradation

**Constraints**:
- Strict dependency-declared SQL file naming (`<name>.<dep1>_<dep2>.sql`)
- Zero plaintext password persistence; Blowfish salted crypt (`VARCHAR(60)`)
- Case-insensitive identity matching backed by `STUDITOPIA.CITEXT`
- Explicit session-user binding preventing cross-account session hijacking
- Whitelisted academic domain constraint enforced in database tier

**Scale/Scope**:
- Canonical database layer serving backend API services
- Initial support for 11 verified Vietnamese university domains, extensible via `STUDITOPIA.DOMAIN` table
- Up to 10+ concurrent devices/sessions per account

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Constitution Principle | Requirement | Compliance Status | Justification / Notes |
|---|---|---|---|
| **I. Schema-First & Dependency-Ordered Changes** | All changes as SQL files under `src/` declaring dependencies in file names; reverse scripts `_<name>.sql`. | **PASS** | File names declare explicit dependencies (e.g. `register.ev_uv_session.sql`, `account.email_username.sql`). |
| **II. Domain-as-Folder Architecture** | One folder per artifact type and domain (`src/definitions/`, `src/tables/`, `src/functions/authentication/`, etc.). | **PASS** | Authentication artifacts strictly follow folder layout: domains in `src/definitions/`, tables in `src/tables/`, functions in `src/functions/authentication/`. |
| **III. Centralized Configuration** | Config in `config/database.config.ts`, runtime credentials in `build/env.json`. | **PASS** | Connection and runner access centralized via `config/database.config.ts` and `build/env.json`. |
| **IV. Standardized Naming & Conventions** | `UPPER_SNAKE_CASE` in `STUDITOPIA` schema; singular table nouns; `TYPE_<NAME>` domains; `CK_*` constraints; `IDX_*` indexes. | **PASS** | Objects use `ACCOUNT`, `SESSION`, `DOMAIN`, `TYPE_EMAIL`, `TYPE_USERNAME`, `CK_ACCOUNT_STATUS`, `IDX_UNIQUE_EMAIL`. |
| **V. PostgreSQL Boundary** | Backend is sole consumer of PostgreSQL contracts; frontend never accesses DB directly. | **PASS** | Contracts defined in `contracts/authentication-functions.md` target backend services. |
| **VI. Strict Test-Driven Development (TDD)** | Specs written before SQL implementation; live DB behavioral testing. | **PASS** | Full suite of unit and end-to-end integration tests authored in `tests/functions/authentication/`. |

---

## Project Structure

### Documentation (this feature)

```text
specs/001-auth-schema/
├── plan.md                                    # This file (/speckit.plan output)
├── research.md                                # Phase 0 research & technical decisions
├── data-model.md                              # Phase 1 data entities & state transitions
├── quickstart.md                              # Phase 1 validation & test execution guide
├── contracts/                                 # Phase 1 interface definitions
│   └── authentication-functions.md            # Stored function contracts
└── checklists/
    └── requirements.md                        # Quality validation checklist
```

### Source Code (repository root layout)

```text
studitopia-database/
├── src/
│   ├── definitions/                           # PostgreSQL domains and custom types
│   │   ├── email.init.sql                     # TYPE_EMAIL definition
│   │   └── username.init.sql                  # TYPE_USERNAME definition
│   ├── schemas/                               # Schema creation and extensions
│   │   ├── init.sql                           # STUDITOPIA schema, citext, pgcrypto
│   │   └── _init.sql                          # Reverse teardown script
│   ├── tables/                                # Canonical table definitions
│   │   ├── account.email_username.sql         # ACCOUNT table
│   │   ├── domain.init.sql                    # DOMAIN table with initial seed
│   │   └── session.account.sql                # SESSION table & REGISTER_SESSION helper
│   └── functions/authentication/              # Authentication SQL routines
│       ├── activate-account.session-check.sql # ACTIVE_ACCOUNT function
│       ├── email-validation.ev.account_domain.sql # EMAIL_VALIDATION function
│       ├── get-email.account.sql              # GET_EMAIL function
│       ├── get-otp.session.sql                # GET_OTP function
│       ├── login.session.sql                  # LOGIN_BY_USERNAME & LOGIN_BY_EMAIL
│       ├── logout.session.sql                 # LOGOUT function
│       ├── register.ev_uv_session.sql         # REGISTER function
│       ├── remove-otp.session.sql             # REMOVE_OTP function
│       ├── save-otp.session.sql               # SAVE_OTP function
│       ├── session-check.session.sql          # SESSION_CHECK function
│       └── username-validation.uv.account.sql # USERNAME_VALIDATION function
├── scripts/                                   # TypeScript graph compiler & runners
│   ├── compile.ts                             # Dependency graph compiler
│   ├── run_all.ts                             # Sequential migration runner
│   ├── restore.ts                             # Teardown / rollback runner
│   └── sql.ts                                 # Postgres client wrapper
├── tests/                                     # Vitest test suites
│   └── functions/authentication/
│       ├── helpers.ts                         # Test client utilities
│       ├── full-flow.spec.ts                  # End-to-end authentication lifecycle spec
│       ├── active-account.spec.ts             # Activation tests
│       ├── email-validation.spec.ts           # Email validation tests
│       ├── login.spec.ts                      # Multi-identifier login tests
│       ├── logout.spec.ts                     # Session logout tests
│       ├── register.spec.ts                   # Account registration tests
│       ├── session-check.spec.ts              # Session validation tests
│       ├── username-validation.spec.ts        # Username validation tests
│       └── pg.*.testcases.ts                  # Shared data-driven test cases
├── config/
│   └── database.config.ts                     # Centralized database configuration
├── package.json
└── tsconfig.json
```

**Structure Decision**: Conforms to the single-project database domain structure mandated by Constitution §II (Folder-as-Package), cleanly separating definitions, tables, and functions under `src/` and mirroring them under `tests/`.

---

## Complexity Tracking

*No constitutional violations. All designs strictly adhere to project principles without architectural exceptions.*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| *None* | *N/A* | *N/A* |

---

## Post-Design Constitution Review

- [x] **Acyclic Dependency Graph**: Filename dependencies form a clean Directed Acyclic Graph (DAG) verified by `npm run compile`.
- [x] **Schema Qualification**: Every SQL object explicitly specifies `STUDITOPIA.` namespace.
- [x] **Reversibility**: Reverse nodes exist or are documented per Principle I.
- [x] **TDD Coverage**: Full-flow E2E and isolated unit specs exist in `tests/functions/authentication/`.
- [x] **Security Constraints**: Blowfish cryptographic hashing, `citext` domains, and session guards completely specified.
