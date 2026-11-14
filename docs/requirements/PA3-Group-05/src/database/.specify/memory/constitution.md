<!--
# Sync Impact Report
- Version change: 1.1.0 -> 1.2.0
- Updated sections:
  - Core Principles I-IV aligned with the repository's dependency-graph layout,
    folder packages, configuration model, and naming conventions.
  - Package & Folder Structure Specification rewritten to match the folders and
    files that exist in this repository.
- Removed:
  - Never-used `src/scripts/` shell-script folder and `install.sh` reference.
  - Generic `x/` placeholder tree that did not match the available structure.
- Follow-up TODOs: Populate the reserved `procedures/`, `triggers/`,
  `migrations/`, `seeds/`, `exceptions/`, and `extensions/` folders as those
  domains are implemented.
-->

# Studitopia Database Constitution

## Core Principles

### I. Schema-First & Dependency-Ordered Changes (NON-NEGOTIABLE)
All database changes MUST be delivered as SQL files under `src/` whose file
names declare their dependencies. No ad-hoc production edits, manual schema
drift, or undocumented SQL changes are permitted. Every node SHOULD provide a
reverse `_`-prefixed script; when a change cannot be reversed safely, the reason
MUST be documented.

### II. Domain-as-Folder Architecture (Folder-as-Package)
The database project MUST organize SQL artifacts by domain and artifact type,
treating each folder as a self-contained package:
- `src/definitions/`: PostgreSQL domain and custom type definitions
- `src/schemas/`: schema and extension bootstrap plus reverse scripts
- `src/tables/`: canonical table, index, and constraint definitions
- `src/functions/<domain>/`: reusable SQL functions grouped by domain
- `src/procedures/<domain>/`: stored procedures and transactional workflows
- `src/triggers/<domain>/`: trigger definitions and trigger functions
- `src/migrations/`: ordered schema evolution scripts
- `src/seeds/`: idempotent baseline/reference data
- `src/exceptions/`: shared SQL exception and error definitions
- `src/extensions/`: SQL extension helpers
- `scripts/`: TypeScript compilation, dependency-graph, and database runner tools
- `tests/`: specs mirroring the SQL folders they cover

Cross-domain SQL access MUST occur through documented interfaces/views/procedures, not by directly reading internal implementation details.

### III. Centralized Configuration
Database configuration MUST be centralized:
- **Project Config**: `config/database.config.ts` defines connection settings from
  approved environment variables.
- **Runtime Credentials**: `build/env.json` stores the connection details entered
  interactively by the SQL runner; it is generated, ignored by Git, and MUST NOT
  be committed.
No scattered credentials or direct environment access outside approved
configuration files.

### IV. Standardized Naming & SQL Conventions
SQL object names MUST use `UPPER_SNAKE_CASE` inside the `STUDITOPIA` schema:
- Tables: singular nouns (e.g., `ACCOUNT`, `SESSION`, `DOMAIN`)
- Columns: `UPPER_SNAKE_CASE` (e.g., `CREATE_TIME`, `OWNER_ID`)
- Functions: `UPPER_SNAKE_CASE` verb phrases (e.g., `SESSION_CHECK`,
  `LOGIN_BY_EMAIL`)
- Domains/custom types: `TYPE_<NAME>` (e.g., `TYPE_EMAIL`, `TYPE_USERNAME`)
- Constraints: `CK_<TABLE>_<RULE>` and indexes `IDX_<PURPOSE>`
- SQL files: `<name>.<dep1>_<dep2>.sql`, with reverse scripts as `_<name>.sql`
- TypeScript scripts: `snake_case.ts`
- Specs: `<subject>.spec.ts`; shared data files `pg.<subject>.testcases.ts`

### V. PostgreSQL Boundary
Backend MUST remain the sole consumer of PostgreSQL schema contracts. Frontend MUST never access database objects directly and MUST use backend APIs only. Database objects MUST preserve compatibility with backend DTO and domain contracts.

### VI. Strict Test-Driven Development (TDD) (NON-NEGOTIABLE)
Database changes MUST be test-first:
- Specs MUST be written before the corresponding SQL implementation.
- Tables, schemas, functions, procedures, and triggers MUST have behavior tests.
- Authentication and other user-facing SQL flows MUST have end-to-end specs
  against a live test database configured through `build/env.json`.
- Regression tests MUST be added for bug fixes affecting schema or SQL logic.

## Package & Folder Structure Specification

The project layout enforces one-folder-one-package organization:

