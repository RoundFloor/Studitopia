# Roadmap

No `TODO.md` found; phases derived from Studitopia module list + database folder structure (constitution.md §II).

## Phase workflow

Each phase repeats:

1. **Planning** — define contract, scope, and acceptance criteria
2. **Implementing** — write migration/function/procedure/trigger code (TDD Red → Green → Refactor)
3. **Validate** — migration gate (clean apply to empty + latest state), code standards gate (lint/format)
4. **Testing** — test gate (all unit + E2E pass), Directus/PostgreSQL boundary tests (mocked SDK + live DB)
5. **Update spec files** — update mission/tech-stack/roadmap and constitution if needed
6. **(Replanning if needed)** — adjust scope/order based on results

## Phases

- [x] Phase 1: Foundation — init migration (`20261023000000_init.sql`), seeds (`rooms_seed.sql`), dev Docker Compose (`docker-compose.dev.yml`), config (`database.config.ts`), scripts
  - ⚠️ Partial: recommended folders `src/tables/` and `src/definitions/` still missing; domain subfolders not created
- [ ] Phase 2: Core tables — users, profiles (domain subfolders, constraints, indexes)
- [ ] Phase 3: Auth & Account — account management tables & functions
- [ ] Phase 4: Forums & Posts — university/major/course forums, post types (normal/material/function), triggers
- [ ] Phase 5: Resource Library — material upload/search/download functions
- [ ] Phase 6: Study Planning & Courses — prerequisites, credit computing procedures
- [ ] Phase 7: Meeting Rooms — study/hall rooms, auto-matching functions
- [ ] Phase 8: Friends & Groups — friend management, private/public groups, messaging procedures
- [ ] Phase 9: Search & Discovery — tag/content/user search functions
- [ ] Phase 10: Social layer — friend posts, group material sharing

Each phase ends with: Directus collection → schema snapshot → seed → verify quality gates.

**Existing artifacts (reference):**
- `src/migrations/20261023000000_init.sql`
- `src/seeds/rooms_seed.sql`
- `src/functions/rooms/fn_room_count_members.sql`
- `src/procedures/rooms/sp_room_join.sql`
- `src/triggers/rooms/trg_rooms_updated_at.sql`
- `tests/migrations/init.spec.ts`
- `config/database.config.ts`
