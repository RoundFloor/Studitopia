# UC-25 — Delete My Published Resource

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

| Field | Value |
| --- | --- |
| Use Case ID | UC-25 |
| Name | Delete My Published Resource |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Learning Resource Library |
| Priority | Not explicitly stated |
| Related User Stories | US-29 |
| Related Requirements | FR-29.1 to FR-29.4; AC-29.1 to AC-29.4; FR-28.1; FR-28.3; NFR-PERF-1; NFR-SCAL-4; NFR-SEC-1; NFR-SEC-6; NFR-PRIV-5; NFR-PRIV-7 |
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
        UC25(["UC-25<br/>Delete My Published Resource"])
    end

    Student --- UC25

    class Student actor
    class UC25 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| University Student | Primary | Authenticated resource owner who deletes a published learning resource that the student no longer wants to share. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-25 Delete My Published Resource | Primary | Confirms deletion of a resource the student published. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | No generalization or specialization | The proposals name only the University Student actor for US-29. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No include relationship | The proposals do not name an included use case for US-29. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | No extend relationship | The proposals do not name an extending use case for US-29. |

### A4. Model Notes

1. The scope is owner-initiated deletion, confirmation, removal from search and library listings, and access restriction after deletion.
2. Publishing resources and viewing storage statistics are outside this use case; storage is US-28 and publishing is US-27.
3. The delete entry point is the owner's resource list or resource detail view, as recommended by `library.md`.
4. No distinct included, extending, or specialized use case is named for US-29, so no I-xx, E-xx, or G-xx relationship ID is introduced.
5. The exact API endpoint, route, deletion status code, and priority are not specified in proposals.

## Part B — Use Case Specification

### B1. Brief Description

A university student deletes a resource the student published so that content the student no longer wants to share is removed. The system requires confirmation before deletion, removes the deleted resource from search and library listings, and prevents other users from accessing it.

`library.md` recommends placing the delete control in **My Storage**, with a dedicated confirmation dialog. The exact dialog text is specified in `library.md`; the functional rules come from `FR-29.1` to `FR-29.4` and `AC-29.1` to `AC-29.4`.

### B2. Preconditions

1. The student is authenticated before accessing protected user resources (`NFR-SEC-1`).
2. The Learning Resource Library is reachable through `Home -> Library Group` in `screen_flow.md`.
3. The student has a published resource available in the personal storage view (`FR-28.1`, `AC-28.1`).
4. The resource is owned by the student who requests deletion (`FR-29.1`, `AC-29.1`).
5. Search, library-listing, and access-enforcement mechanisms are available (`FR-29.3`, `FR-29.4`).

### B3. Postconditions

1. **Success:** The confirmed resource is deleted from the owner's published resources.
2. **Success:** The deleted resource is removed from search and library listings.
3. **Success:** Other users cannot access the deleted resource.
4. **Failure:** No resource is deleted when confirmation is cancelled or authorization fails.
5. **Failure:** If deletion or removal fails, the resource is not presented as deleted and retry behavior is shown where supported.

### B4. Main Success Scenario (Basic Flow)

1. The student opens **My Storage** through `MyStorageTab`.
2. The system displays `MyStoragePanel` with the student's published resources.
3. The student selects **Delete** through `DeleteMyResourceButton` for the chosen resource.
4. The system displays `DeleteResourceConfirmDialog` with the exact message “Delete `<title>`? It will be removed from search and library listings.”
5. The dialog provides **Cancel** and **Delete resource** buttons.
6. The student selects **Delete resource**.
7. The system verifies that the student owns the resource (`FR-29.1`, `AC-29.1`, `NFR-SEC-6`).
8. The system removes the resource from search and library listings (`FR-29.3`, `AC-29.3`).
9. The system prevents other users from accessing the deleted resource (`FR-29.4`, `AC-29.4`).
10. The system confirms deletion through `LibraryToastHost`; the exact success-message text is Not specified in proposals.

### B5. Alternative Flows

#### A1. Cancel deletion

The student selects **Cancel** in `DeleteResourceConfirmDialog`. The system closes the dialog and leaves the resource unchanged (`AC-29.2`, `FR-29.2`).

#### A2. Delete from resource detail

The student opens the resource detail from **View** and starts deletion there. The same confirmation dialog and deletion rules apply.

#### A3. Return to storage after deletion

After successful deletion, the student remains in or returns to **My Storage**, and the deleted resource no longer appears in the owned-resource list.

### B6. Exception Flows

#### E1. Student does not own the resource

The student attempts to delete a resource that is not owned by the student. The system rejects the deletion through authorization checks (`NFR-SEC-6`); the exact authorization message is Not specified in proposals.

#### E2. Deletion or listing removal fails

