# Contract: Forum Search

**Feature**: [spec.md](../spec.md) | **Data model**: [data-model.md](../data-model.md)

## `STUDITOPIA.SEARCH_POSTS`

```sql
STUDITOPIA.SEARCH_POSTS(
    P_SESSION_ID INT,
    P_USER_ID INT,
    P_KEYWORD TEXT DEFAULT NULL,
    P_TAGS INT[] DEFAULT NULL,
    P_TITLE TEXT DEFAULT NULL,
    P_CONTENT TEXT DEFAULT NULL,
    P_AUTHOR TEXT DEFAULT NULL,
    P_UNIVERSITY_ID INT DEFAULT NULL,
    P_MAJOR_ID INT DEFAULT NULL,
    P_COURSE_ID INT DEFAULT NULL,
    P_POST_TYPE TEXT DEFAULT NULL,
    P_SOLVED BOOLEAN DEFAULT NULL,
    P_TIME_RANGE TEXT DEFAULT NULL,
    P_OFFSET INT DEFAULT 0,
    P_LIMIT INT DEFAULT 20
)
RETURNS TABLE (
    ID INT,
    TITLE TEXT,
    CONTENT_SNIPPET TEXT,
    ACCOUNT_ID INT,
    DISPLAYNAME VARCHAR(32),
    CREATED_TIME TIMESTAMPTZ,
    TRUE_RESPONSE INT,
    HOT FLOAT,
    TAGS INT[],
    MATERIAL_COUNT INT,
    RELEVANCE FLOAT
)
```

## Behavior

- Protected read: calls `SESSION_CHECK`; invalid sessions raise `45005`.
- Access: a post is eligible only when its owning university is permitted for the caller; restricted universities raise no data and are never included. An explicitly supplied `P_UNIVERSITY_ID` that is restricted raises `46010`.
- Keyword: case-insensitive partial match across title, root comment content, author display name/username, and tag names. A single-character keyword matches exact field values only.
- Field filters:
  - `P_TITLE`, `P_CONTENT`, and `P_AUTHOR` are case-insensitive partial matches.
  - `P_TAGS` requires all supplied tag ids, matching existing `GET_POST` semantics.
  - `P_UNIVERSITY_ID`, `P_MAJOR_ID`, and `P_COURSE_ID` match posts linked to the forum or any descendant tag via `FORUM_DESCENDANT_TAGS`.
  - `P_POST_TYPE` matches a tag whose category is `DISCUSSION`, `QUESTION`, or `MATERIAL`; an unknown type raises `22023`.
  - `P_SOLVED = TRUE` matches `POST.TRUE_RESPONSE IS NOT NULL`; `FALSE` matches `NULL`.
  - `P_TIME_RANGE` accepts `24H`, `7D`, `30D`, or `ALL`; any other value raises `22023`; `NULL` means `ALL`.
- Null or empty text parameters mean "no constraint"; multiple supplied constraints are combined with AND.
- Pagination is zero-based; `P_OFFSET < 0`, `P_LIMIT < 1`, or `P_LIMIT > 100` raises `22023`.
- Zero matching rows is a valid result and is rendered by the backend as the search empty state.

## Ranking

`RELEVANCE` is a deterministic score:

| Match | Weight |
| ----- | ------ |
| Keyword/title or exact title field | 5 |
| Keyword/tag name | 3 |
| Keyword/root content or exact content field | 2 |
| Keyword/author or exact author field | 1 |

Exact field matches add a small tie bonus. Final order is `RELEVANCE DESC`, `HOT DESC`, `CREATED_TIME DESC`, `ID DESC`, so trigger-maintained engagement breaks comparable relevance ties.

## Errors

| SQLSTATE | Condition |
| -------- | --------- |
| `45005` | Invalid, inactive, or mismatched session |
| `46010` | Explicitly requested university is restricted |
| `22023` | Invalid post type, time range, offset, or limit |
| `23503` | Unknown tag or forum id |

```sql
SELECT * FROM STUDITOPIA.SEARCH_POSTS(
    12, 3,
    P_KEYWORD => 'database',
    P_MAJOR_ID => 9,
    P_POST_TYPE => 'QUESTION',
    P_SOLVED => TRUE,
    P_TIME_RANGE => '30D'
);
```
