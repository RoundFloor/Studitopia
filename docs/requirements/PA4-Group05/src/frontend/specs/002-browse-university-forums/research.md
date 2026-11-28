# Research: Browse University Forums

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Date**: 2026-11-28

All API decisions below are constrained to endpoints already listed in
`docs/architecture/api-catalog.md`. No new backend endpoint is assumed.

## R1. Forum context representation and persistence

**Decision**: Add one `entities/forum` slice with types and a persisted store for
the selected university id/name, optional major and course ids/names, active
level, and search scope. Keep URL parameters as the canonical shareable location
for drill-down. Persist only the selected university context under a versioned
local-storage key; descendant levels are cleared when an ancestor changes.

**Rationale**: The current code derives identity from
`AccountResponse.university_id` (`src/features/account/me/type.ts:4-9`) and passes
ephemeral `page`, `id`, `area`, and `subject` query parameters
(`src/pages/forums/ForumPage.tsx:5-13`, `src/pages/forums/browse/BrowsePage.tsx:7-13`).
No forum store or persistence exists, and context is lost when entering a post
(`src/pages/forums/browse/subject/SubjectPage.tsx:371`). A single forum entity
satisfies FR-002 and FR-004 without creating sibling `university`, `major`, and
`course` entities that would violate the constitution's no-sibling-entity-import
rule (`.specify/memory/constitution.md:151`). Zustand is already used in
`src/entities/session/auth-store.ts:29-48`; moving it from devDependencies to
dependencies makes the same convention safe for production use.

**Alternatives considered**:
- URL-only context: rejected because FR-004 requires the selected university to
  remain the default on later visits and URLs are not retained after login.
- Separate entity per hierarchy level: rejected because each level would import
  its parent, violating FSD dependency rules.
- Reusing `AuthStore`: rejected because forum selection is not session/security
  state and would couple unrelated domains.

## R2. University / Major / Course vs Forum / Area / Subject naming

**Decision**: Treat the spec's University → Major → Course as the product-facing
names for the backend's university → area → subject encrypted chain. Use product
terms in types, routes, breadcrumbs, and documentation; pass the backend's
encrypted ids unchanged in cumulative chain order.

**Rationale**: `docs/architecture/api-catalog.md:330-338` documents
`GET /forum/:id` with chain-dependent responses: university → areas,
university + area → subjects, university + area + subject → posts. Current pages
already use "areas" and "subjects" for the middle and leaf levels
(`src/pages/forums/browse/area/AreaPage.tsx:181-185`,
`src/pages/forums/browse/subject/SubjectPage.tsx:238-241`). Reusing this chain
avoids inventing a new backend contract for hierarchy listing while satisfying
FR-005..FR-009.

**Alternatives considered**:
- Rename backend concepts to major/course: rejected because the frontend cannot
  change backend vocabulary and would create docs/source drift.
- Keep area/subject naming in the UI: rejected because the approved spec uses
  university/major/course and acceptance criteria refer to those terms.

## R3. University directory, access, and search scope

**Decision**: Use `GET /forum` for the university directory and render only
universities returned by the backend. Treat permission to browse another
university as server-owned. For search scope:
- `context`: fetch candidate posts from `GET /forum/:id` using the active
  University → Major → Course chain.
- `accessible`: fetch candidate posts from `GET /post/relevant` with no
  `include`/`exclude`, which the catalog says returns all posts; optionally add
  `include`/`exclude` tag ids from documented tag endpoints to narrow the set.

**Rationale**: `GET /forum` returns `TagResponse[]` of universities
(`docs/architecture/api-catalog.md:322-328`) but is unused in source.
`GET /forum/:id` returns `PostResponse[]` for a complete chain
(`docs/architecture/api-catalog.md:330-338`). `GET /post/relevant` explicitly
states that omitting both `include` and `exclude` returns all posts
(`docs/architecture/api-catalog.md:349-360`). There is no permission model in the
frontend today; only `AuthGuard` gates authentication
(`src/app/guard/auth-guard.tsx:5-25`). Error code `45006` (`INVALID_ID`) is
documented for invalid chains (`docs/architecture/api-catalog.md:340-343`) but
missing from `src/shared/api/error.ts:1-17`.

