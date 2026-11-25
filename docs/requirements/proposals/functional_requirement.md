# Functional Requirements

> Studitopia is now forum-first and university-student-focused. The Forum requirements below are the primary requirements of the product. Meeting-room requirements are retained only as supporting capabilities.

> **US-01 (Register Account)** is split into US-01.1 to US-01.6 so that registration requirements are grouped by user goal and by layer. All remaining user stories use the same table format and categorize each FR as UI, Frontend, Backend, or Database.

# Authentication and Account Management

### US-01.1: Open the Registration Form

**As a** new university student, **I want to** open and understand the registration form, **so that** I can start creating my account.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-01.1 (Registration Form)** | The system shall provide a registration form containing fields for Display Name, Username, Email, Password, and Confirm Password. | UI, Frontend |
| **FR-01.2 (CAPTCHA Display)** | The system shall provide a CAPTCHA verification component on the registration form. | UI, Frontend |
| **FR-01.3 (Password Visibility)** | The system shall hide the Password and Confirm Password fields by default and provide controls to toggle their visibility. | UI, Frontend |
| **FR-01.4 (Validation Error Display)** | The system shall display appropriate error messages when registration validation fails. | UI |
| **FR-01.5 (Registration Result Display)** | The system shall display an appropriate success or error message based on the registration result. | UI, Frontend |

### US-01.2: Validate Registration Input

**As a** new university student, **I want to** have my registration input validated before submission, **so that** I can correct mistakes early.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-01.6 (Required Field Validation)** | The system shall validate that all required registration fields are completed before submitting the registration request. | Frontend |
| **FR-01.7 (Email Format Validation)** | The system shall validate the email address format before submitting the registration request. | Frontend |
| **FR-01.8 (Username Format Validation)** | The system shall validate that the username contains only alphanumeric characters before submitting the registration request. | Frontend |
| **FR-01.9 (Password Security Validation)** | The system shall validate that the password contains at least 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character. | Frontend |
| **FR-01.10 (Password Confirmation Validation)** | The system shall verify that the Confirm Password field matches the Password field before submitting the registration request. | Frontend |

### US-01.3: Submit Registration

**As a** new university student, **I want to** submit my registration information, **so that** the platform can create my account and begin verification.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-01.11 (Registration Submission)** | When the user clicks the **Register** button and all required client-side validations succeed, the system shall submit the registration request to the backend. | Frontend, Backend |
| **FR-01.12 (Registration Error Handling)** | The system shall display an appropriate error message when the backend reports that registration has failed. | UI, Frontend |
| **FR-01.13 (Registration Data Validation)** | The system shall validate the registration data received from the frontend before processing the registration request. | Backend |
| **FR-01.14 (Email Uniqueness Check)** | The system shall check whether the submitted email address is already registered and return an appropriate error response if a duplicate is detected. | Backend, Database |
| **FR-01.15 (Username Uniqueness Check)** | The system shall check whether the submitted username is already in use and return an appropriate error response if a duplicate is detected. | Backend, Database |
| **FR-01.16 (Password Security Check)** | The system shall enforce password security requirements and return an appropriate error response if the password does not satisfy them. | Backend |
| **FR-01.17 (CAPTCHA Verification)** | The system shall verify the CAPTCHA response before processing a registration request and return an appropriate error response if verification fails. | Backend |
| **FR-01.18 (Registration Processing)** | After all required validations succeed, the system shall process the registration request and initiate email OTP verification. | Backend |
| **FR-01.19 (University Email Domain)** | The system shall validate that the registered email domain belongs to a supported university or faculty when university email registration is used. | Backend, Database |
| **FR-01.20 (Registration and Verification Response)** | The system shall return appropriate responses to the frontend for registration and OTP verification results. | Backend |

### US-01.4: Verify Email with OTP

**As a** new university student, **I want to** verify my email with an OTP, **so that** my account can be activated securely.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-01.21 (OTP Input Page)** | The system shall provide an OTP verification page where users can enter the OTP received through email. | UI, Frontend |
| **FR-01.22 (OTP Verification Feedback)** | The system shall display an appropriate success or error message based on the OTP verification result. | UI, Frontend |
| **FR-01.23 (OTP Page Redirection)** | After the backend successfully processes the registration request and sends an OTP to the user's email, the system shall redirect the user to the OTP verification page. | Frontend, Backend |
| **FR-01.24 (OTP Submission)** | The system shall allow users to submit the entered OTP to the backend for verification. | Frontend, Backend |
| **FR-01.25 (OTP Error Handling)** | The system shall display an appropriate error message when the backend reports that the OTP is invalid or expired. | Frontend, UI |
| **FR-01.26 (Preference Settings Redirection)** | After the backend confirms successful OTP verification, the system shall redirect the user to the Preference Settings page. | Frontend, Backend |
| **FR-01.27 (Email OTP Generation)** | The system shall generate a time-limited OTP for verifying the user's email address. | Backend |
| **FR-01.28 (Email OTP Delivery)** | The system shall send the generated OTP to the email address provided by the user. | Backend |
| **FR-01.29 (OTP Verification)** | The system shall verify the submitted OTP and return an appropriate response indicating whether the OTP is valid, invalid, or expired. | Backend |
| **FR-01.30 (Account Activation)** | The system shall activate the user's account after successful OTP verification. | Backend, Database |
| **FR-01.31 (Preference Settings Access)** | After successful OTP verification, the system shall authorize the user to proceed to the Preference Settings page. | Backend |
| **FR-01.32 (Unverified Account Restriction)** | The system shall restrict access to protected application features until the user successfully verifies their email address. | Backend, Database |
| **FR-01.33 (OTP Storage)** | The system shall store the OTP or its secure representation, its expiration time, and its verification status. | Database |
| **FR-01.34 (Account Activation Status)** | The system shall store and update the user's account activation and email verification status. | Database |

