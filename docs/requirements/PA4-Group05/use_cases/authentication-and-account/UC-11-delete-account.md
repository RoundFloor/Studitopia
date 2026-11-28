# UC-11 — Delete Account

**Version:** `1.0`

**Performed by:** [Nguyen Thanh An] | **Edited by:** [Nguyen Thanh An]

| Field | Value |
| --- | --- |
| Use Case ID | UC-11 |
| Name | Delete Account |
| Primary Actor | registered user |
| Supporting Actors | None |
| Feature Group | Authentication Account |
| Priority | Not explicitly stated |
| Related User Stories | US-06 |
| Related Requirements | FR-06.1, FR-06.2, FR-06.3, FR-06.4, FR-06.5, FR-06.6; FR-07.1, FR-07.2, FR-07.3, FR-07.4, FR-07.5, FR-07.6; AC-06.1, AC-06.2, AC-06.3, AC-06.4, AC-06.5, AC-06.6; AC-07.1, AC-07.2, AC-07.3, AC-07.4, AC-07.5, AC-07.6, AC-07.7, AC-07.8; NFR-SEC-1, NFR-SEC-2, NFR-SEC-3, NFR-SEC-6, NFR-SEC-8 |
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
        UC11(["UC-11<br/>Delete Account"])
    end

    RegisteredUser --- UC11

    class RegisteredUser actor
    class UC11 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| registered user | Primary human actor | A user who requests permanent deletion of an account so personal information, posts, and data are erased from the platform. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| registered user | UC-11 Delete Account | Primary | Confirms deletion, completes email OTP re-authentication, and loses all account access. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor or use-case generalization is specified in the proposals. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No included use case is named in the proposals; email OTP rules are cited from US-07 without creating a new ID. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No extending use case is named in the proposals. |

### A4. Model Notes

1. UC-11 covers permanent account deletion only; deletion of a published resource is outside its scope.
2. Confirmation, cancellation, email OTP re-authentication, final deletion, session invalidation, and access rejection are internal behavior of UC-11 because no separate include or extend use case is named.
3. The OTP flow follows US-07 rules and the Settings re-authentication flow, but no new OTP use-case identifier is introduced.
4. No new I-xx, E-xx, or G-xx identifiers are introduced; the model contains only the primary actor and the selected base use case.

## Part B — Use Case Specification

### B1. Brief Description

A registered user permanently deletes an account so personal information, posts, and data are erased from the platform. The system first displays a confirmation dialog that explains the consequences, allows cancellation, and requires email OTP re-authentication before the destructive action can proceed.

After a valid OTP and final confirmation, the account is deleted, all active sessions across all devices are logged out, and future access to the deleted account is rejected. The Settings flow names this final action **Permanently Delete**.

### B2. Preconditions

1. The user has a registered account and an active authenticated session.
2. The user can access the registered email address for OTP re-authentication.
3. The user opens the Account area and can reach **Delete Account**.

### B3. Postconditions

1. **Success:** The account is permanently deleted, and personal information, posts, and data are erased from the platform.
2. **Success:** All active sessions across all devices are invalidated.
3. **Success:** Any attempt to access the deleted account is rejected.
4. **Success:** The user is returned to Login and can no longer authenticate with the deleted account.
5. **Failure:** If the user cancels or provides an invalid OTP, the account remains active.

### B4. Main Success Scenario (Basic Flow)

1. The user opens **Account** in Settings and selects **Delete Account**.
2. The system displays `DeleteAccountConfirmDialog`, explaining the consequences of deletion.
3. The user continues past the confirmation dialog.
4. The system requires re-authentication through email OTP before permanently deleting the account.
5. The system sends a 6-digit OTP to the registered email address and displays `ReauthOtpDialog` with the OTP input, resend control, and expiry hint.
6. The user submits a valid, unexpired OTP and selects **Permanently Delete**.
7. The system verifies that the OTP is valid, unexpired, and unused.
8. The system permanently deletes the account and erases personal information, posts, and data from the platform.
9. The system invalidates all active sessions across all devices and rejects future access to the deleted account.
10. The system returns the user to Login.

### B5. Alternative Flows

#### A1. Cancel deletion

At basic flow step 2 or 3, the user cancels deletion. The system closes the deletion flow and the account remains active (FR-06.3, AC-06.2).

#### A2. Resend OTP

At basic flow step 6, the user requests a new OTP. The system generates and sends a new 6-digit OTP, invalidates the previous OTP, and restarts the 5-minute expiry period (FR-07.6, AC-07.7).

### B6. Exception Flows

#### E1. OTP invalid, expired, or already used

The system rejects the OTP, displays an appropriate message, and does not permanently delete the account. The user may request a new OTP (FR-07.5, AC-07.4, AC-07.5, AC-07.8).

#### E2. Access to a deleted account

If the user or another client attempts to access the deleted account, the system rejects the request and keeps all sessions invalidated (FR-06.5, AC-06.5, FR-06.6, AC-06.6).

### B7. Business Rules

