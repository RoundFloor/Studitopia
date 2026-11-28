# Contract: Post Feed

**Feature**: [spec.md](../spec.md) | **Data model**: [../data-model.md](../data-model.md)

All functions in this contract are protected reads. They call `STUDITOPIA.SESSION_CHECK(session_id, user_id)` and reuse feature 002's forum-access and descendant-scope helpers before returning data. Invalid sessions raise `45005`; restricted universities raise `46010`. Callers branch on SQLSTATE, not message text.

## `STUDITOPIA.GET_POST_FEED`

```sql
STUDITOPIA.GET_POST_FEED(
    SESSION_ID INT,
    USER_ID INT,
    P_TAG_ID INT,
    P_SORT TEXT DEFAULT 'NEWEST',
    P_OFFSET INT DEFAULT 0,
    P_LIMIT INT DEFAULT 20
)
RETURNS TABLE (
    ID INT, TITLE TEXT, ACCOUNT_ID INT,
    DISPLAYNAME VARCHAR(32), AVATAR_ID INT,
    POST_TYPE TEXT, CREATED_TIME TIMESTAMPTZ,
    VOTE_SCORE INT, NUM_COMMENT INT,
    SOLVED BOOLEAN, HOT FLOAT
)
```

### Parameters

| Parameter | Required | Description |
| --------- | -------- | ----------- |
| `SESSION_ID` | Yes | Active session id for the requesting student. |
| `USER_ID` | Yes | Account id that must own the session. |
| `P_TAG_ID` | Yes | Selected university, major, course, or intermediate forum tag id. |
| `P_SORT` | No | `NEWEST` (default), `TOP_TRENDING`, `MOST_VOTED`, or `MOST_DISCUSSED`; case-insensitive; blank selects the default. |
| `P_OFFSET` | No | Zero-based page offset; default `0`. |
| `P_LIMIT` | No | Page size; default `20`, maximum `100`. |

### Behavior

- Returns posts linked to `P_TAG_ID` or any descendant tag from `FORUM_DESCENDANT_TAGS`, each post appearing at most once.
- Returns no rows when the forum has no eligible posts; the backend renders the empty state.
- `POST_TYPE` is derived from a type-tag category (`DISCUSSION`, `QUESTION`, `MATERIAL`); missing type tags report `DISCUSSION`, and multiple type tags use the lowest type-tag id.
- `VOTE_SCORE` is root upvotes minus root downvotes; `NUM_COMMENT` is the trigger-maintained root reply count; `SOLVED` is true when `TRUE_RESPONSE` is set; `HOT` is the trigger-maintained cumulative engagement score.
- Ordering follows `P_SORT` and always ends with `CREATED_TIME DESC, ID DESC` so pages are stable.
- The caller retains and resends the chosen sort and page; the function stores no preference state.

### Errors

| SQLSTATE | Condition |
| -------- | --------- |
| `45005` | Invalid, inactive, or expired session. |
| `46010` | Forum belongs to a restricted university. |
| `23503` | Unknown forum tag id. |
| `22023` | Unsupported sort value, negative `P_OFFSET`, `P_LIMIT < 1`, or `P_LIMIT > 100`. |
