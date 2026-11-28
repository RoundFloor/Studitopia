# UC-31 — Request Learning Help

**Version:** `1.0`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

| Field | Value |
| --- | --- |
| Use Case ID | UC-31 |
| Name | Request Learning Help |
| Primary Actor | University Student |
| Supporting Actors | Other Learners (friends, room participants, or concept learners); Notification Service |
| Feature Group | Supporting Meeting Rooms (Secondary) |
| Priority | Not explicitly stated |
| Related User Stories | US-37 |
| Related Requirements | FR-37.1, FR-37.2, FR-37.3, FR-37.4, FR-37.5, FR-37.6; AC-37.1, AC-37.2, AC-37.3, AC-37.4, AC-37.5, AC-37.6; FR-14.1, FR-14.2, FR-14.3, FR-14.4, FR-14.5, FR-14.6; AC-14.1, AC-14.2, AC-14.3, AC-14.4, AC-14.5; NFR-SEC-5, NFR-SEC-9, NFR-PERF-1, NFR-USE-4, NFR-USE-5 |
| Source Documents | `proposals/userstory.md` (10.4); `proposals/functional_requirement.md` (US-37); `proposals/study_room.md`; `proposals/hall_room.md`; `proposals/meeting_lobby.md`; `proposals/settings.md`; `proposals/non_functional_requirement.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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
    Learners@{ shape: person, label: "Other Learners" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC31(["UC-31<br/>Request Learning Help"])
    end

    Student --- UC31
    Learners --- UC31
    NotifSvc --- UC31

    class Student actor
    class Learners actor
    class NotifSvc external
    class UC31 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | The requester who creates, sends, tracks, cancels, or converts a help request. |
| Other Learners | Secondary human actors | Friends, room participants, or concept learners who receive a help request and can accept or decline it. |
| Notification Service | Supporting external system | Routes help-request activity to the notification center under `FR-38.2` / `AC-38.3`. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-31 Request Learning Help | Primary | Creates and manages an outgoing help request. |
| Other Learners | UC-31 Request Learning Help | Secondary | Receive requests and respond with **Accept** or **Decline**. |
| Notification Service | UC-31 Request Learning Help | Supporting | Delivers help-request notifications to recipients. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor or use-case generalization is named for US-37 in the proposals. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No included use case is named for US-37 in the proposals. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No extending use case is named for US-37 in the proposals. |

### A4. Model Notes

1. Only UC-31 and its source-backed actors are shown; no new I-xx, E-xx, or G-xx identifiers are introduced.
2. Help requests are described as generic room help in `study_room.md` and `hall_room.md`; Hall Room has no separate FR or AC.
3. Forum conversion is part of UC-31 because `FR-37.5` / `AC-37.5` require it; the forum remains the primary asynchronous collaboration space.

## Part B — Use Case Specification

### B1. Brief Description

A university student asks for academic assistance from friends, room participants, or concept learners by completing a help form with a title, subject, description, and attachments. `AC-37.1` identifies the help content, and `AC-37.2` / `FR-37.2` identify the permitted recipient groups. Other learners can accept or decline the request; the requester can cancel it or convert it into a forum post for asynchronous discussion (`AC-37.3`–`AC-37.5`). The system rate-limits requests to prevent spam (`AC-37.6`, `FR-37.6`).

### B2. Preconditions

1. The student is authenticated with an active session.
2. The student can reach the help area of a room session through `HelpRequestPanel` / `CreateHelpRequestButton`.
3. At least one friend, room participant, or concept learner is available as a recipient.
4. The student has not exceeded the help-request rate limit defined by the backend.

### B3. Postconditions

1. **Success:** A help request is stored with `helpTitle`, `helpSubject`, `helpDescription`, `attachments`, and `recipients` as `Pending`; recipients receive it and respond with `Accepted` or `Declined`.
2. **Success:** The requester can cancel the request (`Cancelled`) or convert it into a forum post (`Converted`).
3. **Failure:** No new help request is created, and the rate-limit or validation message is shown to the requester.

### B4. Main Success Scenario (Basic Flow)

1. The student selects **Request Help** in the room's help area.
2. The system opens `HelpRequestForm`.
3. The student enters `helpTitle`, `helpSubject`, and `helpDescription`, and adds `attachments`.
4. The student selects `recipients` from friends, room participants, or concept learners.
5. The student selects **Send request**.
6. The frontend validates the form fields and attachment file type/size, and the backend checks authentication, recipient eligibility, and the rate limit.
7. The system creates the help request with status `Pending` and adds it to outgoing help requests.
8. The Notification Service routes the help request to the selected recipients.
9. A recipient reviews the request in `IncomingHelpRequestList` and selects **Accept** or **Decline**.
10. The requester sees the updated status in the outgoing help request list.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Recipient accepts

At basic flow step 10, the recipient selects **Accept**. The help request status becomes `Accepted`, and the requester is notified of the response (`FR-37.3`, `AC-37.3`).

#### A2. Recipient declines

At basic flow step 10, the recipient selects **Decline**. The help request status becomes `Declined`, and the requester is notified of the response (`FR-37.3`, `AC-37.3`).

#### A3. Requester cancels

The requester selects **Cancel request** on an outgoing request. The status becomes `Cancelled`, and no further responses are accepted for that request (`FR-37.4`, `AC-37.4`).

#### A4. Convert to forum post

The requester selects **Convert to forum post**. The system creates a forum post for asynchronous discussion and records the help request as `Converted` (`FR-37.5`, `AC-37.5`). The forum conversion uses the documented `POST /forum/posts` contract with permitted post types `discussion`, `material`, or `functional`.

### B6. Exception Flows

#### E1. Rate limit reached

The backend rejects a new request because the help-request rate limit is reached. The system shows "Too many help requests. Try again later." and does not create the request (`FR-37.6`, `AC-37.6`, `NFR-SEC-9`).

#### E2. Required help fields missing or attachment invalid

The system keeps `HelpRequestForm` open, identifies the invalid title, subject, description, attachment, or recipients, and does not submit the request (`AC-37.1`, `NFR-SEC-5`).

#### E3. Forum conversion fails

If forum post creation fails, the help request is not marked `Converted`. The documented errors for `POST /forum/posts` are `400 INVALID_POST_TYPE` (`48003`), `400 INVALID_POST_CONTENT` (`48004`), `401`, `403 FORBIDDEN` (`48010`), and `500 (DATABASE_ERROR | UNKNOWN_ERROR)`.

### B7. Business Rules

1. A help request includes a title, subject, description, and attachments (`AC-37.1`).
2. Recipients are friends, room participants, or concept learners (`AC-37.2`, `FR-37.2`).
3. Other learners can accept or decline a help request (`AC-37.3`, `FR-37.3`).
4. The requester can cancel the help request (`AC-37.4`, `FR-37.4`).
5. A help request can be converted into a forum post (`AC-37.5`, `FR-37.5`).
6. Help requests are rate-limited to prevent spam (`AC-37.6`, `FR-37.6`, `NFR-SEC-9`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-5 | Uploaded files must be validated for file type and file size before acceptance. |
| NFR-SEC-9 | The system must rate-limit help requests to reduce spam and abuse. |
| NFR-PERF-1 | Standard user interactions must respond within 2 seconds. |
| NFR-USE-4 | Primary interface actions must use clear labels and recognizable controls. |
| NFR-USE-5 | The user interface must be usable on screen sizes of at least 320 px in width. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Rate-limit check | Basic flow step 6; exception E1 |
| Accept or decline response | Basic flow step 9; alternatives A1-A2 |
| Cancellation | After the request is created; alternative A3 |
| Forum conversion | After the request is created; alternative A4 and exception E3 |

### B10. Interface and Data Notes

- **Screen/flow path:** `screen_flow.md` gives `Home -> Meeting` and `Meeting -> Hall Room` / `Meeting -> Study Room`; `feature_flow.md` gives the Lobby paths to Hall Room and Study Room. `study_room.md` and `hall_room.md` place `HelpRequestPanel` inside the room shell.
- **Form fields and actions:** `HelpRequestForm` collects `helpTitle` (**Title**), `helpSubject` (**Subject**), `helpDescription` (**Description**), and `attachments` (**Attachments**). `HelpRecipientSelector` collects `recipients` (**Recipients**) from friends, room participants, or concept learners. Actions are **Request Help**, **Send request**, **Accept**, **Decline**, **Cancel request**, and **Convert to forum post**.
- **Statuses:** `helpStatus` uses `Pending`, `Accepted`, `Declined`, `Cancelled`, and `Converted` in outgoing and incoming help lists.
- **Exact rate-limit message:** "Too many help requests. Try again later." is the recommended `HelpRateLimitNotice` copy in `hall_room.md`; `study_room.md` also shows the shorter "Too many help requests."
- **Notification rules:** `userstory.md` section 11 places Help Request under the Notification Center; `FR-38.2` / `AC-38.3` include help requests among social notifications. `settings.md` exposes `SocialNotificationToggles`, but no help-specific API is defined.
- **Forum conversion API:** `POST /forum/posts` accepts `university_id`, `major_id?`, `course_id?`, `post_type`, `title`, `content`, `tags?`, and `files?`; success is `201 {post_id, created_at}`. Errors and codes are listed in E3 and come from `API.md` / `response_code.md`.
- **Help-request endpoints/statuses/error codes:** Not specified in proposals. `API.md` has no help endpoints, and `response_code.md` has no help error codes; only the separate forum-conversion contract is available.

### B11. Source Alignment Notes

- UC-07 defines the room session and names the Notification Service for join-request routing; UC-31 uses the same room context for help requests but does not repeat UC-07's join, capacity, or owner-decision rules.
- UC-05 contributes only the forum-notification pattern after conversion; a converted help request is a new forum post and does not become a comment or answer under UC-05.
- `FR-37.1` names title, subject, description, and attachments generally; the exact field names `helpTitle`, `helpSubject`, `helpDescription`, `attachments`, and `recipients` come from `study_room.md` and `hall_room.md`.
- The Notification Service actor is source-backed by the Notification Center help-request path; `study_room.md` and `hall_room.md` give slightly different rate-limit copy, and the fuller "Too many help requests. Try again later." is retained.
