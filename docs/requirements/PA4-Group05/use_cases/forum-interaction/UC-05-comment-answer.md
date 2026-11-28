# UC-05 — Comment and Answer

**Version:** `2.0`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-05 |
| Name | Comment and Answer |
| Primary Actor | University Student |
| Supporting Actors | Post Author; Notification Service |
| Feature Group | Forum (Primary) |
| Priority | High |
| Related User Stories | US-18 |
| Related Requirements | US-18, US-17, US-20, US-38; FR-18.1 to FR-18.6, FR-17.3, FR-20.1 to FR-20.5, FR-38.1; NFR-PERF-4, NFR-PERF-6, NFR-SEC-9 |
| Source Documents | `proposals/use_cases_model/UC-05-comment-answer.md`; `proposals/use_cases_description.md` (UC-05); `proposals/use_cases_model.md`; `proposals/use_case_diagrams.md`; `PA3-Group05/use_case.md` (section 5); `proposals/overview.md`, `functional_requirement.md`, `non_functional_requirement.md`, `userstory.md`, `feature_flow.md`, `screen_flow.md`, `API.md`, `response_code.md`, `post_management.md`, `moderation_queue.md`, `list_post.md`, `settings.md`, `friend.md`, `friend_profile.md` |

## Part A — Use Case Model

### A1. Focused Use Case Diagram

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

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | A registered undergraduate student who uses the forum, shares resources, and optionally joins study rooms; for UC-05, comments on or answers a forum post. |
| Post Author | Secondary | A student who receives notifications when comments or answers are added to their post. |
| Notification Service | Supporting System | Delivers in-app notifications for forum and room activity; for UC-05, delivers the forum notification to the post author. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-05 Comment and Answer | Primary | Comments on or answers a forum post. |
| Post Author | I-06 Send Forum Notification | Secondary | Receives notification when a comment or answer is added. |
| Notification Service | I-06 Send Forum Notification | Supporting | Delivers the forum notification to the post author. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| Post Author | University Student | Actor generalization | Inherits the general student associations, including UC-05, and adds I-06 as notification recipient. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-05 Comment and Answer | I-06 Send Forum Notification | Notify the post author about the new comment or answer. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-06 Nested Reply | UC-05 Comment and Answer | The student replies to an existing comment or answer. | Add a threaded nested response. |

### A4. Model Notes

1. Every new comment or answer includes I-06 because the post author must be notified.
2. Nested reply is an optional extension of the base comment-or-answer behavior.
3. Post Author inherits the University Student association to UC-05 and adds the secondary notification-recipient association to I-06.

## Part B — Use Case Specification

### B1. Brief Description

A student contributes to an academic discussion by commenting on a post or answering a question, so that ideas are discussed and other students receive help. The post author is notified about each new comment or answer. UC-05 covers creation, nested replies, edit/delete of own responses, answer classification for question posts, discussion display, and notification behavior in the primary University Forum feature group.

### B2. Preconditions

1. The student is authenticated with an active session.
2. The student can view the selected post.
3. The post accepts comments or answers and has not been removed or locked.
4. The student is not restricted from commenting or answering.

### B3. Postconditions

1. **Success:** The comment or answer is stored and associated with the post, its author, and its parent comment when applicable.
2. **Success:** The comment or answer is displayed in the post's discussion in chronological or threaded order.
3. **Success:** The post author receives a notification about the new comment or answer.
4. **Failure:** No comment or answer is stored, and the student receives a clear error message.

### B4. Main Success Scenario (Basic Flow)

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

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

### B5. Alternative Flows

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

### B6. Exception Flows

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

### B7. Business Rules

1. Comments are allowed on discussion posts; answers are allowed on question posts.
2. Nested replies are supported where applicable.
3. Students may edit or delete only their own comments and answers.
4. Comments and answers are displayed in chronological or threaded order.
5. The post author is notified when a new comment or answer is added.
6. Commenting and answering are subject to authentication, permission, and rate-limit checks.
7. Only one true response may be marked for a question post; that action is performed by the post author under US-20.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-4 | A new comment or answer must be reflected in the relevant forum view within 2 seconds. |
| NFR-PERF-6 | Forum notifications must be delivered with a latency of 2 seconds or less under normal operating conditions. |
| NFR-SEC-9 | Commenting and answering must be rate-limited to reduce spam and abuse. |
| Design constraint | A notification delivery failure must not roll back an already published comment or answer; the notification may be recorded or retried. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Nested reply | Basic flow step 4; alternative A1 |
| Edit or delete own response | After the response is displayed; alternatives A2-A3 |
| Answer classification | Basic flow step 5; alternative A4 |
| Empty discussion | Basic flow step 2; alternative A5 |
| Notification delivery | Basic flow step 11; exception E5 |
| Rate-limit recovery | Basic flow step 8; exception E4 |

