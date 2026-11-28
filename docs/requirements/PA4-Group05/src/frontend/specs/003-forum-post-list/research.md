# Research: Forum Post List

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Date**: 2026-11-28

All API decisions are constrained to endpoints in
`docs/architecture/api-catalog.md`. No new backend endpoint, query parameter, or
response field is assumed. The catalog is the contract boundary; `src/` remains
authoritative for currently implemented behavior.

## R1. Post source by selected forum level

**Decision**:

- For a complete University → Major → Course chain, fetch posts with
  `GET /api/v1/forum/:id`; the catalog defines the full-chain response as
  `PostResponse[]` (`docs/architecture/api-catalog.md:330-339`).
- For university-only or university + major chains, the catalog returns child
  `TagResponse[]`, not posts (`:334-338`). Do not present those child directories
  as a post list. Render an explicit limitation state with working navigation to
  a course forum.
- `GET /api/v1/post/relevant` with no `include`/`exclude` may be used only for an
  explicitly labelled "all accessible posts" view (`:349-362`); it MUST NOT be
  described as scoped to the selected university or major because `PostResponse`
  has no forum-level field (`:121-129`).

**Rationale**: Feature FR-13.1 asks for posts at all three forum levels, but the
catalog only supplies posts for a complete chain. Substituting the accessible-wide
endpoint would misrepresent scope. The limitation is reported rather than hidden,
following the catalog-only constraint in the user input and the precedent in
`specs/002-browse-university-forums/research.md:88-107`.

**Alternatives considered**:

- Invent `GET /post?university=...`: rejected; no such catalog endpoint.
- Use `/post/relevant?include=<every child tag>`: rejected; the catalog defines
  `include` as AND semantics (`:358-360`), so it cannot express "any tag in this
  forum", and hierarchy ids are not guaranteed to be post tags.
- Reuse the hard-coded arrays in `FeedPage.tsx:92-163` and
  `SubjectPage.tsx:32-88`: rejected; they are mocks, not contract data.

## R2. Summary-field availability

**Decision**: Build a UI projection from `PostResponse` (`:121-129`) with explicit
availability flags:

| Spec field | Catalog source | Behavior |
| --- | --- | --- |
| Title | `title` | Show directly |
| Author | `account_id` only | Show a neutral "author unavailable" label; no arbitrary account-name endpoint exists |
| Post type | none | Show a neutral "type unavailable" label; encrypted-id `type` values at `:85` are not post types |
| Timestamp | `created_time` | Show readable creation time and exact date; never label as update time |
| Vote score | none | Show "vote score unavailable"; tag `num_post` is not a post vote count |
| Comment count | none | Show "comment count unavailable"; `comment_id` is an encrypted root id, not a count |
| Solved status | `true_response` | Show the true-response flag as solved/unsolved, with a disclosure that applicability cannot be inferred without a post type |

**Rationale**: The catalog response exposes only `id`, `title`, `account_id`,
`comment_id`, `true_response`, `created_time`, and `tags`. Fabricating author
names, types, votes, or counts would violate the honest-state requirement and the
catalog-only constraint. FR-003 and FR-004 can only be partially satisfied; the
deviation is tracked in `plan.md#complexity-tracking`.

**Alternatives considered**:

- Show `account_id` as the author: rejected because it is an opaque encrypted id
  and not a display name.
- Treat `comment_id` as a count: rejected; it is a string identifier.
- Derive post type from tag `category`: rejected because no documented mapping
  exists (`:105`, `:118`).

## R3. Ordering and ties

**Decision**:

- `newest` is the default and sorts by `created_time` descending (`:127`).
- `top trending`, `most voted`, and `most discussed` remain visible as options but
  are marked "unavailable with documented APIs"; the list keeps the actual
  `newest` ordering and displays that fact. No trending score, vote score, or
  comment count is computed.
- Exact `created_time` ties use a stable opaque-`id` tie-break. The UI discloses
  that a strictly newer-first tie-break is impossible when timestamps are equal.
- No pagination, `sort`, `order`, `page`, or cursor query parameter is sent to the
  backend; none is documented (`:322-381`).

