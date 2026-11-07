# API

This document describes the current database and backend API for the
`authentication` feature.

- [Database API](#database-api)
- [Backend API](#backend-api)

---

# Database API

SQL API for the `STUDITOPIA` authentication group.

All functions live in the `STUDITOPIA` schema and are called with `SELECT`:

```sql
SELECT ... FROM STUDITOPIA.<function>(...);
```

## Conventions

- Identifiers such as usernames and emails are **case-insensitive** (`citext`).
- An account may have **multiple active sessions at the same time**. Logging in
  creates an additional session and does not revoke existing sessions.
- Sessions expire automatically after **30 days**.
- Protected functions take `(session_id, user_id)` and raise an error when the
  session is missing, belongs to another user, is inactive, or has expired.
- `SESSION_CHECK` and `REGISTER_SESSION` are internal helpers. They are **not**
  part of the public API and are intentionally not documented here.

### Error response format

PostgreSQL reports failures as SQLSTATE codes with a message. Application code
should branch on the SQLSTATE code, not on the message text.

```text
ERROR:  INVALID CREDENTIALS
SQLSTATE: 45007
```

### Error code summary

| SQLSTATE | Message                                  | Meaning                                  |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `45001`  | `INVALID DISPLAY NAME`                   | Display name format/length is invalid    |
| `45002`  | `INVALID EMAIL NAME`                     | Email format or length is invalid        |
| `45003`  | `INVALID USERNAME NAME`                  | Username format or length is invalid     |
| `45004`  | `INVALID PASSWORD`                       | Password does not satisfy the rules      |
| `45005`  | `INVALID SESSION`                        | Session missing, inactive, or expired    |
| `45007`  | `INVALID CREDENTIALS`                    | Username/email and password do not match |
| `46001`  | `Domain of this email wasnt registered!` | Email domain is not in `DOMAIN`          |
| `47001`  | `Conflict email address!`                | Email is already registered              |
| `47002`  | `DUPPLICATE USERNAME`                    | Username is already registered           |

> The custom messages above are the exact messages raised by the SQL functions.
> Database-integrity errors (for example `23502` when a required value is
> `NULL`) can still occur and are not part of the application error contract.

---

## Username validation

### `STUDITOPIA.USERNAME_VALIDATION`

**API**

```sql
STUDITOPIA.USERNAME_VALIDATION(pusername TEXT) RETURNS BOOLEAN
```

**Format**

| Parameter   | Type   | Required | Rules                                                            |
| ----------- | ------ | -------- | ---------------------------------------------------------------- |
| `pusername` | `TEXT` | Yes      | Lowercase, starts with a letter, length 8–32, dot-separated parts |

Allowed format: `^[a-z][a-z0-9]*([.][a-z0-9]+)*$`

**Returns**

| Value  | Meaning                      |
| ------ | ---------------------------- |
| `true` | Username is valid and unused |

**Errors**

| SQLSTATE | Message                 | Condition                                    |
| -------- | ----------------------- | -------------------------------------------- |
| `45003`  | `INVALID USERNAME NAME` | `NULL`, wrong format, or length outside 8–32 |
| `47002`  | `DUPPLICATE USERNAME`   | Another account already uses this username   |

**Example**

```sql
SELECT STUDITOPIA.USERNAME_VALIDATION('student.ab');
--  username_validation
-- ---------------------
--  t
```

---

## Email validation

### `STUDITOPIA.EMAIL_VALIDATION`

**API**

```sql
STUDITOPIA.EMAIL_VALIDATION(pemail TEXT) RETURNS BOOLEAN
```

**Format**

| Parameter | Type   | Required | Rules                                               |
| --------- | ------ | -------- | --------------------------------------------------- |
| `pemail`  | `TEXT` | Yes      | Valid email format, length 8–254, registered domain |

**Returns**

| Value  | Meaning                  |
| ------ | ------------------------ |
| `true` | Email is valid and unused |

**Errors**

| SQLSTATE | Message                                  | Condition                                     |
| -------- | ---------------------------------------- | --------------------------------------------- |
| `45002`  | `INVALID EMAIL NAME`                     | `NULL`, wrong format, or length outside 8–254 |
| `46001`  | `Domain of this email wasnt registered!` | Domain is not present in `STUDITOPIA.DOMAIN`  |
| `47001`  | `Conflict email address!`                | Another account already uses this email       |

**Example**

```sql
SELECT STUDITOPIA.EMAIL_VALIDATION('student.ab@student.hcmus.edu.vn');
--  email_validation
-- ------------------
--  t
```

---

## Register

### `STUDITOPIA.REGISTER`

**API**

```sql
STUDITOPIA.REGISTER(
    pdisplayname TEXT,
    pemail TEXT,
    pusername TEXT,
    ppassword TEXT
) RETURNS TABLE (USER_ID INT, SESSION_ID INT)
```

**Format**

| Parameter      | Type   | Required | Rules                                                     |
| -------------- | ------ | -------- | --------------------------------------------------------- |
| `pdisplayname` | `TEXT` | Yes      | Length 8–32, alphanumeric words separated by single spaces |
| `pemail`       | `TEXT` | Yes      | Must pass `EMAIL_VALIDATION`                              |
| `pusername`    | `TEXT` | Yes      | Must pass `USERNAME_VALIDATION`                           |
| `ppassword`    | `TEXT` | Yes      | Hashed with bcrypt (`gen_salt('bf', 10)`) before storage  |

**Returns**

| Column       | Type  | Meaning               |
| ------------ | ----- | --------------------- |
| `user_id`    | `INT` | New account id        |
| `session_id` | `INT` | New active session id |

The account is created with role `STUDENT` and status `INACTIVE`.

**Errors**

Validation order is display name → username → email, so the first failing check
is reported.

| SQLSTATE | Message                                  | Condition                 |
| -------- | ---------------------------------------- | ------------------------- |
| `45001`  | `INVALID DISPLAY NAME`                   | Invalid display name      |
| `45003`  | `INVALID USERNAME NAME`                  | Invalid username          |
| `47002`  | `DUPPLICATE USERNAME`                    | Username already registered |
| `45002`  | `INVALID EMAIL NAME`                     | Invalid email             |
| `46001`  | `Domain of this email wasnt registered!` | Email domain not registered |
| `47001`  | `Conflict email address!`                | Email already registered  |
| `45004`  | `INVALID PASSWORD`                       | Invalid password          |

**Example**

```sql
SELECT * FROM STUDITOPIA.REGISTER(
    'Student AB',
    'student.ab@student.hcmus.edu.vn',
    'student.ab',
    'Secure@123456'
);
--  user_id | session_id
-- ---------+------------
--        1 |          1
```

---

## Login

### `STUDITOPIA.LOGIN_BY_USERNAME`

**API**

```sql
STUDITOPIA.LOGIN_BY_USERNAME(pusername TEXT, ppassword TEXT)
RETURNS TABLE (SESSION_ID INT, USER_ID INT, ROLE TEXT, STATUS TEXT)
```

**Format**

| Parameter   | Type   | Required | Description                   |
| ----------- | ------ | -------- | ----------------------------- |
| `pusername` | `TEXT` | Yes      | Username (case-insensitive)   |
| `ppassword` | `TEXT` | Yes      | Plain-text password to verify |

**Returns**

| Column       | Type   | Meaning                        |
| ------------ | ------ | ------------------------------ |
| `session_id` | `INT`  | New active session id          |
| `user_id`    | `INT`  | Account id                     |
| `role`       | `TEXT` | `STUDENT`, `STAFF`, or `ADMIN` |
| `status`     | `TEXT` | Account status                 |

The account may already have other active sessions; this login creates an
additional session and leaves them untouched.

**Errors**

| SQLSTATE | Message               | Condition                               |
| -------- | --------------------- | --------------------------------------- |
| `45007`  | `INVALID CREDENTIALS` | Username not found or password mismatch |

**Example**

```sql
SELECT * FROM STUDITOPIA.LOGIN_BY_USERNAME('student.ab', 'Secure@123456');
--  session_id | user_id |  role   | status
-- ------------+---------+---------+----------
--           2 |       1 | STUDENT | INACTIVE
```

---

### `STUDITOPIA.LOGIN_BY_EMAIL`

**API**

```sql
STUDITOPIA.LOGIN_BY_EMAIL(pemail TEXT, ppassword TEXT)
RETURNS TABLE (SESSION_ID INT, USER_ID INT, ROLE TEXT, STATUS TEXT)
```

**Format**

| Parameter   | Type   | Required | Description                   |
| ----------- | ------ | -------- | ----------------------------- |
| `pemail`    | `TEXT` | Yes      | Email address (case-insensitive) |
| `ppassword` | `TEXT` | Yes      | Plain-text password to verify |

**Returns**

Same columns and behavior as `LOGIN_BY_USERNAME`.

**Errors**

| SQLSTATE | Message               | Condition                            |
| -------- | --------------------- | ------------------------------------ |
| `45007`  | `INVALID CREDENTIALS` | Email not found or password mismatch |

**Example**

```sql
SELECT * FROM STUDITOPIA.LOGIN_BY_EMAIL(
    'student.ab@student.hcmus.edu.vn',
    'Secure@123456'
);
--  session_id | user_id |  role   | status
-- ------------+---------+---------+----------
--           3 |       1 | STUDENT | INACTIVE
```

---

## Logout

### `STUDITOPIA.LOGOUT`

**API**

```sql
STUDITOPIA.LOGOUT(psession_id INT, puser_id INT) RETURNS BOOLEAN
```

**Format**

| Parameter     | Type  | Required | Description      |
| ------------- | ----- | -------- | ---------------- |
| `psession_id` | `INT` | Yes      | Active session id |
| `puser_id`    | `INT` | Yes      | Owner account id |

**Returns**

| Value  | Meaning                     |
| ------ | --------------------------- |
| `true` | Session was marked inactive |

The session status becomes `INACTIVE` and `expired_time` is set to `NOW()`.
Other active sessions for the same account are not affected.

**Errors**

| SQLSTATE | Message           | Condition                   |
| -------- | ----------------- | --------------------------- |
| `45005`  | `INVALID SESSION` | Session is not valid/active |

**Example**

```sql
SELECT STUDITOPIA.LOGOUT(2, 1);
--  logout
-- --------
--  t
```

---

## Activate account

### `STUDITOPIA.ACTIVE_ACCOUNT`

**API**

```sql
STUDITOPIA.ACTIVE_ACCOUNT(session_id INT, user_id INT) RETURNS BOOLEAN
```

**Format**

| Parameter    | Type  | Required | Description      |
| ------------ | ----- | -------- | ---------------- |
| `session_id` | `INT` | Yes      | Active session id |
| `user_id`    | `INT` | Yes      | Owner account id |

**Returns**

| Value   | Meaning                                                 |
| ------- | ------------------------------------------------------- |
| `true`  | Account was moved from `INACTIVE`/`PREINIT` to `ACTIVE` |
| `false` | Account is already `ACTIVE` or is `SUSPEND` (no change) |

When activation succeeds the stored OTP is cleared.

**Errors**

| SQLSTATE | Message           | Condition                   |
| -------- | ----------------- | --------------------------- |
| `45005`  | `INVALID SESSION` | Session is not valid/active |

**Example**

```sql
SELECT STUDITOPIA.ACTIVE_ACCOUNT(2, 1);
--  active_account
-- ----------------
--  t
```

---

## Get email

### `STUDITOPIA.GET_EMAIL`

**API**

```sql
STUDITOPIA.GET_EMAIL(session_id INT, user_id INT) RETURNS STUDITOPIA.TYPE_EMAIL
```

**Format**

| Parameter    | Type  | Required | Description      |
| ------------ | ----- | -------- | ---------------- |
| `session_id` | `INT` | Yes      | Active session id |
| `user_id`    | `INT` | Yes      | Owner account id |

**Returns**

| Value        | Meaning                    |
| ------------ | -------------------------- |
| `TYPE_EMAIL` | Email of the account owner |

**Errors**

| SQLSTATE | Message           | Condition                   |
| -------- | ----------------- | --------------------------- |
| `45005`  | `INVALID SESSION` | Session is not valid/active |

**Example**

```sql
SELECT STUDITOPIA.GET_EMAIL(2, 1);
--           get_email
-- -----------------------------
--  student.ab@student.hcmus.edu.vn
```

---

## OTP

### `STUDITOPIA.SAVE_OTP`

**API**

```sql
STUDITOPIA.SAVE_OTP(session_id INT, user_id INT, potp INT) RETURNS BOOLEAN
```

**Format**

| Parameter    | Type  | Required | Description                         |
| ------------ | ----- | -------- | ----------------------------------- |
| `session_id` | `INT` | Yes      | Active session id                   |
| `user_id`    | `INT` | Yes      | Owner account id                    |
| `potp`       | `INT` | Yes      | OTP value to store (overwrites old) |

**Returns**

| Value  | Meaning        |
| ------ | -------------- |
| `true` | OTP was stored |

**Errors**

| SQLSTATE | Message           | Condition                   |
| -------- | ----------------- | --------------------------- |
| `45005`  | `INVALID SESSION` | Session is not valid/active |

**Example**

```sql
SELECT STUDITOPIA.SAVE_OTP(2, 1, 123456);
--  save_otp
-- ----------
--  t
```

---

### `STUDITOPIA.GET_OTP`

**API**

```sql
STUDITOPIA.GET_OTP(psession_id INT, puser_id INT) RETURNS INT
```

**Format**

| Parameter     | Type  | Required | Description      |
| ------------- | ----- | -------- | ---------------- |
| `psession_id` | `INT` | Yes      | Active session id |
| `puser_id`    | `INT` | Yes      | Owner account id |

**Returns**

| Value  | Meaning                    |
| ------ | -------------------------- |
| `INT`  | Current OTP                |
| `NULL` | No OTP is currently stored |

**Errors**

| SQLSTATE | Message           | Condition                   |
| -------- | ----------------- | --------------------------- |
| `45005`  | `INVALID SESSION` | Session is not valid/active |

**Example**

```sql
SELECT STUDITOPIA.GET_OTP(2, 1);
--  get_otp
-- ---------
--   123456
```

---

### `STUDITOPIA.REMOVE_OTP`

**API**

```sql
STUDITOPIA.REMOVE_OTP(psession_id INT, puser_id INT) RETURNS BOOLEAN
```

**Format**

| Parameter     | Type  | Required | Description      |
| ------------- | ----- | -------- | ---------------- |
| `psession_id` | `INT` | Yes      | Active session id |
| `puser_id`    | `INT` | Yes      | Owner account id |

**Returns**

| Value  | Meaning                                          |
| ------ | ------------------------------------------------ |
| `true` | OTP was cleared (it may already have been `NULL`) |

**Errors**

| SQLSTATE | Message           | Condition                   |
| -------- | ----------------- | --------------------------- |
| `45005`  | `INVALID SESSION` | Session is not valid/active |

**Example**

```sql
SELECT STUDITOPIA.REMOVE_OTP(2, 1);
--  remove_otp
-- ------------
--  t
```

---

## Typical database flow

```sql
-- 1. Register (returns user_id and session_id)
SELECT * FROM STUDITOPIA.REGISTER(
    'Student AB',
    'student.ab@student.hcmus.edu.vn',
    'student.ab',
    'Secure@123456'
);

-- 2. Login (creates an additional session)
SELECT * FROM STUDITOPIA.LOGIN_BY_USERNAME('student.ab', 'Secure@123456');

-- 3. Store and verify an OTP
SELECT STUDITOPIA.SAVE_OTP(2, 1, 123456);
SELECT STUDITOPIA.GET_OTP(2, 1);

-- 4. Activate the account (clears the OTP)
SELECT STUDITOPIA.ACTIVE_ACCOUNT(2, 1);

-- 5. Read the authenticated email
SELECT STUDITOPIA.GET_EMAIL(2, 1);

-- 6. Logout
SELECT STUDITOPIA.LOGOUT(2, 1);
```

---

# Backend API

HTTP API for the `authentication` package.

- Global prefix: `/api/v1`
- Authentication base path: `/api/v1/auth`
- Request/response format: JSON
- Default port: `8353` (or `PORT`)

## Response and error conventions

Successful responses return the data directly; there is no `success` wrapper.

Error responses in the authentication API return an **array of numeric response
codes**:

```json
[45003]
```

The message for each code is listed in the
[error code and message reference](#error-code-and-message-reference). The
message text is not currently serialized in the HTTP body.

Request-body validation runs through NestJS `ValidationPipe`. Invalid bodies are
rejected with `422 Unprocessable Entity` and an array of response codes.

Query/body properties that are not part of a DTO are rejected when the
`forbidNonWhitelisted` validation setting applies.

## Authentication and session tokens

### Access token

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

An access token contains the session id and user id and expires after
`AC_DURATION` (currently 30 minutes). Missing, malformed, or expired access
tokens produce `401` with `[40004]`.

### Refresh token

The refresh token is returned only by username/email login as an HTTP-only
cookie:

```http
Set-Cookie: refresh_token=<token>; Path=/api/v1/auth/login; HttpOnly; Secure; SameSite=Strict
```

The cookie is scoped to `/api/v1/auth/login`, so browsers send it only to the
login endpoint. It expires after `RF_DURATION` (currently 30 days).

The refresh token is accepted only by:

```http
POST /api/v1/auth/login?type=token
```

### Sessions

- Registration and login create sessions.
- An account may have multiple active sessions at the same time.
- Logout deactivates only the current session.
- Protected database functions reject missing, inactive, expired, or
  wrong-owner sessions with `45005`.

### OTP lifecycle

- OTPs are sent by email; the OTP value is not returned by the API.
- The OTP value is 6 digits.
- The OTP lifetime is controlled by `OTP_DURATION` (currently 60 seconds).
- The OTP is stored in the database for the session.
- Activation clears the stored OTP.

## Endpoint index

| Method | Path                      | Authentication                               | Purpose                                       |
| ------ | ------------------------- | -------------------------------------------- | --------------------------------------------- |
| `POST` | `/api/v1/auth/register`   | None                                         | Register an account                           |
| `POST` | `/api/v1/auth/login`      | None / refresh cookie for `type=token`       | Log in or refresh an access token             |
| `GET`  | `/api/v1/auth/otp`        | Bearer access token                          | Create and email an OTP                       |
| `POST` | `/api/v1/auth/activate`   | Bearer access token                          | Verify an OTP and activate an account         |
| `POST` | `/api/v1/auth/logout`     | Bearer access token                          | Deactivate the current session                |

---

## Register

### `POST /api/v1/auth/register`

**Query parameters**

None.

**Body**

| Field         | Type   | Required | Rules                                                                                                                                                            |
| ------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `displayname` | string | Yes      | 8–32 characters; alphanumeric words separated by single spaces (`^[a-zA-Z0-9]+([ ][a-zA-Z0-9]+)*$`)                                                              |
| `username`    | string | Yes      | 8–32 characters; starts with a lowercase letter; lowercase letters, digits, and single dots between segments (`^[a-z][a-z0-9]*([.][a-z0-9]+)*$`)                   |
| `email`       | string | Yes      | At most 254 characters; valid email format; domain must be registered in the database                                                                             |
| `password`    | string | Yes      | 8–32 characters; at least one lowercase letter, uppercase letter, digit, and special character; must not contain a null character                                  |

**Example request**

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

**Success — `201 Created`**

```json
{
  "user_id": "1",
  "session_id": "1"
}
```

**Errors**

| Status | Code(s)       | Message                  | Condition                                                  |
| ------ | ------------- | ------------------------ | ---------------------------------------------------------- |
| `422`  | `45001`       | INVALID DISPLAY NAME     | Invalid display name (request validation)                  |
| `422`  | `45002`       | INVALID EMAIL NAME       | Invalid email format or length (request validation)        |
| `422`  | `45003`       | INVALID USERNAME NAME    | Invalid username (request validation)                      |
| `422`  | `45004`       | INVALID PASSWORD         | Password does not satisfy the password rules               |
| `409`  | `45001`       | INVALID DISPLAY NAME     | Database display-name validation failed                    |
| `409`  | `45002`       | INVALID EMAIL NAME       | Database email validation failed                           |
| `409`  | `45003`       | INVALID USERNAME NAME    | Database username validation failed                        |
| `409`  | `45004`       | INVALID PASSWORD         | Database password validation failed                        |
| `409`  | `46001`       | Domain of this email wasnt registered! | Email domain is not registered                |
| `409`  | `47001`       | Conflict email address!  | Email is already registered                                |
| `409`  | `47002`       | DUPPLICATE USERNAME      | Username is already registered                             |
| `409`  | `45000`       | DATABASE ERROR           | Database operation failed                                  |
| `409`  | `2002`        | UNKNOWN ERROR            | Unexpected error                                           |

Multiple validation failures are returned together, for example:

```json
[45001, 45003]
```

---

## Login / refresh access token

### `POST /api/v1/auth/login`

**Query parameters**

| Parameter | Type                                | Required | Description                                                 |
| --------- | ----------------------------------- | -------- | ----------------------------------------------------------- |
| `type`    | `username` \| `email` \| `token`    | Yes      | Selects username login, email login, or refresh-token login |

If `type` is missing or not one of the values above:

```http
400 Bad Request
[40001]
```

### Username and email login

**Body**

| Field        | Type   | Required | Description                                             |
| ------------ | ------ | -------- | ------------------------------------------------------- |
| `identifier` | string | Yes      | Username when `type=username`; email when `type=email`   |
| `password`   | string | Yes      | Plain-text password                                     |

**Example request**

```http
POST /api/v1/auth/login?type=username
Content-Type: application/json

{
  "identifier": "student.ab",
  "password": "Secure@123456"
}
```

**Success — `201 Created`**

```json
{
  "access_token": "<access-token>",
  "role": "STUDENT",
  "status": "INACTIVE"
}
```

`role` is one of `STUDENT`, `STAFF`, or `ADMIN`. `status` is the account status
returned by the login database function.

The response also sets the refresh-token cookie:

```http
Set-Cookie: refresh_token=<refresh-token>; Max-Age=2592000; Path=/api/v1/auth/login; HttpOnly; Secure; SameSite=Strict
```

**Errors**

| Status | Code   | Message              | Condition                                          |
| ------ | ------ | -------------------- | -------------------------------------------------- |
| `400`  | `40001` | VALIDATION ERROR    | `type` is missing or invalid                       |
| `409`  | `18456` | INVALID CREDENTIALS | Username/email not found or password mismatch      |
| `409`  | `45000` | DATABASE ERROR      | Database operation failed                          |
| `409`  | `2002`  | UNKNOWN ERROR       | Unexpected error                                   |

### Refresh-token login

**Query parameters**

```http
type=token
```

**Headers**

| Header   | Required | Description                          |
| -------- | -------- | ------------------------------------ |
| `Cookie` | Yes      | Must contain `refresh_token=<token>` |

**Body**

Ignored for `type=token`.

**Example request**

```http
POST /api/v1/auth/login?type=token
Cookie: refresh_token=<refresh-token>
```

**Success — `201 Created`**

```json
{
  "access_token": "<new-access-token>"
}
```

The refresh cookie is not rotated by this request.

**Errors**

| Status | Code   | Message              | Condition                                                    |
| ------ | ------ | -------------------- | ------------------------------------------------------------ |
| `400`  | `40001` | VALIDATION ERROR    | `type` is missing or invalid                                 |
| `401`  | `40003` | INVALID REFRESH TOKEN | Refresh cookie missing, malformed, invalid, or expired      |

---

## Create OTP

### `GET /api/v1/auth/otp`

Creates an OTP, stores it for the current session, and sends it by email.

**Headers**

| Header         | Required | Description            |
| -------------- | -------- | ---------------------- |
| `Authorization` | Yes      | `Bearer <access-token>` |

**Query parameters**

| Parameter | Type                          | Required | Default  | Description |
| --------- | ----------------------------- | -------- | -------- | ----------- |
| `type`    | `active` \| `recover` \| `delete` | No   | `active` | OTP purpose |

**Example request**

```http
GET /api/v1/auth/otp?type=active
Authorization: Bearer <access-token>
```

**Success — `200 OK`**

```json
{
  "created_time": 1730956800000,
  "expired_time": 1730956860000
}
```

The OTP itself is sent to the account email address and is not included in the
response.

**Errors**

| Status | Code   | Message                   | Condition                                                               |
| ------ | ------ | ------------------------- | ----------------------------------------------------------------------- |
| `400`  | `40001` | VALIDATION ERROR         | `type` is not `active`, `recover`, or `delete`                          |
| `401`  | `40004` | INVALID ACCESS TOKEN     | Access token missing, malformed, or expired                             |
| `400`  | `45005` | INVALID SESSION          | Session missing, inactive, expired, or owned by another user            |
| `400`  | `48001` | EMAIL SENDER UNAVAILABLE | Email sender reported an unsuccessful delivery                          |
| `500`  | —       | EMAIL DELIVERY FAILED    | Email provider/configuration/transport exception (unhandled, default NestJS 500 response) |
| `400`  | `45000` | DATABASE ERROR           | Database operation failed                                               |
| `400`  | `2002`  | UNKNOWN ERROR            | Unexpected error                                                        |

---

## Activate account / verify OTP

### `POST /api/v1/auth/activate`

Verifies an OTP for the current session.

For `type=active`, a successful verification moves an `INACTIVE`/`PREINIT`
account to `ACTIVE` and clears the stored OTP.

For `type=recover` and `type=delete`, successful verification removes the stored
OTP. No password-recovery or account-deletion operation is currently implemented
by this endpoint.

**Headers**

| Header         | Required | Description            |
| -------------- | -------- | ---------------------- |
| `Authorization` | Yes      | `Bearer <access-token>` |

**Body**

| Field          | Type                              | Required | Description                                               |
| -------------- | --------------------------------- | -------- | --------------------------------------------------------- |
| `created_time` | number                            | Yes      | `created_time` returned by `GET /auth/otp`                |
| `expired_time` | number                            | Yes      | `expired_time` returned by `GET /auth/otp`                |
| `key`          | string                            | Yes      | 6-digit OTP received by email, for example `"123456"`     |
| `type`         | `active` \| `recover` \| `delete` | Yes      | Must match the type used when creating the OTP            |

The body has no class-validator rules; values are verified by the OTP HMAC and
the stored database OTP.

**Example request**

```http
POST /api/v1/auth/activate
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "created_time": 1730956800000,
  "expired_time": 1730956860000,
  "key": "123456",
  "type": "active"
}
```

**Success — `202 Accepted`**

Empty response body.

**Errors**

| Status | Code   | Message              | Condition                                                          |
| ------ | ------ | -------------------- | ------------------------------------------------------------------ |
| `401`  | `40004` | INVALID ACCESS TOKEN | Access token missing, malformed, or expired                        |
| `409`  | `40002` | INVALID OTP          | OTP signature invalid, OTP expired, no stored OTP, or key mismatch |
| `401`  | `45005` | INVALID SESSION      | Session missing, inactive, expired, or owned by another user       |
| `500`  | `45000` | DATABASE ERROR       | Database operation failed                                          |
| `500`  | `2002`  | UNKNOWN ERROR        | Unexpected error                                                   |

---

## Logout

### `POST /api/v1/auth/logout`

Deactivates the current session. Other sessions for the same account remain
active.

**Headers**

| Header         | Required | Description            |
| -------------- | -------- | ---------------------- |
| `Authorization` | Yes      | `Bearer <access-token>` |

**Body**

None.

**Example request**

```http
POST /api/v1/auth/logout
Authorization: Bearer <access-token>
```

**Success — `200 OK`**

Empty response body. The response clears the refresh-token cookie:

```http
Set-Cookie: refresh_token=; Max-Age=0; Path=/api/v1/auth/login; HttpOnly; Secure; SameSite=Strict
```

**Errors**

| Status | Code   | Message              | Condition                                                    |
| ------ | ------ | -------------------- | ------------------------------------------------------------ |
| `401`  | `40004` | INVALID ACCESS TOKEN | Access token missing, malformed, or expired                  |
| `401`  | `45005` | INVALID SESSION      | Session missing, inactive, expired, or owned by another user |
| `401`  | `45000` | DATABASE ERROR       | Database operation failed                                    |
| `401`  | `2002`  | UNKNOWN ERROR        | Unexpected error                                             |

---

## Full backend flow

```text
1. POST /api/v1/auth/register
   body: displayname, username, email, password
   -> 201 { user_id, session_id }

2. POST /api/v1/auth/login?type=username
   body: identifier, password
   -> 201 { access_token, role, status } + Set-Cookie: refresh_token

3. POST /api/v1/auth/login?type=token
   cookie: refresh_token
   -> 201 { access_token }

4. GET /api/v1/auth/otp?type=active
   header: Authorization: Bearer <access_token>
   -> 200 { created_time, expired_time }
   OTP is delivered by email

5. POST /api/v1/auth/activate
   header: Authorization: Bearer <access_token>
   body: created_time, expired_time, key, type=active
   -> 202

6. POST /api/v1/auth/logout
   header: Authorization: Bearer <access_token>
   -> 200
```

---

## Error code and message reference

| Code    | Name                      | Message                                 |
| ------- | ------------------------- | --------------------------------------- |
| `0`     | `SUCCESS`                 | SUCCESS                                 |
| `2002`  | `UNKNOWN_ERROR`           | UNKNOWN ERROR                           |
| `18456` | `INVALID_CREDENTIALS`     | INVALID CREDENTIALS                     |
| `23505` | `UNIQUE_VIOLATION`        | UNIQUE VIOLATION                        |
| `40001` | `VALIDATION_ERROR`        | VALIDATION ERROR                        |
| `40002` | `INVALID_OTP`             | INVALID OTP                             |
| `40003` | `INVALID_REFRESH_TOKEN`   | INVALID REFRESH TOKEN                   |
| `40004` | `INVALID_ACCESS_TOKEN`    | INVALID ACCESS TOKEN                    |
| `40029` | `TOO_MANY_REQUESTS`       | TOO MANY REQUESTS                       |
| `45000` | `DATABASE_ERROR`          | DATABASE ERROR                          |
| `45001` | `INVALID_DISPLAYNAME`     | INVALID DISPLAY NAME                    |
| `45002` | `INVALID_EMAIL`           | INVALID EMAIL NAME                      |
| `45003` | `INVALID_USERNAME`        | INVALID USERNAME NAME                   |
| `45004` | `INVALID_PASSWORD`        | INVALID PASSWORD                        |
| `45005` | `INVALID_SESSION`         | INVALID SESSION                         |
| `46001` | `UNREGISTERED_EMAIL_DOMAIN` | Domain of this email wasnt registered! |
| `46002` | `UNREGISTERED_TOKEN_TYPE` | UNREGISTERED TOKEN TYPE                 |
| `47001` | `DUPLICATED_EMAIL`        | Conflict email address!                 |
| `47002` | `DUPLICATED_USERNAME`     | DUPPLICATE USERNAME                     |
| `48000` | `DATABASE_UNAVAILABLE`    | DATABASE UNAVAILABLE                    |
| `48001` | `EMAIL_SENDER_UNVAILABLE` | EMAIL SENDER UNAVAILABLE                |
| `50001` | `EMAIL_DELIVERY_FAILED`   | EMAIL DELIVERY FAILED                   |
