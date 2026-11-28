---

description: "Task list template for feature implementation"
---

# Tasks: Forum Browse and Search

**Input**: Design documents from `/specs/002-forum-browse-search/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Included because the project constitution requires strict TDD. Every test task MUST be written first and confirmed failing before its implementation task.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths follow `plan.md`; all SQL nodes use `<name>.<dep1>_<dep2>.sql` dependency naming with reverse `_<name>.sql` scripts

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create SQL and test directories per `plan.md`: `src/seeds/`, `src/tables/tag/`, `src/tables/file/`, `tests/tables/tag/`, `tests/tables/file/`, and `tests/functions/post/`
- [X] T002 [P] Verify `.specify/feature.json` resolves the `feature_directory` to `specs/002-forum-browse-search`
- [X] T003 [P] Verify baseline toolchain by running `npm run build` and `npm run compile` and confirming existing nodes are listed in `build/tree.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T004 [P] Author failing table spec for `FORUM_ACCESS` constraints in `tests/tables/tag/forum-access.spec.ts`: "One optional access row per university tag. Absence of a row means public", `UNIVERSITY_ID` must reference a `UNIVERSITY` tag, duplicate rows raise `23505`, restricted access raises `46010`
- [X] T005 [P] Author failing spec for `FORUM_UNIVERSITY_ID` in `tests/functions/tag/forum-university-id.spec.ts` covering university self-resolution, ancestor resolution, `NULL` for no ancestor, and `23503` for unknown tag
- [X] T006 [P] Author failing spec for `FORUM_DESCENDANT_TAGS` in `tests/functions/tag/forum-descendant-tags.spec.ts` covering input tag inclusion, recursive descendants, leaf tags, and unknown tag behavior
- [X] T007 [P] Author failing table spec for `POST_FILE` constraints in `tests/tables/file/post-file.spec.ts`: "A post may have many materials; a file may be attached to many posts. File ownership is unchanged", unknown post or file raises `23503`, duplicate attachment raises `23505`
- [X] T008 [P] Author failing spec for `CHECK_FORUM_ACCESS` in `tests/functions/tag/check-forum-access.spec.ts` covering own university, public other university, restricted university `46010`, invalid university category `22023`, unknown university `23503`, and invalid session `45005`
- [X] T009 Create `STUDITOPIA.FORUM_ACCESS` in `src/tables/tag/forum-access.tag.sql` with `UNIVERSITY_ID` primary key referencing `TAG`, `IS_PUBLIC BOOLEAN NOT NULL DEFAULT TRUE`, `CREATED_TIME`, `UPDATED_TIME`, and the constraint "One optional access row per university tag. Absence of a row means public"
- [X] T010 Add reverse script `src/tables/tag/_forum-access.sql` dropping `STUDITOPIA.FORUM_ACCESS`
- [X] T011 Implement `STUDITOPIA.FORUM_UNIVERSITY_ID(P_TAG_ID INT) RETURNS INT` in `src/functions/tag/forum-university-id.tag-contain.sql` using `TAG_CONTAIN` with `TAG_ID_A` as parent
- [X] T012 Add reverse script `src/functions/tag/_forum-university-id.sql` dropping the `FORUM_UNIVERSITY_ID` function
- [X] T013 Implement `STUDITOPIA.FORUM_DESCENDANT_TAGS(P_TAG_ID INT) RETURNS TABLE (ID INT)` in `src/functions/tag/forum-descendant-tags.tag-contain.sql` using recursive `TAG_CONTAIN` traversal from parent `TAG_ID_A` to child `TAG_ID_b`
- [X] T014 Add reverse script `src/functions/tag/_forum-descendant-tags.sql` dropping the `FORUM_DESCENDANT_TAGS` function
- [X] T015 Implement `STUDITOPIA.CHECK_FORUM_ACCESS(SESSION_ID INT, USER_ID INT, P_UNIVERSITY_ID INT) RETURNS BOOLEAN` in `src/functions/tag/check-forum-access.forum-university-id_get-account-by-id_session-check.sql`, calling `SESSION_CHECK` first, permitting own or public universities, raising `46010` when restricted, `23503` for unknown university, and `22023` for non-university category
- [X] T016 Add reverse script `src/functions/tag/_check-forum-access.sql` dropping the `CHECK_FORUM_ACCESS` function
- [X] T017 Create `STUDITOPIA.POST_FILE` in `src/tables/file/post-file.post_file.sql` with `POST_ID` and `FILE_ID` foreign keys, `CREATED_TIME`, composite primary key `(POST_ID, FILE_ID)`, and the constraint "A post may have many materials; a file may be attached to many posts. File ownership is unchanged"
- [X] T018 Add reverse script `src/tables/file/_post-file.sql` dropping `STUDITOPIA.POST_FILE`
- [X] T019 Validate foundation gate by running the build/compile/apply/test sequence from `quickstart.md` and confirming `build/tree.md` includes all foundation nodes

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Enter the Default University Forum (Priority: P1) - MVP

