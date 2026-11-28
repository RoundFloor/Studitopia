# Learning Resource Library — Use Case Diagram

**Version:** `1.0`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

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
        UC06(["UC-06<br/>Share Learning Resource"])
        UC22(["UC-22<br/>Find Learning Resources"])
        UC23(["UC-23<br/>Receive Resource Recommendations"])
        UC24(["UC-24<br/>View My Storage"])
        UC25(["UC-25<br/>Delete My Published Resource"])
        I07(["I-07<br/>Validate and<br/>Store Resource"])
        E07(["E-07<br/>Restrict Resource Access"])
    end

    Student --- UC06
    Student --- UC22
    Student --- UC23
    Student --- UC24
    Student --- UC25

    UC06 -. "include" .-> I07
    E07 -. "extend" .-> UC06

    class Student actor
    class UC06,UC22,UC23,UC24,UC25 usecase
    class I07 included
    class E07 extending
```

**Diagram notation.** Person shape = human actor; blue = base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.
