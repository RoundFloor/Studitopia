# Phase 0 Research: Authentication User Flows

**Feature**: `001-authentication-user-flows`
**Date**: 2026-11-14
**Sources**: `specs/001-authentication-user-flows/spec.md`,
`docs/architecture/frontend-architecture.md`,
`docs/architecture/component-catalog.md`,
`docs/architecture/api-catalog.md`, `.specify/memory/constitution.md`,
and the current `src/` implementation.

No `NEEDS CLARIFICATION` items remain in the plan's Technical Context. The
decisions below resolve implementation questions that affect the five journeys.

## 1. Authentication state and reactivity

- **Decision**: Preserve the existing `AuthStore` persistence keys (`status`,
  `role`, `access`) but add a subscribe/notify mechanism and expose a
  `useAuthStatus`-style hook built on React's `useSyncExternalStore`. Guards and
  pages read through the hook rather than calling `AuthStore.getStatus()` once
  per render.
- **Rationale**: Guards currently read a `localStorage` snapshot and do not
  re-render when auth state changes, which makes redirects unreliable after
  bootstrap, login, verification, and logout. A subscription keeps the existing
  storage contract while fixing the behavior without adding a dependency.
- **Alternatives considered**:
  - Replace `AuthStore` with Zustand (already installed): larger redesign of
    existing infrastructure, unnecessary for this scope.
  - React Context provider: requires additional provider wiring and does not
    solve persistence by itself.
  - Leave snapshot reads: rejected because guards can act on stale status.

## 2. Session restoration and token refresh

- **Decision**: Keep the existing single-flight `refreshRequest()` pattern and
  `AuthInitializer` mount refresh. Correct the response handling to read the
  access token from the documented `{ access_token }` response, and set auth
  state only after the token is extracted. Introduce an explicit "initializing"
  state while restoration is in progress.
- **Rationale**: The current refresh path treats the whole parsed response as the
  token and `AuthStatus.LOADING` is never assigned. Both defects make session
  restoration and the `401` retry unreliable.
- **Alternatives considered**:
  - Persist a longer-lived token and skip refresh: rejected because backend
    session validity is authoritative.
  - Remove automatic restoration: rejected because users would be signed out on
    every reload.

## 3. Cross-origin refresh cookie

- **Decision**: Send refresh-token requests with credentials included, and make
  the API base URL configurable through a build-time environment value with the
  current production URL as fallback. Document the CORS/allowed-origin
  requirement for the backend.
- **Rationale**: The backend sets an HTTP-only refresh cookie scoped to the login
  endpoint. The current client comments out `credentials: "include"`, so a
  cross-origin browser will not attach the cookie. Without credentials, session
  restoration and refresh-on-401 cannot work.
- **Alternatives considered**:
  - Same-origin development proxy only: does not solve production cross-origin
    deployment.
  - Store the refresh token in JavaScript: rejected; it weakens the HTTP-only
    cookie design.

## 4. API error model and runtime validation

- **Decision**: Correct the shared error-code map (notably validation error
  `40001`), add the codes used by these journeys, and add small runtime type
  guards for consumed responses in `shared/api` or the feature module. Keep
  `apiError` as the single error type.
- **Rationale**: The backend returns status plus arrays of numeric codes, and
  the current client casts JSON without validation. Precise guards satisfy the
  constitution's boundary-validation requirement without adding a schema
  dependency.
- **Alternatives considered**:
  - Add Zod or another schema library: new dependency, not justified for a small
    auth surface.
  - Trust raw casts: rejected; violates the type-safety principle.

## 5. Form validation strategy

- **Decision**: Implement pure, testable field validators for display name,
  username, email, password, confirmation, and identifier. Validators live with
  the owning feature (or a small auth-shared module inside
  `features/authentication`) and return field state plus a message. Pages own
  form state and wire validators to the shared `Input` component.
- **Rationale**: The spec requires field-specific messages, submission gating,
  and server-field mapping. Pure validators are easy to unit test under TDD and
  keep pages readable.
- **Alternatives considered**:
  - Add a form library: new dependency and migration cost; not required.
  - Validate only on submit: rejected; the spec requires inline feedback before
    submission.

## 6. OTP challenge persistence and input behavior

- **Decision**: Keep OTP timestamps in `sessionStorage` under a single
  `otp_<purpose>` key, reuse the existing six-input experience, and add explicit
  helpers for save/get/clear with the correct key. Restore an unexpired
  challenge when the screen mounts; otherwise request a new code.
- **Rationale**: The backend returns only `created_time` and `expired_time`; the
  six-digit code stays in email. Session storage fits the short-lived,
  tab-scoped nature of the challenge and survives a refresh.
- **Alternatives considered**:
  - Store the challenge in `localStorage`: rejected; the challenge should not
    outlive the tab/session.
  - Use one masked input: simpler, but loses the established six-box UX.
  - Add a third-party OTP input: unnecessary new dependency.

## 7. OTP countdown and cleanup

- **Decision**: Drive the countdown from the stored `expired_time`, update once
  per second, and cancel the scheduled timer when the component unmounts or the
  challenge is replaced. Fix the verification cleanup to remove the same key
  that was saved.
- **Rationale**: The current recursive timer is not cancelled and the clear call
  uses the wrong key (`otp_otp_active` instead of `otp_active`), leaving stale
  challenges and potential post-unmount updates.
- **Alternatives considered**:
  - Track elapsed time with a fixed interval: equivalent, but still needs
    cleanup and absolute-expiry handling.
  - Ignore stale persistence: rejected; it breaks resend and refresh behavior.