**Goal**: A verified student lands in their own university forum after sign-in, with an explicit university selection persisted as the default context.

**Independent Test**: Register and activate a student, call `GET_DEFAULT_FORUM` with a valid session to confirm affiliation-derived context, call `SET_DEFAULT_FORUM` with a university tag and confirm `CONTEXT_SOURCE = SELECTION` on the next read, and confirm invalid sessions raise `45005`.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T020 [P] [US1] Author failing spec for affiliation-derived and selection-derived contexts in `tests/functions/tag/get-default-forum.spec.ts` including `CONTEXT_SOURCE`, missing affiliation, and `45005`
- [X] T021 [P] [US1] Author failing spec for `SET_DEFAULT_FORUM` in `tests/functions/tag/set-default-forum.spec.ts` covering insert/update, `22023` invalid category, `23503` unknown tag, `46010` restricted university, and `45005`
- [X] T022 [P] [US1] Author failing table spec for `FORUM_CONTEXT` in `tests/tables/tag/forum-context.spec.ts`: "One optional context per account; UNIVERSITY_ID must reference a tag in category UNIVERSITY", invalid references raise `23503`, invalid category raises `22023`

### Implementation for User Story 1

- [X] T023 [US1] Create `STUDITOPIA.FORUM_CONTEXT` in `src/tables/tag/forum-context.account_tag.sql` with `ACCOUNT_ID` primary key referencing `ACCOUNT`, `UNIVERSITY_ID` referencing `TAG`, `CREATED_TIME`, `UPDATED_TIME`, and the constraint "One optional context per account; UNIVERSITY_ID must reference a tag in category UNIVERSITY"
- [X] T024 [US1] Add reverse script `src/tables/tag/_forum-context.sql` dropping `STUDITOPIA.FORUM_CONTEXT`
- [X] T025 [US1] Implement `STUDITOPIA.GET_DEFAULT_FORUM(SESSION_ID INT, USER_ID INT)` in `src/functions/tag/get-default-forum.check-forum-access_forum-context_get-account-by-id_session-check.sql` returning university/faculty/major ids and names plus `CONTEXT_SOURCE` as `SELECTION` or `AFFILIATION`
- [X] T026 [US1] Add reverse script `src/functions/tag/_get-default-forum.sql` dropping the `GET_DEFAULT_FORUM` function
- [X] T027 [US1] Implement `STUDITOPIA.SET_DEFAULT_FORUM(SESSION_ID INT, USER_ID INT, P_UNIVERSITY_ID INT) RETURNS BOOLEAN` in `src/functions/tag/set-default-forum.check-forum-access_forum-context_session-check.sql` using upsert semantics for the single account context
- [X] T028 [US1] Add reverse script `src/functions/tag/_set-default-forum.sql` dropping the `SET_DEFAULT_FORUM` function
- [X] T029 [US1] Run focused US1 tests in `tests/functions/tag/get-default-forum.spec.ts`, `tests/functions/tag/set-default-forum.spec.ts`, and `tests/tables/tag/forum-context.spec.ts` and confirm all pass

**Checkpoint**: User Story 1 is fully functional and testable independently

---

## Phase 4: User Story 2 - Browse the University, Major, and Course Hierarchy (Priority: P1)

