# Feature Specification: Authentication User Flows

**Feature Branch**: `001-authentication-user-flows`

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "Read the constitution.md and the folder docs/architecture and my source code /src and make specification about the user story Login, Register, Verify Email By OTP, Recover Password (hasn't have API), Logout for frontend project"

## User Scenarios & Testing *(mandatory)*

This feature defines the frontend experience for five authentication journeys:
sign in, create an account, verify an email address with a one-time passcode,
recover a forgotten password, and sign out. The backend service is the authority
for credentials, account status, session validity, and passcode verification.

Actors:

- **Visitor**: a person without an active authenticated session.
- **Pending user**: a person whose account exists but still requires email
  verification.
- **Active user**: a person with a verified account and a valid session.
- **Supporting services**: the account/authentication service, the email
  delivery service, and the password-recovery service. The password-recovery
  service is not available in the current release.

### User Story 1 - Sign in with username or email (Priority: P1)

A visitor signs in with either a username or an email address and a password.
On success, the visitor enters the authenticated area. If the account still
requires email verification, the visitor is guided to the verification journey
instead of being granted access.

**Why this priority**: Signing in is the primary entry point to the product.
Without it, no returning user can reach any protected capability.

**Independent Test**: Can be tested independently with known active, pending,
and invalid accounts by submitting the sign-in form and confirming the resulting
destination and messages.

**Acceptance Scenarios**:

1. **Given** a visitor is on the sign-in screen, **When** they submit a valid
   username and password for an active account, **Then** they enter the
   authenticated area.
2. **Given** a visitor is on the sign-in screen, **When** they submit a valid
   email address and password for an active account, **Then** they enter the
   authenticated area without having to choose an identifier type.
3. **Given** a visitor submits valid credentials for an account that still needs
   verification, **When** sign-in succeeds, **Then** they are taken to the email
   verification journey and cannot access protected content.
4. **Given** a visitor submits an unknown identifier or a wrong password, **When**
   the attempt fails, **Then** both credential fields show a single generic
   "invalid credentials" message and the visitor remains on the sign-in screen.
5. **Given** either credential field is empty, **When** the visitor attempts to
   submit, **Then** the action is unavailable and the missing field is explained.
6. **Given** an active user already has a valid session, **When** they open a
   public authentication screen, **Then** they are redirected to the
   authenticated area.
7. **Given** the authentication service cannot be reached, **When** the visitor
   submits valid-looking credentials, **Then** they see a friendly retry message
   and their identifier is preserved.

---

### User Story 2 - Create an account (Priority: P1)

A visitor creates an account by providing a display name, username, email
address, password, and password confirmation, and by accepting the terms of
service and privacy policy. The account is created in a pending state and the
visitor is guided to email verification.

**Why this priority**: Registration creates every new user and is the only path
to obtaining an account. It directly enables the sign-in and verification
journeys.

**Independent Test**: Can be tested independently by completing the registration
form with valid data, confirming account creation, and confirming that the
visitor is routed into email verification with a pending account status.

**Acceptance Scenarios**:

1. **Given** a visitor provides valid registration data and accepts the terms,
   **When** they submit, **Then** the account is created and the visitor is
   directed to email verification.
2. **Given** a display name outside 8–32 characters or containing unsupported
   characters, **When** the visitor leaves the field, **Then** a specific inline
   error is shown and submission remains blocked.
3. **Given** a username outside 8–32 characters, not starting with a lowercase
   letter, or containing unsupported characters, **When** the visitor leaves the
   field, **Then** a specific inline error is shown and submission remains
   blocked.
4. **Given** an email address with an invalid format or an unregistered email
   domain, **When** the visitor leaves the field, **Then** a specific inline
   error is shown and submission remains blocked.
5. **Given** a password that does not meet the required policy, **When** the
   visitor leaves the field, **Then** a specific inline error describes the
   unmet rule and submission remains blocked.
6. **Given** the password and confirmation do not match, **When** either field
   changes, **Then** the confirmation field shows a mismatch error and
   submission remains blocked.
