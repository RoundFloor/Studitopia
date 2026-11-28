# UC-12 — Manage Profile

**Version:** `1.0`

**Performed by:** [Tran Canh Anh Tuan] | **Edited by:** [Tran Canh Anh Tuan]

| Field | Value |
| --- | --- |
| Use Case ID | UC-12 |
| Name | Manage Profile |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Profile Management |
| Priority | Not explicitly stated |
| Related User Stories | US-08 |
| Related Requirements | FR-08.1, FR-08.2, FR-08.3, FR-08.4, FR-08.5, FR-08.6; NFR-SEC-1, NFR-SEC-3, NFR-SEC-5, NFR-SEC-6, NFR-SEC-8, NFR-USE-2, NFR-USE-4, NFR-USE-5, NFR-PRIV-1, NFR-PRIV-3 |
| Source Documents | `proposals/userstory.md` (§3.1); `proposals/functional_requirement.md` (US-08); `proposals/settings.md`; `proposals/friend_profile.md`; `proposals/overview.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/non_functional_requirement.md` |

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
        UC12(["UC-12<br/>Manage Profile"])
    end

    Student --- UC12

    class Student actor
    class UC12 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | A student who creates and updates their own profile so other members can understand their academic background and interests. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-12 Manage Profile | Primary | Opens **Profile** in **Settings**, edits profile fields, previews the result, and submits changes. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | No relationship | No actor generalization or specialization is named for US-08 in the proposals. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No included use case is named for US-08 in the proposals. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | Not specified in proposals | No extending use case is named for US-08 in the proposals. |

### A4. Model Notes

1. Scope is the student's own profile; viewing another member's profile is only a consumer of the public profile data in `friend_profile.md`.
2. Field-level **Hidden / Visible** choices shown in the profile settings flow are handled with UC-14; this use case only previews their effect.
3. No dedicated profile API endpoint is documented in `API.md`; all route names in `settings.md` are recommendations.

## Part B — Use Case Specification

### B1. Brief Description

A university student creates and updates a profile so that other users can understand their academic background and interests. The profile includes an avatar, short bio, display name, university, major, and academic year, with university and major selected from the supported catalog.

The student can preview how the profile appears to other members before saving. Valid changes are persisted and reflected across active sessions, while invalid avatar files, moderated text, or unsupported catalog values block the save.

### B2. Preconditions

1. The student is authenticated before accessing protected profile settings (NFR-SEC-1).
2. A profile record exists or can be created for the student (FR-08.1).
3. Supported university and major catalog data are available (FR-08.3, AC-08.2).
4. The student has opened **Settings** and selected **Profile** from the main navigation.

### B3. Postconditions

1. **Success:** Valid profile changes are persisted and reflected across the user's active sessions (FR-08.5, AC-08.4).
2. **Success:** The saved profile shows university, major, and academic year on the public forum profile as permitted by privacy settings (FR-08.6).
3. **Failure:** Invalid avatar, text, or catalog input blocks the save and the previously saved profile remains in effect.

### B4. Main Success Scenario (Basic Flow)

1. The student selects **Settings** and then **Profile** from the main navigation (`Home → Settings → Profile`).
2. The system displays `ProfileSettingsForm` with **Edit Display Name**, **Edit Avatar**, **Edit Description**, **Edit University / Major**, **Edit Hobbies**, **Edit Often Free Time**, and **Submit** controls from the profile settings flow.
3. The student edits the display name, short bio, university, major, academic year, hobbies, or free time, and optionally uploads and crops a new avatar.
4. Where supported, the student chooses **Hidden / Visible** for the description or hobbies field.
5. `ProfilePreviewPane` updates to show the profile as other members see it.
6. The student selects **Update Profile** or **Save Changes**.
7. The system validates image type and size, display name and bio content, and catalog selections.
8. The system persists valid changes, reflects them across active sessions, and displays **Profile updated**.

### B5. Alternative Flows

No distinct alternative flow is stated in US-08; the following source-backed variants are recorded.

#### A1. Profile update without an avatar change

At basic flow step 3, the student changes only text or academic fields. No avatar validation or cropping is performed.

#### A2. Field visibility selected during profile editing

At basic flow step 4, the student follows `Edit Description → Privacy (Hidden | Visible)` or `Edit Hobbies → Privacy`, then `Privacy → Submit`; the saved visibility is enforced with UC-14.

#### A3. Discard before saving

Before basic flow step 6, the student selects **Discard** in the recommended `SettingsActionBar`; unsaved edits are reverted and no persistence occurs.

