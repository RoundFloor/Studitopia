# Functional Requirements

# Authentication and Account Management

### US-01: Register Account

**As a** new user, **I want to** create an account, **so that** I can access the collaborative learning platform.

| FR | Requirement | Category |
| --- | --- | --- |
| **FR-01.1 (Registration Form)** | The system shall provide a registration form containing fields for Display Name, Username, Email, Password, and Confirm Password. | UI, Frontend |
| **FR-01.2 (CAPTCHA Display)** | The system shall provide a CAPTCHA verification component on the registration form. | UI, Frontend |
| **FR-01.3 (Password Visibility)** | The system shall hide the Password and Confirm Password fields by default and provide controls to toggle their visibility. | UI, Frontend |
| **FR-01.4 (Validation Error Display)** | The system shall display appropriate error messages when registration validation fails. | UI |
| **FR-01.5 (Registration Result Display)** | The system shall display an appropriate success or error message based on the registration result. | UI, Frontend |
| **FR-01.6 (OTP Input Page)** | The system shall provide an OTP verification page where users can enter the OTP received through email. | UI, Frontend |
| **FR-01.7 (OTP Verification Feedback)** | The system shall display an appropriate success or error message based on the OTP verification result. | UI, Frontend |
| **FR-01.8 (Google Registration Interface)** | The system shall provide a **Continue with Google** button on the registration page. | UI, Frontend |
| **FR-01.9 (Google Authentication Error Display)** | The system shall display an appropriate error message if Google authentication fails. | UI, Frontend |
| **FR-01.10 (Google Registration Feedback)** | The system shall display the Google registration result and guide the user to the next appropriate screen. | UI, Frontend |
| **FR-01.11 (Required Field Validation)** | The system shall validate that all required registration fields are completed before submitting the registration request. | Frontend |
| **FR-01.12 (Email Format Validation)** | The system shall validate the email address format before submitting the registration request. | Frontend |
| **FR-01.13 (Username Format Validation)** | The system shall validate that the username contains only alphanumeric characters before submitting the registration request. | Frontend |
| **FR-01.14 (Password Security Validation)** | The system shall validate that the password contains at least 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character. | Frontend |
| **FR-01.15 (Password Confirmation Validation)** | The system shall verify that the Confirm Password field matches the Password field before submitting the registration request. | Frontend |
| **FR-01.16 (Registration Submission)** | When the user clicks the **Register** button and all required client-side validations succeed, the system shall submit the registration request to the backend. | Frontend, Backend |
| **FR-01.17 (OTP Page Redirection)** | After the backend successfully processes the registration request and sends an OTP to the user's email, the system shall redirect the user to the OTP verification page. | Frontend, Backend |
| **FR-01.18 (OTP Submission)** | The system shall allow users to submit the entered OTP to the backend for verification. | Frontend, Backend |
| **FR-01.19 (OTP Error Handling)** | The system shall display an appropriate error message when the backend reports that the OTP is invalid or expired. | Frontend, UI |
| **FR-01.20 (Preference Settings Redirection)** | After the backend confirms successful OTP verification, the system shall redirect the user to the Preference Settings page. | Frontend, Backend |
| **FR-01.21 (Registration Error Handling)** | The system shall display an appropriate error message when the backend reports that registration has failed. | Frontend, UI |
| **FR-01.22 (Google Authentication Initiation)** | The system shall initiate Google authentication when the user selects **Continue with Google**. | Frontend |
| **FR-01.23 (Google Authentication Error Handling)** | The system shall display an appropriate error message if Google authentication fails. | Frontend, UI |
| **FR-01.24 (Google Registration Result Handling)** | The system shall display the Google registration result and guide the user to the next appropriate screen. | Frontend, UI |
| **FR-01.25 (Registration Data Validation)** | The system shall validate the registration data received from the frontend before processing the registration request. | Backend |
| **FR-01.26 (Email Uniqueness Check)** | The system shall check whether the submitted email address is already registered and return an appropriate error response if a duplicate is detected. | Backend, Database |
| **FR-01.27 (Username Uniqueness Check)** | The system shall check whether the submitted username is already in use and return an appropriate error response if a duplicate is detected. | Backend, Database |
| **FR-01.28 (Password Security Check)** | The system shall enforce password security requirements and return an appropriate error response if the password does not satisfy them. | Backend |
| **FR-01.29 (CAPTCHA Verification)** | The system shall verify the CAPTCHA response before processing a registration request and return an appropriate error response if verification fails. | Backend |
| **FR-01.30 (Registration Processing)** | After all required validations succeed, the system shall process the registration request and initiate email OTP verification. | Backend |
| **FR-01.31 (Email OTP Generation)** | The system shall generate a time-limited OTP for verifying the user's email address. | Backend |
| **FR-01.32 (Email OTP Delivery)** | The system shall send the generated OTP to the email address provided by the user. | Backend |
| **FR-01.33 (OTP Verification)** | The system shall verify the submitted OTP and return an appropriate response indicating whether the OTP is valid, invalid, or expired. | Backend |
| **FR-01.34 (Account Activation)** | The system shall activate the user's account after successful OTP verification. | Backend, Database |
| **FR-01.35 (Preference Settings Access)** | After successful OTP verification, the system shall authorize the user to proceed to the Preference Settings page. | Backend |
| **FR-01.36 (Unverified Account Restriction)** | The system shall restrict access to protected application features until the user successfully verifies their email address. | Backend, Database |
| **FR-01.37 (Google Authentication)** | The system shall authenticate users through Google OAuth and validate the authentication response before proceeding with registration. | Backend |
| **FR-01.38 (Google Authentication Error Response)** | The system shall return an appropriate error response if Google authentication fails. | Backend |
| **FR-01.39 (Google Account Registration)** | The system shall create or associate a user account with the authenticated Google account when registration requirements are satisfied. | Backend, Database |
| **FR-01.40 (Registration and Verification Response)** | The system shall return appropriate responses to the frontend for registration and OTP verification results. | Backend |
| **FR-01.41 (Registration Information Storage)** | The system shall store user registration information, including Display Name, Username, Email, and securely hashed Password, in the database. | Database |
| **FR-01.42 (Unique Account Constraints)** | The system shall enforce uniqueness constraints on usernames and email addresses to prevent duplicate accounts. | Database |
| **FR-01.43 (OTP Storage)** | The system shall store the OTP or its secure representation, its expiration time, and its verification status. | Database |
| **FR-01.44 (OTP Verification Status Update)** | The system shall update the OTP verification status after successful verification. | Database |
| **FR-01.45 (Account Activation Status)** | The system shall store and update the user's account activation and email verification status. | Database |