7. **Given** the terms have not been accepted, **When** the visitor attempts to
   submit, **Then** a warning is shown and no account is created.
8. **Given** an email address or username that is already registered, **When**
   the visitor submits, **Then** the corresponding field shows a specific
   "already exists" message and the entered data is preserved.
9. **Given** the account service reports a field-level validation failure,
   **When** the response returns, **Then** the issue is attached to the matching
   field and the visitor can correct it without re-entering everything.
10. **Given** the service is unavailable during submission, **When** the attempt
    fails, **Then** the visitor sees a retry message, the form remains filled
    except for sensitive values, and duplicate submissions are prevented.

---

### User Story 3 - Verify email with a one-time passcode (Priority: P1)

A pending user verifies ownership of their email address by entering the
six-digit passcode sent to that address. Verification activates the account and
grants access to the authenticated area.

**Why this priority**: Registration alone does not grant access. Without
verification, a newly created account cannot be used, so this journey is
required to complete onboarding.

**Independent Test**: Can be tested independently with a pending account by
requesting a passcode, entering valid, invalid, and expired codes, and confirming
activation and error behavior.

**Acceptance Scenarios**:

1. **Given** a pending user reaches the verification screen without a valid
   active challenge, **When** the screen loads, **Then** a passcode is sent
   automatically to the account email and a validity countdown is shown.
2. **Given** a passcode was already issued and has not expired, **When** the
   pending user returns to the verification screen, **Then** the existing
   countdown is restored and a duplicate passcode is not sent automatically.
3. **Given** the pending user enters the correct six digits before expiry,
   **When** they confirm, **Then** the account becomes active, the challenge is
   invalidated, and they enter the authenticated area.
4. **Given** the pending user enters an incorrect code, **When** they confirm,
   **Then** a clear invalid-code message is shown and they can retry with the
   same challenge while it remains valid.
5. **Given** the code has expired, **When** the pending user attempts to verify,
   **Then** an expiry message is shown and requesting a new code becomes
   available.
6. **Given** a valid challenge has time remaining, **When** the pending user
   requests another code, **Then** the request is unavailable and the remaining
   time is shown.
7. **Given** the pending user pastes a six-digit code, **When** the paste is
   accepted, **Then** all six positions are filled and verification can proceed.
8. **Given** the pending user navigates directly to the verification screen
   without a pending challenge, **When** the screen loads, **Then** they are
   redirected to sign in.
9. **Given** the email service or account service fails, **When** sending or
   verifying a code fails, **Then** the pending user sees a retry message and the
   existing form state is preserved.
10. **Given** the pending user has not entered all six digits, **When** they view
    the verification action, **Then** confirmation is unavailable until the code
    is complete.

---

### User Story 4 - Sign out (Priority: P2)

An active user signs out of the current session and is returned to the sign-in
screen. Access to protected content ends immediately, while the user's other
sessions remain unaffected.

**Why this priority**: Signing out is required to protect accounts on shared
devices and to complete the session lifecycle. It is lower priority than the
journeys required to obtain access, but it is still necessary for a usable
release.

**Independent Test**: Can be tested independently with an active session by
choosing sign out, confirming the return to sign in, and confirming that
protected content is no longer reachable.

**Acceptance Scenarios**:

1. **Given** an active user is in the authenticated area, **When** they choose
   sign out, **Then** the current session ends and they are returned to the
   sign-in screen.
2. **Given** an active user signs out, **When** they try to open a protected
   area, **Then** they are redirected to sign in.
3. **Given** an active user signs out, **When** they use browser back
   navigation, **Then** protected content is not shown from the ended session.
4. **Given** the sign-out request cannot be completed, **When** it fails, **Then**
   the user is told that sign out did not complete and can retry; the interface
   does not claim success.
5. **Given** the user activates sign out repeatedly, **When** a request is
   already in progress, **Then** duplicate requests are prevented.
6. **Given** the account has other active sessions, **When** the current user
   signs out, **Then** those other sessions remain active.

