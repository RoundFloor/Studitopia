# Quickstart Validation Guide: User Registration

**Feature**: `/specs/001-user-registration/spec.md`

**Date**: 2026-10-29

This guide proves the registration feature works end to end. It is a validation guide, not an implementation guide. The request and response shapes are defined in [contracts/auth-registration.openapi.yaml](./contracts/auth-registration.openapi.yaml), and the data shapes are defined in [data-model.md](./data-model.md).

## Prerequisites

- Node.js compatible with the repository's TypeScript/ESM setup
- npm
- Repository dependencies installed with `npm install`
- For live-database checks only: a PostgreSQL instance with the `studitopia` schema and the `EMAIL_VALIDATION`, `USERNAME_VALIDATION`, and `ACCOUNT_REGISTER` functions available, plus the institutional domain data seeded

The default unit suite uses mocks and does not require a database.

## Automated validation

Run the focused authentication suite first:

```bash
npx vitest run src/packages/authentication
```

Expected outcome: all authentication unit and integration tests written for this feature pass.

Run the complete quality gates:

```bash
npm run test
npm run lint
npm run format
npm run build
npm run test:e2e
```

Expected outcomes:

- `npm run test`: all unit and integration suites pass.
- `npm run lint`: zero oxlint errors.
- `npm run format`: completes successfully with Prettier-applied formatting.
- `npm run build`: TypeScript compiles successfully and produces `dist/`.
- `npm run test:e2e`: all system end-to-end suites pass. This requires the live database and environment configuration described below.

## Live database and server setup

The application reads database settings from configuration backed by the following environment variables:

```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=postgres
export DB_PASSWORD=postgres
export DB_DATABASE=studitopia
```

Start the server:

```bash
npm run start:dev
```

The API is served under `/api/v1` on the configured port (default `8353`). Use the base URL `http://localhost:8353/api/v1` in the scenarios below.

## Scenario 1: Validate an acceptable email

```bash
curl -s 'http://localhost:8353/api/v1/auth/validate?email=student.ab@student.hcmus.edu.vn'
```

Expected result:

```json
{
  "statusCode": 200,
  "success": true
}
```

The exact envelope may omit `data` on success, as defined in the contract.

## Scenario 2: Validate a malformed or ineligible email

```bash
curl -s 'http://localhost:8353/api/v1/auth/validate?email=student.ab@gmail.com'
```

Expected result: `success` is `false`, and `data.email` contains `46001` (`UNREGISTED_EMAIL_DOMAIN`) when the address is well formed but the domain is not eligible.

```bash
curl -s 'http://localhost:8353/api/v1/auth/validate?email=not-an-email'
```

Expected result: `success` is `false`, and `data.email` contains `45002` (`INVALID_EMAIL`).

## Scenario 3: Validate an available username

```bash
curl -s 'http://localhost:8353/api/v1/auth/validate?username=student.ab'
```

Expected result: `success` is `true` when the username is well formed and unused.

## Scenario 4: Validate an invalid username

```bash
curl -s 'http://localhost:8353/api/v1/auth/validate?username=Student.ab'
```

Expected result: `success` is `false`, and `data.username` contains `45003` (`INVALID_USERNAME`).

## Scenario 5: Validate multiple fields at once

```bash
curl -s 'http://localhost:8353/api/v1/auth/validate?username=abc&email=abc@gmail.com'
```

Expected result: `success` is `false`, and the response contains errors for both fields in one `data` object, for example `data.username: [45003]` and `data.email: [46001]`.

## Scenario 6: Register a valid account

```bash
curl -s -X POST 'http://localhost:8353/api/v1/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "displayname": "Student AB",
    "username": "student.ab",
    "email": "student.ab@student.hcmus.edu.vn",
    "password": "Secure@123456"
  }'
```

Expected result: HTTP 201 with `success: true` and `data` containing a non-empty `session_id`, a non-empty `user_id`, and a numeric `status`.

After this call, validating the same username or email must report `47002` (`DUPLICATED_USERNAME`) or `47001` (`DUPLICATED_EMAIL`) respectively, and a second registration with the same values must be rejected.

## Scenario 7: Register with multiple invalid fields

```bash
curl -s -X POST 'http://localhost:8353/api/v1/auth/register' \
  -H 'Content-Type: application/json' \
  -d '{
    "displayname": "short",
    "username": "Bad.Name",
    "email": "bad-email",
    "password": "weak"
  }'
```

Expected result: `success` is `false`, `data` is an array containing every applicable error code, and no account is created. The array should include display-name, username, email, and password validation failures in the same response.

## Scenario 8: Duplicate registration attempt

Register the same username or email twice, changing the other field so that only the duplicate remains.

Expected result: the second attempt returns `success: false` with `47002` (`DUPLICATED_USERNAME`) or `47001` (`DUPLICATED_EMAIL`), and no additional account or session is created.

## Scenario 9: Password pre-check acceptance

```bash
curl -s 'http://localhost:8353/api/v1/auth/validate?password=Secure@123456'
curl -s 'http://localhost:8353/api/v1/auth/validate?password=weak'
```

Expected results:

- The valid password request returns `success: true`.
- The weak password request returns `success: false` with `data.password` containing `45004` (`INVALID_PASSWORD`).

This scenario verifies the password pre-check contract described in [research.md](./research.md): a valid password succeeds and an invalid password reports `INVALID_PASSWORD`.

## Validation checklist

The automated suite validates these items through the test database double. Run the live scenarios above when the database environment is configured.

- [X] Focused authentication unit tests pass.
- [X] Full unit suite passes.
- [X] Lint, format, and build gates pass.
- [X] Email format, domain eligibility, and duplicate-email cases produce the expected codes.
- [X] Username format and duplicate-username cases produce the expected codes.
- [X] Registration aggregates multiple field errors in one response.
- [X] Valid registration returns a session and creates exactly one account.
- [X] Failed registration creates no account, no session, and leaves existing accounts unchanged.
- [X] Password pre-check returns success for a valid password and a password error for an invalid password.
