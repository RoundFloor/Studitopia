# Software Development Plan

### **Version:** <2.0>

## Revision History

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 29/10 | 1.0 | Initial draft | Tran Canh Anh Tuan |
| 30/10 | 1.1 | Plan the software development | Nguyen Thanh An |
| 10/11 | 2.0 | Authentication completion and partial Forum Post; remaining work re-prioritized | Nguyen Thanh An |
| 11/11 | 2.0 | Restored meeting rooms from Sprint 3| Tranh Nguyen Khanh Binh |

## 1. Introduction
**Performed by:** [Tuan] | **Reviewed by:** [An] | **Edited by:** [An]

This section provides an overview of the entire document. It includes the purpose, scope, definitions, acronyms, abbreviations, references, and overview of this plan.

### 1.1 Purpose

The purpose of this document is to gather all information necessary to control the project. It describes the approach to the development of the software and directs the development effort of the group.

The following people use the Software Development Plan:

- The product owner, scrum master, and project manager use it to plan the project schedule and resource needs and to track progress against the schedule.
- Project team members use it to understand what they need to do, when they need to do it, and what other activities they depend on.

### 1.2 Scope

This document describes the overall plan for the Studitopia project, including development, testing, and deployment of the product using small iterations. The details of individual iterations are described in the Iteration Objectives.

The plans in this document are based on the product requirements defined in the Vision Document. This version reflects the PA3 decision to prioritize the university forum and to restore meeting rooms.

### 1.3 Overview

The rest of this plan contains the following information:

- **Project Overview** describes the project's purpose, scope, objectives, assumptions, constraints, and deliverables.
- **Project Organization** describes the organizational structure of the project team.
- **Management Process** contains estimates, the project plan, schedule, resources, and achievement criteria.
- **Project Monitoring and Control** describes how the project will be monitored and controlled.
- **Project Close-out** describes the final acceptance and archiving activities.

## 2. Project Overview
**Performed by:** [Tuan] | **Reviewed by:** [An] | **Edited by:** [An]

### 2.1 Project Purpose, Scope, and Objectives

Studitopia is a collaborative academic forum and social learning platform focused mainly on undergraduate students across several partner universities. The platform is organized as a university forum with sub-forums by major, and each major contains course-level discussions. Users can join the forum to search for learning materials and past papers and to discuss the learning process, study tips, and related academic topics.

Users can share materials, interact with posts, manage academic profiles, and track their personal progress against their university syllabus by recording credits and grades to see completed coursework and remaining requirements. Meeting rooms are retained supporting feature for study groups that need live collaboration.

Objectives:

- Provide a course-centered university forum where undergraduate students can access materials and past papers by major and course.
- Enable discussion and knowledge sharing among students about the learning process and study tips.
- Allow users to create and interact with discussion, material, and functional posts.
- Restore basic meeting-room support for study groups that need live collaboration, without making meeting rooms the primary focus.
- Offer a progress tracking system tied to each university syllabus, where users input credits and grades to view their academic standing.

### 2.1.1 Platform Structure and Organization

Studitopia follows a hierarchical organizational structure that reflects the academic organization of universities. Instead of organizing all content into a single general-purpose forum, the platform categorizes discussions and learning resources according to universities, academic majors, and individual courses.

The platform consists of three main organizational levels:

- **Major Level:** Within each university, sub-forums are organized according to academic majors. This allows students to access discussions and resources relevant to their fields of study.
- **Course Level:** Each major contains individual course spaces where students can exchange knowledge, share learning materials, discuss assignments, and access past examination papers.

This hierarchical structure helps users navigate academic content more efficiently and ensures that discussions and resources remain relevant to their educational context.


### 2.1.2 Target Users and User Activities

Studitopia primarily targets undergraduate students from multiple partner universities. Although students may belong to different institutions and academic majors, they share common needs for accessing learning resources, discussing coursework, and managing their academic progress.

The main user activities include:

- **Searching for academic resources:** Finding lecture materials, reference documents, and past examination papers relevant to their courses.
- **Participating in academic discussions:** Asking questions, answering peers, discussing difficult concepts, and sharing study experiences.
- **Contributing learning resources:** Uploading and sharing useful academic documents with other students.
- **Managing academic information:** Maintaining an academic profile and recording course credits and grades.
- **Monitoring academic progress:** Reviewing completed courses and identifying remaining syllabus requirements.
- **Collaborating with peers:** Joining meeting rooms for real-time study group activities when necessary.

