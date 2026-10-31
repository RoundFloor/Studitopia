# Studitopia;
```
* commit 5e28a0f25e6e9ddc7e82cf12736cdfe364f76534
| Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sat Oct 31 18:10:07 2026 +0700
| 
|     docs: compile weekly reports and software requirements
| 
|  .../PA2/{plan => }/software_development_plan.md   |   0
|  .../PA2/software_development_plan.pdf             | Bin 0 -> 342826 bytes
|  .../PA2/software_development_plan.tex             | 752 ++++++++++++++++++++
|  .../{vision.md => software_development_vision.md} |   0
|  ...vision.pdf => software_development_vision.pdf} | Bin
|  ...vision.tex => software_development_vision.tex} |   0
|  .../PA2/weekly_report/images/week1_jira_task.png  | Bin 0 -> 184764 bytes
|  .../PA2/weekly_report/images/week2_jira_task.png  | Bin 0 -> 332848 bytes
|  .../PA2/weekly_report/weekly_report1.md           |   2 +-
|  .../PA2/weekly_report/weekly_report1.pdf          | Bin 0 -> 230239 bytes
|  .../PA2/weekly_report/weekly_report2.md           |   2 +-
|  .../PA2/weekly_report/weekly_report2.pdf          | Bin 0 -> 349883 bytes
|  12 files changed, 754 insertions(+), 2 deletions(-)
|   
*   commit b76f856d1d513c1c1a641f7b6b3d4fcbacd56332
|\  Merge: bf177f1 916f856
| | Author: Nah <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 17:16:58 2026 +0700
| | 
| |     Merge pull request #15 from RoundFloor/docs/weekly_report
| |     
| |     docs: add weekly report
| | 
| * commit 916f8561d52ff9b6d9b1e18b30fbdba4bffacf19
| | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | Date:   Sat Oct 31 16:09:27 2026 +0700
| | 
| |     docs: add weekly report
| | 
| |  .../PA1/weekly_report/weekly_report1.md          | 107 -------------------
| |  .../PA2/weekly_report/weekly_report1.md          |  95 ++++++++++++++++
| |  .../PA2/weekly_report/weekly_report2.md          |  97 +++++++++++++++++
| |  3 files changed, 192 insertions(+), 107 deletions(-)
| | 
* | commit bf177f1e5612394fd831f13b1017555c2e4f06e6
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 14:24:50 2026 +0700
| | 
| |     docs: compile vision.pdf
| | 
| |  docs/requirements/PA2/vision.md                  | 487 +++++++++++++
| |  docs/requirements/PA2/vision.pdf                 | Bin 0 -> 977654 bytes
| |  docs/requirements/PA2/vision.tex                 | 712 +++++++++++++++++++
| |  docs/requirements/PA2/vision/0-initials.md       |  44 --
| |  docs/requirements/PA2/vision/1-introduction.md   |  32 -
| |  docs/requirements/PA2/vision/2-positioning.md    |  51 --
| |  .../3-stakeholder-and-user-descriptions.md       |  86 ---
| |  .../PA2/vision/4-project-overview.md             | 145 ----
| |  .../requirements/PA2/vision/5-product-feature.md |  98 ---
| |  .../PA2/vision/6-non-functional-requirement.md   |  29 -
| |  docs/templates/report_templates.tex              |  14 +-
| |  11 files changed, 1208 insertions(+), 490 deletions(-)
| |   
* |   commit 687efb8d0b200f97eeac7752b3d08b9363a086d1
|\ \  Merge: 441cdf0 5efbb51
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 14:03:16 2026 +0700
| | | 
| | |     Merge remote-tracking branch 'origin/origin/docs/PA2-SW-dev-Plan' into dev
| | | 
| * | commit 5efbb5136a109e2b13b9045cd55443f4ec7d8987
| | | Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| | | Date:   Sat Oct 31 07:56:35 2026 +0700
| | | 
| | |     doc: add project organisation to PA2
| | | 
| | |  docs/requirements/PA2/software_development_plan.md | 12 ++++++------
| | |  1 file changed, 6 insertions(+), 6 deletions(-)
| | | 
| * | commit b4b6ff32c0239bb7d9834f798813e9946da30eb5
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Sat Oct 31 00:48:29 2026 +0700
| | | 
| | |     docs: Add management process in development plan
| | | 
| | |  .../PA2/software_development_plan.md            | 274 +++++++++++++++---
| | |  1 file changed, 233 insertions(+), 41 deletions(-)
| | | 
| * | commit 7eb20bcecea3a7e13b53816bf9bc1505dc6da1d5
| | | Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| | | Date:   Fri Oct 30 18:35:05 2026 +0700
| | | 
| | |     doc: add workflow diagram to PA2
| | | 
| | |  docs/requirements/PA2/workflow_diagram.md | 57 +++++++++++++++++++++++++
| | |  1 file changed, 57 insertions(+)
| | | 
| * | commit 02748be8712d9094df7292743b44226fa13c001f
| |/  Author: Tuan <tuan06nbk@gmail.com>
| |   Date:   Thu Oct 29 11:18:04 2026 +0700
| |   
| |       Add Software Development Plan and related documentation for Studitopia project
| |       
| |       - Added `software_development_plan.md` detailing the Studitopia project, including purpose, scope, objectives, deliverables, and project organization.
| |   
| |    docs/requirements/PA2/PA2.md                    |   0
| |    docs/requirements/PA2/req/PA2-2026 (1).pdf      | Bin 0 -> 222739 bytes
| |    docs/requirements/PA2/req/dot_strings.txt       | 467 ++++++++++++++++++
| |    docs/requirements/PA2/req/rup_sdpln_sp.docx     | Bin 0 -> 77312 bytes
| |    .../PA2/req/rup_sdpln_sp.dot (1).doc            | Bin 0 -> 76288 bytes
| |    .../PA2/req/rup_vision_sp-example.docx          | Bin 0 -> 30732 bytes
| |    .../PA2/req/rup_vision_sp-example_doc.xml       |   2 +
| |    docs/requirements/PA2/req/sdpln_strings.txt     | 389 +++++++++++++++
| |    .../PA2/software_development_plan.md            | 159 ++++++
| |    src/backend                                     |   2 +-
| |    src/database                                    |   2 +-
| |    src/frontend                                    |   2 +-
| |    12 files changed, 1020 insertions(+), 3 deletions(-)
| |   
* |   commit 441cdf09d710cca1714855c3434c0eb533b7c2c5
|\ \  Merge: abb3635 010513b
| | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 08:44:48 2026 +0700
| | | 
| | |     Merge pull request #13 from RoundFloor/docs/PA2/vision-document-p1
| | |     
| | |     Docs/pa2/vision document p1
| | | 
| * | commit 010513b705e9c7cdc642ac5bc8495cefe18511d1
| | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | Date:   Sat Oct 31 00:52:49 2026 +0700
| | | 
| | |     docs: Write 0-initials.md of vision document
| | | 
| | |  docs/requirements/PA2/plan/0-initials.md | 44 ++++++++++++++++++++++++++
| | |  1 file changed, 44 insertions(+)
| | | 
| * | commit 6d1287bbf6dc2e81b3a5de373acb0c861c9f507c
| | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | Date:   Sat Oct 31 00:42:50 2026 +0700
| | | 
| | |     docs: Write 3-stakeholder-and-user-descriptions.md of vision document
| | | 
| | |  .../plan/3-stakeholder-and-user-descriptions.md | 86 +++++++++++++++++++
| | |  1 file changed, 86 insertions(+)
| | | 
| * | commit b0a7838daf5321712b15c7aad1a9ea5c98fa80ae
| | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | Date:   Sat Oct 31 00:24:36 2026 +0700
| | | 
| | |     docs: Write 2-positioning.md of vision document
| | | 
| | |  docs/requirements/PA2/plan/2-positioning.md | 51 +++++++++++++++++++++++
| | |  1 file changed, 51 insertions(+)
| | | 
| * | commit 2c71eb3412c89d7005c0345bc8250ae064211d1b
| |/  Author: KanbeMatt <khanhbinh08062006@gmail.com>
| |   Date:   Sat Oct 31 00:21:24 2026 +0700
| |   
| |       docs: Write 1-introduction.md of vision document
| |   
| |    docs/requirements/PA2/plan/1-introduction.md | 32 ++++++++++++++++++++++
| |    1 file changed, 32 insertions(+)
| |   
* |   commit abb36350ccebdaff28670fa4d0273532f08db027
|\ \  Merge: 7de0139 7e78567
| |/  Author: Nah <huynguyenlequoc13@gmail.com>
|/|   Date:   Sat Oct 31 08:42:40 2026 +0700
| |   
| |       Merge pull request #12 from RoundFloor/docs/PA2/project-overview
| |       
| |       Docs/pa2/pdoduct overview
| | 
| * commit 7e78567ebe36cbf6676634ddcf23fe30830e2ffc
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 08:38:42 2026 +0700
| | 
| |     docs: add proof of 024 and 026
| | 
| |  .../requirements/PA2/speckit-training/24125024.png | Bin 0 -> 322256 bytes
| |  .../requirements/PA2/speckit-training/24125026.png | Bin 0 -> 479383 bytes
| |  2 files changed, 0 insertions(+), 0 deletions(-)
| | 
| * commit 9cfb790a63bb76443af765c49317fb342e9e0027
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 00:39:04 2026 +0700
| | 
| |     docs: add constitutions and speckit training proof
| | 
| |  .../PA2/constitutions/backend/constitution.md    | 282 +++++++++++++++++
| |  .../PA2/constitutions/database/constitution.md   | 148 +++++++++
| |  .../PA2/constitutions/frontend/constitution.md   | 306 +++++++++++++++++++
| |  .../PA2/speckit-training/24125025.png            | Bin 0 -> 831097 bytes
| |  .../PA2/speckit-training/24125048.png            | Bin 0 -> 103665 bytes
| |  .../PA2/speckit-training/24125100.png            | Bin 0 -> 1504603 bytes
| |  src/backend                                      |   2 +-
| |  7 files changed, 737 insertions(+), 1 deletion(-)
| | 
| * commit 8b93cfaf9bed8314b298589bc800b0f868162550
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 00:29:31 2026 +0700
| | 
| |     docs: reference docs of PA2 plan
| | 
| |  docs/requirements/PA2/proposals/API.md           | 228 ++++++
| |  docs/requirements/PA2/proposals/feature_flow.md  | 112 +++
| |  .../PA2/proposals/functional_requirement.md      | 289 +++++++
| |  .../PA2/proposals/non_functional_requirement.md  |  50 ++
| |  docs/requirements/PA2/proposals/overview.md      | 185 +++++
| |  docs/requirements/PA2/proposals/response_code.md |  38 +
| |  docs/requirements/PA2/proposals/screen_flow.md   |  79 ++
| |  docs/requirements/PA2/proposals/userstory.md     | 807 +++++++++++++++++++
| |  8 files changed, 1788 insertions(+)
| | 
| * commit c532a89741d2ea62220d0c3de7910484b2bbab0e
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 00:26:46 2026 +0700
| | 
| |     docs: non functional requiremment of PA2 plan
| | 
| |  .../PA2/plan/6-non-functional-requirement.md     | 29 ++++++++++++++++++++
| |  1 file changed, 29 insertions(+)
| | 
| * commit 399f61acc5ddc7f193c69cd7347d6c803bf43b37
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 00:07:20 2026 +0700
| | 
| |     add: product features docs of PA2 plan
| | 
| |  docs/requirements/PA2/plan/5-product-feature.md | 43 +++++++++++++++++++++
| |  1 file changed, 43 insertions(+)
| | 
| * commit 59f67380877ec51f2614e40c61f1be9edc377c87
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 00:01:35 2026 +0700
| | 
| |     add: product overview of plan PA2
| | 
| |  docs/requirements/PA2/plan/4-project-overview.md | 145 +++++++++++++++++++
| |  src/backend                                      |   2 +-
| |  src/database                                     |   2 +-
| |  src/frontend                                     |   2 +-
| |  4 files changed, 148 insertions(+), 3 deletions(-)
| | 
| * commit 776f1e45092b4c2fb3aeb3e9c965662f5243fed0
|/  Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
|   Date:   Sun Oct 18 23:05:55 2026 +0700
|   
|       docs: add AI-feature proposal
|   
|    docs/proposal/AI-proposal.md | 55 ++++++++++++++++++++++++++++++++++++++++
|    1 file changed, 55 insertions(+)
|   
*   commit 7de0139fb8ca9158bdf200486cd11c70be340a44
|\  Merge: 35d231f 9581146
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 17 23:49:41 2026 +0700
| | 
| |     Merge remote-tracking branch 'origin/docs/fix-latex' into dev
| | 
| * commit 9581146034d2bd4e406665fd9d6a09537ac9704f
|/  Author: Tuan <tuan06nbk@gmail.com>
|   Date:   Sat Oct 17 22:23:23 2026 +0700
|   
|       add: images for contract in pdf
|   
|    docs/requirements/PA1/PA1.pdf                    |  Bin 7634042 -> 8452854 bytes
|    docs/requirements/PA1/PA1.tex                    |   20 +-
|    docs/requirements/PA1/out/PA1.aux                |  138 +++
|    docs/requirements/PA1/out/PA1.fdb_latexmk        |  171 +++
|    docs/requirements/PA1/out/PA1.fls                |  471 ++++++++
|    docs/requirements/PA1/out/PA1.log                | 1026 ++++++++++++++++++
|    docs/requirements/PA1/out/PA1.out                |   45 +
|    docs/requirements/PA1/out/PA1.pdf                |  Bin 0 -> 8452854 bytes
|    docs/requirements/PA1/out/PA1.synctex.gz         |  Bin 0 -> 132668 bytes
|    docs/requirements/PA1/out/PA1.toc                |   46 +
|    docs/requirements/PA1/screenshot/git-graph.png   |  Bin 0 -> 619147 bytes
|    .../requirements/PA1/screenshot/jira-backlog.png |  Bin 0 -> 414106 bytes
|    12 files changed, 1916 insertions(+), 1 deletion(-)
| 
* commit 35d231ff0a98aae558d217a3ab888e58e716bb65
| Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sat Oct 17 13:19:29 2026 +0700
| 
|     add: final PA1
| 
|  .gitignore                                         |   1 +
|  docs/requirements/PA1/PA1-Group05.zip              | Bin 0 -> 14918323 bytes
|  .../23125026.png                                   | Bin
|  .../24125025.png                                   | Bin
|  .../24125048.png                                   | Bin
|  .../24125100.png                                   | Bin
|  docs/requirements/proposal.md                      |   4 ----
|  docs/requirements/proposal/1-overview.md           |   0
|  docs/requirements/proposal/2-userstory.md          |   0
|  .../proposal/3-functional-requirement.md           |   0
|  .../proposal/4-nonfunctional-requirement.md        |   0
|  11 files changed, 1 insertion(+), 4 deletions(-)
| 
* commit 0a81aa022f3f38b8076297614767b624e3ea88e7
| Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Fri Oct 16 19:41:09 2026 +0700
| 
|     add: pdf version for weekly report
| 
|  .../PA1/weekly_report/weekly_report1.pdf             | Bin 0 -> 159593 bytes
|  .../PA1/weekly_report/weekly_report2.pdf             | Bin 0 -> 182653 bytes
|  2 files changed, 0 insertions(+), 0 deletions(-)
| 
* commit 9c350940990ed12f00b811d5a897787560a83639
| Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Fri Oct 16 19:38:29 2026 +0700
| 
|     add: pdf version for PA1
| 
|  docs/requirements/PA1/PA1.pdf                     |  Bin 0 -> 7634042 bytes
|  docs/requirements/PA1/PA1.tex                     | 1080 +++++++++++++++++++
|  docs/requirements/PA1/appendix/appendix.tex       |    0
|  docs/requirements/PA1/features/0-title.md         |    1 -
|  docs/requirements/PA1/features/1-introduction.md  |   10 -
|  .../PA1/features/3-targetuser-platform.md         |    9 -
|  docs/requirements/PA1/features/4-key-features.md  |   31 -
|  docs/requirements/PA1/features/5-ai-feature.md    |   10 -
|  docs/requirements/PA1/img/hcmus-logo.png          |  Bin 0 -> 258629 bytes
|  docs/templates/img/hcmus-logo.png                 |  Bin 0 -> 258629 bytes
|  docs/templates/report_templates.pdf               |  Bin 0 -> 207367 bytes
|  docs/templates/report_templates.tex               |  145 +++
|  12 files changed, 1225 insertions(+), 61 deletions(-)
|   
*   commit 0fe16bc1eef14ef0aa55bcf9e8f12dc4ccd2b553
|\  Merge: 28b3249 525dd89
| | Author: Nah <huynguyenlequoc13@gmail.com>
| | Date:   Fri Oct 16 09:59:20 2026 +0700
| | 
| |     Merge pull request #10 from RoundFloor/PA1/git-repository
| |     
| |     add: folder structure and gitlog
| | 
| * commit 525dd8991f98685703e5462ea802fcee632f134d
|/  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
|   Date:   Fri Oct 16 09:08:09 2026 +0700
|   
|       add: folder structure and gitlog
|   
|    docs/requirements/PA1/git_repository.md | 345 ++++++++++++++++++++++++++++
|    1 file changed, 345 insertions(+)
|   
| * commit 775dc48a91bdf5f073b9372cb900944e1ad23c3c
|/| Merge: 28b3249 6cce33a
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Fri Oct 16 10:06:30 2026 +0700
| | 
| |     WIP on feature/automation-docs: 28b3249 Merge pull request #9 from RoundFloor/PA1/survey
| | 
| * commit 6cce33aa01b9efc090b73431e7a8ffd98a30660c
|/  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
|   Date:   Fri Oct 16 10:06:30 2026 +0700
|   
|       index on feature/automation-docs: 28b3249 Merge pull request #9 from RoundFloor/PA1/survey
|   
|    .agents/skills/speckit-analyze/SKILL.md       | 259 ++++++
|    .agents/skills/speckit-checklist/SKILL.md     | 383 +++++++++
|    .agents/skills/speckit-clarify/SKILL.md       | 291 +++++++
|    .agents/skills/speckit-constitution/SKILL.md  | 179 ++++
|    .agents/skills/speckit-converge/SKILL.md      | 283 +++++++
|    .agents/skills/speckit-implement/SKILL.md     | 226 ++++++
|    .agents/skills/speckit-plan/SKILL.md          | 166 ++++
|    .agents/skills/speckit-specify/SKILL.md       | 345 ++++++++
|    .agents/skills/speckit-tasks/SKILL.md         | 215 +++++
|    .agents/skills/speckit-taskstoissues/SKILL.md | 117 +++
|    .specify/.gitignore                           |  14 +
|    .specify/init-options.json                    |  10 +
|    .specify/integration.json                     |  15 +
|    .specify/integrations/agy.manifest.json       |  17 +
|    .specify/integrations/speckit.manifest.json   |  19 +
|    .specify/memory/.constitution-template.json   |   4 +
|    .specify/memory/constitution.md               |  70 ++
|    .specify/scripts/bash/check-prerequisites.sh  | 243 ++++++
|    .specify/scripts/bash/common.sh               | 942 ++++++++++++++++++++++
|    .specify/scripts/bash/create-new-feature.sh   | 504 ++++++++++++
|    .specify/scripts/bash/resolve-template.sh     |  57 ++
|    .specify/scripts/bash/setup-plan.sh           |  85 ++
|    .specify/scripts/bash/setup-tasks.sh          |  94 +++
|    .specify/templates/checklist-template.md      |  45 ++
|    .specify/templates/constitution-template.md   |  50 ++
|    .specify/templates/plan-template.md           | 113 +++
|    .specify/templates/spec-template.md           | 131 +++
|    .specify/templates/tasks-template.md          | 252 ++++++
|    .specify/workflows/speckit/workflow.yml       |  74 ++
|    .specify/workflows/workflow-registry.json     |  13 +
|    30 files changed, 5216 insertions(+)
|   
*   commit 28b3249f271b9ca8a7d0bea41cd0b6ada1e6c338
|\  Merge: 17a0be0 54b7781
| | Author: Nah <huynguyenlequoc13@gmail.com>
| | Date:   Fri Oct 16 08:43:19 2026 +0700
| | 
| |     Merge pull request #9 from RoundFloor/PA1/survey
| |     
| |     Pa1/survey
| | 
| * commit 54b7781989b8028759038b4e446c28c7aeb692f4
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Fri Oct 16 07:48:21 2026 +0700
| | 
| |     add: document of our enhancement and UI patterns resuse
| | 
| |  docs/requirements/PA1/survey.md        | 312 +++++++++++++++++++++++++++++
| |  docs/requirements/PA1/survey/survey.md |  49 +++++
| |  2 files changed, 361 insertions(+)
| | 
| * commit 5175b9a7d62175db0e9aea579a69b47cbcff3149
| | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | Date:   Thu Oct 15 20:59:30 2026 +0700
| | 
| |     docs(PA1-survey): Review and update survey
| | 
| |  docs/requirements/PA1/survey/survey.md | 88 +++++++++++++++++-------------
| |  1 file changed, 51 insertions(+), 37 deletions(-)
| | 
| * commit cebd4b8577513d3873a987eb679ed7328997cb23
| | Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| | Date:   Sun Oct 11 14:30:48 2026 +0700
| | 
| |     docs (PA1-survey): add Focusmate content to survey
| | 
| |  .../PA1/survey/image/Focusmate/book_session.png  | Bin 0 -> 117090 bytes
| |  .../PA1/survey/image/Focusmate/calendar.png      | Bin 0 -> 292086 bytes
| |  .../PA1/survey/image/Focusmate/join_session.png  | Bin 0 -> 43112 bytes
| |  .../survey/image/Focusmate/pre_session_setup.png | Bin 0 -> 88149 bytes
| |  .../PA1/survey/image/Focusmate/session.png       | Bin 0 -> 75615 bytes
| |  docs/requirements/PA1/survey/survey.md           |  44 ++++++++++++++++++-
| |  6 files changed, 42 insertions(+), 2 deletions(-)
| | 
| * commit 4ea84f71dfce3eb2f2877bb44d3de1db1361bc70
| | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | Date:   Sun Oct 11 00:21:22 2026 +0700
| | 
| |     docs(PA1): create survey for Lifeat app
| | 
| |  .../PA1/survey/image/Lifeat/calendar_button.png  | Bin 0 -> 2045 bytes
| |  .../PA1/survey/image/Lifeat/chat.png             | Bin 0 -> 55130 bytes
| |  .../survey/image/Lifeat/explore_mode_screen.png  | Bin 0 -> 1024798 bytes
| |  .../survey/image/Lifeat/focus_mode_screen.png    | Bin 0 -> 2685300 bytes
| |  .../PA1/survey/image/Lifeat/invite_button.png    | Bin 0 -> 3264 bytes
| |  .../PA1/survey/image/Lifeat/invite_friend.png    | Bin 0 -> 12648 bytes
| |  .../PA1/survey/image/Lifeat/media_button.png     | Bin 0 -> 1637 bytes
| |  .../PA1/survey/image/Lifeat/media_video.png      | Bin 0 -> 119130 bytes
| |  .../PA1/survey/image/Lifeat/media_window.png     | Bin 0 -> 28615 bytes
| |  .../PA1/survey/image/Lifeat/notes_button.png     | Bin 0 -> 1709 bytes
| |  .../PA1/survey/image/Lifeat/notes_create.png     | Bin 0 -> 10751 bytes
| |  .../PA1/survey/image/Lifeat/notes_window.png     | Bin 0 -> 8948 bytes
| |  .../PA1/survey/image/Lifeat/plan_mode_screen.png | Bin 0 -> 23608 bytes
| |  .../PA1/survey/image/Lifeat/plan_project.png     | Bin 0 -> 17901 bytes
| |  .../PA1/survey/image/Lifeat/project_create.png   | Bin 0 -> 21159 bytes
| |  .../PA1/survey/image/Lifeat/project_edit.png     | Bin 0 -> 10461 bytes
| |  .../PA1/survey/image/Lifeat/project_manager.png  | Bin 0 -> 21115 bytes
| |  .../PA1/survey/image/Lifeat/sound_button.png     | Bin 0 -> 1822 bytes
| |  .../PA1/survey/image/Lifeat/sound_window.png     | Bin 0 -> 39190 bytes
| |  .../PA1/survey/image/Lifeat/space_button.png     | Bin 0 -> 2361 bytes
| |  .../PA1/survey/image/Lifeat/space_favorite.png   | Bin 0 -> 355928 bytes
| |  .../survey/image/Lifeat/space_favorite_list.png  | Bin 0 -> 18982 bytes
| |  .../PA1/survey/image/Lifeat/space_search.png     | Bin 0 -> 413398 bytes
| |  .../PA1/survey/image/Lifeat/space_window.png     | Bin 0 -> 372873 bytes
| |  .../PA1/survey/image/Lifeat/task_button.png      | Bin 0 -> 1384 bytes
| |  .../PA1/survey/image/Lifeat/task_create.png      | Bin 0 -> 9233 bytes
| |  .../PA1/survey/image/Lifeat/task_edit.png        | Bin 0 -> 12507 bytes
| |  .../PA1/survey/image/Lifeat/task_info1.png       | Bin 0 -> 16981 bytes
| |  .../PA1/survey/image/Lifeat/task_info2.png       | Bin 0 -> 17532 bytes
| |  .../PA1/survey/image/Lifeat/task_schedule.png    | Bin 0 -> 11137 bytes
| |  .../PA1/survey/image/Lifeat/task_window.png      | Bin 0 -> 7607 bytes
| |  .../PA1/survey/image/Lifeat/timer_button.png     | Bin 0 -> 1706 bytes
| |  .../PA1/survey/image/Lifeat/timer_group.png      | Bin 0 -> 10418 bytes
| |  .../PA1/survey/image/Lifeat/timer_personal.png   | Bin 0 -> 10241 bytes
| |  .../PA1/survey/image/Lifeat/timer_task.png       | Bin 0 -> 8268 bytes
| |  .../PA1/survey/image/Lifeat/timer_task_play.png  | Bin 0 -> 65360 bytes
| |  .../PA1/survey/image/Lifeat/video_call.png       | Bin 0 -> 193776 bytes
| |  docs/requirements/PA1/survey/survey.md           | 226 +++++++++++++++++++
| |  38 files changed, 226 insertions(+)
| |   
* |   commit 17a0be02a9257bfabaa5e9b43464e55f338fe98b
|\ \  Merge: 065819c d194c51
| | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | Date:   Fri Oct 16 07:59:34 2026 +0700
| | | 
| | |     Merge pull request #8 from RoundFloor/docs/PA1/screenshot
| | |     
| | |     docs(PA1): Add screenshot for PA1
| | | 
| * | commit d194c51f4acefa70b9defe3ec803c60f914a179a
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Thu Oct 15 23:29:21 2026 +0700
| | | 
| | |     docs(PA1): Add screenshot for PA1
| | | 
| | |  .../screenshot/AI_coding accounts/23125026.png   | Bin 0 -> 169067 bytes
| | |  .../screenshot/AI_coding accounts/24125025.png   | Bin 0 -> 272385 bytes
| | |  .../screenshot/AI_coding accounts/24125048.png   | Bin 0 -> 122823 bytes
| | |  .../screenshot/AI_coding accounts/24125100.png   | Bin 0 -> 104635 bytes
| | |  .../PA1/screenshot/jira_screenshot.jpeg          | Bin 0 -> 73736 bytes
| | |  5 files changed, 0 insertions(+), 0 deletions(-)
| | |   
* | |   commit 065819cf69a690c8c5f99f56f6959c75c653ed5d
|\ \ \  Merge: b3c76f9 e5e4279
| | | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | | Date:   Fri Oct 16 07:56:33 2026 +0700
| | | | 
| | | |     Merge pull request #6 from RoundFloor/docs/PA1/weekly_report
| | | |     
| | | |     docs: Add Sprint 1 weekly report
| | | | 
| * | | commit e5e42795a20c6e9dfffb3ba8887a1236bf9128ca
| |/ /  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | |   Date:   Thu Oct 15 23:11:09 2026 +0700
| | |   
| | |       docs: Add Sprint 1 weekly report
| | |   
| | |    .../weekly_report/images/week1_jira_task.jpeg | Bin 0 -> 97267 bytes
| | |    .../weekly_report/images/week2_jira_task.jpeg | Bin 0 -> 117716 bytes
| | |    .../PA1/weekly_report/weekly_report1.md       | 107 ++++++++++++++++
| | |    .../PA1/weekly_report/weekly_report2.md       | 116 ++++++++++++++++++
| | |    4 files changed, 223 insertions(+)
| | |   
* | |   commit b3c76f99327c9863119a8656c36f8f04a255061b
|\ \ \  Merge: 281cd07 8af9c3a
| | | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | | Date:   Fri Oct 16 07:50:01 2026 +0700
| | | | 
| | | |     Merge pull request #5 from RoundFloor/PA1/contract
| | | |     
| | | |     Pa1/contract
| | | | 
| * | | commit 8af9c3a1c4441e6488c5504363bd6d4d791c0b33
| | |/  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| |/|   Date:   Thu Oct 15 21:52:00 2026 +0700
| | |   
| | |       docs: Review and edit Team Contract
| | |   
| | |    docs/requirements/PA1/contract.md | 80 ++++++++++---------------------
| | |    1 file changed, 26 insertions(+), 54 deletions(-)
| | | 
| * | commit 97da91a8def3f41e9cbe80756ca68a4a492a738a
| | | Author: Tuan <tuan06nbk@gmail.com>
| | | Date:   Fri Oct 9 10:38:45 2026 +0700
| | | 
| | |     modify: Review and assign team role and some changes
| | | 
| | |  docs/requirements/PA1/contract.md | 13 +++++++------
| | |  1 file changed, 7 insertions(+), 6 deletions(-)
| | | 
| * | commit 46b28a651fb835aae3f4ad7bb10f40885484d126
| |/  Author: Tuan <tuan06nbk@gmail.com>
| |   Date:   Fri Oct 9 10:12:31 2026 +0700
| |   
| |       add: Contract for PA1
| |   
| |    docs/requirements/PA1/contract.md | 259 ++++++++++++++++++++++++++++++++
| |    1 file changed, 259 insertions(+)
| |   
* |   commit 281cd07341a07ab262b74d987b85abbefa36f1bf
|\ \  Merge: be1f0c2 e6b8cf8
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Thu Oct 15 23:29:07 2026 +0700
| | | 
| | |     Merge remote-tracking branch 'origin/PA1/feature-others' into dev
| | | 
| * | commit e6b8cf895a7f1bf75003ab68919d63bbb04af057
| |/  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| |   Date:   Tue Oct 13 09:15:08 2026 +0700
| |   
| |       add: document of introduction, target users and ai feature
| |   
| |    docs/requirements/PA1/features.md               | 31 +++++++++++++++++++
| |    docs/requirements/PA1/features/0-title.md       |  1 +
| |    .../requirements/PA1/features/1-introduction.md | 10 ++++++
| |    .../PA1/features/3-targetuser-platform.md       |  9 ++++++
| |    docs/requirements/PA1/features/5-ai-feature.md  | 10 ++++++
| |    5 files changed, 61 insertions(+)
| |   
* |   commit be1f0c2f7e63a3cf02f879f9856cc32e2bc2517e
|\ \  Merge: affe9a2 0697458
| |/  Author: Nah <huynguyenlequoc13@gmail.com>
|/|   Date:   Thu Oct 15 23:26:33 2026 +0700
| |   
| |       Merge pull request #3 from RoundFloor/PA1/feature-key
| |       
| |       Pa1/feature key
| | 
| * commit 06974583dd621e8d0c482905b1f732c5d3f7c974
| | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | Date:   Tue Oct 13 22:18:36 2026 +0700
| | 
| |     add: document of key features
| | 
| |  docs/requirements/PA1/features.md                |  1 +
| |  docs/requirements/PA1/features/4-key-features.md | 31 ++++++++++++++++++++
| |  2 files changed, 32 insertions(+)
| | 
| * commit 56843af1899e7c27479e3ce88eb89120aeb7b49b
|/  Author: KanbeMatt <khanhbinh08062006@gmail.com>
|   Date:   Tue Oct 13 09:19:31 2026 +0700
|   
|       add: initial key features
|   
|    docs/requirements/PA1/features/4-key-features.md | 0
|    1 file changed, 0 insertions(+), 0 deletions(-)
|   
| * commit 9fd798cdb0f5360ef300b527c333f68deb943ab0
|/  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
|   Date:   Tue Oct 13 23:12:59 2026 +0700
|   
|       add: document for selection of backend platform
|   
|    docs/requirements/backend-platform-selection.md  | 937 +++++++++++++++++++
|    .../1-backend-platform-selection.md              | 461 +++++++++
|    .../2-backend-comparision.md                     | 477 ++++++++++
|    3 files changed, 1875 insertions(+)
| 
* commit affe9a2472dad57b8974aeb4c45b2b288ebf4d9b
| Author: Wanderer2414 <nlqhuy2414@apcs.fitus.edu.vn>
| Date:   Thu Oct 8 12:58:27 2026 +0700
| 
|     add: initial docs
| 
|  .vscode/tasks.json                                | 22 +++++++++++++++++++++
|  docs/requirements/proposal.md                     |  4 ++++
|  docs/requirements/proposal/1-overview.md          |  0
|  docs/requirements/proposal/2-userstory.md         |  0
|  .../proposal/3-functional-requirement.md          |  0
|  .../proposal/4-nonfunctional-requirement.md       |  0
|  6 files changed, 26 insertions(+)
| 
* commit 13b0b1c3e96246d7e65bcf0e23f0dadd889120ba
| Author: Wanderer2414 <nlqhuy2414@apcs.fitus.edu.vn>
| Date:   Tue Oct 6 18:59:53 2026 +0700
| 
|     add: frontend, backend, database modules
| 
|  .gitmodules  | 12 ++++++++++++
|  src/backend  |  1 +
|  src/database |  1 +
|  src/frontend |  1 +
|  4 files changed, 15 insertions(+)
| 
* commit f7268870c512fb057fdbd20ea5aa29217cdab064
  Author: Nah <huynguyenlequoc13@gmail.com>
  Date:   Tue Oct 6 06:30:07 2026 +0700
  
      Initial commit
  
   LICENSE | 373 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   1 file changed, 373 insertions(+)
```