### US-02: Login

- FR-002.1: The system shall allow a registered user to log in to their account.
- FR-002.2: The system shall provide access to the user's profile, rooms, and learning activities after login.

### US-03: Recover Password

- FR-003.1: The system shall allow a registered user to recover or reset their password.
- FR-003.2: The password recovery or reset function shall allow the user to regain access to their account if they forget their password.

## Profile and Learning Preferences

### US-04: Manage Profile

- FR-004.1: The system shall allow a user to create and update their profile.
- FR-004.2: The profile shall contain information about the user's learning background and interests.

### US-05: Set Learning Preferences

- FR-005.1: The system shall allow a learner to specify their subjects.
- FR-005.2: The system shall allow a learner to specify their interests.
- FR-005.3: The system shall allow a learner to specify their learning habits.
- FR-005.4: The system shall allow a learner to specify their preferred study times.
- FR-005.5: The system shall allow a learner to specify their learning goals.
- FR-005.6: The system shall use these preferences to provide suitable learning environments and recommendations.

### US-06: Manage Privacy

- FR-006.1: The system shall allow a user to control the visibility of their personal information.
- FR-006.2: The privacy controls shall allow the user to protect their privacy while using the platform.

## Room Discovery and Matching

### US-07: Receive Room Recommendations

- FR-007.1: The system shall provide recommendations for suitable rooms.
- FR-007.2: Room recommendations shall consider the learner's subjects, interests, learning habits, or preferred study times.

