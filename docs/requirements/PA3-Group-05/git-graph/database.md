```
* commit 2008b6f5cbe9ee46fdf5bcff200465ee877c1def
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sat Nov 14 19:17:24 2026 +0700
| 
|     add: commit speckit files for authentication schema
| 
|  .agents/skills/speckit-analyze/SKILL.md           | 259 +++++++++++++
|  .agents/skills/speckit-checklist/SKILL.md         | 383 ++++++++++++++++++++
|  .agents/skills/speckit-clarify/SKILL.md           | 291 +++++++++++++++
|  .agents/skills/speckit-constitution/SKILL.md      | 179 +++++++++
|  .agents/skills/speckit-converge/SKILL.md          | 283 +++++++++++++++
|  .agents/skills/speckit-implement/SKILL.md         | 226 ++++++++++++
|  .agents/skills/speckit-plan/SKILL.md              | 166 +++++++++
|  .agents/skills/speckit-specify/SKILL.md           | 345 ++++++++++++++++++
|  .agents/skills/speckit-tasks/SKILL.md             | 215 +++++++++++
|  .agents/skills/speckit-taskstoissues/SKILL.md     | 117 ++++++
|  .specify/init-options.json                        |   7 +-
|  .specify/integration.json                         |  12 +-
|  .specify/integrations/agy.manifest.json           |  17 +
|  .specify/integrations/speckit.manifest.json       |  18 +-
|  specs/001-auth-schema/checklists/requirements.md  |  35 ++
|  .../contracts/authentication-functions.md         | 234 ++++++++++++
|  specs/001-auth-schema/data-model.md               | 161 ++++++++
|  specs/001-auth-schema/plan.md                     | 150 ++++++++
|  specs/001-auth-schema/quickstart.md               |  90 +++++
|  specs/001-auth-schema/research.md                 | 147 ++++++++
|  specs/001-auth-schema/spec.md                     | 135 +++++++
|  specs/001-auth-schema/tasks.md                    | 218 +++++++++++
|  22 files changed, 3677 insertions(+), 11 deletions(-)
|   
*   commit 12b17fba347c316fdc184fef239f55bc66b65598
|\  Merge: de96b02 80defdb
| | Author: Nah <huynguyenlequoc13@gmail.com>
| | Date:   Mon Nov 9 14:04:40 2026 +0700
| | 
| |     Merge pull request #3 from RoundFloor/fix/account
| |     
| |     fix: add account info when register
| | 
| * commit 80defdb63f5e2b94422a62602e84e0f1b49c858d
|/  Author: wanderer2414 <huynguyenlequoc13@gmail.com>
|   Date:   Mon Nov 9 10:32:16 2026 +0700
|   
|       fix: add account info when register
|   
|    docs/authentication.md                           | 28 +++++++++++++-------
|    .../authentication/register.ev_uv_session.sql    |  7 +++--
|    2 files changed, 21 insertions(+), 14 deletions(-)
|   
*   commit de96b02d5642691ea7eb0235a2254195e1148be1
|\  Merge: 59fc864 eade716
| | Author: Nah <huynguyenlequoc13@gmail.com>
| | Date:   Sun Nov 8 09:56:45 2026 +0700
| | 
| |     Merge pull request #2 from RoundFloor/planning
| |     
| |     update: [planning] add mission, roadmap, and tech stack documentation
| |   
| *   commit eade716574632d4ee2bc0e8d3847aa52e2983fe3
| |\  Merge: 52d61d4 59fc864
| |/  Author: Nah <huynguyenlequoc13@gmail.com>
|/|   Date:   Sun Nov 8 09:56:31 2026 +0700
| |   
| |       Merge branch 'dev' into planning
| |   
* |   commit 59fc864165aa3461035e2864dd17eb4c30f9507c
|\ \  Merge: 1e25d9f 8dec1bd
| | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | Date:   Sun Nov 8 09:55:00 2026 +0700
| | | 
| | |     Merge pull request #1 from RoundFloor/feature/authentication
| | |     
| | |     feat: raw authentication group and database setup
| | | 
| * | commit 8dec1bdc5630e4cabcd41248c1385338ff2a26c0
|/ /  Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| |   Date:   Sat Nov 7 11:52:18 2026 +0700
| |   
| |       feat: raw authentication group and database setup
| |   
| |    .specify/memory/constitution.md                 |  246 ++--
| |    README.md                                       |  242 +++-
| |    config/database.config.ts                       |   14 +-
| |    docs/authentication.md                          |  554 ++++++++
| |    package-lock.json                               | 1206 ++++++++++++++++-
| |    package.json                                    |    7 +-
| |    src/definitions/email.init.sql                  |    4 +-
| |    src/definitions/username.init.sql               |    4 +-
| |    src/functions/authentication/_register.sql      |    1 +
| |    .../activate-account.session-check.sql          |   12 +
| |    .../email-validation.account_domain.sql         |   19 -
| |    .../email-validation.ev.account_domain.sql      |   18 +
| |    .../authentication/get-email.account.sql        |    7 +
| |    .../authentication/get-otp.session.sql          |    6 +
| |    src/functions/authentication/login.session.sql  |   27 +
| |    src/functions/authentication/logout.session.sql |   10 +
| |    .../authentication/register.ev_uv_session.sql   |   23 +
| |    .../authentication/remove-otp.session.sql       |   10 +
| |    .../authentication/save-otp.session.sql         |   10 +
| |    .../authentication/session-check.session.sql    |   17 +
| |    .../username-validation.uv.account.sql          |   12 +
| |    src/schemas/init.sql                            |    3 +-
| |    src/tables/account.email_username.sql           |   18 +-
| |    src/tables/domain.init.sql                      |   17 +-
| |    src/tables/session.account.sql                  |    8 +
| |    .../authentication/active-account.spec.ts       |  125 ++
| |    .../authentication/email-validation.spec.ts     |   67 +
| |    .../functions/authentication/full-flow.spec.ts  |  193 +++
| |    .../functions/authentication/get-email.spec.ts  |   96 ++
| |    tests/functions/authentication/get-otp.spec.ts  |  139 ++
| |    tests/functions/authentication/helpers.ts       |  108 ++
| |    tests/functions/authentication/login.spec.ts    |  125 ++
| |    tests/functions/authentication/logout.spec.ts   |  106 ++
| |    .../pg.email-validation.testcases.ts            |   79 ++
| |    .../authentication/pg.full-flow.testcases.ts    |  105 ++
| |    .../authentication/pg.login.testcases.ts        |   72 +
| |    .../authentication/pg.register.testcases.ts     |  799 +++++++++++
| |    .../pg.username-validation.testcases.ts         |   29 +
| |    .../authentication/register-session.spec.ts     |   77 ++
| |    tests/functions/authentication/register.spec.ts |   39 +
| |    .../functions/authentication/remove-otp.spec.ts |  108 ++
| |    tests/functions/authentication/save-otp.spec.ts |   94 ++
| |    .../authentication/session-check.spec.ts        |  104 ++
| |    .../authentication/username-validation.spec.ts  |   54 +
| |    tests/migrations/init.spec.ts                   |   35 +-
| |    vitest.config.ts                                |   11 +
| |    46 files changed, 4816 insertions(+), 244 deletions(-)
| | 
* | commit 1e25d9f56ad0ec967c9c285b59a6ac1290270e13
| | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Tue Nov 3 17:39:48 2026 +0700
| | 
| |     refactor: remove tracenode and update tree on restoring
| | 
| |  scripts/compile.ts    |  80 ++-------------
| |  scripts/node.ts       | 249 ++++++++++++++++++++++++++++++++++++----------
| |  scripts/restore.ts    |  30 +++---
| |  scripts/run_all.ts    |  45 ++++-----
| |  scripts/sql.ts        |  34 ++++---
| |  scripts/trace_node.ts | 131 ------------------------
| |  6 files changed, 265 insertions(+), 304 deletions(-)
| | 
* | commit 6fade8eb18f312165d7259f98b2cf6dbb222197f
| | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Mon Nov 2 15:31:20 2026 +0700
| | 
| |     refactor: split origin node to node and trace node
| | 
| |  package.json          |   1 +
| |  scripts/compile.ts    |  66 +++++++++++++++--------
| |  scripts/node.ts       |  62 ++++++++++++++++++++++
| |  scripts/restore.ts    |  21 ++++++++
| |  scripts/run_all.ts    | 117 ++++-------------------------------------
| |  scripts/sql.ts        | 109 ++++++++++++++++++++++++++++++++++++++
| |  scripts/trace_node.ts | 131 ++++++++++++++++++++++++++++++++++++++++++++++
| |  scripts/tree.ts       | 126 --------------------------------------------
| |  src/schemas/_init.sql |   1 +
| |  src/schemas/init.sql  |   1 -
| |  10 files changed, 379 insertions(+), 256 deletions(-)
| | 
* | commit 72e3199c115613e89ddf149a6aa958c03f7277f5
| | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Mon Nov 2 11:17:15 2026 +0700
| | 
| |     refactor: print input and ignore files, clean input code
| | 
| |  scripts/compile.ts | 85 ++++++++++++++++++++++++++------------------------
| |  scripts/files.ts   | 19 +++++++++++
| |  scripts/tree.ts    |  2 ++
| |  3 files changed, 65 insertions(+), 41 deletions(-)
| | 
* | commit 2d7be8ed4f121b3c19b13cb4fc7341893f1da9fa
| | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Mon Nov 2 00:12:25 2026 +0700
| | 
| |     feat: basic compile schedule and minimal example for database
| | 
| |  .gitignore                                       |   5 +-
| |  README.md                                        | 158 +++--
| |  docker-compose.dev.yml                           |  28 -
| |  package-lock.json                                | 571 +++++++++++++++++++
| |  package.json                                     |  26 +
| |  scripts/clean.sh                                 |  16 -
| |  scripts/compile.ts                               |  50 ++
| |  scripts/env.ts                                   |  19 +
| |  scripts/install.sh                               |  74 ---
| |  scripts/run.sh                                   |  15 -
| |  scripts/run_all.sh                               |  55 --
| |  scripts/run_all.ts                               | 132 +++++
| |  scripts/start.sh                                 |  15 -
| |  scripts/tree.ts                                  | 124 ++++
| |  src/definitions/email.init.sql                   |   2 +
| |  src/definitions/username.init.sql                |   2 +
| |  .../email-validation.account_domain.sql          |  19 +
| |  src/functions/rooms/fn_room_count_members.sql    |   7 -
| |  src/migrations/20261023000000_init.sql           |  16 -
| |  src/procedures/rooms/sp_room_join.sql            |   9 -
| |  src/schemas/init.sql                             |   3 +
| |  src/seeds/rooms_seed.sql                         |   3 -
| |  src/tables/account.email_username.sql            |  13 +
| |  src/tables/domain.init.sql                       |   7 +
| |  src/tables/session.account.sql                   |   7 +
| |  src/triggers/rooms/trg_rooms_updated_at.sql      |  15 -
| |  tests/migrations/init.spec.ts                    |  24 +-
| |  tsconfig.json                                    |  45 ++
| |  28 files changed, 1162 insertions(+), 298 deletions(-)
| | 
| * commit 52d61d4d87025d8694d7e70f955bf1a2a616d4b5
|/  Author: Tuan <tuan06nbk@gmail.com>
|   Date:   Mon Oct 26 17:55:41 2026 +0700
|   
|       update: [planning] add mission, roadmap, and tech stack documentation
|   
|    .gitignore                    |  3 ++-
|    .specify/memory/mission.md    | 19 +++++++++++++++++++
|    .specify/memory/roadmap.md    | 39 +++++++++++++++++++++++++++++++++++++++
|    .specify/memory/tech-stack.md | 31 +++++++++++++++++++++++++++++++
|    4 files changed, 91 insertions(+), 1 deletion(-)
| 
* commit 107f8b5631973ad9e54364b4ab039c1dbb9a505b
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sun Oct 25 12:33:46 2026 +0700
| 
|     update: change public url and directus version
| 
|  docker-compose.dev.yml | 6 ++++--
|  1 file changed, 4 insertions(+), 2 deletions(-)
| 
* commit 7b7d3b1293322344f7186f8a22c763872a3ab99a
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sun Oct 25 12:27:54 2026 +0700
| 
|     update: configure port of directus
| 
|  docker-compose.dev.yml | 8 +++++++-
|  1 file changed, 7 insertions(+), 1 deletion(-)
| 
* commit 2f4a0ae9e95d29660a1c41942322c3baabdda1cd
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sun Oct 25 12:07:54 2026 +0700
| 
|     update: gitignore and rm tls
| 
|  .gitignore             | 3 ++-
|  docker-compose.dev.yml | 3 +--
|  2 files changed, 3 insertions(+), 3 deletions(-)
| 
* commit 91dbf0d87fd89f6004d1ce35be61fb3147bff8d7
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sun Oct 25 09:19:57 2026 +0700
| 
|     update: change dabase host address and docker config
| 
|  docker-compose.dev.yml |  4 ++-
|  scripts/install.sh     | 75 ++++++++++++++++++++++++++++++++----------------
|  2 files changed, 54 insertions(+), 25 deletions(-)
| 
* commit 4f99a7b52fde353183e5f721ddf25ff1b7a858f4
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sat Oct 24 23:08:45 2026 +0700
| 
|     update: change DB HOST address
| 
|  docker-compose.dev.yml | 2 +-
|  scripts/run.sh         | 2 +-
|  2 files changed, 2 insertions(+), 2 deletions(-)
| 
* commit e9da9058437953a79acf1024690348ed5cb9c94b
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sat Oct 24 23:03:19 2026 +0700
| 
|     update: hidden some secret parameters in config
| 
|  docker-compose.dev.yml | 35 +++++++++++------------------------
|  scripts/install.sh     | 31 ++++++++++++++++++-------------
|  scripts/start.sh       |  2 +-
|  3 files changed, 30 insertions(+), 38 deletions(-)
| 
* commit 830d9871bdde86a02ac57b074a7c84d915976ca6
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sat Oct 24 22:27:56 2026 +0700
| 
|     refactor: move all code to src/ and add script to install, start and run sql file
| 
|  .gitignore                                        |   1 +
|  .opencode/commands/speckit.analyze.md             | 251 ------
|  .opencode/commands/speckit.checklist.md           | 375 --------
|  .opencode/commands/speckit.clarify.md             | 287 ------
|  .opencode/commands/speckit.constitution.md        | 175 ----
|  .opencode/commands/speckit.converge.md            | 275 ------
|  .opencode/commands/speckit.implement.md           | 218 -----
|  .opencode/commands/speckit.plan.md                | 166 ----
|  .opencode/commands/speckit.specify.md             | 345 -------
|  .opencode/commands/speckit.tasks.md               | 216 -----
|  .opencode/commands/speckit.taskstoissues.md       | 110 ---
|  .specify/init-options.json                        |   2 +-
|  .specify/integration.json                         |   2 +-
|  .specify/integrations/opencode.manifest.json      |   4 +-
|  .specify/integrations/speckit.manifest.json       |  10 +-
|  .specify/memory/constitution.md                   |  93 +-
|  .specify/scripts/bash/check-prerequisites.sh      | 243 +++++
|  .specify/scripts/bash/common.sh                   | 942 ++++++++++++++++++++
|  .specify/scripts/bash/create-new-feature.sh       | 504 +++++++++++
|  .specify/scripts/bash/resolve-template.sh         |  57 ++
|  .specify/scripts/bash/setup-plan.sh               |  85 ++
|  .specify/scripts/bash/setup-tasks.sh              |  94 ++
|  .../scripts/powershell/check-prerequisites.ps1    |  27 +-
|  .specify/scripts/powershell/common.ps1            |   4 +-
|  .specify/scripts/powershell/setup-plan.ps1        |  24 +-
|  .specify/scripts/powershell/setup-tasks.ps1       |  12 +-
|  README.md                                         |  21 +-
|  scripts/clean.sh                                  |  16 +
|  scripts/install.sh                                |  42 +
|  scripts/run.sh                                    |  15 +
|  scripts/run_all.sh                                |  55 ++
|  scripts/start.sh                                  |  15 +
|  .../functions}/rooms/fn_room_count_members.sql    |   0
|  .../migrations}/20261023000000_init.sql           |   0
|  .../procedures}/rooms/sp_room_join.sql            |   0
|  {seeds => src/seeds}/rooms_seed.sql               |   0
|  .../triggers}/rooms/trg_rooms_updated_at.sql      |   0
|  37 files changed, 2171 insertions(+), 2515 deletions(-)
| 
* commit e5b99575d376460aa8982e363f2106a50875edcc
| Author: Tuan <tuan06nbk@gmail.com>
| Date:   Fri Oct 23 10:48:19 2026 +0700
| 
|     add: Communicate between backend and database
| 
|  README.md                                 | 46 ++++++++++++++++++++++++++++-
|  config/database.config.ts                 | 11 +++++++
|  docker-compose.dev.yml                    | 32 ++++++++++++++++++++
|  functions/rooms/fn_room_count_members.sql |  7 +++++
|  migrations/20261023000000_init.sql        | 16 ++++++++++
|  procedures/rooms/sp_room_join.sql         |  9 ++++++
|  seeds/rooms_seed.sql                      |  3 ++
|  tests/migrations/init.spec.ts             | 15 ++++++++++
|  triggers/rooms/trg_rooms_updated_at.sql   | 15 ++++++++++
|  9 files changed, 153 insertions(+), 1 deletion(-)
| 
* commit f146ae36a312bd4cea1022ad9c20a6e307efdd6a
| Author: Tuan <tuan06nbk@gmail.com>
| Date:   Fri Oct 23 10:14:23 2026 +0700
| 
|     modify: constitution.md of database
| 
|  .specify/memory/constitution.md | 157 +++++++++++++++++++++++++++++---------
|  1 file changed, 122 insertions(+), 35 deletions(-)
| 
* commit e682a847802db8b50e9a2f0eff150862a049c53a
| Author: Tuan <tuan06nbk@gmail.com>
| Date:   Fri Oct 23 09:01:50 2026 +0700
| 
|     add: speckit for database
| 
|  .opencode/commands/speckit.analyze.md             | 251 ++++++
|  .opencode/commands/speckit.checklist.md           | 375 +++++++++
|  .opencode/commands/speckit.clarify.md             | 287 +++++++
|  .opencode/commands/speckit.constitution.md        | 175 +++++
|  .opencode/commands/speckit.converge.md            | 275 +++++++
|  .opencode/commands/speckit.implement.md           | 218 ++++++
|  .opencode/commands/speckit.plan.md                | 166 ++++
|  .opencode/commands/speckit.specify.md             | 345 +++++++++
|  .opencode/commands/speckit.tasks.md               | 216 ++++++
|  .opencode/commands/speckit.taskstoissues.md       | 110 +++
|  .specify/.gitignore                               |  14 +
|  .specify/init-options.json                        |   9 +
|  .specify/integration.json                         |  15 +
|  .specify/integrations/opencode.manifest.json      |  17 +
|  .specify/integrations/speckit.manifest.json       |  19 +
|  .specify/memory/.constitution-template.json       |   4 +
|  .specify/memory/constitution.md                   |  50 ++
|  .../scripts/powershell/check-prerequisites.ps1    | 194 +++++
|  .specify/scripts/powershell/common.ps1            | 813 ++++++++++++++++++++
|  .../scripts/powershell/create-new-feature.ps1     | 357 +++++++++
|  .specify/scripts/powershell/resolve-template.ps1  |  38 +
|  .specify/scripts/powershell/setup-plan.ps1        |  90 +++
|  .specify/scripts/powershell/setup-tasks.ps1       |  93 +++
|  .specify/templates/checklist-template.md          |  45 ++
|  .specify/templates/constitution-template.md       |  50 ++
|  .specify/templates/plan-template.md               | 113 +++
|  .specify/templates/spec-template.md               | 131 ++++
|  .specify/templates/tasks-template.md              | 252 ++++++
|  .specify/workflows/speckit/workflow.yml           |  74 ++
|  .specify/workflows/workflow-registry.json         |  13 +
|  30 files changed, 4809 insertions(+)
| 
* commit b4ce336b9d49c408f18fd78c64d0746254924629
  Author: Nah <huynguyenlequoc13@gmail.com>
  Date:   Tue Oct 6 09:14:21 2026 +0700
  
      Initial commit
  
   README.md | 1 +
   1 file changed, 1 insertion(+)
```