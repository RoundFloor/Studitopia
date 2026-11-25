# Implementation Plan: User Registration with Email and Username Validation

**Branch**: `feature/api/register` | **Date**: 2026-10-29 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-user-registration/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command; its definition describes the execution workflow.

## Summary

Implement the account-registration feature in the Authentication Module with three capabilities: validate an email address, validate a username, and register an account. The implementation follows the existing package-by-folder layout and reuses the shared response envelope, response-code map, and PostgreSQL validation and registration functions.

## Technical Context

**Language/Version**: TypeScript 6.0.2 on Node.js, ESM (`"type": "module"`), NodeNext module resolution, ES2023 target

**Primary Dependencies**: NestJS 12 (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`), `pg` 8, `rxjs`, `reflect-metadata`; `resend` remains available but is not required for registration

**Storage**: PostgreSQL accessed through `PostgresService` using `studitopia.EMAIL_VALIDATION($1)`, `studitopia.USERNAME_VALIDATION($1)`, and `studitopia.ACCOUNT_REGISTER($1, $2, $3, $4)`. The functions and institutional-domain data must be available in the target database; no schema changes are planned.

**Testing**: Vitest 4 with `@nestjs/testing` and `supertest`; unit and integration tests in `src/packages/authentication/__tests__/`, system E2E tests in `test/`. Tests are written before implementation using table-driven cases.

**Target Platform**: Linux server running the Node.js backend behind the global `/api/v1` route prefix

**Project Type**: Single NestJS backend web service organized as package-by-folder modules

**Performance Goals**: Email and username validation feedback is returned within 2 seconds at p95 under normal operating load; registration completes within 2 seconds of server-side processing, excluding user input time

**Constraints**: Preserve the response envelope and response-code contract used by the codebase; keep all authentication behavior inside the `authentication` package; all database access goes through `PostgresService`; no direct `process.env` reads outside configuration files; relative imports use explicit `.js` extensions; all production changes follow strict TDD

**Scale/Scope**: One Authentication Module, three user-facing capabilities, four registration fields, and a table-driven validation matrix covering valid inputs, malformed inputs, duplicates, and simultaneous errors. No new packages, routes, or configuration files are expected.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Assessment | Result |
| --- | --- | --- |
| Strict TDD (Principle I) | Tests for all three capabilities must be written and confirmed failing before controller, service, or database-boundary implementation is written. | PASS |
| Package-by-Folder Architecture (Principle II) | All feature code lives in `src/packages/authentication/` and consumes database behavior through `PostgresService`; no circular dependencies or cross-package internal imports are introduced. | PASS |
| Dual-Tier Configuration Hierarchy (Principle III) | No new configuration is required for this feature; validation limits remain in package-level constants or database functions, and no new environment reads are added outside config files. | PASS |
| Standardized Naming & TypeScript Conventions (Principle IV) | Controllers, services, DTOs, and tests follow the role suffixes and file naming rules; ESM imports retain `.js` extensions. | PASS |
| Quality Gates | Implementation must pass `npm run lint`, `npm run format`, `npm run build`, `npm run test`, and `npm run test:e2e` before merge. | PASS |

No constitutional violations require justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-user-registration/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── auth-registration.openapi.yaml
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created here)
```

### Source Code (repository root)

```text
src/
├── common/
│   ├── dto/
│   │   └── response.dto.ts                    # Success/failure envelope helpers
│   ├── response-code/
│   │   └── code.config.ts                     # Response-code constants
│   └── interceptors/
│       └── transform.interceptor.ts           # statusCode/success/data wrapper
├── config/
│   └── app.config.ts                          # Global prefix and port
└── packages/
    ├── authentication/
    │   ├── auth.module.ts                     # Module wiring and exports
    │   ├── auth.controller.ts                 # GET /auth/validate, POST /auth/register
    │   ├── auth.service.ts                    # Validation aggregation and registration orchestration
    │   ├── dto/
    │   │   ├── register.dto.ts                # Registration request contract
    │   │   └── validate.dto.ts                # Field-keyed validation response contract
    │   └── __tests__/
    │       ├── auth.controller.spec.ts
    │       ├── auth.service.spec.ts
    │       ├── auth.service.mock.ts
    │       └── auth.testcase.ts
    └── postgres/
        ├── pg.service.ts                      # Database boundary
        ├── dto/
        │   ├── response.dto.ts                # SessionResponse contract
        │   └── SQLSTATE.dto.ts                # SQLSTATE-to-response-code mapping
        └── __tests__/
            ├── pg.register.testcases.ts
            ├── pg.service.mock.ts
            ├── pg.testcases.ts
            └── pool.mock.ts
```

**Structure Decision**: Keep the single NestJS project and package-by-folder layout. The controller receives requests, `AuthenticationService` performs field validation and error aggregation, and `PostgresService` owns database calls and SQLSTATE translation. No new folders, packages, or configuration files are introduced unless a required role file is missing.

## Implementation Approach

1. **Define the contract**: Document the validate and register request and response contracts in `contracts/auth-registration.openapi.yaml`. Preserve the `statusCode`/`success`/`data` envelope and the existing response-code values.
2. **Write failing tests first**: Create table-driven tests for valid and invalid display names, usernames, emails, and passwords; for multiple simultaneous errors; for duplicate username and email; for unregistered domains; and for successful registration.
3. **Implement the service**: Add `AuthenticationService` validation methods and `register` orchestration. Check display name and password locally, check username and email concurrently, accumulate every applicable response code, and call the database registration boundary only when local validation passes.
4. **Implement the database boundary**: Add `PostgresService` methods that call the validation and registration functions and translate SQLSTATE values into the existing response codes. Treat `session_id`, `user_id`, and numeric `status` as opaque session data.
5. **Implement the endpoints**: Add `GET /api/v1/auth/validate` to accept optional `displayname`, `username`, `email`, and `password` query parameters and return a field-keyed error map. Add `POST /api/v1/auth/register` to accept the four-field body and return either session data or an array of response codes.
6. **Verify**: Run focused authentication tests, the full unit suite, lint, format, build, and E2E tests. Use mocked database behavior for unit tests and the live test database only for E2E scenarios.

## Post-Design Constitution Check

After producing `research.md`, `data-model.md`, the OpenAPI contract, and `quickstart.md`, the gates remain satisfied:

- The design adds no new packages, routes, database objects, or configuration files.
- All planned behavior remains within the Authentication Module and the existing `PostgresService` boundary.
- The contract preserves the response envelope and response-code mapping used by the codebase.
- TDD remains mandatory for every validation rule, endpoint, and database-boundary behavior.
- No cross-package private imports, circular dependencies, or direct environment reads are introduced.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations identified. No additional projects, repositories, or architectural layers are required.
