# Posts

**Version:** `1.1`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

[Back to functional requirements index](../../functional_requirement.md)

> Status: `Complete` = source-backed implementation exists; `Partial` = supporting code exists but the full requirement is not implemented; `Not implemented` = no source-backed implementation was found.

### US-14: Create Discussion Post

**As a** university student, **I want to** create a discussion post, **so that** I can share my academic problem and ask for solutions.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-14.1 (Discussion Post Creation)** | The system shall allow a user to create a discussion post in a selected forum. | UI, Frontend, Backend | Partial |
| **FR-14.2 (Discussion Content)** | The discussion post shall support a title, text content, LaTeX, images, and tags. | UI, Frontend | Not implemented |
| **FR-14.3 (Post Category)** | The system shall allow the user to mark the post as a question or a general discussion. | UI, Frontend, Backend | Partial |
| **FR-14.4 (Post Forum Context)** | The system shall associate the post with the selected university, major, and course context. | Backend, Database | Not implemented |
| **FR-14.5 (Post Validation)** | The system shall validate the post content before submission. | Frontend, Backend | Not implemented |
| **FR-14.6 (Post Publication)** | The system shall publish the post and display it in the corresponding forum post list. | Backend, Database | Not implemented |

### US-15: Create Material Post

**As a** university student, **I want to** create a material post, **so that** I can share learning resources with other students.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-15.1 (Material Post Creation)** | The system shall allow a user to create a material post in a selected forum. | UI, Frontend, Backend | Partial |
| **FR-15.2 (Material Content)** | The material post shall support a title, description, files, and subject tags. | UI, Frontend | Not implemented |
| **FR-15.3 (File Validation)** | The system shall validate uploaded files for type and size before accepting them. | Frontend, Backend | Partial |
| **FR-15.4 (Material Forum Context)** | The system shall associate the material with the selected university, major, and course context. | Backend, Database | Not implemented |
| **FR-15.5 (Material Access)** | The system shall make published materials accessible to users who can view the forum. | Backend | Not implemented |
| **FR-15.6 (Material Listing)** | The system shall display the material post in the corresponding forum and in the learning resource library when applicable. | UI, Frontend, Backend | Not implemented |

### US-16: Create Functional Post

**As a** university student, **I want to** create a functional post with an interactive academic tool, **so that** I can help others practice course content.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-16.1 (Functional Post Creation)** | The system shall allow a user to create a functional post in a selected forum. | UI, Frontend, Backend | Partial |
| **FR-16.2 (Functional Content)** | The functional post shall support a title and an interactive tool. | UI, Frontend | Not implemented |
| **FR-16.3 (Quiz Tool)** | The system shall support an immediate quiz tool with multiple-choice or single-choice questions. | UI, Frontend, Backend | Not implemented |
| **FR-16.4 (Prerequisite Tree Tool)** | The system shall support a prerequisite tree tool that can be created manually or generated from a source file. | UI, Frontend, Backend | Not implemented |
| **FR-16.5 (Dynamic Computation)** | The system shall support dynamic computation content when configured by the author. | UI, Frontend, Backend | Not implemented |
| **FR-16.6 (Functional Interaction)** | The system shall publish the functional post and allow other users to interact with its tool. | Frontend, Backend | Not implemented |

### US-17: View Post Detail

**As a** university student, **I want to** view posts and their details, **so that** I can read shared content and find relevant information.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-17.1 (Full Post Content)** | The system shall display the full content of a selected post. | UI, Frontend, Backend | Partial |
| **FR-17.2 (Post Metadata)** | The system shall display the author, post type, forum context, timestamp, vote score, and tags. | UI, Frontend | Complete |
| **FR-17.3 (Discussion Display)** | The system shall display comments, answers, and the marked true response for the post. | UI, Frontend, Backend | Not implemented |
| **FR-17.4 (Permission-Based Actions)** | The system shall display available actions such as vote, comment, save, report, and mark true response according to the user's permissions. | UI, Frontend, Backend | Not implemented |
| **FR-17.5 (Attachments and Tools)** | The system shall display material attachments and functional tools in the post detail when present. | UI, Frontend | Not implemented |

### US-18: Comment and Answer

