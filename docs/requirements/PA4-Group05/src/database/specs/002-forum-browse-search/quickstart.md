# Quickstart: Forum Browse and Search Validation

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Contracts**: [contracts/](./contracts/)

## Prerequisites

- Node.js runtime and npm dependencies installed (`npm install`).
- A disposable PostgreSQL database for the `STUDITOPIA` schema.
- `build/env.json` created by the SQL runner when prompted by `npm run all`; credentials are interactive and must not be committed.
- Verification only: tests reset shared forum tables. Never point them at a database whose data must be kept.

## Setup and execution

```bash
npm run build
npm run compile
npm run all
npm test
```

Expected setup outcomes:

- `npm run build` compiles `scripts/` and `tests/` into `dist/` without TypeScript errors.
- `npm run compile` lists every new SQL node in `build/tree.md` with acyclic dependencies.
- `npm run all` applies pending nodes in dependency order; no node reports `[FAILED]`.
- `npm test` passes all authentication regressions plus the new forum specs.

To reset the database before a clean run:

```bash
npm run restore init
npm run all
npm test
```

## Validation scenarios

| Step | Action Under Test | Expected Result | Contract / Data Model |
| ---- | ----------------- | --------------- | --------------------- |
| 1 | Register/activate a student and call `GET_DEFAULT_FORUM` with the issued session | Own university, faculty, and major resolve with `CONTEXT_SOURCE = AFFILIATION` | [forum-context.md](./contracts/forum-context.md) |
| 2 | Call `SET_DEFAULT_FORUM` with a valid university tag, then `GET_DEFAULT_FORUM` again | Override persists with `CONTEXT_SOURCE = SELECTION`; invalid session raises `45005` | [forum-context.md](./contracts/forum-context.md) |
| 3 | Create university/major/course tags and containment edges, then call `GET_MAJOR` and `GET_COURSE` | Only direct children of the expected category are returned, ordered by name/id | [forum-browse.md](./contracts/forum-browse.md) |
| 4 | Call `GET_FORUM_PATH` from a course tag | Ancestor id/name pairs are populated and the university ancestor is resolved | [forum-browse.md](./contracts/forum-browse.md) |
| 5 | Create posts linked to parent and descendant tags, then call `GET_FORUM_POSTS` | Posts from the forum and its descendants appear; unrelated universities do not; `MATERIAL_COUNT` is correct | [forum-browse.md](./contracts/forum-browse.md) |
| 6 | Mark another university restricted in `FORUM_ACCESS`, then call browse functions for it | `CHECK_FORUM_ACCESS` and protected reads raise `46010`; own university still works | [forum-context.md](./contracts/forum-context.md), [data-model.md](./data-model.md) |
| 7 | Attach a file to a post through `POST_FILE`, then call `GET_FORUM_MATERIALS` | Linked file is returned; unlinked file is not; restricted post raises `46010` | [forum-materials.md](./contracts/forum-materials.md) |
| 8 | Run `SEARCH_POSTS` with keyword, field, type, solved, and time-range cases from `pg.search-posts.testcases.ts` | Matching rows only; invalid type/range/pagination raises `22023`; ordering follows relevance then `HOT` | [forum-search.md](./contracts/forum-search.md) |
| 9 | Run a search guaranteed to match nothing | Zero rows are returned; backend empty-state criteria in [spec.md](./spec.md) are satisfied | [forum-search.md](./contracts/forum-search.md) |
| 10 | Call `ASSERT_OWN_UNIVERSITY` with tags from another university | Raises `46011`; own-university tags return `TRUE` | [forum-context.md](./contracts/forum-context.md) |

## Success-criteria cross-check

- SC-001/SC-004: steps 1–2 and 8 verify default context and search findability.
- SC-002/SC-003: steps 3–5 verify one-call navigation and result payloads; timing is asserted in the relevant specs.
- SC-005/SC-006: steps 6 and 9 verify restricted-access and zero-result behavior.
- SC-007/SC-008: step 8 ranking assertions and moderated review cover relevance and usability outcomes.