### US-01.5: Register with Google

**As a** new university student, **I want to** register with my Google account, **so that** I can create an account without manually entering all registration details.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-01.35 (Google Registration Interface)** | The system shall provide a **Continue with Google** button on the registration page. | UI, Frontend |
| **FR-01.36 (Google Authentication Error Display)** | The system shall display an appropriate error message if Google authentication fails. | UI, Frontend |
| **FR-01.37 (Google Registration Feedback)** | The system shall display the Google registration result and guide the user to the next appropriate screen. | UI, Frontend |
| **FR-01.38 (Google Authentication Initiation)** | The system shall initiate Google authentication when the user selects **Continue with Google**. | Frontend |
| **FR-01.39 (Google Authentication Error Handling)** | The system shall display an appropriate error message if Google authentication fails. | Frontend, UI |
| **FR-01.40 (Google Registration Result Handling)** | The system shall display the Google registration result and guide the user to the next appropriate screen. | Frontend, UI |
| **FR-01.41 (Google Authentication)** | The system shall authenticate users through Google OAuth and validate the authentication response before proceeding with registration. | Backend |
| **FR-01.42 (Google Authentication Error Response)** | The system shall return an appropriate error response if Google authentication fails. | Backend |
| **FR-01.43 (Google Account Registration)** | The system shall create or associate a user account with the authenticated Google account when registration requirements are satisfied. | Backend, Database |

### US-01.6: Persist Registration Data

**As a** system administrator, **I want to** store registration data with unique constraints, **so that** accounts remain consistent and duplicate accounts are prevented.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-01.44 (Registration Information Storage)** | The system shall store user registration information, including Display Name, Username, Email, and securely hashed Password, in the database. | Database |
| **FR-01.45 (Unique Account Constraints)** | The system shall enforce uniqueness constraints on usernames and email addresses to prevent duplicate accounts. | Database |

### US-02: Login

**As a** registered university student, **I want to** log in to my account, **so that** I can access my profile, university forum, posts, and learning activities.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-02.1 (Credential Login)** | The system shall allow a registered university student to log in to their account. | UI, Frontend, Backend |
| **FR-02.2 (Post-Login Access)** | The system shall provide access to the user's profile, university forum, posts, and learning activities after login. | UI, Frontend |
| **FR-02.3 (Identifier Options)** | The system shall support login with a registered username or university email address. | UI, Frontend, Backend |
| **FR-02.4 (Google Login)** | The system shall support Google login for registered users. | Frontend, Backend |
| **FR-02.5 (Invalid Credential Message)** | The system shall display a clear error message for invalid credentials without revealing which field is incorrect. | UI, Frontend |

### US-03: Logout

**As a** logged-in user, **I want to** log out of my account, **so that** my account remains secure on shared devices.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-03.1 (Logout Access)** | The system shall allow a logged-in user to log out of their account. | UI, Frontend |
| **FR-03.2 (Client Cleanup)** | The system shall clear authentication tokens and temporary user data from local and session storage on logout. | Frontend |
| **FR-03.3 (Session Invalidation)** | The system shall invalidate the user's active session on the backend on logout. | Backend |

### US-04: Automatic Logout

**As a** user, **I want** the system to automatically log me out after inactivity, **so that** my account remains secure when I leave my session unattended.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-04.1 (Inactivity Timeout)** | The system shall automatically log out a user after 15 minutes of inactivity. | Frontend, Backend |
| **FR-04.2 (Expired Session Access)** | The system shall deny access to protected pages or APIs when a session has expired. | Backend |
| **FR-04.3 (Activity Reset)** | The system shall reset the inactivity timer when a qualifying user request is received before the timeout. | Frontend, Backend |
| **FR-04.4 (Expiration Notice)** | The system shall inform the user that their session expired and require them to log in again. | UI, Frontend |

### US-05: Recover Password

