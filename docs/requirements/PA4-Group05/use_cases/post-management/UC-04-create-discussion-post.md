# UC-04 — Create Discussion Post

**Version:** `2.0`

**Performed by:** [Tran Canh Anh Tuan] | **Edited by:** [Nguyen Thanh An]

| Field | Value |
| --- | --- |
| Use Case ID | UC-04 |
| Name | Create Discussion Post |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum (Primary) |
| Priority | High |
| Related User Stories | US-14 |
| Related Requirements | US-14, US-17, US-19, US-20; FR-14.1 to FR-14.6, FR-17.1 to FR-17.5, FR-19.1 to FR-19.5, FR-20.1 to FR-20.5; NFR-PERF-4, NFR-SEC-8, NFR-SEC-9 |
| Source Documents | `proposals/use_cases_model/UC-04-create-discussion-post.md`; `proposals/use_cases_description.md` (UC-04); `proposals/use_cases_model.md`; `proposals/use_case_diagrams.md`; `PA3-Group05/use_case.md` (section 4); `proposals/overview.md`; `proposals/functional_requirement.md`; `proposals/non_functional_requirement.md`; `proposals/userstory.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/create_post.md`; `proposals/list_post.md` |

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
        UC04(["UC-04<br/>Create Discussion Post"])
        I05(["I-05<br/>Validate Post Content"])
        E05(["E-05<br/>Attach Image or LaTeX"])
    end

    Student --- UC04

    UC04 -. "include" .-> I05
    E05 -. "extend" .-> UC04

    class Student actor
    class UC04 usecase
    class I05 included
    class E05 extending
