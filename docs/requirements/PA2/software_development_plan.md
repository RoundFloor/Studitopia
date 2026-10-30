# Group 5 - Alien Force

# Studitopia <br> Development Plan (Small Project)

### **Version:** <1.1>

## Revision History

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 29/Oct/2026 | 1.0 | Initial draft | Tran Canh Anh Tuan |
| 30/Oct/2026 | 1.1 | Plan the software development | Nguyen Thanh An |

## 1. Introduction
**Performed by:** [Tuan] | **Reviewed by:** [An] | **Edited by:** [An]

This section provides an overview of the entire document. It includes the purpose, scope, definitions, acronyms, abbreviations, references, and overview of this plan.

### 1.1 Purpose

The purpose of this document is to gather all information necessary to control the project. It describes the approach to the development of the software and direct the development effort of the group.

The following people use the Software Development Plan:

- The product owner, scrum master and project manager use it to plan the project schedule and resource needs, and to track progress against the schedule.

- Project team members use it to understand what they need to do, when they need to do it, and what other activities they are dependent upon.

### 1.2 Scope

This document describes the overall plan to be used by the Studitopia project, including development, testing and deployment of the product which are interleaved in small iterations. The details of the individual iterations will be described in the Iteration Plans.

The plans as outlined in this document are based upon the product requirements as defined in the Vision Document.

### 1.3 Overview

The rest of this plan contains the following information:

- **Project Overview** provides a description of the project's purpose, scope, and objectives. It also defines the deliverables that the project is expected to deliver.
- **Project Organization** describes the organizational structure of the project team.
- **Project Plan** contains the schedule and resources with their achievement criteria.
- **Project Monitoring and Control** describes how the project will be monitored and controlled.

## 2. Project Overview
**Performed by:** [Tuan] | **Reviewed by:** [An] | **Edited by:** [An]

### 2.1 Project Purpose, Scope, and Objectives

Studitopia is a collaborative learning forum focused mainly on undergraduate students across several partner universities. The platform is organized as a forum with many sub-forums by major, and each major contains many courses. Users can join the forum to search for learning materials and past papers, and to discuss with other students about the learning process, study tips, and related topics. Users can share materials, host meetings within the forum, and track their personal progress against their university syllabus by recording credits and grades to see completed coursework and remaining requirements.

Objectives:

- Provide a course-centered forum where undergraduate students can access materials and past papers by major and course.
- Enable discussion and knowledge sharing among students about the learning process and study tips.
- Allow users to share learning materials and host meetings within the forum.
- Offer a progress tracking system tied to each university syllabus, where users input credits and grades to view their academic standing.

### 2.2 Assumptions and Constraints

Assumptions:

- Users are undergraduate students enrolled at one of the partner universities.
- Users have access to a modern web browser and a stable internet connection.
- Staff members from partner universities may manage forums, update learning materials, moderate discussions, respond to students’ questions, and monitor user activity.
- The team will follow the Scrum process with 5 sprints which last about 12 weeks.

Constraints:

- Budget: student project with no dedicated funding; rely on free/open-source tools.
- Staff: 5 team members balancing coursework and project work.
- Schedule: project must be completed by the end of the semester (12 weeks).
- Platform: web browser only (no native mobile application in this phase).
- Technology: React + TypeScript + Vite (frontend), NestJS (backend), PostgreSQL (database only).

### 2.3 Project Deliverables

| Deliverable | Description | Target |
|-------------|-------------|--------|
| Project proposal | The main ideas and features of the proposed application  | Sprint 1 |
| Existing app survey | The survey about similar existing applications in the same domain | Sprint 1 | 
| Vision Document | High-level needs, features, and non-functional requirements | Sprint 2 |
| Software Development Plan | Project plan covering organization, schedule, and control | Sprint 2 |
| Spec Kit Artifacts | Constitution and initialization files under /src | Sprint 2 |
| AI Usage Report & Weekly Report | AI usage log and sprint meeting documentation | Each sprint |
| Use-case model and specification | User interaction with system object | Sprint 3 |
| Architecture diagram | The structure of the application in detail | Sprint 4 |
| Test cases and test plans | The detailed plan of testing process | Sprint 5 (final sprint) |
| Final Product Demo | Demonstration of all project features | Sprint 5 (final sprint) |

