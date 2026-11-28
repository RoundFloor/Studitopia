# Phase 0 Research: Trending Page (Forum Recommendations)

**Created**: 2026-11-28

**Status**: Complete

## Research Questions and Decisions

### R1: Where should recommendation behavior live?

- **Decision**: Extend the existing `src/packages/forum/` package with recommendation selection logic and expose it through the forum controller surface. Do not create a new package.
- **Rationale**: Recommendations are a discovery layer over existing forum posts (UC-21 model note 3), and the forum package already owns forum hierarchy and post-list access.
- **Alternatives considered**: A new `recommendations` package would duplicate visibility and post-mapping concerns and would violate the constitution's one-folder-per-domain preference.

### R2: Which post data can feed recommendations without a new post model?

- **Decision**: Use the existing forum post summary fields: identifier, title, post type, author, vote score, comment count, solved status, creation time, and tags/context where available. Add a per-item recommendation reason at the response boundary.
- **Rationale**: PA4 UC-21 B10 lists these fields as available from the forum post list; the reason text is the only recommendation-specific addition.
- **Alternatives considered**: Introducing a separate persistent post copy would create stale content and extra synchronization work.

### R3: How should relevant posts be selected?

- **Decision**: Match the active academic context and available learning preferences (courses, subjects, interest tags, learning goals, preferred study times) against post tags and forum context, then apply deterministic tie-breakers using engagement and post identifier.
- **Rationale**: FR-24.1 requires context and interest relevance; deterministic ordering keeps results testable and avoids non-reproducible AI ranking.
- **Alternatives considered**: Free-form AI ranking was rejected for this plan because PA4 does not specify a ranking model or stability guarantees.

### R4: How should trending posts be selected?

- **Decision**: Rank visible posts in the active context using available engagement signals (vote score, comment count) and recency from creation time, with deterministic tie-breaking.
- **Rationale**: FR-24.2 requires trending posts in the academic context and the forum post summary already carries the needed signals.
- **Alternatives considered**: Global trending across all universities was rejected as out of context; arbitrary recent-first ordering was rejected because it ignores engagement.

### R5: How should unsolved questions be selected?

- **Decision**: Filter visible posts to `solved = false`, prefer matches against the student's courses and interests, and include a reason explaining the match.
- **Rationale**: FR-24.3 and UC-21 B4 steps 6–7 require unsolved questions the student may be able to help with.
- **Alternatives considered**: Showing all unsolved posts regardless of context would weaken relevance.

### R6: What does dismiss mean?

- **Decision**: Dismissal hides the selected recommendation from the current recommendation view only. No persistent dismissal record is created in this feature.
- **Rationale**: UC-21 A1 explicitly says persistence beyond that view is not specified.
- **Alternatives considered**: Persistent dismissals would require new state, deletion rules, and privacy decisions not present in PA4.

### R7: When should recommendations refresh?

- **Decision**: Rebuild recommendations when the active university, major, or course context changes, and when the student explicitly requests a refresh after updating learning preferences.
- **Rationale**: FR-24.5 and UC-21 A2–A3 define these two triggers.
- **Alternatives considered**: Continuous polling was rejected as unnecessary and would add load without a product requirement.

### R8: How is visibility enforced?

- **Decision**: Apply the same forum visibility and authorization rules used by forum browsing and post detail to every recommendation collection before it is returned or displayed.
- **Rationale**: UC-21 B7 rule 7, NFR-SEC-4, and NFR-PRIV-7 require restricted content to stay hidden.
- **Alternatives considered**: Filtering only in the client was rejected because server-side authorization is mandatory.

### R9: How should empty and failure states behave?

- **Decision**: Use the existing forum empty state when no candidates exist and the existing retryable forum error state when recommendation data cannot be loaded; never show partial or stale restricted content.
- **Rationale**: UC-21 A4 and E1–E3 define these states.
- **Alternatives considered**: A special recommendation-only error surface would add UI scope without a source requirement.

### R10: How should this feature be validated?

- **Decision**: Cover selection and visibility rules with Vitest unit tests in the forum package's `__tests__/` folder and end-to-end request/response behavior with Supertest E2E tests in `test/`, mocking PostgreSQL and external dependencies.
- **Rationale**: The constitution requires TDD, test co-location, and mocked external dependencies.
- **Alternatives considered**: Manual-only validation was rejected because the ranking, visibility, and refresh rules are testable and regression-prone.

## Resolved Technical Context Unknowns

No `NEEDS CLARIFICATION` entries remain in the technical context. Unspecified product details (ranking weights, section sizes, dismissal retention) are explicitly resolved above as implementation decisions for this plan, not new functional requirements.
