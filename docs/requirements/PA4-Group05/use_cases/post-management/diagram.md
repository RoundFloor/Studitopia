# Post Management — Use Case Diagram

**Version:** `1.0`

**Performed by:** [Nguyen Thanh An] | **Edited by:** [Nguyen Thanh An]

Merged from the focused use case diagrams in this functional group.

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000
    classDef specialized fill:#ffe6cc,stroke:#b36b00,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC04(["UC-04<br/>Create Discussion Post"])
        UC15(["UC-15<br/>Create Material Post"])
        UC16(["UC-16<br/>Create Functional Post"])
        I05(["I-05<br/>Validate Post Content"])
        E05(["E-05<br/>Attach Image or LaTeX"])
    end

    Student --- UC04
    Student --- UC15
    Student --- UC16

    UC04 -. "include" .-> I05
    E05 -. "extend" .-> UC04

    class Student actor
    class UC04,UC15,UC16 usecase
    class I05 included
    class E05 extending
```

**Diagram notation.** Person shape = human actor; blue = base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.
