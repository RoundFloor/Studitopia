# Phase 1 Data Model: Authentication User Flows

**Feature**: `001-authentication-user-flows`
**Date**: 2026-11-14
**Spec**: [spec.md](./spec.md)
**API contract**: [contracts/auth-api.md](./contracts/auth-api.md)

This model describes the domain data the frontend needs for sign-in,
registration, email verification, password recovery, and sign-out. The backend
remains the source of truth for accounts, credentials, sessions, and passcodes.

## 1. Entity overview

```text
Account 1 ─────── * AuthenticationSession
    │
    ├──────────── * OneTimePasscodeChallenge
    │
    └──────────── * PasswordRecoveryRequest (not implemented in this release)

AuthState (client-side projection)
    ├── status: AuthStatus
    ├── role: AccountRole | null
    └── accessToken: string | null
```

## 2. Account

Represents a registered person.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `displayname` | `string` | Yes | 8–32 characters; alphanumeric words separated by single spaces |
| `username` | `string` | Yes | 8–32 characters; starts lowercase; lowercase letters, digits, single dots between segments |
| `email` | `string` | Yes | Valid format, at most 254 characters, domain must be registered |
| `password` | `string` | Registration only | Transient; never persisted or logged |
| `role` | `AccountRole` | Server-provided | `STUDENT`, `STAFF`, or `ADMIN` |
| `status` | `AccountStatus` | Server-provided | `PREINIT`, `INACTIVE`, or `ACTIVE` |

### Account types

```ts
type AccountRole = "STUDENT" | "STAFF" | "ADMIN"

type AccountStatus = "PREINIT" | "INACTIVE" | "ACTIVE"
```

### Account lifecycle

```text
(none)
  │ registration succeeds
  ▼
INACTIVE / PREINIT
  │ active OTP verified
  ▼
ACTIVE

INACTIVE / PREINIT --login successful--> PENDING_OTP journey (no access)
ACTIVE              --login successful--> authenticated access
```

The frontend treats any non-`ACTIVE` login status as requiring email
verification, matching the current UI behavior.

## 3. AuthenticationSession

Represents the current client-visible session. The refresh token is an
HTTP-only cookie managed by the backend and is not part of this client model.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `accessToken` | `string \| null` | Derived | Sent as `Authorization: Bearer <token>` |
| `role` | `AccountRole \| null` | Derived | Returned by login/register |
| `status` | `AuthStatus` | Derived | Client auth state |
| `accountStatus` | `AccountStatus \| null` | Derived | Last known server account status |

### AuthStatus

```ts
type AuthStatus =
  | "LOADING"        // session restoration in progress
  | "UNAUTHENTICATED"
  | "PENDING_OTP"
  | "AUTHENTICATED"
```

`LOADING` must be assigned during bootstrap in the planned implementation; it is
currently declared but unused.

### Session lifecycle

```text
(no status)
  │ AuthInitializer starts
  ▼
LOADING
  ├── refresh succeeds ──> AUTHENTICATED
  └── refresh fails ─────> UNAUTHENTICATED

UNAUTHENTICATED --login(active account)----> AUTHENTICATED
UNAUTHENTICATED --login(pending account)---> PENDING_OTP
UNAUTHENTICATED --registration-------------> PENDING_OTP
PENDING_OTP     --OTP verified-------------> AUTHENTICATED
AUTHENTICATED   --sign out-----------------> UNAUTHENTICATED
AUTHENTICATED   --session expired----------> UNAUTHENTICATED + notice
```

### Session invariants

- Only one client auth state is authoritative at a time.
- Protected screens are available only in `AUTHENTICATED`.
- `PENDING_OTP` may access only the verification journey.
- Sign out and expiry remove only auth-owned data.
- The access token must never be written to logs or analytics.

## 4. OneTimePasscodeChallenge

A short-lived verification challenge tied to an account and a purpose.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `purpose` | `OtpPurpose` | Yes | `active`, `recover`, or `delete`; this feature uses `active` |
| `created_time` | `number` | Yes | Unix epoch milliseconds from the service |
| `expired_time` | `number` | Yes | Unix epoch milliseconds; expiry drives the countdown |
| `key` | `string` | On verification only | Six-digit code typed by the user; never stored or logged |

```ts
type OtpPurpose = "active" | "recover" | "delete"

interface OtpChallengeTimestamps {
  created_time: number
  expired_time: number
}
```

### Challenge lifecycle

```text
(none)
  │ request succeeds
  ▼
ISSUED (timestamps stored, countdown running)
  ├── correct key before expiry ----> VERIFIED -> cleared
  ├── wrong key ---------------------> stays ISSUED (retry allowed)
  └── expired -----------------------> EXPIRED -> resend enabled
```

### OTP invariants

- The six-digit value is never displayed, stored, or logged by the client.
- Only one active challenge per purpose is stored.
- A new challenge replaces the previous one only when the previous challenge is
  expired or absent.
- Verification is unavailable until all six digits are present.
- Direct access without a pending challenge redirects to sign in.

## 5. PasswordRecoveryRequest