**Rationale**: Sorting can be implemented in the frontend only where the catalog
supplies real data. Treating unavailable orderings as applied, or reusing tag
`num_post` as engagement, would mislead users and repeat the search-ranking
deviation already recorded in feature 002.

**Alternatives considered**:

- Silently fall back to newest while showing the chosen label: rejected because
  it misrepresents the applied ordering.
- Remove unsupported options: rejected because FR-13.4 requires them to be
  offered; disclosure is the catalog-compliant compromise.
- Add backend sort parameters: rejected by the user constraint.

## R4. Post detail retrieval

**Decision**: Use `GET /api/v1/post/:id` with the encrypted id from the list
(`:369-380`). Treat the returned `id` as opaque because it is re-encrypted as
`post-retrieve` (`:374-375`) and may not be valid for another detail call. Render
only catalog-backed fields and label unavailable detail fields (content,
comments, author name, post type) explicitly.

**Rationale**: The detail endpoint returns the same `PostResponse` shape and adds
no body text (`:121-129`). Consistent list/detail fields are limited to title,
account id, comment id, true-response flag, created time, and tags. This affects
US-2 and FR-010 and is recorded as a deviation.

**Alternatives considered**:

- Reuse the static mock post in `ViewPostPage.tsx:14-45`: rejected; false detail.
- Fetch comments from an assumed endpoint: rejected; no comment endpoint is
  listed in `:147-170`.
- Decode or re-encrypt ids: rejected; ids must be passed unchanged (`:74-90`).

## R5. Route and context reuse

**Decision**: Reuse the canonical routes from
`specs/002-browse-university-forums/contracts/forum-routes.md:11-20`, including
`/forum/post/:postId`, its breadcrumb trail, and the legacy `?page=` redirects.
Add `sort` only as a client-side query parameter on canonical list routes; do not
reintroduce `page`. The active sort is carried by list links so returning from a
post preserves it.

**Rationale**: Feature 002 already defines the hierarchy, post-detail route, and
context behavior. The current router has only `/forum` and dispatches through
duplicated `page` keys (`src/app/providers/router/router-provider.tsx:57-71`,
`ForumPage.tsx:5-13`); copying that pattern would lose post ids and forum context.
`sort` does not conflict with the 002 rule banning `page` in canonical routes
(`forum-routes.md:41-58`).

**Alternatives considered**:

- Persist sort in the forum context store: rejected; sort is a view preference,
  not domain state, and URL carriage is shareable and sufficient.
- Use `?page=post&id=...`: rejected; existing detail navigation loses context and
  has no stable deep link.
- Keep `FeedPage` as the forum root: rejected; 002 defines `/forum` as the
  university forum.

## R6. API-aligned type placement

**Decision**: Define the catalog-aligned `PostResponse` and the derived `Post`
domain shape in `src/entities/forum/type.ts`, exported through
`src/entities/forum/index.ts`. Feature slices `features/forum/feed` and
`features/forum/post` both import from that entity. Keep card/detail projection
types local to the consuming feature or page.

**Rationale**: FSD forbids sibling feature imports. Feature 002 planned the
API-aligned type in `features/forum/post/type.ts`
(`contracts/forum-browse-api.md:47-55`), which works for one consumer but blocks a
sibling feed feature. The single `entities/forum` slice is already the 002 home
for shared forum types (`plan.md:156-160,210-218`). Current
`features/forum/post/type.ts:1-13` is a UI-only mock shape and must be replaced by
a projection, not treated as the API contract.

**Alternatives considered**:

- Duplicate the type in both features: rejected; two sources of truth drift.
- Place it in `shared/api`: rejected; `shared` must not know domain shapes.
- Import from `features/forum/post` in feed: rejected; FSD violation.

## R7. Runtime validation and errors

**Decision**: Reuse the narrow response guards planned in
`src/shared/api/guards.ts` by feature 002, add `INVALID_ID = 45006` to
`src/shared/api/error.ts`, and map: `401` through the central client refresh
flow, `409 [45006]` to invalid-context/access state with content withheld,
`500`/network failures to a retryable state, and `200` with `[]` to the post-list
empty state.