### B6. Exception Flows

#### E1. Invalid avatar file

If the uploaded file is not PNG, JPG, or WEBP, exceeds 5MB, or cannot be cropped to 1:1, the system blocks the save and reports the validation error (AC-08.5).

#### E2. Profanity filter rejection

If the display name or bio text fails the automated profanity filter, the system blocks the save and shows an inline validation error as recommended in `settings.md` (AC-08.6).

#### E3. Unsupported catalog selection

If the student's university or major is not present in the supported catalog, the system blocks the save and requires a catalog-backed selection (FR-08.3, AC-08.2).

### B7. Business Rules

1. A user can create and update their own profile (FR-08.1).
2. The profile includes display name, username, avatar, short bio, university, major, and academic year (FR-08.2, AC-08.1).
3. University and major must be selected from the supported catalog (FR-08.3, AC-08.2).
4. Avatar uploads accept only PNG, JPG, and WEBP, enforce a maximum size of 5MB, and auto-crop to 1:1 (AC-08.5).
5. Display names and bio text must pass automated profanity filters before changes are saved (AC-08.6).
6. Profile changes must be saved immediately and reflected across all active sessions (FR-08.5, AC-08.4).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-5 | Uploaded files must be validated for file type and file size before acceptance. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-SEC-8 | The system must protect against SQL injection, XSS, and CSRF. |
| NFR-USE-2 | The interface must support responsive layouts from 320 px to 1920 px. |
| NFR-USE-4 | Primary interface actions must use clear labels and recognizable controls. |
| NFR-USE-5 | The interface must be usable at screen sizes of at least 320 px in width. |
| NFR-PRIV-1 | Users must be able to configure profile visibility using at least public and private levels. |
| NFR-PRIV-3 | Users must be able to control whether university, major, and academic year are visible. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Avatar upload and 1:1 crop | Basic flow step 3; exception E1 |
| Field-level visibility choice | Basic flow step 4; alternative A2 |
| Profile preview | Basic flow step 5 |
| Discard unsaved edits | Alternative A3 |

### B10. Interface and Data Notes

- Screen/flow path: `Home → Settings → Profile`; profile settings flow `Profile → Edit Display Name → Submit`, `Edit Avatar → Submit`, `Edit Description → Submit`, `Edit University / Major → Submit`, `Edit Hobbies → Submit`, `Edit Often Free Time`, `Edit Description → Privacy (Hidden | Visible)`, `Edit Hobbies → Privacy`, `Privacy → Submit`.
- Confirmed UI fields from FR-08.2 are display name, username, avatar, short bio, university, major, and academic year; hobbies and oftenFreeTime are recommendations from the `userstory.md` profile settings flow.
- Recommended components in `settings.md`: `ProfileSettingsForm`, `AvatarUploader`, `AvatarCropper`, `ShortBioTextarea`, `UniversitySelect`, `MajorSelect`, `AcademicYearSelect`, `HobbiesTagInput`, `OftenFreeTimeInput`, `FieldVisibilitySelect`, `ProfilePreviewPane`, `UpdateProfileButton`.
- Exact UI text: **Update Profile**, **Save Changes**, **Discard**, **You have unsaved changes**, and **Profile updated** are labels or feedback given in `settings.md`.
- Data fields listed in `settings.md`: `displayName`, `username`, `avatarUrl`, `shortBio`, `university`, `major`, `academicYear`, `hobbies`, `oftenFreeTime`.
- Confirmed validation limits: PNG, JPG, WEBP, maximum 5MB, and 1:1 crop (AC-08.5); no other numeric profile limit is specified in proposals.
- API: no dedicated profile endpoint, status code, or error code is documented in `API.md`; `/settings` and `/settings/profile` in `settings.md` are recommended route names, not confirmed requirements.
- Privacy rule: field-level **Hidden / Visible** values are previewed here but enforced with UC-14; the success toast **Profile updated** is recommended in `settings.md`.

### B11. Source Alignment Notes

- No dedicated profile API endpoints are documented in `API.md`; all route names in `settings.md` are recommendations.
- AC-08.5 and AC-08.6 confirm avatar validation and profanity filtering, but the exact error codes and messages are Not specified in proposals.
- Username format and uniqueness remain governed by FR-01.8, FR-01.15, and FR-01.45; this use case does not redefine registration validation.
- `friend_profile.md` consumes the saved public profile and applies UC-14 privacy values; it defines no profile API contract or error codes.