## 3. Project Organization
**Performed by:** [Bao] | **Reviewed by:** [An] | **Edited by:** []

### 3.1 Organizational Structure

Describe the organizational structure of the project team, including management and other review authorities.

### 3.2 Roles and Responsibilities

Identify the project organizational units that will be responsible for each of the disciplines, workflow details, and supporting processes.

| Person | Role |
|--------|------|
|  |  |

Responsible for maintaining the Project web site, assisting the Project Manager role in planning/scheduling activities, and assisting the Change Control Manager role in controlling changes to artifacts. May also provide assistance to other roles as necessary.

## 4. Management Process
**Performed by:** [An] | **Reviewed by:** [Huy] | **Edited by:** []

### 4.1 Project Estimates


#### Estimated cost

The project reuses existing infrastructure and open-source technologies, so the estimated additional development cost is **0 VND**.

| Item | Estimated Cost | Explanation |
|---|---:|---|
| Server / Hosting | 0 VND | Our group owns server for hosting . |
| Domain | 0 VND | Domain has already been purchased. |
| File Storage | 0 VND | Existing storage is available in the server. |
| Database (PostgreSQL) | 0 VND | Open-source database. |
| Backend (NestJS) | 0 VND | Open-source framework. |
| Frontend (React + Vite) | 0 VND | Open-source technologies. |
| Real-time Communication | 0 VND | Implemented using WebSocket libraries. |
| Development and Testing Tools | 0 VND | Free or open-source tools will be used. |

Additional costs may arise if the existing server or storage cannot handle the expected workload, or if paid third-party services are required. These expenses will be estimated separately when necessary.

#### Estimated schedule 

The project is expected to take **12 weeks**, divided into five two-week sprints.

| Sprint | Duration | Main Activities |
|---|---|---|
| Sprint 1 | Week 1–3 | Requirement analysis, system architecture, database design, and project setup. |
| Sprint 2 | Week 4–5 | Authentication, user profiles, and university management. |
| Sprint 3 | Week 6–8 | Forums, posts, comments, interactions, and real-time private/group messaging and notifications. |
| Sprint 4 | Week 9–11 | Document sharing, file search, meeting integration. |
| Sprint 6 | Week 12 | Integration testing, performance testing, bug fixing, and deployment. |

#### Re-estimation Situation

Cost and schedule estimates should be reviewed at the end of each sprint and whenever significant changes occur.

Re-estimation is necessary in the following situations:

- **Scope changes**: New features or changes to existing requirements increase development effort.
- **Technical difficulties**: Unexpected problems with WebSocket, database performance, file sharing, or system integration delay implementation.
- **Infrastructure limitations**: Existing server or storage cannot satisfy performance or capacity requirements, requiring additional resources.
- **Schedule deviations**: Actual progress differs significantly from the planned milestones, such as a delay exceeding one week.
- **External dependencies**: Third-party services introduce additional fees, usage limits, or compatibility issues.

During re-estimation, we will compare actual progress and expenses against the initial plan, estimate the remaining work, and adjust the schedule or budget accordingly.

### 4.2 Project Plan

#### 4.2.1 Phase Plan

The project is divided into the following major work packages:

- **Project Planning**: Requirement analysis, scope definition, project setup, and architecture design.
- **User Management**: Registration, authentication, user profiles, and university management.
- **Forum and Social Features**: Forums, posts, comments, interactions, friend requests, and friend management.
- **Real-time Communication**: Private/group messaging, file sharing, and notifications.
- **Document Management**: Document upload/download, sharing, public library, and file search.
- **Meeting and Administration**: Meeting integration, staff management, roles, and content moderation.
- **Testing and Deployment**: Integration testing, performance testing, bug fixing, deployment, and documentation.

The project is planned for **12 weeks**, divided into five sprints.

