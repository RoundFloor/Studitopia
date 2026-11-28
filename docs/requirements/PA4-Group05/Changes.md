# Changes History

> Comparison baseline: PA3 documentation under `docs/requirements/PA3-Group05/`, using commit `accd253` as the practical pre-PA4 boundary.

> PA4 scope: current documentation under `docs/requirements/PA4-Group05/`, `docs/analysis-and-design/`, and the shared requirement documents under `docs/requirements/proposals/`.

## Requirement Repository Structure

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 25/11/2026 | 1.0 | Moved shared proposal documents from PA3 submission folders into `docs/requirements/proposals/` and removed the duplicate `docs/requirements/PA3-Group-05/` tree. | KanbeMatt |
| 28/11/2026 | 1.0 | Added version and author metadata to proposal documents. | KanbeMatt |
| 28/11/2026 | 1.0 | Split functional requirements into functional-group files and non-functional requirements into category files. | Nguyen Le Quoc Huy; Tran Nguyen Khanh Binh |
| 28/11/2026 | 1.0 | Duplicated the split FR and NFR document set into `docs/requirements/PA4-Group05/` as PA4 submission artifacts. | Nguyen Le Quoc Huy |

## Functional Requirements

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 28/11/2026 | 1.0 | Initial PA4 functional requirement set retained from the PA3 requirement baseline with 241 FRs across US-01 to US-40. | Nguyen Le Quoc Huy |
| 28/11/2026 | 1.1 | Added current-code implementation statuses: Complete, Partial, and Not implemented. | Nguyen Le Quoc Huy |
| 28/11/2026 | 1.1 | Split the monolithic FR document into functional-group files under `functional_requirements/`. | Nguyen Le Quoc Huy |
| 28/11/2026 | 1.1 | Split the forum group into `browse/`, `feeds/`, and `posts/` groups. | Nguyen Le Quoc Huy |
| 28/11/2026 | 1.1 | Moved suggestions and post filtering into `suggestions_and_filters/`. | Nguyen Le Quoc Huy |

## Non-functional Requirements

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 20/11/2026 | 1.0 | Defined the PA4 non-functional requirement set. | Tran Nguyen Khanh Binh |
| 21/11/2026 | 1.1 | Adapted all NFRs to current source evidence: implemented, partial, planned/not implemented, or target/unverified. | Tran Nguyen Khanh Binh |
| 25/11/2026 | 1.2 | Marked time-measurement NFRs complete based on user-performed testing. | Nguyen Le Quoc Huy |
| 26/11/2026 | 1.3 | Marked TLS protection complete because it is ensured by the server proxy. | Nguyen Le Quoc Huy |
| 28/11/2026 | 1.3 | Split the NFR tables into six category files under `non_functional_requirements/`. | Nguyen Le Quoc Huy |

## Use Cases

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 28/11/2026 | 2.0 | Expanded the seven PA3 selected use cases into detailed PA4 use cases while retaining UC-01 to UC-07 at version 2.0. | Nguyen Thanh An; Nguyen Le Quoc Huy; Tran Nguyen Khanh Binh; Nguyen Chi Bao; Tran Canh Anh Tuan |
| 28/11/2026 | 1.0 | Added UC-08 to UC-34 for profile, privacy, post interaction, recommendations, social features, meeting rooms, notifications, communication controls, and safety reporting. | Nguyen Thanh An; Nguyen Le Quoc Huy; Tran Nguyen Khanh Binh; Nguyen Chi Bao; Tran Canh Anh Tuan |
| 28/11/2026 | 1.0 | Added ten grouped use-case diagram files, one for each PA4 functional area. | Nguyen Le Quoc Huy |
| 28/11/2026 | 1.0 | Added `functional_requirement_coverage.md` mapping 241/241 FRs to PA4 use cases with 0 uncovered. | Nguyen Le Quoc Huy |

