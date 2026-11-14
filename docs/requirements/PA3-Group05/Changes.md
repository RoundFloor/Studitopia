# Changes History

## Software Development Plan

| Date  | Version | Description | Author |
| ---   | --- | --- | --- |
| 29/10 | 1.0 | Initial draft | Tran Canh Anh Tuan |
| 30/10 | 1.1 | Planned the software development | Nguyen Thanh An |
| 10/11 | 2.0 | Updated the development plan from Sprint 3: froze Sprint 1 and Sprint 2; completed authentication function groups and part of Forum Post in Sprint 3; moved the remaining forum/post work to Sprint 4 and testing/deployment to Sprint 5 | Tran Canh Anh Tuan |
| 11/11 | 2.0 | Restored meeting rooms from Sprint 3 as a middle-level feature in Sprint 5; added AI-powered features to Sprint 4 | Tran Nguyen Khanh Binh |

## Vision Document

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 27/10 | 0.1 | Initial raw of document | Nguyen Le Quoc Huy |
| 28/10 | 0.2 | Added "2. Positioning" | Tran Nguyen Khanh Binh |
| 29/10 | 0.3 | Added "3. Stakeholder and User Descriptions" | Tran Nguyen Khanh Binh |
| 29/10 | 0.4 | Added "4. Product Overview" | Nguyen Le Quoc Huy |
| 29/10 | 1.0 | Added "5. Product Features" | Nguyen Le Quoc Huy |
| 30/10 | 1.1 | Revised stakeholder and product sections | Nguyen Le Quoc Huy |
| 11/11 | 2.0 | Updated for PA3: forum-first and university focus; meeting rooms restored at middle level; features, workflows, NFRs, and architecture diagram reworked accordingly | Nguyen Le Quoc Huy |
| 12/11 | 2.1 | Updated for PA3: added authentication-related NFRs (password policy, CAPTCHA, token signing, OTP lifetime and single-use, generic login errors) | Tran Nguyen Khanh Binh |
| 12/11 | 2.2 | Updated for PA3: added and clarified environmental constraints (inactive-session expiry and temporary meeting-room file deletion) | Tran Nguyen Khanh Binh |

---

# Detailed Changes

## Software Development Plan (PA2 v1.1 to PA3 v2.0)

### Version 2.0 - 10/11/2026

#### Document-wide

- Added the PA3 rationale to the Scope: the plan now reflects the decision to prioritize the university forum and to complete authentication before forum work.
- Marked Sprint 1 and Sprint 2 as frozen and unchanged from version 1.1.
- Declared Sprint 3 as the current sprint and limited its capacity to authentication function groups plus part of Forum Post.
- Removed the stale references to real-time private/group messaging and external meeting-link integration that were planned in PA2.

#### 1. Introduction

- Section 1.2 Scope now states that the plan is based on the Vision Document and that this version reflects the PA3 priority decision.
- Section 1.3 Overview now also lists Project Close-out as part of the plan.

#### 2. Project Overview

- Section 2.1 reworded the product description from a general "collaborative learning forum" to a "collaborative academic forum and social learning platform" and explicitly describes the university, major, and course hierarchy.
- Objectives were rewritten:
  - The forum objective now names the course-centered university forum.
  - A new objective covers discussion, material, and functional posts.
  - The old "share materials and host meetings" objective was split.
  - A new objective restores basic meeting-room support without making meeting rooms the primary focus.
- Added new subsections:
  - **2.1.1 Platform Structure and Organization** - describes the university, major, and course hierarchy.
  - **2.1.2 Target Users and User Activities** - lists searching resources, participating in discussions, contributing resources, managing academic information, monitoring progress, and collaborating in meeting rooms.
  - **2.1.3 Expected Benefits** - lists centralized resources, knowledge sharing, academic connections, academic self-management, and flexible collaboration.
- Section 2.2 Assumptions added:
  - The current sprint is Sprint 3.
  - Sprint 1 and Sprint 2 scope and schedule are frozen.
  - Meeting rooms are a middle-level feature and will not reach the depth of the original PA2 vision.
