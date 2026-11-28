# Tasks: Browsing Page (University Forum)

**Input**: Design documents from `specs/005-browsing-page/`

**Prerequisites**: [plan.md](./plan.md) · [spec.md](./spec.md) · [research.md](./research.md) · [data-model.md](./data-model.md) · [contracts/api.md](./contracts/api.md)

**TDD Mandate**: Per the project constitution, all test files MUST be written and confirmed failing before functional implementation code is written.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on each other)
- **[Story]**: Which user story this task belongs to ([US1], [US2], [US3], [US4], [US5])

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the baseline suite and establish the role folders needed by browsing tests and contracts.

- [x] T001 Confirm the existing baseline is green by running `npm run test` and `npm run test:e2e` from the repository root
- [x] T002 [P] Create `src/packages/forum/__tests__/` for forum browsing unit tests and fixtures
- [x] T003 [P] Create `src/packages/forum/dto/` for forum context, query, and post summary contracts described in `contracts/api.md`

**Checkpoint**: Baseline green and required role folders exist.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared contracts, fixtures, and module wiring required by every user story.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 Create `src/packages/forum/dto/forum-context.dto.ts` with the opaque context token and `university | major | course` level contract from `data-model.md`
- [x] T005 Create `src/packages/forum/dto/forum-query.dto.ts` with search, filter, sort, and pagination fields from `contracts/api.md`
- [x] T006 Create `src/packages/forum/dto/post-summary.dto.ts` enforcing the seven required fields in FR-013
- [x] T007 Create `src/packages/forum/__tests__/forum-browse.testcases.ts` with fixtures for universities, majors, courses, post summaries, restricted posts, searchable fields, and invalid queries
- [x] T008 Confirm `src/packages/forum/forum.module.ts` and `src/packages/post/post.module.ts` export the providers needed by browsing without adding duplicate modules

**Checkpoint**: Foundational contracts and fixtures are ready; user story implementation can begin.

---

## Phase 3: User Story 1 - Enter the Own and Other University Forums (Priority: P1) 🎯 MVP

**Goal**: Open the Forum area in the student's own university context and permit browsing other universities only when allowed.

**Independent Test**: Sign in, open Forum, verify the default own-university context, then select a permitted and a forbidden university and verify the respective outcomes.

### Tests for User Story 1

> Write these tests FIRST and confirm they fail before implementation.

- [x] T009 [P] [US1] Add `describe('getUniversities')` to `src/packages/forum/__tests__/forum.service.spec.ts` covering own university, permitted other universities, and restricted universities
- [x] T010 [US1] Add route-level tests to `src/packages/forum/__tests__/forum.controller.spec.ts` for `GET /api/v1/forum` with authenticated, unauthenticated, and default-context cases

### Implementation for User Story 1

- [x] T011 [US1] Implement own-university default selection in `src/packages/forum/forum.service.ts` following `research.md` R3
- [x] T012 [US1] Apply permission filtering for other university forums in `src/packages/forum/forum.service.ts`
- [x] T013 [US1] Add the `GET /api/v1/forum` response mapping in `src/packages/forum/forum.controller.ts` using `src/packages/forum/dto/forum-context.dto.ts`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - Browse University, Major, and Course Forums (Priority: P1)

**Goal**: Navigate the university–major–course hierarchy and keep post content scoped to the active level.

**Independent Test**: Select each hierarchy level, verify the child list at that level, switch levels, and confirm that content from the previous level is not mixed into the new one.

### Tests for User Story 2

> Write these tests FIRST and confirm they fail before implementation.

- [x] T014 [P] [US2] Add `describe('getHierarchy')` to `src/packages/forum/__tests__/forum.service.spec.ts` covering majors for a university, courses for a major, posts for a course, and empty child lists
- [x] T015 [US2] Add route-level tests to `src/packages/forum/__tests__/forum.controller.spec.ts` for `GET /api/v1/forum/:context` across the three hierarchy levels and an invalid context token

