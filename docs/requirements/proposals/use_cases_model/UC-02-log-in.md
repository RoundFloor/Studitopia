# UC-02 Use Case Model: Log In

**Version:** `2.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Thanh An]
| --- | --- |
| Use Case | UC-02 Log In |
| Primary Actor | Registered University Student |
| Supporting Actors | Google OAuth 2.0 |
| Feature Group | Authentication |
| Related User Stories | US-02 |
| Detailed Description | [`use_cases_description.md`](../use_cases_description.md), UC-02 |
| Model Index | [`use_cases_model.md`](../use_cases_model.md) |

## 2. Focused Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    RegStudent@{ shape: person, label: "Registered University Student" }
    Student@{ shape: person, label: "University Student" }
    Google@{ shape: cloud, label: "Google OAuth 2.0" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC02(["UC-02<br/>Log In"])
        I03(["I-03<br/>Create Authenticated Session"])
        E02(["E-02<br/>Log In with Google"])
    end

    RegStudent --- UC02
    RegStudent -- "generalization" --> Student
    Google --- E02

    UC02 -. "include" .-> I03
    E02 -. "extend" .-> UC02

    class RegStudent,Student actor
    class Google external
    class UC02 usecase
    class I03 included
    class E02 extending
```

**Notation.** Person shape = human actor; cloud = supporting system; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.

## 3. Relationship Summary

### 3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| Registered University Student | UC-02 Log In | Primary | Authenticates with credentials and reaches protected features. |
| Google OAuth 2.0 | E-02 Log In with Google | Supporting | Authenticates the optional Google login path. |

### 3.2 Generalization and Inheritance

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| Registered University Student | University Student | Actor generalization | Inherits the general student associations and adds UC-02. |

### 3.3 Include Relationships

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-02 Log In | I-03 Create Authenticated Session | Create the authenticated session and return the student's access context. |

### 3.4 Extend Relationships

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-02 Log In with Google | UC-02 Log In | The student selects Google login instead of credentials. | Add the Google OAuth authentication path. |

## 4. Model Notes

1. Successful login always includes I-03 because a valid authenticated session is required before protected features are available.
2. Google login is an optional extension of UC-02. The standard username-or-email and password path remains the base behavior.
3. Registered University Student inherits all general University Student associations in addition to the direct UC-02 association.
