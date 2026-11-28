# Data Model: User Login and Session Access

**Feature**: `002-user-login`

**Source**: [spec.md](./spec.md), [research.md](./research.md), current PostgreSQL authentication
contract.

## Overview

The feature operates on existing accounts and sessions. One new session field and two database
functions are required to distinguish "access ended" from "session ended" and to enforce
suspension at use time. No account table redesign, new account entity, or refresh-token store is
introduced; refresh credentials remain stateless HMAC tokens.

## Entities

### User Account

Represents the existing identity used for credential verification and authorization.

| Field | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `user_id` | integer | primary key | Stable account identifier. |
| `username` | `citext` | unique, not null | Case-insensitive login identifier. |
| `email` | `citext` | unique, not null | Case-insensitive login identifier. |
| `displayname` | text | not null | Existing profile value; not used by this feature. |
| `password` | text | not null | Stored hash only; never returned or logged. |
| `role` | text | not null | `STUDENT`, `STAFF`, or `ADMIN`; returned at sign-in. |
| `status` | text | not null | `INACTIVE`, `ACTIVE`, or `SUSPENDED` are the relevant values. Other non-suspended statuses may complete activation. |

**Login-relevant rules**:
- Username and email matching is case-insensitive.
- An unknown identifier and a wrong password produce the same generic credential error.
- Every status may complete credential verification and receive `role`/`status`.
- `SUSPENDED` accounts cannot use protected access or renewal, including credentials issued
  during a suspended sign-in.

### Session

Represents one independent signed-in context. An account may have many active sessions.

| Field | Type | Constraints | Notes |
| --- | --- | --- | --- |
| `session_id` | integer | primary key | Returned by register/login and embedded in tokens. |
| `user_id` | integer | not null, references account | Owner of the session. |
| `status` | text | not null | `ACTIVE`/`INACTIVE`; session authorization requires `ACTIVE`. New logout behavior leaves it `ACTIVE`. |
| `expired_time` | timestamp | not null | Normal session expiry (30 days from creation). Sign-out must not change it. |
| `access_version` | integer | not null, default `0` | **New field.** Monotonic counter used to invalidate access tokens for this session without ending the session. |
| `created_time` | timestamp | existing | Creation time; retained for lifecycle reporting. |

**Invariants**:
- A successful sign-in creates exactly one new session with `access_version = 0`.
- Existing sessions are never modified by another sign-in.
- `END_ACCESS` increments `access_version` for one session only.
- `access_version` never decreases.
- A session with `status = INACTIVE` or `expired_time <= now()` cannot authorize access or
  renewal.
- A session whose owner is `SUSPENDED` cannot authorize access or renewal, regardless of session
  status.

### Access Credential

Short-lived HMAC token used only for protected requests.

| Claim | Type | Notes |
| --- | --- | --- |
| `session_id` | string | Session identifier. |
| `user_id` | string | Account identifier. |
| `created_time` | number | Millisecond issue time. |
| `expired_time` | number | Millisecond expiry (`created_time + 30 minutes`). |
| `type` | `"access"` | Distinguishes from refresh/OTP tokens. |
| `access_version` | number | **New claim.** Must match the session's current `access_version`. |

**Validation rules**:
- HMAC signature must be valid and use the access secret.
- `type` must be `"access"`.
- `expired_time` must be greater than the current time.
- The session must exist, belong to the claimed user, be active, and not be expired.
- The account must not be `SUSPENDED`.
- `access_version` must equal the current session `access_version`.
- A missing/legacy version is invalid and results in `401 [INVALID_ACCESS_TOKEN]`.
- Access credentials are never accepted for renewal or sign-out after their version is rotated.

### Renewal Credential

Long-lived HMAC token used only to obtain a new access credential.

| Claim | Type | Notes |
| --- | --- | --- |
| `session_id` | string | Session identifier. |
| `user_id` | string | Account identifier. |
| `created_time` | number | Millisecond issue time. |
| `expired_time` | number | Millisecond expiry (`created_time + 30 days`). |
| `type` | `"refresh"` | Distinguishes from access/OTP tokens. |

