# UC-02 — Log In

**Version:** `2.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Thanh An]

| Field | Value |
| --- | --- |
| Use Case ID | UC-02 |
| Name | Log In |
| Primary Actor | Registered University Student |
| Supporting Actors | Google OAuth 2.0 |
| Feature Group | Authentication |
| Priority | High |
| Related User Stories | US-02 |
| Related Requirements | US-02, US-04; FR-02.1 to FR-02.5, FR-04.1 to FR-04.4; NFR-SEC-1, NFR-SEC-3, NFR-SEC-6, NFR-SEC-7, NFR-SEC-8 |
| Source Documents | `use_cases_model/UC-02-log-in.md`; `use_cases_description.md` (UC-02); `use_cases_model.md`; `use_case_diagrams.md`; `PA3-Group05/use_case.md` (§2 UC-02); `overview.md`; `functional_requirement.md`; `non_functional_requirement.md`; `userstory.md`; `feature_flow.md`; `screen_flow.md`; `API.md`; `response_code.md`; `settings.md` |

## Part A — Use Case Model

### A1. Focused Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    RegStudent@{ shape: person, label: "Registered University Student" }
    Student@{ shape: person, label: "University Student" }
    Google@{ shape: cloud, label: "Google OAuth 2.0" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC02(["UC-02<br/>Log In"])
        I03(["I-03<br/>Create Authenticated Session"])
        E02(["E-02<br/>Log In with Google"])
    end

    RegStudent --- UC02
    RegStudent -- "generalization" --> Student
    Google --- E02

    UC02 -. "include" .-> I03
    E02 -. "extend" .-> UC02

    class RegStudent,Student actor
    class Google external
    class UC02 usecase
    class I03 included
    class E02 extending
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| Registered University Student | Primary | A student with an existing account who logs in to access protected features. |
| University Student | General human actor | Parent of Registered University Student; inherits general student associations to UC-03, UC-04, UC-05, UC-06, and UC-07. |
| Google OAuth 2.0 | Supporting System | Provides an optional external authentication and registration path; supports E-02 Log In with Google. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| Registered University Student | UC-02 Log In | Primary | Authenticates with credentials and reaches protected features. |
| Google OAuth 2.0 | E-02 Log In with Google | Supporting | Authenticates the optional Google login path. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| Registered University Student | University Student | Actor generalization | Inherits the general student associations and adds UC-02. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-02 Log In | I-03 Create Authenticated Session | Create the authenticated session and return the student's access context. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-02 Log In with Google | UC-02 Log In | The student selects Google login instead of credentials. | Add the Google OAuth authentication path. |

### A4. Model Notes

1. Successful login always includes I-03 because a valid authenticated session is required before protected features are available.
2. Google login is an optional extension of UC-02. The standard username-or-email and password path remains the base behavior.
3. Registered University Student inherits all general University Student associations in addition to the direct UC-02 association.

## Part B — Use Case Specification

### B1. Brief Description

A registered university student authenticates and regains access to their profile, university forum, posts, and learning activities. Login supports a registered username or university email with a password, and an optional Google OAuth path.

### B2. Preconditions

1. The student has a registered and activated account.
2. The student is not already authenticated, or chooses to start a new authenticated session.
3. The authentication service and, when used, Google OAuth 2.0 are available.

### B3. Postconditions

1. **Success:** A valid authenticated session is created and the student reaches the Home page or the originally requested protected page.
2. **Success:** The student's default university forum context is available after login.
3. **Failure:** No authenticated session is created, and the student remains on the login page with a non-disclosing error message.

### B4. Main Success Scenario (Basic Flow)

1. The student opens the login page.
2. The system displays the username-or-email field, password field, CAPTCHA, **Remember Me** option where supported, **Forget Password**, **Register**, and **Continue with Google** options.
3. The student enters a registered username or university email address and password, then completes the CAPTCHA.
4. The frontend performs basic input validation and submits the login request.
5. The backend verifies the CAPTCHA, credentials, account activation status, and any account restrictions.
6. The backend creates an authenticated session and returns the access result.
7. The frontend stores the session according to the **Remember Me** choice, loads the student's profile and forum context, and redirects to Home or the intended protected page.
8. The system displays the Home page with the Forum entry and the student's university forum as the default context.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Google login

At basic flow step 2, the student selects **Continue with Google**. The system completes Google OAuth, validates the response, and either creates the authenticated session or displays an appropriate error.

#### A2. Remember Me selected

At basic flow step 7, the system maintains the session across browser restarts according to the selected option and the platform session policy.

#### A3. Intended page available

If the student was redirected from a protected page, the system returns the student to that page after successful authentication instead of Home.

#### A4. Unverified account

If the backend finds that the account is not verified, login is denied and the student is directed to complete OTP verification.

### B6. Exception Flows

#### E1. Invalid credentials

The system displays a clear error without revealing whether the username, email, or password was incorrect.

#### E2. CAPTCHA failure

The system rejects the request, displays an error, and allows the student to retry.

#### E3. Unavailable or restricted account

The system denies authentication and displays an appropriate message without exposing sensitive account details.

#### E4. Authentication service failure

No session is created. The system displays a temporary error and allows the student to retry.

#### E5. Session expires while accessing a protected page

The system denies access, informs the student that the session expired, and requires login again.

### B7. Business Rules

1. Login is accepted with either a registered username or a registered university email address.
2. Invalid-credential messages must not reveal which credential field was incorrect.
3. CAPTCHA must be successfully verified before login processing.
4. Google login is an optional authentication path for registered users.
5. Protected pages and APIs require a valid authenticated session.
6. After successful login, the student's profile, forum, posts, and learning activities are accessible according to their permissions.
7. The session is subject to the platform's inactivity-expiry policy.

### B8. Special Requirements

| ID | Requirement |
|---|---|
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-SEC-7 | Access tokens expire after 30 minutes, and refresh sessions expire after 30 days. |
| NFR-SEC-8 | The system must protect against SQL injection, XSS, CSRF, and other common web vulnerabilities. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
|---|---|
| Google login | Basic flow step 2; alternative flow A1 |
| Remember Me | Basic flow step 7; alternative flow A2 |
| Return to intended page | Basic flow step 8; alternative flow A3 |
| Unverified-account recovery | Basic flow step 5; alternative flow A4 |
| Session expiry | Protected-page access; exception E5 |

### B10. Interface and Data Notes

- Screen/flow path: `Start → IsLogin (False) → Authentication → Login`; successful `Login → Home`; `Login → Register`, `Login → Recover`, `Login → Home`; `Home → Settings → Logout → Login`; feature flow `Authentication → Login → Home`.
- Login UI fields and actions: Username / Email, Password, CAPTCHA, **Remember Me** where supported, **Forget Password**, **Register**, and **Continue with Google**.
- `POST /auth/login` query `type: 'token' | 'username' | 'email'`; token body `{}`; username/email body `{ identifier, password }`.
- `POST /auth/login` responses: `successCode: 200` for `token` with `access_token`, `created`, `expired`; `successCode: 201` for `username` or `email` with `access_token: { token, created, expired }`; `BAD_REQUEST` 400; `UNAUTHORIZED` 401; `CONFLICT` 409 (`DUPPLICATED_USERNAME | DUPLICATED_EMAIL | UNREGISTED_EMAIL_DOMAIN`); `UNPROCESSABLE` 422 (`INVALID_USERNAME | INVALID_EMAIL | INVALID_PASSWORD`); `INTERNAL_SERVER_ERROR` 500 (`DATABASE_ERROR | UNKNOWN_ERROR`).
- Error-code catalog: `UNKNOWN ERROR` 45000, `INVALID_EMAIL` 45002, `INVALID_USERNAME` 45003, `INVALID_PASSWORD` 45004, `UNREGISTED_EMAIL_DOMAIN` 46001, `DUPLICATED_EMAIL` 47001, `DUPLICATED_USERNAME` 47002; backend `UNKNOWN ERROR` 2002 and `UNKNOWN DATABASE ERROR` 45000.
- `GET /auth/validate` is listed as "Temporarily Disabled" with responses 204, 400, 409, 422, and 500; it is not the main login submission endpoint.
- Session/Remember Me: **Remember Me** maintains the session across browser restarts (AC-02.3); expired sessions are denied on protected pages/APIs (FR-04.2), the inactivity timer resets on a qualifying request (FR-04.3), and expiration requires re-login (FR-04.4).
- Data constraints: login accepts a registered username or university email address; CAPTCHA must be verified; backend checks activation status and restrictions; API account status values are inactive (0), preprofile (1), active (2), suspend (3).

### B11. Source Alignment Notes

- FR-04.1 and AC-04.1 specify a 15-minute inactivity timeout that is not implemented in the current build. NFR-SEC-7 covers token and refresh session lifetimes.
- `API.md` defines `POST /auth/login` but no logout endpoint, although US-03 and FR-03.1 to FR-03.3 require logout, client cleanup, and backend session invalidation.
- CAPTCHA is required by AC-02.4 and the use-case flow, but the documented `POST /auth/login` request body lists only `identifier` and `password` for username/email login.
- Google login is required by FR-02.4 and AC-02.5 and modeled as E-02, but `API.md` does not define a dedicated Google OAuth login endpoint.
