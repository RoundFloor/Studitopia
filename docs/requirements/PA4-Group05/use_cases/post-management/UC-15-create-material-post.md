# UC-15 — Create Material Post

**Version:** `1.0`

**Performed by:** [Nguyen Thanh An] | **Edited by:** [Nguyen Thanh An]

| Field | Value |
| --- | --- |
| Use Case ID | UC-15 |
| Name | Create Material Post |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Post Management |
| Priority | Not explicitly stated |
| Related User Stories | US-15 |
| Related Requirements | FR-15.1 to FR-15.6; NFR-PERF-4, NFR-SEC-1, NFR-SEC-5, NFR-SEC-6, NFR-SEC-9, NFR-PRIV-5, NFR-PRIV-7, NFR-SCAL-4 |
| Source Documents | `proposals/userstory.md` (section 5.2); `proposals/functional_requirement.md` (US-15); `proposals/create_post.md`; `proposals/list_post.md`; `proposals/post_management.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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
        UC15(["UC-15<br/>Create Material Post"])
    end

    Student --- UC15

    class Student actor
    class UC15 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | A university student who creates a material post in the selected forum so that other students can access shared learning resources. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-15 Create Material Post | Primary | Creates and submits a material post with title, description, files, and subject tags. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor generalization or specialization is named for US-15 in the specified proposals. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named for US-15 in the specified proposals; no new I-xx ID is introduced. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No distinct extending use case is named for US-15 in the specified proposals; no new E-xx ID is introduced. |

### A4. Model Notes

1. UC-15 covers only the Material Post path; Discussion Post and Functional Post are separate paths on the shared Create Post page.
2. The diagram intentionally shows only the source-backed University Student actor and UC-15; no supporting system actor is named for this story.
3. Forum context is university, major, and course as required by `AC-15.3` and `FR-15.4`.
4. The optional library listing is an outcome of publication, not a separate use case; priority, dedicated route, accepted file formats, and maximum file sizes are not specified in proposals.

## Part B — Use Case Specification

### B1. Brief Description

A university student creates a material post in a selected forum to share learning resources with other students. The post supports a title, description, files, and subject tags, and uploaded files are validated for type and size before acceptance.

The material is associated with the selected university, major, and course. Published materials are accessible to users who can view the forum and may also appear in the learning resource library when applicable.

### B2. Preconditions

1. The student is authenticated with an active session.
2. The student has selected a valid university, major, and course forum context.
3. The student is permitted to post materials in that forum.
4. The student has one or more files intended for the material post.

### B3. Postconditions

1. **Success:** A material post is stored with its title, description, validated files, subject tags, author, and forum context.
2. **Success:** The material post appears in the corresponding forum and is accessible to users who can view the forum.
3. **Success:** The material may also appear in the learning resource library when applicable.
4. **Failure:** No material post is published, and the student receives validation, permission, or system feedback.

### B4. Main Success Scenario (Basic Flow)

1. The student selects **Create Post** from the selected forum.
2. The system shows the active university, major, and course context.
3. The student selects **Material Post**.
4. The student enters a title and description and adds subject tags.
5. The student selects one or more files through the material file upload control.
6. The system validates file type and size and shows the upload preview.
7. The student reviews the access and library-listing notices.
8. The student submits the post.
9. The frontend validates the material fields and uploads before submission.
10. The backend verifies authentication, forum access, permissions, content, and files.
11. The system stores and publishes the material post and returns the new post result.
12. The post appears in the corresponding forum post list and can be opened in post detail.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Preview before submission

At basic flow step 7, the student previews the title, description, tags, and files. Invalid fields are corrected before the flow resumes at step 8.

#### A2. Library listing not applicable

At basic flow step 11, the backend does not include the material in the learning resource library. The forum post is still published because library listing is conditional under `AC-15.5` and `FR-15.6`.

#### A3. Cancel creation

The student leaves the editor before submitting. No material post is published; any retained draft behavior is not specified in proposals.

### B6. Exception Flows

#### E1. Unsupported or oversized file
The system rejects the file, identifies the violated type or size constraint, and keeps the editor open. Concrete accepted formats and size limits are not specified in proposals.

#### E2. Invalid post content or post type
The system rejects the submission with `400` and `INVALID_POST_TYPE` (`48003`) or `INVALID_POST_CONTENT` (`48004`) and allows the student to correct the material fields.

#### E3. Unauthorized or forbidden publication
The system rejects the request with `401`, or with `403` and `FORBIDDEN` (`48010`), when authentication or forum permission is absent.

#### E4. Rate limit reached
The system rejects the submission and asks the student to retry later. `NFR-SEC-9` requires rate limiting, but no rate-limit status or error code is specified in proposals.

#### E5. Server or database failure
The system returns `500` with `DATABASE_ERROR` or `UNKNOWN_ERROR` (`45000`), publishes no partial post, and offers retry where supported.

### B7. Business Rules

1. `AC-15.1` / `FR-15.2`: The material post supports a title, description, files, and subject tags.
2. `AC-15.2` / `FR-15.3`: Uploaded files are validated for type and size before acceptance.
3. `AC-15.3` / `FR-15.4`: The material is associated with the selected university, major, and course context.
4. `AC-15.4` / `FR-15.5`: Published materials are accessible to users who can view the forum.
5. `AC-15.5` / `FR-15.6`: The material may also appear in the learning resource library when applicable.
6. `FR-15.1`: The system allows a user to create a material post in a selected forum.
7. Authentication, authorization, and server-side permission checks apply before publication (`NFR-SEC-1`, `NFR-SEC-6`).
8. Privacy settings apply consistently to forum materials (`NFR-PRIV-7`), and shared-resource access controls apply where configured (`NFR-PRIV-5`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-4 | A new post must be reflected in the relevant forum view within 2 seconds. |
| NFR-SEC-1 | Authentication is required before accessing protected posting features. |
| NFR-SEC-5 | Uploaded files must be validated for file type and file size before acceptance. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized posting. |
| NFR-SEC-9 | Post creation must be rate-limited to reduce spam and abuse. |
| NFR-PRIV-5, NFR-PRIV-7 | Users control access to shared resources, and privacy settings apply consistently to forum posts, comments, member lists, and search results. |
| NFR-SCAL-4 | The architecture supports at least 100,000 uploaded documents and learning resources. |
| Design constraint | Accepted file formats, maximum file sizes, and upload limits are not specified in proposals. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Select post type | Basic flow step 3 |
| Add subject tags | Basic flow step 4 |
| File upload and validation | Basic flow steps 5-6; exception E1 |
| Preview and library eligibility | Basic flow steps 7 and 11; alternatives A1-A2 |
| Publication failure recovery | Basic flow step 11; exceptions E2-E5 |

### B10. Interface and Data Notes

- **Screen/flow path:** `screen_flow.md` gives `Forum -> University -> Major -> Course -> Post` and `Forum -> Create Post -> Post`. `feature_flow.md` gives `Create Post -> Material Post`, with `Material Post -> Files / Title / Description`, and all post types converging on **Submit**.
- **Editor fields:** `create_post.md` recommends `MaterialEditorForm`, `PostTitleInput`, `MaterialDescriptionInput`, `SubjectTagInput`, `MaterialFileDropzone`, `MaterialFilePreviewPanel`, `FileValidationErrorText`, `PostPreviewPanel`, `CreatePostValidationSummary`, and `SubmitPostButton`.
- **Exact recommended UI copy:** `MaterialFileDropzone` shows “Choose files or drag them here”; `MaterialAccessNotice` shows “Published materials are accessible to users who can view this forum.”; `LibraryListingNotice` shows “This material may also appear in the Learning Resource Library.” These strings are recommendations in `create_post.md`, not mandated requirement text.
- **Forum context and material fields:** `university_id: string`, optional `major_id?: string`, and optional `course_id?: string` associate the material with the forum; the backend body accepts `post_type: 'material'`, `title: string`, `content: string`, optional `tags?: string[]`, and optional `files?: File[]`. `create_post.md` recommends `description`, `subjectTags`, and `files` as draft-level fields.
- **API endpoint:** `POST /forum/posts` returns `201` with `data: { post_id: string, created_at: number }`; failures are `400` with `(INVALID_POST_TYPE | INVALID_POST_CONTENT)[]`, `401`, `403` with `(FORBIDDEN)[]`, and `500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`. `studitopia.create_forum_post(pauthor_id: uuid, puniversity_id: uuid, pmajor_id: uuid, pcourse_id: uuid, ppost_type: string, ptitle: string, pcontent: string, ptags: string[], pfiles: jsonb)` returns `{post_id: uuid, created_at: timestamp}` and declares `UNKNOWN_ERROR: 45000`, `INVALID_POST_TYPE: 48003`, `INVALID_POST_CONTENT: 48004`, and `FORBIDDEN: 48010`.
- **Post-publication surface and gaps:** `list_post.md` requires the summary to show title, author, post type, timestamp, vote score, comment count, solved status, and tags, with attachments in post detail; dedicated route, accepted file formats, maximum file sizes, and a rate-limit error code are not specified in proposals.

### B11. Source Alignment Notes

- UC-04 covers only the Discussion Post path; UC-15 shares the Create Post entry point and `POST /forum/posts` contract but does not inherit LaTeX, images, or question/general category. UC-05 covers comment and answer creation after publication and does not contribute steps to material creation.
- `userstory.md` states “Create Material Post,” while `functional_requirement.md` states “Create a material post, so that I can share learning resources with other students.” This document uses the exact `userstory.md` title; `API.md` has one `post_type` enum for `discussion | material | functional`, and UC-15 constrains its flow to `material`.
- `create_post.md` is explicitly a UI/UX recommendation; its component names and quoted messages are not mandated by FR/AC text. The optional library listing in `AC-15.5` / `FR-15.6` is conditional, and no dedicated library-publication endpoint is specified in the read sources.
- No distinct included, extending, or specialized use case is named for US-15, so no new I-xx/E-xx/G-xx ID is introduced.