### B10. Interface and Data Notes

- **Screen flow.** `screen_flow.md`: Home → Forum Group → University → Major → Course → Post, with Trending → Post and Create Post → Post. `feature_flow.md`: List Post → Post → Comment / Solved / Vote / Save / Report / Moderate; Post → Comment → True Response; Comment → Vote. `post_management.md` recommends the UI route `/forum/posts/:postId` and the detail components `PostDetailPage`, `CommentList`, `CommentComposer`, `TrueResponsePanel`, `PostSolvedBadge`, and `PermissionBasedActionBar`; `API.md` uses `/forum/posts/:post_id`.
- **Detail load.** `GET /forum/posts/:post_id` returns `post`, `comments`, `true_response`, `user_vote`, and `saved` with `200`; failure states are `404 POST_NOT_FOUND` (`48001`), `401`, and `500 (DATABASE_ERROR | UNKNOWN_ERROR)`. Backend function `studitopia.get_forum_post(ppost_id: uuid)` also lists `FORBIDDEN` (`48010`).
- **Composer/create.** `CommentComposer` is a textarea plus submit control for comments, answers, and replies (`FR-18.1`–`FR-18.3`, `AC-18.1`–`AC-18.3`). Creation uses `POST /forum/posts/:post_id/comments` with `{content, parent_comment_id?}`; success is `201 {comment_id, created_at}`. Errors are `400 INVALID_POST_CONTENT` (`48004`), `404 POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`), `401`, and `500`. Database function `studitopia.create_forum_comment(pauthor_id, ppost_id, pcontent, pparent_comment_id)` additionally lists `UNKNOWN_ERROR` (`45000`) and `FORBIDDEN` (`48010`).
- **Edit/delete rules.** `CommentActionMenu`, `EditCommentDialog`, and `DeleteCommentDialog` expose **Edit** and **Delete** only for the current user's own comment or answer (`FR-18.4`, `AC-18.4`, business rule 3). `post_management.md` requires backend enforcement but states that no comment edit/delete API is specified in `API.md`; no endpoint is invented here. `UC-05` A3 removes or hides the response according to platform deletion policy.
- **Notification rules.** Every new response includes I-06 Send Forum Notification (`FR-18.6`, `FR-38.1`, UC-05 step 11). `settings.md` surfaces `ForumNotificationToggles` for comments, answers, votes, true-response marks, and mentions; `AudioAlertToggle`; `NotificationCenterLink`; `MarkAllReadButton`; and `SaveNotificationSettingsButton`, with `NotificationPreference` fields `forumEvents`, `socialEvents`, `roomInvitationsEnabled`, `audioAlertsEnabled`. No notification endpoint is defined in `API.md`; `E5` records or retries delivery and must not roll back the published response.
- **True response.** `PATCH /forum/posts/:post_id/true-response` with `{comment_id: string}` returns `200 {solved: boolean}`; errors are `404 POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`), `403 NOT_POST_OWNER` (`48007`) or `FORBIDDEN` (`48010`), `401`, and `500`. Backend function `studitopia.mark_true_response(puser_id, ppost_id, pcomment_id)` lists the same codes. `PostSolvedBadge` shows `Solved` / `Unsolved`; `TrueResponsePanel` shows the accepted answer or comment prominently (`FR-20.1`–`FR-20.5`).
- **Save.** `POST /forum/posts/:post_id/save` returns `200 {saved: boolean}`; errors are `404 POST_NOT_FOUND` (`48001`), `401`, and `500`. Database function `studitopia.save_forum_post(puser_id, ppost_id)` also lists `FORBIDDEN` (`48010`). `SavePostButton` shows **Save**/**Saved** state (`FR-21.1`–`FR-21.4`).
- **Report and moderation.** `POST /forum/reports` with `{target_type: 'post' | 'comment', target_id, category, description?}` returns `201 {report_id}`; errors are `400 INVALID_REPORT_CATEGORY` (`48009`), `404 POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`), `401`, and `500`. Database function `studitopia.report_forum_content(preporter_id, ptarget_type, ptarget_id, pcategory, pdescription)` also lists `FORBIDDEN` (`48010`). Reports route to the moderation queue; duplicate-report prevention is stated in `API.md` but has no specified error code. `moderation_queue.md` has no queue/action/history endpoints and notes that moderation actions are restricted to authorized moderators/administrators (`NFR-SEC-10`).
- **Vote.** `POST /forum/votes` with `{target_type: 'post' | 'comment', target_id, vote: 1 | 0 | -1}` returns `200 {vote_score}`; errors are `400 INVALID_VOTE` (`48005`), `409 DUPLICATED_VOTE` (`48006`), `404 POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`), `401`, and `500`. Database function `studitopia.vote_forum_content(puser_id, ptarget_type, ptarget_id, pvote)` also lists `FORBIDDEN` (`48010`). One active vote per target may be changed or removed (`FR-19.1`–`FR-19.5`, `AC-19.3`, `AC-19.4`).
- **Other forum codes.** `response_code.md` defines `48000 UNKNOWN FORUM ERROR`, `48003 INVALID_POST_TYPE`, `48008 ALREADY_TRUE_RESPONSE`, and `48010 FORBIDDEN`. `48008` is defined but is not listed in the `PATCH /forum/posts/:post_id/true-response` response contract.
- **Privacy and permission rules.** `NFR-SEC-1` requires authentication for protected resources; `NFR-SEC-4` restricts private forum content to authorized users; `NFR-SEC-6` requires server-side authorization. `NFR-PRIV-7` applies privacy settings consistently to forum posts, comments, member lists, and search results. `FR-17.4`/`AC-17.4` display only permitted actions, and `FR-39.5` requires backend prevention of disallowed interactions. `NFR-SEC-9` rate-limits commenting; `NFR-USE-6` places report/moderation actions within at most 2 interactions from a post or comment. `friend.md` and `friend_profile.md` show friend posts/comments only under privacy rules and do not define a comment API.

### B11. Source Alignment Notes

- The focused model file and `use_case_diagrams.md` contain identical UC-05 diagram code; the model index calls the Post Author link "actor inheritance" while the focused model labels it "generalization". This export uses the focused model's terminology.
- `use_cases_description.md` and `PA3-Group05/use_case.md` agree on UC-05's goal, 12-step basic flow, A1–A5, E1–E6, business rules, related requirements, special requirements, and extension points.
- `API.md` exposes one comment-creation endpoint for comments, answers, and nested replies (`parent_comment_id?`) but no answer-specific endpoint, no comment edit/delete endpoint, and no notification endpoint; edit/delete remains an `FR-18.4` UI requirement with unspecified backend contract.
- `UC-05` states that answers are classified separately from comments, and `FR-18.2` requires answer creation, but `API.md` does not define a separate answer type or field for that classification.
- `FR-18.6`/UC-05 state that the post author is notified when a new response is added, while `FR-38.5` allows users to configure which forum events trigger alerts; no source specifies how mandatory notification behavior interacts with user opt-outs.
- `ALREADY_TRUE_RESPONSE` (`48008`) exists in `response_code.md`, but `PATCH /forum/posts/:post_id/true-response` lists only `NOT_POST_OWNER` (`48007`) and `FORBIDDEN` (`48010`) under `403`; the one-true-response rule comes from business rule 7 and `FR-20.1`/`FR-20.4`.
- `screen_flow.md` and `feature_flow.md` define navigation but not exact routes; `post_management.md` marks `/forum/posts/:postId` as recommended, while `API.md` uses `/forum/posts/:post_id`.
- `E5` and the PA3 design constraint specify that notification failure must not roll back a published response, but the `500` response contract does not describe partial notification state.
- `friend.md` and `friend_profile.md` explicitly state that there is no friend/profile API contract; they contribute only privacy-scoped visibility of friend posts/comments (`NFR-PRIV-7`), not additional forum endpoints.
