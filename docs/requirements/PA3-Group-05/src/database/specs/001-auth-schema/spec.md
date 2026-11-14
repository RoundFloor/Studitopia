# Feature Specification: Authentication Schema

**Feature Branch**: `001-auth-schema`

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "Specify authentication schema based on available code and architecture"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - University Student Registration with Academic Verification (Priority: P1)

Prospective university students can register a new account on Studitopia using their full display name, academic institutional email, chosen username, and a secure password. The system verifies that the student's email belongs to an approved university domain, validates format constraints, securely hashes the password, creates the account in an inactive state, and generates an initial onboarding session so the user can immediately proceed to email verification.

**Why this priority**: Account creation with strict academic domain whitelisting is the foundational entry point for Studitopia as a verified university platform. Without registration, no user identities exist.

**Independent Test**: Can be tested by submitting valid registration details with an approved university email (e.g., student.hcmus.edu.vn). The test passes if an account is created in an inactive state, an onboarding session is issued, and unauthorized domains (e.g., generic public domains) are rejected.

**Acceptance Scenarios**:

1. **Given** a new visitor with valid credentials and an approved university email address, **When** they submit the registration form, **Then** an account is created in `INACTIVE` status with the `STUDENT` role, an active onboarding session is returned, and no plaintext password is saved.
2. **Given** a registration request with an email domain not present in the approved academic domains whitelist, **When** registration is processed, **Then** the system rejects registration with an unauthorized domain error.
3. **Given** a registration request with an email address or username that is already registered, **When** registration is processed, **Then** the system rejects the registration with a conflict error.
4. **Given** registration inputs violating formatting rules (display name shorter than 8 or longer than 32 characters, username containing uppercase characters or invalid symbols), **When** registration is processed, **Then** the system rejects the request with a validation format error.

---

### User Story 2 - Account Verification and Activation via One-Time Passcode (Priority: P1)

After registration, an inactive account receives a numerical one-time passcode (OTP) delivered to their academic email. The user submits this verification passcode within an active session. Once the passcode is verified, the system promotes the account to `ACTIVE` status and clears the passcode, unlocking platform participation.

**Why this priority**: Restricting active platform access to verified university email owners ensures trust, privacy, and community authenticity.

**Independent Test**: Can be tested by taking an inactive account with an active session, assigning a verification passcode, and executing the activation action. The test passes if the account transitions from `INACTIVE` to `ACTIVE`, the passcode is cleared from storage, and subsequent activation attempts on an already active account are safely handled.

**Acceptance Scenarios**:

1. **Given** an inactive user account with an active session and a pending one-time passcode, **When** the account activation workflow executes with the valid session, **Then** the account status updates to `ACTIVE` and the stored passcode is cleared.
2. **Given** an active session, **When** the verification system records or retrieves a temporary one-time passcode for the owning account, **Then** the passcode is stored and readable only through an authenticated, valid session.
3. **Given** an account that has already achieved `ACTIVE` status, **When** an activation request is submitted, **Then** the system indicates no state change was needed without error or degradation.
4. **Given** an unauthenticated request or invalid session, **When** retrieving or modifying one-time passcodes, **Then** the operation is rejected.

---

### User Story 3 - Multi-Identifier User Authentication (Login) (Priority: P2)

Registered users can authenticate into the platform using either their registered academic email address or their unique username, along with their secret password. Upon successful authentication, the system issues a new, distinct active user session with a standard 30-day validity window.

**Why this priority**: Users need flexible, frictionless access across multiple devices without requiring separate accounts for username versus email login.

**Independent Test**: Can be tested by attempting authentication with valid username-password and email-password combinations. The test passes if each successful login yields a valid, active session token, leaves pre-existing sessions intact, and fails when invalid passwords or unknown identifiers are supplied.

**Acceptance Scenarios**:

1. **Given** an existing account, **When** the user logs in with their correct username and password, **Then** a new active session is created and the user's identifier, role, and current account status are returned.
2. **Given** an existing account, **When** the user logs in with their correct academic email and password, **Then** a new active session is created and returned with role and status.
3. **Given** an existing user who is already logged in on one device, **When** they log in from a second device with valid credentials, **Then** a second distinct active session is issued and both sessions remain active concurrently.
4. **Given** invalid credentials (incorrect password or unregistered email/username), **When** an authentication attempt is made, **Then** the system rejects the attempt with an authentication failure without disclosing whether the identifier or password was invalid.

---

### User Story 4 - Session Validation and Explicit Logout (Priority: P2)

Protected services verify the validity and expiration of incoming user sessions. When a user chooses to log out from a device, the system immediately terminates that specific session, preventing further protected access on that device while preserving any other active sessions the user might have on other devices.

**Why this priority**: Session security and the ability to cleanly revoke access on shared or public devices are vital for student safety and privacy.

**Independent Test**: Can be tested by invoking protected account operations with an active session, then executing logout, and verifying that subsequent requests with that session are rejected while another active session for the same user continues to succeed.

**Acceptance Scenarios**:

1. **Given** an active session and matching user identifier, **When** protected user operations (such as profile/email retrieval) are requested, **Then** the system validates the session and successfully returns the requested data.
2. **Given** an active session, **When** the user invokes the logout action, **Then** the session is marked inactive, its expiration time is set to the current time, and the operation confirms termination.
3. **Given** a session that has been terminated via logout or has passed its 30-day expiration time, **When** a protected operation is requested using that session, **Then** the system rejects the request as an invalid session.
4. **Given** a user with multiple active sessions on different devices, **When** one session is logged out, **Then** only that session is invalidated and other active sessions remain valid.

