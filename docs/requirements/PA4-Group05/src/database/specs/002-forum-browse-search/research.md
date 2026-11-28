# Research: Forum Browse and Search

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Date**: 2026-11-28

This research resolves the design questions raised by the specification using only the current repository source as the baseline.

## 1. Academic hierarchy representation

- **Decision**: Reuse `STUDITOPIA.CATEGORY`, `STUDITOPIA.TAG`, and `STUDITOPIA.TAG_CONTAIN` as the forum hierarchy. Do not add separate university/major/course tables. Treat `TAG_ID_A` as the parent and `TAG_ID_B` as the child.
- **Rationale**: `src/tables/tag/category.init.sql`, `src/tables/tag/tag.category.sql`, and `src/tables/tag/tag-contain.tag.sql` already model arbitrary categorized tags and directed containment. `src/functions/tag/get-area.get-tag_tag-contain.sql` and `src/functions/tag/get-subject.get-tag_tag-contain.sql` establish the exact traversal pattern to follow. `src/functions/authentication/get-account-by-id.account_file.sql` already resolves university/faculty/major through `RELATED_EMAIL_TAG`.
- **Alternatives considered**: Separate `UNIVERSITY`, `MAJOR`, and `COURSE` tables would duplicate names, descriptions, icons, counters, and post links already handled by `TAG`/`INCLUDE_POST_TAG`, and would require DTO-breaking changes to existing read functions.

## 2. Major and course navigation

- **Decision**: Add `GET_MAJOR(session_id, user_id, university_id)` and `GET_COURSE(session_id, user_id, parent_id)`. `GET_MAJOR` reads direct `UNIVERSITY -> MAJOR` edges. `GET_COURSE` reads direct child `COURSE` edges from either a `MAJOR` or a `SUBJECT` parent, so both the specified university-to-major-to-course path and the existing seed-style university-to-area-to-subject-to-course path work without data migration. Add `GET_FORUM_PATH` and `FORUM_UNIVERSITY_ID` for breadcrumbs and access checks.
- **Rationale**: Source has no `GET_MAJOR`, `GET_COURSE`, or recursive traversal. `dummy-input/tag-contain.tag.sql` demonstrates `UNIVERSITY -> AREA -> SUBJECT -> COURSE`, while the functional requirement expects university-to-major-to-course. A single child-by-category lookup keeps the contract small and works with both edge sets.
- **Alternatives considered**: A fully generic `GET_CHILD_TAG(parent_id, category)` would cover all levels but would hide the required major/course contract behind an untyped parameter; a dedicated `SUBJECT -> COURSE` function alone would not satisfy the major path.

## 3. Default forum context

- **Decision**: Derive the initial context from `ACCOUNT.DOMAIN_ID` through `RELATED_EMAIL_TAG`, as `GET_ACCOUNT_BY_ID` already does. Add a single optional override row, `FORUM_CONTEXT`, keyed by account, storing the explicitly selected university. `GET_DEFAULT_FORUM` returns the override when present and the derived affiliation otherwise; `SET_DEFAULT_FORUM` is session-protected and validates the university tag.
- **Rationale**: `src/tables/authentication/account.domain_email_username.sql`, `src/tables/tag/related-email-tag.domain_tag.sql`, and the one-university-per-domain trigger already provide a reliable default. The spec also requires a remembered explicit choice, which cannot be represented by existing tables.
- **Alternatives considered**: Adding a column to `ACCOUNT` would break the existing DTO shape and still would not express "derived vs explicitly selected"; storing the choice only in the caller session would not survive across visits.

## 4. Cross-university browsing permission

- **Decision**: Add `FORUM_ACCESS(university_id, is_public)` with default-public semantics: no row means permitted. `CHECK_FORUM_ACCESS(session_id, user_id, university_id)` first calls `SESSION_CHECK`, resolves the owning university of the requested forum via `FORUM_UNIVERSITY_ID`, then permits access when the university is the caller's own affiliation or `is_public` is true. Restricted access raises SQLSTATE `46010`.
- **Rationale**: The spec permits browsing other universities "when permitted" and assumes read-only cross-university access by default. Source has no permission table, RLS, policies, or actor-aware read checks, so a minimal opt-in restriction table is the smallest source-aligned mechanism.
- **Alternatives considered**: Treating every university as always public would ignore the requirement; deriving permission solely from affiliation would prevent browsing other universities entirely; adding database roles/RLS would introduce access-control infrastructure absent from this repository and would not integrate with the existing session-parameter pattern.

## 5. Read-only enforcement and write guard

- **Decision**: Do not add new content-creation endpoints in this feature. Add `ASSERT_OWN_UNIVERSITY(session_id, user_id, tags)` as the reusable guard for any content-changing operation; it raises `46011` when any supplied tag resolves to a university other than the caller's own. All new browse/search functions are read-only.
- **Rationale**: Existing `CREATE_POST`, `CREATE_COMMENT`, `VOTE_COMMENT`, and file mutators accept an account id but do not call `SESSION_CHECK`. Changing their signatures would break current API consumers. An additive guard gives the backend an explicit, testable contract for FR-017 without altering existing write calls.
- **Alternatives considered**: Rewriting every existing mutator to require session/user parameters would be a larger, DTO-breaking change outside browse/search scope; relying only on frontend behavior would violate the backend-only consumer boundary.

