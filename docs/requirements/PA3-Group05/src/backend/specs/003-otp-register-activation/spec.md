# Feature Specification: OTP Validation After Registration (Account Activation)

**Feature Branch**: `feature/api/otp-register-activation`

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "Specify OTP validation after register based on available code"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Request OTP to Activate New Account (Priority: P1)

After successfully registering, a newly registered user receives an unactivated account and a session. The user requests a one-time password (OTP) to be delivered to their registered email address. The system generates a time-limited OTP, stores it, and sends it via email. The user is then ready to submit the OTP for verification.

**Why this priority**: An unactivated account cannot access full platform functionality. Requesting the OTP is the essential first step in the activation flow; without it, account activation cannot occur.

**Independent Test**: Can be fully tested by calling the OTP request endpoint with a valid session for an unactivated account and confirming that an email is dispatched and the system returns OTP timing metadata (creation time and expiry time).

**Acceptance Scenarios**:

1. **Given** a user has registered and holds a valid session for an unactivated account, **When** they request an OTP with type `active`, **Then** the system generates a 6-digit OTP, stores it, emails it to the user's registered address, and returns the OTP creation timestamp and expiry timestamp.
2. **Given** a user holds a valid session, **When** they request an OTP with an unsupported type (not `active`, `recover`, or `delete`), **Then** the system rejects the request with a validation error and no OTP is generated or sent.
3. **Given** a user holds a valid session, **When** they request an OTP but the email delivery service is temporarily unavailable, **Then** the system returns an email-service-unavailable error and no activation token is exposed.
4. **Given** a user does not hold a valid session (unauthenticated), **When** they attempt to request an OTP, **Then** the system rejects the request with an authentication error.

---

### User Story 2 - Submit OTP to Activate Account (Priority: P1)

A newly registered user, having received their OTP by email, submits the OTP along with the timing metadata returned during the OTP request step. The system verifies the OTP's integrity, checks it has not expired, matches it against the stored value, and activates the account if all checks pass.

**Why this priority**: OTP submission is the culmination of account activation. It is equally critical to OTP request; without successful submission the account remains permanently unactivated.

**Independent Test**: Can be fully tested by submitting a valid OTP payload to the activation endpoint and confirming the account transitions to active status, then separately submitting an invalid or expired OTP and confirming rejection with no status change.

**Acceptance Scenarios**:

1. **Given** a user has a valid session and has received a correct, unexpired OTP, **When** they submit the OTP with type `active` and the matching timing metadata, **Then** the system validates the OTP's authenticity, confirms it matches the stored value, activates the account, and returns a success response.
2. **Given** a user submits an OTP that has expired (past the expiry timestamp), **When** the activation endpoint receives the request, **Then** the system rejects it with an invalid-OTP error and does not activate the account.
3. **Given** a user submits an OTP with an incorrect code, **When** the activation endpoint processes the request, **Then** the system rejects it with an invalid-OTP error and does not activate the account.
4. **Given** a user submits an activation OTP but their session is no longer valid, **When** the system processes the request, **Then** the request is rejected with an invalid-session error and no account state change occurs.
5. **Given** a user submits an OTP but its type field is not `active`, **When** the system processes the request, **Then** the request is rejected with an invalid-OTP error (type mismatch) and account state is unchanged.
6. **Given** a user submits a structurally correct OTP but the stored OTP has been cleared or never existed, **When** the system processes the request, **Then** the request is rejected with an invalid-OTP error.

---

### User Story 3 - Re-request OTP When Previous OTP Expired (Priority: P2)

A user who did not activate their account with the first OTP (e.g., the OTP expired before they could submit it) requests a new OTP to try again. The system overwrites the previous stored OTP and sends a fresh code.

**Why this priority**: OTP expiry is an expected operational scenario. Without re-request support, users whose OTP expires before submission would be permanently locked out of activation.

**Independent Test**: Can be tested by requesting a second OTP for the same session and confirming the system returns new timing metadata and sends a fresh email, then verifying the first OTP no longer activates the account.

**Acceptance Scenarios**:

1. **Given** a user's previous activation OTP has expired, **When** they request a new OTP with type `active`, **Then** the system overwrites the stored OTP, emails a new 6-digit code, and returns new creation and expiry timestamps.
2. **Given** a user requests a new OTP while a previous unexpired OTP still exists, **When** the system processes the request, **Then** the previous OTP is overwritten with the new one, and only the new OTP is valid for subsequent activation.

---

### Edge Cases

