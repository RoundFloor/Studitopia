# UC-26 — Find a Study Partner

**Version:** `1.0`

**Performed by:** [Nguyen Chi Bao] | **Edited by:** [Nguyen Chi Bao]

| Field | Value |
| --- | --- |
| Use Case ID | UC-26 |
| Name | Find a Study Partner |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Friends and Social Networking |
| Priority | Not explicitly stated (Not specified in proposals) |
| Related User Stories | US-30 |
| Related Requirements | `AC-30.1`, `AC-30.2`, `AC-30.3`, `FR-30.1`, `FR-30.2`, `FR-30.3`, `FR-30.4`, `AC-09.1`, `AC-09.2`, `AC-09.3`, `AC-09.4`, `AC-09.5`, `FR-09.1`, `FR-09.2`, `FR-09.3`, `FR-09.4`, `FR-09.5`, `AC-10.1`, `AC-10.2`, `AC-10.3`, `AC-10.4`, `FR-10.1`, `FR-10.2`, `FR-10.3`, `FR-10.4`, `NFR-PERF-1`, `NFR-SEC-1`, `NFR-SEC-3`, `NFR-SEC-6`, `NFR-PRIV-1`, `NFR-PRIV-2`, `NFR-PRIV-3`, `NFR-PRIV-4`, `NFR-PRIV-7`, `NFR-USE-2`, `NFR-USE-4`, `NFR-USE-5` |
| Source Documents | `proposals/userstory.md` (section 9.1); `proposals/functional_requirement.md` (US-30); `proposals/friend.md`; `proposals/friend_profile.md`; `proposals/group_detail.md`; `proposals/settings.md`; `proposals/overview.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md` |

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

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC26(["UC-26<br/>Find a Study Partner"])
    end

    Student --- UC26

    class Student actor
    class UC26 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | The actor in US-30 who wants to find users with similar courses and learning goals and establish useful academic connections. |

### A3. Relationships
#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-26 Find a Study Partner | Primary | Searches and filters the member directory and reviews concise profile cards. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | No actor or use-case generalization is named for US-30. | No inherited behavior is specified. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named in the proposals. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | No condition is specified. | No distinct extending use case is named in the proposals. |

### A4. Model Notes

1. The model contains only the selected use case and the story's University Student actor because no friend/group I-xx, E-xx, or G-xx use case is named in the proposals.
2. Recommended is inside the Friend Group area: `screen_flow.md` gives `Home -> Friend Group -> Find friend`, and `feature_flow.md` gives `Friend -> Find friend -> Friend item`.
3. `friend.md` recommends `/friends/find`, `StudyPartnerDiscoveryPanel`, `PartnerSearchInput`, and `FriendProfileCard`; these are UI recommendations, not API contracts.
4. Discovery is scoped by `FR-30.1`–`FR-30.4` and `AC-30.1`–`AC-30.3`; preference data comes from `FR-09.1`–`FR-09.5` and `AC-09.1`–`AC-09.5`.
5. Visibility of profile cards, mutual context, and shared forum context must follow `FR-10.1`–`FR-10.4`, `AC-10.1`–`AC-10.4`, and `NFR-PRIV-7`.

## Part B — Use Case Specification

### B1. Brief Description

A university student opens the Friend Group area and searches the member directory for peers with similar courses, subjects, learning goals, learning pace, and language. The system returns concise profile cards with mutual academic interests and, when available, mutual friends or shared forum contexts, so the student can decide whether to open a profile or start the separate friend-request flow.

This use case covers discovery and evaluation only. Sending a request belongs to UC-27, and managing incoming requests belongs to UC-28. The forum remains the primary collaboration space; friend discovery supports it by turning shared academic context into durable connections.

### B2. Preconditions

1. The student is authenticated with an active session (`NFR-SEC-1`).
2. The student can reach the Friend Group from Home (`screen_flow.md`).
3. Member-directory and learning-preference data are available to the system.
4. The student's own preferences may be used for matching (`FR-09.4`, `AC-09.4`).
5. Privacy settings and study-partner search opt-outs are enforced before results are displayed (`FR-10.2`, `AC-10.2`, `NFR-PRIV-7`).
6. Sensitive communication uses TLS 1.2 or higher (`NFR-SEC-3`).