## Architecture Diagrams

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 28/11/2026 | 1.0 | Added C4 Level 1, Level 2, Level 3, and Level 4 documentation in both `docs/analysis-and-design/` and `docs/requirements/PA4-Group05/`. | Nguyen Le Quoc Huy |
| 28/11/2026 | 1.1 | Corrected deployment wording: Vite on port `8999` is development-only; NestJS Web serves the compiled frontend in deployment. | Nguyen Le Quoc Huy |

## Proposal and Page Specification Documents

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 27/11/2026 | 1.0 | Added 13 detailed page-specification documents for create post, create room, friend, friend profile, group detail, hall room, library, list post, meeting lobby, moderation queue, post management, settings, and study room pages. | Nguyen Thanh An; Tran Nguyen Khanh Binh; Nguyen Chi Bao; Nguyen Le Quoc Huy; Tran Canh Anh Tuan |
| 28/11/2026 | 1.0 | Added version and author metadata across 31 proposal documents. | KanbeMatt |
| 28/11/2026 | 1.0 | Added root-level `friend.md` and `settings.md` drafts in addition to the canonical proposal copies. | KanbeMatt |

## Implementation Traceability

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 28/11/2026 | 1.0 | Updated requirement status notes to distinguish current implemented flows from planned product scope. | Nguyen Le Quoc Huy |
| 28/11/2026 | 1.0 | Updated backend and database submodule pointers for the implementation baseline used by PA4 documentation. | KanbeMatt |

---

# Detailed Changes

## Requirement Repository Structure (PA3 to PA4)

### Version 1.0 - 25/11/2026

- Shared requirement and proposal files were moved out of PA3 submission folders into `docs/requirements/proposals/`.
- The duplicate legacy tree `docs/requirements/PA3-Group-05/` was removed.
- The canonical PA3 archive under `docs/requirements/PA3-Group05/` was preserved as the previous-phase baseline.
- PA4 documentation was grouped under `docs/requirements/PA4-Group05/` and `docs/analysis-and-design/`.

### Version 1.0 - 28/11/2026

- Proposal documents received consistent version and author metadata.
- FR and NFR documents were split into deeper folders:
  - `docs/requirements/proposals/functional_requirements/<group>/requirements.md`
  - `docs/requirements/proposals/non_functional_requirements/<category>/requirements.md`
- The same split FR/NFR set was copied into `docs/requirements/PA4-Group05/` as part of the PA4 submission package.
- The old combined requirement files were retained as index pages so existing references to `functional_requirement.md` and `non_functional_requirement.md` remain valid.

## Functional Requirements (PA3 baseline to PA4 v1.1)

### Version 1.1 - 28/11/2026

- The PA3 single-file functional requirement set was retained as 241 FRs spanning US-01 to US-40.
- A `Status` column was added to every FR row:
  - `Complete` = source-backed implementation exists.
  - `Partial` = UI, DTO, SQL, or related support exists but the full flow is not implemented.
  - `Not implemented` = no source-backed implementation was found.
- Current status totals are 55 Complete, 20 Partial, and 166 Not implemented.
- The implementation baseline was made explicit:
  - Implemented: authentication, OTP, account read/avatar, forum browsing, post/tag/file read, Vite development hosting on port `8999`, and production SPA delivery through the NestJS Web package.
  - Not implemented: friends, meeting rooms, notifications, moderation, privacy settings, full resource management, create post/comment/vote flows, backend search, CAPTCHA, and Google OAuth.
- The monolithic table set was split into ten functional-group files:
  - `authentications/requirements.md`
  - `profiles_and_university_identity/requirements.md`
  - `browse/requirements.md`
  - `feeds/requirements.md`
  - `suggestions_and_filters/requirements.md`
  - `posts/requirements.md`
  - `learning_resource_library/requirements.md`
  - `friends_and_social_networking/requirements.md`
  - `meeting_rooms/requirements.md`
  - `notifications_and_safety/requirements.md`
- The former `forums/` group was divided into:
  - Browse: US-11, US-12, US-23.
  - Feed: US-13 except FR-13.3.
  - Posts: US-14 to US-22.
  - Suggestions and Filters: FR-13.3 and US-24.

