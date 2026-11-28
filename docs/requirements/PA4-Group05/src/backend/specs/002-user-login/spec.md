# Feature Specification: User Login and Session Access

**Feature Branch**: `002-user-login`

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "Plan the user login feature from the beginning, based on the current login behavior."

## Clarifications

### Session 2026-11-14

Focus: validate the login specification against the current implementation and identify cases the current code does not cover. This is a paraphrased version of the user's clarification request.

- Q: Should accounts with a suspended status be allowed to sign in? → A: Yes. Keep current behavior: every account status may complete credential verification, and the account status is returned to the application.
- Q: When a session ends, must both its access and renewal credentials stop working immediately? → A: No. Keep current behavior: sign-out ends the current access credential only, and the renewal credential remains usable until its own expiry.
- Q: Should this feature limit repeated failed sign-in attempts? → A: No. Keep current behavior: no throttling or lockout in this feature; abuse protection is handled by a separate feature.
- Q: When an account becomes suspended after a user has already signed in, should its existing sessions keep working? → A: No. Existing sessions must stop working immediately when the account becomes suspended.
- Q: If an account is already suspended before the user signs in, should the new session be allowed to access protected features? → A: No. Sign-in completes and returns the status, but the new session cannot access protected features or renew.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Sign In with Username or Email (Priority: P1)

A registered user opens the sign-in screen, chooses whether to identify themselves by username or by email address, enters the chosen identifier and their password, and submits. The system verifies the credential pair, starts a new signed-in session, and takes the user into the application. The signed-in context carries the account's role and status so the application can route the user to the correct experience, including any remaining activation step. If the account is suspended, the user is shown the suspended status and is not admitted to protected features.

**Why this priority**: Signing in is the gate to every authenticated part of the product. Without a working credential sign-in, returning users cannot use the platform at all.

**Independent Test**: Attempt sign-in with a valid username and password, a valid email and password, an unknown identifier, a wrong password, and a suspended account. Verify that valid credentials for an ordinary account start a session with the correct role and status, that a suspended account receives its status without protected access, and that every invalid attempt is rejected without creating a session.

**Acceptance Scenarios**:

1. **Given** an existing account with a known username and password, **When** the user signs in with that username and password, **Then** a new session starts and the user receives an access credential, the account role, and the account status.
2. **Given** an existing account with a known email address and password, **When** the user signs in with that email address and password, **Then** a new session starts and the user receives the same session information as a username sign-in.
3. **Given** an identifier that differs only by letter case from a registered username or email address, **When** the user signs in with the correct password, **Then** the sign-in succeeds because identifiers are matched case-insensitively.
4. **Given** an unknown identifier or an incorrect password, **When** the user attempts sign-in, **Then** the attempt is rejected with a single generic credential error and no session is created.
5. **Given** a sign-in request with a missing or unsupported identifier method, **When** the user submits it, **Then** the request is rejected as a validation error and no credential check is performed.
6. **Given** a user who already has an active session on another device, **When** they sign in again, **Then** a second independent session starts and the earlier session remains active.
7. **Given** an account that is suspended before sign-in, **When** the user signs in with the correct credentials, **Then** the sign-in reports the suspended status, but the resulting session cannot access protected features or renew.

---

### User Story 2 - Continue Without Re-entering the Password (Priority: P2)

While the user works, their short-lived access credential eventually expires. Instead of forcing the user back to the sign-in screen, the application silently obtains a fresh access credential using the longer-lived renewal credential established at sign-in. If the renewal credential is no longer valid, the user is returned to the sign-in screen and must authenticate again.

**Why this priority**: Silent renewal keeps active users productive and protects them from abrupt interruption, but it depends on a successful initial sign-in.

**Independent Test**: Start a session, allow the access credential to expire, and request a fresh access credential with the renewal credential. Verify that a valid renewal credential produces a new access credential for the same session, while an expired, malformed, or tampered renewal credential is rejected.

**Acceptance Scenarios**:

1. **Given** a session whose access credential has expired and whose renewal credential is still valid, **When** the application requests a fresh access credential, **Then** a new access credential for the same user and session is returned without requiring the password again.
2. **Given** a renewal credential that is expired, malformed, or tampered with, **When** the application requests a fresh access credential, **Then** the request is rejected and the user must sign in again.
3. **Given** a successful renewal, **When** the user continues working, **Then** the existing renewal credential remains valid until its normal expiry and is not replaced.
4. **Given** a renewal credential, **When** it is presented for any purpose other than obtaining a fresh access credential, **Then** it is not accepted as proof of an authenticated session.

