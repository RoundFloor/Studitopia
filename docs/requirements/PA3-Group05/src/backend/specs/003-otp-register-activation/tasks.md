# Tasks: OTP Validation After Registration (Account Activation)

**Input**: Design documents from `specs/003-otp-register-activation/`

**Prerequisites**: [plan.md](./plan.md) · [spec.md](./spec.md) · [research.md](./research.md) · [data-model.md](./data-model.md) · [contracts/api.md](./contracts/api.md)

**TDD Mandate**: Per the project constitution, all test files MUST be written and **confirmed failing** before any production code is written. Because this feature has no production code to write (the implementation already exists), the TDD mandate applies to test-first authoring — write each test suite, verify it compiles and runs with meaningful failures or as a new passing block, then commit.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on each other)
- **[Story]**: Which user story this task belongs to ([US1], [US2], [US3])

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the OTP testcase data file and confirm the existing test infrastructure compiles and runs correctly before any new tests are added.

> **Note**: There is no production code to scaffold — the `auth.controller.ts`, `auth.service.ts`, `pg.service.ts`, and all supporting packages already implement the full OTP activation flow. This feature delivers **test coverage** for those code paths.

- [x] T001 Confirm all existing tests pass as a baseline: run `npm run test` and `npm run test:e2e` from repo root and record results
- [x] T002 Create OTP testcase data file `src/packages/authentication/__tests__/auth.otp.testcases.ts` with exported testcase arrays for: valid OTP flow, expired OTP, wrong OTP code, invalid session, wrong type submission — leaving arrays empty for now (populated per story)

**Checkpoint**: Existing test suite still green; `auth.otp.testcases.ts` file exists and compiles cleanly.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extend the existing `AuthenticationServiceMock` with OTP-specific mock methods and add OTP testcase data entries so all story-phase tests have the prerequisites they need.

**⚠️ CRITICAL**: No user story test tasks can be authored until this phase is complete — the shared mock and testcase data are required by all three stories.

- [x] T003 Extend `src/packages/authentication/__tests__/auth.service.mock.ts` to add `createOtp` and `validateOtp` mock methods on `AuthenticationServiceMock`, delegating to `PostgresServiceMock` and the real `SecurityGenerationService` exactly as the real service does (mirror `auth.service.ts` logic)
- [x] T004 Populate `src/packages/authentication/__tests__/auth.otp.testcases.ts` with the `validOtpFlow` testcase: register a user, obtain a session, generate a valid OTP token using `SecurityGenerationService.createOTP`, save it via `PostgresServiceMock.saveOtp`, and expose `{ session, otpToken, storage }` for use in test suites
- [x] T005 [P] Populate `src/packages/authentication/__tests__/auth.otp.testcases.ts` with the `expiredOtpFlow` testcase: same as `validOtpFlow` but with `expired_time = Date.now() - 1`
- [x] T006 [P] Populate `src/packages/authentication/__tests__/auth.otp.testcases.ts` with the `wrongCodeFlow` testcase: valid timing but `key` replaced with `"000000"` (unless the real OTP happens to be `"000000"`, in which case use `"000001"`)
- [x] T007 [P] Populate `src/packages/authentication/__tests__/auth.otp.testcases.ts` with the `invalidSessionFlow` testcase: valid OTP token but `session_id` removed from `storage.active_sessions` before submission
- [x] T008 [P] Populate `src/packages/authentication/__tests__/auth.otp.testcases.ts` with the `wrongTypeFlow` testcase: valid OTP token but `type` field changed to `"recover"`

**Checkpoint**: Foundation ready — `auth.service.mock.ts` exports `createOtp` and `validateOtp`; `auth.otp.testcases.ts` exports all five flow factories; `npm run test` still green.

---

## Phase 3: User Story 1 — Request OTP to Activate New Account (Priority: P1) 🎯 MVP

**Goal**: Fully cover `GET /api/v1/auth/otp?type=active` — the OTP generation, storage, and email dispatch path — with unit, integration, and E2E tests.

**Independent Test**: Run `npm run test` targeting `auth.service.spec.ts` and `auth.controller.spec.ts`; run `npm run test:e2e` targeting `auth-otp-activation.e2e-spec.ts`. All OTP-request scenarios pass independently.

### Tests for User Story 1

> **Write these tests FIRST; confirm they describe the correct behavior and pass against the existing implementation.**

