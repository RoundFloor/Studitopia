# API Contracts: OTP Validation After Registration

**Feature**: `003-otp-register-activation`
**Base Path**: `/api/v1/auth`
**Authentication**: Bearer access token (`Authorization: Bearer <access_token>`) required on all endpoints

---

## Endpoint 1: Request Activation OTP

**Route**: `GET /api/v1/auth/otp?type=active`

**Purpose**: Generate and send a 6-digit OTP to the authenticated user's registered email address for account activation.

### Request

| Part | Key | Value |
|------|-----|-------|
| Header | `Authorization` | `Bearer <access_token>` |
| Query | `type` | `"active"` |

No request body.

### Responses

#### 200 OK — OTP generated and email sent

```json
{
  "created_time": 1731598800000,
  "expired_time": 1731598860000
}
```

| Field | Type | Description |
|-------|------|-------------|
| `created_time` | number | Unix timestamp (ms) when the OTP was generated |
| `expired_time` | number | Unix timestamp (ms) after which the OTP is no longer valid |

#### 400 Bad Request — Invalid type parameter

```json
[40001]
```

Returned when `type` query param is not one of: `active`, `recover`, `delete`.

#### 400 Bad Request — Email delivery unavailable

```json
[48001]
```

Returned when the email sending service cannot deliver the OTP.

#### 401 Unauthorized — Unauthenticated

Returned when the `Authorization` header is missing or the access token is invalid/expired. No body.

---

## Endpoint 2: Submit OTP to Activate Account

**Route**: `POST /api/v1/auth/activate`

**Purpose**: Submit the OTP received by email to activate the authenticated user's account.

### Request

| Part | Key | Value |
|------|-----|-------|
| Header | `Authorization` | `Bearer <access_token>` |
| Header | `Content-Type` | `application/json` |

**Body**:

```json
{
  "created_time": 1731598800000,
  "expired_time": 1731598860000,
  "key": "042857",
  "type": "active"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `created_time` | number | ✅ | The `created_time` value from the OTP request response |
| `expired_time` | number | ✅ | The `expired_time` value from the OTP request response |
| `key` | string | ✅ | The 6-digit OTP code received by email |
| `type` | string | ✅ | Must be `"active"` |

> **Note**: `session_id` and `user_id` are **not** in the request body. The server derives them from the authenticated session (Bearer access token).

### Responses

#### 202 Accepted — Account activated successfully

Empty body. The account status transitions to `ACTIVE`.

#### 401 Unauthorized — Invalid or expired session

```json
[45005]
```

Returned when the session associated with the access token is no longer valid (e.g., user has logged out).

#### 409 Conflict — Invalid OTP

```json
[40002]
```

Returned when any of the following conditions are met:
- OTP `type` field in the body is not `"active"`
- HMAC validation fails (tampered timing fields or wrong key)
- OTP has expired (`expired_time <= current time`)
- Submitted OTP code does not match the stored value
- No OTP is stored for the session (never requested or already consumed)

#### 500 Internal Server Error — Unexpected failure

```json
[45000]
```

Returned on unexpected database errors during account activation.

---

## Token Relationship

The body fields for the activation submission correspond directly to the fields returned by the OTP request:

```
GET /otp → { created_time, expired_time }
              ↓             ↓
POST /activate body: { created_time, expired_time, key: "<6-digit code from email>", type: "active" }
```

The `key` field is obtained from the **email**, not from the OTP request response (which intentionally omits the code).

---

## Error Code Reference

| Code | Value | Meaning |
|------|-------|---------|
| `VALIDATION_ERROR` | 40001 | Invalid `type` query parameter |
| `INVALID_OTP` | 40002 | OTP mismatch, expiry, or type mismatch |
| `INVALID_SESSION` | 45005 | Session not found or invalidated |
| `DATABASE_ERROR` | 45000 | Unexpected DB failure |
| `EMAIL_SENDER_UNVAILABLE` | 48001 | Email delivery service unavailable |
