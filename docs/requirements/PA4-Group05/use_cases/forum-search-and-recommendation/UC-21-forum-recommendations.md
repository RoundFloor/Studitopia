# UC-21 — Receive Forum Recommendations

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-21 |
| Name | Receive Forum Recommendations |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum Search and Recommendation |
| Priority | Not specified in proposals |
| Related User Stories | US-24 |
| Related Requirements | FR-24.1, FR-24.2, FR-24.3, FR-24.4, FR-24.5; AC-24.1, AC-24.2, AC-24.3, AC-24.4, AC-24.5; NFR-PERF-1, NFR-PERF-2, NFR-SEC-1, NFR-SEC-4, NFR-PRIV-7 |
| Source Documents | `proposals/userstory.md` §7.2; `proposals/functional_requirement.md` US-24; `proposals/list_post.md`; `proposals/settings.md`; `proposals/post_management.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md` |

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
        UC21(["UC-21<br/>Receive Forum<br/>Recommendations"])
    end

    Student --- UC21

    class Student actor
    class UC21 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | Receives post recommendations based on university, major, courses, interests, and forum context, and can dismiss or refresh them. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-21 Receive Forum Recommendations | Primary | Views, opens, dismisses, and refreshes forum recommendations. |

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

1. In scope: relevant posts, trending posts, unsolved questions, dismissal of irrelevant recommendations, and refresh after preference or forum-context change.
2. Out of scope: library resource recommendations under US-26 and optional room recommendations under US-34.
3. Recommendations are a discovery layer over forum posts; they are not a separate post type and do not replace browsing, searching, or opening posts.
4. `API.md` defines no recommendation endpoint; `GET /forum/posts` supports academic-context filters and `sort: 'trending'`, but relevance and unsolved recommendation rules are requirement/UI-layer behavior.
5. No new I-xx, E-xx, or G-xx identifier is created; `RecommendedPostSection` and related controls are recommendation-layer UI components in `list_post.md`.

## Part B — Use Case Specification

### B1. Brief Description

A university student receives forum recommendations so that discussions relevant to courses and interests are easier to discover. The system recommends relevant posts, trending posts in the academic context, and unsolved questions the student may be able to help with.

The trigger is entering the forum recommendation area or changing preferences or forum context. The successful outcome is a visible recommendation section whose items can be opened, dismissed when irrelevant, or refreshed when preferences or context change.

### B2. Preconditions

1. The student is authenticated with an active session.
2. Learning preferences such as courses, subjects, interests, learning goals, and preferred study times are available where configured.
3. A university, major, or course forum context is selected.
4. At least one visible forum post is available for recommendation.

### B3. Postconditions

1. **Success:** The system displays recommendations relevant to the student's university, major, courses, and interests.
2. **Success:** Trending posts within the academic context and unsolved questions are included where available.
3. **Success:** A dismissed recommendation is no longer shown in the current recommendation view.
4. **Success:** Recommendations refresh when preferences or forum context change.
5. **Failure:** The system shows no restricted content and returns the student to the normal forum-list state with an error where applicable.

### B4. Main Success Scenario (Basic Flow)

1. The student opens the forum recommendation area.
2. The system identifies the active university, major, or course forum context.
3. The system uses available preferences for courses, subjects, interests, learning goals, and preferred study times.
4. The system selects posts relevant to the student's university, major, courses, and interests.
5. The system selects trending posts within that academic context.
6. The system selects unsolved questions where the student may be able to help.
7. The system displays the recommendations before or alongside the general post list.
8. The student opens a recommended post and the system shows its detail.
9. The student may dismiss an irrelevant recommendation or request a refresh after a preference or context change.

### B5. Alternative Flows

#### A1. Dismiss an irrelevant recommendation

At basic flow step 9, the student selects **Not relevant**. The system hides that recommendation from the current recommendation view under AC-24.4. Persistence of dismissal beyond that view is not specified in proposals.

#### A2. Refresh after preference change

The student updates preferences in Settings, then selects **Refresh** in the recommendation area. The system refreshes recommendations under AC-24.5 using the updated preferences.

#### A3. Refresh after forum-context change

The student switches university, major, or course forum context. The system refreshes recommendations under AC-24.5 for the new academic context.

#### A4. No recommendations available

If no recommendation candidates are available, the proposal sources do not specify a dedicated recommendation empty state. The general forum-list empty-state behavior applies only where a post list is shown.

#### A5. Related post discovery

Where a related-post section is shown after viewing a post, the system may display related posts from the same context. This is source-backed UI behavior in `list_post.md`, not a separate FR/AC requirement.

### B6. Exception Flows

No recommendation-specific exception flow is specified in the proposal sources; the following source-backed forum failures apply to the post data used by recommendations.

#### E1. Forum posts cannot be loaded

The system shows the forum load error state with **Retry** and does not display partial or stale recommendations.

#### E2. Recommended post is unavailable or restricted

The system omits unavailable or unauthorized posts because list and detail functions return only posts visible to the requesting user.

