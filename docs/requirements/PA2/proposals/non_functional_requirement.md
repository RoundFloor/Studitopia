# Non-functional requirement

## Performance

- NFR-PERF-1: The system shall provide responsive user interactions with a response time of ≤ 2 seconds for standard user actions.
- NFR-PERF-2: The system shall support at least 100 concurrent rooms.
- NFR-PERF-3: The system shall support real-time messaging with a message delivery latency of ≤ 1 second under normal operating conditions.
- NFR-PERF-4: The system shall minimize latency for collaborative tools to ≤ 1 second for standard updates.
- NFR-PERF-5: The system shall handle concurrent whiteboard updates with an update synchronization latency of ≤ 1 second.

## Scalability

- NFR-SCAL-1: The system architecture shall support at least 10,000 registered users.
- NFR-SCAL-2: The system architecture shall support at least 100 concurrent rooms.
- NFR-SCAL-3: The system architecture shall support at least 1,000,000 stored messages.
- NFR-SCAL-4: The system architecture shall support at least 100,000 uploaded documents.
- NFR-SCAL-5: The system architecture shall support at least 100,000 forum posts.

## Availability

- NFR-AVAIL-1: The system shall provide at least 99.9% monthly availability, excluding planned maintenance.

## Security

- NFR-SEC-1: The system shall require authentication before accessing protected user resources.
- NFR-SEC-2: The system shall store user credentials using one-way password hashing with a secure hashing algorithm.
- NFR-SEC-3: The system shall encrypt sensitive communication using TLS 1.2 or higher.
- NFR-SEC-4: The system shall restrict private-room access to authorized users only.
- NFR-SEC-5: The system shall validate uploaded files for file type and file size before accepting them.
- NFR-SEC-6: The system shall prevent unauthorized access through server-side authorization checks.
- NFR-SEC-7: The system shall automatically expire inactive authentication sessions after 30 minutes.
- NFR-SEC-8: The system shall protect against common web security vulnerabilities, including SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).

## Privacy

- NFR-PRIV-1: Users shall be able to configure profile visibility using at least 2 visibility levels: public and private.
- NFR-PRIV-2: Users shall be able to allow or reject incoming friend requests.
- NFR-PRIV-3: Users shall be able to control whether other users can request or access their room participation.
- NFR-PRIV-4: Users shall be able to show or hide their online status.
- NFR-PRIV-5: Users shall be able to enable or disable video availability.
- NFR-PRIV-6: Users shall be able to enable or disable audio availability.
- NFR-PRIV-7: Users shall be able to control access to shared documents.

## Usability

- NFR-USE-1: A new user shall be able to complete the account registration process within 5 minutes without external assistance.
- NFR-USE-2: The user interface shall support responsive layouts for screen widths from 320 px to 1920 px.
- NFR-USE-3: The user interface shall maintain consistent navigation and interaction patterns across all room types.
- NFR-USE-4: Primary interface actions shall use clear labels and recognizable controls.
- NFR-USE-5: The user interface shall be usable on screen sizes of at least 320 px in width.