Through these activities, Studitopia aims to connect independent learning activities with collaborative academic experiences in a single platform.


### 2.1.3 Expected Benefits

Studitopia is expected to provide benefits to students through the integration of academic communities, learning resources, and personal progress management.

- **Centralized academic resources:** Students can access learning materials and past examination papers through an organized course-based structure instead of searching across unrelated platforms and scattered sources.
- **Improved knowledge sharing:** Course-centered discussions encourage students to exchange ideas, clarify difficult topics, and learn from the experiences of their peers.
- **Stronger academic connections:** Students from the same university or major can connect through shared academic interests and collaborate on learning activities.
- **Better academic self-management:** Students can maintain an overview of their completed courses, accumulated credits, grades, and remaining academic requirements.
- **Flexible learning collaboration:** Meeting rooms provide an additional way for students to collaborate synchronously when asynchronous discussions are insufficient.

Ultimately, Studitopia aims to establish a connected academic environment where students can discover knowledge, contribute resources, collaborate with peers, and manage their academic journey through one integrated platform.


### 2.2 Assumptions and Constraints

Assumptions:

- Users are undergraduate students enrolled at one of the partner universities.
- Users have access to a modern web browser and a stable internet connection.
- Staff members from partner universities may manage forums, update learning materials, moderate discussions, respond to students' questions, and monitor user activity.
- The team will follow the Scrum process with five sprints lasting about 12 weeks.
- The current sprint is Sprint 3.
- Sprint 1 and Sprint 2 scope and schedule remain frozen and unchanged from version 1.1.
- Meeting rooms are a middle-level feature and are not expected to reach the depth described in the original PA2 vision.

Constraints:

- Budget: student project with no dedicated funding; reliance on free and open-source tools.
- Staff: five team members balancing coursework and project work.
- Schedule: the project must be completed by the end of the semester (12 weeks).
- Platform: web browser only (no native mobile application in this phase).
- Technology: React + TypeScript + Vite (frontend), NestJS (backend), PostgreSQL (database only).
- Sprint 3 capacity: only authentication function groups and part of Forum Post can be completed.
- Meeting rooms must remain middle-level in scope; they must not displace forum and post work.

### 2.3 Project Deliverables

| Deliverable | Description | Target |
| --- | --- | --- |
| Project proposal | The main ideas and features of the proposed application | Sprint 1 (frozen) |
| Existing app survey | The survey about similar existing applications in the same domain | Sprint 1 (frozen) |
| Vision Document | High-level needs, features, and non-functional requirements | Sprint 2 (frozen) |
| Software Development Plan | Project plan covering organization, schedule, and control | Sprint 2 (frozen) |
| Spec Kit Artifacts | Constitution and initialization files under /src | Sprint 2 (frozen) |
| AI Usage Report and Weekly Report | AI usage log and sprint meeting documentation | Each sprint |
| Use-case model and specification | User interaction with system objects | Sprint 3 |
| Architecture diagram | The structure of the application in detail | Sprint 4 |
| Test cases and test plans | The detailed plan of the testing process | Sprint 5 |
| Final Product Demo | Demonstration of all project features | Sprint 5 |

### 2.4 Change Summary from Sprint 3

| Area | Previous Plan | Updated Plan | Reason |
| --- | --- | --- | --- |
| Sprint 3 | Forum creation, posts, comments, interactions, friend management, real-time messaging, and notifications | Complete authentication function groups and part of Forum Post | Actual Sprint 3 capacity is limited |
| Sprint 4 | Document sharing, file search, and meeting integration | Complete Forum and post features, Learning Resource Library, and Friend and Group Management | Forum and posts are the main functions after authentication |
| Sprint 5 | Integration testing, performance testing, bug fixing, and deployment | Basic meeting rooms at middle level, notifications, study planning if capacity allows, integration testing, and deployment | Meeting rooms are restored but kept moderate |
| Meeting rooms | Reduced and de-emphasized | Restored as a middle-level feature in Sprint 5 | Product decision to bring meeting rooms back without making them primary |

