---

description: "Task list for the Forum Post List feature"
---

# Tasks: Forum Post List

**Input**: Design documents from `/specs/003-forum-post-list/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/forum-feed-api.md](./contracts/forum-feed-api.md), [quickstart.md](./quickstart.md)

**Tests**: Included because [plan.md](./plan.md) mandates TDD and the constitution's principle VI requires automated tests before implementation. Write the listed test tasks first and confirm they fail before implementing.

**Organization**: Tasks are grouped by user story so each story can be implemented, tested, and delivered independently.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Every task includes its exact file path

## Path Conventions

- **Single project**: `src/` at repository root; Spec Kit artifacts under `specs/003-forum-post-list/`
- **Frontend**: React 19, TypeScript 6, Vite 8, React Router 8, TanStack Query 5, FSD layers
- **API boundary**: only endpoints in `docs/architecture/api-catalog.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing project, environment, and approved design inputs are usable.

- [X] T001 Verify `npm install`, `npm test`, `npm run lint`, and `npm run build` scripts in `package.json` and the `VITE_API_BASE_URL` wiring in `src/shared/api/client.ts`; record the baseline gate results
- [X] T002 [P] Review the catalog-only API boundary in `specs/003-forum-post-list/contracts/forum-feed-api.md` and the field availability rules in `specs/003-forum-post-list/data-model.md`
- [X] T003 [P] Verify feature 002 foundation artifacts in `specs/002-browse-university-forums/contracts/forum-routes.md` and the intended type location in `src/entities/forum/type.ts`; report anything absent before starting Phase 2

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core types, error handling, guards, routes, and gate blockers that MUST be complete before ANY user story can be implemented.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 [P] Write failing tests for numeric `INVALID_ID = 45006` handling in `src/shared/api/error.test.ts` and for catalog response validation in `src/shared/api/guards.test.ts`
- [X] T005 Add `INVALID_ID = 45006` to the code map in `src/shared/api/error.ts` and map it to invalid-context/unavailable UI states
- [X] T006 Add narrow response guards for `PostResponse[]` and single `PostResponse` in `src/shared/api/guards.ts`; validate required fields before rendering and do not introduce `any`
- [X] T007 [P] Add catalog-aligned `PostResponse` (`id`, `title`, `account_id`, `comment_id`, `true_response`, `created_time`, `tags`) plus `Post`, `PostSortOption`, `PostListState`, and `PostDetail` types to `src/entities/forum/type.ts` and export them from `src/entities/forum/index.ts`
- [X] T008 [P] Replace or delete empty test suites that fail collection in `src/pages/forums/LoginPage.test.tsx`, `src/pages/forums/browse/subject/SubjectPage.test.tsx`, `src/pages/forums/post/view/ViewPostPage.test.tsx`, `src/pages/forums/post/create/createPostPage.test.tsx`, and `src/pages/forums/browse/area/AreaPage.test.tsx` so `npm test` can collect the suite
- [X] T009 Ensure canonical forum routes from `specs/002-browse-university-forums/contracts/forum-routes.md` exist in `src/app/providers/router/router-provider.tsx`; add the minimal compatible subset if absent, including `/forum/post/:postId` and legacy redirects, without using a `page` key in canonical URLs
- [X] T010 Run `npm test`, `npm run lint`, and `npm run build` from `package.json`; fix only blockers introduced by T004–T009 before starting user stories

**Checkpoint**: Foundation ready — user story implementation can now begin in priority order.

---

## Phase 3: User Story 1 - View Posts in the Selected Forum (Priority: P1) 🎯 MVP

**Goal**: Show a catalog-backed post list for a selected course forum with truthful summaries and explicit empty, loading, error, and unsupported-level states.

**Independent Test**: Open a course forum with known posts and confirm the list comes from `GET /forum/:id` with the full University → Major → Course chain; verify title, creation time, and solved flag are shown, unsupported fields are labelled unavailable, and an empty forum shows the explanatory empty state. Open a university/major forum and confirm the unsupported-level notice instead of a mislabelled list.

