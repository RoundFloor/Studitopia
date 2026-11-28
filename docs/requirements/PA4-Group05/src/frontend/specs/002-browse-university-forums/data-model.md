# Data Model: Browse University Forums

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Date**: 2026-11-28

This model describes the data the frontend consumes and owns. It is derived from
`docs/architecture/api-catalog.md` only. Server-owned data remains authoritative;
the only client-persisted domain state is the selected forum context described in
[contracts/forum-context-storage.md](./contracts/forum-context-storage.md).

## Entities

### ForumLevel

A discriminant for the active hierarchy level.

| Value | Meaning |
| --- | --- |
| `university` | University forum only; no major or course selected |
| `major` | A major within the selected university |
| `course` | A course within the selected major |

### University

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Encrypted id fragment returned by `GET /forum`; passed through unchanged |
| `name` | `string` | Display name |
| `numTag` | `number` | Child category count from `num_tag` |
| `numPost` | `number` | Post count from `num_post` |
| `icon` | `number \| null` | Icon reference from the API catalog |
| `description` | `string` | Short description from the API catalog |

### Major

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Encrypted id fragment for the major/area |
| `name` | `string` | Display name |
| `numTag`, `numPost`, `icon`, `description` | same as University | Catalog node fields |
| `universityId` | `string` | Parent university id; part of the chain |

### Course

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Encrypted id fragment for the course/subject |
| `name` | `string` | Display name |
| `numTag`, `numPost`, `icon`, `description` | same as University | Catalog node fields |
| `universityId`, `majorId` | `string` | Parent ids; part of the chain |

**Relationship**: one University has many Majors; one Major has many Courses.
A ForumContext may point to a University, a University + Major, or a University
+ Major + Course. Encrypted chains are always assembled in that order.

### ForumContext

| Field | Type | Notes |
| --- | --- | --- |
| `level` | `ForumLevel` | Currently active level |
| `universityId` | `string` | Required; the default context for the student |
| `universityName` | `string` | Display label |
| `majorId` | `string \| null` | Present for `major` and `course` levels |
| `majorName` | `string \| null` | Display label |
| `courseId` | `string \| null` | Present for `course` level |
| `courseName` | `string \| null` | Display label |
| `searchScope` | `context \| accessible` | `context` by default; `accessible` only when explicitly broadened |

### Post

Fields available from the documented `PostResponse`
(`docs/architecture/api-catalog.md:121-129`):

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Encrypted post id |
| `title` | `string` | Searchable title |
| `accountId` | `string` | Author identity from `account_id`; no display-name endpoint exists |
| `commentId` | `string` | Comment root from `comment_id` |
| `trueResponse` | `boolean` | Solved/true-response flag |
| `createdAt` | `Date` | Creation time from `created_time` |
| `tags` | `string[]` | Encrypted tag ids; resolve names through documented tag endpoints |

Derived or unsupported fields:

| Field | Type | Availability |
| --- | --- | --- |
| `type` | `discussion \| question \| material \| null` | Not provided by the catalog; `null` unless a documented tag category explicitly maps to it |
| `authorName` | `null` | Not provided; no endpoint for arbitrary account display names |
| `content` | `null` | Not provided by `PostResponse`; MUST NOT be claimed as searchable |
| `engagement` | `null` | No per-post engagement count exists; deterministic ordering uses `createdAt` instead |
| `context` | `{ universityId: string; majorId?: string; courseId?: string }` | Derived from the active chain or the chain used to fetch the post |

### SearchQuery

| Field | Type | Notes |
| --- | --- | --- |
| `keyword` | `string` | Trimmed, non-empty, at most 100 characters |
| `fields` | `Array<tags \| title \| content \| author \| university \| major \| course>` | At least one; unsupported values are retained only to disclose the limitation |
| `postType` | `discussion \| question \| material \| all` | Defaults to `all`; unsupported with current catalog data |
| `solved` | `solved \| unsolved \| all` | Defaults to `all`; backed by `true_response` |
| `range` | `24h \| 7d \| 30d \| all` | Defaults to `all`; backed by `created_time` |
| `scope` | `context \| accessible` | Defaults to the active ForumContext scope |
| `chain` | `string[]` | Ancestor ids in University → Major → Course order for `context` scope |

### SearchResult