**Alternatives considered**:
- Client-side allowlist: rejected because it is not an authorization boundary
  and would drift from the backend.
- A new endpoint for accessible posts: rejected because the user requires only
  catalog APIs and `/post/relevant` already covers this case.
- Show every university and let requests fail silently: rejected because FR-016
  requires an explicit notice and withheld content.

## R4. Search implementation with documented APIs

**Decision**: Implement search as a frontend feature over candidate posts fetched
from catalog endpoints. Normalize the keyword locally, resolve tag ids to names
through `GET /tag/resolve/:id` or `GET /tag/relevant?id=...`, and match/filter the
candidate set deterministically. No new endpoint is introduced. Fields that the
documented responses cannot supply are marked unsupported and disclosed in the UI.

| Spec field / filter | Catalog support | Frontend behavior |
| --- | --- | --- |
| `title` | `PostResponse.title` | Supported |
| `tags` | `PostResponse.tags` + documented tag endpoints for names | Supported |
| `university`, `major`, `course` | Active chain and `TagsByIdResponse.category` | Supported |
| `solved` | `PostResponse.true_response` | Supported |
| time range | `PostResponse.created_time` | Supported |
| `content` | Not present in `PostResponse` | Unsupported; show limitation notice |
| `author` | Only `PostResponse.account_id`; no endpoint for arbitrary account display names | Unsupported; show limitation notice |
| post type | No type field in documented post/tag shapes | Unsupported; show limitation notice |
| engagement ranking | No per-post engagement count in catalog | Unsupported; deterministic fallback ordering used |

**Rationale**: The catalog exposes no keyword-search endpoint. `PostResponse`
contains `id`, `title`, `account_id`, `comment_id`, `true_response`,
`created_time`, and `tags` (`docs/architecture/api-catalog.md:121-129`), so only
a subset of FR-012/FR-013 can be backed by real data. Guessing content from tag
descriptions or author names from the current account would create false
positives. This follows the project's precedent of honest capability disclosure
rather than simulated success (`specs/001-authentication-user-flows/plan.md:23-24`).

**Alternatives considered**:
- New `GET /post/search` endpoint: rejected by the user's explicit constraint to
  use only the listed catalog APIs.
- Extend `/post/relevant` with keyword parameters: rejected because the catalog
  is fixed and `include`/`exclude` are tag-specific.
- Static or mocked results: rejected because it would create false success and
  invalidate quickstart validation.
- Full-corpus browser search without scope: rejected because catalog scale (SC-009)
  makes unbounded fetches unsafe; scoped documented endpoints are used instead.

## R5. Ranking ownership and ordering

**Decision**: Because the catalog provides no relevance/engagement ordering,
`features/forum/search` uses a deterministic client ordering: exact title or
resolved tag-name match first, then partial title/tag match, then context match,
then newest `created_time`. The UI MUST disclose that engagement tie-breaking
from FR-014 is unavailable with the documented API. The frontend does not invent
an engagement score.

