# Use Cases Description

> This document describes the seven most significant use cases of Studitopia for PA3. The selection follows the PA3 priority order: authentication, university forum and posts, learning resource library, then optional meeting rooms. The university forum remains the primary product focus, and meeting rooms remain a supporting feature.

## 1. Document Information

| Field | Value |
| --- | --- |
| Project | Studitopia |
| Group | Group 5 - Alien Force |
| Document | PA3 Use Cases Description |
| Version | 1.0 |
| Date | 14/Nov/2026 |
| Related documents | `overview.md`, `userstory.md`, `functional_requirement.md`, `non_functional_requirement.md`, `feature_flow.md`, `screen_flow.md` |

### Revision History

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 14/Nov/2026 | 1.0 | Selected and described the seven most significant PA3 use cases | Nguyen Le Quoc Huy |

## 2. Selection Rationale

| Rank | Use Case | Feature Group | Related User Stories | Priority | Rationale |
| ---: | --- | --- | --- | --- | --- |
| 1 | UC-01 Register Account and Verify University Email | Authentication | US-01, US-07 | High | Registration creates the verified university identity required for every protected feature. |
| 2 | UC-02 Log In | Authentication | US-02 | High | Login restores access to the user's profile, forum, posts, and learning activities. |
| 3 | UC-03 Browse and Search the University Forum | Forum (Primary) | US-11, US-12, US-13, US-17, US-23 | High | Forum discovery is the primary way students find academic discussions, materials, and answers. |
| 4 | UC-04 Create Discussion Post | Forum (Primary) | US-14 | High | Post creation is the main contribution path that keeps the university forum active. |
| 5 | UC-05 Comment and Answer | Forum (Primary) | US-18 | High | Comments and answers provide the peer assistance and discussion that make the forum useful. |
| 6 | UC-06 Share Learning Resource | Learning Resource Library | US-27 | High | Resource sharing supplies the searchable library and supports reuse of academic materials. |
| 7 | UC-07 Join or Create a Study Room | Meeting Rooms (Secondary) | US-35 | Medium | Live study collaboration is retained as an optional supporting capability for study groups. |

## 3. Actors

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | A registered undergraduate student who uses the forum, shares resources, and optionally joins study rooms. |
| New University Student | Primary | A prospective user who creates an account and verifies a university email address. |
| Registered University Student | Primary | A student with an existing account who logs in to access protected features. |
| Post Author | Secondary | A student who receives notifications when comments or answers are added to their post. |
| Room Owner or Manager | Secondary | A student who creates or manages a study room and can accept or reject private-room join requests. |
| Email Delivery Service | Supporting System | Delivers time-limited OTP codes for account verification. |
| Google OAuth 2.0 | Supporting System | Provides an optional external authentication and registration path. |
| Notification Service | Supporting System | Delivers in-app notifications for forum and room activity. |

## 4. Use Case Summary

| Use Case | Primary Actor | Trigger | Successful Outcome |
| --- | --- | --- | --- |
| UC-01 Register Account and Verify University Email | New University Student | User selects **Register** or **Continue with Google** | A verified student account is created and the user continues to preference setup. |
| UC-02 Log In | Registered University Student | User submits login credentials or selects Google login | An authenticated session is created and the user reaches the Home or intended protected page. |
| UC-03 Browse and Search the University Forum | University Student | User opens **Forum** or submits a forum search | Relevant forum posts and post details are displayed, or a clear empty state is shown. |
| UC-04 Create Discussion Post | University Student | User selects **Create Post** and chooses **Discussion Post** | A validated discussion post is published in the selected forum context. |
| UC-05 Comment and Answer | University Student | User submits a comment or answer from a post detail page | The comment or answer is stored, displayed in the thread, and the post author is notified. |
| UC-06 Share Learning Resource | University Student | User selects **Share Resource** from the library | A validated learning resource is published, searchable, and accessible according to privacy settings. |
| UC-07 Join or Create a Study Room | University Student | User opens **Meeting Lobby** and selects a room or **Create Room** | The student joins or creates a room and can enter the optional collaboration space. |

---

## 5. Detailed Use Cases

### UC-01 Register Account and Verify University Email

| Field | Value |
| --- | --- |
| Use Case ID | UC-01 |
| Name | Register Account and Verify University Email |
| Primary Actor | New University Student |
| Supporting Actors | Email Delivery Service; Google OAuth 2.0 |
| Feature Group | Authentication |
| Related User Stories | US-01 (US-01.1 to US-01.6), US-07 |
| Priority | High |

