---

description: "Task list template for feature implementation"
---

# Tasks: Browse University Forums

**Input**: Design documents from `/specs/002-browse-university-forums/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Test tasks are included because plan.md requires TDD and the constitution marks automated testing as non-negotiable. Write every test FIRST and confirm it fails before implementation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- Paths follow `specs/002-browse-university-forums/plan.md` and the project constitution

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Dependency and directory preparation

- [X] T001 Move `zustand` from `devDependencies` to `dependencies` in `package.json` and regenerate `package-lock.json` with `npm install --package-lock-only`
- [X] T002 [P] Create the feature barrels `src/entities/forum/index.ts`, `src/features/forum/browse/index.ts`, `src/features/forum/search/index.ts`, and `src/features/forum/access/index.ts` per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Write a failing test for `INVALID_ID` (`45006`) in `src/shared/api/error.test.ts`
- [X] T004 Add `INVALID_ID: 45006` to `errorCode` and `errorType` in `src/shared/api/error.ts`
- [X] T005 [P] Write failing narrow response-guard tests in `src/shared/api/guards.test.ts` for `TagResponse`, `PostResponse`, `RelevantTagResponse`, and `TagsByIdResponse` catalog shapes
- [X] T006 Implement narrow response guards in `src/shared/api/guards.ts` and export them from `src/shared/api/index.ts` without introducing `any`
- [X] T007 Add forum entity types in `src/entities/forum/type.ts`, move `ForumOutletContextType` out of `src/app/layouts/forum/ForumLayout.tsx`, update imports in `src/pages/forums/feed/FeedPage.tsx` and `src/pages/forums/browse/subject/SubjectPage.tsx`, and export via `src/entities/forum/index.ts`; preserve verbatim constraints: "ids MUST be assembled University → Major → Course and passed unchanged" and "`courseId` requires `majorId`; `majorId` requires `universityId`"
- [X] T008 [P] Write failing forum context store tests in `src/entities/forum/forum-context-store.test.ts` covering missing key, malformed JSON, wrong version, orphan major/course, valid rehydration, ancestor clearing ("Changing university clears major/course; changing major clears course"), scope change, and absence of token fields
- [X] T009 Implement the persisted forum context store in `src/entities/forum/forum-context-store.ts` using the `studitopia.forum-context.v1` schema from `specs/002-browse-university-forums/contracts/forum-context-storage.md`
- [X] T010 [P] Write failing semantic navigation tests in `src/shared/ui/breadcrumbs/Breadcrumbs.test.tsx`
- [X] T011 Implement `src/shared/ui/breadcrumbs/Breadcrumbs.tsx`, `src/shared/ui/breadcrumbs/Breadcrumbs.module.css`, and `src/shared/ui/breadcrumbs/index.ts` using `nav` and an ordered list
- [X] T012 [P] Write failing state-rendering tests in `src/shared/ui/empty-state/EmptyState.test.tsx`
- [X] T013 Implement `src/shared/ui/empty-state/EmptyState.tsx`, `src/shared/ui/empty-state/EmptyState.module.css`, and `src/shared/ui/empty-state/index.ts`
- [X] T014 Align `TagResponse` and `TagDetailResponse` in `src/features/forum/tag/type.ts` with `docs/architecture/api-catalog.md` (`icon: number | null`, `description: string`) and add `RelevantTagResponse` and `TagsByIdResponse`
- [X] T015 Align `src/features/forum/post/type.ts` with catalog `PostResponse` (`id`, `title`, `account_id`, `comment_id`, `true_response`, `created_time`, `tags[]`) and mark derived fields (`content`, `authorName`, `engagement`, `type`) as nullable/unsupported
- [X] T016 [P] Write failing request tests for `getRelevantTags`, `resolveTags`, and `getTagDetail` in `src/features/forum/tag/tag.test.ts`
- [X] T017 Implement `getRelevantTags`, `resolveTags`, and `getTagDetail` in `src/features/forum/tag/tag.ts` using only `GET /tag/relevant?id=...`, `GET /tag/resolve/:id`, and `GET /tag/:id`
- [X] T018 [P] Write failing request tests for `listRelevantPosts` and `getPost` in `src/features/forum/post/post.test.ts`, including the rule that omitting both `include` and `exclude` returns all accessible posts
- [X] T019 Implement `listRelevantPosts(include, exclude)` and `getPost(id)` in `src/features/forum/post/post.ts` using `GET /post/relevant` and `GET /post/:id` only
- [X] T020 [P] Write failing access-mapping tests in `src/features/forum/access/access.test.ts` for `409 [45006]`, `401`, and generic `500` responses
- [X] T021 Implement access error mapping in `src/features/forum/access/access.ts` and `src/features/forum/access/type.ts`; map "`45006` maps to access/invalid-context state; other errors map to a retryable error state"
- [X] T022 [P] Write a failing guard test in `src/app/guard/forum-access-guard.test.tsx` for denied and invalid chains
- [X] T023 Implement `ForumAccessGuard` in `src/app/guard/forum-access-guard.tsx` using server-backed state only
- [X] T024 [P] Write failing route tests in `src/app/providers/router/router-provider.test.tsx` for the route matrix and legacy `?page=` redirects in `specs/002-browse-university-forums/contracts/forum-routes.md`
- [X] T025 Implement canonical nested routes and legacy redirects in `src/app/providers/router/router-provider.tsx`
- [X] T026 Fix pre-existing type/lint blockers in `src/pages/forums/feed/FeedPage.tsx`, `src/pages/forums/ForumPage.tsx`, `src/pages/forums/browse/BrowsePage.tsx`, `src/app/layouts/forum/ForumLayout.tsx`, `src/app/providers/auth/auth-initializer.tsx`, and `src/pages/forums/post/view/ViewPostPage.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Access the University Forum (Priority: P1)

