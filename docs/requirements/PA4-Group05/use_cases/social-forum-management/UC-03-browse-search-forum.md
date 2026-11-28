# UC-03 — Browse and Search the University Forum

**Version:** `2.0`

**Performed by:** [Nguyen Chi Bao] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-03 |
| Name | Browse and Search the University Forum |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum (Primary) |
| Priority | High |
| Related User Stories | US-11, US-12, US-13, US-17, US-23 |
| Related Requirements | US-11, US-12, US-13, US-17, US-23; FR-11.1 to FR-11.4, FR-12.1 to FR-12.6, FR-13.1 to FR-13.5, FR-17.1 to FR-17.5, FR-23.1 to FR-23.5; NFR-PERF-2, NFR-PERF-3, NFR-PERF-5, NFR-SEC-4, NFR-SEC-6, NFR-PRIV-7, NFR-USE-3 |
| Source Documents | `proposals/use_cases_model/UC-03-browse-search-forum.md`; `proposals/use_cases_description.md` UC-03; `proposals/use_cases_model.md`; `proposals/use_case_diagrams.md`; `PA3-Group05/use_case.md` §3; `proposals/overview.md`; `proposals/functional_requirement.md`; `proposals/non_functional_requirement.md`; `proposals/userstory.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/list_post.md`; `proposals/post_management.md` |

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
        UC03(["UC-03<br/>Browse and Search the<br/>University Forum"])
        I04(["I-04<br/>Load Forum Post List"])
        E03(["E-03<br/>Search Forum"])
        E04(["E-04<br/>View Post Detail"])
    end

    Student --- UC03

    UC03 -. "include" .-> I04
    E03 -. "extend" .-> UC03
    E04 -. "extend" .-> UC03

    class Student actor
    class UC03 usecase
    class I04 included
    class E03,E04 extending