- Section 2.2 Constraints added:
  - Sprint 3 capacity is limited to authentication function groups and part of Forum Post.
  - Meeting rooms must remain middle-level and must not displace forum and post work.
- Section 2.3 Deliverables now marks Sprint 1 and Sprint 2 deliverables as frozen and clarifies the remaining targets.
- Added **2.4 Change Summary from Sprint 3**, which records the previous and updated plans for Sprints 3, 4, and 5, and the meeting-room scope decision.

#### 3. Project Organization

- Section 3.2 Roles were retained; member names were normalized to remove diacritics and the role descriptions were kept aligned with PA2.

#### 4. Management Process

- **4.1 Estimated Schedule**
  - Marked Sprint 1 and Sprint 2 as frozen.
  - Sprint 3 is now "Complete authentication function groups and part of Forum Post".
  - Sprint 4 changed from document sharing/file search/meeting integration to completing Forum and post features, the Learning Resource Library, Friend and Group Management, and AI-powered features.
  - Sprint 5 changed from pure testing/deployment to basic middle-level meeting rooms, notifications, integration and performance testing, bug fixing, and deployment.
  - Corrected the PA2 schedule error where the final sprint was labeled "Sprint 6"; the plan now uses five sprints with Sprint 5 in Week 11-12.
- **4.1 Re-estimation Situation**
  - Added the priority-change trigger: forum and post work must be protected from lower-priority work such as extended meeting-room features.
- **4.2.1 Phase Plan**
  - Replaced the PA2 phase list with:
    - Project Planning (Sprint 1, frozen).
    - User Management (Sprint 2, frozen).
    - Authentication Completion and Forum Post Foundation (Sprint 3, current).
    - Forum and Social Features (Sprint 4).
    - Document Management (Sprint 4).
    - Meeting and Administration (Sprint 5).
    - Testing and Deployment (Sprint 5).
  - Rewrote the weekly activity table to match the new sprint content, including authentication completion, partial Forum Post, forum search and recommendations, library and file search, friend/group management, middle-level meeting rooms, AI-powered features, notifications, and testing.
  - Replaced the PA2 milestones with five PA3 milestones: project foundation, user management, authentication and forum foundation, core platform, and MVP.
  - Reworked the demonstration schedule to: User Management (Week 5), Forum Foundation (Week 8), Core Platform (Week 10), and Final MVP (Week 12).
- **4.2.2 Iteration Objectives**
  - Sprint 1 and Sprint 2 are now frozen.
  - Sprint 3 was changed from forum creation, posts, comments, friend management, real-time messaging, and notifications to authentication completion plus post list, discussion/material post creation, basic post detail, and university-major-course navigation.
  - Sprint 4 now covers the remaining forum and post features, AI augmentation for search and recommendation, the Learning Resource Library, file upload/search, and Friend and Group Management.
  - Sprint 5 now covers basic middle-level meeting rooms (discovery, create/join, shared whiteboard, shared notes, shared timer), notifications, study planning if capacity allows, and testing/deployment.
- **4.2.3 Releases**
  - Release 0.2 moved to the end of Week 8 and now contains completed authentication plus the basic Forum Post workflow.
  - Release 0.3 moved to the end of Week 10 and now contains the completed forum, comments, voting, true-response marking, moderation, search, recommendations, library, social features, and AI integration.
  - Release 1.0 at Week 12 now includes middle-level meeting rooms, notifications, and the agreed MVP.
- **4.2.4 Project Schedule**
  - Rewrote the schedule table to match the five PA3 sprints and the reworked milestone, release, and demo targets.
- **4.2.5 Project Resourcing**
  - Updated the AI Engineer skill description from generic "machine learning fundamentals" to NLP, document encoding, model integration, AI APIs, and model evaluation.
  - Training plan changes:
    - Replaced "Machine learning fundamentals and AI model/API integration" with "Model researching, AI usage pipeline designing and AI model/API integration".
    - Added "Forum post model, comments, voting, and moderation" for all members in Week 6.
    - Moved file upload/storage training to Week 9.
    - Moved functional, integration, and performance testing to Week 11.
    - Moved Linux deployment and server configuration to Week 11.
