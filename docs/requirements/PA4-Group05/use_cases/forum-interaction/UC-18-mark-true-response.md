# UC-18 — Mark True Response

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-18 |
| Name | Mark True Response |
| Primary Actor | Post Author |
| Supporting Actors | Answer Author |
| Feature Group | Forum Interaction |
| Priority | Not explicitly stated |
| Related User Stories | US-20 |
| Related Requirements | FR-13.2, FR-17.3, FR-17.4, FR-18.2, FR-20.1 to FR-20.5, FR-38.1; NFR-PERF-3, NFR-PERF-4, NFR-PERF-6, NFR-SEC-1, NFR-SEC-6, NFR-PRIV-7 |
| Source Documents | `proposals/userstory.md` (section 6.3); `proposals/functional_requirement.md` (US-20); `proposals/list_post.md`; `proposals/post_management.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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

    PostAuthor@{ shape: person, label: "Post Author" }
    AnswerAuthor@{ shape: person, label: "Answer Author" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC18(["UC-18<br/>Mark True Response"])
    end

    PostAuthor --- UC18
    AnswerAuthor --- UC18

    class PostAuthor,AnswerAuthor actor
    class UC18 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| Post Author | Primary human actor | The author of a question post who marks one comment or answer as the true response. |
| Answer Author | Secondary human actor | The author of the selected answer who is notified that the answer was accepted. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| Post Author | UC-18 Mark True Response | Primary | Selects or changes the accepted comment or answer. |
| Answer Author | UC-18 Mark True Response | Secondary | Receives the acceptance notification after selection. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor generalization or specialization is named for US-20 in the specified proposals. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named for US-20 in the specified proposals; no new I-xx ID is introduced. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No distinct extending use case is named for US-20 in the specified proposals; no new E-xx ID is introduced. |

### A4. Model Notes

1. UC-18 applies to a question post; the post author is the only actor allowed to select the true response.
2. The Answer Author association models the notification recipient named by `AC-20.5` and `FR-20.5`; no separate notification service actor is introduced from unrelated sources.
3. Marking and changing are the same use case because `AC-20.4` and `FR-20.4` describe a change to the accepted response.
4. The marked response is a comment or answer under `FR-20.1`; `API.md` identifies the target with `comment_id`. Priority and a dedicated true-response UI route are not specified in proposals.

## Part B — Use Case Specification

### B1. Brief Description

A post author marks one comment or answer as the true response so that other students can quickly find the accepted solution. The post is marked as solved, and the true response is displayed prominently under the post.

The author can change the true response when necessary. The author of the selected answer is notified that the answer was accepted.

### B2. Preconditions

1. The post author is authenticated with an active session.
2. The post is a question post owned by the acting author.
3. At least one comment or answer exists on the post.
4. The selected comment or answer is visible and available for acceptance.

### B3. Postconditions

1. **Success:** The selected comment or answer is recorded as the post's true response.
2. **Success:** The post is marked as solved and the true response is displayed prominently under the post.
3. **Success:** The author of the selected answer is notified that the answer was accepted.
4. **Failure:** The true response and solved state remain unchanged, and the post author receives a clear error.

### B4. Main Success Scenario (Basic Flow)

1. The post author opens the question post detail page.
2. The system displays the post, its comments and answers, and the current true response when present.
3. The system displays **Mark as true response** only to the post author.
4. The post author selects a comment or answer.
5. The system sends `comment_id` to the true-response endpoint.
6. The backend verifies authentication, post ownership, post existence, and comment existence.
7. The system records the selected response and marks the post solved.
8. The system returns `solved: true`.
9. The system displays the true response prominently under the post and updates the solved status.
10. The system notifies the author of the selected answer that the answer was accepted.

### B5. Alternative Flows

The story has no distinct alternative beyond source-backed variants of the same action.

#### A1. Change the true response

The post author selects a different comment or answer. The system replaces the previous true response with the new selection, keeps the post solved, and notifies the newly selected answer author.

#### A2. Mark a comment instead of an answer

At basic flow step 4, the author selects a comment rather than an answer. `FR-20.1` allows a comment or answer to be marked, and the API target remains a `comment_id`.

### B6. Exception Flows

#### E1. Post or comment not found
The system returns `404` with `POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`) and refreshes the available post discussion.

#### E2. Caller is not the post owner
The system returns `403` with `NOT_POST_OWNER` (`48007`) or `FORBIDDEN` (`48010`) and does not change the true response.

#### E3. Unauthorized request
The system returns `401` and requires authentication before the true response is changed.

#### E4. Already true response conflict
`ALREADY_TRUE_RESPONSE` (`48008`) exists in `response_code.md`, but it is not listed in the `PATCH /forum/posts/:post_id/true-response` `403` contract. No source-defined status mapping is available for this case.

#### E5. Notification delivery failure
The true response remains marked and the post remains solved. Notification retry or recording behavior is not specified in proposals.

#### E6. Server or database failure
The system returns `500` with `DATABASE_ERROR` or `UNKNOWN_ERROR` (`45000`), leaves the previous true-response state authoritative, and offers retry where supported.

### B7. Business Rules

1. `AC-20.1` / `FR-20.1`: The post author can mark one comment or answer as the true response.
2. `AC-20.2` / `FR-20.2`: The post is marked as solved when a true response is selected.
3. `AC-20.3` / `FR-20.3`: The true response is displayed prominently under the post.
4. `AC-20.4` / `FR-20.4`: The author can change the true response when necessary.
5. `AC-20.5` / `FR-20.5`: The author of the selected answer is notified that the answer was accepted.
6. Only the post author may perform the action; the backend enforces ownership under `FR-20.1` and the `NOT_POST_OWNER` (`48007`) contract.
7. The true-response target is identified by `comment_id: string`.
8. Privacy settings apply consistently to the post and answer display (`NFR-PRIV-7`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-3, NFR-PERF-4 | Post detail and comments display within 2 seconds, and a true-response mark is reflected in the forum view within 2 seconds. |
| NFR-PERF-6 | Forum notifications, including true-response marks, must be delivered within 2 seconds under normal conditions. |
| NFR-SEC-1 | Authentication is required before accessing protected interactions. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized true-response changes. |
| NFR-PRIV-7 | Privacy settings apply consistently to forum posts, comments, member lists, and search results. |
| Design constraint | The acceptance notification must not roll back a successful true-response mark when delivery fails. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Author-only control visibility | Basic flow step 3 |
| Select response | Basic flow step 4; alternatives A1-A2 |
| Ownership check | Basic flow step 6; exception E2 |
| Solved-state update | Basic flow steps 7-9 |
| Acceptance notification | Basic flow step 10; exception E5 |
| Failure recovery | Basic flow steps 5-7; exceptions E1-E4 and E6 |

### B10. Interface and Data Notes

- **Screen/flow path:** `screen_flow.md` gives `Forum -> University -> Major -> Course -> Post`, with `Trending -> Post`. `feature_flow.md` gives `Post -> Comment -> True Response`, `List Post -> Solved / Good -> Comment / Answer`, and `List Post -> Post -> Comment / Solved / Vote / Save / Report / Moderate`.
- **UI components:** `list_post.md` and `post_management.md` recommend `MarkTrueResponseButton` with label **Mark as true response**, `TrueResponsePanel`, `PostSolvedBadge` with `Solved` / `Unsolved`, and `PermissionBasedActionBar`.
- **Detail load:** `GET /forum/posts/:post_id` returns `post`, `comments`, `true_response: object | null`, `user_vote`, and `saved` with `200`; failures are `404 POST_NOT_FOUND` (`48001`), `401`, and `500 (DATABASE_ERROR | UNKNOWN_ERROR)`. Database function `studitopia.get_forum_post` also lists `FORBIDDEN: 48010`.
- **API endpoint and failures:** `PATCH /forum/posts/:post_id/true-response` with body `{ comment_id: string }` returns `200` with `data: { solved: boolean }`; failures are `404` with `(POST_NOT_FOUND | COMMENT_NOT_FOUND)[]` (`48001`, `48002`), `403` with `(NOT_POST_OWNER | FORBIDDEN)[]` (`48007`, `48010`), `401`, and `500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`.
- **Database contract and response-code gap:** `studitopia.mark_true_response(puser_id: uuid, ppost_id: uuid, pcomment_id: uuid)` returns `{solved: boolean}` and declares `UNKNOWN_ERROR: 45000`, `POST_NOT_FOUND: 48001`, `COMMENT_NOT_FOUND: 48002`, `NOT_POST_OWNER: 48007`, and `FORBIDDEN: 48010`. `response_code.md` defines `48008 ALREADY_TRUE_RESPONSE` in the forum, database, and backend registers, but `API.md` does not list it in the true-response endpoint contract.
- **List display and notifications:** `GET /forum/posts` returns `solved: boolean` in each post summary so solved status is visible while browsing. `FR-38.1` and `NFR-PERF-6` include true-response marks in forum notifications; no notification endpoint or payload is defined in `API.md`.

### B11. Source Alignment Notes

- UC-04 covers post publication and lists true-response eligibility as downstream context; UC-18 covers marking an existing response and does not repeat discussion-post creation. UC-05 covers comment and answer creation and notification of the post author; UC-18 begins after those responses exist.
- UC-05 already notes the same `ALREADY_TRUE_RESPONSE` (`48008`) gap: the code exists in `response_code.md` but is missing from the `PATCH /forum/posts/:post_id/true-response` `403` contract. This document preserves that gap rather than assigning a status code.
- `FR-20.1` allows a comment or answer to be marked, while the API identifies the target only as `comment_id`; no separate answer identifier is specified. `AC-20.4` permits changing the true response, but no distinct change endpoint or dedicated code is defined; the same PATCH endpoint is the only source-backed contract.
- Notification delivery is required by `FR-20.5`, while user notification preferences are a cross-cutting concern; no source specifies how mandatory acceptance notifications interact with opt-outs. Route names and component names in `list_post.md` and `post_management.md` are recommendations; `API.md` defines the exact endpoint and codes used above. No distinct included, extending, or specialized use case is named for US-20, so no new I-xx/E-xx/G-xx ID is introduced.
