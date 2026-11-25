# Use Cases Model

> This is the index for the split use case model. Each selected use case has its own focused model file under `use_cases_model/`. Supporting included, extending, and specialized use cases appear in the focused model of the selected use case they support.

## 1. Document Information

| Field | Value |
| --- | --- |
| Project | Studitopia |
| Group | Group 5 - Alien Force |
| Document | PA3 Use Cases Model Index |
| Version | 2.0 |
| Date | 14/Nov/2026 |
| Source | `use_cases_description.md` version 1.0 |
| Related documents | `userstory.md`, `functional_requirement.md`, `non_functional_requirement.md`, `overview.md`, `feature_flow.md`, `screen_flow.md` |

### Revision History

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 14/Nov/2026 | 1.0 | Created the combined use case model for the seven selected PA3 use cases | Group 5 - Alien Force |
| 14/Nov/2026 | 2.0 | Split the combined model into one focused model per selected use case | Group 5 - Alien Force |

## 2. Model Structure

There are seven focused model files, one for each selected use case.

| Model File | Selected Use Case | Primary Actor | Main Relationships |
| --- | --- | --- | --- |
| [UC-01 Register Account](use_cases_model/UC-01-register-account.md) | UC-01 Register Account and Verify University Email | New University Student | Association, actor generalization, use case generalization, include, extend |
| [UC-02 Log In](use_cases_model/UC-02-log-in.md) | UC-02 Log In | Registered University Student | Association, actor generalization, include, extend |
| [UC-03 Browse and Search Forum](use_cases_model/UC-03-browse-search-forum.md) | UC-03 Browse and Search the University Forum | University Student | Association, actor inheritance, include, extend |
| [UC-04 Create Discussion Post](use_cases_model/UC-04-create-discussion-post.md) | UC-04 Create Discussion Post | University Student | Association, actor inheritance, include, extend |
| [UC-05 Comment and Answer](use_cases_model/UC-05-comment-answer.md) | UC-05 Comment and Answer | University Student | Association, actor generalization, include, extend |
| [UC-06 Share Learning Resource](use_cases_model/UC-06-share-learning-resource.md) | UC-06 Share Learning Resource | University Student | Association, actor inheritance, include, extend |
| [UC-07 Join or Create Study Room](use_cases_model/UC-07-join-create-study-room.md) | UC-07 Join or Create a Study Room | University Student | Association, actor generalization, use case generalization, include, extend |

## 3. Shared Notation

Each focused model uses the same Mermaid-compatible notation.

| Notation | Meaning |
| --- | --- |
| Person shape | Human actor |
| Cloud shape | Supporting external system actor |
| Stadium shape | Use case |
| Blue stadium | Selected base use case |
| Purple stadium | Included use case |
| Green stadium | Extending use case |
| Orange stadium | Specialized use case |
| Solid line | Association between an actor and a use case |
| Solid arrow labeled `<<generalization>>` | Generalization/inheritance between actors or use cases |
| Dashed arrow labeled `<<include>>` | The base use case always includes the target use case |
| Dashed arrow labeled `<<extend>>` | The extending use case optionally adds behavior to the target base use case |

## 4. Shared Actor Model

| Actor | Type | Generalization / Inheritance | Associated Use Cases |
| --- | --- | --- | --- |
| University Student | General human actor | Parent of New University Student, Registered University Student, Post Author, and Room Owner or Manager | UC-03, UC-04, UC-05, UC-06, UC-07 |
| New University Student | Specialized human actor | Inherits University Student | UC-01 directly; inherits the general student associations |
| Registered University Student | Specialized human actor | Inherits University Student | UC-02 directly; inherits the general student associations |
| Post Author | Specialized human actor | Inherits University Student | I-06 as notification recipient; inherits the general student associations |
| Room Owner or Manager | Specialized human actor | Inherits University Student | UC-07 as secondary actor; inherits the general student associations |
| Email Delivery Service | Supporting system | None | I-02 Verify Email OTP |
| Google OAuth 2.0 | Supporting system | None | G-02 Register with Google; E-02 Log In with Google |
| Notification Service | Supporting system | None | I-06 Send Forum Notification; UC-07 join-request notification |

**Inherited associations.** A specialized actor inherits every association of its parent actor. For example, Post Author inherits the University Student associations to UC-03 to UC-07 and adds the notification-recipient association to I-06. Room Owner or Manager inherits the same general associations and adds the secondary room-management association to UC-07.

## 5. Shared Supporting Use Case Register

Supporting use cases are defined once in this register and appear in the focused model of the selected use case they support.

| ID | Name | Type | Parent or Base | Purpose |
| --- | --- | --- | --- | --- |
| I-01 | Validate Registration Data | Included | UC-01 | Enforce registration validation and uniqueness rules. |
| I-02 | Verify Email OTP | Included | G-01 | Verify the university email address before activation. |
| I-03 | Create Authenticated Session | Included | UC-02 | Establish the login session and access context. |
| I-04 | Load Forum Post List | Included | UC-03 | Retrieve the relevant forum post list. |
| I-05 | Validate Post Content | Included | UC-04 | Validate discussion post content before publication. |
| I-06 | Send Forum Notification | Included | UC-05 | Notify the post author about a new response. |
| I-07 | Validate and Store Resource | Included | UC-06 | Validate, persist, and index a published resource. |
| I-08 | Enter Room Session | Included | UC-07 | Establish the participant's study-room session. |
| E-01 | Resend OTP | Extending | I-02 | Replace an expired or unwanted OTP on request. |
| E-02 | Log In with Google | Extending | UC-02 | Provide the optional Google login path. |
| E-03 | Search Forum | Extending | UC-03 | Add keyword and filtered forum search. |
| E-04 | View Post Detail | Extending | UC-03 | Add the full post detail view. |
| E-05 | Attach Image or LaTeX | Extending | UC-04 | Add optional rich content to a discussion post. |
| E-06 | Nested Reply | Extending | UC-05 | Add threaded replies. |
| E-07 | Restrict Resource Access | Extending | UC-06 | Apply resource privacy restrictions. |
| E-08 | Use Shared Study Tools | Extending | UC-07 | Add optional live collaboration tools. |
| G-01 | Register with University Email | Specialized | UC-01 | Specialize registration through university email and OTP. |
| G-02 | Register with Google | Specialized | UC-01 | Specialize registration through Google OAuth. |
| G-03 | Join Public Room | Specialized | UC-07 | Specialize room entry through the public-room path. |
| G-04 | Create Study Room | Specialized | UC-07 | Specialize room creation and configuration. |

## 6. Model Rules

1. Each focused model contains exactly one selected base use case and the supporting use cases needed to express its relationships.
2. A specialized actor inherits the associations of its parent actor. A specialized use case inherits the behavior and actor association of its parent use case.
3. Included use cases represent behavior that the base use case always performs. Extending use cases represent optional or conditional behavior.
4. UML represents inheritance through generalization; no separate `<<inherited>>` relationship is required.
5. The forum use cases UC-03 to UC-05 remain the primary model. UC-07 and its supporting use cases are secondary capabilities.