### Implementation for User Story 2

- [x] T016 [US2] Implement context decoding and level dispatch in `src/packages/forum/forum.service.ts` following `research.md` R2
- [x] T017 [US2] Implement hierarchy-scoped retrieval in `src/packages/forum/forum.service.ts` following `research.md` R4
- [x] T018 [US2] Wire hierarchy responses in `src/packages/forum/forum.controller.ts` with invalid-token conflict handling from `contracts/api.md`

**Checkpoint**: User Stories 1 and 2 are independently functional and testable.

---

## Phase 5: User Story 3 - View Post Summaries and Open a Post (Priority: P1)

**Goal**: Show complete post summaries in the selected forum and open a readable post detail with only permitted actions.

**Independent Test**: Open a course forum, verify all seven summary fields on visible posts, open one post, and verify detail content plus permission-filtered actions.

### Tests for User Story 3

> Write these tests FIRST and confirm they fail before implementation.

- [x] T019 [P] [US3] Add `describe('getPostSummaries')` to `src/packages/forum/__tests__/forum.service.spec.ts` verifying all seven fields in FR-013 and exclusion of restricted posts
- [x] T020 [P] [US3] Add `describe('getPostDetail')` to `src/packages/post/__tests__/post-detail.spec.ts` covering full fields, unavailable posts, and permission-filtered actions
- [x] T021 [US3] Add E2E cases to `test/forum-browsing.e2e-spec.ts` for opening a post summary and for the post-unavailable state

### Implementation for User Story 3

- [x] T022 [US3] Map forum post records to `src/packages/forum/dto/post-summary.dto.ts` in `src/packages/forum/forum.service.ts` following `research.md` R5
- [x] T023 [US3] Reuse the post detail read path in `src/packages/post/post.service.ts` for content, discussion, attachments, true-response information, and read-only indicators following `research.md` R7
- [x] T024 [US3] Wire `GET /api/v1/forum/posts` and `GET /api/v1/forum/posts/:post_id` in `src/packages/forum/forum.controller.ts` per `contracts/api.md`

**Checkpoint**: User Stories 1–3 are independently functional and testable.

---

## Phase 6: User Story 4 - Sort, Search, and Filter Forum Posts (Priority: P2)

**Goal**: Let the student sort, search, and filter posts within the active context and produce stable, ranked results.

**Independent Test**: Apply each sort order, a keyword search, and combined filters; verify result membership, field matching, ranking order, and empty-state behavior.

### Tests for User Story 4

> Write these tests FIRST and confirm they fail before implementation.

- [x] T025 [P] [US4] Add `describe('searchAndFilterPosts')` to `src/packages/forum/__tests__/forum.service.spec.ts` covering sort options, keyword fields, each filter, combined filters, ranking, and stable tie-break
- [x] T026 [US4] Add contract tests to `src/packages/forum/__tests__/forum.controller.spec.ts` for query parameter validation and whitespace-only keyword handling

### Implementation for User Story 4

- [x] T027 [US4] Implement sort handling in `src/packages/forum/forum.service.ts` for newest, trending, most voted, and most discussed
- [x] T028 [US4] Implement keyword and field search in `src/packages/forum/forum.service.ts` following `research.md` R6
- [x] T029 [US4] Implement combined filters in `src/packages/forum/forum.service.ts` using `src/packages/forum/dto/forum-query.dto.ts`
- [x] T030 [US4] Implement relevance-and-engagement ranking with stable tie-break in `src/packages/forum/forum.service.ts` following `research.md` R8

**Checkpoint**: All four core browsing stories are independently functional and testable.

---

## Phase 7: User Story 5 - Recover from Browsing Failures Safely (Priority: P2)

**Goal**: Show clear empty, retry, validation, and access-denied states without leaking partial, stale, or restricted content.

**Independent Test**: Simulate no matches, a forum load failure, an invalid query, and a restricted post; verify the matching state and absence of unauthorized content.

### Tests for User Story 5

> Write these tests FIRST and confirm they fail before implementation.

