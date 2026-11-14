# Database Contract: Session Access Authorization

**Feature**: `002-user-login`

**Scope**: Required PostgreSQL additions/changes in schema `studitopia`. The backend cannot
satisfy FR-016, FR-021, or FR-022 without these objects. Existing account/credential functions
remain the authority for username/email/password checks.

## 1. Session `access_version`

Add a monotonically increasing version to each session:

```sql
ALTER TABLE STUDITOPIA.SESSION
    ADD COLUMN ACCESS_VERSION INT NOT NULL DEFAULT 0;
```

Requirements:

- New sessions created by `REGISTER`, `LOGIN_BY_USERNAME`, and `LOGIN_BY_EMAIL` must have
  `ACCESS_VERSION = 0`. The backend uses `0` for the access credential issued at sign-in.
- Existing sessions receive the default `0` during the migration.
- The value is changed only by `END_ACCESS`.
- The value must never decrease.
- The column is part of the session row and must be read under the same transaction/row lock
  used by `END_ACCESS`.

An index on `(SESSION_ID, USER_ID)` is expected to already exist because the session id is the
primary lookup key.

## 2. `STUDITOPIA.GET_SESSION_AUTH`

### Signature

```sql
STUDITOPIA.GET_SESSION_AUTH(
    psession_id INT,
    puser_id INT
) RETURNS TABLE (
    SESSION_ID INT,
    USER_ID INT,
    ACCOUNT_STATUS TEXT,
    SESSION_STATUS TEXT,
    EXPIRED_TIME TIMESTAMPTZ,
    ACCESS_VERSION INT
)
```

### Behavior

1. Locate the session by `psession_id`.
2. Verify it belongs to `puser_id`.
3. Verify `SESSION_STATUS = 'ACTIVE'`.
4. Verify `EXPIRED_TIME > NOW()`.
5. Join the owning account and return its current `ACCOUNT_STATUS`.
6. Return the session's current `ACCESS_VERSION`.
7. Raise SQLSTATE `45005` (`INVALID SESSION`) when the session is missing, belongs to another
   user, is inactive, or is expired.

The function must **not** reject a suspended account. It returns `ACCOUNT_STATUS = 'SUSPENDED'`
so callers can deny access/renewal while preserving the same generic error contract.

### Consumer rules

- Access guard: deny when `ACCOUNT_STATUS = 'SUSPENDED'` or the access token's
  `access_version` does not equal the returned `ACCESS_VERSION`.
- Refresh: deny when `ACCOUNT_STATUS = 'SUSPENDED'`; a valid session/account is otherwise
  allowed to mint a new access token with the returned `ACCESS_VERSION`.
- Sign-out: `END_ACCESS` performs the authoritative check; the guard may also have checked the
  same row.

### SQLSTATE

| SQLSTATE | Message | Condition |
| --- | --- | --- |
| `45005` | `INVALID SESSION` | Missing, wrong owner, inactive, or expired session. |

## 3. `STUDITOPIA.END_ACCESS`

### Signature

```sql
STUDITOPIA.END_ACCESS(
    psession_id INT,
    puser_id INT,
    paccess_version INT
) RETURNS TABLE (
    ACCESS_VERSION INT
)
```

### Behavior

Atomically, in one transaction:

1. Lock the session row.
2. Verify it belongs to `puser_id`.
3. Verify `SESSION_STATUS = 'ACTIVE'`.
4. Verify `EXPIRED_TIME > NOW()`.
5. Join the owning account and verify `ACCOUNT_STATUS <> 'SUSPENDED'`.
6. Verify `ACCESS_VERSION = paccess_version`.
7. Increment `ACCESS_VERSION` by 1.
8. Return the new `ACCESS_VERSION`.
9. **Do not** change `SESSION_STATUS`, `EXPIRED_TIME`, or any other account/session field.

Raise SQLSTATE `45005` (`INVALID SESSION`) for any failed check, including an already-ended or
stale access version. A concurrent second sign-out with the same old version must fail.

### Why not use `LOGOUT`

The existing `STUDITOPIA.LOGOUT` marks the session `INACTIVE` and sets `EXPIRED_TIME = NOW()`.
That ends renewal, which contradicts this feature's clarified behavior. `LOGOUT` is therefore
not called by the new sign-out flow and should be marked deprecated for the authentication flow.
Other callers, if any, must be reviewed before removal.

### SQLSTATE

| SQLSTATE | Message | Condition |
| --- | --- | --- |
| `45005` | `INVALID SESSION` | Missing, wrong owner, inactive, expired, suspended, or stale access version. |

## 4. Migration and Deployment Rules

1. Deploy the database column and both functions before deploying the backend.
2. Old access tokens do not contain `access_version`; the backend must reject them. They expire
   within 30 minutes, and clients can refresh once to obtain a versioned access token.
3. Old refresh tokens remain valid. If their session is active/not expired and the account is not
   suspended, refresh mints a versioned access token.
4. Sessions already marked `INACTIVE` by the old `LOGOUT` remain inactive and cannot renew;
   only the new sign-out flow preserves renewal.
5. Do not deploy a database trigger that changes `access_version` outside `END_ACCESS`; the
   increment is deliberately owned by that function.

## 5. Backend Mapping

| Backend method | Database call | Result |
| --- | --- | --- |
| `PostgresService.getSessionAuth(sessionId, userId)` | `SELECT * FROM studitopia.GET_SESSION_AUTH($1, $2);` | `{ accountStatus, sessionStatus, expiredTime, accessVersion }` or `45005`. |
| `PostgresService.endAccess(sessionId, userId, accessVersion)` | `SELECT * FROM studitopia.END_ACCESS($1, $2, $3);` | New access version or `45005`. |
| Sign-in | Existing `LOGIN_BY_*` | New session with `access_version = 0`; backend mints access token with version 0. |

The `PostgresService` error mapping must map `45005` to `RESPONSE_CODE.INVALID_SESSION` and
leave database/unknown errors on the existing `45000`/`2002` paths.
