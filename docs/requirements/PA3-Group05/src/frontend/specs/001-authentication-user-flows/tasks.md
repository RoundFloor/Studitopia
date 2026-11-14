---
description: "Task list for authentication user flows implementation"
---

# Tasks: Authentication User Flows

**Input**: Design documents from `/specs/001-authentication-user-flows/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/auth-api.md`, `contracts/auth-routes.md`, `quickstart.md`

**Tests**: Included because the project constitution mandates test-driven
development and the plan/quickstart define required automated coverage. Write
each test task first and confirm it fails before implementing the matching code.

**Organization**: Tasks are grouped by user story so each P1/P2/P3 slice can be
implemented, tested, and delivered independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: `[US1]` through `[US5]`, mapping to the user stories in `spec.md`
- Every task includes an exact file path or paths

## Path Conventions

Single-project frontend:

- Application source: `src/`
- Co-located tests: `*.test.ts(x)` next to the implementation
- Shared test helpers: `src/test/`
- Feature documents: `specs/001-authentication-user-flows/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare environment typing and reusable test utilities. No new
runtime dependency is added.

- [X] T001 [P] Add `VITE_API_BASE_URL` typing for `import.meta.env` in `src/vite-env.d.ts` and document the fallback in `.env.example`
- [X] T002 [P] Create typed authentication response fixtures for active/pending accounts, OTP challenges, and API errors in `src/test/auth-fixtures.ts`
- [X] T003 [P] Create a reusable `fetch` mock helper with request capture and typed responses in `src/test/mock-fetch.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Correct shared authentication infrastructure required by every user
story. No user story can be completed until this phase is done.

**CRITICAL**: This phase resolves the FSD `shared` → `entities` violation, makes
auth state reactive, fixes the refresh/cookie contract, and centralizes redirect
behavior.

### Tests for Foundational Work

- [X] T004 [P] Write failing tests for response type guards (`LoginResponse`, `RefreshResponse`, `OtpTimestampsResponse`, unknown status handling) in `src/shared/api/guards.test.ts`
- [X] T005 [P] Write failing tests for corrected error codes including `40001`, `40002`, `40003`, `40004`, `40029`, `45005`, and `48001` in `src/shared/api/error.test.ts`
- [X] T006 [P] Write failing tests for API client behavior: credential inclusion, refresh `{ access_token }` extraction, single-flight refresh, one retry on `401`, configurable base URL, and no token logging in `src/shared/api/client.test.ts`
- [X] T007 [P] Write failing tests for `AuthStore` subscription/notification, scoped `clear()` that removes only `status`, `role`, and `access`, and persistence in `src/entities/session/auth-store.test.ts`
- [X] T008 [P] Write failing tests for the reactive auth-status hook in `src/entities/session/use-auth-status.test.tsx`
- [X] T009 [P] Write failing tests for `AuthGuard`, `OtpGuard`, and `PublicOnly` redirects across `LOADING`, `UNAUTHENTICATED`, `PENDING_OTP`, and `AUTHENTICATED` in `src/app/guard/guards.test.tsx`
- [X] T010 [P] Write failing route integration tests for public, pending, and protected redirects in `src/app/providers/router/router-provider.test.tsx`

### Implementation for Foundational Work

