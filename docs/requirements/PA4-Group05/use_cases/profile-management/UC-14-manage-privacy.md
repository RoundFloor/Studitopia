# UC-14 — Manage Privacy

**Version:** `1.0`

**Performed by:** [Tran Canh Anh Tuan] | **Edited by:** [Tran Canh Anh Tuan]

| Field | Value |
| --- | --- |
| Use Case ID | UC-14 |
| Name | Manage Privacy |
| Primary Actor | User |
| Supporting Actors | None |
| Feature Group | Profile Management |
| Priority | Not explicitly stated |
| Related User Stories | US-10 |
| Related Requirements | FR-10.1, FR-10.2, FR-10.3, FR-10.4, FR-39.1, FR-39.2, FR-39.3, FR-39.4, FR-39.5; NFR-PRIV-1, NFR-PRIV-2, NFR-PRIV-3, NFR-PRIV-4, NFR-PRIV-5, NFR-PRIV-6, NFR-PRIV-7, NFR-SEC-1, NFR-SEC-3, NFR-SEC-4, NFR-SEC-6, NFR-USE-4 |
| Source Documents | `proposals/userstory.md` (§3.3); `proposals/functional_requirement.md` (US-10, US-39); `proposals/settings.md`; `proposals/friend_profile.md`; `proposals/overview.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/non_functional_requirement.md` |

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
        UC14(["UC-14<br/>Manage Privacy"])
    end

    User --- UC14

    class User actor
    class UC14 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| User | Primary | A platform user who controls the visibility of personal information and limits communication to protect privacy. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| User | UC-14 Manage Privacy | Primary | Opens **Privacy** or **Communication** in **Settings** and saves visibility and interaction restrictions. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | No relationship | No actor generalization or specialization is named for US-10 in the proposals. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No included use case is named for US-10 in the proposals. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | Not specified in proposals | No extending use case is named for US-10 in the proposals. |

### A4. Model Notes

1. Scope includes visibility, discoverability, online status, and communication boundaries grouped under **Privacy** and **Communication** in `settings.md`.
2. Overall profile visibility values **Public / Private** come from `settings.md` and NFR-PRIV-1; field-level values **Visible / Hidden** come from AC-10.1, FR-10.1, and the profile settings flow.
3. No dedicated privacy API endpoint is documented in `API.md`; all route names in `settings.md` are recommendations.

## Part B — Use Case Specification

### B1. Brief Description

A user controls the visibility of personal information so that they can protect their privacy while using the platform. Controls cover overall profile visibility, field-level visibility for academic, study-history, habit, and contact information, searchability, online status, and last-active time.

The user also controls who may communicate with them through direct-message restrictions, friend-request and room-invitation controls, and muted or blocked member lists. Privacy settings must be respected wherever user information appears in posts, comments, and member lists.

### B2. Preconditions

1. The user is authenticated before accessing protected privacy settings (NFR-SEC-1).
2. The user has a profile whose fields can be made **Visible** or **Hidden** (FR-10.1, AC-10.1).
3. The user has opened **Settings** and selected **Privacy** or **Communication**.
4. Supported member identifiers are available for managing muted and blocked lists (FR-39.3).

### B3. Postconditions

1. **Success:** Saved privacy and communication values are stored and applied consistently to posts, comments, member lists, and search results (FR-10.4, AC-10.4, NFR-PRIV-7).
2. **Success:** Disallowed messages, friend requests, or room invitations are prevented by backend enforcement (FR-39.5, NFR-SEC-6).
3. **Failure:** Unsupported values are not saved and the previously saved privacy settings remain in effect.

### B4. Main Success Scenario (Basic Flow)

1. The user opens **Settings** and selects **Privacy**.
2. The system displays `PrivacySettingsForm` with `ProfileVisibilitySelect` (**Public / Private**), field-level `AcademicInfoVisibilitySelect`, `ContactInfoVisibilitySelect`, `StudyHistoryVisibilitySelect`, and `HabitsVisibilitySelect` (**Visible / Hidden**), plus `OnlineStatusToggle`, `LastActiveVisibilityToggle`, `PublicDiscoveryOptOutToggle`, and `StudyPartnerSearchOptOutToggle`.
3. The user chooses the overall profile visibility, field-level values, and search or status toggles.
4. The user opens **Communication** and sets `DirectMessageRestrictionSelect` (**Everyone / Confirmed friends only**), `FriendRequestPermissionSelect` (**Allow / Reject incoming friend requests**), and `RoomInvitationPermissionSelect` (**Allow / Reject room invitations**).
5. The user manages `MutedUsersList` and `BlockedUsersList` with **Mute**, **Unmute**, **Block**, and **Unblock**.
6. The system shows the note **Applied to posts, comments, member lists, and search results**.
7. The user selects **Save Privacy** or **Save Communication**.
8. Backend stores the values and applies them to relevant reads and interactions.
9. The system displays a success toast.

### B5. Alternative Flows

No distinct alternative flow is stated in US-10; the following source-backed variants are recorded.

#### A1. Communication-only change

At basic flow step 1, the user opens **Communication** directly and changes only message, request, invitation, mute, or block controls before step 7.

#### A2. Public discovery or study-partner search opt-out

At basic flow step 3, the user enables `PublicDiscoveryOptOutToggle` or `StudyPartnerSearchOptOutToggle` to opt out of the corresponding search results (FR-10.2, AC-10.2).