```

**Diagram notation.** Person shape = human actor; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | A registered undergraduate student who publishes a discussion post in the selected university, major, and course forum. |
| New University Student | Specialized human actor | Inherits the general University Student association to UC-04 from the shared actor model; not drawn separately in the focused diagram. |
| Registered University Student | Specialized human actor | Inherits the general University Student association to UC-04 from the shared actor model. |
| Post Author | Secondary human role / specialized actor | The acting University Student role during this use case; inherits the UC-04 association and becomes the author of the stored post. |
| Room Owner or Manager | Specialized human actor | Inherits the general University Student association to UC-04 from the shared actor model. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-04 Create Discussion Post | Primary | Publishes a discussion post in the university forum. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| New University Student; Registered University Student; Post Author; Room Owner or Manager | University Student | Actor generalization | Each specialized student actor inherits the UC-04 association. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-04 Create Discussion Post | I-05 Validate Post Content | Validate title, content, tags, post type, image support, and forum context before publication. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-05 Attach Image or LaTeX | UC-04 Create Discussion Post | The author adds rich content to a post. | Add image and LaTeX content to the discussion post. |

### A4. Model Notes

1. Every discussion post must include I-05 because invalid or incomplete post content cannot be published.
2. Image and LaTeX content are optional extensions of the base post-creation behavior through E-05.
3. Post Author is the acting University Student role during this use case; the general UC-04 association is inherited by all specialized student actors.
4. The focused diagram matches the UC-04 diagram in `use_case_diagrams.md` and contains no supporting system actor or specialized use case.
5. Actor generalization is documented in the focused model relationship summary and the shared actor model even though the focused diagram shows only the general University Student association.

## Part B — Use Case Specification

### B1. Brief Description

A student publishes an academic question or general discussion in the selected university, major, and course forum. The post supports a title, text content, optional LaTeX, optional images, and tags. The trigger is the student selecting **Create Post** and choosing the discussion-post path; the successful outcome is a validated discussion post published in the selected forum context.

### B2. Preconditions

1. The student is authenticated with an active session.
2. The student has selected a valid university, major, and course forum context.
3. The student is permitted to create posts in that forum.

### B3. Postconditions

1. **Success:** A validated discussion post is stored with its author, content, post type, tags, and forum context.
2. **Success:** The post appears in the corresponding forum post list and can be opened in post detail.
3. **Failure:** No post is published, and the student receives a clear validation or system error with the opportunity to correct the content.

### B4. Main Success Scenario (Basic Flow)

1. The student selects **Create Post** from the selected forum.
2. The system displays the post-type choices and the discussion post editor.
3. The system shows the active university, major, and course context for the new post.
4. The student enters a title, text content, optional LaTeX, optional images, and tags.
5. The student marks the post as a question or a general discussion.
6. The frontend validates the required content and supported image types or sizes before submission.
7. The student submits the post.
8. The backend verifies authentication, forum access, post permissions, content, and rate limits.
9. The backend stores the post with its author, post type, tags, and university, major, and course associations.
10. The system publishes the post and returns the new post result.
11. The system displays the post in the corresponding forum post list and allows the student to open its detail page.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. General discussion

At basic flow step 5, the student selects **General Discussion** instead of **Question**. The publication flow is unchanged, but the post is not treated as a question awaiting a true response.

#### A2. Question post

At basic flow step 5, the student selects **Question**. The post becomes eligible for answers and true-response marking after publication.

#### A3. Add or remove optional content

At basic flow step 4, the student adds or removes LaTeX, images, or tags. The editor updates the preview and validation state before submission.

#### A4. Cancel creation

The student leaves the editor before submitting. No published post is created; any retained draft behavior is subject to the platform's buffering policy.

### B6. Exception Flows

#### E1. Missing or invalid content

The system highlights the invalid fields, keeps the editor open, and does not submit until corrected.

#### E2. Unsupported or oversized image

The system rejects the image, identifies the constraint, and allows the student to choose another file.

#### E3. Forum access lost

If the forum context is no longer valid or the student lacks posting permission, the system rejects publication and explains the reason.

#### E4. Rate limit reached

The system rejects the submission and informs the student to retry later.

#### E5. Server or database failure

No post is published. The system displays a retry option and preserves the student's entered content where supported.

### B7. Business Rules

1. A discussion post must be associated with the selected university, major, and course.
2. A discussion post supports a title, text content, LaTeX, images, and tags.
3. The author must choose whether the post is a question or a general discussion.
4. Content must pass frontend and backend validation before publication.
5. A published post must appear in the corresponding forum post list.
6. Only authenticated and authorized students may create posts in a forum.
7. Post publication is subject to rate limiting to reduce spam and abuse.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-4 | A new post must be reflected in the relevant forum view within 2 seconds. |
| NFR-SEC-8 | The system must protect against SQL injection, XSS, CSRF, and other common web vulnerabilities. |
| NFR-SEC-9 | Post creation must be rate-limited to reduce spam and abuse. |
| Design constraint | The editor must validate required content, supported image types, and image sizes before submission. LaTeX and images are optional. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Select post type | Basic flow step 5; alternatives A1-A2 |
| Add optional rich content | Basic flow step 4; alternative A3 |
| Image validation failure | Basic flow step 6; exception E2 |
| Publication authorization failure | Basic flow step 8; exception E3 |
| Rate-limit recovery | Basic flow step 8; exception E4 |
| Cancel creation | Before basic flow step 7; alternative A4 |

### B10. Interface and Data Notes

- **Screen/flow path:** `screen_flow.md` gives `Forum -> University -> Major -> Course -> Post` and `Forum -> Create Post -> Post`. `feature_flow.md` gives `Create Post -> Discussion Post / Material Post / Functional Post`, with discussion content branches `Text / LaTeX`, `Image`, `Interactive Box`, and `Title`, and all post types converging on **Submit**.
- **Editor fields and post-type choices:** The shared Create Post page offers **Discussion Post**, **Material Post**, and **Functional Post**; UC-04 covers the Discussion Post editor. Discussion fields are title, text content, optional LaTeX, optional images, and tags. The discussion category is **Question** or **General Discussion**. `create_post.md` recommends the component names `CreatePostPage`, `PostTypeSelector`, `DiscussionEditorForm`, `PostCategorySelector`, `DiscussionContentEditor`, `LatexInsertButton`, `ImageUploadButton`, `PostPreviewPanel`, `CreatePostValidationSummary`, and `SubmitPostButton`.
- **Context data:** The post is associated with `university_id`, optional `major_id`, and optional `course_id`, and the editor shows the active university, major, and course context (`FR-14.4`, `AC-14.3`, UC-04 step 3).
- **Validation, permission, and rate-limit rules:** Required content and supported image types/sizes are validated before submission (`FR-14.5`, design constraint). Backend checks authentication, forum access, posting permission, content, and rate limits (`NFR-SEC-6`, `NFR-SEC-8`, `NFR-SEC-9`, UC-04 step 8 and business rule 7). Concrete image formats and size limits are not specified in the sources.
- **Exact UI messages available in the sources:** `create_post.md` recommends `ForumAccessDeniedPanel` — "You do not have permission to post in this forum."; `RateLimitError` — "Too many posts. Please retry later."; `ServerFailureAlert` — "Post could not be published."; `CreatePostSuccessToast` — "Post published."; `UnsavedChangesDialog` — "Discard unsaved changes?"; `DraftRestoreNotice` — "A saved draft was restored."; `PostTitleInput` helper "Required"; `CreatePostButton` label "Create Post"; and `SubmitPostButton` label "Submit Post" or "Publish Post". These are recommended labels/copy, not mandated requirement text.
- **API endpoint:** Backend route is `POST /forum/posts`. Body fields are `university_id: string`, `major_id?: string`, `course_id?: string`, `post_type: 'discussion' | 'material' | 'functional'`, `title: string`, `content: string`, `tags?: string[]`, and `files?: File[]`. Success is `201` with `data: { post_id: string, created_at: number }`. Failures are `400` with `(INVALID_POST_TYPE | INVALID_POST_CONTENT)[]`, `401`, `403` with `(FORBIDDEN)[]`, and `500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`.
- **Database contract:** `studitopia.create_forum_post(pauthor_id: uuid, puniversity_id: uuid, pmajor_id: uuid, pcourse_id: uuid, ppost_type: string, ptitle: string, pcontent: string, ptags: string[], pfiles: jsonb)` returns `{post_id: uuid, created_at: timestamp}`. Declared return errors are `UNKNOWN_ERROR: 45000`, `INVALID_POST_TYPE: 48003`, `INVALID_POST_CONTENT: 48004`, and `FORBIDDEN: 48010`.
- **Response-code register:** Forum codes include `48003` `INVALID_POST_TYPE`, `48004` `INVALID_POST_CONTENT`, and `48010` `FORBIDDEN`; backend codes also carry `45000` `UNKNOWN DATABASE ERROR`. No dedicated rate-limit status or error code is defined for post creation in `API.md` or `response_code.md`.
- **Post-publication surface:** The new post must appear in the corresponding forum post list; `list_post.md` defines the post summary as title, author, post type, timestamp, vote score, comment count, solved status, and tags, and opens `PostDetailPage` with full content, metadata, discussion, attachments, and tools where present.
- **Functional-post extra detail:** Outside the UC-04 discussion path but on the same Create Post page, `US-16` / `FR-16.1` to `FR-16.6` / `AC-16.1` to `AC-16.5` define an interactive academic tool: an immediate quiz with multiple-choice or single-choice questions, a prerequisite tree created manually or generated from a source file, or dynamic computation. `create_post.md` recommends drag-and-drop and code authoring modes, `Auto apply`, `Simulate by click`, and mapping invalid tool content to generic `INVALID_POST_CONTENT` because `API.md` has no tree-specific error contract.

### B11. Source Alignment Notes

- `use_cases_description.md` and the PA3 specification describe UC-04 as discussion-post creation only, while `overview.md`, `feature_flow.md`, and `create_post.md` place three post types on a shared Create Post page; material- and functional-post details are recorded only as interface context, not folded into the UC-04 basic flow.
- The focused diagram shows only the general University Student actor, whereas `use_cases_model.md` and the focused model relationship table define actor generalization for specialized student actors; the inheritance is documented in A2/A3 rather than invented in the diagram.
- `API.md` uses one `post_type` enum for `discussion | material | functional`, but UC-04 and `FR-14.1` to `FR-14.6` constrain this use case to the discussion path.
- `API.md` declares `files?: File[]` at the backend boundary and `pfiles: jsonb` at the database boundary; the sources do not define a separate image-only schema for UC-04 despite the editor-level image requirement.
- Rate limiting is required by UC-04 business rule 7 and `NFR-SEC-9`, but `API.md` and `response_code.md` define no `429` response or rate-limit error code; exception E4 and the recommended `RateLimitError` message are the only documented handling.
- Concrete supported image formats, maximum image sizes, and upload limits are absent from the sources; `create_post.md` deliberately avoids naming formats or limits.
- UI routes, component names, and quoted messages in `create_post.md` and `list_post.md` are explicitly recommendations derived from the proposals; the requirement documents do not mandate those exact strings.
- `FR-17`, `FR-19`, and `FR-20` are listed as related because a published Question post becomes eligible for detail, voting, answers, and true-response marking; those downstream actions belong to UC-03/UC-05 and US-19/US-20, not to the publication steps of UC-04.
- `FR-04.1` states a 15-minute inactivity timeout while the PA3 UC-02 special requirements state 30 minutes; this conflict concerns session management and is not imported into UC-04 special requirements.