- [X] T011 [P] Implement runtime response guards in `src/shared/api/guards.ts` (T004)
- [X] T012 [P] Correct and extend the error-code map in `src/shared/api/error.ts`; `VALIDATION_ERROR` MUST be `40001` (T005)
- [X] T013 Create the shared token-access contract (`getAccessToken`, `setAccessToken`, `clearAuth`) in `src/shared/api/token-access.ts` so `shared` does not import `entities`
- [X] T014 Update `src/shared/api/client.ts` to use the token-access contract, include browser credentials, read `access_token` from refresh responses, use `VITE_API_BASE_URL` with the production fallback, and remove token logging (T006, T011, T013)
- [X] T015 Wire the token-access contract to `AuthStore` from the app layer in `src/app/main.tsx` before rendering the application (T013)
- [X] T016 Update `src/shared/api/index.ts` to export the API client functions, error model, and guards used by features
- [X] T017 Add subscribe/notify support and scoped auth clearing to `src/entities/session/auth-store.ts` (T007)
- [X] T018 Implement `useAuthStatus` with `useSyncExternalStore` in `src/entities/session/use-auth-status.ts` (T008, T017)
- [X] T019 Update `src/app/providers/auth/auth-initializer.tsx` to set `LOADING` during restoration, persist the extracted token, and set `UNAUTHENTICATED` on refresh failure (T014)
- [X] T020 [P] Update `src/app/guard/auth-guard.tsx` to use `useAuthStatus`, show a loading view, and preserve the redirect contract (T009, T018)
- [X] T021 [P] Update `src/app/guard/otp-guard.tsx` to use `useAuthStatus` and enforce the OTP redirect contract (T009, T018)
- [X] T022 [P] Update `src/app/guard/public-only.tsx` to use `useAuthStatus`, show loading instead of rendering nothing, and preserve the public redirect contract (T009, T018)
- [X] T023 Wire `OtpGuard` into the OTP route and normalize all auth paths to `/auth/...` in `src/app/providers/router/router-provider.tsx` (T010, T021)

**Checkpoint**: Foundation ready. Auth state is reactive, the API boundary is
compliant, and redirects can be tested independently.

---

## Phase 3: User Story 1 - Sign in with username or email (Priority: P1) - MVP

**Goal**: A visitor signs in with username or email and password, reaches the
authenticated area when active, and is routed to verification when pending.

**Independent Test**: Using known active, pending, and invalid accounts, submit
the sign-in form and confirm the destination and messages without relying on
registration or OTP implementation.

### Tests for User Story 1

- [X] T024 [P] [US1] Write failing tests for identifier/password validation (non-empty identifier, non-empty password, email detection when the identifier contains `@`) in `src/features/authentication/login/validation.test.ts`
- [X] T025 [P] [US1] Write failing tests for login mutation behavior: active account, pending account, invalid credentials, and network failure in `src/features/authentication/login/login.test.tsx`
- [X] T026 [P] [US1] Write failing component tests for submission gating, generic credential errors, pending redirect, loading state, and duplicate prevention in `src/pages/auth/login/LoginPage.test.tsx`

### Implementation for User Story 1

- [X] T027 [P] [US1] Implement pure sign-in validators in `src/features/authentication/login/validation.ts` (T024)
- [X] T028 [US1] Update `src/features/authentication/login/login.ts` and `src/features/authentication/login/type.ts` for typed errors, active/pending status handling, and duplicate-safe mutation behavior (T025)
- [X] T029 [US1] Update `src/pages/auth/login/LoginPage.tsx` to use validators, gate submission, map `18456` to a generic message on both fields, preserve the identifier on failure, and expose accessible labels/errors (T026, T027, T028)
- [X] T030 [US1] Update `src/pages/auth/login/LoginPage.css` for disabled, error, focus, and responsive states
- [X] T031 [US1] Remove or clearly disable unimplemented remember-me/third-party controls and avoid false success in `src/pages/auth/login/LoginPage.tsx` and `src/pages/auth/login/LoginPage.css`

**Checkpoint**: US1 is fully functional and independently testable.

---

## Phase 4: User Story 2 - Create an account (Priority: P1)

**Goal**: A visitor creates a pending account with valid data, terms acceptance,
and field-specific validation, then is directed to email verification.

**Independent Test**: Complete the registration form with valid data and confirm
that a pending account is created and the visitor is routed into verification;
submit invalid values and confirm field-level messages.

### Tests for User Story 2