### Tests for User Story 1

> **NOTE: Write these tests FIRST; ensure they FAIL before implementation.**

- [X] T011 [P] [US1] Write request/hook tests in `src/features/forum/feed/feed.test.ts` for `GET /forum/:id` full-chain success, `GET /post/relevant` accessible-wide success, `[]` empty state, `409 [45006]`, `500`, and malformed-body rejection
- [X] T012 [P] [US1] Write projection tests in `src/features/forum/feed/summary.test.ts` asserting that author, post type, vote score, and comment count use explicit unavailable labels and that `true_response` is shown with applicability disclosure
- [X] T013 [P] [US1] Write `src/pages/forums/feed/FeedPage.test.tsx` asserting no mock rows, no raw `fetch`, default list rendering, empty/error states, and accessible-wide scope labelling when no full chain exists
- [X] T014 [P] [US1] Write `src/pages/forums/browse/course/CoursePage.test.tsx` asserting scoped posts for the active chain, summary availability labels, and the university/major unsupported-level state in `src/pages/forums/browse/university/UniversityPage.tsx` and `src/pages/forums/browse/major/MajorPage.tsx`

### Implementation for User Story 1

- [X] T015 [P] [US1] Create `src/features/forum/feed/feed.ts` with `listCoursePosts(chain)`, `listAccessiblePosts()`, `usePostList()` and query keys that include source and chain; pass encrypted ids unchanged and send no `sort`, `page`, `limit`, `offset`, or `cursor` parameter to the backend
- [X] T016 [P] [US1] Create `src/features/forum/feed/type.ts` for post-list view types that import catalog types from `src/entities/forum/type.ts` and never redefine the API contract
- [X] T017 [P] [US1] Create `src/features/forum/feed/summary.ts` to build `PostSummary` with "author unavailable", "type unavailable", "vote score unavailable", "comment count unavailable", creation-time labelling, and solved/status disclosure; never treat `comment_id` as a count
- [X] T018 [US1] Create `src/features/forum/feed/ui/PostList.tsx`, `src/features/forum/feed/ui/PostRow.tsx`, and `src/features/forum/feed/ui/PostList.module.css` with stable keys, semantic list markup, and explicit unavailable-field notices (depends on T016, T017)
- [X] T019 [US1] Wire `src/pages/forums/feed/FeedPage.tsx` to `usePostList()` and the post list UI; remove hard-coded `postList`, raw `fetch` calls, and the missing `@/features/forum/type` import; render loading, empty, error, retry, and accessible-wide states (depends on T015, T018)
- [X] T020 [US1] Wire `src/pages/forums/browse/course/CoursePage.tsx` to scoped `usePostList()` and `PostList`; update `src/pages/forums/browse/university/UniversityPage.tsx` and `src/pages/forums/browse/major/MajorPage.tsx` to render the unsupported-level state with working child navigation (depends on T015, T018)
- [X] T021 [US1] Run `npm test`, `npm run lint`, and `npm run build` from `package.json`; verify US1 independently via `specs/003-forum-post-list/quickstart.md` scenarios 1, 2, 4, and 5

**Checkpoint**: User Story 1 is fully functional and testable independently; this is the MVP increment.

---

## Phase 4: User Story 2 - Open a Post for Full Details (Priority: P2)

**Goal**: Open the exact post selected from the list, show catalog-backed details with honest limitations, and return to the same forum context.

**Independent Test**: From a list row with a known encrypted id, verify `GET /post/:id` is called with that id, that title/account id/creation time/true-response flag/tags match the list, that content and comments are labelled unavailable, and that back navigation restores the originating forum.

### Tests for User Story 2

> **NOTE: Write these tests FIRST; ensure they FAIL before implementation.**