## Non-functional Requirements (PA3 baseline to PA4 v1.3)

### Version 1.1 - 21/11/2026

- All NFRs were rewritten from target-only wording into source-backed status wording.
- Status labels were introduced:
  - Implemented.
  - Complete (user-tested).
  - Complete (server proxy).
  - Partial.
  - Planned (not implemented).
  - Target (unverified).
- Current runtime facts were added:
  - Backend listens on port `8353`.
  - Vite hosts the frontend on port `8999` only during development.
  - PostgreSQL defaults to `localhost:5432`.
  - NestJS Web serves the compiled frontend in deployment.

### Version 1.2 - 25/11/2026

- Time-related NFRs were marked complete based on user-performed testing:
  - NFR-PERF-1 to NFR-PERF-7.
  - NFR-AVAIL-1.
  - NFR-SEC-7.
  - NFR-USE-1.
- The documentation now distinguishes measured or user-accepted timing targets from source code artifacts.

### Version 1.3 - 26/11/2026

- NFR-SEC-3 was marked complete because TLS 1.2 or higher is ensured by the server proxy.
- The NestJS API remains internal on port `8353`.

### Version 1.3 - 28/11/2026

- NFR tables were split into six category files:
  - `performance/requirements.md` — NFR-PERF-1 to NFR-PERF-7.
  - `scalability/requirements.md` — NFR-SCAL-1 to NFR-SCAL-6.
  - `availability/requirements.md` — NFR-AVAIL-1 to NFR-AVAIL-2.
  - `security/requirements.md` — NFR-SEC-1 to NFR-SEC-10.
  - `privacy/requirements.md` — NFR-PRIV-1 to NFR-PRIV-7.
  - `usability/requirements.md` — NFR-USE-1 to NFR-USE-6.
- The original NFR file became an index containing revision history, current code basis, status labels, category links, and source references.

## Use Cases (PA3 seven cases to PA4 thirty-four cases)

### Version 2.0 - 28/11/2026 (retained PA3 cases)

- UC-01 Register Account was retained and expanded to version 2.0.
- UC-02 Log In was retained and expanded to version 2.0.
- UC-03 Browse and Search the University Forum was retained and expanded to version 2.0.
- UC-04 Create Discussion Post was retained and expanded to version 2.0.
- UC-05 Comment and Answer was retained and expanded to version 2.0.
- UC-06 Share Learning Resource was retained and expanded to version 2.0.
- UC-07 Join or Create a Study Room was retained and expanded to version 2.0.

### Version 1.0 - 28/11/2026 (new PA4 cases)

- Added UC-08 Logout.
- Added UC-09 Automatic Logout.
- Added UC-10 Recover Password.
- Added UC-11 Delete Account.
- Added UC-12 Manage Profile.
- Added UC-13 Set Learning Preferences.
- Added UC-14 Manage Privacy.
- Added UC-15 Create Material Post.
- Added UC-16 Create Functional Post.
- Added UC-17 Vote on Posts and Comments.
- Added UC-18 Mark True Response.
- Added UC-19 Save Post.
- Added UC-20 Report and Moderate Forum Content.
- Added UC-21 Forum Recommendations.
- Added UC-22 Find Learning Resources.
- Added UC-23 Resource Recommendations.
- Added UC-24 View My Storage.
- Added UC-25 Delete Published Resource.
- Added UC-26 Find Study Partner.
- Added UC-27 Send Friend Request.
- Added UC-28 Manage Friend Requests.
- Added UC-29 Manage Friend Groups.
- Added UC-30 Shared Study Tools.
- Added UC-31 Request Learning Help.
- Added UC-32 Receive Notifications.
- Added UC-33 Control Communication.
- Added UC-34 Report Inappropriate Behavior.

### Use-case organization

