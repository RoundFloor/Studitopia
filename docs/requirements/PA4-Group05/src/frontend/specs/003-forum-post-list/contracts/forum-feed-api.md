# Contract: Forum Feed API

**Feature**: [spec.md](../spec.md) | **Plan**: [../plan.md](../plan.md)
**Data model**: [../data-model.md](../data-model.md)

This contract consumes only endpoints in `docs/architecture/api-catalog.md`.
No sort, pagination, search, vote, comment, or account-name endpoint is assumed.
Paths are appended to `API_BASE_URL` from `import.meta.env.VITE_API_BASE_URL` and
executed through `apiRequest` with an access token.

## Endpoints

| Request function | Endpoint | Success | Used for |
| --- | --- | --- | --- |
| `listCoursePosts(chain)` | `GET /forum/:id` with University + Major + Course chain | `200`, `PostResponse[]` | Scoped post list for the selected course forum |
| `listAccessiblePosts()` | `GET /post/relevant` with no `include`/`exclude` | `200`, `PostResponse[]` | Separate, explicitly labelled "all accessible posts" view only |
| `getPost(id)` | `GET /post/:id` | `200`, `PostResponse` | Post detail; returned `id` is re-encrypted as `post-retrieve` |
| `resolveTags(chain)` | `GET /tag/resolve/:id` | `200`, `TagsByIdResponse[]` | Resolve encrypted tag ids to names/categories where available |
| `getRelevantTags(ids)` | `GET /tag/relevant?id=<encrypted>` | `200`, `RelevantTagResponse[]` | Tag names/counts for relevant tags |

Sources: `docs/architecture/api-catalog.md:147-170` (index), `:322-343` (Forum),
`:349-381` (Post), `:388-424` (Tag).

## Forum-level support

| Selected level | Catalog response | Post-list behavior |
| --- | --- | --- |
| University | `TagResponse[]` of areas (`:336`) | `unsupportedLevel`; show child navigation, not a mislabelled post list |
| Major | `TagResponse[]` of subjects (`:337`) | `unsupportedLevel`; show child navigation, not a mislabelled post list |
| Course | `PostResponse[]` (`:338`) | `listCoursePosts(chain)` with the full chain |

`GET /post/relevant` omits both filters to return all posts accessible to the
requester (`:358-360`), but `PostResponse` has no forum-level field (`:121-129`).
It MUST NOT be described as university-, major-, or course-scoped.

## Chain and id rules

- `:id` is an opaque encrypted chain; pass backend values unchanged (`:74-90`).
- Assemble chains in University → Major → Course order.
- Do not call a leaf endpoint with an incomplete, out-of-order, or post-containing
  chain; those produce `409 [45006]` (`:340-343`).
- The `post-retrieve` id returned by `GET /post/:id` is opaque; do not decode it
  or reuse it as the `:postId` of another detail request (`:374-375`).

## Query parameters

| Parameter | Catalog support | Frontend rule |
| --- | --- | --- |
| `sort` on backend requests | None documented | Never send; ordering is client-side only |
| `page`, `limit`, `offset`, `cursor` | None documented | Never send; render the returned array |
| `include`, `exclude` on `/post/relevant` | Repeated encrypted tag ids (`:351-360`) | Omit both for the accessible-wide view; no invented tag filters |
| `id` on `/tag/relevant` | Repeated encrypted tag ids (`:388-402`) | Never call with an empty id list |
| `sort` on canonical frontend routes | Frontend-only | Allowed as a view state parameter; see [forum-routes.md](../../002-browse-university-forums/contracts/forum-routes.md) |

## Response alignment

| Catalog shape | Frontend action |
| --- | --- |
| `PostResponse` (`:121-129`) | Define the API-aligned type in `src/entities/forum/type.ts`; import from the entity in `features/forum/feed` and `features/forum/post` |
| `TagsByIdResponse` (`:115-119`) | Use for resolved tag names/categories |
| `RelevantTagResponse` (`:109-113`) | Use for relevant tag names/counts |
| UI projection | Keep `PostSummary` and `PostDetail` availability labels in feature-owned UI types |

Current `src/features/forum/post/type.ts:1-13` is a UI-only mock shape and MUST
NOT be treated as the API contract.

## Field availability

| Spec field | Catalog source | Contract behavior |
| --- | --- | --- |
| Title | `title` | Display directly |
| Author | `account_id` | Neutral unavailable label; no arbitrary account-name endpoint |
| Post type | none | Neutral unavailable label |
| Timestamp | `created_time` | Readable creation time plus exact date; not an update time |
| Vote score | none | Explicit unavailable label |
| Comment count | none | Explicit unavailable label; `comment_id` is not a count |
| Solved status | `true_response` | Show flag with applicability disclosure |
| Content (detail) | none | Explicit unavailable label |
| Comments (detail) | none | Explicit unavailable label |

## Ordering contract

| Option | Contract behavior |
| --- | --- |
| `newest` | Client-side descending `created_time`; default; ties use a stable opaque `id` tie-break |
| `trending` | Option visible, marked unavailable; actual order remains newest and is labelled as such |
| `topVoted` | Option visible, marked unavailable; no vote score is invented |
| `mostDiscussed` | Option visible, marked unavailable; `comment_id` is not a count |

No backend ordering claim is made for any option. Exact `created_time` ties cannot
be broken by recency; the stable `id` tie-break and its limitation are disclosed.

## Runtime guards

- List responses MUST be arrays of objects containing required catalog fields
  before rendering.
- Detail responses MUST be a single object with at least `id`, `title`,
  `account_id`, `comment_id`, `true_response`, `created_time`, and `tags`.
- Guards live in `src/shared/api/guards.ts` (shared with feature 002) and MUST NOT
  introduce `any`.
- Missing tags or names fall back to the encrypted id in the UI; a failed tag
  resolution MUST NOT hide the post.
- Empty arrays are valid results and render the empty state, not an error.

## Error and state mapping

| Condition | Frontend state |
| --- | --- |
| `401 [40004]` | Handled by centralized refresh flow; unauthenticated users return to login |
| `409 [45006]` (`INVALID_ID`) | Invalid chain, tag id, or post id → invalid-context/unavailable state; withhold content |
| `500 [code]` or network failure | Retryable error state; no stale or mock content presented as current |
| `200` with `[]` | Explanatory empty state with working forum navigation |
| `200` with valid data | Success state with stable keys for posts |

`45006` MUST be added to `src/shared/api/error.ts:1-17` before implementation.

## Forbidden behavior

- No endpoint outside `docs/architecture/api-catalog.md`.
- No raw `fetch` from pages, no hard-coded API origin, no bearer token handling in
  pages (the current `FeedPage.tsx:228-259` pattern MUST be removed).
- No hard-coded posts, votes, comment counts, author names, post types, or bodies.
- No invented sorting score or claim that an unavailable ordering was applied.
- No client-side permission decision; backend rejection or omission is authoritative.
- No reuse of `post-retrieve` ids as detail path parameters.
