# Studitopia Core Use Cases - Mermaid Diagrams

## UC-01 Register Account and Verify University Email

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000
    classDef specialized fill:#ffe6cc,stroke:#b36b00,stroke-width:2px,color:#000

    NewStudent@{ shape: person, label: "New University Student" }
    Student@{ shape: person, label: "University Student" }
    EmailSvc@{ shape: cloud, label: "Email Delivery Service" }
    Google@{ shape: cloud, label: "Google OAuth 2.0" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC01(["UC-01<br/>Register Account and<br/>Verify University Email"])
        G01(["G-01<br/>Register with<br/>University Email"])
        G02(["G-02<br/>Register with Google"])
        I01(["I-01<br/>Validate Registration Data"])
        I02(["I-02<br/>Verify Email OTP"])
        E01(["E-01<br/>Resend OTP"])
    end

    NewStudent --- UC01
    NewStudent -- "generalization" --> Student
    Google --- G02
    EmailSvc --- I02

    G01 -- "generalization" --> UC01
    G02 -- "generalization" --> UC01

    UC01 -. "include" .-> I01
    G01 -. "include" .-> I02
    E01 -. "extend" .-> I02

    class NewStudent,Student actor
    class EmailSvc,Google external
    class UC01 usecase
    class I01,I02 included
    class E01 extending
    class G01,G02 specialized
```

## UC-02 Log In

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    RegStudent@{ shape: person, label: "Registered University Student" }
    Student@{ shape: person, label: "University Student" }
    Google@{ shape: cloud, label: "Google OAuth 2.0" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC02(["UC-02<br/>Log In"])
        I03(["I-03<br/>Create Authenticated Session"])
        E02(["E-02<br/>Log In with Google"])
    end

    RegStudent --- UC02
    RegStudent -- "generalization" --> Student
    Google --- E02

    UC02 -. "include" .-> I03
    E02 -. "extend" .-> UC02

    class RegStudent,Student actor
    class Google external
    class UC02 usecase
    class I03 included
    class E02 extending
```

## UC-03 Browse and Search the University Forum

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

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

## UC-04 Create Discussion Post

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

## UC-05 Comment and Answer

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef external fill:#f5f5f5,stroke:#777,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }
    PostAuthor@{ shape: person, label: "Post Author" }
    NotifSvc@{ shape: cloud, label: "Notification Service" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC05(["UC-05<br/>Comment and Answer"])
        I06(["I-06<br/>Send Forum Notification"])
        E06(["E-06<br/>Nested Reply"])
    end

    Student --- UC05
    PostAuthor --- I06
    NotifSvc --- I06
    PostAuthor -- "generalization" --> Student

    UC05 -. "include" .-> I06
    E06 -. "extend" .-> UC05

    class Student,PostAuthor actor
    class NotifSvc external
    class UC05 usecase
    class I06 included
    class E06 extending
```

## UC-06 Share Learning Resource

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC06(["UC-06<br/>Share Learning Resource"])
        I07(["I-07<br/>Validate and<br/>Store Resource"])
        E07(["E-07<br/>Restrict Resource Access"])
    end

    Student --- UC06

    UC06 -. "include" .-> I07
    E07 -. "extend" .-> UC06

    class Student actor
    class UC06 usecase
    class I07 included
    class E07 extending
```

## UC-07 Join or Create a Study Room

```mermaid
flowchart TB
    classDef actor fill:#fff2cc,stroke:#b8860b,stroke-width:2px,color:#000
    classDef usecase fill:#dae8fc,stroke:#4a6fa5,stroke-width:2px,color:#000
    classDef included fill:#e1d5e7,stroke:#7a5b8e,stroke-width:2px,color:#000
    classDef extending fill:#d5e8d4,stroke:#5b8a53,stroke-width:2px,color:#000
    classDef specialized fill:#ffe6cc,stroke:#b36b00,stroke-width:2px,color:#000

    Student@{ shape: person, label: "University Student" }
    RoomOwner@{ shape: person, label: "Room Owner or Manager" }

    subgraph System["Studitopia System Boundary"]
        direction TB

        UC07(["UC-07<br/>Join or Create a Study Room"])

        G03(["G-03<br/>Join Public Room"])
        G04(["G-04<br/>Create Study Room"])

        I08(["I-08<br/>Enter Room Session"])

        E08(["E-08<br/>Use Shared Study Tools"])
    end
    Student --- UC07
    RoomOwner -->|generalization| Student
    G03 -->|generalization| UC07
    G04 -->|generalization| UC07
    UC07 -.->|"<<include>>"| I08
    E08 -.->|"<<extend>>"| UC07
    class Student,RoomOwner actor
    class UC07 usecase
    class I08 included
    class E08 extending
    class G03,G04 specialized
```
