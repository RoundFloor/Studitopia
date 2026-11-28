# Tasks: Trending Page (Forum Recommendations)

**Input**: Design documents from `specs/004-trending-page/`

**Prerequisites**: [plan.md](./plan.md) · [spec.md](./spec.md) · [research.md](./research.md) · [data-model.md](./data-model.md) · [contracts/api.md](./contracts/api.md)

**TDD Mandate**: Per the project constitution, all test files MUST be written and confirmed failing before functional implementation code is written.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on each other)
- **[Story]**: Which user story this task belongs to ([US1], [US2], [US3], [US4])

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the baseline test suite and establish the recommendation test location and shared fixtures.

- [x] T001 Confirm the existing baseline is green by running `npm run test` and `npm run test:e2e` from the repository root
- [x] T002 [P] Create `src/packages/forum/__tests__/` for forum recommendation unit and integration tests
- [x] T003 [P] Create `src/packages/forum/dto/` for the recommendation response contract described in [contracts/api.md](./contracts/api.md)

**Checkpoint**: Baseline is green and the required role folders exist.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared response contract, service skeleton, module registration, and fixture data required by every user story.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 Create `src/packages/forum/dto/recommendation-response.dto.ts` with the `relevant`, `trending`, and `unsolved` sections and per-item fields (`post_id`, `title`, `post_type`, `author`, `vote_score`, `comment_count`, `solved`, `created_at`, `reason`) defined in `contracts/api.md`
- [x] T005 Create `src/packages/forum/services/recommendation.service.ts` with a provider skeleton that accepts the existing `PostgresService` and `SecurityGenerationService` dependencies
- [x] T006 Register `RecommendationService` in `src/packages/forum/forum.module.ts` without changing the existing forum routes
- [x] T007 Create `src/packages/forum/__tests__/recommendation.testcases.ts` with reusable fixtures for an authenticated student, academic contexts, learning preferences, visible posts, restricted posts, solved and unsolved posts, and high/low engagement posts

**Checkpoint**: Foundational contracts and fixtures are ready; user story implementation can begin.

---

## Phase 3: User Story 1 - Discover Relevant Posts (Priority: P1) 🎯 MVP

**Goal**: Show posts relevant to the student's university, major, courses, and interests, each with a readable reason and safe visibility.

**Independent Test**: Request recommendations for a known academic context and verify that only matching visible posts appear in the `relevant` section with correct reason text and no restricted content.

### Tests for User Story 1

> Write these tests FIRST and confirm they fail before implementation.

- [x] T008 [P] [US1] Add `describe('selectRelevantRecommendations')` to `src/packages/forum/__tests__/recommendation.service.spec.ts` with cases for context match, interest match, visible-only results, and empty candidates
- [x] T009 [US1] Add route-level tests to `src/packages/forum/__tests__/forum.controller.spec.ts` for `GET /api/v1/forum/recommendations` returning the `relevant` section with reasons for an authenticated student

### Implementation for User Story 1

- [x] T010 [US1] Implement `selectRelevantRecommendations` in `src/packages/forum/services/recommendation.service.ts` using academic context and learning preference matches from `research.md` R3
- [x] T011 [US1] Add `GET /api/v1/forum/recommendations` to `src/packages/forum/forum.controller.ts` using the `@Authenticated()` and `@KeySession()` pattern already used by forum routes
- [x] T012 [US1] Add the `reason` text mapping for `relevant` items in `src/packages/forum/services/recommendation.service.ts` following the examples in `contracts/api.md`

**Checkpoint**: User Story 1 is independently functional and testable.

---

## Phase 4: User Story 2 - See Trending Posts in the Academic Context (Priority: P1)

**Goal**: Highlight high-engagement visible posts within the active academic context.

**Independent Test**: Prepare high-engagement posts in one context and a different context, request recommendations for the first context, and verify the `trending` section contains only the first context's posts.

### Tests for User Story 2

> Write these tests FIRST and confirm they fail before implementation.

- [x] T013 [P] [US2] Add `describe('selectTrendingRecommendations')` to `src/packages/forum/__tests__/recommendation.service.spec.ts` with cases for engagement ranking, context isolation, deterministic tie-break, and no meaningful engagement

### Implementation for User Story 2

- [x] T014 [US2] Implement `selectTrendingRecommendations` in `src/packages/forum/services/recommendation.service.ts` using `vote_score`, `comment_count`, and `created_at` as specified in `research.md` R4
- [x] T015 [US2] Populate the `trending` section in `src/packages/forum/dto/recommendation-response.dto.ts` mapping from `src/packages/forum/services/recommendation.service.ts`
- [x] T016 [US2] Add an E2E case to `test/forum-recommendations.e2e-spec.ts` verifying that a context switch changes the `trending` section contents

**Checkpoint**: User Stories 1 and 2 are independently functional and testable.

---

## Phase 5: User Story 3 - Find Unsolved Questions the Student Can Help With (Priority: P2)

**Goal**: Recommend unsolved questions from the active context that match the student's courses or interests.

**Independent Test**: Prepare solved and unsolved posts in one course context, request recommendations, and verify only unsolved posts appear in the `unsolved` section.