| Field | Type | Notes |
| --- | --- | --- |
| `post` | `Post` | The matching post |
| `matchedFields` | `SearchQuery["fields"]` | Supported fields that matched; used for emphasis |
| `rank` | `number` | Deterministic frontend order; lower is higher |
| `matchedTagName` | `string \| null` | Resolved tag name when a tag matched |
| `unsupportedFields` | `SearchQuery["fields"]` | Selected fields that cannot be evaluated with catalog data |

### StudentAccessPermission

| Field | Type | Notes |
| --- | --- | --- |
| `universityId` | `string` | University the student may browse |
| `canBrowse` | `boolean` | Server-determined; never inferred from client state |

### ApiError

| Field | Type | Notes |
| --- | --- | --- |
| `statusCode` | `number` | HTTP status from `apiRequest` |
| `errorCode` | `number[]` | Numeric backend codes, including `45006` (`INVALID_ID`) |

## Validation Rules

| Rule | Applies to | Requirement |
| --- | --- | --- |
| Required selected university | ForumContext | `universityId` and `universityName` MUST be present before forum content is rendered |
| Descendant clearing | ForumContext | Changing university clears major/course; changing major clears course |
| Chain order | ForumContext, SearchQuery | ids MUST be assembled University → Major → Course and passed unchanged |
| No orphan levels | ForumContext | `courseId` requires `majorId`; `majorId` requires `universityId` |
| Keyword bounds | SearchQuery | trim whitespace; reject empty and reject more than 100 characters with guidance |
| Field vocabulary | SearchQuery | only the seven documented spec fields; at least one selected |
| Supported-field disclosure | SearchQuery, SearchResult | `content` and `author` MUST be labelled unsupported; `type` filter MUST be labelled unsupported unless a documented category mapping exists |
| Filter vocabulary | SearchQuery | postType, solved, and range MUST use the enumerated values above |
| Scope safety | SearchQuery | `accessible` uses `GET /post/relevant` with no include/exclude, so it can only return posts the backend makes accessible |
| Response shape | Catalog nodes | validate array responses and required fields before rendering |
| Error handling | ApiError | `45006` maps to access/invalid-context state; other errors map to a retryable error state |
| No secrets | ForumContext, SearchQuery | MUST NOT contain access tokens, refresh tokens, or credentials |

## State Transitions

1. **Sign-in → default context**: authenticated student with a known university
   receives that university as the default ForumContext and lands on the
   university forum (FR-001, FR-004). If no selection exists, the university
   directory from `GET /forum` is shown for selection (FR-002).
2. **University → Major → Course**: selecting a child sets the next level and
   appends its id to the chain; clearing an ancestor removes all descendants.
3. **Context switch**: choosing a different university, major, or course replaces
   the affected context fields, updates breadcrumbs, and refetches level content
   via `GET /forum/:chain` (FR-010).
4. **Denied access**: a directory entry or chain that the backend rejects
   transitions to `AccessDenied`; no posts, majors, or courses from the denied
   context are rendered (FR-016).
5. **Empty catalog**: a university with no majors or a major with no courses
   renders an explanatory empty state while keeping the parent breadcrumb usable
   (FR-017).
6. **Search lifecycle**: `idle → invalid` for empty/oversized keywords, otherwise
   `idle → loading → results | empty | error`. Candidate posts come from
   `GET /forum/:chain` for `context` scope or `GET /post/relevant` for
   `accessible` scope; tag names come from documented tag endpoints. Changing
   filters returns to `loading` without clearing the keyword; clearing filters
   returns to the unfiltered candidate set (FR-011, FR-015, FR-019).
7. **Search scope**: `context` keeps candidates within the active chain;
   `accessible` broadens across posts returned by `GET /post/relevant`, which the
   catalog defines as all posts available to the requester (FR-018).
8. **Post navigation**: opening a post carries the ForumContext so breadcrumbs
   and back navigation preserve the selected hierarchy level.

## Documented Deviations

The spec's FR-012, FR-013, and FR-014 cannot be fully satisfied with the
catalog-only API boundary. `content`, author display name, post type, and
per-post engagement are absent from all documented responses. The frontend MUST
disclose these gaps rather than fabricate data; see
[contracts/forum-search-api.md](./contracts/forum-search-api.md) and the
deviation entries in [plan.md](./plan.md#complexity-tracking).
