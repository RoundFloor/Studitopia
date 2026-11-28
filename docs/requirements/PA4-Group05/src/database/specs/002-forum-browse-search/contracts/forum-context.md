# Contract: Forum Context and Access

**Feature**: [spec.md](../spec.md) | **Data model**: [data-model.md](../data-model.md)

All functions are called with `SELECT ... FROM STUDITOPIA.<function>(...)`. Protected functions follow the existing repository pattern: they call `STUDITOPIA.SESSION_CHECK(session_id, user_id)` first and raise `45005` for an invalid, inactive, or mismatched session.

## `STUDITOPIA.CHECK_FORUM_ACCESS`

```sql
STUDITOPIA.CHECK_FORUM_ACCESS(
    SESSION_ID INT,
    USER_ID INT,
    P_UNIVERSITY_ID INT
) RETURNS BOOLEAN
```

- Returns `TRUE` when the caller may browse the university forum.
- Permits the caller's own affiliated university regardless of `FORUM_ACCESS`.
- Permits other universities when `FORUM_ACCESS.IS_PUBLIC` is true or absent.
- Raises `46010` (`FORUM ACCESS DENIED`) when restricted.
- Raises `23503` when the university tag does not exist.
- Raises `22023` when the tag is not category `UNIVERSITY`.

```sql
SELECT STUDITOPIA.CHECK_FORUM_ACCESS(12, 3, 7);
```

## `STUDITOPIA.ASSERT_OWN_UNIVERSITY`

```sql
STUDITOPIA.ASSERT_OWN_UNIVERSITY(
    SESSION_ID INT,
    USER_ID INT,
    P_TAGS INT[]
) RETURNS BOOLEAN
```

- Returns `TRUE` when every supplied tag resolves to the caller's own affiliated university, or has no university ancestor.
- Raises `46011` (`FOREIGN UNIVERSITY CONTENT`) when any tag belongs to another university.
- Intended as a pre-write guard for backend content-changing operations; this feature adds no new write endpoints.
- Raises `45005` for an invalid session and `23503` for an unknown tag id.

## `STUDITOPIA.GET_DEFAULT_FORUM`

```sql
STUDITOPIA.GET_DEFAULT_FORUM(
    SESSION_ID INT,
    USER_ID INT
)
RETURNS TABLE (
    UNIVERSITY_ID INT,
    UNIVERSITY_NAME TEXT,
    FACULTY_ID INT,
    FACULTY_NAME TEXT,
    MAJOR_ID INT,
    MAJOR_NAME TEXT,
    CONTEXT_SOURCE TEXT
)
```

- Returns the explicit `FORUM_CONTEXT` university when one exists; otherwise derives university/faculty/major from `ACCOUNT.DOMAIN_ID` and `RELATED_EMAIL_TAG`.
- `CONTEXT_SOURCE` is `SELECTION` for an override and `AFFILIATION` for a derived context.
- Missing faculty/major values are `NULL`.
- No row is returned when no university can be resolved.
- Raises `45005` for an invalid session and `46010` if a stored override is restricted.

## `STUDITOPIA.SET_DEFAULT_FORUM`

```sql
STUDITOPIA.SET_DEFAULT_FORUM(
    SESSION_ID INT,
    USER_ID INT,
    P_UNIVERSITY_ID INT
) RETURNS BOOLEAN
```

- Inserts or updates the single `FORUM_CONTEXT` row for the caller.
- Returns `TRUE` on success.
- Raises `22023` if the tag is not category `UNIVERSITY`.
- Raises `23503` if the university tag does not exist.
- Raises `45005` for an invalid session and `46010` if the university is restricted.
