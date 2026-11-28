# UC-23 — Receive Resource Recommendations

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-23 |
| Name | Receive Resource Recommendations |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Learning Resource Library |
| Priority | Not explicitly stated |
| Related User Stories | US-26 |
| Related Requirements | FR-26.1 to FR-26.4; AC-26.1 to AC-26.3; FR-09.4; FR-09.5; FR-25.5; FR-27.4; NFR-PERF-1; NFR-SCAL-4; NFR-SEC-1; NFR-SEC-6; NFR-PRIV-5; NFR-PRIV-7; NFR-USE-4 |
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
        UC23(["UC-23<br/>Receive Resource Recommendations"])
    end

    Student --- UC23

    class Student actor
    class UC23 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | Authenticated student who receives resource suggestions based on subjects, courses, interests, and academic context. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-23 Receive Resource Recommendations | Primary | Views and saves recommended books and learning resources. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | No generalization or specialization | The proposals describe new users as a recommendation condition, not as a distinct actor for US-26. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No include relationship | The proposals do not name an included use case for US-26. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | No extend relationship | The proposals do not name an extending use case for US-26. |

### A4. Model Notes

1. The scope is personalized and cold-start resource suggestions, their display, and saving recommended resources to a personal list.
2. Searching by query, publishing resources, and deleting published resources are outside this use case.
3. Dismissal and refresh controls are library.md UI recommendations; they are not modeled as new extending use cases.
4. No distinct included, extending, or specialized use case is named for US-26, so no I-xx, E-xx, or G-xx relationship ID is introduced.
5. The exact API endpoint, route, recommendation count, and priority are not specified in proposals.

## Part B — Use Case Specification

### B1. Brief Description

A university student receives recommendations for books and learning resources so that the student can discover useful materials related to subjects. The system recommends resources related to the student's subjects, courses, and interests, displays them on the home or library page, and allows the student to save recommended resources to a personal list.

For new users without historical activity, the system provides curated foundational resources. The library project frames discovery around **For you**, **Top reading**, **Course progress**, and **Starter set**, with user-relevance and course-progress recommendations drawn from the feature flows.

### B2. Preconditions

1. The student is authenticated before accessing protected user resources (`NFR-SEC-1`).
2. The Learning Resource Library is reachable through `Home -> Library Group` in `screen_flow.md`.
3. The student's preferences, courses, subjects, and interests are available where the student has provided them (`FR-09.1`, `FR-09.2`, `FR-09.5`; `AC-09.1`, `AC-09.2`, `AC-09.5`).
4. Published resources are available for recommendation after publication (`FR-27.4`, `AC-27.1`).
5. For a new user, limited historical activity is treated as the cold-start condition (`FR-26.4`, `AC-26.3`).

### B3. Postconditions

1. **Success:** Recommended resources are displayed on the home or library page.
2. **Success:** Suggestions reflect the student's preferences and courses, or curated foundational resources for a new user.
3. **Success:** A recommended resource selected for saving is added to the student's personal list.
4. **Failure:** No recommendation is presented as personalized when the system has no basis, and the specified cold-start or load-error feedback is shown.

### B4. Main Success Scenario (Basic Flow)

1. The student opens the library recommendation area or the home-page recommendation area.
2. The system displays `RecommendationPanel` with heading **Recommended for your studies**.
3. The student selects a recommendation segment such as **For you**, **Top reading**, **Course progress**, or **Starter set**.
4. The system recommends books and learning resources related to the student's subjects, courses, and interests (`FR-26.1`, `AC-26.1`).
5. The system displays each recommendation with `RecommendationReasonText`, for example “Recommended because you are enrolled in CS101.”
6. The student reviews the recommendation card with title, type, tags, rating, and access information.
7. The student selects **Save** through `SaveRecommendationButton`.
8. The system saves the recommended resource to the student's personal list (`FR-26.3`, `AC-26.2`).
9. The saved item becomes available through `SavedResourceList`.

### B5. Alternative Flows

#### A1. Home-page display

The recommendation set is shown on the student's home page instead of the library page (`FR-26.2`). The same save action adds the resource to the personal list.

#### A2. Top reading or course progress

The student selects **Top reading** or **Course progress**. The system displays popular or course-connected resources with rating and access information; these are library.md recommendation segments derived from `feature_flow.md` and the course-progress flow.

#### A3. Cold-start starter resources

The student is new or has little historical activity. The system displays `CuratedStarterResourceList` with foundational resources based on selected subjects (`FR-26.4`, `AC-26.3`).

#### A4. Dismiss or refresh suggestions

The student selects **Not relevant** to hide an item or **Refresh suggestions** to request a new set. These controls are explicit library.md recommendations and are not confirmed FRs for US-26.

### B6. Exception Flows

#### E1. Recommendation load failure

The recommendation set cannot be loaded. The system shows “Unable to load resources.” with **Retry** through `LibraryErrorBanner`.

#### E2. Recommendation reason unavailable

No explanation basis is available for a suggested resource. The system omits `RecommendationReasonText` rather than displaying an invented reason.

