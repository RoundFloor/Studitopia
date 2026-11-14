# Tasks: User Login and Session Access

**Input**: Design documents from `/specs/002-user-login/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: REQUIRED by Constitution Principle I (TDD). Write each test task first, confirm it
fails, then complete the implementation task that makes it pass.

**Organization**: Tasks are grouped by user story so each story can be implemented and tested
independently after the shared foundation is ready.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: `[US1]`, `[US2]`, or `[US3]`; omitted for Setup, Foundational, and Polish phases
- Every task includes the exact repository path(s) it changes

## Path Conventions

- Single backend project: `src/`, `test/`, `docs/`, `specs/002-user-login/`
- Unit/integration tests: `src/packages/<package>/__tests__/*.spec.ts`
- E2E tests: `test/*.e2e-spec.ts`
- Database contract reference: `specs/002-user-login/contracts/database-session.md`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the touched test infrastructure so later TDD tasks can use the correct
locations.

- [X] T001 Move `src/packages/security-generation/decorators/sg.mock.ts` to `src/packages/security-generation/__tests__/sg.mock.ts` and update imports in `src/packages/authentication/__tests__/auth.controller.spec.ts` and `test/auth-registration.e2e-spec.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Token/session primitives, database authorization, and the session guard required by
all three user stories.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

### Tests first

- [X] T002 [P] Add failing access-version token tests to `src/packages/security-generation/__tests__/sg.service.spec.ts`: version is embedded in access tokens, round-trips through `revertAccessToken`, legacy/versionless tokens are rejected, and tampered tokens are rejected
- [X] T003 [P] Add failing `getSessionAuth`/`endAccess` tests to `src/packages/postgres/__tests__/pg.service.spec.ts` and extend `src/packages/postgres/__tests__/pg.service.mock.ts`, `src/packages/postgres/__tests__/pool.mock.ts`, and `src/packages/postgres/__tests__/pg.testcases.ts` with session status, account status, `access_version`, and case-insensitive login identifiers
- [X] T004 [P] Add failing `SessionGuard` tests to `src/packages/security-generation/__tests__/sg.guard.spec.ts`: required access, optional login access, refresh-cookie parsing, suspended denial, session-version mismatch, and invalid/expired token denial

### Database contract and shared implementation

- [X] T005 [P] Apply the database contract in `specs/002-user-login/contracts/database-session.md`: add `ACCESS_VERSION INT NOT NULL DEFAULT 0` to `STUDITOPIA.SESSION`, create `STUDITOPIA.GET_SESSION_AUTH(psession_id INT, puser_id INT)`, create `STUDITOPIA.END_ACCESS(psession_id INT, puser_id INT, paccess_version INT)`, and mark `STUDITOPIA.LOGOUT` deprecated for this flow
- [X] T006 [P] Implement `getSessionAuth(session_id, user_id)` and `endAccess(session_id, user_id, access_version)` in `src/packages/postgres/pg.service.ts`; add the corresponding response types to `src/packages/postgres/dto/response.dto.ts`; map SQLSTATE `45005` to `RESPONSE_CODE.INVALID_SESSION`
- [X] T007 [P] Add `access_version` to `src/packages/security-generation/dto/key-response.dto.ts`, embed it in access-token creation/parsing in `src/packages/security-generation/sg.service.ts`, reject versionless legacy access tokens, and rename `createAcessToken` to `createAccessToken` with all call sites updated
- [X] T008 Implement `SessionGuard` and optional-access decorator modes in `src/packages/security-generation/sg.guard.ts`; validate the bearer token through `SecurityGenerationService`, call `PostgresService.getSessionAuth`, deny `SUSPENDED`, compare `access_version`, and attach the authenticated context to the request
- [X] T009 Wire the guard: import `PostgresModule` in `src/packages/security-generation/sg.module.ts`, export `SessionGuard`, and update guard mode usage in `src/packages/authentication/auth.controller.ts` (`login` optional access/refresh, `otp`/`activate`/`logout` required access)

**Checkpoint**: Database primitives, token-version handling, and the session guard are ready; user
stories can now proceed.

---

## Phase 3: User Story 1 - Sign In with Username or Email (Priority: P1) 🎯 MVP

**Goal**: Validate username/email sign-in, preserve generic credential errors and multiple
sessions, and return role/status for every account status while suspended sessions get no usable
protected access.

**Independent Test**: Sign in with a valid username, a valid email, a different letter case, an
unknown identifier, a wrong password, missing fields, an unsupported type, and a suspended
account. Verify one new session per valid sign-in, correct role/status, no session on invalid
credentials, and protected access denied for the suspended session.

### Tests first

- [X] T010 [P] [US1] Add failing service tests to `src/packages/authentication/__tests__/auth.service.spec.ts` and fixtures to `src/packages/authentication/__tests__/auth.testcase.ts` / `src/packages/authentication/__tests__/auth.service.mock.ts` for username login, email login, case-insensitive identifiers, generic `INVALID_CREDENTIALS`, multiple simultaneous sessions, suspended status returned, and access version `0` on new sessions
- [X] T011 [P] [US1] Add failing controller/E2E tests to `src/packages/authentication/__tests__/auth.controller.spec.ts` and `test/auth-login.e2e-spec.ts` for missing/unsupported `type` (`400 [40001]`), missing/empty identifier or password (`422 [40001]`), valid username/email login (`201` with `access_token`, `role`, `status`, refresh cookie), and suspended login followed by a denied protected request (`401 [40004]`)

### Implementation

- [X] T012 [US1] Create `src/packages/authentication/dto/login-query.dto.ts` with `type` restricted to `username | email | token`, and update `src/packages/authentication/dto/login.dto.ts` so `identifier` and `password` are required non-empty strings; do not apply registration password-strength rules to login
- [X] T013 [US1] Update `AuthenticationService.login` and `createSession` in `src/packages/authentication/auth.service.ts` to mint access tokens with access version `0`, preserve role/status for every account status, and avoid blocking credential verification for `SUSPENDED`
- [X] T014 [US1] Update `AuthController.login` in `src/packages/authentication/auth.controller.ts` to use the validated query/body DTOs, reject missing type/fields before the service call, keep the `201 { access_token, role, status }` response, and keep setting the refresh cookie for successful credential verification

**Checkpoint**: User Story 1 is independently testable and deployable; refresh/sign-out remain
separate increments.

---

## Phase 4: User Story 2 - Continue Without Re-entering the Password (Priority: P2)

**Goal**: Exchange a valid refresh cookie for a new access token, reject invalid/expired/
suspended renewals, and never rotate or extend the refresh credential.

**Independent Test**: Start a session, renew with the refresh cookie, verify the access token is
new and usable; then verify expired, malformed, tampered, inactive-session, and suspended-account
renewals are rejected with no `Set-Cookie` response.

### Tests first

- [X] T015 [P] [US2] Add failing service/controller/E2E tests to `src/packages/authentication/__tests__/auth.service.spec.ts`, `src/packages/authentication/__tests__/auth.controller.spec.ts`, and `test/auth-login.e2e-spec.ts` for valid refresh returning only `{ access_token }`, current access version used, expired/malformed/tampered refresh rejection, suspended account rejection (`401 [40003]`), inactive/expired session rejection, and no refresh rotation or `Set-Cookie`

### Implementation

- [X] T016 [US2] Change `AuthenticationService.refresh` in `src/packages/authentication/auth.service.ts` to be async: verify refresh expiry, call `postgres.getSessionAuth`, reject `SUSPENDED`/inactive/expired sessions, and mint an access token with the returned current `access_version`
- [X] T017 [US2] Update the `type=token` branch of `AuthController.login` in `src/packages/authentication/auth.controller.ts` to await `refresh`, return `201 { access_token }` without setting a cookie, and return `401 [40003]` for every refresh failure

**Checkpoint**: US1 and US2 work independently; a valid refresh survives access expiry without
changing the refresh cookie.

---

## Phase 5: User Story 3 - Sign Out of the Current Access Session (Priority: P3)

**Goal**: End only the current access credential, keep the refresh credential and session
renewable until normal expiry, leave other sessions untouched, and reject stale/already-ended
access credentials.

**Independent Test**: Sign in twice, sign out one session, verify its old access token fails,
its refresh cookie still mints a usable access token, and the other session still works. Verify a
second sign-out with the old access token fails and no refresh cookie is cleared.

### Tests first

- [X] T018 [P] [US3] Add failing service/controller/E2E tests to `src/packages/authentication/__tests__/auth.service.spec.ts`, `src/packages/authentication/__tests__/auth.controller.spec.ts`, and `test/auth-login.e2e-spec.ts` for sign-out success (`200`, empty body), old access rejection (`401 [40004]` or `[45005]` for an already-ended token), renewal after sign-out, other sessions unaffected, no `Set-Cookie` clearing, stale access rejection, and suspended/malformed access rejection

### Implementation

- [X] T019 [US3] Change `AuthenticationService.logout` in `src/packages/authentication/auth.service.ts` to call `postgres.endAccess(token.session_id, token.user_id, token.access_version)` and map `INVALID_SESSION` to the existing sign-out failure contract
- [X] T020 [US3] Update `AuthController.logout` in `src/packages/authentication/auth.controller.ts` to keep required access authorization, return `200` with an empty body, and stop clearing the `refresh_token` cookie

**Checkpoint**: All three user stories are independently functional; sign-out and renewal now
match the clarified behavior.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, regression verification, and security checks across all stories.

- [X] T021 [P] Update `docs/database/authentication.md` with `ACCESS_VERSION`, `GET_SESSION_AUTH`, `END_ACCESS`, the new sign-out semantics, and the `LOGOUT` deprecation
- [X] T022 [P] Update `docs/backend/authentication.md` with login validation, suspended-account enforcement, refresh suspension checks, sign-out retaining the refresh cookie, and non-rotating refresh behavior
- [X] T023 [P] Update `docs/API.md` with the same request/response/error contract changes and remove the claim that logout clears the refresh cookie
- [X] T024 [P] Execute the scenarios in `specs/002-user-login/quickstart.md` against a database carrying `contracts/database-session.md`, and record/fix any contract mismatches in `specs/002-user-login/quickstart.md`
- [X] T025 Run `npm test`, `npm run test:e2e`, `npm run lint`, and `npm run build` from `package.json`; fix all failures without weakening the new assertions
- [X] T026 Review `src/packages/authentication/auth.controller.ts`, `src/packages/authentication/auth.service.ts`, and `src/packages/security-generation/sg.guard.ts` for password/hash logging, generic credential/refresh/access errors, and absence of suspension-state leakage in protected responses

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Starts immediately.
- **Foundational (Phase 2)**: Depends on T001; T005 (database contract) is an external deployment
  prerequisite for production verification. All user stories depend on Phase 2.
- **User Story 1 (Phase 3)**: Depends on Phase 2. This is the MVP.
- **User Story 2 (Phase 4)**: Depends on Phase 2; can use an access credential from US1 or from a
  fixture.
- **User Story 3 (Phase 5)**: Depends on Phase 2; independently testable with a session fixture.
- **Polish (Phase 6)**: Depends on all desired user stories.

### Story Dependencies

- **US1**: No dependency on US2/US3.
- **US2**: No functional dependency on US1; it needs a valid refresh credential/session fixture.
- **US3**: No functional dependency on US1/US2; it needs a valid access credential/session
  fixture. US2 is useful for verifying renewal after sign-out.
- US2 and US3 both edit `auth.service.ts` and `auth.controller.ts`; sequential implementation is
  safest for a single developer. Parallel work requires coordinating or separating those file
  edits.

### Within Each Story

1. Write the test task and confirm it fails.
2. Create/validate DTOs where applicable (US1).
3. Implement service behavior.
4. Implement controller behavior.
5. Run the story's unit, integration, and E2E tests.
6. Stop at the checkpoint before moving to the next priority.

### Parallel Opportunities

- T002, T003, T004, and T005 are independent foundational work and may run in parallel.
- T006 and T007 are independent implementations and may run in parallel after their tests exist.
- T010 and T011 are parallel test-writing tasks in US1.
- T015 is the only US2 test-writing task; T018 is the only US3 test-writing task.
- T021, T022, and T023 can update separate documentation files in parallel.
- Do not parallelize tasks that touch the same file without coordinating the edits.

---

## Parallel Example: User Story 1

```bash
# Write the two US1 test groups in parallel:
Task: "Add failing service tests for username/email/suspended login in src/packages/authentication/__tests__/auth.service.spec.ts and fixtures in auth.testcase.ts / auth.service.mock.ts"
Task: "Add failing controller/E2E tests for validation and suspended login in src/packages/authentication/__tests__/auth.controller.spec.ts and test/auth-login.e2e-spec.ts"
```

## Parallel Example: Foundational Work

```bash
# Independent foundation tasks:
Task: "Add failing access-version token tests in src/packages/security-generation/__tests__/sg.service.spec.ts"
Task: "Add failing getSessionAuth/endAccess tests and mocks in src/packages/postgres/__tests__/"
Task: "Add failing SessionGuard tests in src/packages/security-generation/__tests__/sg.guard.spec.ts"
Task: "Apply access_version, GET_SESSION_AUTH, and END_ACCESS per specs/002-user-login/contracts/database-session.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational, including the database contract.
3. Complete Phase 3: User Story 1.
4. **STOP and VALIDATE**: Run US1 unit/controller/E2E tests and the login portion of
   `quickstart.md`.
5. Deploy/demo the sign-in flow.

### Incremental Delivery

1. Setup + Foundational → shared session primitives ready.
2. US1 → sign-in is usable and suspended accounts are reported/denied protected access.
3. US2 → silent renewal works and respects suspension.
4. US3 → sign-out ends access while renewal remains usable.
5. Polish → documentation and full regression verification.

### Parallel Team Strategy

After Phase 2:

- Developer A: US1 login validation and service/controller changes.
- Developer B: US2 refresh behavior.
- Developer C: US3 sign-out behavior.
- Coordinate `auth.service.ts` and `auth.controller.ts` edits because US2/US3 share both files;
  alternatively implement in priority order on one branch.

---

## Notes

- TDD is mandatory: each test task must fail before its implementation task is started.
- The database contract in `contracts/database-session.md` is a deployment prerequisite; do not
  claim production readiness until it is applied.
- New sessions must have `ACCESS_VERSION = 0`; any session with a different value at creation
  breaks the initial access token.
- Do not add caching for account status; suspension must be enforced on the next request.
- Do not log request bodies or password/hash material.
- Pre-existing package naming cleanup (`decorartors/`, `__test__/`) is tracked by the constitution
  sync report and is outside this feature's behavior scope; only the touched `sg.mock.ts` helper is
  moved here.
