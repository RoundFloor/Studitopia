# API Contract: Browsing Page (University Forum)

**Created**: 2026-11-28

**Status**: Proposed consolidated contract for the planned feature; existing code partially implements these routes.

## Authentication

All routes require a valid access session. Unauthenticated requests return `401 Unauthorized`.

## GET /api/v1/forum

Returns the university forums available to the student.

```json
{
  "status": 200,
  "data": [
    {
      "id": "opaque-context-token",
      "name": "University Name",
      "icon": "icon-reference",
      "description": "University forum",
      "post_count": 12
    }
  ]
}
```

- The student's verified university is the default context.
- Other universities appear only when the student is permitted to browse them.

## GET /api/v1/forum/:context

Returns the next hierarchy level or the post list for an opaque forum context token.

```json
{
  "status": 200,
  "data": [
    {
      "id": "opaque-child-context-token",
      "name": "Major or Course Name",
      "icon": "icon-reference",
      "description": "Forum level",
      "post_count": 5
    }
  ]
}
```

- A university context returns majors.
- A university+major context returns courses.
- A university+major+course context returns visible post summaries.
- Invalid or unauthorized context tokens return `409 Conflict` with `INVALID_ID` or an access-denied error.

## GET /api/v1/forum/posts

Returns post summaries matching the active context, search, filters, and sort order.

### Query Parameters

| Name | Required | Description |
|------|----------|-------------|
| `context` | No | Opaque forum context token; defaults to the student's university. |
| `search` | No | Keyword matched against title and content. |
| `tag` | No | Tag filter or search field. |
| `author` | No | Author name or identifier search field. |
| `university_id`, `major_id`, `course_id` | No | Academic context search fields. |
| `my_post` | No | `true` limits results to posts authored by the student. |
| `area` | No | Area filter. |
| `post_type` | No | `Discussion`, `Material`, or `Functional`. |
| `solved` | No | `all`, `solved`, or `unsolved`. |
| `time_range` | No | `today`, `7d`, `30d`, or `all`. |
| `sort` | No | `newest`, `trending`, `most_voted`, or `most_discussed`. |
| `limit`, `offset` | No | Pagination controls; defaults and maximums are implementation decisions. |

### Success Response (200)

```json
{
  "status": 200,
  "data": [
    {
      "post_id": "opaque-post-id",
      "title": "Question about CS101",
      "post_type": "Discussion",
      "author": "Student Name",
      "vote_score": 12,
      "comment_count": 4,
      "solved": false,
      "created_at": "2026-11-28T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

### Contract Rules

- Every item MUST include all seven summary fields.
- Results MUST satisfy every active filter simultaneously.
- Search results MUST be ranked by relevance and engagement with a stable tie-break.
- Results MUST exclude posts not visible to the student.
- No matches MUST return an empty `data` array with `total: 0`.
- Invalid query combinations MUST return `400 Bad Request` with validation feedback.

## GET /api/v1/forum/posts/:post_id

Returns full post detail.

```json
{
  "status": 200,
  "data": {
    "post": {
      "post_id": "opaque-post-id",
      "title": "Question about CS101",
      "content": "Full post content",
      "post_type": "Discussion",
      "author": "Student Name",
      "forum_context": "Course Name",
      "created_at": "2026-11-28T00:00:00.000Z",
      "vote_score": 12,
      "tags": ["CS101"]
    },
    "comments": [],
    "true_response": null,
    "user_vote": 0,
    "saved": false
  }
}
```

- Missing or deleted posts return `404 Not Found` with `POST_NOT_FOUND`.
- Restricted posts return an access-denied error without content.
- `user_vote` and `saved` are read-only indicators for the current student.
- Action availability follows existing permissions; browsing itself does not mutate post state.

## Error and Empty States

| Condition | Result |
|-----------|--------|
| No majors or courses | Empty hierarchy list with navigation still available. |
| No posts or search matches | `200` with empty `data` and `total: 0`; client shows clear empty state. |
| Forum load failure | `500` with existing forum error codes; client shows retry state. |
| Invalid context | `409 Conflict` with `INVALID_ID`. |
| Invalid query/filter combination | `400 Bad Request` with validation feedback. |
| Restricted or unavailable post | Access-denied or `404` state without restricted content. |
