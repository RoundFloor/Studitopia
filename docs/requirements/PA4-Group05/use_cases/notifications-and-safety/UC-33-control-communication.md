# UC-33 — Control Communication

**Version:** `1.0`

**Performed by:** [Tran Canh Anh Tuan] | **Edited by:** [Tran Canh Anh Tuan]

| Field | Value |
| --- | --- |
| Use Case ID | UC-33 |
| Name | Control Communication |
| Primary Actor | User |
| Supporting Actors | None |
| Feature Group | Notifications and Safety |
| Priority | Not explicitly stated |
| Related User Stories | US-39 |
| Related Requirements | AC-39.1, AC-39.2, AC-39.3; FR-39.1, FR-39.2, FR-39.3, FR-39.4, FR-39.5; NFR-SEC-1, NFR-SEC-3, NFR-SEC-6, NFR-SEC-8, NFR-SEC-9, NFR-PRIV-2, NFR-PRIV-6, NFR-PRIV-7 |
| Source Documents | `proposals/userstory.md` (sections 11.2-11.3); `proposals/functional_requirement.md` (US-39); `proposals/settings.md`; `proposals/friend.md`; `proposals/friend_profile.md`; `proposals/group_detail.md`; `proposals/moderation_queue.md`; `proposals/non_functional_requirement.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC33(["UC-33<br/>Control Communication"])
    end

    User --- UC33

    class User actor
    class UC33 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| User | Primary | A registered user who controls communication and privacy settings so that other users cannot interact in unpermitted ways (US-39). |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| User | UC-33 Control Communication | Primary | Opens Settings and configures permitted interactions, restrictions, muted members, and blocked members. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | The proposals do not name an actor generalization or use-case specialization for US-39. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | The proposals do not name a distinct included use case for US-39. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | The proposals do not name a distinct extending use case for US-39. |

### A4. Model Notes

1. UC-33 is derived solely from US-39; no I-xx, E-xx, or G-xx identifier is introduced.
2. The User actor is taken directly from the US-39 story wording "As a user".
3. No supporting system actor is drawn because the proposals name no external system for communication settings.
4. Settings is an aggregate hub in `settings.md`; Communication Settings is treated as a section of that hub, not as a separate use case.

## Part B — Use Case Specification

### B1. Brief Description

The user controls who may communicate with them and which interactions are permitted. US-39 requires block and mute controls for messaging, friend requests, and room invitations, restriction of direct messages to confirmed friends, and the ability to change communication and privacy settings at any time. The successful outcome is a saved preference set that the backend enforces so that disallowed interactions are prevented.

`settings.md` groups these requirements into the Communication section of Settings, with dropdowns for direct messages, friend requests, and room invitations plus lists for muted and blocked members. `friend.md`, `friend_profile.md`, and `group_detail.md` describe the surfaces where the restrictions become visible, such as messaging, friend requests, and group member menus.

### B2. Preconditions

1. The user is authenticated with an active session (`NFR-SEC-1`).
2. The user can reach Settings from the main navigation; `screen_flow.md` defines `Home -> Settings`.
3. The Settings area and its Communication section are available to the user.
4. Existing communication preferences and any muted or blocked member lists can be read by the system.

### B3. Postconditions

1. **Success:** The user's communication settings are stored with the selected direct-message, friend-request, and room-invitation values.
2. **Success:** The muted and blocked member lists reflect the user's final Mute, Unmute, Block, and Unblock actions.
3. **Success:** The backend prevents interactions the user does not permit (`FR-39.5`).
4. **Failure:** No setting change is persisted, and the user receives an appropriate error message.

### B4. Main Success Scenario (Basic Flow)

1. The user opens **Settings** from the main navigation.
2. The system opens the Settings hub and highlights the **Communication** section.
3. The system renders `CommunicationSettingsForm` with the current `CommunicationPreference` values.
4. The user selects a value in `DirectMessageRestrictionSelect`: **Everyone** or **Confirmed friends only**.
5. The user selects a value in `FriendRequestPermissionSelect`: **Allow** or **Reject incoming friend requests**.
6. The user selects a value in `RoomInvitationPermissionSelect`: **Allow** or **Reject room invitations**.
7. The user adds or removes members through `MutedUsersList` and `BlockedUsersList`, using **Mute**, **Unmute**, **Block**, and **Unblock** as applicable.
8. The user selects **Save Communication**.
9. The frontend submits the selected values and the backend stores `directMessageRestriction`, `friendRequestsEnabled`, `roomInvitationsEnabled`, `mutedUserIds`, and `blockedUserIds`.
10. The backend applies the saved restrictions to relevant reads and interactions.
11. The system displays a success confirmation and returns the Communication section to a saved state.

### B5. Alternative Flows

#### A1. Update privacy settings

The user opens the **Privacy** section instead of **Communication** and changes visibility, discoverability, or online-status controls under `FR-39.2`; `AC-39.3` permits communication and privacy settings to be changed at any time.

#### A2. Revoke an existing restriction

At basic flow step 7, the user selects **Unmute** or **Unblock**. The corresponding member is removed from `MutedUsersList` or `BlockedUsersList` before the user saves.

#### A3. Open the reporting flow

The user selects `ReportBehaviorLink`, labelled **Report inappropriate behavior**, to start reporting from Settings. This use case ends when the reporting flow opens; no moderator outcome is promised.

### B6. Exception Flows

#### E1. Unauthenticated access

The system redirects the user to Login before showing protected Settings content (`NFR-SEC-1`).

#### E2. Unsupported selection

The system keeps the user's input, displays an inline validation error through `SettingsErrorAlert`, and does not persist an unsupported value.

#### E3. Save failure

The backend rejects the save. The system preserves the edited values, explains the failure, and allows the user to retry.

#### E4. Disallowed interaction after save

A blocked or restricted member attempts messaging, a friend request, or a room invitation. The backend denies the interaction under `FR-39.5`; the UI may explain the restriction with `BlockedUserState` or `ConversationRestrictionNotice`.

### B7. Business Rules

1. The system shall allow a user to control communication settings (`FR-39.1`) and privacy settings (`FR-39.2`).
2. Users can mute or permanently block specific members from messaging, friend requests, or room invitations (`AC-39.1`, `FR-39.3`).
3. Users can restrict direct messages to confirmed friends (`AC-39.2`, `FR-39.4`).
4. `DirectMessageRestrictionSelect` = **Everyone / Confirmed friends only**, `FriendRequestPermissionSelect` = **Allow / Reject incoming friend requests**, `RoomInvitationPermissionSelect` = **Allow / Reject room invitations**, and mute/block lists = `MutedUsersList` / `BlockedUsersList` in `settings.md`.
5. Communication and privacy settings shall prevent interactions the user does not permit, with backend enforcement (`FR-39.5`, `AC-39.3`).
6. Users can change communication and privacy settings at any time (`AC-39.3`).
7. Friend requests, messages, and room invitations must respect the user's privacy choices (`NFR-PRIV-2`, `NFR-PRIV-6`, `NFR-PRIV-7`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before protected Settings resources are accessible. |
| NFR-SEC-3 | Sensitive communication is encrypted using TLS 1.2 or higher. |
| NFR-SEC-6 | Unauthorized access is prevented through server-side authorization checks. |
| NFR-SEC-8 | The interface and backend protect against SQL injection, XSS, and CSRF. |
| NFR-PRIV-2 | Users can allow or reject incoming friend requests. |
| NFR-PRIV-6 | Users can control whether other users can send messages or room invitations. |
| NFR-PRIV-7 | Privacy settings apply consistently to forum posts, comments, member lists, and search results. |
| Design constraint | Restrictions must be enforced on the backend, not only by hiding UI controls (`FR-39.5`). |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Privacy section | Basic flow step 2; alternative A1 |
| Restriction revocation | Basic flow step 7; alternative A2 |
| Report entry | Communication section through `ReportBehaviorLink`; alternative A3 |
| Backend enforcement | Basic flow steps 9-10; exception E4 |
| Save failure recovery | Basic flow step 8; exception E3 |

### B10. Interface and Data Notes

- **Screen and feature flow.** `screen_flow.md` defines `Home -> Settings` and `Settings -> Profile` / `Settings -> Preferences`. `settings.md` recommends a Settings hub with section navigation and the route `/settings/communication`; the route is a recommendation, not an endpoint.
- **Confirmed UI components.** `settings.md` names `CommunicationSettingsForm`, `DirectMessageRestrictionSelect`, `FriendRequestPermissionSelect`, `RoomInvitationPermissionSelect`, `MutedUsersList`, `BlockedUsersList`, `MuteUserButton`, `UnmuteUserButton`, `BlockUserButton`, `UnblockUserButton`, `ReportBehaviorLink`, and `SaveCommunicationSettingsButton`.
- **Exact settings values.** `DirectMessageRestrictionSelect` = **Everyone / Confirmed friends only**; `FriendRequestPermissionSelect` = **Allow / Reject incoming friend requests**; `RoomInvitationPermissionSelect` = **Allow / Reject room invitations**. `MutedUsersList` shows muted members and mute scope; `BlockedUsersList` shows permanently blocked users.
- **Exact actions and labels.** `Mute`, `Unmute`, `Block`, `Unblock`, **Save Communication**, and **Report inappropriate behavior** come from `settings.md`. **Save Changes**, **Discard**, and **You have unsaved changes** are recommended shell controls in `settings.md`.
- **Data fields.** `CommunicationPreference` contains `directMessageRestriction`, `friendRequestsEnabled`, `roomInvitationsEnabled`, `mutedUserIds`, and `blockedUserIds` (`settings.md` information model).
- **Enforcement surfaces.** `friend.md` defines `ConversationRestrictionNotice` with "Direct messages are limited to confirmed friends."; `friend_profile.md` defines `BlockedUserState` with "You cannot interact with this member."; `group_detail.md` defines `GroupAccessDeniedPanel` for private groups. These are UI feedback, while `FR-39.5` requires backend prevention.
- **API and recommendation boundary.** Not specified in proposals for communication settings; `API.md` defines no communication-settings endpoint, payload, status code, or error code. Do not assign forum codes such as `48010 FORBIDDEN` or database codes such as `45000 UNKNOWN ERROR` to settings actions. Routes, component names, `SettingsSuccessToast`, and `SettingsErrorAlert` are UI/UX recommendations in `settings.md`; the requirements are `AC-39.1`-`AC-39.3` and `FR-39.1`-`FR-39.5`. `NFR-PRIV-2`, `NFR-PRIV-6`, and `NFR-PRIV-7` require consistent control of friend requests, messages, room invitations, and privacy across posts, comments, member lists, and search results.

### B11. Source Alignment Notes

- `userstory.md` sections 11.2-11.3 and `functional_requirement.md` US-39 agree on the three AC goals and five FR requirements; `settings.md` supplies the concrete dropdown values and mute/block lists.
- No communication-settings or behavioral-report API endpoints are defined for this use case: `API.md` has no communication-settings endpoint, and its only report endpoint is the forum-specific `POST /forum/reports`, which does not cover profiles, messages, or users.
- The `ReportBehaviorLink` labelled **Report inappropriate behavior** is an entry point only; `settings.md` is a UI/UX recommendation, and report UI must not promise a moderator outcome. Submission feedback is covered by UC-34 and `ReportSubmittedNotice`.
- `FR-39.5` requires backend enforcement, but no backend contract or error-code contract is defined for communication restrictions; `friend.md`, `friend_profile.md`, and `group_detail.md` have no friend/profile/group API contract and contribute only interaction-feedback surfaces.
- No distinct include, extend, or specialization use case is named for US-39, so no I-xx, E-xx, or G-xx identifier is created.
- Forum-specific content reporting is covered by PA4 `UC-20-report-moderate-forum-content.md`; this use case covers communication controls under US-39 and points behavioral reports to UC-34 without duplicating moderation decisions.
