# UC-08 — Logout

**Version:** `1.0`

**Performed by:** [Nguyen Thanh An] | **Edited by:** [Nguyen Thanh An]

| Field | Value |
| --- | --- |
| Use Case ID | UC-08 |
| Name | Logout |
| Primary Actor | logged-in user |
| Supporting Actors | None |
| Feature Group | Authentication Account |
| Priority | Not explicitly stated |
| Related User Stories | US-03 |
| Related Requirements | FR-03.1, FR-03.2, FR-03.3; AC-03.1, AC-03.2, AC-03.3, AC-03.4; NFR-SEC-1, NFR-SEC-3, NFR-SEC-6, NFR-SEC-8 |
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

    LoggedUser@{ shape: person, label: "logged-in user" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC08(["UC-08<br/>Logout"])
    end

    LoggedUser --- UC08

    class LoggedUser actor
    class UC08 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = selected use case; solid line = association; labelled solid arrow = generalization; dashed arrow = include or extend.

### A2. Actor Register

| Actor | Type | Description |
| --- | --- | --- |
| logged-in user | Primary human actor | A user with an active authenticated session who ends that session to protect account security on a shared device or when finished using the platform. |

### A3. Relationships

#### A3.1 Associations
| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| logged-in user | UC-08 Logout | Primary | Selects the logout action and causes client cleanup and backend session invalidation. |

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

1. UC-08 is limited to ending the current authenticated session; it does not model login, registration, password recovery, or account deletion.
2. Client cleanup and backend invalidation are internal behavior of UC-08 because the proposals do not name a separate included use case.
3. The logout action is available after navigation to Settings or from global navigation, but no distinct UI actor or supporting service is specified.
4. No new I-xx, E-xx, or G-xx identifiers are introduced; the model contains only the primary actor and the selected base use case.

## Part B — Use Case Specification

### B1. Brief Description

A logged-in user ends the current session to protect the account when using a shared device or when finished with the platform. The system clears authentication tokens and temporary user data from local and session storage and invalidates the active backend session.

The screen flow places logout after Home or Settings and returns the user to Login. Settings groups the control as a global account action labeled **Log out**.

### B2. Preconditions

1. The user has an active authenticated session.
2. The user can reach the logout control from Settings or global navigation.
3. The frontend and backend are available to perform cleanup and session invalidation.

### B3. Postconditions

1. **Success:** Authentication tokens and temporary user data are cleared from local and session storage.
2. **Success:** The active backend session is invalidated and the user is returned to Login.
3. **Failure:** If cleanup or invalidation does not complete, the source documents do not specify a recovery message or retries.

### B4. Main Success Scenario (Basic Flow)

1. The logged-in user opens Settings or uses global navigation.
2. The system displays the **Log out** control.
3. The user selects **Log out**.
4. The frontend clears authentication tokens and temporary user data from local and session storage.
5. The backend invalidates the user's active session.
6. The system redirects the user to Login.

### B5. Alternative Flows

The story specifies no distinct alternative flow; the source-backed variants are the entry points to the same logout behavior.

#### A1. Logout from Settings

From `Home → Settings`, the user selects **Log out** in the Settings area. The flow resumes at basic flow step 3.

#### A2. Logout from global navigation

The user selects **Log out** from global navigation without opening Settings. The flow resumes at basic flow step 3.

### B6. Exception Flows

No logout-specific exception flow is specified in the proposals.

### B7. Business Rules

1. A logged-in user is allowed to log out of the account (FR-03.1).
2. On logout, all authentication tokens and temporary user data stored in local and session storage must be cleared (FR-03.2, AC-03.1).
3. On logout, the user's active session must be invalidated on the backend (FR-03.3, AC-03.2).
4. UI must appear exactly as designed, and navigation buttons must work correctly (AC-03.3, AC-03.4).
5. After logout, protected user resources remain subject to authentication requirements (NFR-SEC-1).

### B8. Special Requirements

| ID | Requirement |
| --- | --- |
| NFR-SEC-1 | Authentication is required before accessing protected user resources. |
| NFR-SEC-3 | Sensitive communication must be encrypted using TLS 1.2 or higher. |
| NFR-SEC-6 | Server-side authorization checks must prevent unauthorized access. |
| NFR-SEC-8 | The system must protect against common web security vulnerabilities, including SQL injection, XSS, and CSRF. |
| Design constraint | Local and session storage cleanup and backend session invalidation are required by FR-03.2, FR-03.3, AC-03.1, and AC-03.2. |

### B9. Extension Points

| Extension Point | Location in Flow of Events |
| --- | --- |
| Settings logout entry | Basic flow steps 1-2; alternative flow A1 |
| Global-navigation logout entry | Basic flow steps 1-2; alternative flow A2 |
| Client cleanup | Basic flow step 4 |
| Backend session invalidation | Basic flow step 5 |
| Redirect to Login | Basic flow step 6 |

### B10. Interface and Data Notes

- **Confirmed requirement — screen/flow path:** `Home → Settings → Logout → Login`; `Home → Logout` from the screen flow; feature-flow logout follows the authenticated main pages.
- **Confirmed requirement — UI text:** The control is labeled **Logout** in `userstory.md` and `screen_flow.md`, and **Log out** in `settings.md`.
- **Confirmed requirement — UI actions:** `LogoutButton` ends the current session and clears local/session authentication data; no confirmation dialog is specified for logout.
- **Confirmed requirement — data cleanup:** Authentication tokens and temporary user data in local and session storage must be cleared; backend session state must be invalidated.
- **Data model note:** `settings.md` names `sessionId`, `startedAt`, `lastActivityAt`, and `expiresAt` as session fields; this is a settings information-model detail rather than an API field list.
- **API endpoint:** Not specified in proposals; `API.md` has no logout endpoint.
- **Statuses and error codes:** Not specified in proposals for logout itself; `API.md` generally defines `UNAUTHORIZED` 401 for protected endpoints, and no logout-specific error code appears in `response_code.md`.
- **Notification/privacy rules:** No logout-specific notification is specified; protected access after logout requires login according to NFR-SEC-1.
- **Recommendation only:** `settings.md` recommends `/settings` and Account Settings grouping; the route is not defined in the proposal flow documents.

### B11. Source Alignment Notes

- `API.md` defines `POST /auth/login` but has no logout endpoint, while FR-03.1, FR-03.2, FR-03.3, AC-03.1, and AC-03.2 require logout, cleanup, and invalidation.
- UC-02 Log In creates the authenticated session handled by UC-08 and already notes the missing logout endpoint; UC-08 does not repeat credential validation, CAPTCHA, or Google login behavior.
- UC-01 Register Account can establish an initial authenticated session, but it does not define logout behavior; UC-08 applies to that session only after the user is logged in.
- AC-03.3 and AC-03.4 are UI and navigation validation requirements; no exact screen mockup or logout message text is provided in the proposal sources.
- No new I-xx, E-xx, or G-xx identifiers were created; the focused model uses only UC-08 and its primary actor.