**As a** registered user, **I want to** recover or reset my password, **so that** I can regain access to my account.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-05.1 (Recovery Request)** | The system shall allow a registered user to recover or reset their password using their username or email. | UI, Frontend, Backend |
| **FR-05.2 (Recovery OTP)** | The system shall send a time-limited OTP to the user's registered email address. | Backend |
| **FR-05.3 (Enumeration Protection)** | The system shall return the same generic response whether or not the submitted account exists. | Backend |
| **FR-05.4 (New Password Policy)** | The system shall enforce the password security policy when the user sets a new password. | Frontend, Backend |
| **FR-05.5 (Reset Session Invalidation)** | The system shall invalidate all active sessions after a successful password reset. | Backend, Database |

### US-06: Delete Account

**As a** registered user, **I want to** permanently delete my account, **so that** my personal information and data are erased from the platform.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-06.1 (Deletion Request)** | The system shall allow a user to request permanent deletion of their account. | UI, Frontend |
| **FR-06.2 (Deletion Confirmation)** | The system shall display a confirmation dialog explaining the consequences of account deletion. | UI, Frontend |
| **FR-06.3 (Cancel Deletion)** | The system shall allow the user to cancel the deletion request. | UI, Frontend |
| **FR-06.4 (Re-authentication)** | The system shall require re-authentication through email OTP before permanently deleting the account. | Frontend, Backend |
| **FR-06.5 (Deleted Account Access)** | The system shall reject access to an account that has already been deleted. | Backend, Database |
| **FR-06.6 (Deletion Session Invalidation)** | The system shall log out all active sessions after account deletion. | Backend, Database |

### US-07: OTP Validation

**As a** user, **I want to** receive and submit a one-time password, **so that** I can verify my identity securely.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-07.1 (OTP Generation)** | The system shall generate a 6-digit numeric OTP for actions that require email verification. | Backend |
| **FR-07.2 (OTP Delivery)** | The system shall send the OTP to the user's registered email address. | Backend |
| **FR-07.3 (OTP Expiration)** | The system shall expire an OTP 5 minutes after it is generated. | Backend, Database |
| **FR-07.4 (Valid OTP Acceptance)** | The system shall accept only a valid, unexpired, unused 6-digit OTP. | Frontend, Backend |
| **FR-07.5 (Invalid OTP Handling)** | The system shall reject invalid, expired, or previously used OTPs and display an appropriate message. | UI, Frontend, Backend |
| **FR-07.6 (OTP Resend)** | The system shall allow the user to request a new OTP and invalidate the previous OTP. | UI, Frontend, Backend, Database |

# Profile and University Identity

### US-08: Manage Profile

**As a** university student, **I want to** create and update my profile, **so that** other users can understand my academic background and interests.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-08.1 (Profile Update)** | The system shall allow a user to create and update their profile. | UI, Frontend, Backend |
| **FR-08.2 (Profile Fields)** | The profile shall include display name, username, avatar, short bio, university, major, and academic year. | UI, Frontend |
| **FR-08.3 (Academic Selection)** | The system shall allow users to select their university and major from the supported catalog. | UI, Frontend, Backend |
| **FR-08.4 (Avatar Validation)** | The system shall validate avatar uploads for file type and size. | Frontend, Backend |
| **FR-08.5 (Profile Persistence)** | The system shall persist profile changes and reflect them across the user's active sessions. | Backend, Database |
| **FR-08.6 (Public Academic Info)** | The system shall display the user's university, major, and academic year on their public forum profile. | UI, Frontend |

### US-09: Set Learning Preferences

**As a** university student, **I want to** specify my courses, subjects, interests, and learning goals, **so that** the platform can recommend relevant content.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-09.1 (Course Preferences)** | The system shall allow a university student to specify their current courses. | UI, Frontend, Backend |
| **FR-09.2 (Subject Preferences)** | The system shall allow a university student to specify subjects and topics of interest. | UI, Frontend, Backend |
| **FR-09.3 (Goal Preferences)** | The system shall allow a university student to specify learning goals and preferred study times. | UI, Frontend, Backend |
| **FR-09.4 (Recommendation Use)** | The system shall use these preferences to recommend forum posts, materials, study partners, and optional rooms. | Backend |
| **FR-09.5 (Preference Updates)** | The system shall allow users to update their preferences at any time. | UI, Frontend, Backend |

### US-10: Manage Privacy

**As a** user, **I want to** control the visibility of my personal information, **so that** I can protect my privacy while using the platform.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-10.1 (Visibility Controls)** | The system shall allow a user to control the visibility of personal information such as profile details, study history, and contact information. | UI, Frontend, Backend |
| **FR-10.2 (Search Opt-Out)** | The system shall allow a user to opt out of appearing in public discovery and study-partner search results. | UI, Frontend, Backend |
| **FR-10.3 (Online Status)** | The system shall allow a user to hide their online status and last-active time. | UI, Frontend, Backend |
| **FR-10.4 (Privacy Enforcement)** | The system shall respect privacy settings when displaying user information in forum posts, comments, and member lists. | Backend, Database |

