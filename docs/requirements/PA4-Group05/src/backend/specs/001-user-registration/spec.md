# Feature Specification: User Registration with Email and Username Validation

**Feature Branch**: `feature/api/register`

**Created**: 2026-10-29

**Status**: Draft

**Input**: User description: "Plan for user story: User want to register their account, include 3 functions: validate email, validate username and register. Account registed by Displayname, Email, Username and Password"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Register a New Account (Priority: P1)

A prospective student opens the registration form, enters a display name, username, institutional email address, and password, and submits the form. The system validates every field, rejects the submission if any field is invalid, and creates an account when all fields pass. On success, the user receives a signed-in session so they can continue into the application without registering again.

**Why this priority**: Registration is the entry point to the product. Without it, no user can create an account or access authenticated features.

**Independent Test**: Submit registration requests with valid and invalid field combinations and verify that a valid combination creates exactly one account and returns a session, while every invalid combination creates no account and reports all applicable field errors.

**Acceptance Scenarios**:

1. **Given** a new user provides a valid display name, unused username, unused institutional email address, and valid password, **When** they submit registration, **Then** an account is created and they receive a session identifier, user identifier, and account status.
2. **Given** a new user provides an invalid display name, username, email, or password, **When** they submit registration, **Then** no account is created and every invalid field is reported in a single response.
3. **Given** a new user provides multiple invalid fields, **When** they submit registration, **Then** all applicable errors are returned together rather than stopping at the first error.
4. **Given** a username or email address that is already registered, **When** a new user submits registration with it, **Then** registration is rejected and the duplicate field is reported.
5. **Given** an email address from a domain that is not recognized as an eligible institution, **When** a new user submits registration, **Then** registration is rejected with an unregistered-domain error.

---

### User Story 2 - Validate an Email Address Before Registration (Priority: P2)

A prospective student enters an institutional email address and asks the system whether it is acceptable for registration. The system checks the address format, whether the domain belongs to a recognized institution, and whether the address is already in use, then gives the user specific feedback for the email field.

**Why this priority**: Email validation gives immediate, actionable feedback and prevents users from completing the rest of the form with an address that can never be registered.

**Independent Test**: Submit email addresses with valid formats, malformed formats, unregistered domains, and already-used addresses, and verify that each receives the correct success or field-specific error result without creating an account.

**Acceptance Scenarios**:

1. **Given** a well-formed, unused email address from a recognized institution, **When** the user checks the email, **Then** the email is reported as acceptable.
2. **Given** a malformed email address, **When** the user checks the email, **Then** the email is reported as invalid.
3. **Given** a well-formed address from an unrecognized domain, **When** the user checks the email, **Then** the email is reported as an unregistered domain.
4. **Given** an address already registered to an account, **When** the user checks the email, **Then** the email is reported as already in use.
5. **Given** an email longer than 254 characters, **When** the user checks the email, **Then** the email is reported as invalid.

---

### User Story 3 - Validate a Username Before Registration (Priority: P3)

A prospective student enters a username and asks the system whether it is acceptable for registration. The system checks the username format and whether it is already taken, then gives the user specific feedback for the username field.

**Why this priority**: Username validation prevents avoidable registration failures and helps users choose an available, well-formed identifier before submitting the full form.

**Independent Test**: Submit usernames with valid formats, malformed formats, and already-used names, and verify that each receives the correct success or field-specific error result without creating an account.

**Acceptance Scenarios**:

1. **Given** a well-formed, unused username, **When** the user checks the username, **Then** the username is reported as acceptable.
2. **Given** a username shorter than 8 or longer than 32 characters, **When** the user checks the username, **Then** the username is reported as invalid.
3. **Given** a username containing uppercase letters, spaces, underscores, hyphens, or other unsupported characters, **When** the user checks the username, **Then** the username is reported as invalid.
4. **Given** a username with a leading, trailing, or consecutive dot, **When** the user checks the username, **Then** the username is reported as invalid.
5. **Given** a well-formed username already registered to an account, **When** the user checks the username, **Then** the username is reported as already in use.

---

### Edge Cases

