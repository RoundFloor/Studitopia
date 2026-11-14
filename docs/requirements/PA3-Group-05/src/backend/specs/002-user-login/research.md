# Phase 0 Research: User Login and Session Access

**Feature**: `002-user-login`

**Input**: [spec.md](./spec.md), [plan.md](./plan.md), current authentication implementation,
and the authentication database documentation.

## Current Implementation Findings

| Area | Current behavior | Gap against the specification |
| --- | --- | --- |
| Login input | `AuthController.login` accepts an inline `{ identifier, password }` body and a raw `type` query value. `LoginDto` has fields but no validators. | Missing/empty identifier or password is not reliably rejected before the database call (FR-008, FR-009). |
| Login result | Username/email login calls `LOGIN_BY_USERNAME` or `LOGIN_BY_EMAIL`, creates access and refresh tokens, returns `role`/`status`, and sets the refresh cookie. | Account status is reported but never enforced (FR-019, FR-020, FR-022). |
| Access guard | `@Authenticated()` applies `SecurityGenerationService`, whose `canActivate` only parses the bearer/cookie and always returns `true`. | Protected access is not checked against current session or account state (FR-021). |
| Access token | HMAC-signed payload contains session id, user id, created/expiry times, and type. | No server-side access generation/version exists, so an access token cannot be invalidated before expiry (FR-016). |
| Logout | `AuthenticationService.logout` calls `PostgresService.logout`, which calls `STUDITOPIA.LOGOUT`; the database marks the session `INACTIVE` and expires it immediately. The controller also clears the refresh cookie. | Sign-out must end only access and leave renewal usable until expiry (FR-016). Clearing the cookie and deactivating the session prevent resumption. |
| Refresh | `AuthenticationService.refresh` checks only the refresh token expiry, then mints a new access token for the same session. It does not check the database and does not rotate the cookie. | Renewal is not denied for suspended accounts or invalid sessions (FR-012, FR-021, FR-022); after logout the minted access token targets an inactive session and is unusable for database-protected operations. |
| Suspension | The login database function returns the account status. No other path consults it. | Suspension must stop existing sessions' access and renewal immediately, and already-suspended sign-in must produce no usable protected access or renewal (FR-021, FR-022). |
| Error mapping | Unknown identifier and wrong password both map to `INVALID_CREDENTIALS`; refresh and access errors already have generic codes. | Keep this behavior; no user enumeration (FR-007). |
| Throttling | None. | Correct for this feature; abuse controls are explicitly out of scope. |
| Multiple sessions | Login creates a new session and leaves existing sessions untouched. | Keep this behavior (FR-006). |

Relevant files:

- `src/packages/authentication/auth.controller.ts`
- `src/packages/authentication/auth.service.ts`
- `src/packages/authentication/dto/login.dto.ts`
- `src/packages/security-generation/sg.service.ts`
- `src/packages/security-generation/sg.guard.ts`
- `src/packages/security-generation/decorators/token-bearer.decorators.ts`
- `src/packages/postgres/pg.service.ts`
- `docs/database/authentication.md`

## Decisions

### Decision 1: Add a per-session access version

Add `access_version INT NOT NULL DEFAULT 0` to the session record. New sessions start at `0`.
Access tokens include the version. Every protected request compares the token version with the
current database version.

**Rationale**:
- Sign-out can invalidate the current access credential without deactivating the session.
- A refresh after sign-out uses the current database version and therefore creates a usable new
  access credential, satisfying FR-016 and US3.
- The version is scoped to one session, so other sessions remain unaffected (FR-006).

**Alternatives rejected**:
- **Keep `LOGOUT` deactivating the session**: a refreshed access token targets an inactive
  session and cannot reach protected database functions.
- **In-memory blacklist**: not durable, not shared across processes, and loses state on restart.
- **Account-level version**: would invalidate all sessions, violating independent-session
  behavior.
- **Trust `expired_time` set at logout**: still cannot distinguish a prior access token from a
  newly refreshed one without a version or issuance-time comparison, and app/database clock skew
  makes timestamp comparison unsafe.

### Decision 2: Replace logout's database operation with `END_ACCESS`

The backend stops calling `STUDITOPIA.LOGOUT`. It calls
`STUDITOPIA.END_ACCESS(session_id, user_id, access_version)`, which atomically:

1. verifies the session exists, belongs to the user, is active, and is not expired;
2. verifies the account is not suspended;
3. verifies the supplied version equals the current version;
4. increments the version and returns the new version.

