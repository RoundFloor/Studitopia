# Implementation Plan: Authentication User Flows

**Branch**: `001-authentication-user-flows` | **Date**: 2026-11-14 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-authentication-user-flows/spec.md`

**Note**: This plan follows the project constitution, the existing FSD layout, and
the current `src/` implementation. It ends after Phase 1 design; task breakdown
is produced by `/speckit-tasks`.

## Summary

Implement and harden the frontend for five authentication journeys: sign in with
username or email, registration, email verification by six-digit OTP, forgot
password (interaction-only because no recovery service exists), and sign out.
The feature reuses the existing React/TypeScript runtime, TanStack Query mutation
hooks, centralized router and guards, `AuthLayout`, and shared UI kit.

The plan also corrects existing authentication infrastructure that directly
blocks the spec: stale non-reactive auth state, incorrect refresh response
handling, missing cross-origin cookie credentials, access-token logging,
incorrect error codes, unreachable logout, OTP timer/cleanup defects, and
accessibility gaps in the shared tick control. Password recovery is explicitly
gated as unavailable and never simulates success.

## Technical Context

**Language/Version**: TypeScript `~6.0.2`, React `^19.2.8`, JSX with
`react-jsx`, target ES2023.

**Primary Dependencies**: `react`, `react-dom`, `react-router` `^8.5.0`,
`@tanstack/react-query` `^5.104.5`. No new runtime dependency is planned.

**Storage**: Browser `localStorage` for the auth snapshot (`status`, `role`,
`access`), `sessionStorage` for OTP timestamps (`otp_active`), and an HTTP-only
refresh-token cookie managed by the backend. Server data remains backend-owned.

**Testing**: Vitest `^5.0.5` with `jsdom`, React Testing Library,
`@testing-library/user-event`, and `jest-dom`; tests are co-located as
`*.test.ts(x)` and run with `npm test`.

**Target Platform**: Web single-page application for modern evergreen browsers;
responsive from 320px upward.

**Project Type**: Web application (frontend only).

**Performance Goals**: Keep route-level lazy loading; show submission progress
and prevent duplicate submissions; provide visible feedback within 1 second of a
response; support SC-001 (95% sign-in under 30 seconds), SC-005 (95% OTP under 2
minutes), and SC-007 (95% sign-out under 2 seconds).

**Constraints**: Backend is authoritative for credentials, account status, and
sessions; password-recovery service is unavailable; the API is cross-origin and
uses an HTTP-only refresh cookie; FSD dependency direction must be respected;
shared UI must stay feature-agnostic; no new runtime dependency; no `any`;
accessible keyboard operation; existing design tokens and components must be
reused.

**Scale/Scope**: Five user journeys, approximately six auth/protected routes,
one frontend application, and a small shared auth surface. Multiple concurrent
sessions per account are allowed; sign out affects only the current session.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / rule | Gate | Status | Notes |
| --- | --- | --- | --- |
| I. Simplicity and maintainability | Reuse existing structures; avoid speculative features | PASS | No new dependency; recovery is explicitly non-functional rather than speculative |
| II. Separation of concerns | Features own mutations; pages compose; shared UI stays generic | PASS | Auth logic stays in `features/authentication`; shared controls remain presentation-only |
| III. Modularity (FSD) | Dependencies point downward; no `shared` → `entities` | CONDITIONAL | Existing `shared/api/client.ts` imports `AuthStore`; plan introduces a token accessor contract to break it |
| IV. Intentional reuse | Reuse Button, Input, TickBox, AuthLayout, router, stores | PASS | No duplicate shared components planned |
| V. Type safety | Precise types; validate untrusted data; no `any` | PASS | Add runtime response guards; no new assertions. Global `strict` enablement is a pre-existing project gap outside this feature |
| VI. Automated testing | Tests first; critical logic covered | PASS | Validators, stores, API client, pages, guards, and flows receive tests |
| VII. Consistency | Follow naming, formatting, shared design | PASS | Reuse existing conventions; normalize auth route paths |
| Architecture: Component design | Cohesive responsibilities; no feature logic in shared | PASS | Shared UI receives only accessibility fixes |
| Architecture: Routing | Centralized routes, layouts, protection | PASS | Keep `router-provider.tsx` as the single route table; wire OTP guard; fix logout redirect |
| State and data | TanStack Query for server state; local UI state nearby | PASS | Mutations stay in feature hooks; form/UI state stays in pages |
| UI/UX and accessibility | Semantic, keyboard accessible, responsive | CONDITIONAL | `TickBox` needs checkbox semantics; labels/errors need associations; auth layout needs responsive rules |
| Security | Backend authority; no secrets/logging; safe session handling | CONDITIONAL | Remove token/OTP logs, include credentials, scope auth clearing, avoid account enumeration |
| Performance | Lazy loading; no unnecessary work | PASS | Keep route-level lazy loading; avoid redundant requests and re-renders |

**Gate result**: PASS with three justified infrastructure changes tracked in
[Complexity Tracking](#complexity-tracking). No unresolved `NEEDS
CLARIFICATION` items remain.

## Project Structure

### Documentation (this feature)

```text
specs/001-authentication-user-flows/
├── plan.md              # This file
├── research.md          # Phase 0 decisions
├── data-model.md        # Phase 1 entities, validation, transitions
├── quickstart.md        # Phase 1 validation guide
├── contracts/
│   ├── auth-api.md      # Consumed HTTP contract and error mapping
│   └── auth-routes.md   # Route, guard, and redirect contract
├── checklists/
│   └── requirements.md  # Specification quality checklist
├── spec.md              # Feature specification
└── tasks.md             # Created later by /speckit-tasks
```

### Source Code (repository root)

Legend: `[existing]`, `[update]`, `[new]`.

```text
src/
├── app/
│   ├── App.tsx                                      [existing]
│   ├── main.tsx                                     [existing]
│   ├── index.css                                    [existing]
│   ├── guard/
│   │   ├── auth-guard.tsx                           [update]
│   │   ├── otp-guard.tsx                            [update]
│   │   └── public-only.tsx                          [update]
│   ├── layouts/
│   │   ├── auth/AuthLayout.tsx                      [update: responsive]
│   │   └── main/MainLayout.tsx                      [new: activate authenticated shell]
│   └── providers/
│       ├── auth/auth-initializer.tsx                [update: LOADING + refresh]
│       ├── query/                                   [existing]
│       └── router/router-provider.tsx               [update: guard + paths]
├── entities/
│   ├── session/
│   │   ├── auth-store.ts                            [update: subscribe, scoped clear]
│   │   ├── use-auth-status.ts                       [new]
│   │   └── type.ts                                  [update]
│   └── otp/
│       ├── otp-store.ts                             [update: correct key handling]
│       └── type.ts                                  [update]
├── features/
│   └── authentication/
│       ├── login/{login.ts,type.ts}                 [update]
│       ├── register/{register.ts,type.ts}           [update]
│       ├── otp/{otp.ts,type.ts}                     [update]
│       ├── logout/{logout.ts,LogoutButton.tsx}      [update + new]
│       └── recover_password/                        [new: capability-gated UI state]
├── pages/
│   └── auth/
│       ├── login/                                   [update]
│       ├── register/                                [update]
│       ├── otp/                                     [update]
│       ├── recover_password/                        [update]
│       └── set_password/                            [existing: out of scope]
├── shared/
│   ├── api/
│   │   ├── client.ts                                [update: refresh, credentials, no logs]
│   │   ├── error.ts                                 [update: codes]
│   │   ├── guards.ts                                [new: runtime response validation]
│   │   └── index.ts                                 [update: public surface]
│   ├── assets/                                      [existing]
│   └── ui/
│       ├── button/                                  [existing]
│       ├── input/                                   [existing]
│       ├── tick_box/                                [update: accessible checkbox]
│       ├── select_card/                             [existing]
│       └── toggle_switch/                           [existing]
└── test/setup.ts                                    [existing]