## 8. Logout action and redirect

- **Decision**: Add an accessible sign-out action to the authenticated shell
  (activate the main layout or render the action on the authenticated home), keep
  the existing logout mutation, navigate to `/auth/login` on success, and clear
  only auth-owned keys. On failure, keep the session and show a retry message.
- **Rationale**: A logout capability exists in the feature layer but is not
  reachable from the UI, and it currently navigates to the unmatched `/login`
  path. The spec requires a reachable action and accurate failure behavior.
- **Alternatives considered**:
  - Clear local state before the request completes: rejected; it can falsely end
    the visible session while the server session remains active.
  - Rely on browser tab close: rejected; does not satisfy the user story.

## 9. Password recovery without a backend service

- **Decision**: Implement the recovery screen as an interaction-only journey
  behind an explicit capability flag that is disabled in this release. When
  unavailable, the screen explains the limitation, never claims an email was
  sent, and provides a clear back-to-sign-in action. When the service becomes
  available, the same screen can submit an identifier behind the flag and show a
  generic confirmation.
- **Rationale**: The spec explicitly excludes simulating recovery. A capability
  boundary prevents accidental use of a non-existent service and keeps the UI
  honest.
- **Alternatives considered**:
  - Hide the recovery entry point entirely: rejected; the spec requires a visible
    entry point and a clear explanation.
  - Fake a successful submission: rejected; misleading and violates the spec.
  - Build a speculative endpoint integration: rejected; no backend contract.

## 10. Routing and guard enforcement

- **Decision**: Keep routing centralized in
  `app/providers/router/router-provider.tsx`. Keep `PublicOnly` and `AuthGuard`
  for public and protected routes, and use the existing OTP route with an
  explicit pending-challenge check. Use a shared `OtpGuard` (or equivalent guard
  logic) instead of relying only on location state. Normalize all auth paths to
  the `/auth/...` form.
- **Rationale**: The constitution requires centralized routing and consistent
  route protection. The current OTP route is unguarded, `OtpGuard` is unused, and
  `auth/set_password` is inconsistent.
- **Alternatives considered**:
  - Guard only inside pages: rejected; bypassable and inconsistent with the
    established routing architecture.
  - Keep location-state-only access: rejected; direct navigation and refresh
    handling are fragile.

## 11. Accessibility of shared controls and forms

- **Decision**: Enhance `TickBox` with checkbox semantics (`role="checkbox"`,
  `aria-checked`, keyboard activation, focusability) or replace its internal
  element with a native checkbox styled by the existing CSS. Associate every
  label and input with `htmlFor`/`id`, add accessible names to password/OTP
  controls, and announce errors with appropriate live-region behavior or focus
  movement.
- **Rationale**: The constitution requires keyboard-accessible, labeled
  controls. Registration terms acceptance uses `TickBox`, and the current
  div-only implementation cannot be operated by keyboard.
- **Alternatives considered**:
  - Use native checkboxes directly in each page: duplicates shared behavior and
    breaks visual consistency.
  - Leave div controls and document the gap: rejected; the spec requires
    keyboard completion.

## 12. Testing strategy

- **Decision**: Follow TDD with Vitest, jsdom, React Testing Library, and
  `user-event`. Add unit tests for validators and stores, component tests for
  forms and OTP input, and integration tests for route guards/redirects using
  `createMemoryRouter`. Mock `fetch` with typed fixtures and `vi.stubGlobal`;
  do not add a mocking library.
- **Rationale**: This matches the installed test stack and keeps the test
  boundary at user behavior. TDD satisfies the constitution's testing
  principle.
- **Alternatives considered**:
  - Add MSW: useful but a new dependency; not required for controlled auth
    fixtures.
  - Test only shared UI: rejected; the five journeys are the critical logic.

## 13. Styling and responsive behavior

- **Decision**: Reuse the existing global tokens, `AuthLayout`, and shared UI
  components. Add responsive rules to the auth shell and forms so they remain
  usable from 320px upward. Do not introduce a CSS framework.
- **Rationale**: The constitution requires consistent design and responsive by
  default. The current layout has no media queries.
- **Alternatives considered**:
  - New component/CSS framework: unnecessary and inconsistent with the existing
    design system.
  - Desktop-only support: violates the spec's success criteria.

## 14. Security and privacy cleanup

- **Decision**: Remove access-token and OTP lifecycle logging, ensure credentials
  and passcodes are never persisted beyond their required lifetime, scope
  `AuthStore.clear()` to auth keys, and keep authentication/authorization
  enforcement on the backend.
- **Rationale**: The current client logs the access token, calls
  `localStorage.clear()`, and logs OTP activity. These are concrete security and
  privacy issues that would otherwise undermine the feature.
- **Alternatives considered**:
  - Keep logging behind a debug flag: still risks production leakage; rejected.
  - Move all session state to memory: safer against XSS but requires a larger
    redesign and still relies on the refresh cookie.

## 15. Dependency and layer boundaries

- **Decision**: Break the existing `shared/api/client.ts` → `entities/session`
  import by introducing a token accessor contract owned by `shared/api` and
  wired from the app/entity layer. Keep feature code in
  `features/authentication/*`, page composition in `pages/auth/*`, and shared UI
  free of auth logic.
- **Rationale**: FSD forbids shared depending on entities, and the constitution
  requires dependency rules to be respected. The auth feature is the right time
  to correct this boundary because it touches every session interaction.
- **Alternatives considered**:
  - Leave the upward import: rejected; violates the architecture.
  - Move `apiRequest` into entities: rejected; shared transport should not depend
    on domain modules.