It does **not** change session status or `expired_time`.

**Rationale**: The access credential becomes unusable immediately (version mismatch), while the
refresh credential remains valid and can obtain a new access token with the new version.
The atomic version check also makes "already ended" sign-out requests fail cleanly (FR-017).

**Alternatives rejected**:
- **Change `LOGOUT` to leave the session active without a version**: the just-ended access token
  would remain valid.
- **Delete the session row**: renewal would stop, violating FR-016.
- **Clear the refresh cookie in the response**: the client would lose the renewal credential even
  though the server still considers it valid; the clarified behavior requires resumption.

### Decision 3: Check account/session state on access and refresh

Add `STUDITOPIA.GET_SESSION_AUTH(session_id, user_id)` returning the session's current
`account_status`, `session_status`, `expired_time`, and `access_version` (or raising `45005` for a
missing, wrong-owner, inactive, or expired session).

- The access guard calls it for protected requests and denies when the account is `SUSPENDED` or
  the token version no longer matches.
- The refresh path calls it and rejects when the account is `SUSPENDED`, the session is not
  active, or it has expired.
- No proactive session mutation is needed when an account becomes suspended. The next access or
  refresh request fails, which gives immediate enforcement (FR-021).
- An already-suspended sign-in still creates a session and returns `201` with the suspended
  status, but the guard and refresh reject its credentials (FR-022).

**Rationale**: Checking the database at use time is the only reliable way to make suspension
immediate for sessions that already exist. Tokens cannot carry account status because a later
suspension would leave the status stale.

**Alternatives rejected**:
- **Mark all sessions inactive when suspending**: requires the suspension feature to know about
  sessions and would still not distinguish logout from suspension unless the session state model
  was expanded.
- **Include status in the token**: suspension after sign-in would not be enforced.
- **Cache account status**: conflicts with immediate suspension (SC-009).

### Decision 4: Split token parsing from session authorization

Refactor `SecurityGenerationService` so token creation/verification remains its responsibility.
Add `SessionGuard` (in `sg.guard.ts`) that:

- validates the bearer token signature/expiry/type through `SecurityGenerationService`;
- calls `PostgresService.getSessionAuth`;
- verifies session validity, non-suspended account status, and access-version equality;
- attaches the authenticated session context to the request;
- rejects protected requests with `401 [INVALID_ACCESS_TOKEN]`.

The `Authenticated()` decorator applies this guard. Login needs optional access parsing plus
optional refresh parsing, so the decorator/guard supports an optional-access mode for the login
endpoint. `PostgresModule` is imported by `SecurityGenerationModule`; there is no reverse
dependency, so no cycle is introduced.

**Rationale**: The current guard cannot enforce anything because it always returns `true`.
Separating parsing from authorization keeps the cryptographic service testable without a
database and gives one enforcement point for every protected endpoint.

**Alternatives rejected**:
- **Add database checks inside `SecurityGenerationService`**: mixes token cryptography with
  database/account policy and makes every token unit test depend on PostgreSQL mocks.
- **Check suspension in each protected database function**: easy to omit on new endpoints and
  spreads the same policy across the schema.
- **Put the guard in `authentication` and import it from `security-generation`**: creates a
  circular package dependency because authentication already imports the token service.

### Decision 5: Validate login input before credential verification

Add validated DTOs for the login query and body:

- Query `type` must be one of `username`, `email`, or `token`; otherwise return `400 [40001]`
  before any database call.
- For `username`/`email`, `identifier` and `password` must be present, non-empty strings;
  otherwise return `422 [40001]`.
- For `token`, the body is ignored and only the refresh cookie is used.

`LoginDto` should validate only presence/type, not apply registration password-strength rules to
existing passwords. The controller may use a dedicated pipe or conditional body validation so a
refresh request does not require a login body.

**Rationale**: The current inline body and unvalidated DTO allow missing fields to reach the
database and violate FR-008/FR-009.

**Alternatives rejected**:
- **Full registration password rules on login**: rejects valid legacy passwords and is not
  required.
- **A separate refresh endpoint**: changes the existing API contract and is unnecessary.

### Decision 6: Preserve the existing response and error contracts

- Successful username/email login remains `201 { access_token, role, status }` plus the
  `refresh_token` cookie.
- Successful refresh remains `201 { access_token }` and does not set a cookie.
- Successful sign-out remains `200` with an empty body, but it no longer clears the refresh
  cookie.
