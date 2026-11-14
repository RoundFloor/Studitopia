# UC-05 Use Case Model: Comment and Answer

## 1. Model Information

| Field | Value |
| --- | --- |
| Use Case | UC-05 Comment and Answer |
| Primary Actor | University Student |
| Supporting Actors | Post Author; Notification Service |
| Feature Group | Forum (Primary) |
| Related User Stories | US-18 |
| Detailed Description | [`use_cases_description.md`](../use_cases_description.md), UC-05 |
| Model Index | [`use_cases_model.md`](../use_cases_model.md) |

## 2. Focused Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }
    PostAuthor@{ shape: person, label: "Post Author" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC05(["UC-05<br/>Comment and Answer"])
        I06(["I-06<br/>Send Forum Notification"])
        E06(["E-06<br/>Nested Reply"])
    end

    Student --- UC05
    PostAuthor --- I06
    NotifSvc --- I06
    PostAuthor -- "generalization" --> Student

    UC05 -. "include" .-> I06
    E06 -. "extend" .-> UC05

    class Student,PostAuthor actor
    class NotifSvc external
    class UC05 usecase
    class I06 included
    class E06 extending
```

**Notation.** Person shape = human actor; cloud = supporting system; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.

## 3. Relationship Summary

### 3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-05 Comment and Answer | Primary | Comments on or answers a forum post. |
| Post Author | I-06 Send Forum Notification | Secondary | Receives notification when a comment or answer is added. |
| Notification Service | I-06 Send Forum Notification | Supporting | Delivers the forum notification to the post author. |

### 3.2 Generalization and Inheritance

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| Post Author | University Student | Actor generalization | Inherits the general student associations, including UC-05, and adds I-06 as notification recipient. |

### 3.3 Include Relationships

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-05 Comment and Answer | I-06 Send Forum Notification | Notify the post author about the new comment or answer. |

### 3.4 Extend Relationships

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-06 Nested Reply | UC-05 Comment and Answer | The student replies to an existing comment or answer. | Add a threaded nested response. |

## 4. Model Notes

1. Every new comment or answer includes I-06 because the post author must be notified.
2. Nested reply is an optional extension of the base comment-or-answer behavior.
3. Post Author inherits the University Student association to UC-05 and adds the secondary notification-recipient association to I-06.
