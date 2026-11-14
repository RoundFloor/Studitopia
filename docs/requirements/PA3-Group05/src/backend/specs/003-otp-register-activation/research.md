# Research: OTP Validation After Registration (Account Activation)

**Feature**: `003-otp-register-activation`
**Date**: 2026-11-14
**Branch**: `003-otp-register-activation`

---

## 1. How the existing OTP mechanism works

### Decision
The OTP is a **6-digit HMAC-derived numeric code**, not a randomly generated number. The HMAC is computed over a JSON payload that includes `session_id`, `user_id`, `created_time`, `expired_time`, and `type`, using a shared secret (`OTP_SECRET_KEY`).

### Rationale
- The OTP token returned to the client is a full `KeyReponse` struct: `{ session_id, user_id, created_time, expired_time, key, type }`.
- The client must send **this entire token verbatim** in the activation body — there is no separate OTP code field; the token is the OTP container.
- Server-side validation (`validateOTP`) re-derives the HMAC from the payload fields in the token and compares it to the stored `key` using timing-safe equality.
- Expiry is checked first (`expired_time <= Date.now()`).
- The stored OTP in the database (`saveOtp` / `getOtp`) is a **number** (the integer parsed from the 6-digit string key). Comparison: `stored.data !== Number(token.key)`.

### Alternatives Considered
- Random OTP with no HMAC: simpler but cannot detect tampered timing metadata without a separate DB lookup.
- JWT for OTP: heavier and unnecessary given the existing `KeyReponse` token system.

---

## 2. OTP Request flow (createOtp)

### Decision
`createOtp` in `AuthenticationService` does five ordered steps:

1. `securityService.createOTP(session_id, user_id, type)` → generates HMAC key + timing metadata
2. `postgres.saveOtp(session_id, user_id, Number(otp.key))` → persists OTP as integer; fails with `INVALID_SESSION` if session is gone
3. `postgres.getEmail(session_id, user_id)` → retrieves user's registered email; fails with `INVALID_SESSION` or `DATABASE_ERROR`
4. `emailSender.sendOtp({ to, otp: otp.key, purpose: 'register' })` → sends email
5. Returns `OTPResponse(created_time, expired_time)` on success, or `RESPONSE_CODE.EMAIL_SENDER_UNVAILABLE` on email failure

### Key observation for testing
`OTPResponse` is returned (not an error code) on success. The controller distinguishes success via `instanceof OTPResponse`.

### Rationale
The email send never actually fails in the current implementation (errors are swallowed in `EmailSenderService.sendOtp` and fall back to Discord webhook). The spec still documents the failure path as it is part of the contract.

---

## 3. OTP Activation flow (validateOtp + activateAccount)

### Decision
`validateOtp` performs checks in order:

1. `securityService.validateOTP(token)` — HMAC re-derivation + expiry check. Returns `false` → `INVALID_OTP`.
2. `postgres.getOtp(session_id, user_id)` — retrieves stored integer OTP. `INVALID_SESSION` or missing data → respective error code.
3. Numeric comparison: `stored.data !== Number(token.key)` → `INVALID_OTP`.
4. If `token.type == 'active'`: calls `postgres.activeAccount(session_id, user_id)` → activates account, removes OTP from DB inside mock (actual DB uses stored procedure `studitopia.ACTIVE_ACCOUNT`).

The controller (`activateAccount`) adds a **type pre-check** before calling `validateOtp`: if `otpRequest.type != 'active'` → returns `RESPONSE_CODE.INVALID_OTP` immediately.

### Rationale
Two-step type check: once in controller (endpoint guard) and once implicitly via the HMAC (since `type` is part of the signed payload). This prevents `recover`/`delete` tokens from being submitted to the activation endpoint.

---

## 4. Session token format and authentication

### Decision
The activation endpoints require a **Bearer access token** in the `Authorization` header. `@Authenticated()` / `@KeySession` decorators extract and validate the access token via `SecurityGenerationService.revertAccessToken`.

The OTP token body (`OTPRequest`) carries its own `session_id` and `user_id` **from the OTP request response** — these must match the session that made the original OTP request.

