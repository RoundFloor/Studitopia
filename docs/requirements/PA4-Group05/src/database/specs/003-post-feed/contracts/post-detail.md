# Contract: Post Detail

**Feature**: [spec.md](../spec.md) | **Data model**: [../data-model.md](../data-model.md) | **Feed contract**: [post-feed.md](./post-feed.md)

Both functions are protected reads. They call `STUDITOPIA.SESSION_CHECK(session_id, user_id)` and check forum access against the requested post's forum tags before returning data. Invalid sessions raise `45005`; restricted universities raise `46010`. An unknown post returns zero rows; the backend renders the not-found state.

## `STUDITOPIA.GET_POST_DETAILS`

```sql
STUDITOPIA.GET_POST_DETAILS(
    SESSION_ID INT,
    USER_ID INT,
    P_POST_ID INT
)
RETURNS TABLE (
    ID INT, TITLE TEXT, ACCOUNT_ID INT,
    DISPLAYNAME VARCHAR(32), AVATAR_ID INT,
    POST_TYPE TEXT, CREATED_TIME TIMESTAMPTZ,
    VOTE_SCORE INT, NUM_COMMENT INT,
    SOLVED BOOLEAN, HOT FLOAT,
    CONTENT TEXT, UPVOTE INT, DOWNVOTE INT,
    TRUE_RESPONSE INT, TAGS INT[]
)
```

### Behavior

- Returns one row for an existing, accessible post and zero rows otherwise.
- `CONTENT` is the complete root-comment body; `TAGS` is the ascending, deduplicated list of forum/type tag ids.
- Summary fields match the same post's `GET_POST_FEED` row: `POST_TYPE`, `VOTE_SCORE`, `NUM_COMMENT`, `SOLVED`, and `HOT` use the same derivation rules.
- `UPVOTE`, `DOWNVOTE`, and `TRUE_RESPONSE` expose the raw root counters and accepted-response marker.
- No material, vote, comment, or accepted-response write is performed.

### Errors

| SQLSTATE | Condition |
| -------- | --------- |
| `45005` | Invalid, inactive, or expired session. |
| `46010` | Post belongs only to a restricted university. |
| `23503` | Unknown tag reference encountered while resolving post forum tags. |

## `STUDITOPIA.GET_POST_THREAD`

```sql
STUDITOPIA.GET_POST_THREAD(
    SESSION_ID INT,
    USER_ID INT,
    P_POST_ID INT
)
RETURNS TABLE (
    ID INT, CONTENT TEXT, ACCOUNT_ID INT,
    UPVOTE INT, DOWNVOTE INT, NUM_COMMENT INT,
    CREATED_TIME TIMESTAMPTZ, IS_ACCEPTED BOOLEAN
)
```

### Behavior

- Returns the root comment and all descendants for an existing, accessible post, ordered by `CREATED_TIME, ID` as in the existing `GET_COMMENT` function.
- `IS_ACCEPTED` is true only for the comment whose id equals `POST.TRUE_RESPONSE`; it is false for every row of an unsolved post.
- Returns zero rows for an unknown post.
- The backend calls `GET_POST_DETAILS` first for the same session and post id, then `GET_POST_THREAD`, so content is never read before access is verified.

### Errors

| SQLSTATE | Condition |
| -------- | --------- |
| `45005` | Invalid, inactive, or expired session. |
| `46010` | Post belongs only to a restricted university. |
