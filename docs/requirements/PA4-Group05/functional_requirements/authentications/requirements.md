# Authentication and Account

**Version:** `1.1`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

[Back to functional requirements index](../../functional_requirement.md)

> Status: `Complete` = source-backed implementation exists; `Partial` = supporting code exists but the full requirement is not implemented; `Not implemented` = no source-backed implementation was found.

### US-01: Register Account

**As a** university student, **I want to** register for a Studitopia account with my university email, **so that** I can access academic forums and learning features.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-01.1 (Registration Form)** | The system shall provide a registration form containing full name, username, university email, password, and confirm password fields. | UI, Frontend | Complete |
| **FR-01.2 (Password Confirmation)** | The system shall require the user to enter the password twice and reject submission when the values do not match. | UI, Frontend | Complete |
| **FR-01.3 (Password Visibility Toggle)** | The system shall allow the user to toggle password visibility for password-entry fields. | UI, Frontend | Complete |
| **FR-01.4 (Registration API)** | The system shall submit registration data to the backend and create a pending or active user account. | Backend | Complete |
| **FR-01.5 (Unique Identity Constraints)** | The system shall enforce unique usernames and unique university email addresses. | Backend, Database | Complete |
| **FR-01.6 (Email Verification in Progress)** | The system shall indicate that email verification is required after registration. | UI, Frontend | Partial |
| **FR-01.7 (Registered General Login)** | The system shall allow a registered general user to log in after successful verification. | Backend, Database | Complete |
| **FR-01.8 (University Student Role)** | The system shall assign new registered accounts the student role by default. | Backend, Database | Complete |
| **FR-01.9 (Default Profile from Registration Data)** | The system shall initialize the user profile from the information supplied during registration. | Backend, Database | Partial |
| **FR-01.10 (Registration Feedback)** | The system shall display success and error feedback for registration outcomes. | UI, Frontend, Backend | Complete |
| **FR-01.11 (CAPTCHA on Registration)** | The system shall require CAPTCHA verification on the registration form. | UI, Frontend, Backend | Not implemented |
| **FR-01.12 (Backend ReCaptcha Verification)** | The system shall validate the CAPTCHA token on the backend before creating the account. | Backend | Not implemented |
| **FR-01.13 (Email OTP Verification)** | The system shall send and verify a one-time password for email ownership confirmation. | Backend | Complete |
| **FR-01.14 (Duplicate Email Rejection)** | The system shall reject registration when the email is already in use. | Frontend, Backend | Complete |
| **FR-01.15 (Duplicate Username Rejection)** | The system shall reject registration when the username is already in use. | Frontend, Backend | Complete |
| **FR-01.16 (No Explicit Terms Checkbox)** | The system shall not require the user to select a separate terms-and-conditions checkbox during registration. | UI, Frontend | Not implemented |
| **FR-01.17 (Excluded Username Reserved List)** | The system shall reject usernames reserved by the platform or excluded from public use. | Backend, Database | Not implemented |
| **FR-01.18 (Unique User ID)** | The system shall assign each user a unique identifier. | Backend, Database | Complete |
| **FR-01.19 (Email Format Validation)** | The system shall validate the university email format before account creation. | Frontend, Backend | Complete |
| **FR-01.20 (Strong Password Validation)** | The system shall enforce the password policy during registration. | Frontend, Backend | Complete |
| **FR-01.21 (Name, Date, and Gender Fields)** | The system shall collect full name, date of birth, and gender during registration. | UI, Frontend, Backend | Not implemented |
| **FR-01.22 (Status Active)** | The system shall set the account status to active after successful registration and verification. | Backend, Database | Partial |
| **FR-01.23 (OTP Resend)** | The system shall allow the user to request a new verification OTP. | UI, Frontend, Backend | Complete |
| **FR-01.24 (OTP Expiration)** | The system shall expire verification OTPs after the configured time limit. | Backend | Complete |
| **FR-01.25 (OTP Max Attempts)** | The system shall limit the number of failed OTP verification attempts. | Backend | Complete |
| **FR-01.26 (Resend Cooldown)** | The system shall enforce a cooldown period between OTP resend requests. | Backend | Complete |
| **FR-01.27 (OTP Reuse Blocked)** | The system shall prevent a used OTP from being accepted again. | Backend, Database | Complete |
| **FR-01.28 (Welcome Email After Signup)** | The system shall send a welcome email after successful account creation. | Backend | Not implemented |
| **FR-01.29 (OAuth/Google Login)** | The system shall allow users to register or log in through a Google account. | UI, Frontend, Backend | Not implemented |
| **FR-01.30 (Cancel Verification)** | The system shall allow the user to cancel the email verification flow. | UI, Frontend | Not implemented |
| **FR-01.31 (Register via Phone)** | The system shall allow users to register using a phone number. | UI, Frontend, Backend | Not implemented |
| **FR-01.32 (Terms Checkbox)** | The system shall require an explicit terms-and-conditions checkbox during registration. | UI, Frontend | Not implemented |
| **FR-01.33 (Parent Email for Under 16)** | The system shall require parent or guardian email confirmation for users under 16. | UI, Frontend, Backend | Not implemented |
| **FR-01.34 (Agree to Terms)** | The system shall record that the user agreed to the terms and policies. | Backend, Database | Not implemented |
| **FR-01.35 (CAPTCHA)** | The system shall present a CAPTCHA challenge before submitting registration. | UI, Frontend | Not implemented |
| **FR-01.36 (Auto-Login After Verification)** | The system shall log the user in automatically after successful email verification. | Frontend, Backend | Partial |
| **FR-01.37 (Default Profile from Provided Data)** | The system shall create the user profile using the provided name, username, and email. | Backend, Database | Partial |
| **FR-01.38 (Redirect to Dashboard)** | The system shall redirect the user to the dashboard or home page after successful registration. | UI, Frontend | Not implemented |
| **FR-01.39 (Welcome Email)** | The system shall send a welcome email to the newly registered user. | Backend | Not implemented |
| **FR-01.40 (Login by Email)** | The system shall allow a registered user to log in using their email address. | Frontend, Backend | Complete |
| **FR-01.41 (Password Change Feature)** | The system shall allow the user to change their password from the account settings. | UI, Frontend, Backend | Not implemented |
| **FR-01.42 (Hidden Password by Default)** | The system shall hide password characters by default in password fields. | UI, Frontend | Complete |
| **FR-01.43 (Academic Information Fields)** | The system shall collect university and major information during registration. | UI, Frontend, Backend | Not implemented |
| **FR-01.44 (Password Strength Indicator)** | The system shall display password strength or validation feedback while the user types. | UI, Frontend | Complete |
| **FR-01.45 (Unverified Account Restrictions)** | The system shall prevent unverified accounts from accessing protected platform features. | Backend | Not implemented |

