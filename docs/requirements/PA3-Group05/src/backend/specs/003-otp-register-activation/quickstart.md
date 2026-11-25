# Quickstart Validation Guide: OTP Validation After Registration

**Feature**: `003-otp-register-activation`
**Date**: 2026-11-14

This guide describes how to validate that the OTP activation feature works correctly end-to-end. It covers prerequisites, test commands, and expected outcomes for each scenario defined in the spec.

---

## Prerequisites

- Node.js installed; project dependencies installed (`npm install`)
- Vitest available (`npm run test`)
- E2E test harness available (`npm run test:e2e`)
- All existing tests pass before starting

---

## Validation Scenario 1: Happy Path — Request and Submit OTP

**Goal**: A newly registered user receives a session, requests an OTP, and activates their account.

**Test type**: E2E (`test/auth-otp-activation.e2e-spec.ts`)

**Steps**:

1. Register a new account via `POST /api/v1/auth/register` with valid credentials → expect `201` with `access_token` and `status: "INACTIVE"`.
2. Using the returned `access_token`, call `GET /api/v1/auth/otp?type=active` → expect `200` with `{ created_time, expired_time }`.
3. Retrieve the OTP code from the in-memory store (via `storage.otps`) since email is mocked.
4. Submit `POST /api/v1/auth/activate` with `{ created_time, expired_time, key: "<otp>", type: "active" }` → expect `202`.
5. Assert `storage.account.get(email).activate === true`.

**Expected outcome**: `202 Accepted`, account status flips to `ACTIVE`.

---

## Validation Scenario 2: Expired OTP Rejection

**Goal**: An expired OTP is rejected without changing account status.

**Test type**: Unit (`src/packages/authentication/__tests__/auth.service.spec.ts`) + E2E

**Steps**:

1. Register and request an OTP as in Scenario 1.
2. Construct an activation body using the **real** `created_time` and `expired_time` from the response, but with `expired_time` already past (use `SecurityGenerationService` with a very short `OTP_DURATION`, e.g. 1ms, or construct the `KeyReponse` with `expired_time = Date.now() - 1`).
3. Submit `POST /api/v1/auth/activate` → expect `409` with `[40002]`.
4. Assert account remains `INACTIVE`.

**Expected outcome**: `409 Conflict`, `[40002]`, account unchanged.

---

## Validation Scenario 3: Wrong OTP Code Rejection

**Goal**: An incorrect OTP code is rejected.

**Test type**: Unit + E2E

**Steps**:

1. Register and request an OTP.
2. Submit the activation body with an incorrect `key` (e.g., `"000000"` unless that happens to be the real OTP).
3. Submit `POST /api/v1/auth/activate` → expect `409` with `[40002]`.

**Expected outcome**: `409 Conflict`, `[40002]`, account unchanged.

---

## Validation Scenario 4: Wrong Type Rejection (body `type` ≠ `active`)

**Goal**: A token with `type: "recover"` submitted to the activation endpoint is rejected.

**Test type**: Unit (controller) + E2E

**Steps**:

1. Register and request an OTP.
2. Submit `POST /api/v1/auth/activate` with `type: "recover"` in the body → expect `409` with `[40002]`.

**Expected outcome**: `409 Conflict`, `[40002]` (type mismatch guard in controller fires before service call).

---

## Validation Scenario 5: Invalid Session Rejection

**Goal**: An invalidated session cannot activate an account.

**Test type**: E2E

**Steps**:

1. Register and request an OTP.
2. Log out via `POST /api/v1/auth/logout` → expect `200`.
3. Submit `POST /api/v1/auth/activate` using the original (now-invalid) access token and OTP → expect `401` with `[45005]`.

**Expected outcome**: `401 Unauthorized`, `[45005]`.

---

## Validation Scenario 6: Re-request OTP Invalidates Previous

**Goal**: After re-requesting, only the new OTP activates the account.

**Test type**: Unit + E2E

**Steps**:

1. Register and request OTP #1; note `key_1`.
2. Request OTP again (`GET /api/v1/auth/otp?type=active`) → note `key_2`.
3. Confirm `storage.otps.get(session_id)` equals `Number(key_2)`, not `Number(key_1)`.
4. Attempt activation using `key_1` → expect `409` with `[40002]`.
5. Attempt activation using `key_2` → expect `202`.

**Expected outcome**: Only OTP #2 succeeds; OTP #1 is invalidated.

---

## Validation Scenario 7: Invalid `type` Query Param on OTP Request

**Goal**: An invalid `type` query param is rejected before OTP generation.

**Test type**: E2E

**Steps**:

1. Register and obtain access token.
2. Call `GET /api/v1/auth/otp?type=invalid` → expect `400` with `[40001]`.
3. Confirm `storage.otps` has no entry for the session.

**Expected outcome**: `400 Bad Request`, `[40001]`, no OTP stored.

---

## Running the Tests

```bash
# Unit and integration tests only
npm run test

# E2E tests only
npm run test:e2e

# All tests
npm run test && npm run test:e2e
```

> See [`contracts/api.md`](./contracts/api.md) for the full endpoint contract and [`data-model.md`](./data-model.md) for entity definitions.

---

## Test File Locations

| Test Type | File |
|-----------|------|
| Auth service unit tests | `src/packages/authentication/__tests__/auth.service.spec.ts` |
| Auth controller integration tests | `src/packages/authentication/__tests__/auth.controller.spec.ts` |
| OTP-specific testcases | `src/packages/authentication/__tests__/auth.otp.testcases.ts` *(new)* |
| E2E activation flow | `test/auth-otp-activation.e2e-spec.ts` *(new)* |
