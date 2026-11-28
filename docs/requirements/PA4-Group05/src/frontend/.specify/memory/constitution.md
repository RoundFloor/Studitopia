# Studitopia Frontend Constitution
<!--
  Sync Impact Report
  Version change: 1.0.0 -> 1.1.0
  Modified principles: I-VII retained; VI renamed to "Automated Testing (NON-NEGOTIABLE)"
  Added sections: Technology and Toolchain; Repository Folder Map; Source Layer Map;
    Dependency Direction; File Creation and Placement Rules; Imports and Generated Artifacts;
    Testing Strategy; Development Workflow
  Removed sections: Project Scope; React Development Standards; State and Data Management;
    UI/UX and Accessibility; Code Standard and Testing; Security and Performance;
    Development Workflow (content retained under Core Principles, Architecture and Project
    Structure, and Standards, Workflow, and Quality Gates)
  Follow-up TODOs: none
  Rationale: MINOR bump for a new project-structure section and materially expanded
    file-placement governance.
-->

## Core Principles

### I. Simplicity and Maintainability

Prefer the simplest design that satisfies current requirements while preserving
maintainability. Avoid premature abstraction, unnecessary dependencies, and
speculative features. Introduce complexity only when a concrete requirement or a
measured problem justifies it.

### II. Separation of Concerns

Each component and module MUST have one clear responsibility. Business logic,
presentation logic, and data access MUST be separated when doing so improves
clarity or testability. Unrelated responsibilities MUST NOT be coupled.

### III. Modularity

Application code MUST follow Feature-Sliced Design (FSD). Feature-specific code
MUST remain inside the correct layer and slice boundary. Shared modules MUST
contain only genuinely reusable functionality. Cross-module dependencies MUST be
intentional and MUST follow the documented dependency direction.

### IV. Intentional Reuse

Agents MUST inspect and reuse existing components, hooks, stores, and API helpers
before creating new ones. Substantial shared behavior MUST NOT be duplicated.
Generic abstractions MUST NOT be introduced only to remove superficial
similarities.

### V. Type Safety

TypeScript MUST be used consistently. New code MUST compile under the current
project references and lint rules. Precise types MUST be preferred, and `any`
MUST be avoided unless explicitly justified in the change record. Type assertions
MUST NOT be used to bypass unresolved type errors. Untrusted external data MUST
be validated at runtime boundaries.

### VI. Automated Testing (NON-NEGOTIABLE)

Tests MUST be written before implementation for new behavior. Critical business
logic, user workflows, and bug fixes MUST have automated coverage at the
appropriate level. Tests MUST cover success, failure, and boundary cases. Test
results MUST come from actual execution, never from assumption.

### VII. Consistency

New work MUST follow the conventions in this constitution and the architecture
documents. Deviations MUST be documented with rationale, scope, and impact before
they are introduced. Existing implementations MUST NOT be redesigned without
explicit justification and approval.

## Architecture and Project Structure

### Technology and Toolchain

The current frontend stack is React 19, TypeScript 6, Vite 8, React Router 8 via
the `react-router` package, TanStack Query 5, Vitest with jsdom and Testing
Library, and ESLint with `typescript-eslint` plus React Hooks and React Refresh
plugins. React Compiler is enabled through the Vite/Babel configuration.

Required commands are `npm run dev`, `npm run build`, `npm run lint`, `npm test`,
`npm run preview`, and `npm run deploy`. `npm run build` includes `tsc -b`, so it
is the typecheck gate. New dependencies or scripts MUST be justified in the
change record and added to `package.json` and `package-lock.json` together.

### Architecture Approach

FSD is the selected architecture. The authoritative architecture references are
`docs/architecture/frontend-architecture.md`,
`docs/architecture/component-catalog.md`, and
`docs/architecture/api-catalog.md`. Agents MUST consult them when planning and
implementing features.

The source code is authoritative for implemented behavior. When documentation and
source disagree, agents MUST inspect the source and report the discrepancy rather
than assuming either is correct. Changes to architecture, dependency rules,
shared component APIs, or shared API contracts MUST be justified and documented.

### Repository Folder Map

