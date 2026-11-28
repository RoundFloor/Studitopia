# Non-functional requirement

**Version:** `1.3`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

> This file is the index for the split non-functional requirements. The full NFR tables are grouped by category under [`non_functional_requirements/`](non_functional_requirements/).

## Revision History

| Date | Version | Description | Author |
| --- | --- | --- | --- |
| 20/Nov/2026 | 1.0 | Defined the PA4 non-functional requirements | Tran Nguyen Khanh Binh |
| 21/Nov/2026 | 1.1 | Adapted every NFR to the current source: implemented, partial, planned/not implemented, or target/unverified | Tran Nguyen Khanh Binh |
| 25/Nov/2026 | 1.2 | Update all time-measurement NFRs complete based on user-performed testing | Nguyen Le Quoc Huy |
| 26/Nov/2026 | 1.3 | Update TLS protection complete because it is ensured by the server proxy | Nguyen Le Quoc Huy |
| 28/Nov/2026 | 1.3 | Split the requirement tables into NFR category files | Nguyen Le Quoc Huy |

## Current Code Basis

- Vite hosts the frontend on port `8999` only during development. In deployment, the NestJS Web package serves the compiled frontend from the backend process.
- The backend listens on port `8353` behind a server proxy that ensures TLS protection; database configuration defaults to `localhost:5432`.
- Current implemented flows cover authentication/OTP, account read and avatar upload, forum/post/tag read APIs, file read, and SPA asset delivery.
- Post/comment/vote writes, forum search endpoints, notifications, meeting rooms, privacy settings, moderation, and rate limiting are not implemented in the current source.
- Time-related NFRs are marked complete based on user-performed testing; the source itself does not contain the measurement artifacts, and scalability targets remain unverified.

Status labels used below:

- **Implemented** - supported by current source code.
- **Complete (user-tested)** - a time-related NFR accepted by the user after testing.
- **Complete (server proxy)** - satisfied by deployment infrastructure rather than application code.
- **Partial** - some supporting code exists, but the full requirement is not satisfied.
- **Planned (not implemented)** - documented product intent without current runtime support.
- **Target (unverified)** - a design target that has not been measured.

## Non-functional Requirement Categories

| Category | IDs | Requirement file |
| --- | --- | --- |
| Performance | NFR-PERF-1–NFR-PERF-7 | [`performance/requirements.md`](non_functional_requirements/performance/requirements.md) |
| Scalability | NFR-SCAL-1–NFR-SCAL-6 | [`scalability/requirements.md`](non_functional_requirements/scalability/requirements.md) |
| Availability | NFR-AVAIL-1–NFR-AVAIL-2 | [`availability/requirements.md`](non_functional_requirements/availability/requirements.md) |
| Security | NFR-SEC-1–NFR-SEC-10 | [`security/requirements.md`](non_functional_requirements/security/requirements.md) |
| Privacy | NFR-PRIV-1–NFR-PRIV-7 | [`privacy/requirements.md`](non_functional_requirements/privacy/requirements.md) |
| Usability | NFR-USE-1–NFR-USE-6 | [`usability/requirements.md`](non_functional_requirements/usability/requirements.md) |

## Source References

- Hosting and runtime: `src/frontend/vite.config.ts`, `src/backend/src/main.ts`, `src/backend/src/config/app.config.ts`, `src/backend/src/packages/web/web.controller.ts`, `src/database/config/database.config.ts`
- Current modules and routes: `src/backend/src/app.module.ts`, `src/frontend/src/app/providers/router/router-provider.tsx`, `src/backend/src/packages/post/post.controller.ts`, `src/backend/src/packages/account/account.controller.ts`, `src/backend/src/packages/file/file.controller.ts`
- Database and performance basis: `src/backend/src/packages/postgres/pg.config.ts`, `src/backend/src/packages/postgres/pg.service.ts`, `src/database/src/tables/`, `src/database/src/functions/`, `src/database/src/triggers/`
- Security basis: `src/backend/src/packages/security-generation/`, `src/backend/src/packages/authentication/`, `src/backend/src/packages/recaptcha/`, `src/backend/src/packages/storage/storage.config.ts`, `src/backend/src/packages/storage/storage.service.ts`, `src/backend/package.json`
- Privacy/usability basis: `src/backend/src/packages/account/`, `src/backend/src/packages/file/`, `src/frontend/src/app/layouts/forum/`, `src/frontend/src/pages/forums/`, `src/frontend/src/shared/ui/`, `src/frontend/src/app/index.css`
