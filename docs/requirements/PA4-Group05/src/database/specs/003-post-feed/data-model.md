# Data Model: Post Feed

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

## Entity Overview

| Entity | Source in `src/` | Role in this feature |
| ------ | ---------------- | -------------------- |
| Forum Tag | `TAG`, `CATEGORY`, `TAG_CONTAIN` | Defines the selected university/major/course scope and its descendants. |
| Post | `POST`, `COMMENT` (root), `INCLUDE_POST_TAG` | Source of title, body, author, creation time, accepted response, and engagement. |
| Author | `ACCOUNT` | Supplies display name and avatar id for feed rows and detail. |
| Post Summary | Derived by `GET_POST_FEED` | Flat read model returned for each feed row. |
| Post Detail | Derived by `GET_POST_DETAILS` | Flat read model with full body and raw engagement values. |
| Comment Thread | `COMMENT`, `GET_COMMENT` | Discussion returned by `GET_POST_THREAD` with an accepted-response flag. |
| Sort Option | Input parameter to `GET_POST_FEED` | Chooses ordering and tie-breaking for a feed page. |

## Fields

### Forum Tag

| Field | Type | Source / Rule |
| ----- | ---- | ------------- |
| `ID` | `INT` | `TAG.ID`; the selected forum tag passed as `P_TAG_ID`. |
| `NAME` | `TEXT` | `TAG.NAME`. |
| `CATEGORY` | `TEXT` | `CATEGORY.NAME`; university, faculty, major, area, subject, or course. |
| `DESCENDANT_IDS` | `INT[]` | Provided by feature 002's `FORUM_DESCENDANT_TAGS(P_TAG_ID)`; includes the selected tag itself. |

### Post Summary (feed row)

| Field | Type | Source / Rule |
| ----- | ---- | ------------- |
| `ID` | `INT` | `POST.ID`; stable tie-break key. |
| `TITLE` | `TEXT` | `POST.TITLE` (non-null). |
| `ACCOUNT_ID` | `INT` | `POST.ACCOUNT_ID`; author reference. |
| `DISPLAYNAME` | `VARCHAR(32)` | `ACCOUNT.DISPLAYNAME`; readable fallback required when absent. |
| `AVATAR_ID` | `INT` | `ACCOUNT.AVATAR`; `NULL` when no avatar. |
| `POST_TYPE` | `TEXT` | Category of the lowest-id type tag in `TAGS`, or `DISCUSSION` when none. |
| `CREATED_TIME` | `TIMESTAMPTZ` | `POST.CREATED_TIME`; default sort key and tie-break key. |
| `VOTE_SCORE` | `INT` | Root `COMMENT.UPVOTE - COMMENT.DOWNVOTE`. |
| `NUM_COMMENT` | `INT` | Root `COMMENT.COMMENT` (trigger-maintained reply subtree count). |
| `SOLVED` | `BOOLEAN` | `POST.TRUE_RESPONSE IS NOT NULL`. |
| `HOT` | `FLOAT` | `POST.HOT`, trigger-maintained cumulative engagement score. |

### Post Detail

| Field | Type | Source / Rule |
| ----- | ---- | ------------- |
| Summary fields | as above | Same values as the feed row for the same post. |
| `CONTENT` | `TEXT` | Root comment body (`COMMENT.CONTENT`). |
| `UPVOTE` | `INT` | Raw root upvote count. |
| `DOWNVOTE` | `INT` | Raw root downvote count. |
| `TRUE_RESPONSE` | `INT` | Accepted comment id; `NULL` when unsolved. |
| `TAGS` | `INT[]` | Distinct `INCLUDE_POST_TAG.TAG_ID` values, ordered ascending. |

### Comment Thread Row

