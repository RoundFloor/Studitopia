# Use-Case Specification: Studitopia Core Use Cases

**Company:** `Studitopia`

**Project:** `Studitopia`

**Document:** Use-Case Specification: Core Use Cases UC-01 to UC-07

**Version:** `1.0`

## Document Information

| Field | Value |
|---|---|
| Project Name | Studitopia |
| Use-Case Specification | Core Use Cases UC-01 to UC-07 |
| Version | 1.0 |
| Date | 14/Nov/2026 |
| Document Identifier | PA3-G5-UC-SPEC |

## Revision History

| Date | Version | Description | Author |
|---|---|---|---|
| 10/11 | 1.0 | Filled the RUP use-case template with the seven selected PA3 use cases, including use-case diagrams and specifications | Nguyen Le QUoc Huy |
| 11/11 | 1.0 | Clean all use-case diagram redundance | Nguyen Le Quoc Huy |

## Document Contribution

| Use Case | Performed by | Reviewed by | Edited by |
|---|---|---|---|
| UC-01 Register Account and Verify University Email | An | Bảo | An |
| UC-02 Log In | Huy | Tuấn | Huy |
| UC-03 Browse and Search the University Forum | Bảo | Huy | Bảo |
| UC-04 Create Discussion Post | Tuấn | Bình | Tuấn |
| UC-05 Comment and Answer | Bình | An | Bình |
| UC-06 Share Learning Resource | Bình | Bảo | Bình |
| UC-07 Join or Create a Study Room | An | Tuấn | Tuấn |

---

## Table of Contents

