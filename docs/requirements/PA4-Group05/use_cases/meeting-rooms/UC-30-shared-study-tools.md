# UC-30 — Use Shared Study Tools

**Version:** `1.0`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

| Field | Value |
| --- | --- |
| Use Case ID | UC-30 |
| Name | Use Shared Study Tools |
| Primary Actor | University Student |
| Supporting Actors | Other Room Participants |
| Feature Group | Supporting Meeting Rooms (Secondary) |
| Priority | Not explicitly stated |
| Related User Stories | US-36 |
| Related Requirements | FR-36.1, FR-36.2, FR-36.3, FR-36.4, FR-36.5, FR-36.6; AC-36.1, AC-36.2, AC-36.3, AC-36.4, AC-36.5, AC-36.6; NFR-PERF-7, NFR-SCAL-6, NFR-USE-2, NFR-USE-4, NFR-USE-5 |
| Source Documents | `proposals/userstory.md` (10.3); `proposals/functional_requirement.md` (US-36); `proposals/study_room.md`; `proposals/hall_room.md`; `proposals/meeting_lobby.md`; `proposals/settings.md`; `proposals/non_functional_requirement.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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
    Participants@{ shape: person, label: "Other Room Participants" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC30(["UC-30<br/>Use Shared Study Tools"])
    end

    Student --- UC30
    Participants --- UC30

    class Student actor
    class Participants actor
    class UC30 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | A participant who uses the shared whiteboard, shared notes, and shared timer during a room session. |
| Other Room Participants | Secondary human actor | Other students in the same room who receive synchronized tool updates and contribute to shared notes. |
| Supporting Service | Not specified in proposals | No external system actor is named for US-36; tool synchronization is described as system behavior in `FR-36.4`. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-30 Use Shared Study Tools | Primary | Uses the shared tools in an active room session. |
| Other Room Participants | UC-30 Use Shared Study Tools | Secondary | Share and receive synchronized whiteboard, notes, and timer updates. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor or use-case generalization is named for US-36 in the proposals. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No included use case is named for US-36 in the proposals. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No extending use case is named for US-36 in the proposals. |

### A4. Model Notes

1. Only UC-30 and its source-backed actors are shown; no new I-xx, E-xx, or G-xx identifiers are introduced.
2. Shared tool behavior is described for room participants in both `study_room.md` and `hall_room.md`; no Hall-only or Study-Room-only tool variant is defined.
3. Meeting rooms are optional supporting capabilities and do not replace the forum as the primary collaboration space.
4. No tool-specific API endpoint, error code, or room data contract is specified in `API.md` or `response_code.md`.
5. The participant roster and invitations are governed by communication and privacy settings elsewhere; those rules are not repeated as UC-30 relationships.

## Part B — Use Case Specification

### B1. Brief Description

A university student who is already in a Study Room or Hall Room uses the shared whiteboard, shared notes, and shared timer to collaborate on an academic problem with other participants. `AC-36.1`–`AC-36.3` and `FR-36.1`–`FR-36.3` define the three tools; `AC-36.4`/`FR-36.4` require updates to be synchronized for all participants.

The use case also covers the two conditional capabilities in `AC-36.5` and `AC-36.6`: whiteboard export only when supported, and shared notes that survive reconnection without data loss. These are supporting room capabilities, not a replacement for forum-based collaboration.

### B2. Preconditions

1. The student is authenticated with an active session.
2. The student has entered a Study Room or Hall Room session.
3. At least one other room participant is present for collaborative use of a shared tool.
4. The room configuration supports the selected tool; whiteboard support is required for export to be relevant.
5. The real-time collaboration service is available for synchronized updates.

### B3. Postconditions

1. **Success:** The selected shared tool is available to all room participants.
2. **Success:** Whiteboard, notes, and timer updates are synchronized for all participants.
3. **Success:** Shared notes are persisted during the session and restored without data loss after reconnection.
4. **Success:** Whiteboard content is exported when export is supported.
5. **Failure:** The tool remains unavailable or shows a clear synchronization/reconnection state without silently discarding shared notes.

### B4. Main Success Scenario (Basic Flow)

1. The student opens the room's tool area in an active session.
2. The system presents **Whiteboard**, **Notes**, and **Timer** in `RoomToolTabs`.
3. The student selects a tool.
4. The system opens the shared tool to the student and the other room participants.
5. The student edits whiteboard content, writes shared notes, or starts/pauses/resets the shared timer.
6. The system synchronizes each update for all room participants.
7. The system shows the current synchronization state through `ToolSyncIndicator` / `NotesSyncIndicator`.
8. The student finishes the tool use and continues the room session.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Export whiteboard content

At basic flow step 5, when export is supported, the student selects **Export whiteboard** (`ExportWhiteboardButton`). The system exports the current whiteboard content while leaving the shared whiteboard available to participants (`FR-36.5`, `AC-36.5`).

#### A2. Export not supported

At basic flow step 5, when whiteboard export is not supported, the system does not offer the export action and shows "Export is not supported for this room." as recommended in `hall_room.md`. No error is implied by the missing capability.

#### A3. Reconnect and restore notes

If the connection is interrupted during the session, the system shows "Connection interrupted. Restoring session…", attempts to restore the session, and confirms with "Shared notes restored." The shared notes must not lose data (`FR-36.6`, `AC-36.6`).

### B6. Exception Flows

#### E1. Synchronization not established

The system cannot synchronize the selected tool update for all participants. It reports the failure with "The live room could not be reached." or "The live room is unavailable." and preserves notes where possible (`FR-36.4`, `FR-36.5`, `AC-36.4`).

#### E2. Recovery cannot complete

The reconnection attempt does not complete. The system keeps the preserved notes where possible and shows the live-room failure notice rather than presenting an empty editor as a fresh session.

### B7. Business Rules

1. The room provides a shared whiteboard (`AC-36.1`, `FR-36.1`).
2. The room provides shared notes (`AC-36.2`, `FR-36.2`).
3. The room provides a shared timer (`AC-36.3`, `FR-36.3`).
4. Shared tool updates are synchronized for all room participants (`AC-36.4`, `FR-36.4`).
5. Whiteboard content can be exported only when export is supported (`AC-36.5`, `FR-36.5`).
6. Shared notes persist during the room session and handle reconnection without data loss (`AC-36.6`, `FR-36.6`).
7. Meeting rooms remain optional supporting features; the forum remains the primary collaboration space.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-7 | Optional supporting meeting-room tools must maintain an update latency of 1 second or less when a room is in use. |
| NFR-SCAL-6 | The architecture must support at least 100 concurrent optional meeting rooms. |
| NFR-USE-2 | The user interface must support responsive layouts for screen widths from 320 px to 1920 px. |
| NFR-USE-4 | Primary interface actions must use clear labels and recognizable controls. |
| NFR-USE-5 | The user interface must be usable on screen sizes of at least 320 px in width. |
| Design constraint | Shared notes must be preserved through reconnection without data loss, and whiteboard export is conditional on tool support. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Tool selection | Basic flow steps 2-4 |
| Whiteboard export | Basic flow step 5; alternative A1 and A2 |
| Synchronization status | Basic flow step 7; exception E1 |
| Reconnection and notes recovery | During any tool use; alternative A3 and exception E2 |

### B10. Interface and Data Notes

- **Screen/flow path:** `screen_flow.md` gives `Home -> Meeting` and `Meeting -> Hall Room` / `Meeting -> Study Room`. `feature_flow.md` gives `Lobby -> Trending/For you/Detail -> HallRoom` (via `Halls`) and `Lobby -> Trending/For you/Detail -> StudyRoom` (via `Hub`). `Halls` and `Hub` are flow-derived labels with no dedicated FR or AC.
- **Recommended components:** `RoomToolTabs`, `SharedWhiteboard`, `SharedNotesEditor`, `SharedTimer`, `ToolSyncIndicator` / `NotesSyncIndicator`, `ExportWhiteboardButton`, `ReconnectNotice`, and `SharedNotesRestoreState` are recommendations in `study_room.md` and `hall_room.md`, not mandated by an FR.
- **UI labels and exact messages:** **Whiteboard**, **Notes**, **Timer**, **Export whiteboard**, "Export is not supported for this room.", "Connection interrupted. Restoring session…", "Shared notes restored.", "The live room could not be reached.", and "The live room is unavailable." are quoted from the proposal recommendations.
- **Data fields:** `whiteboardState`, `notesContent`, `timerState`, `syncState`, `sessionState`, and `supportedTools` are recommended field names in `study_room.md` / `hall_room.md`; no database schema is specified for them.
- **Synchronization and recovery:** `FR-36.4`/`AC-36.4` require updates for all participants with the ≤ 1 second target from `NFR-PERF-7`; `FR-36.6`/`AC-36.6` require notes persistence and reconnection without data loss.
- **API endpoints/statuses/error codes:** Not specified in proposals. `API.md` has no tool endpoints, and `response_code.md` has no tool error codes; forum and authentication codes must not be assigned to room tools by analogy.
- **Notification/privacy rules:** Room invitations appear only when room notifications are enabled (`FR-38.3`, `AC-38.4`), and participant rosters are filtered by privacy settings (`NFR-PRIV-7`); these rules are outside UC-30's tool behavior.
- **Excluded legacy detail:** Fixed tables, seat assignments, invite codes, and 30-minute teardown are old PA2 details and are not current requirements.

### B11. Source Alignment Notes

- UC-07 A5, A6, and business rules 6-7 already describe shared tool use and notes recovery at a higher level; UC-30 details only the `US-36` requirements and does not restate room join, creation, or capacity rules.
- UC-05 has no shared-tool content; it contributes no overlap beyond the general statement that the forum remains the primary collaboration space.
- The named diagram actors are taken from `FR-36.1`–`FR-36.3` and `study_room.md` / `hall_room.md`; no supporting system actor is named for tools specifically.
- `study_room.md` and `hall_room.md` use slightly different failure copy ("The live room could not be reached." versus "The live room is unavailable."); both are preserved as source text, not merged into a new message.
- Routes, component names, and status indicators are UI/UX recommendations; `API.md` and `response_code.md` provide no room tool contract.
