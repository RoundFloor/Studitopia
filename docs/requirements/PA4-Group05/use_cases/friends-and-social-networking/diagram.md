# Friends and Social Networking — Use Case Diagram

**Version:** `1.0`

**Performed by:** [Nguyen Chi Bao] | **Edited by:** [Nguyen Chi Bao]

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
    Recipient@{ shape: person, label: "Friend Request Recipient" }
    User@{ shape: person, label: "User" }
    Sender@{ shape: person, label: "Friend Request Sender" }
    GroupOwner@{ shape: person, label: "Group Owner" }
    GroupMember@{ shape: person, label: "Group Member" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC26(["UC-26<br/>Find a Study Partner"])
        UC27(["UC-27<br/>Send Friend Request"])
        UC28(["UC-28<br/>Manage Friend Requests"])
        UC29(["UC-29<br/>Create and Manage Friend Groups"])
    end

    Student --- UC26
    Student --- UC27
    Recipient --- UC27
    NotifSvc --- UC27
    Recipient -- "generalization" --> Student
    User --- UC28
    Sender --- UC28
    NotifSvc --- UC28
    Sender -- "generalization" --> User
    Student --- UC29
    GroupOwner --- UC29
    GroupMember --- UC29
    NotifSvc --- UC29
    GroupOwner -- "generalization" --> Student
    GroupMember -- "generalization" --> Student

    class Student,Recipient,User,Sender,GroupOwner,GroupMember actor
    class NotifSvc external
    class UC26,UC27,UC28,UC29 usecase
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = use case; solid line = association; labelled solid arrow = generalization.