# Forum (Primary)

### US-11: Access the University Forum

**As a** university student, **I want to** access the university forum, **so that** I can explore academic discussions related to my university.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-11.1 (Primary Forum)** | The system shall provide a dedicated university forum as the primary feature after login. | UI, Frontend |
| **FR-11.2 (Own University Forum)** | The system shall allow a user to select and enter their own university forum. | UI, Frontend, Backend |
| **FR-11.3 (Other University Forums)** | The system shall allow a user to browse forums of other universities when permitted. | UI, Frontend, Backend |
| **FR-11.4 (Default Context)** | The system shall display the selected university forum as the default forum context for the user. | Frontend, Backend |

### US-12: Browse University, Major, and Course Forums

**As a** university student, **I want to** browse forums by university, major, and course, **so that** I can find discussions relevant to my program.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-12.1 (Forum Hierarchy)** | The system shall organize forum content by University, Major, and Course. | Backend, Database |
| **FR-12.2 (Major Listing)** | The system shall display the majors offered within a selected university. | UI, Frontend, Backend |
| **FR-12.3 (Course Listing)** | The system shall display the courses associated with a selected major. | UI, Frontend, Backend |
| **FR-12.4 (Forum Navigation)** | The system shall allow users to navigate from a university to a major and then to a course forum. | UI, Frontend |
| **FR-12.5 (Relevant Content)** | The system shall display posts and materials relevant to the selected forum level. | Backend |
| **FR-12.6 (Context Switching)** | The system shall allow users to switch between university, major, and course forums easily. | UI, Frontend |

### US-13: View the List of Posts

**As a** university student, **I want to** view a list of posts within the selected forum, **so that** I can discover relevant discussions.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-13.1 (Post List Display)** | The system shall display a list of posts for the selected university, major, or course forum. | UI, Frontend, Backend |
| **FR-13.2 (Post Summary)** | The system shall show the post title, author, post type, timestamp, vote score, comment count, and solved status in the list. | UI, Frontend |
| **FR-13.3 (Post Filtering)** | The system shall support filtering posts by My Post, area, university, major, course, tags, and post type. | UI, Frontend, Backend |
| **FR-13.4 (Post Sorting)** | The system shall support sorting posts by newest, top trending, most voted, and most discussed. | UI, Frontend, Backend |
| **FR-13.5 (Open Post)** | The system shall allow users to open a post from the list to view its full details. | UI, Frontend |

### US-14: Create Discussion Post

**As a** university student, **I want to** create a discussion post, **so that** I can share my academic problem and ask for solutions.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-14.1 (Discussion Post Creation)** | The system shall allow a user to create a discussion post in a selected forum. | UI, Frontend, Backend |
| **FR-14.2 (Discussion Content)** | The discussion post shall support a title, text content, LaTeX, images, and tags. | UI, Frontend |
| **FR-14.3 (Post Category)** | The system shall allow the user to mark the post as a question or a general discussion. | UI, Frontend, Backend |
| **FR-14.4 (Post Forum Context)** | The system shall associate the post with the selected university, major, and course context. | Backend, Database |
| **FR-14.5 (Post Validation)** | The system shall validate the post content before submission. | Frontend, Backend |
| **FR-14.6 (Post Publication)** | The system shall publish the post and display it in the corresponding forum post list. | Backend, Database |

### US-15: Create Material Post

**As a** university student, **I want to** create a material post, **so that** I can share learning resources with other students.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-15.1 (Material Post Creation)** | The system shall allow a user to create a material post in a selected forum. | UI, Frontend, Backend |
| **FR-15.2 (Material Content)** | The material post shall support a title, description, files, and subject tags. | UI, Frontend |
| **FR-15.3 (File Validation)** | The system shall validate uploaded files for type and size before accepting them. | Frontend, Backend |
| **FR-15.4 (Material Forum Context)** | The system shall associate the material with the selected university, major, and course context. | Backend, Database |
| **FR-15.5 (Material Access)** | The system shall make published materials accessible to users who can view the forum. | Backend |
| **FR-15.6 (Material Listing)** | The system shall display the material post in the corresponding forum and in the learning resource library when applicable. | UI, Frontend, Backend |

### US-16: Create Functional Post