**Goal.** A new university student creates a verified account and gains access to the platform's protected features.

**Preconditions.**

1. The user does not have an active authenticated session.
2. The supported university and faculty email-domain catalog is available for university-email registration.
3. The email delivery service is available for the standard registration path.
4. Google OAuth 2.0 is configured for the optional Google registration path.

**Postconditions.**

1. **Success:** A user record exists with a unique username and email address, and the account is activated and email-verified.
2. **Success:** The user's password is stored only as a secure one-way hash; Google registration associates the authenticated Google identity with the account.
3. **Success:** The user is authorized to continue to Preference Settings and then the Home page.
4. **Failure:** No active account is created, and the user receives an error message that allows correction and retry.
5. **Failure:** An unverified account, if created, cannot access protected application features.

**Main Success Scenario.**

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

**Alternative Flows.**

- **A1. Google registration.** At step 2, the user selects **Continue with Google**. The system initiates Google OAuth, validates the authentication response, and creates or associates an account when registration requirements are satisfied. The user then continues to the appropriate next screen, normally Preference Settings.
- **A2. Invalid client-side input.** At step 4 or 5, validation fails. The system displays field-level errors, keeps the entered values where appropriate, and does not submit the request until the errors are corrected.
- **A3. Duplicate email or username.** At step 7, the backend reports that the email or username is already registered. The system displays a clear error and offers navigation to Login or Password Recovery.
- **A4. CAPTCHA verification failure.** At step 7, CAPTCHA verification fails. The system rejects the request, shows an error, and allows the user to retry.
- **A5. Resend OTP.** At step 10, the user requests a new OTP. The system generates a new 6-digit OTP, invalidates the previous OTP, sends the new code, and restarts the 5-minute expiry period.
- **A6. User cancels registration.** The user leaves the registration flow before activation. No active account is available, and the pending verification data remains subject to the system's expiry and cleanup policy.

**Exception Flows.**

- **E1. OTP invalid, expired, or already used.** The system rejects the OTP, displays an appropriate message, and keeps the account unverified. The user may request a new OTP.
- **E2. OTP email delivery failure.** The account remains unverified and protected features remain unavailable. The system informs the user and allows another OTP request when permitted.
- **E3. Google authentication fails or is cancelled.** No account is created or changed by the failed attempt. The system displays an error and allows the user to retry or use manual registration.
- **E4. Database failure during account creation.** The registration transaction is rolled back, a generic error is shown, and the user can retry without creating a partial or duplicate account.
- **E5. Unverified account attempts protected access.** The backend denies access to protected features until email verification succeeds.

**Business Rules.**

1. Display Name, Username, Email, Password, and Confirm Password are required.
2. A username must be unique and contain only alphanumeric characters.
3. An email address must be unique and valid; university-email registration requires a supported university or faculty domain.
4. A password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character.
5. Passwords and Confirm Password fields are hidden by default and support a visibility toggle.
6. The OTP is a 6-digit numeric code, expires after 5 minutes, is single-use, and is invalidated when a new OTP is generated.
7. An account cannot access protected application features before successful email verification.
8. The password is persisted only as a secure one-way hash.

**Related Requirements.** US-01, US-07; FR-01.1 to FR-01.45, FR-07.1 to FR-07.6; NFR-SEC-2, NFR-SEC-3, NFR-SEC-8, NFR-USE-1.

---

### UC-02 Log In

| Field | Value |
| --- | --- |
| Use Case ID | UC-02 |
| Name | Log In |
| Primary Actor | Registered University Student |
| Supporting Actors | Google OAuth 2.0 |
| Feature Group | Authentication |
| Related User Stories | US-02 |
| Priority | High |

**Goal.** A registered student authenticates and regains access to their profile, university forum, posts, and learning activities.

**Preconditions.**

1. The student has a registered and activated account.
2. The student is not already authenticated, or chooses to start a new authenticated session.
3. The authentication service and, when used, Google OAuth 2.0 are available.

**Postconditions.**

1. **Success:** A valid authenticated session is created and the student reaches the Home page or the originally requested protected page.
2. **Success:** The student's default university forum context is available after login.
3. **Failure:** No authenticated session is created, and the student remains on the login page with a non-disclosing error message.

**Main Success Scenario.**

