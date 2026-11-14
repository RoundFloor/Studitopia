# Quickstart Validation Guide: Authentication User Flows

**Feature**: `001-authentication-user-flows`
**Date**: 2026-11-14
**Spec**: [spec.md](./spec.md)
**Design**: [data-model.md](./data-model.md) |
[Auth API contract](./contracts/auth-api.md) |
[Route contract](./contracts/auth-routes.md)

Use this guide to validate the five journeys end to end after implementation.
It does not contain implementation code.

## 1. Prerequisites

- Node.js and npm compatible with Vite 8.
- The backend authentication service reachable at the configured API base URL.
- A test environment with email delivery enabled for OTP messages.
- At least three test accounts:
  - an active account with a known password,
  - a pending/inactive account that can receive OTP email,
  - a disposable email/username for registration.
- Browser developer tools available for checking network requests, cookies,
  console output, and storage.
- The password-recovery backend is **not** available; recovery validation must
  confirm the unavailable state rather than a real reset.

## 2. Setup and commands

```bash
npm install
npm run dev
```

The development server runs on port `8999`. HTTPS is enabled only when
`certs/server.key` and `certs/server.crt` exist (or `HTTPS_KEY_PATH` /
`HTTPS_CERT_PATH` are set).

Quality commands:

```bash
npm test          # run the Vitest suite once
npm run lint      # ESLint
npm run build     # TypeScript build + production bundle
npm run preview   # preview the production build
```

Backend/API configuration:

- The API base URL must be configurable for the environment being tested.
- If using the cross-origin backend, confirm CORS allows the frontend origin
  **with credentials** so the refresh cookie is accepted.
- Confirm the browser accepts the HTTP-only refresh cookie for the login path.

## 3. Manual validation scenarios

### 3.1 Session restoration and route protection

1. Open the application with no existing session and visit `/`.
   - **Expected**: redirect to `/auth/login`; no protected content is shown.
2. Sign in with an active account, then refresh the browser.
   - **Expected**: the session is restored without re-entering credentials and
     the authenticated area remains available.
3. While authenticated, visit `/auth/login`.
   - **Expected**: redirect to `/`.
4. Sign out, then use browser back.
   - **Expected**: protected content is not shown; the user is sent to sign in.

References: [route contract](./contracts/auth-routes.md), FR-001 to FR-007.

### 3.2 Sign in

1. Submit a valid username and password for an active account.
   - **Expected**: authenticated area opens.
2. Repeat with a valid email address and password.
   - **Expected**: authenticated area opens without choosing an identifier type.
3. Submit a wrong password and an unknown username separately.
   - **Expected**: both show the same generic invalid-credentials message; no
     indication of which field or account was wrong.
4. Submit with an empty identifier or password.
   - **Expected**: submission is unavailable and the missing field is
     explained.
5. Sign in with a pending account.
   - **Expected**: redirect to `/auth/verify_otp`, no protected access.
6. Disconnect the network and submit.
   - **Expected**: friendly retry message; identifier is preserved.

References: [Auth API contract](./contracts/auth-api.md), FR-008 to FR-018.

### 3.3 Create an account

1. Submit valid data, a matching password confirmation, and accepted terms.
   - **Expected**: account is created in pending state and the verification
     screen opens.
2. Submit invalid values for display name, username, email, password, and
   confirmation one at a time.
   - **Expected**: specific inline errors; submission remains blocked.
3. Use an already-registered email and an already-registered username.
   - **Expected**: specific "already exists" messages on the corresponding
     fields; other input is preserved.
4. Use an email with an unregistered domain.
   - **Expected**: domain-specific message, distinct from a malformed email.
5. Submit without accepting the terms.
   - **Expected**: warning; no account created.
6. Simulate a service failure during submission.
   - **Expected**: retry message, non-sensitive input preserved, no duplicate
     submission.

References: [Auth API contract](./contracts/auth-api.md), FR-019 to FR-033.

### 3.4 Verify email with OTP

1. Arrive at verification from registration with no active challenge.
   - **Expected**: a six-digit code is requested automatically and a countdown
     starts.
2. Refresh the verification screen while the challenge is still valid.
   - **Expected**: the countdown is restored; no duplicate code is sent.
3. Enter the correct six digits before expiry.
   - **Expected**: account becomes active, the challenge is cleared, and the
     authenticated area opens.
