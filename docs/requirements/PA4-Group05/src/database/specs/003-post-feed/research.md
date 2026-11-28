# Research: Post Feed

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

**Status**: All technical unknowns resolved. The Technical Context in `plan.md` contains no unresolved clarification markers; the decisions below settle the read-contract shape, forum scope/access, sorting, post type, derived fields, and validation behavior.

## 1. Read contract shape

- **Decision**: Add three new protected read functions — `GET_POST_FEED`, `GET_POST_DETAILS`, and `GET_POST_THREAD` — under `src/functions/post/`. Keep `GET_POST`, `GET_POST_BY_ID`, and `GET_COMMENT` signatures and ordering unchanged.
- **Rationale**: `GET_POST(P_INCLUDED_TAGS, P_EXCLUDED_TAGS)` is a public, documented function (`API.md:84`) with a fixed `ORDER BY P.ID` and no session, sort, or pagination parameters. Feature 002's plan explicitly commits to preserving its signature and its 13-column read model for DTO compatibility. An additive function can apply sorting and access checks without breaking existing consumers, and a protected detail/thread pair can enforce access before disclosing content that the existing unprotected functions would return to any caller.
- **Alternatives considered**: (a) Extend `GET_POST` with sort/session/pagination parameters — rejected as a breaking contract change and as mixing protected and unprotected semantics. (b) Extend feature 002's planned `GET_FORUM_POSTS` with a sort parameter — rejected because it would rewrite another feature's documented contract and couple feed sorting to a browse/search function; 002's function remains available for browse surfaces. (c) Sort the full result set in the consumer — rejected because it conflicts with paginated feeds and the 2-second visibility goal.

## 2. Forum scope and access enforcement

- **Decision**: Use `SESSION_CHECK(session_id, user_id)` plus feature 002's `CHECK_FORUM_ACCESS(session_id, user_id, university_id)` and `FORUM_DESCENDANT_TAGS(tag_id)` as prerequisites. The feed accepts one forum tag id and includes posts linked to that tag or any descendant; a post linked to several included tags appears once. Detail/thread reads check access against each forum tag on the requested post and raise `46010` when the university is restricted.
- **Rationale**: Those helpers already encode the project's access rules (own university always allowed; other universities allowed when public; `45005` for invalid session, `46010` for restricted forum). `TAG_CONTAIN.TAG_ID_A -> TAG_ID_B` is the existing hierarchy, and a recursive descendant helper is required so a university feed includes majors and courses. Reusing the helpers avoids a second, divergent access implementation.
- **Alternatives considered**: (a) Filter by exact tag id only — rejected because it drops child-forum posts and violates the selected-forum scope requirement. (b) Implement a local access check in feature 003 — rejected as duplication that could drift from 002. (c) Allow unprotected feed reads — rejected because FR-004 and FR-023 require restricted content to be withheld.

## 3. Sorting and tie-breaking

- **Decision**: Accept `P_SORT TEXT DEFAULT 'NEWEST'` with values `NEWEST`, `TOP_TRENDING`, `MOST_VOTED`, `MOST_DISCUSSED` (case-insensitive, blank treated as the default). Map them to `POST.CREATED_TIME DESC`, `POST.HOT DESC`, `(root.UPVOTE - root.DOWNVOTE) DESC`, and `root.COMMENT DESC` respectively. Always finish with `CREATED_TIME DESC, ID DESC`. Reject any other value with `22023`.
- **Rationale**: `POST.CREATED_TIME` and `POST.HOT` are trigger-maintained source columns; vote and reply totals are exposed by `GET_POST_BY_ID` as `UPVOTE`, `DOWNVOTE`, and `NUM_COMMENT`. A stable secondary order is required for repeatable pages, matching spec FR-018. `HOT` is a cumulative engagement score (`UPVOTE + DOWNVOTE + COMMENT*2 + AVG(child HOT)`, copied from the root comment) with no time decay, which matches the spec assumption that trending is not time-windowed.
- **Alternatives considered**: (a) Add a new persisted per-post score column — rejected as unnecessary schema drift and a maintenance burden. (b) Treat `HOT` as a true recent-trending score with time decay — rejected because it contradicts the documented source semantics and the spec assumption. (c) Tie-break by ID only — rejected because it does not guarantee newest-first ties required by the spec.

## 4. Post type representation

- **Decision**: Represent post type as a `TAG` whose `CATEGORY.NAME` is `DISCUSSION`, `QUESTION`, or `MATERIAL`, following feature 002's source-backed decision. Add an idempotent seed node `post-type-category.category.sql` so the feed is self-contained, and expose `POST_TYPE TEXT` through `GET_POST_TYPE(P_TAGS INT[])`. If a post has no type tag, report `DISCUSSION`; if several exist, report the type of the lowest type-tag id.
- **Rationale**: `POST` has no type column; `INCLUDE_POST_TAG` already links posts to categorized tags and `GET_TAGS_BY_ID` already returns tag `CATEGORY`. This preserves the existing DTO-compatible columns. The fallback and deterministic tie rule make the summary field always present and testable without adding write-side validation to `CREATE_POST`. The idempotent seed is safe alongside feature 002's planned category seed because inserts are conflict-tolerant.
- **Alternatives considered**: (a) Add `POST.POST_TYPE` column — rejected as an incompatible schema change that duplicates the tag taxonomy. (b) Derive type from tag names instead of categories — rejected because tag names are user-defined and category membership is the documented classification mechanism. (c) Omit type when absent — rejected because FR-008 requires a type on every feed row.

