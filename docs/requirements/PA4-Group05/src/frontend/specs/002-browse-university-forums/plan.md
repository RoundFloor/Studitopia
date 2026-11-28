# Implementation Plan: Browse University Forums

**Branch**: `002-browse-university-forums` | **Date**: 2026-11-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-browse-university-forums/spec.md`

**Note**: This plan follows the project constitution, the existing FSD layout, and the
current `src/` implementation. It ends after Phase 1 design; task breakdown is
produced by `/speckit-tasks`.

## Summary

Implement the frontend journeys that let an authenticated student land on a
dedicated university forum, select their own university or another permitted
university, browse the University → Major → Course hierarchy, see content for the
active level, switch context, and search posts by keyword and fields with type,
solved-status, and time-range filters. Results must have an explicit ordering,
and every zero-result, empty-catalog, and access-denied case must have an
explicit user-facing state.

The work reuses the existing React/TypeScript/Vite application, TanStack Query,
central router, guards, `ForumLayout`, and shared UI kit. It adds one forum domain
entity for context, feature-level request hooks for browse/search/access, shared
breadcrumb and empty-state components, and the runtime guards and error mapping
needed to handle the existing encrypted-id chain contract safely.

Search uses only endpoints already listed in `docs/architecture/api-catalog.md`:
`GET /forum/:id` for context-scoped posts, `GET /post/relevant` for
accessible-scope posts, and the documented tag endpoints for tag names and
categories. Query normalization, field matching, filtering, and ordering happen
in the frontend feature slice because the catalog exposes no keyword-search
endpoint. Fields and filters that the documented responses cannot support are
disclosed explicitly instead of being invented. Pre-existing TypeScript, ESLint,
and dependency-classification blockers that prevent the required quality gates
from running are fixed as part of the foundation phase.

## Technical Context

**Language/Version**: TypeScript `~6.0.2`, React `^19.2.8`, JSX with
`react-jsx`, target ES2023, Vite `^8.3.0`.

**Primary Dependencies**: `react`, `react-dom`, `react-router` `^8.5.0`,
`@tanstack/react-query` `^5.104.5`, and `zustand` `^5.1.0`. `zustand` is already
used at runtime but is currently declared only as a devDependency; it must be
moved to `dependencies` together with the lockfile. No new runtime package is
proposed.

**Storage**: TanStack Query in-memory cache for server-owned data; URL path and
query parameters as the canonical shareable hierarchy location; browser local
storage for the persisted default forum context only; HTTP-only refresh cookie
managed by the backend. No secrets or tokens are stored in forum state.

**Testing**: Vitest `^5.0.5` with jsdom, React Testing Library,
`@testing-library/user-event`, and jest-dom; tests are co-located as
`*.test.ts(x)` and run with `npm test`. Router tests use `createMemoryRouter`
with the exported `routes`; query tests use a test `QueryClientProvider` with
`retry: false`.

**Target Platform**: Web single-page application for modern evergreen browsers;
responsive from 320px upward.

**Project Type**: Web application (frontend only).

**Performance Goals**: Preserve route-level lazy loading. Meet SC-001 (95% reach
own forum within 10 seconds and two interactions), SC-002 (90% reach a course
within 60 seconds), SC-003 (95% context switches reflect new content within 3
seconds), SC-005 (empty state within 3 seconds), and SC-006 (95% of searches
return within 3 seconds). Support the sampled catalog scale in SC-009: 1,000
universities, 100 majors per university, and 500 courses per major.

**Constraints**: Backend is authoritative for identities, permissions,
encrypted id chains, and returned data. Only endpoints documented in
`docs/architecture/api-catalog.md` may be used; no new backend endpoint is
assumed. FSD dependency direction must be respected; pages must not call
transport directly; `shared` must not import domain slices. Shared UI must stay
feature-agnostic. No `any`, no new runtime library, no token logging, no
simulated or hard-coded forum/search results, and no dead navigation targets.
Existing deviations in forum pages must not be copied into new code. Search
limitations caused by the documented response shapes must be disclosed.
`npm test`, `npm run lint`, and `npm run build` must pass before the feature is
complete.

**Scale/Scope**: One new entity slice (`entities/forum`), three new or expanded
feature slices (`forum/browse`, `forum/search`, `forum/access`), five page
families (university, major, course, search, access denied), two new shared UI
components, four design contracts, and targeted repairs to existing forum files.
Creating, editing, and deleting posts remains out of scope.

> Unknowns from the initial technical scan are resolved in
> [research.md](./research.md): context persistence, hierarchy naming, access
> permissions, search implementation using catalog endpoints and its documented
> deviations, ranking ownership, runtime validation, routing strategy, and shared
> UI reuse. No `NEEDS CLARIFICATION` marker remains.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle / rule | Gate | Status | Notes |
| --- | --- | --- | --- |
| I. Simplicity and maintainability | Reuse existing structures; no speculative features | PASS | Existing stack and routes are reused; only one context store and two genuinely reused shared components are added |
| II. Separation of concerns | Features own requests; pages compose; shared stays generic | PASS | Browse/search/access requests live in features; pages render states; shared UI receives no domain logic |
| III. Modularity (FSD) | Downward imports only; no sibling feature/entity imports | CONDITIONAL | Existing pages import `ForumOutletContextType` from `app`; the type moves to `entities/forum`. New code must not copy `shared` → domain imports in `client.ts` |
| IV. Intentional reuse | Reuse Button, Input, router, guards, stores, layouts | PASS | Breadcrumbs and empty states are added only because multiple page families need the same behavior |
| V. Type safety | Precise types, runtime validation at boundaries, no `any` | CONDITIONAL | Align `TagResponse`/`PostResponse` with the API catalog, add narrow response guards, and add error code `45006`; current build has unrelated type errors that must be fixed |
| VI. Automated testing | Tests first; success, failure, and boundary cases | PASS | Co-located tests planned for store, features, routes, pages, and shared components; empty legacy test files must be filled or removed |
| VII. Consistency | Existing conventions, paths, and design tokens | PASS | kebab-case new directories, PascalCase components, central router, existing design tokens |
| Architecture: Component design | Cohesive, feature-agnostic shared components | PASS | New shared components have no forum imports; existing pointer-only controls are left unchanged where native controls are sufficient |
| Architecture: Routing | Central route table, lazy pages, guards, shared error element | CONDITIONAL | Existing forum pages dispatch through duplicated `page` query keys; canonical nested routes and compatibility redirects are added centrally |
| State and data | TanStack Query for server state; local/entity state separated | PASS | Server data stays in query cache; forum context is the only persisted domain state; no page-level `fetch` |
| UI/UX and accessibility | Semantic, keyboard accessible, responsive, explicit states | CONDITIONAL | Breadcrumbs, selectors, filters, and empty states must use native semantics; current fixed-width shell needs responsive rules |
| Security and performance | Backend authority, no secrets, lazy loading, no wasteful work | CONDITIONAL | Permissions stay server-side; no tokens in forum state; route-level lazy loading retained. Client-side search is bounded to documented candidate endpoints and must be measured |

**Gate result**: PASS with the conditional repairs tracked in
[Complexity Tracking](#complexity-tracking). No unresolved `NEEDS CLARIFICATION`
items remain.

## Project Structure

### Documentation (this feature)

```text
specs/002-browse-university-forums/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Phase 0 decisions
├── data-model.md        # Phase 1 entities, validation, transitions
├── quickstart.md        # Phase 1 validation guide
├── contracts/
│   ├── forum-browse-api.md      # Consumed hierarchy/content/tag/post contract
│   ├── forum-search-api.md      # Search over documented endpoints only
│   ├── forum-routes.md          # Routes, guards, redirects, outlet contract
│   └── forum-context-storage.md # Persisted forum context schema
├── checklists/
│   └── requirements.md  # Specification quality checklist
└── tasks.md             # Created later by /speckit-tasks
```

### Source Code (repository root)

Legend: `[existing]`, `[update]`, `[new]`.

```text
src/
├── app/
│   ├── App.tsx                                      [existing]
│   ├── main.tsx                                     [existing]
│   ├── guard/
│   │   ├── auth-guard.tsx                           [existing]
│   │   ├── otp-guard.tsx                            [existing]
│   │   ├── public-only.tsx                          [existing]
│   │   └── forum-access-guard.tsx                   [new]
│   ├── layouts/forum/
│   │   ├── ForumLayout.tsx                          [update: context display, search wiring, lint fixes]
│   │   └── ForumLayout.css                          [update: responsive shell]
│   └── providers/router/
│       ├── router-provider.tsx                      [update: nested forum routes + legacy redirects]
│       └── router-provider.test.tsx                 [update]
├── entities/forum/
│   ├── type.ts                                      [new]
│   ├── forum-context-store.ts                       [new: persisted]
│   ├── index.ts                                     [new]
│   └── forum-context-store.test.ts                  [new]
├── features/forum/
│   ├── tag/
│   │   ├── tag.ts                                   [update]
│   │   └── type.ts                                  [update: API-aligned TagResponse]
│   ├── post/
│   │   ├── post.ts                                  [update: relevant + detail requests]
│   │   ├── type.ts                                  [update: API-aligned PostResponse]
│   │   └── post.test.ts                             [new]
│   ├── browse/
│   │   ├── browse.ts                                [new: requests + use* hooks]
│   │   ├── type.ts                                  [new]
│   │   └── browse.test.ts                           [new]
│   ├── search/
│   │   ├── search.ts                                [new: query normalization + matching + hook]
│   │   ├── type.ts                                  [new]
│   │   └── search.test.ts                           [new]
│   └── access/
│       ├── access.ts                                [new: error-to-state mapping]
│       ├── type.ts                                  [new]
│       └── access.test.ts                           [new]
├── pages/forums/
│   ├── ForumPage.tsx                                [update: route outlet, no query dispatch]
│   ├── browse/
│   │   ├── university/UniversityPage.tsx            [update]
│   │   ├── major/MajorPage.tsx                      [new]
│   │   ├── course/CoursePage.tsx                    [new]
│   │   └── BrowsePage.tsx                           [update: compatibility redirect]
│   ├── search/SearchPage.tsx                        [new]
│   ├── access/AccessDeniedPage.tsx                  [new]
│   ├── feed/FeedPage.tsx                            [update: remove raw fetch and mocks]
│   ├── post/view/ViewPostPage.tsx                   [update: remove mocks, preserve context]
│   └── library/LibraryPage.tsx                      [update: wire or honestly disable inert controls]
├── shared/
│   ├── api/
│   │   ├── client.ts                                [existing: no new upward imports]
│   │   ├── error.ts                                 [update: INVALID_ID 45006]
│   │   ├── guards.ts                                [new: narrow response validation]
│   │   └── index.ts                                 [update]
│   └── ui/
│       ├── breadcrumbs/{Breadcrumbs.tsx,Breadcrumbs.module.css,index.ts,Breadcrumbs.test.tsx} [new]
│       └── empty-state/{EmptyState.tsx,EmptyState.module.css,index.ts,EmptyState.test.tsx}    [new]
└── test/setup.ts                                    [existing]

