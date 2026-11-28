# UC-19 — Save Post

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-19 |
| Name | Save Post |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum Interaction |
| Priority | Not specified in proposals |
| Related User Stories | US-21 |
| Related Requirements | FR-21.1, FR-21.2, FR-21.3, FR-21.4; AC-21.1, AC-21.2, AC-21.3, AC-21.4; NFR-PERF-1, NFR-SEC-1, NFR-SEC-6, NFR-PRIV-7 |
| Source Documents | `proposals/userstory.md` §6.4; `proposals/functional_requirement.md` US-21; `proposals/post_management.md`; `proposals/list_post.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md`; `proposals/settings.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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
        UC19(["UC-19<br/>Save Post"])
    end

    Student --- UC19

    class Student actor
    class UC19 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | A registered student who saves a useful discussion or material post and returns to it later through the saved list. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-19 Save Post | Primary | Saves or removes a post and views the user-scoped saved list. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor generalization or specialization is named in the proposal sources for this story. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No distinct included use case is named in the proposal sources for this story. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No distinct extending use case is named in the proposal sources for this story. |

### A4. Model Notes

1. In scope: saving a post, removing a saved post, listing saved posts, and keeping saved posts available across forum context changes.
2. Out of scope: voting, commenting, true-response marking, reporting, and post creation, which are separate forum requirements.
3. No new I-xx, E-xx, or G-xx identifier is created; the proposal sources name no distinct included, extending, or specialized use case for saving posts.
4. `API.md` defines a save/unsave endpoint and a `saved` field on post detail, but no dedicated saved-list endpoint; this gap is retained rather than filled with an invented route.
5. `SavedPostsPanel`, `SavedPostsLink`, `SavedPostList`, and suggested routes such as `/forum/saved` are source-backed UI recommendations, not confirmed API routes or FR/AC fields.

## Part B — Use Case Specification

### B1. Brief Description

A university student saves a post so that a useful discussion or material can be found again later. The saved list is user-scoped and remains available when the student changes forum context.

The trigger is selecting the saved-state control on a visible post. The successful outcome is an updated `saved` state, a saved post added to or removed from the user's list, and continued access to saved posts across university, major, and course forum contexts.

### B2. Preconditions

1. The student is authenticated with an active session.
2. The student can view the selected post.
3. The post exists and has not been deleted or made unavailable.
4. The system can determine the current user's saved state for the post.

### B3. Postconditions

1. **Success:** The post is saved for the requesting user and the saved state is returned as `saved: boolean`.
2. **Success:** The system provides the user's saved-post list and keeps saved posts available regardless of current forum context.
3. **Success:** A removal leaves the post unsaved and no longer listed as saved for that user.
4. **Failure:** The saved state is unchanged and the student receives a clear error.

### B4. Main Success Scenario (Basic Flow)

1. The student opens a forum post list or post detail view.
2. The system displays the post and the actions permitted for the student.
3. The system shows the current saved state for the post.
4. The student selects the save control.
5. The frontend sends the save request to the backend for the current user and target post.
6. The backend verifies the session, post visibility, and authorization, then sets the saved state for that user.
7. The backend returns `saved: boolean`.
8. The UI updates the saved state and the saved-post list when that list is displayed.

### B5. Alternative Flows

#### A1. Remove a saved post

At basic flow step 4, the student selects the saved-state control for an already saved post. The system unsaves the post for that user and returns the updated saved state.

#### A2. Change forum context

The student changes university, major, or course forum context and later opens the saved list. The saved posts remain available because saved state is user-scoped and persists across context changes.

#### A3. Empty saved list

The student opens **Saved Posts** when no posts are saved. The system shows the source-recommended `EmptySavedPostsState` with "No saved posts" and a browse link.

#### A4. Open a saved post

From the saved list, the student opens a saved post. The system displays the post detail if the post is still visible and available.

### B6. Exception Flows

#### E1. Post is unavailable

If the target post does not exist, the backend reports `POST_NOT_FOUND` (`48001`) under `404` in `API.md`. The UI leaves the saved state unchanged and shows a post-unavailable state.

#### E2. Student is unauthenticated

If the session is missing or invalid, the backend reports `UNAUTHORIZED` under `401`. The system denies the save or remove action and requires authentication.

#### E3. Authorization failure

`studitopia.save_forum_post(puser_id, ppost_id)` lists `FORBIDDEN` (`48010`), and `response_code.md` defines `48010 FORBIDDEN`. `API.md` does not specify an HTTP status for that code on this endpoint, so no status is invented.

#### E4. Server or database failure

If saving fails, the backend reports `INTERNAL_SERVER_ERROR` under `500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`. The UI preserves the prior saved state and offers retry where supported.

### B7. Business Rules

1. Users can save a post under FR-21.1 and AC-21.1.
2. The system provides a list of the user's saved posts under FR-21.2 and AC-21.2.
3. Users can remove a post from their saved list under FR-21.3 and AC-21.3.
4. Saved posts remain available regardless of current forum context under FR-21.4 and AC-21.4.
5. Save state is user-scoped; `studitopia.save_forum_post` saves or unsaves a post for the requesting user.
6. Only posts visible to the requesting user are returned by `studitopia.list_forum_posts`, and `studitopia.get_forum_post` respects privacy and moderation visibility rules.
7. No numeric limit on saved posts is specified in proposals.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-1 | Standard user actions must respond within 2 seconds. |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-PRIV-7 | Privacy settings must apply consistently to forum posts, comments, member lists, and search results. |
| Design constraint | Saved state must not be cleared when the student switches forum context. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Save or unsave decision | Basic flow steps 3-5; alternatives A1 and A4 |
| Saved-list display | Basic flow step 8; alternatives A2-A3 |
| Unavailable post handling | Basic flow step 2; exception E1 |
| Authentication and authorization | Basic flow step 6; exceptions E2-E3 |
| Backend failure recovery | Basic flow step 7; exception E4 |

### B10. Interface and Data Notes

- **Confirmed requirement:** `feature_flow.md` and `userstory.md` place **Save** after `Post`; `list_post.md` places `Post → Save` in the post-action path.
- **Recommendation UI:** `post_management.md` proposes `SavedPostsPanel`, `SavedPostList`, `SavedPostsLink` labelled **Saved Posts**, `SavePostButton` with **Save**/**Saved** state, and `EmptySavedPostsState` with "No saved posts". `list_post.md` also proposes `/forum/saved`; exact routes are not specified in proposals.
- **Confirmed endpoint:** `POST /forum/posts/:post_id/save` returns `SUCCESS 200` with `{saved: boolean}`; failures are `404` with `POST_NOT_FOUND`, `UNAUTHORIZED 401`, and `INTERNAL_SERVER_ERROR 500`.
- **Database contract:** `studitopia.save_forum_post(puser_id: uuid, ppost_id: uuid)` returns `{saved: boolean}` and lists `UNKNOWN_ERROR: 45000`, `POST_NOT_FOUND: 48001`, and `FORBIDDEN: 48010`.
- **Detail state:** `GET /forum/posts/:post_id` returns `saved: boolean` with `post`, `comments`, `true_response`, and `user_vote`; `404 POST_NOT_FOUND`, `401`, and `500` are defined.
- **Gap:** `API.md` has no saved-list endpoint and no dedicated My Posts endpoint. `post_management.md` marks the saved-list API as incomplete.
- **Data fields:** `saved`, `post_id`, `title`, `post_type`, `author`, `vote_score`, `comment_count`, `solved`, and `created_at` are defined by `API.md` list/detail contracts where applicable.
- **Notifications and privacy:** No save-specific notification requirement is stated. Saved-post display remains subject to forum visibility, privacy, and moderation visibility rules.

### B11. Source Alignment Notes

- UC-03 covers browsing, searching, opening posts, and listing save as a permitted detail action; UC-19 extracts only the save, unsave, saved-list, and persistence behavior without changing UC-03.
- UC-05 covers comment/answer creation and post-detail context where save may appear; it does not define saved-list behavior.
- `FR-17.4` and `AC-17.4` allow save to appear among permission-based actions, but UC-19's requirements are the specific `FR-21.1`–`FR-21.4` and `AC-21.1`–`AC-21.4`.
- `post_management.md` recommends UI components and routes for saved posts but explicitly states that the saved-list API is incomplete in `API.md`; no endpoint is invented here.
- No distinct include, extend, actor-specialization, or saved-list use-case ID is named for US-21, so the diagram contains only the selected use case and its primary actor.