**Goal**: A student lists majors for a university, courses for a major or subject parent, and resolves a full forum path for breadcrumbs and context switching.

**Independent Test**: Create university/major/course and university/area/subject/course containment edges, call `GET_MAJOR`, `GET_COURSE`, and `GET_FORUM_PATH`, and verify only direct children of the expected category are returned with the correct ancestor chain.

### Tests for User Story 2

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T030 [P] [US2] Author failing spec for major listing in `tests/functions/tag/get-major.spec.ts` covering category filtering, ordering, restricted university `46010`, and invalid session `45005`
- [X] T031 [P] [US2] Author failing spec for course listing in `tests/functions/tag/get-course.spec.ts` covering direct child courses from `MAJOR` and `SUBJECT`, invalid parent category `22023`, and empty listings
- [X] T032 [P] [US2] Author failing spec for breadcrumb resolution in `tests/functions/tag/get-forum-path.spec.ts` covering all ancestor id/name pairs, missing levels as `NULL`, unknown tag `23503`, and restricted university `46010`

### Implementation for User Story 2

- [X] T033 [US2] Implement `STUDITOPIA.GET_MAJOR(SESSION_ID INT, USER_ID INT, P_UNIVERSITY_ID INT)` in `src/functions/tag/get-major.check-forum-access_get-tag.sql` returning the six-column forum summary ordered by `NAME`, `ID`
- [X] T034 [US2] Add reverse script `src/functions/tag/_get-major.sql` dropping the `GET_MAJOR` function
- [X] T035 [US2] Implement `STUDITOPIA.GET_COURSE(SESSION_ID INT, USER_ID INT, P_PARENT_ID INT)` in `src/functions/tag/get-course.check-forum-access_get-tag.sql` returning direct `COURSE` children of `MAJOR` or `SUBJECT` parents ordered by `NAME`, `ID`
- [X] T036 [US2] Add reverse script `src/functions/tag/_get-course.sql` dropping the `GET_COURSE` function
- [X] T037 [US2] Implement `STUDITOPIA.GET_FORUM_PATH(SESSION_ID INT, USER_ID INT, P_TAG_ID INT)` in `src/functions/tag/get-forum-path.check-forum-access_forum-university-id.sql` returning university/faculty/major/area/subject/course id and name fields with missing levels as `NULL`
- [X] T038 [US2] Add reverse script `src/functions/tag/_get-forum-path.sql` dropping the `GET_FORUM_PATH` function
- [X] T039 [US2] Run focused US2 tests in `tests/functions/tag/get-major.spec.ts`, `tests/functions/tag/get-course.spec.ts`, and `tests/functions/tag/get-forum-path.spec.ts` and confirm all pass

**Checkpoint**: User Stories 1 and 2 are independently functional

---

## Phase 5: User Story 3 - View Relevant Content at the Selected Forum Level (Priority: P1)

**Goal**: A student reads posts from the selected forum and its descendants, sees material counts, and opens linked materials.

**Independent Test**: Create posts linked to parent and descendant tags, attach one file through `POST_FILE`, call `GET_FORUM_POSTS` and `GET_FORUM_MATERIALS`, and verify forum scoping, `MATERIAL_COUNT`, pagination, and material visibility.

### Tests for User Story 3

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T040 [P] [US3] Author failing spec for forum post listings in `tests/functions/post/get-forum-posts.spec.ts` covering descendant inclusion, unrelated university exclusion, `MATERIAL_COUNT`, ordering, pagination `22023`, and `46010`
- [X] T041 [P] [US3] Author failing spec for material reads in `tests/functions/post/get-forum-materials.spec.ts` covering linked files, no-material posts, restricted post `46010`, unknown post `23503`, and invalid session `45005`

### Implementation for User Story 3

