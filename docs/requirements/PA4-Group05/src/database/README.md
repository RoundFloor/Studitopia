# studitopia-database

PostgreSQL schema, authentication functions, and data layer for Studitopia.

Every SQL file under `src/` is compiled into a dependency graph, then executed
in the correct order by the scripts in `scripts/`.

## Prerequisites

- [Node.js](https://nodejs.org/) 20 or newer (includes `npm`)
- PostgreSQL 14 or newer, running and reachable
- The `citext` and `pgcrypto` extensions (`postgresql-contrib` on Debian/Ubuntu)

```bash
# Debian/Ubuntu example
sudo apt update
sudo apt install -y postgresql postgresql-contrib
```

The database role must be allowed to create extensions, or an administrator must
create them for the role (see [Troubleshooting](#troubleshooting)).

## Quick start (fresh database)

1. Clone the repository and install dependencies.

   ```bash
   npm ci
   ```

2. Create the PostgreSQL role and database. Replace the password with your own.

   ```bash
   sudo -u postgres psql <<'SQL'
   CREATE ROLE studitopia LOGIN PASSWORD 'studitopia';
   CREATE DATABASE studitopia OWNER studitopia;
   SQL
   ```

3. Compile the TypeScript scripts.

   ```bash
   npm run build
   ```

4. Generate the SQL dependency graph.

   ```bash
   npm run compile
   ```

   This scans every `.sql` file under `src/` and writes:

   - `build/tree.md` — the dependency graph and execution state (JSON)
   - `build/mermaid.md` — a Mermaid diagram of the graph

5. Apply the SQL files.

   ```bash
   npm run all
   ```

   The runner asks for the connection details:

   | Prompt              | Default     |
   | ------------------- | ----------- |
   | PostgreSQL Host     | `localhost` |
   | PostgreSQL Port     | `5432`      |
   | Database Name       | —           |
   | PostgreSQL Username | —           |
   | PostgreSQL Password | — (hidden)  |

   Credentials are saved to `build/env.json`, which is ignored by Git. Later
   runs prompt whether to reuse them. Confirm with `yes` to execute the files.

6. Verify the installation.

   ```bash
   psql -h localhost -U studitopia -d studitopia -c '\dt studitopia.*'
   ```

   You should see the `ACCOUNT`, `DOMAIN`, and `SESSION` tables.

## Connection settings

`npm run all` and `npm run restore` read `build/env.json` when it exists. The
file is created by the first interactive run and looks like this:

```json
{
  "host": "localhost",
  "port": 5432,
  "database": "studitopia",
  "username": "studitopia",
  "password": "studitopia"
}
```

Keep this file out of version control; it contains the database password.

## Rebuilding or resetting the database

`npm run all` only executes nodes that have not been run yet. To wipe and
recreate the whole `STUDITOPIA` schema (for example after changing SQL files):

```bash
npm run restore init   # runs src/schemas/_init.sql: DROP SCHEMA ... CASCADE
npm run all            # recreates the schema and every node
```

> **Warning:** `npm run restore init` deletes the entire `STUDITOPIA` schema and
> all data in it. Only run it against a development or disposable database.

After adding, renaming, or deleting SQL files, run `npm run compile` first so
the dependency graph is up to date.

## Scripts

| Command                 | Description                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| `npm run build`         | Compile TypeScript from `scripts/` and `tests/` into `dist/`.          |
| `npm run compile`       | Rebuild the SQL dependency graph in `build/tree.md` and `build/mermaid.md`. |
| `npm run all`           | Connect to PostgreSQL and execute pending SQL files in dependency order. |
| `npm run restore <key>` | Run the reverse (`_`-prefixed) script for a single node.               |
| `npm test`              | Run the Vitest suite against the configured database.                  |

## SQL file naming

Execution order is derived from file names:

- `<name>.sql` — standalone file with no dependencies.
- `<name>.<dependency>.sql` — runs after `<dependency>`.
- `<name>.<dep1>_<dep2>.sql` — runs after all listed dependencies.
- `<namespace>.<name>.<dep1>_<dep2>.sql` — keyed by `<name>` inside a namespace.
- `_<name>.sql` — reverse script for `<name>`; run with `npm run restore <name>`.
  The underscore must be the first character and is not part of the key passed
  to `restore`.

Examples:

- `account.email_username.sql` runs after `email` and `username`.
- `session.account.sql` runs after `account`.
- `email-validation.ev.account_domain.sql` runs after `account` and `domain`.
- `_init.sql` reverses `init`; `_register.sql` reverses `register`.

Reverse scripts are **not** run by `npm run all`; they only run when explicitly
requested with `npm run restore`.

## API reference

The single SQL API reference is in [`API.md`](API.md). It covers authentication,
tag/post, file, avatar, and icon functions.

## Testing

The suite uses Vitest and talks to a real PostgreSQL database through the
credentials in `build/env.json`.

```bash
npm run all   # once, to create build/env.json and apply the schema
npm test
```

- Tests cover every authentication function and include 12 end-to-end
  authentication flows.
- `vitest.config.ts` runs the database specs sequentially and ignores compiled
  files in `dist/`.
- **Each spec deletes all rows from `STUDITOPIA.SESSION` and
  `STUDITOPIA.ACCOUNT` before it runs.** Never point the tests at a database
  whose data you want to keep.

## Project structure

```text
src/
├── definitions/   # PostgreSQL domains (email, username)
├── schemas/       # Schema and extension setup
├── tables/        # Table definitions, indexes, and session helper
└── functions/
    └── authentication/  # Registration, login, session, and OTP functions
scripts/           # TypeScript build, graph compiler, runner, restore
tests/
├── functions/
│   └── authentication/  # Per-function specs, test cases, full-flow specs
└── migrations/    # Schema definition tests
config/            # Database configuration
build/             # Generated dependency graph, diagram, and saved credentials
dist/              # Compiled JavaScript (generated)
```

## Troubleshooting

- **`type "citext" does not exist`** — install `postgresql-contrib`. If the
  extension cannot be created by the application role, have an administrator
  create it in the project schema:

  ```bash
  sudo -u postgres psql -d studitopia -c \
    'CREATE EXTENSION IF NOT EXISTS citext SCHEMA studitopia;'
  sudo -u postgres psql -d studitopia -c \
    'CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA studitopia;'
  ```

- **`permission denied to create extension`** — grant the role the required
  privileges or pre-create the extensions as shown above.
- **`password authentication failed`** — check the role, password, and
  `pg_hba.conf` on the PostgreSQL server.
- **`Dependency ... does not exist`** — a dependency in a SQL file name has no
  matching `.sql` file under `src/`; fix the name and rerun `npm run compile`.
- **`ENOENT: no such file or directory, open './build/tree.md'`** — run
  `npm run compile` before `npm run all` or `npm run restore`.
- **`npm run all` reports nothing to do** — every node is already applied. To
  reapply, run `npm run restore init` followed by `npm run all`.
- **`schema "studitopia" already exists`** — the database is not empty. Use the
  reset sequence above instead of `npm run all` alone.
