# Database Contract: Authentication Functions

**Schema**: `STUDITOPIA`
**Namespace / Domain**: `authentication`
**Feature**: `specs/001-auth-schema`
**Date**: 2026-11-14

This document defines the interface contract between the PostgreSQL database layer and backend consumers (e.g. NestJS service / Directus proxy) for authentication operations.

---

## 1. Registration & Validation Contracts

### `STUDITOPIA.REGISTER`
Creates a new account, hashes the password, and returns an onboarding session.

```sql
FUNCTION STUDITOPIA.REGISTER(
    PDISPLAYNAME TEXT,
    PEMAIL TEXT,
    PUSERNAME TEXT,
    PPASSWORD TEXT
) RETURNS TABLE (
    USER_ID INT,
    SESSION_ID INT,
    ACCOUNT_ROLE TEXT,
    ACCOUNT_STATUS TEXT
);
```

- **Parameters**:
  - `PDISPLAYNAME`: Display name string (8-32 characters, regex `^[a-zA-Z0-9]+([ ][a-zA-Z0-9]+)*$`).
  - `PEMAIL`: Institutional email string (8-254 characters, RFC regex, whitelisted domain).
  - `PUSERNAME`: Unique username string (8-32 characters, lowercase alphanumeric/dots).
  - `PPASSWORD`: Plaintext password string to be cryptographically hashed.
- **Return Values**: Single row with created `USER_ID`, newly issued `SESSION_ID`, initial `ACCOUNT_ROLE` (`'STUDENT'`), and `ACCOUNT_STATUS` (`'INACTIVE'`).
- **Exceptions Raised**:
  - `45001`: `INVALID DISPLAY NAME`
  - `45002`: `INVALID EMAIL NAME`
  - `46001`: `Domain of this email wasnt registered!`
  - `47001`: `Conflict email address!`
  - `45003`: `INVALID USERNAME NAME`
  - `47002`: `DUPPLICATE USERNAME`

---

### `STUDITOPIA.EMAIL_VALIDATION`
Standalone validator for prospective email availability and validity.

```sql
FUNCTION STUDITOPIA.EMAIL_VALIDATION(PEMAIL TEXT) RETURNS BOOLEAN;
```

- **Parameters**: `PEMAIL` (string)
- **Returns**: `TRUE` if format is valid, domain is in `DOMAIN` table, and email does not exist in `ACCOUNT`.
- **Exceptions Raised**: `45002`, `46001`, `47001`.

---

### `STUDITOPIA.USERNAME_VALIDATION`
Standalone validator for username availability and validity.

```sql
FUNCTION STUDITOPIA.USERNAME_VALIDATION(PUSERNAME TEXT) RETURNS BOOLEAN;
```

- **Parameters**: `PUSERNAME` (string)
- **Returns**: `TRUE` if username complies with naming rules and does not exist in `ACCOUNT`.
- **Exceptions Raised**: `45003`, `47002`.

---

## 2. Authentication (Login & Logout) Contracts

### `STUDITOPIA.LOGIN_BY_USERNAME`
Authenticates a user via username and password, issuing a new session.

```sql
FUNCTION STUDITOPIA.LOGIN_BY_USERNAME(
    PUSERNAME TEXT,
    PPASSWORD TEXT
) RETURNS TABLE (
    SESSION_ID INT,
    USER_ID INT,
    ROLE TEXT,
    STATUS TEXT
);
```

- **Parameters**:
  - `PUSERNAME`: Registered username.
  - `PPASSWORD`: Plaintext password to compare against stored hash.
- **Returns**: Single row with new `SESSION_ID`, authenticated `USER_ID`, `ROLE`, and current `STATUS`.
- **Exceptions Raised**: `45007` (`INVALID CREDENTIALS`) on not found or hash mismatch.

---

### `STUDITOPIA.LOGIN_BY_EMAIL`
Authenticates a user via institutional email and password, issuing a new session.

```sql
FUNCTION STUDITOPIA.LOGIN_BY_EMAIL(
    PEMAIL TEXT,
    PPASSWORD TEXT
) RETURNS TABLE (
    SESSION_ID INT,
    USER_ID INT,
    ROLE TEXT,
    STATUS TEXT
);
```

