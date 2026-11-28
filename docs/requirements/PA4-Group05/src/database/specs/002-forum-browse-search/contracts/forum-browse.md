# Contract: Forum Browse

**Feature**: [spec.md](../spec.md) | **Data model**: [data-model.md](../data-model.md)

All browse functions are protected: they call `STUDITOPIA.SESSION_CHECK(session_id, user_id)` and `STUDITOPIA.CHECK_FORUM_ACCESS(...)` before returning data. Invalid sessions raise `45005`; restricted universities raise `46010`.

## Helper functions

```sql
STUDITOPIA.FORUM_UNIVERSITY_ID(P_TAG_ID INT) RETURNS INT
```

- Returns the nearest `UNIVERSITY` ancestor of a tag through `TAG_CONTAIN` (`TAG_ID_A` is parent).
- Returns `P_TAG_ID` itself when it is a university tag.
- Returns `NULL` when no university ancestor exists.
- Raises `23503` for an unknown tag id.

```sql
STUDITOPIA.FORUM_DESCENDANT_TAGS(P_TAG_ID INT)
RETURNS TABLE (ID INT)
```

- Returns the input tag plus all tags reachable below it through `TAG_CONTAIN`.
- Returns only the input tag when it has no children.
- Returns no rows for an unknown tag id.

## `STUDITOPIA.GET_MAJOR`

```sql
STUDITOPIA.GET_MAJOR(
    SESSION_ID INT,
    USER_ID INT,
    P_UNIVERSITY_ID INT
)
RETURNS TABLE (
    ID INT, NAME TEXT, NUM_TAG INT, NUM_POST INT,
    ICON INT, DESCRIPTION TEXT
)
```

- Lists direct child tags of category `MAJOR` for a university.
- Ordered by `NAME`, `ID`, matching `GET_AREA`/`GET_SUBJECT`.
- Returns no rows for a university with no major edges.

## `STUDITOPIA.GET_COURSE`

```sql
STUDITOPIA.GET_COURSE(
    SESSION_ID INT,
    USER_ID INT,
    P_PARENT_ID INT
)
RETURNS TABLE (
    ID INT, NAME TEXT, NUM_TAG INT, NUM_POST INT,
    ICON INT, DESCRIPTION TEXT
)
```

- Lists direct child tags of category `COURSE` from either a `MAJOR` or `SUBJECT` parent.
- Ordered by `NAME`, `ID`.
- Returns no rows when the parent has no course edges.
- Raises `22023` if the parent tag category is not `MAJOR` or `SUBJECT`.

## `STUDITOPIA.GET_FORUM_PATH`

```sql
STUDITOPIA.GET_FORUM_PATH(
    SESSION_ID INT,
    USER_ID INT,
    P_TAG_ID INT
)
RETURNS TABLE (
    UNIVERSITY_ID INT, UNIVERSITY_NAME TEXT,
    FACULTY_ID INT, FACULTY_NAME TEXT,
    MAJOR_ID INT, MAJOR_NAME TEXT,
    AREA_ID INT, AREA_NAME TEXT,
    SUBJECT_ID INT, SUBJECT_NAME TEXT,
    COURSE_ID INT, COURSE_NAME TEXT
)
```

- Returns the ancestor chain for a forum tag, using the category of each ancestor to fill the matching id/name pair.
- Missing levels are `NULL`; the input tag's own category is filled when it matches one of the path levels.
- The path is used for breadcrumbs and context switching.
- Raises `23503` for an unknown tag id.

## `STUDITOPIA.GET_FORUM_POSTS`

```sql
STUDITOPIA.GET_FORUM_POSTS(
    SESSION_ID INT,
    USER_ID INT,
    P_TAG_ID INT,
    P_OFFSET INT DEFAULT 0,
    P_LIMIT INT DEFAULT 20
)
RETURNS TABLE (
    ID INT, TITLE TEXT, ACCOUNT_ID INT, DISPLAYNAME VARCHAR(32),
    AVATAR_ID INT, COMMENT_ID INT, CONTENT TEXT,
    UPVOTE INT, DOWNVOTE INT, NUM_COMMENT INT,
    TRUE_RESPONSE INT, CREATED_TIME TIMESTAMPTZ,
    TAGS INT[], MATERIAL_COUNT INT
)
```

- Returns posts linked to the requested tag or any descendant tag, using `FORUM_DESCENDANT_TAGS`.
- Keeps the existing `GET_POST_BY_ID` columns unchanged and appends `MATERIAL_COUNT`.
- Ordered by `CREATED_TIME DESC`, `ID DESC`.
- Pagination is zero-based; `P_OFFSET < 0`, `P_LIMIT < 1`, or `P_LIMIT > 100` raises `22023`.
- Returns no rows for an empty forum; the backend renders the empty state.