```text
studitopia-database/
├── src/
│   ├── definitions/               # PostgreSQL domains and custom types
│   │   ├── email.init.sql
│   │   └── username.init.sql
│   ├── schemas/                   # Schema/extension setup and reversal
│   │   ├── init.sql
│   │   └── _init.sql
│   ├── tables/                    # Tables, indexes, constraints, table helpers
│   │   ├── account.email_username.sql
│   │   ├── domain.init.sql
│   │   └── session.account.sql
│   ├── functions/                 # Reusable SQL functions grouped by domain
│   │   └── authentication/
│   │       ├── _register.sql
│   │       ├── activate-account.session-check.sql
│   │       ├── email-validation.ev.account_domain.sql
│   │       ├── get-email.account.sql
│   │       ├── get-otp.session.sql
│   │       ├── login.session.sql
│   │       ├── logout.session.sql
│   │       ├── register.ev_uv_session.sql
│   │       ├── remove-otp.session.sql
│   │       ├── save-otp.session.sql
│   │       ├── session-check.session.sql
│   │       └── username-validation.uv.account.sql
│   ├── procedures/                # Stored procedures (reserved)
│   │   └── rooms/
│   ├── triggers/                  # Triggers and trigger functions (reserved)
│   │   └── rooms/
│   ├── migrations/                # Ordered schema evolution (reserved)
│   ├── seeds/                     # Idempotent baseline data (reserved)
│   ├── exceptions/                # Shared SQL exceptions (reserved)
│   └── extensions/                # SQL extension helpers (reserved)
│
├── scripts/                       # TypeScript graph compiler and DB runner
│   ├── compile.ts
│   ├── env.ts
│   ├── files.ts
│   ├── node.ts
│   ├── restore.ts
│   ├── run_all.ts
│   └── sql.ts
│
├── tests/                         # Database behavior and full-flow tests
│   ├── functions/
│   │   └── authentication/
│   │       ├── helpers.ts
│   │       ├── pg.<subject>.testcases.ts
│   │       └── <subject>.spec.ts
│   ├── migrations/
│   ├── procedures/
│   └── triggers/
│
├── config/                        # Project database configuration
│   └── database.config.ts
│
├── build/                         # Generated graph, diagram, env (ignored)
├── dist/                          # Compiled JavaScript (ignored)
│
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── vitest.config.ts
```

### SQL File Naming & Dependency Graph

Execution order is derived entirely from file names:

- `<name>.sql` — standalone file with no dependencies.
- `<name>.<dependency>.sql` — runs after `<dependency>`.
- `<name>.<dep1>_<dep2>.sql` — runs after all listed dependencies.
- `<namespace>.<name>.<dep1>_<dep2>.sql` — keyed by `<name>` inside a namespace.
- `_<name>.sql` — reverse script for `<name>`, run with `npm run restore <name>`.

`npm run compile` writes the graph and execution state to `build/tree.md` and a
diagram to `build/mermaid.md`. `npm run all` executes only pending nodes in
dependency order. These generated files are ignored by Git.

### Folder Roles & Meanings
- `src/definitions/`: PostgreSQL domain and custom type definitions.
- `src/schemas/`: schema creation, extension installation, and reverse drop scripts.
- `src/tables/`: canonical table definitions, primary keys, foreign keys, indexes, constraints, and table-scoped helpers such as `REGISTER_SESSION`.
- `src/functions/<domain>/`: reusable SQL functions with documented inputs, outputs, and ownership.
- `src/procedures/<domain>/`: multi-step transactional operations and domain workflows.
- `src/triggers/<domain>/`: automated consistency, audit, and timestamp behavior.
- `src/migrations/`: immutable ordered schema changes with rollback documentation.
- `src/seeds/`: deterministic, idempotent baseline data for development and testing.
- `src/exceptions/`: shared SQL exception/error definitions.
- `src/extensions/`: SQL extension helpers.
- `scripts/`: TypeScript tools for compilation, dependency-graph generation, execution, and restore.
- `tests/`: specs mirroring the SQL folders, plus helpers and data-driven test cases.
- `config/`: centralized database configuration.
- `build/` and `dist/`: generated outputs; never edit or commit them.

## Development Workflow, Quality Gates & Testing Standards

### TDD Development Workflow
1. **Define Contract**: Establish the node key, dependencies, tables, functions, and reverse script.
2. **Write Failing Test (Red)**: Author specs under the matching `tests/` folder; confirm failure against the live test database.
3. **Implement (Green)**: Write minimal SQL that satisfies the tests and declares its dependencies in the file name.
4. **Refactor**: Clean SQL, verify naming, schema qualification, dependency graph, and test coverage.

### Integration & Testing Quality Gates
- **Dependency Gate**: `npm run compile` MUST succeed and produce an acyclic graph before `npm run all`.
- **Schema Gate**: All SQL nodes MUST apply cleanly to an empty database and via the documented `restore init` → `all` reset sequence.
- **Database Behavior Tests**: Authentication and other SQL behavior MUST be covered by Vitest specs against a live test database; migration/schema definitions MUST have file-level assertions.
- **Test Gate**: `npm test` MUST pass before merging.
- **Generated Files Gate**: `build/` and `dist/` are generated outputs and MUST NOT be committed.

## Governance

1. **Constitutional Authority**: This Constitution governs all development in `studitopia-database`. SQL that violates dependency, naming, package structure, or testing rules MUST NOT be merged.
2. **Amendment Procedure**: Amendments require an explicit PR documenting rationale, impact on database objects, and approval by the Senior Backend Lead.
3. **Semantic Versioning**:
   - **MAJOR**: Incompatible schema or SQL contract changes.
   - **MINOR**: New tables, functions, procedures, triggers, or expanded testing rules.
   - **PATCH**: Clarifications, non-functional adjustments, or naming corrections.
4. **Compliance Checklist**: Every PR MUST verify dependency-declared changes, folder-package structure, naming conventions, backend/frontend contract alignment, and tests.

**Version**: 1.2.0 | **Ratified**: 2026-10-23 | **Last Amended**: 2026-11-07
