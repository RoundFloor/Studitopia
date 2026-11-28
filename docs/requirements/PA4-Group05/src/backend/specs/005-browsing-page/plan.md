# Implementation Plan: Browsing Page (University Forum)

**Branch**: `005-browsing-page` | **Date**: 2026-11-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/005-browsing-page/spec.md`

## Summary

Complete the university forum browsing journey: default own-university context, permitted other-university browsing, university–major–course navigation, post summaries and detail, sorting, keyword search, filters, ranking, and safe empty/error/restricted states. The backend implementation extends the existing forum and post packages; the frontend source is outside this backend repository and consumes the contract defined here.

## Technical Context

**Language/Version**: TypeScript (Node.js, ESM modules)

**Primary Dependencies**: NestJS, class-validator, Vitest, Supertest

**Storage**: PostgreSQL through `PostgresService`; no new persistent store for browsing state

**Testing**: Vitest unit tests in package `__tests__/` folders; Supertest E2E tests in `test/`

**Target Platform**: Linux server (NestJS application serving the prebuilt SPA)

**Project Type**: Web service (REST API)

**Performance Goals**: Forum list, post detail, and common search results within 2 seconds under normal conditions (SC-003–SC-005)

**Constraints**: Authentication required; selected forum context constrains every result; restricted posts must be excluded server-side; no partial or stale content on failure

**Scale/Scope**: Forum, post, and postgres packages; no new package; read-oriented browsing only

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Status | Notes |
|------|--------|-------|
| TDD — tests written and confirmed failing before implementation | PASS | Tasks require test-first authoring for hierarchy, summaries, search/filter, detail, and visibility. |
| Package-by-Folder — one self-contained package per domain | PASS | Changes stay in the existing `forum` and `post` packages. |
| Adaptive role placement | PASS | DTOs and tests use their role folders according to file counts. |
| Mandatory module at package root | PASS | Existing `forum.module.ts` and `post.module.ts` are reused; no duplicate modules. |
| Tests in `__tests__/` and E2E in `test/` | PASS | All new test files follow mandated locations. |
| External dependencies mocked | PASS | PostgreSQL and other external integrations are mocked in unit tests. |
| Naming and ESM import conventions | PASS | New artifacts use camelCase functions, PascalCase classes, kebab-case files, and `.js` import suffixes. |
| `docs/API.md` update | REQUIRED | The consolidated browsing contract must be documented before merge. |
| Lint, format, build, and test gates | PASS | Plan includes these checks in the polish phase. |

**Re-check after Phase 1 design**: All gates still pass. No violations require justification.

## Project Structure

### Documentation (this feature)

```text
specs/005-browsing-page/
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
├── forum.module.ts                         (existing — module wiring)
├── forum.controller.ts                     (existing — hierarchy and post-list routes)
├── forum.service.ts                        (existing — hierarchy and post-list logic)
├── dto/
│   ├── forum-context.dto.ts                (NEW — context token and level contract)
│   ├── forum-query.dto.ts                  (NEW — search, filter, sort, pagination contract)
│   └── post-summary.dto.ts                 (NEW — seven-field post summary contract)
└── __tests__/
    ├── forum.service.spec.ts               (NEW — hierarchy and list tests)
    ├── forum.controller.spec.ts            (NEW — route-level tests)
    └── forum-browse.testcases.ts           (NEW — shared fixtures)

src/packages/post/
├── post.service.ts                         (existing — detail read behavior)
├── dto/
│   └── post.dto.ts                         (existing — detail response)
└── __tests__/
    └── post-detail.spec.ts                 (NEW — detail visibility and field tests)

test/
└── forum-browsing.e2e-spec.ts              (NEW — end-to-end browsing journeys)

docs/
└── API.md                                  (existing — document consolidated browsing contract)

frontend/                                   (prebuilt output only — no source changes here)
```

**Structure Decision**: Keep browsing behavior in the existing `forum` package and post detail behavior in the existing `post` package. When a role gains more than one file, all files of that role live in its role folder. Frontend UI work belongs to the separate frontend source repository; this backend repository only serves the prebuilt bundle in `frontend/`.

## Complexity Tracking

> No constitution violations detected. This section is intentionally left empty.
