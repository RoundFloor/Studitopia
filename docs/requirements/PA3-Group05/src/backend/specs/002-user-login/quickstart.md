# Quickstart: User Login and Session Access

**Feature**: `002-user-login`

## Prerequisites

- Node.js and npm compatible with `package.json`.
- A PostgreSQL database with schema `studitopia`.
- The database contract from [contracts/database-session.md](./contracts/database-session.md):
  - `STUDITOPIA.SESSION.ACCESS_VERSION`
  - `STUDITOPIA.GET_SESSION_AUTH`
  - `STUDITOPIA.END_ACCESS`
- A test secret in `SECRERT_KEY` (the environment variable name is intentionally spelled this way
  in `src/packages/security-generation/sg.config.ts`) and the existing `DB_*` settings.
- A valid account. The smoke flow below creates an inactive account with `POST /auth/register`;
  inactive accounts are allowed to sign in.

> Do not use production credentials or a production database for this smoke test.

## Install and verify

```bash
npm install
npm test
npm run test:e2e
npm run lint
npm run build
```

Start the service:

```bash
SECRERT_KEY='local-test-secret' \
DB_HOST=localhost \
DB_PORT=5432 \
DB_USER=study \
DB_PASSWORD='local-test-password' \
DB_DATABASE=studitopia \
PORT=8353 \
npm run start:dev
```

All examples assume the service is at `http://localhost:8353`.

## Smoke test: sign-in, sign-out, renewal

Use a cookie jar so the HTTP-only refresh cookie is retained. Sign-out must **not** clear it.

```bash
BASE=http://localhost:8353/api/v1
JAR=/tmp/studitopia-login-cookies.txt
rm -f "$JAR"

# 1. Create an inactive account (or use an existing account).
curl -sS -X POST "$BASE/auth/register" \
  -H 'Content-Type: application/json' \
  -d '{
    "displayname": "Student AB",
    "username": "student.ab",
    "email": "student.ab@student.hcmus.edu.vn",
    "password": "Secure@123456"
  }'

# 2. Sign in with username. Capture the access token.
LOGIN=$(curl -sS -c "$JAR" -X POST "$BASE/auth/login?type=username" \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"student.ab","password":"Secure@123456"}')
echo "$LOGIN"
ACCESS=$(printf '%s' "$LOGIN" | node -pe 'JSON.parse(require("fs").readFileSync(0,"utf8")).access_token')
test -n "$ACCESS"

# 3. Use the access credential on a protected endpoint.
curl -sS -o /dev/null -w '%{http_code}\n' -X POST "$BASE/auth/logout" \
  -H "Authorization: Bearer $ACCESS"
# Expect: 200

# 4. Reusing the ended access credential must fail.
curl -sS -o /dev/null -w '%{http_code}\n' -X POST "$BASE/auth/logout" \
  -H "Authorization: Bearer $ACCESS"
# Expect: 401

# 5. The renewal credential survives sign-out and can mint a new access token.
REFRESH=$(curl -sS -b "$JAR" -c "$JAR" -X POST "$BASE/auth/login?type=token")
echo "$REFRESH"
NEW_ACCESS=$(printf '%s' "$REFRESH" | node -pe 'JSON.parse(require("fs").readFileSync(0,"utf8")).access_token')
test -n "$NEW_ACCESS"

# 6. The new access credential works for the same session.
curl -sS -o /dev/null -w '%{http_code}\n' -X POST "$BASE/auth/logout" \
  -H "Authorization: Bearer $NEW_ACCESS"
# Expect: 200
```

Expected observations:

- The refresh response contains only `access_token`.
- No `Set-Cookie` is emitted on the refresh or sign-out requests.
- The refresh cookie remains in the cookie jar after sign-out.

## Smoke test: email sign-in

```bash
curl -sS -c "$JAR" -X POST "$BASE/auth/login?type=email" \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"student.ab@student.hcmus.edu.vn","password":"Secure@123456"}'
# Expect: 201 with access_token, role, status, and Set-Cookie.
```

Identifiers are case-insensitive. `STUDENT.AB` and an uppercased email should also succeed.

## Smoke test: validation and generic credential errors

```bash
# Missing type.
curl -sS -o /dev/null -w '%{http_code}\n' -X POST "$BASE/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"student.ab","password":"Secure@123456"}'
# Expect: 400, body [40001]

# Missing identifier.
curl -sS -o /dev/null -w '%{http_code}\n' -X POST "$BASE/auth/login?type=username" \
  -H 'Content-Type: application/json' \
  -d '{"password":"Secure@123456"}'
# Expect: 422, body [40001]

# Unknown identifier and wrong password must look the same.
curl -sS -X POST "$BASE/auth/login?type=username" \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"does.not.exist","password":"Wrong@123456"}'
# Expect: 409, body [18456]
```

## Smoke test: suspension

Start with a valid session and refresh cookie. Suspending the account must make both credentials
fail immediately without waiting for expiry.

```bash
# Use the project's admin/seed mechanism to run the equivalent of:
# UPDATE STUDITOPIA.<account-table> SET status = 'SUSPENDED' WHERE username = 'student.ab';

# Existing session: access must fail.
curl -sS -o /dev/null -w '%{http_code}\n' -X POST "$BASE/auth/logout" \
  -H "Authorization: Bearer $NEW_ACCESS"
# Expect: 401

# Existing session: renewal must fail.
curl -sS -o /dev/null -w '%{http_code}\n' -b "$JAR" -X POST "$BASE/auth/login?type=token"
# Expect: 401, body [40003]

# New sign-in: credential verification completes and reports SUSPENDED.
curl -sS -c "$JAR" -X POST "$BASE/auth/login?type=username" \
  -H 'Content-Type: application/json' \
  -d '{"identifier":"student.ab","password":"Secure@123456"}'
# Expect: 201, status "SUSPENDED".

# Use the new access token from that response on a protected endpoint.
# Expect: 401, body [40004].

# Use the new refresh cookie for renewal.
# Expect: 401, body [40003].
```

## Multiple sessions check

1. Sign in twice with two separate cookie jars.
2. Sign out with the first session's access token.
3. The first access token fails; the second session's access token still works.
4. The first session can still renew from its retained refresh cookie; the second is unaffected.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Login returns `45000`/`2002` | Database connectivity and the new database functions/column. |
| Every access token is rejected | The database session row must have `ACCESS_VERSION` matching the token; new sessions start at 0. |
| Refresh after sign-out fails | Confirm sign-out used `END_ACCESS` and did not call `LOGOUT` or clear the cookie. |
| Suspended session still works | Confirm the guard/refresh call `GET_SESSION_AUTH` and reject `SUSPENDED`; do not cache status. |
| Cookie is missing | `curl` needs `-c` and `-b`; browsers require the configured Secure/SameSite settings. |
