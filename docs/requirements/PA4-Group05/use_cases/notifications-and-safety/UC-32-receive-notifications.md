# UC-32 — Receive Notifications

**Version:** `1.0`

**Performed by:** [Tran Canh Anh Tuan] | **Edited by:** [Tran Canh Anh Tuan]

| Field | Value |
| --- | --- |
| Use Case ID | UC-32 |
| Name | Receive Notifications |
| Primary Actor | User |
| Supporting Actors | Notification Service |
| Feature Group | Notifications and Safety |
| Priority | Not explicitly stated |
| Related User Stories | US-38 |
| Related Requirements | FR-38.1, FR-38.2, FR-38.3, FR-38.4, FR-38.5, FR-38.6; AC-38.1, AC-38.2, AC-38.3, AC-38.4, AC-38.5, AC-38.6; FR-18.6, FR-20.5, FR-31.4, FR-32.5; NFR-PERF-1, NFR-PERF-6, NFR-SEC-1, NFR-SEC-6, NFR-PRIV-6, NFR-USE-4, NFR-USE-5 |
| Source Documents | `proposals/userstory.md` (11.1); `proposals/functional_requirement.md` (US-38); `proposals/study_room.md`; `proposals/hall_room.md`; `proposals/meeting_lobby.md`; `proposals/settings.md`; `proposals/non_functional_requirement.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC32(["UC-32<br/>Receive Notifications"])
    end

    User --- UC32
    NotifSvc --- UC32

    class User actor
    class NotifSvc external
    class UC32 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| User | Primary human actor | A registered user who configures notification types, receives in-app alerts, and marks notifications as read. |
| Notification Service | Supporting external system actor | Delivers forum, social, help-request, and enabled room-invitation activity to the notification center. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| User | UC-32 Receive Notifications | Primary | Configures preferences, receives toasts and tray items, and marks notifications read. |
| Notification Service | UC-32 Receive Notifications | Supporting | Routes enabled activity notifications to the user. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor or use-case generalization is named for US-38 in the proposals. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No included use case is named for US-38 in the proposals. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No extending use case is named for US-38 in the proposals. |

### A4. Model Notes

1. Only UC-32 and its source-backed actors are shown; no new I-xx, E-xx, or G-xx identifiers are introduced.
2. The Notification Center is treated as an in-app surface, not as an additional actor; the Notification Service is the supporting external actor.
3. Forum, social, help-request, and room-invitation categories come from `userstory.md` section 11, `FR-38.1`–`FR-38.3`, and `AC-38.2`–`AC-38.4`.
4. UC-32 covers receiving and managing notifications; the activities that trigger them remain defined in their own use cases.

## Part B — Use Case Specification

### B1. Brief Description

The user receives real-time in-app toasts and a persistent notification tray with unread indicators for relevant academic and social activity. `AC-38.1` defines the toast/tray behavior, `FR-38.4` defines the in-app notification center with unread indicators, and `AC-38.2`–`AC-38.4` define the forum, social, and room categories. The user also chooses which notification types trigger alerts and whether audio alerts are enabled, then marks notifications as read (`AC-38.5`, `AC-38.6`). `settings.md` places these controls in `NotificationSettingsForm` with forum, social, room, and audio controls plus notification-center actions.

### B2. Preconditions

1. The user is authenticated with an active session (`NFR-SEC-1`).
2. The user can open **Settings** and reach the **Notifications** section.
3. At least one notification type is enabled in the user's notification preferences.
4. A relevant forum, social, help-request, or enabled room-invitation event has occurred.
5. The notification service is available to deliver the event to the in-app center.

### B3. Postconditions

1. **Success:** The user's notification preferences are stored with the selected forum, social, room, and audio alert types.
2. **Success:** An enabled event produces a real-time toast and a persistent notification item with an unread indicator.
3. **Success:** The user opens the notification center and marks one or more notifications as read.
4. **Failure:** Disabled event types do not trigger alerts; room invitations are not shown when room notifications are disabled.

### B4. Main Success Scenario (Basic Flow)

1. The user opens **Settings** and selects **Notifications**.
2. The system displays `NotificationSettingsForm` with `ForumNotificationToggles`, `SocialNotificationToggles`, `RoomNotificationToggle`, and `AudioAlertToggle`.
3. The user chooses which forum, social, and room events trigger alerts and whether audio alerts are enabled.
4. The user selects **Save Notifications**.
5. The system stores the notification preferences.
6. A relevant enabled event occurs, and the Notification Service routes it to the in-app notification center.
7. The system displays a real-time toast and adds a persistent notification item with an unread indicator.
8. The user selects **Open Notification Center**.
9. The user reviews the notification tray and selects **Mark All as Read**, clearing the unread indicators for the marked notifications.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Forum activity notification

At basic flow step 6, the event is a comment, answer, vote, true-response mark, or mention. The system creates a forum notification under `FR-38.1` / `AC-38.2`, provided that the corresponding `ForumNotificationToggles` choice permits it.

#### A2. Social activity notification

At basic flow step 6, the event is a friend request, message, group invitation, or help request. The system creates a social notification under `FR-38.2` / `AC-38.3`, provided that the corresponding `SocialNotificationToggles` choice permits it.

#### A3. Room invitation notification

At basic flow step 6, the event is a room invitation. The system shows it only when `RoomNotificationToggle` is enabled, as required by `FR-38.3` / `AC-38.4`.

#### A4. Audio alert preference

At basic flow step 3, the user enables or disables `AudioAlertToggle`. The system applies the choice to enabled alerts only and saves it with **Save Notifications** (`FR-38.5`, `AC-38.5`).

### B6. Exception Flows

#### E1. Room notifications disabled

A room invitation is generated while `RoomNotificationToggle` is disabled. The system suppresses the room notification rather than showing it in the tray, toasts, or audio alerts (`FR-38.3`, `AC-38.4`).

#### E2. Unauthenticated access to notification settings or center

An unauthenticated request targets Settings or the notification center. The system denies access and requires login (`NFR-SEC-1`, `NFR-SEC-6`).

### B7. Business Rules

1. The system displays real-time toasts and a persistent notification tray with unread indicators (`AC-38.1`, `FR-38.4`).
2. Forum notifications include comments, answers, votes, true-response marks, and mentions (`AC-38.2`, `FR-38.1`).
3. Social notifications include friend requests, messages, group invitations, and help requests (`AC-38.3`, `FR-38.2`).
4. Room invitations are shown only when the user enables room notifications (`AC-38.4`, `FR-38.3`).
5. Users choose which notification types trigger alerts and whether audio alerts are enabled (`AC-38.5`, `FR-38.5`).
6. Users can mark notifications as read (`AC-38.6`, `FR-38.6`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-6 | Forum notifications must be delivered with a latency of 2 seconds or less under normal operating conditions. |
| NFR-PERF-1 | Standard user interactions must respond within 2 seconds. |
| NFR-SEC-1 | The system must require authentication before accessing protected user resources. |
| NFR-SEC-6 | The system must prevent unauthorized access through server-side authorization checks. |
| NFR-PRIV-6 | Users must be able to control whether other users can send them messages or room invitations. |
| NFR-USE-4 | Primary interface actions must use clear labels and recognizable controls. |
| NFR-USE-5 | The user interface must be usable on screen sizes of at least 320 px in width. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Forum notification preference | Basic flow steps 2-4; alternative A1 |
| Social notification preference | Basic flow steps 2-4; alternative A2 |
| Room notification preference | Basic flow steps 2-4; alternatives A3 and E1 |
| Audio alert preference | Basic flow step 3; alternative A4 |
| Notification delivery | Basic flow steps 6-7 |
| Notification-center read actions | Basic flow steps 8-9 |

### B10. Interface and Data Notes

- **Screen/flow path:** `screen_flow.md` gives `Home -> Settings`. `settings.md` places notification controls under `SettingsPage` → `NotificationSettingsPage` with suggested route `/settings/notifications`; the route is a recommendation, not a requirement.
- **Notification toggles:** `ForumNotificationToggles` covers comments, answers, votes, true-response marks, and mentions; `SocialNotificationToggles` covers friend requests, messages, group invitations, and help requests; `RoomNotificationToggle` covers optional room invitations; `AudioAlertToggle` controls sound alerts.
- **Notification-center actions:** `NotificationCenterLink` is labelled **Open Notification Center**; `MarkAllReadButton` is labelled **Mark All as Read**; `SaveNotificationSettingsButton` is labelled **Save Notifications**; `ToastPreview` shows the toast with unread indicator pattern. Individual mark-as-read is derived from `FR-38.6` / `AC-38.6`.
- **Exact messages:** No quoted notification message text is specified for US-38 in the proposals. The labelled actions above and "Comments, answers, votes, true-response marks, mentions", "Friend requests, messages, group invitations, help requests", and "Optional room invitations" are the source-backed UI descriptions from `settings.md`.
- **Data fields:** `NotificationPreference` contains `forumEvents`, `socialEvents`, `roomInvitationsEnabled`, and `audioAlertsEnabled` in `settings.md`; no notification database schema is specified.
- **Notification rules:** Room invitations appear only when room notifications are enabled (`FR-38.3`, `AC-38.4`); audio alerts follow `AC-38.5` / `FR-38.5`; read state follows `AC-38.6` / `FR-38.6`.
- **API endpoints/statuses/error codes:** Not specified in proposals. `API.md` has no notification endpoints, and `response_code.md` has no notification error codes; forum codes must not be reused for notifications by analogy.

### B11. Source Alignment Notes

- UC-05 step 11 and I-06 Send Forum Notification cover the producer side for comment/answer notifications; UC-32 covers the user's receipt, preferences, and read actions and does not change UC-05's publishing flow.
- UC-07 and `study_room.md` route room invitations and join-request decisions; UC-32 only adds the recipient-side rule that room invitations appear when room notifications are enabled.
- `userstory.md` section 11 names the Notification Center and its forum, social, help-request, and room categories; `settings.md` adds the concrete toggles, labels, and preference fields as UI recommendations derived from `US-38`.
- `API.md` and `response_code.md` contain no notification contract; no endpoint, status code, or error code is inferred from the forum APIs.
- The source does not define retry behavior for failed notification delivery; no retry policy is invented.