1. [UC-01 Register Account and Verify University Email](#1-uc-01-register-account-and-verify-university-email)
2. [UC-02 Log In](#2-uc-02-log-in)
3. [UC-03 Browse and Search the University Forum](#3-uc-03-browse-and-search-the-university-forum)
4. [UC-04 Create Discussion Post](#4-uc-04-create-discussion-post)
5. [UC-05 Comment and Answer](#5-uc-05-comment-and-answer)
6. [UC-06 Share Learning Resource](#6-uc-06-share-learning-resource)
7. [UC-07 Join or Create a Study Room](#7-uc-07-join-or-create-a-study-room)


---

# 1. UC-01 Register Account and Verify University Email

## 1.1 Use-Case Name

`UC-01 Register Account and Verify University Email`

## 1.2 Brief Description

A new university student creates a verified account and gains access to protected Studitopia features. The student can register with a supported university email address and a one-time password, or use Google OAuth. After successful registration and verification, the student can configure learning preferences and access the Home page.

| Field | Value |
|---|---|
| Use Case ID | UC-01 |
| Primary Actor | New University Student |
| Supporting Actors | Email Delivery Service; Google OAuth 2.0 |
| Feature Group | Authentication |
| Priority | High |
| Related User Stories | US-01, US-07 |
| Related Requirements | FR-01.1 to FR-01.45; FR-07.1 to FR-07.6; NFR-SEC-2, NFR-SEC-3, NFR-SEC-8, NFR-USE-1 |

## 1.3 Use Case Diagram

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

## 1.4 Flow of Events

### 1.4.1 Basic Flow

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

### 1.4.2 Alternative Flows

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

### 1.4.3 Business Rules

1. Display Name, Username, Email, Password, and Confirm Password are required.
2. A username must be unique and contain only alphanumeric characters.
3. An email address must be unique and valid; university-email registration requires a supported university or faculty domain.
4. A password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character.
5. Passwords and Confirm Password fields are hidden by default and support a visibility toggle.
6. The OTP is a 6-digit numeric code, expires after 5 minutes, is single-use, and is invalidated when a new OTP is generated.
7. An account cannot access protected application features before successful email verification.
8. The password is persisted only as a secure one-way hash.

## 1.5 Special Requirements

| ID | Requirement |
|---|---|
| NFR-SEC-2 | User credentials must be stored using one-way password hashing with a secure hashing algorithm. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-8 | The system must protect against common web security vulnerabilities, including SQL injection, XSS, and CSRF. |
| NFR-USE-1 | A new university student must be able to complete registration within 5 minutes without external assistance. |
| Design constraint | The OTP is 6 digits, single-use, and expires after 5 minutes. The password policy and field visibility rules must be enforced by both frontend and backend validation. |

## 1.6 Preconditions

1. The user does not have an active authenticated session.
2. The supported university and faculty email-domain catalog is available for university-email registration.
3. The email delivery service is available for the standard registration path.
4. Google OAuth 2.0 is configured for the optional Google registration path.

## 1.7 Postconditions

1. **Success:** A user record exists with a unique username and email address, and the account is activated and email-verified.
2. **Success:** The user's password is stored only as a secure one-way hash; Google registration associates the authenticated Google identity with the account.
3. **Success:** The user is authorized to continue to Preference Settings and then the Home page.
4. **Failure:** No active account is created, and the user receives an error message that allows correction and retry.
5. **Failure:** An unverified account, if created, cannot access protected application features.

## 1.8 Extension Points

| Extension Point | Location in Flow of Events |
|---|---|
| Google registration | Basic flow step 2; alternative flow A1 |
| Client-side validation recovery | Basic flow steps 4-5; alternative flow A2 |
| Duplicate-account handling | Basic flow step 7; alternative flow A3 |
| CAPTCHA retry | Basic flow step 7; alternative flow A4 |
| OTP resend | Basic flow step 10; alternative flow A5 and exceptions E1-E2 |
| Registration cancellation | Any step before activation; alternative flow A6 |
| Unverified-access recovery | Protected-feature access; exception E5 |

---

# 2. UC-02 Log In

## 2.1 Use-Case Name

`UC-02 Log In`

## 2.2 Brief Description

A registered university student authenticates and regains access to their profile, university forum, posts, and learning activities. Login supports a registered username or university email with a password, and an optional Google OAuth path.

| Field | Value |
|---|---|
| Use Case ID | UC-02 |
| Primary Actor | Registered University Student |
| Supporting Actors | Google OAuth 2.0 |
| Feature Group | Authentication |
| Priority | High |
| Related User Stories | US-02 |
| Related Requirements | FR-02.1 to FR-02.5; FR-04.1 to FR-04.4; NFR-SEC-1, NFR-SEC-3, NFR-SEC-6, NFR-SEC-7, NFR-SEC-8 |

## 2.3 Use Case Diagram

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

## 2.4 Flow of Events

### 2.4.1 Basic Flow

1. The student opens the login page.
2. The system displays the username-or-email field, password field, CAPTCHA, **Remember Me** option where supported, **Forget Password**, **Register**, and **Continue with Google** options.
3. The student enters a registered username or university email address and password, then completes the CAPTCHA.
4. The frontend performs basic input validation and submits the login request.
5. The backend verifies the CAPTCHA, credentials, account activation status, and any account restrictions.
6. The backend creates an authenticated session and returns the access result.
7. The frontend stores the session according to the **Remember Me** choice, loads the student's profile and forum context, and redirects to Home or the intended protected page.
8. The system displays the Home page with the Forum entry and the student's university forum as the default context.

### 2.4.2 Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Google login

At basic flow step 2, the student selects **Continue with Google**. The system completes Google OAuth, validates the response, and either creates the authenticated session or displays an appropriate error.

#### A2. Remember Me selected

At basic flow step 7, the system maintains the session across browser restarts according to the selected option and the platform session policy.

#### A3. Intended page available

If the student was redirected from a protected page, the system returns the student to that page after successful authentication instead of Home.

#### A4. Unverified account

If the backend finds that the account is not verified, login is denied and the student is directed to complete OTP verification.

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

### 2.4.3 Business Rules

1. Login is accepted with either a registered username or a registered university email address.
2. Invalid-credential messages must not reveal which credential field was incorrect.
3. CAPTCHA must be successfully verified before login processing.
4. Google login is an optional authentication path for registered users.
5. Protected pages and APIs require a valid authenticated session.
6. After successful login, the student's profile, forum, posts, and learning activities are accessible according to their permissions.
7. The session is subject to the platform's inactivity-expiry policy.

## 2.5 Special Requirements

| ID | Requirement |
|---|---|
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-SEC-7 | Inactive authentication sessions must expire automatically after 30 minutes. |
| NFR-SEC-8 | The system must protect against SQL injection, XSS, CSRF, and other common web vulnerabilities. |

## 2.6 Preconditions

1. The student has a registered and activated account.
2. The student is not already authenticated, or chooses to start a new authenticated session.
3. The authentication service and, when used, Google OAuth 2.0 are available.

## 2.7 Postconditions

1. **Success:** A valid authenticated session is created and the student reaches the Home page or the originally requested protected page.
2. **Success:** The student's default university forum context is available after login.
3. **Failure:** No authenticated session is created, and the student remains on the login page with a non-disclosing error message.

## 2.8 Extension Points

| Extension Point | Location in Flow of Events |
|---|---|
| Google login | Basic flow step 2; alternative flow A1 |
| Remember Me | Basic flow step 7; alternative flow A2 |
| Return to intended page | Basic flow step 8; alternative flow A3 |
| Unverified-account recovery | Basic flow step 5; alternative flow A4 |
| Session expiry | Protected-page access; exception E5 |

---

# 3. UC-03 Browse and Search the University Forum

## 3.1 Use-Case Name

`UC-03 Browse and Search the University Forum`

## 3.2 Brief Description

A student discovers relevant university, major, and course discussions, searches for academic content, and opens a post to read its full details. The forum is the primary collaboration feature of Studitopia.

| Field | Value |
|---|---|
| Use Case ID | UC-03 |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum (Primary) |
| Priority | High |
| Related User Stories | US-11, US-12, US-13, US-17, US-23 |
| Related Requirements | FR-11.1 to FR-11.4; FR-12.1 to FR-12.6; FR-13.1 to FR-13.5; FR-17.1 to FR-17.5; FR-23.1 to FR-23.5; NFR-PERF-2, NFR-PERF-3, NFR-PERF-5, NFR-SEC-4, NFR-SEC-6, NFR-PRIV-7, NFR-USE-3 |

## 3.3 Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC03(["UC-03<br/>Browse and Search the<br/>University Forum"])
        I04(["I-04<br/>Load Forum Post List"])
        E03(["E-03<br/>Search Forum"])
        E04(["E-04<br/>View Post Detail"])
    end

    Student --- UC03

    UC03 -. "include" .-> I04
    E03 -. "extend" .-> UC03
    E04 -. "extend" .-> UC03

    class Student actor
    class UC03 usecase
    class I04 included
    class E03,E04 extending
```

**Diagram notation.** Person shape = human actor; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.

## 3.4 Flow of Events

### 3.4.1 Basic Flow

1. The student selects **Forum** from the main navigation.
2. The system opens the student's default university forum and displays the Forum entry, forum hierarchy, and post list.
3. The student selects a university; the system displays the majors offered by that university.
4. The student selects a major; the system displays the courses associated with that major.
5. The student selects a course; the system displays the course forum and its posts.
6. The system shows each post summary with title, author, post type, timestamp, vote score, comment count, and solved status.
7. The student optionally applies filters such as My Post, area, university, major, course, tags, and post type, and selects a sorting order such as newest, top trending, most voted, or most discussed.
8. The student optionally enters a keyword and searches by tag, title, content, author, university, major, or course.
9. The system ranks matching results by relevance and engagement and displays the filtered result set.
10. The student opens a post from the list or search results.
11. The system displays the full post content, author, post type, forum context, timestamp, vote score, tags, comments, answers, true response, attachments, and functional tools when present.
12. The system displays only the actions permitted for the student, such as vote, comment, save, report, or mark true response.

### 3.4.2 Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Browse another university

At basic flow step 3, the student selects another university forum when permitted. The system applies that university as the active browsing context and shows only content relevant to that context.

#### A2. Change forum context

The student switches directly between university, major, and course levels. The system updates the post list to match the selected level.

#### A3. No posts match

At basic flow step 9 or 10, no posts match the filters or search query. The system displays an empty state and offers to clear filters or change the search terms.

#### A4. Search without a keyword

The student applies only filters. The system returns results based on the selected forum context and filters.

#### A5. Return to a previous context

The student navigates back; the system restores the previous forum level and result state where supported.

#### E1. Forum content cannot be loaded

The system displays an error state and a retry option without showing partial or stale restricted content.

#### E2. Selected post is unavailable or deleted

The system informs the student that the post is no longer available and returns them to the post list.

#### E3. Access is not permitted

The system denies access to private or restricted content and explains that the student lacks permission.

#### E4. Invalid search or filter combination

The system displays validation feedback and preserves the usable parts of the query.

### 3.4.3 Business Rules

1. Forum content is organized by University, then Major, then Course.
2. After login, the student's own university is the default forum context.
3. Each forum level must display only posts and materials relevant to that level.
4. Post summaries must include title, author, post type, timestamp, vote score, comment count, and solved status.
5. Search supports tags, title, content, author, university, major, and course.
6. Search results are ranked by relevance and engagement and can be filtered by post type, solved status, and time range.
7. Post detail must show the full content, metadata, discussion, marked true response, attachments, and functional tools when present.
8. Available post actions are determined by the student's permissions.
9. Privacy and forum-access rules apply consistently to post lists, post details, and search results.

## 3.5 Special Requirements

| ID | Requirement |
|---|---|
| NFR-PERF-2 | A forum post list must load within 2 seconds under normal operating conditions. |
| NFR-PERF-3 | A post detail page and its comments must display within 2 seconds. |
| NFR-PERF-5 | Forum search results must return within 2 seconds for common queries. |
| NFR-SEC-4 | Private forum content and private-group content must be restricted to authorized users only. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-PRIV-7 | Privacy settings must apply consistently to forum posts, comments, member lists, and search results. |
| NFR-USE-3 | Navigation and interaction patterns must remain consistent across university, major, and course forums. |

## 3.6 Preconditions

1. The student is authenticated with an active session.
2. University, major, course, and forum data are available.
3. The student has permission to view the selected forum content.

## 3.7 Postconditions

1. **Success:** The selected forum level and a relevant post list are displayed.
2. **Success:** Search and filters return ranked results, or a clear empty state is shown when nothing matches.
3. **Success:** The student can open a post and read its full content, metadata, discussion, attachments, and permitted actions.
4. **Failure:** The system displays an error or permission message without exposing restricted content.

## 3.8 Extension Points

| Extension Point | Location in Flow of Events |
|---|---|
| Change browsing context | Basic flow steps 3-5; alternatives A1-A2 |
| Apply filters | Basic flow step 7; alternative A4 |
| Search forum | Basic flow step 8; alternative A3 and exception E4 |
| View post detail | Basic flow step 10; exception E2 |
| Empty-result recovery | Basic flow step 9; alternative A3 |
| Restricted-content handling | Access check; exception E3 |

---

# 4. UC-04 Create Discussion Post

## 4.1 Use-Case Name

`UC-04 Create Discussion Post`

## 4.2 Brief Description

A student publishes an academic question or general discussion in the selected university, major, and course forum. The post supports text, optional LaTeX, optional images, and tags.

| Field | Value |
|---|---|
| Use Case ID | UC-04 |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum (Primary) |
| Priority | High |
| Related User Stories | US-14 |
| Related Requirements | FR-14.1 to FR-14.6; FR-17.1 to FR-17.5; FR-19.1 to FR-19.5; FR-20.1 to FR-20.5; NFR-PERF-4, NFR-SEC-8, NFR-SEC-9 |

## 4.3 Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC04(["UC-04<br/>Create Discussion Post"])
        I05(["I-05<br/>Validate Post Content"])
        E05(["E-05<br/>Attach Image or LaTeX"])
    end

    Student --- UC04

    UC04 -. "include" .-> I05
    E05 -. "extend" .-> UC04

    class Student actor
    class UC04 usecase
    class I05 included
    class E05 extending
```

**Diagram notation.** Person shape = human actor; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.

## 4.4 Flow of Events

### 4.4.1 Basic Flow

1. The student selects **Create Post** from the selected forum.
2. The system displays the post-type choices and the discussion post editor.
3. The system shows the active university, major, and course context for the new post.
4. The student enters a title, text content, optional LaTeX, optional images, and tags.
5. The student marks the post as a question or a general discussion.
6. The frontend validates the required content and supported image types or sizes before submission.
7. The student submits the post.
8. The backend verifies authentication, forum access, post permissions, content, and rate limits.
9. The backend stores the post with its author, post type, tags, and university, major, and course associations.
10. The system publishes the post and returns the new post result.
11. The system displays the post in the corresponding forum post list and allows the student to open its detail page.

### 4.4.2 Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. General discussion

At basic flow step 5, the student selects **General Discussion** instead of **Question**. The publication flow is unchanged, but the post is not treated as a question awaiting a true response.

#### A2. Question post

At basic flow step 5, the student selects **Question**. The post becomes eligible for answers and true-response marking after publication.

#### A3. Add or remove optional content

At basic flow step 4, the student adds or removes LaTeX, images, or tags. The editor updates the preview and validation state before submission.

#### A4. Cancel creation

The student leaves the editor before submitting. No published post is created; any retained draft behavior is subject to the platform's buffering policy.

#### E1. Missing or invalid content

The system highlights the invalid fields, keeps the editor open, and does not submit until corrected.

#### E2. Unsupported or oversized image

The system rejects the image, identifies the constraint, and allows the student to choose another file.

#### E3. Forum access lost

If the forum context is no longer valid or the student lacks posting permission, the system rejects publication and explains the reason.

#### E4. Rate limit reached

The system rejects the submission and informs the student to retry later.

#### E5. Server or database failure

No post is published. The system displays a retry option and preserves the student's entered content where supported.

### 4.4.3 Business Rules

1. A discussion post must be associated with the selected university, major, and course.
2. A discussion post supports a title, text content, LaTeX, images, and tags.
3. The author must choose whether the post is a question or a general discussion.
4. Content must pass frontend and backend validation before publication.
5. A published post must appear in the corresponding forum post list.
6. Only authenticated and authorized students may create posts in a forum.
7. Post publication is subject to rate limiting to reduce spam and abuse.

## 4.5 Special Requirements

| ID | Requirement |
|---|---|
| NFR-PERF-4 | A new post must be reflected in the relevant forum view within 2 seconds. |
| NFR-SEC-8 | The system must protect against SQL injection, XSS, CSRF, and other common web vulnerabilities. |
| NFR-SEC-9 | Post creation must be rate-limited to reduce spam and abuse. |
| Design constraint | The editor must validate required content, supported image types, and image sizes before submission. LaTeX and images are optional. |

## 4.6 Preconditions

1. The student is authenticated with an active session.
2. The student has selected a valid university, major, and course forum context.
3. The student is permitted to create posts in that forum.

## 4.7 Postconditions

1. **Success:** A validated discussion post is stored with its author, content, post type, tags, and forum context.
2. **Success:** The post appears in the corresponding forum post list and can be opened in post detail.
3. **Failure:** No post is published, and the student receives a clear validation or system error with the opportunity to correct the content.

## 4.8 Extension Points

| Extension Point | Location in Flow of Events |
|---|---|
| Select post type | Basic flow step 5; alternatives A1-A2 |
| Add optional rich content | Basic flow step 4; alternative A3 |
| Image validation failure | Basic flow step 6; exception E2 |
| Publication authorization failure | Basic flow step 8; exception E3 |
| Rate-limit recovery | Basic flow step 8; exception E4 |
| Cancel creation | Before basic flow step 7; alternative A4 |

---

# 5. UC-05 Comment and Answer

## 5.1 Use-Case Name

`UC-05 Comment and Answer`

## 5.2 Brief Description

A student contributes to an academic discussion by commenting on a post or answering a question, so that ideas are discussed and other students receive help. The post author is notified about each new comment or answer.

| Field | Value |
|---|---|
| Use Case ID | UC-05 |
| Primary Actor | University Student |
| Supporting Actors | Post Author; Notification Service |
| Feature Group | Forum (Primary) |
| Priority | High |
| Related User Stories | US-18 |
| Related Requirements | FR-18.1 to FR-18.6; FR-17.3; FR-20.1 to FR-20.5; FR-38.1; NFR-PERF-4, NFR-PERF-6, NFR-SEC-9 |

## 5.3 Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }
    PostAuthor@{ shape: person, label: "Post Author" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC05(["UC-05<br/>Comment and Answer"])
        I06(["I-06<br/>Send Forum Notification"])
        E06(["E-06<br/>Nested Reply"])
    end

    Student --- UC05
    PostAuthor --- I06
    NotifSvc --- I06
    PostAuthor -- "generalization" --> Student

    UC05 -. "include" .-> I06
    E06 -. "extend" .-> UC05

    class Student,PostAuthor actor
    class NotifSvc external
    class UC05 usecase
    class I06 included
    class E06 extending
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.

## 5.4 Flow of Events

### 5.4.1 Basic Flow

1. The student opens a post detail page.
2. The system displays the post's existing comments and answers, including the marked true response when present.
3. The student selects the comment or answer composer.
4. The student enters the response content.
5. The system identifies whether the response is a comment on a discussion post or an answer to a question post.
6. The student submits the response.
7. The frontend validates that the response is not empty and submits it to the backend.
8. The backend verifies authentication, post visibility, posting permission, content validity, and rate limits.
9. The backend stores the comment or answer, associates it with the post and the student, and updates the discussion structure.
10. The system updates the displayed thread and comment or answer count.
11. The notification service notifies the post author that a new comment or answer was added.
12. The student sees the published response in the thread.

### 5.4.2 Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Nested reply

At basic flow step 4, the student replies to an existing comment or answer. The system stores the response with its parent and displays it in the threaded structure where applicable.

#### A2. Edit own response

The student selects **Edit** on their own comment or answer, changes the content, and submits. The system validates and updates the existing response.

#### A3. Delete own response

The student selects **Delete** on their own comment or answer and confirms. The system removes or hides the response according to the platform's deletion policy and updates the thread.

#### A4. Answer a question

At basic flow step 5, the system classifies the response as an answer to the question post, making it eligible for true-response marking by the post author.

#### A5. No existing discussion

At basic flow step 2, the system shows an empty discussion state and still presents the composer.

#### E1. Empty or invalid response

The system keeps the composer open, shows validation feedback, and does not submit.

#### E2. Post removed, locked, or inaccessible

The system rejects the response and explains that the post is no longer available for discussion.

#### E3. Posting restriction

A restricted or unauthorized student is denied commenting or answering.

#### E4. Rate limit reached

The system rejects the response and asks the student to retry later.

#### E5. Notification delivery failure

The comment or answer remains published; the system records or retries the notification according to the notification policy.

#### E6. Server or database failure

No response is stored, and the student receives a retry option with the entered content preserved where supported.

### 5.4.3 Business Rules

1. Comments are allowed on discussion posts; answers are allowed on question posts.
2. Nested replies are supported where applicable.
3. Students may edit or delete only their own comments and answers.
4. Comments and answers are displayed in chronological or threaded order.
5. The post author is notified when a new comment or answer is added.
6. Commenting and answering are subject to authentication, permission, and rate-limit checks.
7. Only one true response may be marked for a question post; that action is performed by the post author under US-20.

## 5.5 Special Requirements

| ID | Requirement |
|---|---|
| NFR-PERF-4 | A new comment or answer must be reflected in the relevant forum view within 2 seconds. |
| NFR-PERF-6 | Forum notifications must be delivered with a latency of 2 seconds or less under normal operating conditions. |
| NFR-SEC-9 | Commenting and answering must be rate-limited to reduce spam and abuse. |
| Design constraint | A notification delivery failure must not roll back an already published comment or answer; the notification may be recorded or retried. |

## 5.6 Preconditions

1. The student is authenticated with an active session.
2. The student can view the selected post.
3. The post accepts comments or answers and has not been removed or locked.
4. The student is not restricted from commenting or answering.

## 5.7 Postconditions

1. **Success:** The comment or answer is stored and associated with the post, its author, and its parent comment when applicable.
2. **Success:** The comment or answer is displayed in the post's discussion in chronological or threaded order.
3. **Success:** The post author receives a notification about the new comment or answer.
4. **Failure:** No comment or answer is stored, and the student receives a clear error message.

## 5.8 Extension Points

| Extension Point | Location in Flow of Events |
|---|---|
| Nested reply | Basic flow step 4; alternative A1 |
| Edit or delete own response | After the response is displayed; alternatives A2-A3 |
| Answer classification | Basic flow step 5; alternative A4 |
| Empty discussion | Basic flow step 2; alternative A5 |
| Notification delivery | Basic flow step 11; exception E5 |
| Rate-limit recovery | Basic flow step 8; exception E4 |

---

# 6. UC-06 Share Learning Resource

## 6.1 Use-Case Name

`UC-06 Share Learning Resource`

## 6.2 Brief Description

A student publishes a learning resource so that other students can discover and access useful academic material. The resource includes metadata, optional tags, and an uploaded file, and becomes searchable after publication.

| Field | Value |
|---|---|
| Use Case ID | UC-06 |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Learning Resource Library |
| Priority | High |
| Related User Stories | US-27 |
| Related Requirements | FR-27.1 to FR-27.5; FR-25.1 to FR-25.5; FR-28.1 to FR-28.3; FR-29.1 to FR-29.4; NFR-SEC-5, NFR-PRIV-5, NFR-SCAL-4 |

## 6.3 Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC06(["UC-06<br/>Share Learning Resource"])
        I07(["I-07<br/>Validate and<br/>Store Resource"])
        E07(["E-07<br/>Restrict Resource Access"])
    end

    Student --- UC06

    UC06 -. "include" .-> I07
    E07 -. "extend" .-> UC06

    class Student actor
    class UC06 usecase
    class I07 included
    class E07 extending
```

**Diagram notation.** Person shape = human actor; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.

## 6.4 Flow of Events

### 6.4.1 Basic Flow

1. The student opens the Learning Resource Library and selects **Share Resource**.
2. The system displays the resource form for title, description, subject tags, course tags, and file upload.
3. The student enters the resource details and selects a file.
4. The frontend validates the required fields and checks the file type and size against the configured limits.
5. The student submits the resource.
6. The backend verifies authentication and publication permission, validates the metadata and file, and performs the configured file-safety checks.
7. The backend stores the file and creates the resource record associated with the student, tags, and academic context.
8. The system publishes the resource and makes it searchable in the library.
9. The system displays a success confirmation and the resource in the student's storage view.
10. The resource becomes available to other users according to its privacy settings.

### 6.4.2 Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Add or change tags

At basic flow step 3, the student adds or removes subject or course tags. The system updates the searchable metadata before publication.

#### A2. Replace the file before submission

The student selects a different file. The system revalidates file type and size and replaces the pending upload.

#### A3. Privacy-restricted resource

At basic flow step 8, the resource is published with restricted access. It becomes searchable according to the privacy rule, but only authorized users can access the file.

#### A4. Cancel publication

The student leaves the form before submitting. No published resource is created.

#### A5. View own published resources

After publication, the student opens the storage view to see the resource status, publication date, and access statistics.

#### E1. Missing or invalid metadata

The system highlights the invalid fields, keeps the form open, and does not publish.

#### E2. Unsupported file type or oversized file

The system rejects the file, identifies the violated constraint, and allows the student to choose another file.

#### E3. File-safety check fails

The system blocks publication and informs the student that the file cannot be accepted.

#### E4. Storage or database failure

No published resource is created. The system displays a retry option and avoids leaving an orphaned or partially published resource.

#### E5. Publication permission lost

The system rejects the publication and explains that the student is no longer authorized.

#### E6. Resource becomes unavailable after publication

The system prevents further access and removes the resource from search and library listings when required.

### 6.4.3 Business Rules

1. A resource must include a title and the metadata required for publication.
2. A resource can include a description, subject tags, and course tags.
3. Uploaded files must pass file type and size validation before acceptance.
4. A published resource must be searchable in the library.
5. Access to a published resource must follow the owner's privacy settings.
6. A deleted resource must be removed from search and library listings and must no longer be accessible to other users.
7. Publication is restricted to authenticated and authorized students.

## 6.5 Special Requirements

| ID | Requirement |
|---|---|
| NFR-SEC-5 | Uploaded files must be validated for file type and file size before acceptance. |
| NFR-PRIV-5 | Users must be able to control access to documents and learning resources they share. |
| NFR-SCAL-4 | The architecture must support at least 100,000 uploaded documents and learning resources. |
| Design constraint | Configured file-safety checks must complete before publication, and failed storage or database operations must not leave orphaned or partially published resources. |

## 6.6 Preconditions

1. The student is authenticated with an active session.
2. The student is permitted to publish resources to the library.
3. The file storage service and configured file-validation checks are available.

## 6.7 Postconditions

1. **Success:** A validated resource is stored with its owner, metadata, file, subject tags, and course tags.
2. **Success:** The resource is searchable in the library after publication.
3. **Success:** Other users can view and access the resource according to its privacy settings.
4. **Failure:** No resource is published, and the student receives a clear validation or system error.

## 6.8 Extension Points

| Extension Point | Location in Flow of Events |
|---|---|
| Tag changes | Basic flow step 3; alternative A1 |
| File replacement | Basic flow step 3; alternative A2 |
| Privacy restriction | Basic flow step 8; alternative A3 |
| Metadata validation failure | Basic flow step 4; exception E1 |
| File validation failure | Basic flow steps 4 and 6; exceptions E2-E3 |
| Cancel publication | Before basic flow step 5; alternative A4 |
| Storage-view review | Basic flow step 9; alternative A5 |

---

# 7. UC-07 Join or Create a Study Room

## 7.1 Use-Case Name

`UC-07 Join or Create a Study Room`

## 7.2 Brief Description

A student enters an optional live study space by joining a public room, requesting access to a private room, or creating a new room for a study group. Meeting rooms are secondary supporting features and do not replace the forum as the primary collaboration space.

| Field | Value |
|---|---|
| Use Case ID | UC-07 |
| Primary Actor | University Student |
| Supporting Actors | Room Owner or Manager; Notification Service |
| Feature Group | Meeting Rooms (Secondary) |
| Priority | Medium (Supporting) |
| Related User Stories | US-34, US-35 |
| Related Requirements | FR-34.1 to FR-34.4; FR-35.1 to FR-35.6; FR-36.1 to FR-36.6; FR-38.3; FR-39.3; NFR-PERF-7, NFR-SCAL-6, NFR-PRIV-6 |

## 7.3 Use Case Diagram
```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000
    classDef specialized fill:#ffe6cc,stroke:#b36b00,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }
    RoomOwner@{ shape: person, label: "Room Owner or Manager" }

    subgraph System["Studitopia System Boundary"]
        direction TB

        UC07(["UC-07<br/>Join or Create a Study Room"])

        G03(["G-03<br/>Join Public Room"])
        G04(["G-04<br/>Create Study Room"])

        I08(["I-08<br/>Enter Room Session"])

        E08(["E-08<br/>Use Shared Study Tools"])
    end
    Student --- UC07
    RoomOwner -->|generalization| Student
    G03 -->|generalization| UC07
    G04 -->|generalization| UC07
    UC07 -.->|"<<include>>"| I08
    E08 -.->|"<<extend>>"| UC07
    class Student,RoomOwner actor
    class UC07 usecase
    class I08 included
    class E08 extending
    class G03,G04 specialized
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected base use case; purple = included; green = extending; orange = specialized; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.

## 7.4 Flow of Events

### 7.4.1 Basic Flow

1. The student opens the Meeting Lobby.
2. The system displays available public study rooms with availability and capacity information.
3. The student selects a public room.
4. The backend verifies that the room still exists, is public, and has an available seat.
5. The backend adds the student to the room's participant list and establishes the room session.
6. The system opens the room and displays the supported shared study tools.
7. The student collaborates in the room using the available tools.

### 7.4.2 Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Request a private room

At basic flow step 3, the student selects a private or custom room. The system creates a join request and notifies the room owner or manager. If accepted, the student joins the room; if rejected, the student is notified and remains in the lobby.

#### A2. Create a room

The student selects **Create Room**, enters a name, description, privacy level, supported tools, capacity, duration, and communication rules, and submits. The backend validates the configuration, creates the room, assigns the student as owner or manager, and opens the room.

#### A3. View room details before joining

The student opens the room detail page to review capacity, description, and configuration before joining or requesting access.

#### A4. Room becomes full

At basic flow step 4, the room has no available seat. The system prevents the join, explains that the room is full, and returns the student to the lobby.

#### A5. Use shared tools

After entering the room, the student uses the shared whiteboard, shared notes, or shared timer. Updates are synchronized for all participants.

#### A6. Reconnect after interruption

If the room connection is interrupted, the system attempts to restore the session and preserve shared notes without data loss.

#### E1. Private request rejected

The owner or manager rejects the request. The student receives a notification and cannot enter the room.

#### E2. Room no longer exists or is closed

The system informs the student and refreshes the lobby.

#### E3. Capacity race condition

Another student takes the last seat before the join completes. The system rejects the join and shows that the room is full.

#### E4. Invalid room configuration

When creating or configuring a room, the system highlights invalid values such as unsupported capacity or duration and does not create the room.

#### E5. Real-time service failure

The student cannot enter or remain in the live room. The system reports the failure and preserves shared notes where possible.

#### E6. Unauthorized or blocked participant

The backend denies room entry and explains the access restriction.

### 7.4.3 Business Rules

1. Meeting rooms are optional supporting features; they do not replace the forum as the primary collaboration space.
2. A public room can be joined when it has available capacity.
3. A private or custom room requires a join request that the owner or manager can accept or reject.
4. A room creator becomes the room owner or manager.
5. Room managers can configure capacity, duration, communication rules, privacy level, and supported tools.
6. Shared tool updates must be synchronized for all room participants.
7. Shared notes must be preserved during the room session and handle reconnection without data loss.
8. Room participation and invitations must respect the user's communication and privacy settings.

## 7.5 Special Requirements

| ID | Requirement |
|---|---|
| NFR-PERF-7 | Optional supporting meeting-room tools must maintain an update latency of 1 second or less when a room is in use. |
| NFR-SCAL-6 | The architecture must support at least 100 concurrent optional meeting rooms. |
| NFR-PRIV-6 | Users must be able to control whether other users can send them messages or room invitations. |
| Design constraint | Shared tool updates must be synchronized for all participants, and shared notes must be preserved during reconnection without data loss. Meeting rooms remain secondary to the forum. |

## 7.6 Preconditions

1. The student is authenticated with an active session.
2. The meeting-room service and real-time collaboration service are available.
3. The student is permitted to access the study-room lobby and is not blocked from room participation.
4. A room is available, or the student is permitted to create one.

## 7.7 Postconditions

1. **Success:** The student joins a room with an available seat, or creates a room and becomes its owner or manager.
2. **Success:** The student can enter the room and use supported shared study tools according to the room configuration.
3. **Success:** Room join requests are routed to an owner or manager for a private or custom room.
4. **Failure:** The student remains outside the room and receives a clear reason, such as full capacity, rejected request, or unavailable room.

## 7.8 Extension Points

| Extension Point | Location in Flow of Events |
|---|---|
| Private-room request | Basic flow step 3; alternative A1 |
| Create room | Meeting Lobby; alternative A2 |
| View room details | Before joining or requesting access; alternative A3 |
| Room capacity check | Basic flow step 4; alternative A4 and exception E3 |
| Shared study tools | Basic flow steps 6-7; alternative A5 |
| Reconnect after interruption | During a room session; alternative A6 and exception E5 |
| Join-request notification | Private-room request and decision; alternative A1 and exception E1 |