**Rationale**: The client parses numeric error arrays (`src/shared/api/client.ts:73-160`) and
`45006` is documented for invalid chains and ids (`:340-343`, `:366`, `:379`,
`:482`) but missing from `src/shared/api/error.ts:1-17`. Untrusted responses must
be validated at the boundary per the constitution's type-safety principle.

**Alternatives considered**:

- Trust catalog shapes without guards: rejected by principle V.
- Add a schema library: rejected; no such dependency exists and narrow guards are
  sufficient.
- Show stale or mock posts on error: rejected; false success.

## R8. UI composition and accessibility

**Decision**: Keep post-specific UI inside `features/forum/feed/ui`: a semantic
post list/row, a labelled native `<select>` for sort, and explicit availability
notices. Reuse 002's shared `EmptyState` and `Breadcrumbs` components for the
generic empty and navigation states; do not duplicate them. Reuse `Button` for
retry actions and existing design tokens.

**Rationale**: Feed and course pages both need the same domain-specific row, but
pages must not import each other and sibling features must not import each other;
one feature-owned UI slice is the compliant reuse point. `Button` forwards native
props (`src/shared/ui/button/Button.tsx:4-27`), while generic empty/breadcrumb
needs are already owned by 002.

**Alternatives considered**:

- Put post rows in `shared/ui`: rejected; rows carry domain fields.
- Duplicate rows in feed and course pages: rejected; drift and duplicated tests.
- Rewrite pointer-only shared controls: rejected; out of scope.

## R9. Testing strategy

**Decision**: Write co-located Vitest tests first, with explicit imports because
globals are disabled (`vite.config.ts:36-42`). Mock `apiRequest` at the shared
barrel for feature tests and mock feature hooks for page tests. Use a fresh
`QueryClient` with `retry: false` for hook tests and `createMemoryRouter(routes)`
for route/navigation tests. Assert observable success, empty, error, boundary,
and disclosure behavior; never count empty test files as coverage.

**Rationale**: The repository has jsdom + Testing Library + user-event, central
cleanup (`src/test/setup.ts:1-7`), and a router test convention
(`src/app/providers/router/router-provider.test.tsx:3-13`). Several forum test
files are empty and the baseline suite has failures; these must be reported and
minimally repaired where they block this feature (`plan.md#complexity-tracking`).

**Alternatives considered**:

- Live-backend integration tests: rejected; no stable configured test backend.
- Snapshot-only tests: rejected; the constitution requires behavior assertions.

## R10. Quality gates and pre-existing debt

**Decision**: Treat `npm test`, `npm run lint`, and `npm run build` as mandatory
gates (`package.json:8-12`; constitution `:250,262`). Repair only the blockers
that prevent this feature's tests and gates from running: missing
`@/features/forum/type` import in `FeedPage.tsx:12`, raw `fetch` with hard-coded
origin in `FeedPage.tsx:228-259`, unused declarations in touched forum files,
`45006` mapping, API-aligned types, and the empty test suites that fail collection.
Report remaining debt instead of refactoring unrelated code.

**Rationale**: Static inspection shows baseline failures: 10 empty suites, broken
app/router assertions, roughly 55 lint errors, and 16 TypeScript errors including
the missing feed type import. Because `npm run build` runs `tsc -b`, these block
verification of every user story.

**Alternatives considered**:

- Defer all debt: rejected; the Definition of Done requires executed, passing
  gates.
- Rewrite the forum shell: rejected; exceeds scope and risks regressions.

## R11. Catalog authority and disclosure

**Decision**: Use `docs/architecture/api-catalog.md` as the sole API contract
source. Do not add undocumented endpoints to that catalog for this feature.
Update `docs/architecture/frontend-architecture.md` and
`docs/architecture/component-catalog.md` only for actual frontend changes, and
report any backend/source disagreement explicitly.

**Rationale**: The user's instruction makes the catalog the hard boundary. The
architecture docs are already stale relative to source, and the constitution
requires reporting discrepancies rather than assuming either side is correct
(`.specify/memory/constitution.md:92-94`).

**Alternatives considered**:

- Follow stale architecture text as authority: rejected; source disagrees.
- Add catalog entries to make the spec fully satisfiable: rejected; backend
  changes are outside this frontend feature and the user's constraint.
