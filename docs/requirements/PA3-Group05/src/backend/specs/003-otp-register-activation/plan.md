# Implementation Plan: OTP Validation After Registration (Account Activation)

**Branch**: `003-otp-register-activation` | **Date**: 2026-11-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/003-otp-register-activation/spec.md`

## Summary

Add end-to-end test coverage for the account-activation OTP flow that already exists in the codebase: a newly registered user requests a one-time password via `GET /api/v1/auth/otp?type=active`, receives it by email, and submits it via `POST /api/v1/auth/activate` to transition their account from `INACTIVE` to `ACTIVE`. All service, controller, and database layers are already implemented; this feature delivers the missing test specifications (unit, integration, and E2E) that fully exercise those code paths.

## Technical Context

**Language/Version**: TypeScript (Node.js, ESM modules)

**Primary Dependencies**: NestJS (controller/service/module), Vitest (test runner), Supertest (HTTP-level E2E), `class-validator` (DTO validation)

**Storage**: PostgreSQL (via `PostgresService`); in-memory `storage` mock for tests

**Testing**: Vitest (`npm run test`), Vitest + Supertest (`npm run test:e2e`)

**Target Platform**: Linux server (NestJS application)

**Project Type**: Web service (REST API)

**Performance Goals**: OTP email delivered within 30 seconds under normal conditions (SC-003)

**Constraints**: All external service calls (PostgreSQL, Resend email API) must be mocked in unit tests; no live third-party calls in the default test run

**Scale/Scope**: Single existing authentication package; no new packages or modules introduced

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| TDD — tests written before implementation | ✅ PASS | All deliverables are test specs; no production code changes required |
| Package-by-Folder — changes in owning package | ✅ PASS | All new files in `src/packages/authentication/__tests__/` and `test/` |
| Adaptive role placement (1 file → root or role folder; 2+ → role folder) | ✅ PASS | New test files go into existing `__tests__/` folder |
| Test files in `__tests__/` only | ✅ PASS | Unit/integration tests placed in `__tests__/`; E2E in `test/` |
| Mandatory module at package root | ✅ PASS | No new modules; extends existing `auth.module.ts` |
| External deps mocked in unit tests | ✅ PASS | Using `PostgresServiceMock`, `EmailSenderServiceMock`, `SecurityGenerationServiceMock` |
| `docs/API.md` update | ⚠️ REQUIRED | Activation endpoints must be documented in API docs |
| Lint + format + build must pass | ✅ PASS | No production code changes; test code must pass `npm run lint` |

**Re-check post-design**: All gates still pass. No violations requiring justification.

## Project Structure

### Documentation (this feature)

```text
specs/003-otp-register-activation/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── api.md           # Phase 1 output
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit-tasks — NOT created here)
```

### Source Code (repository root)

```text
src/packages/authentication/
├── auth.controller.ts           (existing — no changes)
├── auth.service.ts              (existing — no changes)
├── auth.module.ts               (existing — no changes)
├── dto/
│   ├── otp-response.dto.ts      (existing — no changes)
│   └── register.dto.ts          (existing — no changes)
└── __tests__/
    ├── auth.controller.spec.ts  (existing — extend with OTP activation cases)
    ├── auth.service.spec.ts     (existing — extend with OTP activation cases)
    ├── auth.service.mock.ts     (existing — extend with OTP mock methods)
    ├── auth.testcase.ts         (existing — no changes)
    └── auth.otp.testcases.ts    (NEW — OTP-specific testcase data)

test/
├── auth-registration.e2e-spec.ts   (existing — no changes)
└── auth-otp-activation.e2e-spec.ts (NEW — E2E activation flow)

docs/
└── API.md                           (existing — update with activation endpoints)
```

**Structure Decision**: Single-package extension of `authentication`. All new files respect the adaptive role placement rule (test files in `__tests__/`, E2E in `test/`). No new packages, modules, or role sub-folders are introduced.

## Complexity Tracking

> No constitution violations detected. This section is intentionally left empty.