## 3. Project Organization
**Performed by:** [Bao] | **Reviewed by:** [An] | **Edited by:** [Bao]

### 3.1 Organizational Structure

The project manager creates tasks in Jira and assigns them to team members. Another member reviews the work for each task. The review authorities for each task are also assigned by the project manager. All members work as full-stack developers, but each has a specialty in one aspect, including frontend, testing, AI, UI design, database, and backend. The member specialized in an aspect proposes the overall structure and methods for implementing tasks relating to that aspect. Then, all members discuss and validate the proposed ideas.

### 3.2 Roles and Responsibilities

| Person | Role |
| --- | --- |
| Nguyen Thanh An | Frontend Developer: Responsible for proposing methods to implement UI, designing UI components and their relations |
| Nguyen Chi Bao | Tester and AI Developer: Responsible for designing tests and architecture of the AI server, researching suitable AI models for available hardware, and designing processes to process data from multiple users concurrently |
| Tran Nguyen Khanh Binh | UI Designer: Responsible for designing the overall look of the UI, including its components, pages, and workflow |
| Tran Canh Anh Tuan | Database Manager: Responsible for determining the EER model and establishing the relational schema while ensuring appropriate normal form and usability |
| Nguyen Le Quoc Huy | Backend Developer: Responsible for designing the backend API, communication with the frontend, connection with the database, and AI server integration |

## 4. Management Process
**Performed by:** [An] | **Reviewed by:** [Huy] | **Edited by:** [An]

### 4.1 Project Estimates

#### Estimated Cost

The project reuses existing infrastructure and open-source technologies, so the estimated additional development cost is **0 VND**.

| Item | Estimated Cost | Explanation |
| --- | ---: | --- |
| Server / Hosting | 0 VND | Our group hosts a server on our laptop. |
| Domain | 0 VND | Domain has already been purchased. |
| File Storage | 0 VND | Existing storage is available on the server. |
| Database (PostgreSQL) | 0 VND | Open-source database. |
| Backend (NestJS) | 0 VND | Open-source framework. |
| Frontend (React + Vite) | 0 VND | Open-source technologies. |
| Real-time Communication | 0 VND | Implemented using WebSocket libraries. |
| Development and Testing Tools | 0 VND | Free or open-source tools will be used. |

Additional costs may arise if the existing server or storage cannot handle the expected workload or if paid third-party services are required. These expenses will be estimated separately when necessary.

#### Estimated Schedule

The project is expected to take **12 weeks**, divided into five sprints. Sprint 1 and Sprint 2 are done and frozen. Sprint 3 is the current sprint.

| Sprint | Duration | Main Activities |
| --- | --- | --- |
| Sprint 1 | Week 1-3 | **Frozen:** Requirement analysis, system architecture, database design, and project setup. |
| Sprint 2 | Week 4-5 | **Frozen:** Authentication, user profiles, and university management. |
| Sprint 3 | Week 6-8 | **Current:** Complete authentication function groups and part of Forum Post. |
| Sprint 4 | Week 9-10 | Complete Forum and post features, Learning Resource Library, and Friend and Group Management and inclusion of AI-powered featured. |
| Sprint 5 | Week 11-12 | Basic meeting rooms at middle level, notifications, integration testing, performance testing, bug fixing, and deployment. |

#### Re-estimation Situation

Cost and schedule estimates should be reviewed at the end of each sprint and whenever significant changes occur.

Re-estimation is necessary in the following situations:

- **Scope changes:** New features or changes to existing requirements increase development effort.
- **Technical difficulties:** Unexpected problems with WebSocket, database performance, file sharing, or system integration delay implementation.
- **Infrastructure limitations:** Existing server or storage cannot satisfy performance or capacity requirements, requiring additional resources.
- **Schedule deviations:** Actual progress differs significantly from the planned milestones, such as a delay exceeding one week.
- **External dependencies:** Third-party services introduce additional fees, usage limits, or compatibility issues.
- **Priority changes:** Forum and post work must be protected from lower-priority work such as extended meeting-room features.

During re-estimation, the team will compare actual progress and expenses against the initial plan, estimate the remaining work, and adjust the schedule or budget accordingly.

### 4.2 Project Plan

#### 4.2.1 Phase Plan

The project is divided into the following major work packages:

- **Project Planning:** Requirement analysis, scope definition, project setup, and architecture design. (Sprint 1, frozen)
- **User Management:** Registration, authentication, user profiles, and university management. (Sprint 2, frozen)
- **Authentication Completion and Forum Post Foundation:** Finish authentication function groups and implement part of Forum Post. (Sprint 3, current)
- **Forum and Social Features:** Complete forum posts, comments, interactions, search, recommendations, friend requests, and friend management. (Sprint 4)
- **Document Management:** Document upload/download, sharing, public library, and file search. (Sprint 4)
- **Meeting and Administration:** Basic meeting-room discovery, participation, and core collaboration tools; content moderation. (Sprint 5)
- **Testing and Deployment:** Integration testing, performance testing, bug fixing, deployment, and documentation. (Sprint 5)

The project is planned for **12 weeks**, divided into five sprints. Sprint 1 and Sprint 2 are frozen.

| Activities | W1-3 | W4-5 | W6-8 | W9-10 | W11-12 |
| --- | :---: | :---: | :---: | :---: | :---: |
| Requirement Analysis and Architecture (frozen) | x | | | | |
| Database Design and Project Setup (frozen) | x | | | | |
| Authentication and User Profiles (frozen) | | x | | | |
| University Management (frozen) | | x | | | |
| Complete Authentication Function Groups | | | x | | |
| Partial Forum Post (post list, create post, post detail) | | | x | | |
| Complete Forum Posts and Interactions | | | | x | |
| Forum Search and Recommendations | | | | x | |
| Learning Resource Library and File Search | | | | x | |
| Friend and Group Management | | | | x | |
| Basic Meeting Rooms (middle level) | | | | | x |
| AI-powered features | | | | x | |
| Notifications | | | | | x |
| Integration Testing | | | | | x |
| Performance Testing | | | | | x |
| Bug Fixing and Deployment | | | | | x |

After these sprints, the project must achieve the major milestones below with the following criteria:

- **Project foundation completion:** Requirements, architecture, database design, and development environment are ready. (Sprint 1, frozen)
- **User management completion:** Users can register, log in, manage profiles, and access university-related features. (Sprint 2, frozen)
- **Authentication and forum foundation completion:** Authentication function groups are complete, and the basic Forum Post workflow is available. (Sprint 3)
- **Core platform completion:** Forum posts, interactions, search, recommendations, library, social features and AI-powered features work correctly. (Sprint 4)
- **MVP completion:** Basic meeting rooms, notifications, integration testing, performance testing, bug fixing, and deployment are complete. (Sprint 5)

Corresponding with each milestone, the following demos must be released:

| Release | Target | Scope and Purpose |
| --- | --- | --- |
| User Management Demo | End of Week 5 | Demonstrate authentication, user profiles, and university management. (Frozen) |
| Forum Foundation Demo | End of Week 8 | Demonstrate completed authentication and the basic Forum Post workflow. |
| Core Platform Demo | End of Week 10 | Demonstrate completed forum, posts, library, search (including AI-powered search), recommendations, and social features. |
| Final Release: MVP | End of Week 12 | Demonstrate basic meeting rooms, notifications, and the complete user workflow. |

Each demo will be followed by feedback collection and backlog updates. The final release is accepted when all agreed MVP requirements are implemented, critical defects are resolved, and the application passes the required tests.

#### 4.2.2 Iteration Objectives

Each iteration focuses on delivering a specific set of functionalities and achieving measurable development objectives.

| Iteration | Duration | Objectives |
| --- | --- | --- |
| **Sprint 1** | Week 1-3 | **Frozen:** Analyze and finalize project requirements. Define the system architecture and technology stack. Design the database schema and main data relationships. Set up the development environment, project structure, and version control workflow. |
| **Sprint 2** | Week 4-5 | **Frozen:** Implement user registration, login, and authentication. Develop user profile management. Implement university management and associate users with their universities. Establish basic role-based access control. |
| **Sprint 3** | Week 6-8 | **Current sprint:** Complete the authentication function groups. Implement part of Forum Post: forum post list, discussion post creation, material post creation, basic post detail, and university-major-course navigation. Move comments, voting, true-response marking, moderation, search, recommendations, library, social features, meeting rooms, study planning, and notifications to later sprints. |
| **Sprint 4** | Week 9-10 | Complete Forum and post features: all post types, comments and answers, voting, true-response marking, save, report and moderation, search, recommendations, and post filters. Complete AI augmentation for search and recommendation.Implement the Learning Resource Library, file upload and search, and Friend and Group Management. |
| **Sprint 5** | Week 11-12 | Implement basic meeting rooms at middle level: room discovery, create or join room, and core collaboration tools such as shared whiteboard, shared notes, and shared timer. Implement notifications and study planning if capacity allows. Perform integration testing, performance testing, bug fixing, and deployment. |