- [X] T042 [US3] Implement `STUDITOPIA.GET_FORUM_POSTS(SESSION_ID INT, USER_ID INT, P_TAG_ID INT, P_OFFSET INT DEFAULT 0, P_LIMIT INT DEFAULT 20)` in `src/functions/post/get-forum-posts.check-forum-access_forum-descendant-tags_get-post_post-file.sql`, returning the existing 13 `GET_POST_BY_ID` columns plus `MATERIAL_COUNT`, ordered by `CREATED_TIME DESC`, `ID DESC`, with `P_OFFSET < 0`, `P_LIMIT < 1`, or `P_LIMIT > 100` raising `22023`
- [X] T043 [US3] Add reverse script `src/functions/post/_get-forum-posts.sql` dropping the `GET_FORUM_POSTS` function
- [X] T044 [US3] Implement `STUDITOPIA.GET_FORUM_MATERIALS(SESSION_ID INT, USER_ID INT, P_POST_ID INT)` in `src/functions/post/get-forum-materials.check-forum-access_get-post-by-id_post-file.sql`, returning file `ID`, `NAME`, `SRC`, `ACCOUNT_ID`, `CREATED_TIME` ordered by `CREATED_TIME`, `ID`, with no rows for a post without materials
- [X] T045 [US3] Add reverse script `src/functions/post/_get-forum-materials.sql` dropping the `GET_FORUM_MATERIALS` function
- [X] T046 [US3] Run focused US3 tests in `tests/functions/post/get-forum-posts.spec.ts` and `tests/functions/post/get-forum-materials.spec.ts` and confirm all pass

**Checkpoint**: User Stories 1, 2, and 3 are independently functional

---

## Phase 6: User Story 4 - Browse Another University's Forum (Priority: P2)

**Goal**: A student browses permitted other-university forums read-only and is denied restricted forums; a reusable guard prevents foreign-university content changes.

**Independent Test**: With two students from different universities, confirm a public other university is readable, a restricted university raises `46010`, and `ASSERT_OWN_UNIVERSITY` raises `46011` for foreign tags while accepting own or university-less tags.

### Tests for User Story 4

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T047 [P] [US4] Extend `tests/functions/tag/check-forum-access.spec.ts` with cross-university scenarios for public other university, restricted university `46010`, own-university always permitted, and read-only browse functions returning no restricted content
- [X] T048 [P] [US4] Author failing spec for `ASSERT_OWN_UNIVERSITY` in `tests/functions/tag/assert-own-university.spec.ts` covering own tags, university-less tags, foreign tags `46011`, unknown tag `23503`, and invalid session `45005`

### Implementation for User Story 4

- [X] T049 [US4] Implement `STUDITOPIA.ASSERT_OWN_UNIVERSITY(SESSION_ID INT, USER_ID INT, P_TAGS INT[]) RETURNS BOOLEAN` in `src/functions/tag/assert-own-university.forum-university-id_get-account-by-id_session-check.sql`, returning `TRUE` for own or university-less tags and raising `46011` for another university
- [X] T050 [US4] Add reverse script `src/functions/tag/_assert-own-university.sql` dropping the `ASSERT_OWN_UNIVERSITY` function
- [X] T051 [US4] Run focused US4 tests in `tests/functions/tag/check-forum-access.spec.ts`, `tests/functions/tag/assert-own-university.spec.ts`, `tests/functions/tag/get-major.spec.ts`, and `tests/functions/post/get-forum-posts.spec.ts` and confirm all pass

**Checkpoint**: Cross-university browsing and write-guard behavior are independently verified

---

## Phase 7: User Story 5 - Search Forum Posts (Priority: P2)

**Goal**: A student searches posts by keyword, tags, title, content, author, university, major, and course with paginated results.

**Independent Test**: Create posts with distinct titles, content, authors, tags, and forum associations, then run keyword and field searches from `pg.search-posts.testcases.ts` and verify expected rows, zero-result behavior, and invalid pagination `22023`.

### Tests for User Story 5

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T052 [P] [US5] Extend `tests/functions/tag/tag.spec.ts` with failing assertions that `DISCUSSION`, `QUESTION`, and `MATERIAL` categories are seeded idempotently for post-type filtering
- [X] T053 [P] [US5] Author data-driven failing cases in `tests/functions/post/pg.search-posts.testcases.ts` for keyword, title, content, author, tag, university, major, course, and pagination validation
- [X] T054 [P] [US5] Author failing spec for keyword and field search in `tests/functions/post/search-posts.spec.ts` including case-insensitive partial matching, all-supplied-fields AND semantics, forum descendant scope, and zero-row results

