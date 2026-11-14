# Implementation Plan: User Login and Session Access

**Branch**: `002-user-login` | **Date**: 2026-11-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-user-login/spec.md`

## Summary

Implement the complete sign-in lifecycle while preserving the existing public endpoints
(`POST /api/v1/auth/login`, `POST /api/v1/auth/logout`) and token response shape:

- Validate the login query/body before any credential lookup.
- Keep username and email login, case-insensitive identifiers, generic credential errors,
  multiple independent sessions, and account-status reporting.
- Enforce account suspension for both protected access and renewal. The guard and refresh flow
  must consult the current account/session state; existing sessions become unusable immediately
  after the account is suspended.
- Make sign-out end only the current access credential. The session remains renewable and the
  refresh cookie is not cleared. A per-session access version provides server-side invalidation
  without ending the session.
- Keep refresh credentials non-rotating and usable only for obtaining a new access credential.

The current session model deactivates a session on logout and the access guard never checks
database state. Those two facts make the clarified suspension/renewal behavior impossible to
satisfy as-is. The plan therefore adds a small database contract: a per-session
`access_version`, an authorization lookup, and an atomic "end access" function. The backend
consumes these through `PostgresService`; existing PostgreSQL functions continue to be the
authority for credential checks. The database contract is a prerequisite for this feature.

## Technical Context

**Language/Version**: TypeScript 6, ES2023, ESM with NodeNext resolution, Node.js server

**Primary Dependencies**: NestJS 12, `class-validator`, `class-transformer`, `pg`, `cookie-parser`,
Vitest 4, Supertest, HMAC-based `SecurityGenerationService`

**Storage**: PostgreSQL schema `studitopia`; account and session state live in the database.
This feature requires the session `access_version` column plus two session authorization
functions described in `contracts/database-session.md`.

**Testing**: Vitest with global APIs; unit/integration tests in package `__tests__/*.spec.ts`;
system E2E tests in `test/*.e2e-spec.ts`; `npm test`, `npm run test:e2e`, `npm run lint`,
`npm run build`.

**Target Platform**: Linux-hosted NestJS HTTP service; global prefix `/api/v1`; JSON API;
HTTP-only refresh cookie scoped to `/api/v1/auth/login`.

**Project Type**: Single backend web service using the repository's package-by-folder layout.
No frontend implementation is part of this feature.

**Performance Goals**:
- 95% of valid sign-ins complete in under 2 seconds at normal load (SC-001).
- Access authorization adds one indexed session/account lookup per protected request.
- No caching of suspension state, because suspension must take effect immediately (SC-009).

**Constraints**:
- Preserve existing token lifetimes: access 30 minutes, refresh 30 days.
- Do not add throttling, lockout, or breached-password checks.
- Do not rotate or extend the refresh credential on renewal or sign-out.
- Never return, log, or otherwise expose password material or stored password hashes.
- Return one generic credential error for both unknown identifiers and wrong passwords.
- Do not clear the refresh cookie on sign-out; the clarified behavior requires renewal to remain
  usable until expiry.
- Existing access tokens do not carry an access version and cannot satisfy the new guard after
  deployment; clients refresh once to obtain a versioned access token.
- All new database objects use `snake_case`; all TypeScript follows the constitution's naming
  rules and explicit `.js` imports.

**Scale/Scope**:
- Multiple simultaneous sessions per account.
- A handful of authentication endpoints and one session authorization guard.
- One new session column and two new database functions; no table redesign.
- Account statuses relevant to this feature: `ACTIVE`, `INACTIVE`, `SUSPENDED`. Any status other
  than `SUSPENDED` may access protected features so inactive accounts can complete activation.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Plan compliance |
| --- | --- | --- |
| I. Strict TDD | Tests first, correct locations | Add failing unit/integration specs in owning package `__tests__/` and an E2E spec in `test/` before implementation. Update shared mocks/fixtures in `__tests__/`. |
| II. Package-by-folder | One package per domain, role placement, no cycles | Work stays in `authentication`, `security-generation`, and `postgres`. The session guard is a security-generation provider; `SecurityGenerationModule` may import `PostgresModule`. `PostgresModule` does not import security-generation, so no cycle is introduced. New tests go in `__tests__/`. |
| III. Configuration hierarchy | Global config in `src/config/`, scoped configs in packages | Token lifetimes and secrets remain in `src/packages/security-generation/sg.config.ts`; no new global settings. Database names remain in `pg.config.ts`/`pg.service.ts`. |
| IV. Naming and TypeScript | PascalCase classes, camelCase members, snake_case DB fields, `.js` imports | New `LoginQueryDto`, `SessionGuard`, and session DTOs follow suffixes; database additions are `access_version`, `GET_SESSION_AUTH`, `END_ACCESS`; all relative imports include `.js`. |

**Post-Phase 1 re-check**: PASS. The design adds no new package, no shared-infrastructure
duplication, and no cross-package cycle. The only structural cleanup included in implementation
is moving the security-generation test helper `sg.mock.ts` from `decorators/` to `__tests__/`
because new security tests are being added; the pre-existing `decorartors/` typo and `__test__/`
folder rename remain tracked by the constitution sync report and are not required by the
login behavior.

## Project Structure

### Documentation (this feature)

```text
specs/002-user-login/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── auth-session.openapi.yaml
│   └── database-session.md
├── checklists/
│   └── requirements.md
└── tasks.md              # Created later by /speckit.tasks
```

### Source Code (repository root)

```text
src/
├── common/
│   └── response-code/
│       └── code.config.ts                 # Existing response codes; no new public code required
├── packages/
│   ├── authentication/
│   │   ├── auth.controller.ts             # Login, refresh, logout routes
│   │   ├── auth.service.ts                # Login/refresh/logout orchestration
│   │   ├── auth.module.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts               # Body validation
│   │   │   └── login-query.dto.ts         # Query `type` validation
│   │   └── __tests__/
│   │       ├── auth.controller.spec.ts
│   │       ├── auth.service.spec.ts
│   │       ├── auth.service.mock.ts
│   │       └── auth.testcase.ts
│   ├── security-generation/
│   │   ├── sg.guard.ts                    # Authenticated decorator + SessionGuard
│   │   ├── sg.service.ts                  # Token creation/verification
│   │   ├── sg.module.ts                   # Imports PostgresModule for the guard
│   │   ├── dto/
│   │   │   └── key-response.dto.ts        # Optional access_version claim
│   │   └── __tests__/
│   │       ├── sg.service.spec.ts
│   │       └── sg.mock.ts                 # Moved from decorators/
│   └── postgres/
│       ├── pg.service.ts                  # getSessionAuth(), endAccess()
│       ├── dto/
│       │   └── response.dto.ts            # Session response/access version types
│       └── __tests__/
│           ├── pg.service.spec.ts
│           ├── pg.service.mock.ts
│           └── pool.mock.ts
test/
└── auth-login.e2e-spec.ts                 # New system-level login/session E2E coverage
docs/
├── API.md
├── backend/authentication.md
└── database/authentication.md
```

**Structure Decision**: Keep the existing single backend service and package-by-folder layout.
No new package is justified: login orchestration belongs in `authentication`, token signing and
session authorization belong in `security-generation`, and database access belongs in
`postgres`. The `SessionGuard` is exported by `SecurityGenerationModule`; `AuthModule` already
imports that module and `PostgresModule`.

## Design Decisions

1. **Session access version**: Add `access_version INT NOT NULL DEFAULT 0` to the session record.
   Access tokens carry the version. Guard authorization requires the token version to equal the
   current database version. Sign-out increments the version atomically.
2. **Sign-out keeps the session renewable**: The backend stops calling the current `LOGOUT`
   function. It calls `END_ACCESS(session_id, user_id, access_version)`, which rotates the access
   version without changing session status or expiry. The refresh cookie is left intact.
3. **Suspension is checked on every use**: `GET_SESSION_AUTH` returns the current account status,
   session status, expiry, and access version. The guard and refresh deny `SUSPENDED` accounts
   while allowing other statuses (so inactive accounts can complete activation). No proactive
   session mutation is required, so all existing sessions fail on their next use.
4. **Login remains status-agnostic**: Credential verification and session creation follow current
   behavior for every status. A suspended login returns `201` with `role`, `status`, an access
   token, and the refresh cookie, but both credentials are unusable because the guard and refresh
   reject suspended accounts. This preserves the existing response contract.
5. **Refresh is non-rotating**: Refresh returns only a new access token carrying the current
   access version. It does not set or rotate the refresh cookie.
6. **Input validation is explicit**: `type` is validated as `username | email | token` before any
   credential check. For `username`/`email`, identifier and password are required, non-empty
   strings. For `token`, the body is ignored. Existing generic credential mapping remains.
7. **Authorization failure uses existing generic codes**: Protected access failure returns `401`
   with `[INVALID_ACCESS_TOKEN]`; refresh failure returns `401` with `[INVALID_REFRESH_TOKEN]`;
   sign-out database failure returns `401` with `[INVALID_SESSION]`. The body never reveals
   whether an account is suspended.

## Complexity Tracking

No constitution violations. The database contract change is required by FR-016, FR-021, and
FR-022 and does not add a package or architectural exception.
