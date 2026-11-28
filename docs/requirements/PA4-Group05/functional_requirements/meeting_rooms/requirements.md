# Supporting Meeting Rooms (Secondary)

**Version:** `1.1`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

[Back to functional requirements index](../../functional_requirement.md)

> Meeting rooms are optional supporting features. They do not replace the forum as the primary collaboration space.

> Status: `Complete` = source-backed implementation exists; `Partial` = supporting code exists but the full requirement is not implemented; `Not implemented` = no source-backed implementation was found.

### US-34: Receive Room Recommendations

**As a** university student, **I want to** receive optional study-room recommendations, **so that** I can find a room when I need live collaboration.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-34.1 (Optional Room Recommendations)** | The system shall provide optional recommendations for study rooms. | UI, Frontend, Backend | Not implemented |
| **FR-34.2 (Recommendation Factors)** | Room recommendations shall consider the user's courses, interests, and preferred study times. | Backend | Not implemented |
| **FR-34.3 (Room Availability)** | The system shall display room availability and capacity. | UI, Frontend, Backend | Not implemented |
| **FR-34.4 (Dismiss Room Recommendation)** | The system shall allow users to dismiss irrelevant room suggestions. | UI, Frontend, Backend | Not implemented |

### US-35: Join or Create a Study Room

**As a** university student, **I want to** join or create a study room, **so that** I can collaborate with classmates in real time when needed.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-35.1 (Browse Public Rooms)** | The system shall allow a user to browse available public study rooms. | UI, Frontend, Backend | Not implemented |
| **FR-35.2 (Join Public Room)** | The system shall allow a user to join a public room with available capacity. | UI, Frontend, Backend | Not implemented |
| **FR-35.3 (Request Private Room)** | The system shall allow a user to request access to a private or custom room. | UI, Frontend, Backend | Not implemented |
| **FR-35.4 (Manage Join Requests)** | The system shall allow a room owner or manager to accept or reject join requests. | UI, Frontend, Backend | Not implemented |
| **FR-35.5 (Create Room)** | The system shall allow a user to create a study room with a name, description, privacy level, and supported tools. | UI, Frontend, Backend | Not implemented |
| **FR-35.6 (Configure Room)** | The system shall allow room managers to configure capacity, duration, and communication rules. | UI, Frontend, Backend | Not implemented |

### US-36: Use Shared Study Tools

**As a** university student, **I want to** use shared study tools in a room, **so that** I can collaborate on academic problems with other participants.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-36.1 (Shared Whiteboard)** | The system shall provide a shared whiteboard for room participants. | UI, Frontend, Backend | Not implemented |
| **FR-36.2 (Shared Notes)** | The system shall provide shared notes for room participants. | UI, Frontend, Backend | Not implemented |
| **FR-36.3 (Shared Timer)** | The system shall provide a shared timer for room participants. | UI, Frontend, Backend | Not implemented |
| **FR-36.4 (Tool Synchronization)** | The system shall synchronize shared tool updates for all room participants. | Frontend, Backend | Not implemented |
| **FR-36.5 (Whiteboard Export)** | The system shall allow users to export whiteboard content when supported. | Frontend | Not implemented |
| **FR-36.6 (Reconnection Recovery)** | The system shall persist shared notes during the room session and handle reconnection without data loss. | Frontend, Backend | Not implemented |

### US-37: Request Learning Help

**As a** university student, **I want to** request learning help, **so that** I can receive assistance from friends, room participants, or concept learners.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-37.1 (Create Help Request)** | The system shall allow a learner to create a help request. | UI, Frontend, Backend | Not implemented |
| **FR-37.2 (Help Recipients)** | The system shall allow the learner to send the help request to friends, room participants, or concept learners. | UI, Frontend, Backend | Not implemented |
| **FR-37.3 (Help Response)** | The system shall allow other learners to accept or decline a help request. | UI, Frontend, Backend | Not implemented |
| **FR-37.4 (Cancel Help Request)** | The system shall allow the requester to cancel the help request. | UI, Frontend, Backend | Not implemented |
| **FR-37.5 (Convert to Forum Post)** | The system shall allow a help request to be converted into a forum post for asynchronous discussion. | UI, Frontend, Backend | Not implemented |
| **FR-37.6 (Help Rate Limit)** | The system shall rate-limit help requests to prevent spam. | Backend | Not implemented |
