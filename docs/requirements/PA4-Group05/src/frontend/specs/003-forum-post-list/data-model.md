# Data Model: Forum Post List

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Date**: 2026-11-28

This model describes data consumed and owned by the post-list journey. It is
derived from `docs/architecture/api-catalog.md` and reuses the forum context
model from `specs/002-browse-university-forums/data-model.md`. No new backend
field is assumed.

## Entities

### ForumLevel

Reused from feature 002.

| Value | Meaning |
| --- | --- |
| `university` | University forum only; no major or course selected |
| `major` | A major within the selected university |
| `course` | A course within the selected major |

### ForumContext

Reused from feature 002. Relevant fields:

| Field | Type | Notes |
| --- | --- | --- |
| `level` | `ForumLevel` | Determines which post source is valid |
| `universityId`, `universityName` | `string` | Required |
| `majorId`, `majorName` | `string \| null` | Present for `major` and `course` |
| `courseId`, `courseName` | `string \| null` | Present for `course` only |

The encrypted chain used for post retrieval is assembled in
University → Major → Course order and passed unchanged to the API. See
[contracts/forum-context-storage.md](../002-browse-university-forums/contracts/forum-context-storage.md)
for persistence rules.

### PostResponse (transport)

Catalog shape at `docs/architecture/api-catalog.md:121-129`.

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Encrypted post id; opaque and passed unchanged |
| `title` | `string` | Display title |
| `account_id` | `string` | Encrypted author id; no display-name endpoint exists |
| `comment_id` | `string` | Encrypted comment root; not a count |
| `true_response` | `boolean` | Solved/true-response flag |
| `created_time` | `Date` | Creation time; no update time exists |
| `tags` | `string[]` | Encrypted tag ids |

### Post (domain projection)

| Field | Type | Availability |
| --- | --- | --- |
| `id` | `string` | From `PostResponse.id` |
| `title` | `string` | From `PostResponse.title` |
| `accountId` | `string` | From `account_id`; never treated as a name |
| `commentId` | `string` | From `comment_id`; never treated as a count |
| `isTrueResponse` | `boolean` | From `true_response` |
| `createdAt` | `Date` | From `created_time` |
| `tagIds` | `string[]` | From `tags` |
| `tagNames` | `string[]` | Resolved through documented tag endpoints where available |
| `authorName` | `null` | Unsupported by catalog |
| `type` | `null` | Unsupported by catalog |
| `voteScore` | `null` | Unsupported by catalog |
| `commentCount` | `null` | Unsupported by catalog |
| `content` | `null` | Unsupported by catalog |

**Relationship**: a post is returned either by a complete forum chain or by the
accessible-wide endpoint. The source determines the truthful scope label shown in
the UI; scope is never inferred from `tags` alone.

### PostSummary

UI projection rendered for each list row.

| Field | Type | Notes |
| --- | --- | --- |
| `post` | `Post` | Source domain object |
| `title` | `string` | Always displayed |
| `authorLabel` | `string` | Neutral unavailable label when no name exists |
| `typeLabel` | `string` | Neutral unavailable label |
| `timestampLabel` | `string` | Readable `createdAt`; exact date also available |
| `voteLabel` | `string` | Explicit unavailable label |
| `commentLabel` | `string` | Explicit unavailable label |
| `solvedLabel` | `string` | Solved/unsolved from `isTrueResponse`, with applicability disclosure |
| `unavailableFields` | `Array<"author" \| "type" \| "voteScore" \| "commentCount">` | Drives limitation notices and tests |

### PostSortOption

| Value | Catalog backing | UI behavior |
| --- | --- | --- |
| `newest` | `created_time` | Applied client-side; default |
| `trending` | none | Visible but marked unavailable; actual order remains newest |
| `topVoted` | none | Visible but marked unavailable; actual order remains newest |
| `mostDiscussed` | none | Visible but marked unavailable; actual order remains newest |

### PostSortState

| Field | Type | Notes |
| --- | --- | --- |
| `selected` | `PostSortOption` | From the canonical `sort` query parameter; defaults to `newest` |
| `applied` | `"newest"` | The only order backed by catalog data |
| `unavailable` | `boolean` | True when `selected !== applied`; drives disclosure |