- [x] T009 [US1] Add `describe('createOtp')` block to `src/packages/authentication/__tests__/auth.service.spec.ts` with the following `it` cases using `validOtpFlow` from `auth.otp.testcases.ts`:
  - `'returns OTPResponse with created_time and expired_time for type active'` — asserts result `instanceof OTPResponse`, `result.created_time` and `result.expired_time` are numbers matching the generated token
  - `'calls postgres.saveOtp with the numeric OTP value'` — asserts `PostgresServiceMock.saveOtp` was called with `(session_id, user_id, Number(otpToken.key))`
  - `'calls emailSender.sendOtp with purpose register and the user email'` — asserts `EmailSenderServiceMock.sendOtp` was called with `{ to: <user_email>, otp: otpToken.key, purpose: 'register' }`
  - `'returns EMAIL_SENDER_UNVAILABLE when email delivery fails'` — mock `EmailSenderServiceMock.sendOtp` to return `{ success: false }` and assert the return value equals `RESPONSE_CODE.EMAIL_SENDER_UNVAILABLE`
  - `'returns INVALID_SESSION when saveOtp fails with INVALID_SESSION'` — mock `PostgresServiceMock.saveOtp` to return `RESPONSE_CODE.INVALID_SESSION` and assert that code is returned
- [x] T010 [US1] Add `describe('GET /api/v1/auth/otp')` block inside the `E2E Test` describe in `src/packages/authentication/__tests__/auth.controller.spec.ts` with these `it` cases:
  - `'returns 200 with created_time and expired_time for type=active'` — register a user to get access token, call `GET /auth/otp?type=active`, assert `200` and response body has `created_time` (number) and `expired_time` (number)
  - `'returns 400 with VALIDATION_ERROR for unsupported type'` — call `GET /auth/otp?type=invalid`, assert `400` and body contains `[40001]`
  - `'returns 401 when no access token provided'` — call `GET /auth/otp?type=active` without `Authorization` header, assert `401`

- [x] T011 [US1] Create `test/auth-otp-activation.e2e-spec.ts` with app bootstrap (mirror `auth-registration.e2e-spec.ts` setup: `AppModule`, override `PostgresService` with `PostgresServiceMock`, override `SecurityGenerationService` with `SecurityGenerationServiceMock`, use `HttpCodeInterceptor` and `ValidationPipe` with `exceptionFactory`, call `storage.clean()` in `beforeEach`) and add the following `it` case for US1:
  - `'requests an OTP for a newly registered account and receives timing metadata'` — POST `/api/v1/auth/register` with valid payload → extract `access_token` → GET `/api/v1/auth/otp?type=active` with Bearer token → assert `200`, body has `created_time` and `expired_time` as numbers, `storage.otps` has an entry for the session

**Checkpoint**: US1 — all OTP-request tests pass; `npm run test` and the new E2E file pass cleanly.

---

## Phase 4: User Story 2 — Submit OTP to Activate Account (Priority: P1)

**Goal**: Fully cover `POST /api/v1/auth/activate` — the OTP validation, account activation, and all rejection paths — with unit, integration, and E2E tests.

**Independent Test**: Run `npm run test` targeting `auth.service.spec.ts` and `auth.controller.spec.ts`; run `npm run test:e2e` targeting `auth-otp-activation.e2e-spec.ts`. All OTP-submit scenarios pass independently.

### Tests for User Story 2

- [x] T012 [US2] Add `describe('validateOtp')` block to `src/packages/authentication/__tests__/auth.service.spec.ts` with these `it` cases:
  - `'returns SUCCESS and activates account for a valid unexpired OTP'` — use `validOtpFlow`; assert return value equals `RESPONSE_CODE.SUCCESS`; assert `storage.account.get(email).activate === true`
  - `'returns INVALID_OTP for an expired OTP'` — use `expiredOtpFlow`; assert `RESPONSE_CODE.INVALID_OTP`; assert account remains inactive
  - `'returns INVALID_OTP when OTP code does not match stored value'` — use `wrongCodeFlow`; assert `RESPONSE_CODE.INVALID_OTP`
  - `'returns INVALID_SESSION when session is no longer active'` — use `invalidSessionFlow`; assert `RESPONSE_CODE.INVALID_SESSION`
  - `'returns INVALID_OTP when stored OTP is null (never requested or already consumed)'` — use `validOtpFlow` but do not call `saveOtp` before invoking `validateOtp`; assert `RESPONSE_CODE.INVALID_OTP`
