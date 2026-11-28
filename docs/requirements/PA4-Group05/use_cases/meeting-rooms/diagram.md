# Meeting Rooms — Use Case Diagram

**Version:** `1.0`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

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
    RoomOwner@{ shape: person, label: "Room Owner or Manager" }
    Participants@{ shape: person, label: "Other Room Participants" }
    Learners@{ shape: person, label: "Other Learners" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC07(["UC-07<br/>Join or Create a Study Room"])
        UC30(["UC-30<br/>Use Shared Study Tools"])
        UC31(["UC-31<br/>Request Learning Help"])
        G03(["G-03<br/>Join Public Room"])
        G04(["G-04<br/>Create Study Room"])
        I08(["I-08<br/>Enter Room Session"])
        E08(["E-08<br/>Use Shared Study Tools"])
    end

    Student --- UC07
    RoomOwner --- UC07
    NotifSvc --- UC07
    RoomOwner -- "generalization" --> Student
    Student --- UC30
    Participants --- UC30
    Student --- UC31
    Learners --- UC31
    NotifSvc --- UC31

    G03 -- "generalization" --> UC07
    G04 -- "generalization" --> UC07

    UC07 -. "include" .-> I08
    E08 -. "extend" .-> UC07

    class Student,RoomOwner,Participants,Learners actor
    class NotifSvc external
    class UC07,UC30,UC31 usecase
    class I08 included
    class E08 extending
    class G03,G04 specialized
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = base use case; purple = included; green = extending; orange = specialized; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.
