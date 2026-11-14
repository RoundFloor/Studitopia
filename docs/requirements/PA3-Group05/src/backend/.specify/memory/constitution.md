<!--
# Sync Impact Report
- Version change: 2.3.0 → 2.4.0
- List of modified principles:
  - None (principles preserved; structural sections updated)
- Modified sections:
  - Package & Folder Structure Specification: Added the `web` package and the top-level
    `frontend/` static-asset directory to the repository concerns, layout, package inventory,
    and folder roles.
  - Development Workflow, Quality Gates & Testing Standards: Added a Frontend Delivery
    subsection describing how prebuilt assets are served.
- Added sections: Frontend Delivery
- Removed sections: None
- Follow-up TODOs:
  - Normalize `src/packages/authentication/decorartors/` to `decorators/`.
  - Normalize `src/packages/security-generation/__test__/` to `__tests__/`.
  - Move `src/packages/security-generation/decorators/sg.mock.ts` into `__tests__/`.
  - Add `__tests__/` coverage for the `web` package, which currently has no tests.
-->

# Studitopia Backend Constitution

## Core Principles

### I. Strict Test-Driven Development (TDD) (NON-NEGOTIABLE)
All backend features, domain modules, and business logic MUST be developed test-first:
- **Red-Green-Refactor Lifecycle**: Test specifications (`.spec.ts` / `.e2e-spec.ts`) MUST be
  written and confirmed failing before any functional implementation code is written. Engineers
  write only the minimal code needed to pass the tests, followed by necessary refactoring.
- **Test Placement**: Unit and integration tests MUST live in the owning package's
  `__tests__/` folder and use the `*.spec.ts` suffix. System end-to-end tests MUST live in
  the repository-level `test/` folder and use the `*.e2e-spec.ts` suffix. Vitest is the test
  runner for both suites.
- **Test Helpers & Fixtures**: Mocks, fixtures, and table-driven cases shared by a package's
  tests MUST remain inside its `__tests__/` folder and use the `*.mock.ts`,
  `*.testcase.ts`, or `*.testcases.ts` suffixes. Test helpers MUST NOT live in production role
  folders.
- **Coverage & Test Isolation**: Unit and integration tests MUST cover all domain logic, route
  handlers, and application services. External dependencies (PostgreSQL connections, the
  Resend email API, reCAPTCHA verification, and any other remote service) MUST be mocked or
  stubbed during unit testing using `@nestjs/testing` and Vitest mocks.
- **Rationale**: Strict TDD ensures predictable contract interfaces, prevents regressions across
  domain modules, and guarantees that routing, business logic, and data persistence behave
  reliably.

### II. Package-by-Folder Architecture (Folder-as-Package)
The codebase MUST organize each functional domain or capability as one self-contained package
inside `src/packages/<package-name>/`. The following rules are universal and MUST apply to every
current and future package:
- **One Package, One Folder**: A package MUST map to exactly one folder whose name is the
  kebab-case package name. Its controllers, services, gateways, decorators, DTOs, models,
  configuration, and tests MUST reside in that folder and MUST NOT be spread across other
  packages.
- **Package Identifier**: Primary package artifacts MUST use the package identifier, which is
  either the full kebab-case package name or an established short prefix used consistently
  throughout the package (e.g., `authentication` → `auth`, `postgres` → `pg`,
  `security-generation` → `sg`). The chosen identifier MUST be used for the package's module,
  service, controller, and primary config file, and MUST NOT vary within the package.
- **Adaptive Role Placement**: Production files are grouped by architectural role using a
  file-count rule:
  - **Zero files for a role** → no role sub-folder exists.
  - **Exactly one file for a role** → the file MAY live at the package root or in the role
    sub-folder.
  - **More than one file for a role** → every file for that role MUST be placed in the role
    sub-folder.
  - The rule applies uniformly to controllers, services, gateways, models, DTOs, decorators,
    guards, configuration, and any future architectural role.
