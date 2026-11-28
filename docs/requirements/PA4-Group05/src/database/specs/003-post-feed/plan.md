# Implementation Plan: Post Feed

**Branch**: `003-post-feed` | **Date**: 2026-11-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-post-feed/spec.md`

**Source-alignment note**: This plan adds protected read functions to the existing `STUDITOPIA` SQL API instead of changing the existing `GET_POST`, `GET_POST_BY_ID`, or `GET_COMMENT` contracts. It reuses `SESSION_CHECK`, trigger-maintained `POST.HOT` and root-comment vote/reply counters, `POST.TRUE_RESPONSE` for solved status, `INCLUDE_POST_TAG` for forum and post-type classification, and the planned forum-scope helpers `FORUM_DESCENDANT_TAGS` and `CHECK_FORUM_ACCESS` from feature 002. New nodes are additive, dependency-named SQL files with reverse scripts, and behavior is proven with test-first Vitest specs against a live test database.

## Summary

Deliver a protected, sortable, paginated post feed for the selected university, major, or course forum, plus an access-checked post detail and comment-thread read that expose the summary fields, full content, and accepted response. The implementation stays inside the repository's dependency-ordered SQL graph: it reuses the existing post read model and engagement triggers, adds a small seed for the three post-type categories, and documents every new public function in `API.md`.

## Technical Context

**Language/Version**: TypeScript 7.0.2 (NodeNext, ESM) for compilation/runner/test tooling; SQL for all product contracts

**Primary Dependencies**: `pg` 8.23.1, `vitest` 5.1.0, `typescript` 7.0.2; PostgreSQL extensions `citext` and `pgcrypto` already installed by `src/schemas/init.sql`

**Storage**: PostgreSQL `STUDITOPIA` schema; `POST`, `COMMENT`, `VOTE`, `ACCOUNT`, `TAG`, `CATEGORY`, `TAG_CONTAIN`, and `INCLUDE_POST_TAG` are the canonical sources; runtime connection is supplied through generated `build/env.json`

**Testing**: `npm test` (`vitest run`) with `fileParallelism: false`, sequential live-DB specs; fixtures and reset helpers in `tests/functions/tag/helpers.ts` and `tests/functions/authentication/helpers.ts`

**Target Platform**: Local/CI Node.js runtime with a disposable PostgreSQL test database

**Project Type**: Database schema and data layer exposing a public SQL API to the backend; no frontend or backend source lives in this repository

**Performance Goals**: A 20-row feed page and a post detail view are returned within 2 seconds under normal load; sorting is applied by the database rather than by scanning every post in the client

**Constraints**: Dependency-ordered `.sql` nodes under `src/`; `<name>.<dep1>_<dep2>.sql` naming with `_<name>.sql` reverse scripts; `UPPER_SNAKE_CASE` objects in `STUDITOPIA`; test-first changes with `npm test` passing before merge; existing `GET_POST`/`GET_POST_BY_ID`/`GET_COMMENT` signatures unchanged; backend is the sole schema consumer

**Scale/Scope**: Four sort modes (`NEWEST`, `TOP_TRENDING`, `MOST_VOTED`, `MOST_DISCUSSED`); three post types (`DISCUSSION`, `QUESTION`, `MATERIAL`); 20 rows per feed page with a hard maximum of 100; forum scope covers university/faculty/major/area/subject/course tags; no UI, no new write endpoints for posts, votes, or comments

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Result | Evidence / Design Commitment |
| --------- | ---- | ------ | ---------------------------- |
| I. Schema-First & Dependency-Ordered Changes | Every change is an SQL node under `src/` with declared dependencies and a reverse script | PASS | New feed/detail functions, the post-type seed, and all helper nodes use `<name>.<deps>.sql` with matching `_<name>.sql` files. |
| II. Domain-as-Folder Architecture | New artifacts stay in their domain folders; cross-domain reads use documented interfaces | PASS | Feed and detail functions live in `src/functions/post/`; the type-category seed in `src/seeds/`; cross-domain reads go through `GET_POST_BY_ID`, `GET_COMMENT`, `SESSION_CHECK`, `CHECK_FORUM_ACCESS`, and `FORUM_DESCENDANT_TAGS` rather than internal table access from other domains. |
| III. Centralized Configuration | No new credential handling | PASS | No config changes; runtime continues through `scripts/sql.ts` and generated `build/env.json`. |
| IV. Standardized Naming & SQL Conventions | SQL objects `UPPER_SNAKE_CASE`; dependency-named files; reverse scripts; hyphenated node keys | PASS | Objects such as `GET_POST_FEED`, `GET_POST_DETAILS`, `GET_POST_THREAD`; node keys use hyphens and `_` only as a dependency separator. |
| V. PostgreSQL Boundary | Backend remains sole consumer; existing DTO-compatible columns preserved | PASS | Existing post/comment signatures remain unchanged; new read models are additive and documented in `contracts/` and `API.md`; no frontend or direct client schema access is introduced. |
| VI. Strict TDD | Specs written before SQL; behavior tested against live DB; regression tests included | PASS | The contract and data model in Phase 1 drive the spec files listed below; tasks will place failing Vitest specs before each SQL node, including regression cases for ties, scope, and access. |

**Post-design re-check**: PASS. The design adds no cross-domain implementation leakage, no direct frontend access, and no undocumented SQL node. All new nodes are additive to the current schema API; the only dependency on feature 002 is its documented forum-scope/access helper contracts, which land before the feed nodes.

## Project Structure

### Documentation (this feature)

```text
specs/003-post-feed/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   ├── post-feed.md
│   └── post-detail.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── seeds/
│   ├── post-type-category.category.sql
│   └── _post-type-category.sql
├── functions/
│   ├── tag/
│   │   ├── get-post-type.get-tags-by-id.sql
│   │   └── _get-post-type.sql
│   └── post/
│       ├── get-post-feed.check-forum-access_forum-descendant-tags_get-post-by-id_get-post-type.sql
│       ├── _get-post-feed.sql
│       ├── get-post-details.check-forum-access_get-post-by-id_get-post-type.sql
│       ├── _get-post-details.sql
│       ├── get-post-thread.check-forum-access_get-post-by-id_get-comment.sql
│       └── _get-post-thread.sql

tests/
└── functions/
    ├── tag/
    │   └── get-post-type.spec.ts
    └── post/
        ├── helpers.ts
        ├── pg.post-feed.testcases.ts
        ├── get-post-feed.spec.ts
        ├── post-summary.spec.ts
        ├── get-post-details.spec.ts
        └── get-post-thread.spec.ts

API.md                    # Document the three public feed/detail functions, sort values, and SQLSTATE behavior
```

**Structure Decision**: Single database project. Feed and detail capabilities are delivered as protected SQL read functions under `src/functions/post/`, shared post-type derivation under `src/functions/tag/`, an idempotent category seed under `src/seeds/`, and mirrored test-first Vitest specs under `tests/functions/post/`. Feature 002's `SESSION_CHECK`-based forum access and descendant-tag helpers are prerequisites; no duplicate access implementation is added.

## Complexity Tracking

No constitution violations requiring justification. All additions fit the existing folder-as-package model, dependency graph, naming rules, and TDD workflow.