**Goal**: A student lands on a dedicated university forum, selects their own or a permitted university, keeps that context on later visits, and sees a clear access notice when denied.

**Independent Test**: Sign in with a known university, confirm `/forum` is the landing destination with the university shown as default context, select a permitted university, select a denied university, and verify the notice with no content leakage.

### Tests for User Story 1

- [X] T027 [P] [US1] Write failing default-context and university-selection tests in `src/pages/forums/browse/university/UniversityPage.test.tsx`
- [X] T028 [P] [US1] Write failing access-notice tests in `src/pages/forums/access/AccessDeniedPage.test.tsx`
- [X] T029 [P] [US1] Write failing post-auth navigation tests in `src/features/auth/login/login.test.ts`, `src/features/auth/register/register.test.ts`, and `src/features/auth/otp/otp.test.ts` asserting navigation to `/forum`

### Implementation for User Story 1

- [X] T030 [P] [US1] Implement `listUniversities()` and `useUniversities()` in `src/features/forum/browse/browse.ts` using `GET /forum`
- [X] T031 [US1] Update `src/pages/forums/browse/university/UniversityPage.tsx` to render the directory, select the own university, and set the default context
- [X] T032 [US1] Update `src/app/layouts/forum/ForumLayout.tsx` to display the active university and provide a labelled university switcher
- [X] T033 [US1] Implement `src/pages/forums/access/AccessDeniedPage.tsx` with a clear notice and a path back to `/forum`
- [X] T034 [P] [US1] Update `src/features/auth/login/login.ts`, `src/features/auth/register/register.ts`, and `src/features/auth/otp/otp.ts` to navigate to `/forum` after auth success

**Checkpoint**: User Story 1 is fully functional and independently testable (MVP)

---

## Phase 4: User Story 2 - Browse University, Major, and Course Forums (Priority: P2)

**Goal**: A student navigates University → Major → Course, sees only level-relevant content and majors/courses, switches levels, and gets explanatory empty states.