| Activities | W1–3 | W4–5 | W6–8 | W9–11 | W12 |
|---|:---:|:---:|:---:|:---:|:---:|
| Requirement Analysis & Architecture | ■ | | | | |
| Database Design & Project Setup | ■ | | | | |
| Authentication & User Profiles | | ■ | | | |
| University Management | | ■ | | | |
| Forums, Posts & Comments | | | ■ | | |
| Real-time Messaging & Notifications | | | ■ | | |
| Document Sharing & File Search | | | | ■ | |
| Meeting Integration | | | | ■ | |
| Integration Testing | | | | | ■ |
| Performance Testing | | | | | ■ |
| Bug Fixing & Deployment | | | | | ■ |

After these sprints, the project must achieve the major milestones below with following criteria:

- Project foundation completion: Requirements, architecture, database design, and development environment are ready.

- User management completion: Users can register, log in, manage profiles, and access university-related features.

- Core platform completion: Forums, social interactions, real-time messaging, and notifications work correctly.

- Main features completion: Document sharing, file search, and meeting integration are functional.

Corresponding with each milestones, the following demo must be released:

| Release | Target | Scope and Purpose |
|---|---|---|
| User Management | End of Week 5 | Demonstrate authentication, user profiles, and university management. |
| Core Platform | End of Week 7 | Demonstrate forums, social interactions, real-time messaging, and notifications. |
| Feature Complete | End of Week 9 | Demonstrate document management, file search, and meeting integration. |
| Final Release: MVP | End of Week 12 | Deploy the application and demonstrate the complete user workflow. |

Each demo will be followed by feedback collection and backlog updates. The final release is accepted when all agreed MVP requirements are implemented, critical defects are resolved, and the application passes the required tests.

#### 4.2.2 Iteration Objectives

Each iteration focuses on delivering a specific set of functionalities and achieving measurable development objectives.

| Iteration | Duration | Objectives |
|---|---|---|
| **Sprint 1** | Week 1–3 | - Analyze and finalize project requirements.<br>- Define the system architecture and technology stack.<br>- Design the database schema and main data relationships.<br>- Set up the development environment, project structure, and version control workflow. |
| **Sprint 2** | Week 4–5 | - Implement user registration, login, and authentication.<br>- Develop user profile management.<br>- Implement university management and associate users with their universities.<br>- Establish basic role-based access control. |
| **Sprint 3** | Week 6–8 | - Implement forum creation and management.<br>- Develop post creation, comments, and user interactions.<br>- Implement friend requests and friend management.<br>- Develop real-time private and group messaging using WebSocket.<br>- Implement basic message notifications. |
| **Sprint 4** | Week 9–11 | - Implement document upload and download.<br>- Enable document sharing in forums and conversations.<br>- Develop the public document library and file search functionality.<br>- Integrate external meeting services through meeting links. |
| **Sprint 5** | Week 12 | - Integrate all system modules and verify end-to-end workflows.<br>- Perform functional, integration, and performance testing.<br>- Evaluate system behavior under expected concurrent workloads.<br>- Fix critical bugs and improve system stability.<br>- Deploy the MVP and prepare technical documentation. |

At the end of the project, the team expects to deliver a functional MVP that supports university-based communities, social interactions, real-time communication, document sharing, and online meeting integration. The application will be deployed and validated through the agreed testing activities.

#### 4.2.3 Releases

The project will follow an incremental release approach. Each release introduces additional functionality and allows stakeholders to review the system before the final deployment.

| Release | Target | Release Type | Description |
|---|---|---|---|
| **Release 0.1** | End of Week 5 | Alpha | Introduces user registration, authentication, profile management, and university management. |
| **Release 0.2** | End of Week 7 | Alpha | Adds forum functionality, social interactions, real-time private/group messaging, and notifications. |
| **Release 0.3** | End of Week 9 | Beta | Includes document management, file sharing, file search, and external meeting integration. The main features are available for integrated testing and stakeholder feedback. |
| **Release 1.0** | End of Week 12 | Initial Production Release (MVP) | Provides the complete agreed MVP after integration testing, performance testing, and critical bug fixing. The application is deployed for initial use. |

Each release will be reviewed through a demonstration. Feedback and identified issues will be recorded and prioritized for subsequent iterations.

#### 4.2.4 Project Schedule

The project is scheduled to be completed within **12 weeks**, consisting of five development iterations. The following table summarizes the target completion time for each iteration, release, demonstration, and major milestone.