### B3. Postconditions

1. **Success:** The system displays matching profile cards with mutual academic interests (`FR-30.3`, `AC-30.2`).
2. **Success:** Mutual friends or shared forum contexts are displayed when available (`FR-30.4`, `AC-30.3`).
3. **Success:** Only members permitted by privacy settings appear in results (`FR-10.2`, `NFR-PRIV-7`).
4. **Failure:** The system shows an appropriate empty or restricted state and does not reveal hidden member data.

### B4. Main Success Scenario (Basic Flow)

1. The student opens the Friend Group from Home.
2. The student selects **Find Friends** or the `FindFriendsTab`.
3. The system opens `StudyPartnerDiscoveryPanel` with `PartnerSearchInput`.
4. The student enters keywords using “Search by name, subject, course, or goal.”
5. The student selects filters for subject, goal, learning pace, and language (`FR-30.2`, `AC-30.1`).
6. The student may add the university, major, or course context using `PartnerAcademicContextFilter`.
7. The system applies privacy and search opt-out rules before computing results (`FR-10.2`, `NFR-PRIV-2`, `NFR-PRIV-7`).
8. The system displays `FriendProfileCard` items with university, major, shared courses, public hobby, mutual interests, and mutual connections (`FR-30.1`, `FR-30.3`, `FR-30.4`).
9. The system explains relevance with text such as “Shares CS101 and Database” or “3 mutual friends.”
10. The student opens a profile or proceeds to UC-27 Send Friend Request.

### B5. Alternative Flows

#### A1. Recommended peers

At basic flow step 2, the student opens **Recommended**. `RecommendedStudyPartnerList` shows suggested peers with mutual interests and shared context (`feature_flow.md`, `AC-30.2`, `AC-30.3`).

#### A2. Open a full friend profile

At basic flow step 10, the student selects **View profile**. `FriendProfilePage` shows the public academic context and mutual-context information the member permits (`friend_profile.md`).

#### A3. No matching study partners

At basic flow step 8, no members match. The system shows “No study partners found” and suggests changing filters (`friend.md`, recommendation).

#### A4. Clear filters

At any point after step 5, the student selects **Clear filters**. Active chips are removed and discovery returns to the unfiltered state (`friend.md`, recommendation).

### B6. Exception Flows

No friend/group-specific error codes are specified; the following are source-backed UI states rather than backend error contracts.

#### E1. Student opts out of study-partner search

If another member has opted out, the system omits that member from results and does not expose a hidden profile (`FR-10.2`, `AC-10.2`).

#### E2. Hidden fields

If a member hides academic or online-status information, the system omits those fields and may show “Some information is hidden by this member's privacy settings.” (`friend_profile.md`, `NFR-PRIV-3`, `NFR-PRIV-4`).

#### E3. Discovery data fails to load

The system shows “Unable to load friends or groups.” with Retry (`friend.md`, recommendation); no API status code is asserted.

### B7. Business Rules

1. The system must allow a user to find other university students with similar courses, subjects, or learning goals (`FR-30.1`).
2. Search and filtering must support subject, goal, learning pace, and language (`FR-30.2`, `AC-30.1`).
3. Results must display concise profile cards with mutual academic interests (`FR-30.3`, `AC-30.2`).
4. Mutual friends or shared forum contexts are displayed when available (`FR-30.4`, `AC-30.3`).
5. Preferences are used to recommend study partners (`FR-09.4`, `AC-09.4`).
6. Users can opt out of appearing in study-partner search results (`FR-10.2`, `AC-10.2`, `NFR-PRIV-2`).
7. Profile visibility, academic-info visibility, and online-status rules apply to discovery surfaces (`FR-10.1`, `FR-10.3`, `FR-10.4`, `NFR-PRIV-3`, `NFR-PRIV-4`, `NFR-PRIV-7`).
8. Protected resources require authentication, and authorization is enforced server-side (`NFR-SEC-1`, `NFR-SEC-6`).

