# Studitopia Frontend Constitution

## Project Scope

This constitution governs the frontend application built with React and Typescript.

It defines the core development principles, architectural constraints, quality standards, and development practices applicable to the frontend.

## Core Principles

### I. Simplicity and Maintainability

- Prefer the simplest design that satisfies current requirements while preserving reasonable maintainability.
- Avoid premature abstraction, unnecessary dependencies, and speculative features.
- Introduce complexity only when justified by concrete requirements.

### II. Separation of Concerns

- Each component and module must have a clear responsibility.
- Business logic, presentation logic, and data access must be separated when doing so improves clarity or maintainability.
- Avoid unnecessary coupling between unrelated responsibilities.

### III. Modularity

- Organize application code according to Feature-Sliced Design (FSD).
- Feature-specific code must remain within appropriate module boundaries.
- Shared modules must contain genuinely reusable functionality.
- Cross-module dependencies must be intentional and consistent with the established architecture.

### IV. Intentional Reuse

- Reuse components and logic when they represent meaningful shared responsibilities.
- Avoid unnecessary duplication of substantial shared behavior.
- Do not introduce generic abstractions solely to eliminate superficial similarities.

### V. Type Safety

- Use TypeScript consistently.
- Prefer precise types and avoid `any` unless there is a documented and justified reason..
- Validate untrusted external data at appropriate runtime boundaries.
- Type assertions must not be used to bypass unresolved type errors.

### VI. Automated Testing

- Apply Test-driven development, tests must be written before implementation.
- Critical business logic must have appropriate automated tests.
- Important user interactions and workflows must be test at an appropriate level.
- Tests must cover relevant success, failure, and boundary cases.
- Test results must reflect actual execution.

### VII. Consistency

- New features must follow established project conventions.
- Existing abstractions and shared components must be reused when appropriate.
- Deviations from established conventions must be justified.

## Architecture

### Architecture Approach

- Selected approach: FSD
- docs/architecture/frontend-architecture.md defines the frontend architecture and dependency rules.
- docs/architecture/component-catalog.md indexes existing shared components and infrastructure.
- docs/architecture/api-catalog.md defines the common API interfaces between frontend and backend. 
- Agents must consult these documents when planning and implementing features.
- When documentation and source code disagree about an implemented API, agents MUST inspect the source code and report the discrepancy rather than assuming either is correct.
- Changes to architectural conventions or shared component APIs MUST be justified and documented.
- Modules must follow the established organizational conventions
- Dependency rules must be defined and respected.
- Circular dependencies must be avoided.

### Component Design

- Components must have clear and cohesive responsibilities.
- Shared UI components must not contain feature-specific business logic.
- Extract custom hooks or modules when doing so improves separation of concerns or testability.

### Routing

- Routing must follow centralized routing: there are centralized conventions to manage routes, layouts and route protection.
- Route definitions and layouts must follow consistent conventions.
- Authentication-related navigation must follow application requirements without replacing backend authorization.

## React Development Standards

- Use functional components and React Hooks for new React code.
- Follow the Rules of Hooks.
- Keep rendering pure and handle side effects appropriately.
- Avoid redundant state and unnecessary prop drilling.
- Use stable keys for rendered collections.

## State and Data Management

### State Management

- Use TanStack Query to manage server state.
- Keep local UI state close to the components that use it.
- Separate server state from client-side UI state.
- Avoid multiple conflicting sources of truth.

### API Integration

- Use centralized API client and feature-level API modules.
- API operations must follow consistent project conventions.
- Request and response types must reflect the API contract.
- Loading, error, empty, and success states must be handled appropriately.
- API contract changes must be coordinated with affected consumers.

## UI/UX and Accessibility

### UI Consistency

- Follow established design conventions and shared UI components.
- Keep typography, spacing, colors, and interaction patterns consistent with the project's design system.

### Accessibility