### Key insight for contracts
The `OTPRequest` interface has: `{ created_time, expired_time, key, type }` — the same fields as the `OTPResponse` plus `type`. The controller then constructs a full `KeyReponse` by merging these with `key.session_id` and `key.user_id` from the access token.

---

## 5. Response codes relevant to this feature

| Code | Value | Meaning |
|------|-------|---------|
| `SUCCESS` | 0 | Operation succeeded |
| `VALIDATION_ERROR` | 40001 | Invalid `type` query param on OTP request |
| `INVALID_OTP` | 40002 | OTP mismatch, expiry, or type mismatch |
| `INVALID_SESSION` | 45005 | Session not found or already invalidated |
| `DATABASE_ERROR` | 45000 | Email lookup or account activation failure |
| `EMAIL_SENDER_UNVAILABLE` | 48001 | Email delivery failed (not currently reachable in practice) |

---

## 6. HTTP status codes used

| Scenario | HTTP Status |
|----------|-------------|
| OTP generated and email sent | `200 OK` |
| Account activated successfully | `202 Accepted` |
| Invalid `type` query param | `400 Bad Request` |
| OTP created but email unavailable | `400 Bad Request` |
| Unauthenticated request | `401 Unauthorized` |
| Invalid/expired OTP or type mismatch | `409 Conflict` |
| Invalid session on activation | `401 Unauthorized` |
| Unexpected server error | `500 Internal Server Error` |

---

## 7. Existing test infrastructure patterns

### Decision
New tests for OTP activation should follow the established pattern:

- **Unit/integration tests** in `src/packages/authentication/__tests__/` using `*.spec.ts` suffix
- **E2E tests** in `test/` using `*.e2e-spec.ts` suffix
- Mocks: `PostgresServiceMock` (from `pg.service.mock.ts`), `SecurityGenerationServiceMock` (from `sg.mock.ts`), `EmailSenderServiceMock` (from `email-sender.service.mock.ts`)
- In-memory `storage` from `pg.testcases.ts` for state management across test cases
- Vitest as the test runner; `vi.fn()` for mocking; `supertest` for HTTP-level E2E

### New mock methods needed
`PostgresServiceMock` already has all required methods for this feature:
- `saveOtp` ✅
- `getOtp` ✅
- `removeOtp` ✅ (not used in `active` path but `activeAccount` clears OTP internally)
- `activeAccount` ✅
- `getEmail` ✅

No new mock methods need to be introduced.

### New testcase file
A new `auth.otp.testcases.ts` file should provide structured test data for:
- Valid OTP flow
- Expired OTP
- Invalid OTP code
- Invalid session
- Wrong type submission

---

## 8. Constitution compliance check

| Principle | Status |
|-----------|--------|
| TDD (Red-Green-Refactor) | ✅ All new tests written before implementation code |
| Package-by-Folder (authentication package) | ✅ All changes within `src/packages/authentication/` |
| Adaptive role placement | ✅ One test file added to `__tests__/`; no new role sub-folders needed |
| Mandatory Module | ✅ No new module; feature extends existing `auth.module.ts` |
| Test file in `__tests__/` | ✅ |
| No new packages needed | ✅ All dependencies already imported by `AuthenticationService` |
| `docs/API.md` update | Required if existing API docs exist |

---

## 9. All clarifications resolved

| Question | Resolution |
|----------|------------|
| Does OTP activation remove the stored OTP? | Yes — `activeAccount` in the mock deletes from `storage.otps`; DB stored procedure `ACTIVE_ACCOUNT` presumably does the same |
| Is re-activating an already-active account safe? | The mock sets `activate = true` idempotently; no error is returned |
| Does a re-requested OTP invalidate the previous? | Yes — `saveOtp` overwrites the stored OTP for the session key |
| Is `removeOtp` called after activation? | Only on `recover`/`delete` paths; `activeAccount` handles OTP cleanup for `active` path |
| What endpoint prefix is used? | `GET /api/v1/auth/otp?type=active` and `POST /api/v1/auth/activate` |
