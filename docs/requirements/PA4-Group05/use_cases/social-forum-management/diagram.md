# Social Forum Management — Use Case Diagram

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

**Diagram notation.** Person shape = human actor; blue = base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend.