4. Enter an incorrect code.
   - **Expected**: clear invalid-code message; retry works while the challenge
     is valid.
5. Let the code expire, then verify.
   - **Expected**: expiry message; requesting a new code becomes available.
6. Request a new code while the current one is still valid.
   - **Expected**: request is unavailable and remaining time is shown.
7. Paste a six-digit code with surrounding whitespace.
   - **Expected**: all six positions fill correctly.
8. Visit `/auth/verify_otp` directly without a pending challenge.
   - **Expected**: redirect to `/auth/login`.
9. Confirm the passcode is absent from the UI, console, and browser storage.

References: [Auth API contract](./contracts/auth-api.md), FR-034 to FR-047.

### 3.5 Sign out

1. From an authenticated screen, choose sign out.
   - **Expected**: current session ends; redirect to `/auth/login`.
2. Try to reopen a protected URL.
   - **Expected**: redirect to sign in.
3. Simulate a sign-out service failure.
   - **Expected**: user is told sign out did not complete; no false success;
     retry is available.
4. Activate sign out repeatedly.
   - **Expected**: only one request is sent.
5. Confirm another active session for the same account remains usable.
   - **Expected**: other sessions are unaffected.

References: [Auth API contract](./contracts/auth-api.md), FR-057 to FR-063.

### 3.6 Recover a forgotten password

1. From `/auth/login`, choose "Forgot password?".
   - **Expected**: `/auth/recover_password` opens.
2. Submit a valid email and a valid username while recovery is unavailable.
   - **Expected**: clear unavailable message; no claim that an email was sent;
     no recovery network request.
3. Submit the same identifiers for an existing and a non-existing account.
   - **Expected**: identical wording; no account-existence disclosure.
4. Submit an empty identifier.
   - **Expected**: required-field message; no request.
5. Choose the back action.
   - **Expected**: return to `/auth/login`.

References: FR-048 to FR-056.

### 3.7 Accessibility and responsiveness

1. Complete every journey using only the keyboard.
   - **Expected**: all controls are reachable, focus is visible, errors are
     announced, and focus moves to the first invalid field.
2. Run a screen reader over each form.
   - **Expected**: every field has a name, hints/errors are associated, and
     status changes are announced.
3. Resize from 320px through desktop widths.
   - **Expected**: no horizontal overflow and no loss of functionality.

References: FR-064 to FR-071, SC-008, SC-011.

## 4. Automated test expectations

| Test area | Expected coverage |
| --- | --- |
| Validators | Display name, username, email, password, confirmation, identifier, OTP |
| Stores | Auth state transitions and scoped clearing; OTP save/get/clear key |
| Login | Success active, success pending, invalid credentials, network failure |
| Registration | Every field rule, terms gate, duplicate/domain mapping, success |
| OTP | Auto-send, restore, countdown, invalid, expired, resend gate, verification |
| Logout | Success redirect, failure retry, duplicate prevention, scoped clear |
| Recovery | Unavailable message, no request, generic wording, back action |
| Routes | Guard redirects, direct access, authenticated visits to public routes |
| API client | Refresh extraction, single-flight, one retry, error mapping, no token logging |
| Accessibility | Keyboard operation of shared controls and focus movement |

Run `npm test` after each test-first slice, then `npm run lint` and
`npm run build` before completion.

## 5. Troubleshooting

| Symptom | Check |
| --- | --- |
| Session is not restored after refresh | Refresh request includes credentials; CORS allows credentials; cookie path/domain is correct; response uses `{ access_token }` |
| Authenticated users still see login | Auth state is reactive; guard subscribes to state changes; `LOADING` is handled |
| OTP is never sent | Backend email service is available; account/session is valid; OTP request carries the bearer token |
| Countdown resets unexpectedly | Challenge timestamps restore from the correct `otp_active` key |
| Passcode remains after verification | Cleanup removes `otp_active`, not `otp_otp_active` |
| Sign out lands on a blank page | Navigation targets `/auth/login`, not `/login` |
| Recovery appears to succeed | Recovery capability flag is disabled; no simulated request or success state |
| Token appears in console | All auth/OTP logging is removed |
| Keyboard cannot toggle terms | `TickBox` exposes checkbox semantics and keyboard activation |