| Week | Activity / Milestone | Deliverable / Release | Event Type |
|---|---|---|---|
| Week 1–3 | Requirement analysis, architecture design, database design, and project setup | System foundation | Sprint 1 Completion |
| End of Week 3 | M1: Project Foundation Completed | Approved requirements, architecture, and database schema | Milestone + Demo 1 |
| Week 4–5 | Authentication, user profiles, and university management | Release 0.2 – Alpha | Sprint 2 Completion |
| End of Week 5 | M2: User Management Completed | Functional user and university management | Milestone + Demo 2 |
| Week 6–8 | Forums, social interactions, real-time messaging, and notifications | Release 0.3 – Alpha | Sprint 3 Completion |
| End of Week 7 | M3: Core Platform Completed | Functional forum and communication features | Milestone + Demo 3 |
| Week 9-11 | Document sharing, file search, and meeting integration | Release 0.4 – Beta | Sprint 4 Completion |
| End of Week 9 | M4: Main Features Completed | All planned core features implemented | Milestone + Demo 4 |
| Week 12 | Integration testing, performance testing, bug fixing, and deployment | Release 1.0 – MVP | Sprint 5 |
| End of Week 12 | M5: MVP Released | Tested and deployed application | Final Release + Demo 5 |

Progress will be reviewed at the end of each iteration. Any significant deviation from the planned milestones will trigger a schedule review and necessary adjustments.

#### 4.2.5 Project Resourcing

The following table describes the required roles, estimated staffing, and necessary skills:

| Role | Number of Staff | Required Skills and Responsibilities |
|---|---:|---|
| Project Manager | 1 | Project planning, progress tracking, risk management, documentation, and team coordination. |
| Backend Developer | 1–2 | NestJS, TypeScript, REST APIs, authentication, WebSocket, and backend architecture. |
| Frontend Developer | 1–2 | React, TypeScript, Vite, UI development, state management, and API integration. |
| Database Engineer | 1 | PostgreSQL, relational database design, SQL, query optimization, indexing, and data management. |
| AI Engineer | 1 | Python, machine learning fundamentals, model integration, AI APIs, and basic model evaluation. |
| QA / Testing Engineer | 1 | Test case design, functional testing, integration testing, bug reporting, and performance testing. |
| DevOps / Deployment Engineer | 1 | Linux server administration, environment configuration, deployment, and basic system monitoring. |

These roles represent the required areas of responsibility rather than separate full-time positions. Depending on the actual team size, members may take on multiple roles.

The role and responsibilities of team members will be assigned and distributed following these steps:

1. Identify each member's existing technical knowledge, practical experience, and areas of interest.
2. Evaluate their suitability for the required roles based on relevant skills and previous projects.
3. Assign roles according to individual strengths while ensuring that all required technical areas are covered.
4. Encourage knowledge sharing and collaboration to reduce dependency on individual members.
5. Review team capacity and role suitability throughout the project, adjusting responsibilities when necessary.

Team members may need additional training to ensure consistent development practices and sufficient technical knowledge.

| Training Topic | Target Participants | Target Completion |
|---|---|---|
| Git workflow, branching strategy, and Pull Requests | All team members | Week 1 |
| NestJS, React, TypeScript, and project architecture | Backend and frontend developers | Week 2 |
| PostgreSQL, database design, indexing, and query optimization | Database and backend developers | Week 3 |
| Machine learning fundamentals and AI model/API integration | AI Engineer | Week 4 |
| WebSocket and real-time communication | Backend and frontend developers | Week 5 |
| File upload, storage, and access control | Backend and database developers | Week 7 |
| Functional, integration, and performance testing | All team members, especially QA | Week 9 |
| Linux deployment and server configuration | DevOps / Deployment Engineer | Week 10 |

Training will primarily use official documentation, online tutorials, and practical exercises. Team members are expected to complete the relevant training before starting tasks that depend on those skills.

### 4.3 Project Monitoring and Control

#### 4.3.1 Requirements Management

System requirements are documented in the Vision Document. Progress is reviewed at the end of each sprint based on the number of requirements implemented and verified. Any proposed changes, additions, or removals must be submitted as Change Requests and reviewed through the Configuration Management process. Their impact on project scope and schedule will be evaluated before approval. Approved changes will be reflected in the Vision Document and project backlog to ensure that all requirements remain consistent and traceable.