**As a** university student, **I want to** comment on posts and answer questions, **so that** I can discuss ideas and help other students.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-18.1 (Comment Creation)** | The system shall allow a user to comment on a discussion post. | UI, Frontend, Backend | Not implemented |
| **FR-18.2 (Answer Creation)** | The system shall allow a user to answer a question post. | UI, Frontend, Backend | Not implemented |
| **FR-18.3 (Nested Replies)** | The system shall support nested replies where applicable. | UI, Frontend, Backend | Not implemented |
| **FR-18.4 (Own Content Management)** | The system shall allow users to edit or delete their own comments and answers. | UI, Frontend, Backend | Not implemented |
| **FR-18.5 (Comment Ordering)** | The system shall display comments and answers in chronological or threaded order. | UI, Frontend | Not implemented |
| **FR-18.6 (Author Notification)** | The system shall notify the post author when a new comment or answer is added. | Backend | Not implemented |

### US-19: Vote on Posts and Comments

**As a** university student, **I want to** vote on posts and comments, **so that** useful academic content is easier to discover.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-19.1 (Post Voting)** | The system shall allow a user to upvote or downvote a post. | UI, Frontend, Backend | Not implemented |
| **FR-19.2 (Comment Voting)** | The system shall allow a user to upvote or downvote a comment or answer. | UI, Frontend, Backend | Not implemented |
| **FR-19.3 (Duplicate Vote Prevention)** | The system shall prevent a user from voting more than once on the same post or comment. | Frontend, Backend, Database | Not implemented |
| **FR-19.4 (Vote Change)** | The system shall allow a user to change or remove their vote. | UI, Frontend, Backend | Not implemented |
| **FR-19.5 (Score Update)** | The system shall update the vote score and ranking after a vote is recorded. | Backend, Database | Not implemented |

### US-20: Mark True Response

**As a** post author, **I want to** mark a comment or answer as the true response, **so that** other students can quickly find the accepted solution.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-20.1 (Mark Response)** | The system shall allow the author of a question post to mark one comment or answer as the true response. | UI, Frontend, Backend | Not implemented |
| **FR-20.2 (Solved Status)** | The system shall mark the post as solved when a true response is selected. | Frontend, Backend, Database | Not implemented |
| **FR-20.3 (Prominent Display)** | The system shall display the true response prominently under the post. | UI, Frontend | Not implemented |
| **FR-20.4 (Change Response)** | The system shall allow the post author to change the true response when necessary. | UI, Frontend, Backend | Not implemented |
| **FR-20.5 (Answer Notification)** | The system shall notify the author of the selected answer that their answer was accepted. | Backend | Not implemented |

### US-21: Save Post

**As a** university student, **I want to** save posts, **so that** I can return to useful discussions and materials later.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-21.1 (Save Post)** | The system shall allow a user to save a post. | UI, Frontend, Backend | Not implemented |
| **FR-21.2 (Saved List)** | The system shall provide a list of the user's saved posts. | UI, Frontend, Backend | Not implemented |
| **FR-21.3 (Remove Saved Post)** | The system shall allow a user to remove a post from their saved list. | UI, Frontend, Backend | Not implemented |
| **FR-21.4 (Saved Persistence)** | The system shall keep saved posts available even when the user changes forum context. | Backend, Database | Not implemented |

### US-22: Report and Moderate Forum Content

**As a** university student or moderator, **I want to** report and moderate forum content, **so that** the forum remains safe and academically useful.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-22.1 (Report Content)** | The system shall allow a user to report a post, comment, or answer. | UI, Frontend, Backend | Not implemented |
| **FR-22.2 (Report Categories)** | The system shall provide report categories such as spam, harassment, inappropriate content, and academic dishonesty. | UI, Frontend | Not implemented |
| **FR-22.3 (Moderation Queue)** | The system shall route reports to a moderation queue for review. | Backend | Not implemented |
| **FR-22.4 (Moderator Actions)** | The system shall allow moderators to hide, delete, restore, or ban content and users according to forum policy. | UI, Frontend, Backend | Not implemented |
| **FR-22.5 (Moderation Record)** | The system shall record moderation actions and notify the affected user when appropriate. | Backend, Database | Not implemented |
| **FR-22.6 (Restriction Enforcement)** | The system shall prevent moderated users from bypassing restrictions through new posts or comments. | Backend | Not implemented |