---

### Edge Cases

- **Domain Substring and Subdomain Validation**: What happens when an email domain is a partial substring or spoofed variation of an approved domain (e.g., `fake-hcmus.edu.vn` instead of `student.hcmus.edu.vn`)? The system strictly validates exact case-insensitive matches against registered domain records.
- **Account State Restrictions**: What happens if an account is in `SUSPEND` status and attempts to log in? The login function provides the account's suspended status to the caller so the application tier can enforce access restrictions.
- **Session Mismatch**: What happens when a request presents a session ID belonging to User A, but asserts User B as the actor? The session validation check enforces strict matching between the session owner and the requesting user, rejecting mismatched requests.
- **Simultaneous Multiple Logins**: How does the system handle high-frequency concurrent logins by the same user? Each login independently creates a new unique session record, preventing race conditions or session collisions.
- **Expired Session Handling**: How are sessions older than 30 days handled? Any session where the expiration timestamp is less than or equal to the current time is rejected during validation.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST enforce academic domain whitelisting during registration, accepting only email addresses whose domain exactly matches an entry in the approved university domains catalog.
- **FR-002**: System MUST validate email addresses for structural validity, enforcing length boundaries between 8 and 254 characters and standard institutional email formatting.
- **FR-003**: System MUST enforce unique email addresses across all accounts, preventing multiple accounts from registering with the same email.
- **FR-004**: System MUST validate usernames to ensure they start with a lowercase letter, contain only lowercase alphanumeric characters and internal dots, and range between 8 and 32 characters in length.
- **FR-005**: System MUST enforce unique usernames across all accounts, preventing duplicate username registrations.
- **FR-006**: System MUST validate display names to contain only alphanumeric characters separated by single spaces, with an overall length between 8 and 32 characters.
- **FR-007**: System MUST securely hash and salt passwords using an industry-standard one-way cryptographic algorithm before persistence, ensuring plaintext passwords are never stored.
- **FR-008**: System MUST initialize newly registered accounts in an `INACTIVE` status with a default role of `STUDENT`.
- **FR-009**: System MUST issue an active authentication session immediately upon registration to allow the user to immediately proceed with onboarding and verification.
- **FR-010**: System MUST support secure storage, retrieval, and removal of a numerical one-time verification passcode (OTP) associated with an account.
- **FR-011**: System MUST transition an account status from `INACTIVE` or `PREINIT` to `ACTIVE` and purge the one-time passcode once email verification is completed.
- **FR-012**: System MUST allow users to authenticate using either their registered academic email or their username combined with their password.
- **FR-013**: System MUST reject authentication attempts with invalid credentials using a generic error message that does not disclose whether the identifier or password was incorrect.
- **FR-014**: System MUST issue a distinct active session with an expiration duration of 30 days upon each successful login, supporting concurrent sessions across multiple devices.
- **FR-015**: System MUST validate active sessions for all protected operations, verifying that the session exists, belongs to the requesting user, is marked active, and has not passed its expiration time.
- **FR-016**: System MUST allow users to explicitly terminate (log out) their current active session, immediately setting its status to inactive and expiration to the current timestamp.
- **FR-017**: System MUST provide authenticated retrieval of the user's registered institutional email and account role given a valid active session.

### Key Entities *(include if feature involves data)*

- **Account**: Represents a registered user identity in the system. Key attributes include unique identifier, display name, normalized academic email, unique username, secure password credential, role (`STUDENT`, `STAFF`, `ADMIN`), account status (`INACTIVE`, `PREINIT`, `ACTIVE`, `SUSPEND`), creation timestamp, and optional verification passcode.
- **University Domain**: Represents an approved academic institution domain eligible for student registration (e.g., `student.hcmus.edu.vn`, `hcmut.edu.vn`, `clc.fitus.edu.vn`).
- **User Session**: Represents an authorized, time-delimited login instance. Key attributes include unique session identifier, reference to owning account, session creation timestamp, session expiration timestamp (30 days from issuance), and status (`ACTIVE`, `INACTIVE`).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of registration attempts with unauthorized or personal email domains (e.g., non-partner or general public domains) are blocked before account creation.
- **SC-002**: Users can complete registration and receive an initial active session in under 3 seconds under normal network conditions.
- **SC-003**: 100% of stored passwords are cryptographically hashed; zero plaintext passwords or recoverable credentials exist in persistent storage.
- **SC-004**: Authentication via username or email succeeds in under 1 second for valid credentials.
- **SC-005**: 100% of expired or terminated (logged out) sessions are immediately barred from accessing protected user operations.
- **SC-006**: System supports at least 5 concurrent active sessions per user account without session conflict or unintended session termination.
- **SC-007**: 100% of one-time passcodes are purged from storage upon successful account activation.

## Assumptions

- The list of authorized university domains is pre-populated and managed by platform governance administrators.
- Passcode dispatch (transmitting the OTP to the student's email) is handled by an external communication or notification service that coordinates with the authentication verification store.
- Standard session lifetime is set to 30 consecutive calendar days from creation unless explicitly revoked earlier by the user.
- Account role defaults to `STUDENT` upon registration; administrative elevation to `STAFF` or `ADMIN` occurs via dedicated administrative governance workflows.
- Password complexity requirements (such as minimum entropy, special characters, and digits) are enforced during client submission before cryptographic hashing.
