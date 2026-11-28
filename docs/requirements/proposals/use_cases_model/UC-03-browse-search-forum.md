# UC-03 Use Case Model: Browse and Search the University Forum

**Version:** `2.0`

**Performed by:** [Nguyen Chi Bao] | **Edited by:** [Nguyen Le Quoc Huy]
| --- | --- |
| Use Case | UC-03 Browse and Search the University Forum |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum (Primary) |
| Related User Stories | US-11, US-12, US-13, US-17, US-23 |
| Detailed Description | [`use_cases_description.md`](../use_cases_description.md), UC-03 |
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
        UC03(["UC-03<br/>Browse and Search the<br/>University Forum"])
        I04(["I-04<br/>Load Forum Post List"])
        E03(["E-03<br/>Search Forum"])
        E04(["E-04<br/>View Post Detail"])
    end

    Student --- UC03

    UC03 -. "include" .-> I04
    E03 -. "extend" .-> UC03
    E04 -. "extend" .-> UC03

    class Student actor
    class UC03 usecase
    class I04 included
    class E03,E04 extending
```

**Notation.** Person shape = human actor; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.

## 3. Relationship Summary

### 3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-03 Browse and Search the University Forum | Primary | Browses and searches academic discussions. |

### 3.2 Generalization and Inheritance

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| New University Student; Registered University Student; Post Author; Room Owner or Manager | University Student | Actor generalization | Each specialized student actor inherits the UC-03 association. |

### 3.3 Include Relationships

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-03 Browse and Search the University Forum | I-04 Load Forum Post List | Load the relevant university, major, or course post list. |

### 3.4 Extend Relationships

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-03 Search Forum | UC-03 Browse and Search the University Forum | The student performs a keyword or filtered search. | Add keyword, tag, author, and academic-context search with ranking. |
| E-04 View Post Detail | UC-03 Browse and Search the University Forum | The student opens a post from the list or search results. | Add full post detail, comments, answers, true response, attachments, and tools. |

## 4. Model Notes

1. The base browse path always includes I-04 because every browse or search experience is based on a forum post list.
2. Search and post detail are optional extensions because a student may browse without searching or opening a post.
3. UC-03 is part of the primary forum model. All specialized student actors inherit its association through University Student.