**As a** university student, **I want to** create a functional post with an interactive academic tool, **so that** I can help others practice course content.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-16.1 (Functional Post Creation)** | The system shall allow a user to create a functional post in a selected forum. | UI, Frontend, Backend |
| **FR-16.2 (Functional Content)** | The functional post shall support a title and an interactive tool. | UI, Frontend |
| **FR-16.3 (Quiz Tool)** | The system shall support an immediate quiz tool with multiple-choice or single-choice questions. | UI, Frontend, Backend |
| **FR-16.4 (Prerequisite Tree Tool)** | The system shall support a prerequisite tree tool that can be created manually or generated from a source file. | UI, Frontend, Backend |
| **FR-16.5 (Dynamic Computation)** | The system shall support dynamic computation content when configured by the author. | UI, Frontend, Backend |
| **FR-16.6 (Functional Interaction)** | The system shall publish the functional post and allow other users to interact with its tool. | Frontend, Backend |

### US-17: View Post Detail

**As a** university student, **I want to** view posts and their details, **so that** I can read shared content and find relevant information.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-17.1 (Full Post Content)** | The system shall display the full content of a selected post. | UI, Frontend, Backend |
| **FR-17.2 (Post Metadata)** | The system shall display the author, post type, forum context, timestamp, vote score, and tags. | UI, Frontend |
| **FR-17.3 (Discussion Display)** | The system shall display comments, answers, and the marked true response for the post. | UI, Frontend, Backend |
| **FR-17.4 (Permission-Based Actions)** | The system shall display available actions such as vote, comment, save, report, and mark true response according to the user's permissions. | UI, Frontend, Backend |
| **FR-17.5 (Attachments and Tools)** | The system shall display material attachments and functional tools in the post detail when present. | UI, Frontend |

### US-18: Comment and Answer

**As a** university student, **I want to** comment on posts and answer questions, **so that** I can discuss ideas and help other students.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-18.1 (Comment Creation)** | The system shall allow a user to comment on a discussion post. | UI, Frontend, Backend |
| **FR-18.2 (Answer Creation)** | The system shall allow a user to answer a question post. | UI, Frontend, Backend |
| **FR-18.3 (Nested Replies)** | The system shall support nested replies where applicable. | UI, Frontend, Backend |
| **FR-18.4 (Own Content Management)** | The system shall allow users to edit or delete their own comments and answers. | UI, Frontend, Backend |
| **FR-18.5 (Comment Ordering)** | The system shall display comments and answers in chronological or threaded order. | UI, Frontend |
| **FR-18.6 (Author Notification)** | The system shall notify the post author when a new comment or answer is added. | Backend |

### US-19: Vote on Posts and Comments

**As a** university student, **I want to** vote on posts and comments, **so that** useful academic content is easier to discover.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-19.1 (Post Voting)** | The system shall allow a user to upvote or downvote a post. | UI, Frontend, Backend |
| **FR-19.2 (Comment Voting)** | The system shall allow a user to upvote or downvote a comment or answer. | UI, Frontend, Backend |
| **FR-19.3 (Duplicate Vote Prevention)** | The system shall prevent a user from voting more than once on the same post or comment. | Frontend, Backend, Database |
| **FR-19.4 (Vote Change)** | The system shall allow a user to change or remove their vote. | UI, Frontend, Backend |
| **FR-19.5 (Score Update)** | The system shall update the vote score and ranking after a vote is recorded. | Backend, Database |

### US-20: Mark True Response

**As a** post author, **I want to** mark a comment or answer as the true response, **so that** other students can quickly find the accepted solution.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-20.1 (Mark Response)** | The system shall allow the author of a question post to mark one comment or answer as the true response. | UI, Frontend, Backend |
| **FR-20.2 (Solved Status)** | The system shall mark the post as solved when a true response is selected. | Frontend, Backend, Database |
| **FR-20.3 (Prominent Display)** | The system shall display the true response prominently under the post. | UI, Frontend |
| **FR-20.4 (Change Response)** | The system shall allow the post author to change the true response when necessary. | UI, Frontend, Backend |
| **FR-20.5 (Answer Notification)** | The system shall notify the author of the selected answer that their answer was accepted. | Backend |

### US-21: Save Post

**As a** university student, **I want to** save posts, **so that** I can return to useful discussions and materials later.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-21.1 (Save Post)** | The system shall allow a user to save a post. | UI, Frontend, Backend |
| **FR-21.2 (Saved List)** | The system shall provide a list of the user's saved posts. | UI, Frontend, Backend |
| **FR-21.3 (Remove Saved Post)** | The system shall allow a user to remove a post from their saved list. | UI, Frontend, Backend |
| **FR-21.4 (Saved Persistence)** | The system shall keep saved posts available even when the user changes forum context. | Backend, Database |

### US-22: Report and Moderate Forum Content