- [X] T022 [P] [US2] Write `src/features/forum/post/post.test.ts` for `GET /post/:id` success, `409 [45006]`, `500`, malformed body, and disabled query when the id is missing
- [X] T023 [P] [US2] Expand `src/pages/forums/post/view/ViewPostPage.test.tsx` to assert list→detail→back, consistent list/detail fields, unavailable content/comment/author/type notices, direct `/forum/post/:postId` access, and unavailable-post messaging
- [X] T024 [P] [US2] Expand `src/app/providers/router/router-provider.test.tsx` with `/forum/post/:postId` rendering, legacy detail redirect coverage, and context preservation assertions

### Implementation for User Story 2

- [X] T025 [US2] Implement `getPost(id)` and `usePost(id)` in `src/features/forum/post/post.ts` and replace the mock UI shape in `src/features/forum/post/type.ts` with a detail projection that imports from `src/entities/forum/type.ts`; treat the returned `post-retrieve` id as opaque and do not reuse it as a detail path parameter
- [X] T026 [US2] Wire `src/pages/forums/post/view/ViewPostPage.tsx` to the route `:postId` and `usePost()`; remove `post_list`, the hard-coded comment blob, and unconditional `{true && ...}` badges; render catalog fields plus unavailable-content/comment/author/type notices (depends on T025)
- [X] T027 [US2] Wire post-row navigation in `src/features/forum/feed/ui/PostRow.tsx` and the canonical detail route in `src/app/providers/router/router-provider.tsx` so the selected encrypted id is passed unchanged and no `page` query key is introduced (depends on T018, T025)
- [X] T028 [US2] Preserve the originating forum chain and back/breadcrumb target in `src/pages/forums/post/view/ViewPostPage.tsx` using the shared breadcrumb component from `specs/002-browse-university-forums/contracts/forum-routes.md`; show a clear unavailable message with a way back when the post is missing (depends on T026)
- [X] T029 [US2] Run `npm test`, `npm run lint`, and `npm run build` from `package.json`; verify US2 independently via `specs/003-forum-post-list/quickstart.md` scenario 4

**Checkpoint**: User Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Sort the Post List (Priority: P3)

**Goal**: Offer newest, trending, most voted, and most discussed ordering with a visible active choice and honest disclosure for orderings the catalog cannot support.

**Independent Test**: With posts of different `created_time` values, confirm newest is default and sorts descending; select each other option and verify it is marked unavailable while the actual newest order is labelled, with no invented vote/comment/trending value.

### Tests for User Story 3

> **NOTE: Write these tests FIRST; ensure they FAIL before implementation.**

- [X] T030 [P] [US3] Write `src/features/forum/feed/sort.test.ts` for newest descending `created_time`, stable opaque-`id` tie-break with disclosure, unavailable trending/topVoted/mostDiscussed options, 0/1 post, and non-mutation of the input array
- [X] T031 [P] [US3] Write `src/features/forum/feed/ui/PostSortSelect.test.tsx` asserting a labelled native select, four option values, visible active choice, and an unavailable-ordering notice

### Implementation for User Story 3

- [X] T032 [P] [US3] Implement `src/features/forum/feed/sort.ts` with pure client-side ordering: newest by `created_time` descending, stable `id` tie-break, and fallback to newest for unavailable options without computing invented scores
- [X] T033 [P] [US3] Implement `src/features/forum/feed/ui/PostSortSelect.tsx` and `src/features/forum/feed/ui/PostSort.module.css` with a labelled native `<select>` and disclosure text for unavailable options (depends on T031)
- [X] T034 [US3] Add client-only `sort` query parameter handling to `src/pages/forums/feed/FeedPage.tsx` and `src/pages/forums/browse/course/CoursePage.tsx` using `useSearchParams`; default to `newest`, carry the active value through context switches, and never send it to the backend (depends on T032, T033)
- [X] T035 [US3] Carry the active `sort` value in list-to-detail and return links in `src/features/forum/feed/ui/PostRow.tsx` and `src/pages/forums/post/view/ViewPostPage.tsx`; preserve the selected value after back/breadcrumb navigation (depends on T034, T027)
- [X] T036 [US3] Run `npm test`, `npm run lint`, and `npm run build` from `package.json`; verify US3 independently via `specs/003-forum-post-list/quickstart.md` scenario 3

