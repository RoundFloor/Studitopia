# Implementation Plan: Forum Browse and Search

**Branch**: `002-forum-browse-search` | **Date**: 2026-11-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-forum-browse-search/spec.md`

**Source-alignment note**: This plan deliberately extends the existing `STUDITOPIA` SQL API instead of introducing a parallel application layer. It reuses `TAG`/`CATEGORY`/`TAG_CONTAIN` for the academic hierarchy, `ACCOUNT.DOMAIN_ID` plus `RELATED_EMAIL_TAG` for affiliation, `SESSION_CHECK` for protected reads, `INCLUDE_POST_TAG` for post/forum links, `POST.TRUE_RESPONSE` for solved status, and trigger-maintained `HOT` for engagement. New SQL nodes are limited to the missing browse, context, access, material-link, and search capabilities.

## Summary

deliver a backend-facing SQL contract that lets an authenticated student enter a default university forum, browse university/major/course forums, read relevant posts and attached materials, and search posts by keyword, field, filter, and ranked relevance. The implementation stays inside the repository's dependency-ordered SQL graph: reuses existing tag taxonomy and post reads, adds a small number of tables/functions with reverse scripts, and proves behavior with TDD Vitest specs against the live test database.

## Technical Context

**Language/Version**: TypeScript 7.0.2 (NodeNext, ESM) for compilation/runner/test tooling; SQL for all product contracts

**Primary Dependencies**: `pg` 8.23.1, `vitest` 5.1.0, `typescript` 7.0.2; PostgreSQL extensions `citext` and `pgcrypto` already installed by `src/schemas/init.sql`

**Storage**: PostgreSQL `STUDITOPIA` schema; existing tables are the canonical source for accounts, sessions, tags, posts, comments, votes, and files; runtime connection is supplied through generated `build/env.json`

**Testing**: `npm test` (`vitest run`) with `fileParallelism: false`, sequential live-DB specs; database reset/helper patterns in `tests/functions/authentication/helpers.ts` and `tests/functions/tag/helpers.ts`

**Target Platform**: Local/CI Node.js runtime with a disposable PostgreSQL test database

**Project Type**: Database schema and data layer exposing a public SQL API to the backend; no frontend or backend source lives in this repository

**Performance Goals**: Forum and search result views visible within 2 seconds; first search page of 20 results returned in under 2 seconds; navigation path resolved in one call per forum level

**Constraints**: Dependency-ordered `.sql` nodes under `src/`; `<name>.<dep1>_<dep2>.sql` naming; `UPPER_SNAKE_CASE` objects in `STUDITOPIA`; reverse `_`-prefixed scripts for new nodes; TDD with failing specs before SQL; test-first changes must pass `npm test`; backend is the only consumer of the schema

**Scale/Scope**: Academic hierarchy levels `UNIVERSITY`, `FACULTY`, `MAJOR`, `AREA`, `SUBJECT`, `COURSE`; post/material results paginated at 20 rows per page with a maximum of 100; no UI, no external search service, no new write endpoints beyond a reusable own-university guard

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Result | Evidence / Design Commitment |
| --------- | ---- | ------ | ---------------------------- |
| I. Schema-First & Dependency-Ordered Changes | Every change is an SQL node under `src/` with declared dependencies and a reverse script | PASS | All new tables/functions listed in Project Structure use `<name>.<deps>.sql`; each has a matching `_<name>.sql`. |
| II. Domain-as-Folder Architecture | New artifacts stay in their domain folders and cross-domain reads use documented interfaces | PASS | Hierarchy/context/access functions live in `src/functions/tag/`; post/material/search functions in `src/functions/post/`; file link table in `src/tables/file/`. |
| III. Centralized Configuration | No new credential handling | PASS | No config code changes; runtime continues through `scripts/sql.ts` and generated `build/env.json`. |
| IV. Standardized Naming & SQL Conventions | SQL objects `UPPER_SNAKE_CASE`; files dependency-named; no underscore in node keys | PASS | Object names such as `FORUM_CONTEXT`, `GET_MAJOR`, `SEARCH_POSTS`; node keys use hyphens with `_` only as dependency separator. |
| V. PostgreSQL Boundary | Backend remains sole consumer; existing DTO-compatible columns preserved | PASS | Existing `GET_POST`/`GET_POST_BY_ID` signatures remain unchanged; new functions are additive and documented in `contracts/`. |
| VI. Strict TDD | Specs written before SQL; behavior tested against live DB; regression tests included | PASS | Phase 1 contract/data-model drive spec files listed below; implementation order in tasks will put failing specs before each SQL node. |

**Post-design re-check**: PASS. The design adds no cross-domain implementation leakage, no direct frontend access, and no undocumented SQL node; all new nodes remain additive to the current schema API.

## Project Structure

### Documentation (this feature)

```text
specs/002-forum-browse-search/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── forum-context.md
│   ├── forum-browse.md
│   ├── forum-materials.md
│   └── forum-search.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── seeds/
│   ├── forum-category.category.sql          # Idempotent DISCUSSION/QUESTION/MATERIAL categories
│   └── _forum-category.sql
├── tables/
│   ├── tag/
│   │   ├── forum-context.account_tag.sql    # Per-account default university override
│   │   ├── _forum-context.sql
│   │   ├── forum-access.tag.sql             # Per-university browsability flag
│   │   └── _forum-access.sql
│   └── file/
│       ├── post-file.post_file.sql          # Post-to-material attachment link
│       └── _post-file.sql
├── functions/
│   ├── tag/
│   │   ├── forum-university-id.tag-contain.sql
│   │   ├── _forum-university-id.sql
│   │   ├── forum-descendant-tags.tag-contain.sql
│   │   ├── _forum-descendant-tags.sql
│   │   ├── check-forum-access.forum-university-id_get-account-by-id_session-check.sql
│   │   ├── _check-forum-access.sql
│   │   ├── assert-own-university.forum-university-id_get-account-by-id_session-check.sql
│   │   ├── _assert-own-university.sql
│   │   ├── get-major.check-forum-access_get-tag.sql
│   │   ├── _get-major.sql
│   │   ├── get-course.check-forum-access_get-tag.sql
│   │   ├── _get-course.sql
│   │   ├── get-forum-path.check-forum-access_forum-university-id.sql
│   │   ├── _get-forum-path.sql
│   │   ├── get-default-forum.check-forum-access_forum-context_get-account-by-id_session-check.sql
│   │   ├── _get-default-forum.sql
│   │   ├── set-default-forum.check-forum-access_forum-context_session-check.sql
│   │   └── _set-default-forum.sql
│   └── post/
│       ├── get-forum-posts.check-forum-access_forum-descendant-tags_get-post_post-file.sql
│       ├── _get-forum-posts.sql
│       ├── get-forum-materials.check-forum-access_get-post-by-id_post-file.sql
│       ├── _get-forum-materials.sql
│       ├── search-posts.check-forum-access_forum-descendant-tags_get-post.sql
│       └── _search-posts.sql

