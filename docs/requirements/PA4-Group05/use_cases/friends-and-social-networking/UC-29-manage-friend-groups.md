# UC-29 — Create and Manage Friend Groups

**Version:** `1.0`

**Performed by:** [Nguyen Chi Bao] | **Edited by:** [Nguyen Chi Bao]

| Field | Value |
| --- | --- |
| Use Case ID | UC-29 |
| Name | Create and Manage Friend Groups |
| Primary Actor | University Student |
| Supporting Actors | Group Owner; Group Member; Notification Service |
| Feature Group | Friends and Social Networking |
| Priority | Not explicitly stated (Not specified in proposals) |
| Related User Stories | US-33 |
| Related Requirements | `AC-33.1`, `AC-33.2`, `AC-33.3`, `AC-33.4`, `AC-33.5`, `FR-33.1`, `FR-33.2`, `FR-33.3`, `FR-33.4`, `FR-33.5`, `FR-33.6`, `AC-27.1`, `AC-27.2`, `AC-27.3`, `FR-27.1`, `FR-27.2`, `FR-27.3`, `FR-27.4`, `FR-27.5`, `FR-15.3`, `FR-15.5`, `FR-15.6`, `FR-10.4`, `AC-10.4`, `FR-38.2`, `AC-38.3`, `FR-39.1`, `FR-39.3`, `FR-39.5`, `AC-39.1`, `AC-39.3`, `FR-40.1`, `FR-40.2`, `FR-40.3`, `FR-40.4`, `AC-40.1`, `AC-40.2`, `AC-40.3`, `AC-40.4`, `NFR-SEC-1`, `NFR-SEC-3`, `NFR-SEC-4`, `NFR-SEC-5`, `NFR-SEC-6`, `NFR-SEC-8`, `NFR-PRIV-5`, `NFR-PRIV-6`, `NFR-PRIV-7`, `NFR-USE-2`, `NFR-USE-4`, `NFR-USE-5` |
| Source Documents | `proposals/userstory.md` (section 9.4); `proposals/functional_requirement.md` (US-33); `proposals/friend.md`; `proposals/friend_profile.md`; `proposals/group_detail.md`; `proposals/settings.md`; `proposals/overview.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md` |

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
    GroupOwner@{ shape: person, label: "Group Owner" }
    GroupMember@{ shape: person, label: "Group Member" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC29(["UC-29<br/>Create and Manage Friend Groups"])
    end

    Student --- UC29
    GroupOwner --- UC29
    GroupMember --- UC29
    NotifSvc --- UC29
    GroupOwner -- "generalization" --> Student
    GroupMember -- "generalization" --> Student

    class Student,GroupOwner,GroupMember actor
    class NotifSvc external
    class UC29 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | The US-33 actor who creates and manages a private or public friend group for classmates and project teams. |
| Group Owner | Secondary | A student with the `Owner` role who creates the group, may delete it, and is named by `FR-33.5`/`AC-33.4` for member removal. |
| Group Member | Secondary | A student with the `Member` role who can view members, invite others, message, share documents, and leave. |
| Notification Service | Supporting System | Routes group-invitation and social-activity notifications from `FR-38.2`; no notification endpoint is specified. |

### A3. Relationships
#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-29 Create and Manage Friend Groups | Primary | Creates a group or manages participation in a group. |
| Group Owner | UC-29 Create and Manage Friend Groups | Secondary | Configures the group and may remove members under the source-backed owner rule. |
| Group Member | UC-29 Create and Manage Friend Groups | Secondary | Uses group chat, documents, member list, invitations, and leave action. |
| Notification Service | UC-29 Create and Manage Friend Groups | Supporting | Routes invitation and social-activity notifications. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| Group Owner | University Student | Actor generalization | Inherits the student association and adds the `Owner` role. |
| Group Member | University Student | Actor generalization | Inherits the student association and adds the `Member` role. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named in the proposals. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | No condition is specified. | No distinct extending use case is named in the proposals. |

### A4. Model Notes

1. The model contains only UC-29 and its actors because no friend/group I-xx, E-xx, or G-xx use case is named in the proposals.
2. `screen_flow.md` gives `Friend Group -> Create Group`; `feature_flow.md` gives `Friend -> Create Group -> Privacy / Beginning member / Name`.
3. `group_detail.md` recommends `/friends/groups/:groupId`, `GroupDetailPage`, `GroupMessagePanel`, `SharedDocumentPanel`, and `GroupMemberPanel`; these are UI recommendations, not API contracts.
4. Exact roles are `Owner`, `Superuser`, and `Member`. The source conflict between owner removal and Superuser kick is recorded in B11 and is not silently resolved.
5. Privacy values are only `Private` and `Public`; no additional privacy level, capacity limit, invite expiry, or approval rule is specified.
6. Meeting-room rules are not copied into groups; the forum remains the primary collaboration space.

## Part B — Use Case Specification

### B1. Brief Description

A university student creates a private or public friend group by naming it, setting privacy, and choosing beginning members. Members then collaborate in `GroupDetailPage` by sending messages, sharing documents, viewing the member list, inviting new members, removing members where authorized, and leaving the group.

Group deletion is overview-derived from `overview.md` and owner-scoped as a recommendation. Group invitations have no specified approval step, expiration period, or automatic acceptance.

### B2. Preconditions

1. The student is authenticated with an active session (`NFR-SEC-1`).
2. The student can reach the Friend Group from Home (`screen_flow.md`).
3. For creation, the student supplies a group name and selects `Private` or `Public` (`FR-33.1`, `FR-33.2`, `AC-33.1`).
4. For management, the student is an authorized member of the group (`NFR-SEC-4`, `NFR-SEC-6`).
5. Invitees are available in the friend/user picker; no invite approval or expiry rule is assumed.
6. Sensitive communication uses TLS 1.2 or higher (`NFR-SEC-3`).

### B3. Postconditions

1. **Success:** A group exists with a name, `Private` or `Public` privacy, an owner, and initial members (`FR-33.1`, `FR-33.2`, `AC-33.1`).
2. **Success:** Members can send messages and share documents within the group (`FR-33.3`, `AC-33.2`).
3. **Success:** Members can view the member list and invite new members (`FR-33.4`, `AC-33.3`).
4. **Success:** An authorized role can remove a member, and any member can leave (`FR-33.5`, `FR-33.6`, `AC-33.4`, `AC-33.5`).
5. **Failure:** The group is not created or changed, private content is not exposed, and the user receives clear feedback without an invented error code.

### B4. Main Success Scenario (Basic Flow)

1. The student opens the Friend Group and selects **Create Group** (`screen_flow.md`).
2. The system opens `CreateGroupDialog` with `GroupNameInput`, optional `GroupDescriptionInput`, `GroupPrivacySelect`, and `BeginningMemberPicker`.
3. The student enters a group name and selects `Private` or `Public` (`FR-33.1`, `FR-33.2`, `AC-33.1`).
4. The student chooses beginning members from friends/users.
5. The student selects **Create group**.
6. The system validates the setup, creates the group with the student as `Owner`, and adds the chosen beginning members.
7. The new group appears in `GroupList` and `MyGroupsPanel`.
8. The student opens `GroupDetailPage`, which shows `GroupHeader`, `GroupPrivacyBadge`, `GroupMemberCountText`, chat, documents, and members.
9. The student sends a message with `GroupMessageInput` and **Send** (`FR-33.3`, `AC-33.2`).
10. The student uploads a document with **Upload document**; the system validates file type and size before acceptance (`FR-27.3`, `FR-15.3`, `NFR-SEC-5`).
11. The student opens `GroupMemberPanel` and views the member list with `Owner`, `Superuser`, or `Member` role badges (`FR-33.4`, `AC-33.3`).
12. The system enforces access so private-group content is visible to authorized members only (`NFR-SEC-4`, `NFR-SEC-6`, `NFR-PRIV-7`).

### B5. Alternative Flows

#### A1. Invite a member after creation

At basic flow step 11, a member selects **Invite member**, chooses users in `InviteMemberPicker`, and sends invitations. The system shows “Invitation sent.” (`FR-33.4`, `AC-33.3`, `group_detail.md`, recommendation).

#### A2. Remove a member

At basic flow step 11, the authorized role selects **Remove from group**. `RemoveMemberConfirmDialog` asks “Remove `<name>` from `<group>`?” with Cancel/Remove (`FR-33.5`, `AC-33.4`).

#### A3. Leave a group

The student selects **Leave group**. `LeaveGroupConfirmDialog` asks “Leave `<group>`?” with Cancel/Leave, and group content is no longer shown after confirmation (`FR-33.6`, `AC-33.5`, `feature_flow.md`).

#### A4. Join a permitted group

From `My Group`, a permitted user selects **Join group**. `JoinGroupNotice` says “Joining depends on the group's privacy setting.” No approval or expiry rule is assumed (`feature_flow.md`, `group_detail.md`).

#### A5. Delete a group

The `Owner` selects **Delete group**. `DeleteGroupConfirmDialog` says “Delete `<group>`? Messages and documents may be removed.” with Cancel/Delete (`overview.md`, `group_detail.md`, recommendation).

#### A6. Report inappropriate group behavior

A member opens `ReportBehaviorDialog` from chat or the member list, provides category and context, and submits. The system shows “Report submitted for review.” without promising a moderator outcome (`FR-40.1`–`FR-40.4`, `AC-40.1`–`AC-40.4`).

### B6. Exception Flows

No group API error codes are specified; the following are source-backed UI states rather than backend error contracts.

#### E1. Access denied

An unauthorized user opens a private group and sees “This group is private or you are not authorized to view it.” The system does not reveal group content (`NFR-SEC-4`, `NFR-SEC-6`, `group_detail.md`).

#### E2. Invalid uploaded file

The system shows “Unsupported file type” or “File does not meet size policy.” and does not accept the file (`FR-27.3`, `FR-15.3`, `NFR-SEC-5`). No numeric limit is asserted.

#### E3. Removal-right conflict

The system uses `GroupMemberRoleBadge` to expose `Owner`, `Superuser`, and `Member`, does not silently merge the owner and Superuser rules, and flags the conflict for a product decision (`FR-33.5`, `AC-33.4`, `feature_flow.md:145`).

#### E4. Invite approval or expiry expected

No approval step, expiration period, or automatic acceptance is defined. The system confirms only “Invitation sent.” and does not invent a state (`group_detail.md`).

#### E5. Group fails to load

The system shows “Unable to load this group.” with Retry (`group_detail.md`, recommendation); no group status code or error code is asserted.

### B7. Business Rules

1. A user can create a private or public friend group (`FR-33.1`, `AC-33.1`).
2. Group setup includes a name, privacy setting, and initial members (`FR-33.2`, `AC-33.1`, `feature_flow.md`).
3. Members can send messages and share documents within the group (`FR-33.3`, `AC-33.2`).
4. Members can view the member list and invite new members (`FR-33.4`, `AC-33.3`).
5. The written requirement assigns member removal to the group owner (`FR-33.5`, `AC-33.4`); the flow separately names a Superuser kick, and the conflict is not resolved here.
6. Members can leave the group (`FR-33.6`, `AC-33.5`).
7. Uploaded files must pass type and size validation before acceptance (`FR-27.3`, `FR-15.3`, `NFR-SEC-5`).
8. Shared-resource access follows the sharer's privacy setting (`FR-27.5`, `FR-15.5`, `NFR-PRIV-5`, `NFR-PRIV-7`).
9. Private-group content is restricted to authorized users, with server-side authorization checks (`NFR-SEC-4`, `NFR-SEC-6`).
10. Inappropriate behavior can be reported and routed to moderation (`FR-40.1`–`FR-40.4`, `AC-40.1`–`AC-40.4`).

### B8. Special Requirements
| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must use TLS 1.2 or higher. |
| NFR-SEC-4 | Private-group content must be restricted to authorized users. |
| NFR-SEC-5 | Uploaded files must be validated for file type and file size before acceptance. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-SEC-8 | The system must protect against common web vulnerabilities, including SQL injection, XSS, and CSRF. |
| NFR-PRIV-5 | Users must be able to control access to documents and learning resources they share. |
| NFR-PRIV-6 | Users must be able to control whether other users can send them messages or room invitations. |
| NFR-PRIV-7 | Privacy settings must apply consistently to member lists and search results. |
| NFR-USE-2 | The interface must support responsive layouts from 320 px to 1920 px. |
| NFR-USE-4 | Primary actions must use clear labels and recognizable controls. |
| NFR-USE-5 | The interface must be usable at screen widths of at least 320 px. |

### B9. Extension Points
| Extension Point | Location in Flow of Events |
| --- | --- |
| Group creation | Basic flow steps 1-7 |
| Group collaboration | Basic flow steps 8-11 |
| Invite member | Alternative A1 |
| Remove member | Alternative A2; exception E3 |
| Leave group | Alternative A3 |
| Join group | Alternative A4 |
| Delete group | Alternative A5 |
| Report behavior | Alternative A6 |
| Access and file validation | Basic flow steps 10 and 12; exceptions E1-E2 |

### B10. Interface and Data Notes

- **Screen/flow path (confirmed from proposals):** `screen_flow.md` gives `Home -> Friend Group -> Create Group`; `feature_flow.md` gives `Friend -> My Group -> Group / Leave / Join`, `Group -> Message / Document / List member / Leave`, and `Member -> Invite / Kick by superuser`; `overview.md` gives `Create / Delete Group (Private | Public)` and `Friend / Group -> Message / Material`.
- **Recommended routes and components:** `/friends/groups/:groupId`, `/friends/groups/new`, `CreateGroupDialog`, `GroupNameInput`, `GroupPrivacySelect`, `BeginningMemberPicker`, `GroupDetailPage`, `GroupHeader`, `GroupMessagePanel`, `SharedDocumentPanel`, `GroupMemberPanel`, `InviteMemberButton`, `RemoveMemberButton`, and `LeaveGroupButton` are UI recommendations from `friend.md` and `group_detail.md`.
- **Exact role and privacy values:** roles are `Owner`, `Superuser`, and `Member`; privacy is `Private` or `Public`. No source defines how `Superuser` is granted, and no source defines a group capacity limit.
- **Exact group fields:** `groupId`, `name`, `description`, `privacy`, `owner`, `memberCount`, `members`, `role`, `createdAt`, `lastActivityAt`, `messageId`, `messageText`, `messageSender`, `messageTime`, `documentId`, `documentName`, `documentType`, `documentSize`, `uploader`, `uploadedAt`, `inviteState`, and `reportContext` (`group_detail.md`).
- **Exact quoted UI text:** **Create group**, **Message the group**, **Send**, **Attach**, **Share material**, **Upload document**, **Invite member**, **Remove from group**, **Leave group**, **Delete group**, **Join group**, “Joining depends on the group's privacy setting.”, “Invitation sent.”, “Remove `<name>` from `<group>`?”, “Leave `<group>`?”, “Delete `<group>`? Messages and documents may be removed.”, “No messages yet.”, and “Report submitted for review.”
- **Privacy notices:** “This group is private or you are not authorized to view it.”, “Private group content is visible to authorized members only.”, “Access follows the privacy set by the person who shared this file.”, and “This material may also appear in the Learning Resource Library.” (`group_detail.md`).
- **File validation messages:** “Unsupported file type” and “File does not meet size policy.”; the source explicitly states no numeric limit (`FR-27.3`, `FR-15.3`, `NFR-SEC-5`).
- **Friend/profile boundary:** friend-request statuses `None`, `Pending`, `Accepted`, `Declined`, and `Blocked` and the 200-character request-note limit belong to UC-27/UC-28; group invitations have no specified status, approval, expiry, or note limit.
- **API endpoints, statuses, and error codes:** Not specified in proposals. No group route, HTTP status, or error code is asserted, and generic banners such as “Unable to load this group.” are recommendations.
- **Notification/privacy rules:** Invitation and social-activity notifications follow `FR-38.2`/`AC-38.3`; mute and block follow `FR-39.3`/`AC-39.1`; privacy enforcement follows `NFR-PRIV-5`, `NFR-PRIV-6`, and `NFR-PRIV-7`.

### B11. Source Alignment Notes

- There is no dedicated PA3 friend/group UC; UC-29 is derived from US-33, the friend/group flows, and UI recommendations in `friend.md`, `friend_profile.md`, and `group_detail.md`.
- No friend/group API endpoints or error codes are defined in `API.md` or `response_code.md`; group creation, messaging, documents, invitations, removal, leave, and delete have no specified backend contract.
- The source conflicts on whether the group owner or Superuser removes members: `FR-33.5`/`AC-33.4` name the group owner, while `feature_flow.md:145` says Superuser kicks. `GroupMemberRoleBadge` exposes `Owner`, `Superuser`, and `Member`, but no source defines how `Superuser` is assigned.
- `AC-33.4` says “Owner Controls”, but `friend.md` and `group_detail.md` recommend showing removal only to the owner/superuser; this document keeps the written requirement and flags the conflict rather than merging roles.
- Group deletion is overview-derived from `overview.md`, not defined in `FR-33.1`–`FR-33.6`; owner scope and warning text are recommendations only.
- `FR-33.3`/`AC-33.2` cover sending messages only; no group message edit, delete, reaction, or read-receipt rule is defined.
- `FR-33.4`/`AC-33.3` cover invitations only; no invite approval step, expiration period, or automatic acceptance is asserted.
- `group_detail.md` explicitly excludes meeting-room rules; room creation, configuration, join requests, tools, and hand-wave behavior are not transferred to friend groups.
- `settings.md` contributes communication and privacy controls for mute, block, and direct-message restriction; it does not add group API behavior.
- Routes, component names, badges, dialogs, and quoted messages in `friend.md`, `friend_profile.md`, and `group_detail.md` are UI/UX recommendations derived from proposals, except where an exact FR or AC is cited above.