- Use semantic HTML and accessible interaction patterns.
- Interactive elements must be keyboard accessible.
- Form controls must have appropriate accessible labels.
- Accessibility requirements must follow accessibility by default.

### Responsive Design

- Support responsive by default.
- Prevent unintended overflow and loss of functionality.
- Maintain consistent interaction behavior across supported screen sizes.

## Code Standard and Testing

### Code Convention

- Follow established naming, formatting, and coding conventions:
  - Use PascalCase for React component names, component files, and TypeScript types or interfaces.
  - Use camelCase for variables, functions, parameters, hooks, and object properties.
  - Prefix custom React hooks with `use`.
  - Use UPPER_SNAKE_CASE for module-level constants that represent fixed configuration values or meaningful constants.
  - Use kebab-case for directories and non-component filenames.
  - Use descriptive names instead of unclear abbreviations.
  - Name boolean variables and functions using meaningful prefixes such as `is`, `has`, `can`, or `should` when appropriate.
  - Use consistent naming for related concepts throughout the codebase.

Examples:
- Components: `UserProfile.tsx`, `DatasetCard.tsx`
- Hooks: `useAuth.ts`, `useDatasetList.ts`
- Utilities: `formatDate.ts`, `calculateMetrics.ts`
- Constants: `DEFAULT_PAGE_SIZE`
- Types: `UserProfile`, `DatasetResponse`

- TypeScript and linting checks must pass for affected code.
- Handle errors explicitly and appropriately.
- Avoid unnecessary dependencies and unused code.

### Existing Codebase and Architecture

- The existing source code is the authoritative reference for implemented components, APIs, hooks utilities, and architectural conventions.
- Before planning or implementing a feature, agents must inspect the relevant existing source code and consult the project architecture documentation.
- Agents must reuse existing implementations whenever they satisfy the requirements.
- Agents must not recreate, replace, or redesign existing shared infrastructure without explicit justification and developer approval.
- Agents must not modify unrelated infrastructure when implementing a feature.
- If existing implementations cannot satisfy a requirement, agents must explain the limitation and propose a solution before changing shared infrastructure

### Reuse and Extension

- New feature-specific code must follow the established architecture.
- Existing shared components must be reused when appropriate.
- New shared components must not duplicate existing responsibilities.
- Agents must not introduce new dependencies, architectural layers, or global abstractions without justification and developer approval.

### Testing Strategy

- Use unit and component/integration testing.
- Critical business logic must have automated tests.
- Important user workflows must receive appropriate integration or end-to-end coverage.
- Regression tests should be added for relevant bug fixes.

### Definition of Done

A change is complete when:

- Its acceptance criteria are satisfied.
- It follows the established architecture and conventions.
- Applicable tests and quality checks have been executed.
- Relevant documentation has been updated when necessary.
- Known limitations and unresolved issues are reported explicitly.

## Security and Performance

### Security

- Secrets must not be embedded in frontend source code.
- Authentication and authorization must be enforced by the backend.
- Client-side checks must not be treated as security boundaries.
- Untrusted input must be handled safely.
- Sensitive information must not be unnecessarily exposed.

### Performance

- Avoid unnecessary rendering work and expensive computations.
- Use lazy loading and code splitting where appropriate.
- Performance optimizations must be justified by requirements or measured bottlenecks.
- Avoid premature optimization.

## Development Workflow

- Inspect existing implementations before introducing new ones.
- Follow the approved specification and applicable acceptance criteria.
- Preserve existing functionality unless a change is explicitly required.
- Justify new dependencies and architectural deviations.
- Execute applicable quality checks before reporting completion.

## Governance

- This constitution governs frontend development within its stated scope.
- Implementations must comply with applicable constitutional principles.
- Exceptions must document their rationale, scope, and impact.
- Amendments must be intentional and documented.
- Material amendments must update the constitution version and amendment date.
- Higher-priority security, legal, and platform requirements must not be overridden by this constitution.

**Version**: 1.0.0
**Ratified**: 2026-10-19
**Last Amended**: 2026-10-19