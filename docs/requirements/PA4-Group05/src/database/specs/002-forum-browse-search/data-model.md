# Data Model: Forum Browse and Search

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

## Existing Entities (source-backed, reused without signature changes)

### `STUDITOPIA.CATEGORY`

- **Fields**: `ID`, `NAME` (case-insensitive text), `DESCRIPTION`.
- **Role**: Discriminator for `TAG`. Existing values include `UNIVERSITY`, `FACULTY`, `MAJOR`, `AREA`, `SUBJECT`, `COURSE` in seed data.
- **Additions**: Idempotent reference rows for `DISCUSSION`, `QUESTION`, and `MATERIAL` as post types.
- **Validation**: Category lookup is case-insensitive; unknown category on tag creation raises `23503`.

### `STUDITOPIA.TAG`

- **Fields**: `ID`, `NAME`, `DESCRIPTION`, `ICON` (file id), `NUM_TAG`, `NUM_POST`, `HOT`, `CATEGORY_ID`, `CREATED_TIME`.
- **Role**: A single forum or classification context. University, faculty, major, area, subject, course, and post-type values are all tags.
- **Validation**: Unique case-insensitive name; blank name raises `22023`; `NUM_TAG`/`NUM_POST`/`HOT` are trigger-maintained and must not be written directly by feature functions.

### `STUDITOPIA.TAG_CONTAIN`

- **Fields**: `ID`, `TAG_ID_A` (parent), `TAG_ID_b` (child).
- **Role**: Directed forum hierarchy edge. Traversal always reads parent from `TAG_ID_A`.
- **Validation**: Self-links rejected; unordered tag pair is unique. The feature does not change this table.

### `STUDITOPIA.DOMAIN` / `STUDITOPIA.RELATED_EMAIL_TAG`

- **Fields**: `DOMAIN(ID, DOMAIN, CREATE_TIME)`; `RELATED_EMAIL_TAG(ID, TAG_ID, DOMAIN_ID)`.
- **Role**: Maps a verified institutional email domain to university/faculty/major tags. Used to derive account affiliation and default forum.
- **Validation**: At most one `UNIVERSITY`, one `FACULTY`, and one `MAJOR` tag per domain; duplicate raises `23505`.

### `STUDITOPIA.ACCOUNT` / `STUDITOPIA.SESSION`

- **Account fields**: `ID`, `DISPLAYNAME`, `EMAIL`, `USERNAME`, `AVATAR`, `PASSWORD`, `CREATE_TIME`, `OTP`, `DOMAIN_ID`, `ROLE`, `STATUS`.
- **Session fields**: session id, owner id, status, expiration; 30-day lifetime.
- **Role**: Identity and protected-call context. `SESSION_CHECK(session_id, user_id)` validates active ownership and raises `45005`.
- **Validation**: Roles `STUDENT|STAFF|ADMIN`; statuses `INACTIVE|PREINIT|ACTIVE|SUSPEND`.

### `STUDITOPIA.POST` / `STUDITOPIA.COMMENT` / `STUDITOPIA.INCLUDE_POST_TAG`

- **Post fields**: `ID`, `TITLE`, `ACCOUNT_ID`, `COMMENT_ID` (root comment), `TRUE_RESPONSE`, `HOT`, `CREATED_TIME`.
- **Comment fields**: `ID`, `CONTENT`, `ACCOUNT_ID`, `UPVOTE`, `DOWNVOTE`, `COMMENT` (parent), `HOT`, `CREATED_TIME`.
- **Post-tag fields**: `POST_ID`, `TAG_ID`; unique pair.
- **Role**: Discussion content, solved flag (`TRUE_RESPONSE`), engagement (`HOT`), author, timestamps, and forum/post-type classification.
- **Validation**: Existing triggers maintain comment/post/tag counters and hot scores; feature functions read them but do not overwrite them.

### `STUDITOPIA.FILE`

- **Fields**: `ID`, `NAME`, `ACCOUNT_ID`, `SRC`, `UPDATED_TIME`, `CREATED_TIME`.
- **Role**: Account-owned file resource. Becomes a material when linked to a post by the new `POST_FILE` table.
- **Validation**: `SRC` is generated as `<account_id>/<file_id>`; ownership checks remain unchanged.

## New Entities

### `STUDITOPIA.FORUM_CONTEXT`

