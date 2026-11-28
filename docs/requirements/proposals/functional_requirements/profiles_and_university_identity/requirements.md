# Profile and University Identity

**Version:** `1.1`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

[Back to functional requirements index](../../functional_requirement.md)

> Status: `Complete` = source-backed implementation exists; `Partial` = supporting code exists but the full requirement is not implemented; `Not implemented` = no source-backed implementation was found.

### US-08: Manage Profile

**As a** university student, **I want to** create and update my profile, **so that** other users can understand my academic background and interests.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-08.1 (Profile Update)** | The system shall allow a user to create and update their profile. | UI, Frontend, Backend | Partial |
| **FR-08.2 (Profile Fields)** | The profile shall include display name, username, avatar, short bio, university, major, and academic year. | UI, Frontend | Complete |
| **FR-08.3 (Academic Selection)** | The system shall allow users to select their university and major from the supported catalog. | UI, Frontend, Backend | Not implemented |
| **FR-08.4 (Avatar Validation)** | The system shall validate avatar uploads for file type and size. | Frontend, Backend | Complete |
| **FR-08.5 (Profile Persistence)** | The system shall persist profile changes and reflect them across the user's active sessions. | Backend, Database | Complete |
| **FR-08.6 (Public Academic Info)** | The system shall display the user's university, major, and academic year on their public forum profile. | UI, Frontend | Not implemented |

### US-09: Set Learning Preferences

**As a** university student, **I want to** specify my courses, subjects, interests, and learning goals, **so that** the platform can recommend relevant content.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-09.1 (Course Preferences)** | The system shall allow a university student to specify their current courses. | UI, Frontend, Backend | Not implemented |
| **FR-09.2 (Subject Preferences)** | The system shall allow a university student to specify subjects and topics of interest. | UI, Frontend, Backend | Not implemented |
| **FR-09.3 (Goal Preferences)** | The system shall allow a university student to specify learning goals and preferred study times. | UI, Frontend, Backend | Not implemented |
| **FR-09.4 (Recommendation Use)** | The system shall use these preferences to recommend forum posts, materials, study partners, and optional rooms. | Backend | Not implemented |
| **FR-09.5 (Preference Updates)** | The system shall allow users to update their preferences at any time. | UI, Frontend, Backend | Not implemented |

### US-10: Manage Privacy

**As a** user, **I want to** control the visibility of my personal information, **so that** I can protect my privacy while using the platform.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-10.1 (Visibility Controls)** | The system shall allow a user to control the visibility of personal information such as profile details, study history, and contact information. | UI, Frontend, Backend | Not implemented |
| **FR-10.2 (Search Opt-Out)** | The system shall allow a user to opt out of appearing in public discovery and study-partner search results. | UI, Frontend, Backend | Not implemented |
| **FR-10.3 (Online Status)** | The system shall allow a user to hide their online status and last-active time. | UI, Frontend, Backend | Not implemented |
| **FR-10.4 (Privacy Enforcement)** | The system shall respect privacy settings when displaying user information in forum posts, comments, and member lists. | Backend, Database | Not implemented |