#### 4.3.2 Reporting and Measurement

The team will generate weekly progress reports to track completed tasks, ongoing activities, issues, and upcoming work. At the end of each sprint, a review report will be shared with team members and stakeholders to summarize deliverables, feedback, and project progress. A final project report will be prepared at the end of Week 12.

The following metrics will be collected to monitor project performance:

| Metric | Purpose |
|---|---|
| Completed Tasks | Measure development progress. |
| Requirements Implemented | Track progress against the project scope. |
| Open and Closed Defects | Monitor software quality and issue resolution. |
| Test Cases Passed | Evaluate system correctness and readiness. |
| Schedule Variance | Identify delays compared to the planned schedule. |
| Actual Expenses | Monitor project spending against the estimated budget. |

Reports will be maintained in the shared project workspace and distributed to relevant team members and stakeholders.

#### 4.3.3 Risk Management

Project risks will be identified at the beginning of the project and reviewed at the end of each sprint. Each risk will be assessed based on its likelihood and potential impact, then prioritized as High, Medium, or Low. The Project Manager will maintain the risk register and monitor mitigation actions throughout the project.

| Risk Ranking | Risk Description and Impact | Mitigation Strategy and/or Contingency Plan |
|---|---|---|
| High | **Schedule delays:** Complex features may take longer than expected, affecting the final release. | Prioritize core features, monitor weekly progress, and defer non-essential features if necessary. |
| High | **Performance issues:** The system may not meet the targets of 2,000 concurrent users and 10,000 requests per second. | Conduct load testing, optimize database queries and APIs, and upgrade infrastructure if necessary. |
| High | **Technical integration issues:** Backend, frontend, database, and AI components may not integrate correctly. | Define interfaces early and perform integration testing throughout development. |
| Medium | **Security vulnerabilities:** Improper authentication or access control may expose user data. | Apply input validation, authentication, authorization, and security testing. |
| Medium | **Data loss:** Database or file storage failures may result in lost user data. | Perform regular backups and test data recovery procedures. |
| Medium | **Requirement changes:** New requirements may increase workload and delay development. | Review Change Requests and evaluate their impact before approval. |
| Low | **Team coordination issues:** Poor communication may reduce development efficiency. | Assign clear responsibilities and hold regular progress meetings. |

## Project Close-out

The project will be formally closed after the MVP has been deployed and the final deliverables have been reviewed and accepted.

The following activities will be performed to ensure an orderly project completion:

1. **Final Acceptance:** Verify that the completed system meets the agreed MVP requirements. Conduct a final demonstration and obtain confirmation from relevant stakeholders.

2. **Documentation and Archiving:** Complete technical documentation, user guides, database designs, API documentation, and deployment instructions. Archive the source code, project documents, test results, and reports in the shared project repository.

3. **Final Testing and Reporting:** Summarize testing results, completed features, unresolved issues, and any deviations from the original plan. Prepare a final project report covering project outcomes, schedule performance, and actual expenses.

4. **Post-mortem Review:** Hold a final meeting to evaluate what went well, what challenges occurred, and what could be improved in future projects. Record lessons learned for future development.

5. **Team Reassignment and Resource Release:** Since this is a student project, team members will be released from their assigned project responsibilities

#### 4.3.4 Configuration Management

Git will be used for version control, while a shared issue-tracking system will be used to manage problems and change requests. All reported issues and proposed changes must be reviewed and approved before implementation. Approved changes will be developed in separate branches, tested, and merged through Pull Requests.

Project artifacts, including source code, database migrations, test scripts, documentation, and configuration files, will be organized using consistent naming conventions. Git tags will identify important versions and releases (e.g., `v0.1.0`, `v1.0.0`). Dependencies will be tracked using package manifests and lock files.

Source code and documentation will be stored in the shared Git repository and cloud storage. Important project files and database data will be backed up periodically. In case of data loss, the team will restore files from the latest stable Git version or available backups. Final source code, documentation, test results, and release artifacts will be archived after project completion for future maintenance.