- [x] T013 [US2] Add `describe('POST /api/v1/auth/activate')` block inside the `E2E Test` describe in `src/packages/authentication/__tests__/auth.controller.spec.ts` with these `it` cases:
  - `'returns 202 when a valid OTP is submitted'` — register → request OTP → retrieve OTP from `storage.otps` → construct full `OTPRequest` body with real `created_time`, `expired_time`, retrieved key, type `active` → POST `/auth/activate` → assert `202`
  - `'returns 409 with INVALID_OTP for wrong type in body'` — use `wrongTypeFlow`; POST with `type: "recover"` → assert `409` with `[40002]`
  - `'returns 409 with INVALID_OTP for wrong OTP code'` — use `wrongCodeFlow`; POST with wrong key → assert `409` with `[40002]`
  - `'returns 401 with INVALID_SESSION when session is invalidated'` — use `invalidSessionFlow` (logout between OTP request and activation); POST → assert `401` with `[45005]`
  - `'returns 401 when no access token provided'` — POST `/auth/activate` without `Authorization` header → assert `401`
- [x] T014 [US2] Add full activation E2E `it` case to `test/auth-otp-activation.e2e-spec.ts`:
  - `'registers, requests OTP, and activates account successfully'` — POST `/api/v1/auth/register` → GET `/api/v1/auth/otp?type=active` with Bearer token → retrieve OTP from `storage.otps` → construct `OTPRequest` body (`created_time`, `expired_time` from response; `key` from `storage.otps.get(session_id).toString().padStart(6, '0')`; `type: 'active'`) → POST `/api/v1/auth/activate` with Bearer token and body → assert `202` → assert `storage.account.get(email).activate === true`
- [x] T015 [US2] Add rejection E2E `it` cases to `test/auth-otp-activation.e2e-spec.ts`:
  - `'rejects an expired OTP with 409'` — register → request OTP → manually set `expired_time = Date.now() - 1` in body → POST `/api/v1/auth/activate` → assert `409` with `[40002]` → assert account still inactive
  - `'rejects wrong OTP code with 409'` — register → request OTP → submit body with `key: "000000"` (or a deliberately wrong code) → assert `409` with `[40002]`
  - `'rejects OTP after logout with 401'` — register → request OTP → POST `/api/v1/auth/logout` → attempt activation with original access token → assert `401` with `[45005]`

**Checkpoint**: US2 — all activation-submit tests pass; `npm run test:e2e` covers the full happy path and all rejection scenarios.

---

## Phase 5: User Story 3 — Re-request OTP When Previous OTP Expired (Priority: P2)

**Goal**: Cover the OTP overwrite behavior — a re-requested OTP invalidates the previous one, and only the newest code activates the account.

**Independent Test**: Run `npm run test:e2e` targeting the two re-request `it` cases; both pass independently of US1/US2 structure.

### Tests for User Story 3

- [x] T016 [US3] Add `describe('OTP re-request invalidates previous OTP')` block to `src/packages/authentication/__tests__/auth.service.spec.ts` with these `it` cases:
  - `'overwrites stored OTP when a new OTP is requested'` — call `createOtp` once → note `otp1 = storage.otps.get(session_id)` → call `createOtp` again → note `otp2 = storage.otps.get(session_id)` → assert `otp2 !== otp1` (or `otp1 === null` if the first was cleared) → assert `storage.otps.get(session_id) === otp2`
  - `'old OTP code is rejected after re-request'` — call `createOtp` → save token1 key → call `createOtp` again → construct `KeyReponse` using token1 key with token2 timing → call `validateOtp(token1_key_in_token2_shell)` → assert `RESPONSE_CODE.INVALID_OTP`
- [x] T017 [US3] Add re-request E2E `it` cases to `test/auth-otp-activation.e2e-spec.ts`:
  - `'re-requesting OTP overwrites the previous and delivers new timing metadata'` — register → GET `/api/v1/auth/otp?type=active` → save `created_time_1`, `expired_time_1`, `otp_1 = storage.otps.get(session_id)` → GET `/api/v1/auth/otp?type=active` again → assert new response has different `created_time` / `expired_time` → assert `storage.otps.get(session_id) !== otp_1`
  - `'old OTP code cannot activate account after re-request'` — register → request OTP #1 → save `otp_1` key → request OTP #2 → attempt activation with `otp_1` key and OTP #2 timing metadata → assert `409` with `[40002]` → activate with `otp_2` key → assert `202`

**Checkpoint**: US3 — all re-request tests pass; OTP overwrite behavior is fully verified.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation update, lint/format/build validation, and final integration check.