- [x] T031 [P] [US5] Add `describe('browsingFailureStates')` to `src/packages/forum/__tests__/forum.service.spec.ts` covering no matches, load failure, invalid query, and restricted-context results
- [x] T032 [US5] Add E2E cases to `test/forum-browsing.e2e-spec.ts` for empty results, retryable failure, validation feedback, and restricted-post access denial

### Implementation for User Story 5

- [x] T033 [US5] Implement retryable error and empty-result mapping in `src/packages/forum/forum.controller.ts` following `research.md` R9
- [x] T034 [US5] Enforce restricted-post exclusion across hierarchy, list, search, and detail paths in `src/packages/forum/forum.service.ts` and `src/packages/post/post.service.ts`

**Checkpoint**: All user stories are independently functional and testable.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, quality gates, and final integration validation.

- [x] T035 [P] Update `docs/API.md` with the consolidated browsing contract from `contracts/api.md`
- [x] T036 Enforce the seven-field post summary rule from FR-013 in `src/packages/forum/dto/post-summary.dto.ts`
- [x] T037 Confirm no mutation endpoints are added by browsing in `src/packages/forum/forum.controller.ts`
- [x] T038 [P] Run `npm run lint` and resolve issues introduced by the new forum and post files
- [x] T039 [P] Run `npm run format` and confirm formatting is clean
- [x] T040 Run `npm run build`, `npm run test`, and `npm run test:e2e` as the final integration gate

**Checkpoint**: All 40 tasks complete; documentation updated; quality gates green.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories
- **US1 (Phase 3)**: Depends on Foundational
- **US2 (Phase 4)**: Depends on Foundational; may proceed in parallel with US1
- **US3 (Phase 5)**: Depends on Foundational and the post summary DTO; may proceed in parallel with US1 and US2
- **US4 (Phase 6)**: Depends on US3 post-list behavior
- **US5 (Phase 7)**: Depends on all core browsing paths existing
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Starts immediately after Foundational; no dependency on other stories
- **US2 (P1)**: Starts immediately after Foundational; shares context DTO only
- **US3 (P1)**: Starts immediately after Foundational; shares post summary DTO only
- **US4 (P2)**: Requires the post-list path from US3
- **US5 (P2)**: Requires all core paths so that failure and visibility states can be validated across them

### Within Each User Story

- Tests are written first and confirmed failing before implementation
- DTO contracts precede service and controller work
- Service logic precedes route wiring
- E2E coverage follows service and route-level tests

### Parallel Opportunities

- T002 and T003 run in parallel
- T009, T014, T019, T020, T025, and T031 run in parallel when each targets a distinct test file or describe block
- T035, T038, and T039 run in parallel during polish

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational (T001–T008)
2. Complete US1 (T009–T013)
3. Stop and validate default and permitted university context
4. Demo the MVP before adding hierarchy, post detail, and search behavior

### Incremental Delivery

1. Setup + Foundational → shared contracts and fixtures ready
2. US1 → university context → validate independently
3. US2 → hierarchy navigation → validate independently
4. US3 → post summaries and detail → validate independently
5. US4 → sorting, search, and filters → validate independently
6. US5 → safe failure states → validate independently
7. Polish → documentation and quality gates → final validation

### Single-Developer Sequential Order

T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018 → T019 → T020 → T021 → T022 → T023 → T024 → T025 → T026 → T027 → T028 → T029 → T030 → T031 → T032 → T033 → T034 → T035 → T036 → T037 → T038 → T039 → T040

---

## Notes

- Page sizes, pagination limits, and exact ranking weights are implementation decisions documented in `research.md`, not additional functional requirements.
- Browsing is read-oriented; post creation, comments, answers, votes, saves, reports, and moderation belong to other functional groups.
- Frontend source is outside this backend repository; the client consumes the contract in `contracts/api.md`.
- No source code was modified as part of this SpecKit documentation run; final task status is recorded by `/speckit-implement` separately.