**Checkpoint**: All user stories are independently functional; US3 can be prepared after foundation but its end-to-end validation requires the US1 list and US2 return path.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, disclosure reporting, and full validation.

- [X] T037 [P] Update `docs/architecture/frontend-architecture.md` and `docs/architecture/component-catalog.md` for the new `features/forum/feed` slice, post list/detail UI, entity types, and catalog-only API usage
- [X] T038 [P] Record remaining limitations in `specs/003-forum-post-list/quickstart.md`: course-only scoped posts, unsupported summary/detail fields, unavailable orderings, exact-tie limitation, no pagination, and `post-retrieve` id semantics
- [X] T039 Run all scenarios in `specs/003-forum-post-list/quickstart.md` and the full `npm test`, `npm run lint`, and `npm run build` gates from `package.json`; report measured 2-second goals and any unresolved debt

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all user stories
- **User Stories (Phases 3–5)**: All depend on Phase 2 completion
  - US1 delivers the MVP list
  - US2 adds detail navigation on top of the list
  - US3 can implement pure sorting in parallel but needs US1/US2 for end-to-end validation
- **Polish (Phase 6)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational; no dependencies on other stories
- **User Story 2 (P2)**: Starts after Foundational; integration depends on US1's `PostList`/`PostRow` from T018 but is independently testable with mocked hooks
- **User Story 3 (P3)**: Starts after Foundational; `sort.ts` and `PostSortSelect` are independent, while URL/return-link integration depends on US1 and US2

### Within Each User Story

- Tests MUST be written first and confirmed failing before implementation
- Entity/type tasks before request or projection tasks
- Request/projection tasks before UI wiring
- Core UI before page integration
- Run the story checkpoint gates before moving to the next priority

### Parallel Opportunities

- T002 and T003 can run in parallel with T001
- T004 and T008 can run in parallel within Foundational
- T011–T014 can run in parallel as test-first tasks
- T015, T016, and T017 can run in parallel after Foundational
- T022–T024 can run in parallel as test-first tasks
- T030 and T031 can run in parallel as test-first tasks
- T032 and T033 can run in parallel after their tests
- T037 and T038 can run in parallel during polish

---

## Parallel Example: User Story 1

```bash
# Write failing tests together:
Task: "Write request/hook tests in src/features/forum/feed/feed.test.ts"
Task: "Write projection tests in src/features/forum/feed/summary.test.ts"
Task: "Write src/pages/forums/feed/FeedPage.test.tsx"
Task: "Write src/pages/forums/browse/course/CoursePage.test.tsx"

# Then implement independent modules together:
Task: "Create src/features/forum/feed/feed.ts"
Task: "Create src/features/forum/feed/type.ts"
Task: "Create src/features/forum/feed/summary.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Run T021 and the quickstart scenarios independently
5. Deploy/demo the course-level post list if ready

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. Add US1 → validate → MVP
3. Add US2 → validate detail journey
4. Add US3 → validate ordering
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

1. Team completes Setup + Foundational together
2. After Foundational:
   - Developer A: US1
   - Developer B: US2 tests and detail module
   - Developer C: US3 pure sort module and selector
3. Integrate US1 list, US2 detail links, and US3 sort URL state at their checkpoints

---

## Notes

- `[P]` tasks touch different files and have no dependencies on incomplete tasks
- `[Story]` labels map tasks to spec.md user stories for traceability
- Every task includes an exact file path
- Verify tests fail before implementing; never count empty test files as coverage
- Commit after each task or logical group when implementation begins
- Stop at each checkpoint to validate the story independently
- Avoid vague tasks, same-file parallel conflicts, and cross-story dependencies that break independence
