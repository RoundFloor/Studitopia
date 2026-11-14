# Tech Stack

**Runtime:** PostgreSQL + Directus data layer  
**Config:** TypeScript (`database.config.ts`) — project config + per-domain config  
**Tests:** Vitest  
**Dev:** Docker Compose (`docker-compose.dev.yml`)

**Folder structure (from constitution.md):**
```
src/tables/, src/functions/, src/procedures/, src/triggers/, src/migrations/,
src/seeds/, src/definitions/, src/scripts/, tests/{migrations,functions,procedures,triggers}/, config/
```

**Naming conventions (constitution.md §IV):**
- Tables: plural `snake_case` nouns (e.g., `forum_posts`, `meeting_rooms`)
- Columns: `snake_case` (e.g., `created_at`, `user_id`)
- Functions: `fn_<domain>_<action>` (e.g., `fn_forum_count_posts`)
- Procedures: `sp_<domain>_<action>` (e.g., `sp_meeting_create_room`)
- Triggers: `trg_<table>_<event>` (e.g., `trg_forum_posts_updated_at`)
- Migrations: `YYYYMMDDHHMMSS_description.sql`, immutable & ordered
- Seeds: deterministic and idempotent

**Confirmed gaps (large):**
- Backend is a NestJS starter template; no data contracts implemented yet.
- Database schema just starting: only `rooms` table + `20261023000000_init.sql` migration exist.
- Directus collections not yet created from tables; no schema snapshot exported.
- Migrations/tests incomplete across `tables/`, `functions/`, `procedures/`, `triggers/`.
- No shared DTOs between database, Directus, and backend yet.
- Recommended folders (`definitions/`, domain subfolders) not yet created; existing SQL artifacts not yet migrated into domain folders.

**TDD workflow (constitution.md §VI):** Define Contract → Write Failing Test (Red) → Implement (Green) → Refactor. Migration tests before migration; unit/integration tests for functions/procedures/triggers; Directus/PostgreSQL mocked in unit tests, live DB in E2E; regression tests for bug fixes.