### US-02: Login

**As a** registered user, **I want to** log in with my email and password, **so that** I can access my account and the university forum.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-02.1 (Login Form)** | The system shall provide a login form with email and password fields. | UI, Frontend | Complete |
| **FR-02.2 (Login API)** | The system shall authenticate the submitted credentials against stored account data. | Backend | Complete |
| **FR-02.3 (Session Token)** | The system shall issue a session token or cookies after successful authentication. | Backend | Complete |
| **FR-02.4 (Redirect After Login)** | The system shall redirect the user to the forum or home page after successful login. | Frontend | Complete |
| **FR-02.5 (Login Feedback)** | The system shall display an appropriate error message for invalid credentials. | UI, Frontend, Backend | Complete |

### US-03: Logout

**As a** logged-in user, **I want to** log out, **so that** my session is ended and my account is protected on shared devices.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-03.1 (Logout Control)** | The system shall provide a logout action in the authenticated interface. | UI, Frontend | Complete |
| **FR-03.2 (Session Invalidation)** | The system shall invalidate or clear the server-issued session credentials on logout. | Backend | Partial |
| **FR-03.3 (Client Session Cleanup)** | The system shall clear local authentication state and redirect the user after logout. | Frontend | Complete |

### US-04: Automatic Logout

**As a** user, **I want** the system to automatically log me out after inactivity, **so that** my account remains secure when I leave my session unattended.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-04.1 (Inactivity Timeout)** | The system shall automatically log out a user after 15 minutes of inactivity. | Frontend, Backend | Not implemented |
| **FR-04.2 (Expired Session Access)** | The system shall deny access to protected pages or APIs when a session has expired. | Backend | Not implemented |
| **FR-04.3 (Activity Reset)** | The system shall reset the inactivity timer when a qualifying user request is received before the timeout. | Frontend, Backend | Not implemented |
| **FR-04.4 (Expiration Notice)** | The system shall inform the user that their session expired and require them to log in again. | UI, Frontend | Not implemented |

