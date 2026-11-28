# UC-06 — Share Learning Resource

**Version:** `2.0`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-06 |
| Name | Share Learning Resource |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Learning Resource Library |
| Priority | High |
| Related User Stories | US-27 |
| Related Requirements | US-27, US-25, US-28, US-29; FR-27.1 to FR-27.5, FR-25.1 to FR-25.5, FR-28.1 to FR-28.3, FR-29.1 to FR-29.4; NFR-SEC-5, NFR-PRIV-5, NFR-SCAL-4 |
| Source Documents | `docs/requirements/proposals/use_cases_model/UC-06-share-learning-resource.md`; `docs/requirements/proposals/use_cases_description.md` (UC-06); `docs/requirements/proposals/use_cases_model.md`; `docs/requirements/proposals/use_case_diagrams.md`; `docs/requirements/PA3-Group05/use_case.md` (section 6 UC-06); `docs/requirements/proposals/overview.md`; `docs/requirements/proposals/functional_requirement.md`; `docs/requirements/proposals/non_functional_requirement.md`; `docs/requirements/proposals/userstory.md`; `docs/requirements/proposals/feature_flow.md`; `docs/requirements/proposals/screen_flow.md`; `docs/requirements/proposals/API.md`; `docs/requirements/proposals/response_code.md`; `docs/requirements/proposals/library.md`; `docs/requirements/proposals/create_post.md`; `docs/requirements/proposals/group_detail.md`; `docs/requirements/proposals/friend.md`; `docs/requirements/proposals/friend_profile.md`; `docs/requirements/proposals/settings.md` |

## Part A — Use Case Model

### A1. Focused Use Case Diagram
```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC06(["UC-06<br/>Share Learning Resource"])
        I07(["I-07<br/>Validate and<br/>Store Resource"])
        E07(["E-07<br/>Restrict Resource Access"])
    end

    Student --- UC06

    UC06 -. "include" .-> I07
    E07 -. "extend" .-> UC06

    class Student actor
    class UC06 usecase
    class I07 included
    class E07 extending
```
**Diagram notation.** Person shape = human actor; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | Authenticated student who publishes a learning resource to the Learning Resource Library for discovery and reuse. |
| New University Student; Registered University Student; Post Author; Room Owner or Manager | Specialized human actors | Specialized student actors that inherit the University Student association to UC-06 in the shared actor model. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-06 Share Learning Resource | Primary | Publishes a learning resource to the resource library. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| New University Student; Registered University Student; Post Author; Room Owner or Manager | University Student | Actor generalization | Each specialized student actor inherits the UC-06 association. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-06 Share Learning Resource | I-07 Validate and Store Resource | Validate the file and metadata, store the resource, and index it for search. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-07 Restrict Resource Access | UC-06 Share Learning Resource | The owner chooses a restricted privacy setting. | Limit resource visibility and access according to the privacy rule. |

### A4. Model Notes

1. Every published resource includes I-07 because the resource must be validated, persisted, and indexed before it is available.
2. Restricting resource access is an optional extension of the base sharing behavior.
3. UC-06 belongs to the Learning Resource Library feature group and remains part of the primary student workflow.
4. The focused model keeps supporting actors out of scope; file storage and file-safety checks are system/service preconditions in the specification, not modeled supporting actors.

## Part B — Use Case Specification

### B1. Brief Description

A student publishes a learning resource so that other students can discover and access useful academic material. The resource includes metadata, optional tags, and an uploaded file, and becomes searchable after publication.

### B2. Preconditions

1. The student is authenticated with an active session.
2. The student is permitted to publish resources to the library.
3. The file storage service and configured file-validation checks are available.

### B3. Postconditions

1. **Success:** A validated resource is stored with its owner, metadata, file, subject tags, and course tags.
2. **Success:** The resource is searchable in the library after publication.
3. **Success:** Other users can view and access the resource according to its privacy settings.
4. **Failure:** No resource is published, and the student receives a clear validation or system error.

### B4. Main Success Scenario (Basic Flow)

