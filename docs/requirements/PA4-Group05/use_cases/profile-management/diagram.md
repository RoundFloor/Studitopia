# Profile Management — Use Case Diagram

**Version:** `1.0`

**Performed by:** [Tran Canh Anh Tuan] | **Edited by:** [Tran Canh Anh Tuan]

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
    User@{ shape: person, label: "User" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC12(["UC-12<br/>Manage Profile"])
        UC13(["UC-13<br/>Set Learning Preferences"])
        UC14(["UC-14<br/>Manage Privacy"])
    end

    Student --- UC12
    Student --- UC13
    User --- UC14

    class Student,User actor
    class UC12,UC13,UC14 usecase
```

**Diagram notation.** Person shape = human actor; blue = use case; solid line = association.