| Path | Meaning and rule |
| --- | --- |
| `src/` | Authored application source. Application runtime code belongs here. |
| `specs/` | Spec Kit artifacts, one sequential `NNN-short-name/` directory per feature. Contains `spec.md`, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/`, `checklists/requirements.md`, and `tasks.md`. Feature specs MUST NOT be placed in `src/`. |
| `docs/` | Human-maintained architecture and reference docs. Architecture docs belong in `docs/architecture/`. |
| `.specify/` | Spec Kit governance, templates, scripts, workflows, and integration manifests. `.specify/memory/constitution.md` is this constitution. |
| `.agents/` | Antigravity skill copies of Spec Kit commands. Treat as generated integration artifacts. |
| `.opencode/` | OpenCode slash-command copies and local tooling. Treat generated files as integration artifacts. |
| `deploy/` | Authored TypeScript source for the HTTPS static server/proxy: `main.ts`, `config.ts`, `web_director.ts`, `request_analyzer.ts`, `response_handlers.ts`, and `model.ts`. |
| `deploy-dist/` | Compiled deploy server output. Generated by `npm run deploy`; MUST NOT be hand-edited. |
| `dist/` | Vite production bundle. Generated by `npm run build`; MUST NOT be hand-edited. |
| `node_modules/` | Installed dependencies. MUST NOT be hand-edited or committed. |
| `index.html` | SPA shell containing `#root` and the `/src/app/main.tsx` entry script. |
| `vite.config.ts` | Vite, dev-server, HTTPS, path-alias, and Vitest configuration. |
| `eslint.config.js` | Flat ESLint configuration. |
| `tsconfig.json` | Root project references. |
| `tsconfig.app.json` | TypeScript config for `src/`. |
| `tsconfig.node.json` | TypeScript config for Vite tooling. |
| `tsconfig.deploy.json` | TypeScript config for `deploy/` output to `deploy-dist/`. |
| `package.json` | Scripts and dependency declarations. |
| `package-lock.json` | Locked dependency graph. |
| `README.md` | Project overview. The current file is Vite boilerplate and MUST NOT be treated as architecture authority. |
| `.gitignore` | Generated output, dependency, certificate, and secret exclusions. |

### Source Layer Map

| Layer/path | Meaning |
| --- | --- |
| `src/app/` | Composition root and application-only infrastructure. |
| `src/app/main.tsx` | DOM bootstrap into `#root` under `StrictMode`. |
| `src/app/App.tsx` | Top-level provider composition. |
| `src/app/index.css` | Global reset, design tokens, typography, and base element styles. |
| `src/app/guard/` | Pathless route guards such as `auth-guard.tsx`, `otp-guard.tsx`, and `public-only.tsx`. |
| `src/app/layouts/` | Route shells such as `auth/AuthLayout.tsx` and `forum/ForumLayout.tsx`. |
| `src/app/providers/` | Query, auth initialization, and router setup. Central route definitions belong in `providers/router/`. |
| `src/pages/` | Route-level screens that compose features, entities, and shared UI. Pages MUST NOT import other pages. |
| `src/features/` | User actions and server mutations organized by domain and action, such as `auth/login/`, `auth/otp/`, `account/me/`, and `forum/area/`. Sibling features MUST NOT import each other. |
| `src/entities/` | Domain types and reusable domain state, such as `session/type.ts`, `session/auth-store.ts`, `otp/type.ts`, and `otp/otp-store.ts`. Sibling entities MUST NOT import each other. |
| `src/shared/ui/` | Reusable, feature-agnostic UI components. One folder per component, with component, CSS Module, `index.ts`, and test co-located. |
| `src/shared/api/` | Central HTTP and error infrastructure: `client.ts`, `error.ts`, and `index.ts`. |
| `src/shared/assets/icon/` | Reusable SVG icons. |
| `src/shared/assets/image/` | Reusable SVG illustrations and brand images. |
| `src/test/setup.ts` | Shared Vitest setup only: jest-dom matchers and cleanup. Feature tests MUST NOT be placed here. |

### Dependency Direction

Allowed dependencies flow downward only:

- `app` MAY import `pages`, `features`, `entities`, and `shared`.
- `pages` MAY import `features`, `entities`, and `shared`, but MUST NOT import
  `app` or other pages.
- `features` MAY import `entities` and `shared`, but MUST NOT import other
  features, pages, or `app`.
- `entities` MAY import `shared`, but MUST NOT import other entities, features,
  pages, or `app`.