**Independent Test**: From `/forum`, open a major, open a course, verify content belongs to that course, switch to another course and back, and verify empty-major/empty-course states.

### Tests for User Story 2

- [X] T035 [P] [US2] Write failing chain-building and list-hook tests in `src/features/forum/browse/browse.test.ts`, asserting "ids MUST be assembled University → Major → Course and passed unchanged"
- [X] T036 [P] [US2] Write failing course-list and empty-state tests in `src/pages/forums/browse/major/MajorPage.test.tsx`
- [X] T037 [P] [US2] Write failing level-post and parent-breadcrumb tests in `src/pages/forums/browse/course/CoursePage.test.tsx`

### Implementation for User Story 2

- [X] T038 [US2] Implement `listMajors(chain)`, `listCourses(chain)`, and `listLevelPosts(chain)` in `src/features/forum/browse/browse.ts` using `GET /forum/:id` with cumulative chains
- [X] T039 [US2] Create `src/pages/forums/browse/major/MajorPage.tsx` and `src/pages/forums/browse/major/MajorPage.css` with course listings and the no-courses empty state from FR-017
- [X] T040 [US2] Create `src/pages/forums/browse/course/CoursePage.tsx` and `src/pages/forums/browse/course/CoursePage.css` with posts/materials from `GET /forum/:chain`
- [X] T041 [US2] Add shared `Breadcrumbs` to `src/pages/forums/browse/major/MajorPage.tsx` and `src/pages/forums/browse/course/CoursePage.tsx` with clickable parent links
- [X] T042 [US2] Update `src/pages/forums/browse/university/UniversityPage.tsx` to use server-provided majors and canonical hierarchy links instead of hard-coded cards
- [X] T043 [US2] Update `src/pages/forums/browse/area/AreaPage.tsx` and `src/pages/forums/browse/subject/SubjectPage.tsx` to redirect legacy URLs to canonical routes
- [X] T044 [US2] Verify descendant clearing and context switching in `src/entities/forum/forum-context-store.test.ts` and `src/pages/forums/browse/course/CoursePage.test.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently

---

## Phase 5: User Story 3 - Search the Forum (Priority: P3)

**Goal**: A student searches by keyword and supported fields, combines solved/time filters, sees deterministic ordering, clears filters, scopes results, and receives empty/limitation states.

**Independent Test**: From a known context, search for a known title/tag keyword, confirm the expected post appears near the top, apply solved and time filters, clear them, broaden scope, and verify the empty and unsupported-field states.

### Tests for User Story 3

- [X] T045 [P] [US3] Write failing matcher tests in `src/features/forum/search/search.test.ts`, asserting verbatim: "trim whitespace; reject empty and reject more than 100 characters with guidance", "only the seven documented spec fields; at least one selected", and "`content` and `author` MUST be labelled unsupported"
- [X] T046 [P] [US3] Write failing page tests in `src/pages/forums/search/SearchPage.test.tsx` for results, empty state, invalid keyword, unsupported notices, scope, and clear filters

### Implementation for User Story 3

- [X] T047 [US3] Implement query normalization and candidate retrieval in `src/features/forum/search/search.ts` using only `GET /forum/:chain` and `GET /post/relevant`; omit both `include` and `exclude` when building the accessible scope
- [X] T048 [US3] Implement field matching, solved/time filters, unsupported-field notices, deterministic ordering (exact title/tag, partial, context, newest), and `useSearchPosts` in `src/features/forum/search/search.ts`
- [X] T049 [US3] Create `src/pages/forums/search/SearchPage.tsx` and `src/pages/forums/search/SearchPage.css` with results, empty state, unsupported notices, error state, and clear-filters action
- [X] T050 [P] [US3] Wire the top-bar search in `src/app/layouts/forum/ForumLayout.tsx` to navigate to `/forum/search?q=...`
- [X] T051 [P] [US3] Add the `/forum/search` route in `src/app/providers/router/router-provider.tsx`
- [X] T052 [US3] Assert no undocumented endpoint appears in `src/features/forum/search/search.ts` and `specs/002-browse-university-forums/contracts/forum-search-api.md`

**Checkpoint**: All user stories are independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Remove legacy mock data, complete accessibility/responsiveness, update docs, and validate gates

- [X] T053 [P] Replace hard-coded posts and raw `fetch` in `src/pages/forums/feed/FeedPage.tsx` with feature hooks
- [X] T054 [P] Replace hard-coded post detail in `src/pages/forums/post/view/ViewPostPage.tsx` with `getPost` and preserve hierarchy context
- [X] T055 [P] Wire or honestly disable inert controls in `src/pages/forums/library/LibraryPage.tsx`
- [X] T056 [P] Add responsive rules to `src/app/layouts/forum/ForumLayout.css`, `src/pages/forums/browse/area/AreaPage.css`, and `src/pages/forums/library/LibraryPage.css`
- [X] T057 [P] Add keyboard and labelling fixes in `src/shared/ui/breadcrumbs/Breadcrumbs.tsx`, `src/pages/forums/search/SearchPage.tsx`, and `src/app/layouts/forum/ForumLayout.tsx`
- [X] T058 [P] Update `docs/architecture/frontend-architecture.md`, `docs/architecture/component-catalog.md`, and `docs/architecture/api-catalog.md` for new shared components, routes, and catalog-only API usage
- [X] T059 Measure client-side search cost against SC-006 and SC-009 in `specs/002-browse-university-forums/quickstart.md` and record results
- [X] T060 Run `npm test`, `npm run lint`, `npm run build`, and the manual scenarios in `specs/002-browse-university-forums/quickstart.md`
- [X] T061 Report unsupported search fields, absent engagement ranking, and any type drift in the failure-reporting section of `specs/002-browse-university-forums/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational completion
  - US1, US2, and US3 can proceed in parallel if staffed
  - Sequential priority delivery is also valid: US1 → US2 → US3
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational - no dependency on other stories
- **User Story 2 (P2)**: Can start after Foundational - reuses US1's active university context but is independently testable
- **User Story 3 (P3)**: Can start after Foundational - reuses context types from US1/US2 but is independently testable

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Types/entities before hooks
- Hooks before pages
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- T002, T003, T005, T008, T010, T012, T016, T018, T020, T022, and T024 are independent test/scaffold tasks
- T004, T006, T009, T011, T013, T014, T015, T017, T019, T021, and T023 touch distinct files and can run in parallel
- Once Foundational is done, US1, US2, and US3 can be assigned to different developers
- Within each story, all `[P]` test tasks can run together