- Invalid credentials remain `409 [INVALID_CREDENTIALS]`.
- Invalid type remains `400 [VALIDATION_ERROR]`.
- Invalid body remains `422 [VALIDATION_ERROR]`.
- Protected access failure remains `401 [INVALID_ACCESS_TOKEN]`.
- Refresh failure remains `401 [INVALID_REFRESH_TOKEN]`.
- Sign-out failure remains `401 [INVALID_SESSION]`.

Existing response codes are sufficient. No new public error code is required, and using generic
codes avoids revealing whether an account is suspended.

**Alternatives rejected**:
- **Add an `ACCOUNT_SUSPENDED` error code**: leaks account state and is unnecessary because the
  login response already reports status.
- **Return `403` for suspended protected access**: the feature does not require a distinct status
  and existing clients already handle `401` token failures.

### Decision 7: Keep refresh non-rotating and abuse controls out of scope

Refresh continues to return only access; the refresh cookie is not replaced or extended.
No throttling, lockout, or reCAPTCHA is added. These behaviors are explicitly clarified as
out of scope or required to remain unchanged.

### Decision 8: Update tests and mocks at the same layer as production code

- Add unit/integration specs in the owning packages' `__tests__/` folders before implementation.
- Add `test/auth-login.e2e-spec.ts` for the system flow.
- Extend `PostgresServiceMock`, `storage`, and `PoolMock` with session status,
  `access_version`, `getSessionAuth`, and `endAccess` so controller/service tests exercise the
  new paths without a live database.
- Move `src/packages/security-generation/decorators/sg.mock.ts` to
  `src/packages/security-generation/__tests__/sg.mock.ts` because new security tests are being
  added and the constitution requires test helpers there. Update imports.

## Requirement Coverage

| Requirement group | Design coverage | Primary tests |
| --- | --- | --- |
| FR-001–FR-004 (identifier, case-insensitivity, password, one session) | Existing `LOGIN_BY_*` functions and `AuthenticationService.login`; no change to credential semantics. | Service and E2E login tests. |
| FR-005–FR-006 (response shape, multiple sessions) | `createSession` and `sessionResponse` preserved; new session per successful login. | Controller/E2E tests with two logins. |
| FR-007–FR-009 (generic errors, type and field validation) | Validated query/body DTOs/pipes; existing `INVALID_CREDENTIALS` mapping. | Validation/controller tests. |
| FR-010–FR-014 (access expiry, refresh, no rotation, refresh not proof) | Existing access expiry plus `SessionGuard` checks; refresh returns access only; refresh token is only parsed for `type=token`. | Guard, service, and E2E tests. |
| FR-015–FR-018 (sign-out, immediate access end, renewal remains, failed sign-out isolation) | `END_ACCESS` version rotation; no cookie clearing; atomic sign-out validation. | Service, guard, and E2E tests. |
| FR-019–FR-022 (role/status, all statuses sign in, suspension enforcement, suspended sign-in) | `GET_SESSION_AUTH` used by guard/refresh; login remains status-agnostic; suspended credentials are unusable. | Mocked DB and E2E suspension tests. |
| SC-001–SC-010 | Indexed session lookup, generic errors, one session per login, non-rotating refresh, immediate version invalidation, suspension checks. | Performance smoke/manual check plus functional tests. |

## Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| The database contract is not in this repository. | Treat `contracts/database-session.md` as the prerequisite; implement Postgres service calls against it and verify with database integration tests or a deployed schema. Do not ship the backend until `access_version`, `GET_SESSION_AUTH`, and `END_ACCESS` exist. |
| Existing access tokens lack `access_version`. | Reject malformed/legacy access tokens as invalid; they are short-lived and the client can refresh to obtain a versioned token. Existing refresh tokens remain valid. |
| One extra database round-trip per protected request. | Use the existing `(session_id, user_id)` indexed lookup; keep the pool configuration; do not cache suspension state. |
| Sign-out no longer clears the refresh cookie. | Update API docs and client guidance; the clarified behavior explicitly requires renewal to remain usable. |
| A suspended login still creates a session row. | This matches credential-verification behavior; the guard and refresh deny use. Session rows expire normally after 30 days. |
| Race between guard check and sign-out/suspension. | `END_ACCESS` performs an atomic version check/increment. Refresh reads the version at mint time. Suspension is checked at use time, so the next request fails. |
| Passwords or hashes leak through logs. | Do not add body logging; keep existing error mapping; test that responses never contain password material. |

## Open Questions

None. The remaining work is implementation and database-contract coordination.
