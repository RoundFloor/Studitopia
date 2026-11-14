# Data Model: OTP Validation After Registration (Account Activation)

**Feature**: `003-otp-register-activation`
**Date**: 2026-11-14

---

## Entities

### 1. User Account

Represents a registered platform user. Owned by the database; relevant fields for this feature:

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `user_id` | string | Primary key; unique; immutable | Assigned at registration |
| `email` | string | Unique; max 254 chars | Registered institutional email |
| `username` | string | Unique; 8–32 chars | Lowercase letters, digits, dots |
| `displayname` | string | 8–32 chars | Alphanumeric words, single spaces |
| `password` | string | Stored as hash | Min 8, max 32 chars with complexity rules |
| `status` | enum | `'INACTIVE'` \| `'ACTIVE'` | Starts `INACTIVE` on registration; becomes `ACTIVE` after OTP activation |
| `role` | enum | e.g. `'STUDENT'` | Assigned at registration |

**State Transition** (this feature's scope):

```
INACTIVE ──[OTP validated]──► ACTIVE
```

No backward transition is in scope. Re-activating an already-`ACTIVE` account is idempotent (no error, no state change).

---

### 2. Session

A short-lived server-side record linking an authenticated user to an active context.

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `session_id` | string | Unique per session | Generated at login/registration |
| `user_id` | string | FK → User Account | Identifies which user the session belongs to |
| `active` | boolean | Implicitly tracked | Removed from active set on logout |

**Lifecycle**: Created at registration (or login). Invalidated by logout. OTP operations require an active session.

---

### 3. OTP Record

A transient, server-side record holding the most recent OTP for a session.

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `session_id` | string | FK → Session; unique key | One OTP per session at a time |
| `user_id` | string | FK → User Account | Used for session validation |
| `otp_value` | number | 6-digit integer (000000–999999) | Stored as integer; zero-padded on comparison |

**Lifecycle**:
- Created/overwritten by `saveOtp` when user requests a new OTP.
- Read by `getOtp` during activation validation.
- Deleted by `activeAccount` on successful activation (for `active` type).
- Deleted by logout via `removeOtp`.

**Constraint**: Only one OTP exists per session at any time. A new request overwrites the existing one.

---

### 4. OTP Token (client-facing payload)

The structured payload returned to the client after a successful OTP request. It is returned to the server verbatim during activation submission.

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| `session_id` | string | Must match the requesting session | Embedded in activation body |
| `user_id` | string | Must match the requesting user | Embedded in activation body |
| `created_time` | number | Unix timestamp (ms) | Time OTP was generated |
| `expired_time` | number | Unix timestamp (ms) | `created_time + OTP_DURATION` |
| `key` | string | 6-character numeric string; zero-padded | The HMAC-derived OTP code |
| `type` | enum | `'active'` for activation flow | Must be `'active'` for this feature |

**Derivation**: `key` is computed as `HMAC-SHA256(payload, OTP_SECRET_KEY)` where `payload` is a JSON object of `{ session_id, user_id, created, expired, type }`. The 6-digit code is extracted from a 4-byte slice at a dynamic offset.

**On submission**: The client sends `{ created_time, expired_time, key, type }`. The server reconstructs the full token by merging the client's access token claims (`session_id`, `user_id`) with the submitted fields.

---

### 5. OTP Response (server → client, request step)

Minimal response returned after a successful OTP generation. Does **not** include the OTP code itself.

| Field | Type | Notes |
|-------|------|-------|
| `created_time` | number | Unix timestamp (ms) |
| `expired_time` | number | Unix timestamp (ms) |

---

## Validation Rules

| Rule | Applies To | Condition |
|------|-----------|-----------|
| Session must be active | OTP Request, OTP Submit | `active_sessions.has(session_id) && sessions[session_id] === user_id` |
| `type` must be `active`, `recover`, or `delete` | OTP Request (`?type=`) | Enforced by controller before service call |
| `type` must be `active` | OTP Submit body | Enforced by controller before `validateOtp` |
| OTP must not be expired | OTP Submit | `expired_time > Date.now()` |
| HMAC must be valid | OTP Submit | Re-derived HMAC equals submitted `key` using timing-safe compare |
| Stored OTP must match | OTP Submit | `Number(token.key) === stored.data` |
| Email must be retrievable | OTP Request | `getEmail` must return `SUCCESS` |

---

## Relationships

```
User Account ──1:N──► Session (one user may have multiple sessions over time)
Session ──1:0..1──► OTP Record (at most one OTP per session, overwritten on re-request)
User Account ──(via Session)──► OTP Token (derived, not stored directly)
```