1. The student opens the login page.
2. The system displays the username-or-email field, password field, CAPTCHA, **Remember Me** option where supported, **Forget Password**, **Register**, and **Continue with Google** options.
3. The student enters a registered username or university email address and password, then completes the CAPTCHA.
4. The frontend performs basic input validation and submits the login request.
5. The backend verifies the CAPTCHA, credentials, account activation status, and any account restrictions.
6. The backend creates an authenticated session and returns the access result.
7. The frontend stores the session according to the **Remember Me** choice, loads the student's profile and forum context, and redirects to Home or the intended protected page.
8. The system displays the Home page with the Forum entry and the student's university forum as the default context.

**Alternative Flows.**

- **A1. Google login.** At step 2, the student selects **Continue with Google**. The system completes Google OAuth, validates the response, and either creates the authenticated session or displays an appropriate error.
- **A2. Remember Me selected.** At step 7, the system maintains the session across browser restarts according to the selected option and the platform session policy.
- **A3. Intended page available.** If the student was redirected from a protected page, the system returns the student to that page after successful authentication instead of Home.
- **A4. Unverified account.** If the backend finds that the account is not verified, login is denied and the student is directed to complete OTP verification.

**Exception Flows.**

- **E1. Invalid credentials.** The system displays a clear error without revealing whether the username, email, or password was incorrect.
- **E2. CAPTCHA failure.** The system rejects the request, displays an error, and allows the student to retry.
- **E3. Unavailable or restricted account.** The system denies authentication and displays an appropriate message without exposing sensitive account details.
- **E4. Authentication service failure.** No session is created. The system displays a temporary error and allows the student to retry.
- **E5. Session expires while accessing a protected page.** The system denies access, informs the student that the session expired, and requires login again.

**Business Rules.**

1. Login is accepted with either a registered username or a registered university email address.
2. Invalid-credential messages must not reveal which credential field was incorrect.
3. CAPTCHA must be successfully verified before login processing.
4. Google login is an optional authentication path for registered users.
5. Protected pages and APIs require a valid authenticated session.
6. After successful login, the student's profile, forum, posts, and learning activities are accessible according to their permissions.
7. The session is subject to the platform's inactivity-expiry policy.

**Related Requirements.** US-02, US-04; FR-02.1 to FR-02.5, FR-04.1 to FR-04.4; NFR-SEC-1, NFR-SEC-3, NFR-SEC-6, NFR-SEC-7, NFR-SEC-8.

---

### UC-03 Browse and Search the University Forum

| Field | Value |
| --- | --- |
| Use Case ID | UC-03 |
| Name | Browse and Search the University Forum |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum (Primary) |
| Related User Stories | US-11, US-12, US-13, US-17, US-23 |
| Priority | High |

**Goal.** A student discovers relevant university, major, and course discussions, searches for academic content, and opens a post to read its full details.

**Preconditions.**

1. The student is authenticated with an active session.
2. University, major, course, and forum data are available.
3. The student has permission to view the selected forum content.

**Postconditions.**

1. **Success:** The selected forum level and a relevant post list are displayed.
2. **Success:** Search and filters return ranked results, or a clear empty state is shown when nothing matches.
3. **Success:** The student can open a post and read its full content, metadata, discussion, attachments, and permitted actions.
4. **Failure:** The system displays an error or permission message without exposing restricted content.

**Main Success Scenario.**

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

**Alternative Flows.**

- **A1. Browse another university.** At step 3, the student selects another university forum when permitted. The system applies that university as the active browsing context and shows only content relevant to that context.
- **A2. Change forum context.** The student switches directly between university, major, and course levels. The system updates the post list to match the selected level.
- **A3. No posts match.** At step 9 or 10, no posts match the filters or search query. The system displays an empty state and offers to clear filters or change the search terms.
- **A4. Search without a keyword.** The student applies only filters. The system returns results based on the selected forum context and filters.
- **A5. Return to a previous context.** The student navigates back; the system restores the previous forum level and result state where supported.

**Exception Flows.**

- **E1. Forum content cannot be loaded.** The system displays an error state and a retry option without showing partial or stale restricted content.
- **E2. Selected post is unavailable or deleted.** The system informs the student that the post is no longer available and returns them to the post list.
- **E3. Access is not permitted.** The system denies access to private or restricted content and explains that the student lacks permission.
- **E4. Invalid search or filter combination.** The system displays validation feedback and preserves the usable parts of the query.

**Business Rules.**