- **Purpose**: Persist an explicit default university selection when the account affiliation is ambiguous or the student chooses a different own university.
- **Fields**: `ACCOUNT_ID` (primary key, references `ACCOUNT`), `UNIVERSITY_ID` (references `TAG`), `CREATED_TIME`, `UPDATED_TIME`.
- **Relationships**: One optional context per account; `UNIVERSITY_ID` must reference a tag in category `UNIVERSITY`.
- **Validation**: `SET_DEFAULT_FORUM` requires a valid session, a valid actor, and a `UNIVERSITY` tag; invalid references raise `23503`; invalid category raises `22023`.
- **State transitions**: No row means derived affiliation; insert/update means explicit selection; deleting the reverse node removes all overrides.

### `STUDITOPIA.FORUM_ACCESS`

- **Purpose**: Opt-in restriction flag for cross-university browsing.
- **Fields**: `UNIVERSITY_ID` (primary key, references `TAG`), `IS_PUBLIC BOOLEAN NOT NULL DEFAULT TRUE`, `CREATED_TIME`, `UPDATED_TIME`.
- **Relationships**: One optional access row per university tag. Absence of a row means public.
- **Validation**: `UNIVERSITY_ID` must reference a `UNIVERSITY` tag; duplicate rows raise `23505`; restricted access raises `46010`.
- **State transitions**: `TRUE` = browsable by other active students; `FALSE` = only students affiliated with that university may browse.

### `STUDITOPIA.POST_FILE`

- **Purpose**: Attach an existing file to a post as a learning material.
- **Fields**: `POST_ID` (references `POST`), `FILE_ID` (references `FILE`), `CREATED_TIME`; composite primary key `(POST_ID, FILE_ID)`.
- **Relationships**: A post may have many materials; a file may be attached to many posts. File ownership is unchanged.
- **Validation**: Unknown post/file raises `23503`; duplicate attachment raises `23505`; material reads are access-checked through the post's university.

## Derived Read Models (function contracts, not tables)

### Forum summary

Returned by `GET_MAJOR` and `GET_COURSE`, matching the existing `GET_AREA`/`GET_SUBJECT` shape: `ID`, `NAME`, `NUM_TAG`, `NUM_POST`, `ICON`, `DESCRIPTION`, ordered by name and id.

### Forum path

Returned by `GET_FORUM_PATH`: university/faculty/major/area/subject/course id and name fields for the ancestor chain of a tag. Missing levels are `NULL`. The owning university id is resolved even when the tag itself is a deeper level.

### Default forum context

Returned by `GET_DEFAULT_FORUM`: university/faculty/major id and name fields plus `CONTEXT_SOURCE`, which is `AFFILIATION` when no override exists and `SELECTION` when `FORUM_CONTEXT` is used.

### Forum post

Returned by `GET_FORUM_POSTS`: the existing 13 `GET_POST_BY_ID` columns plus `MATERIAL_COUNT`, ordered by relevance to the forum level (newest first for browsing), paginated by zero-based offset and limit.

### Search result

Returned by `SEARCH_POSTS`: `ID`, `TITLE`, `CONTENT_SNIPPET`, `ACCOUNT_ID`, `DISPLAYNAME`, `CREATED_TIME`, `TRUE_RESPONSE`, `HOT`, `TAGS`, `MATERIAL_COUNT`, `RELEVANCE`, ordered by `RELEVANCE DESC`, `HOT DESC`, `CREATED_TIME DESC`, `ID DESC`.

## Validation and Error Rules

| Condition | SQLSTATE |
| --------- | -------- |
| Invalid, inactive, or mismatched session | `45005` |
| Blank/invalid keyword, category, offset, or limit | `22023` |
| Unknown tag, university, post, or file reference | `23503` |
| Duplicate context/access/material link | `23505` |
| Requested university is restricted for the caller | `46010` |
| Write guard finds a tag from another university | `46011` |

## State and Lifecycle Notes

- Default context is derived from affiliation until a student explicitly selects an own university; the override persists until changed.
- Forum access is public by default; inserting `IS_PUBLIC = FALSE` restricts a university without changing hierarchy or post data.
- A material exists only while its `POST_FILE` row exists; deleting the link does not delete the account-owned file.
- No new state is added to posts, comments, sessions, or accounts.