### Tests for User Story 3

> Write these tests FIRST and confirm they fail before implementation.

- [x] T017 [P] [US3] Add `describe('selectUnsolvedRecommendations')` to `src/packages/forum/__tests__/recommendation.service.spec.ts` with cases for `solved = false`, preference preference ordering, restricted-post exclusion, and no candidates

### Implementation for User Story 3

- [x] T018 [US3] Implement `selectUnsolvedRecommendations` in `src/packages/forum/services/recommendation.service.ts` following `research.md` R5
- [x] T019 [US3] Populate the `unsolved` section in `src/packages/forum/dto/recommendation-response.dto.ts` with `reason` values derived from course or interest matches
- [x] T020 [US3] Add an E2E case to `test/forum-recommendations.e2e-spec.ts` confirming that solved posts never appear in the `unsolved` section

**Checkpoint**: All three recommendation categories are independently functional and testable.

---

## Phase 6: User Story 4 - Dismiss and Refresh Recommendations (Priority: P2)

**Goal**: Hide an irrelevant recommendation in the current view and refresh recommendations when preferences or forum context change.

**Independent Test**: Dismiss one visible recommendation and confirm it disappears from the current view; then change preferences or context and confirm recommendations reflect the new inputs.

### Tests for User Story 4

> Write these tests FIRST and confirm they fail before implementation.

- [x] T021 [P] [US4] Add tests to `src/packages/forum/__tests__/recommendation.service.spec.ts` verifying that a context or preference change rebuilds recommendations and does not mix inputs
- [x] T022 [US4] Add a contract test in `test/forum-recommendations.e2e-spec.ts` for `refresh=true` returning recommendations based on the latest context and preferences

### Implementation for User Story 4

- [x] T023 [US4] Implement context and preference refresh handling in `src/packages/forum/forum.controller.ts` and `src/packages/forum/services/recommendation.service.ts` following `research.md` R7
- [x] T024 [US4] Document the current-view-only dismissal behavior in `docs/API.md` and link the client-side dismissal contract to `contracts/api.md`

**Checkpoint**: All user stories are independently functional and testable.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, quality gates, and final integration validation.

- [x] T025 [P] Update `docs/API.md` with `GET /api/v1/forum/recommendations`, its query parameters, success shape, empty sections, and error codes from `contracts/api.md`
- [x] T026 Enforce the visibility rule from `research.md` R8 across every recommendation section in `src/packages/forum/services/recommendation.service.ts`
- [x] T027 Implement the retryable error and empty-section behavior from `research.md` R9 in `src/packages/forum/forum.controller.ts`
- [x] T028 [P] Run `npm run lint` and resolve any issues introduced by the new forum files
- [x] T029 [P] Run `npm run format` and confirm formatting is clean
- [x] T030 Run `npm run build`, `npm run test`, and `npm run test:e2e` as the final integration gate

**Checkpoint**: All 30 tasks complete; documentation updated; quality gates green.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories
- **US1 (Phase 3)**: Depends on Foundational
- **US2 (Phase 4)**: Depends on Foundational; may proceed in parallel with US1
- **US3 (Phase 5)**: Depends on Foundational; may proceed in parallel with US1 and US2
- **US4 (Phase 6)**: Depends on US1–US3 recommendation sections being available
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 (P1)**: Starts immediately after Foundational; no dependency on other stories
- **US2 (P1)**: Starts immediately after Foundational; shares the response contract only
- **US3 (P2)**: Starts immediately after Foundational; shares the response contract only
- **US4 (P2)**: Requires all three sections to exist so dismissal and refresh can be validated across them

### Within Each User Story

- Tests are written first and confirmed failing before implementation
- DTO/response fields precede service population
- Service logic precedes controller wiring
- E2E coverage follows route-level tests

### Parallel Opportunities

- T002 and T003 run in parallel
- T008 and T009 run in parallel
- T013, T017, and T021 run in parallel when separate test blocks are used
- T025, T028, and T029 run in parallel during polish

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Setup and Foundational (T001–T007)
2. Complete US1 (T008–T012)
3. Stop and validate that relevant recommendations are visible and safe
4. Demo the MVP before adding trending, unsolved, and refresh behavior

### Incremental Delivery

1. Setup + Foundational → shared contract and fixtures ready
2. US1 → relevant recommendations → validate independently
3. US2 → trending section → validate independently
4. US3 → unsolved section → validate independently
5. US4 → dismissal/refresh behavior → validate independently
6. Polish → documentation and quality gates → final validation

### Single-Developer Sequential Order

T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018 → T019 → T020 → T021 → T022 → T023 → T024 → T025 → T026 → T027 → T028 → T029 → T030

---

## Notes

- Recommendation ranking weights, section sizes, and dismissal persistence are implementation decisions documented in `research.md`, not additional functional requirements.
- All test fixtures belong in `src/packages/forum/__tests__/`; E2E files belong in `test/`.
- Frontend source is outside this backend repository; the client consumes the contract in `contracts/api.md`.
- No source code was modified as part of this SpecKit documentation run; final task status is recorded by `/speckit-implement` separately.
