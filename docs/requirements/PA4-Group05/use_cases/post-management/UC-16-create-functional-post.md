# UC-16 — Create Functional Post

**Version:** `1.0`

**Performed by:** [Nguyen Thanh An] | **Edited by:** [Nguyen Thanh An]

| Field | Value |
| --- | --- |
| Use Case ID | UC-16 |
| Name | Create Functional Post |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Post Management |
| Priority | Not explicitly stated |
| Related User Stories | US-16 |
| Related Requirements | FR-16.1 to FR-16.6; NFR-PERF-4, NFR-SEC-1, NFR-SEC-6, NFR-SEC-8, NFR-SEC-9, NFR-PRIV-7 |
| Source Documents | `proposals/userstory.md` (section 5.3); `proposals/functional_requirement.md` (US-16); `proposals/create_post.md`; `proposals/list_post.md`; `proposals/post_management.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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
        UC16(["UC-16<br/>Create Functional Post"])
    end

    Student --- UC16

    class Student actor
    class UC16 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | A university student who creates an interactive academic tool in a selected forum so that other students can practice or understand course content. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-16 Create Functional Post | Primary | Configures and publishes a functional post containing a quiz, prerequisite tree, or dynamic computation. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor generalization or specialization is named for US-16 in the specified proposals. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named for US-16 in the specified proposals; no new I-xx ID is introduced. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No distinct extending use case is named for US-16 in the specified proposals; no new E-xx ID is introduced. |

### A4. Model Notes

1. UC-16 covers only the Functional Post path; Discussion Post and Material Post are separate paths on the shared Create Post page.
2. The three tool variants are source-backed configurations in `feature_flow.md`, `create_post.md`, `FR-16.3` to `FR-16.5`, and `AC-16.1` to `AC-16.3`; they are not separate use cases.
3. `create_post.md` recommends drag-and-drop, code, and generate-from-file modes for prerequisite trees; no new included/extending use case is created for those modes.
4. The selected forum context is university, major, and course under `AC-16.5`; priority, exact code syntax, source-file formats, tree schema details, and numeric limits are not specified in proposals.

## Part B — Use Case Specification

### B1. Brief Description

A university student creates a functional post in a selected forum to help others practice or understand course content. The post contains a title and one interactive academic tool: an immediate quiz, a prerequisite tree, or dynamic computation. The author configures and previews the tool before submission; after publication, other users can interact with the published functional tool from post detail.

### B2. Preconditions

1. The student is authenticated with an active session.
2. The student has selected a valid forum context.
3. The student is permitted to create posts in that forum.
4. The author has chosen the interactive tool to configure.

### B3. Postconditions

1. **Success:** A functional post is stored with its title, selected tool configuration, author, and forum context.
2. **Success:** Other users can interact with the published tool from post detail, and the post appears in the corresponding forum post list.
3. **Failure:** No functional post is published, and the author receives validation, permission, or system feedback.

### B4. Main Success Scenario (Basic Flow)

1. The student selects **Create Post** from the selected forum.
2. The system shows the active university, major, and course context.
3. The student selects **Functional Post**.
4. The student enters a title and selects one tool: **Immediate Quiz**, **Prerequisite Tree**, or **Dynamic Computation**.
5. The student configures the selected tool and previews it.
6. The system validates the tool configuration and marks the draft **Ready** when it can be submitted.
7. The student submits the post.
8. The frontend validates required metadata and the active tool configuration.
9. The backend verifies authentication, forum access, permissions, content, and rate limits.
10. The system stores and publishes the functional post and returns the new post result.
11. Other users can open the post and interact with the published tool.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Immediate quiz
At basic flow step 4, the student selects **Immediate Quiz**. The quiz supports multiple-choice or single-choice questions, options, correct answers, and scores under `AC-16.2` and `FR-16.3`.

#### A2. Prerequisite tree
At basic flow step 4, the student selects **Prerequisite Tree**. The tree can be created manually or generated from a source file under `AC-16.3` and `FR-16.4`; `create_post.md` recommends **Drag and drop**, **Code**, and **Generate from file** modes.

#### A3. Dynamic computation
At basic flow step 4, the student selects **Dynamic Computation**. The author configures inputs, formula/configuration, and outputs under `FR-16.5`; no computation schema is specified in proposals.

#### A4. Cancel creation
The student leaves the editor before submitting. No functional post is published; retained draft behavior is not specified in proposals.

### B6. Exception Flows

#### E1. Invalid or incomplete tool configuration
The system shows validation feedback and keeps the editor open. A quiz with invalid answers, a tree with no nodes, or an invalid computation configuration cannot be published.

#### E2. Prerequisite tree needs review
A generated tree with uncertain nodes or edges is marked **Needs review** (`NeedsReview`) and must be confirmed by the author before publication. A draft with missing or invalid nodes/edges is **Incomplete** and blocked.

#### E3. Invalid post content or post type
The system rejects the submission with `400` and `INVALID_POST_TYPE` (`48003`) or `INVALID_POST_CONTENT` (`48004`). No tool-specific error code is defined in `API.md`.

#### E4. Unauthorized or forbidden publication
The system rejects the request with `401`, or with `403` and `FORBIDDEN` (`48010`), when authentication or forum permission is absent.

#### E5. Rate limit reached
The system rejects the submission and asks the student to retry later. `NFR-SEC-9` requires rate limiting, but no rate-limit status or error code is specified in proposals.

#### E6. Server or database failure
The system returns `500` with `DATABASE_ERROR` or `UNKNOWN_ERROR` (`45000`), publishes no partial tool, and offers retry where supported.

### B7. Business Rules

1. `AC-16.1` / `FR-16.2`: The post supports a title and an interactive tool.
2. `AC-16.1` / `FR-16.3` to `FR-16.5`: The tool may be an immediate quiz, prerequisite tree, or dynamic computation.
3. `AC-16.2` / `FR-16.3`: Quizzes support multiple-choice or single-choice questions, options, answers, and scores.
4. `AC-16.3` / `FR-16.4`: Prerequisite trees can be created manually or generated from a source file.
5. `AC-16.4` / `FR-16.6`: Other users can interact with the published functional tool.
6. `AC-16.5`: The functional post is associated with the selected forum context. A prerequisite-tree node represents a course, topic, concept, skill, or milestone; a directed edge runs from a prerequisite node to a dependent node.
7. Tree edges must reference existing nodes, a node cannot be its own prerequisite, and cycles must be flagged before publish; these edge rules are recommendations recorded in `create_post.md`. Drag-and-drop and code authoring must produce the same recommended `treeConfig`, and code must be applied to preview before submission.
8. Generated trees remain editable drafts until the author reviews and confirms them; readiness states are `Incomplete`, `NeedsReview` (shown as **Needs review**), and `Ready`. No tree-specific API error code is defined; invalid tool content is mapped through generic validation feedback such as `INVALID_POST_CONTENT`.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-4 | A new post must be reflected in the relevant forum view within 2 seconds. |
| NFR-SEC-1 | Authentication is required before accessing protected posting features. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized posting. |
| NFR-SEC-8 | The system must protect against SQL injection, XSS, and CSRF. |
| NFR-SEC-9 | Post creation must be rate-limited to reduce spam and abuse. |
| NFR-PRIV-7 | Privacy settings apply consistently to forum posts, comments, member lists, and search results. |
| Design constraint | Exact tree schema, code syntax, source-file formats, generation rules, and numeric limits are not specified in proposals; the published tool viewer should use the same reviewed configuration as the author preview. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Select interactive tool | Basic flow step 4; alternatives A1-A3 |
| Quiz and tree configuration | Basic flow step 5; alternatives A1-A2 |
| Generated tree review | Basic flow step 5; exception E2 |
| Dynamic computation configuration | Basic flow step 5; alternative A3 |
| Publication failure recovery | Basic flow step 10; exceptions E3-E6 |

### B10. Interface and Data Notes

- **Screen/flow path:** `screen_flow.md` gives `Forum -> University -> Major -> Course -> Post` and `Forum -> Create Post -> Post`. `feature_flow.md` gives `Create Post -> Functional Post -> Title / Quiz / Prerequisite Tree / Dynamic Computation`, `Prerequisite Tree -> Auto apply / Simulate by click`, and all post types converging on **Submit**.
- **Editor components and quiz:** `create_post.md` recommends `FunctionalEditorForm`, `InteractiveToolSelector`, `QuizBuilder`, `PrerequisiteTreeBuilder`, `DynamicComputationConfigurator`, `TreePreviewPanel`, `TreeValidationSummary`, and `SubmitPostButton`. `QuizBuilder` covers questions, multiple-choice or single-choice type, options, correct-answer markers, and scores; `QuizPreviewPanel` tests answer submission.
- **Prerequisite-tree authoring and rules:** `TreeModeSelector` offers **Drag and drop**, **Code**, and **Generate from file**. Drag-and-drop uses `AddPrerequisiteNodeButton`, `ManualPrerequisiteNodeEditor`, and `PrerequisiteEdgeBuilder`; code uses `CodeTreeEditor`, `ApplyCodeToPreviewButton`, `CodeValidationPanel`, and optional `SyncCodeFromCanvasButton`; generated files use `TreeSourceFileDropzone`, `GenerateTreeFromFileButton`, and `GeneratedTreeDraftReview`. A node is a course, topic, concept, skill, or milestone; each directed edge links a prerequisite to a dependent node. Nodes with no incoming prerequisite edges are starting nodes; edges must reference existing nodes; self-dependencies are blocked; cycles are flagged for removal or reordering.
- **Simulation, states, and data:** `AutoApplyToggle` and `SimulateByClickButton` implement flow-derived **Auto apply** and **Simulate by click** behavior. `TreePublishReadinessBadge` shows **Ready**, **Incomplete**, or **Needs review** (`treeConfig.validationState` uses `NeedsReview`), with no numeric bounds specified. `toolType`, `quizConfig`, `treeConfig`, `computationConfig`, `treeConfig.nodes[]`, `treeConfig.edges[]`, `edges[].fromNodeId`, `edges[].toNodeId`, `treeConfig.sourceCode`, `treeConfig.generationSource`, and `treeConfig.simulation` are recommendations; `API.md` has no tree-specific payload field.
- **API endpoint and failures:** `POST /forum/posts` accepts `university_id: string`, optional `major_id?: string`, optional `course_id?: string`, `post_type: 'functional'`, `title: string`, `content: string`, optional `tags?: string[]`, and optional `files?: File[]`; success is `201` with `data: { post_id: string, created_at: number }`. Failures are `400` with `(INVALID_POST_TYPE | INVALID_POST_CONTENT)[]`, `401`, `403` with `(FORBIDDEN)[]`, and `500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`; database codes are `UNKNOWN_ERROR: 45000`, `INVALID_POST_TYPE: 48003`, `INVALID_POST_CONTENT: 48004`, and `FORBIDDEN: 48010`.
- **Reader tools and gaps:** `list_post.md` recommends `QuizRunner`, `PrerequisiteTreeViewer`, and `DynamicComputationRunner` in the published functional tool panel; route, accepted tree source-file formats, code syntax, detailed node/edge schema, generation algorithm, and numeric limits are not specified in proposals.

### B11. Source Alignment Notes

- UC-04 covers the Discussion Post path on the same Create Post page; UC-16 does not import discussion fields, LaTeX, images, or question/general category. UC-05 covers comments and answers on an existing post and does not contribute steps to functional-tool creation or publication.
- `userstory.md` names the story “Create Functional Post” and says “interactive academic tool,” while `functional_requirement.md` says “practice course content”; this document uses the exact `userstory.md` title. `feature_flow.md` names only Quiz and Prerequisite Tree under the creation branch; `create_post.md` and `FR-16.5` preserve Dynamic Computation as an explicit tool.
- The drag-and-drop and code authoring modes are user-direction recommendations recorded in `create_post.md`; manual creation and generate-from-file are the explicit `AC-16.3` / `FR-16.4` requirement. `API.md` accepts generic `content` and `files` fields and has no tree-specific payload or error contract; readiness states and `treeConfig` remain UI recommendations.
- No distinct included, extending, or specialized use case is named for US-16 in the specified proposals, so no new I-xx/E-xx/G-xx ID is introduced.
