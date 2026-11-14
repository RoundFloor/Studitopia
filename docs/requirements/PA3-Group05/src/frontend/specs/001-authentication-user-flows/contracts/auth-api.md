# Contract: Authentication API Consumption

**Feature**: `001-authentication-user-flows`
**Date**: 2026-11-14
**Authoritative reference**: `docs/architecture/api-catalog.md`

This contract describes the subset of the backend HTTP API consumed by the five
frontend journeys and the obligations the frontend has when calling it. The
backend contract remains authoritative; this file exists so the frontend plan
and tests have a concrete integration boundary.

## 1. General conventions

| Item | Contract |
| --- | --- |
| Base path | `/api/v1/auth` |
| Request format | JSON (`Content-Type: application/json`) |
| Success body | Data returned directly; no `success` wrapper |
| Error body | Array of numeric codes, for example `[45003]` |
| Validation failure | `422` with an array of codes |
| Auth header | `Authorization: Bearer <access_token>` |
| Refresh token | HTTP-only cookie scoped to the login endpoint |
| Credentials | Refresh/login requests must include browser credentials |
| Unauthenticated | `401` with `[40004]` |
| Invalid session | `45005` |

The client must treat HTTP status and the returned code array together. It must
not infer a specific field error from the status alone.

## 2. Endpoints in scope

| Method | Path | Purpose | Auth |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Create an account | None |
| `POST` | `/auth/login?type=username` | Sign in with username | None |
| `POST` | `/auth/login?type=email` | Sign in with email | None |
| `POST` | `/auth/login?type=token` | Refresh the access token | Refresh cookie |
| `GET` | `/auth/otp?type=active` | Create and email an activation OTP | Bearer |
| `POST` | `/auth/activate` | Verify the OTP and activate the account | Bearer |
| `POST` | `/auth/logout` | End the current session | Bearer |

There is no password-recovery endpoint in this release. The frontend must not
call an invented recovery endpoint or simulate a successful recovery.

## 3. Type definitions

```ts
type AccountRole = "STUDENT" | "STAFF" | "ADMIN"
type AccountStatus = "PREINIT" | "INACTIVE" | "ACTIVE"
type OtpPurpose = "active" | "recover" | "delete"

interface RegisterRequest {
  displayname: string
  username: string
  email: string
  password: string
}

interface LoginRequest {
  identifier: string
  password: string
}

interface LoginResponse {
  access_token: string
  role: AccountRole
  status: AccountStatus
}

interface RefreshResponse {
  access_token: string
}

interface OtpTimestampsResponse {
  created_time: number
  expired_time: number
}

interface ActivateRequest {
  created_time: number
  expired_time: number
  key: string
  type: OtpPurpose
}
```

### Required runtime guards

The frontend must reject or safely handle responses that do not match these
shapes:

- `access_token` must be a non-empty string.
- `role` must be one of the known roles.
- `status` must be a string that the client can map; unknown statuses are treated
  as pending verification rather than granting access.
- `created_time` / `expired_time` must be finite numbers and `expired_time` must
  be after `created_time`.

## 4. Endpoint details

### 4.1 Register

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "displayname": "Student AB",
  "username": "student.ab",
  "email": "student.ab@student.hcmus.edu.vn",
  "password": "Secure@123456"
}
```

Success: `201` with `LoginResponse`.

Errors:

| Status | Code | Frontend handling |
| --- | --- | --- |
| `422` | `45001` | Display-name field error |
| `422` | `45002` | Email field error |
| `422` | `45003` | Username field error |
| `422` | `45004` | Password field error |
| `409` | `46001` | Email field: domain not registered |
| `409` | `47001` | Email field: already registered |
| `409` | `47002` | Username field: already registered |
| `409` | `45000` | Generic service error |
| `409` | `2002` | Generic unknown error |

On success the frontend stores the token, role, and `PENDING_OTP` status, then
directs the user to email verification.

### 4.2 Login

```http
POST /api/v1/auth/login?type=username
Content-Type: application/json