---

## Parallel Example: User Story 1

```bash
# Launch all US1 tests together:
Task: "Write failing default-context and university-selection tests in src/pages/forums/browse/university/UniversityPage.test.tsx"
Task: "Write failing access-notice tests in src/pages/forums/access/AccessDeniedPage.test.tsx"
Task: "Write failing post-auth navigation tests in src/features/auth/login/login.test.ts, register.test.ts, and otp.test.ts"

# Then implement independent US1 pieces:
Task: "Implement listUniversities and useUniversities in src/features/forum/browse/browse.ts"
Task: "Implement AccessDeniedPage in src/pages/forums/access/AccessDeniedPage.tsx"
Task: "Update auth navigation in src/features/auth/login/login.ts, register.ts, and otp.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. STOP and VALIDATE using the US1 independent test
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → foundation ready
2. Add US1 → test independently → deploy/demo (MVP)
3. Add US2 → test independently → deploy/demo
4. Add US3 → test independently → deploy/demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: US1
   - Developer B: US2
   - Developer C: US3
3. Stories complete and integrate independently

---

## Notes

- `[P]` tasks = different files, no dependencies
- `[Story]` label maps task to specific user story for traceability
- Each user story is independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid vague tasks, same-file conflicts, and cross-story dependencies that break independence
