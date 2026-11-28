# Quickstart: Browsing Page (University Forum)

**Created**: 2026-11-28

## Prerequisites

- Run commands from the backend repository root (`src/backend`).
- Dependencies are installed (`npm install`).
- PostgreSQL and external services are mocked in unit tests; no live third-party calls are needed for the default test run.

## Validation Scenarios

### 1. Default forum context

1. Start from an authenticated student with a verified university.
2. Open the Forum entry.
3. **Expected outcome**: the student's own university is the active context and the hierarchy is available.

### 2. Hierarchy navigation

1. Select a university, then a major, then a course.
2. **Expected outcome**: majors, courses, and posts are scoped to the selected level; switching levels updates both hierarchy and post list.

### 3. Post summaries and detail

1. Open a course forum and inspect the post list.
2. **Expected outcome**: every summary has title, author, post type, timestamp, vote score, comment count, and solved status.
3. Open one post.
4. **Expected outcome**: detail includes full content, metadata, discussion, attachments where present, and only permitted actions.

### 4. Sort, search, and filter

1. Apply each sort option and a keyword search.
2. Add filters for post type, solved status, tags, and time range.
3. **Expected outcome**: results satisfy every active filter, are ranked by relevance and engagement, and remain inside the active forum context.

### 5. Empty, error, and restricted states

1. Search for a term with no matches.
2. Simulate a forum load failure and a restricted post.
3. **Expected outcome**: clear empty state, retryable error state, and access-denied state are shown without partial, stale, or unauthorized content.

## Commands

```bash
npm run test
npm run test:e2e
npm run lint
npm run build
```

## Additional References

- Behavioral contract: [contracts/api.md](./contracts/api.md)
- Entity and rule definitions: [data-model.md](./data-model.md)
- Technical decisions: [research.md](./research.md)
- Task-level validation steps: [tasks.md](./tasks.md)
