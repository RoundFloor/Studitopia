# Data Model: User Registration with Email and Username Validation

**Feature**: `/specs/001-user-registration/spec.md`

**Date**: 2026-10-29

## Overview

Registration uses four request fields and exposes two response shapes: a field-keyed validation result and a session result. The database is the authoritative owner of username uniqueness, email uniqueness, institutional-domain eligibility, and account creation. No database schema changes are planned for this feature.

## Entities

### RegistrationRequest (`RegisterDto`)

The payload submitted to register an account.

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `displayname` | string | Yes | 8-32 characters; alphanumeric words separated by single spaces; no leading, trailing, or repeated spaces; no non-ASCII letters or other symbols |
| `username` | string | Yes | 8-32 characters; starts with a lowercase letter; lowercase letters, digits, and single dots between non-empty segments; no uppercase, spaces, underscores, hyphens, leading/trailing dots, or consecutive dots |
| `email` | string | Yes | At most 254 characters; valid local-part and domain structure; domain must be an eligible institutional domain; must not already be registered |
| `password` | string | Yes | 8-32 characters; at least one lowercase letter, one uppercase letter, one digit, and one special character; no null character |

**Relationships**:
- A registration request produces either one `UserAccount` plus one `Session`, or no persisted change.

### ValidationRequest

The optional field set submitted to the pre-registration validation capability.

| Field | Type | Required | Rules |
| --- | --- | --- | --- |
| `displayname` | string | No | Same rules as `RegistrationRequest.displayname` |
| `username` | string | No | Same rules as `RegistrationRequest.username` |
| `email` | string | No | Same rules as `RegistrationRequest.email` |
| `password` | string | No | Same rules as `RegistrationRequest.password` |

**Notes**:
- Any subset of fields may be supplied.
- An empty request performs no field checks and returns success, matching the validation contract.
- Invalid fields are reported in a field-keyed map; valid fields are omitted from the failure data.

### ValidateResponse

The field-keyed result of pre-registration validation.

```text
{
  displayname?: ResponseCode[],
  username?: ResponseCode[],
  email?: ResponseCode[],
  password?: ResponseCode[]
}
```

**Rules**:
- Only fields that failed appear in the response.
- Each failing field contains one or more response codes; the implementation returns one code per failing field.
- A response with no failing fields is represented as a successful envelope with no failure data.

### UserAccount

The persisted identity created by successful registration.

| Attribute | Type | Notes |
| --- | --- | --- |
| `user_id` | string | Unique account identifier returned on successful registration |
| `username` | string | Unique within all accounts |
| `email` | string | Unique within all accounts; must belong to an eligible domain |
| `displayname` | string | Display name supplied at registration |
| `status` | number | Numeric account status returned by the database; semantics are owned by the persistence layer and are not interpreted by this feature |

**Relationships**:
- One `UserAccount` has exactly one `username` and one `email`.
- One `UserAccount` may have one or more `Session` records over time.
- A `UserAccount` is created only when all validation and uniqueness checks pass.

### Session

The signed-in context returned immediately after successful registration.

| Attribute | Type | Notes |
| --- | --- | --- |
| `session_id` | string | Unique session identifier |
| `user_id` | string | Identifier of the associated account |
| `status` | number | Numeric account/session status returned by the database |

**Relationships**:
- Each session belongs to exactly one `UserAccount`.
- A session is returned only after the account is created successfully.

### InstitutionalEmailDomain

An allowed academic domain that determines email eligibility.

| Attribute | Type | Notes |
| --- | --- | --- |
| domain | string | Domain portion of an email address, for example an institutional subdomain |
| eligibility | boolean | Whether addresses at this domain may register |

**Notes**:
- The production source of truth is the database validation function.
- The application does not maintain a second production allowlist.
- Test mocks use a representative static list to exercise domain-eligibility behavior.

### ResponseCode

The numeric result code used throughout the API.

| Code | Name | Meaning |
| --- | --- | --- |
| 0 | `SUCCESS` | Validation or registration succeeded |
| 45001 | `INVALID_DISPLAYNAME` | Display name failed format or length rules |
| 45002 | `INVALID_EMAIL` | Email failed format or length rules |
| 45003 | `INVALID_USERNAME` | Username failed format or length rules |
| 45004 | `INVALID_PASSWORD` | Password failed complexity or length rules |
| 46001 | `UNREGISTED_EMAIL_DOMAIN` | Email domain is not eligible for registration |
| 47001 | `DUPLICATED_EMAIL` | Email is already registered |
| 47002 | `DUPLICATED_USERNAME` | Username is already registered |
| 40001 | `VALIDATION_ERROR` | Generic validation failure |
| 45000 | `DATABASE_ERROR` | Database operation failed |
| 2002 | `UNKNOWN_ERROR` | Unexpected failure |

## State Transitions

### Registration attempt

```text
Submitted
  ├─ any local validation failure ──> Rejected (no account, no session, all error codes returned)
  ├─ database validation/uniqueness failure ──> Rejected (no account, no session, mapped error code returned)
  └─ all checks pass ──> AccountCreated + SessionIssued (session data returned)
```

**Invariants**:
- A rejected registration never creates an account, session, or partial database record.
- A username and an email address each map to at most one account.
- Existing accounts and sessions are unchanged by a rejected attempt.
- A duplicate that becomes visible only at final submission is still rejected.

### Pre-registration validation

```text
Field value submitted
  ├─ field omitted ──> No result for that field
  ├─ field valid ──> No error entry for that field
  └─ field invalid ──> Error entry keyed by field
```

**Invariants**:
- Validation never creates or modifies an account.
- Multiple invalid fields are reported together.
- Email and username checks include both format and availability information.

## Contract References

- Request and response shapes: [contracts/auth-registration.openapi.yaml](./contracts/auth-registration.openapi.yaml)
- Validation scenarios: [quickstart.md](./quickstart.md)