1. The system allows a user to request permanent deletion of the account (FR-06.1).
2. Selecting **Delete Account** displays a confirmation dialog explaining the consequences of deletion (FR-06.2, AC-06.1).
3. The user can cancel deletion, and the account must remain active (FR-06.3, AC-06.2).
4. When the user confirms deletion, the system proceeds with the account deletion process (AC-06.3).
5. The system requires re-authentication through email OTP before permanently deleting the account (FR-06.4, AC-06.4).
6. The OTP is 6 digits, expires 5 minutes after generation, is accepted only while valid and unused, and is invalidated on resend (FR-07.1, FR-07.2, FR-07.3, FR-07.4, FR-07.6; AC-07.1, AC-07.2, AC-07.3, AC-07.6, AC-07.7, AC-07.8).
7. Deleting an account logs out all active sessions across all devices and rejects access to the deleted account (FR-06.5, FR-06.6, AC-06.5, AC-06.6).
8. The final destructive action is **Permanently Delete** and is available only after confirmation and a valid OTP, as specified in the Settings deletion flow.

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-2 | User credentials must be stored using one-way password hashing with a secure hashing algorithm. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-SEC-8 | The system must protect against common web security vulnerabilities, including SQL injection, XSS, and CSRF. |
| Design constraint | OTP re-authentication is mandatory before permanent deletion; the OTP is 6 digits, expires after 5 minutes, is single-use, and is invalidated when a new OTP is generated. |
| Design constraint | Deleted-account access must be rejected and all sessions invalidated after deletion. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Account Settings deletion entry | Basic flow step 1 |
| Confirmation and cancellation | Basic flow steps 2-3; alternative flow A1 |
| Email OTP re-authentication | Basic flow steps 4-7; alternative flow A2; exception E1 |
| Final permanent deletion | Basic flow steps 8-10 |
| Deleted-account access rejection | Exception flow E2 |

### B10. Interface and Data Notes

- **Confirmed requirement — screen/flow path:** `Home → Profile → Re-auth → Delete → Login` in `userstory.md`; `settings.md` 7.5 gives `Account → Delete Account → confirmation → email OTP → Permanently Delete → session rejection`.
- **Confirmed requirement — UI text:** **Delete Account**, **Permanently Delete**, `DeleteAccountButton`, `DeleteAccountConfirmDialog`, `ReauthOtpDialog`, and `DeleteAccountFinalConfirmButton` are named in `settings.md`.
- **Confirmed requirement — OTP UI:** `ReauthOtpDialog` shows a 6-digit OTP input, resend control, and expiry hint; the generic OTP notice in `userstory.md` reads **Sent OTP to email ab*****@gmail.com**.
- **Confirmed requirement — confirmation:** `DeleteAccountConfirmDialog` explains the consequences of deletion and provides cancel/confirm actions; no exact consequence-paragraph text is specified.
- **Confirmed requirement — account data:** `settings.md` names `userId`, `email`, `emailVerified`, `status`, and `linkedProviders`; `API.md` defines status values `0 (inactive)`, `1(preprofile)`, `2(active)`, and `3(suspend)`.
- **Confirmed requirement — deletion outcome:** Personal information, posts, and data are erased from the platform; future access is rejected; all sessions are invalidated.
- **API endpoint:** Not specified in proposals; `API.md` has no account-deletion endpoint.
- **Statuses and error codes:** Not specified in proposals for deletion; `API.md` generally defines `UNAUTHORIZED` 401 and `FORBIDDEN` 403, and `response_code.md` lists `FORBIDDEN` 48010, backend `UNKNOWN ERROR` 2002, and `UNKNOWN DATABASE ERROR` 45000, but no deletion-specific code.
- **Recommendation only:** `/settings/account` is a recommended route in `settings.md`; the Settings flow states personal data is deleted or anonymized according to platform policy, while the story requires erasure from the platform.
- **Notification/privacy rules:** OTP is delivered to the registered email; no notification to other users is specified; deleted-account access must be rejected.

### B11. Source Alignment Notes

- `API.md` has no account-deletion endpoint and no OTP submission or resend endpoint, while FR-06.1 to FR-06.6 and AC-06.1 to AC-06.6 require deletion, OTP re-authentication, session invalidation, and access rejection.
- `settings.md` 7.5 supplies the email OTP re-authentication and permanent deletion flow: select **Delete Account**, review `DeleteAccountConfirmDialog`, cancel or continue, submit a valid email OTP, select **Permanently Delete**, then invalidate sessions and reject access.
- UC-01 Register Account defines OTP validation for email verification; UC-11 applies the same US-07 FR/AC rules to deletion re-authentication without reusing or creating a numbered OTP use-case ID.
- UC-02 Log In ends by creating the sessions that UC-11 invalidates; UC-11 returns the user to Login and does not repeat credential validation, CAPTCHA, or Google login behavior.
- No new I-xx, E-xx, or G-xx identifiers were created; the focused model uses only UC-11 and its primary actor.
