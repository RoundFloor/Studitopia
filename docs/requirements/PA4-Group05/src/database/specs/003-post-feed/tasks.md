---

description: "Task list for feature implementation"
---

# Tasks: Post Feed

**Input**: Design documents from `/specs/003-post-feed/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are included because the project constitution requires test-first database changes (Principle VI, `.specify/memory/constitution.md`). Each spec must fail before its SQL node is implemented.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing database project tooling and test connection before adding nodes

- [X] T001 [P] Confirm the npm scripts `build`, `compile`, `all`, and `test` in `package.json` and run `npm ci` if `node_modules` is absent
- [X] T002 [P] Confirm the generated test connection file `build/env.json` exists and remains uncommitted per `specs/003-post-feed/quickstart.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared helpers, post-type seed, and access prerequisites that MUST be complete before any user story

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Verify the prerequisite nodes `src/functions/tag/check-forum-access.forum-university-id_get-account-by-id_session-check.sql`, `src/functions/tag/forum-descendant-tags.tag-contain.sql`, and `src/functions/authentication/session-check.session.sql` exist and are applied before any feed work
- [X] T004 [P] Write failing tests in `tests/functions/tag/get-post-type.spec.ts` for `DISCUSSION`, `QUESTION`, `MATERIAL`, missing type tags, and multiple type tags
- [X] T005 [P] Add the idempotent seed node `src/seeds/post-type-category.category.sql` for the three categories named in `specs/003-post-feed/data-model.md`
- [X] T006 [P] Add the reverse script `src/seeds/_post-type-category.sql` for the post-type seed
- [X] T007 [P] Create shared fixtures in `tests/functions/post/helpers.ts` reusing the connection, reset, account, category, tag, and post helpers in `tests/functions/tag/helpers.ts`
- [X] T008 Implement `src/functions/tag/get-post-type.get-tags-by-id.sql` after T004 fails, applying the data-model rule "`POST_TYPE` is category of the lowest-id type tag in `TAGS`, or `DISCUSSION` when none" and "`DISCUSSION`, `QUESTION`, `MATERIAL`"
- [X] T009 [P] Add the reverse script `src/functions/tag/_get-post-type.sql`
- [X] T010 Run `npm run build && npm run compile && npm run all` and confirm foundational tests pass in `tests/functions/tag/get-post-type.spec.ts` with an acyclic graph in `build/tree.md`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - View Posts in the Selected Forum (Priority: P1) 🎯 MVP

**Goal**: Display a deduplicated, paginated post feed for the selected university, major, or course forum without leaking restricted content.

**Independent Test**: Call `GET_POST_FEED` with posts placed in several related and unrelated forums; each scope returns only its own posts and descendants, an empty forum returns zero rows, and invalid session/access/pagination inputs raise the documented SQLSTATEs.

### Tests for User Story 1

> **NOTE: Write these tests FIRST and confirm they FAIL before implementation**

- [X] T011 [P] [US1] Write failing scope, deduplication, empty-forum, pagination, `45005`, `46010`, and `22023` tests in `tests/functions/post/get-post-feed.spec.ts`
- [X] T012 [US1] Implement `src/functions/post/get-post-feed.check-forum-access_forum-descendant-tags_get-post-by-id_get-post-type.sql` with the 11-column read model in `specs/003-post-feed/contracts/post-feed.md`, descendant scope via `FORUM_DESCENDANT_TAGS`, `SESSION_CHECK` plus `CHECK_FORUM_ACCESS`, one row per post, and zero-based pagination bounded by "`P_LIMIT > 100`, `P_LIMIT < 1`, or `P_OFFSET < 0` raises `22023`"
- [X] T013 [P] [US1] Add the reverse script `src/functions/post/_get-post-feed.sql`
- [X] T014 [US1] Run `npx vitest run tests/functions/post/get-post-feed.spec.ts` and confirm the US1 independent test passes

**Checkpoint**: US1 is independently functional and testable

---

## Phase 4: User Story 2 - Understand Each Post at a Glance (Priority: P1)

**Goal**: Make every feed row scannable with title, author, type, creation time, vote score, comment count, and solved status.

**Independent Test**: Create posts with distinct authors, type tags, timestamps, votes, replies, and accepted responses; verify all seven summary values in `tests/functions/post/post-summary.spec.ts` against the data-model definitions.

### Tests for User Story 2

> **NOTE: Write these tests FIRST and confirm they FAIL before implementation changes**