At the end of the project, the team expects to deliver a functional MVP that supports university-based communities, forum posts, social interactions, document sharing, and basic online meeting support. The application will be deployed and validated through the agreed testing activities.

#### 4.2.3 Releases

The project will follow an incremental release approach. Each release introduces additional functionality and allows stakeholders to review the system before the final deployment.

| Release | Target | Release Type | Description |
| --- | --- | --- | --- |
| **Release 0.1** | End of Week 5 | Alpha | **Frozen:** Introduces user registration, authentication, profile management, and university management. |
| **Release 0.2** | End of Week 8 | Alpha | Introduces completed authentication function groups and the basic Forum Post workflow. |
| **Release 0.3** | End of Week 10 | Beta | Adds completed forum posts, comments, voting, true-response marking, moderation, search, recommendations, library, and social features, integrate AI into search and recommendation features. |
| **Release 1.0** | End of Week 12 | Initial Production Release (MVP) | Provides basic meeting rooms at middle level, notifications, and the complete agreed MVP after integration testing, performance testing, and critical bug fixing. |

Each release will be reviewed through a demonstration. Feedback and identified issues will be recorded and prioritized for subsequent iterations.

#### 4.2.4 Project Schedule

The project is scheduled to be completed within **12 weeks**, consisting of five development iterations. The following table summarizes the target completion time for each iteration, release, demonstration, and major milestone.

| Week | Activity / Milestone | Deliverable / Release | Event Type |
| --- | --- | --- | --- |
| Week 1-3 | Requirement analysis, architecture design, database design, and project setup | System foundation | Sprint 1 Completion (frozen) |
| End of Week 3 | M1: Project Foundation Completed | Approved requirements, architecture, and database schema | Milestone and Demo 1 (frozen) |
| Week 4-5 | Authentication, user profiles, and university management | Release 0.1 - Alpha | Sprint 2 Completion (frozen) |
| End of Week 5 | M2: User Management Completed | Functional user and university management | Milestone and Demo 2 (frozen) |
| Week 6-8 | Complete authentication function groups and partial Forum Post | Release 0.2 - Alpha | Sprint 3 Completion (current) |
| End of Week 8 | M3: Authentication and Forum Foundation Completed | Working authentication and basic Forum Post workflow | Milestone and Demo 3 |
| Week 9-10 | Complete forum and post features, library, search, recommendations, social features and AI-powered features | Release 0.3 - Beta | Sprint 4 Completion |
| End of Week 10 | M4: Core Platform Completed | Functional forum, post, library, and social features | Milestone and Demo 4 |
| Week 11-12 | Basic meeting rooms, notifications, integration testing, performance testing, bug fixing, and deployment | Release 1.0 - MVP | Sprint 5 Completion |
| End of Week 12 | M5: MVP Released | Tested and deployed application | Final Release and Demo 5 |

Progress will be reviewed at the end of each iteration. Any significant deviation from the planned milestones will trigger a schedule review and necessary adjustments.

#### 4.2.5 Project Resourcing

The following table describes the required roles, estimated staffing, and necessary skills:

| Role | Number of Staff | Required Skills and Responsibilities |
| --- | ---: | --- |
| Project Manager | 1 | Project planning, progress tracking, risk management, documentation, and team coordination. |
| Backend Developer | 1-2 | NestJS, TypeScript, REST APIs, authentication, WebSocket, and backend architecture. |
| Frontend Developer | 1-2 | React, TypeScript, Vite, UI development, state management, and API integration. |
| Database Engineer | 1 | PostgreSQL, relational database design, SQL, query optimization, indexing, and data management. |
| AI Engineer | 1 | Python, natural language processing, document encoding, model integration, AI APIs, and basic model evaluation. |
| QA and Testing Engineer | 1 | Test case design, functional testing, integration testing, bug reporting, and performance testing. |
| DevOps and Deployment Engineer | 1 | Linux server administration, environment configuration, deployment, and basic system monitoring. |