1. The student opens the Learning Resource Library and selects **Share Resource**.
2. The system displays the resource form for title, description, subject tags, course tags, and file upload.
3. The student enters the resource details and selects a file.
4. The frontend validates the required fields and checks the file type and size against the configured limits.
5. The student submits the resource.
6. The backend verifies authentication and publication permission, validates the metadata and file, and performs the configured file-safety checks.
7. The backend stores the file and creates the resource record associated with the student, tags, and academic context.
8. The system publishes the resource and makes it searchable in the library.
9. The system displays a success confirmation and the resource in the student's storage view.
10. The resource becomes available to other users according to its privacy settings.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Add or change tags

At basic flow step 3, the student adds or removes subject or course tags. The system updates the searchable metadata before publication.

#### A2. Replace the file before submission

The student selects a different file. The system revalidates file type and size and replaces the pending upload.

#### A3. Privacy-restricted resource

At basic flow step 8, the resource is published with restricted access. It becomes searchable according to the privacy rule, but only authorized users can access the file.

#### A4. Cancel publication

The student leaves the form before submitting. No published resource is created.

#### A5. View own published resources

After publication, the student opens the storage view to see the resource status, publication date, and access statistics.

### B6. Exception Flows

#### E1. Missing or invalid metadata

The system highlights the invalid fields, keeps the form open, and does not publish.

#### E2. Unsupported file type or oversized file

The system rejects the file, identifies the violated constraint, and allows the student to choose another file.

#### E3. File-safety check fails

The system blocks publication and informs the student that the file cannot be accepted.

#### E4. Storage or database failure

No published resource is created. The system displays a retry option and avoids leaving an orphaned or partially published resource.

#### E5. Publication permission lost

The system rejects the publication and explains that the student is no longer authorized.

#### E6. Resource becomes unavailable after publication

The system prevents further access and removes the resource from search and library listings when required.

### B7. Business Rules

1. A resource must include a title and the metadata required for publication.
2. A resource can include a description, subject tags, and course tags.
3. Uploaded files must pass file type and size validation before acceptance.
4. A published resource must be searchable in the library.
5. Access to a published resource must follow the owner's privacy settings.
6. A deleted resource must be removed from search and library listings and must no longer be accessible to other users.
7. Publication is restricted to authenticated and authorized students.

### B8. Special Requirements

| ID | Requirement |
|---|---|
| NFR-SEC-5 | Uploaded files must be validated for file type and file size before acceptance. |
| NFR-PRIV-5 | Users must be able to control access to documents and learning resources they share. |
| NFR-SCAL-4 | The architecture must support at least 100,000 uploaded documents and learning resources. |
| Design constraint | Configured file-safety checks must complete before publication, and failed storage or database operations must not leave orphaned or partially published resources. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
|---|---|
| Tag changes | Basic flow step 3; alternative A1 |
| File replacement | Basic flow step 3; alternative A2 |
| Privacy restriction | Basic flow step 8; alternative A3 |
| Metadata validation failure | Basic flow step 4; exception E1 |
| File validation failure | Basic flow steps 4 and 6; exceptions E2-E3 |
| Cancel publication | Before basic flow step 5; alternative A4 |
| Storage-view review | Basic flow step 9; alternative A5 |

### B10. Interface and Data Notes

