# Studitopia Development Plan (Small Project)

**Project Name:** Studitopia
**Company:** Alien Force
**Version:** 1.0

## Revision History

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 29/Oct/2026 | 1.0 | Initial draft | Group 5 |

## 1. Introduction

The introduction of the Software Development Plan provides an overview of the entire document. It includes the purpose, scope, definitions, acronyms, abbreviations, references, and overview of this Software Development Plan.

### 1.1 Purpose

The purpose of the Software Development Plan is to gather all information necessary to control the project. It describes the approach to the development of the software and is the top-level plan generated and used by managers to direct the development effort.

The following people use the Software Development Plan:

- The project manager uses it to plan the project schedule and resource needs, and to track progress against the schedule.
- Project team members use it to understand what they need to do, when they need to do it, and what other activities they are dependent upon.

### 1.2 Scope

This Software Development Plan describes the overall plan to be used by the Studitopia project, including deployment of the product. The details of the individual iterations will be described in the Iteration Plans.

The plans as outlined in this document are based upon the product requirements as defined in the Vision Document.

### 1.3 Overview

This Software Development Plan contains the following information:

- **Project Overview** provides a description of the project's purpose, scope, and objectives. It also defines the deliverables that the project is expected to deliver.
- **Project Organization** describes the organizational structure of the project team.
- **Project Plan** contains the schedule and resources with their achievement criteria.
- **Project Monitoring and Control** describes how the project will be monitored and controlled.

## 2. Project Overview

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
- The team will follow the Scrum process with 5 sprints over 23 weeks.

Constraints:

- Budget: student project with no dedicated funding; rely on free/open-source tools.
- Staff: 5 team members (Group 5) balancing coursework and project work.
- Schedule: project must be completed by the end of the semester (23 weeks).
- Platform: web browser only (no native mobile application in this phase).
- Technology: React + TypeScript + Vite (frontend), NestJS (backend), PostgreSQL (database only).

### 2.3 Project Deliverables

| Deliverable | Description | Target |
|-------------|-------------|--------|
| Vision Document | High-level needs, features, and non-functional requirements | PA2 |
| Software Development Plan | Project plan covering organization, schedule, and control | PA2 |
| Spec Kit Artifacts | Constitution and initialization files under /src | PA2 |
| AI Usage Report & Weekly Report | AI usage log and sprint meeting documentation | PA2 |
| Working Prototype | Functional web application with core features | PA5 (final sprint) |
| Demo | Demonstration of all project features | PA5 (final sprint) |

## 3. Project Organization

### 3.1 Organizational Structure

Describe the organizational structure of the project team, including management and other review authorities.

### 3.2 Roles and Responsibilities

Identify the project organizational units that will be responsible for each of the disciplines, workflow details, and supporting processes.

| Person | Role |
|--------|------|
|  |  |

Responsible for maintaining the Project web site, assisting the Project Manager role in planning/scheduling activities, and assisting the Change Control Manager role in controlling changes to artifacts. May also provide assistance to other roles as necessary.

## 4. Management Process

### 4.1 Project Estimates

Provide the estimated cost and schedule for the project, as well as the basis for those estimates, and the points and circumstances in the project when re-estimation will occur.

### 4.2 Project Plan

This section contains the schedule and resources with their achievement criteria. Define any important release points and demos.

#### 4.2.1 Phase Plan

List the objectives to be accomplished for each of the iterations.

#### 4.2.2 Iteration Objectives

List the objectives to be accomplished for each of the iterations.

#### 4.2.3 Releases

A brief description of each software release and whether it is a demo, beta, and so on.

#### 4.2.4 Project Schedule

Diagrams or tables showing target dates for completion of iterations and phases, release points, demos, and other milestones.

#### 4.2.5 Project Resourcing

Identify the numbers and type of staff required here, including any special skills or experience, scheduled by project phase or iteration. Describe how you will approach finding and acquiring the staff needed for the project. List any special training project team members will require, with target dates for when this training should be completed.

### 4.3 Project Monitoring and Control

The following is a checklist of items to consider:

**Requirements Management:** Specify the information and control mechanisms which will be collected and used for measuring, reporting, and controlling changes to the product requirements.

**Reporting and Measurement:** Describe internal and external reports to be generated, and the frequency and distribution of publication. Specify which metrics should be collected and why.

**Risk Management:** Describe the approach that will be used to identify, analyze, prioritize, monitor and mitigate risks. Include a list of risks and their current status.

**Project Close-out:** Describe the activities for the orderly completion of the project, including staff reassignment, archiving of project materials, post-mortem debriefings and reports, and so forth.

**Configuration Management:** Describe the process by which problems and changes are submitted, reviewed, and dispositioned. Describe how project or product artifacts are to be named, marked, and numbered, including hardware, system software, Commercial-Off-The-Shelf (COTS), plans, models, components, test software, results and data, executables, and so on. Describe retention policies, and the back-up, disaster, and recovery plans. Also describe how the media is to be retained online, offline, media type, and format.

#### 4.3.1 Requirements Management

The requirements for this system are captured in the Vision document. Requested changes to requirements are captured in Change Requests, and are approved as part of the Configuration Management process.

#### 4.3.2 Reporting and Measurement

Updated cost and schedule estimates, and metrics summary reports, will be generated at the end of each iteration. The Minimal Set of Metrics will be gathered on a weekly basis. These include: Earned value for completed tasks. Total defects open and closed shown as a trend graph. Acceptance test cases passing shown as a trend graph. In addition, overall costs will be monitored against the project budget.

#### 4.3.3 Risk Management

Risks will be identified at the start of the project. Project risk is evaluated at least once per iteration and documented in this table. The risks of the greatest magnitude are listed first in the table.

| Risk Ranking (High, Medium, Low) | Risk Description and Impact | Mitigation Strategy and/or Contingency Plan |
|----------------------------------|-----------------------------|---------------------------------------------|
| | | |

#### 4.3.4 Configuration Management

Appropriate tools will be selected which provide a database of Change Requests and a controlled versioned repository of project artifacts. All source code, test scripts, and data files are included in baselines. Documentation related to the source code is also included in the baseline, such as design documentation. All customer deliverable artifacts are included in the final baseline of the iteration, including executables.
