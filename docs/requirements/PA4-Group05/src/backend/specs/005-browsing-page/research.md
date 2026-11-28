# Phase 0 Research: Browsing Page (University Forum)

**Created**: 2026-11-28

**Status**: Complete

## Research Questions and Decisions

### R1: Which package owns browsing behavior?

- **Decision**: Extend the existing `src/packages/forum/` package. Use `src/packages/post/` for post summaries and detail mapping, and `src/packages/postgres/` for forum data access.
- **Rationale**: Forum hierarchy and post-list access already live in the forum package; splitting browsing into a new package would duplicate visibility rules and module wiring.
- **Alternatives considered**: A new `browsing` package was rejected because it would overlap with the forum domain and risk circular dependencies.

### R2: How is the active forum context represented?

- **Decision**: Use an opaque, session-bound context token for the selected university, major, or course, following the existing forum hierarchy pattern. The token is treated as untrusted input and decoded only by the forum service.
- **Rationale**: Existing forum routes already carry encrypted hierarchy identifiers; reusing that pattern keeps navigation consistent and avoids exposing raw database identifiers.
- **Alternatives considered**: Plain numeric identifiers in the URL were rejected because they would expose internal IDs and diverge from the established forum contract.

### R3: How is the default university determined?

- **Decision**: Use the student's verified university from existing account/profile data when the Forum page opens. If none is available, the page opens in a usable fallback state rather than inventing a university.
- **Rationale**: FR-11.2 and FR-11.4 require the own university as default context; PA4 also notes that some navigation currently falls back to the trending view.
- **Alternatives considered**: A global first-university default was rejected because it would violate the own-university rule.

### R4: How are majors, courses, and posts retrieved for a context?

- **Decision**: Reuse existing forum data access for universities, areas/majors, subjects/courses, and posts, applying the active context at each level. A context switch discards results from the previous context.
- **Rationale**: FR-12.1–FR-12.6 require hierarchy consistency and context-scoped content.
- **Alternatives considered**: Client-side filtering of a global post list was rejected because it would expose content outside the authorized context and would not scale.

### R5: How are post summaries built?

- **Decision**: Map forum post records to the existing post summary response with identifier, title, type, author, vote score, comment count, solved status, and creation time.
- **Rationale**: FR-13.2 and UC-03 B10 define these fields and the post package already has mapping behavior for them.
- **Alternatives considered**: A browsing-specific summary was rejected as duplication.

### R6: How are sorting, keyword search, and filters handled?

- **Decision**: Extend the forum post-list read operation with sort, keyword, tag, author, academic context, post type, solved status, time-range, and My Post filters. Apply all active filters together and use deterministic secondary ordering for stable results.
- **Rationale**: FR-13.3, FR-13.4, and FR-23.1–FR-23.5 define these behaviors; stability prevents result jumps on refresh.
- **Alternatives considered**: Client-only filtering was rejected for the same visibility and consistency reasons as R4.

### R7: How is post detail handled?

- **Decision**: Reuse the existing post detail read path for full content, metadata, discussion, attachments, true-response information, and permitted-action flags. Browsing does not mutate post state.
- **Rationale**: FR-13.5 and FR-16.x require a readable detail view; mutation actions belong to other functional groups.
- **Alternatives considered**: A browsing-only detail copy was rejected because it would drift from post data.

### R8: How are search results ranked?

- **Decision**: Rank by deterministic relevance signals (matched field priority such as title/tag before body) combined with engagement signals (vote score and comment count), then a stable post identifier tie-break.
- **Rationale**: FR-23.4 and UC-03 B4 step 9 require relevance and engagement ranking without specifying an AI model.
- **Alternatives considered**: An AI ranking service was rejected for this feature because PA4 states search ranking is requirement/UI behavior and does not define a deterministic service contract.

### R9: How are empty, error, and restricted states handled?

- **Decision**: Use clear empty states with recovery actions, retryable error states for load failures, access-denied states for restricted posts, and validation feedback for invalid filter/search combinations. Never show partial or stale restricted content.
- **Rationale**: UC-03 A3–A5 and E1–E4 define these states; NFR-SEC-4, NFR-SEC-6, and NFR-PRIV-7 require privacy enforcement.
- **Alternatives considered**: A single generic error message was rejected because it does not provide the recovery behavior required by the use case.

### R10: How is browsing validated?

- **Decision**: Write Vitest unit tests in `src/packages/forum/__tests__/` and `src/packages/post/__tests__/` for hierarchy, summaries, search/filter, and visibility, plus Supertest E2E tests in `test/` for full browsing journeys. Mock PostgreSQL and external services in unit tests.
- **Rationale**: The constitution requires TDD, test co-location, and mocked external dependencies.
- **Alternatives considered**: Manual-only validation was rejected because hierarchy and visibility regressions are high risk.

## Resolved Technical Context Unknowns

No `NEEDS CLARIFICATION` entries remain. Page sizes, pagination limits, and exact ranking weights are implementation decisions recorded in the plan, not additional functional requirements.