- **4.3.1 Requirements Management**
  - Added the priority order from Sprint 3 onward: authentication, forum and post features, library and social features, basic meeting rooms, study planning and notifications, and optional enhancements.
- **4.3.2 Reporting and Measurement**
  - Added two metrics: "Forum Post Progress" and "Meeting Room Scope".
- **4.3.3 Risk Management**
  - Replaced the PA2 risks ("Schedule delays" and "Performance issues" against 2,000 concurrent users and 10,000 requests per second) with:
    - High: Sprint 3 capacity risk.
    - High: Forum post complexity.
    - High: Technical integration issues.
    - High: Schedule compression from moving work to later sprints.
    - Medium: Meeting-room scope creep.
    - Medium: Security vulnerabilities.
    - Medium: Data loss.
    - Medium: Requirement changes.
    - Low: Team coordination issues.
- **4.3.4 Configuration Management**
  - Kept the configuration management content and restructured it under Project Monitoring and Control.

### Version 2.0 - 11/11/2026 (meeting rooms restored)

- Restored meeting rooms from Sprint 3 as a middle-level feature and placed the basic scope in Sprint 5.
- Meeting-room scope is limited to room discovery, create or join room, and core collaboration tools (shared whiteboard, shared notes, and shared timer).
- Added the explicit constraint and risk that meeting-room work must not expand beyond middle level or displace forum work.
- Added AI-powered features to Sprint 4 (AI augmentation for search and recommendation).
- Added **Appendix A: Sprint 3 Onward Work Distribution**, which lists nine prioritized work items with their target sprints:
  1. Complete authentication function groups (Sprint 3).
  2. Partial Forum Post (Sprint 3).
  3. Complete Forum and post features (Sprint 4).
  4. Learning Resource Library (Sprint 4).
  5. Friend and Group Management (Sprint 4).
  6. Basic meeting rooms at middle level (Sprint 5).
  7. Notifications (Sprint 5).
  8. Study planning (Sprint 5 if capacity allows).
  9. Integration, testing, and deployment (Sprint 5).

---

## Vision Document (PA2 v1.1 to PA3 v2.2)

### Version 2.0 - 11/11/2026 (forum-first and university focus)

#### 1. Introduction

- Updated the References table to the PA3 proposal files dated 14/11/2026 and added a reference to the PA3 Changes document.

#### 2. Positioning

- **2.1 Problem Statement**
  - Changed the problem from a general "context-driven environment" to an "integrated, university-focused environment".
  - Changed the affected audience from "high school and university students, independent learners" to "university students, academic communities, study groups, and project teams".
  - Rewrote the "successful solution" bullets so that discussion threads are tied to university, major, and course context and meeting rooms are a middle-level option with basic shared tools.
- **2.2 Product Position Statement**
  - Changed the target from "students and independent learners" to "university students and academic communities".
  - Replaced "instantly jump into live study groups" with collaboration "when live interaction is useful".
  - Replaced "spatial virtual study rooms" with "optional live study rooms".
  - Rewrote "Our product" around university, major, and course forum threads with basic meeting rooms only when live collaboration is needed.

#### 3. Stakeholder and User Descriptions

- **3.2 User Summary**
  - Renamed "Student / Independent Learner" to "University Student" and removed high school and independent learners.
  - Rewrote the student responsibilities around university, major, and course forums, sharing/retrieving materials, and optionally joining basic meeting rooms.
  - Peer Helper responsibilities now focus on forum answers, marking useful answers, nominating documents for the Library, and optional live help.
  - Study Group Leader responsibilities now focus on basic meeting rooms, join approval, and group resources instead of advanced room policies.