- [X] T032 [P] [US2] Write failing validator tests covering display name `^[a-zA-Z0-9]+([X][a-zA-Z0-9]+)*$` and length 8–32; username `^[a-z][a-z0-9]*([.][a-z0-9]+)*$` and length 8–32; valid email at most 254 characters; password length 8–32 with at least one lowercase, uppercase, digit, and special character and no null character; matching confirmation; and terms acceptance in `src/features/authentication/register/validation.test.ts`
- [X] T033 [P] [US2] Write failing tests for registration mutation success, pending status, field-level server errors, duplicate email/username, unregistered domain, and service failure in `src/features/authentication/register/register.test.tsx`
- [X] T034 [P] [US2] Write failing component tests for inline validation, submission gating, terms warning, server error mapping, data preservation, and accessible labels in `src/pages/auth/register/RegisterPage.test.tsx`
- [X] T035 [P] [US2] Write failing accessibility tests for keyboard activation, `role="checkbox"`, `aria-checked`, and focus visibility in `src/shared/ui/tick_box/TickBox.test.tsx`

### Implementation for User Story 2

- [X] T036 [P] [US2] Implement pure registration validators with the exact constraints from T032 in `src/features/authentication/register/validation.ts`
- [X] T037 [US2] Update `src/features/authentication/register/register.ts` and `src/features/authentication/register/type.ts` for typed responses, `PENDING_OTP`, and error-code-to-field mapping (T033)
- [X] T038 [US2] Update `src/pages/auth/register/RegisterPage.tsx` to use validators, gate submission, map server errors, require terms, preserve non-sensitive data, associate labels/errors, and handle unavailable legal destinations without dead links (T034, T036, T037)
- [X] T039 [US2] Update `src/pages/auth/register/RegisterPage.css` for error, focus, and responsive states
- [X] T040 [US2] Enhance `TickBox` with checkbox semantics and keyboard activation in `src/shared/ui/tick_box/TickBox.tsx` and `src/shared/ui/tick_box/TickBox.module.css` (T035)

**Checkpoint**: US2 is fully functional and independently testable.

---

## Phase 5: User Story 3 - Verify email with a one-time passcode (Priority: P1)

**Goal**: A pending user receives a six-digit code, sees a countdown, handles
invalid/expired/resend cases, and activates the account.

**Independent Test**: With a pending account, request a code and verify valid,
invalid, expired, and resent codes, confirming activation and error behavior.

### Tests for User Story 3

- [X] T041 [P] [US3] Write failing tests for OTP timestamp save/get/clear using the exact `otp_active` key in `src/entities/otp/otp-store.test.ts`
- [X] T042 [P] [US3] Write failing tests for OTP creation/verification mutations, correct cleanup, invalid/expired handling, and rate limiting in `src/features/authentication/otp/otp.test.tsx`
- [X] T043 [P] [US3] Write failing component tests for auto-send, challenge restoration, countdown, six-digit gating, paste, invalid/expired behavior, resend gating, timer cleanup, and accessible announcements in `src/pages/auth/otp/OtpPage.test.tsx`

### Implementation for User Story 3

- [X] T044 [P] [US3] Fix OTP timestamp storage and clearing to use `otp_<purpose>` consistently in `src/entities/otp/otp-store.ts` (T041)
- [X] T045 [US3] Update `src/features/authentication/otp/otp.ts` and `src/features/authentication/otp/type.ts` for typed OTP responses, correct cleanup, and error mapping (T042, T044)
- [X] T046 [US3] Update `src/pages/auth/otp/OtpPage.tsx` to auto-send only without a valid challenge, restore timestamps, cancel timers on unmount, require six digits, handle paste/backspace/navigation, and announce status changes (T043, T045)
- [X] T047 [US3] Update `src/pages/auth/otp/OtpPage.css` for error, focus, and responsive states

**Checkpoint**: US3 is fully functional and independently testable.

---

## Phase 6: User Story 4 - Sign out (Priority: P2)

**Goal**: An active user signs out from a reachable action, the current session
ends, other sessions remain active, and protected content becomes unreachable.

**Independent Test**: With an active session, choose sign out and confirm the
redirect, blocked protected navigation, failure behavior, and duplicate
prevention.

### Tests for User Story 4

- [X] T048 [P] [US4] Write failing tests for logout success, failure, duplicate prevention, scoped clearing, and navigation to `/auth/login` in `src/features/authentication/logout/logout.test.tsx`
- [X] T049 [P] [US4] Write failing tests for the accessible render, pending state, and error feedback of the logout action in `src/features/authentication/logout/LogoutButton.test.tsx`

