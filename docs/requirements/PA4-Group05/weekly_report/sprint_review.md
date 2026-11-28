# Sprint 4 Review

**Performed by:** Nguyen Le Quoc Huy | **Edited by:** Nguyen Le Quoc Huy

## 1. Review scope

This review summarizes Sprint 4 using the 17/11 and 24/11 meeting reports and the real Git history of the Studitopia parent repository and its three implementation repositories: `src/frontend`, `src/backend`, and `src/database`.

The raw `git log --graph --all --stat` exports are stored in four Markdown files:

- `git_log_studitopia.md`
- `git_log_frontend.md`
- `git_log_backend.md`
- `git_log_database.md`

The parent repository mainly records documentation and submodule-pointer changes, while the child repositories contain the implementation history. Parent history is included in both the exported log and the commit counts below.

## 2. Commit summary

Commit counts are normalized by author email because several members used multiple Git display names. The review count covers commits from 15/11/2026 to 28/11/2026 inclusive.

| Member | 15-28/11 commits | All-history commits | Main contribution |
|:---|---:|---:|:---|
| **Nguyen Thanh An** | 21 | 56 | Frontend forum pages, post detail, area/subject pages, search/filter refresh, email verification loading, and forum routing fixes. |
| **Nguyen Chi Bao** | 6 | 10 | Test-case preparation for forum browsing, keyword search, and tag filtering; AI recommendation research; Component and Context diagram work. |
| **Tran Nguyen Khanh Binh** | 12 | 20 | Figma UI design, card variants, screen references, System diagram, use-case specification, and API updates. |
| **Tran Canh Anh Tuan** | 6 | 17 | Database schema, area/subject/post migrations, query-plan validation, relational schema update, deployment research, server work, and emergency bug handling. |
| **Nguyen Le Quoc Huy** | 33 | 140 | Backend APIs, database adapter tests, recommendation API contracts, repository documentation, integration support, and deployment-related fixes. |
| **Total** | **74** | **243** | Parent repository: 101 commits; frontend: 64; backend: 46; database: 32. |

## 3. Work completed in Sprint 4

- **Frontend:** the forum browsing flow was extended with post detail, area, and subject pages. Search/filter refresh, email verification loading, and inconsistent forum routing were addressed.
- **Backend:** forum browsing, area/subject/post retrieval, post viewing, keyword search, tag filtering, and recommend post/tag contract work were reported and partially landed.
- **Database:** forum/post/comment/tag schema work continued, with migrations for area, subject, and post tables and relevant-tag/post-filter tests added.
- **Testing:** backend and database suites cover registration, OTP support, token generation, database adapter mapping, post/tag/file functions, avatar handling, relevant tags, and HOT propagation. Frontend coverage remains mainly bootstrap, providers, router shell, and shared UI components.
- **Documentation/design:** UI screens, card variants, PA4 diagrams, use cases, functional requirements, non-functional requirements, and architecture documentation were updated.

## 4. Analysis of lower direct-commit counts

- **Nguyen Chi Bao** had fewer commits because most of his time was spent researching the AI model and recommendation input for the final Sprint. That work is exploratory and often produces decisions, test cases, and design notes before code, so it does not always appear as frequent commits.
- **Tran Nguyen Khanh Binh** had fewer code commits because his Sprint 4 workload focused on Figma UI design and written documentation. Design screens, workflow notes, and specification material are major deliverables but are not always committed to the implementation repositories.
- **Tran Canh Anh Tuan** had fewer commits because his time was split across technology research, deployment preparation, server work, and emergency bug handling. Those tasks are important for stability and delivery, but they are less continuous than feature coding and therefore create fewer commits.
- These lower counts should not be read as lower contribution: Sprint 4 depended on research, design, validation, and deployment decisions as much as on direct feature commits.

## 5. Tested code and testing priority

### 5.1 Code that already has executable test coverage

- **Backend unit/integration tests:** registration controller/service, Postgres validation and registration methods, SQL statement/parameter mapping for tag/forum/post/file/account wrappers, email OTP dispatch, environment service, and security token/OTP generation.
- **Backend E2E:** full `POST /api/v1/auth/register` flow, including success, duplicate credentials, and invalid payload cases.
- **Database integration tests:** registration, email/username validation, login, OTP storage and removal, account activation, session creation/check/logout, account/avatar reads, file CRUD, post/comment/vote behavior, tag queries, relevant tags, and HOT trigger propagation.
- **Frontend tests:** app bootstrap, query provider, router provider, and shared UI controls such as button, input, select card, tick box, and toggle switch.
- **Note:** several frontend auth/forum page test files exist but are empty placeholders; they should not be treated as real coverage.

### 5.2 Code that should be tested first

1. **Cross-layer forum/tag/search contract:** `/forum`, `/post/relevant`, `/tag/relevant`, and `/tag` need HTTP-level and frontend API-client tests for query parameters, include/exclude tags, pagination, status codes, and response DTOs. This seam should be tested first because both weekly reports identified search/pagination mismatch and unconfirmed recommendation contracts as active integration risks.
2. **Auth/security gaps:** OTP request/activation/resend, login/logout, refresh-token reuse, and session invalidation should be tested before final delivery because these paths affect account security and some planned test files are absent or empty in the current source.
3. **Schema migrations and query plans:** area/subject/post migrations should be applied and rolled back against a disposable database, and post-list/relevant-tag queries should have `EXPLAIN` checks. This should be done early because schema and index regressions can silently damage the forum flows.

### 5.3 Code that can be tested at the final stage

- Stable shared UI components and static page rendering can be rechecked at the final stage because they already have basic coverage and low integration risk.
- Documentation, diagrams, and generated reports only need consistency review; they do not need early automated testing.
- Performance, load, and capacity tests can wait until endpoints, representative data, and a production-like deployment are stable. Testing them now would produce unstable results because the search and recommendation contracts are still moving.
- AI recommendation behavior should be tested near the final stage because it depends on the recommendation input and model choice, which are still being researched.
- Features that are not implemented yet, such as friends, meeting rooms, notifications, full resource-library management, and complete create-post/comment/vote HTTP routes, should only receive integration tests after their implementations exist.

## 6. Conclusion

Sprint 4 produced substantial progress in forum browsing, backend APIs, database behavior, frontend integration, UI design, and PA4 documentation. The main remaining risk is not the amount of work completed, but whether the unstable API contracts for search, pagination, and recommendation are validated across frontend and backend before final testing. The next testing effort should therefore focus first on the cross-layer contract, auth/security paths, and schema/query-plan validation, while deferring stable UI checks, performance tests, and AI-specific tests to the final stage.

## 7. Source

YouTube source: [Sprint 4 demo and review](https://www.youtube.com/watch?v=l0PKjKdXL-s)