---

### User Story 5 - Recover a forgotten password (Priority: P3)

A visitor who cannot sign in opens the password-recovery screen and enters an
email address or username. Because the password-recovery service is not yet
available, the screen must honestly communicate that recovery is unavailable
rather than pretending a reset message was sent.

**Why this priority**: Recovery reduces lockouts because of forgotten passwords,
but it cannot deliver value until the backend recovery service exists. The
frontend can still provide a clear, non-misleading entry point now.

**Independent Test**: Can be tested independently by opening the recovery screen
from sign in, submitting valid and invalid identifiers, and confirming that no
reset is claimed while the service is unavailable.

**Acceptance Scenarios**:

1. **Given** a visitor is on the sign-in screen, **When** they choose "Forgot
   password?", **Then** the recovery screen opens.
2. **Given** the recovery service is unavailable, **When** the visitor submits a
   valid identifier, **Then** the screen clearly states that recovery is
   currently unavailable and does not say that an email was sent.
3. **Given** the recovery service is unavailable, **When** any identifier is
   submitted, **Then** the message is identical for existing and non-existing
   accounts and does not reveal whether an account exists.
4. **Given** the visitor submits an empty identifier, **When** they attempt to
   submit, **Then** an inline "required" message is shown and no request is made.
5. **Given** the recovery service becomes available, **When** the visitor
   submits an email or username, **Then** the screen shows a generic confirmation
   that does not reveal whether the account exists.
6. **Given** a future recovery service reports too many attempts, **When** the
   visitor submits again, **Then** a wait-and-retry message is shown.
7. **Given** the visitor wants to return to sign in, **When** they choose the
   back action, **Then** the sign-in screen opens.

---

### Edge Cases

- Whitespace-only identifiers, display names, usernames, or passwords are
  rejected with the same validation messages as empty values.
- Inputs longer than the allowed maximum are rejected without truncating the
  user's data silently.
- Email addresses are evaluated without leading or trailing whitespace; case
  differences must not create confusing duplicate-account messages.
- Display names containing repeated spaces, punctuation, or non-ASCII letters
  are evaluated against the documented policy and receive a specific message.
- Passwords containing a null character or unsupported control characters are
  rejected.
- Sign-in with an unknown account and sign-in with a wrong password produce the
  same generic message so account existence is not disclosed.
- A duplicate email and a duplicate username are reported on their own fields
  when both apply; the user can correct them in one pass.
- An unregistered email domain is distinguished from a malformed email address.
- A passcode containing spaces, letters, or fewer than six digits is rejected
  locally; pasting six digits with surrounding whitespace succeeds.
- A passcode expires while the user is typing; verification then reports expiry
  and offers a new code.
- Repeated resend requests before expiry are blocked; repeated requests after
  expiry are throttled if the service reports too many attempts.
- Refreshing or reopening the verification screen during an active challenge
  restores the countdown instead of silently issuing a new code.
- Direct navigation to the verification screen without a pending challenge
  redirects to sign in.
- A session expires while the user is working; the next protected action sends
  the user to sign in with an explanation.
- Signing out in one tab changes what other tabs can access after their next
  protected action.
- Sign-out fails because of a network or service problem; the user is not shown
  a false success state.
- Recovery is requested while the service is unavailable or while the user is
  offline; the screen explains the limitation and offers a way back to sign in.
- The terms of service or privacy policy destinations are unavailable; the user
  is informed and registration is not blocked by a silently broken link.
- Keyboard-only and screen-reader users can complete every journey; validation
  messages are announced and focus moves to the first invalid field.

## Requirements *(mandatory)*

### Functional Requirements

#### Session and access

- **FR-001**: The system MUST redirect visitors who attempt to open a protected
  area to the sign-in screen.
- **FR-002**: The system MUST redirect an authenticated user who opens a public
  authentication screen to the authenticated area.
- **FR-003**: The system MUST prevent a pending user from entering protected
  content and MUST direct them to email verification.