### Implementation for User Story 5

- [X] T055 [US5] Create idempotent category seed in `src/seeds/forum-category.category.sql` inserting `DISCUSSION`, `QUESTION`, and `MATERIAL` into `STUDITOPIA.CATEGORY` only when absent
- [X] T056 [US5] Add reverse script `src/seeds/_forum-category.sql` deleting the three seeded categories
- [X] T057 [US5] Implement base `STUDITOPIA.SEARCH_POSTS` in `src/functions/post/search-posts.check-forum-access_forum-descendant-tags_get-post.sql` with keyword/title/content/author/tag/university/major/course parameters, `P_TAGS` requiring all ids, descendant forum scope, `P_OFFSET`/`P_LIMIT` validation with `22023`, and base ordering by `HOT DESC`, `CREATED_TIME DESC`, `ID DESC`
- [X] T058 [US5] Add reverse script `src/functions/post/_search-posts.sql` dropping the `SEARCH_POSTS` function
- [X] T059 [US5] Run focused US5 tests in `tests/functions/tag/tag.spec.ts`, `tests/functions/post/search-posts.spec.ts`, and `tests/functions/post/pg.search-posts.testcases.ts` and confirm all pass

**Checkpoint**: Keyword and field-based search is independently functional

---

## Phase 8: User Story 6 - Filter, Rank, and Recover from Search Results (Priority: P2)

**Goal**: A student filters results by post type, solved status, and time range, sees relevance-and-engagement ordering, and gets a zero-row result for empty searches.

**Independent Test**: Extend search fixtures with mixed post types, solved states, creation times, and engagement; apply each filter and confirm exact result membership, ordering by `RELEVANCE DESC`, `HOT DESC`, `CREATED_TIME DESC`, `ID DESC`, and a zero-row empty result.

### Tests for User Story 6

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T060 [P] [US6] Add failing filter, ranking, and empty-state cases to `tests/functions/post/pg.search-posts.testcases.ts`, including post type, solved status, time ranges `24H`/`7D`/`30D`/`ALL`, invalid type or range `22023`, and zero-row results
- [X] T061 [P] [US6] Extend `tests/functions/post/search-posts.spec.ts` with assertions for filter combinations, relevance weights title 5 / tag 3 / content 2 / author 1, `HOT` tie-breaking, and empty-state zero rows

### Implementation for User Story 6

- [X] T062 [US6] Add `P_POST_TYPE`, `P_SOLVED`, and `P_TIME_RANGE` filtering to `STUDITOPIA.SEARCH_POSTS` in `src/functions/post/search-posts.check-forum-access_forum-descendant-tags_get-post.sql`, validating `P_POST_TYPE` against `DISCUSSION`/`QUESTION`/`MATERIAL`, `P_TIME_RANGE` against `24H`/`7D`/`30D`/`ALL`, and raising `22023` for invalid values
- [X] T063 [US6] Add deterministic relevance scoring to `src/functions/post/search-posts.check-forum-access_forum-descendant-tags_get-post.sql` using title 5, tag 3, content 2, author 1, exact-field tie bonus, and final order `RELEVANCE DESC`, `HOT DESC`, `CREATED_TIME DESC`, `ID DESC`
- [X] T064 [US6] Verify in `src/functions/post/search-posts.check-forum-access_forum-descendant-tags_get-post.sql` that no matching rows returns an empty set without error so the backend can render the empty state
- [X] T065 [US6] Run focused US6 tests in `tests/functions/post/search-posts.spec.ts` and `tests/functions/post/pg.search-posts.testcases.ts` and confirm all pass