#### A3. Online status and last-active change

At basic flow step 3, the user hides or shows online status and last-active time (FR-10.3, AC-10.3, NFR-PRIV-4).

### B6. Exception Flows

No exception flow is specified in US-10 or FR-10.1 to FR-10.4. No status code or error code for unsupported privacy values is specified in proposals.

### B7. Business Rules

1. Overall profile visibility uses **Public / Private** and provides at least two visibility levels (NFR-PRIV-1).
2. Field-level visibility uses **Visible / Hidden** for study history, habits, and contact information (FR-10.1, AC-10.1).
3. University, major, and academic year visibility is controllable (NFR-PRIV-3).
4. Online status and last-active time can be shown or hidden (FR-10.3, AC-10.3, NFR-PRIV-4).
5. Users can opt out of public discovery and study-partner search results (FR-10.2, AC-10.2).
6. Privacy settings are enforced in posts, comments, member lists, and search results (FR-10.4, AC-10.4, NFR-PRIV-7).
7. Direct messages are restricted to **Everyone / Confirmed friends only** (FR-39.4, AC-39.2, NFR-PRIV-6).
8. Friend requests offer **Allow / Reject incoming friend requests** and room invitations offer **Allow / Reject room invitations** (NFR-PRIV-2, NFR-PRIV-6).
9. Muted and blocked members are managed with **Mute**, **Unmute**, **Block**, and **Unblock** (FR-39.3, AC-39.1).
10. Communication and privacy settings must prevent interactions the user does not permit (FR-39.5, NFR-SEC-6).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PRIV-1 | Users must be able to configure profile visibility using at least public and private levels. |
| NFR-PRIV-2 | Users must be able to allow or reject incoming friend requests. |
| NFR-PRIV-3 | Users must be able to control whether university, major, and academic year are visible. |
| NFR-PRIV-4 | Users must be able to show or hide their online status. |
| NFR-PRIV-5 | Users must be able to control access to documents and learning resources they share. |
| NFR-PRIV-6 | Users must be able to control whether other users can send messages or room invitations. |
| NFR-PRIV-7 | Privacy settings must apply consistently to posts, comments, member lists, and search results. |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-4 | Private forum and private-group content must be restricted to authorized users. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-USE-4 | Primary interface actions must use clear labels and recognizable controls. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Field-level visibility | Basic flow steps 2–3 |
| Search and status opt-outs | Basic flow step 3; alternatives A2 and A3 |
| Communication limits and member lists | Basic flow steps 4–5; alternative A1 |
| Global privacy enforcement | Basic flow step 8 |

### B10. Interface and Data Notes

- Screen/flow path: `Home → Settings → Privacy`; `Home → Settings → Communication` (recommended grouping in `settings.md`); profile settings flow `Edit Description → Privacy (Hidden | Visible)`, `Edit Hobbies → Privacy`, `Privacy → Submit`.
- Exact values from `settings.md`: **Public / Private**, **Visible / Hidden**, **Everyone / Confirmed friends only**, **Allow / Reject incoming friend requests**, **Allow / Reject room invitations**, and **Applied to posts, comments, member lists, and search results**.
- Exact buttons and actions: **Save Privacy**, **Save Communication**, **Mute**, **Unmute**, **Block**, **Unblock**, and the `ReportBehaviorLink` label **Report inappropriate behavior**.
- Recommended components: `PrivacySettingsForm`, `ProfileVisibilitySelect`, `AcademicInfoVisibilitySelect`, `ContactInfoVisibilitySelect`, `StudyHistoryVisibilitySelect`, `HabitsVisibilitySelect`, `OnlineStatusToggle`, `LastActiveVisibilityToggle`, `PublicDiscoveryOptOutToggle`, `StudyPartnerSearchOptOutToggle`, `DirectMessageRestrictionSelect`, `FriendRequestPermissionSelect`, `RoomInvitationPermissionSelect`, `MutedUsersList`, `BlockedUsersList`.
- Data fields: field-level **Visible / Hidden** values for bio, habits, study history, and contact info; `onlineStatusVisible`, `lastActiveVisible`; `directMessageRestriction`, `friendRequestsEnabled`, `roomInvitationsEnabled`, `mutedUserIds`, `blockedUserIds`.
- Routes `/settings/privacy` and `/settings/communication` are recommendations in `settings.md`; confirmed routes are Not specified in proposals.
- API: no dedicated privacy or communication endpoint, status code, or error code is documented in `API.md`.
- Interaction rule: room invitation controls interact with FR-38.3 and AC-38.4 notification behavior, but this use case does not redefine notification settings.
- Enforcement rule: hidden fields must not be exposed through badges, counters, or supporting text, and backend checks are required rather than UI-only hiding (NFR-PRIV-7, NFR-SEC-6).

### B11. Source Alignment Notes

- No dedicated privacy or communication API endpoints are documented in `API.md`; all route names in `settings.md` are recommendations.
- `settings.md` treats Settings as an aggregate hub with no dedicated Settings use case; these controls are grouped from US-10 and US-39 without creating new use case IDs.
- `friend_profile.md` consumes these values to hide fields and restrict messaging, friend requests, and room invitations; it defines no API contract or error codes.
- AC-39.1 and FR-39.3 mute/block management overlaps this use case only as settings control; request and message blocking flows remain in the friend and communication stories.
