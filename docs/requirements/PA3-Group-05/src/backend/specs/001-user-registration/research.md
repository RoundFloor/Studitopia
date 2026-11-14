# Research: User Registration with Email and Username Validation

**Feature**: `/specs/001-user-registration/spec.md`

**Date**: 2026-10-29

## Resolved Decisions

### 1. Module placement

**Decision**: Implement the feature inside the existing Authentication Module. Add only the controller, service, DTOs, database-boundary methods, and package-local tests needed for the three capabilities. Do not introduce a parallel authentication package or a second database-access layer.

**Rationale**: The repository already establishes the package-by-folder architecture, response envelope, response codes, and database function contract. Following those patterns satisfies the constitution and avoids duplicating infrastructure.

**Alternatives considered**:
- Build a new standalone registration package: rejected because it would duplicate the Authentication Module's responsibilities and risk circular dependencies.
- Bypass the existing response and error-code conventions: rejected because it would fragment the API contract.

### 2. Public interface shape

**Decision**: Implement two endpoints: `GET /api/v1/auth/validate` with optional `displayname`, `username`, `email`, and `password` query parameters, and `POST /api/v1/auth/register` with a JSON body containing all four registration fields. Validation success returns `{ statusCode, success: true }`; validation failure returns `{ statusCode, success: false, data: { [field]: ResponseCode[] } }`. Registration success returns `{ statusCode, success: true, data: { session_id, user_id, status } }`; registration failure returns `{ statusCode, success: false, data: ResponseCode[] }`.

**Rationale**: The response-envelope helpers already define this structure. One combined validation endpoint lets the form check multiple fields in one request and maps naturally to a field-keyed validation response.

**Alternatives considered**:
- Separate endpoints per field (`/auth/validate/email`, `/auth/validate/username`): rejected because it would add routes without improving the form workflow.
- HTTP 4xx responses for validation failures: rejected because the API reports application-level failures inside a successful HTTP envelope; changing that would be a breaking contract change outside this feature.

### 3. Display name validation rules

**Decision**: Accept display names from 8 to 32 characters using alphanumeric words separated by single spaces: `^[a-zA-Z0-9]+([ ][a-zA-Z0-9]+)*$`. Reject leading, trailing, repeated spaces, non-ASCII letters, and all other symbols with `RESPONSE_CODE.INVALID_DISPLAYNAME`.

**Rationale**: This matches the display-name rules and test cases already used by the authentication domain. It keeps display-name validation consistent with the existing user-facing contract.

**Alternatives considered**:
- Allow Unicode letters: rejected because the current contract rejects them; widening the rule is a separate product decision.
- Trim input before validation: rejected because it would silently alter user input and hide leading/trailing-space mistakes.

### 4. Username validation rules

**Decision**: Accept usernames from 8 to 32 characters that start with a lowercase letter and contain lowercase letters, digits, and single dots between non-empty segments: `^[a-z][a-z0-9]*([.][a-z0-9]+)*$`. Reject everything else with `RESPONSE_CODE.INVALID_USERNAME`, then let the database reject duplicates with `RESPONSE_CODE.DUPLICATED_USERNAME`.

**Rationale**: This matches the username rules in the authentication domain and the available database validation function. The local check gives fast format feedback; the database check is authoritative for availability.

**Alternatives considered**:
- Allow uppercase, underscores, or hyphens: rejected by the current contract and test data.
- Perform only the database check: rejected because it loses fast format feedback and makes error mapping less clear.

### 5. Email validation rules

**Decision**: Reject emails longer than 254 characters, then apply the structural rule: local part starts with a letter and uses letters, digits, and single `.`, `_`, or `-` separators, with an optional `%` or `+` segment; domain labels use letters, digits, and hyphens and end with an alphabetic suffix of at least two characters. Reject malformed addresses with `RESPONSE_CODE.INVALID_EMAIL`, addresses from unknown domains with `RESPONSE_CODE.UNREGISTED_EMAIL_DOMAIN`, and already-used addresses with `RESPONSE_CODE.DUPLICATED_EMAIL`.