These roles represent the required areas of responsibility rather than separate full-time positions. Depending on the actual team size, members may take on multiple roles.

The role and responsibilities of team members will be assigned and distributed following these steps:

1. Identify each member's existing technical knowledge, practical experience, and areas of interest.
2. Evaluate their suitability for the required roles based on relevant skills and previous projects.
3. Assign roles according to individual strengths while ensuring that all required technical areas are covered.
4. Encourage knowledge sharing and collaboration to reduce dependency on individual members.
5. Review team capacity and role suitability throughout the project, adjusting responsibilities when necessary.

Team members may need additional training to ensure consistent development practices and sufficient technical knowledge.

| Training Topic | Target Participants | Target Completion |
| --- | --- | --- |
| Git workflow, branching strategy, and Pull Requests | All team members | Week 1 (frozen) |
| NestJS, React, TypeScript, and project architecture | Backend and frontend developers | Week 2 (frozen) |
| PostgreSQL, database design, indexing, and query optimization | Database and backend developers | Week 3 (frozen) |
| Model researching, AI usage pipeline designing and AI model/API integration | AI Engineer | Week 4 (frozen) |
| WebSocket and real-time communication | Backend and frontend developers | Week 5 (frozen) |
| Forum post model, comments, voting, and moderation | All team members | Week 6 |
| File upload, storage, and access control | Backend and database developers | Week 9 |
| Functional, integration, and performance testing | All team members, especially QA | Week 11 |
| Linux deployment and server configuration | DevOps and Deployment Engineer | Week 11 |

Training will primarily use official documentation, online tutorials, and practical exercises. Team members are expected to complete the relevant training before starting tasks that depend on those skills.

### 4.3 Project Monitoring and Control

#### 4.3.1 Requirements Management

System requirements are documented in the Vision Document. Progress is reviewed at the end of each sprint based on the number of requirements implemented and verified. Any proposed changes, additions, or removals must be submitted as Change Requests and reviewed through the Configuration Management process. Their impact on project scope and schedule will be evaluated before approval. Approved changes will be reflected in the Vision Document and project backlog to ensure that all requirements remain consistent and traceable.

From Sprint 3 onward, requirements are prioritized as follows:

1. Authentication function groups.
2. Forum and related post features.
3. Learning Resource Library and social features.
4. Basic meeting rooms at middle level.
5. Study planning and notifications.
6. Optional enhancements.

This priority order protects the core forum experience and prevents middle-level meeting-room work from displacing forum work.

#### 4.3.2 Reporting and Measurement

The team will generate weekly progress reports to track completed tasks, ongoing activities, issues, and upcoming work. At the end of each sprint, a review report will be shared with team members and stakeholders to summarize deliverables, feedback, and project progress. A final project report will be prepared at the end of Week 12.

The following metrics will be collected to monitor project performance:

| Metric | Purpose |
| --- | --- |
| Completed Tasks | Measure development progress. |
| Requirements Implemented | Track progress against the project scope. |
| Open and Closed Defects | Monitor software quality and issue resolution. |
| Test Cases Passed | Evaluate system correctness and readiness. |
| Schedule Variance | Identify delays compared to the planned schedule. |
| Actual Expenses | Monitor project spending against the estimated budget. |
| Forum Post Progress | Track completion of the primary product feature. |
| Meeting Room Scope | Confirm that meeting-room work remains middle-level. |

Reports will be maintained in the shared project workspace and distributed to relevant team members and stakeholders.

#### 4.3.3 Risk Management

Project risks will be identified at the beginning of the project and reviewed at the end of each sprint. Each risk will be assessed based on its likelihood and potential impact, then prioritized as High, Medium, or Low. The Project Manager will maintain the risk register and monitor mitigation actions throughout the project.