Represents an attempt to start password recovery. The backend capability is not
available in this release.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `identifier` | `string` | Yes | Email address or username |
| `requestedAt` | `number` | Derived | Client timestamp when submitted |
| `outcome` | `RecoveryOutcome` | Derived | `UNAVAILABLE`, `SUBMITTED`, or `RATE_LIMITED` |

```ts
type RecoveryOutcome = "UNAVAILABLE" | "SUBMITTED" | "RATE_LIMITED"
```

### Recovery lifecycle

```text
idle
  ├── service unavailable (current) --> UNAVAILABLE (no request sent, no false success)
  └── service available (future)
        ├── submit --> SUBMITTED (generic confirmation)
        └── service rate limit --> RATE_LIMITED (wait and retry)
```

### Recovery invariants

- The same message is shown for existing and non-existing accounts.
- No reset email, token, or new-password flow is simulated.
- The user can always return to sign in.

## 6. AuthFormField (UI model)

Used by login, registration, recovery, and OTP screens.

| Field | Type | Notes |
| --- | --- | --- |
| `value` | `string` | Current input value |
| `state` | `"default" \| "error" \| "success"` | Maps to shared `Input` state |
| `hint` | `string` | Field-level guidance or error message |

`AuthFormField` is local UI state only. It must not be persisted.

## 7. Validation rules

| Area | Rule | Source |
| --- | --- | --- |
| Display name | `^[a-zA-Z0-9]+([ ][a-zA-Z0-9]+)*$`; length 8–32 | Spec FR-020 |
| Username | `^[a-z][a-z0-9]*([.][a-z0-9]+)*$`; length 8–32 | Spec FR-021 |
| Email | Valid email format; at most 254 characters; domain registered by service | Spec FR-022 |
| Password | Length 8–32; at least one lowercase, uppercase, digit, and special character; no null character | Spec FR-023 |
| Password confirmation | Must equal password | Spec FR-024 |
| Terms | Must be accepted | Spec FR-025 |
| Sign-in identifier | Non-empty; email detection when it contains `@` | Spec FR-008, FR-010 |
| Sign-in password | Non-empty | Spec FR-009 |
| OTP | Exactly six numeric digits | Spec FR-035 |
| Recovery identifier | Non-empty; email or username | Spec FR-050 |

Server validation remains authoritative. Field errors returned by the service
must be mapped to the corresponding `AuthFormField`.

## 8. Client storage schema

| Store | Key | Value | Lifetime |
| --- | --- | --- | --- |
| `localStorage` | `status` | `AuthStatus` | Until sign out or invalidation |
| `localStorage` | `role` | `AccountRole` | Until sign out or invalidation |
| `localStorage` | `access` | Access token string | Short-lived; until refresh/sign out |
| `sessionStorage` | `otp_active` | `{ created_time, expired_time }` | Until verified, expired, or tab closes |
| HTTP-only cookie | backend-defined | Refresh token | Backend-managed |

Rules:

- `AuthStore.clear()` removes only `status`, `role`, and `access`.
- Passwords, OTP keys, and refresh tokens are never written to browser storage
  by the frontend.
- The OTP key is held only in component state during verification.

## 9. Relationships and ownership

| Relationship | Cardinality | Owner |
| --- | --- | --- |
| Account → AuthenticationSession | One-to-many | Backend; frontend projects current session |
| Account → OneTimePasscodeChallenge | One-to-many over time | Backend; frontend stores only timestamps |
| Account → PasswordRecoveryRequest | Zero-to-many | Future backend; frontend holds UI state only |
| AuthState → Account | Many-to-one projection | Frontend derives from login/register/refresh |

## 10. State transition summary

| Entity | Event | From | To |
| --- | --- | --- | --- |
| AuthState | bootstrap refresh succeeds | `(none)` / `LOADING` | `AUTHENTICATED` |
| AuthState | bootstrap refresh fails | `(none)` / `LOADING` | `UNAUTHENTICATED` |
| AuthState | login active account | `UNAUTHENTICATED` | `AUTHENTICATED` |
| AuthState | login pending account | `UNAUTHENTICATED` | `PENDING_OTP` |
| AuthState | registration succeeds | `UNAUTHENTICATED` | `PENDING_OTP` |
| AuthState | OTP verified | `PENDING_OTP` | `AUTHENTICATED` |
| AuthState | sign out / expiry | `AUTHENTICATED` | `UNAUTHENTICATED` |
| Account | registration succeeds | `(none)` | `INACTIVE` / `PREINIT` |
| Account | OTP verified | `INACTIVE` / `PREINIT` | `ACTIVE` |
| OtpChallenge | request succeeds | `(none)` | `ISSUED` |
| OtpChallenge | correct key | `ISSUED` | `VERIFIED` / cleared |
| OtpChallenge | deadline passes | `ISSUED` | `EXPIRED` |
| RecoveryRequest | service unavailable | `idle` | `UNAVAILABLE` |
| RecoveryRequest | service available + submit | `idle` | `SUBMITTED` |
| RecoveryRequest | rate limited | `idle` / `SUBMITTED` | `RATE_LIMITED` |