# Studitopia-frontend:
```
* commit 63f6bc8901919680a830a4815a35b9adee11e439

| Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| Date:   Sat Oct 31 16:17:22 2026 +0700
| 
|     add: render auth layout
| 
|  src/app/layouts/auth/AuthLayout.css      | 114 +++++++++++++++++++++++++++++
|  src/app/layouts/auth/AuthLayout.tsx      |  48 ++++++++++++
|  src/pages/login/LoginPage.tsx            |   6 ++
|  src/shared/assets/image/sparkles.svg     |   3 +
|  src/shared/assets/image/star.svg         |  10 +++
|  src/shared/assets/image/study-poster.svg |  21 ++++++
|  6 files changed, 202 insertions(+)
|   
| * commit de7c6127e01be48c9e445ff1956c8f98fdc8d044
|/  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
|   Date:   Fri Oct 30 18:35:00 2026 +0700
|   
|       add: login and register api
|   
|    src/app/providers/query/index.ts                 |   2 +-
|    ...Provider.test.tsx => query-provider.test.tsx} |   2 +-
|    .../{QueryProvider.tsx => query-provider.tsx}    |   0
|    src/app/providers/router/index.ts                |   4 +-
|    ...{router.test.tsx => router-provider.test.tsx} |   2 +-
|    .../router/{router.tsx => router-provider.tsx}   |  28 +++--
|    src/entities/session/token-store.ts              |  19 ++++
|    src/entities/session/types.ts                    |   7 ++
|    src/features/authentication/login/login.ts       |  24 +++++
|    src/features/authentication/login/type.ts        |  11 ++
|    src/features/authentication/login/use-login.ts   |  15 +++
|    src/features/authentication/register/register.ts |  18 ++++
|    src/features/authentication/register/type.ts     |   8 ++
|    .../authentication/register/use-register.ts      |  14 +++
|    src/shared/api/client.ts                         | 101 ++++++++++++++++++-
|    src/shared/api/error.ts                          |  32 ++++++
|    16 files changed, 262 insertions(+), 25 deletions(-)
| 
* commit c07045a9740b1f848400acb926f20d20391b2f8b
| Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| Date:   Thu Oct 29 10:35:27 2026 +0700
| 
|     add: Common UI component
| 
|  index.html                                        |   2 +-
|  package-lock.json                                 |  84 ++++++++-
|  package.json                                      |   4 +-
|  src/app/App.test.tsx                              |  11 ++
|  src/app/App.tsx                                   |  11 +-
|  src/app/index.css                                 | 191 +++++++++++---------
|  src/app/main.test.tsx                             |  51 ++++++
|  src/app/main.tsx                                  |  10 +-
|  src/app/providers/query/QueryProvider.test.tsx    |  51 ++++++
|  src/app/providers/query/QueryProvider.tsx         |  23 +++
|  src/app/providers/query/index.ts                  |   1 +
|  src/app/providers/router/index.ts                 |   2 +
|  src/app/providers/router/router.test.tsx          |  15 ++
|  src/app/providers/router/router.tsx               |  33 ++++
|  src/pages/home/HomePage.tsx                       |  23 +++
|  src/pages/route_error/RouteErrorPage.tsx          |  24 +++
|  src/shared/api/client.ts                          |  29 +++
|  src/shared/api/index.ts                           |   1 +
|  src/shared/assets/icon/camera.svg                 |   3 +
|  src/shared/assets/icon/chat.svg                   |   3 +
|  src/shared/assets/icon/community.svg              |   3 +
|  src/shared/assets/icon/error.svg                  |   3 +
|  src/shared/assets/icon/friends.svg                |   3 +
|  src/shared/assets/icon/hide.svg                   |   3 +
|  src/shared/assets/icon/house.svg                  |   3 +
|  src/shared/assets/icon/library.svg                |   3 +
|  src/shared/assets/icon/lock.svg                   |   3 +
|  src/shared/assets/icon/mic.svg                    |   3 +
|  src/shared/assets/icon/profile.svg                |   3 +
|  src/shared/assets/icon/rooms.svg                  |   3 +
|  src/shared/assets/icon/screen-share.svg           |   3 +
|  src/shared/assets/icon/search.svg                 |   3 +
|  src/shared/assets/icon/settings.svg               |   3 +
|  src/shared/assets/icon/success.svg                |   3 +
|  src/shared/assets/icon/tick.svg                   |   3 +
|  src/shared/assets/icon/timer.svg                  |   3 +
|  src/shared/assets/icon/unhide.svg                 |   3 +
|  src/shared/assets/icon/upload.svg                 |   3 +
|  src/shared/assets/icon/white_board.svg            |   3 +
|  src/shared/assets/image/logo.svg                  |  18 ++
|  src/shared/ui/button/Button.module.css            |  49 +++++
|  src/shared/ui/button/Button.tsx                   |  30 +++
|  src/shared/ui/button/index.ts                     |   1 +
|  src/shared/ui/input/Input.module.css              |  85 +++++++++
|  src/shared/ui/input/Input.tsx                     |  88 +++++++++
|  src/shared/ui/input/index.ts                      |   1 +
|  src/shared/ui/select_card/SelectCard.module.css   |  30 +++
|  src/shared/ui/select_card/SelectCard.tsx          |  34 ++++
|  src/shared/ui/select_card/index.ts                |   1 +
|  src/shared/ui/tick_box/TickBox.module.css         |  25 +++
|  src/shared/ui/tick_box/TickBox.tsx                |  31 ++++
|  src/shared/ui/tick_box/index.ts                   |   1 +
|  .../ui/toggle_switch/ToggleSwitch.module.css      |  40 ++++
|  src/shared/ui/toggle_switch/ToggleSwitch.tsx      |  31 ++++
|  src/shared/ui/toggle_switch/index.ts              |   1 +
|  vite.config.ts                                    |  11 +-
|  56 files changed, 1003 insertions(+), 103 deletions(-)
| 
* commit 14e2b1ffbafa7fcd0805703b123937aaf9579f17
| Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| Date:   Sun Oct 25 14:37:54 2026 +0700
| 
|     fix: include missing project files
| 
|  .specify/memory/constitution.md |  135 +----
|  package-lock.json               | 1212 ++++++++++++++++++++++++++++++++++---
|  package.json                    |   12 +-
|  public/favicon.svg              |    1 -
|  public/icons.svg                |   24 -
|  src/App.css                     |  184 ------
|  src/App.tsx                     |  122 ----
|  src/app/App.tsx                 |   12 +
|  src/{ => app}/index.css         |    0
|  src/{ => app}/main.tsx          |    0
|  src/assets/hero.png             |  Bin 13057 -> 0 bytes
|  src/assets/react.svg            |    1 -
|  src/assets/vite.svg             |    1 -
|  src/test/setup.ts               |    7 +
|  vite.config.ts                  |   11 +-
|  15 files changed, 1194 insertions(+), 528 deletions(-)
| 
* commit 98cfbe0ad79bdb5f5203a428e75ee79845f6057a
| Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| Date:   Sun Oct 25 14:29:30 2026 +0700
| 
|     add: Refactor structure and setup testing
| 
|  docs/architecture/api-catalog.md           | 0
|  docs/architecture/component-catalog.md     | 0
|  docs/architecture/frontend-architecture.md | 0
|  3 files changed, 0 insertions(+), 0 deletions(-)
|   
| * commit 4e53b07bdcdf65c93d247580e8c8091d740aecf6
|/  Author: wanderer2414 <huynguyenlequoc13@gmail.com>
|   Date:   Sun Oct 25 13:10:16 2026 +0700
|   
|       update: remove base path because of proxy changing
|   
|    vite.config.ts | 3 +--
|    1 file changed, 1 insertion(+), 2 deletions(-)
| 
* commit 3356b2988e617e3343146db091d16e91ca176a58
| Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| Date:   Thu Oct 22 12:33:25 2026 +0700
| 
|     add: Specify the project architecture approach and the naming conventions
| 
|  .specify/memory/constitution.md | 190 +++++++++++++++++++++++++++++---------
|  1 file changed, 145 insertions(+), 45 deletions(-)
|   
*   commit 2b846585213f5e7d6350c9169ac3be3fbdac7532
|\  Merge: bf789a3 8dccc65
| | Author: Nah <huynguyenlequoc13@gmail.com>
| | Date:   Tue Oct 20 13:28:41 2026 +0700
| | 
| |     Merge pull request #2 from RoundFloor/fix/https-convert
| |     
| |     hotfox: remove redundant backslash
| | 
| * commit 8dccc65372ec1530aa10db037fdbf564d0c40363
| | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Tue Oct 20 13:27:18 2026 +0700
| | 
| |     hotfox: remove redundant backslash
| | 
| |  vite.config.ts | 2 +-
| |  1 file changed, 1 insertion(+), 1 deletion(-)
| | 
* | commit bf789a37dd5cc3bb6603466238a5cf7cd21d7619
|\| Merge: c8d3315 650a335
| | Author: Nah <huynguyenlequoc13@gmail.com>
| | Date:   Tue Oct 20 13:19:54 2026 +0700
| | 
| |     Merge pull request #1 from RoundFloor/fix/https-convert
| |     
| |     Fix/https convert
| | 
| * commit 650a335debaa2f407f323e94c8d1bd28bae4c587
| | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Tue Oct 20 10:24:56 2026 +0700
| | 
| |     update: base root of web
| | 
| |  vite.config.ts | 3 ++-
| |  1 file changed, 2 insertions(+), 1 deletion(-)
| | 
| * commit c14980231bcb851eb0e5f3c185bfcf63d4419271
|/  Author: wanderer2414 <huynguyenlequoc13@gmail.com>
|   Date:   Tue Oct 20 09:56:48 2026 +0700
|   
|       update: adapt http to https by add tls certs
|   
|    vite.config.ts | 7 ++++++-
|    1 file changed, 6 insertions(+), 1 deletion(-)
| 
* commit c8d3315bcfe84b46d6ad2c8e015efd9cca3800fb
| Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| Date:   Mon Oct 19 15:53:05 2026 +0700
| 
|     chore: change server port
| 
|  vite.config.ts | 4 ++++
|  1 file changed, 4 insertions(+)
| 
* commit e068d5e909e831a9ced931959963cbaedeac1fbb
| Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| Date:   Mon Oct 19 11:26:17 2026 +0700
| 
|     feat: initialize speckit and constitution
| 
|  .agents/skills/speckit-analyze/SKILL.md       | 259 +++++++
|  .agents/skills/speckit-checklist/SKILL.md     | 383 ++++++++++
|  .agents/skills/speckit-clarify/SKILL.md       | 291 ++++++++
|  .agents/skills/speckit-constitution/SKILL.md  | 179 +++++
|  .agents/skills/speckit-converge/SKILL.md      | 283 +++++++
|  .agents/skills/speckit-implement/SKILL.md     | 226 ++++++
|  .agents/skills/speckit-plan/SKILL.md          | 166 +++++
|  .agents/skills/speckit-specify/SKILL.md       | 345 +++++++++
|  .agents/skills/speckit-tasks/SKILL.md         | 215 ++++++
|  .agents/skills/speckit-taskstoissues/SKILL.md | 117 +++
|  .specify/.gitignore                           |  14 +
|  .specify/init-options.json                    |  10 +
|  .specify/integration.json                     |  15 +
|  .specify/integrations/agy.manifest.json       |  17 +
|  .specify/integrations/speckit.manifest.json   |  19 +
|  .specify/memory/.constitution-template.json   |   4 +
|  .specify/memory/constitution.md               | 206 ++++++
|  .specify/scripts/bash/check-prerequisites.sh  | 243 ++++++
|  .specify/scripts/bash/common.sh               | 942 ++++++++++++++++++++++++
|  .specify/scripts/bash/create-new-feature.sh   | 504 +++++++++++++
|  .specify/scripts/bash/resolve-template.sh     |  57 ++
|  .specify/scripts/bash/setup-plan.sh           |  85 +++
|  .specify/scripts/bash/setup-tasks.sh          |  94 +++
|  .specify/templates/checklist-template.md      |  45 ++
|  .specify/templates/constitution-template.md   |  50 ++
|  .specify/templates/plan-template.md           | 113 +++
|  .specify/templates/spec-template.md           | 131 ++++
|  .specify/templates/tasks-template.md          | 252 +++++++
|  .specify/workflows/speckit/workflow.yml       |  74 ++
|  .specify/workflows/workflow-registry.json     |  13 +
|  30 files changed, 5352 insertions(+)
| 
* commit 28a5a313df96d257d17de6a58f5d07acf5c0a3a2
  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
  Date:   Tue Oct 6 08:00:18 2026 +0700
  
      Initial commit
  
   .gitignore           |   24 +
   README.md            |   78 ++
   eslint.config.js     |   22 +
   index.html           |   13 +
   package-lock.json    | 2851 ++++++++++++++++++++++++++++++++++++++++++++++++
   package.json         |   34 +
   public/favicon.svg   |    1 +
   public/icons.svg     |   24 +
   src/App.css          |  184 ++++
   src/App.tsx          |  122 +++
   src/assets/hero.png  |  Bin 0 -> 13057 bytes
   src/assets/react.svg |    1 +
   src/assets/vite.svg  |    1 +
   src/index.css        |  111 ++
   src/main.tsx         |   10 +
   tsconfig.app.json    |   26 +
   tsconfig.json        |    7 +
   tsconfig.node.json   |   23 +
   vite.config.ts       |   11 +
   19 files changed, 3543 insertions(+)
```
# Studitopia-backend:
```
* commit 8ca3f79f17024223aa7a12efb3522258b51a823d
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Sat Oct 31 14:56:25 2026 +0700
| 
|     refactor: update params decorator and response interceptors
| 
|  package-lock.json                                 |  3 +-
|  package.json                                      |  3 +-
|  src/common/exception-factory.ts                   |  1 -
|  src/common/interceptor.ts                         | 29 ++++++++++
|  src/common/response-code/code.config.ts           |  4 ++
|  src/common/response.dto.ts                        | 30 +++++++++++
|  src/main.ts                                       |  4 ++
|  .../__tests__/auth.controller.spec.ts             | 11 +++-
|  src/packages/authentication/auth.controller.ts    | 59 +++++++++++++++++----
|  src/packages/authentication/auth.service.ts       | 23 +++++++-
|  .../decorartors/displayname.decorator.ts          |  3 +-
|  .../authentication/decorartors/email.decorator.ts |  3 +-
|  .../decorartors/password.decorator.ts             |  3 +-
|  .../decorartors/username.decorator.ts             |  3 +-
|  src/packages/authentication/dto/login.dto.ts      | 17 ++----
|  src/packages/postgres/pg.service.ts               | 39 ++++++++------
|  .../security-generation/decorators/sg.mock.ts     | 12 +++++
|  .../decorators/token-bearer.decorators.ts         | 30 +++++++++--
|  src/packages/security-generation/sg.config.ts     |  6 +++
|  src/packages/security-generation/sg.module.ts     |  9 ++--
|  src/packages/security-generation/sg.service.ts    | 26 ++++-----
|  21 files changed, 245 insertions(+), 73 deletions(-)
| 
* commit 4f5c3216dd04f7eee27acc28bc9eca4251c601e1
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Fri Oct 30 18:47:17 2026 +0700
| 
|     feat: embed otp into authentication controller, base email sender
| 
|  src/common/response-code/code.config.ts           |   5 +-
|  src/packages/authentication/auth.controller.ts    |  29 ++++-
|  src/packages/authentication/auth.module.ts        |   3 +-
|  src/packages/authentication/auth.service.ts       |  19 +++
|  .../authentication/dto/otp-response.dto.ts        |  14 ++
|  .../email-sender/config/email-sender.config.ts    |  11 --
|  src/packages/email-sender/email-sender.config.ts  |   1 +
|  src/packages/email-sender/email-sender.service.ts | 137 +++++---------------
|  src/packages/postgres/pg.service.ts               |  59 ++-------
|  .../__test__/sg.service.spec.ts                   |  11 +-
|  .../decorators/token-bearer.decorators.ts         |  11 ++
|  .../security-generation/dto/key-response.dto.ts   |  10 +-
|  src/packages/security-generation/sg.guard.ts      |   8 ++
|  src/packages/security-generation/sg.service.ts    |  56 +++++---
|  14 files changed, 176 insertions(+), 198 deletions(-)
|   
*   commit 006f1633698adae22e02037112d2e4a7cbe1bc0a
|\  Merge: 11872d1 1d7b210
| | Author: Nah <huynguyenlequoc13@gmail.com>
| | Date:   Fri Oct 30 11:12:00 2026 +0700
| | 
| |     Merge pull request #3 from RoundFloor/feature/otp
| |     
| |     feature: otp, refresh token and access token generation
| |   
| *   commit 1d7b2104568d2497cf0caff053bdd5076ca3046d
| |\  Merge: e7ce6fb 11872d1
| |/  Author: Nah <huynguyenlequoc13@gmail.com>
|/|   Date:   Fri Oct 30 11:11:24 2026 +0700
| |   
| |       Merge branch 'dev' into feature/otp
| |   
* |   commit 11872d1ba1b37f1c073c65d7ba086d9ca049c523
|\ \  Merge: 3b82091 8cc5bfb
| | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | Date:   Fri Oct 30 11:06:33 2026 +0700
| | | 
| | |     Merge pull request #2 from RoundFloor/feature/api/register
| | |     
| | |     Feature/api/register
| | | 
| * | commit 8cc5bfb0ddce6f6e2203667b4b6ba0a6af73a005
| | | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Fri Oct 30 10:50:40 2026 +0700
| | | 
| | |     refactor: temporarily remove validation api and use decorator
| | | 
| | |  package-lock.json                               |  40 +++++
| | |  package.json                                    |   2 +
| | |  src/common/dto/response.dto.ts                  |  26 ---
| | |  src/common/exception-factory.ts                 |  10 ++
| | |  .../interceptors/transform.interceptor.ts       |  17 --
| | |  src/main.ts                                     |  10 +-
| | |  .../__tests__/auth.controller.spec.ts           | 163 +++---------------
| | |  .../__tests__/auth.service.mock.ts              |  19 --
| | |  src/packages/authentication/auth.controller.ts  |  66 ++-----
| | |  src/packages/authentication/auth.service.ts     |  58 ++-----
| | |  .../decorartors/displayname.decorator.ts        |  25 +++
| | |  .../decorartors/email.decorator.ts              |  25 +++
| | |  .../decorartors/password.decorator.ts           |  31 ++++
| | |  .../decorartors/username.decorator.ts           |  25 +++
| | |  .../authentication/dto/refresh-token.dto.ts     |  13 +-
| | |  src/packages/authentication/dto/register.dto.ts |  22 ++-
| | |  src/packages/postgres/__tests__/pg.testcases.ts |   1 +
| | |  tsconfig.build.json                             |   7 +-
| | |  18 files changed, 241 insertions(+), 319 deletions(-)
| | | 
| * | commit 5b977ae2784b28994629236ac52fe382074bcb5d
|/ /  Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| |   Date:   Thu Oct 29 12:50:21 2026 +0700
| |   
| |       upadte: change validate api, merge all field of errorcode
| |   
| |    .../authentication/__tests__/auth.controller.spec.ts  | 12 ++++++------
| |    src/packages/authentication/auth.controller.ts        | 13 ++++++-------
| |    src/packages/authentication/dto/validate.dto.ts       |  8 --------
| |    3 files changed, 12 insertions(+), 21 deletions(-)
| | 
| * commit e7ce6fbe3105fe5bdf875f9f1f42b835d7834016
|/  Author: wanderer2414 <huynguyenlequoc13@gmail.com>
|   Date:   Thu Oct 29 19:33:44 2026 +0700
|   
|       feature: otp, refresh token and access token generation
|   
|    package-lock.json                                | 128 +++++++++++++++++++
|    package.json                                     |   2 +
|    src/common/response-code/code.config.ts          |   6 +-
|    .../postgres/__tests__/pg.register.testcases.ts  |  40 +++---
|    .../postgres/__tests__/pg.service.mock.ts        |   4 +-
|    src/packages/postgres/__tests__/pg.testcases.ts  |  28 ++--
|    src/packages/postgres/__tests__/pool.mock.ts     |   2 +-
|    src/packages/postgres/dto/SQLSTATE.dto.ts        |   2 +-
|    src/packages/postgres/pg.model.ts                |  40 ------
|    src/packages/postgres/pg.service.ts              |  10 +-
|    .../__test__/sg.service.spec.ts                  |  55 ++++++++
|    .../security-generation/dto/key-response.dto.ts  |  16 +++
|    .../security-generation/dto/secret.dto.ts        |  10 ++
|    src/packages/security-generation/sg.config.ts    |  12 ++
|    src/packages/security-generation/sg.module.ts    |  15 +++
|    src/packages/security-generation/sg.service.ts   |  87 +++++++++++++
|    test/auth-registration.e2e-spec.ts               |   4 +-
|    17 files changed, 373 insertions(+), 88 deletions(-)
|   
*   commit 3b82091e036af17418d1cb4b9ce0f6f03ed118f8
|\  Merge: e563101 921305c
| | Author: Nah <huynguyenlequoc13@gmail.com>
| | Date:   Thu Oct 29 12:34:05 2026 +0700
| | 
| |     Merge pull request #1 from RoundFloor/feature/api/register
| |     
| |     feat: register api (validate & register), register unit test and raw …
| | 
| * commit 921305c155ab2d44d7ea4278246e4cf056e0e1ec
|/  Author: wanderer2414 <huynguyenlequoc13@gmail.com>
|   Date:   Thu Oct 29 12:19:59 2026 +0700
|   
|       feat: register api (validate & register), register unit test and raw function service of others authentication f
|   
|    .agents/skills/speckit-analyze/SKILL.md          |  259 ----
|    .agents/skills/speckit-checklist/SKILL.md        |  383 ------
|    .agents/skills/speckit-clarify/SKILL.md          |  291 ----
|    .agents/skills/speckit-constitution/SKILL.md     |  179 ---
|    .agents/skills/speckit-converge/SKILL.md         |  283 ----
|    .agents/skills/speckit-implement/SKILL.md        |  226 ----
|    .agents/skills/speckit-plan/SKILL.md             |  166 ---
|    .agents/skills/speckit-specify/SKILL.md          |  345 -----
|    .agents/skills/speckit-tasks/SKILL.md            |  215 ---
|    .agents/skills/speckit-taskstoissues/SKILL.md    |  117 --
|    .gitignore                                       |    3 +-
|    .prettierignore                                  |    5 +
|    .specify/init-options.json                       |    5 +-
|    .specify/integration.json                        |   10 +-
|    .specify/integrations/agy.manifest.json          |   17 -
|    .specify/integrations/opencode.manifest.json     |   17 +
|    .specify/integrations/speckit.manifest.json      |   10 +-
|    .specify/scripts/bash/check-prerequisites.sh     |    8 +-
|    .specify/scripts/bash/common.sh                  |    0
|    .specify/scripts/bash/create-new-feature.sh      |    0
|    .specify/scripts/bash/resolve-template.sh        |    0
|    .specify/scripts/bash/setup-plan.sh              |    0
|    .specify/scripts/bash/setup-tasks.sh             |    4 +-
|    .specify/templates/checklist-template.md         |    8 +-
|    .specify/templates/plan-template.md              |   14 +-
|    .specify/templates/tasks-template.md             |    2 +-
|    package-lock.json                                | 1241 ++++++++++--------
|    package.json                                     |    6 +-
|    .../checklists/requirements.md                   |   35 +
|    .../contracts/auth-registration.openapi.yaml     |  284 ++++
|    specs/001-user-registration/data-model.md        |  158 +++
|    specs/001-user-registration/plan.md              |  125 ++
|    specs/001-user-registration/quickstart.md        |  185 +++
|    specs/001-user-registration/research.md          |  121 ++
|    specs/001-user-registration/spec.md              |  131 ++
|    specs/001-user-registration/tasks.md             |  234 ++++
|    src/app.controller.spec.ts                       |   22 -
|    src/app.controller.ts                            |   12 -
|    src/app.module.ts                                |   10 +-
|    src/app.service.ts                               |    8 -
|    src/common/dto/response.dto.ts                   |   26 +
|    src/common/interceptors/transform.interceptor.ts |   17 +
|    src/common/response-code/code.config.ts          |   26 +
|    src/config/app.config.ts                         |    2 +
|    src/main.ts                                      |   16 +-
|    .../__tests__/auth.controller.spec.ts            |  196 +++
|    .../__tests__/auth.service.mock.ts               |   41 +
|    .../__tests__/auth.service.spec.ts               |  128 ++
|    .../authentication/__tests__/auth.testcase.ts    |  148 +++
|    src/packages/authentication/auth.controller.ts   |   63 +
|    src/packages/authentication/auth.module.ts       |   13 +
|    src/packages/authentication/auth.service.ts      |   61 +
|    .../authentication/config/auth.config.ts         |    7 +
|    src/packages/authentication/dto/login.dto.ts     |   16 +
|    src/packages/authentication/dto/logout.dto.ts    |   10 +
|    .../authentication/dto/recover-password.dto.ts   |   22 +
|    .../authentication/dto/refresh-token.dto.ts      |   10 +
|    src/packages/authentication/dto/register.dto.ts  |    6 +
|    src/packages/authentication/dto/validate.dto.ts  |    8 +
|    .../__tests__/email-sender.service.mock.ts       |    5 +
|    .../__tests__/email-sender.service.spec.ts       |  135 ++
|    .../email-sender/config/email-sender.config.ts   |   11 +
|    src/packages/email-sender/email-sender.module.ts |    8 +
|    .../email-sender/email-sender.service.ts         |  110 ++
|    .../email-sender/models/email-sender.model.ts    |   47 +
|    .../email-sender/models/email-template.model.ts  |   76 ++
|    .../postgres/__tests__/pg.register.testcases.ts  |  741 +++++++++++
|    .../postgres/__tests__/pg.service.mock.ts        |   65 +
|    .../postgres/__tests__/pg.service.spec.ts        |   84 ++
|    src/packages/postgres/__tests__/pg.testcases.ts  |   82 ++
|    src/packages/postgres/__tests__/pool.mock.ts     |  107 ++
|    src/packages/postgres/dto/SQLSTATE.dto.ts        |   24 +
|    src/packages/postgres/dto/response.dto.ts        |    5 +
|    src/packages/postgres/pg.config.ts               |    9 +
|    src/packages/postgres/pg.model.ts                |   40 +
|    src/packages/postgres/pg.module.ts               |    8 +
|    src/packages/postgres/pg.service.ts              |  243 ++++
|    .../__tests__/recaptcha.service.mock.ts          |   11 +
|    src/packages/recaptcha/recaptcha.module.ts       |    8 +
|    src/packages/recaptcha/recaptcha.service.ts      |    8 +
|    test/app.e2e-spec.ts                             |   29 -
|    test/auth-registration.e2e-spec.ts               |  149 +++
|    82 files changed, 4803 insertions(+), 3157 deletions(-)
| 
* commit e56310163b9436fff82963758d59f14287608212
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Thu Oct 29 10:35:03 2026 +0700
| 
|     update: more general consititution
| 
|  .specify/memory/constitution.md | 328 +++++++++++++++++++++++++++-----------
|  1 file changed, 236 insertions(+), 92 deletions(-)
| 
* commit 648a6ede9a8b5e271c2dc1d9e32b703f004744e4
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Mon Oct 26 00:17:52 2026 +0700
| 
|     update: change base url of backend because of change of proxy structure
| 
|  src/main.ts | 2 +-
|  1 file changed, 1 insertion(+), 1 deletion(-)
| 
* commit 7a4c7dcc1e54e49abe000c869772df398ec0b7f0
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Thu Oct 22 17:51:50 2026 +0700
| 
|     update: remove redundant folder structure in constitution
| 
|  .specify/memory/constitution.md | 102 ++++++++++++++++----------------------
|  1 file changed, 44 insertions(+), 58 deletions(-)
| 
* commit 81335ed568356dec8488a433106377d4bf637c4f
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Tue Oct 20 19:48:13 2026 +0700
| 
|     fix: add prefix of backend url
| 
|  src/main.ts | 1 +
|  1 file changed, 1 insertion(+)
| 
* commit d96ac90009ebd277cc9e407cd97d260551f5c5b1
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Tue Oct 20 07:48:26 2026 +0700
| 
|     update: adapt https
| 
|  src/main.ts | 7 ++++++-
|  1 file changed, 6 insertions(+), 1 deletion(-)
| 
* commit 71dc2aae8b9b67d1797906e7872cc90d310cf12a
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Mon Oct 19 11:49:13 2026 +0700
| 
|     add: constitution for backend proj
| 
|  .specify/memory/constitution.md | 172 ++++++++++++++++++++++++++++++--------
|  1 file changed, 137 insertions(+), 35 deletions(-)
| 
* commit 7c6ef4f53ec6b5b50076c3c360df87b80a66c9cb
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Tue Oct 13 23:57:48 2026 +0700
| 
|     add: initial nestjs structure and speckit
| 
|  .agents/skills/speckit-analyze/SKILL.md       |  259 +
|  .agents/skills/speckit-checklist/SKILL.md     |  383 ++
|  .agents/skills/speckit-clarify/SKILL.md       |  291 ++
|  .agents/skills/speckit-constitution/SKILL.md  |  179 +
|  .agents/skills/speckit-converge/SKILL.md      |  283 ++
|  .agents/skills/speckit-implement/SKILL.md     |  226 +
|  .agents/skills/speckit-plan/SKILL.md          |  166 +
|  .agents/skills/speckit-specify/SKILL.md       |  345 ++
|  .agents/skills/speckit-tasks/SKILL.md         |  215 +
|  .agents/skills/speckit-taskstoissues/SKILL.md |  117 +
|  .gitattributes                                |    1 +
|  .gitignore                                    |   59 +
|  .oxlintrc.json                                |   10 +
|  .prettierrc                                   |    4 +
|  .specify/.gitignore                           |   14 +
|  .specify/init-options.json                    |   10 +
|  .specify/integration.json                     |   15 +
|  .specify/integrations/agy.manifest.json       |   17 +
|  .specify/integrations/speckit.manifest.json   |   19 +
|  .specify/memory/.constitution-template.json   |    4 +
|  .specify/memory/constitution.md               |   50 +
|  .specify/scripts/bash/check-prerequisites.sh  |  243 +
|  .specify/scripts/bash/common.sh               |  942 ++++
|  .specify/scripts/bash/create-new-feature.sh   |  504 ++
|  .specify/scripts/bash/resolve-template.sh     |   57 +
|  .specify/scripts/bash/setup-plan.sh           |   85 +
|  .specify/scripts/bash/setup-tasks.sh          |   94 +
|  .specify/templates/checklist-template.md      |   45 +
|  .specify/templates/constitution-template.md   |   50 +
|  .specify/templates/plan-template.md           |  113 +
|  .specify/templates/spec-template.md           |  131 +
|  .specify/templates/tasks-template.md          |  252 +
|  .specify/workflows/speckit/workflow.yml       |   74 +
|  .specify/workflows/workflow-registry.json     |   13 +
|  README.md                                     |  124 +
|  nest-cli.json                                 |    8 +
|  package-lock.json                             | 5708 +++++++++++++++++++++++
|  package.json                                  |   49 +
|  src/app.controller.spec.ts                    |   22 +
|  src/app.controller.ts                         |   12 +
|  src/app.module.ts                             |   10 +
|  src/app.service.ts                            |    8 +
|  src/main.ts                                   |    8 +
|  test/app.e2e-spec.ts                          |   29 +
|  tsconfig.build.json                           |    8 +
|  tsconfig.json                                 |   23 +
|  vitest.config.e2e.ts                          |   10 +
|  vitest.config.ts                              |   12 +
|  48 files changed, 11301 insertions(+)
| 
* commit f3be4d9e827523ad7cad5b9dcdbb8e77093f0089
  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
  Date:   Tue Oct 6 09:10:24 2026 +0700
  
      Initial commit
  
   README.md | 0
   1 file changed, 0 insertions(+), 0 deletions(-)
```
# Studitopia-database:

* commit 52d61d4d87025d8694d7e70f955bf1a2a616d4b5
| Author: Tuan <tuan06nbk@gmail.com>
| Date:   Mon Oct 26 17:55:41 2026 +0700
| 
|     update: [planning] add mission, roadmap, and tech stack documentation
| 
|  .gitignore                    |  3 ++-
|  .specify/memory/mission.md    | 19 +++++++++++++++++++
|  .specify/memory/roadmap.md    | 39 +++++++++++++++++++++++++++++++++++++++
|  .specify/memory/tech-stack.md | 31 +++++++++++++++++++++++++++++++
|  4 files changed, 91 insertions(+), 1 deletion(-)
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