**Rationale**: FR-014 requires relevance and engagement ranking. The documented
`PostResponse` has `comment_id` and `true_response` but no reply count, vote
count, or score; `RelevantTagResponse.num_post` is a tag-level count, not a
per-post engagement signal (`docs/architecture/api-catalog.md:109-113,121-129`).
A deterministic ordering keeps results stable and testable without fabricating
data. This is recorded as a deviation requiring approval in
[plan.md](./plan.md#complexity-tracking).

**Alternatives considered**:
- Leave results unsorted: rejected because it fails FR-014 entirely.
- Sort by invented engagement: rejected because it would mislead users.
- Delegate ranking to the backend: rejected because no catalog endpoint supports
  it and no new endpoint is allowed.

## R6. Runtime validation and error mapping

**Decision**: Align TypeScript types with the API catalog, add narrow hand-written
response guards in `shared/api/guards.ts`, add `INVALID_ID = 45006` to
`src/shared/api/error.ts`, and map invalid/forbidden chains to the access or
invalid-context UI state. Use `GET /tag/resolve/:id` and `GET /tag/relevant?id=...`
to obtain tag names/categories for matching. No new validation library is
introduced.

**Rationale**: `TagResponse` in source omits `description` and types `icon` as
`string | null` (`src/features/forum/tag/type.ts:1-7`) while the catalog specifies
`number | null` and `description` (`docs/architecture/api-catalog.md:95-102`).
The catalog defines `PostResponse` (`docs/architecture/api-catalog.md:121-129`)
with no counterpart in `src/features/forum/post/type.ts:1-16`, which models
hard-coded UI post cards. The client parses error bodies into numeric code arrays
(`src/shared/api/client.ts:150-170`), so the missing `45006` code would escape the
current union. Auth feature types are plain TypeScript interfaces; no Zod or
schema dependency exists in `package.json`, so a new library would be unjustified.

**Alternatives considered**:
- Add a schema library: rejected because no such dependency exists and narrow
  guards are sufficient for the documented shapes.
- Trust response shapes without guards: rejected by constitution principle V on
  untrusted external data (`.specify/memory/constitution.md:47-53`).

## R7. Routing strategy and legacy links

**Decision**: Add canonical nested lazy routes under `/forum` for university,
major, course, search, and access-denied views, with a shared `errorElement` and
temporary redirects from the existing `?page=` URLs. Breadcrumbs link to parent
levels using cumulative chain ids.

**Rationale**: `src/app/providers/router/router-provider.tsx:57-71` defines only
`/forum`; nested pages are selected by duplicated `page` query keys in
`ForumPage.tsx:5-13` and `BrowsePage.tsx:7-13`. Existing links use malformed URLs
such as `?page=browse&page=area` (`src/pages/forums/browse/university/UniversityPage.tsx:107`).
The constitution requires central route definitions with `lazy` and the shared
error element (`.specify/memory/constitution.md:164`). Breadcrumbs in
`AreaPage.tsx:187-203` are partly clickable while `SubjectPage.tsx:346-352` are
not, so a shared semantic component is needed for FR-008.

**Alternatives considered**:
- Keep query-param dispatch and add more params: rejected because it cannot
  produce stable deep links and already duplicates `page`.
- Remove old URLs without redirects: rejected because existing layout and page
  links would become dead ends.

## R8. Shared UI and accessibility

**Decision**: Add two feature-agnostic shared components, `Breadcrumbs` and
`EmptyState`, using native `<nav>`/links, lists, and buttons. Reuse `Button` and
`Input` for search/filter actions and use native labelled `<select>`/`<input>`
controls rather than modifying the pointer-only `SelectCard`, `TickBox`, and
`ToggleSwitch` components in this feature. Unsupported search fields/filters are
shown as disabled or labelled notices rather than silently ignored.

**Rationale**: Breadcrumb and empty-state markup is duplicated or missing across
university, area, subject, library, and route-error pages. Shared `Button`
forwards native props and `aria-*` (`src/shared/ui/button/Button.tsx:4-27`) and
`Input` supports `type="search"` (`src/shared/ui/input/Input.tsx:9-26`), while the
other shared controls are pointer-only divs (`src/shared/ui/select_card/SelectCard.tsx:27-31`,
`src/shared/ui/tick_box/TickBox.tsx:25-29`,
`src/shared/ui/toggle_switch/ToggleSwitch.tsx:25-30`). The constitution requires
semantic HTML and keyboard accessibility (`.specify/memory/constitution.md:218-225`).

**Alternatives considered**:
- Duplicate breadcrumbs/empty states per page: rejected because five consumers
  need identical behavior.
- Rewrite all shared controls to be semantic: rejected as a broader redesign
  outside this feature's scope; native controls are sufficient here.

## R9. Testing strategy

**Decision**: Write co-located Vitest tests first. Mock feature request modules
rather than transport where possible, wrap components in a test
`QueryClientProvider` with `retry: false`, and use `createMemoryRouter(routes)` for
route/breadcrumb/redirect tests. Cover success, empty, error, invalid-query,
unsupported-field, access-denied, and boundary cases. Search matcher tests use
fixtures shaped exactly like `PostResponse`, `TagResponse`, and
`TagsByIdResponse` from the catalog.

**Rationale**: Vitest is configured with `globals: false`, jsdom, cleanup, and
jest-dom (`vite.config.ts:36-42`, `src/test/setup.ts:1-7`). Existing examples use
explicit imports, `userEvent.setup()`, and `createMemoryRouter`
(`src/shared/ui/button/Button.test.tsx:1-23`,
`src/app/providers/router/router-provider.test.tsx:3-13`). Forum page test files
are currently empty, so new work must add meaningful tests rather than count
empty files. No server-state hook tests exist yet, so a wrapper with `retry:
false` is needed to avoid the app's default retry behavior
(`src/app/providers/query/query-provider.tsx:4-15`).

**Alternatives considered**:
- Integration tests against a live backend: rejected because no stable test
  backend or fixtures are configured.
- Snapshot-only tests: rejected because the constitution requires observable
  behavior assertions.

## R10. Pre-existing build and lint blockers

**Decision**: Make targeted repairs to the existing errors that block the
mandatory gates or the authenticated forum entry point, and record them in
[plan.md](./plan.md#complexity-tracking). No broad redesign is performed.

**Rationale**: Read-only verification showed TypeScript errors including a
missing `@/features/forum/type` import in `src/pages/forums/feed/FeedPage.tsx:12`,
unused state/imports, and lower-case component naming causing Rules of Hooks
violations. ESLint reports static-components created during render in
`ForumLayout.tsx:73,123,157-158`, `ForumPage.tsx:13,16`, and `BrowsePage.tsx:7-15`.
`initApiAuth()` calls `useLogout()` inside a plain function
(`src/app/providers/auth/auth-initializer.tsx:35-40`). `npm run build` runs
`tsc -b` (`package.json:8`), so these block verification of every story.

**Alternatives considered**:
- Defer all pre-existing failures: rejected because constitution principle VI
  and the Definition of Done require actual passing gate results.
- Rewrite the forum shell wholesale: rejected because it exceeds this feature's
  scope and risks regressions.

## R11. Architecture documentation authority

**Decision**: Treat `src/` as the authority for implemented behavior and
`docs/architecture/api-catalog.md` as the authority for available APIs. Update
the stale architecture/component catalogs during implementation when shared
components or routes change, but do not add undocumented endpoints to the API
catalog without a separate backend decision.

**Rationale**: The architecture docs still describe an auth-only app, no forum
pages/layout, no aliases, localStorage auth, and no media queries
(`docs/architecture/frontend-architecture.md:21-23,220-233,289-304,457-468,565`,
`docs/architecture/component-catalog.md:27,268-289`), while source contains forum
pages, `ForumLayout`, `@`/`@assets` aliases, Zustand, `VITE_API_BASE_URL`, and an
OTP route guard. The constitution explicitly requires reporting discrepancies
rather than assuming either side is correct (`.specify/memory/constitution.md:92-94`).
The user's instruction makes the catalog the hard boundary for API design.

**Alternatives considered**:
- Follow all docs blindly: rejected because they would misdescribe current
  behavior.
- Ignore docs: rejected because they remain the intended contract surface and
  must be updated as part of Definition of Done.
- Add a new search endpoint to the catalog: rejected by the user's constraint.
