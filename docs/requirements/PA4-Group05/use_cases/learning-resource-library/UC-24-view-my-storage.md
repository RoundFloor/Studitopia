# UC-24 — View My Storage

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-24 |
| Name | View My Storage |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Learning Resource Library |
| Priority | Not explicitly stated |
| Related User Stories | US-28 |
| Related Requirements | FR-28.1 to FR-28.3; AC-28.1 to AC-28.3; FR-27.1; FR-27.5; NFR-PERF-1; NFR-SCAL-4; NFR-SEC-1; NFR-SEC-6; NFR-PRIV-5; NFR-USE-4 |
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
        UC24(["UC-24<br/>View My Storage"])
    end

    Student --- UC24

    class Student actor
    class UC24 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | Authenticated resource owner who reviews published resources and their view and access counts. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-24 View My Storage | Primary | Opens a personal storage view of published resources. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | No generalization or specialization | The proposals name only the University Student actor for US-28. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No include relationship | The proposals do not name an included use case for US-28. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | No extend relationship | The proposals do not name an extending use case for US-28. |

### A4. Model Notes

1. The scope is the owner's personal storage view, status and publication-date display, and view/access statistics.
2. Publishing resources is outside this use case; deletion is handled in US-29 and existing UC-06 covers the publication flow.
3. The status values shown in the storage table are exactly `Published`, `Restricted`, and `Unavailable`.
4. No distinct included, extending, or specialized use case is named for US-28, so no I-xx, E-xx, or G-xx relationship ID is introduced.
5. The exact API endpoint, route, pagination limit, and priority are not specified in proposals.

## Part B — Use Case Specification

### B1. Brief Description

A university student views personal storage so that the student can track how many views and accesses published resources receive. The system provides a personal storage view for published resources, displays view and access counts for each resource, and displays publication status and date.

`library.md` recommends presenting this as **My Storage**, with summary totals and a table of owned resources. These UI details are recommendations; the confirmed requirements are `AC-28.1` to `AC-28.3` and `FR-28.1` to `FR-28.3`.

### B2. Preconditions

1. The student is authenticated before accessing protected user resources (`NFR-SEC-1`).
2. The Learning Resource Library is reachable through `Home -> Library Group` in `screen_flow.md`.
3. The student has published resources through the library or material-post path (`FR-27.1`, `FR-15.6`, `FR-27.4`).
4. View, access, status, and publication-date data are available for the owned resources (`FR-28.2`, `FR-28.3`).
5. Authorization checks restrict storage data to the resource owner (`NFR-SEC-6`).

### B3. Postconditions

1. **Success:** The student's published resources are listed in a personal storage view.
2. **Success:** Each listed resource shows view count, access count, publication status, and publication date.
3. **Success:** The student can open a resource detail view or proceed to the delete action where available.
4. **Failure:** No other student's storage data is exposed, and the specified empty-state or load-error feedback is shown.

### B4. Main Success Scenario (Basic Flow)

1. The student opens the library tab bar and selects **My Storage** through `MyStorageTab`.
2. The system displays `MyStoragePanel` with heading **My Storage**.
3. The system displays `MyStorageSummaryStrip` with total published resources, total views, and total accesses/downloads.
4. The system displays `MyPublishedResourcesTable` with one row per published resource.
5. Each row shows the resource title and type through `MyResourceTitleCell`.
6. Each row shows a `status` badge with exactly `Published`, `Restricted`, or `Unavailable`.
7. Each row shows the publication date and time through `MyResourcePublishedDateCell` (`FR-28.3`, `AC-28.3`).
8. Each row shows the number of views through `MyResourceViewsCell` and the number of downloads/accesses through `MyResourceAccessesCell` (`FR-28.2`, `AC-28.2`).
9. Each row shows the privacy setting through `MyResourcePrivacyCell`.
10. The student selects **View** through `MyResourceOpenButton` to open the resource detail view, or remains in My Storage.

### B5. Alternative Flows

#### A1. No published resources

The student has no published resources. The system displays the exact empty-state message “You have not published any resources yet.”

#### A2. Restricted or unavailable resource

A listed resource has status `Restricted` or `Unavailable`. The system still shows the owner's status badge and statistics, while resource access follows the owner's privacy setting (`FR-27.5`, `NFR-PRIV-5`).

#### A3. Open resource detail

The student selects **View**. The system opens the resource detail page with full metadata, preview where supported, rating, access information, views, and accesses.

#### A4. Retry after an error

The student selects **Retry** through `StorageRetryButton`. The system reloads the storage data.

### B6. Exception Flows

#### E1. Storage data load failure

The storage view cannot be loaded. The system shows “Unable to load resources.” with **Retry** through `LibraryErrorBanner`.

#### E2. Statistics unavailable

