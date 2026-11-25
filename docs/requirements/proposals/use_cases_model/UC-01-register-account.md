# UC-01 Use Case Model: Register Account and Verify University Email

## 1. Model Information

| Field | Value |
| --- | --- |
| Use Case | UC-01 Register Account and Verify University Email |
| Primary Actor | New University Student |
| Supporting Actors | Email Delivery Service; Google OAuth 2.0 |
| Feature Group | Authentication |
| Related User Stories | US-01, US-07 |
| Detailed Description | [`use_cases_description.md`](../use_cases_description.md), UC-01 |
| Model Index | [`use_cases_model.md`](../use_cases_model.md) |

## 2. Focused Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000
    classDef specialized fill:#ffe6cc,stroke:#b36b00,stroke-width:2px,color:#000

    NewStudent@{ shape: person, label: "New University Student" }
    Student@{ shape: person, label: "University Student" }
    EmailSvc@{ shape: cloud, label: "Email Delivery Service" }
    Google@{ shape: cloud, label: "Google OAuth 2.0" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC01(["UC-01<br/>Register Account and<br/>Verify University Email"])
        G01(["G-01<br/>Register with<br/>University Email"])
        G02(["G-02<br/>Register with Google"])
        I01(["I-01<br/>Validate Registration Data"])
        I02(["I-02<br/>Verify Email OTP"])
        E01(["E-01<br/>Resend OTP"])
    end

    NewStudent --- UC01
    NewStudent -- "generalization" --> Student
    Google --- G02
    EmailSvc --- I02

    G01 -- "generalization" --> UC01
    G02 -- "generalization" --> UC01

    UC01 -. "include" .-> I01
    G01 -. "include" .-> I02
    E01 -. "extend" .-> I02

    class NewStudent,Student actor
    class EmailSvc,Google external
    class UC01 usecase
    class I01,I02 included
    class E01 extending
    class G01,G02 specialized
```

**Notation.** Person shape = human actor; cloud = supporting system; blue = selected base use case; purple = included; green = extending; orange = specialized; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.

## 3. Relationship Summary

### 3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| New University Student | UC-01 Register Account and Verify University Email | Primary | Starts registration and email verification. |
| Google OAuth 2.0 | G-02 Register with Google | Supporting | Authenticates the Google registration path. |
| Email Delivery Service | I-02 Verify Email OTP | Supporting | Delivers the OTP to the university email address. |

### 3.2 Generalization and Inheritance

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| New University Student | University Student | Actor generalization | Inherits the general student associations and adds UC-01. |
| G-01 Register with University Email | UC-01 Register Account and Verify University Email | Use case generalization | Inherits the UC-01 actor association and I-01 include; adds the mandatory OTP include. |
| G-02 Register with Google | UC-01 Register Account and Verify University Email | Use case generalization | Inherits the UC-01 actor association and I-01 include; uses Google OAuth instead of OTP. |

### 3.3 Include Relationships

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-01 Register Account and Verify University Email | I-01 Validate Registration Data | Validate required fields, username, email, password, confirmation, CAPTCHA, and uniqueness rules. |
| G-01 Register with University Email | I-02 Verify Email OTP | Send and verify a 6-digit OTP with a 5-minute expiry. |

### 3.4 Extend Relationships

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-01 Resend OTP | I-02 Verify Email OTP | The user requests a new OTP before verification. | Invalidate the previous OTP, generate a new code, and restart the 5-minute expiry period. |

## 4. Model Notes

1. UC-01 is the selected general registration use case. G-01 and G-02 model the two registration paths without duplicating the base use case.
2. OTP verification is modeled under G-01 because it is the mandatory verification step for university-email registration. G-02 uses Google OAuth instead.
3. G-01 and G-02 inherit the UC-01 actor association and the I-01 validation behavior through use case generalization.
