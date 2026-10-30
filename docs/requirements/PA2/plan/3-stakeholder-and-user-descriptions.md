# 3. Stakeholder and User Descriptions

****Performed by:**** [Binh] | ****Reviewed by:**** [Huy] | ****Edited by:**** []

To effectively provide products and services that meet stakeholders' and users' real needs, it is necessary to identify and involve all stakeholders as part of the Requirements Modeling process.

You must also identify the users of the system and ensure that the stakeholder community adequately represents them.

This section provides a profile of the stakeholders and users involved in the project, and the key problems they perceive to be addressed by the proposed solution.

It does not describe their specific requests or requirements, as these are captured in a separate stakeholder requests artifact. Instead, it provides the background and justification for why the requirements are needed.

## 3.1 Stakeholder Summary

| Name | Description | Responsibilities |
| --- | --- | --- |
| **Product Owner / Product Manager** | Lead the software vision and oversees the project roadmap, scope execution and delivery milestones. |   • Define the product vision and prioritizes the feature backlogs.<br>  • Monitor the project progress and delivery schedules.<br>  • Ensure the app’s market demand alignment and unique selling points. |
| **Software Development (Dev) Team** | The technical team responsible for writing, testing and maintaining the app’s source code, databases, and APIs.  |   • Implement the app features, UI and backend logic.<br>  • Perform code reviews, unit testing and bug fixes to ensure requirements are met.<br>  • Ensure code maintainability and structural scalability. |
| **Operations & Maintenance (O&M) Team**  | The group responsible for maintaining software stability, server infrastructure, bug fixes, optimization and deployment pipelines. |   • Ensure high system availability and operational performance.<br>• Monitors server loads, connections and database constraints. |
| **Trust & Safety (T&S) Team** | Operations team tasked with enforcing community guidelines, reviewing reported content, and maintaining a safe learning space. |   • Review user reports on inappropriate posts, documents or messages.<br>• Audit automated content filters (profanity, copyright infringement, malware)<br>• Issue warnings, suspensions or permanent bans to violating accounts. |

## 3.2 User Summary

Present a summary list of all identified users.

| Name | Description | Responsibilities | Stakeholder |
| --- | --- | --- | --- |
| **Student / Independent Learner** | Primary end user (high school/university students, self-taught learners) who uses the platform to study, ask questions, and collaborate. |   • Participates in forum discussions and asks learning questions. <br>  • Joins or creates virtual study rooms. <br> • Uses shared study tools (whiteboard, notes, timers) during sessions. <br> • Shares, previews, and downloads verified study documents. | Product Owner |
| **Peer Helper / Mentor** | Experienced student or subject expert who actively assists others by answering forum threads and providing live study aid. |   • Answers learning problem posts on the forum. <br> • Responds to live help requests and joins temporary help study sessions. <br> • Marks accepted solutions and nominates top-quality documents for the Library. | Trust & Safety (T&S) Team |
| **Study Group Leader / Tutor** | User who creates, structures, and manages custom study rooms, schedules study sessions, and coordinates group learning. |   • Creates and configures custom study room policies (capacity, tools, access). <br> • Approves or rejects incoming room join requests. <br> • Manages group resources, scheduled timers, and collaborative workspaces. | Product Owner |

## 3.3 User Environment

- **Primary Operating Environment *(Forum)*:**
    - **Home Feed:** The core user landing page and primary interface is an interactive academic forum feed where discussions, learning problems, attached resources, and live study room links are unified.
    - **Navigation by Context:** Users initiate all primary learning activities, like asking questions, searching for past solved problems, viewing attached study documents, or jumping into live table discussions, directly from specific forum threads.
- **Task Participation & Scale:**
    - **Asynchronous Forum Activity:** Individual learners create, reply to, and upvote academic discussion threads or search the community knowledge base.
    - **Thread-Spawned Study Rooms:** Users can launch live virtual study rooms directly from forum posts, accommodating small and large study rooms (up to ~40 seats).
    - **System Capacity:** The system architecture supports at least 10,000 registered users, 100,000 forum posts, 10, 000 requests per second, and 200 concurrent users in virtual study rooms.
- **Task Cycles & Activity Durations:**
    - **Short Cycle (5–15 minutes):** Browsing the forum feed, posting quick learning problems, uploading contextual problem attachments, or upvoting accepted solutions.
    - **Medium Cycle (25–50 minutes):** Joining a live study room attached to a forum thread for study sessions using synchronized timers and shared whiteboards.
    - **Long Cycle (1–3 hours):** In-depth collaborative problem solving, multi-topic forum discussions, and group study meetings.
- **Environmental Constraints:**
    - **Data Synchronization & Fallback:** Forum text inputs and shared notes require automatic local buffer saves to prevent data loss during network disruptions.
    - **Real-Time Latency Rules:** Forum message delivery and whiteboard updates enforce sub-second delivery latency to maintain smooth interaction.