- **Mandatory Module**: Every package MUST contain exactly one `<identifier>.module.ts` at its
  root. Every package that exposes behavior MUST export the corresponding provider from that
  module.
- **Role Sub-Folders**: A role sub-folder MUST be named after the architectural role it
  contains (`controllers/`, `services/`, `gateways/`, `models/`, `dto/`, `decorators/`,
  `guards/`, `interceptors/`, `filters/`, `config/`, `response-code/`, `__tests__/`). A package
  MUST NOT contain an empty role sub-folder or two sub-folders serving the same role.
- **Mandatory Test Location**: Unit and integration tests MUST always be placed in
  `__tests__/`, never at the package root, even when the package has only one test file.
- **Configuration Placement**: A package MAY define one or more configuration files named
  `<scope>.config.ts`, where `<scope>` is the package identifier or the name of a specific
  external integration (e.g., `email-sender.config.ts`, `discord.config.ts`). Configuration
  files MUST reside at the package root or in `config/`; the chosen location MUST remain
  consistent for the same scope within the package.
- **Integration Adapters**: An integration-target file named `<integration>.config.ts` MAY host
  the thin adapter that reaches that target (for example, a Discord webhook sender). Such files
  MUST NOT contain domain business logic.
- **Model Placement**: Model files follow the adaptive role placement rule; when more than one
  model file exists, all of them MUST be grouped in `models/`.
- **Encapsulation & Boundaries**: Cross-package behavior MUST be consumed through exported
  NestJS providers/services. Packages MAY import public DTO and model types from another
  package's `dto/` or `models/` folder, but MUST NOT import internal private utilities.
- **Zero Circular Dependencies**: Circular dependencies between packages are strictly FORBIDDEN.
- **Foundational Separation**: Cross-cutting infrastructure MUST live in `src/common/`, and
  global application configuration MUST live in `src/config/`. Feature packages MUST NOT
  duplicate shared infrastructure or define global configuration.
- **Uniformity**: These rules MUST be applied to every new package without package-specific
  exceptions. Introducing a new architectural role requires a corresponding role sub-folder
  that follows the same adaptive placement rule.
- **Rationale**: The adaptive layout keeps every package surface clean at any scale — a single
  file per role is instantly visible at the root, while larger packages are organized into role
  sub-folders without cluttering the root.

### III. Dual-Tier Configuration Hierarchy (Project & Package Configs)
Configuration MUST follow a strict two-level model with zero scattered configuration values:
- **Single Project Config (`src/config/app.config.ts`)**: Exactly ONE root configuration file
  MUST define global application settings, including the global route prefix, listening port,
  and other app-wide constants (e.g., `GLOBAL_PREFIX`, `PORT`).
- **Scoped Package Configs (`<scope>.config.ts`)**: Each package MAY define one or more
  dedicated configuration files exporting typed constants or an `as const` configuration
  object. The primary config MUST use the package identifier; integration-specific configs MUST
  use the integration name. Files MUST be placed at the package root or in `config/` according
  to the adaptive role placement rule.
- **Integration Config Content**: A `<integration>.config.ts` file MAY also export the minimal
  adapter used to call that integration, but it MUST NOT hold business rules, state, or
  cross-package behavior.
- **Environment Access**: Reads of `process.env` MUST be confined to configuration files. All
  other modules MUST consume the exported configuration values instead of reading the
  environment directly.
- **Fail-Fast Validation**: Required configuration values MUST be validated when the application
  starts so that missing or malformed settings stop startup instead of failing at request time.
- **Rationale**: Centralized global settings combined with namespaced package configs guarantee
  fail-fast startups, clear ownership of environment variables, and modular portability.

### IV. Standardized Naming & TypeScript Conventions
All code MUST strictly adhere to uniform TypeScript naming and type safety rules:
- **Variables & Functions/Methods**: MUST use `camelCase` (e.g., `meetingId`, `executeAction()`,
  `getForumThread()`).