### Implementation for User Story 4

- [X] T050 [US4] Update `src/features/authentication/logout/logout.ts` to navigate to `/auth/login`, avoid false success, clear only auth data, and prevent duplicate requests (T048)
- [X] T051 [P] [US4] Create the accessible logout action in `src/features/authentication/logout/LogoutButton.tsx` and `src/features/authentication/logout/LogoutButton.module.css` (T049)
- [X] T052 [US4] Activate the authenticated shell with the logout action in `src/app/layouts/main/MainLayout.tsx`, `src/app/layouts/main/MainLayout.css`, and wire it in `src/app/providers/router/router-provider.tsx` (T050, T051)

**Checkpoint**: US4 is fully functional and independently testable.

---

## Phase 7: User Story 5 - Recover a forgotten password (Priority: P3)

**Goal**: A visitor opens recovery, submits an identifier, and is honestly told
that recovery is unavailable; no reset is simulated or claimed.

**Independent Test**: Open recovery from sign in, submit valid and invalid
identifiers, and confirm the unavailable message, generic wording, no network
request, and back navigation.

### Tests for User Story 5

- [X] T053 [P] [US5] Write failing tests for recovery identifier validation and unavailable/rate-limited outcomes in `src/features/authentication/recover_password/recovery.test.ts`
- [X] T054 [P] [US5] Write failing component tests for entry, empty-identifier blocking, unavailable messaging, no request/no false success, generic wording, status announcement, and back navigation in `src/pages/auth/recover_password/RecoverPassword.test.tsx`

### Implementation for User Story 5

- [X] T055 [P] [US5] Create the disabled recovery capability and typed outcome helpers in `src/features/authentication/recover_password/recovery.ts` and `src/features/authentication/recover_password/type.ts` (T053)
- [X] T056 [US5] Update `src/pages/auth/recover_password/RecoverPasswordPage.tsx` to validate the identifier, show the unavailable state without a request, use generic wording, announce status, and return to `/auth/login` (T054, T055)
- [X] T057 [US5] Update `src/pages/auth/recover_password/RecoverPassword.css` for error, focus, and responsive states

**Checkpoint**: US5 is fully functional and independently testable.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Close cross-journey gaps and verify the complete feature.

