# UC-34 — Report Inappropriate Behavior

**Version:** `1.0`

**Performed by:** [Tran Canh Anh Tuan] | **Edited by:** [Tran Canh Anh Tuan]

| Field | Value |
| --- | --- |
| Use Case ID | UC-34 |
| Name | Report Inappropriate Behavior |
| Primary Actor | User |
| Supporting Actors | Moderator |
| Feature Group | Notifications and Safety |
| Priority | Not explicitly stated |
| Related User Stories | US-40 |
| Related Requirements | AC-40.1, AC-40.2, AC-40.3, AC-40.4; FR-40.1, FR-40.2, FR-40.3, FR-40.4, FR-40.5; NFR-SEC-1, NFR-SEC-3, NFR-SEC-6, NFR-SEC-9, NFR-SEC-10, NFR-USE-6, NFR-PRIV-7 |
| Source Documents | `proposals/userstory.md` (sections 11.2-11.3); `proposals/functional_requirement.md` (US-40); `proposals/settings.md`; `proposals/friend.md`; `proposals/friend_profile.md`; `proposals/group_detail.md`; `proposals/moderation_queue.md`; `proposals/non_functional_requirement.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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

    User@{ shape: person, label: "User" }
    Moderator@{ shape: person, label: "Moderator" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC34(["UC-34<br/>Report Inappropriate Behavior"])
    end

    User --- UC34
    Moderator --- UC34

    class User,Moderator actor
    class UC34 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| User | Primary | A registered user who reports inappropriate communication or behavior from profiles, posts, comments, messages, or other users (US-40). |
| Moderator | Secondary | An authorized reviewer who can review and act on reports according to platform policy (`AC-40.4`, `NFR-SEC-10`). |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| User | UC-34 Report Inappropriate Behavior | Primary | Submits a report with category, description, and contextual information. |
| Moderator | UC-34 Report Inappropriate Behavior | Secondary | Reviews routed reports and may act according to platform policy. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | The proposals do not name an actor generalization or use-case specialization for US-40. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | The proposals do not name a distinct included use case for US-40. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | The proposals do not name a distinct extending use case for US-40. |

### A4. Model Notes

1. UC-34 is derived solely from US-40; no I-xx, E-xx, or G-xx identifier is introduced.
2. The User actor is taken directly from the US-40 story wording "As a user".
3. Moderator is included because `AC-40.4` explicitly names moderators as reviewers; no separate moderation UC ID is named in the proposals.
4. The moderation queue is a UI surface in `moderation_queue.md`, not an external system actor, so it is not drawn as a cloud.

## Part B — Use Case Specification

### B1. Brief Description

The user reports inappropriate communication or behavior so that the platform can maintain a safe and supportive learning environment. US-40 requires reporting from profiles, posts, comments, messages, and other users, categories such as harassment, spam, and inappropriate content, contextual capture, moderation-queue routing, and moderator review under platform policy. The reporter receives confirmation of submission only; no review outcome is promised.

### B2. Preconditions

1. The user is authenticated with an active session (`NFR-SEC-1`).
2. The report surface is visible to the user and the target is accessible under privacy and authorization rules.
3. A report action is reachable within at most 2 interactions from a post or comment where applicable (`NFR-USE-6`).
4. The user can select a supported category and provide optional context.

### B3. Postconditions

1. **Success:** The report captures contextual information and is routed to the moderation queue (`FR-40.3`, `FR-40.4`, `AC-40.3`).
2. **Success:** The reporting user sees confirmation that the report was submitted, without a promised moderator outcome.
3. **Success:** An authorized moderator can review the report according to platform policy (`AC-40.4`).
4. **Failure:** No report is recorded, and the user receives an appropriate error message.

### B4. Main Success Scenario (Basic Flow)

1. The user opens a surface that supports reporting, such as a forum post, comment, profile, message, group chat, or another user.
2. The system displays a report action according to the user's permissions.
3. The user selects **Report**, **Report message**, or **Report inappropriate behavior** as offered on that surface.
4. The system opens `ReportBehaviorDialog` or `ReportContentDialog` with a read-only context summary of the target.
5. The user selects one category from **Spam**, **harassment**, **inappropriate content**, or **academic dishonesty** as listed by `ReportCategorySelect` in `moderation_queue.md`.
6. The user optionally enters a description and submits the report.
7. For a post or comment, the frontend sends `POST /forum/reports` with `target_type`, `target_id`, `category`, and optional `description`.
8. The backend verifies authentication, target context, category validity, duplicate-report prevention, and reporting rate limits.
9. The backend records the report, returns `report_id`, routes it to the moderation queue, shows `ReportSubmittedNotice` with "Report submitted for review.", and does not state a moderator action.
10. A moderator reviews the report context in the moderation queue and may act according to platform policy.

### B5. Alternative Flows

#### A1. Report a forum post or comment

The user selects `ReportPostButton` on a post or comment. `ReportContentDialog` collects `target_type: 'post' | 'comment'`, `target_id`, `category`, and optional `description`; this is the only target shape supported by `POST /forum/reports`.

#### A2. Report a profile, message, or other user

The user selects `ReportBehaviorButton` from a friend profile, conversation, or member menu. `ReportBehaviorDialog` captures category, description, and profile or message context; no API endpoint is defined for these targets.

#### A3. Report group chat or member behavior

The user selects `GroupMessageReportButton`, labelled **Report message**, from group chat or `ReportBehaviorButton` from the member list. `group_detail.md` routes the report to moderation and shows `ReportSubmittedNotice` for submission only.

### B6. Exception Flows

#### E1. Invalid category

`POST /forum/reports` returns `400` with `INVALID_REPORT_CATEGORY` (`48009`). The system keeps the dialog open and asks the user to choose a valid category.

#### E2. Target not found

`POST /forum/reports` returns `404` with `POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`). The system explains that the reported content is no longer available.

#### E3. Unauthenticated report attempt

The system returns `401` or redirects the user to Login (`NFR-SEC-1`) and does not submit the report.

#### E4. Duplicate report or rate limit

The backend rejects the report under duplicate-report prevention or `NFR-SEC-9`. No duplicate-report error code is specified, so the UI shows generic retry-later feedback and does not claim a specific code.

#### E5. Server or database failure

`POST /forum/reports` returns `500` with `DATABASE_ERROR` or `UNKNOWN_ERROR`. The database function also lists `UNKNOWN_ERROR` (`45000`) and `FORBIDDEN` (`48010`); no report is confirmed as submitted.

### B7. Business Rules

1. The system shall allow a user to report inappropriate communication or behavior (`FR-40.1`, `AC-40.1`).
2. Reporting is available from forum posts, comments, profiles, and messages (`FR-40.2`); `AC-40.1` also names other users.
3. Reports support categories such as harassment, spam, and inappropriate content (`AC-40.2`); `moderation_queue.md` lists **Spam**, **harassment**, **inappropriate content**, and **academic dishonesty**.
4. The system shall capture contextual information and route reports to the moderation queue (`FR-40.3`, `FR-40.4`, `AC-40.3`).
5. Moderators can review and act on reports according to platform policy (`AC-40.4`), and reporting supports a safe and supportive university learning environment (`FR-40.5`).
6. Reporting actions are subject to authentication, server-side authorization, and rate limits (`NFR-SEC-1`, `NFR-SEC-6`, `NFR-SEC-9`, `NFR-SEC-10`).
7. Report submission feedback must not promise a moderator outcome, and privacy settings apply consistently to report context (`NFR-PRIV-7`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-1, NFR-SEC-3 | Authentication is required before protected report surfaces are accessible; sensitive communication is encrypted using TLS 1.2 or higher. |
| NFR-SEC-6 | Unauthorized access is prevented through server-side authorization checks. |
| NFR-SEC-9 | Reporting and related actions are rate-limited to reduce spam and abuse. |
| NFR-SEC-10 | Moderation actions are restricted to authorized moderators and administrators. |
| NFR-USE-6, NFR-PRIV-7 | Reporting actions are reachable within at most 2 interactions from a post or comment, and privacy settings apply consistently to forum posts, comments, member lists, and search results. |
| Design constraint | Report UI confirms submission only and must not state or imply a moderator decision. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Forum post or comment entry | Basic flow steps 1-7; alternative A1 |
| Profile, message, or user entry | Basic flow steps 1-6; alternative A2 |
| Group chat or member entry | Basic flow steps 1-6; alternative A3 |
| Category and target validation | Basic flow steps 5 and 7; exceptions E1 and E2 |

### B10. Interface and Data Notes

- **Screen, flow, and entry points.** `screen_flow.md` places report-capable content under Home → Forum Group and Home → Friend Group; `feature_flow.md` gives `Post -> Report / Moderate`; `userstory.md` section 11 places Notification Center activity beside forum and social activity. `settings.md` defines `ReportBehaviorLink` with label **Report inappropriate behavior**; `friend.md` and `friend_profile.md` define `ReportBehaviorButton` with label **Report**; `group_detail.md` defines `GroupMessageReportButton` with label **Report message** and `ReportBehaviorDialog`.
- **Exact categories.** `moderation_queue.md` `ReportCategorySelect` lists **Spam**, **harassment**, **inappropriate content**, and **academic dishonesty**. `AC-40.2` names harassment, spam, and inappropriate content; `FR-22.2`/`AC-22.1` also name academic dishonesty.
- **Report API.** `POST /forum/reports` body is `{target_type: 'post' | 'comment', target_id: string, category: string, description?: string}`; success is `201 {report_id}`. Errors are `400 INVALID_REPORT_CATEGORY` (`48009`), `404 POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`), `401`, and `500 (DATABASE_ERROR | UNKNOWN_ERROR)`.
- **Database contract and data fields.** `studitopia.report_forum_content(preporter_id, ptarget_type, ptarget_id, pcategory, pdescription)` returns `{report_id: uuid}` and lists `UNKNOWN_ERROR` (`45000`), `POST_NOT_FOUND` (`48001`), `COMMENT_NOT_FOUND` (`48002`), `INVALID_REPORT_CATEGORY` (`48009`), and `FORBIDDEN` (`48010`). Duplicate-report prevention is required but has no error code. `moderation_queue.md` lists `report_id`, `target_type`, `target_id`, `category`, `description`, `reporter_id`, `created_at`, `status`, `moderation_action`, `action_reason`, and `affected_user_notified`; `status`, queue, action, and history contracts are gaps.
- **Submission feedback.** `ReportSubmittedNotice` says "Report submitted for review." (`friend_profile.md`, `group_detail.md`). This confirms submission only; reviewer actions are outside the reporter UI.
- **API gaps and recommendations.** Profiles, messages, other users, and group activity have report requirements but no report endpoint in `API.md`; no queue, action, history, or status endpoint is defined. Do not invent an endpoint, status code, or error code for those surfaces. `/moderation/queue`, `ModerationQueuePage`, `ModerationQueueTable`, `ReportDetailPanel`, and `ModerationActionDialog` are recommendations in `moderation_queue.md`. Moderation actions require `NFR-SEC-10`, server-side checks require `NFR-SEC-6`, and report context must respect `NFR-PRIV-7`.

### B11. Source Alignment Notes

- `userstory.md` section 11.3 and `functional_requirement.md` US-40 agree on report surfaces, categories, context capture, routing, and moderator review; `moderation_queue.md` adds the only defined report API contract and also cites `FR-22.1`-`FR-22.6` and `AC-22.1`-`AC-22.5`, overlapping the report API notes in existing PA4 UC-05.
- No communication-settings or behavioral-report API endpoints are defined for this use case: `API.md` has no communication-settings endpoint and no behavioral-report endpoint for profiles, messages, other users, or group activity; only the forum-specific `POST /forum/reports` exists for posts and comments.
- Report UI must not promise a moderator outcome; `ReportSubmittedNotice` gives submission confirmation only, and `AC-40.4` leaves the decision to authorized moderators under platform policy.
- Forum-specific content reports overlap with PA4 `UC-20-report-moderate-forum-content.md`, which was not modified; this use case covers behavioral reports from profiles, messages, groups, and other users under US-40, and `friend.md`, `friend_profile.md`, and `group_detail.md` are UI/UX recommendations with no friend/profile/group API or error-code contract. `moderation_queue.md` states duplicate-report prevention without an error code, so generic failure is used here.
- No distinct include, extend, or specialization use case is named for US-40, so no I-xx, E-xx, or G-xx identifier is created.
