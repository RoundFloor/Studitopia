# Contract: Forum Materials

**Feature**: [spec.md](../spec.md) | **Data model**: [data-model.md](../data-model.md)

## Table: `STUDITOPIA.POST_FILE`

```sql
POST_FILE(
    POST_ID INT REFERENCES STUDITOPIA.POST(ID),
    FILE_ID INT REFERENCES STUDITOPIA.FILE(ID),
    CREATED_TIME TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (POST_ID, FILE_ID)
)
```

- Links an existing account-owned file to a post as a learning material.
- File ownership and `FILE.SRC` are unchanged.
- Unknown post or file raises `23503`; duplicate link raises `23505`.
- No new write endpoint is added by this feature; the link may be seeded or managed by existing backend data workflows.

## `STUDITOPIA.GET_FORUM_MATERIALS`

```sql
STUDITOPIA.GET_FORUM_MATERIALS(
    SESSION_ID INT,
    USER_ID INT,
    P_POST_ID INT
)
RETURNS TABLE (
    ID INT,
    NAME TEXT,
    SRC TEXT,
    ACCOUNT_ID INT,
    CREATED_TIME TIMESTAMPTZ
)
```

- Protected read: raises `45005` for an invalid session.
- Resolves the post's university through its `INCLUDE_POST_TAG` rows and calls `CHECK_FORUM_ACCESS`; raises `46010` for a restricted university.
- Returns only files linked through `POST_FILE`, ordered by `CREATED_TIME`, `ID`.
- Returns no rows for a post without materials.
- Raises `23503` for an unknown post id.

```sql
SELECT * FROM STUDITOPIA.GET_FORUM_MATERIALS(12, 3, 51);
```