- **Parameters**:
  - `PEMAIL`: Registered email.
  - `PPASSWORD`: Plaintext password.
- **Returns**: Single row with new `SESSION_ID`, authenticated `USER_ID`, `ROLE`, and current `STATUS`.
- **Exceptions Raised**: `45007` (`INVALID CREDENTIALS`) on not found or hash mismatch.

---

### `STUDITOPIA.LOGOUT`
Terminates an active session immediately.

```sql
FUNCTION STUDITOPIA.LOGOUT(
    PSESSION_ID INT,
    PUSER_ID INT
) RETURNS BOOLEAN;
```

- **Parameters**: `PSESSION_ID`, `PUSER_ID`.
- **Returns**: `TRUE` on successful termination.
- **Side Effects**: Sets `SESSION.STATUS = 'INACTIVE'`, sets `SESSION.EXPIRED_TIME = NOW()`.
- **Exceptions Raised**: `45005` (`INVALID SESSION`) if session is not active or mismatched.

---

## 3. Session Verification & Protected Account Contracts

### `STUDITOPIA.SESSION_CHECK`
Internal guard asserting that the given session is active, owned by `USER_ID`, and unexpired.

```sql
FUNCTION STUDITOPIA.SESSION_CHECK(
    SESSION_ID INT,
    USER_ID INT
) RETURNS BOOLEAN;
```

- **Parameters**: `SESSION_ID`, `USER_ID`.
- **Returns**: `TRUE` if valid.
- **Exceptions Raised**: `45005` (`INVALID SESSION`) if invalid or expired.

---

### `STUDITOPIA.GET_EMAIL`
Protected retrieval of the user's registered institutional email.

```sql
FUNCTION STUDITOPIA.GET_EMAIL(
    SESSION_ID INT,
    USER_ID INT
) RETURNS STUDITOPIA.TYPE_EMAIL;
```

- **Parameters**: `SESSION_ID`, `USER_ID`.
- **Returns**: Email string as `TYPE_EMAIL`.
- **Exceptions Raised**: `45005` if session invalid.

---

### `STUDITOPIA.SAVE_OTP`
Stores a numerical one-time passcode for account activation.

```sql
FUNCTION STUDITOPIA.SAVE_OTP(
    SESSION_ID INT,
    USER_ID INT,
    POTP INT
) RETURNS BOOLEAN;
```

- **Parameters**: `SESSION_ID`, `USER_ID`, `POTP` (integer code).
- **Returns**: `TRUE` if updated.
- **Exceptions Raised**: `45005` if session invalid.

---

### `STUDITOPIA.GET_OTP`
Retrieves the pending one-time passcode for the authenticated account.

```sql
FUNCTION STUDITOPIA.GET_OTP(
    PSESSION_ID INT,
    PUSER_ID INT
) RETURNS INT;
```

- **Parameters**: `PSESSION_ID`, `PUSER_ID`.
- **Returns**: `OTP` integer (or `NULL` if none set).
- **Exceptions Raised**: `45005` if session invalid.

---

### `STUDITOPIA.REMOVE_OTP`
Clears any pending one-time passcode from the account.

```sql
FUNCTION STUDITOPIA.REMOVE_OTP(
    PSESSION_ID INT,
    PUSER_ID INT
) RETURNS BOOLEAN;
```

- **Parameters**: `PSESSION_ID`, `PUSER_ID`.
- **Returns**: `TRUE` if updated.
- **Exceptions Raised**: `45005` if session invalid.

---

### `STUDITOPIA.ACTIVE_ACCOUNT`
Activates an inactive account and purges the verification OTP.

```sql
FUNCTION STUDITOPIA.ACTIVE_ACCOUNT(
    SESSION_ID INT,
    USER_ID INT
) RETURNS BOOLEAN;
```

- **Parameters**: `SESSION_ID`, `USER_ID`.
- **Returns**: `TRUE` if account status was `INACTIVE` or `PREINIT` and transitioned to `ACTIVE`.
- **Side Effects**: Sets `ACCOUNT.STATUS = 'ACTIVE'`, sets `ACCOUNT.OTP = NULL`.
- **Exceptions Raised**: `45005` if session invalid.
