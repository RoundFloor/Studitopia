# Contract: Forum Routes

**Feature**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

The central route table in `src/app/providers/router/router-provider.tsx` is the
only place forum URLs are defined. All forum routes sit under `AuthGuard` and
`ForumLayout` and inherit the shared `errorElement`. Pages are registered with
the existing React Router `lazy` convention.

## Route matrix

| Path | Page | Context level | Notes |
| --- | --- | --- | --- |
| `/forum` | `UniversityPage` | `university` | Primary destination after login; uses persisted own university |
| `/forum/universities/:universityId` | `UniversityPage` | `university` | Explicit university selection or switch |
| `/forum/universities/:universityId/majors/:majorId` | `MajorPage` | `major` | Lists courses and major-level content |
| `/forum/universities/:universityId/majors/:majorId/courses/:courseId` | `CoursePage` | `course` | Lists course-level posts and materials |
| `/forum/search` | `SearchPage` | active context | `q` and filter params are shareable; results remain context-scoped by default |
| `/forum/access-denied` | `AccessDeniedPage` | none | Clear access notice, no forum content |
| `/forum/post/:postId` | `ViewPostPage` | inherited | Post view preserves hierarchy context through breadcrumbs/back links |

`ForumAccessGuard` wraps routes with an encrypted chain. It does not grant
access; it reads the server-backed access state and redirects to
`/forum/access-denied` when the chain is denied or invalid.

## Breadcrumbs

| Route | Breadcrumb trail |
| --- | --- |
| `/forum` | University |
| `/forum/universities/:universityId` | University |
| `/forum/universities/:universityId/majors/:majorId` | University → Major |
| `/forum/universities/:universityId/majors/:majorId/courses/:courseId` | University → Major → Course |
| `/forum/search` | University → Major → Course (when set) → Search |
| `/forum/post/:postId` | University → Major → Course → Post |

Each segment is a real link to its canonical route. Trails are rendered by the
shared `Breadcrumbs` component using a semantic `<nav aria-label="Forum breadcrumb">`
and an ordered list. A missing ancestor prevents rendering of deeper segments.

## Legacy compatibility redirects

Existing code produces URLs such as `?page=browse&page=area&area=...&id=...`
(`src/pages/forums/browse/university/UniversityPage.tsx:107`,
`src/pages/forums/browse/area/AreaPage.tsx:242`). Until those links are updated:

| Legacy query | Redirect target |
| --- | --- |
| `/forum?page=browse&id=<u>` | `/forum/universities/<u>` |
| `/forum?page=browse&id=<u>&area=<a>` | `/forum/universities/<u>/majors/<a>` |
| `/forum?page=browse&id=<u>&area=<a>&subject=<s>` | `/forum/universities/<u>/majors/<a>/courses/<s>` |
| `/forum?page=search&q=<term>` | `/forum/search?q=<term>` |
| Missing or unusable ids | `/forum` |

Duplicate `page` keys are tolerated during redirect only; canonical routes MUST
NOT use a `page` query key.

## Outlet context

`ForumLayout` provides `{ visibleTopBar: (visible: boolean) => void }`. The type
lives in `src/entities/forum/type.ts`; pages MUST NOT import it from `app`.
Additional forum context values are read from `entities/forum`, not passed as
ad-hoc props.

## Layout wiring

- The university/major/course names from the active context are displayed in the
  forum header.
- The university switcher lists only directories returned by `listUniversities`.
- The top-bar search input submits to `/forum/search?q=...`.
- Navigation links MUST NOT target unrouted paths such as `/create_post`,
  `/notification`, `/profile`, or `/community`; they are either wired to a real
  route or honestly disabled in this feature.

## Route tests

Tests use `createMemoryRouter(routes, { initialEntries: [...] })` and assert:
canonical rendering for each level, parent breadcrumb navigation, redirects for
each legacy pattern, access-denied redirect on denied chains, and preservation of
context when opening and leaving a post.