- **3.3 User Environment**
  - Primary environment is now explicitly the university forum home feed with navigation by university, major, and course context.
  - Meeting rooms are explicitly described as a middle-level, optional feature.
  - System capacity changed from the PA2 figures (10,000 requests per second and 200 concurrent room users) to 10,000 registered users, 100,000 forum posts, 1,000,000 comments and votes, 100,000 uploaded documents, 500 concurrent forum users, and 100 concurrent optional meeting rooms.
  - Medium-cycle activity now refers to a basic live study room attached to a forum thread using synchronized timers and shared whiteboards.
  - Environmental constraints replaced the PA2 real-time latency rules with session and data lifecycle rules: unattended sessions expire after 15 minutes and temporary meeting-room files are deleted within 5 minutes of room closure.
  - Integration requirements now focus on Google OAuth 2.0 and email delivery for OTP verification and password recovery.
- **3.4 Summary of Key Stakeholder or User Needs**
  - Reordered and renamed needs:
    - "Forum Discussion & Room Integration" became "University Forum Discussion and Post Features" (Highest, Rank 1).
    - "Resource Management & Retention" stayed High (Rank 2).
    - "Instant & Contextual Peer Assistance" became "Forum Interaction and Peer Assistance" and was raised from Medium to High (Rank 3).
    - "Silent Co-Presence & Focus Mechanics" became "Optional Live Study Collaboration" at Medium (Rank 4).
    - "Broadcast Messages & Targeted Notifications" became "Targeted Notifications" at Medium (Rank 5).
  - Proposed solutions were rewritten so that live collaboration is optional and meeting rooms provide basic tools rather than spatial seating or body-doubling features.
- **3.5 Alternatives and Competition**
  - Removed references to spatial room layouts, LaTeX, and other advanced PA2 room features from the competitor descriptions.
  - Changed "SSO" wording to "single sign-on systems".

#### 4. Product Overview

- Changed "virtual study environments" to "optional virtual study environments".
- **4.1 Product Perspective**
  - Reorganized the functional components for a forum-first product:
    - The forum is now labeled the primary component and uses Discussion, Material, and Functional Posts.
    - Added post features: votes, saved posts, true-response marking, reporting and moderation, and classification by university, major, and course.
    - Search and Discovery now includes course context.
    - Library resources now include course tags.
    - Replaced "Lobby and Meeting Room Management" (Hall Room and Study Room) with "Meeting Rooms (Middle Level)".
    - Replaced "Study Sessions and Collaborative Learning Tools" with "Conversational Learning Tools (Middle Level)" limited to shared whiteboards, shared notes, timers, and messaging.
    - Learning Help now references forum users and learners studying the same concept instead of room participants.
    - Notifications now also cover forum replies, votes, true-response marks, and room invitations.
  - External interfaces were updated from room/audio/video/screen-sharing capabilities to forum features and basic meeting-room tools.
  - Replaced the PA2 architecture diagram with a new diagram that removes Hall Room, Study Room, tables, study sessions, and voice/screen sharing, and adds a single Meeting (middle level) component, conversational tools, social features, and safety.
- **4.2 Assumptions and Dependencies**
  - Internet connectivity now refers to forums, resources, and optional room participation.
  - User device capabilities now refer to meeting-room tools rather than a broad audio/video/screen-sharing requirement.
  - File storage and safety scanning now refer to forum documents and Library resources instead of room documents; the example 25 MB limit was removed.
  - Community participation now lists university students, peer helpers, mentors, and study group leaders only.
  - System capacity was updated to the new forum-first figures.
  - Added a "Middle-Level Meeting Room Scope" assumption explaining that expanding meeting-room scope may delay forum work.

#### 5. Product Features