### US-05: Recover Password

**As a** registered user, **I want to** recover or reset my password, **so that** I can regain access to my account.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-05.1 (Recovery Request)** | The system shall allow a registered user to recover or reset their password using their username or email. | UI, Frontend, Backend | Complete |
| **FR-05.2 (Recovery OTP)** | The system shall send a time-limited OTP to the user's registered email address. | Backend | Complete |
| **FR-05.3 (Enumeration Protection)** | The system shall return the same generic response whether or not the submitted account exists. | Backend | Complete |
| **FR-05.4 (New Password Policy)** | The system shall enforce the password security policy when the user sets a new password. | Frontend, Backend | Complete |
| **FR-05.5 (Reset Session Invalidation)** | The system shall invalidate all active sessions after a successful password reset. | Backend, Database | Complete |

### US-06: Delete Account

**As a** registered user, **I want to** permanently delete my account, **so that** my personal information and data are erased from the platform.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-06.1 (Deletion Request)** | The system shall allow a user to request permanent deletion of their account. | UI, Frontend | Not implemented |
| **FR-06.2 (Deletion Confirmation)** | The system shall display a confirmation dialog explaining the consequences of account deletion. | UI, Frontend | Not implemented |
| **FR-06.3 (Cancel Deletion)** | The system shall allow the user to cancel the deletion request. | UI, Frontend | Not implemented |
| **FR-06.4 (Re-authentication)** | The system shall require re-authentication through email OTP before permanently deleting the account. | Frontend, Backend | Not implemented |
| **FR-06.5 (Deleted Account Access)** | The system shall reject access to an account that has already been deleted. | Backend, Database | Not implemented |
| **FR-06.6 (Deletion Session Invalidation)** | The system shall log out all active sessions after account deletion. | Backend, Database | Not implemented |

### US-07: OTP Validation

**As a** user, **I want to** receive and submit a one-time password, **so that** I can verify my identity securely.

| FR | Requirement | Category | Status |
| --- | --- | --- | --- |
| **FR-07.1 (OTP Generation)** | The system shall generate a 6-digit numeric OTP for actions that require email verification. | Backend | Complete |
| **FR-07.2 (OTP Delivery)** | The system shall send the OTP to the user's registered email address. | Backend | Complete |
| **FR-07.3 (OTP Expiration)** | The system shall expire an OTP 5 minutes after it is generated. | Backend, Database | Partial |
| **FR-07.4 (Valid OTP Acceptance)** | The system shall accept only a valid, unexpired, unused 6-digit OTP. | Frontend, Backend | Complete |
| **FR-07.5 (Invalid OTP Handling)** | The system shall reject invalid, expired, or previously used OTPs and display an appropriate message. | UI, Frontend, Backend | Complete |
| **FR-07.6 (OTP Resend)** | The system shall allow the user to request a new OTP and invalidate the previous OTP. | UI, Frontend, Backend, Database | Complete |
