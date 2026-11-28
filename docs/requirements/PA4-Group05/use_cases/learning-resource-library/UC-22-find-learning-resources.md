# UC-22 — Find Learning Resources

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-22 |
| Name | Find Learning Resources |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Learning Resource Library |
| Priority | Not explicitly stated |
| Related User Stories | US-25 |
| Related Requirements | FR-25.1 to FR-25.5; AC-25.1 to AC-25.4; NFR-PERF-1; NFR-SCAL-4; NFR-SEC-1; NFR-SEC-6; NFR-PRIV-5; NFR-PRIV-7; NFR-USE-2; NFR-USE-4 |
| Source Documents | `docs/requirements/proposals/userstory.md`; `docs/requirements/proposals/functional_requirement.md`; `docs/requirements/proposals/library.md`; `docs/requirements/proposals/create_post.md`; `docs/requirements/proposals/API.md`; `docs/requirements/proposals/response_code.md`; `docs/requirements/proposals/non_functional_requirement.md`; `docs/requirements/proposals/feature_flow.md`; `docs/requirements/proposals/screen_flow.md` |

## Part A — Use Case Model

### A1. Focused Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000
    classDef specialized fill:#ffe6cc,stroke:#b36b00,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC22(["UC-22<br/>Find Learning Resources"])
    end

    Student --- UC22

    class Student actor
    class UC22 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | Authenticated student who searches books and learning resources related to the student's courses. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-22 Find Learning Resources | Primary | Searches, filters, and reviews learning resources in the library. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | No generalization or specialization | The proposals name only the University Student actor for US-25. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No include relationship | The proposals do not name an included use case for US-25. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | No extend relationship | The proposals do not name an extending use case for US-25. |

### A4. Model Notes

1. The scope is keyword search, field-specific search, filtering, sorting, ratings display, and academic relevance in the Learning Resource Library.
2. Publishing, deleting, and managing storage are outside this use case; they are separate learning-resource stories.
3. No distinct included, extending, or specialized use case is named for US-25, so no I-xx, E-xx, or G-xx relationship ID is introduced.
4. The focused model shows only the primary human actor because the proposals do not name a supporting system actor for this story.
5. The exact API endpoint, route, result limit, and priority are not specified in proposals.

## Part B — Use Case Specification

### B1. Brief Description

A university student searches for books and learning resources so that the student can find materials related to courses. The search covers title, author, subject tags, and description, with filtering by format and subject field; results may also show aggregate ratings and review counts when available.

The library reinforces the forum by preserving and reusing academic material. Material posts created in the forum may also appear in the library when applicable (`FR-15.6`), and the library displays resources related to the user's university, major, and courses (`AC-25.4`, `FR-25.5`).

### B2. Preconditions

1. The student is authenticated before accessing protected user resources (`NFR-SEC-1`).
2. The Learning Resource Library is reachable in the main flow as `Home -> Library Group`, with `Library Group -> Exam` and `Library Group -> Book` from `screen_flow.md`.
3. Published resources are available for search after publication (`FR-27.4`, `AC-27.1`).
4. University, major, course, subject tags, and privacy data are available for relevance and access decisions (`FR-25.5`, `NFR-PRIV-7`).

### B3. Postconditions

1. **Success:** Matching resources are displayed with the requested search terms, filters, and sort order.
2. **Success:** The result list shows ratings and review counts when available and shows resources related to the student's university, major, and courses.
3. **Success:** The student can open a result for detail or save it for later where the library UI supports that action.
4. **Failure:** No misleading result is shown, and the student receives the specified empty-state or load-error feedback.

### B4. Main Success Scenario (Basic Flow)

1. The student opens the library from Home, and the system displays the Learning Resource Library page.
2. The student selects the search area represented by `ResourceSearchPanel` with heading **Find a resource**.
3. The student enters keywords through `ResourceKeywordSearchInput`, whose exact placeholder is “Search title, author, tag, or description.”
4. The student selects **Search** to submit the keyword query.
5. The system searches by title, author, subject tags, and description (`AC-25.1`, `FR-25.2`).
6. The student selects filters for format and subject field (`AC-25.2`, `FR-25.3`).
7. The student selects a sort option from **Relevance**, **Top rated**, **Most accessed**, and **Newest**.
8. The system displays matching `ResourceCard` items in `ResourceResultGrid` with a `ResultCountText`.
9. The system displays aggregate ratings and review counts when available (`AC-25.3`, `FR-25.4`).
10. The system displays resources related to the student's university, major, and courses (`AC-25.4`, `FR-25.5`).
11. The student selects **View details** to inspect a resource, or uses **Save** where the library UI supports saving.

### B5. Alternative Flows

#### A1. Advanced field-specific search

The student opens **Advanced filters** and narrows results with **Title**, **Author**, subject-tag chips such as `Calculus`, `Database`, and `Physics`, or **Description contains**. The system applies these as field-specific refinements of the keyword query (`FR-25.2`).

#### A2. Course and academic-scope filtering

The student selects course tags such as `CS101` and `MATH202`, or a University, Major, Course scope through `ResourceAcademicScopeFilter`. The system limits results to the selected academic context (`FR-25.5`, `AC-25.4`).

#### A3. Ratings unavailable

If a resource has no rating data, the system omits `ResourceRatingDisplay` or shows “Not yet rated.” instead of inventing a rating (`FR-25.4`, `library.md` business rules).

#### A4. Clear filters

The student removes individual chips from `ActiveFilterChipList` or selects **Clear all filters**. The system resets the search and filters and recalculates `ResultCountText`.

### B6. Exception Flows

#### E1. No results

No resource matches the criteria. The system displays the exact empty-state message “No resources found” and offers actions to broaden filters or share a resource.

