# Learning Resource Library

**Version:** `1.1`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

[Back to functional requirements index](../../functional_requirement.md)

> Status: `Complete` = source-backed implementation exists; `Partial` = supporting code exists but the full requirement is not implemented; `Not implemented` = no source-backed implementation was found.

### US-25: Find Learning Resources

**As a** university student, **I want to** search for books and learning resources, **so that** I can find materials related to my courses.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-25.1 (Resource Search)** | The system shall allow a user to search for books and learning resources. | UI, Frontend, Backend | Not implemented |
| **FR-25.2 (Resource Search Fields)** | The system shall support search by title, author, subject tags, and description. | Frontend, Backend | Not implemented |
| **FR-25.3 (Resource Filtering)** | The system shall support filtering by resource format and subject field. | UI, Frontend, Backend | Not implemented |
| **FR-25.4 (Resource Ratings)** | The system shall display resource ratings and review counts when available. | UI, Frontend, Backend | Not implemented |
| **FR-25.5 (Related Resources)** | The system shall display resources related to the user's university, major, and courses. | Backend | Not implemented |

### US-26: Receive Resource Recommendations

**As a** university student, **I want to** receive recommendations for books and learning resources, **so that** I can discover useful materials.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-26.1 (Resource Suggestions)** | The system shall recommend books or learning resources related to the user's subjects, courses, and interests. | Backend | Not implemented |
| **FR-26.2 (Recommendation Display)** | The system shall display recommended resources on the user's home or library page. | UI, Frontend | Not implemented |
| **FR-26.3 (Save Recommendation)** | The system shall allow users to save recommended resources to a personal list. | UI, Frontend, Backend | Not implemented |
| **FR-26.4 (Cold Start)** | The system shall provide curated foundational resources for new users without historical activity. | Backend | Not implemented |

### US-27: Share Learning Resources

**As a** university student, **I want to** share learning resources, **so that** I can help others access useful materials.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-27.1 (Publish Resource)** | The system shall allow a user to publish a learning resource to the library. | UI, Frontend, Backend | Partial |
| **FR-27.2 (Resource Details)** | The system shall allow the user to provide a title, description, subject tags, and course tags. | UI, Frontend | Not implemented |
| **FR-27.3 (Resource File Validation)** | The system shall validate uploaded files for type and size before publishing. | Frontend, Backend | Partial |
| **FR-27.4 (Resource Searchability)** | The system shall make published resources searchable after publication. | Backend, Database | Not implemented |
| **FR-27.5 (Resource Access)** | The system shall allow other users to view and access published resources according to privacy settings. | Backend | Not implemented |

### US-28: View My Storage

**As a** university student, **I want to** see my published resources, **so that** I can track how many views and accesses they receive.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-28.1 (Storage View)** | The system shall provide a personal storage view for published resources. | UI, Frontend, Backend | Not implemented |
| **FR-28.2 (Access Statistics)** | The system shall display the number of views and accesses for each published resource. | UI, Frontend, Backend | Not implemented |
| **FR-28.3 (Resource Status)** | The system shall display the publication status and date of each resource. | UI, Frontend | Not implemented |

### US-29: Delete My Published Resource

**As a** university student, **I want to** delete a resource I published, **so that** I can remove content I no longer want to share.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-29.1 (Delete Own Resource)** | The system shall allow a user to delete a resource they published. | UI, Frontend, Backend | Partial |
| **FR-29.2 (Delete Confirmation)** | The system shall require confirmation before deleting a published resource. | UI, Frontend | Partial |
| **FR-29.3 (Remove from Listings)** | The system shall remove the deleted resource from search and library listings. | Backend, Database | Not implemented |
| **FR-29.4 (Deleted Resource Access)** | The system shall prevent other users from accessing a deleted resource. | Backend | Partial |