- A display name shorter than 8 or longer than 32 characters is rejected.
- A display name with leading, trailing, or repeated spaces is rejected; only single spaces between alphanumeric words are allowed.
- A display name containing non-English letters or unsupported symbols is rejected.
- A username must begin with a lowercase letter and may then contain lowercase letters, digits, and single dots between segments.
- An email local part must begin with a letter; separators must be followed by letters or digits, and the domain must end with a valid alphabetic suffix of at least two characters.
- An email containing spaces anywhere, more than one `@`, a missing local part, a missing domain, or leading, trailing, or consecutive dots in the domain is rejected.
- A password shorter than 8 or longer than 32 characters is rejected.
- A password missing lowercase letters, uppercase letters, digits, or special characters is rejected.
- A password containing a null character is rejected.
- If a username or email becomes taken between the pre-check and final submission, registration still rejects the duplicate and creates no account.
- If registration fails for any reason, no partial account or session is left behind.
- A request that supplies no fields for pre-registration validation is handled as an empty validation request rather than creating an account.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow a prospective user to register with a display name, username, institutional email address, and password.
- **FR-002**: The system MUST accept display names between 8 and 32 characters that contain alphanumeric words separated by single spaces, with no leading, trailing, or repeated spaces.
- **FR-003**: The system MUST accept usernames between 8 and 32 characters that start with a lowercase letter and contain only lowercase letters, digits, and single dots between non-empty segments.
- **FR-004**: The system MUST reject usernames containing uppercase letters, spaces, underscores, hyphens, leading or trailing dots, or consecutive dots.
- **FR-005**: The system MUST accept email addresses no longer than 254 characters that follow a valid address structure and belong to a recognized institutional domain.
- **FR-006**: The system MUST reject malformed email addresses, email addresses from unrecognized domains, and email addresses already linked to another account.
- **FR-007**: The system MUST accept passwords between 8 and 32 characters that contain at least one lowercase letter, one uppercase letter, one digit, and one special character.
- **FR-008**: The system MUST reject passwords that do not meet the length or character requirements, or that contain a null character.
- **FR-009**: The system MUST reject usernames already linked to another account.
- **FR-010**: The system MUST evaluate the display name, username, email address, and password as part of registration and MUST report all applicable validation errors together in one response.
- **FR-011**: The system MUST create no account and issue no session when registration fails validation.
- **FR-012**: The system MUST create the account and return a session identifier, user identifier, and account status when registration succeeds.
- **FR-013**: The system MUST allow a user to check an email address before registration and return a result specific to that email field.
- **FR-014**: The system MUST allow a user to check a username before registration and return a result specific to that username field.
- **FR-015**: The system MUST allow pre-registration validation of a single field or several fields in the same request and MUST identify which fields failed.
- **FR-016**: The system MUST re-check uniqueness during final registration so that a duplicate cannot be accepted because it was available during an earlier pre-check.
- **FR-017**: The system MUST ensure that each username and each email address belongs to at most one account.
- **FR-018**: The system MUST preserve all accounts and sessions created before a failed registration attempt; a failed attempt MUST NOT alter existing user data.

### Key Entities *(include if feature involves data)*

- **Registration Request**: The display name, username, email address, and password supplied by a prospective user.
- **User Account**: The created identity, uniquely identified by both username and email address, with a display name and account status.
- **Session**: The signed-in context issued when registration succeeds, associated with the new user account and identified by a session identifier.
- **Validation Result**: The outcome of checking a field, reported either as acceptable or as one or more reasons the field cannot be used, grouped by field.
- **Institutional Email Domain**: An allowed academic domain that determines whether an email address is eligible for registration.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 95% of users with valid information complete account registration in under 2 minutes.
- **SC-002**: 100% of registration attempts with one or more invalid fields create no account and report every invalid field in a single response.
- **SC-003**: Users receive email or username validation feedback in under 2 seconds under normal operating load.
- **SC-004**: 100% of duplicate username and duplicate email attempts are rejected, including attempts made concurrently with a successful registration.
- **SC-005**: At least 90% of users with valid information complete registration successfully on their first attempt.
- **SC-006**: Fewer than 5% of registration-related support requests concern unclear validation feedback.

## Assumptions

- Users are students or members of institutions whose email domains are already recognized by the platform; the list of recognized domains is maintained outside this feature.
- Display name and password validation are included in registration because they are part of the same registration contract, even though the user story emphasizes email and username validation.
- Pre-registration validation is advisory; final registration is the authoritative check for format, domain eligibility, and uniqueness.
- Email ownership verification, account activation, and any one-time-code flow are out of scope for this feature.
- A successful registration signs the user in immediately by issuing a session.
- Existing user accounts and their data are preserved across all failed registration attempts.