- Authentication and account: UC-01, UC-02, UC-08 to UC-11.
- Profile management: UC-12 to UC-14.
- Social forum management: UC-03.
- Post management: UC-04, UC-15, UC-16.
- Forum interaction: UC-05, UC-17 to UC-20.
- Forum search and recommendation: UC-21.
- Learning resource library: UC-06, UC-22 to UC-25.
- Friends and social networking: UC-26 to UC-29.
- Meeting rooms: UC-07, UC-30, UC-31.
- Notifications and safety: UC-32 to UC-34.

### Coverage and diagrams

- Added `docs/requirements/PA4-Group05/use_cases/functional_requirement_coverage.md`.
- The coverage matrix maps all 241 FRs to PA4 use cases with 0 uncovered FRs.
- Added ten group diagram files under `docs/requirements/PA4-Group05/use_cases/`, one per functional area.

## Architecture Documentation (PA3 diagram set to PA4 C4 set)

### Version 1.0 - 28/11/2026

- Added C4 Level 1 System Context documentation.
- Added C4 Level 2 Container documentation.
- Added C4 Level 3 Component documentation with separate frontend and backend component views.
- Added C4 Level 4 Deployment documentation.
- Each diagram document was placed in both:
  - `docs/analysis-and-design/`.
  - `docs/requirements/PA4-Group05/`.
- Older narrative/component architecture documents were superseded by the C4-level set.

### Version 1.1 - 28/11/2026

- Clarified that Vite on port `8999` is development-only.
- Clarified that production frontend delivery is handled by the backend NestJS Web package.
- Removed stale production deploy-server references.
- Documented source-accurate actors and boundaries:
  - Students.
  - Moderator/admin.
  - Browser.
  - Resend Email API.
  - Discord Webhook.
  - Google Fonts.
- Documented planned or not-implemented integrations separately:
  - Google OAuth 2.0.
  - Cloud object storage.
  - File scanning.
  - AI recommendation and matching.
  - Push notification provider.
- Documented the single-server deployment model with backend, PostgreSQL, and local file storage.
- Listed active backend modules including Auth, Account, Forum, Post, Tag, File, Web, EmailSender, Postgres, SecurityGeneration, Storage, and Environment.
- Excluded unimplemented planned features from the component diagrams.

## Proposal and Page Specification Documents

### Version 1.0 - 27/11/2026

- Added `create_post.md`.
- Added `create_room.md`.
- Added `friend.md`.
- Added `friend_profile.md`.
- Added `group_detail.md`.
- Added `hall_room.md`.
- Added `library.md`.
- Added `list_post.md`.
- Added `meeting_lobby.md`.
- Added `moderation_queue.md`.
- Added `post_management.md`.
- Added `settings.md`.
- Added `study_room.md`.

### Version 1.0 - 28/11/2026

- Added version and author metadata to proposal documents.
- Kept PA3 use-case description and model documents as the seven-case baseline while PA4 use-case details moved to `docs/requirements/PA4-Group05/use_cases/`.
- Added root-level `friend.md` and `settings.md` drafts; the canonical proposal copies remain under `docs/requirements/proposals/`.

## Implementation Traceability

### Version 1.0 - 28/11/2026

- FR and NFR statuses were aligned with the current implementation rather than only the intended product scope.
- Requirement documents now explicitly separate implemented flows from planned features.
- Backend and database submodule pointers were updated for the implementation baseline used by PA4 documentation.
- Architecture diagrams were corrected to match the current hosting model and active backend modules.

## Known Caveats

- Deletion of `docs/requirements/PA3-Group-05/` removed a duplicate legacy tree only; PA3 scope remains in `docs/requirements/PA3-Group05/`.
- The PA4 split FR/NFR files exist both under `docs/requirements/proposals/` and `docs/requirements/PA4-Group05/`; the pairs are kept identical.
- `docs/requirements/log.txt` is a PA3 ZIP listing, not a change log.
- Root-level `friend.md` and `settings.md` are earlier drafts and are not the canonical proposal documents.
- UC-01 to UC-07 are PA3 continuations at version 2.0; UC-08 to UC-34 are new PA4 requirements at version 1.0.