### US-08: Select a Room Manually

- FR-008.1: The system shall allow a learner to browse rooms manually.
- FR-008.2: The system shall allow a learner to select a room according to their preferences.

### US-09: Automatically Match to a Room

- FR-009.1: The system shall allow a learner to use automatic room matching.
- FR-009.2: The system shall find a suitable learning environment without requiring the learner to search manually.

### US-10: Discover Similar Learners

- FR-010.1: The system shall allow a learner to discover other learners with similar subjects, interests, learning habits, or preferred study times.
- FR-010.2: The system shall support learners in finding suitable learning partners.

## Room Participation

### US-11: Join a Public Room

- FR-011.1: The system shall allow a learner to join an available public room without individual approval.
- FR-011.2: The learner shall be able to immediately participate in the shared learning environment.

### US-12: Select a Public Room Table

- FR-012.1: The system shall allow a learner in a public room to select an available table.
- FR-012.2: The system shall allow the learner to join the selected table.

### US-13: View Other Tables

- FR-013.1: The system shall allow a learner in a public room to view other occupied tables.
- FR-013.2: The system shall display permitted information about participants of occupied tables.
- FR-013.3: The information shall support discovering other learners and potential interactions.

### US-14: Request to Join a Custom Room

- FR-014.1: The system shall allow a learner to request access to a custom room.
- FR-014.2: The room request shall support participation in rooms that require approval.

### US-15: Manage Room Join Requests

- FR-015.1: The system shall allow a custom room owner or manager to accept room join requests.
- FR-015.2: The system shall allow a custom room owner or manager to reject room join requests.
- FR-015.3: Room owners or managers shall be able to control who participates in the learning environment.

## Room Creation and Management

### US-16: Create a Custom Room

- FR-016.1: The system shall allow a student or tutor to create a custom learning room.
- FR-016.2: The custom room shall support organizing a learning environment for a specific subject, activity, or group.

### US-17: Configure Room Policies

- FR-017.1: The system shall allow a room owner or manager to configure room capacity.
- FR-017.2: The system shall allow a room owner or manager to configure room duration.
- FR-017.3: The system shall allow a room owner or manager to configure communication rules.
- FR-017.4: The system shall allow a room owner or manager to configure supported tools.
- FR-017.5: The system shall allow a room owner or manager to configure other room policies.

## Learning Tools

### US-18: Use Shared Whiteboard

- FR-018.1: The system shall allow a learner to use a shared whiteboard with other participants.
- FR-018.2: The shared whiteboard shall support visually explaining and collaborating on learning topics.

### US-19: Use Shared Notes

- FR-019.1: The system shall allow a learner to create shared notes.
- FR-019.2: The system shall allow a learner to edit shared notes.
- FR-019.3: Shared notes shall allow participants to collaboratively record learning information.

### US-20: Use Shared Timer

- FR-020.1: The system shall allow a learner to use a shared timer.
- FR-020.2: The shared timer shall support managing study time with other participants.

## Room Communication

### US-21: Send a Hand Wave

- FR-021.1: The system shall allow a learner to send a Hand Wave to another learner at a table.
- FR-021.2: A Hand Wave shall indicate interest in communicating without immediately interrupting the other learner.

### US-22: Respond to a Hand Wave

- FR-022.1: The system shall allow a learner to accept a Hand Wave.
- FR-022.2: The system shall allow a learner to decline a Hand Wave.
- FR-022.3: The Hand Wave response shall allow the learner to decide whether to communicate with another learner.

### US-23: Start Message Communication