#### E3. Save failure

The save action does not complete. The system keeps the recommendation available for another attempt; the exact save-failure message is Not specified in proposals.

### B7. Business Rules

1. The system recommends books or learning resources related to the user's subjects, courses, and interests (`FR-26.1`, `AC-26.1`).
2. The system displays recommended resources on the user's home or library page (`FR-26.2`).
3. Users can save recommended resources to a personal list (`FR-26.3`, `AC-26.2`).
4. New users without historical activity receive curated foundational resources (`FR-26.4`, `AC-26.3`).
5. Learning preferences are used to recommend materials (`FR-09.4`), and preferences can be updated at any time (`FR-09.5`, `AC-09.5`).
6. The library displays resources related to the user's university, major, and courses (`FR-25.5`, `AC-25.4`).
7. Access to recommended resources follows owner privacy settings (`FR-27.5`, `NFR-PRIV-5`, `NFR-PRIV-7`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-1 | The system shall provide responsive user interactions with a response time of ≤ 2 seconds for standard user actions. |
| NFR-SCAL-4 | The system architecture shall support at least 100,000 uploaded documents and learning resources. |
| NFR-SEC-1 | The system shall require authentication before accessing protected user resources. |
| NFR-SEC-6 | The system shall prevent unauthorized access through server-side authorization checks. |
| NFR-PRIV-5 | Users shall be able to control access to documents and learning resources they share. |
| NFR-PRIV-7 | Privacy settings shall apply consistently to forum posts, comments, member lists, and search results. |
| NFR-USE-4 | Primary interface actions shall use clear labels and recognizable controls. |
| Design constraint | Recommendation segments, reason text, and dismissal/refresh controls follow `library.md` as UI recommendations; FR/AC/NFR entries are confirmed requirements. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Home or library placement | Basic flow step 1; alternative A1 |
| Segment selection | Basic flow step 3; alternative A2 |
| Cold-start handling | Before basic flow step 4; alternative A3 |
| Dismiss or refresh | After basic flow step 5; alternative A4 |
| Recommendation load failure | Basic flow steps 2-4; exception E1 |
| Save failure | Basic flow steps 7-8; exception E3 |

### B10. Interface and Data Notes

- **Screen and flow path (confirmed):** `screen_flow.md` defines `Home -> Library Group`. `feature_flow.md` defines `Library -> Recommend -> Top reading / User relevance`; `userstory.md` section 8 also shows `Recommend` with Top reading and User relevance, and `library.md` includes course progress.
- **Route (not specified):** Route is Not specified in proposals; `library.md` presents `/library/recommended` and `/library/saved` as suggested states only.
- **Recommended UI:** `RecommendationPanel` heading **Recommended for your studies**, `RecommendationSegmentControl` options **For you**, **Top reading**, **Course progress**, **Starter set**, `UserRelevanceResourceList`, `TopReadingResourceList`, `CourseProgressResourceList`, `CuratedStarterResourceList`, and `SavedResourceList`.
- **Confirmed actions and data:** Display recommendations (`FR-26.2`, `AC-26.1`) and save them to a personal list (`FR-26.3`, `AC-26.2`). Recommended fields include `recommendationReason`, `title`, `resourceType`, `subjectTags`, `courseTags`, `rating`, `reviewCount`, `accesses`, `status`, and `publishedAt`.
- **Exact messages and labels:** **Recommended for your studies**; **For you**; **Top reading**; **Course progress**; **Starter set**; “Recommended because you are enrolled in CS101.”; **Save**; **Not relevant**; **Refresh suggestions**; “Unable to load resources.” with **Retry**.
- **API and codes:** Library recommendation endpoint, statuses, and error codes are Not specified in proposals. `API.md` has no standalone library recommendation endpoint, and `response_code.md` defines no library-specific error code.
- **Recommendation count and limits:** The number of recommendations, refresh interval, and numeric cold-start threshold are Not specified in proposals.
- **Notification and privacy rules:** No story-specific notification is stated. Recommendations must respect resource privacy settings (`FR-27.5`, `NFR-PRIV-5`, `NFR-PRIV-7`).

### B11. Source Alignment Notes

- This use case is derived from US-26 in `userstory.md` section 8.2 and from `FR-26.1` to `FR-26.4` and `AC-26.1` to `AC-26.3` in the proposals.
- Preference and relevance dependencies come from `FR-09.4`, `FR-09.5`, and `FR-25.5`; publication dependency comes from `FR-27.4`.
- Recommendation segments, reason text, dismissal, refresh, and exact UI labels come from `library.md` as UI/UX recommendations; dismissal is analogous to `FR-24.4` but is not a confirmed US-26 FR.
- `API.md` has no standalone library recommendation endpoint, so no library recommendation route, status code, or error code is invented.
- Overlap with existing `UC-06-share-learning-resource.md`: UC-06 publishes resources into the library; UC-23 surfaces published resources as recommendations and saves them to a personal list.
- No I-xx, E-xx, or G-xx model relationship ID is introduced; flow headings such as A3 and E1 are specification flow labels only.
