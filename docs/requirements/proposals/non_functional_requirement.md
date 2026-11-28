# Non-functional requirement

**Version:** `1.0`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

- NFR-PERF-1: The system shall provide responsive user interactions with a response time of ≤ 2 seconds for standard user actions.
- NFR-PERF-2: The system shall load a forum post list within ≤ 2 seconds under normal operating conditions.
- NFR-PERF-3: The system shall display a post detail page and its comments within ≤ 2 seconds.
- NFR-PERF-4: The system shall reflect a new post, comment, vote, or true-response mark in the relevant forum view within ≤ 2 seconds.
- NFR-PERF-5: The system shall return forum search results within ≤ 2 seconds for common queries.
- NFR-PERF-6: The system shall deliver forum notifications with a latency of ≤ 2 seconds under normal operating conditions.
- NFR-PERF-7: Optional supporting meeting-room tools shall maintain an update latency of ≤ 1 second when a meeting room is in use.

## Scalability

- NFR-SCAL-1: The system architecture shall support at least 10,000 registered university users.
- NFR-SCAL-2: The system architecture shall support at least 100,000 forum posts.
- NFR-SCAL-3: The system architecture shall support at least 1,000,000 comments, answers, and votes.
- NFR-SCAL-4: The system architecture shall support at least 100,000 uploaded documents and learning resources.
- NFR-SCAL-5: The system architecture shall support at least 500 concurrent active forum users without degradation of standard interactions.
- NFR-SCAL-6: The system architecture shall support at least 100 concurrent optional meeting rooms.

## Availability

- NFR-AVAIL-1: The system shall provide at least 99.9% monthly availability, excluding planned maintenance.
- NFR-AVAIL-2: The forum shall remain available for read access during non-critical maintenance whenever possible.

## Security

- NFR-SEC-1: The system shall require authentication before accessing protected user resources.
- NFR-SEC-2: The system shall store user credentials using one-way password hashing with a secure hashing algorithm.
- NFR-SEC-3: The system shall encrypt sensitive communication using TLS 1.2 or higher.
- NFR-SEC-4: The system shall restrict private forum content and private-group content to authorized users only.
- NFR-SEC-5: The system shall validate uploaded files for file type and file size before accepting them.
- NFR-SEC-6: The system shall prevent unauthorized access through server-side authorization checks.
- NFR-SEC-7: The system shall automatically expire inactive authentication sessions after 30 minutes.
- NFR-SEC-8: The system shall protect against common web security vulnerabilities, including SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).
- NFR-SEC-9: The system shall rate-limit post creation, commenting, voting, reporting, and help requests to reduce spam and abuse.
- NFR-SEC-10: The system shall restrict moderation actions to authorized moderators and administrators.

## Privacy

- NFR-PRIV-1: Users shall be able to configure profile visibility using at least 2 visibility levels: public and private.
- NFR-PRIV-2: Users shall be able to allow or reject incoming friend requests.
- NFR-PRIV-3: Users shall be able to control whether their university, major, and academic year are visible on their profile.
- NFR-PRIV-4: Users shall be able to show or hide their online status.
- NFR-PRIV-5: Users shall be able to control access to documents and learning resources they share.
- NFR-PRIV-6: Users shall be able to control whether other users can send them messages or room invitations.
- NFR-PRIV-7: Privacy settings shall apply consistently to forum posts, comments, member lists, and search results.

## Usability

- NFR-USE-1: A new university student shall be able to complete the account registration process within 5 minutes without external assistance.
- NFR-USE-2: The user interface shall support responsive layouts for screen widths from 320 px to 1920 px.
- NFR-USE-3: The user interface shall maintain consistent navigation and interaction patterns across university, major, and course forums.
- NFR-USE-4: Primary interface actions shall use clear labels and recognizable controls.
- NFR-USE-5: The user interface shall be usable on screen sizes of at least 320 px in width.
- NFR-USE-6: Forum moderation and reporting actions shall be reachable within at most 2 interactions from a post or comment.