- **Screen flow and entry points:** `screen_flow.md` places the library in the main flow as `Home -> Library Group`, with `Library -> Exam` and `Library -> Book`. The library page recommendation uses `LibraryPage` / `LearningResourceLibraryPage`, tabbed views (**All**, **Books**, **Exams**, **Recommended**, **Saved**, **My Storage**), and a primary **Share Resource** action.
- **Share form fields:** `ShareResourceDialog` / `ShareResourceForm` captures `ResourceTitleInput` (required title), `ResourceDescriptionInput`, `ResourceSubjectTagInput`, `ResourceCourseTagInput`, `ResourceAcademicContextSelector` (University, Major, Course), `ResourceFileDropzone`, `ResourceFilePreviewPanel`, and `ResourcePrivacySelect`.
- **Privacy levels and meanings:** `Public` = any authenticated Studitopia user can view and access the resource; `University` = only users from the owner's university can access the file; `Course` = only members of the selected course can access the file; `Private` = only the owner can access the file. Access must follow the owner's privacy setting (FR-27.5, NFR-PRIV-5, E-07 Restrict Resource Access).
- **Validation and file-safety rules:** Frontend validates required fields and checks file type/size before submission (FR-27.3). Backend verifies authentication/publication permission, validates metadata and file, and performs configured file-safety checks (NFR-SEC-5). Unsupported file type, oversized file, missing/invalid metadata, or failed file-safety checks block publication and keep the form actionable.
- **Search/indexing:** A published resource becomes searchable in the library after publication (FR-27.4, AC-27.1). Search/filter support includes title, author, subject tags, description, format, subject field, and academic context (FR-25.1 to FR-25.5); ratings/review counts may be displayed when available (FR-25.4).
- **Exact UI messages and labels:** **Share Resource** (primary action), **Share a learning resource** (dialog heading), **Publish resource** (submit), **Cancel** (cancel), **Retry** (retry after failure), “Resource published. It is now searchable in the library.” (`PublishSuccessToast`), “No resources found” (`NoResultsState`), “Unable to load resources.” with **Retry** (`LibraryErrorBanner`), “Unsupported file type” / “File exceeds maximum size.” (`FileValidationErrorText`), “You do not have permission to access this resource.” (`AccessDeniedState`), “Resource could not be saved. Please retry.” (`StorageFailureAlert`), and “You have not published any resources yet.” (`MyStorageEmptyState`).
- **API/material-post path and codes:** `API.md` defines no standalone library upload endpoint. The documented material-sharing path is `POST /forum/posts` with `post_type: 'material'`, `title`, `content`, optional `tags`, and `files`; response `201` returns `post_id` and `created_at`. Related forum error codes include `UNKNOWN_ERROR: 45000`, `INVALID_POST_TYPE: 48003`, `INVALID_POST_CONTENT: 48004`, `FORBIDDEN: 48010`, and `POST_NOT_FOUND: 48001` where applicable to forum/material flows. Library-specific upload, privacy, file-safety, storage, and indexing endpoints/codes are not specified in `API.md`/`response_code.md`.
- **Group/friend material-sharing rules:** Friend and group flows can share materials/documents in messages (`MaterialShareButton`, `MessageAttachmentButton`, `GroupMaterialShareButton`, `SharedDocumentPanel`). Group detail states published/shared resources follow privacy settings and access is allowed only when permitted; material may also appear in the Learning Resource Library where applicable (`FR-15.6`, `FR-27.4`, `FR-27.5`, `NFR-PRIV-5`, `NFR-PRIV-7`). Library publication remains the UC-06 resource-sharing path; group/friend sharing must respect the same privacy and access constraints.

### B11. Source Alignment Notes

- **UC-06 source alignment:** Main flow, alternatives A1-A5, exceptions E1-E6, business rules, and extension points are aligned to `use_cases_description.md` UC-06 and `PA3-Group05/use_case.md` section 6.
- **Diagram fidelity:** The A1 Mermaid diagram is copied verbatim from the focused UC-06 model file; relationship tables follow the focused model structure and the shared model register.
- **API gap:** `API.md` has no standalone library upload endpoint (only the material post path `POST /forum/posts` with `post_type: 'material'`). This document does not invent library upload routes, request schemas, or error codes.
- **Privacy and storage details:** Privacy labels/meanings, storage statistics, and some UI component names are taken from `library.md` as UI recommendations consistent with FR-27/FR-28/FR-29 and NFR-PRIV-5; exact backend enums and file constraints are not specified in the API proposal.
- **Cross-feature consistency:** Material posts may appear in the library when applicable (`FR-15.6`), and friend/group material sharing must follow privacy/access rules, but those flows are not substitutes for UC-06 library publication.