tests are co-located with source as *.test.ts(x)
```

**Structure Decision**: Single-project frontend using the existing FSD layers.
No new layer, package, or parallel architecture is introduced. New shared code
is limited to the API boundary and an accessibility fix to an existing control;
all auth-specific behavior stays inside `features/authentication` and
`pages/auth`.

## Complexity Tracking

> Justified changes required to satisfy the constitution and the feature. These
> touch existing infrastructure and therefore require developer approval before
> implementation, per the constitution.

| Violation / change | Why needed | Simpler alternative rejected because |
| --- | --- | --- |
| Break `shared/api/client.ts` → `entities/session/auth-store` by introducing a token accessor contract | FSD forbids shared depending on entities; auth must read/write tokens from the API client | Leaving the upward import violates the constitution's dependency rules; moving the client into entities would make shared transport domain-aware |
| Add subscription/`useSyncExternalStore` support to `AuthStore` while keeping its storage keys | Guards and pages must react to login, verification, refresh, and logout; current snapshot reads become stale | Replacing the store with Zustand is a larger redesign of existing infrastructure; React Context alone does not address persistence or guard reads |
| Enhance shared `TickBox` with accessible checkbox semantics and keyboard support | Registration requires terms acceptance and the constitution requires keyboard-accessible controls | Rendering native checkboxes separately in each page duplicates shared behavior and breaks the design system |
| Send browser credentials for refresh/login and make the API base URL environment-configurable | The API is cross-origin and uses an HTTP-only refresh cookie; session restoration cannot work without credentials | Same-origin proxy solves only development; storing the refresh token in JavaScript weakens the backend design |
| Gate password recovery behind an explicit capability flag that is disabled this release | The spec requires an honest unavailable state and forbids simulated reset | Hiding the entry point fails discoverability; faking success is misleading and violates the spec |

## Phase 0: Research Summary

Full decisions and alternatives are in [research.md](./research.md). Key
outcomes:

- Keep the existing storage model but make auth state reactive through a
  subscription hook.
- Extract `access_token` from the refresh response, include credentials, and
  preserve single-flight refresh.
- Correct `apiError` codes and add runtime response guards without a new schema
  dependency.
- Use pure field validators and TDD; keep form state in pages.
- Reuse the six-input OTP UX, fix the session-storage key and timer cleanup.
- Add a reachable, correctly redirected logout action; clear only auth keys.
- Implement recovery as an interaction-only capability-gated screen.
- Wire OTP protection and normalize auth paths in the centralized router.
- Improve `TickBox`, labels, error announcements, and responsive auth layout.
- Remove token/OTP logging and avoid account-existence disclosure.
- Use Vitest/RTL with mocked `fetch` and `createMemoryRouter`; no new dependency.

No `NEEDS CLARIFICATION` items remain.

## Phase 1: Design Summary

- **Data model**: [data-model.md](./data-model.md) defines `Account`,
  `AuthenticationSession`, `OneTimePasscodeChallenge`, `PasswordRecoveryRequest`,
  `AuthStatus`, form-field state, validation rules, storage schema, and state
  transitions.
- **API contract**: [contracts/auth-api.md](./contracts/auth-api.md) defines the
  consumed endpoints, request/response types, error mapping, and required
  runtime guards.
- **Route contract**: [contracts/auth-routes.md](./contracts/auth-routes.md)
  defines the route matrix, guard behavior, redirects, path normalization, and
  route test expectations.
- **Validation guide**: [quickstart.md](./quickstart.md) defines manual and
  automated validation scenarios for all five journeys.

## Post-Design Constitution Re-check

*Re-evaluated after Phase 1 artifacts.*

| Gate | Status after design | Evidence |
| --- | --- | --- |
| Simplicity | PASS | One feature directory, existing stack, no new dependency; recovery is a bounded capability |
| Separation of concerns | PASS | Data model and contracts keep auth behavior in feature/page layers; shared UI remains generic |
| FSD modularity | PASS | Token accessor contract resolves the `shared` → `entities` violation; ownership documented |
| Intentional reuse | PASS | Reuses `AuthLayout`, Button, Input, TickBox, stores, and router |
| Type safety | PASS | Contract types and runtime guards defined; no `any` introduced |
| Automated testing | PASS | Quickstart defines validator, store, API, page, route, and accessibility tests |
| Consistency | PASS | Path normalization and design-system reuse are explicit |
| Component design | PASS | Only accessibility changes to shared UI; no feature logic added |
| Routing | PASS | Route/guard contract centralizes all redirects, including OTP and logout |
| State and data | PASS | Server mutations and local UI state remain separated |
| UI/UX and accessibility | PASS | Accessible `TickBox`, label/error associations, focus, and responsive rules planned |
| Security | PASS | Logging removal, scoped clearing, credentials, and enumeration protections planned |
| Performance | PASS | Lazy routes and duplicate-submission prevention retained |

**Final gate result**: PASS. The justified infrastructure changes are recorded
above and must be approved before implementation.

## Implementation Phases

Each phase follows TDD: write failing tests first, implement, then run
`npm test`, `npm run lint`, and `npm run build` before moving on.

1. **Foundation and safety**: Fix the API client (refresh shape, credentials,
   configurable base URL, no logging), correct the error map, add response
   guards, make `AuthStore` reactive with scoped clearing, set `LOADING` during
   bootstrap, and normalize routes/guards. Add unit and route tests.
2. **Sign in**: Implement reliable username/email login, field gating, generic
   credential errors, pending-account routing, duplicate prevention, and
   accessible feedback. Add page and integration tests.
3. **Registration**: Implement validators, terms gate, field/server error
   mapping, pending-account handoff, and accessible labels. Add validator and
   page tests.
4. **Email verification**: Fix OTP persistence/cleanup and countdown, implement
   auto-send/restore, invalid/expired/resend behavior, six-digit input, and
   activation. Add component and integration tests.
5. **Sign out**: Add the authenticated shell/logout action, correct redirect,
   failure handling, and duplicate prevention. Add flow tests.
6. **Recovery (unavailable)**: Add the capability-gated recovery screen,
   generic unavailable wording, validation, and back navigation. Add tests that
   assert no request and no false success.
7. **Accessibility, responsiveness, and polish**: Associate labels/errors, add
   focus management and announcements, make the auth layout responsive, and
   verify the five journeys with the quickstart guide.
8. **Verification**: Run the full test suite, lint, production build, and manual
   quickstart scenarios; report any remaining limitations (for example,
   access-token storage risk or the absent recovery backend).

## Risks and Open Dependencies

- **Backend CORS and cookie policy**: session restoration depends on the backend
  accepting credentialed cross-origin requests and the cookie's path/domain.
  This must be verified early.
- **Recovery backend absent**: only the honest unavailable state can be shipped;
  the reset email and set-new-password journeys remain out of scope.
- **Access-token storage**: the existing `localStorage` design remains an XSS
  risk. This plan removes leakage and scopes clearing but does not redesign token
  storage; that requires a separate justified change.
- **Shared component change**: making `TickBox` accessible changes shared UI
  behavior and requires approval and regression tests.
- **Legal pages**: registration links to terms/privacy destinations that do not
  exist yet; the implementation must avoid presenting dead links.
