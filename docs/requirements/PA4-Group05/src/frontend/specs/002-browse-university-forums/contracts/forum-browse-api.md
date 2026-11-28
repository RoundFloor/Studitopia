# Contract: Forum Browse API

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This contract lists every documented endpoint used by FR-005..FR-009, FR-017,
and the candidate retrieval step of search. Only endpoints in
`docs/architecture/api-catalog.md` are used. All paths are appended to
`API_BASE_URL` from `import.meta.env.VITE_API_BASE_URL` and executed through
`apiRequest` with an access token.

## Endpoints

| Request function | Endpoint | Success | Used for |
| --- | --- | --- | --- |
| `listUniversities()` | `GET /forum` | `200`, `TagResponse[]` | University directory, own-university selection, permitted other universities |
| `listMajors(chain)` | `GET /forum/:id` where chain is a university | `200`, `TagResponse[]` | Majors/areas within a university |
| `listCourses(chain)` | `GET /forum/:id` where chain is university + major | `200`, `TagResponse[]` | Courses/subjects within a major |
| `listLevelPosts(chain)` | `GET /forum/:id` where chain is university + major + course | `200`, `PostResponse[]` | Posts/materials at course level and context-scope search candidates |
| `listRelevantPosts(include, exclude)` | `GET /post/relevant?include=<enc>&exclude=<enc>` | `200`, `PostResponse[]` | Accessible-scope search candidates; omit both parameters to return all posts available to the requester |
| `getPost(id)` | `GET /post/:id` | `200`, `PostResponse` | Post detail view; returned `id` is re-encrypted as `post-retrieve` |
| `getRelevantTags(ids)` | `GET /tag/relevant?id=<enc>` | `200`, `RelevantTagResponse[]` | Tag names/counts for matching and filters |
| `resolveTags(chain)` | `GET /tag/resolve/:id` | `200`, `TagsByIdResponse[]` | Resolve chain tags to `id`, `name`, and `category` |
| `getTagDetail(id)` | `GET /tag/:id` | `200`, `TagDetailResponse` | Single tag detail with `category` and `created_time` |

Sources: `docs/architecture/api-catalog.md:322-343` (Forum),
`:349-381` (Post), `:388-408` (Tag).

## Chain rules

- `:id` is an encrypted chain, not a raw numeric id. Pass backend values
  unchanged; do not parse, decode, or re-encrypt in the frontend.
- Build chains in the order University → Major → Course.
- Never call a leaf endpoint with an incomplete or out-of-order chain.
- Changing an ancestor invalidates descendant chain ids in the context store.
- A chain containing a post is invalid for browse requests and maps to the
  invalid-context state.

## `GET /post/relevant` semantics

- Repeated `include` params: a returned post must carry every included tag.
- Repeated `exclude` params: a returned post must carry none of the excluded tags.
- Omitting one side means no filter for that side.
- Omitting both returns all posts accessible to the requester
  (`docs/architecture/api-catalog.md:358-360`). This is the only catalog-backed
  way to build an accessible-wide candidate set for search.

## Response alignment

| Catalog shape | Frontend type action |
| --- | --- |
| `TagResponse = { id, name, num_tag, num_post, icon: number \| null, description: string }` | Update `src/features/forum/tag/type.ts` to match; keep encrypted `id` as `string` |
| `PostResponse = { id, title, account_id, comment_id, true_response, created_time, tags[] }` | Add an API-aligned type in `src/features/forum/post/type.ts`; keep separate UI projection types for cards |
| `RelevantTagResponse = { id, name, num_post }` | Add the type used by `getRelevantTags` |
| `TagsByIdResponse = { id, name, category }` | Add the type used by `resolveTags` |
| `TagDetailResponse = TagResponse & { category, created_time }` | Align with the updated `TagResponse` |

The current source types disagree with the catalog
(`src/features/forum/tag/type.ts:1-7` omits `description` and types `icon` as
`string | null`). Source is authoritative for implemented behavior; the catalog
is the target contract. Any backend mismatch found during validation must be
reported rather than silently coerced.

## Runtime guards

- List endpoints MUST validate that the body is an array of objects with the
  required catalog fields before rendering.
- `getPost` MUST validate a single object with `id`, `title`, `account_id`, and
  `tags` before rendering.
- Guards live in `src/shared/api/guards.ts` and MUST NOT introduce `any`.
- Empty arrays are valid results and render the FR-017 empty state, not an error.
- Tag-name resolution MUST tolerate missing tag records and fall back to the
  encrypted tag id in the UI rather than failing the whole result set.

## Error and state mapping

| Condition | Frontend state |
| --- | --- |
| `401` | Handled by the centralized client refresh flow; unauthenticated users return to login |
| `400 [40001]` on tag endpoints with no `id` | Do not call the endpoint with an empty id list; show a local validation message |
| `409 [45006]` (`INVALID_ID`) | Invalid/denied chain → `AccessDeniedPage`; content withheld |
| `500`/network failure | Retryable error state in the page; no stale content presented as current |
| `200` with empty array | Explanatory empty state with a working parent breadcrumb |
| `200` with valid data | Success state with stable keys for rendered nodes/posts |

`45006` MUST be added to `src/shared/api/error.ts` before implementation
(`src/shared/api/error.ts:1-17`).

## Forbidden behavior

- No raw `fetch` from pages; no hard-coded API origin.
- No hard-coded majors, courses, posts, or counts.
- No endpoint outside `docs/architecture/api-catalog.md`; no assumed
  keyword-search endpoint.
- No client-side permission decision: a denied university is rendered only after
  the server rejects it or omits it from the directory.