tests/
├── tables/
│   ├── tag/
│   │   ├── forum-context.spec.ts
│   │   └── forum-access.spec.ts
│   └── file/
│       └── post-file.spec.ts
└── functions/
    ├── tag/
    │   ├── forum-university-id.spec.ts
    │   ├── forum-descendant-tags.spec.ts
    │   ├── check-forum-access.spec.ts
    │   ├── assert-own-university.spec.ts
    │   ├── get-major.spec.ts
    │   ├── get-course.spec.ts
    │   ├── get-forum-path.spec.ts
    │   ├── get-default-forum.spec.ts
    │   └── set-default-forum.spec.ts
    └── post/
        ├── get-forum-posts.spec.ts
        ├── get-forum-materials.spec.ts
        ├── search-posts.spec.ts
        └── pg.search-posts.testcases.ts

API.md                    # Add the new public SQL functions and error codes 46010/46011
```

**Structure Decision**: Single database project. Every product capability is delivered as a documented SQL function under `src/functions/`, with supporting tables under `src/tables/`, baseline categories under `src/seeds/`, and mirrored Vitest specs under `tests/`. No Option labels or unused project trees are retained.

## Complexity Tracking

No constitution violations requiring justification. All additions fit the existing folder-as-package model and dependency graph without new projects or architectural layers.