- **FR-004**: The system MUST restore a valid existing session when a user
  returns to the application, without requiring credentials again.
- **FR-005**: The system MUST treat an expired or invalid session as
  unauthenticated and MUST send the user to sign in with an explanation.
- **FR-006**: The system MUST NOT display protected content before the session
  state is known; it MUST show a clear progress indication instead.
- **FR-007**: The system MUST keep authentication state consistent across
  navigation, refreshes, and new tabs.

#### Sign in

- **FR-008**: Visitors MUST be able to sign in with either a username or an email
  address plus a password.
- **FR-009**: The sign-in action MUST remain unavailable until both credential
  fields contain a value.
- **FR-010**: The system MUST determine automatically whether the identifier is
  an email address or a username; the visitor MUST NOT have to choose.
- **FR-011**: A failed sign-in MUST show one generic invalid-credentials message
  on both credential fields and MUST NOT reveal which field was wrong.
- **FR-012**: A successful sign-in for an active account MUST grant access to the
  authenticated area.
- **FR-013**: A successful sign-in for a pending account MUST route the user to
  email verification instead of granting access.
- **FR-014**: The sign-in form MUST show progress during submission and MUST
  prevent duplicate submissions.
- **FR-015**: A network or service failure during sign-in MUST produce a
  retryable message and MUST preserve the identifier.
- **FR-016**: Login-screen controls that are not implemented, such as
  remember-me persistence or third-party sign-in, MUST be omitted, disabled, or
  clearly explained and MUST NOT imply that a session was created.
- **FR-017**: Password fields MUST offer a show/hide control and MUST expose an
  accessible label.
- **FR-018**: Sign-in errors MUST be announced to assistive technology and focus
  MUST move to the first relevant field.

#### Create an account

- **FR-019**: Visitors MUST be able to provide a display name, username, email
  address, password, password confirmation, and terms acceptance.
- **FR-020**: The system MUST validate display names as 8–32 characters of
  alphanumeric words separated by single spaces.
- **FR-021**: The system MUST validate usernames as 8–32 characters that start
  with a lowercase letter and contain only lowercase letters, digits, and single
  dots between segments.
- **FR-022**: The system MUST validate the email address format and MUST require
  an email domain that the service accepts.
- **FR-023**: The system MUST validate passwords as 8–32 characters containing at
  least one lowercase letter, one uppercase letter, one digit, and one special
  character, and MUST reject null characters.
- **FR-024**: The system MUST require the password confirmation to match the
  password.
- **FR-025**: The system MUST require acceptance of the terms of service and
  privacy policy before creating an account.
- **FR-026**: The system MUST show field-specific validation feedback before
  submission and MUST block submission until every field is valid and the terms
  are accepted.
- **FR-027**: The system MUST report an already-registered email on the email
  field with a specific message.
- **FR-028**: The system MUST report an already-registered username on the
  username field with a specific message.
- **FR-029**: The system MUST distinguish an unregistered email domain from a
  malformed email address.
- **FR-030**: Field-level failures reported by the account service MUST be
  attached to the matching field and MUST preserve the visitor's other input.
- **FR-031**: Successful registration MUST create a pending account and direct
  the visitor to email verification.
- **FR-032**: After a failure, the form MUST preserve non-sensitive input and
  MUST NOT retain the password after the visitor leaves the screen.
- **FR-033**: Every registration field MUST have an accessible label and error
  message, and password fields MUST offer show/hide controls.

#### Verify email with a one-time passcode

- **FR-034**: A pending user MUST be shown the email verification screen, and a
  passcode MUST be sent automatically when no valid challenge exists.
- **FR-035**: The passcode input MUST accept exactly six numeric digits, one per
  position, with keyboard navigation, backspace support, and paste support.
- **FR-036**: The screen MUST show the remaining validity time for the active
  passcode.
- **FR-037**: The verification action MUST remain unavailable until all six
  digits are present.
- **FR-038**: A correct, unexpired passcode MUST activate the account, invalidate
  the challenge, and grant access to the authenticated area.
