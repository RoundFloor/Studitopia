<!--
# Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- Added sections:
  - Core Principles I-VI
  - Package & Folder Structure Specification
  - Development Workflow, Quality Gates & Testing Standards
  - Governance
- Structure Specification Updates:
  - Adopted backend constitution as primary reference.
  - Defined database folders: tables/, functions/, procedures/, triggers/, migrations/, seeds/, definitions/, scripts/, tests/.
- Follow-up TODOs: Create the recommended folders and migrate existing SQL artifacts into them.
-->

# Studitopia Database Constitution

## Core Principles

### I. Schema-First & Versioned Migrations (NON-NEGOTIABLE)
All database changes MUST be delivered as immutable, ordered migration files. No ad-hoc production edits, manual schema drift, or undocumented SQL changes are permitted. Every migration MUST include rollback notes or a documented reversal strategy.

### II. Domain-as-Folder Architecture (Folder-as-Package)
The database project MUST organize SQL artifacts by domain and artifact type, treating each folder as a self-contained package:
- `src/tables/`: canonical table and constraint definitions
- `src/functions/`: reusable SQL functions
- `src/procedures/`: stored procedures and transactional workflows
- `src/triggers/`: trigger definitions and trigger functions
- `src/migrations/`: ordered schema evolution scripts
- `src/seeds/`: idempotent baseline/reference data
- `src/definitions/`: PostgreSQL custom type definitions
- `src/scripts/`: shell scripts for installation and migration operations
- `tests/`: migration, function, procedure, and trigger tests

Cross-domain SQL access MUST occur through documented interfaces/views/procedures, not by directly reading internal implementation details.

### III. Dual-Tier Configuration Hierarchy
Database configuration MUST follow a strict two-level model:
- **Project Config**: one root configuration defining connection, environment, migration order, and global DB settings.
- **Domain Config**: one configuration per domain package defining schema ownership, seed rules, and test database settings.
No scattered credentials or direct environment access outside approved configuration files.

### IV. Standardized Naming & SQL Conventions
All database objects MUST use `snake_case`:
- Tables: plural nouns (e.g., `forum_posts`, `meeting_rooms`)
- Columns: `snake_case` (e.g., `created_at`, `user_id`)
- Functions: `fn_<domain>_<action>` (e.g., `fn_forum_count_posts`)
- Procedures: `sp_<domain>_<action>` (e.g., `sp_meeting_create_room`)
- Triggers: `trg_<table>_<event>` (e.g., `trg_forum_posts_updated_at`)
- Migrations: timestamped, descriptive, ordered names
- Seeds: deterministic and idempotent

### V. Directus/PostgreSQL Boundary
Backend MUST remain the sole consumer of Directus/PostgreSQL schema contracts. Frontend MUST never access database objects directly and MUST use backend APIs only. Database objects MUST preserve compatibility with backend DTO and domain contracts.

### VI. Strict Test-Driven Development (TDD) (NON-NEGOTIABLE)
Database changes MUST be test-first:
- Migration tests MUST be written before migration implementation.
- Functions, procedures, and triggers MUST have unit/integration tests.
- Directus/PostgreSQL operations MUST be mocked in backend unit tests and validated against a live test database during E2E testing.
- Regression tests MUST be added for bug fixes affecting schema or SQL logic.

## Package & Folder Structure Specification

The project layout enforces one-folder-one-package organization:

```text
studitopia-database/
├── src/
│   ├── tables/                     # Table definitions and constraints
│   │   └── x/                      # Illustrative placeholder for a domain (e.g., forums, meetings)
│   │       ├── x_table.sql
│   │       └── x_constraints.sql
│   │
│   ├── functions/                 # Reusable SQL functions
│   │   └── x/
│   │       └── fn_x_action.sql
│   │
│   ├── procedures/                # Stored procedures
│   │   └── x/
│   │       └── sp_x_action.sql
│   │
│   ├── triggers/                  # Trigger definitions and trigger functions
│   │   └── x/
│   │       ├── trg_x_event.sql
│   │       └── fn_trg_x_event.sql
│   │
│   ├── migrations/                # Ordered schema evolution scripts
│   │   └── YYYYMMDDHHMMSS_description.sql
│   │
│   ├── seeds/                     # Idempotent baseline/reference data
│   │   └── x_seed.sql
│   │
│   └── definitions/               # PostgreSQL custom type definitions
│       └── x/                     # Domain-specific types
│   
├── scripts/                       # Shell scripts for installation and migrations
│   └── install.sh                 # Installation/setup script
│       
├── tests/                         # Database boundary and SQL behavior tests
│   ├── migrations/
│   ├── functions/
│   ├── procedures/
│   └── triggers/
│
├── config/                        # Project and domain database configuration
│   ├── database.config.ts
│   └── x.config.ts
│
└── README.md
```

### Folder Roles & Meanings
- `src/tables/`: canonical table definitions, primary keys, foreign keys, indexes, and constraints.
- `src/functions/`: reusable SQL functions with documented inputs, outputs, and ownership.
- `src/procedures/`: multi-step transactional operations and domain workflows.
- `src/triggers/`: automated consistency, audit, and timestamp behavior.
- `src/migrations/`: immutable ordered schema changes with rollback documentation.
- `src/seeds/`: deterministic, idempotent baseline data for development and testing.
- `src/definitions/`: PostgreSQL custom type definitions (ENUMs, composite types, domains).
- `src/scripts/`: shell scripts for installation, migration, and deployment automation.
- `tests/`: migration, function, procedure, trigger, and boundary tests.
- `config/`: centralized database configuration and validation.

## Development Workflow, Quality Gates & Testing Standards

### TDD Development Workflow
1. **Define Contract**: Establish table, function, procedure, trigger, and migration contracts.
2. **Write Failing Test (Red)**: Author tests for expected behavior and database operations; confirm failure.
3. **Implement (Green)**: Write minimal SQL/migration code to satisfy tests.
4. **Refactor**: Clean SQL, verify naming, boundaries, and test coverage.

### Integration & Testing Quality Gates
- **Database Boundary Tests**: Directus/PostgreSQL operations MUST be tested against mocked SDK responses in unit tests and against a live test database during E2E testing.
- **Migration Gate**: All migrations MUST apply cleanly to an empty database and to the latest production-like state.
- **Code Standards Gate**: All SQL and config files MUST pass lint and formatting checks.
- **Test Gate**: All database unit and E2E tests MUST pass before merging.

## Governance

1. **Constitutional Authority**: This Constitution governs all development in `studitopia-database`. SQL that violates migration, naming, package structure, or testing rules MUST NOT be merged.
2. **Amendment Procedure**: Amendments require an explicit PR documenting rationale, impact on database objects, and approval by the Senior Backend Lead.
3. **Semantic Versioning**:
   - **MAJOR**: Incompatible schema or SQL contract changes.
   - **MINOR**: New tables, functions, procedures, triggers, or expanded testing rules.
   - **PATCH**: Clarifications, non-functional adjustments, or naming corrections.
4. **Compliance Checklist**: Every PR MUST verify migration-first changes, folder-package structure, naming conventions, backend/frontend contract alignment, and tests.

**Version**: 1.1.0 | **Ratified**: 2026-10-23 | **Last Amended**: 2026-10-24