**Rationale**: `studitopia.EMAIL_VALIDATION` is the production source of truth for domain eligibility and uniqueness, while the same length and regex checks can be applied in the service for fast feedback. The test data distinguishes malformed emails from validly formed emails at unregistered domains.

**Alternatives considered**:
- Use a general-purpose email validation library: rejected because the project does not currently depend on one and the database function already defines the business rule.
- Maintain the institutional domain allowlist in the application: rejected because the database owns the allowlist and test mocks only need a representative list.

### 6. Password validation rules

**Decision**: Accept passwords from 8 to 32 characters containing at least one lowercase letter, one uppercase letter, one digit, and one special character; reject any password containing a null character. Return `RESPONSE_CODE.INVALID_PASSWORD` on failure.

**Rationale**: This matches the password rules in the authentication domain and its test data. Passwords are part of the registration contract even though the user story emphasizes email and username validation.

**Alternatives considered**:
- Add a confirmation-password field: rejected because it is not in the specification or the registration DTO.
- Relax complexity rules: rejected because it would change the existing security contract.

### 7. Error aggregation strategy

**Decision**: Validate display name and password synchronously; validate username and email concurrently; accumulate all returned response codes; return the full array without calling the registration function when any local validation fails. If local validation passes, call the database registration function and map its single SQLSTATE result into the response-code array.

**Rationale**: The specification requires all applicable errors in one response. A combined error response lets the frontend display every field error at once.

**Alternatives considered**:
- Fail fast on the first invalid field: rejected because it violates FR-010 and degrades form usability.
- Repeat database checks after local failure: rejected because it adds load without changing the result.

### 8. Registration atomicity and uniqueness

**Decision**: Treat `studitopia.ACCOUNT_REGISTER` as the authoritative, atomic registration operation. Do not create application-level transactions or pre-insert uniqueness checks. Map database SQLSTATE values to the existing response codes and return no session when the function reports a failure.

**Rationale**: The database function is already the transaction boundary and enforces username and email uniqueness. Application-level pre-checks cannot prevent races between concurrent registrations. The SQLSTATE constants map directly to the existing response codes.

**Alternatives considered**:
- Perform a separate "check then insert" sequence in the service: rejected because it introduces a race and can create duplicate accounts.
- Add a new migration or stored function: rejected because the available functions already cover the feature's persistence needs.

### 9. Account status semantics

**Decision**: Treat the numeric `status` returned by registration as opaque session/account data. Do not add status-name mappings or lifecycle rules in this feature.

**Rationale**: The `SessionResponse` contract exposes a number, and the database owns its meaning. The specification only requires that a status be returned on success.

**Alternatives considered**:
- Interpret status as active/inactive: rejected because the repository does not define the mapping and the feature does not require it.
- Remove status from the response: rejected because it would break the existing contract.

### 10. Password pre-check behavior

**Decision**: The validation endpoint must return success when a supplied password is valid and `RESPONSE_CODE.INVALID_PASSWORD` when it is invalid.

**Rationale**: Password is part of the registration contract. A valid password pre-check must behave consistently with the other fields so the frontend can validate the form field by field.

**Alternatives considered**:
- Exclude password from pre-registration validation: rejected because the validation endpoint accepts it and the registration form benefits from field-level feedback.
- Validate only during final registration: rejected because it reduces pre-submit feedback and weakens the field-level contract.

### 11. Testing strategy

**Decision**: Use the existing Vitest structure. Write table-driven tests before implementation for controller behavior, service aggregation, DTO rules, database error mapping, and successful registration. Use `PostgresService` mocks for unit tests and keep live-database E2E scenarios in `test/`.

**Rationale**: The constitution requires tests first, package-local tests, mocked external dependencies, and Vitest for both suites. Table-driven tests provide a broad matrix for valid, malformed, duplicate, and simultaneous-error cases.

**Alternatives considered**:
- Add a new test framework: rejected by the constitution and unnecessary.
- Test only through E2E: rejected because it would be slower and would require a live database for every validation rule.

## Technical Unknowns

None remain. The database function internals and status semantics are intentionally treated as external contracts. The implementation assumes the functions and institutional-domain data exist in the target database; no schema inspection or migration is planned.