- **Classes & Architectural Components**: MUST use `PascalCase` with explicit architectural role
  suffixes:
  - Controllers: `*Controller` (e.g., `AuthController`, `ForumController`)
  - Services: `*Service` (e.g., `AuthenticationService`, `PostgresService`)
  - Modules: `*Module` (e.g., `AuthModule`, `PostgresModule`)
  - Gateways: `*Gateway` (e.g., `MeetingSignalingGateway`)
  - Guards & Filters: `*Guard`, `*Filter` (e.g., `AuthGuard`, `HttpErrorFilter`)
- **Decorators**: Decorator factory functions and custom validators MUST use `PascalCase` and
  describe the behavior they add (e.g., `IsUsername`, `IsPassword`, `KeySession`). Decorator
  files MUST use the `*.decorator.ts` suffix, or `*.decorators.ts` when a file groups a related
  decorator family.
- **Data Transfer Objects (DTOs)**: MUST use `PascalCase` with the `Dto` suffix (e.g.,
  `RegisterDto`, `UpdateProfileDto`).
- **Interfaces & Types**: MUST use `PascalCase` without a leading `I` prefix (e.g.,
  `SessionResponse`, `EmailSenderConfig`).
- **Enums & Constant Maps**: Enum names MUST use `PascalCase`; enum keys MUST use
  `UPPER_SNAKE_CASE` (e.g., `MeetingStatus.ACTIVE`). Constant maps such as response codes MUST
  use `UPPER_SNAKE_CASE` keys (e.g., `RESPONSE_CODE.INVALID_EMAIL`).
- **Constants & Configuration Keys**: Top-level exported constants MUST use `UPPER_SNAKE_CASE`
  (e.g., `GLOBAL_PREFIX`, `PORT`, `DB_PORT`, `DB_MAX_CONNECTION`). Keys inside typed
  configuration objects MAY use `snake_case` when mirroring external or environment names.
- **File Names**: MUST use `kebab-case` with a descriptive double extension (e.g.,
  `auth.controller.ts`, `email-sender.service.ts`, `app.config.ts`, `auth.service.spec.ts`,
  `email-sender.model.ts`). Files named after a package MUST use the package identifier
  consistently (e.g., `auth.module.ts`, `pg.service.ts`, `sg.guard.ts`). Acronym-based constant
  files MAY retain an uppercase acronym (e.g., `SQLSTATE.dto.ts`).
- **Module Imports**: The project compiles as ESM (`"type": "module"`, NodeNext resolution).
  Relative imports MUST include the explicit `.js` extension (e.g.,
  `import { AuthModule } from './packages/authentication/auth.module.js';`).
- **Folder Names**: MUST use `kebab-case` domain names (e.g., `authentication`, `email-sender`,
  `postgres`, `recaptcha`, `security-generation`, `models`, `dto`, `decorators`, `config`,
  `__tests__`).
- **Database Schemas, Collections & Fields**: PostgreSQL schemas, tables, functions, and columns
  MUST use `snake_case` (e.g., schema `studitopia`, table `directus_users`, column
  `created_at`).
- **Rationale**: Eliminates ambiguity, establishes consistency across backend services and
  database schemas, and streamlines client contract integration with the React TypeScript
  frontend.

## Package & Folder Structure Specification

The repository has seven top-level concerns: global configuration (`src/config/`), shared
infrastructure (`src/common/`), feature packages (`src/packages/`), end-to-end tests (`test/`),
project documentation (`docs/`), Spec Kit feature specifications (`specs/`), and the prebuilt
frontend bundle (`frontend/`). Every direct sub-folder of `src/packages/` is one package; folders
below a package are architectural roles, not packages.

### Package Anatomy

The tree below lists every possible role location. It is a capability map, not a required set:
only the module is mandatory, and only folders that contain files may exist. `<identifier>` is
the package's chosen identifier and `<scope>` is the package identifier or an integration name.