tests are co-located with source as *.test.ts(x)
```

**Structure Decision**: Single-project frontend using the existing FSD layers and
the existing `src/pages/forums` area. Forum identity, context, and shared outlet
types live in one `entities/forum` slice so sibling entities never import each
other. Endpoint-specific requests and hooks live in `features/forum/*`; pages
compose them and own only transient UI state. New shared UI is limited to two
feature-agnostic components. The existing `area/` and `subject/` directory names
are treated as legacy; new hierarchy pages use `major/` and `course/` and are
wired through the central router.

## Complexity Tracking

> Justified changes required to satisfy the constitution and the feature. These
> touch existing infrastructure and require developer awareness before
> implementation.

| Violation / change | Why needed | Simpler alternative rejected because |
| --- | --- | --- |
| Move `zustand` from `devDependencies` to `dependencies` (with lockfile) | Runtime modules import Zustand; a persisted forum context store is the simplest way to satisfy FR-004 without duplicating storage logic | Adding a second storage mechanism only for forum context creates two sources of truth; leaving the dependency misclassified breaks production installs |
| Move `ForumOutletContextType` from `app/layouts/forum` to `entities/forum` | Pages currently import from `app`, violating the documented dependency direction | Leaving the import violates the constitution; converting to prop drilling duplicates layout plumbing across every forum page |
| Fix pre-existing TypeScript/ESLint errors in forum files (`ForumPage`, `BrowsePage`, `ForumLayout`, `FeedPage`, `ViewPostPage`, `auth-initializer`) | `npm run build` and `npm run lint` are mandatory gates and currently fail; `initApiAuth` calling `useLogout()` outside React can break authenticated entry | Skipping gates violates the constitution; a broad redesign is out of scope, so only minimal correctness fixes are made and recorded |
| Add shared `Breadcrumbs` and `EmptyState` components | University/major/course/search/access pages all need the same navigation and state semantics | Copying markup into five pages duplicates behavior and drifts from the design system; changing every existing pointer-only control is a larger redesign |
| Add canonical nested forum routes with compatibility redirects from `?page=` links | The current duplicate `page` query keys cannot express a University → Major → Course path or a stable search URL | Keeping query-param dispatch preserves context loss and dead links; deleting legacy URLs without redirects breaks existing bookmarks and navigation |
| Implement search in the frontend over candidate sets from documented endpoints, with explicit unsupported-field notices | The catalog has no keyword-search endpoint; only catalog APIs may be used. `GET /forum/:chain` and `GET /post/relevant` provide bounded candidate sets, while `PostResponse` exposes title, tags, solved flag, and creation time | Inventing a new backend endpoint violates the user constraint; hard-coded results would be dishonest; full-corpus browser search is avoided by using documented scoped endpoints |
| Approximate FR-014 ranking and disclose absent engagement signals | `PostResponse` has no engagement count; catalog tag endpoints provide `num_post` per tag, not per post | Re-sorting by invented engagement would mislead; leaving results unsorted fails FR-014. Use deterministic match-strength then recency ordering and record the deviation for approval |
| Mark content, author-display-name, and post-type search/filters as unsupported by the catalog | Documented `PostResponse` lacks content, author display name, and post type; only `account_id`, `tags`, `true_response`, and `created_time` exist | Guessing values from unrelated fields would produce false positives; hiding the limitation would violate honest-state requirements |

## Phase 0: Research Summary

Full decisions and alternatives are in [research.md](./research.md). Key outcomes:

- Forum context is a single persisted entity storing the selected ids/names and
  active level; URL parameters remain the shareable source for drill-down.
- Product terms University/Major/Course map to the backend's university → area →
  subject chain; the frontend uses product terms in UI and contracts.
- Access to other universities is determined by the server; a client guard only
  renders the server's denial state and never grants access.
- Search uses only catalog endpoints: `GET /forum/:chain` for context scope and
  `GET /post/relevant` for accessible scope, with documented tag endpoints for
  tag names/categories. Unsupported fields and filters are disclosed.
- Ranking is deterministic in the frontend (match strength then recency) because
  the catalog exposes no relevance/engagement ordering; the deviation is recorded.
- Runtime guards are narrow, hand-written validators over API catalog shapes;
  no new schema library is introduced.
- Nested lazy routes replace query-param page switching, with temporary
  redirects for existing links.
- Native semantic controls are used for breadcrumbs, filters, and empty states;
  only two genuinely reusable shared components are added.

No `NEEDS CLARIFICATION` items remain.

## Phase 1: Design Summary

- **Data model**: [data-model.md](./data-model.md) defines `University`, `Major`,
  `Course`, `ForumContext`, `ForumLevel`, `Post`, `SearchQuery`, `SearchResult`,
  `StudentAccessPermission`, validation rules, and state transitions.
- **Browse contract**: [contracts/forum-browse-api.md](./contracts/forum-browse-api.md)
  defines the consumed `/forum`, `/forum/:id`, `/post`, and `/tag` endpoints,
  chain construction, response alignment, and error handling.
- **Search contract**: [contracts/forum-search-api.md](./contracts/forum-search-api.md)
  defines the documented endpoints used as candidate sources, client-side
  matching rules, supported/unsupported fields, filters, and deterministic ordering.
- **Route contract**: [contracts/forum-routes.md](./contracts/forum-routes.md)
  defines the route matrix, guards, redirects, breadcrumb behavior, and outlet
  context.
- **Storage contract**: [contracts/forum-context-storage.md](./contracts/forum-context-storage.md)
  defines the persisted context key, schema, validation, and migration rules.
- **Validation guide**: [quickstart.md](./quickstart.md) defines automated and
  manual validation scenarios for all three user stories.

## Post-Design Constitution Re-check

*Re-evaluated after Phase 1 artifacts.*

| Gate | Status after design | Evidence |
| --- | --- | --- |
| Simplicity | PASS | One forum entity slice, three feature slices, two shared components, no new runtime library |
| Separation of concerns | PASS | Contracts keep transport in features and state in entities; pages only compose and render states |
| FSD modularity | PASS | Outlet type moves to `entities/forum`; new code has no upward or sibling imports |
| Intentional reuse | PASS | Button, Input, router, guards, QueryProvider, and forum layout are reused; new shared UI is justified by five consumers |
| Type safety | PASS | API-aligned types, narrow response guards, `INVALID_ID` error code, no `any` |
| Automated testing | PASS | Quickstart defines store, feature, route, page, accessibility, failure, and boundary tests |
| Consistency | PASS | Naming, central routing, design tokens, and lazy loading follow existing conventions |
| Component design | PASS | Shared components accept plain data and callbacks only; no forum imports |
| Routing | PASS | Route contract centralizes hierarchy URLs, compatibility redirects, guards, and breadcrumbs |
| State and data | PASS | Server state stays in TanStack Query; only selected context is persisted; no page-level fetches |
| UI/UX and accessibility | PASS | Native navigation/list/control semantics, labelled filters, and explicit empty/error states are specified |
| Security | PASS | Permissions remain server-owned; no tokens in forum state; denials render without content |
| Performance | CONDITIONAL | Lazy routes and bounded candidate endpoints are specified; client-side search cost must be measured against SC-006/SC-009 before approval |

**Final gate result**: PASS with one performance condition to verify during
implementation. The justified changes and the search-catalog deviation above
must be approved before implementation.

## Implementation Phases

Each phase follows TDD: write failing tests first, implement, then run
`npm test`, `npm run lint`, and `npm run build` before moving on.

1. **Foundation and gates**: Move `zustand` to runtime dependencies with the
   lockfile; fix the pre-existing forum type/lint errors and the hook call in
   `initApiAuth`; add `INVALID_ID` (45006) handling and narrow response guards;
   move `ForumOutletContextType` to `entities/forum`. Add unit tests for guards
   and error mapping.
2. **Forum context**: Add `entities/forum` types, the persisted context store,
   and tests for default selection, descendant clearing, and rehydration.
3. **Hierarchy browse**: Add `features/forum/browse` requests/hooks for
   university, major, course, and level content; replace hard-coded lists in
   university pages; add major and course pages with working breadcrumbs and
   empty catalog states. Wire canonical nested routes and compatibility
   redirects.
4. **Context switching and access**: Wire the university switcher in
   `ForumLayout`, add `ForumAccessGuard`, add `AccessDeniedPage`, and verify that
   denied forums expose no content. Update the route and storage contracts as
   needed.
5. **Search over catalog APIs**: Add `features/forum/search` with query
   normalization, candidate retrieval from `GET /forum/:chain` and
   `GET /post/relevant`, tag-name resolution from documented tag endpoints,
   field matching, filters, scope, and deterministic ordering. Add `SearchPage`
   with results, limitation notices, empty state, and clear-filters action. Add
   hook and page tests for success, empty, invalid-query, unsupported-field, and
   error cases.
6. **Content and post context**: Replace hard-coded feed, subject, and post-view
   content with feature-provided data and preserve hierarchy context through
   post navigation. Wire or honestly disable inert library controls.
7. **Accessibility and responsiveness**: Add semantic breadcrumbs and empty
   states, associate labels with search and filter controls, add keyboard
   operation for all interactive selectors, and make the forum shell responsive
   from 320px.
8. **Verification**: Run the full test suite, lint, production build, and
   quickstart scenarios; update `docs/architecture/*` catalogs for new shared
   components, routes, and API usage; report remaining limitations, especially
   unsupported search fields/filters and measured client-side search cost.

## Risks and Open Dependencies

- **Search limitations from the catalog**: the catalog has no keyword-search
  endpoint and `PostResponse` lacks content, author display name, post type, and
  engagement counts. FR-012, FR-013, and FR-014 can only be partially satisfied;
  the UI must disclose unsupported fields/filters and use deterministic ordering.
  This deviation requires approval before implementation.
- **Candidate-set completeness**: context scope uses `GET /forum/:chain` and
  broad scope uses `GET /post/relevant` with no include/exclude; results are only
  as complete as those documented endpoints. SC-004 and SC-009 must be validated
  against these bounds rather than an assumed full corpus.
- **Client-side cost**: matching and ordering happen in the browser over fetched
  candidate sets. SC-006 (95% within 3 seconds) must be measured with realistic
  catalog sizes; if it fails, the only catalog-compliant mitigation is narrower
  scope or tag filters via `/tag/relevant` and `/post/relevant`.
- **Encrypted id chains**: the backend expects cumulative chains. All hierarchy
  links and breadcrumbs must pass ids in university → major → course order;
  malformed or stale chains produce `409 [45006]` and must render the access or
  invalid-context state rather than an unhandled error.
- **Permission source**: other-university access must come from the backend.
  Client-side context state is a UX control only and must never be treated as
  authorization.
- **API/type drift**: current `TagResponse` and `PostResponse` TypeScript types
  disagree with the API catalog. Both must be reconciled before adding new
  consumers, and any remaining backend mismatch must be reported explicitly.
- **Legacy forum code**: hard-coded posts, inert controls, raw `fetch`, dead
  routes, and empty test files are pre-existing. They are repaired only where
  they block this feature's acceptance criteria; broader redesign is out of
  scope.
- **Architecture docs are stale**: source shows forum pages, aliases, Zustand,
  env-based API base URL, and an active OTP guard while docs do not. Implementation
  must update the relevant catalogs without treating the stale text as authority.
