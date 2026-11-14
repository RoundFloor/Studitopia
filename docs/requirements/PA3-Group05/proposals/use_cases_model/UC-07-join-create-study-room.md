# UC-07 Use Case Model: Join or Create a Study Room

## 1. Model Information

| Field | Value |
| --- | --- |
| Use Case | UC-07 Join or Create a Study Room |
| Primary Actor | University Student |
| Supporting Actors | Room Owner or Manager; Notification Service |
| Feature Group | Meeting Rooms (Secondary) |
| Related User Stories | US-34, US-35 |
| Detailed Description | [`use_cases_description.md`](../use_cases_description.md), UC-07 |
| Model Index | [`use_cases_model.md`](../use_cases_model.md) |

## 2. Focused Use Case Diagram

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
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC07(["UC-07<br/>Join or Create a Study Room"])
        G03(["G-03<br/>Join Public Room"])
        G04(["G-04<br/>Create Study Room"])
        I08(["I-08<br/>Enter Room Session"])
        E08(["E-08<br/>Use Shared Study Tools"])
    end

    Student --- UC07
    RoomOwner --- UC07
    NotifSvc --- UC07
    RoomOwner -- "generalization" --> Student

    G03 -- "generalization" --> UC07
    G04 -- "generalization" --> UC07

    UC07 -. "include" .-> I08
    E08 -. "extend" .-> UC07

    class Student,RoomOwner actor
    class NotifSvc external
    class UC07 usecase
    class I08 included
    class E08 extending
    class G03,G04 specialized
```

**Notation.** Person shape = human actor; cloud = supporting system; blue = selected base use case; purple = included; green = extending; orange = specialized; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.

## 3. Relationship Summary

### 3.1 Associations

| Actor | Use Case | Type | Description |
| --- | --- | --- | --- |
| University Student | UC-07 Join or Create a Study Room | Primary | Joins a room, requests access, or creates a study room. |
| Room Owner or Manager | UC-07 Join or Create a Study Room | Secondary | Accepts or rejects private-room join requests. |
| Notification Service | UC-07 Join or Create a Study Room | Supporting | Routes join-request and decision notifications. |

### 3.2 Generalization and Inheritance

| Child | Parent | Type | Inherited Behavior or Association |
| --- | --- | --- | --- |
| Room Owner or Manager | University Student | Actor generalization | Inherits the general student associations and adds the secondary UC-07 management association. |
| G-03 Join Public Room | UC-07 Join or Create a Study Room | Use case generalization | Inherits the UC-07 actor association and I-08 include; specializes the public-room join path. |
| G-04 Create Study Room | UC-07 Join or Create a Study Room | Use case generalization | Inherits the UC-07 actor association and I-08 include; specializes room creation and configuration. |

### 3.3 Include Relationships

| Base Use Case | Included Use Case | Meaning |
| --- | --- | --- |
| UC-07 Join or Create a Study Room | I-08 Enter Room Session | Establish the participant's room session after a successful join or creation. |

### 3.4 Extend Relationships

| Extending Use Case | Base Use Case | Condition | Added Behavior |
| --- | --- | --- | --- |
| E-08 Use Shared Study Tools | UC-07 Join or Create a Study Room | Participants choose to use room tools during a session. | Add the shared whiteboard, shared notes, shared timer, and synchronized updates. |

## 4. Model Notes

1. G-03 and G-04 specialize the two main entry paths for UC-07 and inherit its actor association and I-08 include.
2. The private-room request path is handled within UC-07. Room Owner or Manager receives and decides the request, while Notification Service routes the request and outcome.
3. Meeting rooms remain secondary supporting capabilities; they do not replace the forum as the primary collaboration space.