1. Forum content is organized by University, then Major, then Course.
2. After login, the student's own university is the default forum context.
3. Each forum level must display only posts and materials relevant to that level.
4. Post summaries must include title, author, post type, timestamp, vote score, comment count, and solved status.
5. Search supports tags, title, content, author, university, major, and course.
6. Search results are ranked by relevance and engagement and can be filtered by post type, solved status, and time range.
7. Post detail must show the full content, metadata, discussion, marked true response, attachments, and functional tools when present.
8. Available post actions are determined by the student's permissions.
9. Privacy and forum-access rules apply consistently to post lists, post details, and search results.

**Related Requirements.** US-11, US-12, US-13, US-17, US-23; FR-11.1 to FR-11.4, FR-12.1 to FR-12.6, FR-13.1 to FR-13.5, FR-17.1 to FR-17.5, FR-23.1 to FR-23.5; NFR-PERF-2, NFR-PERF-3, NFR-PERF-5, NFR-SEC-4, NFR-SEC-6, NFR-PRIV-7, NFR-USE-3.

---

### UC-04 Create Discussion Post

| Field | Value |
| --- | --- |
| Use Case ID | UC-04 |
| Name | Create Discussion Post |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum (Primary) |
| Related User Stories | US-14 |
| Priority | High |

**Goal.** A student publishes an academic question or general discussion in the selected university, major, and course forum.

**Preconditions.**

1. The student is authenticated with an active session.
2. The student has selected a valid university, major, and course forum context.
3. The student is permitted to create posts in that forum.

**Postconditions.**

1. **Success:** A validated discussion post is stored with its author, content, post type, tags, and forum context.
2. **Success:** The post appears in the corresponding forum post list and can be opened in post detail.
3. **Failure:** No post is published, and the student receives a clear validation or system error with the opportunity to correct the content.

**Main Success Scenario.**

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

**Alternative Flows.**

- **A1. General discussion.** At step 5, the student selects **General Discussion** instead of **Question**. The publication flow is unchanged, but the post is not treated as a question awaiting a true response.
- **A2. Question post.** At step 5, the student selects **Question**. The post becomes eligible for answers and true-response marking after publication.
- **A3. Add or remove optional content.** At step 4, the student adds or removes LaTeX, images, or tags. The editor updates the preview and validation state before submission.
- **A4. Cancel creation.** The student leaves the editor before submitting. No published post is created; any retained draft behavior is subject to the platform's buffering policy.

**Exception Flows.**

- **E1. Missing or invalid content.** The system highlights the invalid fields, keeps the editor open, and does not submit until corrected.
- **E2. Unsupported or oversized image.** The system rejects the image, identifies the constraint, and allows the student to choose another file.
- **E3. Forum access lost.** If the forum context is no longer valid or the student lacks posting permission, the system rejects publication and explains the reason.
- **E4. Rate limit reached.** The system rejects the submission and informs the student to retry later.
- **E5. Server or database failure.** No post is published. The system displays a retry option and preserves the student's entered content where supported.

**Business Rules.**

1. A discussion post must be associated with the selected university, major, and course.
2. A discussion post supports a title, text content, LaTeX, images, and tags.
3. The author must choose whether the post is a question or a general discussion.
4. Content must pass frontend and backend validation before publication.
5. A published post must appear in the corresponding forum post list.
6. Only authenticated and authorized students may create posts in a forum.
7. Post publication is subject to rate limiting to reduce spam and abuse.

**Related Requirements.** US-14, US-17, US-19, US-20; FR-14.1 to FR-14.6, FR-17.1 to FR-17.5, FR-19.1 to FR-19.5, FR-20.1 to FR-20.5; NFR-PERF-4, NFR-SEC-8, NFR-SEC-9.

---

### UC-05 Comment and Answer

| Field | Value |
| --- | --- |
| Use Case ID | UC-05 |
| Name | Comment and Answer |
| Primary Actor | University Student |
| Supporting Actors | Post Author; Notification Service |
| Feature Group | Forum (Primary) |
| Related User Stories | US-18 |
| Priority | High |

**Goal.** A student contributes to an academic discussion by commenting on a post or answering a question, so that ideas are discussed and other students receive help.

**Preconditions.**

1. The student is authenticated with an active session.
2. The student can view the selected post.
3. The post accepts comments or answers and has not been removed or locked.
4. The student is not restricted from commenting or answering.

**Postconditions.**

1. **Success:** The comment or answer is stored and associated with the post, its author, and its parent comment when applicable.
2. **Success:** The comment or answer is displayed in the post's discussion in chronological or threaded order.
3. **Success:** The post author receives a notification about the new comment or answer.
4. **Failure:** No comment or answer is stored, and the student receives a clear error message.