**Validation rules**:
- HMAC signature must be valid and use the refresh secret.
- `type` must be `"refresh"`.
- `expired_time` must be greater than the current time.
- The session must exist, belong to the claimed user, be active, and not be expired.
- The account must not be `SUSPENDED`.
- The credential is accepted only at `POST /api/v1/auth/login?type=token`.
- It is not rotated, extended, or replaced by a successful refresh.
- It is not revoked by sign-out; it remains valid until `expired_time`.
- It is never accepted as proof of an authenticated session for protected endpoints.

### Sign-In Request

| Field | Location | Type | Validation |
| --- | --- | --- | --- |
| `type` | query | `username` \| `email` \| `token` | Required; any other value is `400 [VALIDATION_ERROR]`. |
| `identifier` | body | string | Required and non-empty when `type` is `username` or `email`; ignored when `type=token`. |
| `password` | body | string | Required and non-empty when `type` is `username` or `email`; ignored when `type=token`; never logged. |

For `type=token`, the refresh cookie is required. For username/email, the refresh cookie is
ignored as input and a new one is set on success.

## State Transitions

### Successful sign-in

```text
Account exists (any status)
  -> credentials verified by LOGIN_BY_USERNAME / LOGIN_BY_EMAIL
  -> new Session: status ACTIVE, expired_time = now + 30 days, access_version = 0
  -> new Access Credential: access_version = 0
  -> new Renewal Credential: expires in 30 days
  -> response 201 { access_token, role, status } + refresh cookie
```

Existing sessions are untouched.

### Successful renewal

```text
Refresh Credential valid
  -> session exists / owner matches / ACTIVE / not expired
  -> account status is not SUSPENDED
  -> mint Access Credential with current session access_version
  -> response 201 { access_token }
  -> refresh cookie unchanged
```

### Successful sign-out

```text
Access Credential valid
  -> session exists / owner matches / ACTIVE / not expired
  -> account status is not SUSPENDED
  -> supplied access_version matches current access_version
  -> current access_version += 1
  -> session status and expired_time unchanged
  -> response 200 empty body
  -> refresh cookie unchanged
```

The old access credential is now rejected because its version is stale. A later renewal mints a
new access credential with the new version.

### Account suspension

```text
Account status becomes SUSPENDED
  -> no session mutation required
  -> every subsequent access/refresh for every session fails the status check
  -> an already-suspended sign-in may create a session and return SUSPENDED
  -> that session's access/refresh are rejected while suspended
```

### Account reactivation or unsuspension

```text
Account status becomes ACTIVE/INACTIVE
  -> sessions whose access_version still matches can authorize again if session is active/not expired
  -> renewal can mint access again if session is active/not expired
```

The feature does not define an unsuspension operation; behavior above follows from the status
check.

## Database Additions

Detailed signatures are in [contracts/database-session.md](./contracts/database-session.md).

- `SESSION.ACCESS_VERSION INT NOT NULL DEFAULT 0`
- `STUDITOPIA.GET_SESSION_AUTH(psession_id INT, puser_id INT)` returns session/account
  authorization data.
- `STUDITOPIA.END_ACCESS(psession_id INT, puser_id INT, paccess_version INT)` atomically verifies
  and increments the access version.
- Existing `STUDITOPIA.LOGOUT` is no longer called by the backend for this flow and should be
  marked deprecated in the database documentation.

## Validation and Error Contract

| Condition | Result |
| --- | --- |
| Missing/unsupported `type` | `400 [40001]`, no credential check. |
| Missing/empty identifier or password for username/email | `422 [40001]`, no credential check. |
| Unknown identifier or wrong password | `409 [18456]`, no session creation. |
| Suspended account with valid credentials | `201` with `status: SUSPENDED`; credentials are issued but unusable for protected access/renewal. |
| Missing/malformed/expired/tampered/suspended access credential | `401 [40004]`. |
| Missing/malformed/expired/tampered/suspended retry at refresh | `401 [40003]`. |
| Invalid/already-ended access credential at sign-out | `401 [45005]`. |
| Database failure | Existing `45000`/`2002` mapping; no unrelated session mutation. |
