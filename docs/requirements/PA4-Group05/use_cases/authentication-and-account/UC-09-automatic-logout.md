# UC-09 — Automatic Logout

**Version:** `1.0`

**Performed by:** [Nguyen Thanh An] | **Edited by:** [Nguyen Thanh An]

| Field | Value |
| --- | --- |
| Use Case ID | UC-09 |
| Name | Automatic Logout |
| Primary Actor | user |
| Supporting Actors | None |
| Feature Group | Authentication Account |
| Priority | Not explicitly stated |
| Related User Stories | US-04 |
| Related Requirements | FR-04.1, FR-04.2, FR-04.3, FR-04.4; AC-04.1, AC-04.2, AC-04.3, AC-04.4; NFR-SEC-1, NFR-SEC-6, NFR-SEC-7 |
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

    User@{ shape: person, label: "user" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC09(["UC-09<br/>Automatic Logout"])
    end

    User --- UC09

    class User actor
    class UC09 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| user | Primary human actor | A logged-in user whose inactive session is automatically terminated to protect the account when unattended. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| user | UC-09 Automatic Logout | Primary | Receives automatic session expiration after inactivity and is required to log in again. |

#### A3.2 Generalization and Specialization
| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| None | None | None | No actor or use-case generalization is specified in the proposals. |

#### A3.3 Include
| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| None | None | No included use case is named in the proposals. |

#### A3.4 Extend
| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| None | None | None | No extending use case is named in the proposals. |

### A4. Model Notes

1. UC-09 covers automatic termination after inactivity; manual logout is outside its scope and belongs to UC-08.
2. FR-04.1 and AC-04.1 specify a 15-minute inactivity timeout that is not implemented in the current build. NFR-SEC-7 covers token and refresh session lifetimes.
3. Activity reset, protected-access denial, and expiration messaging are internal behavior because no separate include or extend use case is named.
4. No new I-xx, E-xx, or G-xx identifiers are introduced; the model contains only the primary actor and the selected base use case.

## Part B — Use Case Specification

### B1. Brief Description

The system automatically logs out an inactive user so an unattended account remains secure. After a successful login, no requests from the user for 15 consecutive minutes cause the session to terminate and the user to be logged out, as stated by FR-04.1 and AC-04.1.

When the session has expired, protected pages and APIs deny access and require login again. The login redirect includes a message informing the user that the session expired; no exact message wording is provided in the proposals.

### B2. Preconditions

1. The user has successfully logged in and has an active session.
2. The inactivity timer is maintained by the frontend and backend as specified by FR-04.1 and FR-04.3.
3. The user does not send a qualifying request before the applicable timeout.

### B3. Postconditions

1. **Success:** The inactive session is terminated and the user is logged out.
2. **Success:** The user is redirected to Login and informed that the session expired.
3. **Success:** Protected pages and APIs deny access using the expired session.
4. **Failure:** If a qualifying request is received before the timeout, the inactivity timer is reset and the session remains active.

### B4. Main Success Scenario (Basic Flow)

1. The user completes login and receives an active session.
2. The system starts or maintains the inactivity timer for that session.
3. The system receives no requests from the user for 15 consecutive minutes, according to FR-04.1 and AC-04.1.
4. The system automatically terminates the session and logs the user out.
5. The user attempts to continue using the application or is redirected to Login.
6. The system displays a message informing the user that the session expired and requires login again.

### B5. Alternative Flows

The story specifies no distinct alternative flow; the source-backed variant is activity before the timeout.

#### A1. Session reset on activity

At basic flow step 3, a new qualifying request is received before the timeout. The system resets the inactivity timer, keeps the session active, and resumes normal use of the protected page or API (FR-04.3, AC-04.3).

### B6. Exception Flows

#### E1. Protected page access after session expiration

The user attempts to open a protected page after expiry. The system denies access, redirects to Login, displays the session-expiration message, and requires the user to log in again (FR-04.2, FR-04.4, AC-04.2, AC-04.4).

#### E2. Protected API access after session expiration

The user or frontend sends a protected API request after expiry. The system denies access and requires a new login; no automatic-renewal behavior is specified in the proposals (FR-04.2, AC-04.2).

### B7. Business Rules

1. After 15 consecutive minutes with no requests, the system automatically terminates the session and logs the user out (FR-04.1, AC-04.1).
2. FR-04.1 and AC-04.1 specify a 15-minute inactivity timeout that is not implemented in the current build. NFR-SEC-7 covers token and refresh session lifetimes.
3. A protected page or API must deny access after session expiration and require login again (FR-04.2, AC-04.2).
4. A qualifying request received before the timeout resets the inactivity timer (FR-04.3, AC-04.3).
5. The login redirect after expiration must inform the user that the session expired (FR-04.4, AC-04.4).
6. Protected resources require authentication, and authorization checks must remain server-side (NFR-SEC-1, NFR-SEC-6).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-SEC-7 | Access tokens expire after 30 minutes, and refresh sessions expire after 30 days. |
| Design constraint | The specified inactivity timeout is 15 minutes (FR-04.1, AC-04.1). |
| Design constraint | The expiration notice is required by FR-04.4 and AC-04.4, but its exact text is not specified in the proposals. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Inactivity timer start or maintenance | Basic flow steps 1-2 |
| Timeout detection | Basic flow step 3 |
| Qualifying request | Alternative flow A1 |
| Protected-page denial | Exception flow E1 |
| Protected-API denial | Exception flow E2 |
| Expiration notice | Basic flow step 6; exception flow E1 |

### B10. Interface and Data Notes

- **Confirmed requirement — screen/flow path:** Automatic logout returns the user to Login; `screen_flow.md` shows `Home → Logout` and the Authentication area with `Login`.
- **Confirmed requirement — UI behavior:** The system informs the user that the session expired and requires login again; no exact quoted message text is specified.
- **Confirmed requirement — session data:** `settings.md` names `sessionId`, `startedAt`, `lastActivityAt`, and `expiresAt` for session summary and inactivity feedback.
- **Inactivity policy** ? FR-04.1 specifies automatic logout after 15 minutes of inactivity.
- **API endpoint:** Not specified in proposals; `API.md` has no dedicated automatic-logout endpoint.
- **Statuses and error codes:** Not specified in proposals for automatic logout itself; `API.md` generally defines `UNAUTHORIZED` 401, and no inactivity-specific error code appears in `response_code.md`.
- **Notification/privacy rules:** The only specified feedback is the session-expiration notice on redirect to Login; no email or notification-center message is specified.
- **Recommendation only:** `/settings` and the Account Settings session summary are recommended UI groupings in `settings.md`, not proposal-defined routes.

### B11. Source Alignment Notes

- FR-04.1 and AC-04.1 specify a 15-minute inactivity timeout that is not implemented in the current build. NFR-SEC-7 covers token and refresh session lifetimes.
- UC-02 Log In already treats session expiry as a protected-access exception and lists NFR-SEC-7; UC-09 details the inactivity trigger, timer reset, denial, and notice without duplicating login credential behavior.
- `API.md` has no dedicated automatic-logout endpoint; expired access is enforced through denial of protected pages and APIs rather than a documented route.
- UC-01 Register Account can create an initial session, but it does not define inactivity policy; whether that session follows the same timeout is not specified in the proposals.
- No new I-xx, E-xx, or G-xx identifiers were created; the focused model uses only UC-09 and its primary actor.