```text
<package-name>/
├── <identifier>.module.ts          # Required: exactly one, always at the package root
├── <identifier>.controller.ts      # Single-controller variant (root)
├── <identifier>.service.ts         # Single-service variant (root)
├── <identifier>.gateway.ts         # Single-gateway variant (root)
├── <identifier>.guard.ts           # Single-guard variant (root)
├── <identifier>.model.ts           # Single-model variant (root)
├── <scope>.config.ts               # Scoped configuration (one or more allowed)
├── controllers/                    # Multiple controllers → all controllers grouped here
├── services/                       # Multiple services → all services grouped here
├── gateways/                       # Multiple gateways → all gateways grouped here
├── models/                         # Multiple model files → all models grouped here
├── dto/                            # Request/response contracts
├── decorators/                     # Custom validators and parameter decorators
├── guards/                         # Guard implementations and auth decorators
├── interceptors/                   # Nest interceptors
├── filters/                        # Exception filters
├── config/                         # Package configuration
├── response-code/                  # Response-code maps
└── __tests__/                      # Unit/integration tests and test helpers
```

### Placement Rules

| Item | Rule |
| --- | --- |
| Package | Exactly one folder per feature domain under `src/packages/` |
| Package identifier | Full kebab-case name or established prefix (`auth`, `pg`, `sg`), used consistently |
| Module | Exactly one `<identifier>.module.ts`, always at the package root |
| Role with 0 files | No role sub-folder is created |
| Role with 1 file | File MAY be at the package root OR in the role sub-folder |
| Role with 2+ files | ALL files MUST be in the role sub-folder |
| Root/main file name | `<identifier>.<role>.ts` |
| Tests | Always in `__tests__/`; never at the package root |
| Test helpers | `*.mock.ts`, `*.testcase.ts`, `*.testcases.ts` inside `__tests__/` |
| Configuration | One or more `<scope>.config.ts` files at the root or in `config/` |
| Integration adapters | Thin adapters MAY live in `<integration>.config.ts`; no domain logic |
| Shared code | Never inside a feature package; belongs in `src/common/` |
| Global config | Never inside a feature package; belongs in `src/config/` |

### Repository Layout

```text
studitopia-backend/
├── src/
│   ├── config/
│   │   └── app.config.ts               # The single global configuration file
│   ├── common/                         # Foundational shared infrastructure
│   │   ├── response-code/
│   │   │   └── code.config.ts          # Response-code map (single file → role folder)
│   │   ├── exception-factory.ts        # Validation exception factory
│   │   ├── interceptor.ts              # HTTP response interceptor
│   │   └── response.dto.ts             # Shared response contract
│   ├── packages/
│   │   ├── authentication/             # Package: auth
│   │   ├── email-sender/               # Package: email-sender
│   │   ├── postgres/                   # Package: pg
│   │   ├── recaptcha/                  # Package: recaptcha
│   │   ├── security-generation/        # Package: sg
│   │   └── web/                        # Package: web (serves the prebuilt frontend)
│   ├── app.module.ts                   # Root module composing all packages
│   └── main.ts                         # Application entry point
├── test/
│   └── *.e2e-spec.ts                   # System end-to-end tests
├── docs/
│   ├── API.md                          # API reference
│   ├── backend/                        # Backend domain documentation
│   └── database/                       # Database schema documentation
├── specs/
│   └── <nnn-feature>/                  # Spec Kit feature artifacts (spec, plan, tasks, contracts)
├── frontend/                           # Prebuilt static frontend bundle (no backend source)
│   ├── index.html                      # SPA entry document served by WebController
│   └── assets/                         # Hashed JS, CSS, and SVG assets
├── .specify/                           # Spec Kit workflow, templates, and memory
├── vitest.config.ts                    # Unit test configuration
├── vitest.config.e2e.ts                # E2E test configuration
├── .oxlintrc.json                      # Lint rules
├── .prettierrc                         # Formatting rules
├── nest-cli.json                       # Nest CLI configuration
└── tsconfig.json                       # TypeScript configuration
```