**Main Success Scenario.**

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

**Alternative Flows.**

- **A1. Nested reply.** At step 4, the student replies to an existing comment or answer. The system stores the response with its parent and displays it in the threaded structure where applicable.
- **A2. Edit own response.** The student selects **Edit** on their own comment or answer, changes the content, and submits. The system validates and updates the existing response.
- **A3. Delete own response.** The student selects **Delete** on their own comment or answer and confirms. The system removes or hides the response according to the platform's deletion policy and updates the thread.
- **A4. Answer a question.** At step 5, the system classifies the response as an answer to the question post, making it eligible for true-response marking by the post author.
- **A5. No existing discussion.** At step 2, the system shows an empty discussion state and still presents the composer.

**Exception Flows.**

- **E1. Empty or invalid response.** The system keeps the composer open, shows validation feedback, and does not submit.
- **E2. Post removed, locked, or inaccessible.** The system rejects the response and explains that the post is no longer available for discussion.
- **E3. Posting restriction.** A restricted or unauthorized student is denied commenting or answering.
- **E4. Rate limit reached.** The system rejects the response and asks the student to retry later.
- **E5. Notification delivery failure.** The comment or answer remains published; the system records or retries the notification according to the notification policy.
- **E6. Server or database failure.** No response is stored, and the student receives a retry option with the entered content preserved where supported.

**Business Rules.**

1. Comments are allowed on discussion posts; answers are allowed on question posts.
2. Nested replies are supported where applicable.
3. Students may edit or delete only their own comments and answers.
4. Comments and answers are displayed in chronological or threaded order.
5. The post author is notified when a new comment or answer is added.
6. Commenting and answering are subject to authentication, permission, and rate-limit checks.
7. Only one true response may be marked for a question post; that action is performed by the post author under US-20.

**Related Requirements.** US-18, US-17, US-20, US-38; FR-18.1 to FR-18.6, FR-17.3, FR-20.1 to FR-20.5, FR-38.1; NFR-PERF-4, NFR-PERF-6, NFR-SEC-9.

---

### UC-06 Share Learning Resource

| Field | Value |
| --- | --- |
| Use Case ID | UC-06 |
| Name | Share Learning Resource |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Learning Resource Library |
| Related User Stories | US-27 |
| Priority | High |

**Goal.** A student publishes a learning resource so that other students can discover and access useful academic material.

**Preconditions.**

1. The student is authenticated with an active session.
2. The student is permitted to publish resources to the library.
3. The file storage service and configured file-validation checks are available.

**Postconditions.**

1. **Success:** A validated resource is stored with its owner, metadata, file, subject tags, and course tags.
2. **Success:** The resource is searchable in the library after publication.
3. **Success:** Other users can view and access the resource according to its privacy settings.
4. **Failure:** No resource is published, and the student receives a clear validation or system error.

**Main Success Scenario.**

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

**Alternative Flows.**

- **A1. Add or change tags.** At step 3, the student adds or removes subject or course tags. The system updates the searchable metadata before publication.
- **A2. Replace the file before submission.** The student selects a different file. The system revalidates file type and size and replaces the pending upload.
- **A3. Privacy-restricted resource.** At step 8, the resource is published with restricted access. It becomes searchable according to the privacy rule but only authorized users can access the file.
- **A4. Cancel publication.** The student leaves the form before submitting. No published resource is created.
- **A5. View own published resources.** After publication, the student opens the storage view to see the resource status, publication date, and access statistics.

**Exception Flows.**

- **E1. Missing or invalid metadata.** The system highlights the invalid fields, keeps the form open, and does not publish.
- **E2. Unsupported file type or oversized file.** The system rejects the file, identifies the violated constraint, and allows the student to choose another file.
- **E3. File-safety check fails.** The system blocks publication and informs the student that the file cannot be accepted.
- **E4. Storage or database failure.** No published resource is created. The system displays a retry option and avoids leaving an orphaned or partially published resource.
- **E5. Publication permission lost.** The system rejects the publication and explains that the student is no longer authorized.
- **E6. Resource becomes unavailable after publication.** The system prevents further access and removes the resource from search and library listings when required.

**Business Rules.**

1. A resource must include a title and the metadata required for publication.
2. A resource can include a description, subject tags, and course tags.
3. Uploaded files must pass file type and size validation before acceptance.
4. A published resource must be searchable in the library.
5. Access to a published resource must follow the owner's privacy settings.
6. A deleted resource must be removed from search and library listings and must no longer be accessible to other users.
7. Publication is restricted to authenticated and authorized students.

