# UC-13 — Set Learning Preferences

**Version:** `1.0`

**Performed by:** [Tran Canh Anh Tuan] | **Edited by:** [Tran Canh Anh Tuan]

| Field | Value |
| --- | --- |
| Use Case ID | UC-13 |
| Name | Set Learning Preferences |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Profile Management |
| Priority | Not explicitly stated |
| Related User Stories | US-09 |
| Related Requirements | FR-09.1, FR-09.2, FR-09.3, FR-09.4, FR-09.5; NFR-SEC-1, NFR-SEC-3, NFR-SEC-6, NFR-USE-2, NFR-USE-4, NFR-USE-5, NFR-PERF-1 |
| Source Documents | `proposals/userstory.md` (§3.2); `proposals/functional_requirement.md` (US-09); `proposals/settings.md`; `proposals/friend_profile.md`; `proposals/overview.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/non_functional_requirement.md` |

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
        UC13(["UC-13<br/>Set Learning Preferences"])
    end

    Student --- UC13

    class Student actor
    class UC13 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | A student who specifies courses, subjects, interests, learning goals, and preferred study times so recommendations can be personalized. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-13 Set Learning Preferences | Primary | Opens **Preferences** in **Settings** or reaches Preference Settings after OTP verification, then saves preferences. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | No relationship | No actor generalization or specialization is named for US-09 in the proposals. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No included use case is named for US-09 in the proposals. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | Not specified in proposals | No extending use case is named for US-09 in the proposals. |

### A4. Model Notes

1. Scope is entering and updating one's own preferences; actual recommendation display belongs to forum, library, friend, and room stories.
2. Onboarding entry through OTP is a flow variant of this use case, not a new use case or a redefinition of UC-01.
3. No dedicated preference API endpoint is documented in `API.md`; all route names in `settings.md` are recommendations.

## Part B — Use Case Specification

### B1. Brief Description

A university student specifies current courses, subjects and topics of interest, learning goals, and preferred study times so that the platform can recommend relevant forum discussions and resources. Preferences are used for forum posts, materials, study partners, and optional rooms.

The student can complete preferences during onboarding after OTP verification or update them at any time from **Preferences** in **Settings**. Updating preferences refreshes the relevance of recommendations.

### B2. Preconditions

1. The student is authenticated before accessing protected preference settings (NFR-SEC-1).
2. During onboarding, OTP verification has succeeded and the student has been authorized to proceed to Preference Settings (FR-01.31).
3. Supported course catalog and subject or topic tag data are available (FR-09.1, FR-09.2).
4. The student has opened **Settings** and selected **Preferences**, or has followed `Register → OTP → Preference Settings`.

### B3. Postconditions

1. **Success:** Current courses, subjects or topics, interests, learning goals, and preferred study times are persisted for the student.
2. **Success:** The saved preferences are available for recommendations of forum posts, materials, study partners, and optional rooms (FR-09.4, AC-09.4).
3. **Failure:** Unsupported or invalid preference inputs are not persisted and the previously saved preferences remain in effect.

### B4. Main Success Scenario (Basic Flow)

1. The student opens **Preferences** in **Settings**, or reaches Preference Settings after OTP verification.
2. The system displays `PreferenceSettingsForm` with course, subject, interest, goal, and study-time controls.
3. The system shows the informational note **Preferences are used for forum posts, materials, study partners, and rooms**.
4. The student selects current courses from the supported course catalog.
5. The student selects subjects and topics of interest as checkboxes or tags and adds learning interests.
6. The student enters learning goals and selects preferred study times.
7. The student selects **Update Preferences** or **Continue**.
8. The system validates that the selections are supported, persists the preferences, and returns the student to Home during onboarding or keeps them in Settings for later edits.
9. Recommendation surfaces use the saved preferences for relevant content and partners.

### B5. Alternative Flows

No distinct alternative flow is stated in US-09; the following source-backed variants are recorded.

#### A1. Onboarding after OTP verification

At basic flow step 1, the student arrives through `Register → OTP → Preference Settings`. At step 7, **Continue** saves the preferences and proceeds to Home (FR-01.26).

#### A2. Update at any time

At basic flow step 1, an existing student opens **Preferences** from **Settings**. After step 8, the student remains in Settings instead of being redirected to Home (FR-09.5, AC-09.5).

#### A3. Recommendation refresh after a change

After basic flow step 8, changed preferences refresh recommendations in the relevant forum context (FR-24.5).

### B6. Exception Flows

No exception flow is specified in US-09 or FR-09.1 to FR-09.5. No status code or error code for unsupported course or tag values is specified in proposals.

### B7. Business Rules

1. Users can select their current courses from the supported course catalog (FR-09.1, AC-09.1).
2. Users can select subjects and topics of interest as checkboxes or tags (FR-09.2, AC-09.2).
3. Users can specify learning goals and preferred study times (FR-09.3, AC-09.3).
4. The system must use these preferences to recommend forum posts, materials, study partners, and optional rooms (FR-09.4, AC-09.4).
5. Users can update their preferences at any time (FR-09.5, AC-09.5).
6. The explanation shown to the user is **Preferences are used for forum posts, materials, study partners, and rooms**.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-USE-2 | The interface must support responsive layouts from 320 px to 1920 px. |
| NFR-USE-4 | Primary interface actions must use clear labels and recognizable controls. |
| NFR-USE-5 | The interface must be usable at screen sizes of at least 320 px in width. |
| NFR-PERF-1 | Standard user interactions must respond within 2 seconds. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Onboarding entry | Basic flow step 1; alternative A1 |
| Continue to Home | Basic flow step 7; alternative A1 |
| Later preference update | Basic flow step 1; alternative A2 |
| Recommendation refresh | Basic flow step 9; alternative A3 |

### B10. Interface and Data Notes

- Screen/flow path: `Home → Settings → Preferences`; `Register → OTP → Preference Settings → Home` in `screen_flow.md`; `Authentication → Register → OTP → Preference Settings → Home` in `feature_flow.md`.
- Recommended components in `settings.md`: `PreferenceSettingsForm`, `CourseCatalogMultiSelect`, `SubjectTagSelector`, `InterestTagSelector`, `LearningGoalTextarea`, `PreferredStudyTimeSelector`, `RecommendationUseNotice`, `UpdatePreferencesButton`.
- Exact UI text: **Preferences**, **Update Preferences**, **Continue**, and **Preferences are used for forum posts, materials, study partners, and rooms**.
- Data fields listed in `settings.md`: `courseIds`, `subjectTags`, `interestTags`, `learningGoals`, `preferredStudyTimes`.
- Route `/settings/preferences` is a recommendation in `settings.md`; a confirmed route is Not specified in proposals.
- API: no dedicated learning-preference endpoint, status code, or error code is documented in `API.md`; no numeric limit on courses, tags, goals, or study times is specified in proposals.
- Recommendation rule: FR-09.4 confirms use of preferences, while recommendation display is owned by the forum, library, friend, and room stories.
- Feedback: **Profile updated**-style success toast behavior is recommended in `settings.md`; persistence of preferences is confirmed by FR-09.5.

### B11. Source Alignment Notes

- No dedicated learning-preference API endpoints are documented in `API.md`; all route names in `settings.md` are recommendations.
- FR-09.4 defines recommendation use, while FR-24.5, FR-26.4, and FR-34.2 describe downstream forum, library, and room consumers; no new use case is created for those consumers.
- Preference Settings after OTP follows FR-01.26 and FR-01.31, but OTP validation itself remains UC-01/UC-07 behavior.
- `friend_profile.md` displays visible learning-preference context for study-partner relevance; it does not define a preference API contract or error codes.
