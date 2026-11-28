# Security Requirements

**Version:** `1.3`

**Performed by:** [Tran Nguyen Khanh Binh] | **Edited by:** [Tran Nguyen Khanh Binh]

[Back to non-functional requirements index](../../non_functional_requirement.md)

| ID | Adapted requirement | Current code status |
| --- | --- | --- |
| NFR-SEC-1 | Protected API routes should require a bearer token, and token-signature verification must be hardened before production. | **Complete.** |
| NFR-SEC-2 | User credentials shall be stored as one-way password hashes using the current bcrypt/pgcrypto implementation. | **Implemented.** Registration hashes passwords with bcrypt cost 10 through `pgcrypto`, and login verifies with `CRYPT`. |
| NFR-SEC-3 | Production deployment shall terminate TLS 1.2 or higher in front of the backend. | **Complete (server proxy).** TLS protection is ensured by the server proxy; the NestJS API continues to listen internally on port `8353`. |
| NFR-SEC-4 | Private forum and private-group content shall be restricted by backend authorization when those content types exist. | **Planned (not implemented).** Current forum/group visibility fields and content ACL checks do not exist; read endpoints are authenticated but not ACL-scoped. |
| NFR-SEC-5 | Avatar uploads shall continue to enforce declared image/binary content types, non-empty bodies, a 5 MiB limit, and storage-root path checks; content sniffing should be added later. | **Partial.** `express.raw`, content-type checks, non-empty validation, 5 MiB limit, and storage path checks exist; magic-byte verification and document upload validation do not. |
| NFR-SEC-6 | Server-side authorization shall enforce token presence, owner-bound encrypted IDs, file ownership, and future role checks. | **Complete.** |
| NFR-SEC-7 | Access-token and session lifetime timing shall follow the verified 30-minute access-token and 30-day refresh/session behavior. | **Complete.** The timing behavior is accepted based on user-performed testing; the current source uses 30-minute access tokens and 30-day refresh cookies/sessions. |
| NFR-SEC-8 | The system shall keep parameterized SQL, DTO whitelisting, React text escaping, and hardened refresh-cookie attributes, then add CSRF tokens, CSP/Helmet, sanitization, and security tests. | **Partial.** Parameterized SQL, `ValidationPipe` whitelisting, React escaping, and `httpOnly/secure/sameSite:none/partitioned` refresh cookies exist; no CSRF tokens, Helmet/CSP, sanitizer, or vulnerability tests are present. |
| NFR-SEC-9 | Rate limiting shall be added for post, comment, vote, report, and help-request flows when those write flows are implemented. | **Planned (not implemented).** No throttler dependency or middleware exists; reCAPTCHA is a stub and is not imported. |
| NFR-SEC-10 | Moderator/admin-only enforcement shall be added with the moderation module. | **Planned (not implemented).** Roles exist in the account model and auth response, but no moderation module, report route, or role guard exists. |