**Related Requirements.** US-27, US-25, US-28, US-29; FR-27.1 to FR-27.5, FR-25.1 to FR-25.5, FR-28.1 to FR-28.3, FR-29.1 to FR-29.4; NFR-SEC-5, NFR-PRIV-5, NFR-SCAL-4.

---

### UC-07 Join or Create a Study Room

| Field | Value |
| --- | --- |
| Use Case ID | UC-07 |
| Name | Join or Create a Study Room |
| Primary Actor | University Student |
| Supporting Actors | Room Owner or Manager; Notification Service |
| Feature Group | Meeting Rooms (Secondary) |
| Related User Stories | US-35, US-34 |
| Priority | Medium (Supporting) |

**Goal.** A student enters an optional live study space by joining a public room, requesting access to a private room, or creating a new room for a study group.

**Preconditions.**

1. The student is authenticated with an active session.
2. The meeting-room service and real-time collaboration service are available.
3. The student is permitted to access the study-room lobby and is not blocked from room participation.
4. A room is available, or the student is permitted to create one.

**Postconditions.**

1. **Success:** The student joins a room with an available seat, or creates a room and becomes its owner or manager.
2. **Success:** The student can enter the room and use supported shared study tools according to the room configuration.
3. **Success:** Room join requests are routed to an owner or manager for a private or custom room.
4. **Failure:** The student remains outside the room and receives a clear reason, such as full capacity, rejected request, or unavailable room.

**Main Success Scenario — Join a Public Room.**

1. The student opens the Meeting Lobby.
2. The system displays available public study rooms with availability and capacity information.
3. The student selects a public room.
4. The backend verifies that the room still exists, is public, and has an available seat.
5. The backend adds the student to the room's participant list and establishes the room session.
6. The system opens the room and displays the supported shared study tools.
7. The student collaborates in the room using the available tools.

**Alternative Flows.**

- **A1. Request a private room.** At step 3, the student selects a private or custom room. The system creates a join request and notifies the room owner or manager. If accepted, the student joins the room; if rejected, the student is notified and remains in the lobby.
- **A2. Create a room.** The student selects **Create Room**, enters a name, description, privacy level, supported tools, capacity, duration, and communication rules, and submits. The backend validates the configuration, creates the room, assigns the student as owner or manager, and opens the room.
- **A3. View room details before joining.** The student opens the room detail page to review capacity, description, and configuration before joining or requesting access.
- **A4. Room becomes full.** At step 4, the room has no available seat. The system prevents the join, explains that the room is full, and returns the student to the lobby.
- **A5. Use shared tools.** After entering the room, the student uses the shared whiteboard, shared notes, or shared timer. Updates are synchronized for all participants.
- **A6. Reconnect after interruption.** If the room connection is interrupted, the system attempts to restore the session and preserve shared notes without data loss.

**Exception Flows.**

- **E1. Private request rejected.** The owner or manager rejects the request. The student receives a notification and cannot enter the room.
- **E2. Room no longer exists or is closed.** The system informs the student and refreshes the lobby.
- **E3. Capacity race condition.** Another student takes the last seat before the join completes. The system rejects the join and shows that the room is full.
- **E4. Invalid room configuration.** When creating or configuring a room, the system highlights invalid values such as unsupported capacity or duration and does not create the room.
- **E5. Real-time service failure.** The student cannot enter or remain in the live room. The system reports the failure and preserves shared notes where possible.
- **E6. Unauthorized or blocked participant.** The backend denies room entry and explains the access restriction.

**Business Rules.**

1. Meeting rooms are optional supporting features; they do not replace the forum as the primary collaboration space.
2. A public room can be joined when it has available capacity.
3. A private or custom room requires a join request that the owner or manager can accept or reject.
4. A room creator becomes the room owner or manager.
5. Room managers can configure capacity, duration, communication rules, privacy level, and supported tools.
6. Shared tool updates must be synchronized for all room participants.
7. Shared notes must be preserved during the room session and handle reconnection without data loss.
8. Room participation and invitations must respect the user's communication and privacy settings.

**Related Requirements.** US-34, US-35, US-36, US-38, US-39; FR-34.1 to FR-34.4, FR-35.1 to FR-35.6, FR-36.1 to FR-36.6, FR-38.3, FR-39.3; NFR-PERF-7, NFR-SCAL-6, NFR-PRIV-6.
