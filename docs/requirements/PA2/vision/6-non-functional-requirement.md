
# 6. Non-Functional Requirements
****Performed by:**** [Huy] | ****Reviewed by:**** [Binh] | ****Edited by:**** []

| Requirement ID | Category | Requirement Description | Priority | Stability | Benefit | Effort | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- |
| NFR-001 | Performance | The system shall provide a response time of no more than 2 seconds for standard user actions under normal operating conditions. | High | High | High | Medium | Medium |
| NFR-002 | Performance | The system shall support real-time messaging with a message delivery latency of no more than 1 second under normal operating conditions. | High | High | High | High | Medium |
| NFR-003 | Performance | The system shall provide synchronization of collaborative learning tools, including shared notes and other standard updates, with a latency of no more than 1 second. | High | High | High | High | High |
| NFR-004 | Performance | The system shall synchronize concurrent whiteboard updates across participants with a latency of no more than 1 second. | High | High | High | High | High |
| NFR-005 | Scalability | The system architecture shall support at least 100 concurrent active rooms across Hall Rooms and Study Rooms. | High | High | High | High | High |
| NFR-006 | Scalability | The system shall support at least 200 concurrent users participating in virtual study rooms, with individual rooms accommodating approximately 40 seats. | High | Medium | High | High | High |
| NFR-007 | Scalability | The system architecture shall support at least 10,000 registered user accounts. | High | High | High | Medium | Medium |
| NFR-008 | Scalability | The system architecture shall support the storage of at least 1,000,000 messages. | Medium | High | Medium | Medium | Medium |
| NFR-009 | Scalability | The system architecture shall support at least 300 GB uploaded learning documents. | High | High | High | High | Medium |
| NFR-010 | Scalability | The system architecture shall support at least 100,000 forum posts. | High | High | High | Medium | Medium |
| NFR-011 | Availability | The system shall maintain at least 99.9% monthly availability, excluding planned maintenance. | High | High | High | High | High |
| NFR-012 | Security | The system shall require successful authentication before granting access to protected user accounts, personal information, and restricted platform resources. | High | High | High | Medium | Medium |
| NFR-013 | Security | The system shall store user passwords using secure one-way password hashing rather than storing plaintext passwords. | High | High | High | Medium | Medium |
| NFR-014 | Security | The system shall encrypt sensitive communications using Transport Layer Security (TLS) version 1.2 or higher. | High | High | High | Medium | Medium |
| NFR-015 | Security | The system shall validate uploaded files according to permitted file types and file size limits before accepting them. Uploaded documents shall undergo malware and virus scanning before becoming available for download. | High | High | High | High | High |
| NFR-016 | Security | The system shall automatically terminate authentication sessions after 30 minutes of user inactivity and require authentication before granting further access to protected resources. | High | High | High | Medium | Medium |
| NFR-017 | Security | The system shall protect against common web application vulnerabilities, including Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF). | High | High | High | High | High |
| NFR-019 | Privacy | The system shall provide users with configurable privacy controls, including at least two profile visibility levels: public and private. Users shall also be able to manage their online status, audio and video availability, friend requests, room participation, and shared document access. | High | High | High | Medium | Medium |
| NFR-020 | Robustness | The system shall automatically buffer shared note changes locally when network connectivity is interrupted and synchronize the changes after reconnection without data loss. | High | High | High | High | High |
| NFR-021 | Robustness | The system shall preserve user-entered forum text and supported inputs through local buffering mechanisms to reduce data loss during temporary network interruptions. | High | Medium | High | Medium | Medium |
| NFR-022 | File Compatibility | The system shall support common learning document formats, including PDF, DOCX, PNG, and JPG, for room document sharing and access. The file size limit shall be configurable, with 25 MB identified as an example in the current proposal. | High | Medium | High | Medium | Medium |
| NFR-023 | External Integration | The system shall support Google OAuth 2.0 for users who choose Google-based registration or authentication. | Medium | High | Medium | Medium | Medium |
| NFR-024 | External Integration | The system shall support email delivery of one-time passwords (OTP) for account verification and password recovery. | High | High | High | Medium | Medium |
