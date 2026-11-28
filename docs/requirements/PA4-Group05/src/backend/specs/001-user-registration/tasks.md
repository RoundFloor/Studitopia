---

description: "Task list for user registration with email and username validation"
---

# Tasks: User Registration with Email and Username Validation

**Input**: Design documents from `/specs/001-user-registration/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/auth-registration.openapi.yaml`, `quickstart.md`

**Tests**: Required by the project constitution. Write each test task first and confirm it fails before starting the related implementation task.

**Organization**: Tasks are grouped by user story so each story can be implemented, tested, and demonstrated independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: Which user story this task belongs to (`US1`, `US2`, `US3`)
- Every task includes the exact file path or paths it changes or validates

## Path Conventions

- **Single project**: `src/`, `test/`, `specs/` at repository root
- Authentication code lives in `src/packages/authentication/`
- Database-boundary code lives in `src/packages/postgres/`
- Shared API infrastructure lives in `src/common/` and `src/config/`
- System E2E tests live in `test/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing project configuration can host the feature.

- [X] T001 [P] Confirm Node.js, TypeScript ESM, NestJS, and Vitest settings support the feature in `package.json`, `tsconfig.json`, and `vitest.config.ts`; adjust only missing or incompatible configuration.
- [X] T002 [P] Confirm the global route prefix, response envelope, and interceptor wiring in `src/config/app.config.ts`, `src/common/dto/response.dto.ts`, and `src/common/interceptors/transform.interceptor.ts`.
- [X] T003 [P] Confirm `AuthModule` is registered in `src/app.module.ts` and that `src/packages/authentication/auth.module.ts` exports `AuthenticationService`.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared contracts, validators, database boundary, and test doubles required by every user story.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 [P] Create or align `RegisterDto` in `src/packages/authentication/dto/register.dto.ts` with required string fields `displayname`, `username`, `email`, and `password`; document that `displayname` is 8-32 characters, `username` is 8-32 characters starting with a lowercase letter, `email` is at most 254 characters, and `password` is 8-32 characters with lowercase, uppercase, digit, and special-character requirements.
- [X] T005 [P] Create or align `ValidateResponse` in `src/packages/authentication/dto/validate.dto.ts` with optional `displayname`, `username`, `email`, and `password` properties, each an array of `ResponseCode`.
- [X] T006 [P] Create or align shared table-driven validation data in `src/packages/authentication/__tests__/auth.testcase.ts`, `src/packages/postgres/__tests__/pg.testcases.ts`, and `src/packages/postgres/__tests__/pg.register.testcases.ts` for valid, malformed, duplicate, unregistered-domain, and simultaneous-error cases.
- [X] T007 [P] Write failing unit tests for `validate_displayname`, `validate_username`, `validate_email`, and `validate_password` in `src/packages/authentication/__tests__/auth.service.spec.ts` using the tables from T006.
- [X] T008 [P] Write failing database-boundary tests for success, invalid format, duplicate username, duplicate email, unregistered domain, database error, and unknown error mapping in `src/packages/postgres/__tests__/pg.service.spec.ts`.
- [X] T009 Implement `SQLSTATE` mapping in `src/packages/postgres/dto/SQLSTATE.dto.ts` and the `validate_email`, `validate_username`, and `register` methods in `src/packages/postgres/pg.service.ts`, including `session_id`, `user_id`, and numeric `status` extraction from `ACCOUNT_REGISTER` (depends on T008).
- [X] T010 Implement `validate_displayname`, `validate_username`, `validate_email`, and `validate_password` in `src/packages/authentication/auth.service.ts` with the exact rules from `data-model.md`: display name 8-32 alphanumeric words separated by single spaces; username 8-32 starting lowercase and using lowercase letters, digits, and single interior dots; email at most 254 characters with a letter-leading local part, valid separators, and an alphabetic domain suffix of at least two characters; password 8-32 with lowercase, uppercase, digit, special character, and no null character (depends on T007 and T009).
- [X] T011 [P] Align the database test doubles in `src/packages/postgres/__tests__/pg.service.mock.ts` and `src/packages/postgres/__tests__/pool.mock.ts` with the response codes and SQLSTATE behavior implemented in T009 (depends on T009).
- [X] T012 [P] Align the authentication test double in `src/packages/authentication/__tests__/auth.service.mock.ts` with the validators implemented in T010 (depends on T010).

**Checkpoint**: Shared DTOs, validators, database mapping, and test doubles are ready. User story work can begin.

---

## Phase 3: User Story 1 - Register a New Account (Priority: P1) 🎯 MVP

**Goal**: Validate all registration fields, create exactly one account when every field passes, and return a session; create nothing when any field fails.

**Independent Test**: Submit valid and invalid registration payloads and verify that valid payloads return `session_id`, `user_id`, and `status`, while invalid payloads return all applicable response codes and create no account.

### Tests for User Story 1

> **NOTE**: Write these tests first and confirm they fail before starting T016.

- [X] T013 [P] [US1] Write failing service tests for successful registration, all-error aggregation, duplicate username, duplicate email, unregistered domain, and no session on failure in `src/packages/authentication/__tests__/auth.service.spec.ts`.
- [X] T014 [P] [US1] Write failing controller tests for `POST /auth/register` success and failure envelopes, including the response-code array on failure, in `src/packages/authentication/__tests__/auth.controller.spec.ts`.
- [X] T015 [P] [US1] Write failing E2E registration tests for a valid account, duplicate username or email, and multiple invalid fields in `test/auth-registration.e2e-spec.ts`.

### Implementation for User Story 1

- [X] T016 [US1] Implement `register(dto)` in `src/packages/authentication/auth.service.ts`: validate display name and password locally, validate username and email concurrently, accumulate every applicable `ResponseCode`, return all codes without calling the database when any local check fails, and call `PostgresService.register` only when all local checks pass (depends on T013, T010, and T009).
- [X] T017 [US1] Implement `POST /auth/register` in `src/packages/authentication/auth.controller.ts` using `SuccessResponse` for session data and `FailResponse` for the response-code array (depends on T014 and T016).
- [ ] T018 [US1] Complete and run the E2E registration scenarios in `test/auth-registration.e2e-spec.ts` against the live database, confirming that a failed registration leaves no account or session behind (depends on T015 and T017).

**Checkpoint**: User Story 1 is independently functional and is the MVP increment.

---

## Phase 4: User Story 2 - Validate an Email Address Before Registration (Priority: P2)

**Goal**: Check email format, institutional-domain eligibility, and availability before registration and return email-specific errors.

**Independent Test**: Submit valid, malformed, unregistered-domain, and duplicate emails to `GET /auth/validate?email=...` and verify the email result without creating an account.

### Tests for User Story 2

> **NOTE**: Write these tests first and confirm they fail before starting T020.

- [X] T019 [P] [US2] Write failing service and controller tests for valid email, malformed email, unregistered domain, duplicate email, and email longer than 254 characters in `src/packages/authentication/__tests__/auth.service.spec.ts` and `src/packages/authentication/__tests__/auth.controller.spec.ts`.
- [X] T020 [P] [US2] Write failing E2E email-validation tests for acceptable, malformed, unregistered-domain, and duplicate addresses in `test/auth-registration.e2e-spec.ts`.

### Implementation for User Story 2

- [X] T021 [US2] Implement the email branch of `GET /auth/validate` in `src/packages/authentication/auth.controller.ts`: call `validate_email`, omit the field from failure data when successful, and return `data.email` with the mapped code when it fails (depends on T019 and T010).

**Checkpoint**: User Story 2 works independently through the validation endpoint.

---

## Phase 5: User Story 3 - Validate a Username Before Registration (Priority: P3)

**Goal**: Check username format and availability before registration and return username-specific errors.

**Independent Test**: Submit valid, malformed, and duplicate usernames to `GET /auth/validate?username=...` and verify the username result without creating an account.

### Tests for User Story 3

> **NOTE**: Write these tests first and confirm they fail before starting T024.

- [X] T022 [P] [US3] Write failing service and controller tests for valid username, short or long username, uppercase or unsupported characters, leading or trailing dots, consecutive dots, and duplicate username in `src/packages/authentication/__tests__/auth.service.spec.ts` and `src/packages/authentication/__tests__/auth.controller.spec.ts`.
- [X] T023 [P] [US3] Write failing E2E username-validation tests for acceptable, malformed, and duplicate usernames in `test/auth-registration.e2e-spec.ts`.

### Implementation for User Story 3

- [X] T024 [US3] Implement the username branch of `GET /auth/validate` in `src/packages/authentication/auth.controller.ts`: call `validate_username`, omit the field from failure data when successful, and return `data.username` with the mapped code when it fails (depends on T022 and T010).
- [X] T025 [US3] Implement combined validation behavior in `src/packages/authentication/auth.controller.ts`: skip omitted fields, return success for an empty request, report multiple failing fields in one field-keyed object, and preserve password pre-check behavior for valid and invalid passwords (depends on T021 and T024).

**Checkpoint**: All three user stories are independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, contract alignment, and quality gates across all stories.

- [X] T026 [P] Remove the redundant `PostgresService` provider from `src/packages/authentication/auth.module.ts` when `PostgresModule` already supplies it, and confirm `AuthenticationService` remains exported.
- [X] T027 [P] Format all changed TypeScript files by running `npm run format` for `src/**/*.ts` and `test/**/*.ts`, then commit the resulting formatting changes.
- [X] T028 [P] Run `npm run lint` and resolve every oxlint finding in `src/packages/authentication/**`, `src/packages/postgres/**`, and `test/auth-registration.e2e-spec.ts`.
- [X] T029 Run `npm run build` and resolve TypeScript errors in `src/packages/authentication/**`, `src/packages/postgres/**`, and `test/auth-registration.e2e-spec.ts`.
- [X] T030 Run `npx vitest run src/packages/authentication` and `npm run test`, then fix all failing unit and integration tests in `src/packages/authentication/**` and `test/**`.
- [ ] T031 Run `npm run test:e2e` with the database environment configured, then fix all failing registration E2E scenarios in `test/auth-registration.e2e-spec.ts`.
- [X] T032 [P] Review `specs/001-user-registration/contracts/auth-registration.openapi.yaml` against actual responses and update the contract, `specs/001-user-registration/data-model.md`, and `specs/001-user-registration/research.md` if implementation details differ.
- [ ] T033 Execute every scenario in `specs/001-user-registration/quickstart.md` against the running server and mark the validation checklist items in that file.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; all setup tasks can start immediately.
- **Foundational (Phase 2)**: Depends on Setup and blocks all user stories.
- **User Stories (Phase 3-5)**: Depend on Foundational completion.
  - US1, US2, and US3 are logically independent because all shared validators live in Phase 2.
  - US2 and US3 both edit `src/packages/authentication/auth.controller.ts`, so their controller implementation tasks must not run concurrently.
  - US1 also edits the controller; coordinate T017, T021, and T024 to avoid conflicting changes.
- **Polish (Phase 6)**: Depends on all desired user stories.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Phase 2; no dependency on US2 or US3 endpoint work.
- **User Story 2 (P2)**: Starts after Phase 2; no dependency on US1 or US3 endpoint work.
- **User Story 3 (P3)**: Starts after Phase 2; no dependency on US1 or US2 endpoint work.

### Within Each User Story

- Test tasks must be written and must fail before the related implementation task starts.
- DTOs, validators, and database mapping are complete in Phase 2 before story work begins.
- Service orchestration precedes controller wiring.
- E2E scenarios are completed after the endpoint is implemented.

### Parallel Opportunities

- T001, T002, and T003 can run in parallel.
- T004, T005, T006, T007, and T008 can run in parallel.
- T011 and T012 can run in parallel after T009 and T010 respectively.
- T013, T014, and T015 can run in parallel.
- T019 and T020 can run in parallel.
- T022 and T023 can run in parallel.
- T026, T027, T028, and T032 can run in parallel once their prerequisites are complete.
- US1, US2, and US3 backend logic can be developed in parallel by separate developers, but controller edits in T017, T021, and T024 must be serialized.

---

## Parallel Example: User Story 1

```bash
# Launch the three failing test tasks for User Story 1 together:
Task: "T013 Write failing register service tests in src/packages/authentication/__tests__/auth.service.spec.ts"
Task: "T014 Write failing register controller tests in src/packages/authentication/__tests__/auth.controller.spec.ts"
Task: "T015 Write failing registration E2E tests in test/auth-registration.e2e-spec.ts"
```

```bash
# After T016, wire the register endpoint:
Task: "T017 Implement POST /auth/register in src/packages/authentication/auth.controller.ts"
Task: "T018 Complete and run registration E2E scenarios in test/auth-registration.e2e-spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. **STOP and VALIDATE**: Run the focused authentication tests and execute quickstart registration scenarios 6-8.
5. Deploy or demonstrate the registration MVP.

### Incremental Delivery

1. Complete Setup and Foundational phases.
2. Deliver User Story 1 and validate account creation.
3. Deliver User Story 2 and validate email-specific feedback.
4. Deliver User Story 3 and validate username-specific feedback plus combined validation.
5. Complete Polish tasks and run every quality gate.

### Parallel Team Strategy

1. Complete Setup and Foundational phases together.
2. Once foundational work is complete:
   - Developer A: User Story 1 registration orchestration and endpoint.
   - Developer B: User Story 2 email validation tests and controller branch.
   - Developer C: User Story 3 username validation tests and controller branch.
3. Serialize edits to `src/packages/authentication/auth.controller.ts` to avoid merge conflicts.

---

## Notes

- `[P]` marks tasks that touch different files and have no incomplete-task dependency.
- `[US1]`, `[US2]`, and `[US3]` map tasks to the user stories in `spec.md`.
- Each user story must be independently testable at its checkpoint.
- Verify every test task fails before implementing the corresponding behavior.
- Run the quickstart validation guide after the full test suite passes.