- Replaced the PA2 feature table (F-001 to F-032) with a consolidated PA3 feature table (F-001 to F-021).
- New/renamed features include:
  - F-001 Account Registration and Verification.
  - F-002 Session Management.
  - F-003 Account Recovery and Deletion.
  - F-004 Profile and University Identity.
  - F-005 Learning Preferences and Privacy.
  - F-006 University Forum.
  - F-007 Post Creation and Management.
  - F-008 Post Interaction and Discussion.
  - F-009 Forum Moderation and Safety.
  - F-010 Search and Discovery.
  - F-011 Personalized Recommendations.
  - F-012 Learning Resource Library.
  - F-013 Study Partner Discovery (Medium).
  - F-014 Friend Connection Management (Medium).
  - F-015 Group Collaboration (Medium).
  - F-016 Course and Study Planning (Medium).
  - F-017 Meeting Room Discovery and Access (Medium).
  - F-018 Meeting Room Collaboration Tools (Medium).
  - F-019 Contextual Learning Assistance (Medium).
  - F-020 Notifications.
  - F-021 Trust, Safety, and Moderation.
- Removed as standalone features from PA2: Academic Classification, Resource Contribution and Reuse, Automatic Room Matching, Hall Room Participation, Study Room Creation and Access, Room Management and Study Scheduling, Study Group Participation, Room Document Sharing, Learner Communication, and Interactive Academic Tools.
- Priorities changed: post interaction, search, recommendations, and notifications are now explicitly High; study partner discovery, friend/group features, study planning, and meeting-room features are Medium.
- Reworked representative workflows:
  - "Post Browsing Workflow" became "Forum Post Workflow (Primary)" with university/major/course scope, post detail, voting, commenting, true-response marking, creation, and search.
  - "Room Workflow" became "Meeting Room Workflow (Middle Level)" with lobby, discovery, create room, join, and study/collaborate steps; Hall Room and Study Room branches were removed.
  - The Library workflow was retained.

#### 6. Non-Functional Requirements

- **Performance**
  - Replaced the PA2 real-time messaging and whiteboard latency NFRs with forum-focused performance NFRs: post list load, post detail load, and forum notification latency of 2 seconds.
  - Retained a 1-second synchronization NFR only for optional meeting-room tools (NFR-005).
- **Scalability**
  - Replaced the PA2 room-centric capacity NFRs (100 rooms, 200 room users, 40 seats, 1,000,000 messages, 300 GB) with: 10,000 users, 100,000 posts, 1,000,000 comments/answers/votes, 100,000 documents, 500 concurrent forum users, and 100 concurrent optional meeting rooms.
- **Security**
  - Retained authentication, password hashing, TLS, file validation/scanning, session timeout, XSS/CSRF protection, and added the new authentication NFRs listed under version 2.1.
- **Privacy**
  - Removed audio/video availability and room participation from the privacy controls.
- **Robustness**
  - Lowered NFR-020 (shared note buffering) from High to Medium priority.
- **Added NFRs**
  - NFR-022 File Compatibility (PDF, DOCX, PNG, JPG; configurable size limit).
  - NFR-023 Google OAuth 2.0.
  - NFR-024 Email OTP delivery.
  - NFR-025 Usability across forums.
- Added a **Summary of Decisions** table recording the forum focus, frozen sprints, Sprint 3 limitation, re-prioritization, and restoration of meeting rooms.

### Version 2.1 - 12/11/2026 (authentication NFRs)

- Added NFR-026: passwords must be at least 8 characters with lowercase, uppercase, number, and special character.
- Added NFR-027: registration and login must require CAPTCHA verification.
- Added NFR-028: access and refresh tokens must be signed with HMAC-SHA256.
- Added NFR-029: verification codes must be 6-digit numeric OTPs that expire 5 minutes after generation.
- Added NFR-030: OTPs must be single-use, and issuing a new OTP immediately invalidates all earlier codes.
- Added NFR-031: failed logins must show generic error messages that do not reveal whether the username or password was wrong.

### Version 2.2 - 12/11/2026 (environmental constraints)

- Expanded the environmental constraints in section 3.3 to cover the session and data lifecycle:
  - Unattended sessions automatically expire after 15 minutes of inactivity.
  - Shared files in temporary meeting rooms are permanently deleted from storage within 5 minutes of room closure.
- Retained the data synchronization and fallback constraint requiring automatic local buffer saves for forum text inputs and shared notes.