### PostDetail

| Field | Type | Notes |
| --- | --- | --- |
| `post` | `Post` | Built from `GET /post/:id` response |
| `returnChain` | `string[]` | Forum chain from context for back navigation |
| `returnSort` | `PostSortOption` | Active sort from the originating list |
| `unavailableFields` | `Array<"content" \| "comments" \| "authorName" \| "type" \| "voteScore" \| "commentCount">` | Explicit detail limitations |

The `post-retrieve` id returned by `GET /post/:id` is opaque and MUST NOT be reused
as the path parameter of another detail request.

### PostListState

| Value | Meaning |
| --- | --- |
| `loading` | Request in flight; progress indication shown |
| `success` | Valid `PostResponse[]`, including `[]` |
| `empty` | Valid empty array; explanatory empty state shown |
| `error` | Retryable failure; `45006` maps to invalid-context state instead |
| `unsupportedLevel` | University/major level has no catalog-backed scoped post list |

### ApiError

Reused from feature 002.

| Field | Type | Notes |
| --- | --- | --- |
| `statusCode` | `number` | HTTP status from `apiRequest` |
| `errorCode` | `number[]` | Numeric codes, including `45006` (`INVALID_ID`) |

## Validation Rules

| Rule | Applies to | Requirement |
| --- | --- | --- |
| Complete chain for scoped posts | ForumContext | A post list for a forum MUST use University → Major → Course ids in order |
| No scoped claim at higher levels | PostListState | university/major levels MUST show `unsupportedLevel`, not an unrelated post set |
| Opaque ids | Post, PostDetail | MUST pass encrypted ids unchanged; MUST NOT decode or re-encrypt them |
| Response shape | PostResponse | Validate required fields before rendering; reject malformed bodies |
| Empty array | PostListState | `[]` is success with an empty state, not an error |
| No fabricated fields | PostSummary, PostDetail | Unsupported fields MUST use neutral/unavailable labels |
| Solved disclosure | PostSummary | `true_response` is shown as solved/unsolved with applicability disclosure because post type is unavailable |
| Timestamp semantics | PostSummary | Label as creation time only |
| Sort vocabulary | PostSortState | Only the four documented option values; default `newest` |
| Honest ordering | PostSortState | Unavailable options MUST disclose that newest is actually applied |
| Ties | PostSortState | Equal `createdAt` values use a stable `id` tie-break; disclose exact-tie limitation |
| No pagination claims | PostListState | Render only the returned array; no invented totals or cursors |
| Error mapping | ApiError | `401` via central refresh; `409 [45006]` invalid-context; other failures retryable |
| No secrets | all client state | No access tokens, refresh tokens, or credentials in post state |

## State Transitions

1. **Open course forum**: context provides a complete chain → `loading` →
   `success` with catalog posts or `empty` when the array is empty.
2. **Open university/major forum**: context has no complete chain →
   `unsupportedLevel` with navigation to child levels; no unrelated posts shown.
3. **Change sort**: update the canonical `sort` query parameter → recompute the
   client projection from the same fetched array → show `selected`, `applied`, and
   any disclosure. No new backend request is required for ordering.
4. **Switch forum context**: route/context changes → refetch for the new chain →
   `loading` → `success | empty | error`; carry the active `sort` value in links.
5. **Open post**: row selection navigates to `/forum/post/:postId` with the
   originating chain and sort → detail request → `success` or `error`;
   `45006` and missing posts render an unavailable message.
6. **Return from detail**: back/breadcrumb restores the originating chain, list,
   and selected sort.
7. **Failure**: `409 [45006]` → invalid-context/access state with content withheld;
   `500`/network → retryable error; no stale mock array is displayed.

## Documented Deviations

FR-13.2, FR-13.4, FR-13.5, and the timestamp tie-break cannot be fully satisfied
by `PostResponse` (`:121-129`). Author display name, post type, vote score,
comment count, content, and engagement history are absent from the catalog. The
UI MUST disclose these gaps rather than invent values; see
[contracts/forum-feed-api.md](./contracts/forum-feed-api.md) and the deviation
entries in [plan.md](./plan.md#complexity-tracking).