---

### User Story 3 - Sign Out of the Current Access Session (Priority: P3)

A signed-in user chooses to sign out. The system immediately ends the access credential used for the request, but leaves the renewal credential valid until its own expiry, so the session can still be resumed until that expiry. The user's sessions on other devices remain active.

**Why this priority**: Sign-out completes the session lifecycle and gives users control over shared devices, but the product remains usable without it.

**Independent Test**: Sign in on two independent sessions, sign out from one, and verify that the signed-out access credential can no longer be used while the other session continues to work and the renewal credential can still obtain a new access credential until it expires.

**Acceptance Scenarios**:

1. **Given** a signed-in user with a valid access credential, **When** they sign out, **Then** the current access credential stops working immediately, its renewal credential remains usable until its own expiry, and other sessions are unchanged.
2. **Given** a user signed in on two devices, **When** they sign out on one device, **Then** the other device's session remains active.
3. **Given** a missing, expired, malformed, or already-ended access credential, **When** a sign-out is attempted, **Then** the request is rejected as an invalid session and no other session is affected.
4. **Given** a valid renewal credential without a valid access credential, **When** a sign-out is attempted, **Then** sign-out is rejected because ending an access session requires an active signed-in context.
5. **Given** a renewal credential that was not expired when the user signed out, **When** the application renews the session, **Then** a new access credential is issued and the renewal credential stays valid until its normal expiry.

---

### Edge Cases

- An account may be signed in on several devices at once; each sign-in creates an independent session, and ending one access session must not end the others.
- A user may sign in with either username or email; the same account is reached through both identifiers.
- Usernames and email addresses are compared without regard to letter case.
- An account that is not yet activated may sign in and receive its status so the application can guide it through activation.
- Account status is reported at sign-in and does not block credential verification; inactive accounts may continue into activation, while a suspended account may complete sign-in but its new session is denied protected access and renewal.
- A wrong password and an unknown identifier must produce the same user-facing result so the response does not reveal whether an account exists.
- Repeated failed sign-in attempts are evaluated independently; this feature does not throttle, delay, or lock out an account or source.
- When an account becomes suspended, every session that existed before the suspension must stop accepting its access and renewal credentials immediately.
- Signing out must not revoke the renewal credential; it remains usable until its own expiry and can produce a new access credential after sign-out.
- An access credential must be rejected immediately after sign-out even if it has not reached its own expiry.
- A renewal request must not extend the lifetime of the renewal credential or change its value.
- If the sign-in service is temporarily unavailable, the user sees a temporary failure and must retry; no session is created.
- If a sign-out request fails before the access credential is ended, the access credential remains usable so the user can retry.
- Password material must never appear in any user-visible response or in application logs.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow an existing user to sign in using either their username or their email address together with their password.
- **FR-002**: The system MUST match usernames and email addresses case-insensitively during sign-in.
- **FR-003**: The system MUST verify the supplied password against the stored credential without exposing, returning, or logging the stored credential or password material.
- **FR-004**: The system MUST start exactly one new active session when the supplied credentials are valid.
- **FR-005**: On successful sign-in, the system MUST return an access credential, the account role, and the account status, and MUST establish a renewal credential that is unavailable to client scripts.
- **FR-006**: The system MUST allow an account to hold multiple simultaneous active sessions and MUST NOT end existing sessions when a new sign-in succeeds.
- **FR-007**: The system MUST reject an unknown identifier and an incorrect password with the same generic credential error.
- **FR-008**: The system MUST reject a sign-in request whose identifier method is missing or unsupported as a validation error before verifying credentials.
- **FR-009**: The system MUST reject a sign-in request that omits the identifier or password.
- **FR-010**: The system MUST limit the lifetime of an access credential and MUST reject an expired access credential for protected operations.
- **FR-011**: The system MUST allow a valid renewal credential to exchange for a new access credential for the same user and session without requiring the password again.
- **FR-012**: The system MUST reject a renewal request whose renewal credential is missing, expired, malformed, or tampered with.
- **FR-013**: A successful renewal MUST NOT replace, extend, or otherwise rotate the renewal credential.
- **FR-014**: The system MUST NOT accept a renewal credential as proof of an authenticated session for any operation other than obtaining a fresh access credential.
- **FR-015**: The system MUST allow a user to sign out by presenting a valid access credential for the current session.
- **FR-016**: A successful sign-out MUST end the current access credential immediately and MUST NOT revoke or shorten the renewal credential; the renewal credential remains usable until its normal expiry.
- **FR-017**: The system MUST reject a sign-out request when the access credential is missing, expired, malformed, or belongs to an already-ended access session.
- **FR-018**: A failed sign-in, renewal, or sign-out MUST NOT create, reactivate, or modify any account or unrelated session.
- **FR-019**: The system MUST report the account role and status on every successful sign-in so the application can present the correct experience.
- **FR-020**: The system MUST allow an account with any status, including inactive or suspended, to complete credential verification and receive its status so the application can route the user appropriately.
- **FR-021**: When an account becomes suspended, the system MUST immediately stop accepting the access and renewal credentials of every session that existed before the suspension.
- **FR-022**: When an account is suspended at sign-in, the system MUST deny the new session protected access and renewal while still returning the suspended status.