- **System Platforms & Technical Ecosystem:**
    - **Current Platforms:** Desktop browsers (Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari).
    - **Future Expected Platforms:** Native mobile apps (iOS and Android) for real-time push notifications on forum replies and help requests.
    - **Complementary Applications in Use:** Personal note-taking tools (Notion, Obsidian), external chat apps (Discord, Messenger), and university LMS portals (Canvas, Moodle).
    - **Integration Requirements:** Google OAuth 2.0 for single-click registration/login; one-click export of forum thread summaries, whiteboards, and notes to standard formats (PDF, PNG).

## 3.4 Summary of Key Stakeholder or User Needs

| Need | Priority | Concerns | Current Solution | Proposed Solutions |
| --- | --- | --- | --- | --- |
| **Forum Discussion & Room Integration** | Highest (Rank 1) | General messaging platforms rely on unstructured, noisy text channels where learning discussions, problem contexts, and study links quickly get buried and lost. | Using Discord servers or social group chats alongside separate cloud drive links, resulting in notification fatigue and lost study context. | A **Forum Home Feed** where every academic discussion thread acts as an anchor, allowing users to attach contextual resources and launch live virtual study rooms directly from posts. |
| **Resource Management & Retention** | High (Rank 2) | Files and notes uploaded in casual chat feeds are temporary, unorganized, and often deleted or lost over time. | Manually saving files to personal storage or searching back through unstructured chat histories. | **Thread-to-Library Promotion**, allowing high-quality forum documents and solution breakdowns to be upvoted, verified, and permanently indexed in a searchable subject Library. |
| **Instant & Contextual Peer Assistance** | Medium (Rank 3) | Students get stuck on specific academic problems without an efficient, structured way to request instant help from qualified peers in real time. | Posting static questions in general social channels or forums and waiting hours for text replies without interactive visual tools. | **Live Help Requests & Temporary Study Rooms**, allowing users to tag forum posts or seats with topic help badges and instantly spawn a temporary, thread-linked study room equipped with shared whiteboards, sync notes, and formula tools for live collaboration. |
| **Silent Co-Presence & Focus Mechanics** | Medium (Rank 4) | Standard voice calls force immediate verbal conversation, creating pressure and disrupting silent, deep-focus study (body doubling). | Turning off microphones/cameras in standard voice channels or using third-party Pomodoro website timers independently. | **Spatial Seating & Focus Modes**, featuring visual table layouts, ambient soundscapes, synchronized Pomodoro timers, and optional blurred camera feeds. |
| **Broadcast Messages & Targeted Notifications** | Medium (Rank 5) | System notifications and room announcements get lost in standard chat feeds, causing users to miss study sessions or urgent help requests. | Relying on noisy @everyone mentions or separate calendar/chat apps, leading to notification spam and ignored alerts. | **Targeted In-App Notifications & Help Alerts** filtered by user preferences, subject tags, and active thread/room context. |

## 3.5 Alternatives and Competition

Identify alternatives that stakeholders perceive as available.

These may include:

- Buying a competitor's product.
- Building an in-house solution.
- Maintaining the status quo.
- Adopting another available or emerging solution.

List any known competitive choices that exist or may become available.

Include the major strengths and weaknesses of each competitor as perceived by the stakeholder or end user.

| Alternative or Competitor | Description | Strengths | Weaknesses |
| --- | --- | --- | --- |
| Discord | Popular real-time voice, video, and text communication platform structured around servers and channels |   • High existing user adoption and familiarity among students. <br> • Powerful, low-latency voice/video streaming infrastructure. <br> • Large bot ecosystem for basic study timers and audio bots. |   • Unstructured text channels lead to noisy feeds and lost study attachments. <br> • Lacks native academic tools (LaTeX, shared whiteboards, document repositories). <br> • Designed primarily for gaming/socializing, leading to high distraction potential |
| Maintain the Status Quo (University LMS + Messenger / WhatsApp) | Using university Learning Management Systems (e.g., Canvas, Moodle) alongside standard messaging apps for group work. |   • Zero adoption barrier as students already use them. <br> • Official institutional compliance for coursework delivery and grading. |   • Highly fragmented study experience across multiple disconnected apps. <br> • LMS forums are static, clunky, and lack real-time peer engagement or instant room matching. <br> • Messaging apps lack study tools, structured forums, and privacy controls for meeting new peers. |
| Dedicated Focus Apps (e.g., Yeolpumta / Focusmate) | Virtual study camera rooms and focus tracker applications designed for solo study and body doubling. |   • Strong gamification, time-tracking, and study streak statistics. <br>  • High accountability for deep focus and solo study sessions. |   • Strictly limited to time tracking and camera feeds without integrated problem-solving forums. <br> • Lacks collaborative academic tools like shared whiteboards, sync notes, or resource libraries. |
| Building an In-House University Study Portal | Custom-built web portals developed internally by academic institutions for their student bodies. |   • Tailored specifically to internal curriculum and single-sign-on (SSO) systems. <br> • High data privacy control and direct institutional moderation. |   • High initial development and ongoing maintenance costs. <br> • Typically features outdated UI/UX, lacking spatial room layouts, interactive whiteboards, and cross-institutional peer networks. |

---