- A user submits an OTP payload where the `type` is `recover` or `delete` to the activation endpoint; the system rejects it with an invalid-OTP error without changing account status.
- A user holds a valid session but the account is already in `active` status; re-activating should be benign — the system either accepts or idempotently ignores the activation without error.
- An OTP request is made and the email is sent, but the user waits until after expiry to submit; the submission must be rejected even if the OTP code itself was correct at the time of issue.
- Concurrent OTP requests from the same session overwrite each other; only the most recent stored OTP is authoritative.
- The OTP code is exactly 6 digits (zero-padded if necessary); a submission with a code of incorrect length is treated as invalid.
- The session becomes invalidated (e.g., by logout) between OTP request and OTP submission; the activation attempt must fail with an invalid-session error.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow an authenticated user to request an account-activation OTP by specifying request type `active`.
- **FR-002**: The system MUST generate a 6-digit, time-limited OTP bound to the requesting user's session and account.
- **FR-003**: The system MUST persist the generated OTP associated with the user's session for later verification.
- **FR-004**: The system MUST deliver the generated OTP to the user's registered email address.
- **FR-005**: The system MUST return OTP creation and expiry timestamps to the requesting user so the client knows the validity window.
- **FR-006**: The system MUST reject OTP requests from unauthenticated users.
- **FR-007**: The system MUST reject OTP requests where the `type` parameter is not one of the accepted values (`active`, `recover`, `delete`).
- **FR-008**: The system MUST return an email-unavailable error when OTP delivery cannot be completed, without exposing the generated code.
- **FR-009**: The system MUST allow an authenticated user to submit an OTP for activation by providing the OTP code and its associated timing metadata.
- **FR-010**: The system MUST verify the cryptographic authenticity of the submitted OTP using the original session and timing metadata before comparing it to the stored value.
- **FR-011**: The system MUST reject any OTP whose expiry timestamp has passed at the time of submission.
- **FR-012**: The system MUST reject any OTP submission where the submitted code does not match the stored value.
- **FR-013**: The system MUST reject any OTP submission whose `type` does not match `active` on the activation endpoint.
- **FR-014**: The system MUST reject any OTP submission from a user with an invalid or expired session.
- **FR-015**: The system MUST activate the account upon successful OTP verification, transitioning its status from unactivated to active.
- **FR-016**: A subsequent valid OTP request MUST overwrite any previously stored OTP for the same user session, invalidating prior codes.

### Key Entities

- **User Account**: A registered but potentially unactivated account identified by a unique user identifier. Has a status field that changes from unactivated to active upon successful OTP verification.
- **Session**: A short-lived credential linking a user to their authenticated context (session ID + user ID). Both the OTP request and submission endpoints require a valid session.
- **OTP Record**: A 6-digit code stored server-side, bound to a session and user ID. Overwritten on each new OTP request; consumed (or removed) after a successful activation.
- **OTP Token**: A self-describing payload returned to the client after OTP generation, containing the OTP code, creation timestamp, expiry timestamp, session ID, user ID, and type. Used verbatim in the activation submission.
- **Email Notification**: A delivery artifact sent to the user's registered address carrying the 6-digit OTP code and contextual messaging for account activation.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of valid, unexpired OTP submissions from authenticated users with correct codes result in account activation on the first attempt.
- **SC-002**: 100% of expired or incorrect OTP submissions are rejected without changing account status.
- **SC-003**: OTP emails are delivered to the user's registered address within 30 seconds of a successful request under normal operating conditions.
- **SC-004**: The OTP validity window is clearly communicated to the user (creation and expiry times included in the response), enabling users to understand when to re-request.
- **SC-005**: 0% of OTP submissions succeed when the submitting user's session is invalid or expired.
- **SC-006**: Re-requesting an OTP invalidates all previously issued codes for the same user session, with 0 cases where an old code activates an account after a new code has been issued.

## Assumptions

- A registered user always starts in an unactivated account state; the activation flow described here is the sole mechanism for transitioning to active status after registration.
- The OTP request endpoint (`GET /api/v1/auth/otp?type=active`) and activation endpoint (`POST /api/v1/auth/activate`) already exist in the codebase; this spec describes their intended behavioral contract, not introducing new routes.
- A valid access token (session) obtained at registration is required to call both endpoints; the same session issued during registration is used throughout the activation flow.
- The OTP is a 6-digit numeric code; leading zeros are preserved via zero-padding.
- The OTP expiry duration is configured by the platform and is reasonable for typical email delivery latency (assumed several minutes).
- Email delivery relies on an existing email sending service; this spec does not cover the internals of that service.
- Storing a new OTP via a repeated request overwrites the old one at the database level; no OTP history or audit trail is required by this feature.
- The `active` OTP type is the only type in scope for this feature; `recover` and `delete` types share the OTP generation mechanism but belong to separate features.
- An already-active account that requests or submits an activation OTP is considered an edge case; the system is assumed to handle this gracefully (idempotent or benign response) without strict enforcement being in scope here.
