# UC-10 — Recover Password

**Version:** `1.0`

**Performed by:** [Nguyen Thanh An] | **Edited by:** [Nguyen Thanh An]

| Field | Value |
| --- | --- |
| Use Case ID | UC-10 |
| Name | Recover Password |
| Primary Actor | registered user |
| Supporting Actors | None |
| Feature Group | Authentication Account |
| Priority | Not explicitly stated |
| Related User Stories | US-05 |
| Related Requirements | FR-05.1, FR-05.2, FR-05.3, FR-05.4, FR-05.5; FR-07.1, FR-07.2, FR-07.3, FR-07.4, FR-07.5, FR-07.6; FR-01.9; AC-05.1, AC-05.2, AC-05.3, AC-05.4, AC-05.5, AC-05.6; AC-07.1, AC-07.2, AC-07.3, AC-07.4, AC-07.5, AC-07.6, AC-07.7, AC-07.8; NFR-SEC-1, NFR-SEC-2, NFR-SEC-3, NFR-SEC-8 |
| Source Documents | `proposals/userstory.md`; `proposals/functional_requirement.md`; `proposals/overview.md`; `proposals/feature_flow.md`; `proposals/screen_flow.md`; `proposals/API.md`; `proposals/response_code.md`; `proposals/non_functional_requirement.md`; `proposals/settings.md` |

## Part A — Use Case Model