View or access counts are unavailable for a resource. The system does not present an invented number; the exact missing-statistics message is Not specified in proposals.

#### E3. Unauthorized storage access

A user who is not the owner attempts to open another student's storage view. The system denies access through server-side authorization checks (`NFR-SEC-6`); the exact storage-denial message is Not specified in proposals.

### B7. Business Rules

1. The system provides a personal storage view for published resources (`FR-28.1`, `AC-28.1`).
2. The system displays the number of views and accesses for each published resource (`FR-28.2`, `AC-28.2`).
3. The system displays the publication status and date of each resource (`FR-28.3`, `AC-28.3`).
4. Storage status values are exactly `Published`, `Restricted`, and `Unavailable`.
5. Privacy settings control access to documents and learning resources the student shared (`FR-27.5`, `NFR-PRIV-5`).
6. Only the owner may view personal storage data (`NFR-SEC-1`, `NFR-SEC-6`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-1 | The system shall provide responsive user interactions with a response time of ≤ 2 seconds for standard user actions. |
| NFR-SCAL-4 | The system architecture shall support at least 100,000 uploaded documents and learning resources. |
| NFR-SEC-1 | The system shall require authentication before accessing protected user resources. |
| NFR-SEC-6 | The system shall prevent unauthorized access through server-side authorization checks. |
| NFR-PRIV-5 | Users shall be able to control access to documents and learning resources they share. |
| NFR-USE-4 | Primary interface actions shall use clear labels and recognizable controls. |
| Design constraint | Status values, table cells, summary cards, empty state, and labels follow `library.md` as UI recommendations; FR/AC/NFR entries are confirmed requirements. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Empty storage | Before basic flow step 4; alternative A1 |
| Restricted or unavailable status | Basic flow step 6; alternative A2 |
| Resource detail access | Basic flow step 10; alternative A3 |
| Storage retry | After exception E1; alternative A4 |
| Storage load failure | Basic flow steps 2-4; exception E1 |
| Unauthorized access | Before basic flow step 2; exception E3 |

### B10. Interface and Data Notes

- **Screen and flow path (confirmed):** `screen_flow.md` defines `Home -> Library Group`. `feature_flow.md` defines `Library -> Material -> Upload / Download`; `userstory.md` section 8.4 defines the personal storage requirement.
- **Route (not specified):** Route is Not specified in proposals; `library.md` presents `/library/my-storage` as a suggested state only.
- **Recommended UI:** `MyStorageTab` label **My Storage**, `MyStoragePanel` heading **My Storage**, `MyStorageSummaryStrip`, `MyPublishedResourcesTable`, `MyResourceStatusCell`, `MyResourcePublishedDateCell`, `MyResourceViewsCell`, `MyResourceAccessesCell`, `MyResourcePrivacyCell`, `MyResourceOpenButton`, `DeleteMyResourceButton`, and `StorageRetryButton`.
- **Confirmed statistics and status:** `FR-28.2` / `AC-28.2` require views and accesses; `FR-28.3` / `AC-28.3` require publication status and date. The exact status values are `Published`, `Restricted`, and `Unavailable`.
- **Exact messages and labels:** **My Storage**; **View**; **Delete**; **Retry**; “You have not published any resources yet.”; “Unable to load resources.” with **Retry**. No exact success message is specified for opening storage.
- **Data fields (confirmed basis plus recommended names):** `resourceId`, `title`, `resourceType`, `privacy`, `views`, `accesses`, `status`, `publishedAt`, `rating`, `reviewCount`, and `sourceForumPostId` are named in `library.md`; only owner-visible data is shown in the storage table.
- **API and codes:** Library storage endpoint, statuses, and error codes are Not specified in proposals. `API.md` has no standalone library storage endpoint, and `response_code.md` defines no library-specific error code.
- **Pagination and limits:** Row limits, pagination, and refresh interval are Not specified in proposals.
- **Notification and privacy rules:** No story-specific notification is stated. Storage access must respect owner privacy settings (`FR-27.5`, `NFR-PRIV-5`) and server-side authorization (`NFR-SEC-6`).

### B11. Source Alignment Notes

- This use case is derived from US-28 in `userstory.md` section 8.4 and from `FR-28.1` to `FR-28.3` and `AC-28.1` to `AC-28.3` in the proposals.
- `library.md` supplies recommended component names, status values, and exact UI messages; these are UI recommendations, not new FRs.
- `API.md` has no standalone library storage endpoint, so no storage route, status code, or error code is invented.
- Overlap with existing `UC-06-share-learning-resource.md`: UC-06 publishes a resource and directs the owner to the storage view; UC-24 defines what that storage view displays. Deletion is covered by US-29 rather than this use case.
- No I-xx, E-xx, or G-xx model relationship ID is introduced; flow headings such as A2 and E2 are specification flow labels only.
