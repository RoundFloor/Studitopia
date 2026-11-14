# Mission

Studitopia Database is the PostgreSQL + Directus data layer for Studitopia, a collaborative learning and social networking platform for university students.

The database owns schema, migrations, SQL functions, procedures, triggers, and idempotent seeds. The backend never connects to PostgreSQL directly; it talks to Directus, proxied behind `apps/studitopia-backend/api/v1`. Directus collections are created from tables and exported as a schema snapshot.

**Audience:** database engineers and backend developers consuming the Directus/PostgreSQL data layer.

**Governing principles (from constitution.md):**
- Schema-First & Versioned Migrations (NON-NEGOTIABLE): all changes as immutable, ordered migration files with rollback notes.
- Domain-as-Folder Architecture: one folder per domain per artifact type (`tables/`, `functions/`, `procedures/`, `triggers/`, `migrations/`, `seeds/`, `definitions/`, `scripts/`, `tests/`).
- Dual-Tier Configuration: project-level root config + per-domain config; no scattered credentials.
- Standardized Naming: `snake_case` — tables plural nouns, `fn_<domain>_<action>`, `sp_<domain>_<action>`, `trg_<table>_<event>`, timestamped migrations, deterministic idempotent seeds.
- Directus/PostgreSQL Boundary: backend is sole consumer of schema contracts; frontend uses backend APIs only.
- Strict TDD (NON-NEGOTIABLE): migration tests before implementation; unit/integration tests for functions/procedures/triggers; mocked SDK in unit tests, live DB in E2E; regression tests for bug fixes.

**Quality gates:** migration gate (clean apply to empty + latest state), code standards gate (lint/format), test gate (all unit + E2E pass), database boundary tests (mocked SDK + live DB).

**Scope:** table definitions & constraints, reusable SQL functions, stored procedures, triggers, ordered migrations with rollback notes, baseline seeds, Directus collection mapping, schema snapshot export, and backend `DIRECTUS_URL`/`DIRECTUS_TOKEN` configuration.