- [X] T015 [P] [US2] Write failing summary tests in `tests/functions/post/post-summary.spec.ts` quoting the data-model rules verbatim: "`VOTE_SCORE` is root upvotes minus root downvotes", "`NUM_COMMENT` is the trigger-maintained root reply count", "`SOLVED` is true when `TRUE_RESPONSE` is set", "`POST_TYPE` is category of the lowest-id type tag in `TAGS`, or `DISCUSSION` when none", and "`CREATED_TIME` ... default sort key and tie-break key"
- [X] T016 [US2] Correct any summary derivation gap in `src/functions/post/get-post-feed.check-forum-access_forum-descendant-tags_get-post-by-id_get-post-type.sql` so all seven fields match `specs/003-post-feed/data-model.md` without changing the contract in `specs/003-post-feed/contracts/post-feed.md`
- [X] T017 [US2] Run `npx vitest run tests/functions/post/post-summary.spec.ts` and confirm the US2 independent test passes

**Checkpoint**: US1 and US2 are both independently functional and testable

---

## Phase 5: User Story 3 - Reorder the Feed (Priority: P2)

**Goal**: Sort the selected forum's feed by newest, top trending, most voted, or most discussed with stable tie-breaking.

**Independent Test**: Run the data-driven matrix for all four sort values against posts with deliberately different timestamps, `HOT`, vote scores, and comment counts, including ties and an invalid sort value.

### Tests for User Story 3

> **NOTE: Write these tests FIRST and confirm they FAIL before implementation changes**

- [X] T018 [P] [US3] Create the data-driven sort matrix in `tests/functions/post/pg.post-feed.testcases.ts` using the sort table in `specs/003-post-feed/data-model.md` and the `22023` rule in `specs/003-post-feed/contracts/post-feed.md`
- [X] T019 [US3] Add failing sort assertions to `tests/functions/post/get-post-feed.spec.ts` that consume the T018 matrix
- [X] T020 [US3] Extend `src/functions/post/get-post-feed.check-forum-access_forum-descendant-tags_get-post-by-id_get-post-type.sql` so `P_SORT` accepts case-insensitive `NEWEST`, `TOP_TRENDING`, `MOST_VOTED`, `MOST_DISCUSSED`, treats blank as `NEWEST`, rejects other values with `22023`, and always ends with `CREATED_TIME DESC, ID DESC`
- [X] T021 [US3] Run `npx vitest run tests/functions/post/get-post-feed.spec.ts` and confirm every sort and tie case passes

**Checkpoint**: All four sort modes work and are independently verifiable

---

## Phase 6: User Story 4 - Open a Post for Full Details (Priority: P2)

**Goal**: Open a feed post to read its full body, forum classifications, engagement values, and discussion thread with a clearly identified accepted response.

**Independent Test**: Call `GET_POST_DETAILS` then `GET_POST_THREAD` for one accessible post and verify full detail fields and exactly one accepted-flagged comment for a solved post; unknown posts return zero rows and restricted posts raise `46010`.

### Tests for User Story 4

> **NOTE: Write these tests FIRST and confirm they FAIL before implementation**

- [X] T022 [P] [US4] Write failing detail tests in `tests/functions/post/get-post-details.spec.ts` for full body, raw counters, tags, summary parity, unknown post, and restricted forum per `specs/003-post-feed/contracts/post-detail.md`
- [X] T023 [P] [US4] Write failing thread tests in `tests/functions/post/get-post-thread.spec.ts` for thread order, `IS_ACCEPTED` on a solved post, all-false `IS_ACCEPTED` on an unsolved post, and zero rows for an unknown post
- [X] T024 [US4] Implement `src/functions/post/get-post-details.check-forum-access_get-post-by-id_get-post-type.sql` following the signature and 16-column read model in `specs/003-post-feed/contracts/post-detail.md`
- [X] T025 [P] [US4] Add the reverse script `src/functions/post/_get-post-details.sql`
- [X] T026 [US4] Implement `src/functions/post/get-post-thread.check-forum-access_get-post-by-id_get-comment.sql` following the signature, ordering, and `IS_ACCEPTED` rule in `specs/003-post-feed/contracts/post-detail.md`
- [X] T027 [P] [US4] Add the reverse script `src/functions/post/_get-post-thread.sql`
- [X] T028 [US4] Run `npx vitest run tests/functions/post/get-post-details.spec.ts tests/functions/post/get-post-thread.spec.ts` and confirm the US4 independent test passes

**Checkpoint**: All user stories are independently functional and testable

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, graph integrity, full test gate, and final validation