### A1. Focused Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000
    classDef specialized fill:#ffe6cc,stroke:#b36b00,stroke-width:2px,color:#000

    RegisteredUser@{ shape: person, label: "registered user" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC10(["UC-10<br/>Recover Password"])
    end

    RegisteredUser --- UC10

    class RegisteredUser actor
    class UC10 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| registered user | Primary human actor | A user with an existing account who regains access after forgetting the password. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| registered user | UC-10 Recover Password | Primary | Requests an OTP, sets a new password, and returns to Login after all sessions are invalidated. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor or use-case generalization is specified in the proposals. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No included use case is named in the proposals; OTP rules are cited from US-07 without creating a new ID. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No extending use case is named in the proposals. |

### A4. Model Notes

1. UC-10 starts from Login via **Forget Button** or from Account Settings via **Recover Password**; it ends with a password reset and re-login.
2. OTP generation, delivery, expiry, verification, resend, and reuse prevention are governed by FR-07.1 to FR-07.6 and AC-07.1 to AC-07.8 but are not modeled as a new included use case.
3. Non-enumeration protection is internal backend behavior: the requester receives the same generic success message whether the account exists or not.
4. No new I-xx, E-xx, or G-xx identifiers are introduced; the model contains only the primary actor and the selected base use case.

## Part B — Use Case Specification

### B1. Brief Description

A registered user recovers or resets a forgotten password by submitting a registered email address or username and completing an email OTP challenge. The system protects against account enumeration by returning the same generic success message for existing and non-existent accounts.

After a valid OTP, the user enters and confirms a new password that satisfies the password security policy. Completing the reset invalidates all active sessions across all devices and requires the user to log in again.

### B2. Preconditions

1. The user has forgotten the password but can access the registered email address.
2. The submitted identifier is a registered email address or username, or the request is treated as a non-existent account under the generic-response rule.
3. Email delivery and OTP verification are available.

### B3. Postconditions

1. **Success:** The user's password is updated using a securely stored hash.
2. **Success:** All active sessions across all devices are invalidated, and the user must log in again.
3. **Success:** A non-existent account request produces the identical generic success message and creates no accessible session.
4. **Failure:** Invalid OTP, policy failure, or confirmation mismatch leaves the password unchanged.

### B4. Main Success Scenario (Basic Flow)

1. The user selects **Forget Button** on Login or **Recover Password** in Account Settings.
2. The system displays the recovery form with **Username / Email** and **Send code**.
3. The user enters a registered email address or username and selects **Send code**.
4. The backend processes the request without revealing whether the account exists.
5. The system sends a time-limited OTP to the registered email address and shows the OTP verification screen.
6. The user enters the 6-digit OTP in the **6 Slot OTP** field and selects **Submit Button**.
7. The backend verifies that the OTP is valid, unexpired, and unused.
8. The system opens the **New Password** screen.
9. The user enters **New Password** and **Confirm New Password**.
10. The system verifies that the new password satisfies the password security policy and that the confirmation matches.
11. The system updates the stored password hash and invalidates all active sessions across all devices.
12. The system prompts the user to log in again.

### B5. Alternative Flows

#### A1. Recovery request for a non-existent account

At basic flow step 4, the submitted identifier does not match an account. The system returns the identical generic success message required by FR-05.3 and AC-05.3; no OTP is delivered to a non-existent account.

#### A2. Resend OTP

At basic flow step 6, the user requests a new OTP. The system generates and sends a new 6-digit OTP, invalidates the previous OTP, and restarts the 5-minute expiry period (FR-07.6, AC-07.7).

#### A3. Change Password entry from Account Settings

At basic flow step 1, the user opens **Account** and selects **Change Password** rather than **Recover Password**. `settings.md` uses the same OTP-verified update sequence; the direct-change control is explicitly described as a recommendation derived from recovery policy.

### B6. Exception Flows

#### E1. OTP invalid, expired, or already used

The system rejects the OTP, displays an appropriate error message, and does not open the password-reset form. The user may request a new OTP (FR-07.5, AC-07.4, AC-07.5, AC-07.8).

#### E2. New password fails the security policy

The system blocks submission and shows a validation error. The new password must contain at least 8 characters, including at least one lowercase letter, one uppercase letter, one number, and one special character (FR-05.4, FR-01.9, AC-05.4).

#### E3. Confirm New Password mismatch

The system blocks submission until **Confirm New Password** matches **New Password** (AC-05.5).

### B7. Business Rules

1. The system accepts a registered email address or username (FR-05.1, AC-05.1).
2. The system sends a time-limited OTP to the registered email address (FR-05.2, AC-05.2).
3. A request for a non-existent account returns the identical generic success message to prevent user enumeration (FR-05.3, AC-05.3).
4. The new password must satisfy the password security policy: at least 8 characters with lowercase, uppercase, number, and special character (FR-05.4, FR-01.9, AC-05.4).
5. **Confirm New Password** must match **New Password** (AC-05.5).
6. Completing a password reset logs out all active sessions across all devices (FR-05.5, AC-05.6).
7. The OTP is 6 digits, expires 5 minutes after generation, is accepted only while valid and unused, and is invalidated on resend (FR-07.1, FR-07.2, FR-07.3, FR-07.4, FR-07.6; AC-07.1, AC-07.2, AC-07.3, AC-07.6, AC-07.7, AC-07.8).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-2 | User credentials must be stored using one-way password hashing with a secure hashing algorithm. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-8 | The system must protect against common web security vulnerabilities, including SQL injection, XSS, and CSRF. |
| Design constraint | The OTP is a 6-digit numeric code, expires after 5 minutes, is single-use, and is invalidated when a new OTP is generated. |
| Design constraint | Password hashes must never be displayed; the generic recovery response must not distinguish existing from non-existent accounts. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Login or Account Settings entry | Basic flow step 1; alternative flow A3 |
| Generic non-enumeration response | Basic flow step 4; alternative flow A1 |
| OTP verification | Basic flow steps 5-7; alternative flow A2; exception E1 |
| New password entry | Basic flow steps 8-10; exceptions E2-E3 |
| Session invalidation and re-login | Basic flow steps 11-12 |

### B10. Interface and Data Notes

- **Confirmed requirement — screen/flow path:** `Login → Recover → OTP → New Password → Login` after reset; `Login → Recover` is shown as `Forget Button` in `userstory.md`; `screen_flow.md` shows `Login .-> Recover`; `feature_flow.md` shows `Authentication → Recover Password`.
- **Confirmed requirement — recovery UI:** **Username / Email**, **Send code**, **6 Slot OTP**, **Resend code**, and **Submit Button** are named in `userstory.md`.
- **Confirmed requirement — new-password UI:** **New Password** and **Confirm New Password** are named in `userstory.md`; `settings.md` names `NewPasswordInput`, `ConfirmPasswordInput`, and `PasswordVisibilityToggle`.
- **Confirmed requirement — OTP notice:** The generic OTP UI in `userstory.md` shows **Sent OTP to email ab*****@gmail.com**; recovery sends the code only to the registered email address.
- **Confirmed requirement — data fields:** Submitted identifier, OTP, new password, confirmation, password hash, and session invalidation across all devices.
- **API endpoint:** Not specified in proposals; `API.md` has no password-recovery endpoint.
- **Statuses and error codes:** Not specified in proposals for recovery; `response_code.md` lists `INVALID_EMAIL` 45002, `INVALID_USERNAME` 45003, `INVALID_PASSWORD` 45004, backend `UNKNOWN ERROR` 2002, and `UNKNOWN DATABASE ERROR` 45000, but no OTP-specific code.
- **Notification/privacy rules:** OTP is delivered to the registered email; non-existent accounts receive the identical generic success message; password hashes are never displayed.
- **Recommendation only:** `/settings/account`, `PasswordChangeButton`, and direct **Change Password** are Settings recommendations, not proposal-defined API routes.

### B11. Source Alignment Notes

- `API.md` has no password-recovery endpoint, while FR-05.1 to FR-05.5 and AC-05.1 to AC-05.6 require recovery, OTP delivery, validation, and session invalidation.
- UC-01 Register Account already defines the password policy and OTP rules and notes that OTP submission and resend endpoints are absent; UC-10 reuses those exact FR/AC IDs without creating a new OTP use case.
- UC-02 Log In provides the **Forget Button** entry into Recover; UC-10 begins after that navigation and does not repeat login credential or CAPTCHA behavior.
- `userstory.md` draws `New Password → Submit Button → Home`, while AC-05.6, FR-05.5, and `settings.md` 7.4 require all sessions to be invalidated and the user to log in again; this specification follows the explicit AC/FR/settings behavior.
- No new I-xx, E-xx, or G-xx identifiers were created; the focused model uses only UC-10 and its primary actor.
