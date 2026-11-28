# Quickstart: Browse University Forums

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Data model**: [data-model.md](./data-model.md) | **Routes**: [contracts/forum-routes.md](./contracts/forum-routes.md)

This guide validates the feature end to end using only APIs listed in
`docs/architecture/api-catalog.md`. Use the contracts for exact request/response
shapes and storage rules.

## Prerequisites

- Node/npm matching `package.json`, with dependencies installed via `npm install`.
- `VITE_API_BASE_URL` pointing at a backend that provides the documented forum,
  post, and tag endpoints listed in
  [contracts/forum-browse-api.md](./contracts/forum-browse-api.md).
- A student account with a known university and a refresh cookie/session that can
  access the forum.
- A second university that is permitted for the account and one that is not, for
  access-control checks.
- Test posts with known titles, tags, `true_response` values, and `created_time`
  values so deterministic ordering can be verified.

No new backend endpoint is required. Unsupported search fields/filters are
validated through their limitation notices, not through invented data.

## Setup and automated gates

```bash
npm install
npm test
npm run lint
npm run build
npm run dev
```

Expected: all three gates pass. `npm run build` includes `tsc -b`, so a type
error is a failure. Tests are co-located `*.test.ts(x)` files; empty test files do
not count as coverage.

## Validation scenarios

### 1. Default university forum (FR-001, FR-002, FR-004; SC-001)

1. Sign in with a student whose university is known.
2. Observe that `/forum` is the landing destination and the university name is
   visible as the active context.
3. Sign out, sign back in, and observe the same university remains default.
4. Sign in with an account that has no stored context; confirm the university
   directory from `GET /forum` is shown and selecting the own university enters
   its forum.

Expected: no more than two interactions and under 10 seconds to reach the correct
forum; no generic feed is presented as the university forum.

### 2. Hierarchy listing and navigation (FR-005–FR-009; SC-002, SC-009)

1. From `/forum`, open a major, then a course.
2. Confirm each level lists only children of the selected parent and that the
   breadcrumb is University → Major → Course.
3. Confirm course-level posts/materials come from `GET /forum/:chain` for the
   selected course.
4. Sample a university with no majors and a major with no courses.

Expected: every breadcrumb segment opens its parent level; empty catalogs show the
FR-017 explanation instead of blank content or stale mock data.

### 3. Context switching (FR-010; SC-003)

1. From a course forum, switch to a different course, then to a different major,
   then to a different university.
2. Observe header, breadcrumbs, and content update for the new context.

Expected: new context content appears within 3 seconds; descendants are cleared
when an ancestor changes; no content from the previous context remains visible.

### 4. Other university access (FR-003, FR-016)

1. Open the university directory and choose a permitted university.
2. Return and choose a university that is not permitted.

Expected: permitted forums open with their own hierarchy; denied forums show the
access notice from [contracts/forum-browse-api.md](./contracts/forum-browse-api.md)
and expose no majors, courses, or posts.

### 5. Keyword and supported field search (FR-011, FR-012; SC-004, SC-006)

1. From a known forum context, search for a keyword that appears in a known post
   title or resolved tag name.
2. Repeat with `title`, `tags`, `university`, `major`, and `course` fields.
3. Confirm candidates came from `GET /forum/:chain` for `context` scope and from
   `GET /post/relevant` for `accessible` scope.
4. Confirm the expected post is present and within the first five results for a
   known keyword.

Expected: results match at least one supported selected field; no request is sent
for a whitespace-only keyword; results appear within 3 seconds.

### 6. Filters and clearing (FR-013, FR-019)

1. Apply the solved-status filter and a time range together; confirm every
   visible result satisfies both (`true_response` and `created_time`).
2. Select the post-type filter and confirm the limitation notice, since the
   catalog has no post-type field.
3. Clear all filters and verify the unfiltered candidate set for the same keyword
   returns.

Expected: active filters are identifiable; supported filters narrow rather than
replace one another; unsupported filters are disclosed and never silently ignored.

### 7. Deterministic ordering (FR-014)

1. Search with a keyword that has exact title/tag matches and partial matches.
2. Compare posts with different `created_time` values at the same match level.

Expected: exact matches appear first, then partial/context matches, then newest
first. Confirm the UI discloses that engagement tie-breaking is unavailable with
the catalog APIs; see the deviation in [plan.md](./plan.md#complexity-tracking).

### 8. Empty, invalid, and unsupported states (FR-015)

1. Search for a keyword that cannot match anything in the candidate set.
2. Submit a whitespace-only keyword and a keyword longer than 100 characters.
3. Select `content` or `author` as a search field.

Expected: zero matches show an explanatory empty state within 3 seconds; invalid
keywords show inline guidance without a request; unsupported fields show a clear
limitation notice without fabricating matches.

### 9. Scope (FR-018)

1. Search from a course forum and confirm candidates come from the active chain.
2. Broaden scope to accessible universities and confirm candidates come from
   `GET /post/relevant` with no include/exclude parameters.
3. Confirm denied universities are still absent.

Expected: default results stay within the active chain; broadening never exposes
unauthorized content and uses only catalog endpoints.

### 10. Post context and legacy links

1. Open a post from a course forum and navigate back.
2. Visit a legacy `?page=browse&id=...&area=...&subject=...` URL.

Expected: breadcrumbs and back navigation preserve hierarchy context; legacy URLs
redirect according to [contracts/forum-routes.md](./contracts/forum-routes.md).

### 11. Accessibility and responsiveness

1. Keyboard-navigate breadcrumbs, university switcher, search input, filters,
   and clear-filters control.
2. Resize the viewport to 320px and 1280px.

Expected: all controls are reachable and labelled; focus is visible; no text or
control is lost; design tokens from `src/app/index.css` are used consistently.

## Failure reporting

Report any of the following explicitly rather than working around them silently:
unsupported search fields/filters caused by catalog response shapes, absence of
per-post engagement data, measured client-side matching cost, backend/spec type
drift, invalid encrypted chains, denied access paths, pre-existing lint/type debt
outside this feature, and architecture documentation that disagrees with source.