```

**Diagram notation.** Person shape = human actor; the system boundary contains the use cases; blue stadium = selected base use case UC-03; purple stadium = included use case I-04; green stadium = extending use cases E-03 and E-04; solid line = association; dashed arrow = include or extend. The diagram is copied verbatim from the focused UC-03 model.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary human actor | A registered student who browses university, major, and course forums, searches academic content, and opens posts to read details. |
| New University Student | Specialized human actor | Inherits the University Student association to UC-03 through actor generalization. |
| Registered University Student | Specialized human actor | Inherits the University Student association to UC-03 through actor generalization. |
| Post Author | Specialized human actor | Inherits the University Student association to UC-03 through actor generalization. |
| Room Owner or Manager | Specialized human actor | Inherits the University Student association to UC-03 through actor generalization. |

### A3. Relationships

#### A3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-03 Browse and Search the University Forum | Primary | Browses and searches academic discussions. |

#### A3.2 Generalization and Specialization

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| New University Student; Registered University Student; Post Author; Room Owner or Manager | University Student | Actor generalization | Each specialized student actor inherits the UC-03 association. |

#### A3.3 Include

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-03 Browse and Search the University Forum | I-04 Load Forum Post List | Load the relevant university, major, or course post list. |

#### A3.4 Extend

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-03 Search Forum | UC-03 Browse and Search the University Forum | The student performs a keyword or filtered search. | Add keyword, tag, author, and academic-context search with ranking. |
| E-04 View Post Detail | UC-03 Browse and Search the University Forum | The student opens a post from the list or search results. | Add full post detail, comments, answers, true response, attachments, and tools. |

### A4. Model Notes

1. The base browse path always includes I-04 because every browse or search experience is based on a forum post list.
2. Search and post detail are optional extensions because a student may browse without searching or opening a post.
3. UC-03 is part of the primary forum model; all specialized student actors inherit its association through University Student.
4. The focused diagram shows only the base actor University Student; the inherited associations of specialized student actors are documented in A3.2 rather than drawn as separate links.
5. Forum content is organized by University, then Major, then Course; each level must show only relevant posts and materials.
6. E-03 and E-04 correspond to the optional search and detail steps in the basic flow, not to separate primary-actor use cases.

## Part B — Use Case Specification

### B1. Brief Description

A student discovers relevant university, major, and course discussions, searches for academic content, and opens a post to read its full details. The forum is the primary collaboration feature of Studitopia. The trigger is opening **Forum** or submitting a forum search; the successful outcome is a relevant post list, ranked search results, a clear empty state, or a readable post detail view.

### B2. Preconditions

1. The student is authenticated with an active session.
2. University, major, course, and forum data are available.
3. The student has permission to view the selected forum content.

### B3. Postconditions

1. **Success:** The selected forum level and a relevant post list are displayed.
2. **Success:** Search and filters return ranked results, or a clear empty state is shown when nothing matches.
3. **Success:** The student can open a post and read its full content, metadata, discussion, attachments, and permitted actions.
4. **Failure:** The system displays an error or permission message without exposing restricted content.

### B4. Main Success Scenario (Basic Flow)

1. The student selects **Forum** from the main navigation.
2. The system opens the student's default university forum and displays the Forum entry, forum hierarchy, and post list.
3. The student selects a university; the system displays the majors offered by that university.
4. The student selects a major; the system displays the courses associated with that major.
5. The student selects a course; the system displays the course forum and its posts.
6. The system shows each post summary with title, author, post type, timestamp, vote score, comment count, and solved status.
7. The student optionally applies filters such as My Post, area, university, major, course, tags, and post type, and selects a sorting order such as newest, top trending, most voted, or most discussed.
8. The student optionally enters a keyword and searches by tag, title, content, author, university, major, or course.
9. The system ranks matching results by relevance and engagement and displays the filtered result set.
10. The student opens a post from the list or search results.
11. The system displays the full post content, author, post type, forum context, timestamp, vote score, tags, comments, answers, true response, attachments, and functional tools when present.
12. The system displays only the actions permitted for the student, such as vote, comment, save, report, or mark true response.

### B5. Alternative Flows

Unless otherwise stated, an alternative flow resumes at the next step of the basic flow.

#### A1. Browse another university

At basic flow step 3, the student selects another university forum when permitted. The system applies that university as the active browsing context and shows only content relevant to that context.

#### A2. Change forum context

The student switches directly between university, major, and course levels. The system updates the post list to match the selected level.

#### A3. No posts match

At basic flow step 9 or 10, no posts match the filters or search query. The system displays an empty state and offers to clear filters or change the search terms.

#### A4. Search without a keyword

The student applies only filters. The system returns results based on the selected forum context and filters.

#### A5. Return to a previous context

The student navigates back; the system restores the previous forum level and result state where supported.

### B6. Exception Flows

#### E1. Forum content cannot be loaded

The system displays an error state and a retry option without showing partial or stale restricted content.

#### E2. Selected post is unavailable or deleted

The system informs the student that the post is no longer available and returns them to the post list.

#### E3. Access is not permitted

The system denies access to private or restricted content and explains that the student lacks permission.

#### E4. Invalid search or filter combination

The system displays validation feedback and preserves the usable parts of the query.

### B7. Business Rules

1. Forum content is organized by University, then Major, then Course.
2. After login, the student's own university is the default forum context.
3. Each forum level must display only posts and materials relevant to that level.
4. Post summaries must include title, author, post type, timestamp, vote score, comment count, and solved status.
5. Search supports tags, title, content, author, university, major, and course.
6. Search results are ranked by relevance and engagement and can be filtered by post type, solved status, and time range.
7. Post detail must show the full content, metadata, discussion, marked true response, attachments, and functional tools when present.
8. Available post actions are determined by the student's permissions.
9. Privacy and forum-access rules apply consistently to post lists, post details, and search results.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-2 | A forum post list must load within 2 seconds under normal operating conditions. |
| NFR-PERF-3 | A post detail page and its comments must display within 2 seconds. |
| NFR-PERF-5 | Forum search results must return within 2 seconds for common queries. |
| NFR-SEC-4 | Private forum content and private-group content must be restricted to authorized users only. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-PRIV-7 | Privacy settings must apply consistently to forum posts, comments, member lists, and search results. |
| NFR-USE-3 | Navigation and interaction patterns must remain consistent across university, major, and course forums. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Change browsing context | Basic flow steps 3-5; alternatives A1-A2 |
| Apply filters | Basic flow step 7; alternative A4 |
| Search forum | Basic flow step 8; alternative A3 and exception E4 |
| View post detail | Basic flow step 10; exception E2 |
| Empty-result recovery | Basic flow step 9; alternative A3 |
| Restricted-content handling | Access check; exception E3 |

### B10. Interface and Data Notes

- **Screen flow.** `Forum → University → Major → Course → Post`; Home has the **Forum** entry; **Trending → Post** and **Trending → Related → Post** are also shown in `screen_flow.md`. `feature_flow.md` adds `Forum → Recommended → List Post`, `Forum → Search`, `List Post → Filter → My Post / Area / University / Major / Course / Tags`, `List Post → Post`, and `Post → Comment / Mark True Response / Upvote / Downvote / Save / Report / Moderate`. `list_post.md` proposes `ListPostPage` / `ForumPostListPage`, `/forum`, `/forum/:universityId/:majorId/:courseId`, and `/forum/posts/:postId` as recommendations, not source-confirmed routes.
- **Post-card summary fields.** Required summary fields are title, author, post type, timestamp, vote score, comment count, and solved status. `API.md` returns `post_id`, `title`, `post_type`, `author`, `vote_score`, `comment_count`, `solved`, `created_at`, and `total`. `list_post.md` additionally recommends tags, forum context badge, attachment indicator, and functional-tool badge; these are recommendation-layer fields.
- **Filter and sort fields.** Filters: My Post, area, university, major, course, tags, post type (`Discussion`, `Material`, `Functional`), solved status (`All`, `Solved`, `Unsolved`), and time range (`Today`, `7 days`, `30 days`, `All time`). Sorting: newest, top trending, most voted, most discussed; search results are ranked by relevance and engagement.
- **Search fields.** Keyword plus tags, title, content, author, university, major, and course under FR-23.1 and FR-23.2. `GET /forum/posts` declares `university_id?`, `major_id?`, `course_id?`, `tag?`, `search?`, `sort?` = `'newest' | 'trending' | 'most_voted' | 'most_discussed'`, `limit?`, and `offset?`.
- **Empty/error states.** Empty post/search results show a clear empty state with clear-filters or change-terms recovery; load failure shows an error banner with **Retry**; unavailable or deleted post shows a post-unavailable state with return-to-list; restricted content shows an access-denied state; invalid filter/search combinations show validation feedback and preserve usable query parts.
- **Recommendation rules.** From FR-24.1 to FR-24.5: recommend posts relevant to university, major, courses, and interests; recommend trending posts within the user's academic context; recommend unsolved questions the user may help with; allow dismissing irrelevant recommendations; refresh recommendations when preferences or forum context change. These rules appear in feature/UI sources but are not listed in the UC-03 Related Requirements field.
- **List and search API.** `GET /forum/posts` → `SUCCESS 200` with posts and total; `BAD_REQUEST 400`; `UNAUTHORIZED 401`; `INTERNAL_SERVER_ERROR 500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`. Database function: `studitopia.list_forum_posts(puniversity_id, pmajor_id, pcourse_id, ptag, psearch, psort, plimit, offset)` returning `post_id`, `title`, `post_type`, `author_id`, `vote_score`, `comment_count`, `solved`, `created_at`; errors `UNKNOWN_ERROR: 45000`, `INVALID_POST_TYPE: 48003`, `FORBIDDEN: 48010`.
- **Detail API.** `GET /forum/posts/:post_id` → `SUCCESS 200` with `post`, `comments`, `true_response`, `user_vote` (`-1 | 0 | 1`), and `saved`; `NOT_FOUND 404` with `POST_NOT_FOUND`; `UNAUTHORIZED 401`; `INTERNAL_SERVER_ERROR 500` with `(DATABASE_ERROR | UNKNOWN_ERROR)[]`. Database function: `studitopia.get_forum_post(ppost_id)`; errors `UNKNOWN_ERROR: 45000`, `POST_NOT_FOUND: 48001`, `FORBIDDEN: 48010`.
- **Permitted-action endpoints on detail.** `POST /forum/votes` → `200`, `400 INVALID_VOTE`, `409 DUPLICATED_VOTE`, `404 POST_NOT_FOUND | COMMENT_NOT_FOUND`, `401`, `500`; `POST /forum/posts/:post_id/save` → `200`, `404 POST_NOT_FOUND`, `401`, `500`; `PATCH /forum/posts/:post_id/true-response` → `200`, `404 POST_NOT_FOUND | COMMENT_NOT_FOUND`, `403 NOT_POST_OWNER | FORBIDDEN`, `401`, `500`; `POST /forum/posts/:post_id/comments` → `201`, `400 INVALID_POST_CONTENT`, `404 POST_NOT_FOUND | COMMENT_NOT_FOUND`, `401`, `500`; `POST /forum/reports` → `201`, `400 INVALID_REPORT_CATEGORY`, `404 POST_NOT_FOUND | COMMENT_NOT_FOUND`, `401`, `500`. Error-code register includes `48000 UNKNOWN FORUM ERROR`, `48001 POST_NOT_FOUND`, `48002 COMMENT_NOT_FOUND`, `48003 INVALID_POST_TYPE`, `48004 INVALID_POST_CONTENT`, `48005 INVALID_VOTE`, `48006 DUPLICATED_VOTE`, `48007 NOT_POST_OWNER`, `48008 ALREADY_TRUE_RESPONSE`, `48009 INVALID_REPORT_CATEGORY`, and `48010 FORBIDDEN`.
- **Privacy and permissions.** Private forum and private-group content must be restricted to authorized users; server-side authorization must prevent unauthorized access; privacy settings must apply consistently to forum posts, comments, member lists, and search results. Other university forums are browsable only when permitted. Detail actions such as vote, comment, save, report, and mark true response must be rendered and enforced according to permissions.
- **Persistence and visibility.** `studitopia.list_forum_posts` must return only posts visible to the requesting user; `studitopia.get_forum_post` must respect privacy and moderation visibility rules. The student's own university is the default forum context, and saved posts persist across forum context changes under FR-21.4.

### B11. Source Alignment Notes

1. The focused model, `use_case_diagrams.md`, and PA3 §3 contain the same UC-03 Mermaid diagram content; this export reproduces the focused model diagram verbatim.
2. `use_cases_description.md` and PA3 §3 agree on UC-03 goal, preconditions, postconditions, basic flow, five alternatives A1-A5, four exceptions E1-E4, nine business rules, special requirements, and extension points.
3. Performance wording differs slightly: PA3 uses "within 2 seconds" while `non_functional_requirement.md` uses "≤ 2 seconds"; the PA3 special-requirements table is reproduced verbatim above.
4. Recommendations are described in `feature_flow.md`, `list_post.md`, and FR-24.1 to FR-24.5, but US-24/FR-24 are not in the UC-03 Related Requirements field and recommendations do not appear in the UC-03 basic flow; they are treated as interface/discovery notes only.
5. `list_post.md` labels routes such as `/forum`, `/forum/:universityId/:majorId/:courseId`, and `/forum/posts/:postId`, plus tags/attachment/tool badges, as recommendations; the proposal documents do not define confirmed screen routes or those summary fields as FR/AC requirements.
6. `API.md` exposes `search`, `tag`, and academic-context query parameters for `GET /forum/posts`, but not explicit solved-status or time-range parameters, although business rule 6 and FR-23.3 require those filters; no dedicated API is given for university/major/course catalog listing, My Posts, or saved-post lists.
7. A5 "Return to a previous context" has no separate row in the PA3 extension-point table; it is preserved as an alternative flow because it appears in both UC-03 narrative sources.
8. Session-expiry values conflict across proposal sources: FR-04.1 and US-04 use 15 minutes of inactivity while NFR-SEC-7 uses 30 minutes; neither is listed in the UC-03 Related Requirements field, so no expiry value is added to this use case.
9. `response_code.md` lists `UNKNOWN ERROR 45000` in the database table and `UNKNOWN DATABASE ERROR 45000` in the backend table; `API.md` reports `INTERNAL_SERVER_ERROR 500` data as `(DATABASE_ERROR | UNKNOWN_ERROR)[]` for both list and detail endpoints, and the exact names are retained as written in each source.
