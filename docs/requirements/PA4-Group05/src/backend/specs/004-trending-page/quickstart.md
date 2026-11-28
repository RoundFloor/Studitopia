# Quickstart: Trending Page (Forum Recommendations)

**Created**: 2026-11-28

## Prerequisites

- Run commands from the backend repository root (`src/backend`).
- Dependencies are installed (`npm install`).
- PostgreSQL and external services are mocked in unit tests; no live third-party calls are needed for the default test run.

## Validation Scenarios

### 1. Relevant recommendations for a student context

1. Start from a registered student session with a selected university and at least one configured course or interest tag.
2. Prepare visible posts that match and do not match that context.
3. Request recommendations for the active context.
4. **Expected outcome**: only matching posts appear in the `relevant` section and each item has a reason tied to a real match.

### 2. Trending recommendations stay inside the academic context

1. Prepare high-engagement posts in two different major contexts.
2. Request recommendations for one major.
3. **Expected outcome**: the `trending` section contains posts from the selected major only.

### 3. Unsolved-question recommendations

1. Prepare solved and unsolved posts in the same course context.
2. Request recommendations for that course.
3. **Expected outcome**: only `solved = false` posts appear in the `unsolved` section.

### 4. Dismiss and refresh

1. Open the recommendation view and dismiss one item.
2. **Expected outcome**: the item disappears from the current view.
3. Change preferences or academic context and request a refresh.
4. **Expected outcome**: recommendations reflect the new inputs and do not show the dismissed item from the previous view.

### 5. Visibility and error handling

1. Prepare a restricted post that matches the recommendation signals.
2. Request recommendations.
3. **Expected outcome**: the restricted post is absent.
4. Simulate a recommendation data load failure.
5. **Expected outcome**: a retryable error state is shown and no partial or stale recommendations are displayed.

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