| Field | Type | Source / Rule |
| ----- | ---- | ------------- |
| `ID` | `INT` | `COMMENT.ID`. |
| `CONTENT` | `TEXT` | `COMMENT.CONTENT`. |
| `ACCOUNT_ID` | `INT` | Comment author. |
| `UPVOTE` | `INT` | Comment upvotes. |
| `DOWNVOTE` | `INT` | Comment downvotes. |
| `NUM_COMMENT` | `INT` | Reply subtree count for that comment. |
| `CREATED_TIME` | `TIMESTAMPTZ` | Comment creation time. |
| `IS_ACCEPTED` | `BOOLEAN` | `ID = POST.TRUE_RESPONSE`; exactly one row is accepted for a solved post. |

### Sort Option

| Value | Primary order | Secondary order |
| ----- | ------------- | --------------- |
| `NEWEST` (default) | `CREATED_TIME DESC` | `CREATED_TIME DESC, ID DESC` |
| `TOP_TRENDING` | `HOT DESC` | `CREATED_TIME DESC, ID DESC` |
| `MOST_VOTED` | `VOTE_SCORE DESC` | `CREATED_TIME DESC, ID DESC` |
| `MOST_DISCUSSED` | `NUM_COMMENT DESC` | `CREATED_TIME DESC, ID DESC` |

Sort values are case-insensitive; blank or `NULL` selects `NEWEST`. Any other value raises `22023`. The caller passes the selected value on every request, so no persisted preference entity is needed.

## Relationships

- A `Forum Tag` has many descendant tags through `TAG_CONTAIN` and many posts through `INCLUDE_POST_TAG`.
- A `Post` has one author (`ACCOUNT`), one root `COMMENT`, many tags (`INCLUDE_POST_TAG`), and many thread comments (`COMMENT.COMMENT_ID` ancestry).
- A type tag is an `INCLUDE_POST_TAG` row whose tag category is `DISCUSSION`, `QUESTION`, or `MATERIAL`; at most one is used for `POST_TYPE`, chosen deterministically.
- A solved `Post` references one accepted `COMMENT` through `TRUE_RESPONSE`; the matching thread row is flagged as accepted.
- `GET_POST_FEED` returns zero or one row per post; a post linked to several included forum tags is deduplicated.

## Validation Rules

| Rule | Applies to | Behavior |
| ---- | ---------- | -------- |
| Valid active session | All three read functions | `SESSION_CHECK` raises `45005`. |
| Permitted forum | Selected forum tag and every post's forum tags | `CHECK_FORUM_ACCESS` raises `46010` for restricted universities. |
| Known forum tag | `P_TAG_ID` | Unknown tag raises `23503` through the 002 helper contract. |
| Known post | `P_POST_ID` | Unknown post returns zero rows; backend renders not-found. |
| Supported sort | `P_SORT` | Invalid value raises `22023`. |
| Pagination bounds | `P_OFFSET`, `P_LIMIT` | Negative offset, limit below 1, or limit above 100 raise `22023`. |
| Post type presence | Every feed/detail row | Missing type tag falls back to `DISCUSSION`; multiple type tags use the lowest type-tag id. |
| Empty scope | Feed result | Zero rows; backend renders the empty state. |

## State Transitions

| Change | Effect on feed data |
| ------ | ------------------- |
| Vote inserted, changed, or removed | Vote triggers adjust root `UPVOTE`/`DOWNVOTE`; `VOTE_SCORE` and `HOT` change; `MOST_VOTED` and `TOP_TRENDING` order may change. |
| Reply inserted, moved, or deleted | Comment-count triggers adjust root `COMMENT`; `NUM_COMMENT` and `HOT` change; `MOST_DISCUSSED` and `TOP_TRENDING` order may change. |
| Accepted response set or cleared | `TRUE_RESPONSE` changes; `SOLVED` and `IS_ACCEPTED` change. |
| Forum tag link inserted or removed | Post enters or leaves the scope of that forum; `POST_TYPE` may change when a type tag is added or removed. |
| Forum context switched | Caller supplies a different `P_TAG_ID`; feed rows and applied sort are recomputed for the new scope. |

This feature adds no new write path; all transitions come from existing post, vote, comment, and tag behavior.