### B8. Special Requirements
| ID | Requirement |
| --- | --- |
| NFR-PERF-1 | Standard user interactions must respond within 2 seconds. |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must use TLS 1.2 or higher. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-PRIV-2 | Users must be able to allow or reject incoming friend requests. |
| NFR-PRIV-7 | Privacy settings must apply consistently to member lists and search results. |
| NFR-USE-2 | The interface must support responsive layouts from 320 px to 1920 px. |
| NFR-USE-4 | Primary actions must use clear labels and recognizable controls. |
| NFR-USE-5 | The interface must be usable at screen widths of at least 320 px. |

### B9. Extension Points
| Extension Point | Location in Flow of Events |
| --- | --- |
| Recommended peers | Friend Group entry; alternative A1 |
| Opening a friend profile | Basic flow step 10; alternative A2 |
| Empty discovery state | Basic flow step 8; alternative A3 |
| Filter reset | Basic flow steps 5-8; alternative A4 |
| Separation to UC-27 Send Friend Request | Basic flow step 10 |

### B10. Interface and Data Notes

- **Screen/flow path (confirmed from proposals):** `screen_flow.md` gives `Home -> Friend Group -> Find friend`; `feature_flow.md` gives `Friend -> Find friend -> Friend item`; `userstory.md` section 9 gives `Friend -> FindFriend -> FriendItem`.
- **Recommended routes and components:** `friend.md` recommends `/friends/find`, `FriendPage`, `FriendTabBar`, `FindFriendsTab`, `StudyPartnerDiscoveryPanel`, `PartnerSearchInput`, filter controls, `PartnerResultCountText`, and `PartnerNoResultsState`. These are UI recommendations, not specified requirements.
- **Exact filter and field names:** subject, goal, learning pace, language, university, major, course, `displayName`, `avatarUrl`, `courses`, `subjects`, `learningGoals`, `learningPace`, `language`, `publicHobby`, `mutualInterests`, `mutualFriends`, and `sharedForumContexts` (`FR-30.1`–`FR-30.4`, `friend.md`, `friend_profile.md`).
- **Exact quoted UI text:** “Find study partners”, “Search by name, subject, course, or goal.”, “Clear filters”, “Shares CS101 and Database”, “3 mutual friends.”, “No study partners found”, “View profile”, and “Some information is hidden by this member's privacy settings.”
- **Data rules:** `FR-30.3`/`AC-30.2` require mutual academic interests on cards; `FR-30.4`/`AC-30.3` require mutual friends or shared forum context when available. Hidden values must not leak through badges, counters, or supporting text (`NFR-PRIV-7`).
- **API and status codes:** Not specified in proposals. No friend/search endpoint, HTTP status, or error code is defined for discovery.
- **Notification/privacy rules:** This use case does not send a friend request or notification. Privacy notices and search opt-outs are confirmed requirements; component names and empty-state wording are recommendations.

### B11. Source Alignment Notes

- `use_cases_description.md` and the selected PA3 use-case set contain no dedicated friend/group UC; this specification is derived from US-30, the friend flows, and UI recommendations in `friend.md` and `friend_profile.md`.
- No friend/group API endpoints or error codes are defined in `API.md` or `response_code.md`; no endpoint, HTTP status, or error code is invented here.
- The source conflicts on whether the group owner or Superuser removes members: `FR-33.5`/`AC-33.4` name the group owner, while `feature_flow.md:145` says Superuser kicks. This conflict is outside UC-26 but affects the same friend/group feature family.
- `AC-30.1` names “subjects, goals, learning pace, and language”; `FR-30.2` names the singular equivalents. Both are preserved in the flow and business rules.
- `friend.md` recommends example text such as “18 students found.”; it is example UI copy, not a required numeric result count.
- Routes such as `/friends/find` and `/friends/users/:userId` are explicitly recommended in `friend.md` and are not API contracts.
- UC-26 stops before the request action; duplicate prevention, the 200-character note limit, and request statuses are specified in UC-27 and UC-28.
