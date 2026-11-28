# UC-17 — Vote on Posts and Comments

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-17 |
| Name | Vote on Posts and Comments |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum Interaction |
| Priority | Not explicitly stated |
| Related User Stories | US-19 |
| Related Requirements | FR-13.2, FR-13.4, FR-17.4, FR-19.1 to FR-19.5, FR-38.1; NFR-PERF-2, NFR-PERF-3, NFR-PERF-4, NFR-PERF-6, NFR-SEC-1, NFR-SEC-6, NFR-SEC-9, NFR-PRIV-7 |
| Source Documents | `proposals/userstory.md` (section 6.2); `proposals/functional_requirement.md` (US-19); `proposals/list_post.md`; `proposals/post_management.md`; `proposals/create_post.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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
        UC17(["UC-17<br/>Vote on Posts and Comments"])
    end

    Student --- UC17

    class Student actor
    class UC17 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | A student who upvotes or downvotes a post, comment, or answer so that useful academic content is easier to discover. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-17 Vote on Posts and Comments | Primary | Casts, changes, or removes a vote on an eligible post or comment. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor generalization or specialization is named for US-19 in the specified proposals. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named for US-19 in the specified proposals; no new I-xx ID is introduced. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No distinct extending use case is named for US-19 in the specified proposals; no new E-xx ID is introduced. |

### A4. Model Notes

1. UC-17 covers both target types named in `API.md`: `post` and `comment`.
2. Comments and answers share the `comment` target type in the API; no separate answer vote endpoint is named.
3. Upvote, downvote, change, and remove are values of one vote action, not separate use cases.
4. Notification of vote activity is a related cross-cutting behavior in `FR-38.1`, not a source-named included use case; priority and a dedicated vote UI route are not specified in proposals.

## Part B — Use Case Specification

### B1. Brief Description

A university student votes on a post or on a comment or answer so that useful academic content is easier to discover. The student can upvote, downvote, change a vote, or remove a vote, with at most one active vote per target. The recorded vote updates the vote score and ranking, and vote controls appear where the user has permission to view and interact with the target.

### B2. Preconditions

1. The student is authenticated with an active session.
2. The student can view the selected post or comment.
3. The target is a `post` or `comment` and still exists.
4. The student is permitted to vote under privacy, moderation, and authorization rules.

### B3. Postconditions

1. **Success:** The vote is recorded as `1`, `0`, or `-1` for the target and requesting user.
2. **Success:** The vote score and ranking are updated after the vote is recorded.
3. **Success:** The user's vote state is reflected in the forum view.
4. **Failure:** The vote is not recorded, the previous vote state remains authoritative, and the student receives a clear error.

### B4. Main Success Scenario (Basic Flow)

1. The student opens a forum post list or post detail page.
2. The system displays the target's current vote score and the student's current vote state.
3. The student selects upvote or downvote on a post, comment, or answer.
4. The frontend sends `target_type`, `target_id`, and the selected `vote` value.
5. The backend validates the target type, target existence, vote value, permissions, and rate limits.
6. The system records or replaces the student's vote for that target.
7. The system returns the updated `vote_score`.
8. The system refreshes the vote score, ranking, and vote controls in the forum view.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Vote on a comment or answer

At basic flow step 3, the student votes on a comment or answer. The request uses `target_type: 'comment'` with the comment or answer identifier.

#### A2. Change an existing vote

At basic flow step 3, the student selects the opposite vote direction. The existing vote is replaced for the same target, preserving one active vote per user and target.

#### A3. Remove a vote

At basic flow step 3, the student removes the current vote by submitting `vote: 0`. The score is recalculated without an active vote for that target.

#### A4. Vote from list or detail

At basic flow step 1, the student votes from the post list or from post detail where the corresponding control is displayed.

### B6. Exception Flows

#### E1. Invalid vote value or target type
The system returns `400` with `INVALID_VOTE` (`48005`) and does not change the score.

#### E2. Duplicate vote conflict
The system returns `409` with `DUPLICATED_VOTE` (`48006`). The UI reflects the current vote and offers change or removal rather than creating a second active vote.

#### E3. Target not found
The system returns `404` with `POST_NOT_FOUND` (`48001`) or `COMMENT_NOT_FOUND` (`48002`) and refreshes the unavailable view.

#### E4. Unauthorized or forbidden vote
The system returns `401`, or `403` with `FORBIDDEN` (`48010`), and hides or disables the action for unauthorized users.

#### E5. Rate limit reached
The system rejects the vote and asks the student to retry later. `NFR-SEC-9` requires vote rate limiting, but no rate-limit status or error code is specified in proposals.

#### E6. Server or database failure
The system returns `500` with `DATABASE_ERROR` or `UNKNOWN_ERROR` (`45000`), leaves the previous vote state authoritative, and offers retry where supported.

### B7. Business Rules

1. `AC-19.1` / `FR-19.1`: Users can upvote or downvote a post.
2. `AC-19.2` / `FR-19.2`: Users can upvote or downvote a comment or answer.
3. `AC-19.3` / `FR-19.3`: A user cannot vote more than once on the same post or comment.
4. `AC-19.4` / `FR-19.4`: Users can change or remove their vote.
5. `AC-19.5` / `FR-19.5`: The vote score and ranking update after a vote is recorded.
6. The API vote value is `1 | 0 | -1`, where `0` is removal; a vote must target `post` or `comment`.
7. Authentication, server-side authorization, privacy, and moderation rules determine whether vote controls are available (`NFR-SEC-1`, `NFR-SEC-6`, `NFR-PRIV-7`).
8. Voting is rate-limited to reduce spam and abuse (`NFR-SEC-9`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-2, NFR-PERF-3 | The post list must load within 2 seconds, and post detail and comments must display within 2 seconds. |
| NFR-PERF-4 | A new vote must be reflected in the relevant forum view within 2 seconds. |
| NFR-PERF-6 | Forum notifications, including vote activity, must be delivered within 2 seconds under normal conditions. |
| NFR-SEC-1 | Authentication is required before accessing protected interactions. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized votes. |
| NFR-SEC-9 | Voting must be rate-limited to reduce spam and abuse. |
| NFR-PRIV-7 | Privacy settings apply consistently to forum posts, comments, member lists, and search results. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Select vote target | Basic flow steps 1-3; alternatives A1 and A4 |
| Change or remove vote | Basic flow step 3; alternatives A2-A3 |
| Permission filtering | Basic flow step 2; exception E4 |
| Duplicate-vote recovery | Basic flow step 6; exception E2 |
| Rate-limit recovery | Basic flow step 5; exception E5 |

### B10. Interface and Data Notes

- **Screen/flow path:** `screen_flow.md` gives `Forum -> University -> Major -> Course -> Post`, with `Trending -> Post`. `feature_flow.md` gives `List Post -> Post`, `Post -> Upvote / Downvote`, and `Comment -> Vote`.
- **UI components:** `list_post.md` recommends `VoteUpButton`, `VoteDownButton`, `PostVoteScoreText`, and `EmptyPostListState`; `post_management.md` recommends `VoteControl` with current score and user vote state.
- **Post list and detail fields:** `GET /forum/posts` returns `post_id`, `title`, `post_type`, `author`, `vote_score`, `comment_count`, `solved`, and `created_at` with `200`; failures are `400`, `401`, and `500`. `GET /forum/posts/:post_id` returns `post`, `comments`, `true_response`, `user_vote: -1 | 0 | 1`, and `saved` with `200`; failures are `404 POST_NOT_FOUND` (`48001`), `401`, and `500 (DATABASE_ERROR | UNKNOWN_ERROR)`, with `FORBIDDEN: 48010` also declared by `studitopia.get_forum_post`.
- **API endpoint and failures:** `POST /forum/votes` with body `{ target_type: 'post' | 'comment', target_id: string, vote: 1 | 0 | -1 }` returns `200` with `data: { vote_score: number }`. Failures are `400` with `(INVALID_VOTE)[]` (`48005`), `409` with `(DUPLICATED_VOTE)[]` (`48006`), `404` with `(POST_NOT_FOUND | COMMENT_NOT_FOUND)[]` (`48001`, `48002`), `401`, and `500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`. `studitopia.vote_forum_content(puser_id: uuid, ptarget_type: string, ptarget_id: uuid, pvote: integer)` returns `{vote_score: integer}` and declares `UNKNOWN_ERROR: 45000`, `POST_NOT_FOUND: 48001`, `COMMENT_NOT_FOUND: 48002`, `INVALID_VOTE: 48005`, `DUPLICATED_VOTE: 48006`, and `FORBIDDEN: 48010`.
- **Vote state and notifications:** `list_post.md` recommends `user_vote` as the current user's `-1 | 0 | 1` state; `post_management.md` says change/removal uses the same endpoint with `vote: 0`. `FR-38.1` and `NFR-PERF-6` include votes in forum activity notifications, but no vote-specific notification endpoint is defined in `API.md`.

### B11. Source Alignment Notes

- UC-04 lists voting as a downstream action after a Question or General Discussion post is published; UC-17 covers the vote action itself and does not repeat post-creation steps. UC-05 covers comment and answer creation and records vote context as related; UC-17 votes on those comments and answers without adding comments.
- `AC-19.3` prevents more than one vote per target, `AC-19.4` allows changing or removing a vote, and `API.md` exposes both a `409 DUPLICATED_VOTE` contract and `vote: 0` removal; `post_management.md` resolves this at the UI layer by reflecting current state and offering change/removal.
- `functional_requirement.md` and `list_post.md` refer to ranking updates, but `API.md` returns only `vote_score` from the vote endpoint; no ranking response field is specified. `FR-38.1` includes votes in forum notifications, but no notification payload or endpoint is specified in the read sources.
- Route names and component names in `list_post.md` and `post_management.md` are recommendations; `API.md` defines the exact endpoint and codes used above. No distinct included, extending, or specialized use case is named for US-19, so no new I-xx/E-xx/G-xx ID is introduced.