**As a** university student or moderator, **I want to** report and moderate forum content, **so that** the forum remains safe and academically useful.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-22.1 (Report Content)** | The system shall allow a user to report a post, comment, or answer. | UI, Frontend, Backend |
| **FR-22.2 (Report Categories)** | The system shall provide report categories such as spam, harassment, inappropriate content, and academic dishonesty. | UI, Frontend |
| **FR-22.3 (Moderation Queue)** | The system shall route reports to a moderation queue for review. | Backend |
| **FR-22.4 (Moderator Actions)** | The system shall allow moderators to hide, delete, restore, or ban content and users according to forum policy. | UI, Frontend, Backend |
| **FR-22.5 (Moderation Record)** | The system shall record moderation actions and notify the affected user when appropriate. | Backend, Database |
| **FR-22.6 (Restriction Enforcement)** | The system shall prevent moderated users from bypassing restrictions through new posts or comments. | Backend |

### US-23: Search the Forum

**As a** university student, **I want to** search the forum, **so that** I can find discussions and materials related to my academic needs.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-23.1 (Keyword Search)** | The system shall allow users to search posts by keyword. | UI, Frontend, Backend |
| **FR-23.2 (Search Fields)** | The system shall support search by tags, title, content, author, university, major, and course. | Frontend, Backend |
| **FR-23.3 (Search Filtering)** | The system shall filter search results by post type, solved status, and time range. | UI, Frontend, Backend |
| **FR-23.4 (Search Ranking)** | The system shall rank search results by relevance and engagement. | Backend |
| **FR-23.5 (Search Empty State)** | The system shall display an appropriate empty state when no results match the search criteria. | UI, Frontend |

### US-24: Receive Forum Recommendations

**As a** university student, **I want to** receive forum recommendations, **so that** I can discover discussions that matter to my courses and interests.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-24.1 (Relevant Recommendations)** | The system shall recommend forum posts that are relevant to the user's university, major, courses, and interests. | Backend |
| **FR-24.2 (Trending Recommendations)** | The system shall recommend trending posts within the user's academic context. | Backend |
| **FR-24.3 (Unsolved Recommendations)** | The system shall recommend unsolved questions where the user may be able to help. | Backend |
| **FR-24.4 (Dismiss Recommendations)** | The system shall allow users to dismiss irrelevant recommendations. | UI, Frontend, Backend |
| **FR-24.5 (Recommendation Refresh)** | The system shall refresh recommendations when the user's preferences or forum context change. | Frontend, Backend |

# Learning Resource Library

### US-25: Find Learning Resources

**As a** university student, **I want to** search for books and learning resources, **so that** I can find materials related to my courses.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-25.1 (Resource Search)** | The system shall allow a user to search for books and learning resources. | UI, Frontend, Backend |
| **FR-25.2 (Resource Search Fields)** | The system shall support search by title, author, subject tags, and description. | Frontend, Backend |
| **FR-25.3 (Resource Filtering)** | The system shall support filtering by resource format and subject field. | UI, Frontend, Backend |
| **FR-25.4 (Resource Ratings)** | The system shall display resource ratings and review counts when available. | UI, Frontend, Backend |
| **FR-25.5 (Related Resources)** | The system shall display resources related to the user's university, major, and courses. | Backend |

### US-26: Receive Resource Recommendations

**As a** university student, **I want to** receive recommendations for books and learning resources, **so that** I can discover useful materials.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-26.1 (Resource Suggestions)** | The system shall recommend books or learning resources related to the user's subjects, courses, and interests. | Backend |
| **FR-26.2 (Recommendation Display)** | The system shall display recommended resources on the user's home or library page. | UI, Frontend |
| **FR-26.3 (Save Recommendation)** | The system shall allow users to save recommended resources to a personal list. | UI, Frontend, Backend |
| **FR-26.4 (Cold Start)** | The system shall provide curated foundational resources for new users without historical activity. | Backend |

### US-27: Share Learning Resources

**As a** university student, **I want to** share learning resources, **so that** I can help others access useful materials.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-27.1 (Publish Resource)** | The system shall allow a user to publish a learning resource to the library. | UI, Frontend, Backend |
| **FR-27.2 (Resource Details)** | The system shall allow the user to provide a title, description, subject tags, and course tags. | UI, Frontend |
| **FR-27.3 (Resource File Validation)** | The system shall validate uploaded files for type and size before publishing. | Frontend, Backend |
| **FR-27.4 (Resource Searchability)** | The system shall make published resources searchable after publication. | Backend, Database |
| **FR-27.5 (Resource Access)** | The system shall allow other users to view and access published resources according to privacy settings. | Backend |

### US-28: View My Storage

**As a** university student, **I want to** see my published resources, **so that** I can track how many views and accesses they receive.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-28.1 (Storage View)** | The system shall provide a personal storage view for published resources. | UI, Frontend, Backend |
| **FR-28.2 (Access Statistics)** | The system shall display the number of views and accesses for each published resource. | UI, Frontend, Backend |
| **FR-28.3 (Resource Status)** | The system shall display the publication status and date of each resource. | UI, Frontend |

### US-29: Delete My Published Resource

