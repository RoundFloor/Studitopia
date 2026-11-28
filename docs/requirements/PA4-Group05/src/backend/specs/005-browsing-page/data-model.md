# Data Model: Browsing Page (University Forum)

**Created**: 2026-11-28

## Entities

### University Student

- `student_id`: unique identifier of the authenticated student.
- `verified_university_id`: university used as the default forum context.
- `permissions`: rules determining which universities, posts, and detail actions are available.
- **Rules**: Authentication is required for protected forum browsing. Without a verified university, browsing opens in a usable fallback state.

### UniversityForum

- `university_id`: unique university identifier.
- `name`, `icon`, `description`, `post_count`: display metadata.
- **Rules**: A student may browse their own university and other universities only when permitted.

### Major

- `major_id`: unique major identifier.
- `university_id`: parent university.
- `name`, `icon`, `description`, `post_count`: display metadata.
- **Rules**: Only majors offered by the active university are shown.

### Course

- `course_id`: unique course identifier.
- `major_id`: parent major.
- `name`, `icon`, `description`, `post_count`: display metadata.
- **Rules**: Only courses associated with the active major are shown.

### ForumContext

- `level`: `university | major | course`.
- `university_id`, `major_id`, `course_id`: scope identifiers available at the active level.
- `context_token`: opaque session-bound token used by navigation.
- **Rules**: Exactly one context is active. A context change invalidates previous-level lists and pending results.

### PostSummary

- `post_id`: unique post identifier.
- `title`, `author`, `post_type`, `created_at`, `vote_score`, `comment_count`, `solved`.
- **Rules**: All seven fields are required in every visible summary. Restricted posts are excluded before display.

### PostDetail

- `post_id`, `title`, `content`, `author`, `post_type`, `forum_context`, `created_at`, `vote_score`, `tags`.
- `comments`, `answers`, `true_response`, `attachments`, `functional_tools`, `permitted_actions`.
- **Rules**: Detail visibility and action flags follow existing forum permissions and privacy settings. Browsing does not mutate post state.

### SearchQuery

- `keyword`: free-text search term.
- `tags`, `title`, `content`, `author`, `university_id`, `major_id`, `course_id`: optional search fields.
- **Rules**: Whitespace-only keywords are treated as no keyword. Search results are constrained to the active forum context.

### FilterSet

- `my_post`, `area`, `university`, `major`, `course`, `tags`, `post_type`, `solved_status`, `time_range`.
- `sort`: `newest | trending | most_voted | most_discussed`.
- **Rules**: All active filters must be satisfied simultaneously. Invalid combinations produce validation feedback while preserving usable query parts.

## Relationships

- A `UniversityForum` has zero or more `Major` records.
- A `Major` has zero or more `Course` records and belongs to one `UniversityForum`.
- A `ForumContext` references one university and optionally one major and one course.
- A `ForumContext` contains zero or more visible `PostSummary` records.
- Each `PostSummary` opens one `PostDetail`.
- A `SearchQuery` and `FilterSet` operate over the visible posts of a `ForumContext`.

## State Transitions

1. Forum opened → default university context selected from the student's verified university.
2. Context changed → majors, courses, and post lists rebuild for the new scope.
3. Search or filter applied → result set rebuilds from the active context with all active criteria.
4. Post selected → post detail opens with read-only content and permission-filtered actions.
5. Load failure or restricted access → error state shown; no partial, stale, or unauthorized content retained.