#### E3. Server or database failure

`GET /forum/posts` reports `INTERNAL_SERVER_ERROR` under `500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`; the system keeps the normal forum state and allows retry.

### B7. Business Rules

1. The system recommends posts relevant to the user's university, major, courses, and interests under FR-24.1 and AC-24.1.
2. The system recommends trending posts within the user's academic context under FR-24.2 and AC-24.2.
3. The system recommends unsolved questions where the user may be able to help under FR-24.3 and AC-24.3.
4. Users can dismiss irrelevant recommendations under FR-24.4 and AC-24.4.
5. Recommendations refresh when the user's preferences or forum context change under FR-24.5 and AC-24.5.
6. Preferences used for recommendations come from US-09 and FR-09.4 / AC-09.4; updates remain available under FR-09.5 / AC-09.5.
7. Recommendations must respect private forum content and privacy settings under NFR-SEC-4 and NFR-PRIV-7.
8. No numeric limit, ranking formula, or dismissal-retention period is specified in proposals.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-1 | Standard user actions must respond within 2 seconds. |
| NFR-PERF-2 | A forum post list must load within 2 seconds under normal operating conditions. |
| NFR-SEC-1 | Authentication is required before accessing protected forum resources. |
| NFR-SEC-4 | Private forum content and private-group content must be restricted to authorized users only. |
| NFR-PRIV-7 | Privacy settings must apply consistently to forum posts, comments, member lists, and search results. |
| Design constraint | Dismissal persistence, recommendation count, and ranking weights are not specified in proposals. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Academic-context detection | Basic flow step 2; alternative A3 |
| Preference retrieval | Basic flow step 3; alternative A2 |
| Relevant, trending, and unsolved selection | Basic flow steps 4-7 |
| Recommendation dismissal | Basic flow step 9; alternative A1 |
| Recommendation refresh | Basic flow step 9; alternatives A2-A3 |
| Unavailable or restricted posts | Exception E2 |

### B10. Interface and Data Notes

- **Confirmed flow:** `feature_flow.md` shows `Forum → Recommended → List Post`; `screen_flow.md` shows **Trending → Post** and **Trending → Related → Post**.
- **Recommendation UI:** `list_post.md` proposes `RecommendedPostSection` with heading **Recommended for you**, `RelevantForYouList`, `TrendingPostList`, `UnsolvedQuestionList`, `RelatedPostList`, and `RecommendationReasonText` examples "Related to CS101" and "Trending in your major."
- **Dismiss rule:** `DismissRecommendationButton` is labelled **Not relevant** and hides an irrelevant recommendation under AC-24.4; no persistence endpoint or retention rule is specified.
- **Refresh rule:** `RefreshRecommendationsButton` is labelled **Refresh** and requests updated recommendations when preferences or forum context change under AC-24.5.
- **Confirmed requirements:** FR-24.1 to FR-24.5 and AC-24.1 to AC-24.5 define relevant posts, trending posts, unsolved questions, dismissal, and refresh.
- **Preference data:** `settings.md` defines `LearningPreference` fields `courseIds`, `subjectTags`, `interestTags`, `learningGoals`, and `preferredStudyTimes`, used to recommend forum posts under FR-09.4.
- **API gap:** `API.md` defines no recommendation endpoint. `GET /forum/posts` supports `university_id?`, `major_id?`, `course_id?`, `tag?`, `search?`, `sort?` = `'newest' | 'trending' | 'most_voted' | 'most_discussed'`, `limit?`, and `offset?`, but no dedicated relevance, unsolved, dismiss, or refresh endpoint.
- **Post data fields:** Available post summaries come from `GET /forum/posts`: `post_id`, `title`, `post_type`, `author`, `vote_score`, `comment_count`, `solved`, and `created_at`.
- **Notifications and privacy:** No recommendation-specific notification rule is stated. Recommendations must respect visibility restrictions under NFR-SEC-4, NFR-PRIV-7, and the `list_forum_posts` requirement to return only posts visible to the requesting user.

### B11. Source Alignment Notes

- UC-03 mentions recommendation rules as interface/discovery notes in its source-alignment and interface sections, but recommendations are not in UC-03's basic flow and are not part of UC-03's related requirements; UC-21 keeps them as the dedicated US-24 behavior.
- UC-03's basic flow ends with full post detail and permitted actions; dismiss and refresh are not part of that basic flow.
- UC-05 has no recommendation behavior; the overlap is limited to opening a recommended post and viewing its discussion under existing post-detail behavior.
- `list_post.md` labels `RecommendedPostSection`, reason text, **Not relevant**, and **Refresh** as UI recommendations; the underlying recommendation, dismiss, and refresh rules are confirmed only by FR-24.1 to FR-24.5 and AC-24.1 to AC-24.5.
- `settings.md` supplies preference data for recommendation relevance through US-09 but defines no recommendation API or refresh endpoint.
- No distinct include, extend, actor-specialization, or recommendation use-case ID is named for US-24, so the diagram contains only the selected use case and its primary actor.