**As a** university student, **I want to** delete a resource I published, **so that** I can remove content I no longer want to share.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-29.1 (Delete Own Resource)** | The system shall allow a user to delete a resource they published. | UI, Frontend, Backend |
| **FR-29.2 (Delete Confirmation)** | The system shall require confirmation before deleting a published resource. | UI, Frontend |
| **FR-29.3 (Remove from Listings)** | The system shall remove the deleted resource from search and library listings. | Backend, Database |
| **FR-29.4 (Deleted Resource Access)** | The system shall prevent other users from accessing a deleted resource. | Backend |

# Friends and Social Networking

### US-30: Find a Study Partner

**As a** university student, **I want to** find users with similar courses and learning goals, **so that** I can establish useful academic connections.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-30.1 (Study Partner Discovery)** | The system shall allow a user to find other university students with similar courses, subjects, or learning goals. | UI, Frontend, Backend |
| **FR-30.2 (Partner Search and Filter)** | The system shall support search and filtering by subject, goal, learning pace, and language. | UI, Frontend, Backend |
| **FR-30.3 (Profile Cards)** | The system shall display concise profile cards with mutual academic interests. | UI, Frontend |
| **FR-30.4 (Mutual Connections)** | The system shall display mutual friends or shared forum contexts when available. | UI, Frontend, Backend |

### US-31: Send Friend Request

**As a** university student, **I want to** send a friend request, **so that** we can maintain a connection for future learning activities.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-31.1 (Send Request)** | The system shall allow a user to send a friend request to another user. | UI, Frontend, Backend |
| **FR-31.2 (Duplicate Request Prevention)** | The system shall prevent duplicate friend requests between the same users. | Frontend, Backend, Database |
| **FR-31.3 (Request Note)** | The system shall allow the sender to attach a short introductory note. | UI, Frontend, Backend |
| **FR-31.4 (Request Notification)** | The system shall notify the recipient of the friend request. | Backend |

### US-32: Manage Friend Requests

**As a** user, **I want to** accept or reject incoming friend requests, **so that** I can control my social connections.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-32.1 (Request Center)** | The system shall provide a centralized view of incoming friend requests. | UI, Frontend, Backend |
| **FR-32.2 (Accept Request)** | The system shall allow a user to accept a friend request and add the sender to their friend list. | UI, Frontend, Backend |
| **FR-32.3 (Reject Request)** | The system shall allow a user to reject a friend request. | UI, Frontend, Backend |
| **FR-32.4 (Block Future Requests)** | The system shall allow a user to block future requests from a rejected sender. | UI, Frontend, Backend |
| **FR-32.5 (Sender Notification)** | The system shall notify the sender when a request is accepted or rejected. | Backend |

### US-33: Create and Manage Friend Groups

**As a** university student, **I want to** create and manage friend groups, **so that** I can collaborate privately with classmates and project teams.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-33.1 (Group Creation)** | The system shall allow a user to create a private or public friend group. | UI, Frontend, Backend |
| **FR-33.2 (Group Setup)** | The system shall allow the group owner to name the group, set privacy, and invite initial members. | UI, Frontend, Backend |
| **FR-33.3 (Group Sharing)** | The system shall allow group members to send messages and share documents within the group. | UI, Frontend, Backend |
| **FR-33.4 (Member List and Invitation)** | The system shall allow members to view the group member list and invite new members. | UI, Frontend, Backend |
| **FR-33.5 (Owner Member Removal)** | The system shall allow the group owner to remove members when necessary. | UI, Frontend, Backend |
| **FR-33.6 (Leave Group)** | The system shall allow members to leave a group. | UI, Frontend, Backend |

# Supporting Meeting Rooms (Secondary)

> Meeting rooms are optional supporting features. They do not replace the forum as the primary collaboration space.

### US-34: Receive Room Recommendations

**As a** university student, **I want to** receive optional study-room recommendations, **so that** I can find a room when I need live collaboration.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-34.1 (Optional Room Recommendations)** | The system shall provide optional recommendations for study rooms. | UI, Frontend, Backend |
| **FR-34.2 (Recommendation Factors)** | Room recommendations shall consider the user's courses, interests, and preferred study times. | Backend |
| **FR-34.3 (Room Availability)** | The system shall display room availability and capacity. | UI, Frontend, Backend |
| **FR-34.4 (Dismiss Room Recommendation)** | The system shall allow users to dismiss irrelevant room suggestions. | UI, Frontend, Backend |

### US-35: Join or Create a Study Room

**As a** university student, **I want to** join or create a study room, **so that** I can collaborate with classmates in real time when needed.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-35.1 (Browse Public Rooms)** | The system shall allow a user to browse available public study rooms. | UI, Frontend, Backend |
| **FR-35.2 (Join Public Room)** | The system shall allow a user to join a public room with available capacity. | UI, Frontend, Backend |
| **FR-35.3 (Request Private Room)** | The system shall allow a user to request access to a private or custom room. | UI, Frontend, Backend |
| **FR-35.4 (Manage Join Requests)** | The system shall allow a room owner or manager to accept or reject join requests. | UI, Frontend, Backend |
| **FR-35.5 (Create Room)** | The system shall allow a user to create a study room with a name, description, privacy level, and supported tools. | UI, Frontend, Backend |
| **FR-35.6 (Configure Room)** | The system shall allow room managers to configure capacity, duration, and communication rules. | UI, Frontend, Backend |

