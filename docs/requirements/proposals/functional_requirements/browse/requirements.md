# Browse

**Version:** `1.1`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

[Back to functional requirements index](../../functional_requirement.md)

> Status: `Complete` = source-backed implementation exists; `Partial` = supporting code exists but the full requirement is not implemented; `Not implemented` = no source-backed implementation was found.

### US-11: Access the University Forum

**As a** university student, **I want to** access the university forum, **so that** I can explore academic discussions related to my university.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-11.1 (Primary Forum)** | The system shall provide a dedicated university forum as the primary feature after login. | UI, Frontend | Complete |
| **FR-11.2 (Own University Forum)** | The system shall allow a user to select and enter their own university forum. | UI, Frontend, Backend | Complete |
| **FR-11.3 (Other University Forums)** | The system shall allow a user to browse forums of other universities when permitted. | UI, Frontend, Backend | Complete |
| **FR-11.4 (Default Context)** | The system shall display the selected university forum as the default forum context for the user. | Frontend, Backend | Complete |

### US-12: Browse University, Major, and Course Forums

**As a** university student, **I want to** browse forums by university, major, and course, **so that** I can find discussions relevant to my program.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-12.1 (Forum Hierarchy)** | The system shall organize forum content by University, Major, and Course. | Backend, Database | Complete |
| **FR-12.2 (Major Listing)** | The system shall display the majors offered within a selected university. | UI, Frontend, Backend | Complete |
| **FR-12.3 (Course Listing)** | The system shall display the courses associated with a selected major. | UI, Frontend, Backend | Complete |
| **FR-12.4 (Forum Navigation)** | The system shall allow users to navigate from a university to a major and then to a course forum. | UI, Frontend | Complete |
| **FR-12.5 (Relevant Content)** | The system shall display posts and materials relevant to the selected forum level. | Backend | Complete |
| **FR-12.6 (Context Switching)** | The system shall allow users to switch between university, major, and course forums easily. | UI, Frontend | Complete |

### US-23: Search the Forum

**As a** university student, **I want to** search the forum, **so that** I can find discussions and materials related to my academic needs.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-23.1 (Keyword Search)** | The system shall allow users to search posts by keyword. | UI, Frontend, Backend | Partial |
| **FR-23.2 (Search Fields)** | The system shall support search by tags, title, content, author, university, major, and course. | Frontend, Backend | Commplete |
| **FR-23.3 (Search Filtering)** | The system shall filter search results by post type, solved status, and time range. | UI, Frontend, Backend | Commplete |
| **FR-23.4 (Search Ranking)** | The system shall rank search results by relevance and engagement. | Backend | Commplete |
| **FR-23.5 (Search Empty State)** | The system shall display an appropriate empty state when no results match the search criteria. | UI, Frontend | Commplete |
