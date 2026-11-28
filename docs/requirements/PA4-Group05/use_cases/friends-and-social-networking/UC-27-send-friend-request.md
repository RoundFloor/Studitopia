# UC-27 — Send Friend Request

**Version:** `1.0`

**Performed by:** [Nguyen Chi Bao] | **Edited by:** [Nguyen Chi Bao]

| Field | Value |
| --- | --- |
| Use Case ID | UC-27 |
| Name | Send Friend Request |
| Primary Actor | University Student |
| Supporting Actors | Friend Request Recipient; Notification Service |
| Feature Group | Friends and Social Networking |
| Priority | Not explicitly stated (Not specified in proposals) |
| Related User Stories | US-31 |
| Related Requirements | `AC-31.1`, `AC-31.2`, `AC-31.3`, `AC-31.4`, `FR-31.1`, `FR-31.2`, `FR-31.3`, `FR-31.4`, `FR-38.2`, `AC-38.3`, `FR-39.1`, `FR-39.3`, `FR-39.5`, `AC-39.1`, `AC-39.3`, `NFR-PRIV-2`, `NFR-PRIV-7`, `NFR-SEC-1`, `NFR-SEC-3`, `NFR-SEC-6` |
| Source Documents | `proposals/userstory.md` (section 9.2); `proposals/functional_requirement.md` (US-31); `proposals/friend.md`; `proposals/friend_profile.md`; `proposals/group_detail.md`; `proposals/settings.md`; `proposals/overview.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md` |

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
    Recipient@{ shape: person, label: "Friend Request Recipient" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC27(["UC-27<br/>Send Friend Request"])
    end

    Student --- UC27
    Recipient --- UC27
    NotifSvc --- UC27
    Recipient -- "generalization" --> Student

    class Student,Recipient actor
    class NotifSvc external
    class UC27 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | The US-31 actor who sends a friend request to maintain a connection for future learning activities. |
| Friend Request Recipient | Secondary | The other member who receives the request and may later accept, decline, or block under UC-28. |
| Notification Service | Supporting System | Delivers the social notification required by `FR-31.4` and `AC-31.4`; no notification endpoint is specified. |

### A3. Relationships
#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-27 Send Friend Request | Primary | Starts the request from a profile card or member list and optionally writes a note. |
| Friend Request Recipient | UC-27 Send Friend Request | Secondary | Receives the request and notification. |
| Notification Service | UC-27 Send Friend Request | Supporting | Routes the friend-request notification to the recipient. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| Friend Request Recipient | University Student | Actor generalization | The recipient is another university student and inherits the general student association while adding the recipient role. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named in the proposals. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | No condition is specified. | No distinct extending use case is named in the proposals. |

### A4. Model Notes

1. The model contains only UC-27 and its actors because no friend/group I-xx, E-xx, or G-xx use case is named in the proposals.
2. `FR-31.1`/`AC-31.1` allow the request trigger from profile cards or member lists; `feature_flow.md` names the stranger action **Make Friend**.
3. The recipient notification is a requirement, but `friend.md` and `friend_profile.md` define no notification API and no friend error codes.
4. Request relationship states are `None`, `Pending`, `Accepted`, `Declined`, and `Blocked` (`friend_profile.md`); UC-27 creates or prevents `Pending` and does not decide the outcome.
5. Duplicate prevention and the 200-character note limit are backend and frontend rules, not merely visual suggestions (`FR-31.2`, `FR-31.3`, `AC-31.2`, `AC-31.3`).

## Part B — Use Case Specification

### B1. Brief Description

A university student wants to connect with another member for future learning activities. The student selects **Add friend**, **Send friend request**, or the flow-derived **Make Friend** from a profile card, member list, or friend profile, optionally writes an introductory note of at most 200 characters, and submits the request. The system prevents duplicate requests and notifies the recipient.

The recipient's decision is handled by UC-28 Manage Friend Requests. Successful sending changes the sender's view of the relationship to `Pending`; it does not create a confirmed friendship until the recipient accepts.

### B2. Preconditions

1. The sender is authenticated with an active session (`NFR-SEC-1`).
2. The sender can view the target profile card, member list entry, or friend profile.
3. The relationship state is `None`, not `Pending`, `Accepted`, `Declined`, or `Blocked`.
4. The recipient permits incoming friend requests (`NFR-PRIV-2`, `FR-39.1`, `FR-39.5`).
5. The recipient has not muted or blocked the sender from friend requests (`FR-39.3`, `AC-39.1`).
6. Sensitive communication uses TLS 1.2 or higher (`NFR-SEC-3`).

### B3. Postconditions

1. **Success:** A friend request is stored with sender, recipient, note, sent time, and status `Pending`.
2. **Success:** The recipient is notified of the friend request (`FR-31.4`, `AC-31.4`, `FR-38.2`).
3. **Success:** The sender's relationship state shows `Pending`, and further send actions are blocked for that pair.
4. **Failure:** No request is stored, the status remains `None` or the existing status is unchanged, and the sender receives clear feedback.

### B4. Main Success Scenario (Basic Flow)

1. The student opens a friend profile, profile card, or member list from the Friend Group area.
2. The system shows the relationship state `None` and an available `SendFriendRequestButton` or `MakeFriendButton`.
3. The student selects **Add friend**, **Send friend request**, or **Make Friend**.
4. The system opens `SendRequestDialog` with a recipient summary and `RequestNoteInput`.
5. The system displays the label **Message**, placeholder “Introduce yourself”, and counter `0/200`.
6. The student optionally types a note of at most 200 characters (`FR-31.3`, `AC-31.3`).
7. The system checks that no active request already exists between the pair (`FR-31.2`, `AC-31.2`).
8. The student selects **Send request**.
9. The system validates the note length and recipient permission, creates the request with status `Pending`, and records `sentAt`.
10. The Notification Service notifies the recipient (`FR-31.4`, `AC-31.4`, `FR-38.2`).
11. The sender sees `Pending` on `RequestStatusBadge`, and the request appears in `OutgoingRequestList`.

### B5. Alternative Flows

#### A1. Send from a profile card

At basic flow step 1, the student uses `FriendProfileCard` in Find Friends or Recommended. The same dialog and validation apply (`AC-31.1`, `friend.md`).

#### A2. Send from a friend item for a stranger

At basic flow step 3, the student uses the flow-derived **Make Friend** action from a stranger's friend item (`feature_flow.md`).

#### A3. Cancel composition

At basic flow step 8, the student selects **Cancel**. `SendRequestDialog` closes and no request is created (`friend.md`, recommendation).

#### A4. Existing pending request

At basic flow step 3 or 7, an active request already exists. The system shows “Friend request already sent.” and disables sending (`FR-31.2`, `AC-31.2`, `friend.md`, `friend_profile.md`).

#### A5. Recipient rejects incoming requests by setting

At basic flow step 7, the recipient's communication setting rejects incoming friend requests. The send action is not offered or is denied (`NFR-PRIV-2`, `FR-39.5`).

### B6. Exception Flows

No friend/group-specific error codes are specified; the following are source-backed UI states rather than backend error contracts.

#### E1. Note exceeds 200 characters

The live counter exceeds `0/200` and the system blocks submission until the note is shortened (`AC-31.3`, `friend_profile.md`).

#### E2. Duplicate request race

The system does not create a second request and preserves the existing `Pending` state (`FR-31.2`, `AC-31.2`).

#### E3. Relationship is `Blocked`

The system shows “You cannot interact with this member.” and disables request controls (`friend_profile.md`, `FR-39.3`, `FR-39.5`).

#### E4. Notification delivery failure

The request remains `Pending`; notification behavior is not rolled back or assigned a friend error code because none is defined.

#### E5. Profile or action fails to load

The system shows “Unable to load this profile.” with Retry (`friend_profile.md`, recommendation); no endpoint or status code is asserted.

### B7. Business Rules

1. A user can send a friend request to another user (`FR-31.1`).
2. Requests can be triggered from profile cards or member lists (`AC-31.1`).
3. Duplicate requests between the same users are prevented (`FR-31.2`, `AC-31.2`).
4. The sender may attach a short introductory note (`FR-31.3`, `AC-31.3`).
5. The note is limited to 200 characters, represented by a `0/200` counter (`friend.md`, `friend_profile.md`).
6. The recipient is notified of the friend request (`FR-31.4`, `AC-31.4`).
7. The request status values are `None`, `Pending`, `Accepted`, `Declined`, and `Blocked` (`friend_profile.md`).
8. Incoming friend requests may be allowed or rejected by the recipient (`NFR-PRIV-2`, `FR-39.1`, `FR-39.5`).
9. Blocked interactions must be prevented server-side, not only by hiding controls (`NFR-SEC-6`, `FR-39.5`).

### B8. Special Requirements
| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must use TLS 1.2 or higher. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-PRIV-2 | Users must be able to allow or reject incoming friend requests. |
| NFR-PRIV-7 | Privacy settings must apply consistently to member lists and search results. |
| Design constraint | The request note must accept at most 200 characters, and duplicate requests must be prevented for the same pair. |

### B9. Extension Points
| Extension Point | Location in Flow of Events |
| --- | --- |
| Profile-card request trigger | Basic flow step 1; alternative A1 |
| Flow-derived **Make Friend** trigger | Basic flow step 3; alternative A2 |
| Duplicate request state | Basic flow steps 3 and 7; alternative A4; exception E2 |
| Recipient permission check | Basic flow steps 7-9; alternative A5 |
| Notification delivery | Basic flow step 10; exception E4 |
| Handoff to UC-28 | After basic flow step 11, when the recipient manages the request |

### B10. Interface and Data Notes

- **Screen/flow path (confirmed from proposals):** `screen_flow.md` gives `Home -> Friend Group -> Friend Request`; `feature_flow.md` gives `Friend -> FriendRequest -> FriendItem` and `FriendItem -> Stranger -> Make Friend`; `friend.md` recommends `FindFriendsTab`, `FriendProfilePage`, and `SendRequestDialog`.
- **Recommended routes and components:** `/friends/users/:userId`, `/friends/users/:userId/request`, `SendFriendRequestButton`, `RequestNoteInput`, `SubmitFriendRequestButton`, `CancelFriendRequestButton`, `DuplicateRequestState`, `RequestStatusBadge`, and `OutgoingRequestList` are UI recommendations from `friend.md` and `friend_profile.md`, not confirmed API contracts.
- **Exact request data fields:** `requestId`, `sender`, `recipient`, `note`, `status`, `sentAt`, and `notificationState` (`friend.md`); `friend_profile.md` uses `requestNote` for the note field. Confirmed statuses are `None`, `Pending`, `Accepted`, `Declined`, and `Blocked`.
- **Exact quoted UI text:** **Message**, “Introduce yourself”, `0/200`, **Add friend**, **Send friend request**, **Make Friend**, **Send request**, **Cancel**, “Friend request already sent.”, “Friend request accepted/declined.”, “Your friend request was accepted/declined.”, and “You cannot interact with this member.”
- **Privacy notices:** “Some information is hidden by this member's privacy settings.” and “Direct messages may be limited to confirmed friends.” are source-backed notices on the viewed profile (`friend_profile.md`).
- **API endpoints, statuses, and error codes:** Not specified in proposals. No friend-request route, HTTP status, or error code is asserted; UI error banners are recommendations.
- **Notification/privacy rules:** Recipient notification is a confirmed requirement (`FR-31.4`, `AC-31.4`, `FR-38.2`). Recipient opt-out, mute, and block are confirmed controls (`NFR-PRIV-2`, `FR-39.3`, `FR-39.5`); badge and toast wording is recommended UI copy.

### B11. Source Alignment Notes

- There is no dedicated PA3 friend/group UC; UC-27 is derived from US-31 and the friend/profile UI specifications rather than from an existing UC file.
- No friend/group API endpoints or error codes are defined in `API.md` or `response_code.md`; duplicate prevention and notification are requirements without a specified backend contract.
- The source conflicts on whether the group owner or Superuser removes members: `FR-33.5`/`AC-33.4` name the group owner, while `feature_flow.md:145` says Superuser kicks. This conflict is outside UC-27 but affects the same friend/group feature family.
- `friend.md` lists `Pending`, `Accepted`, `Declined`, and `Blocked`; `friend_profile.md` adds `None`. All five exact statuses are preserved here.
- `friend.md` says “Your friend request was accepted/declined.” while `friend_profile.md` says “Friend request accepted/declined.” Both are retained as distinct quoted UI text.
- `FR-31.3`/`AC-31.3` state the short note and 200-character limit; component names, placeholder, and counter format are recommendations that make the limit visible.
- `FR-38.2`/`AC-38.3` cover social notifications, but no notification endpoint or delivery guarantee is specified for friend requests.
- `settings.md` defines `FriendRequestPermissionSelect` with **Allow / Reject incoming friend requests**; this is a UI grouping of `FR-39.1`/`FR-39.5` and `NFR-PRIV-2`, not an additional API rule.