### US-36: Use Shared Study Tools

**As a** university student, **I want to** use shared study tools in a room, **so that** I can collaborate on academic problems with other participants.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-36.1 (Shared Whiteboard)** | The system shall provide a shared whiteboard for room participants. | UI, Frontend, Backend |
| **FR-36.2 (Shared Notes)** | The system shall provide shared notes for room participants. | UI, Frontend, Backend |
| **FR-36.3 (Shared Timer)** | The system shall provide a shared timer for room participants. | UI, Frontend, Backend |
| **FR-36.4 (Tool Synchronization)** | The system shall synchronize shared tool updates for all room participants. | Frontend, Backend |
| **FR-36.5 (Whiteboard Export)** | The system shall allow users to export whiteboard content when supported. | Frontend |
| **FR-36.6 (Reconnection Recovery)** | The system shall persist shared notes during the room session and handle reconnection without data loss. | Frontend, Backend |

### US-37: Request Learning Help

**As a** university student, **I want to** request learning help, **so that** I can receive assistance from friends, room participants, or concept learners.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-37.1 (Create Help Request)** | The system shall allow a learner to create a help request. | UI, Frontend, Backend |
| **FR-37.2 (Help Recipients)** | The system shall allow the learner to send the help request to friends, room participants, or concept learners. | UI, Frontend, Backend |
| **FR-37.3 (Help Response)** | The system shall allow other learners to accept or decline a help request. | UI, Frontend, Backend |
| **FR-37.4 (Cancel Help Request)** | The system shall allow the requester to cancel the help request. | UI, Frontend, Backend |
| **FR-37.5 (Convert to Forum Post)** | The system shall allow a help request to be converted into a forum post for asynchronous discussion. | UI, Frontend, Backend |
| **FR-37.6 (Help Rate Limit)** | The system shall rate-limit help requests to prevent spam. | Backend |

# Notifications and Safety

### US-38: Receive Notifications

**As a** user, **I want to** receive notifications about relevant activities, **so that** I do not miss important academic interactions.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-38.1 (Forum Notifications)** | The system shall notify a user about relevant forum activity, including comments, answers, votes, true-response marks, and mentions. | Backend |
| **FR-38.2 (Social Notifications)** | The system shall notify a user about friend requests, messages, group invitations, and help requests. | Backend |
| **FR-38.3 (Room Notifications)** | The system shall notify a user about optional room invitations when the user enables room notifications. | Backend |
| **FR-38.4 (Notification Center)** | The system shall provide an in-app notification center with unread indicators. | UI, Frontend, Backend |
| **FR-38.5 (Notification Preferences)** | The system shall allow users to configure which notification types they receive and whether audio alerts are enabled. | UI, Frontend, Backend |
| **FR-38.6 (Mark Notifications Read)** | The system shall allow users to mark notifications as read. | UI, Frontend, Backend |

### US-39: Control Communication

**As a** user, **I want to** control my communication and privacy settings, **so that** other users cannot interact with me in ways I do not permit.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-39.1 (Communication Settings)** | The system shall allow a user to control their communication settings. | UI, Frontend, Backend |
| **FR-39.2 (Privacy Settings)** | The system shall allow a user to control their privacy settings. | UI, Frontend, Backend |
| **FR-39.3 (Mute and Block)** | The system shall allow a user to mute or block specific users from messaging, friend requests, or room invitations. | UI, Frontend, Backend |
| **FR-39.4 (Direct Message Restriction)** | The system shall allow a user to restrict direct messages to confirmed friends. | UI, Frontend, Backend |
| **FR-39.5 (Interaction Prevention)** | Communication and privacy settings shall prevent interactions the user does not permit. | Backend |

### US-40: Report Inappropriate Behavior

**As a** user, **I want to** report inappropriate communication or behavior, **so that** the platform can maintain a safe learning environment.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-40.1 (Report Behavior)** | The system shall allow a user to report inappropriate communication or behavior. | UI, Frontend, Backend |
| **FR-40.2 (Report Surfaces)** | The system shall allow reporting from forum posts, comments, profiles, and messages. | UI, Frontend |
| **FR-40.3 (Report Context)** | The system shall capture contextual information with a report. | Backend |
| **FR-40.4 (Moderation Routing)** | The system shall route reports to the moderation queue. | Backend |
| **FR-40.5 (Safe Environment)** | Reporting shall support maintaining a safe and supportive university learning environment. | Backend |