- [X] T058 [P] Add a catch-all not-found route and consistent error handling in `src/app/providers/router/router-provider.tsx` and `src/pages/route_error/RouteErrorPage.tsx`
- [X] T059 [P] Add responsive rules for the auth shell from 320px upward in `src/app/layouts/auth/AuthLayout.css`
- [X] T060 [P] Audit and fix label/error associations, focus movement, and announcements across `src/pages/auth/login/LoginPage.tsx`, `src/pages/auth/register/RegisterPage.tsx`, `src/pages/auth/otp/OtpPage.tsx`, and `src/pages/auth/recover_password/RecoverPasswordPage.tsx`
- [X] T061 [P] Remove remaining debug logging from `src/shared/api/client.ts` and `src/features/authentication/otp/otp.ts`
- [X] T062 [P] Add cross-journey integration tests for session restoration, authenticated/public redirects, and sign-out back navigation in `src/app/providers/router/router-provider.test.tsx`
- [X] T063 [P] Update `docs/architecture/component-catalog.md` and `docs/architecture/frontend-architecture.md` to reflect resolved auth infrastructure and any remaining limitations
- [X] T064 [P] Perform a security review confirming no credentials, tokens, refresh cookies, or OTP values appear in logs or browser storage in `src/shared/api/client.ts`, `src/shared/api/token-access.ts`, `src/entities/session/auth-store.ts`, `src/entities/otp/otp-store.ts`, and `src/features/authentication/otp/otp.ts`
- [X] T065 Run `npm test`, `npm run lint`, and `npm run build`; fix failures in the affected `src/` files according to `specs/001-authentication-user-flows/plan.md`
- [X] T066 Execute the manual scenarios in `specs/001-authentication-user-flows/quickstart.md` and record remaining limitations in `specs/001-authentication-user-flows/plan.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks every user story.
- **User Stories (Phase 3–7)**: Depend on Foundational completion. They can run in
  parallel once Phase 2 is complete, but the recommended delivery order is US1 →
  US2 → US3 → US4 → US5.
- **Polish (Phase 8)**: Depends on the desired user stories being complete.

### User Story Dependencies

- **US1 (P1)**: Foundational only. No dependency on other stories.
- **US2 (P1)**: Foundational only. Produces pending accounts for US3, but can be
  tested with a seeded pending account.
- **US3 (P1)**: Foundational only. Can be tested with a seeded pending account;
  integrates naturally after US2.
- **US4 (P2)**: Foundational only, but realistically follows US1 because it needs
  an authenticated session to demonstrate.
- **US5 (P3)**: Foundational only. Independent of all other stories.

### Within Each User Story

1. Write the listed tests first and confirm they fail.
2. Implement validators/types before mutation hooks.
3. Implement mutation hooks before pages.
4. Update styles and accessibility after behavior is correct.
5. Stop at the checkpoint and validate the story independently.

### Parallel Opportunities

- Setup: T001, T002, and T003 are independent files.
- Foundational tests: T004–T010 can be authored in parallel.
- Foundational implementation: T011, T012, and T017 are independent; T020–T022
  are independent after T018; all remaining foundational tasks follow the
  token-access/client chain.
- US1: T024–T026 are parallel tests; T027 can proceed in parallel with T028.
- US2: T032–T035 are parallel tests; T036 and T040 are independent; T037 follows
  T036; T038/T039 follow T037.
- US3: T041–T043 are parallel tests; T044 and T045 form the store/feature chain;
  T046/T047 follow.
- US4: T048 and T049 are parallel tests; T051 can proceed in parallel with T050;
  T052 follows T050/T051.
- US5: T053 and T054 are parallel tests; T055 precedes T056; T057 follows T056.
- Polish: T058–T064 are independent files and can run in parallel after stories;
  T065/T066 are final verification.

---

## Parallel Example: User Story 1

```bash
# Tests can be authored together:
Task: "Write sign-in validator tests in src/features/authentication/login/validation.test.ts"
Task: "Write login mutation tests in src/features/authentication/login/login.test.tsx"
Task: "Write LoginPage component tests in src/pages/auth/login/LoginPage.test.tsx"

# Validators and feature mutation can proceed on separate files:
Task: "Implement sign-in validators in src/features/authentication/login/validation.ts"
Task: "Update login feature in src/features/authentication/login/login.ts"
```

## Parallel Example: Foundational Work

```bash
# After T018, these guards are independent files:
Task: "Update AuthGuard in src/app/guard/auth-guard.tsx"
Task: "Update OtpGuard in src/app/guard/otp-guard.tsx"
Task: "Update PublicOnly in src/app/guard/public-only.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: US1 sign-in.
4. Stop and validate US1 with active, pending, and invalid accounts.
5. Deploy or demo the sign-in journey.

### Incremental Delivery

1. Setup + Foundational → shared auth infrastructure ready.
2. US1 sign-in → validate and demo.
3. US2 registration → validate pending-account creation.
4. US3 OTP verification → validate activation end to end.
5. US4 sign out → validate session lifecycle.
6. US5 recovery unavailable → validate honest UI and no false success.
7. Polish → accessibility, responsiveness, security, docs, and final checks.

### Parallel Team Strategy

After Phase 2:

- Developer A: US1 sign-in
- Developer B: US2 registration
- Developer C: US3 OTP verification
- Developer D: US4 sign out and US5 recovery (small stories)

Each developer owns their test-first slices and stops at the story checkpoint
before cross-story integration.

---

## Notes

- `[P]` tasks touch different files and must not depend on an incomplete task.
- `[US#]` labels map every story task to the specification for traceability.
- Tests are included due to the constitution's TDD requirement; verify they fail
  before implementing.
- Do not add new runtime dependencies; reuse the existing stack and shared UI.
- Keep shared UI feature-agnostic; auth behavior belongs in feature/page layers.
- Run `npm test`, `npm run lint`, and `npm run build` after each story
  checkpoint.
