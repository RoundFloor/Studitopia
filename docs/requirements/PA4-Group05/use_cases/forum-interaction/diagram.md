# Forum Interaction — Use Case Diagram

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
    PostAuthor@{ shape: person, label: "Post Author" }
    AnswerAuthor@{ shape: person, label: "Answer Author" }
    Moderator@{ shape: person, label: "Moderator" }
    Administrator@{ shape: person, label: "Administrator" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC05(["UC-05<br/>Comment and Answer"])
        UC17(["UC-17<br/>Vote on Posts and Comments"])
        UC18(["UC-18<br/>Mark True Response"])
        UC19(["UC-19<br/>Save Post"])
        UC20(["UC-20<br/>Report and Moderate<br/>Forum Content"])
        I06(["I-06<br/>Send Forum Notification"])
        E06(["E-06<br/>Nested Reply"])
    end

    Student --- UC05
    PostAuthor --- I06
    NotifSvc --- I06
    PostAuthor -- "generalization" --> Student
    Student --- UC17
    PostAuthor --- UC18
    AnswerAuthor --- UC18
    Student --- UC19
    Student --- UC20
    Moderator --- UC20
    Administrator --- UC20

    UC05 -. "include" .-> I06
    E06 -. "extend" .-> UC05

    class Student,PostAuthor,AnswerAuthor,Moderator,Administrator actor
    class NotifSvc external
    class UC05,UC17,UC18,UC19,UC20 usecase
    class I06 included
    class E06 extending
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = base use case; purple = included; green = extending; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.