### Current Package Inventory

The inventory reflects the current `src/packages/` tree. Folder names are shown in canonical
form; spelling deviations present in the working tree are recorded in the amendment report.

| Package | Identifier | Module | Roles present |
| --- | --- | --- | --- |
| `authentication` | `auth` | `auth.module.ts` | controller, service, `config/auth.config.ts`, `decorators/`, `dto/`, `__tests__/` |
| `email-sender` | `email-sender` | `email-sender.module.ts` | service, `email-sender.config.ts`, `discord.config.ts`, `models/`, `__tests__/` |
| `postgres` | `pg` | `pg.module.ts` | service, `pg.config.ts`, `dto/`, `__tests__/` |
| `recaptcha` | `recaptcha` | `recaptcha.module.ts` | service, `__tests__/` |
| `security-generation` | `sg` | `sg.module.ts` | service, `sg.config.ts`, `sg.guard.ts`, `decorators/`, `dto/`, `__tests__/` |
| `web` | `web` | `web.module.ts` | controller, service, `web.guard.ts` |

### Folder Roles & Meanings
- `src/config/`: Holds the single project-level configuration file (`app.config.ts`) and, when
  used, its validation schema. No other global configuration file is permitted.
- `src/common/`: The foundational shared package containing cross-cutting infrastructure. It
  follows the same adaptive role layout as feature packages and MUST NOT contain
  domain-specific business logic. It currently hosts shared response contracts
  (`response.dto.ts`), the HTTP interceptor (`interceptor.ts`), the validation exception factory
  (`exception-factory.ts`), and the response-code map (`response-code/code.config.ts`).
- `src/packages/`: Contains exactly one folder per feature domain. Package folders MUST NOT be
  nested; a sub-folder of a package is an architectural role, not another package.
- `test/`: Holds system end-to-end tests only. Unit and integration tests remain inside each
  package's `__tests__/` folder.
- `docs/`: Holds human-facing documentation: the API reference (`API.md`), backend domain notes
  (`backend/`), and database notes (`database/`).
- `specs/`: Holds Spec Kit feature artifacts grouped by feature (`<nnn-feature>/`), including
  specifications, plans, tasks, research, data models, contracts, and checklists.
- `frontend/`: Holds the prebuilt static frontend bundle (`index.html` plus hashed assets under
  `assets/`) served by the `web` package. It MUST NOT contain backend source, tests, or build
  configuration; frontend source is built elsewhere and committed here only as deployable output.
- **Role sub-folders** share the same meaning in every package:
  - `controllers/` and root-level `*.controller.ts`: HTTP entry points.
  - `services/` and root-level `*.service.ts`: domain and application logic.
  - `gateways/` and root-level `*.gateway.ts`: WebSocket or event entry points.
  - `models/` and root-level `*.model.ts`: domain types and persistence shapes.
  - `dto/`: request and response contracts.
  - `decorators/` and root-level `*.decorator(s).ts`: custom validators and parameter decorators.
  - `guards/` and root-level `*.guard.ts`: authorization guards and auth decorators.
  - `interceptors/` and root-level `*.interceptor.ts`: Nest interceptors.
  - `filters/` and root-level `*.filter.ts`: exception filters.
  - `config/` and root-level `*.config.ts`: package-specific and integration-specific
    configuration.
  - `response-code/`: exported response-code maps.
  - `__tests__/`: co-located unit and integration tests and their helpers written before
    implementation.

### Structural Lifecycle
- **Adding a package**: Create `src/packages/<package-name>/`, choose and record the package
  identifier, add exactly one `<identifier>.module.ts`, and create only the role sub-folders
  that the package needs.
- **Adding a second file to a role**: In the same change, move the existing root-level file into
  the role sub-folder and place the new file there too.
- **Removing the last file of a role**: In the same change, remove the now-empty role
  sub-folder.
- **Adding a scoped config**: Name it `<scope>.config.ts`, place it at the root or in `config/`
  consistently, and keep `process.env` reads confined to that file.
