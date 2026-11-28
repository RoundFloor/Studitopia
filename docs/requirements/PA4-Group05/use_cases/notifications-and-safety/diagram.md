# Notifications and Safety — Use Case Diagram

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

    User@{ shape: person, label: "User" }
    Moderator@{ shape: person, label: "Moderator" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC32(["UC-32<br/>Receive Notifications"])
        UC33(["UC-33<br/>Control Communication"])
        UC34(["UC-34<br/>Report Inappropriate Behavior"])
    end

    User --- UC32
    NotifSvc --- UC32
    User --- UC33
    User --- UC34
    Moderator --- UC34

    class User,Moderator actor
    class NotifSvc external
    class UC32,UC33,UC34 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = use case; solid line = association.
