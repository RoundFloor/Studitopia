# UC-06 Use Case Model: Share Learning Resource

## 1. Model Information

| Field | Value |
| --- | --- |
| Use Case | UC-06 Share Learning Resource |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Learning Resource Library |
| Related User Stories | US-27 |
| Detailed Description | [`use_cases_description.md`](../use_cases_description.md), UC-06 |
| Model Index | [`use_cases_model.md`](../use_cases_model.md) |

## 2. Focused Use Case Diagram

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC06(["UC-06<br/>Share Learning Resource"])
        I07(["I-07<br/>Validate and<br/>Store Resource"])
        E07(["E-07<br/>Restrict Resource Access"])
    end

    Student --- UC06

    UC06 -. "include" .-> I07
    E07 -. "extend" .-> UC06

    class Student actor
    class UC06 usecase
    class I07 included
    class E07 extending
```

**Notation.** Person shape = human actor; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.

## 3. Relationship Summary

### 3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-06 Share Learning Resource | Primary | Publishes a learning resource to the resource library. |

### 3.2 Generalization and Inheritance

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| New University Student; Registered University Student; Post Author; Room Owner or Manager | University Student | Actor generalization | Each specialized student actor inherits the UC-06 association. |

### 3.3 Include Relationships

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-06 Share Learning Resource | I-07 Validate and Store Resource | Validate the file and metadata, store the resource, and index it for search. |

### 3.4 Extend Relationships

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-07 Restrict Resource Access | UC-06 Share Learning Resource | The owner chooses a restricted privacy setting. | Limit resource visibility and access according to the privacy rule. |

## 4. Model Notes

1. Every published resource includes I-07 because the resource must be validated, persisted, and indexed before it is available.
2. Restricting resource access is an optional extension of the base sharing behavior.
3. UC-06 belongs to the Learning Resource Library feature group and remains part of the primary student workflow.