- **Adding a new architectural role**: Define the role sub-folder name and apply the same
  placement rules; do not place role files at the package root once the role has multiple files.
- **Moving code between packages**: Move the owning types and tests with it, update module
  imports and exports, and verify that no circular dependency is introduced.

## Development Workflow, Quality Gates & Testing Standards

### TDD Development Workflow
1. **Define Contract**: Establish DTOs and interface contracts for the API endpoint or package
   boundary.
2. **Write Failing Test (Red)**: Author unit or integration tests in the package's `__tests__/`
   folder, or E2E tests in `test/`, verifying the expected behavior. Run `npm run test` or
   `npm run test:e2e` to confirm failure.
3. **Implement (Green)**: Write minimal NestJS code to satisfy the test assertions.
4. **Refactor**: Clean code, ensure compliance with package boundaries and the adaptive role
   layout, and verify all tests pass.

### Integration & Testing Quality Gates
- **Database Boundary Tests**: PostgreSQL operations MUST be tested against mocked `pg` pool
  responses in unit tests and against a live test database during E2E testing.
- **External Service Tests**: Resend, reCAPTCHA, and any other third-party integration MUST be
  mocked in unit tests; no live third-party calls are permitted in the default test run.
- **Code Standards Gate**: All code MUST pass `npm run lint` (oxlint) and `npm run format`
  (Prettier) with zero errors.
- **Build Gate**: The project MUST compile with `npm run build` under strict TypeScript settings.
- **Test Gate**: All unit and E2E test suites MUST pass (`npm run test`, `npm run test:e2e`)
  before merging.

### Documentation & Specification Alignment
- **API Documentation**: Changes to routes, request contracts, or response shapes MUST update
  `docs/API.md`.
- **Domain & Database Documentation**: Changes to package behavior or schema MUST update the
  relevant notes under `docs/backend/` and `docs/database/`.
- **Feature Specifications**: New features MUST start from a Spec Kit feature folder under
  `specs/<nnn-feature>/`; implementation MUST follow its spec, plan, and tasks artifacts.

### Frontend Delivery
- **Static Bundle Only**: `frontend/` MUST contain only deployable static output (`index.html`
  and hashed assets). Frontend source, tests, and build tooling MUST NOT be added there.
- **Serving Contract**: The `web` package (`WebController`) serves JavaScript, CSS, and HTML from
  `frontend/`. Changes to routes, asset paths, or file resolution MUST preserve this contract.
- **Build Order**: Frontend assets MUST be built before deployment; the backend build MUST NOT
  compile or transform frontend source.

## Governance

1. **Constitutional Authority**: This Constitution governs all development in the
   `studitopia-backend` repository. Code that violates TDD, folder-package modularity,
   configuration rules, or naming conventions MUST NOT be merged.
2. **Amendment Procedure**: Amendments require an explicit PR documenting the rationale, impact
   on package boundaries, and approval by the Senior Backend Lead.
3. **Semantic Versioning**:
   - **MAJOR**: Incompatible changes to core principles or package architecture.
   - **MINOR**: Addition of new packages, new database or external-service integrations,
     expanded testing rules, or material changes to the prescribed folder/file layout.
   - **PATCH**: Clarifications, non-functional adjustments, or naming standard corrections.
4. **Compliance Checklist**: Every PR MUST verify that tests were written first (TDD), the
   folder-package structure is preserved, the package identifier is used consistently, the
   adaptive role placement rule is honored (0 files = no folder; 1 file = root or role folder;
   2+ files = role folder only), role sub-folders are not empty, the module remains at the
   package root, tests and their helpers reside in `__tests__/`, scoped configs follow the
   `<scope>.config.ts` rule, `frontend/` holds only prebuilt assets, and naming conventions are
   strictly applied.

**Version**: 2.4.0 | **Ratified**: 2026-10-19 | **Last Amended**: 2026-11-14
