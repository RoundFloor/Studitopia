# Quickstart: Forum Post List

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Contract**: [contracts/forum-feed-api.md](./contracts/forum-feed-api.md) |
**Data model**: [data-model.md](./data-model.md)

This guide validates the post-list journey using only APIs in
`docs/architecture/api-catalog.md`. Use the contract for exact request/response
shapes and the data model for field availability and state rules.

## Prerequisites

- Node/npm matching `package.json`, with dependencies installed via `npm install`.
- `VITE_API_BASE_URL` pointing at a backend implementing the documented forum,
  post, and tag endpoints.
- A signed-in student account with a university context and at least one
  University → Major → Course chain containing posts.
- Fixture posts with distinct `created_time` values, mixed `true_response`
  values, and known encrypted ids/tags.
- A course chain with no posts, and an invalid chain for `409 [45006]` checks.
- Feature 002 foundation (canonical routes, forum context, shared empty/breadcrumb
  components) available; see [plan.md](./plan.md#risks-and-open-dependencies).

No new backend endpoint is required. Unsupported fields and orderings are
validated through their disclosure notices, not through invented values.

## Setup and automated gates

```bash
npm install
npm test
npm run lint
npm run build
npm run dev
```

Expected: all three gates pass. `npm run build` includes `tsc -b`. Tests are
co-located `*.test.ts(x)`; empty files are not coverage.

## Validation scenarios

### 1. Course-level post list (FR-001, FR-002, FR-003, FR-004; SC-002, SC-003)

1. Sign in and open a course forum with known posts.
2. Confirm the list comes from `GET /forum/:id` with the full chain.
3. Inspect one row: title and creation time are readable; solved status reflects
   `true_response` with an applicability disclosure; author, post type, vote
   score, and comment count show explicit unavailable labels.
4. Open a course forum with no posts.

Expected: only posts for the selected course are shown; no hard-coded mock rows
appear; empty arrays show the explanatory empty state with working navigation;
at least 95% of loads show the list within 2 seconds.

### 2. University and major levels (FR-001; SC-001)

1. Open a university forum and then one of its majors.
2. Look for a post list in each level.

Expected: the UI states that scoped post lists require a course forum and offers
working navigation into a major/course. It does not present child directories or
all-accessible posts as if they were the selected forum's posts.

### 3. Sorting (FR-005–FR-008; SC-004)

1. On a course forum with posts of different creation times, confirm `newest` is
   the default and is visibly active.
2. Select `trending`, `topVoted`, and `mostDiscussed` in turn.
3. Compare the sequence with the actual applied ordering and read the disclosure.

Expected: newest ordering follows `created_time` descending; each unsupported
option is visibly marked unavailable while the actual newest ordering is labelled;
no vote/comment/trending number is invented; the selected option remains active
after returning from a post or switching course context.

### 4. Open and return from a post (FR-009, FR-010; SC-005)

1. Select a post with a known title and id.
2. Confirm the detail view requests `GET /post/:id` with that exact id and shows
   the same title, account id, creation time, true-response flag, and tags as the
   list row.
3. Confirm content, comments, author name, post type, vote score, and comment count
   are labelled unavailable rather than fabricated.
4. Use back/breadcrumb to return to the original list.

Expected: one action opens the matching post; a different row opens different
details; forum context and selected sort are preserved; missing/unavailable posts
show a clear message and a way back.

### 5. Errors, empty, and boundary states (FR-011, FR-012, FR-014; SC-006)

1. Open a course chain that returns `[]`, one that returns `409 [45006]`, and one
   that returns `500`.
2. Inspect a row with a negative or zero value where a value is available and a
   post with equal `created_time` to another post.
3. Switch to university/major level while a sort is selected.

Expected: empty, invalid-context, and retryable error states are distinct;
unsupported fields stay neutral; exact ties use the disclosed stable tie-break;
no stale content from a previous forum remains visible.

### 6. Accessible-wide view (contract-only check)

1. Open the explicitly labelled "all accessible posts" view, if retained.
2. Confirm the request is `GET /post/relevant` with no `include`/`exclude`.

Expected: the scope label never claims a selected university, major, or course;
denied content is absent because the backend controls the returned set.

### 7. Routing and accessibility

1. Visit `/forum/post/<encrypted-id>` directly and from a list row.
2. Visit a legacy `?page=...` forum URL.
3. Keyboard-navigate the sort selector, retry control, post rows, and breadcrumbs.
4. Resize to 320px and 1280px.

Expected: canonical routes and redirects follow
[forum-routes.md](../002-browse-university-forums/contracts/forum-routes.md);
all controls are labelled and reachable; no text or control is lost.

## Failure reporting

Report explicitly: university/major post-list limitation, unsupported summary and
detail fields, unavailable orderings and exact-tie limitation, `post-retrieve` id
semantics, invalid encrypted chains, denied access paths, backend/type drift,
pre-existing lint/type/test debt outside this feature, and any architecture docs
that disagree with source.