**Checkpoint**: All user stories are independently functional

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T066 [P] Update `API.md` with the new public SQL functions and error codes `46010` and `46011`
- [X] T067 [P] Reconcile final SQL signatures in `contracts/forum-context.md`, `contracts/forum-browse.md`, `contracts/forum-materials.md`, and `contracts/forum-search.md` with implemented functions
- [X] T068 Verify generated-files gate for `build/` and `dist/` by confirming no generated outputs are staged in `git status --short`
- [X] T069 Run the full validation sequence from `quickstart.md`: `npm run build`, `npm run compile`, `npm run all`, and `npm test`
- [X] T070 Run the complete regression suite with `npm test` and confirm authentication specs still pass alongside all forum specs

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1, US2, US3, US4, and US5 can proceed in parallel once Foundational is complete
  - US6 depends on US5 because it extends the shared `SEARCH_POSTS` function
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - no dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - no dependencies on other stories
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - no dependencies on other stories
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - reuses access checks from Foundational; independently testable
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - reuses `FORUM_DESCENDANT_TAGS` and `POST_FILE` from Foundational
- **User Story 6 (P2)**: Depends on User Story 5 - extends the same `SEARCH_POSTS` contract with filters, ranking, and empty-result behavior

### Within Each User Story

- Tests MUST be written and confirmed failing before implementation
- Table/helper nodes before functions that depend on them
- Forward SQL nodes before reverse scripts for the same object
- Core implementation before focused test validation
- Story complete before moving to next priority in a sequential team

### Parallel Opportunities

- Setup: T002 and T003 can run in parallel
- Foundational: T004 through T008 can run in parallel because they write different spec files
- US1: T020 through T022 can run in parallel
- US2: T030 through T032 can run in parallel
- US3: T040 and T041 can run in parallel
- US4: T047 and T048 can run in parallel
- US5: T052 through T054 can run in parallel
- US6: T060 and T061 can run in parallel
- After Foundational: US1, US2, US3, US4, and US5 can be assigned to different implementers

---

## Parallel Execution Examples

### User Story 1

```bash
Task: "Author failing spec for affiliation-derived and selection-derived contexts in tests/functions/tag/get-default-forum.spec.ts"
Task: "Author failing spec for SET_DEFAULT_FORUM in tests/functions/tag/set-default-forum.spec.ts"
Task: "Author failing table spec for FORUM_CONTEXT in tests/tables/tag/forum-context.spec.ts"
```

### User Story 2

```bash
Task: "Author failing spec for major listing in tests/functions/tag/get-major.spec.ts"
Task: "Author failing spec for course listing in tests/functions/tag/get-course.spec.ts"
Task: "Author failing spec for breadcrumb resolution in tests/functions/tag/get-forum-path.spec.ts"
```

### User Story 3

```bash
Task: "Author failing spec for forum post listings in tests/functions/post/get-forum-posts.spec.ts"
Task: "Author failing spec for material reads in tests/functions/post/get-forum-materials.spec.ts"
```

### User Story 4

```bash
Task: "Extend tests/functions/tag/check-forum-access.spec.ts with cross-university scenarios"
Task: "Author failing spec for ASSERT_OWN_UNIVERSITY in tests/functions/tag/assert-own-university.spec.ts"
```

### User Story 5

```bash
Task: "Extend tests/functions/tag/tag.spec.ts with post-type category seed assertions"
Task: "Author data-driven failing cases in tests/functions/post/pg.search-posts.testcases.ts"
Task: "Author failing spec for keyword and field search in tests/functions/post/search-posts.spec.ts"
```

### User Story 6

```bash
Task: "Add failing filter, ranking, and empty-state cases to tests/functions/post/pg.search-posts.testcases.ts"
Task: "Extend tests/functions/post/search-posts.spec.ts with filter, ranking, and empty-state assertions"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Run `tests/functions/tag/get-default-forum.spec.ts`, `tests/functions/tag/set-default-forum.spec.ts`, and `tests/tables/tag/forum-context.spec.ts` independently
5. Deploy/demo the default university forum context if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Add User Story 6 → Test independently → Deploy/Demo
8. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple implementers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Implementer A: User Story 1
   - Implementer B: User Story 2
   - Implementer C: User Story 3
   - Implementer D: User Story 4
   - Implementer E: User Story 5
3. User Story 6 starts after User Story 5 completes
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no blocking dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Do not commit `build/`, `dist/`, or `build/env.json`
- Stop at any checkpoint to validate story independently
- Avoid vague tasks, same-file conflicts, and cross-story dependencies that break independence
