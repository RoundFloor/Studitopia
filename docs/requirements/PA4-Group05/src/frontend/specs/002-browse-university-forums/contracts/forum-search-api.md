# Contract: Forum Search Using Catalog APIs

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This contract defines search using only endpoints listed in
`docs/architecture/api-catalog.md`. There is no dedicated keyword-search endpoint
in the catalog, so candidate retrieval and matching are split between documented
server endpoints and a deterministic frontend matcher in
`features/forum/search`.

## Candidate sources

| Scope | Endpoint | Query construction | Result |
| --- | --- | --- | --- |
| `context` | `GET /forum/:id` | cumulative University → Major → Course chain | `PostResponse[]` for the active forum level |
| `accessible` | `GET /post/relevant` | no `include`/`exclude` for all accessible posts; optional repeated `include`/`exclude` tag ids to narrow | `PostResponse[]` |
| Tag names / categories | `GET /tag/relevant?id=<enc>` and `GET /tag/resolve/:id` | tag ids from `PostResponse.tags` or the active chain | `RelevantTagResponse[]` / `TagsByIdResponse[]` |
| Post detail | `GET /post/:id` | encrypted post id from a result | `PostResponse` |

The catalog explicitly states that omitting both `include` and `exclude` on
`/post/relevant` returns all posts
(`docs/architecture/api-catalog.md:358-360`). This is the only catalog-backed
accessible-wide source; no new endpoint is introduced.

## Query normalization (frontend)

- Trim and lowercase the keyword; reject empty input and input longer than 100
  characters with inline guidance and no request.
- Split the keyword into terms for matching; keep the original trimmed value for
  display.
- Require at least one selected field from `tags`, `title`, `content`, `author`,
  `university`, `major`, `course`.
- Build query keys from keyword, fields, filters, scope, and chain so filter
  changes refetch candidates without leaking results across contexts.

## Field support

| Field | Support | Implementation |
| --- | --- | --- |
| `title` | Supported | Case-insensitive match on `PostResponse.title` |
| `tags` | Supported | Resolve `PostResponse.tags` to names via documented tag endpoints, then match names/ids |
| `university`, `major`, `course` | Supported | Match the active chain names from ForumContext or `TagsByIdResponse.name/category` |
| `solved` | Supported | Map `solved`/`unsolved` to `PostResponse.true_response` |
| time range | Supported | Compare `PostResponse.created_time` against `24h`, `7d`, `30d`, or all |
| `content` | Unsupported | `PostResponse` has no content field; show a limitation notice |
| `author` | Unsupported | Only `account_id` exists and no endpoint resolves arbitrary account display names; show a limitation notice |
| post type | Unsupported | No documented post-type field; show a limitation notice unless a documented tag category explicitly maps to one type |

Unsupported selections MUST remain visible as labelled limitations. They MUST
NOT silently disappear, and the UI MUST NOT claim a full match across those
fields.

## Deterministic ordering

Because the catalog provides no relevance or engagement ordering, results are
ordered by:

1. Exact title match.
2. Exact resolved tag-name match.
3. Partial title or tag-name match.
4. University/major/course context match.
5. Newest `created_time`.

`PostResponse` contains no per-post engagement count; `num_post` on
`RelevantTagResponse` is a tag-level count and is not used as a post score.
FR-014 engagement tie-breaking is therefore unavailable and is recorded as a
deviation in [plan.md](./plan.md#complexity-tracking). Ordering MUST be stable and
covered by unit tests.

## Errors and states

| Condition | Frontend behavior |
| --- | --- |
| `400 [40001]` validation / empty or oversized keyword | Show inline guidance; do not retry until corrected |
| `409 [45006]` invalid chain or tag id | Render invalid-context/access state; withhold results |
| `401` | Centralized client refresh; unauthenticated users return to login |
| `500` / network failure | Retryable error state with preserved query |
| `200` with empty array | FR-015 empty state with suggestions to broaden criteria |
| Whitespace-only keyword | Reject locally with guidance; no request |
| Unsupported field/type selected | Show limitation notice alongside partial results |

There is no `404`/`501` capability gate in this design because no new endpoint is
used.

## Frontend contract

- `features/forum/search/search.ts` owns query normalization, candidate fetches,
  tag-name resolution, matching, filters, scope, ordering, and the
  `useSearchPosts` TanStack Query hook.
- `SearchPage` wires shared `Input` and native labelled select controls, shows
  loading/error/empty/limitation states explicitly, and provides a clear-filters
  action that returns to the unfiltered candidate set for the current keyword.
- The top-bar search in `ForumLayout` navigates to `/forum/search?q=...` rather
  than storing unused local state.

## Rejected alternatives

- New `GET /post/search` endpoint: rejected because the user requires only the
  catalog APIs.
- Extending `/post/relevant` with keyword parameters: rejected because the
  catalog is fixed and `include`/`exclude` are tag-specific.
- Client-side full-corpus scanning without scope: rejected because SC-009 makes
  unbounded fetches unsafe; scoped documented endpoints are used instead.
- Static, mocked, or invented results: rejected because it would create false
  success and invalidate quickstart validation.