- FR-023.1: The system shall allow a learner to request a message conversation with another learner.
- FR-023.2: Message communication shall support discussing a learning topic privately.

### US-24: Start Voice Communication

- FR-024.1: The system shall allow a learner to request voice communication with another learner.
- FR-024.2: Voice communication shall support discussing a learning topic when text communication is insufficient.

## Learning Help

### US-25: Request Learning Help

- FR-025.1: The system shall allow a learner to create a help request.
- FR-025.2: The help request shall allow the learner to describe a difficult learning problem.
- FR-025.3: The help request shall allow other learners to provide assistance.

### US-26: Request Help from the Same Room

- FR-026.1: The system shall allow a learner to send a help request to eligible learners in the same room.
- FR-026.2: The system shall support receiving assistance from people currently studying in the same room.

### US-27: Request Help from Concept Learners

- FR-027.1: The system shall allow a learner to send a help request to learners who are studying or interested in the same concept.
- FR-027.2: The system shall support finding learners who may have relevant knowledge.

### US-28: Post a Learning Problem to the Forum

- FR-028.1: The system shall allow a learner to publish a learning problem in the forum.
- FR-028.2: Forum users shall be able to answer or discuss the published problem.

## Friends and Social Networking

### US-29: Find a Study Partner

- FR-029.1: The system shall allow a learner to find users with similar learning interests or goals.
- FR-029.2: The system shall support establishing useful learning connections.

### US-30: Send Friend Request

- FR-030.1: The system shall allow a learner to send a friend request to another user.
- FR-030.2: A friend connection shall support future learning activities.

### US-31: Manage Friend Requests

- FR-031.1: The system shall allow a user to accept incoming friend requests.
- FR-031.2: The system shall allow a user to reject incoming friend requests.
- FR-031.3: Friend request management shall allow the user to control their social connections.

## Documents and Learning Resources

### US-32: Share Learning Documents

- FR-032.1: The system shall allow a learner to upload learning documents in a room.
- FR-032.2: The system shall allow a learner to share learning documents in a room.
- FR-032.3: Shared documents shall be accessible to room participants.

### US-33: Access Shared Documents

- FR-033.1: The system shall allow a learner to view documents shared with them.
- FR-033.2: The system shall allow a learner to download documents shared with them.

## Library and Forum

### US-34: Find Learning Resources

- FR-034.1: The system shall allow a learner to search for books.
- FR-034.2: The system shall allow a learner to search for learning resources.
- FR-034.3: Search shall support finding materials related to the learner's learning needs.

### US-35: Receive Resource Recommendations

- FR-035.1: The system shall provide recommendations for books or learning resources.
- FR-035.2: Resource recommendations shall be related to the learner's subjects and interests.

### US-36: Participate in Forum Discussions

- FR-036.1: The system shall allow a learner to create forum posts.
- FR-036.2: The system shall allow a learner to answer forum posts.
- FR-036.3: The system shall allow a learner to discuss forum posts.
- FR-036.4: Forum participation shall support sharing knowledge and learning from other users.

## Notifications and Safety

### US-37: Receive Notifications

- FR-037.1: The system shall allow a user to receive notifications about relevant activities.
- FR-037.2: Notifications shall include room invitations.
- FR-037.3: Notifications shall include messages.
- FR-037.4: Notifications shall include friend requests.
- FR-037.5: Notifications shall include help requests.
- FR-037.6: Notifications shall help users avoid missing important learning interactions.

### US-38: Control Communication

- FR-038.1: The system shall allow a user to control their communication settings.
- FR-038.2: The system shall allow a user to control their privacy settings.
- FR-038.3: Communication and privacy settings shall allow users to prevent interactions they do not permit.

### US-39: Report Inappropriate Behavior

- FR-039.1: The system shall allow a user to report inappropriate communication or behavior.
- FR-039.2: Reporting shall support maintaining a safe and supportive learning environment.