### Key Entities *(include if feature involves data)*

- **Sign-In Request**: The identifier value, the chosen identifier method (username or email), and the password supplied by the user.
- **User Account**: An existing identity with a unique username, a unique email address, a role, and a status. The account owns one or more sessions over time.
- **Session**: An independent signed-in context created by a successful sign-in, associated with exactly one account and with its own start and expiry.
- **Access Credential**: A short-lived proof of an active session used to reach protected features.
- **Renewal Credential**: A longer-lived proof used only to obtain a fresh access credential for the same session; it remains valid until its own expiry even after sign-out and is not exposed in user-visible responses.
- **Account Role**: The user's authorization category, such as student, staff, or administrator.
- **Account Status**: The lifecycle state of the account, such as inactive, active, or suspended, used by the application to route the user and to enforce suspension for new and existing sessions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of users with valid credentials complete sign-in in under 2 seconds during normal operating load.
- **SC-002**: 100% of invalid sign-in attempts return the same generic outcome regardless of whether the identifier exists.
- **SC-003**: 100% of successful sign-ins create exactly one new session while leaving every existing session active.
- **SC-004**: 95% of sessions with a valid renewal credential continue without asking the user to re-enter a password.
- **SC-005**: 100% of renewal attempts with an invalid or expired renewal credential are rejected.
- **SC-006**: 100% of successful sign-outs invalidate the current access credential immediately while leaving its unexpired renewal credential usable.
- **SC-007**: At least 90% of returning users complete sign-in successfully on their first attempt.
- **SC-008**: Fewer than 5% of sign-in-related support requests concern unclear credential errors or unexpected session expiry.
- **SC-009**: 100% of sessions that existed when an account was suspended are denied access and renewal immediately after the suspension.
- **SC-010**: 100% of sign-ins by an already-suspended account return the suspended status and create no usable protected access.

## Assumptions

- Users already have accounts created through the registration feature; account creation is out of scope here.
- Usernames and email addresses are unique per account and are stored for case-insensitive comparison.
- The client explicitly indicates whether the identifier is a username or an email address.
- Account status is reported at sign-in and does not block credential verification; inactive accounts may continue into activation, and suspended accounts may complete sign-in but are denied protected access and renewal.
- Access credentials expire after a short period (currently 30 minutes), and renewal credentials expire after a longer period (currently 30 days).
- Multiple simultaneous sessions per account are supported and expected.
- Abuse protections such as rate limiting, account lockout, and breached-password checks are outside this feature and are expected to be provided by separate controls; this feature evaluates every sign-in attempt independently.
- Email ownership verification, activation, password recovery, and account deletion are separate features and are not part of sign-in.
- A valid renewal credential is established only by a successful sign-in or registration and is delivered to the client in a protected form that client scripts cannot read.
- If neither a valid access credential nor a valid renewal credential exists, the user must complete sign-in again; the system does not restore a session from an expired access credential.
- Sign-out ends the current access credential but does not revoke the renewal credential; the renewal credential remains valid until its own expiry.