- [X] T029 [P] Document `GET_POST_FEED`, `GET_POST_DETAILS`, `GET_POST_THREAD`, sort values, and SQLSTATEs `22023`, `23503`, `45005`, `46010` in `API.md`
- [X] T030 Run `npm run compile` and verify every new node and reverse node appears correctly in `build/tree.md`
- [X] T031 Run the full `npm test` gate defined in `package.json` after all story phases
- [X] T032 Execute every validation scenario in `specs/003-post-feed/quickstart.md` and confirm the expected outcomes for scope, summary, sorting, pagination, access, detail, and trigger consistency
- [X] T033 [P] Audit SQL object names, dependency-named files, and reverse scripts against `.specify/memory/constitution.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup; BLOCKS all user stories
- **User Stories (Phases 3–6)**: Depend on Foundational; US2 and US3 additionally depend on the feed function delivered by US1 because they refine the same contract
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

```text
Phase 1 (Setup)
      ↓
Phase 2 (Foundational)
      ├──→ US1 (P1) ──→ US2 (P1) ──→ US3 (P2)
      └──→ US4 (P2)   (can run in parallel with US1)
```

- **US1 (P1)**: Starts after Foundational; no dependency on other stories
- **US2 (P1)**: Needs the `GET_POST_FEED` function from US1 to test summary values; independently testable once US1 exists
- **US3 (P2)**: Needs the feed function from US1; adds sort behavior without changing the read-model columns
- **US4 (P2)**: Needs only Foundational helpers; can be built in parallel with US1–US3 because its functions use separate files

### Within Each User Story

- Tests MUST be written first and MUST fail before the SQL implementation or correction
- Seed/helper nodes before functions that depend on them
- Forward SQL node before its reverse script
- Targeted spec must pass before the story checkpoint

### Parallel Opportunities

- T001, T002 in Setup can run together
- T004, T005, T006, T007, T009 in Foundational can run together; T008 follows T004/T005
- T011 and T013 can run together after T010; T012 follows T011
- T015 can run while US1 tests are being finalized; T016 follows T015
- T018 can run in parallel with US2 work; T019 follows T018 and T020 follows T019
- T022 and T023 can run together; T024/T025 and T026/T027 can run in parallel after their tests
- T029 and T033 can run together in Polish

---

## Parallel Example: User Story 1

```bash
Task: "Write failing scope, deduplication, empty-forum, pagination, 45005, 46010, and 22023 tests in tests/functions/post/get-post-feed.spec.ts"
Task: "Add the reverse script src/functions/post/_get-post-feed.sql"
# After both complete:
Task: "Implement src/functions/post/get-post-feed.check-forum-access_forum-descendant-tags_get-post-by-id_get-post-type.sql"
```

## Parallel Example: User Story 2

```bash
Task: "Write failing summary tests in tests/functions/post/post-summary.spec.ts"
# After US1 feed function exists:
Task: "Correct summary derivation in src/functions/post/get-post-feed.check-forum-access_forum-descendant-tags_get-post-by-id_get-post-type.sql"
```

## Parallel Example: User Story 3

```bash
Task: "Create the data-driven sort matrix in tests/functions/post/pg.post-feed.testcases.ts"
# After the matrix exists:
Task: "Add failing sort assertions to tests/functions/post/get-post-feed.spec.ts"
# After tests fail:
Task: "Extend P_SORT handling in src/functions/post/get-post-feed.check-forum-access_forum-descendant-tags_get-post-by-id_get-post-type.sql"
```

## Parallel Example: User Story 4

```bash
Task: "Write failing detail tests in tests/functions/post/get-post-details.spec.ts"
Task: "Write failing thread tests in tests/functions/post/get-post-thread.spec.ts"
Task: "Add reverse script src/functions/post/_get-post-details.sql"
Task: "Add reverse script src/functions/post/_get-post-thread.sql"
# After tests fail:
Task: "Implement src/functions/post/get-post-details.check-forum-access_get-post-by-id_get-post-type.sql"
Task: "Implement src/functions/post/get-post-thread.check-forum-access_get-post-by-id_get-comment.sql"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Run the US1 independent test in `tests/functions/post/get-post-feed.spec.ts`
5. Deploy/demo the scoped paginated feed if ready

### Incremental Delivery

1. Complete Setup + Foundational → shared helpers and access prerequisites ready
2. Add US1 → test independently → demo the MVP feed
3. Add US2 → test summary fields independently → demo the scannable feed
4. Add US3 → test sort matrix independently → demo sorted discovery
5. Add US4 → test detail and thread independently → demo the full read journey
6. Polish → full `npm test` gate and quickstart validation

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1 → US2 → US3 (same feed function, sequential)
   - Developer B: US4 (separate functions, parallel)
3. Each story completes and integrates independently

---

## Notes

- [P] tasks use different files and have no unfinished dependencies
- [Story] labels map tasks to spec.md user stories for traceability
- Every task names the exact file it changes or verifies
- Verify each test fails before its implementation task
- Do not commit generated `build/` or `dist/` outputs
- Stop at any checkpoint to validate the story independently