- [x] T018 Update `docs/API.md` with the activation endpoints: document `GET /api/v1/auth/otp?type=active` (request, 200 response, 400 / 401 errors) and `POST /api/v1/auth/activate` (request body schema, 202 response, 401 / 409 / 500 errors) — refer to `contracts/api.md` for the full contract definitions
- [x] T019 [P] Run `npm run lint` and fix any lint errors introduced in new test files (`auth.otp.testcases.ts`, `auth.service.mock.ts` additions, `auth-otp-activation.e2e-spec.ts`)
- [x] T020 [P] Run `npm run format` to apply Prettier formatting to all new and modified files
- [x] T021 Run `npm run build` to confirm the project compiles cleanly under strict TypeScript settings with no new errors
- [x] T022 Run `npm run test` (full unit suite) and `npm run test:e2e` (full E2E suite) as a final integration check; confirm zero failures and no regressions in `auth-registration.e2e-spec.ts` or any existing test

**Checkpoint**: All 22 tasks complete; all tests green; docs updated; build passes.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — **blocks all story phases**
- **US1 (Phase 3)**: Depends on Phase 2 completion
- **US2 (Phase 4)**: Depends on Phase 2 completion — may start in parallel with US1 (different files)
- **US3 (Phase 5)**: Depends on Phase 2 completion — may start in parallel with US1 and US2
- **Polish (Phase 6)**: Depends on all desired story phases being complete

### User Story Dependencies

- **US1 (P1)**: Can start immediately after Phase 2 — no dependency on US2 or US3
- **US2 (P1)**: Can start immediately after Phase 2 — uses same mocks as US1 but all in separate `describe` blocks
- **US3 (P2)**: Can start immediately after Phase 2 — adds new `describe` blocks; independent of US1/US2 test results

### Within Each User Story

- Testcase data (Phase 2) before service tests (T009, T012, T016)
- Service tests before controller/E2E tests (service behavior must be verified first)
- Controller tests before E2E tests (narrower scope → broader scope)
- All tests in a story complete before moving to the next story

### Parallel Opportunities

- T005, T006, T007, T008 (Phase 2) — all populate different testcase entries in the same file; can be drafted in parallel and merged
- T009, T010, T011 (US1) — service test, controller test, E2E bootstrap are in different files; T010 and T011 can start once T009 service behavior is confirmed
- T012, T013 (US2) — service test and controller test can be authored in parallel
- T014, T015 (US2 E2E) — can be added in parallel after T014 app bootstrap is set up
- T019, T020 (Polish) — lint and format runs are independent

---

## Parallel Example: User Story 1

```bash
# After Phase 2 completes, US1 tasks can be batched:
Task T009: auth.service.spec.ts — createOtp describe block
Task T010: auth.controller.spec.ts — GET /auth/otp E2E describe block   # parallel with T009
Task T011: test/auth-otp-activation.e2e-spec.ts — bootstrap + US1 it   # parallel with T009
```

## Parallel Example: User Story 2

```bash
# After Phase 2 completes (can overlap with US1 if staffed):
Task T012: auth.service.spec.ts — validateOtp describe block
Task T013: auth.controller.spec.ts — POST /auth/activate E2E describe  # parallel with T012
Task T014: test/auth-otp-activation.e2e-spec.ts — happy path E2E       # after T011 bootstrap exists
Task T015: test/auth-otp-activation.e2e-spec.ts — rejection E2E cases  # parallel with T014
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001–T002)
2. Complete Phase 2: Foundational (T003–T008)
3. Complete Phase 3: US1 OTP Request tests (T009–T011)
4. **STOP and VALIDATE**: Run `npm run test` and `npm run test:e2e`; confirm OTP request path is fully covered
5. Demo/commit MVP

### Incremental Delivery

1. Setup + Foundational → test infrastructure ready
2. US1 (Phase 3) → OTP request path covered → commit
3. US2 (Phase 4) → OTP submit and activation path covered → commit
4. US3 (Phase 5) → Re-request / OTP overwrite covered → commit
5. Polish (Phase 6) → docs, lint, format, build → commit

### Single-Developer Sequential Order

T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018 → T019 → T020 → T021 → T022

---

## Notes

- `[P]` tasks operate on different files or independent array entries — safe to run in parallel
- `[Story]` label maps each task to its user story for traceability
- Each user story phase is independently completable and testable
- No production code exists to write — all tasks produce test files and documentation
- The in-memory `storage` from `pg.testcases.ts` is the state store for E2E tests; call `storage.clean()` in `beforeEach` to prevent cross-test contamination
- OTP key retrieval in tests: `storage.otps.get(session_id).toString().padStart(6, '0')`
- Avoid adding new `vi.mock()` calls for modules already handled by the established mock pattern
