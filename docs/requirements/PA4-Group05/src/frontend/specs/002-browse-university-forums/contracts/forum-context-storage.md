# Contract: Forum Context Storage

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This contract defines the only client-persisted domain state in the feature: the
student's selected forum context (FR-002, FR-004).

## Storage key

```text
studitopia.forum-context.v1
```

A single versioned key is used. Older or unknown keys are ignored; no migration
from legacy keys is attempted because no forum persistence exists today.

## Schema

```json
{
  "version": 1,
  "level": "university",
  "universityId": "<encrypted-id>",
  "universityName": "Example University",
  "majorId": null,
  "majorName": null,
  "courseId": null,
  "courseName": null,
  "searchScope": "context"
}
```

`level` is `university`, `major`, or `course`. `searchScope` is `context` or
`accessible`. Identifiers are opaque encrypted strings passed through unchanged.

## Rules

- Read after authentication is initialized. If the stored context is invalid,
  incomplete, or refers to a university the backend no longer returns, fall back
  to the account's own university and write a corrected value.
- Write on university selection and on any level switch.
- Changing university clears `majorId`, `majorName`, `courseId`, and `courseName`.
  Changing major clears course fields.
- `course` requires both `universityId` and `majorId`; `major` requires
  `universityId`.
- `accessible` scope is user-initiated only and never bypasses backend
  permissions.
- MUST NOT contain access tokens, refresh tokens, passwords, or personal data
  beyond university/major/course identifiers and display names.
- Validation failures are ignored silently at runtime but covered by unit tests;
  they must not produce an unhandled error on app startup.

## Hydration sequence

1. `AuthInitializer` establishes an authenticated session.
2. `useAccount` provides the account's own university.
3. The forum context store reads and validates the persisted value.
4. If valid, it becomes the default forum context; otherwise the account
   university is used.
5. `/forum` renders after context resolution so the landing view never flashes a
   different university.

## Tests

Co-located store tests MUST cover: missing key, malformed JSON, wrong version,
orphan major/course values, valid rehydration, ancestor clearing, scope changes,
and absence of token fields.
