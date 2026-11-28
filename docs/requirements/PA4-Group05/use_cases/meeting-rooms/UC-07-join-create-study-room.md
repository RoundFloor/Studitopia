# UC-07 — Join or Create a Study Room

**Version:** `2.0`

**Performed by:** [Nguyen Thanh An] | **Edited by:** [Tran Nguyen Khanh Binh]

| Field | Value |
| --- | --- |
| Use Case ID | UC-07 |
| Name | Join or Create a Study Room |
| Primary Actor | University Student |
| Supporting Actors | Room Owner or Manager; Notification Service |
| Feature Group | Meeting Rooms (Secondary) |
| Priority | Medium (Supporting) |
| Related User Stories | US-35, US-34 |
| Related Requirements | US-34, US-35, US-36, US-38, US-39; FR-34.1 to FR-34.4, FR-35.1 to FR-35.6, FR-36.1 to FR-36.6, FR-38.3, FR-39.3; NFR-PERF-7, NFR-SCAL-6, NFR-PRIV-6 |
| Source Documents | `proposals/use_cases_model/UC-07-join-create-study-room.md`; `proposals/use_cases_description.md` (UC-07); `proposals/use_cases_model.md`; `proposals/use_case_diagrams.md`; `PA3-Group05/use_case.md` (section 7); `proposals/overview.md`; `proposals/functional_requirement.md`; `proposals/non_functional_requirement.md`; `proposals/userstory.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/meeting_lobby.md`; `proposals/study_room.md`; `proposals/hall_room.md`; `proposals/create_room.md`; `proposals/settings.md`; `proposals/group_detail.md` |

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
    RoomOwner@{ shape: person, label: "Room Owner or Manager" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC07(["UC-07<br/>Join or Create a Study Room"])
        G03(["G-03<br/>Join Public Room"])
        G04(["G-04<br/>Create Study Room"])
        I08(["I-08<br/>Enter Room Session"])
        E08(["E-08<br/>Use Shared Study Tools"])
    end

    Student --- UC07
    RoomOwner --- UC07
    NotifSvc --- UC07
    RoomOwner -- "generalization" --> Student

    G03 -- "generalization" --> UC07
    G04 -- "generalization" --> UC07

    UC07 -. "include" .-> I08
    E08 -. "extend" .-> UC07

    class Student,RoomOwner actor
    class NotifSvc external
    class UC07 usecase
    class I08 included
    class E08 extending
    class G03,G04 specialized
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected base use case; purple = included; green = extending; orange = specialized; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | A registered student who joins a public room, requests access to a private or custom room, or creates a study room. |
| Room Owner or Manager | Secondary human actor / specialized student | Creates or manages a study room and accepts or rejects private-room join requests; inherits the general student associations. |
| Notification Service | Supporting external system actor | Routes join-request and decision notifications for private or custom rooms. |
| New University Student; Registered University Student | Specialized human actors | Inherit the general University Student association to UC-07 from the shared actor model; not drawn separately in the focused diagram. |
| Post Author | Specialized human actor | Inherits the general University Student association to UC-07 from the shared actor model; has no room-specific role in this use case. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-07 Join or Create a Study Room | Primary | Joins a room, requests access, or creates a study room. |
| Room Owner or Manager | UC-07 Join or Create a Study Room | Secondary | Accepts or rejects private-room join requests. |
| Notification Service | UC-07 Join or Create a Study Room | Supporting | Routes join-request and decision notifications. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| Room Owner or Manager | University Student | Actor generalization | Inherits the general student associations and adds the secondary UC-07 management association. |
| G-03 Join Public Room | UC-07 Join or Create a Study Room | Use case generalization | Inherits the UC-07 actor association and I-08 include; specializes the public-room join path. |
| G-04 Create Study Room | UC-07 Join or Create a Study Room | Use case generalization | Inherits the UC-07 actor association and I-08 include; specializes room creation and configuration. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-07 Join or Create a Study Room | I-08 Enter Room Session | Establish the participant's room session after a successful join or creation. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-08 Use Shared Study Tools | UC-07 Join or Create a Study Room | Participants choose to use room tools during a session. | Add the shared whiteboard, shared notes, shared timer, and synchronized updates. |

### A4. Model Notes

1. G-03 and G-04 specialize the two main entry paths for UC-07 and inherit its actor association and I-08 include.
2. The private-room request path is handled within UC-07. Room Owner or Manager receives and decides the request, while Notification Service routes the request and outcome.
3. Meeting rooms remain secondary supporting capabilities; they do not replace the forum as the primary collaboration space.
4. The focused model includes a supporting system actor and actor generalization; the older PA3 diagram in `PA3-Group05/use_case.md` shows only the two human actors and uses labelled arrows for the same relationships.
5. E-08 is optional: room entry through I-08 does not require a participant to use the shared tools.

## Part B — Use Case Specification

### B1. Brief Description

A student enters an optional live study space by joining a public room, requesting access to a private room, or creating a new room for a study group. The trigger is the student opening the Meeting Lobby and selecting a room or **Create Room**. The successful outcome is that the student joins or creates a room and can enter the optional collaboration space. Meeting rooms are secondary supporting features and do not replace the forum as the primary collaboration space.

### B2. Preconditions

1. The student is authenticated with an active session.
2. The meeting-room service and real-time collaboration service are available.
3. The student is permitted to access the study-room lobby and is not blocked from room participation.
4. A room is available, or the student is permitted to create one.

### B3. Postconditions

1. **Success:** The student joins a room with an available seat, or creates a room and becomes its owner or manager.
2. **Success:** The student can enter the room and use supported shared study tools according to the room configuration.
3. **Success:** Room join requests are routed to an owner or manager for a private or custom room.
4. **Failure:** The student remains outside the room and receives a clear reason, such as full capacity, rejected request, or unavailable room.

### B4. Main Success Scenario — Join a Public Room

1. The student opens the Meeting Lobby.
2. The system displays available public study rooms with availability and capacity information.
3. The student selects a public room.
4. The backend verifies that the room still exists, is public, and has an available seat.
5. The backend adds the student to the room's participant list and establishes the room session.
6. The system opens the room and displays the supported shared study tools.
7. The student collaborates in the room using the available tools.

### B5. Alternative Flows

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

### B6. Exception Flows

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

### B7. Business Rules

1. Meeting rooms are optional supporting features; they do not replace the forum as the primary collaboration space.
2. A public room can be joined when it has available capacity.
3. A private or custom room requires a join request that the owner or manager can accept or reject.
4. A room creator becomes the room owner or manager.
5. Room managers can configure capacity, duration, communication rules, privacy level, and supported tools.
6. Shared tool updates must be synchronized for all room participants.
7. Shared notes must be preserved during the room session and handle reconnection without data loss.
8. Room participation and invitations must respect the user's communication and privacy settings.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-7 | Optional supporting meeting-room tools must maintain an update latency of 1 second or less when a room is in use. |
| NFR-SCAL-6 | The architecture must support at least 100 concurrent optional meeting rooms. |
| NFR-PRIV-6 | Users must be able to control whether other users can send them messages or room invitations. |
| Design constraint | Shared tool updates must be synchronized for all participants, and shared notes must be preserved during reconnection without data loss. Meeting rooms remain secondary to the forum. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Private-room request | Basic flow step 3; alternative A1 |
| Create room | Meeting Lobby; alternative A2 |
| View room details | Before joining or requesting access; alternative A3 |
| Room capacity check | Basic flow step 4; alternative A4 and exception E3 |
| Shared study tools | Basic flow steps 6-7; alternative A5 |
| Reconnect after interruption | During a room session; alternative A6 and exception E5 |
| Join-request notification | Private-room request and decision; alternative A1 and exception E1 |

### B10. Interface and Data Notes

- **Screen and feature flow:** `screen_flow.md` gives `Home -> Meeting` and `Meeting -> Hall Room` / `Meeting -> Study Room`. `feature_flow.md:156-173` gives `Lobby -> Trending/For you/Detail -> HallRoom` (via `Halls`), `Lobby -> Trending/For you/Detail -> StudyRoom` (via `Hub`), and `Lobby -> Create -> HallCreate / StudyCreate`. `Halls`, `Hub`, `HallCreate`, and `StudyCreate` are flow-derived labels with no dedicated FR or AC.
- **Recommended routes:** `meeting_lobby.md` suggests `/meeting` or `/meeting/lobby`; `study_room.md` suggests `/meeting/study/:roomId` or `/meeting/hub/:roomId`, plus `/meeting/requests` for the owner/manager queue; `create_room.md` suggests `/meeting/create` or `/meeting/rooms/new`. These routes are recommendations and are not specified in the requirements.
- **Room-card and detail fields:** `RoomCard` shows room name, description summary, privacy badge (**Public**, **Private**, or **Custom**), availability, capacity, current occupancy, and supported tools. `RoomDetailPreviewPanel` / `StudyRoomDetailPanel` adds description, configuration, duration, and communication rules before a join or request (`FR-34.3`, `FR-35.5`, `FR-35.6`, UC-07 A3).
- **Create-form fields:** `RoomConfigurationForm` contains exactly the seven UC-07 A2 fields — name, description, privacy level, supported tools, capacity, duration, and communication rules. No numeric limits, minimums, maximums, or defaults for capacity or duration are specified in the sources, and none are inferred.
- **Join-request states:** `JoinRequestDecisionBadge` / `RequestDecisionBadge` shows `Pending`, `Accepted`, or `Rejected`; `PendingRequestState` shows the requested room and time; `JoinRequestQueuePage` lets the owner or manager **Accept** or **Decline**; an accepted request joins the room and a rejected one leaves the student in the Lobby (`FR-35.3`, `FR-35.4`, AC-35.2, AC-35.3, UC-07 A1/E1).
- **Exact UI messages in the sources (recommended copy):** Lobby — "This room is full.", "This room is no longer available or has closed.", "You cannot access this room.", "Unable to load rooms.", "No rooms are available right now.", "Room recommendations are optional.", and "Suggestion dismissed."; room — "Your request was rejected.", "You are not permitted to join this room.", "The live room could not be reached.", "The live room is unavailable.", "Only the owner or manager can decide requests.", "Connection interrupted. Restoring session…", "Shared notes restored.", and "Some participants are hidden by privacy settings."; create — "Invalid capacity or duration. Room was not created.", "No numeric limits are specified for capacity or duration.", "You will be the room owner or manager.", "Room created.", "Room could not be created.", "Live collaboration service is unavailable.", and "You are not permitted to create a room.".
- **Tool synchronization and reconnection:** `RoomToolTabs` offers **Whiteboard**, **Notes**, and **Timer**; updates must be synchronized for all participants with an update latency of 1 second or less (`FR-36.4`, AC-36.4, NFR-PERF-7). Shared notes persist during the session and must be restored without data loss after reconnection (`FR-36.6`, AC-36.6, UC-07 A6, business rule 7); `ExportWhiteboardButton` applies only when export is supported (`FR-36.5`, AC-36.5).
- **Privacy and notification rules:** Room invitations appear only when room notifications are enabled (`FR-38.3`, AC-38.4, `RoomNotificationToggle`), and invitations may be rejected or users muted/blocked through `RoomInvitationPermissionSelect`, `MutedUsersList`, and `BlockedUsersList` (`FR-39.1`, `FR-39.3`, `FR-39.5`, NFR-PRIV-6). Participant rosters are privacy-filtered, and disallowed invitations are suppressed with "Invitations are disabled by the recipient's settings." (`NFR-PRIV-7`, `FR-39.5`).
- **API and error contracts:** `API.md` has no room endpoints, and `response_code.md` has no room fields or room error codes; the room API shape is unspecified. No room route, endpoint name, status code, or error code is invented for join, request, decision, or creation, and forum codes such as `48010` `FORBIDDEN` and `45000` `UNKNOWN ERROR` belong to forum/database contracts, not to rooms.
- **Excluded legacy detail:** Fixed tables, seat assignments, invite codes, and 30-minute teardown are PA2 details and are not current requirements.

### B11. Source Alignment Notes

- `use_cases_description.md` and the focused model relate UC-07 to US-35 and US-34; the proposal selection table names only US-35, while the UC-07 specification and the related-requirements line include US-34, US-35, US-36, US-38, and US-39.
- `PA3-Group05/use_case.md` lists E1-E6 under section 7.4.2 (Alternative Flows); the same six flows are presented as exception flows in `use_cases_description.md` and are kept as B6 here.
- The focused diagram in `proposals/use_cases_model/UC-07-join-create-study-room.md` adds the Notification Service cloud actor and labelled generalization arrows; the older diagram in `PA3-Group05/use_case.md` and `use_case_diagrams.md` shows only the two human actors. The focused model diagram is reproduced verbatim in A1.
- UC-07 A2 and E4 name capacity and duration, and `create_room.md` explicitly states that no numeric limits, minimums, maximums, or defaults are given; this document follows that gap and does not add bounds.
- `API.md` contains no room endpoints; `response_code.md` contains no room error codes. Room requests must not be assigned forum or authentication status codes by analogy.
- Routes, page names, component names, badges, and quoted messages in `meeting_lobby.md`, `study_room.md`, `hall_room.md`, and `create_room.md` are UI/UX recommendations derived from the proposals, not mandated requirement text.
- `overview.md` names Hall Room and Study Room as supporting destinations; `group_detail.md` documents friend groups separately and has no dedicated PA3 friend/group UC, so meeting-room rules are not transferred to groups.
- `FR-35.4` and AC-35.3 assign join-request decisions to the room owner or manager; the student who creates a room becomes that owner or manager per UC-07 A2 and business rule 4.
- `NFR-PERF-7`, `NFR-SCAL-6`, and `NFR-PRIV-6` are the only non-functional requirements carried in the UC-07 related-requirements line; authentication and server-side authorization (`NFR-SEC-1`, `NFR-SEC-6`) are preconditions enforced by the backend rather than room-specific special requirements.
- Shared whiteboard export, help requests, and Hall/Study room-type labels are supporting or flow-derived behavior; they do not alter the UC-07 basic flow or its include/extend structure.
