# UC-28 — Manage Friend Requests

**Version:** `1.0`

**Performed by:** [Nguyen Chi Bao] | **Edited by:** [Nguyen Chi Bao]

| Field | Value |
| --- | --- |
| Use Case ID | UC-28 |
| Name | Manage Friend Requests |
| Primary Actor | User |
| Supporting Actors | Friend Request Sender; Notification Service |
| Feature Group | Friends and Social Networking |
| Priority | Not explicitly stated (Not specified in proposals) |
| Related User Stories | US-32 |
| Related Requirements | `AC-32.1`, `AC-32.2`, `AC-32.3`, `FR-32.1`, `FR-32.2`, `FR-32.3`, `FR-32.4`, `FR-32.5`, `AC-31.4`, `FR-31.4`, `FR-38.2`, `AC-38.3`, `FR-39.1`, `FR-39.3`, `FR-39.5`, `AC-39.1`, `AC-39.3`, `NFR-PRIV-2`, `NFR-PRIV-7`, `NFR-SEC-1`, `NFR-SEC-3`, `NFR-SEC-6` |
| Source Documents | `proposals/userstory.md` (section 9.3); `proposals/functional_requirement.md` (US-32); `proposals/friend.md`; `proposals/friend_profile.md`; `proposals/group_detail.md`; `proposals/settings.md`; `proposals/overview.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md` |

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
    Sender@{ shape: person, label: "Friend Request Sender" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC28(["UC-28<br/>Manage Friend Requests"])
    end

    User --- UC28
    Sender --- UC28
    NotifSvc --- UC28
    Sender -- "generalization" --> User

    class User,Sender actor
    class NotifSvc external
    class UC28 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| User | Primary | The US-32 actor who accepts or rejects incoming friend requests to control social connections. |
| Friend Request Sender | Secondary | The member who sent the request, receives the outcome notification, and may be added to the friend list. |
| Notification Service | Supporting System | Routes the acceptance or decline notification required by `FR-32.5` and `FR-31.4`; no notification endpoint is specified. |

### A3. Relationships
#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| User | UC-28 Manage Friend Requests | Primary | Reviews incoming requests and accepts, declines, or blocks future requests. |
| Friend Request Sender | UC-28 Manage Friend Requests | Secondary | Is added to the friend list on acceptance or notified on decline. |
| Notification Service | UC-28 Manage Friend Requests | Supporting | Delivers the accepted or declined outcome to the sender. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| Friend Request Sender | User | Actor generalization | The sender is also a user and inherits the general user association while adding the sender role. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named in the proposals. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | No condition is specified. | No distinct extending use case is named in the proposals. |

### A4. Model Notes

1. The model contains only UC-28 and its actors because no friend/group I-xx, E-xx, or G-xx use case is named in the proposals.
2. `screen_flow.md` gives `Friend Group -> Friend Request`; `feature_flow.md` gives `Friend -> FriendRequest -> FriendItem`.
3. `friend.md` recommends `FriendRequestCenter`, `IncomingRequestList`, `OutgoingRequestList`, `AcceptRequestButton`, `RejectRequestButton`, and `BlockFutureRequestsToggle`; these are UI recommendations.
4. Request states are `None`, `Pending`, `Accepted`, `Declined`, and `Blocked`; UC-28 changes `Pending` to one of the three outcome states.
5. Accepting adds the sender to the friend list (`FR-32.2`, `AC-32.2`); declining removes the pending request (`FR-32.3`, `AC-32.2`).
6. Blocking future requests is a decline-path option (`FR-32.4`, `AC-32.3`) and is also reflected in communication settings (`settings.md`).

## Part B — Use Case Specification

### B1. Brief Description

A user opens a centralized request center to review incoming friend requests with profile details and notes. The user can accept a request, which adds the sender to the friend list, or decline it, which removes the pending request. When declining, the user can block future requests from that sender, and the sender is notified of the outcome.

UC-28 begins after UC-27 has created a `Pending` request. It does not cover sending requests, direct messaging, or group membership.

### B2. Preconditions

1. The user is authenticated with an active session (`NFR-SEC-1`).
2. At least one incoming request with status `Pending` is available, or the request center shows an empty state.
3. The user can view the sender's profile details allowed by privacy settings (`FR-10.4`, `NFR-PRIV-7`).
4. The user permits incoming friend requests or has an existing pending request to decide (`NFR-PRIV-2`).
5. Sensitive communication uses TLS 1.2 or higher (`NFR-SEC-3`).

### B3. Postconditions

1. **Success:** On acceptance, the sender is added to the friend list and the request status becomes `Accepted`.
2. **Success:** On decline, the pending request is removed or shown as `Declined` and the status becomes `Declined`.
3. **Success:** If the user selected the block option, future requests from the sender are blocked and the status is `Blocked`.
4. **Success:** The sender is notified of the accepted or declined outcome (`FR-32.5`, `FR-31.4`).
5. **Failure:** The request remains `Pending`, no friend connection is created, and the user receives clear feedback.

### B4. Main Success Scenario (Basic Flow)

1. The user opens the Friend Group from Home.
2. The user selects the **Friend Requests** tab or `FriendRequestsTab`.
3. The system opens `FriendRequestCenter` with `IncomingRequestList` and `OutgoingRequestList`.
4. The system displays each incoming request with sender avatar/name, academic context, note, sent time, and status `Pending`.
5. The user reviews the request note of at most 200 characters.
6. The user selects **Accept**.
7. The system verifies that the request is still `Pending` and that the user is authorized to decide it (`NFR-SEC-6`).
8. The system adds the sender to the friend list and changes the status to `Accepted` (`FR-32.2`, `AC-32.2`).
9. The Notification Service notifies the sender of acceptance (`FR-32.5`, `FR-31.4`).
10. The user sees confirmation feedback, and the sender's profile now offers friend actions instead of a pending request.

### B5. Alternative Flows

#### A1. Decline a request

At basic flow step 6, the user selects **Decline**. The system removes the pending request, sets the status to `Declined`, and notifies the sender (`FR-32.3`, `AC-32.2`, `FR-32.5`).

#### A2. Decline and block future requests

At basic flow step 6, the user enables “Block future requests from this user.” before selecting **Decline**. The request becomes `Blocked`, and future requests from that sender are prevented (`FR-32.4`, `AC-32.3`).

#### A3. Manage from the sender's profile

At basic flow step 4, the user opens `FriendProfilePage` from the request card. `AcceptRequestButton` and `RejectRequestButton` perform the same decision with the same status and notification rules (`friend_profile.md`).

#### A4. No incoming requests

At basic flow step 4, the list is empty. The system shows an appropriate empty state and keeps the request center available.

#### A5. Mark request notification as read

After a decision, the user selects **Mark as read** on the social notification (`FR-38.6`, `settings.md`).

### B6. Exception Flows

No friend/group-specific error codes are specified; the following are source-backed UI states rather than backend error contracts.

#### E1. Stale or already decided request

The request is no longer `Pending`. The system does not add a duplicate friend connection and refreshes the request list.

#### E2. Unauthorized decision attempt

The backend denies the action through server-side authorization checks and does not change the request status (`NFR-SEC-6`, `FR-39.5`).

#### E3. Notification delivery failure

The accepted, declined, or blocked state remains in effect; no friend error code is assigned because none is defined.

#### E4. Request center fails to load

The system shows “Unable to load friends or groups.” with Retry (`friend.md`, recommendation); no endpoint or status code is asserted.

#### E5. Sender is blocked or restricted

The system preserves the `Blocked` state and shows “You cannot interact with this member.” where interaction controls would appear (`friend_profile.md`).

### B7. Business Rules

1. A centralized view must display incoming friend requests (`FR-32.1`, `AC-32.1`).
2. Accepting adds the sender to the friend list (`FR-32.2`, `AC-32.2`).
3. Declining removes the pending request (`FR-32.3`, `AC-32.2`).
4. When declining, the user can block future requests from the sender (`FR-32.4`, `AC-32.3`).
5. The sender is notified when a request is accepted or rejected (`FR-32.5`).
6. The exact request statuses are `None`, `Pending`, `Accepted`, `Declined`, and `Blocked` (`friend_profile.md`).
7. Request notes are limited to 200 characters (`AC-31.3`, `friend.md`, `friend_profile.md`).
8. Users can allow or reject incoming friend requests (`NFR-PRIV-2`) and mute or block specific members (`FR-39.3`, `AC-39.1`).
9. Communication and privacy settings must prevent interactions the user does not permit (`FR-39.5`, `NFR-SEC-6`).

### B8. Special Requirements
| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must use TLS 1.2 or higher. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-PRIV-2 | Users must be able to allow or reject incoming friend requests. |
| NFR-PRIV-7 | Privacy settings must apply consistently to member lists and search results. |
| Design constraint | A decision must be applied once to a `Pending` request; duplicate acceptance, duplicate friend connections, and error-code-derived messages are not defined. |

### B9. Extension Points
| Extension Point | Location in Flow of Events |
| --- | --- |
| Request center entry | Basic flow steps 1-3 |
| Accept action | Basic flow step 6; alternative A3 |
| Decline action | Alternative A1 |
| Block future requests | Alternative A2; exception E5 |
| Outcome notification | Basic flow step 9; alternative A1; exception E3 |
| Notification read state | Alternative A5 |

### B10. Interface and Data Notes

- **Screen/flow path (confirmed from proposals):** `screen_flow.md` gives `Home -> Friend Group -> Friend Request`; `feature_flow.md` gives `Friend -> FriendRequest -> FriendItem`; `friend.md` recommends `FriendRequestsTab`, `FriendRequestCenter`, `IncomingRequestList`, and `OutgoingRequestList`.
- **Recommended components:** `FriendRequestCard`, `RequestNoteText`, `AcceptRequestButton`, `RejectRequestButton`, `BlockFutureRequestsToggle`, `RequestStatusBadge`, `RequestNotificationBadge`, and `FriendToastHost` are UI recommendations from `friend.md` and `friend_profile.md`.
- **Exact request fields and statuses:** `requestId`, `sender`, `recipient`, `note`, `status`, `sentAt`, `notificationState`; exact statuses are `None`, `Pending`, `Accepted`, `Declined`, and `Blocked`.
- **Exact quoted UI text:** **Friend Requests**, **Accept**, **Decline**, “Block future requests from this user.”, “Friend request accepted/declined.”, “Your friend request was accepted/declined.”, “Friend request already sent.”, **Mark as read**, and “Unable to load friends or groups.” with Retry.
- **Request note display:** `RequestNoteText` shows the introductory note with a maximum of 200 characters (`FR-31.3`, `AC-31.3`). Hidden profile fields must not leak into request cards (`NFR-PRIV-7`).
- **Settings linkage:** `FriendRequestPermissionSelect` offers **Allow / Reject incoming friend requests**; `MutedUsersList` and `BlockedUsersList` reflect communication controls (`settings.md`, `FR-39.1`, `FR-39.3`, `FR-39.5`).
- **API endpoints, statuses, and error codes:** Not specified in proposals. No friend-request decision route, HTTP status, or error code is asserted.
- **Notification/privacy rules:** Sender notification is a confirmed requirement (`FR-32.5`, `FR-31.4`, `FR-38.2`); badge, toast, and empty-state wording is recommended UI copy.

### B11. Source Alignment Notes

- There is no dedicated PA3 friend/group UC; UC-28 is derived from US-32 and the request-center recommendations in `friend.md` and `friend_profile.md`.
- No friend/group API endpoints or error codes are defined in `API.md` or `response_code.md`; accept, decline, and block have requirements but no specified backend contract.
- The source conflicts on whether the group owner or Superuser removes members: `FR-33.5`/`AC-33.4` name the group owner, while `feature_flow.md:145` says Superuser kicks. This conflict is outside UC-28 but affects the same friend/group feature family.
- `AC-32.2` groups accept and decline together, while `FR-32.2` and `FR-32.3` state them separately; the flow separates them while preserving both exact requirements.
- `friend.md` lists `Pending`, `Accepted`, `Declined`, and `Blocked`; `friend_profile.md` adds `None`. All five exact statuses are preserved here.
- `FR-32.5` requires sender notification for acceptance or rejection, but no notification endpoint or delivery guarantee is specified in `API.md`.
- `settings.md` adds **Allow / Reject incoming friend requests** as a communication-setting UI grouping of `FR-39.1`/`FR-39.5` and `NFR-PRIV-2`; it does not define a separate decision API.
- UC-28 does not cancel outgoing requests; `CancelOutgoingRequestButton` in `friend.md` is explicitly a recommendation.
