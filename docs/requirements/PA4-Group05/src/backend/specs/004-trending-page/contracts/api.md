# API Contract: Trending Page (Forum Recommendations)

**Created**: 2026-11-28

**Status**: Proposed contract for the planned feature; PA4 documents no existing recommendation endpoint.

## GET /api/v1/forum/recommendations

Returns recommendation collections for the authenticated student's active academic context.

### Authentication

- Requires a valid access session.
- Unauthenticated requests return `401 Unauthorized`.

### Query Parameters

| Name | Required | Description |
|------|----------|-------------|
| `context` | No | Opaque forum context token from the existing forum hierarchy. Defaults to the student's own university context. |
| `refresh` | No | When set to `true`, rebuilds recommendations using the latest learning preferences and context. |

### Success Response (200)

```json
{
  "status": 200,
  "context": {
    "university_id": 1,
    "major_id": 2,
    "course_id": 3
  },
  "sections": {
    "relevant": [
      {
        "post_id": "opaque-post-id",
        "title": "Question about CS101",
        "post_type": "Discussion",
        "author": "Student Name",
        "vote_score": 12,
        "comment_count": 4,
        "solved": false,
        "created_at": "2026-11-28T00:00:00.000Z",
        "reason": "Related to CS101"
      }
    ],
    "trending": [
      {
        "post_id": "opaque-post-id",
        "title": "Popular discussion",
        "post_type": "Discussion",
        "author": "Student Name",
        "vote_score": 45,
        "comment_count": 20,
        "solved": true,
        "created_at": "2026-11-27T00:00:00.000Z",
        "reason": "Trending in your major"
      }
    ],
    "unsolved": [
      {
        "post_id": "opaque-post-id",
        "title": "Unsolved database question",
        "post_type": "Discussion",
        "author": "Student Name",
        "vote_score": 3,
        "comment_count": 1,
        "solved": false,
        "created_at": "2026-11-26T00:00:00.000Z",
        "reason": "Unsolved question in your course"
      }
    ]
  }
}
```

### Contract Rules

- Every returned post MUST be visible to the requesting student.
- `unsolved` items MUST have `solved = false`.
- `reason` MUST reflect a real academic-context or interest match.
- Empty sections are returned as empty arrays.
- An invalid context token returns `409 Conflict` with `INVALID_ID`.
- A data load failure returns `500 Internal Server Error` with the existing forum error codes.
- Dismissal is a client-view action for this feature; no dismissal endpoint is defined.

## Recommendation Item Display Contract

| Field | Display requirement |
|-------|---------------------|
| `title` | Shown as the recommendation link label. |
| `author` | Shown in the item summary. |
| `post_type` | Shown as a category badge. |
| `vote_score`, `comment_count` | Shown with the same formatting used in the forum post list. |
| `solved` | Shown for unsolved-question items. |
| `reason` | Shown as short supporting text. |
| `post_id` | Used to open the existing post detail view. |

## Error and Empty States

| Condition | User-visible result |
|-----------|---------------------|
| No candidates in a section | Empty array; client shows a clear empty state or omits the section. |
| Recommendation data cannot be loaded | Retryable error state; no partial or stale recommendations. |
| Invalid or restricted context | Access-denied or invalid-context state; no restricted content. |
| Recommended post unavailable | Existing post-unavailable state when opened. |