{
  "identifier": "student.ab",
  "password": "Secure@123456"
}
```

`type` is `username` or `email`, selected by the frontend after inspecting the
identifier. Success: `201` with `LoginResponse` and a refresh-token `Set-Cookie`.

Errors:

| Status | Code | Frontend handling |
| --- | --- | --- |
| `400` | `40001` | Generic sign-in error |
| `409` | `18456` | Generic "invalid credentials" on both fields |
| `409` | `45000` | Generic service error |
| `409` | `2002` | Generic unknown error |

If the returned account status is `ACTIVE`, enter the authenticated area.
Otherwise route to email verification.

### 4.3 Refresh access token

```http
POST /api/v1/auth/login?type=token
Cookie: refresh_token=<token>
```

Success: `201` with `{ "access_token": "<token>" }`.

Errors:

| Status | Code | Frontend handling |
| --- | --- | --- |
| `400` | `40001` | Treat refresh as failed |
| `401` | `40003` | Clear auth state; require sign-in |

The frontend must:
- Include browser credentials so the HTTP-only cookie is sent.
- De-duplicate concurrent refreshes with a single in-flight request.
- Read `access_token` from the object; never store the whole response object as
  the token.
- Retry the original request at most once after a successful refresh.

### 4.4 Create OTP

```http
GET /api/v1/auth/otp?type=active
Authorization: Bearer <access_token>
```

Success: `200` with `OtpTimestampsResponse`. The six-digit code is delivered by
email and is never returned by the API.

Errors:

| Status | Code | Frontend handling |
| --- | --- | --- |
| `400` | `40001` | Invalid purpose; generic error |
| `401` | `40004` | Session expired; redirect to sign-in |
| `400` | `45005` | Invalid session; redirect to sign-in |
| `400` | `48001` | Email delivery unavailable; retry message |
| `400` | `45000` | Generic service error |
| `400` | `2002` | Generic unknown error |
| `429` | `40029` | Too many requests; show wait message |

On success the frontend stores only `created_time` and `expired_time` for the
active purpose.

### 4.5 Verify OTP / activate account

```http
POST /api/v1/auth/activate
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "created_time": 1730956800000,
  "expired_time": 1730956860000,
  "key": "123456",
  "type": "active"
}
```

Success: `202` with an empty body.

Errors:

| Status | Code | Frontend handling |
| --- | --- | --- |
| `401` | `40004` | Session expired; redirect to sign-in |
| `409` | `40002` | Invalid or expired OTP; show retry/expiry message |
| `401` | `45005` | Invalid session; redirect to sign-in |
| `500` | `45000` | Generic service error |
| `500` | `2002` | Generic unknown error |
| `429` | `40029` | Too many attempts; show wait message |

On success the frontend clears the challenge timestamps, sets
`AUTHENTICATED`, and enters the authenticated area.

### 4.6 Sign out

```http
POST /api/v1/auth/logout
Authorization: Bearer <access_token>
```

Success: `200` with an empty body; the response clears the refresh-token cookie.

Errors:

| Status | Code | Frontend handling |
| --- | --- | --- |
| `401` | `40004` | Session already invalid; clear local state |
| `401` | `45005` | Session already invalid; clear local state |
| `401` | `45000` | Generic service error |
| `401` | `2002` | Generic unknown error |

On success the frontend clears only auth-owned local data and returns to
`/auth/login`. On failure it must not claim success; the user can retry.

## 5. Error-code corrections required by the plan

The current `src/shared/api/error.ts` map contains `VALIDATION_ERROR: 4001`,
while the API contract specifies `40001`. The implementation must correct this
and add the codes used by these journeys, including:

| Code | Name | Journey |
| --- | --- | --- |
| `40001` | `VALIDATION_ERROR` | Login, OTP |
| `40002` | `INVALID_OTP` | OTP verification |
| `40003` | `INVALID_REFRESH_TOKEN` | Session refresh |
| `40004` | `INVALID_ACCESS_TOKEN` | Authenticated requests |
| `40029` | `TOO_MANY_REQUESTS` | OTP, recovery |
| `45005` | `INVALID_SESSION` | Authenticated requests |
| `48001` | `EMAIL_SENDER_UNAVAILABLE` | OTP creation |

## 6. Frontend obligations

- Do not log access tokens, passwords, or OTP values.
- Do not persist the refresh token; rely on the HTTP-only cookie.
- Do not expose backend error text directly; map known codes to user-facing
  messages.
- Treat unknown codes as a generic retryable failure.
- Use one centralized request path for headers, credentials, refresh, and error
  construction.
- Validate untrusted response shapes before using them.
- Do not call a recovery endpoint until one is defined in the authoritative API
  catalog.

## 7. Contract test expectations

| Contract area | Test expectation |
| --- | --- |
| Register success | Stores token/role and moves to pending verification |
| Register field errors | Maps each documented code to the correct field |
| Login success active | Moves to authenticated state |
| Login success pending | Moves to OTP state |
| Login invalid credentials | Shows one generic message on both fields |
| Refresh success | Extracts `access_token`, retries once |
| Refresh failure | Clears auth and requires sign-in |
| OTP create success | Stores only timestamps |
| OTP invalid/expired | Shows retry or expiry message |
| OTP rate limited | Shows wait message |
| Sign out success | Clears auth keys and redirects to `/auth/login` |
| Sign out failure | Keeps session and shows retry message |
| Recovery unavailable | No network call, no success claim |
