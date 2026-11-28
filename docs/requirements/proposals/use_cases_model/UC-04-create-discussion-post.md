# UC-04 Use Case Model: Create Discussion Post

**Version:** `2.0`

**Performed by:** [Tran Canh Anh Tuan] | **Edited by:** [Nguyen Thanh An]

## 1. Model Information

| Field | Value |
| --- | --- |
| Use Case | UC-04 Create Discussion Post |
| Primary Actor | University Student |
| Supporting Actors | None |
| Feature Group | Forum (Primary) |
| Related User Stories | US-14 |
| Detailed Description | [`use_cases_description.md`](../use_cases_description.md), UC-04 |
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
        UC04(["UC-04<br/>Create Discussion Post"])
        I05(["I-05<br/>Validate Post Content"])
        E05(["E-05<br/>Attach Image or LaTeX"])
    end

    Student --- UC04

    UC04 -. "include" .-> I05
    E05 -. "extend" .-> UC04

    class Student actor
    class UC04 usecase
    class I05 included
    class E05 extending
```

**Notation.** Person shape = human actor; blue = selected base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.

## 3. Relationship Summary

### 3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-04 Create Discussion Post | Primary | Publishes a discussion post in the university forum. |

### 3.2 Generalization and Inheritance

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| New University Student; Registered University Student; Post Author; Room Owner or Manager | University Student | Actor generalization | Each specialized student actor inherits the UC-04 association. |

### 3.3 Include Relationships

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-04 Create Discussion Post | I-05 Validate Post Content | Validate title, content, tags, post type, image support, and forum context before publication. |

### 3.4 Extend Relationships

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-05 Attach Image or LaTeX | UC-04 Create Discussion Post | The author adds rich content to a post. | Add image and LaTeX content to the discussion post. |

## 4. Model Notes

1. Every discussion post must include I-05 because invalid or incomplete post content cannot be published.
2. Image and LaTeX content are optional extensions of the base post-creation behavior.
3. Post Author is the acting University Student role during this use case; the general UC-04 association is inherited by all specialized student actors.