- `shared` MAY import only `shared`. It MUST NOT know about business domains.
- Circular dependencies MUST NOT be introduced.

Any violation MUST be documented in the architecture reference with rationale,
scope, impact, and an approved follow-up. The current cross-layer API/session
coupling is a known deviation and MUST NOT be copied into new code.

### File Creation and Placement Rules

| New artifact | Required location and shape |
| --- | --- |
| Route page | `src/pages/<area>/<page>/<Page>.tsx` when co-located CSS/tests are needed; `src/pages/<area>/<Page>.tsx` for a single-file page. Use the `Page` suffix and default export. Co-locate `<Page>.css` and `<Page>.test.tsx`. Wire the page centrally in `src/app/providers/router/router-provider.tsx` with `lazy` and the shared `errorElement`. |
| Shared UI component | `src/shared/ui/<component>/<Component>.tsx`, `<Component>.module.css`, `index.ts`, and `<Component>.test.tsx`. Check `docs/architecture/component-catalog.md` and existing code first. The component MUST be feature-agnostic. |
| User action or server mutation | `src/features/<domain>/<action>/`, with `<action>.ts`, `type.ts` when types are needed, and a `use*` TanStack Query hook. Keep raw request functions and hooks in the feature slice. |
| Domain type or domain state | `src/entities/<domain>/type.ts` and, when needed, `<domain>-store.ts` or a specific store such as `auth-store.ts`. Entities MUST remain reusable within their domain and MUST import only `shared`. |
| HTTP/error helper | `src/shared/api/` only when the helper is reusable across features. Endpoint-specific requests belong in the owning feature slice. |
| Reusable SVG asset | `src/shared/assets/icon/` for icons or `src/shared/assets/image/` for illustrations/branding. Do not create `public/` or a second asset root without approval. |
| Guard, layout, or provider | `src/app/guard/`, `src/app/layouts/<name>/`, or `src/app/providers/<name>/`. Route behavior MUST be wired through the central router, not through ad-hoc page redirects. |
| Test | Co-located as `*.test.ts(x)` next to the implementation. Use `src/test/setup.ts` only for global test setup. Import Vitest APIs explicitly because globals are disabled. |
| Feature specification | New `specs/NNN-short-name/` directory using Spec Kit templates. Do not put specs, plans, or task lists in `src/` or `docs/`. |
| Architecture/reference doc | `docs/architecture/`. Update the relevant catalog or architecture document when shared infrastructure, dependency rules, or public APIs change. |
| Deploy server code | `deploy/`. Compiled output in `deploy-dist/` is generated and MUST NOT be edited. |
| Root configuration | Existing root config files. New config files require documented rationale and MUST be added to the repository folder map in this constitution. |

New directories MUST use kebab-case. Existing snake_case directories are legacy
deviations and MUST NOT be used as a template for new paths. Component files and
React components MUST use PascalCase. Non-component files and hooks MUST use
kebab-case or camelCase, with hooks prefixed by `use`.

### Imports and Generated Artifacts

Vite defines the aliases `@` to `src/` and `@assets` to `src/shared/assets/`.
Alias changes MUST be applied consistently in `vite.config.ts`, the relevant
`tsconfig.*.json` files, this constitution, and the architecture docs.

`dist/`, `deploy-dist/`, and `node_modules/` are generated and ignored. `.env`
and `certs/` contain local secrets or certificates and MUST NOT be committed.
Markdown files, `.git`, and `.gitignore` are denied by the Vite dev-server
filesystem policy and MUST NOT be relied on as runtime assets.

## Standards, Workflow, and Quality Gates

### React Development Standards

New React code MUST use functional components and React Hooks. Rules of Hooks
MUST be followed. Rendering MUST be pure, and side effects MUST be handled in
effects or event handlers. Redundant state and unnecessary prop drilling MUST be
avoided. Rendered collections MUST use stable keys.

### State and Data Management

TanStack Query MUST manage server state. Transient UI state MUST stay close to
the component that owns it. Client-side UI state MUST NOT duplicate server state
or domain state. Authentication and OTP state belong in `src/entities/` only.
Conflicting sources of truth MUST NOT be introduced.

### API Integration