## 6. Post type representation

- **Decision**: Represent post type as a `TAG` whose `CATEGORY.NAME` is `DISCUSSION`, `QUESTION`, or `MATERIAL`. Add those categories through an idempotent seed node. `SEARCH_POSTS` filters post type by joining `INCLUDE_POST_TAG` to `TAG` to `CATEGORY`.
- **Rationale**: `POST` has no type column, but `INCLUDE_POST_TAG` already links posts to categorized tags. This preserves `GET_POST_BY_ID`'s existing 13-column contract and works with `HOT` triggers that already watch `INCLUDE_POST_TAG`.
- **Alternatives considered**: Adding `POST.POST_TYPE` requires a schema migration and a new DTO field; deriving type from title text would be unreliable and untestable.

## 7. Solved status, time range, and materials

- **Decision**: Use existing `POST.TRUE_RESPONSE` for solved filtering and `POST.CREATED_TIME` for time-range filtering. Add `POST_FILE(post_id, file_id)` to attach existing account-owned `FILE` rows as post materials, and expose them through `GET_FORUM_MATERIALS`.
- **Rationale**: `src/tables/post/post.comment.sql` already has `TRUE_RESPONSE`, `CREATED_TIME`, and `HOT`. `src/tables/file/file.account.sql` has no post/course link, so a join table is the minimal way to satisfy material display without changing `FILE` ownership semantics.
- **Alternatives considered**: Reusing `FILE.ACCOUNT_ID` as a course id would misattribute ownership and break `GET_FILE_BY_ACCOUNT`; adding material columns to `POST` would duplicate file metadata.

## 8. Search implementation

- **Decision**: Implement `SEARCH_POSTS` as a single protected SQL function over `POST`, root `COMMENT`, `ACCOUNT`, `INCLUDE_POST_TAG`, `TAG`, and `CATEGORY`. Keyword matching uses case-insensitive pattern matching on title, root content, author display name/username, and tag names. Field parameters narrow by title, content, author, university, major, and course; university/major/course use `FORUM_DESCENDANT_TAGS` so child posts are included. Filters use the decisions in section 6 and 7.
- **Rationale**: Source contains only exact tag/name lookups (`GET_TAG_BY_NAME`, `GET_TAG_BY_EMAIL`) and tag-id filtering (`GET_POST`); there is no search service or text-search extension configured. Keeping search in SQL preserves the repository's single-API model and avoids new infrastructure.
- **Alternatives considered**: Adding `pg_trgm` or an external search engine would introduce new dependencies and an indexing/migration model not present in `src/`; client-side filtering would violate the backend-only consumer boundary and could not respect access rules.

## 9. Ranking and pagination

- **Decision**: Compute a numeric relevance score from weighted case-insensitive matches: title 5, tag name 3, content 2, author 1; add exact field matches as a smaller tie-bonus. Order by score descending, then `POST.HOT` descending, `CREATED_TIME` descending, `POST.ID` descending. Default page size 20, maximum 100, zero-based offset; invalid offset/limit raises `22023`.
- **Rationale**: `POST.HOT` is already maintained by `src/triggers/post/trigger-hot.comment_post_tag_include-post-tag.sql`, so engagement is source-backed. Explicit weights make ranking deterministic and testable without new ranking tables.
- **Alternatives considered**: Ordering only by `HOT` would ignore keyword relevance; ordering only by match would ignore the engagement requirement; unpaginated results would not meet the 20-item page assumption in the spec.

## 10. Session enforcement and error codes

- **Decision**: All new read/write contracts take `(session_id, user_id)` and call `STUDITOPIA.SESSION_CHECK(session_id, user_id)` first, following the existing protected-function pattern. Reuse `45005` for invalid sessions, `22023` for invalid input, `23503` for unknown tag/university/file references, and `23505` for duplicate links. Add `46010` for restricted forum access and `46011` for another university's content in a write guard.
- **Rationale**: `src/functions/authentication/session-check.session.sql` is the single existing session validator and raises `45005`; `API.md` documents SQLSTATE-based branching. New codes continue the existing `46xxx` range used for domain-style refusals.
- **Alternatives considered**: Returning `false` instead of raising for access failures would make denial indistinguishable from empty results; introducing a new auth mechanism would duplicate `SESSION_CHECK`.

## 11. Testing and graph impact

- **Decision**: Author Vitest specs before each SQL node, using `createClient`/`resetDatabase` from authentication helpers and `createPostTestClient`/`createTag`/`linkTags` from tag helpers. Add `pg.search-posts.testcases.ts` for data-driven keyword/filter/ranking cases. Run `npm run build`, `npm run compile`, `npm run all`, and `npm test` in that order; every new SQL node must appear in `build/tree.md` before execution.
- **Rationale**: `vitest.config.ts` disables file parallelism for DB specs; `scripts/node.ts` applies pending nodes by dependency order; the constitution requires test-first database changes and a clean reset sequence.
- **Alternatives considered**: Unit-only tests would not cover session, hierarchy, and trigger-maintained engagement behavior; adding SQL outside the compiled graph would bypass dependency ordering and the reverse-script gate.
