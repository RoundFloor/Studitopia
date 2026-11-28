# Implementation Plan: Trending Page (Forum Recommendations)

**Branch**: `004-trending-page` | **Date**: 2026-11-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/004-trending-page/spec.md`

## Summary

Add a Trending page that recommends relevant, trending, and unsolved forum posts for the authenticated student's active university, major, or course context. The backend implementation extends the existing forum package with recommendation selection and a read contract that reuses existing post summaries, learning preferences, and forum visibility rules. The frontend source is outside this backend repository; this plan defines the backend contract the frontend must consume.

## Technical Context

**Language/Version**: TypeScript (Node.js, ESM modules)

**Primary Dependencies**: NestJS, class-validator, Vitest, Supertest

**Storage**: PostgreSQL through the existing `PostgresService`; learning preferences from existing account/profile data; no new persistent recommendation store

**Testing**: Vitest unit tests in package `__tests__/` folders; Supertest E2E tests in `test/`

**Target Platform**: Linux server (NestJS application serving the prebuilt SPA)

**Project Type**: Web service (REST API)

**Performance Goals**: Trending page recommendations available within 2 seconds under normal conditions (SC-004)

**Constraints**: Authentication required; forum visibility and privacy rules apply to every recommendation; external services mocked in default tests; no partial or stale restricted content on failure

**Scale/Scope**: One new read operation in the existing forum package; no new package, no new post type, and no library or room recommendations

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| TDD — tests written and confirmed failing before implementation | PASS | Tasks require test-first authoring for selection, visibility, refresh, and error behavior. |
| Package-by-Folder — one self-contained package per domain | PASS | Recommendation logic extends the existing `forum` package; no new package. |
| Adaptive role placement | PASS | Multiple controllers/services/use cases remain in role folders or are grouped when a second file appears. |
| Mandatory module at package root | PASS | Existing `forum.module.ts` is extended; no duplicate module. |
| Tests in `__tests__/` and E2E in `test/` | PASS | All new test files follow the mandated locations. |
| External dependencies mocked | PASS | PostgreSQL and other external integrations are mocked in unit tests. |
| Naming and ESM import conventions | PASS | New artifacts use camelCase functions, PascalCase classes, kebab-case files, and `.js` import suffixes. |
| `docs/API.md` update | REQUIRED | The proposed recommendation read contract must be documented before merge. |
| Lint, format, build, and test gates | PASS | Plan includes these checks in the polish phase. |

**Re-check after Phase 1 design**: All gates still pass. No violations require justification.

## Project Structure

### Documentation (this feature)

```text
specs/004-trending-page/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   └── api.md           # Phase 1 output
├── checklists/
│   └── requirements.md  # Spec quality checklist
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/packages/forum/
├── forum.module.ts                         (existing — register any new provider)
├── forum.controller.ts                     (existing — add recommendation read route)
├── forum.service.ts                        (existing — no change unless shared helpers are needed)
├── dto/
│   └── recommendation-response.dto.ts      (NEW — recommendation response contract)
├── services/
│   └── recommendation.service.ts           (NEW — selection and ranking rules)
└── __tests__/
    ├── recommendation.service.spec.ts      (NEW — unit tests)
    ├── forum.controller.spec.ts            (NEW — route-level tests)
    └── recommendation.testcases.ts         (NEW — shared fixtures)

test/
└── forum-recommendations.e2e-spec.ts       (NEW — end-to-end validation)

docs/
└── API.md                                  (existing — document recommendation contract)

frontend/                                   (prebuilt output only — no source changes here)
```

**Structure Decision**: Keep the feature inside the existing `forum` package. If a second service or controller file is added, move all files of that role into the corresponding role folder per the constitution. Frontend UI work belongs to the separate frontend source repository; this backend repository only consumes the static bundle in `frontend/`.

## Complexity Tracking

> No constitution violations detected. This section is intentionally left empty.