- **FR-039**: An incorrect passcode MUST produce a clear error and MUST allow
  retry while the challenge remains valid.
- **FR-040**: An expired passcode MUST produce an expiry message and MUST make a
  new passcode request available.
- **FR-041**: A new passcode MUST NOT be requested automatically or manually
  while a valid challenge still has time remaining.
- **FR-042**: A failed passcode send or verification MUST produce a retryable
  message and MUST preserve the screen state.
- **FR-043**: Direct access to the verification screen without a pending
  challenge MUST redirect the visitor to sign in.
- **FR-044**: The system MUST indicate where the passcode was sent, using the
  account email either fully or partially masked.
- **FR-045**: The passcode value MUST NOT be displayed in the interface or
  written to client logs.
- **FR-046**: After successful verification, the pending state MUST be cleared so
  the user is not asked to verify again.
- **FR-047**: The verification screen MUST announce status changes, such as a new
  code being sent or a code being rejected, to assistive technology.

#### Recover a forgotten password

- **FR-048**: The sign-in screen MUST provide a visible entry point to password
  recovery.
- **FR-049**: The recovery screen MUST accept an email address or username.
- **FR-050**: The recovery action MUST remain unavailable for an empty identifier
  and MUST show a required-field message.
- **FR-051**: While the recovery service is unavailable, the screen MUST clearly
  state that recovery is unavailable and MUST NOT claim that a message was sent.
- **FR-052**: When the recovery service is available, a valid submission MUST
  show a generic confirmation that is identical for existing and non-existing
  accounts.
- **FR-053**: When the recovery service reports too many attempts, the screen
  MUST show a wait-and-retry message.
- **FR-054**: The recovery screen MUST provide a way back to sign in.
- **FR-055**: The system MUST NOT simulate password reset, token delivery, or
  new-password entry while backend recovery support is unavailable.
- **FR-056**: Recovery errors MUST be announced to assistive technology and MUST
  not disclose account existence.

#### Sign out

- **FR-057**: A sign-out action MUST be reachable from every authenticated area.
- **FR-058**: Sign out MUST end only the current session and MUST leave the
  user's other sessions active.
- **FR-059**: On successful sign out, the system MUST clear the local
  authentication state and MUST return the user to the sign-in screen.
- **FR-060**: After sign out, protected areas MUST redirect the user to sign in.
- **FR-061**: If sign out fails, the system MUST inform the user, MUST NOT claim
  success, and MUST offer a retry.
- **FR-062**: The system MUST prevent duplicate sign-out requests while one is in
  progress.
- **FR-063**: Sign-out completion and failure messages MUST be announced to
  assistive technology.

#### Cross-cutting experience

- **FR-064**: All authentication screens MUST use the established shared design
  language, components, typography, spacing, and interaction patterns.
- **FR-065**: All interactive controls MUST be keyboard operable, expose
  accessible names, and have visible focus.
- **FR-066**: Validation and server errors MUST be associated with their fields,
  announced to assistive technology, and focused appropriately.
- **FR-067**: Every operation MUST handle loading, success, error, empty, and
  retry states explicitly.
- **FR-068**: Credentials, session secrets, and passcodes MUST NOT be written to
  client logs, analytics, or persistent storage beyond what the session requires.
- **FR-069**: Client-side validation MUST be treated as user assistance; the
  backend MUST remain authoritative for credentials and account state.
- **FR-070**: The interface MUST remain usable from 320px through desktop widths
  without horizontal overflow or loss of functionality.
- **FR-071**: Authentication screens MUST NOT expose secrets, internal error
  details, or account-existence information.

### Key Entities *(include if feature involves data)*

- **Account**: A person's identity within the product. Key attributes include
  display name, username, email address, role, and lifecycle status (pending
  verification or active). An account may have multiple concurrent sessions.
- **Authentication Session**: A period of authenticated access associated with
  an account. It has a lifecycle (active, expired, ended) and determines whether
  protected content is available. Sign out ends only the current session.