All HTTP access MUST go through the centralized API client and feature-level
modules. Pages MUST NOT call `fetch` directly. Request and response types MUST
reflect the API contract in `docs/architecture/api-catalog.md`, with source code
authority when the two disagree. Loading, error, empty, and success states MUST
be handled explicitly. API contract changes MUST be coordinated with affected
consumers and documented.

### UI/UX and Accessibility

Shared UI components and design tokens MUST be reused before new visual patterns
are introduced. Typography, spacing, colors, and interaction patterns MUST stay
consistent with the documented design system. Semantic HTML and keyboard
accessibility MUST be used by default. Form controls MUST have accessible
labels. Responsive behavior MUST be considered for every new screen, and
unintended overflow or loss of functionality MUST be prevented.

### Code Conventions

- PascalCase: React components, component files, TypeScript types, and interfaces.
- camelCase: variables, functions, parameters, hooks, and object properties.
- `use` prefix: custom React hooks.
- UPPER_SNAKE_CASE: module-level constants representing fixed configuration or
  meaningful values.
- kebab-case: directories and non-component filenames; existing snake_case
  paths are legacy only.
- Descriptive names MUST be preferred over unclear abbreviations.
- Boolean variables and functions MUST use `is`, `has`, `can`, or `should`
  prefixes when appropriate.
- Related concepts MUST use consistent names across layers.
- Comments MUST be avoided unless the reason is non-obvious and durable.

### Testing Strategy

Vitest runs in jsdom with setup from `src/test/setup.ts`. Tests MUST import
`describe`, `it`, `expect`, and `vi` explicitly because globals are disabled.
Component tests MUST drive behavior through Testing Library queries and
user-event where appropriate. Router tests SHOULD use `createMemoryRouter` with
the exported route table. Mocks and cleanup are centrally configured.

Required local quality gates are `npm run lint`, `npm run build`, and `npm test`.
Empty test files MUST NOT be counted as coverage. Tests for critical logic MUST
be meaningful and MUST assert observable behavior.

### Definition of Done

A change is complete only when:

- Its acceptance criteria are satisfied.
- Code is placed according to the File Creation and Placement Rules.
- Dependency direction and layer boundaries are respected.
- Tests are written, executed, and passing.
- `npm run lint`, `npm run build`, and `npm test` have been run for affected work.
- Relevant architecture, catalog, API, and constitution docs are updated.
- Known limitations, deviations, and unresolved issues are reported explicitly.

### Security and Performance

Secrets MUST NOT be embedded in frontend source. Backend authorization is the
security boundary; client guards and validation are UX controls only. Untrusted
input MUST be handled safely, and sensitive information MUST NOT be exposed
unnecessarily. Access-token logging or other secret leakage MUST NOT be
introduced.

Unnecessary rendering and expensive computations MUST be avoided. Lazy loading
and code splitting MUST be used for route-level pages. Performance optimizations
MUST be justified by requirements or measured bottlenecks, and premature
optimization MUST be avoided.

### Development Workflow

Agents MUST inspect existing implementations before introducing new ones, follow
the approved specification and acceptance criteria, preserve existing
functionality unless a change is explicitly required, and justify new
dependencies or architectural deviations. Work MUST be organized through Spec
Kit artifacts in `specs/`, and implementation MUST follow the task order and
test-first gates defined there.

## Governance

This constitution governs frontend development within the Studitopia frontend
scope. It supersedes conflicting informal practices. Implementations MUST comply
with applicable principles, and all reviews MUST verify compliance.

Amendments MUST be intentional, documented, and made through the Spec Kit
constitution workflow. Only `.specify/memory/constitution.md` is amended by that
workflow. The Sync Impact Report is temporary review material and MUST be removed
before the amended file is committed.

Versioning follows semantic versioning:

- MAJOR: removal or backward-incompatible redefinition of a principle or rule.
- MINOR: new principle, new section, or materially expanded governance.
- PATCH: clarification, wording, typo, or non-semantic refinement.

Exceptions MUST document rationale, scope, impact, and approval. Changes to
architecture, shared component APIs, or shared API contracts MUST also update the
relevant documents in `docs/architecture/`. Higher-priority security, legal, and
platform requirements MUST NOT be overridden by this constitution.

**Version**: 1.1.0 | **Ratified**: 2026-10-19 | **Last Amended**: 2026-11-25
