# Contract: Authentication Routes and Guards

**Feature**: `001-authentication-user-flows`
**Date**: 2026-11-14

Routing is centralized in `src/app/providers/router/router-provider.tsx`.
Guards render either their child routes or a redirect based on the current auth
state. This contract defines the expected route behavior for the feature.

## 1. Route matrix

| Path | Guard | Layout | Page | Auth state allowed |
| --- | --- | --- | --- | --- |
| `/auth/login` | `PublicOnly` | `AuthLayout` | `LoginPage` | Unauthenticated |
| `/auth/register` | `PublicOnly` | `AuthLayout` | `RegisterPage` | Unauthenticated |
| `/auth/recover_password` | `PublicOnly` | `AuthLayout` | `RecoverPasswordPage` | Unauthenticated |
| `/auth/verify_otp` | OTP guard (pending challenge) | `AuthLayout` | `OtpPage` | `PENDING_OTP` |
| `/auth/set_password` | `PublicOnly` | `AuthLayout` | `SetPasswordPage` | Out of scope in this release |
| `/` | `AuthGuard` | Authenticated shell | `HomePage` | `AUTHENTICATED` |
| `errorElement` | n/a | n/a | `RouteErrorPage` | Any |

All page routes remain lazily loaded. `errorElement` stays attached to every
top-level route.

## 2. Redirect contract

| Current state | Destination | Trigger |
| --- | --- | --- |
| Unknown / uninitialized | Stay on a loading view | Application is restoring the session |
| `UNAUTHENTICATED` | `/auth/login` | Accessing a protected route |
| `UNAUTHENTICATED` | `/auth/login` | Accessing `/auth/verify_otp` without a pending challenge |
| `UNAUTHENTICATED` | Allowed | Accessing login, register, or recovery |
| `PENDING_OTP` | `/auth/verify_otp` | Accessing a protected route or a public auth route |
| `PENDING_OTP` | Allowed | Accessing `/auth/verify_otp` |
| `AUTHENTICATED` | `/` | Accessing login, register, recovery, or OTP verification |
| `AUTHENTICATED` | Allowed | Accessing protected routes |
| Session expires during use | `/auth/login` with a notice | Any protected action receives an invalid-session response |
| Sign out succeeds | `/auth/login` | User chooses sign out |

## 3. Guard behavior

### `PublicOnly`

| Auth status | Result |
| --- | --- |
| `LOADING` | Loading view |
| `UNAUTHENTICATED` | Render child routes |
| `PENDING_OTP` | Redirect to `/auth/verify_otp` with activation purpose |
| `AUTHENTICATED` | Redirect to `/` |
| No status yet | Loading view (must not render blank) |

### `AuthGuard`

| Auth status | Result |
| --- | --- |
| `LOADING` | Loading view |
| `UNAUTHENTICATED` | Redirect to `/auth/login` |
| `PENDING_OTP` | Redirect to `/auth/verify_otp` with activation purpose |
| `AUTHENTICATED` | Render child routes |
| No status yet | Loading view (must not redirect before restoration completes) |

### OTP guard

| Auth status / condition | Result |
| --- | --- |
| `LOADING` | Loading view |
| `UNAUTHENTICATED` | Redirect to `/auth/login` |
| `PENDING_OTP` + active or startable challenge | Render `/auth/verify_otp` |
| `PENDING_OTP` without a challenge and unable to create one | Show retry state or redirect to sign-in |
| `AUTHENTICATED` | Redirect to `/` |

The existing `OtpGuard` may be reused if it is wired into the route tree;
otherwise equivalent guard logic must live in a centralized guard component.

## 4. Navigation events

| Event | Required navigation |
| --- | --- |
| Login succeeds with active account | `/` |
| Login succeeds with pending account | `/auth/verify_otp` |
| Registration succeeds | `/auth/verify_otp` |
| OTP verification succeeds | `/` |
| Sign out succeeds | `/auth/login` |
| Sign out fails | Stay on the current screen and show a retry message |
| "Forgot password?" selected | `/auth/recover_password` |
| Recovery back action selected | `/auth/login` |
| Recovery service unavailable | Stay on the recovery screen; no navigation |
| Direct `/auth/verify_otp` without pending state | `/auth/login` |
| Invalid or expired session detected | `/auth/login` with notice |

No navigation should claim success before the corresponding operation completes.

## 5. Path normalization requirements

- Use the `/auth/...` prefix consistently; change `auth/set_password` to
  `/auth/set_password`.
- Use `/auth/login` everywhere; the current logout hook navigates to `/login`,
  which is not a route.
- Add or explicitly handle legal destinations used by registration
  (`/term_service`, `/privacy_policy`); if they remain out of scope, replace them
  with a non-navigating explanation so registration does not present dead links.
- Add a catch-all `*` route or an explicit not-found screen so unknown URLs do
  not fall through to a blank page.

## 6. Route test expectations

| Scenario | Expected result |
| --- | --- |
| Visit `/` while unauthenticated | Redirect to `/auth/login` |
| Visit `/` while pending | Redirect to `/auth/verify_otp` |
| Visit `/` while authenticated | Render the authenticated home |
| Visit `/auth/login` while authenticated | Redirect to `/` |
| Visit `/auth/register` while pending | Redirect to `/auth/verify_otp` |
| Visit `/auth/verify_otp` while authenticated | Redirect to `/` |
| Visit `/auth/verify_otp` unauthenticated | Redirect to `/auth/login` |
| Complete login for active account | Land on `/` |
| Complete registration | Land on `/auth/verify_otp` |
| Complete OTP verification | Land on `/` |
| Complete sign out | Land on `/auth/login` |
| Use browser back after sign out | Protected content is not shown |
| Visit an unknown URL | Show not-found/error content, not a blank screen |
