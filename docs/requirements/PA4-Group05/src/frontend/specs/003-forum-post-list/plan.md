# Implementation Plan: Forum Post List

**Branch**: `003-forum-post-list` | **Date**: 2026-11-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-forum-post-list/spec.md`

**Note**: This plan follows the project constitution, Feature-Sliced Design, the
existing `src/` implementation, and the user's constraint that contracts use only
APIs in `docs/architecture/api-catalog.md`. It ends after Phase 1 design; task
breakdown is produced by `/speckit-tasks`.

## Summary

Implement the frontend journey that lets an authenticated student see posts in a
selected course forum, scan a truthful summary of each post, choose an ordering,
open one post, and return to the same list. University- and major-level forums do
not have a catalog-backed scoped post list, so those levels show an explicit
limitation and working navigation into a course forum instead of a mislabelled
post set.

The work reuses the React/TypeScript/Vite application, TanStack Query, central
router, guards, `ForumLayout`, and shared UI kit. It depends on the canonical
routes, forum context, API-aligned types, response guards, and shared empty/breadcrumb
components defined by feature 002. New code is limited to one forum entity type
extension, a `features/forum/feed` slice for scoped/accessible post retrieval and
client-side ordering, the existing `features/forum/post` slice for detail retrieval,
post-specific UI inside the feed feature, and a labelled `sort` query parameter on
canonical list routes.

All requests use only `GET /forum/:id`, `GET /post/relevant`, `GET /post/:id`, and
the documented tag endpoints. The catalog has no sort/pagination parameters and
`PostResponse` lacks author display name, post type, vote score, comment count,
and content. Those gaps are disclosed in the UI and recorded as deviations; no
value is fabricated and no undocumented endpoint is assumed.

## Technical Context

**Language/Version**: TypeScript `~6.0.2`, React `^19.2.8`, JSX with
`react-jsx`, target ES2023, Vite `^8.3.0`.

**Primary Dependencies**: `react`, `react-dom`, `react-router` `^8.5.0`,
`@tanstack/react-query` `^5.104.5`, and `zustand` `^5.1.0`. `zustand` is already
used at runtime and its dependency classification is handled by feature 002.
No new runtime package is proposed.

**Storage**: TanStack Query in-memory cache for server-owned posts; the URL
`sort` query parameter for the shareable view preference; feature 002's persisted
forum context for the selected university/major/course. No new storage key, token,
or credential is introduced.

**Testing**: Vitest `^5.0.5` with jsdom, React Testing Library,
`@testing-library/user-event`, and jest-dom. Tests are co-located as
`*.test.ts(x)`, use explicit Vitest imports because globals are disabled, and run
with `npm test`. Hook tests use a fresh `QueryClient` with `retry: false`; route
tests use `createMemoryRouter` with the exported `routes`.

**Target Platform**: Web single-page application for modern evergreen browsers;
responsive from 320px upward.

**Project Type**: Web application (frontend only).

**Performance Goals**: Meet SC-001 (95% identify a relevant post within 60
seconds), SC-002 (all seven summary slots resolved truthfully), SC-003 (95% of
forum visits show the list within 2 seconds for up to 200 posts), SC-004 (100% of
ordering checks match the applied-order contract and 95% identify it), SC-005
(100% of sampled rows open the matching detail in one action), SC-006 (empty and
failure states always shown), SC-007 (90% complete a find-and-open task within 2
minutes), SC-008 (average ease rating at least 4/5), and SC-009 (95% of context
switches show the new list within 2 seconds).

**Constraints**: Only endpoints in `docs/architecture/api-catalog.md` may be
used; no sort, pagination, search, vote, comment, or account-name endpoint is
assumed. Backend identities, permissions, encrypted chains, and returned data are
authoritative. All HTTP goes through `apiRequest` in feature request modules;
pages MUST NOT call `fetch` directly. FSD dependency direction must be respected;
sibling features and entities MUST NOT import each other; `shared` MUST NOT import
domain slices. No `any`, no fabricated fields, no simulated success, no token
logging, and no new runtime library. `npm test`, `npm run lint`, and `npm run build`
must pass before the feature is complete.

**Scale/Scope**: One forum entity type extension, two forum feature slices
(`feed`, `post`), three page families (course list, university/major limitation,
post detail), one API contract, post-specific UI owned by `features/forum/feed`,
and co-located tests. Creating, editing, voting on, or commenting on posts, and
searching/filtering posts remain out of scope.

> Unknowns from the initial technical scan are resolved in
> [research.md](./research.md): catalog level support, field availability,
> ordering semantics, detail retrieval, route reuse, type placement, runtime
> guards, UI ownership, tests, quality gates, and catalog authority. No
> `NEEDS CLARIFICATION` marker remains.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / rule | Gate | Status | Notes |
| --- | --- | --- | --- |
| I. Simplicity and maintainability | Reuse existing structures; no speculative features | PASS | Reuses 002 routes, context, guards, and shared UI; adds one feed slice and no new dependency |
| II. Separation of concerns | Requests in features; pages compose; shared stays generic | PASS | `features/forum/feed` owns list/sort requests; `features/forum/post` owns detail; pages render only states |
| III. Modularity (FSD) | Downward imports only; no sibling feature/entity imports | CONDITIONAL | API-aligned `PostResponse` moves to `entities/forum` so both features can consume it; new code must not copy `app`→`page` or `shared`→domain imports |
| IV. Intentional reuse | Reuse router, guards, Button, context, shared empty/breadcrumb UI | PASS | Post row/sort UI is added once in the feed slice; generic states come from 002 shared components |
| V. Type safety | Precise types, runtime validation, no `any` | CONDITIONAL | Align `PostResponse`, add narrow guards and error code `45006`; pre-existing `FeedPage`/`ViewPostPage` type errors block the gate |
| VI. Automated testing | Tests first; success, failure, and boundary cases | CONDITIONAL | New co-located tests are required; existing empty forum test suites and broken baseline assertions must be repaired or removed |
| VII. Consistency | Existing conventions, paths, design tokens | PASS | kebab-case directories, PascalCase components, central routes, existing CSS tokens |
| Architecture: API integration | Central client, catalog-only, explicit states | CONDITIONAL | Raw `fetch`/hard-coded origin in `FeedPage.tsx:228-259` must be removed; unsupported fields/orderings must be disclosed |
| Architecture: Routing | Central lazy routes, guards, shared error element | CONDITIONAL | Depends on 002 canonical routes; add only a client `sort` param and the `/forum/post/:postId` detail flow |
| State and data | Query for server state; local/domain state separated | PASS | Server posts stay in Query; sort is URL view state; no new persisted domain state |
| UI/UX and accessibility | Semantic, keyboard accessible, responsive, explicit states | CONDITIONAL | Native labelled `<select>`, semantic list, disclosure notices, and responsive rules are required |
| Security and performance | Backend authority, no secrets, no wasteful work | PASS | Permissions stay server-side; no tokens in post state; scoped arrays only, no invented pagination |

**Gate result**: PASS with the conditional repairs and deviations tracked in
[Complexity Tracking](#complexity-tracking). No unresolved `NEEDS CLARIFICATION`
items remain.

## Project Structure

### Documentation (this feature)

```text
specs/003-forum-post-list/
├── spec.md                      # Feature specification
├── plan.md                      # This file
├── research.md                  # Phase 0 decisions
├── data-model.md                # Phase 1 entities, validation, transitions
├── quickstart.md                # Phase 1 validation guide
├── contracts/
│   └── forum-feed-api.md        # Catalog-only post list/detail contract
├── checklists/
│   └── requirements.md          # Specification quality checklist
└── tasks.md                     # Created later by /speckit-tasks
```

### Source Code (repository root)

Legend: `[existing]`, `[update]`, `[new]`, `[from 002]`.

```text
src/
├── app/
│   └── providers/router/
│       ├── router-provider.tsx                         [from 002 update: canonical forum + post routes]
│       └── router-provider.test.tsx                    [from 002 update, then 003 detail cases]
├── entities/forum/
│   ├── type.ts                                         [from 002 update: PostResponse, Post, PostSortOption, PostListState]
│   ├── forum-context-store.ts                          [from 002]
│   ├── index.ts                                        [from 002 update: export post types]
│   └── forum-context-store.test.ts                     [from 002]
├── features/forum/
│   ├── feed/
│   │   ├── feed.ts                                     [new: catalog requests + use* hooks]
│   │   ├── type.ts                                     [new: post-list view types]
│   │   ├── sort.ts                                     [new: pure ordering + tie-break]
│   │   ├── summary.ts                                  [new: field availability projection]
│   │   ├── ui/
│   │   │   ├── PostList.tsx                            [new]
│   │   │   ├── PostRow.tsx                             [new]
│   │   │   ├── PostSortSelect.tsx                      [new]
│   │   │   └── PostList.module.css                     [new]
│   │   ├── feed.test.ts                                [new]
│   │   ├── sort.test.ts                                [new]
│   │   └── summary.test.ts                             [new]
│   └── post/
│       ├── post.ts                                     [update: GET /post/:id request + hook]
│       ├── type.ts                                     [update: UI detail projection only]
│       └── post.test.ts                                [new]
├── pages/forums/
│   ├── ForumPage.tsx                                   [from 002 update: legacy dispatch replacement]
│   ├── feed/FeedPage.tsx                               [update: remove mocks/raw fetch, wire list + sort]
│   ├── feed/FeedPage.test.tsx                          [new]
│   ├── browse/
│   │   ├── course/CoursePage.tsx                       [from 002; update: scoped list + sort]
│   │   ├── CoursePage.test.tsx                         [new]
│   │   ├── university/UniversityPage.tsx               [from 002 update: level limitation, remove mock trending posts]
│   │   └── major/MajorPage.tsx                         [from 002 update: level limitation]
│   └── post/view/
│       ├── ViewPostPage.tsx                             [update: route param + catalog detail + states]
│       ├── ViewPostPage.css                             [update: disclosure styles]
│       └── ViewPostPage.test.tsx                        [update from empty file]
├── shared/
│   ├── api/
│   │   ├── client.ts                                   [existing]
│   │   ├── error.ts                                    [from 002 update: INVALID_ID 45006]
│   │   └── guards.ts                                   [from 002: response validation]
│   └── ui/
│       ├── breadcrumbs/                                 [from 002]
│       └── empty-state/                                 [from 002]
└── test/setup.ts                                       [existing]
```

**Structure Decision**: Single-project frontend using the existing FSD layers and
`src/pages/forums`. The catalog-aligned post type lives in `entities/forum` so
sibling features can consume it without violating dependency rules. List retrieval
and ordering live in `features/forum/feed`; detail retrieval remains in
`features/forum/post`. Post-specific UI is owned by the feed feature because both
course and feed pages need it; generic empty/breadcrumb UI comes from 002. New
directories are kebab-case and components use PascalCase.

## Complexity Tracking

> Justified changes and deviations required by the catalog-only constraint. These
> require developer awareness and approval before implementation.

| Violation / change | Why needed | Simpler alternative rejected because |
| --- | --- | --- |
| University/major forums show an unsupported-level state instead of a scoped post list | Catalog returns only child tags for incomplete chains (`:334-338`) | `/post/relevant` is accessible-wide with no scope field; presenting it as forum-scoped would be false |
| Author, post type, vote score, comment count, and content are shown as explicit unavailable labels | `PostResponse` does not contain them and no catalog endpoint resolves them (`:121-129`, `:147-170`) | Fabricating values or adding an endpoint violates the user constraint and creates false success |
| Trending, most voted, and most discussed are visible but labelled unavailable while newest is applied | FR-13.4 requires the options; catalog has no votes, counts, or sort params | Hiding the options fails the spec; silently claiming they were applied misleads users; invented scores are dishonest |
| Exact `created_time` ties use a stable opaque `id` tie-break with disclosure | FR-13.4/FR-008 asks newer-first ties, but equal timestamps carry no recency information | Reordering equal timestamps by anything else would create an unsourced recency claim |
| Define `PostResponse` in `entities/forum/type.ts`, superseding 002's placement in `features/forum/post/type.ts` | Both feed and post features need the same catalog shape; sibling features cannot import each other | Duplicating the type creates drift; importing a sibling feature violates FSD |
| Add `sort` as a client-only canonical route query parameter | FR-13.4/FR-007 needs a shareable active ordering that survives post navigation and context switches | Storing sort in domain state duplicates view state; reusing `?page=` conflicts with 002 routing |
| Reuse 002 canonical routes, context, guards, and shared UI as prerequisites | This feature cannot preserve post ids/forum context under the current `/forum?page=` dispatch | Rebuilding routing/context or copying query-param dispatch would violate the constitution and lose context |
| Minimal repairs to `FeedPage` import/raw fetch, `45006`, API-aligned types, and failing empty test suites | Mandatory gates and feature tests cannot pass otherwise | Deferring breaks Definition of Done; a broad forum rewrite exceeds scope |
| No pagination UI | Catalog array responses have no page/cursor parameters or totals (`:322-381`) | Inventing page metadata would imply unsupported backend behavior |

## Phase 0: Research Summary

Full decisions and alternatives are in [research.md](./research.md). Key outcomes:

- Only a complete University → Major → Course chain yields catalog-backed posts;
  higher levels show an honest limitation state.
- `PostResponse` supports title, creation time, the true-response flag, and ids
  only; all other summary fields are explicitly disclosed as unavailable.
- Newest ordering is client-side; the three engagement-based orderings are
  visible but marked unavailable with the actual ordering named.
- Post detail uses `GET /post/:id`; the returned `post-retrieve` id is opaque and
  not reusable as a detail path parameter.
- Canonical routes and forum context come from 002; `sort` is a client-only query
  parameter and is carried through post navigation.
- The API-aligned post type lives in `entities/forum`; feature UI projections stay
  local to their slices.
- Narrow guards, `45006`, and explicit empty/error/unavailable states satisfy the
  type-safety and honest-state rules.
- Tests are co-located with transport mocked at the shared barrel and hooks
  mocked at the feature boundary.

No `NEEDS CLARIFICATION` items remain.

## Phase 1: Design Summary

- **Data model**: [data-model.md](./data-model.md) defines the catalog transport
  shape, domain projection, summary/detail availability, sort state, list states,
  validation rules, and transitions.
- **API contract**: [contracts/forum-feed-api.md](./contracts/forum-feed-api.md)
  defines the catalog-only endpoints, forum-level support, field availability,
  ordering behavior, runtime guards, error mapping, and forbidden behavior.
- **Validation guide**: [quickstart.md](./quickstart.md) defines automated gates
  and manual validation for list, level limitation, sorting, detail navigation,
  error states, accessible-wide scope, routing, and accessibility.

## Post-Design Constitution Re-check

*Re-evaluated after Phase 1 artifacts.*

| Gate | Status after design | Evidence |
| --- | --- | --- |
| Simplicity | PASS | One feed slice, one entity type extension, no new runtime library |
| Separation of concerns | PASS | Contracts keep transport in features and domain types in entities; pages only compose |
| FSD modularity | PASS | `PostResponse` in `entities/forum`; no new upward or sibling imports |
| Intentional reuse | PASS | Router, guards, Button, Query provider, 002 context/shared UI are reused; one post row UI |
| Type safety | PASS | Catalog-aligned types, narrow guards, `45006`, no fabricated field values |
| Automated testing | PASS | Quickstart and research specify success, failure, empty, boundary, and disclosure tests |
| Consistency | PASS | Naming, central routing, design tokens, and lazy pages follow existing conventions |
| API integration | PASS | Only catalog endpoints; raw feed fetch removed; explicit loading/empty/error/success states |
| Routing | PASS | 002 canonical routes reused; `sort` is client-only; `/forum/post/:postId` carries the post id |
| State and data | PASS | Server state stays in Query; no new persisted domain state; no page-level transport |
| UI/UX and accessibility | PASS | Native labelled sort control, semantic list, disclosure notices, responsive rules |
| Security | PASS | Permissions remain server-owned; no tokens in post state; invalid ids withhold content |
| Performance | CONDITIONAL | Scoped fetches and lazy routes are specified; 2-second list/context goals must be measured with realistic arrays |

**Final gate result**: PASS with one performance condition to verify during
implementation. The deviations in [Complexity Tracking](#complexity-tracking)
must be approved before implementation.

## Implementation Phases

Each phase follows TDD: write failing tests first, implement, then run
`npm test`, `npm run lint`, and `npm run build` before moving on.

1. **Foundation**: Confirm feature 002 foundation is present (canonical routes,
   forum context, `45006`, guards, shared empty/breadcrumb UI). Add catalog-aligned
   `PostResponse`/`Post`/sort/list types to `entities/forum`. Repair the missing
   feed import, raw fetch path, and test-collection blockers that prevent gates.
2. **Feed feature and field disclosure**: Add `features/forum/feed` requests using
   `GET /forum/:id` and `GET /post/relevant`, narrow response guards, query keys
   including chain and source, and `summary.ts` with explicit unavailable labels.
   Test success, malformed body, empty array, `45006`, `500`, and disclosure.
3. **Ordering**: Add `sort.ts` and `PostSortSelect`; apply newest from
   `created_time` with the stable id tie-break; mark other options unavailable and
   show the actual applied order. Test each option, ties, 0/1 post, and non-mutation.
4. **List UI and levels**: Add `PostList`, `PostRow`, and styles; wire course
   forums to scoped posts and university/major forums to the limitation state.
   Replace mock arrays in `FeedPage`, `CoursePage`, and `UniversityPage`; use the
   shared empty state and retryable error UI. Test row fields, empty/error states,
   and absence of mocks.
5. **Detail journey**: Implement `getPost`/`usePost` in `features/forum/post`,
   wire `/forum/post/:postId`, pass the selected encrypted id, preserve chain and
   sort, render catalog-backed fields and disclosure notices, and handle
   unavailable/missing posts. Test list→detail→back and direct detail URL.
6. **Routing and context**: Add the client `sort` query parameter to canonical
   list links and detail return links; verify legacy redirects from 002 still work.
   Test context/sort preservation and no `page` key in canonical URLs.
7. **Accessibility and responsiveness**: Make sort/select/retry controls and post
   rows keyboard accessible, label all disclosure notices, verify semantic list
   markup, and check 320px/1280px layouts.
8. **Verification and reporting**: Run all automated gates and quickstart
   scenarios; update `docs/architecture/frontend-architecture.md` and
   `docs/architecture/component-catalog.md` for new feature UI/types; report
   unsupported fields/orderings, exact-tie limitation, catalog level limitation,
   measured 2-second goals, and any remaining debt.

## Risks and Open Dependencies

- **Feature 002 foundation**: canonical routes, forum context store, shared
  empty/breadcrumb components, `45006`, guards, and API-aligned tag types are
  planned but not yet present in `src/`. This feature depends on them; if they are
  absent, implement only the minimal compatible subset and report the deviation.
- **Catalog field gaps**: author name, post type, votes, comment counts, content,
  and engagement cannot be supplied. SC-002 and US-2's "full details" are
  satisfied only as far as the catalog allows; disclosure is mandatory.
- **Level limitation**: university/major post lists cannot be scoped with the
  catalog; FR-13.1 is only fully satisfiable at course level.
- **Ordering limitation**: only newest is real; the other three options are
  disclosed as unavailable. FR-13.4 and SC-004 must be measured against the
  applied-order contract, not the requested labels.
- **No pagination**: all returned posts render; SC-003's 200-post goal must be
  measured with actual catalog-sized arrays. If it fails, the only catalog-compliant
  mitigation is narrower scoped chains, not invented pagination.
- **Encrypted ids**: chains must be complete and ordered; the detail response id
  is re-encrypted as `post-retrieve` and is not reusable for another detail call.
- **Backend authority**: permissions are never inferred from client state;
  `409 [45006]` and omissions from returned sets are the denial signals.
- **Pre-existing debt**: empty test files, broken route assertions, lint/type
  errors, static mocks, and stale architecture/component docs are reported
  explicitly rather than silently worked around.
