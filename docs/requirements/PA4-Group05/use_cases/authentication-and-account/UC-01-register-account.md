# UC-01 — Register Account and Verify University Email

**Version:** `2.0`

**Performed by:** [Nguyen Thanh An] | **Edited by:** [Nguyen Thanh An]

| Field | Value |
| --- | --- |
| Use Case ID | UC-01 |
| Name | Register Account and Verify University Email |
| Primary Actor | New University Student |
| Supporting Actors | Email Delivery Service; Google OAuth 2.0 |
| Feature Group | Authentication |
| Priority | High |
| Related User Stories | US-01, US-07 |
| Related Requirements | FR-01.1 to FR-01.45; FR-07.1 to FR-07.6; NFR-SEC-2, NFR-SEC-3, NFR-SEC-8, NFR-USE-1 |
| Source Documents | `proposals/use_cases_model/UC-01-register-account.md`; `proposals/use_cases_description.md` (UC-01); `proposals/use_cases_model.md`; `proposals/use_case_diagrams.md`; `PA3-Group05/use_case.md` (section 1); `proposals/overview.md`; `proposals/functional_requirement.md`; `proposals/non_functional_requirement.md`; `proposals/userstory.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/settings.md` |

## Part A — Use Case Model

### A1. Focused Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000
    classDef specialized fill:#ffe6cc,stroke:#b36b00,stroke-width:2px,color:#000

    NewStudent@{ shape: person, label: "New University Student" }
    Student@{ shape: person, label: "University Student" }
    EmailSvc@{ shape: cloud, label: "Email Delivery Service" }
    Google@{ shape: cloud, label: "Google OAuth 2.0" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC01(["UC-01<br/>Register Account and<br/>Verify University Email"])
        G01(["G-01<br/>Register with<br/>University Email"])
        G02(["G-02<br/>Register with Google"])
        I01(["I-01<br/>Validate Registration Data"])
        I02(["I-02<br/>Verify Email OTP"])
        E01(["E-01<br/>Resend OTP"])
    end

    NewStudent --- UC01
    NewStudent -- "generalization" --> Student
    Google --- G02
    EmailSvc --- I02

    G01 -- "generalization" --> UC01
    G02 -- "generalization" --> UC01

    UC01 -. "include" .-> I01
    G01 -. "include" .-> I02
    E01 -. "extend" .-> I02

    class NewStudent,Student actor
    class EmailSvc,Google external
    class UC01 usecase
    class I01,I02 included
    class E01 extending
    class G01,G02 specialized
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected base use case; purple = included; green = extending; orange = specialized; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| New University Student | Primary human actor | A prospective user who creates an account and verifies a university email address. |
| University Student | General human actor | Parent actor of New University Student; specialized actors inherit the general student associations. |
| Email Delivery Service | Supporting system | Delivers time-limited OTP codes for account verification. |
| Google OAuth 2.0 | Supporting system | Provides the optional external authentication and registration path. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| New University Student | UC-01 Register Account and Verify University Email | Primary | Starts registration and email verification. |
| Google OAuth 2.0 | G-02 Register with Google | Supporting | Authenticates the Google registration path. |
| Email Delivery Service | I-02 Verify Email OTP | Supporting | Delivers the OTP to the university email address. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| New University Student | University Student | Actor generalization | Inherits the general student associations and adds UC-01. |
| G-01 Register with University Email | UC-01 Register Account and Verify University Email | Use case generalization | Inherits the UC-01 actor association and I-01 include; adds the mandatory OTP include. |
| G-02 Register with Google | UC-01 Register Account and Verify University Email | Use case generalization | Inherits the UC-01 actor association and I-01 include; uses Google OAuth instead of OTP. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-01 Register Account and Verify University Email | I-01 Validate Registration Data | Validate required fields, username, email, password, confirmation, CAPTCHA, and uniqueness rules. |
| G-01 Register with University Email | I-02 Verify Email OTP | Send and verify a 6-digit OTP with a 5-minute expiry. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-01 Resend OTP | I-02 Verify Email OTP | The user requests a new OTP before verification. | Invalidate the previous OTP, generate a new code, and restart the 5-minute expiry period. |

### A4. Model Notes
1. UC-01 is the selected general registration use case. G-01 and G-02 model the two registration paths without duplicating the base use case.
2. OTP verification is modeled under G-01 because it is the mandatory verification step for university-email registration. G-02 uses Google OAuth instead.
3. G-01 and G-02 inherit the UC-01 actor association and the I-01 validation behavior through use case generalization.

## Part B — Use Case Specification

### B1. Brief Description

A new university student creates a verified account and gains access to protected Studitopia features. The student can register with a supported university email address and a one-time password, or use Google OAuth. After successful registration and verification, the student can configure learning preferences and access the Home page.

### B2. Preconditions
1. The user does not have an active authenticated session.
2. The supported university and faculty email-domain catalog is available for university-email registration.
3. The email delivery service is available for the standard registration path.
4. Google OAuth 2.0 is configured for the optional Google registration path.

### B3. Postconditions
1. **Success:** A user record exists with a unique username and email address, and the account is activated and email-verified.
2. **Success:** The user's password is stored only as a secure one-way hash; Google registration associates the authenticated Google identity with the account.
3. **Success:** The user is authorized to continue to Preference Settings and then the Home page.
4. **Failure:** No active account is created, and the user receives an error message that allows correction and retry.
5. **Failure:** An unverified account, if created, cannot access protected application features.

### B4. Main Success Scenario (Basic Flow)
1. The user opens the registration page and selects **Register**.
2. The system displays Display Name, Username, Email, Password, Confirm Password, CAPTCHA, and a **Continue with Google** option.
3. The user enters the required details and completes the CAPTCHA.
4. The frontend validates that all required fields are present, the email format is valid, the username contains only alphanumeric characters, and the password satisfies the password policy.
5. The frontend verifies that Confirm Password matches Password.
6. The user submits the registration form.
7. The backend validates the submitted data, checks that the email and username are unique, and verifies that the email domain belongs to a supported university or faculty when university-email registration is used.
8. The backend stores a pending account with a securely hashed password and generates a time-limited OTP.
9. The email delivery service sends the OTP to the registered email address, and the system redirects the user to the OTP verification page.
10. The user enters the 6-digit OTP and submits it.
11. The backend verifies that the OTP is valid, unexpired, unused, and correctly formatted.
12. The system activates the account, updates the email-verification status, and authorizes access to Preference Settings.
13. The user completes or updates learning preferences and continues to the Home page.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Google registration
At basic flow step 2, the user selects **Continue with Google**. The system initiates Google OAuth, validates the authentication response, and creates or associates an account when registration requirements are satisfied. The user then continues to the appropriate next screen, normally Preference Settings.

#### A2. Invalid client-side input
At basic flow step 4 or 5, validation fails. The system displays field-level errors, keeps the entered values where appropriate, and does not submit the request until the errors are corrected.

#### A3. Duplicate email or username
At basic flow step 7, the backend reports that the email or username is already registered. The system displays a clear error and offers navigation to Login or Password Recovery.

#### A4. CAPTCHA verification failure
At basic flow step 7, CAPTCHA verification fails. The system rejects the request, shows an error, and allows the user to retry.

#### A5. Resend OTP
At basic flow step 10, the user requests a new OTP. The system generates a new 6-digit OTP, invalidates the previous OTP, sends the new code, and restarts the 5-minute expiry period.

#### A6. User cancels registration
The user leaves the registration flow before activation. No active account is available, and the pending verification data remains subject to the system's expiry and cleanup policy.

### B6. Exception Flows

#### E1. OTP invalid, expired, or already used
The system rejects the OTP, displays an appropriate message, and keeps the account unverified. The user may request a new OTP.

#### E2. OTP email delivery failure
The account remains unverified and protected features remain unavailable. The system informs the user and allows another OTP request when permitted.

#### E3. Google authentication fails or is cancelled
No account is created or changed by the failed attempt. The system displays an error and allows the user to retry or use manual registration.

#### E4. Database failure during account creation
The registration transaction is rolled back, a generic error is shown, and the user can retry without creating a partial or duplicate account.

#### E5. Unverified account attempts protected access
The backend denies access to protected features until email verification succeeds.

### B7. Business Rules
1. Display Name, Username, Email, Password, and Confirm Password are required.
2. A username must be unique and contain only alphanumeric characters.
3. An email address must be unique and valid; university-email registration requires a supported university or faculty domain.
4. A password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character.
5. Passwords and Confirm Password fields are hidden by default and support a visibility toggle.
6. The OTP is a 6-digit numeric code, expires after 5 minutes, is single-use, and is invalidated when a new OTP is generated.
7. An account cannot access protected application features before successful email verification.
8. The password is persisted only as a secure one-way hash.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-2 | User credentials must be stored using one-way password hashing with a secure hashing algorithm. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-8 | The system must protect against common web security vulnerabilities, including SQL injection, XSS, and CSRF. |
| NFR-USE-1 | A new university student must be able to complete registration within 5 minutes without external assistance. |
| Design constraint | The OTP is 6 digits, single-use, and expires after 5 minutes. The password policy and field visibility rules must be enforced by both frontend and backend validation. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Google registration | Basic flow step 2; alternative flow A1 |
| Client-side validation recovery | Basic flow steps 4-5; alternative flow A2 |
| Duplicate-account handling | Basic flow step 7; alternative flow A3 |
| CAPTCHA retry | Basic flow step 7; alternative flow A4 |
| OTP resend | Basic flow step 10; alternative flow A5 and exceptions E1-E2 |
| Registration cancellation | Any step before activation; alternative flow A6 |
| Unverified-access recovery | Protected-feature access; exception E5 |

### B10. Interface and Data Notes

- **Screen/flow path:** `Authentication → Register → OTP Verification → Preference Settings → Home` (`feature_flow.md`); `IsLogin = False → Authentication`, with `Login ↔ Register` and `Register → OTP → Preference Settings` (`screen_flow.md`).
- **Registration UI:** Display Name, Username, Email, Password, Confirm Password, CAPTCHA, **Register** submission, and **Continue with Google** option; Password and Confirm Password are hidden by default with a visibility toggle.
- **OTP UI:** 6-slot numeric OTP input, masked recipient-email notice, **Resend code** control, expiry hint, and **Submit Button**; OTP feedback is shown on invalid or expired codes.
- **Preference step:** During onboarding the user reaches Preference Settings after OTP verification and continues to Home; `settings.md` recommends `/settings/preferences` as the route.
- **Documented API:** `POST /auth/register` with body `displayname`, `username`, `email`, `password`; `GET /auth/validate` is marked "Temporarily Disabled" and accepts optional `username`, `email`, `displayname`, `password` (not recommended) query parameters.
- **Register responses:** `201 SUCCESS` with `access_token` (`token`, `created`, `expired`); `400 BAD_REQUEST`; `409 CONFLICT` with `DUPPLICATED_USERNAME`, `DUPLICATED_EMAIL`, `UNREGISTED_EMAIL_DOMAIN`; `422 UNPROCESSABLE` with `INVALID_DISPLAYNAME`, `INVALID_USERNAME`, `INVALID_EMAIL`, `INVALID_PASSWORD`; `500 INTERNAL_SERVER_ERROR` with `DATABASE_ERROR`, `UNKNOWN_ERROR`.
- **Error codes:** `0 SUCCESS`, `2002 UNKNOWN ERROR`, `45000 UNKNOWN DATABASE ERROR`, `45001 INVALID_DISPLAYNAME`, `45002 INVALID_EMAIL`, `45003 INVALID_USERNAME`, `45004 INVALID_PASSWORD`, `46001 UNREGISTED_EMAIL_DOMAIN`, `47001 DUPLICATED_EMAIL`, `47002 DUPLICATED_USERNAME`.
- **Account/status data:** `studitopia.register(displayname, username, email, password)` returns `session_id`, `user_id`, `status`; status values are `0 (inactive)`, `1 (preprofile)`, `2 (active)`, `3 (suspend)`. Account registered must be inactive; password must be hashed; HMAC-SHA256 is specified for `refresh_token` and `access_token`.
- **Validation constraints:** Required fields; unique alphanumeric username; valid and unique email; supported university or faculty domain; minimum 8-character password with lowercase, uppercase, number, and special character; Confirm Password match; CAPTCHA verification on frontend and backend.
- **OTP constraints:** 6-digit numeric code, sent to the registered email, stored as OTP or secure representation with expiration and verification status, expires after 5 minutes, single-use, invalidated on resend.
- **Notifications and privacy:** OTP delivery is performed by the Email Delivery Service; sensitive communication uses TLS 1.2 or higher; password hashes are never displayed; unverified accounts are restricted from protected application features.

### B11. Source Alignment Notes

- The backend exposes `GET /api/v1/auth/otp?type=active` to request a code and `POST /api/v1/auth/activate` to verify it. Both require the registration access session. Activation accepts `key`, `type=active`, `created_time`, and `expired_time` and returns 202 on success, 409 for an invalid OTP, or 401 for an invalid session. Google OAuth registration and the Preference Settings transition remain unspecified in the API proposal.
- `POST /auth/register` returns an `access_token`, while the API also requires the registered account to be inactive and UC-01 postconditions forbid protected access before email verification; the intended token scope is not specified.
- CAPTCHA verification is required by `FR-01.17` and business rules, but no dedicated CAPTCHA error code is listed in `response_code.md`.
- Error-name spelling differs across sources: `API.md` uses `DUPPLICATED_EMAIL`, while `response_code.md` uses `DUPLICATED_EMAIL`; the unusual `UNREGISTED_EMAIL_DOMAIN` spelling is preserved from both.
- The focused model states G-02 uses Google OAuth instead of OTP, but the sources do not explicitly state whether the Google-authenticated email is treated as verified; A1 only says the user continues, normally to Preference Settings.
- `/settings/preferences` is a recommended route in `settings.md`, not a route defined in the proposal flow documents.