## 5. Derived summary and detail fields

- **Decision**: Derive `VOTE_SCORE = UPVOTE - DOWNVOTE`, `SOLVED = (TRUE_RESPONSE IS NOT NULL)`, and use `NUM_COMMENT` from the root comment for the displayed comment count. Keep `UPVOTE`, `DOWNVOTE`, and `TRUE_RESPONSE` in the detail read model alongside the derived fields. Document that `NUM_COMMENT` counts the reply subtree maintained by `TRIGGER_INSERT_COMMENT_COUNT`/`TRIGGER_UPDATE_COMMENT_COUNT`/`TRIGGER_DELETE_COMMENT_COUNT`.
- **Rationale**: These are the exact source-backed signals already returned by `GET_POST_BY_ID`; the triggers keep counters current, and `TRUE_RESPONSE` is the only accepted-response marker in the schema. Keeping raw and derived values together lets the backend render both the score/solved flag and any richer display it needs.
- **Alternatives considered**: (a) Store a computed vote score or solved boolean in `POST` — rejected because it duplicates trigger-maintained state. (b) Count only direct child comments — rejected because the source trigger maintains subtree counts; a different definition would require new counters and would not match existing `GET_POST` values.

## 6. Pagination and validation

- **Decision**: Use zero-based `P_OFFSET INT DEFAULT 0`, `P_LIMIT INT DEFAULT 20`, with `P_LIMIT > 100`, `P_LIMIT < 1`, or `P_OFFSET < 0` raising `22023`. An empty forum returns zero rows, not an error. The selected sort and page are retained by the caller and passed explicitly on each request; no database-side preference state is added.
- **Rationale**: Matches feature 002's `GET_FORUM_POSTS` pagination contract and the spec's 20-row page assumption. Bounded pages protect the 2-second visibility goal, and stateless sort parameters preserve FR-019 without new tables.
- **Alternatives considered**: (a) Cursor pagination — rejected as inconsistent with the planned browse/search contracts and unnecessary for this scope. (b) Persist sort preference in a table — rejected as new write scope outside the feed feature. (c) Clamp invalid limits silently — rejected because `22023` is the documented convention for invalid input.

## 7. Detail and accepted-response presentation

- **Decision**: `GET_POST_DETAILS` returns the full post body plus the same summary fields as the feed, raw vote counters, `TRUE_RESPONSE`, and tag ids. `GET_POST_THREAD` returns the existing `GET_COMMENT` columns plus `IS_ACCEPTED BOOLEAN`, derived from `POST.TRUE_RESPONSE`. The backend calls the protected detail function first, then the thread function, for the same `(session_id, user_id, post_id)`; missing posts return zero rows, restricted posts raise `46010`.
- **Rationale**: The existing `GET_COMMENT` recurses through the thread ordered by `CREATED_TIME, ID` and already exposes the comment ids needed to identify an accepted response. Adding `IS_ACCEPTED` removes the need for the backend to re-derive solved state from a separate post read, while leaving `GET_COMMENT` itself unchanged.
- **Alternatives considered**: (a) Return the thread inside the detail row as an array — rejected because it duplicates `GET_COMMENT` and complicates the flat SQL read model. (b) Rely on unprotected `GET_POST_BY_ID` for detail access — rejected because it would disclose restricted content. (c) Add a new accepted-response write function — rejected as out of scope for US-13.

## 8. Testing strategy

- **Decision**: Write Vitest specs before each SQL node under `tests/functions/post/`: `get-post-feed.spec.ts` (scope, summary fields, four sort orders, ties, dedupe, empty state, pagination bounds, `45005`/`46010`/`22023`), `get-post-details.spec.ts` (full body, derived fields, unknown/restricted post), and `get-post-thread.spec.ts` (thread shape and accepted-response flag). Use a shared `helpers.ts` built on `tests/functions/tag/helpers.ts`, plus a table-driven `pg.post-feed.testcases.ts` for the sort matrix.
- **Rationale**: The project constitution requires test-first database changes against a live test database, `vitest.config.ts` already runs specs sequentially, and existing post/tag helpers provide connection, reset, account, category, tag, and post fixtures. The sort matrix is data-driven to keep the four modes and tie cases unambiguous.
- **Alternatives considered**: (a) Unit-test SQL strings without a database — rejected by the TDD quality gate. (b) Extend `tests/functions/post/post.spec.ts` only — rejected because it is scoped to the existing post functions and would obscure feed-specific behavior. (c) Add a UI-level test — not applicable because this repository contains no frontend code.

## 9. Documentation and error contract

- **Decision**: Add the three public functions to `API.md` with signatures, parameters, returned columns, sort values, and SQLSTATE behavior (`22023`, `23503`, `45005`, `46010`). Keep the documented existing `GET_POST` and `GET_TAG` column lists aligned with source while adding the new nodes.
- **Rationale**: `API.md` is the single public SQL API reference and requires callers to branch on SQLSTATE, not message text. Feature 002 already reserves `46010` for restricted forums; reusing it keeps the error vocabulary consistent.
- **Alternatives considered**: (a) Document the functions only in `contracts/` — rejected because `API.md` is the canonical reference. (b) Introduce feed-specific error codes — rejected as unnecessary duplication of existing codes.
