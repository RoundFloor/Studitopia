# Quickstart: Post Feed Validation

**Feature**: [spec.md](./spec.md) | **Contracts**: [post-feed.md](./contracts/post-feed.md), [post-detail.md](./contracts/post-detail.md) | **Data model**: [data-model.md](./data-model.md)

This guide validates the feed feature end to end through the public SQL API and the live-database specs. It does not contain implementation code.

## Prerequisites

- Node.js with npm and `package-lock.json` dependencies installed (`npm ci`).
- A disposable PostgreSQL database with `citext` and `pgcrypto` available.
- A generated `build/env.json` containing the test connection details. The database runner prompts for and saves these values on first interactive run; test helpers reuse them non-interactively. `build/` is generated and must not be committed.
- Feature 002's forum-scope and access helpers (`SESSION_CHECK`, `FORUM_DESCENDANT_TAGS`, `CHECK_FORUM_ACCESS`) must already be applied to the test database before the feed nodes run.

## Build and apply SQL nodes

1. `npm run build` — compile the TypeScript runner and tests into `dist/`.
2. `npm run compile` — rebuild `build/tree.md` and `build/mermaid.md` after adding or renaming SQL nodes; confirm the graph is acyclic.
3. `npm run all` — apply pending forward SQL nodes in dependency order to the configured database.
4. `npm test` — run all Vitest specs against the live database; file execution is sequential.

To validate a single reverse script during development, use `npm run restore <key>`; reverse scripts are never executed by `npm run all`.

## Validation scenarios

| Scenario | How to validate | Expected outcome |
| -------- | --------------- | ---------------- |
| Feed scope | Call `GET_POST_FEED` with a university, a major under it, and a course under that major using the fixtures in `tests/functions/post/helpers.ts`. | Each scope returns only posts linked to that tag or its descendants; unrelated forums and duplicate rows are absent. |
| Summary fields | Create posts with distinct authors, type tags, timestamps, votes, replies, and accepted responses, then read one feed page. | Every row shows title, author, type, creation time, vote score, comment count, and solved status per [data-model.md](./data-model.md). |
| Sort matrix | Run the data-driven sort cases in `tests/functions/post/pg.post-feed.testcases.ts` for all four sort values, including ties. | Each order matches its contract definition and ends with `CREATED_TIME DESC, ID DESC`. |
| Pagination | Request an empty forum, a page larger than the fixture count, and invalid bounds. | Empty results return zero rows; invalid bounds raise `22023`. |
| Access and session | Call feed/detail/thread with an expired session and with a restricted university forum. | `45005` and `46010` are raised respectively; no post content is returned. |
| Detail and thread | Open a feed post through `GET_POST_DETAILS`, then read its thread through `GET_POST_THREAD`. | Full body, raw counters, tags, and one accepted-flagged comment for a solved post; zero rows for an unknown id. |
| Trigger consistency | Add a vote and a reply to a listed post, then re-read the feed. | `VOTE_SCORE`, `NUM_COMMENT`, `HOT`, and any affected sort positions change without new feed writes. |

## Targeted test commands

```bash
npx vitest run tests/functions/post/get-post-feed.spec.ts
npx vitest run tests/functions/post/get-post-details.spec.ts
npx vitest run tests/functions/post/get-post-thread.spec.ts
```

These commands must pass after `npm run all`. A failing command indicates a contract mismatch documented in the corresponding contract file; fix the failing spec/SQL pair before running the full `npm test` gate.