#### E2. Resource load failure

The library cannot load results. The system shows “Unable to load resources.” with **Retry** through `LibraryErrorBanner`.

#### E3. Privacy-blocked access

The student attempts to access a resource whose privacy setting does not permit access. The system explains the restriction with “You do not have permission to access this resource.” and does not expose the file.

### B7. Business Rules

1. Keywords search title, author, subject tags, and description (`AC-25.1`, `FR-25.2`).
2. Results can be filtered by format and subject field (`AC-25.2`, `FR-25.3`).
3. Search results display aggregate ratings and review counts when available (`AC-25.3`, `FR-25.4`).
4. The library displays resources related to the user's university, major, and courses (`AC-25.4`, `FR-25.5`).
5. Published resources become searchable in the library after publication (`FR-27.4`, `AC-27.1`).
6. Access and search visibility must follow owner privacy settings (`FR-27.5`, `NFR-PRIV-5`, `NFR-PRIV-7`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-1 | The system shall provide responsive user interactions with a response time of ≤ 2 seconds for standard user actions. |
| NFR-SCAL-4 | The system architecture shall support at least 100,000 uploaded documents and learning resources. |
| NFR-SEC-1 | The system shall require authentication before accessing protected user resources. |
| NFR-SEC-6 | The system shall prevent unauthorized access through server-side authorization checks. |
| NFR-PRIV-5 | Users shall be able to control access to documents and learning resources they share. |
| NFR-PRIV-7 | Privacy settings shall apply consistently to forum posts, comments, member lists, and search results. |
| NFR-USE-2 | The user interface shall support responsive layouts for screen widths from 320 px to 1920 px. |
| NFR-USE-4 | Primary interface actions shall use clear labels and recognizable controls. |
| Design constraint | Search field names, filters, sort options, component names, and displayed messages follow `library.md` as UI recommendations; AC/FR/NFR entries are confirmed requirements. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Field-specific search | Basic flow step 5; alternative A1 |
| Course and academic-scope refinement | Basic flow steps 6-8; alternative A2 |
| Rating display decision | Basic flow step 9; alternative A3 |
| Filter reset | Basic flow step 6; alternative A4 |
| Empty or failed result load | Basic flow step 8; exceptions E1-E2 |
| Privacy-blocked access | Basic flow step 11; exception E3 |

### B10. Interface and Data Notes

- **Screen and flow path (confirmed):** `screen_flow.md` defines `Home -> Library Group`, `Library Group -> Exam`, and `Library Group -> Book`. `feature_flow.md` defines `Library -> Search -> Tag / Title`; `userstory.md` section 8 defines `Library -> Search` with Tag and Title.
- **Route (not specified):** Route is Not specified in proposals; `library.md` labels `/library` as a recommended route only.
- **Recommended UI:** `LibraryPage` / `LearningResourceLibraryPage`, `LibraryTabBar` with **All**, **Books**, **Exams**, **Recommended**, **Saved**, **My Storage**, `ResourceSearchPanel`, `ResourceKeywordSearchInput`, **Search**, **Advanced filters**, `ActiveFilterChipList`, **Clear all filters**, and `ResourceResultGrid`.
- **Confirmed search fields:** Title, author, subject tags, and description (`AC-25.1`, `FR-25.2`). Recommended field labels include **Title**, **Author**, and **Description contains**, with subject-tag chips such as `Calculus`, `Database`, and `Physics`.
- **Confirmed filters and recommended sort:** Filter by format and subject field (`AC-25.2`, `FR-25.3`). Recommended format values include PDF, slides, notes, past exam, document, and video; recommended `ResourceSortSelect` options are **Relevance**, **Top rated**, **Most accessed**, and **Newest**.
- **Exact messages:** “Search title, author, tag, or description.”; “No resources found”; “24 resources found.” as the example `ResultCountText`; “4.6 (28 reviews)” as the example `ResourceRatingDisplay`; “Not yet rated.”; “Unable to load resources.” with **Retry**; “You do not have permission to access this resource.”
- **Data fields (confirmed basis plus recommended names):** `resourceId`, `title`, `description`, `resourceType`, `author`, `uploader`, `subjectTags`, `courseTags`, `academicContext`, `format`, `privacy`, `rating`, `reviewCount`, `views`, `accesses`, `status`, `publishedAt`, and `sourceForumPostId` are named in `library.md`; ratings and review counts display only when available.
- **API and codes:** Library search endpoint, statuses, and error codes are Not specified in proposals. `API.md` has no standalone library search endpoint; `GET /forum/posts` is a forum-post endpoint, not a library search endpoint, and `response_code.md` defines no library-specific error code.
- **Notification and privacy rules:** No story-specific notification is stated. Privacy settings apply consistently to search results (`NFR-PRIV-7`), and resource access follows the owner's privacy setting (`FR-27.5`, `NFR-PRIV-5`).

### B11. Source Alignment Notes

- This use case is derived from US-25 in `userstory.md` section 8.1 and from `FR-25.1` to `FR-25.5` and `AC-25.1` to `AC-25.4` in the proposals.
- Component names, routes, sort options, example counts, and exact empty/error messages come from `library.md` as UI/UX recommendations, not as new functional requirements.
- `API.md` has no standalone library search endpoint, so no library search route, status code, or error code is invented.
- Overlap with existing `UC-06-share-learning-resource.md`: UC-06 makes a published resource searchable and links to the library, while UC-22 covers finding and reviewing those resources; publication details remain in UC-06.
- No I-xx, E-xx, or G-xx model relationship ID is introduced; A5/A4-style flow labels in this document are specification flow headings, not model IDs.