| Risk Ranking | Risk Description and Impact | Mitigation Strategy and/or Contingency Plan |
| --- | --- | --- |
| High | **Sprint 3 capacity risk:** Authentication completion and partial Forum Post may take longer than expected. | Freeze lower-priority work, limit Sprint 3 to the defined scope, and move unfinished work to Sprint 4 or Sprint 5. |
| High | **Forum post complexity:** Functional posts, prerequisite trees, and moderation may be more complex than estimated. | Prioritize basic discussion and material posts first; defer advanced functional tools if necessary. |
| High | **Technical integration issues:** Backend, frontend, database, and AI components may not integrate correctly. | Define interfaces early, design clear AI pipeline and perform integration testing throughout development. |
| High | **Schedule compression:** Moving work to later sprints may overload Sprint 4 and Sprint 5. | Re-estimate at the end of Sprint 3 and defer optional features rather than core forum features. |
| Medium | **Meeting-room scope creep:** Restored meeting rooms may expand beyond the middle-level target. | Limit meeting rooms to discovery, create or join, and core tools; defer advanced room policies and matching. |
| Medium | **Security vulnerabilities:** Improper authentication or access control may expose user data. | Apply input validation, authentication, authorization, and security testing. |
| Medium | **Data loss:** Database or file storage failures may result in lost user data. | Perform regular backups and test data recovery procedures. |
| Medium | **Requirement changes:** New requirements may increase workload and delay development. | Review Change Requests and evaluate their impact before approval. |
| Low | **Team coordination issues:** Poor communication may reduce development efficiency. | Assign clear responsibilities and hold regular progress meetings. |

#### 4.3.4 Configuration Management

Git will be used for version control, while a shared issue-tracking system will be used to manage problems and change requests. All reported issues and proposed changes must be reviewed and approved before implementation. Approved changes will be developed in separate branches, tested, and merged through Pull Requests.

Project artifacts, including source code, database migrations, test scripts, documentation, and configuration files, will be organized using consistent naming conventions. Git tags will identify important versions and releases (for example, `v0.1.0` and `v1.0.0`). Dependencies will be tracked using package manifests and lock files.

Source code and documentation will be stored in the shared Git repository and cloud storage. Important project files and database data will be backed up periodically. In case of data loss, the team will restore files from the latest stable Git version or available backups. Final source code, documentation, test results, and release artifacts will be archived after project completion for future maintenance.

## Project Close-out

The project will be formally closed after the MVP has been deployed and the final deliverables have been reviewed and accepted.

The following activities will be performed to ensure an orderly project completion:

1. **Final Acceptance:** Verify that the completed system meets the agreed MVP requirements. Conduct a final demonstration and obtain confirmation from relevant stakeholders.

2. **Documentation and Archiving:** Complete technical documentation, user guides, database designs, API documentation, and deployment instructions. Archive the source code, project documents, test results, and reports in the shared project repository.

3. **Final Testing and Reporting:** Summarize testing results, completed features, unresolved issues, and any deviations from the original plan. Prepare a final project report covering project outcomes, schedule performance, and actual expenses.

4. **Post-mortem Review:** Hold a final meeting to evaluate what went well, what challenges occurred, and what could be improved in future projects. Record lessons learned for future development.

5. **Team Reassignment and Resource Release:** Since this is a student project, team members will be released from their assigned project responsibilities.

## Appendix A: Sprint 3 Onward Work Distribution

The following table records the priority-based distribution of work after Sprint 2.

| Priority | Work Item | Target Sprint | Notes |
| --- | --- | --- | --- |
| 1 | Complete authentication function groups | Sprint 3 | Registration, login, logout, session, OTP, password recovery, account deletion, and Google authentication. |
| 2 | Partial Forum Post | Sprint 3 | Forum navigation, post list, discussion post creation, material post creation, and basic post detail. |
| 3 | Complete Forum and post features | Sprint 4 | Comments, answers, voting, true-response marking, save, report, moderation, filters, search, and recommendations. |
| 4 | Learning Resource Library | Sprint 4 | Upload, search, access, download, and resource management. |
| 5 | Friend and Group Management | Sprint 4 | Friend requests, friend list, groups, messaging, and document sharing in groups. |
| 6 | Basic meeting rooms at middle level | Sprint 5 | Room discovery, create or join, and core collaboration tools. |
| 7 | Notifications | Sprint 5 | Forum, social, and basic room notifications. |
| 8 | Study planning | Sprint 5 if capacity allows | Course planning and credit tracking are retained but lower priority. |
| 9 | Integration, testing, and deployment | Sprint 5 | Final MVP verification and release. |