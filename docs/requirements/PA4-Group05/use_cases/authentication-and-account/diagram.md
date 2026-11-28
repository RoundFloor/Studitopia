# Authentication and Account — Use Case Diagram

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

    NewStudent@{ shape: person, label: "New University Student" }
    Student@{ shape: person, label: "University Student" }
    RegStudent@{ shape: person, label: "Registered University Student" }
    LoggedUser@{ shape: person, label: "logged-in user" }
    User@{ shape: person, label: "user" }
    RegisteredUser@{ shape: person, label: "registered user" }
    EmailSvc@{ shape: cloud, label: "Email Delivery Service" }
    Google@{ shape: cloud, label: "Google OAuth 2.0" }

    subgraph System["Studitopia System Boundary"]
        direction TB
        UC01(["UC-01<br/>Register Account and<br/>Verify University Email"])
        UC02(["UC-02<br/>Log In"])
        UC08(["UC-08<br/>Logout"])
        UC09(["UC-09<br/>Automatic Logout"])
        UC10(["UC-10<br/>Recover Password"])
        UC11(["UC-11<br/>Delete Account"])
        G01(["G-01<br/>Register with<br/>University Email"])
        G02(["G-02<br/>Register with Google"])
        I01(["I-01<br/>Validate Registration Data"])
        I02(["I-02<br/>Verify Email OTP"])
        I03(["I-03<br/>Create Authenticated Session"])
        E01(["E-01<br/>Resend OTP"])
        E02(["E-02<br/>Log In with Google"])
    end

    NewStudent --- UC01
    NewStudent -- "generalization" --> Student
    RegStudent --- UC02
    RegStudent -- "generalization" --> Student
    Google --- G02
    EmailSvc --- I02
    Google --- E02
    LoggedUser --- UC08
    User --- UC09
    RegisteredUser --- UC10
    RegisteredUser --- UC11

    G01 -- "generalization" --> UC01
    G02 -- "generalization" --> UC01

    UC01 -. "include" .-> I01
    G01 -. "include" .-> I02
    UC02 -. "include" .-> I03
    E01 -. "extend" .-> I02
    E02 -. "extend" .-> UC02

    class NewStudent,Student,RegStudent,LoggedUser,User,RegisteredUser actor
    class EmailSvc,Google external
    class UC01,UC02,UC08,UC09,UC10,UC11 usecase
    class I01,I02,I03 included
    class E01,E02 extending
    class G01,G02 specialized
```

**Diagram notation.** Person shape = human actor; cloud = supporting system; blue = base use case; purple = included; green = extending; orange = specialized; solid line = association; dashed arrow = include or extend; labelled solid arrow = generalization.
