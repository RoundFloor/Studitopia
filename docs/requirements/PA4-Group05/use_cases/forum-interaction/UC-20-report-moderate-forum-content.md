# UC-20 — Report and Moderate Forum Content

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-20 |
| Name | Report and Moderate Forum Content |
| Primary Actor | University Student or Moderator |
| Supporting Actors | Administrator |
| Feature Group | Forum Interaction |
| Priority | Not specified in proposals |
| Related User Stories | US-22 |
| Related Requirements | FR-22.1, FR-22.2, FR-22.3, FR-22.4, FR-22.5, FR-22.6; AC-22.1, AC-22.2, AC-22.3, AC-22.4, AC-22.5; NFR-SEC-1, NFR-SEC-6, NFR-SEC-9, NFR-SEC-10, NFR-USE-6, NFR-PRIV-7 |
| Source Documents | `proposals/userstory.md` §6.5; `proposals/functional_requirement.md` US-22; `proposals/moderation_queue.md`; `proposals/post_management.md`; `proposals/list_post.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md`; `proposals/settings.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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

    Student@{ shape: person, label: "University Student" }
    Moderator@{ shape: person, label: "Moderator" }
    Administrator@{ shape: person, label: "Administrator" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC20(["UC-20<br/>Report and Moderate<br/>Forum Content"])
    end

    Student --- UC20
    Moderator --- UC20
    Administrator --- UC20

    class Student,Moderator,Administrator actor
    class UC20 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | Reports a post, comment, or answer under the report categories in FR-22.2. |
| Moderator | Primary human actor | Reviews routed reports and applies permitted hide, delete, restore, or ban actions under FR-22.4. |
| Administrator | Supporting human actor | Is also authorized for moderation actions under NFR-SEC-10. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-20 Report and Moderate Forum Content | Primary | Submits a report on forum content. |
| Moderator | UC-20 Report and Moderate Forum Content | Primary | Reviews the moderation queue and applies policy actions. |
| Administrator | UC-20 Report and Moderate Forum Content | Supporting | Performs authorized moderation actions under NFR-SEC-10. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor generalization or specialization is named in the proposal sources for this story. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named; `moderation_queue.md` explicitly notes that there is no dedicated moderation use case. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No distinct extending use case is named in the proposal sources for this story. |

### A4. Model Notes

1. In scope: reporting a post, comment, or answer; routing reports with context; moderator/admin review; hide, delete, restore, or ban actions; action records; notifications; and restriction enforcement.
2. Out of scope: creating posts and comments, profile/message reporting under US-40, and modifying UC-03 or UC-05.
3. The four exact report categories are spam, harassment, inappropriate content, and academic dishonesty.
4. `moderation_queue.md` states that `API.md` defines only `POST /forum/reports`; no queue, action, history, or status endpoints are defined.
5. No new I-xx, E-xx, or G-xx identifier is created; the queue and moderation record are UI/data recommendations, not named use cases in the proposal sources.

## Part B — Use Case Specification

### B1. Brief Description

A university student reports inappropriate forum content, and an authorized moderator or administrator reviews the report and applies policy actions so that the forum remains safe and academically useful. Reports carry target context and are routed to a moderation queue.

The trigger is selecting **Report** on a post, comment, or answer, or opening the moderation queue as an authorized reviewer. The successful outcome is a recorded report with `report_id`, a moderation decision recorded under FR-22.5, notification to the affected user when appropriate, and enforced restrictions where applicable.

### B2. Preconditions

1. The reporting student or reviewing moderator/administrator is authenticated.
2. The reported post, comment, or answer exists and is visible to the reporter.
3. The reporter selects one of spam, harassment, inappropriate content, or academic dishonesty.
4. The reviewer is an authorized moderator or administrator under NFR-SEC-10.

### B3. Postconditions

1. **Success:** A report is recorded with target context and returned as `report_id`, then routed to the moderation queue.
2. **Success:** An authorized reviewer applies a permitted action and the action is recorded with notification to the affected user when appropriate.
3. **Success:** Moderation restrictions cannot be bypassed through new posts or comments.
4. **Failure:** No invalid or unauthorized moderation change is applied, and the actor receives an error.

### B4. Main Success Scenario (Basic Flow)

1. The student opens a post detail view containing a post, comment, or answer to report.
2. The system shows **Report** among the permitted actions.
3. The student selects **Report** and the system opens the report dialog with target context.
4. The student selects a category: spam, harassment, inappropriate content, or academic dishonesty.
5. The student optionally enters a description and submits the report.
6. The backend validates the target, category, and reporter context and records the report.
7. The backend returns `201` with `{report_id}` and routes the report to the moderation queue with contextual information.
8. An authorized moderator or administrator reviews the report context.
9. The reviewer selects a policy action: hide, delete, restore, or ban content or users.
10. The system records the moderation action and notifies the affected user when appropriate.
11. The system enforces any resulting restriction on new posts and comments.

### B5. Alternative Flows

#### A1. Report a comment or answer

At basic flow steps 1-6, the reporter targets a comment or answer. The request uses `target_type: 'comment'` and the corresponding `target_id`; a missing target produces `COMMENT_NOT_FOUND` (`48002`).

#### A2. Review without description

At basic flow step 5, the reporter leaves the optional description empty. The backend accepts the report when `target_type`, `target_id`, and a valid `category` are present.

#### A3. Restore moderated content

At basic flow step 9, the reviewer restores previously hidden or deleted content where supported by forum policy.

#### A4. Notify affected user

At basic flow step 10, the moderation record indicates that an affected user should be notified. The system notifies that user when appropriate under AC-22.4.

#### A5. Restriction enforcement

At basic flow step 11, a moderated user attempts a new post or comment. The backend blocks the bypass attempt and the UI shows a restriction notice or action error.

### B6. Exception Flows

#### E1. Invalid report category

The backend rejects an unsupported category with `400 INVALID_REPORT_CATEGORY` (`48009`) and the report is not recorded.

#### E2. Target is unavailable

A missing post or comment produces `404 POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`), and the report is not recorded.

#### E3. Unauthenticated report

An unauthenticated report request produces `UNAUTHORIZED` under `401`; the system requires login before submitting.

#### E4. Unauthorized moderation access

A user who is not an authorized moderator or administrator is denied moderation access under NFR-SEC-10 and server-side checks under NFR-SEC-6. `moderation_queue.md` proposes a permission-denied state; no moderation-action HTTP contract is defined in `API.md`.

#### E5. Duplicate report

`API.md` requires preventing duplicate reports from the same user for the same target within a short window, but defines no error code for that case. The UI must not claim a specific duplicate code.

#### E6. Server or database failure

The backend reports `INTERNAL_SERVER_ERROR` under `500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`; the report or moderation action is not completed.

### B7. Business Rules

1. Users can report a post, comment, or answer under FR-22.1 and AC-22.1.
2. The exact report categories are spam, harassment, inappropriate content, and academic dishonesty under FR-22.2 and AC-22.1.
3. Reports are routed to a moderation queue with contextual information under FR-22.3 and AC-22.2.
4. Moderators can hide, delete, restore, or ban content and users according to forum policy under FR-22.4 and AC-22.3.
5. Moderation actions are recorded and affected users are notified when appropriate under FR-22.5 and AC-22.4.
6. Moderated users cannot bypass restrictions through new posts or comments under FR-22.6 and AC-22.5.
7. Moderation actions are restricted to authorized moderators and administrators under NFR-SEC-10.
8. Reporting and related actions are rate-limited under NFR-SEC-9; no numeric limit is specified in proposals.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected report and moderation surfaces. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized moderation access. |
| NFR-SEC-9 | Reporting, posting, commenting, and voting must be rate-limited to reduce spam and abuse. |
| NFR-SEC-10 | Moderation actions must be restricted to authorized moderators and administrators. |
| NFR-USE-6 | Reporting and moderation actions must be reachable within at most 2 interactions from a post or comment. |
| NFR-PRIV-7 | Privacy settings must apply consistently to forum posts, comments, member lists, and search results. |
| Design constraint | Moderation actions must produce a moderation record; no queue, action, or history endpoint is defined in `API.md`. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Report target selection | Basic flow steps 1-4; alternative A1 |
| Category and description entry | Basic flow steps 4-5; exceptions E1 and E5 |
| Queue review | Basic flow step 8; exception E4 |
| Moderation action | Basic flow step 9; alternatives A3-A4 |
| Restriction enforcement | Basic flow step 11; alternative A5 |
| Failure recovery | Exceptions E1-E6 |

### B10. Interface and Data Notes

- **Confirmed flow:** `feature_flow.md` shows `Post → Report / Moderate`; `moderation_queue.md` shows `Report Content → Moderation Queue → Moderator Action → Record / Notify / Enforce Restriction`.
- **Confirmed categories:** Report categories are spam, harassment, inappropriate content, and academic dishonesty under FR-22.2 and AC-22.1.
- **Recommendation UI:** `ReportPostButton` is labelled **Report**; `ReportContentDialog` / `ReportPostDialog` provides target context, category, optional description, and submit/cancel; `ReportSubmitButton` is labelled **Submit report**. These are source recommendations, not FR/AC fields.
- **Confirmed endpoint:** `POST /forum/reports` uses `{target_type: 'post' | 'comment', target_id: string, category: string, description?: string}` and returns `201 {report_id}`.
- **Error codes:** `400 INVALID_REPORT_CATEGORY` (`48009`), `404 POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`), `401`, and `500`. `studitopia.report_forum_content` also lists `FORBIDDEN` (`48010`) and duplicate-report prevention with no specified error code.
- **Gap:** No queue, action, history, or status endpoints are defined in `API.md`. Hide, delete, restore, and ban actions have requirement coverage in FR-22.4 but no API contract.
- **Authorization:** Only authorized moderators/admins may act, per NFR-SEC-10, with server-side checks under NFR-SEC-6.
- **Data fields:** Confirmed fields are `report_id`, `target_type`, `target_id`, `category`, and optional `description`. `reporter_id` appears in the database function; `created_at`, `status`, `moderation_action`, `action_reason`, and `affected_user_notified` are recommendation/gap fields in `moderation_queue.md`.
- **Moderation record:** FR-22.5 and AC-22.4 require recorded actions and notification to affected users when appropriate; no history API is defined.
- **Privacy:** NFR-PRIV-7 applies consistently to posts, comments, member lists, and search results.

### B11. Source Alignment Notes

- UC-03 lists **report** as a permitted action in the post-detail flow but does not define report submission, queue review, moderation actions, records, or restriction enforcement.
- UC-05 mentions the same `POST /forum/reports` contract and the moderation API gap as interface context; it does not cover reporting or moderation behavior.
- `moderation_queue.md` explicitly states that there is no dedicated moderation use case in the cited use-case files, so UC-20 introduces no new I-xx/E-xx/G-xx relationship.
- `FR-40.1`–`FR-40.5` and `AC-40.1`–`AC-40.4` cover broader inappropriate-behavior reporting, but this case is scoped to US-22 forum content.
- `API.md` supports only `target_type: 'post' | 'comment'`; report surfaces beyond posts and comments lack report API support.
- No queue, action, history, or status endpoint is defined in `API.md`, and no report-status enum is specified; do not infer one from UI recommendations.