- **One-Time Passcode Challenge**: A short-lived, six-digit verification secret
  tied to a pending account and a purpose. It has a creation time, an expiry
  time, a delivery destination, and a verification outcome.
- **Password Recovery Request**: A visitor's request to recover access. It has an
  identifier, a requested time, and an outcome. It is not implemented in the
  current release because the backing recovery service is unavailable.
- **Authentication State**: The user's current access condition, such as
  unauthenticated, pending email verification, or authenticated. It determines
  which screens and redirects are available.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 95% of users with valid active accounts complete sign-in
  on their first attempt within 30 seconds.
- **SC-002**: At least 90% of new users who start registration complete
  registration and email verification within 3 minutes.
- **SC-003**: 100% of protected areas block unauthenticated and pending users in
  acceptance testing.
- **SC-004**: 100% of invalid submissions produce a visible, field-specific or
  flow-specific message within 1 second of the response.
- **SC-005**: At least 95% of pending users who receive a passcode complete
  verification within 2 minutes.
- **SC-006**: Zero cases in acceptance testing where the recovery screen claims
  an email was sent while recovery is unavailable.
- **SC-007**: At least 95% of sign-out attempts complete and return the user to
  sign-in within 2 seconds.
- **SC-008**: 100% of the five journeys can be completed using only a keyboard.
- **SC-009**: Zero credentials, session secrets, or passcodes appear in client
  logs during a security review of the five journeys.
- **SC-010**: Existing and non-existing accounts receive indistinguishable
  recovery confirmation wording in usability and security testing.
- **SC-011**: All five journeys remain usable from 320px through desktop widths
  without horizontal scrolling in responsive testing.
- **SC-012**: At least 90% of test participants rate the validation and error
  messages as clear and actionable.

## Out of Scope

- Third-party or social sign-in, including the visible Google and university
  email placeholders on the sign-in screen.
- Persistent "remember me" behavior beyond the default session lifetime.
- Password recovery email delivery, reset-token handling, and new-password entry
  until the recovery service exists.
- Account deletion or account-recovery flows.
- Role-specific experiences, administration screens, or role-based navigation.
- Profile management, avatar upload, and account settings.
- Email-domain registration administration.
- Additional verification factors beyond email passcodes.
- Internationalization, localization, and right-to-left layout support.
- Native mobile applications.
- Returning users to the exact protected page they originally requested after
  sign-in; successful authentication returns users to the authenticated home.
- Authoring the terms of service or privacy policy content.

## Dependencies

- The account and authentication service, including credential verification,
  account status, session issuance, session renewal, and sign out.
- The email delivery service used to send six-digit verification passcodes.
- A password-recovery service, which is not available in the current release.
- Reachable terms of service and privacy policy destinations.
- The existing shared design system, shared UI components, and centralized
  routing and session architecture.

## Assumptions

- Users have a valid account, a reachable email address, and a supported modern
  browser with cookies enabled.
- Accounts can be pending email verification or active; only active accounts may
  enter the authenticated area.
- A verification passcode is six digits and remains valid for 60 seconds, in
  line with the documented backend behavior.
- An account may have multiple concurrent sessions, and sign out ends only the
  current session.
- Passwords are 8–32 characters and contain at least one lowercase letter, one
  uppercase letter, one digit, and one special character.
- Usernames are 8–32 characters, start with a lowercase letter, and allow
  lowercase letters, digits, and single dots between segments.
- Display names are 8–32 characters of alphanumeric words separated by single
  spaces.
- Email domains must be registered with the service before registration can
  succeed.
- The product interface is English-only for this release.
- The sign-in screen may display placeholder controls for unimplemented
  features, but those controls must not create a false success state.
- The password-recovery journey is interaction-only until the recovery service
  is available; no reset is simulated.
- The backend remains the authority for authentication, authorization, account
  status, and passcode validity; client-side checks are user assistance.
- Users are returned to the authenticated home after successful sign-in,
  registration verification, or session restoration.
- The existing terms acceptance is required for registration; the legal content
  itself is maintained outside this feature.