The system cannot complete deletion or cannot remove the resource from search and library listings. The resource is not presented as deleted, and a retry path is shown where supported; the exact failure message is Not specified in proposals.

#### E3. Access to deleted resource attempted

Another user attempts to access the deleted resource. The system blocks access (`FR-29.4`, `AC-29.4`) and may show the exact access-denied message “You do not have permission to access this resource.”

### B7. Business Rules

1. Users can delete their own published resources (`FR-29.1`, `AC-29.1`).
2. The system requires confirmation before deleting a published resource (`FR-29.2`, `AC-29.2`).
3. The deleted resource is removed from search and library listings (`FR-29.3`, `AC-29.3`).
4. Other users cannot access a deleted resource (`FR-29.4`, `AC-29.4`).
5. Publication status and date are owner-visible before deletion (`FR-28.3`, `AC-28.3`).
6. Privacy settings continue to govern shared resources until deletion is complete (`FR-27.5`, `NFR-PRIV-5`, `NFR-PRIV-7`).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-PERF-1 | The system shall provide responsive user interactions with a response time of ≤ 2 seconds for standard user actions. |
| NFR-SCAL-4 | The system architecture shall support at least 100,000 uploaded documents and learning resources. |
| NFR-SEC-1 | The system shall require authentication before accessing protected user resources. |
| NFR-SEC-6 | The system shall prevent unauthorized access through server-side authorization checks. |
| NFR-PRIV-5 | Users shall be able to control access to documents and learning resources they share. |
| NFR-PRIV-7 | Privacy settings shall apply consistently to forum posts, comments, member lists, and search results. |
| Design constraint | The delete control, confirmation dialog text, button labels, and post-deletion feedback follow `library.md` as UI recommendations; FR/AC/NFR entries are confirmed requirements. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Cancel confirmation | Basic flow step 5; alternative A1 |
| Detail-page deletion | Before basic flow step 3; alternative A2 |
| Post-deletion storage refresh | After basic flow step 9; alternative A3 |
| Ownership failure | Basic flow step 7; exception E1 |
| Deletion or removal failure | Basic flow steps 8-9; exception E2 |
| Deleted-resource access | After basic flow step 9; exception E3 |

### B10. Interface and Data Notes

- **Screen and flow path (confirmed):** `screen_flow.md` defines `Home -> Library Group`; `userstory.md` section 8.5 defines the delete requirement. `library.md` flow 7.4 defines `My Storage -> DeleteMyResourceButton -> DeleteResourceConfirmDialog -> removed from search and listings`.
- **Route (not specified):** Route is Not specified in proposals; `library.md` presents `/library/my-storage` as a suggested state only.
- **Recommended UI:** `MyStorageTab` label **My Storage**, `MyPublishedResourcesTable`, `DeleteMyResourceButton` label **Delete**, `MyResourceOpenButton` label **View**, and `DeleteResourceConfirmDialog`.
- **Exact delete confirmation text:** “Delete `<title>`? It will be removed from search and library listings.” Buttons are **Cancel** and **Delete resource**.
- **Other exact messages:** “You have not published any resources yet.” for empty storage; “Unable to load resources.” with **Retry** for storage load failure; “You do not have permission to access this resource.” for blocked access. The deletion success-message text is Not specified in proposals.
- **Data fields:** `resourceId`, `title`, `resourceType`, `status`, `publishedAt`, `privacy`, `views`, and `accesses` are named in `library.md`. Status values are exactly `Published`, `Restricted`, and `Unavailable`.
- **API and codes:** Library delete endpoint, statuses, and error codes are Not specified in proposals. `API.md` has no standalone library delete endpoint, and `response_code.md` defines no library-specific error code; forum error codes must not be invented for library deletion.
- **Authorization and privacy rules:** Only the owner may delete the resource (`FR-29.1`, `AC-29.1`, `NFR-SEC-6`); other users cannot access the deleted resource (`FR-29.4`, `AC-29.4`, `NFR-PRIV-5`, `NFR-PRIV-7`).

### B11. Source Alignment Notes

- This use case is derived from US-29 in `userstory.md` section 8.5 and from `FR-29.1` to `FR-29.4` and `AC-29.1` to `AC-29.4` in the proposals.
- The confirmation dialog text, button labels, and storage entry point come from `library.md` as UI recommendations tied to `FR-29.2` and `AC-29.2`.
- `API.md` has no standalone library delete endpoint, so no library delete route, status code, or error code is invented.
- Overlap with existing `UC-06-share-learning-resource.md`: UC-06 establishes that published resources must become searchable and must be removed from listings and blocked from access when deleted; UC-25 defines the owner's complete deletion flow.
- No I-xx, E-xx, or G-xx model relationship ID is introduced; flow headings such as A2 and E2 are specification flow labels only.
