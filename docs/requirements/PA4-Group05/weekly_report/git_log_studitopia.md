# Sprint 4 Git Log - Studitopia

Repository: `Studitopia root repository`
Command: `git log --graph --all --stat`

```text
*   commit f0e1841dd9f5b11822b0a8f2d0b90358fe4eb3d1
|\  Merge: 4c666dd eaee14e
| | Author: Unauthorized user <ntan2419@apcs.fitus.edu.vn>
| | Date:   Sat Nov 28 20:17:43 2026 +0700
| |
| |     Merge pull request #25 from RoundFloor/docs/pa4-deployment-scope
| |
| |     Docs/pa4 deployment scope
| |
| * commit eaee14ef4a0b63e1a91c803eb44657b97a693c8f
| | Author: Tuan <tuan06nbk@gmail.com>
| | Date:   Sat Nov 28 16:00:35 2026 +0700
| |
| |     docs: clarify PA4 deployment diagram scope
| |
| |  docs/analysis-and-design/deployment_diagram.md      | 6 +++---
| |  docs/requirements/PA4-Group05/deployment_diagram.md | 6 +++---
| |  2 files changed, 6 insertions(+), 6 deletions(-)
| |
| * commit 38390d5b57b0619868ed39ce730323f7e3d8dde3
| | Author: Tuan <tuan06nbk@gmail.com>
| | Date:   Sat Nov 28 15:38:03 2026 +0700
| |
| |     docs: align PA4 use cases and deployment terminology
| |
| |  docs/analysis-and-design/deployment_diagram.md       |  4 ++--
| |  docs/requirements/PA4-Group05/Changes.md             |  4 ++--
| |  docs/requirements/PA4-Group05/deployment_diagram.md  |  4 ++--
| |  .../UC-01-register-account.md                        |  2 +-
| |  .../authentication-and-account/UC-02-log-in.md       |  4 ++--
| |  .../UC-09-automatic-logout.md                        | 12 ++++++------
| |  .../UC-29-manage-friend-groups.md                    | 16 ++++++++--------
| |  7 files changed, 23 insertions(+), 23 deletions(-)
| |
* |   commit 4c666dd8b3c13a0f8a739765db9e1a255470ff8b
|\ \  Merge: 2a81dd1 ec00b71
| | | Author: Unauthorized user <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Sat Nov 28 20:03:27 2026 +0700
| | |
| | |     Merge pull request #24 from RoundFloor/docs/weekly_report
| | |
| | |     docs: add weekly report
| | |
| * | commit ec00b717aee3ac6a2f5ad597cc72616b6baf2a60
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Sat Nov 28 19:57:08 2026 +0700
| | |
| | |     docs: add weekly report
| | |
| | |  .../weekly_report/images/jira_task_screen1.png  | Bin 0 -> 203983 bytes
| | |  .../weekly_report/images/jira_task_screen2.png  | Bin 0 -> 252688 bytes
| | |  .../weekly_report/weekly_report1.md             |  43 ++++++++++++++++++
| | |  .../weekly_report/weekly_report2.md             |  42 +++++++++++++++++
| | |  4 files changed, 85 insertions(+)
| | |
* | |   commit 2a81dd16110947156bd5b1de0d5fb5a3266b290b
|\ \ \  Merge: 4b3fb35 0af8399
| | | | Author: Unauthorized user <ntan2419@apcs.fitus.edu.vn>
| | | | Date:   Sat Nov 28 20:00:36 2026 +0700
| | | |
| | | |     Merge pull request #23 from RoundFloor/docs/ai_usage_report
| | | |
| | | |     docs: add AI usage report
| | | |
| * | | commit 0af83994b3cda29f0660b36cf0bbdd05f48ece70
| | | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | | Date:   Sat Nov 28 17:16:20 2026 +0700
| | | |
| | | |     docs: add AI usage report
| | | |
| | | |  .../ai_usage_report/ai_usage_report.md        |  79 ++++++++++++++++++
| | | |  .../ai_usage_report/images/image_1.png        | Bin 0 -> 133887 bytes
| | | |  .../ai_usage_report/images/image_2.png        | Bin 0 -> 125696 bytes
| | | |  .../ai_usage_report/images/image_3.png        | Bin 0 -> 176790 bytes
| | | |  .../ai_usage_report/images/image_4.png        | Bin 0 -> 126023 bytes
| | | |  .../ai_usage_report/images/image_5.png        | Bin 0 -> 152072 bytes
| | | |  .../ai_usage_report/images/image_6.png        | Bin 0 -> 178925 bytes
| | | |  7 files changed, 79 insertions(+)
| | | |
* | | | commit 4b3fb3545b8895455877e74db721a6b71e89f715
|\| | | Merge: 403c0ac 806f68b
| | | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | | Date:   Sat Nov 28 18:11:54 2026 +0700
| | | |
| | | |     Merge remote-tracking branch 'origin/dev' into dev
| | | |
| * | | commit 806f68b3f555a0925bedb189e1f079997e75355d
| | | | Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| | | | Date:   Sat Nov 28 16:17:02 2026 +0700
| | | |
| | | |     docs: fix description in component diagram
| | | |
| | | |  docs/requirements/PA4-Group05/component_diagram.md | 10 +++++-----
| | | |  1 file changed, 5 insertions(+), 5 deletions(-)
| | | |
| * | | commit 9c7d8461f6d6f7bb6a4eb0744de12e7a9f39e21b
| | |/  Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| |/|   Date:   Sat Nov 28 16:11:49 2026 +0700
| | |
| | |       docs: fix description in system context diagram
| | |
| | |    .../PA4-Group05/component_diagram.md          |  2 +-
| | |    .../PA4-Group05/system_context_diagram.md     | 24 +++++++++----------
| | |    2 files changed, 13 insertions(+), 13 deletions(-)
| | |
* | | commit 403c0ac6b59b62bceb87caa02c9aa59916d13d9b
| | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | Date:   Sat Nov 28 18:11:34 2026 +0700
| | |
| | |     chores: rm .tex and figure file
| | |
| | |  docs/requirements/PA4-Group05/Changes.tex       |  668 -----
| | |  .../PA4-Group05/component_diagram.tex           |  357 ---
| | |  .../PA4-Group05/container_diagram.tex           |  410 ---
| | |  .../PA4-Group05/deployment_diagram.tex          |  327 ---
| | |  .../PA4-Group05/functional_requirement.tex      |  225 --
| | |  .../authentications/requirements.tex            |  466 ---
| | |  .../browse/requirements.tex                     |  260 --
| | |  .../feeds/requirements.tex                      |  214 --
| | |  .../requirements.tex                            |  439 ---
| | |  .../learning_resource_library/requirements.tex  |  315 ---
| | |  .../meeting_rooms/requirements.tex              |  524 ----
| | |  .../notifications_and_safety/requirements.tex   |  261 --
| | |  .../posts/requirements.tex                      |  483 ----
| | |  .../requirements.tex                            |  323 ---
| | |  .../suggestions_and_filters/requirements.tex    |  223 --
| | |  .../PA4-Group05/non_functional_requirement.tex  |  247 --
| | |  .../availability/requirements.tex               |  172 --
| | |  .../performance/requirements.tex                |  190 --
| | |  .../privacy/requirements.tex                    |  177 --
| | |  .../scalability/requirements.tex                |  176 --
| | |  .../security/requirements.tex                   |  180 --
| | |  .../usability/requirements.tex                  |  231 --
| | |  .../PA4-Group05/system_context_diagram.tex      |  337 ---
| | |  .../UC-01-register-account.tex                  |  582 ----
| | |  .../authentication-and-account/UC-02-log-in.tex |  547 ----
| | |  .../authentication-and-account/UC-08-logout.tex |  480 ----
| | |  .../UC-09-automatic-logout.tex                  |  486 ----
| | |  .../UC-10-recover-password.tex                  |  546 ----
| | |  .../UC-11-delete-account.tex                    |  534 ----
| | |  .../authentication-and-account/diagram.tex      | 2488 -----------------
| | |  .../figures/UC-01-register-account_1.png        |  Bin 78586 -> 0 bytes
| | |  .../figures/UC-02-log-in_1.png                  |  Bin 52711 -> 0 bytes
| | |  .../figures/UC-08-logout_1.png                  |  Bin 14142 -> 0 bytes
| | |  .../figures/UC-09-automatic-logout_1.png        |  Bin 14991 -> 0 bytes
| | |  .../figures/UC-10-recover-password_1.png        |  Bin 15974 -> 0 bytes
| | |  .../figures/UC-11-delete-account_1.png          |  Bin 14195 -> 0 bytes
| | |  .../figures/diagram_1.png                       |  Bin 45672 -> 0 bytes
| | |  .../figures/UC-01-register-account_1.png        |  Bin 78569 -> 0 bytes
| | |  .../use_cases/figures/UC-02-log-in_1.png        |  Bin 52727 -> 0 bytes
| | |  .../figures/UC-03-browse-search-forum_1.png     |  Bin 42671 -> 0 bytes
| | |  .../figures/UC-04-create-discussion-post_1.png  |  Bin 34583 -> 0 bytes
| | |  .../figures/UC-05-comment-answer_1.png          |  Bin 52102 -> 0 bytes
| | |  .../figures/UC-06-share-learning-resource_1.png |  Bin 34934 -> 0 bytes
| | |  .../figures/UC-07-join-create-study-room_1.png  |  Bin 71920 -> 0 bytes
| | |  .../use_cases/figures/UC-08-logout_1.png        |  Bin 14158 -> 0 bytes
| | |  .../figures/UC-09-automatic-logout_1.png        |  Bin 14999 -> 0 bytes
| | |  .../figures/UC-10-recover-password_1.png        |  Bin 15978 -> 0 bytes
| | |  .../figures/UC-11-delete-account_1.png          |  Bin 14168 -> 0 bytes
| | |  .../figures/UC-12-manage-profile_1.png          |  Bin 15717 -> 0 bytes
| | |  .../UC-13-set-learning-preferences_1.png        |  Bin 17051 -> 0 bytes
| | |  .../figures/UC-14-manage-privacy_1.png          |  Bin 14099 -> 0 bytes
| | |  .../figures/UC-15-create-material-post_1.png    |  Bin 16617 -> 0 bytes
| | |  .../figures/UC-16-create-functional-post_1.png  |  Bin 16822 -> 0 bytes
| | |  .../figures/UC-17-vote-posts-comments_1.png     |  Bin 16924 -> 0 bytes
| | |  .../figures/UC-18-mark-true-response_1.png      |  Bin 21888 -> 0 bytes
| | |  .../use_cases/figures/UC-19-save-post_1.png     |  Bin 15467 -> 0 bytes
| | |  .../UC-20-report-moderate-forum-content_1.png   |  Bin 32591 -> 0 bytes
| | |  .../figures/UC-21-forum-recommendations_1.png   |  Bin 17694 -> 0 bytes
| | |  .../figures/UC-22-find-learning-resources_1.png |  Bin 16993 -> 0 bytes
| | |  .../UC-23-resource-recommendations_1.png        |  Bin 17751 -> 0 bytes
| | |  .../figures/UC-24-view-my-storage_1.png         |  Bin 16325 -> 0 bytes
| | |  .../UC-25-delete-published-resource_1.png       |  Bin 19021 -> 0 bytes
| | |  .../figures/UC-26-find-study-partner_1.png      |  Bin 16894 -> 0 bytes
| | |  .../figures/UC-27-send-friend-request_1.png     |  Bin 35753 -> 0 bytes
| | |  .../figures/UC-28-manage-friend-requests_1.png  |  Bin 34739 -> 0 bytes
| | |  .../figures/UC-29-manage-friend-groups_1.png    |  Bin 44246 -> 0 bytes
| | |  .../figures/UC-30-shared-study-tools_1.png      |  Bin 24730 -> 0 bytes
| | |  .../figures/UC-31-request-learning-help_1.png   |  Bin 32441 -> 0 bytes
| | |  .../figures/UC-32-receive-notifications_1.png   |  Bin 23191 -> 0 bytes
| | |  .../figures/UC-33-control-communication_1.png   |  Bin 14686 -> 0 bytes
| | |  .../UC-34-report-inappropriate-behavior_1.png   |  Bin 22973 -> 0 bytes
| | |  .../PA4-Group05/use_cases/figures/diagram_1.png |  Bin 43173 -> 0 bytes
| | |  .../forum-interaction/UC-05-comment-answer.tex  |  569 ----
| | |  .../UC-17-vote-posts-comments.tex               |  547 ----
| | |  .../UC-18-mark-true-response.tex                |  541 ----
| | |  .../forum-interaction/UC-19-save-post.tex       |  522 ----
| | |  .../UC-20-report-moderate-forum-content.tex     |  570 ----
| | |  .../use_cases/forum-interaction/diagram.tex     | 2204 ---------------
| | |  .../figures/UC-05-comment-answer_1.png          |  Bin 52109 -> 0 bytes
| | |  .../figures/UC-17-vote-posts-comments_1.png     |  Bin 16927 -> 0 bytes
| | |  .../figures/UC-18-mark-true-response_1.png      |  Bin 21848 -> 0 bytes
| | |  .../figures/UC-19-save-post_1.png               |  Bin 15490 -> 0 bytes
| | |  .../UC-20-report-moderate-forum-content_1.png   |  Bin 32604 -> 0 bytes
| | |  .../forum-interaction/figures/diagram_1.png     |  Bin 60336 -> 0 bytes
| | |  .../UC-21-forum-recommendations.tex             |  545 ----
| | |  .../forum-search-and-recommendation/diagram.tex |  568 ----
| | |  .../figures/UC-21-forum-recommendations_1.png   |  Bin 17712 -> 0 bytes
| | |  .../figures/diagram_1.png                       |  Bin 17718 -> 0 bytes
| | |  .../UC-26-find-study-partner.tex                |  576 ----
| | |  .../UC-27-send-friend-request.tex               |  588 ----
| | |  .../UC-28-manage-friend-requests.tex            |  568 ----
| | |  .../UC-29-manage-friend-groups.tex              |  707 -----
| | |  .../friends-and-social-networking/diagram.tex   | 2036 --------------
| | |  .../figures/UC-26-find-study-partner_1.png      |  Bin 16883 -> 0 bytes
| | |  .../figures/UC-27-send-friend-request_1.png     |  Bin 35752 -> 0 bytes
| | |  .../figures/UC-28-manage-friend-requests_1.png  |  Bin 34718 -> 0 bytes
| | |  .../figures/UC-29-manage-friend-groups_1.png    |  Bin 44254 -> 0 bytes
| | |  .../figures/diagram_1.png                       |  Bin 58859 -> 0 bytes
| | |  .../functional_requirement_coverage.tex         |  414 ---
| | |  .../UC-06-share-learning-resource.tex           |  558 ----
| | |  .../UC-22-find-learning-resources.tex           |  543 ----
| | |  .../UC-23-resource-recommendations.tex          |  535 ----
| | |  .../UC-24-view-my-storage.tex                   |  521 ----
| | |  .../UC-25-delete-published-resource.tex         |  514 ----
| | |  .../learning-resource-library/diagram.tex       | 2126 --------------
| | |  .../figures/UC-06-share-learning-resource_1.png |  Bin 34959 -> 0 bytes
| | |  .../figures/UC-22-find-learning-resources_1.png |  Bin 17000 -> 0 bytes
| | |  .../UC-23-resource-recommendations_1.png        |  Bin 17762 -> 0 bytes
| | |  .../figures/UC-24-view-my-storage_1.png         |  Bin 16317 -> 0 bytes
| | |  .../UC-25-delete-published-resource_1.png       |  Bin 19038 -> 0 bytes
| | |  .../figures/diagram_1.png                       |  Bin 39196 -> 0 bytes
| | |  .../UC-07-join-create-study-room.tex            |  754 -----
| | |  .../meeting-rooms/UC-30-shared-study-tools.tex  |  557 ----
| | |  .../UC-31-request-learning-help.tex             |  541 ----
| | |  .../use_cases/meeting-rooms/diagram.tex         | 1591 -----------
| | |  .../figures/UC-07-join-create-study-room_1.png  |  Bin 71923 -> 0 bytes
| | |  .../figures/UC-30-shared-study-tools_1.png      |  Bin 24734 -> 0 bytes
| | |  .../figures/UC-31-request-learning-help_1.png   |  Bin 32443 -> 0 bytes
| | |  .../meeting-rooms/figures/diagram_1.png         |  Bin 51426 -> 0 bytes
| | |  .../UC-32-receive-notifications.tex             |  525 ----
| | |  .../UC-33-control-communication.tex             |  533 ----
| | |  .../UC-34-report-inappropriate-behavior.tex     |  533 ----
| | |  .../notifications-and-safety/diagram.tex        | 1330 ---------
| | |  .../figures/UC-32-receive-notifications_1.png   |  Bin 23198 -> 0 bytes
| | |  .../figures/UC-33-control-communication_1.png   |  Bin 14706 -> 0 bytes
| | |  .../UC-34-report-inappropriate-behavior_1.png   |  Bin 22975 -> 0 bytes
| | |  .../figures/diagram_1.png                       |  Bin 43265 -> 0 bytes
| | |  .../UC-04-create-discussion-post.tex            |  567 ----
| | |  .../UC-15-create-material-post.tex              |  542 ----
| | |  .../UC-16-create-functional-post.tex            |  585 ----
| | |  .../use_cases/post-management/diagram.tex       | 1433 ----------
| | |  .../figures/UC-04-create-discussion-post_1.png  |  Bin 34554 -> 0 bytes
| | |  .../figures/UC-15-create-material-post_1.png    |  Bin 16611 -> 0 bytes
| | |  .../figures/UC-16-create-functional-post_1.png  |  Bin 16830 -> 0 bytes
| | |  .../post-management/figures/diagram_1.png       |  Bin 50827 -> 0 bytes
| | |  .../profile-management/UC-12-manage-profile.tex |  558 ----
| | |  .../UC-13-set-learning-preferences.tex          |  510 ----
| | |  .../profile-management/UC-14-manage-privacy.tex |  527 ----
| | |  .../use_cases/profile-management/diagram.tex    | 1334 ---------
| | |  .../figures/UC-12-manage-profile_1.png          |  Bin 15716 -> 0 bytes
| | |  .../UC-13-set-learning-preferences_1.png        |  Bin 17043 -> 0 bytes
| | |  .../figures/UC-14-manage-privacy_1.png          |  Bin 14119 -> 0 bytes
| | |  .../profile-management/figures/diagram_1.png    |  Bin 32316 -> 0 bytes
| | |  .../UC-03-browse-search-forum.tex               |  577 ----
| | |  .../social-forum-management/diagram.tex         |  600 ----
| | |  .../figures/UC-03-browse-search-forum_1.png     |  Bin 42666 -> 0 bytes
| | |  .../figures/diagram_1.png                       |  Bin 42667 -> 0 bytes
| | |  147 files changed, 42217 deletions(-)
| | |
* | | commit f4a7adbccf5d10245171f879def1febc2c1dd5a3
| | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | Date:   Sat Nov 28 18:09:29 2026 +0700
| | |
| | |     udpate: compile md to pdf
| | |
| | |  docs/requirements/PA4-Group05/Changes.pdf       |  Bin 0 -> 455732 bytes
| | |  docs/requirements/PA4-Group05/Changes.tex       |  668 +++++
| | |  .../PA4-Group05/component_diagram.pdf           |  Bin 0 -> 622402 bytes
| | |  .../PA4-Group05/component_diagram.tex           |  357 +++
| | |  .../PA4-Group05/container_diagram.pdf           |  Bin 0 -> 469132 bytes
| | |  .../PA4-Group05/container_diagram.tex           |  410 +++
| | |  .../PA4-Group05/deployment_diagram.pdf          |  Bin 0 -> 512768 bytes
| | |  .../PA4-Group05/deployment_diagram.tex          |  327 +++
| | |  .../PA4-Group05/functional_requirement.pdf      |  Bin 0 -> 417795 bytes
| | |  .../PA4-Group05/functional_requirement.tex      |  225 ++
| | |  .../authentications/requirements.pdf            |  Bin 0 -> 2209709 bytes
| | |  .../authentications/requirements.tex            |  466 +++
| | |  .../browse/requirements.pdf                     |  Bin 0 -> 599241 bytes
| | |  .../browse/requirements.tex                     |  260 ++
| | |  .../feeds/requirements.pdf                      |  Bin 0 -> 721073 bytes
| | |  .../feeds/requirements.tex                      |  214 ++
| | |  .../requirements.pdf                            |  Bin 0 -> 2969715 bytes
| | |  .../requirements.tex                            |  439 +++
| | |  .../learning_resource_library/requirements.pdf  |  Bin 0 -> 750808 bytes
| | |  .../learning_resource_library/requirements.tex  |  315 +++
| | |  .../meeting_rooms/requirements.pdf              |  Bin 0 -> 4025272 bytes
| | |  .../meeting_rooms/requirements.tex              |  524 ++++
| | |  .../notifications_and_safety/requirements.pdf   |  Bin 0 -> 582023 bytes
| | |  .../notifications_and_safety/requirements.tex   |  261 ++
| | |  .../posts/requirements.pdf                      |  Bin 0 -> 2137231 bytes
| | |  .../posts/requirements.tex                      |  483 ++++
| | |  .../requirements.pdf                            |  Bin 0 -> 1599578 bytes
| | |  .../requirements.tex                            |  323 +++
| | |  .../suggestions_and_filters/requirements.pdf    |  Bin 0 -> 499081 bytes
| | |  .../suggestions_and_filters/requirements.tex    |  223 ++
| | |  .../PA4-Group05/non_functional_requirement.pdf  |  Bin 0 -> 423115 bytes
| | |  .../PA4-Group05/non_functional_requirement.tex  |  247 ++
| | |  .../availability/requirements.pdf               |  Bin 0 -> 367947 bytes
| | |  .../availability/requirements.tex               |  172 ++
| | |  .../performance/requirements.pdf                |  Bin 0 -> 412225 bytes
| | |  .../performance/requirements.tex                |  190 ++
| | |  .../privacy/requirements.pdf                    |  Bin 0 -> 393591 bytes
| | |  .../privacy/requirements.tex                    |  177 ++
| | |  .../scalability/requirements.pdf                |  Bin 0 -> 370974 bytes
| | |  .../scalability/requirements.tex                |  176 ++
| | |  .../security/requirements.pdf                   |  Bin 0 -> 400006 bytes
| | |  .../security/requirements.tex                   |  180 ++
| | |  .../usability/requirements.pdf                  |  Bin 0 -> 1360534 bytes
| | |  .../usability/requirements.tex                  |  231 ++
| | |  .../browse_computer_science_desktop.png         |  Bin 0 -> 149077 bytes
| | |  .../prototype/browse_home_desktop.png           |  Bin 0 -> 125933 bytes
| | |  .../prototype/create_post_desktop.png           |  Bin 0 -> 149023 bytes
| | |  .../prototype/create_post_discussion.png        |  Bin 0 -> 194840 bytes
| | |  .../prototype/create_post_functional_quiz.png   |  Bin 0 -> 180139 bytes
| | |  .../prototype/create_post_material.png          |  Bin 0 -> 196645 bytes
| | |  .../create_post_prerequisite_tree_code.png      |  Bin 0 -> 299364 bytes
| | |  ...ate_post_prerequisite_tree_drag_and_drop.png |  Bin 0 -> 287338 bytes
| | |  ...ost_prerequisite_tree_generate_from_file.png |  Bin 0 -> 283718 bytes
| | |  ...e_post_validation_and_publication_states.png |  Bin 0 -> 153623 bytes
| | |  .../prototype/dijkstra_question_desktop.png     |  Bin 0 -> 138907 bytes
| | |  .../prototype/feed_algorithms_desktop.png       |  Bin 0 -> 143251 bytes
| | |  .../prototype/forum_feed_default_desktop.png    |  Bin 0 -> 159970 bytes
| | |  .../forum_feed_interaction_states_desktop.png   |  Bin 0 -> 140214 bytes
| | |  .../prototype/friend_01_chat_aisha_patel.png    |  Bin 0 -> 144539 bytes
| | |  .../prototype/friend_01_chat_mia_chen.png       |  Bin 0 -> 145250 bytes
| | |  .../prototype/friend_01_chat_noah_williams.png  |  Bin 0 -> 144688 bytes
| | |  .../prototype/friend_01_chat_oliver_reed.png    |  Bin 0 -> 144465 bytes
| | |  .../prototype/friend_01_friend_hub.png          |  Bin 0 -> 145250 bytes
| | |  .../friend_01_new_friend_daniel_park.png        |  Bin 0 -> 129188 bytes
| | |  .../friend_01_new_friend_isabella_rossi.png     |  Bin 0 -> 129889 bytes
| | |  .../friend_01_new_friend_ravi_shah.png          |  Bin 0 -> 130403 bytes
| | |  .../friend_01b_no_conversation_selected.png     |  Bin 0 -> 120858 bytes
| | |  .../friend_02_find_friend_and_recommended.png   |  Bin 0 -> 142080 bytes
| | |  .../prototype/friend_03_friend_request.png      |  Bin 0 -> 118757 bytes
| | |  .../friend_04_discovery_find_friend_2.png       |  Bin 0 -> 143971 bytes
| | |  .../prototype/friend_04_my_group.png            |  Bin 0 -> 92009 bytes
| | |  .../friend_04_physics_lab_document.png          |  Bin 0 -> 82429 bytes
| | |  .../friend_04_physics_lab_list_member.png       |  Bin 0 -> 97820 bytes
| | |  .../prototype/friend_04_physics_lab_message.png |  Bin 0 -> 81090 bytes
| | |  .../friend_04_study_circle_document.png         |  Bin 0 -> 62769 bytes
| | |  .../friend_04_study_circle_list_member.png      |  Bin 0 -> 79172 bytes
| | |  .../friend_04_study_circle_message.png          |  Bin 0 -> 64625 bytes
| | |  .../friend_04a_calculus_crew_message.png        |  Bin 0 -> 81645 bytes
| | |  .../friend_04b_calculus_crew_document.png       |  Bin 0 -> 82992 bytes
| | |  .../friend_04c_calculus_crew_list_member.png    |  Bin 0 -> 98372 bytes
| | |  .../PA4-Group05/prototype/friend_05_states.png  |  Bin 0 -> 80033 bytes
| | |  .../PA4-Group05/prototype/loading_desktop.png   |  Bin 0 -> 21559 bytes
| | |  .../PA4-Group05/prototype/login_desktop.png     |  Bin 0 -> 252333 bytes
| | |  .../requirements/PA4-Group05/prototype/logo.png |  Bin 0 -> 37857 bytes
| | |  .../prototype/meetings_01_meeting_lobby.png     |  Bin 0 -> 118130 bytes
| | |  .../prototype/meetings_02_create_room.png       |  Bin 0 -> 125027 bytes
| | |  .../prototype/meetings_03_pre_join.png          |  Bin 0 -> 136496 bytes
| | |  .../prototype/meetings_04_in_the_room.png       |  Bin 0 -> 134164 bytes
| | |  .../meetings_05_in_the_room_chat_panel.png      |  Bin 0 -> 153793 bytes
| | |  .../meetings_06_hall_room_table_map.png         |  Bin 0 -> 130314 bytes
| | |  .../prototype/meetings_07_left_the_room.png     |  Bin 0 -> 35946 bytes
| | |  .../prototype/meetings_08_states.png            |  Bin 0 -> 90548 bytes
| | |  .../prototype/meetings_a1_request_to_join.png   |  Bin 0 -> 54952 bytes
| | |  .../prototype/meetings_a2_pending_approval.png  |  Bin 0 -> 41476 bytes
| | |  .../prototype/meetings_a3_request_outcome.png   |  Bin 0 -> 39075 bytes
| | |  .../meetings_a4_owner_join_requests.png         |  Bin 0 -> 159673 bytes
| | |  .../prototype/meetings_b1_matching.png          |  Bin 0 -> 118458 bytes
| | |  .../prototype/meetings_b2_match_found.png       |  Bin 0 -> 125249 bytes
| | |  .../meetings_b3_no_match_in_15_seconds.png      |  Bin 0 -> 123849 bytes
| | |  .../prototype/meetings_b4_waiting_queue.png     |  Bin 0 -> 119812 bytes
| | |  .../prototype/meetings_c1_confirm_leave.png     |  Bin 0 -> 113053 bytes
| | |  .../prototype/meetings_c2_removed_from_room.png |  Bin 0 -> 34648 bytes
| | |  .../prototype/meetings_c3_room_closed.png       |  Bin 0 -> 33105 bytes
| | |  .../prototype/meetings_c4_connection_lost.png   |  Bin 0 -> 112563 bytes
| | |  .../meetings_c5_microphone_blocked.png          |  Bin 0 -> 80454 bytes
| | |  .../prototype/meetings_d1_send_a_wave.png       |  Bin 0 -> 110430 bytes
| | |  .../prototype/meetings_d2_receive_a_wave.png    |  Bin 0 -> 129724 bytes
| | |  .../prototype/meetings_d3_1_on_1_chat.png       |  Bin 0 -> 153887 bytes
| | |  .../meetings_d4_voice_call_request.png          |  Bin 0 -> 158593 bytes
| | |  .../prototype/meetings_d5_in_a_call.png         |  Bin 0 -> 148051 bytes
| | |  .../prototype/meetings_e1_request_help.png      |  Bin 0 -> 132113 bytes
| | |  .../prototype/meetings_e2_request_status.png    |  Bin 0 -> 128580 bytes
| | |  .../prototype/meetings_e3_helper_view.png       |  Bin 0 -> 136401 bytes
| | |  .../prototype/meetings_f1_room_policies.png     |  Bin 0 -> 132164 bytes
| | |  .../prototype/meetings_f2_timer_controls.png    |  Bin 0 -> 130753 bytes
| | |  .../prototype/meetings_f3_policy_applied.png    |  Bin 0 -> 138824 bytes
| | |  .../prototype/meetings_g1_schedule_step.png     |  Bin 0 -> 122344 bytes
| | |  .../meetings_g2_scheduled_room_page.png         |  Bin 0 -> 65302 bytes
| | |  .../prototype/meetings_g3_starting_soon.png     |  Bin 0 -> 136384 bytes
| | |  .../prototype/message_document_members.png      |  Bin 0 -> 486780 bytes
| | |  .../PA4-Group05/prototype/otp_desktop.png       |  Bin 0 -> 252657 bytes
| | |  .../prototype/preference_settings_desktop.png   |  Bin 0 -> 223060 bytes
| | |  ...site_tree_validation_and_recovery_states.png |  Bin 0 -> 249301 bytes
| | |  .../profile_p1_own_profile_my_posts.png         |  Bin 0 -> 176248 bytes
| | |  .../profile_p3_public_profile_mia_chen.png      |  Bin 0 -> 177152 bytes
| | |  .../prototype/profile_p5_report_a_user.png      |  Bin 0 -> 151748 bytes
| | |  .../prototype/profile_p6_private_profile.png    |  Bin 0 -> 68160 bytes
| | |  .../prototype/profile_p7_profile_states.png     |  Bin 0 -> 51677 bytes
| | |  ...shed_prerequisite_tree_reader_simulation.png |  Bin 0 -> 161153 bytes
| | |  .../PA4-Group05/prototype/recover_desktop.png   |  Bin 0 -> 247140 bytes
| | |  .../prototype/recovery_confirmation_desktop.png |  Bin 0 -> 263449 bytes
| | |  .../PA4-Group05/prototype/register_desktop.png  |  Bin 0 -> 258535 bytes
| | |  .../prototype/set_new_password_desktop.png      |  Bin 0 -> 252464 bytes
| | |  .../prototype/settings_01_settings_profile.png  |  Bin 0 -> 140156 bytes
| | |  .../settings_01a_profile_content_rejected.png   |  Bin 0 -> 142783 bytes
| | |  .../settings_02_settings_preferences.png        |  Bin 0 -> 90405 bytes
| | |  .../prototype/settings_03_settings_account.png  |  Bin 0 -> 75639 bytes
| | |  ...gs_04_settings_privacy_and_notifications.png |  Bin 0 -> 69767 bytes
| | |  ...ings_04a_settings_notifications_selected.png |  Bin 0 -> 69855 bytes
| | |  ...le_validation_and_notification_selection.png |  Bin 0 -> 184103 bytes
| | |  .../prototype/settings_05_settings_states.png   |  Bin 0 -> 92399 bytes
| | |  .../settings_delete_account_desktop_otp.png     |  Bin 0 -> 61796 bytes
| | |  ...ettings_delete_account_desktop_otp_error.png |  Bin 0 -> 63188 bytes
| | |  .../settings_delete_account_desktop_success.png |  Bin 0 -> 57782 bytes
| | |  .../settings_login_desktop_destination.png      |  Bin 0 -> 252317 bytes
| | |  .../prototype/studitopia_editable_wordmark.png  |  Bin 0 -> 18735 bytes
| | |  .../studitopia_reusable_component_library.png   |  Bin 0 -> 104324 bytes
| | |  ...lidation_and_interaction_state_specimens.png |  Bin 0 -> 175174 bytes
| | |  .../studitopia_visual_identity_guide.png        |  Bin 0 -> 766335 bytes
| | |  .../prototype/welcome_desktop_preview.png       |  Bin 0 -> 17106 bytes
| | |  .../PA4-Group05/system_context_diagram.pdf      |  Bin 0 -> 1369280 bytes
| | |  .../PA4-Group05/system_context_diagram.tex      |  337 +++
| | |  .../UC-01-register-account.pdf                  |  Bin 0 -> 980346 bytes
| | |  .../UC-01-register-account.tex                  |  582 ++++
| | |  .../authentication-and-account/UC-02-log-in.pdf |  Bin 0 -> 938721 bytes
| | |  .../authentication-and-account/UC-02-log-in.tex |  547 ++++
| | |  .../authentication-and-account/UC-08-logout.pdf |  Bin 0 -> 441099 bytes
| | |  .../authentication-and-account/UC-08-logout.tex |  480 ++++
| | |  .../UC-09-automatic-logout.pdf                  |  Bin 0 -> 441624 bytes
| | |  .../UC-09-automatic-logout.tex                  |  486 ++++
| | |  .../UC-10-recover-password.pdf                  |  Bin 0 -> 1359689 bytes
| | |  .../UC-10-recover-password.tex                  |  546 ++++
| | |  .../UC-11-delete-account.pdf                    |  Bin 0 -> 655832 bytes
| | |  .../UC-11-delete-account.tex                    |  534 ++++
| | |  .../authentication-and-account/diagram.pdf      |  Bin 0 -> 2577328 bytes
| | |  .../authentication-and-account/diagram.tex      | 2488 +++++++++++++++++
| | |  .../forum-interaction/UC-05-comment-answer.pdf  |  Bin 0 -> 603393 bytes
| | |  .../forum-interaction/UC-05-comment-answer.tex  |  569 ++++
| | |  .../UC-17-vote-posts-comments.pdf               |  Bin 0 -> 560419 bytes
| | |  .../UC-17-vote-posts-comments.tex               |  547 ++++
| | |  .../UC-18-mark-true-response.pdf                |  Bin 0 -> 566128 bytes
| | |  .../UC-18-mark-true-response.tex                |  541 ++++
| | |  .../forum-interaction/UC-19-save-post.pdf       |  Bin 0 -> 448400 bytes
| | |  .../forum-interaction/UC-19-save-post.tex       |  522 ++++
| | |  .../UC-20-report-moderate-forum-content.pdf     |  Bin 0 -> 599454 bytes
| | |  .../UC-20-report-moderate-forum-content.tex     |  570 ++++
| | |  .../use_cases/forum-interaction/diagram.pdf     |  Bin 0 -> 1075516 bytes
| | |  .../use_cases/forum-interaction/diagram.tex     | 2204 +++++++++++++++
| | |  .../UC-21-forum-recommendations.pdf             |  Bin 0 -> 564271 bytes
| | |  .../UC-21-forum-recommendations.tex             |  545 ++++
| | |  .../forum-search-and-recommendation/diagram.pdf |  Bin 0 -> 583349 bytes
| | |  .../forum-search-and-recommendation/diagram.tex |  568 ++++
| | |  .../UC-26-find-study-partner.pdf                |  Bin 0 -> 1159828 bytes
| | |  .../UC-26-find-study-partner.tex                |  576 ++++
| | |  .../UC-27-send-friend-request.pdf               |  Bin 0 -> 936973 bytes
| | |  .../UC-27-send-friend-request.tex               |  588 ++++
| | |  .../UC-28-manage-friend-requests.pdf            |  Bin 0 -> 581218 bytes
| | |  .../UC-28-manage-friend-requests.tex            |  568 ++++
| | |  .../UC-29-manage-friend-groups.pdf              |  Bin 0 -> 2260708 bytes
| | |  .../UC-29-manage-friend-groups.tex              |  707 +++++
| | |  .../friends-and-social-networking/diagram.pdf   |  Bin 0 -> 3306142 bytes
| | |  .../friends-and-social-networking/diagram.tex   | 2036 ++++++++++++++
| | |  .../functional_requirement_coverage.pdf         |  Bin 0 -> 420079 bytes
| | |  .../functional_requirement_coverage.tex         |  414 +++
| | |  .../UC-06-share-learning-resource.pdf           |  Bin 0 -> 625592 bytes
| | |  .../UC-06-share-learning-resource.tex           |  558 ++++
| | |  .../UC-22-find-learning-resources.pdf           |  Bin 0 -> 664056 bytes
| | |  .../UC-22-find-learning-resources.tex           |  543 ++++
| | |  .../UC-23-resource-recommendations.pdf          |  Bin 0 -> 564423 bytes
| | |  .../UC-23-resource-recommendations.tex          |  535 ++++
| | |  .../UC-24-view-my-storage.pdf                   |  Bin 0 -> 453016 bytes
| | |  .../UC-24-view-my-storage.tex                   |  521 ++++
| | |  .../UC-25-delete-published-resource.pdf         |  Bin 0 -> 455504 bytes
| | |  .../UC-25-delete-published-resource.tex         |  514 ++++
| | |  .../learning-resource-library/diagram.pdf       |  Bin 0 -> 1124733 bytes
| | |  .../learning-resource-library/diagram.tex       | 2126 ++++++++++++++
| | |  .../UC-07-join-create-study-room.pdf            |  Bin 0 -> 2913543 bytes
| | |  .../UC-07-join-create-study-room.tex            |  754 +++++
| | |  .../meeting-rooms/UC-30-shared-study-tools.pdf  |  Bin 0 -> 1311601 bytes
| | |  .../meeting-rooms/UC-30-shared-study-tools.tex  |  557 ++++
| | |  .../UC-31-request-learning-help.pdf             |  Bin 0 -> 855086 bytes
| | |  .../UC-31-request-learning-help.tex             |  541 ++++
| | |  .../use_cases/meeting-rooms/diagram.pdf         |  Bin 0 -> 4297432 bytes
| | |  .../use_cases/meeting-rooms/diagram.tex         | 1591 +++++++++++
| | |  .../UC-32-receive-notifications.pdf             |  Bin 0 -> 519311 bytes
| | |  .../UC-32-receive-notifications.tex             |  525 ++++
| | |  .../UC-33-control-communication.pdf             |  Bin 0 -> 513568 bytes
| | |  .../UC-33-control-communication.tex             |  533 ++++
| | |  .../UC-34-report-inappropriate-behavior.pdf     |  Bin 0 -> 598529 bytes
| | |  .../UC-34-report-inappropriate-behavior.tex     |  533 ++++
| | |  .../notifications-and-safety/diagram.pdf        |  Bin 0 -> 783490 bytes
| | |  .../notifications-and-safety/diagram.tex        | 1330 +++++++++
| | |  .../UC-04-create-discussion-post.pdf            |  Bin 0 -> 857219 bytes
| | |  .../UC-04-create-discussion-post.tex            |  567 ++++
| | |  .../UC-15-create-material-post.pdf              |  Bin 0 -> 604130 bytes
| | |  .../UC-15-create-material-post.tex              |  542 ++++
| | |  .../UC-16-create-functional-post.pdf            |  Bin 0 -> 1557653 bytes
| | |  .../UC-16-create-functional-post.tex            |  585 ++++
| | |  .../use_cases/post-management/diagram.pdf       |  Bin 0 -> 2232550 bytes
| | |  .../use_cases/post-management/diagram.tex       | 1433 ++++++++++
| | |  .../profile-management/UC-12-manage-profile.pdf |  Bin 0 -> 1113056 bytes
| | |  .../profile-management/UC-12-manage-profile.tex |  558 ++++
| | |  .../UC-13-set-learning-preferences.pdf          |  Bin 0 -> 706926 bytes
| | |  .../UC-13-set-learning-preferences.tex          |  510 ++++
| | |  .../profile-management/UC-14-manage-privacy.pdf |  Bin 0 -> 727012 bytes
| | |  .../profile-management/UC-14-manage-privacy.tex |  527 ++++
| | |  .../use_cases/profile-management/diagram.pdf    |  Bin 0 -> 1756162 bytes
| | |  .../use_cases/profile-management/diagram.tex    | 1334 +++++++++
| | |  .../UC-03-browse-search-forum.pdf               |  Bin 0 -> 817493 bytes
| | |  .../UC-03-browse-search-forum.tex               |  577 ++++
| | |  .../social-forum-management/diagram.pdf         |  Bin 0 -> 861244 bytes
| | |  .../social-forum-management/diagram.tex         |  600 ++++
| | |  docs/templates/report_templates.tex             |    2 +-
| | |  src/backend                                     |    2 +-
| | |  src/database                                    |    2 +-
| | |  src/frontend                                    |    2 +-
| | |  246 files changed, 42221 insertions(+), 4 deletions(-)
| | |
* | | commit eb3ee01575f6556f45f50911b84905e6010fbf73
|/ /  Author: KanbeMatt <khanhbinh08062006@gmail.com>
| |   Date:   Sat Nov 28 15:07:28 2026 +0700
| |
| |       add: compile mmd to image
| |
| |    docs/requirements/PA3-Group05/figures/UC-01.mmd |  41 ------------------
| |    docs/requirements/PA3-Group05/figures/UC-01.png | Bin 176683 -> 78538 bytes
| |    docs/requirements/PA3-Group05/figures/UC-02.mmd |  30 -------------
| |    docs/requirements/PA3-Group05/figures/UC-02.png | Bin 118754 -> 52731 bytes
| |    docs/requirements/PA3-Group05/figures/UC-03.mmd |  26 -----------
| |    docs/requirements/PA3-Group05/figures/UC-03.png | Bin 94467 -> 42702 bytes
| |    docs/requirements/PA3-Group05/figures/UC-04.mmd |  24 ----------
| |    docs/requirements/PA3-Group05/figures/UC-04.png | Bin 78380 -> 34560 bytes
| |    docs/requirements/PA3-Group05/figures/UC-05.mmd |  31 -------------
| |    docs/requirements/PA3-Group05/figures/UC-05.png | Bin 115952 -> 52111 bytes
| |    docs/requirements/PA3-Group05/figures/UC-06.mmd |  24 ----------
| |    docs/requirements/PA3-Group05/figures/UC-06.png | Bin 79594 -> 34978 bytes
| |    docs/requirements/PA3-Group05/figures/UC-07.mmd |  33 --------------
| |    docs/requirements/PA3-Group05/figures/UC-07.png | Bin 136543 -> 62316 bytes
| |    .../PA4-Group05/figures/component_diagram_1.png | Bin 0 -> 70812 bytes
| |    .../PA4-Group05/figures/component_diagram_2.png | Bin 0 -> 33667 bytes
| |    .../PA4-Group05/figures/container_diagram_1.png | Bin 0 -> 34056 bytes
| |    .../figures/deployment_diagram_1.png            | Bin 0 -> 87019 bytes
| |    .../figures/system_context_diagram_1.png        | Bin 0 -> 87331 bytes
| |    .../figures/UC-01-register-account_1.png        | Bin 0 -> 78586 bytes
| |    .../figures/UC-02-log-in_1.png                  | Bin 0 -> 52711 bytes
| |    .../figures/UC-08-logout_1.png                  | Bin 0 -> 14142 bytes
| |    .../figures/UC-09-automatic-logout_1.png        | Bin 0 -> 14991 bytes
| |    .../figures/UC-10-recover-password_1.png        | Bin 0 -> 15974 bytes
| |    .../figures/UC-11-delete-account_1.png          | Bin 0 -> 14195 bytes
| |    .../figures/diagram_1.png                       | Bin 0 -> 45672 bytes
| |    .../figures/UC-01-register-account_1.png        | Bin 0 -> 78569 bytes
| |    .../use_cases/figures/UC-02-log-in_1.png        | Bin 0 -> 52727 bytes
| |    .../figures/UC-03-browse-search-forum_1.png     | Bin 0 -> 42671 bytes
| |    .../figures/UC-04-create-discussion-post_1.png  | Bin 0 -> 34583 bytes
| |    .../figures/UC-05-comment-answer_1.png          | Bin 0 -> 52102 bytes
| |    .../figures/UC-06-share-learning-resource_1.png | Bin 0 -> 34934 bytes
| |    .../figures/UC-07-join-create-study-room_1.png  | Bin 0 -> 71920 bytes
| |    .../use_cases/figures/UC-08-logout_1.png        | Bin 0 -> 14158 bytes
| |    .../figures/UC-09-automatic-logout_1.png        | Bin 0 -> 14999 bytes
| |    .../figures/UC-10-recover-password_1.png        | Bin 0 -> 15978 bytes
| |    .../figures/UC-11-delete-account_1.png          | Bin 0 -> 14168 bytes
| |    .../figures/UC-12-manage-profile_1.png          | Bin 0 -> 15717 bytes
| |    .../UC-13-set-learning-preferences_1.png        | Bin 0 -> 17051 bytes
| |    .../figures/UC-14-manage-privacy_1.png          | Bin 0 -> 14099 bytes
| |    .../figures/UC-15-create-material-post_1.png    | Bin 0 -> 16617 bytes
| |    .../figures/UC-16-create-functional-post_1.png  | Bin 0 -> 16822 bytes
| |    .../figures/UC-17-vote-posts-comments_1.png     | Bin 0 -> 16924 bytes
| |    .../figures/UC-18-mark-true-response_1.png      | Bin 0 -> 21888 bytes
| |    .../use_cases/figures/UC-19-save-post_1.png     | Bin 0 -> 15467 bytes
| |    .../UC-20-report-moderate-forum-content_1.png   | Bin 0 -> 32591 bytes
| |    .../figures/UC-21-forum-recommendations_1.png   | Bin 0 -> 17694 bytes
| |    .../figures/UC-22-find-learning-resources_1.png | Bin 0 -> 16993 bytes
| |    .../UC-23-resource-recommendations_1.png        | Bin 0 -> 17751 bytes
| |    .../figures/UC-24-view-my-storage_1.png         | Bin 0 -> 16325 bytes
| |    .../UC-25-delete-published-resource_1.png       | Bin 0 -> 19021 bytes
| |    .../figures/UC-26-find-study-partner_1.png      | Bin 0 -> 16894 bytes
| |    .../figures/UC-27-send-friend-request_1.png     | Bin 0 -> 35753 bytes
| |    .../figures/UC-28-manage-friend-requests_1.png  | Bin 0 -> 34739 bytes
| |    .../figures/UC-29-manage-friend-groups_1.png    | Bin 0 -> 44246 bytes
| |    .../figures/UC-30-shared-study-tools_1.png      | Bin 0 -> 24730 bytes
| |    .../figures/UC-31-request-learning-help_1.png   | Bin 0 -> 32441 bytes
| |    .../figures/UC-32-receive-notifications_1.png   | Bin 0 -> 23191 bytes
| |    .../figures/UC-33-control-communication_1.png   | Bin 0 -> 14686 bytes
| |    .../UC-34-report-inappropriate-behavior_1.png   | Bin 0 -> 22973 bytes
| |    .../PA4-Group05/use_cases/figures/diagram_1.png | Bin 0 -> 43173 bytes
| |    .../figures/UC-05-comment-answer_1.png          | Bin 0 -> 52109 bytes
| |    .../figures/UC-17-vote-posts-comments_1.png     | Bin 0 -> 16927 bytes
| |    .../figures/UC-18-mark-true-response_1.png      | Bin 0 -> 21848 bytes
| |    .../figures/UC-19-save-post_1.png               | Bin 0 -> 15490 bytes
| |    .../UC-20-report-moderate-forum-content_1.png   | Bin 0 -> 32604 bytes
| |    .../forum-interaction/figures/diagram_1.png     | Bin 0 -> 60336 bytes
| |    .../figures/UC-21-forum-recommendations_1.png   | Bin 0 -> 17712 bytes
| |    .../figures/diagram_1.png                       | Bin 0 -> 17718 bytes
| |    .../figures/UC-26-find-study-partner_1.png      | Bin 0 -> 16883 bytes
| |    .../figures/UC-27-send-friend-request_1.png     | Bin 0 -> 35752 bytes
| |    .../figures/UC-28-manage-friend-requests_1.png  | Bin 0 -> 34718 bytes
| |    .../figures/UC-29-manage-friend-groups_1.png    | Bin 0 -> 44254 bytes
| |    .../figures/diagram_1.png                       | Bin 0 -> 58859 bytes
| |    .../figures/UC-06-share-learning-resource_1.png | Bin 0 -> 34959 bytes
| |    .../figures/UC-22-find-learning-resources_1.png | Bin 0 -> 17000 bytes
| |    .../UC-23-resource-recommendations_1.png        | Bin 0 -> 17762 bytes
| |    .../figures/UC-24-view-my-storage_1.png         | Bin 0 -> 16317 bytes
| |    .../UC-25-delete-published-resource_1.png       | Bin 0 -> 19038 bytes
| |    .../figures/diagram_1.png                       | Bin 0 -> 39196 bytes
| |    .../figures/UC-07-join-create-study-room_1.png  | Bin 0 -> 71923 bytes
| |    .../figures/UC-30-shared-study-tools_1.png      | Bin 0 -> 24734 bytes
| |    .../figures/UC-31-request-learning-help_1.png   | Bin 0 -> 32443 bytes
| |    .../meeting-rooms/figures/diagram_1.png         | Bin 0 -> 51426 bytes
| |    .../figures/UC-32-receive-notifications_1.png   | Bin 0 -> 23198 bytes
| |    .../figures/UC-33-control-communication_1.png   | Bin 0 -> 14706 bytes
| |    .../UC-34-report-inappropriate-behavior_1.png   | Bin 0 -> 22975 bytes
| |    .../figures/diagram_1.png                       | Bin 0 -> 43265 bytes
| |    .../figures/UC-04-create-discussion-post_1.png  | Bin 0 -> 34554 bytes
| |    .../figures/UC-15-create-material-post_1.png    | Bin 0 -> 16611 bytes
| |    .../figures/UC-16-create-functional-post_1.png  | Bin 0 -> 16830 bytes
| |    .../post-management/figures/diagram_1.png       | Bin 0 -> 50827 bytes
| |    .../figures/UC-12-manage-profile_1.png          | Bin 0 -> 15716 bytes
| |    .../UC-13-set-learning-preferences_1.png        | Bin 0 -> 17043 bytes
| |    .../figures/UC-14-manage-privacy_1.png          | Bin 0 -> 14119 bytes
| |    .../profile-management/figures/diagram_1.png    | Bin 0 -> 32316 bytes
| |    .../figures/UC-03-browse-search-forum_1.png     | Bin 0 -> 42666 bytes
| |    .../figures/diagram_1.png                       | Bin 0 -> 42667 bytes
| |    98 files changed, 209 deletions(-)
| |
* | commit 565737f3100b26d51527d19901cd2404a4340680
| | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | Date:   Sat Nov 28 14:37:52 2026 +0700
| |
| |     docs: add Changes log, functional and non-functional requirements for PA4
| |
| |  docs/requirements/PA4-Group05/Changes.md         | 297 +++++++++++++++++++
| |  .../PA4-Group05/functional_requirement.md        |  38 +++
| |  .../authentications/requirements.md              | 132 +++++++++
| |  .../browse/requirements.md                       |  45 +++
| |  .../feeds/requirements.md                        |  20 ++
| |  .../requirements.md                              |  56 ++++
| |  .../learning_resource_library/requirements.md    |  65 ++++
| |  .../meeting_rooms/requirements.md                |  61 ++++
| |  .../notifications_and_safety/requirements.md     |  46 +++
| |  .../posts/requirements.md                        | 121 ++++++++
| |  .../requirements.md                              |  45 +++
| |  .../suggestions_and_filters/requirements.md      |  29 ++
| |  .../PA4-Group05/non_functional_requirement.md    |  53 ++++
| |  .../availability/requirements.md                 |  12 +
| |  .../performance/requirements.md                  |  17 ++
| |  .../privacy/requirements.md                      |  17 ++
| |  .../scalability/requirements.md                  |  16 +
| |  .../security/requirements.md                     |  20 ++
| |  .../usability/requirements.md                    |  16 +
| |  19 files changed, 1106 insertions(+)
| |
* | commit a278a811b265a98c70498352fe53aa47a94ab7ce
| | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | Date:   Sat Nov 28 14:23:09 2026 +0700
| |
| |     docs: add functional_requirements
| |
| |  .../proposals/functional_requirement.md          | 592 +------------------
| |  .../authentications/requirements.md              | 132 +++++
| |  .../browse/requirements.md                       |  45 ++
| |  .../feeds/requirements.md                        |  20 +
| |  .../requirements.md                              |  56 ++
| |  .../learning_resource_library/requirements.md    |  65 ++
| |  .../meeting_rooms/requirements.md                |  61 ++
| |  .../notifications_and_safety/requirements.md     |  46 ++
| |  .../posts/requirements.md                        | 121 ++++
| |  .../requirements.md                              |  45 ++
| |  .../suggestions_and_filters/requirements.md      |  29 +
| |  .../proposals/non_functional_requirement.md      | 102 ++--
| |  .../availability/requirements.md                 |  12 +
| |  .../performance/requirements.md                  |  17 +
| |  .../privacy/requirements.md                      |  17 +
| |  .../scalability/requirements.md                  |  16 +
| |  .../security/requirements.md                     |  20 +
| |  .../usability/requirements.md                    |  16 +
| |  18 files changed, 791 insertions(+), 621 deletions(-)
| |
| | *   commit 5903f328052e3f3ecd034e42260db8fc95f8355a
| | |\  Merge: ab830ab b4bc3df
| |_|/  Author: Nah <huynguyenlequoc13@gmail.com>
|/| |   Date:   Sat Nov 28 13:35:13 2026 +0700
| | |
| | |       Merge pull request #22 from RoundFloor/dev
| | |
| | |       Dev
| | |
* | | commit b4bc3df746384438e1456aeeffb207b2500eda60
| | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | Date:   Sat Nov 28 13:30:08 2026 +0700
| | |
| | |     docs: 4 diagrams of PA4
| | |
| | |  docs/analysis-and-design/component_diagram.md   | 198 ++++++++++++++++++
| | |  docs/analysis-and-design/container_diagram.md   | 161 ++++++++++++++
| | |  docs/analysis-and-design/deployment_diagram.md  | 131 ++++++++++++
| | |  .../system_context_diagram.md                   | 100 +++++++++
| | |  .../PA4-Group05/component_diagram.md            | 198 ++++++++++++++++++
| | |  .../PA4-Group05/container_diagram.md            | 161 ++++++++++++++
| | |  .../PA4-Group05/deployment_diagram.md           | 131 ++++++++++++
| | |  .../PA4-Group05/system_context_diagram.md       | 100 +++++++++
| | |  src/backend                                     |   2 +-
| | |  src/database                                    |   2 +-
| | |  10 files changed, 1182 insertions(+), 2 deletions(-)
| | |
* | | commit bf0f385048be9184182e951425d2ca072f857086
|/ /  Author: KanbeMatt <khanhbinh08062006@gmail.com>
| |   Date:   Sat Nov 28 11:43:23 2026 +0700
| |
| |       docs: supple miss use case of PA3 and its author
| |
| |    .../UC-01-register-account.md                   | 236 ++++++++
| |    .../authentication-and-account/UC-02-log-in.md  | 216 +++++++
| |    .../authentication-and-account/UC-08-logout.md  | 173 ++++++
| |    .../UC-09-automatic-logout.md                   | 177 ++++++
| |    .../UC-10-recover-password.md                   | 195 ++++++
| |    .../UC-11-delete-account.md                     | 189 ++++++
| |    .../authentication-and-account/diagram.md       |  73 +++
| |    .../forum-interaction/UC-05-comment-answer.md   | 240 ++++++++
| |    .../UC-17-vote-posts-comments.md                | 203 +++++++
| |    .../UC-18-mark-true-response.md                 | 204 +++++++
| |    .../forum-interaction/UC-19-save-post.md        | 203 +++++++
| |    .../UC-20-report-moderate-forum-content.md      | 233 +++++++
| |    .../use_cases/forum-interaction/diagram.md      |  58 ++
| |    .../UC-21-forum-recommendations.md              | 212 +++++++
| |    .../forum-search-and-recommendation/diagram.md  |  31 +
| |    .../UC-26-find-study-partner.md                 | 204 +++++++
| |    .../UC-27-send-friend-request.md                | 227 +++++++
| |    .../UC-28-manage-friend-requests.md             | 228 +++++++
| |    .../UC-29-manage-friend-groups.md               | 255 ++++++++
| |    .../friends-and-social-networking/diagram.md    |  55 ++
| |    .../functional_requirement_coverage.md          | 253 ++++++++
| |    .../UC-06-share-learning-resource.md            | 220 +++++++
| |    .../UC-22-find-learning-resources.md            | 203 +++++++
| |    .../UC-23-resource-recommendations.md           | 202 +++++++
| |    .../UC-24-view-my-storage.md                    | 201 +++++++
| |    .../UC-25-delete-published-resource.md          | 197 ++++++
| |    .../learning-resource-library/diagram.md        |  46 ++
| |    .../UC-07-join-create-study-room.md             | 254 ++++++++
| |    .../meeting-rooms/UC-30-shared-study-tools.md   | 201 +++++++
| |    .../UC-31-request-learning-help.md              | 204 +++++++
| |    .../use_cases/meeting-rooms/diagram.md          |  59 ++
| |    .../UC-32-receive-notifications.md              | 202 +++++++
| |    .../UC-33-control-communication.md              | 204 +++++++
| |    .../UC-34-report-inappropriate-behavior.md      | 204 +++++++
| |    .../notifications-and-safety/diagram.md         |  40 ++
| |    .../UC-04-create-discussion-post.md             | 223 +++++++
| |    .../UC-15-create-material-post.md               | 204 +++++++
| |    .../UC-16-create-functional-post.md             | 202 +++++++
| |    .../use_cases/post-management/diagram.md        |  42 ++
| |    .../profile-management/UC-12-manage-profile.md  | 192 ++++++
| |    .../UC-13-set-learning-preferences.md           | 180 ++++++
| |    .../profile-management/UC-14-manage-privacy.md  | 190 ++++++
| |    .../use_cases/profile-management/diagram.md     |  36 ++
| |    .../UC-03-browse-search-forum.md                | 235 ++++++++
| |    .../social-forum-management/diagram.md          |  40 ++
| |    docs/requirements/proposals/API.md              |   3 +
| |    docs/requirements/proposals/create_post.md      |   6 +-
| |    docs/requirements/proposals/create_room.md      |   6 +-
| |    docs/requirements/proposals/feature_flow.md     |   3 +
| |    docs/requirements/proposals/friend.md           |   3 +
| |    docs/requirements/proposals/friend_profile.md   |   3 +
| |    .../proposals/functional_requirement.md         |   3 +
| |    docs/requirements/proposals/group_detail.md     |   3 +
| |    docs/requirements/proposals/hall_room.md        |   6 +-
| |    docs/requirements/proposals/library.md          |   3 +
| |    docs/requirements/proposals/list_post.md        |   3 +
| |    docs/requirements/proposals/meeting_lobby.md    |   6 +-
| |    docs/requirements/proposals/moderation_queue.md |   3 +
| |    .../proposals/non_functional_requirement.md     |   4 +-
| |    docs/requirements/proposals/overview.md         |   3 +
| |    docs/requirements/proposals/post_management.md  |   6 +-
| |    docs/requirements/proposals/response_code.md    |   3 +
| |    docs/requirements/proposals/screen_flow.md      |   4 +-
| |    docs/requirements/proposals/settings.md         |   3 +
| |    docs/requirements/proposals/study_room.md       |   6 +-
| |    .../requirements/proposals/use_case_diagrams.md |   3 +
| |    .../proposals/use_cases_description.md          |   3 +
| |    docs/requirements/proposals/use_cases_model.md  |   3 +
| |    .../use_cases_model/UC-01-register-account.md   |   4 +-
| |    .../proposals/use_cases_model/UC-02-log-in.md   |   4 +-
| |    .../UC-03-browse-search-forum.md                |   4 +-
| |    .../UC-04-create-discussion-post.md             |   4 +
| |    .../use_cases_model/UC-05-comment-answer.md     |   4 +-
| |    .../UC-06-share-learning-resource.md            |   4 +-
| |    .../UC-07-join-create-study-room.md             |   4 +-
| |    docs/requirements/proposals/userstory.md        |   3 +
| |    friend.md                                       | 569 ++++++++++++++++++
| |    settings.md                                     | 543 +++++++++++++++++
| |    src/frontend                                    |   2 +-
| |    79 files changed, 9045 insertions(+), 35 deletions(-)
| |
* | commit 04a0452797b581f16f53b77108dd760e072ed58f
| | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | Date:   Fri Nov 27 15:32:01 2026 +0700
| |
| |     docs: description of Create Post, Create Room, Friend Profile, Friend,...
| |
| |  docs/requirements/proposals/create_post.md      | 628 ++++++++++++++++++++
| |  docs/requirements/proposals/create_room.md      | 335 +++++++++++
| |  docs/requirements/proposals/friend.md           | 569 ++++++++++++++++++
| |  docs/requirements/proposals/friend_profile.md   | 413 +++++++++++++
| |  docs/requirements/proposals/group_detail.md     | 433 ++++++++++++++
| |  docs/requirements/proposals/hall_room.md        | 351 +++++++++++
| |  docs/requirements/proposals/library.md          | 461 ++++++++++++++
| |  docs/requirements/proposals/list_post.md        | 427 +++++++++++++
| |  docs/requirements/proposals/meeting_lobby.md    | 358 +++++++++++
| |  docs/requirements/proposals/moderation_queue.md | 245 ++++++++
| |  docs/requirements/proposals/post_management.md  | 281 +++++++++
| |  docs/requirements/proposals/settings.md         | 543 +++++++++++++++++
| |  docs/requirements/proposals/study_room.md       | 394 ++++++++++++
| |  13 files changed, 5438 insertions(+)
| |
| *   commit ab830ab258f8afa3eaf72cd084271eb256a43346
| |\  Merge: f726887 55a0419
| |/  Author: Nah <huynguyenlequoc13@gmail.com>
|/|   Date:   Wed Nov 25 21:52:35 2026 +0700
| |
| |       Merge pull request #21 from RoundFloor/dev
| |
| |       Dev
| |
* | commit 55a041944f2452e486c181e3f74d98b02a60bd73
| | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | Date:   Wed Nov 25 21:49:05 2026 +0700
| |
| |     refactor: move proposal out to requirement
| |
| |  docs/requirements/PA3-Group-05/Changes.md        |  285 -
| |  docs/requirements/PA3-Group-05/Changes.pdf       |  Bin 286557 -> 0 bytes
| |  .../ai_usage_report/ai_usage_report.md           |   73 -
| |  .../ai_usage_report/ai_usage_report.pdf          |  Bin 1003194 -> 0 bytes
| |  .../ai_usage_report/images/image_1.jpeg          |  Bin 118977 -> 0 bytes
| |  .../ai_usage_report/images/image_2.jpeg          |  Bin 147731 -> 0 bytes
| |  .../ai_usage_report/images/image_3.png           |  Bin 172405 -> 0 bytes
| |  .../ai_usage_report/images/image_4.jpeg          |  Bin 135171 -> 0 bytes
| |  .../ai_usage_report/images/image_5.png           |  Bin 170153 -> 0 bytes
| |  .../ai_usage_report/images/image_6.png           |  Bin 172536 -> 0 bytes
| |  docs/requirements/PA3-Group-05/figures/UC-01.mmd |   41 -
| |  docs/requirements/PA3-Group-05/figures/UC-01.png |  Bin 176683 -> 0 bytes
| |  docs/requirements/PA3-Group-05/figures/UC-02.mmd |   30 -
| |  docs/requirements/PA3-Group-05/figures/UC-02.png |  Bin 118754 -> 0 bytes
| |  docs/requirements/PA3-Group-05/figures/UC-03.mmd |   26 -
| |  docs/requirements/PA3-Group-05/figures/UC-03.png |  Bin 94467 -> 0 bytes
| |  docs/requirements/PA3-Group-05/figures/UC-04.mmd |   24 -
| |  docs/requirements/PA3-Group-05/figures/UC-04.png |  Bin 78380 -> 0 bytes
| |  docs/requirements/PA3-Group-05/figures/UC-05.mmd |   31 -
| |  docs/requirements/PA3-Group-05/figures/UC-05.png |  Bin 115952 -> 0 bytes
| |  docs/requirements/PA3-Group-05/figures/UC-06.mmd |   24 -
| |  docs/requirements/PA3-Group-05/figures/UC-06.png |  Bin 79594 -> 0 bytes
| |  docs/requirements/PA3-Group-05/figures/UC-07.mmd |   33 -
| |  docs/requirements/PA3-Group-05/figures/UC-07.png |  Bin 136543 -> 0 bytes
| |  .../PA3-Group-05/git-graph/backend.md            |  577 --
| |  .../PA3-Group-05/git-graph/backend.pdf           |  Bin 51370 -> 0 bytes
| |  .../PA3-Group-05/git-graph/database.md           |  397 --
| |  .../PA3-Group-05/git-graph/database.pdf          |  Bin 41092 -> 0 bytes
| |  .../PA3-Group-05/git-graph/frontend.md           |  579 --
| |  .../PA3-Group-05/git-graph/frontend.pdf          |  Bin 50882 -> 0 bytes
| |  .../requirements/PA3-Group-05/git-graph/total.md |  918 ---
| |  .../PA3-Group-05/git-graph/total.pdf             |  Bin 65924 -> 0 bytes
| |  .../PA3-Group-05/prototype/forum_browse.png      |  Bin 67675 -> 0 bytes
| |  .../PA3-Group-05/prototype/forum_course.png      |  Bin 83587 -> 0 bytes
| |  .../PA3-Group-05/prototype/forum_feed.png        |  Bin 81141 -> 0 bytes
| |  .../PA3-Group-05/prototype/forum_post.png        |  Bin 79035 -> 0 bytes
| |  .../PA3-Group-05/prototype/login.png             |  Bin 100963 -> 0 bytes
| |  .../PA3-Group-05/prototype/lost_password.png     |  Bin 98816 -> 0 bytes
| |  .../PA3-Group-05/prototype/new_password.png      |  Bin 100268 -> 0 bytes
| |  docs/requirements/PA3-Group-05/prototype/otp.png |  Bin 112497 -> 0 bytes
| |  .../requirements/PA3-Group-05/prototype/post.png |  Bin 77785 -> 0 bytes
| |  .../PA3-Group-05/prototype/post_comment.png      |  Bin 71242 -> 0 bytes
| |  .../PA3-Group-05/prototype/post_discussion.png   |  Bin 74067 -> 0 bytes
| |  .../PA3-Group-05/prototype/preference.png        |  Bin 96063 -> 0 bytes
| |  .../PA3-Group-05/prototype/register.png          |  Bin 117486 -> 0 bytes
| |  .../PA3-Group-05/prototype/room_question.png     |  Bin 58456 -> 0 bytes
| |  .../PA3-Group-05/prototype/send_email.png        |  Bin 117773 -> 0 bytes
| |  .../revised_software_development_vision.md       |  427 --
| |  .../revised_software_development_vision.pdf      |  Bin 1027362 -> 0 bytes
| |  .../revised_software_devlopment_plan.md          |  444 --
| |  .../revised_software_devlopment_plan.pdf         |  Bin 416519 -> 0 bytes
| |  .../PA3-Group-05/src/backend/.gitattributes      |    1 -
| |  .../PA3-Group-05/src/backend/.gitignore          |   60 -
| |  .../PA3-Group-05/src/backend/.oxlintrc.json      |   10 -
| |  .../PA3-Group-05/src/backend/.prettierignore     |    5 -
| |  .../PA3-Group-05/src/backend/.prettierrc         |    4 -
| |  .../.specify/memory/.constitution-template.json  |    4 -
| |  .../src/backend/.specify/memory/constitution.md  |  385 --
| |  .../PA3-Group-05/src/backend/README.md           |  124 -
| |  .../PA3-Group-05/src/backend/nest-cli.json       |    8 -
| |  .../PA3-Group-05/src/backend/package-lock.json   | 6001 ------------------
| |  .../PA3-Group-05/src/backend/package.json        |   55 -
| |  .../checklists/requirements.md                   |   35 -
| |  .../contracts/auth-registration.openapi.yaml     |  284 -
| |  .../specs/001-user-registration/data-model.md    |  158 -
| |  .../backend/specs/001-user-registration/plan.md  |  125 -
| |  .../specs/001-user-registration/quickstart.md    |  185 -
| |  .../specs/001-user-registration/research.md      |  121 -
| |  .../backend/specs/001-user-registration/spec.md  |  131 -
| |  .../backend/specs/001-user-registration/tasks.md |  234 -
| |  .../002-user-login/checklists/requirements.md    |   36 -
| |  .../contracts/auth-session.openapi.yaml          |  177 -
| |  .../002-user-login/contracts/database-session.md |  143 -
| |  .../backend/specs/002-user-login/data-model.md   |  204 -
| |  .../src/backend/specs/002-user-login/plan.md     |  192 -
| |  .../backend/specs/002-user-login/quickstart.md   |  179 -
| |  .../src/backend/specs/002-user-login/research.md |  223 -
| |  .../src/backend/specs/002-user-login/spec.md     |  161 -
| |  .../src/backend/specs/002-user-login/tasks.md    |  255 -
| |  .../checklists/requirements.md                   |   36 -
| |  .../003-otp-register-activation/contracts/api.md |  154 -
| |  .../003-otp-register-activation/data-model.md    |  118 -
| |  .../specs/003-otp-register-activation/plan.md    |   95 -
| |  .../003-otp-register-activation/quickstart.md    |  159 -
| |  .../003-otp-register-activation/research.md      |  156 -
| |  .../specs/003-otp-register-activation/spec.md    |  123 -
| |  .../specs/003-otp-register-activation/tasks.md   |  227 -
| |  .../PA3-Group-05/src/backend/src/app.module.ts   |   11 -
| |  .../src/backend/src/common/exception-factory.ts  |    9 -
| |  .../src/backend/src/common/interceptor.ts        |   27 -
| |  .../src/common/response-code/code.config.ts      |   33 -
| |  .../src/backend/src/common/response.dto.ts       |   30 -
| |  .../src/backend/src/config/app.config.ts         |    1 -
| |  .../PA3-Group-05/src/backend/src/main.ts         |   23 -
| |  .../__tests__/auth.controller.spec.ts            |   88 -
| |  .../__tests__/auth.service.mock.ts               |   44 -
| |  .../__tests__/auth.service.spec.ts               |   49 -
| |  .../authentication/__tests__/auth.testcase.ts    |  148 -
| |  .../packages/authentication/auth.controller.ts   |  126 -
| |  .../src/packages/authentication/auth.module.ts   |   14 -
| |  .../src/packages/authentication/auth.service.ts  |  110 -
| |  .../authentication/config/auth.config.ts         |    7 -
| |  .../decorartors/displayname.decorator.ts         |   26 -
| |  .../decorartors/email.decorator.ts               |   27 -
| |  .../decorartors/password.decorator.ts            |   32 -
| |  .../decorartors/username.decorator.ts            |   26 -
| |  .../src/packages/authentication/dto/login.dto.ts |    5 -
| |  .../packages/authentication/dto/logout.dto.ts    |   10 -
| |  .../authentication/dto/otp-response.dto.ts       |   15 -
| |  .../authentication/dto/recover-password.dto.ts   |   22 -
| |  .../authentication/dto/refresh-token.dto.ts      |    3 -
| |  .../packages/authentication/dto/register.dto.ts  |   18 -
| |  .../__tests__/email-sender.service.mock.ts       |    9 -
| |  .../__tests__/email-sender.service.spec.ts       |  135 -
| |  .../src/packages/email-sender/discord.config.ts  |   41 -
| |  .../packages/email-sender/email-sender.config.ts |   13 -
| |  .../packages/email-sender/email-sender.module.ts |    8 -
| |  .../email-sender/email-sender.service.ts         |   68 -
| |  .../email-sender/models/email-sender.model.ts    |   47 -
| |  .../email-sender/models/email-template.model.ts  |   76 -
| |  .../postgres/__tests__/pg.register.testcases.ts  |  741 ---
| |  .../postgres/__tests__/pg.service.mock.ts        |  121 -
| |  .../postgres/__tests__/pg.service.spec.ts        |   84 -
| |  .../packages/postgres/__tests__/pg.testcases.ts  |   98 -
| |  .../src/packages/postgres/__tests__/pool.mock.ts |  107 -
| |  .../src/packages/postgres/dto/SQLSTATE.dto.ts    |   24 -
| |  .../src/packages/postgres/dto/response.dto.ts    |   13 -
| |  .../backend/src/packages/postgres/pg.config.ts   |    9 -
| |  .../backend/src/packages/postgres/pg.module.ts   |    8 -
| |  .../backend/src/packages/postgres/pg.service.ts  |  262 -
| |  .../__tests__/recaptcha.service.mock.ts          |   11 -
| |  .../src/packages/recaptcha/recaptcha.module.ts   |    8 -
| |  .../src/packages/recaptcha/recaptcha.service.ts  |    8 -
| |  .../__test__/sg.service.spec.ts                  |   56 -
| |  .../security-generation/decorators/sg.mock.ts    |   12 -
| |  .../decorators/token-bearer.decorators.ts        |   34 -
| |  .../security-generation/dto/key-response.dto.ts  |   18 -
| |  .../security-generation/dto/secret.dto.ts        |   10 -
| |  .../packages/security-generation/sg.config.ts    |   18 -
| |  .../src/packages/security-generation/sg.guard.ts |    8 -
| |  .../packages/security-generation/sg.module.ts    |   12 -
| |  .../packages/security-generation/sg.service.ts   |  113 -
| |  .../backend/src/packages/web/web.controller.ts   |   29 -
| |  .../src/backend/src/packages/web/web.guard.ts    |   10 -
| |  .../src/backend/src/packages/web/web.module.ts   |   10 -
| |  .../src/backend/src/packages/web/web.service.ts  |   13 -
| |  .../backend/test/auth-registration.e2e-spec.ts   |   98 -
| |  .../PA3-Group-05/src/backend/tsconfig.build.json |   11 -
| |  .../PA3-Group-05/src/backend/tsconfig.json       |   23 -
| |  .../src/backend/vitest.config.e2e.ts             |   10 -
| |  .../PA3-Group-05/src/backend/vitest.config.ts    |   12 -
| |  .../PA3-Group-05/src/database/.gitignore         |    6 -
| |  .../src/database/.specify/.gitignore             |   14 -
| |  .../.specify/memory/.constitution-template.json  |    4 -
| |  .../src/database/.specify/memory/constitution.md |  206 -
| |  .../src/database/.specify/memory/mission.md      |   19 -
| |  .../src/database/.specify/memory/roadmap.md      |   39 -
| |  .../src/database/.specify/memory/tech-stack.md   |   31 -
| |  .../PA3-Group-05/src/database/README.md          |  260 -
| |  .../src/database/config/database.config.ts       |   17 -
| |  .../PA3-Group-05/src/database/package-lock.json  | 1707 -----
| |  .../PA3-Group-05/src/database/package.json       |   28 -
| |  .../001-auth-schema/checklists/requirements.md   |   35 -
| |  .../contracts/authentication-functions.md        |  234 -
| |  .../database/specs/001-auth-schema/data-model.md |  161 -
| |  .../src/database/specs/001-auth-schema/plan.md   |  150 -
| |  .../database/specs/001-auth-schema/quickstart.md |   90 -
| |  .../database/specs/001-auth-schema/research.md   |  147 -
| |  .../src/database/specs/001-auth-schema/spec.md   |  135 -
| |  .../src/database/specs/001-auth-schema/tasks.md  |  218 -
| |  .../src/database/src/definitions/email.init.sql  |    2 -
| |  .../database/src/definitions/username.init.sql   |    2 -
| |  .../src/functions/authentication/_register.sql   |    1 -
| |  .../activate-account.session-check.sql           |   12 -
| |  .../email-validation.ev.account_domain.sql       |   18 -
| |  .../authentication/get-email.account.sql         |    7 -
| |  .../functions/authentication/get-otp.session.sql |    6 -
| |  .../functions/authentication/login.session.sql   |   27 -
| |  .../functions/authentication/logout.session.sql  |   10 -
| |  .../authentication/register.ev_uv_session.sql    |   22 -
| |  .../authentication/remove-otp.session.sql        |   10 -
| |  .../authentication/save-otp.session.sql          |   10 -
| |  .../authentication/session-check.session.sql     |   17 -
| |  .../username-validation.uv.account.sql           |   12 -
| |  .../src/database/src/schemas/_init.sql           |    1 -
| |  .../src/database/src/schemas/init.sql            |    3 -
| |  .../src/tables/account.email_username.sql        |   17 -
| |  .../src/database/src/tables/domain.init.sql      |   20 -
| |  .../src/database/src/tables/session.account.sql  |   15 -
| |  .../authentication/active-account.spec.ts        |  125 -
| |  .../authentication/email-validation.spec.ts      |   67 -
| |  .../functions/authentication/full-flow.spec.ts   |  193 -
| |  .../functions/authentication/get-email.spec.ts   |   96 -
| |  .../functions/authentication/get-otp.spec.ts     |  139 -
| |  .../tests/functions/authentication/helpers.ts    |  108 -
| |  .../tests/functions/authentication/login.spec.ts |  125 -
| |  .../functions/authentication/logout.spec.ts      |  106 -
| |  .../pg.email-validation.testcases.ts             |   79 -
| |  .../authentication/pg.full-flow.testcases.ts     |  105 -
| |  .../authentication/pg.login.testcases.ts         |   72 -
| |  .../authentication/pg.register.testcases.ts      |  799 ---
| |  .../pg.username-validation.testcases.ts          |   29 -
| |  .../authentication/register-session.spec.ts      |   77 -
| |  .../functions/authentication/register.spec.ts    |   39 -
| |  .../functions/authentication/remove-otp.spec.ts  |  108 -
| |  .../functions/authentication/save-otp.spec.ts    |   94 -
| |  .../authentication/session-check.spec.ts         |  104 -
| |  .../authentication/username-validation.spec.ts   |   54 -
| |  .../src/database/tests/migrations/init.spec.ts   |   26 -
| |  .../PA3-Group-05/src/database/tsconfig.json      |   45 -
| |  .../PA3-Group-05/src/database/vitest.config.ts   |   11 -
| |  .../PA3-Group-05/src/frontend/.gitignore         |   25 -
| |  .../.specify/memory/.constitution-template.json  |    4 -
| |  .../src/frontend/.specify/memory/constitution.md |  223 -
| |  .../PA3-Group-05/src/frontend/README.md          |   78 -
| |  .../PA3-Group-05/src/frontend/eslint.config.js   |   22 -
| |  .../PA3-Group-05/src/frontend/index.html         |   13 -
| |  .../PA3-Group-05/src/frontend/package-lock.json  | 4006 ------------
| |  .../PA3-Group-05/src/frontend/package.json       |   46 -
| |  .../checklists/requirements.md                   |   41 -
| |  .../contracts/auth-api.md                        |  306 -
| |  .../contracts/auth-routes.md                     |  121 -
| |  .../001-authentication-user-flows/data-model.md  |  263 -
| |  .../specs/001-authentication-user-flows/plan.md  |  290 -
| |  .../001-authentication-user-flows/quickstart.md  |  210 -
| |  .../001-authentication-user-flows/research.md    |  242 -
| |  .../specs/001-authentication-user-flows/spec.md  |  546 --
| |  .../specs/001-authentication-user-flows/tasks.md |  348 -
| |  .../src/frontend/src/app/App.test.tsx            |   11 -
| |  .../PA3-Group-05/src/frontend/src/app/App.tsx    |   15 -
| |  .../src/frontend/src/app/guard/auth-guard.tsx    |   26 -
| |  .../src/frontend/src/app/guard/otp-guard.tsx     |   22 -
| |  .../src/frontend/src/app/guard/public-only.tsx   |   28 -
| |  .../PA3-Group-05/src/frontend/src/app/index.css  |  131 -
| |  .../frontend/src/app/layouts/auth/AuthLayout.css |  116 -
| |  .../frontend/src/app/layouts/auth/AuthLayout.tsx |   48 -
| |  .../frontend/src/app/layouts/main/MainLayout.css |  116 -
| |  .../frontend/src/app/layouts/main/MainLayout.tsx |   48 -
| |  .../src/frontend/src/app/main.test.tsx           |   51 -
| |  .../PA3-Group-05/src/frontend/src/app/main.tsx   |   16 -
| |  .../src/app/providers/auth/auth-initializer.tsx  |   36 -
| |  .../frontend/src/app/providers/query/index.ts    |    1 -
| |  .../app/providers/query/query-provider.test.tsx  |   51 -
| |  .../src/app/providers/query/query-provider.tsx   |   23 -
| |  .../frontend/src/app/providers/router/index.ts   |    2 -
| |  .../providers/router/router-provider.test.tsx    |   15 -
| |  .../src/app/providers/router/router-provider.tsx |   60 -
| |  .../src/frontend/src/entities/otp/otp-store.ts   |   34 -
| |  .../src/frontend/src/entities/otp/type.ts        |    6 -
| |  .../frontend/src/entities/session/auth-store.ts  |   91 -
| |  .../src/frontend/src/entities/session/type.ts    |   10 -
| |  .../src/features/authentication/login/login.ts   |   40 -
| |  .../src/features/authentication/login/type.ts    |   17 -
| |  .../src/features/authentication/logout/logout.ts |   28 -
| |  .../src/features/authentication/otp/otp.ts       |   55 -
| |  .../src/features/authentication/otp/type.ts      |    8 -
| |  .../features/authentication/register/register.ts |   33 -
| |  .../src/features/authentication/register/type.ts |   14 -
| |  .../frontend/src/pages/auth/login/LoginPage.css  |  122 -
| |  .../src/pages/auth/login/LoginPage.test.tsx      |    0
| |  .../frontend/src/pages/auth/login/LoginPage.tsx  |  207 -
| |  .../src/frontend/src/pages/auth/otp/OtpPage.css  |  111 -
| |  .../frontend/src/pages/auth/otp/OtpPage.test.tsx |    0
| |  .../src/frontend/src/pages/auth/otp/OtpPage.tsx  |  248 -
| |  .../auth/recover_password/RecoverPassword.css    |   83 -
| |  .../recover_password/RecoverPassword.test.tsx    |    0
| |  .../recover_password/RecoverPasswordPage.tsx     |   41 -
| |  .../src/pages/auth/register/RegisterPage.css     |   94 -
| |  .../pages/auth/register/RegisterPage.test.tsx    |    0
| |  .../src/pages/auth/register/RegisterPage.tsx     |  401 --
| |  .../src/pages/auth/set_password/SetPassword.css  |   83 -
| |  .../pages/auth/set_password/SetPassword.test.tsx |    0
| |  .../src/pages/auth/set_password/SetPassword.tsx  |   47 -
| |  .../src/frontend/src/pages/home/HomePage.tsx     |   31 -
| |  .../frontend/src/pages/loading/LoadingPage.css   |    0
| |  .../frontend/src/pages/loading/LoadingPage.tsx   |    0
| |  .../src/pages/route_error/RouteErrorPage.css     |   15 -
| |  .../src/pages/route_error/RouteErrorPage.tsx     |   22 -
| |  .../src/frontend/src/shared/api/client.ts        |  136 -
| |  .../src/frontend/src/shared/api/error.ts         |   37 -
| |  .../src/frontend/src/shared/api/index.ts         |    1 -
| |  .../src/shared/assets/icon/arrow-right.svg       |    3 -
| |  .../frontend/src/shared/assets/icon/camera.svg   |    3 -
| |  .../src/frontend/src/shared/assets/icon/chat.svg |    3 -
| |  .../src/shared/assets/icon/community.svg         |    3 -
| |  .../frontend/src/shared/assets/icon/error.svg    |    3 -
| |  .../frontend/src/shared/assets/icon/friends.svg  |    3 -
| |  .../src/frontend/src/shared/assets/icon/hide.svg |    3 -
| |  .../frontend/src/shared/assets/icon/house.svg    |    3 -
| |  .../src/frontend/src/shared/assets/icon/key.svg  |   10 -
| |  .../frontend/src/shared/assets/icon/library.svg  |    3 -
| |  .../src/frontend/src/shared/assets/icon/lock.svg |    3 -
| |  .../src/shared/assets/icon/mail-open.svg         |    3 -
| |  .../src/frontend/src/shared/assets/icon/mic.svg  |    3 -
| |  .../frontend/src/shared/assets/icon/profile.svg  |    3 -
| |  .../frontend/src/shared/assets/icon/rooms.svg    |    3 -
| |  .../src/shared/assets/icon/screen-share.svg      |    3 -
| |  .../frontend/src/shared/assets/icon/search.svg   |    3 -
| |  .../frontend/src/shared/assets/icon/settings.svg |    3 -
| |  .../frontend/src/shared/assets/icon/success.svg  |    3 -
| |  .../src/frontend/src/shared/assets/icon/tick.svg |    3 -
| |  .../frontend/src/shared/assets/icon/timer.svg    |    3 -
| |  .../frontend/src/shared/assets/icon/unhide.svg   |    3 -
| |  .../src/shared/assets/icon/university.svg        |    3 -
| |  .../frontend/src/shared/assets/icon/upload.svg   |    3 -
| |  .../src/shared/assets/icon/white_board.svg       |    3 -
| |  .../frontend/src/shared/assets/image/logo.svg    |   18 -
| |  .../src/shared/assets/image/sparkles.svg         |    3 -
| |  .../frontend/src/shared/assets/image/star.svg    |   10 -
| |  .../src/shared/assets/image/study-poster.svg     |   21 -
| |  .../src/shared/ui/button/Button.module.css       |   49 -
| |  .../src/shared/ui/button/Button.test.tsx         |   43 -
| |  .../src/frontend/src/shared/ui/button/Button.tsx |   30 -
| |  .../src/frontend/src/shared/ui/button/index.ts   |    1 -
| |  .../src/shared/ui/input/Input.module.css         |  100 -
| |  .../frontend/src/shared/ui/input/Input.test.tsx  |   54 -
| |  .../src/frontend/src/shared/ui/input/Input.tsx   |   89 -
| |  .../src/frontend/src/shared/ui/input/index.ts    |    1 -
| |  .../shared/ui/select_card/SelectCard.module.css  |   30 -
| |  .../shared/ui/select_card/SelectCard.test.tsx    |   29 -
| |  .../src/shared/ui/select_card/SelectCard.tsx     |   36 -
| |  .../frontend/src/shared/ui/select_card/index.ts  |    1 -
| |  .../src/shared/ui/tick_box/TickBox.module.css    |   25 -
| |  .../src/shared/ui/tick_box/TickBox.test.tsx      |   29 -
| |  .../frontend/src/shared/ui/tick_box/TickBox.tsx  |   33 -
| |  .../src/frontend/src/shared/ui/tick_box/index.ts |    1 -
| |  .../ui/toggle_switch/ToggleSwitch.module.css     |   39 -
| |  .../ui/toggle_switch/ToggleSwitch.test.tsx       |   30 -
| |  .../src/shared/ui/toggle_switch/ToggleSwitch.tsx |   33 -
| |  .../src/shared/ui/toggle_switch/index.ts         |    1 -
| |  .../PA3-Group-05/src/frontend/src/test/setup.ts  |    7 -
| |  .../PA3-Group-05/src/frontend/tsconfig.app.json  |   26 -
| |  .../src/frontend/tsconfig.deploy.json            |   23 -
| |  .../PA3-Group-05/src/frontend/tsconfig.json      |    8 -
| |  .../PA3-Group-05/src/frontend/tsconfig.node.json |   23 -
| |  .../PA3-Group-05/src/frontend/vite.config.ts     |   36 -
| |  docs/requirements/PA3-Group-05/use_case.md       | 1200 ----
| |  docs/requirements/PA3-Group-05/use_case.pdf      |  Bin 2208064 -> 0 bytes
| |  docs/requirements/PA3-Group-05/use_case.tex      | 1776 ------
| |  .../weekly_report/images/week1_jira_task.jpeg    |  Bin 146837 -> 0 bytes
| |  .../weekly_report/images/week2_jira_task.jpeg    |  Bin 116613 -> 0 bytes
| |  .../PA3-Group-05/weekly_report/weekly_report1.md |   47 -
| |  .../weekly_report/weekly_report1.pdf             |  Bin 245557 -> 0 bytes
| |  .../PA3-Group-05/weekly_report/weekly_report2.md |   47 -
| |  .../weekly_report/weekly_report2.pdf             |  Bin 222967 -> 0 bytes
| |  docs/requirements/PA3-Group-05/youtelink.md      |    1 -
| |  docs/requirements/PA3-Group-05/youtelink.pdf     |  Bin 28314 -> 0 bytes
| |  docs/requirements/PA3-Group05/proposals/API.md   |  785 ---
| |  .../PA3-Group05/proposals/feature_flow.md        |  173 -
| |  .../proposals/functional_requirement.md          |  577 --
| |  .../proposals/non_functional_requirement.md      |   59 -
| |  .../PA3-Group05/proposals/overview.md            |  170 -
| |  .../PA3-Group05/proposals/response_code.md       |   79 -
| |  .../PA3-Group05/proposals/screen_flow.md         |   81 -
| |  .../PA3-Group05/proposals/use_case_diagrams.md   |  245 -
| |  .../proposals/use_cases_description.md           |  560 --
| |  .../PA3-Group05/proposals/use_cases_model.md     |  104 -
| |  .../use_cases_model/UC-01-register-account.md    |   98 -
| |  .../proposals/use_cases_model/UC-02-log-in.md    |   83 -
| |  .../use_cases_model/UC-03-browse-search-forum.md |   79 -
| |  .../UC-04-create-discussion-post.md              |   76 -
| |  .../use_cases_model/UC-05-comment-answer.md      |   85 -
| |  .../UC-06-share-learning-resource.md             |   76 -
| |  .../UC-07-join-create-study-room.md              |   94 -
| |  .../PA3-Group05/proposals/userstory.md           |  721 ---
| |  docs/requirements/log.txt                        |  376 ++
| |  .../{PA3-Group-05 => }/proposals/API.md          |    2 +-
| |  .../{PA3-Group-05 => }/proposals/feature_flow.md |    0
| |  .../proposals/functional_requirement.md          |    0
| |  .../proposals/non_functional_requirement.md      |    0
| |  .../{PA3-Group-05 => }/proposals/overview.md     |    0
| |  .../proposals/response_code.md                   |    0
| |  .../{PA3-Group-05 => }/proposals/screen_flow.md  |    0
| |  .../proposals/use_case_diagrams.md               |    0
| |  .../proposals/use_cases_description.md           |    0
| |  .../proposals/use_cases_model.md                 |    0
| |  .../use_cases_model/UC-01-register-account.md    |    0
| |  .../proposals/use_cases_model/UC-02-log-in.md    |    0
| |  .../use_cases_model/UC-03-browse-search-forum.md |    0
| |  .../UC-04-create-discussion-post.md              |    0
| |  .../use_cases_model/UC-05-comment-answer.md      |    0
| |  .../UC-06-share-learning-resource.md             |    0
| |  .../UC-07-join-create-study-room.md              |    0
| |  .../{PA3-Group-05 => }/proposals/userstory.md    |    0
| |  src/backend                                      |    2 +-
| |  src/database                                     |    2 +-
| |  src/frontend                                     |    2 +-
| |  387 files changed, 380 insertions(+), 41829 deletions(-)
| |
* | commit accd253b3774c87cf81820d3b7e8b71ad51e6743
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Nov 14 21:11:20 2026 +0700
| |
| |     refactor: change name of submission PA3
| |
| |  docs/requirements/PA3-Group05/Changes.md         |  285 +
| |  docs/requirements/PA3-Group05/Changes.pdf        |  Bin 0 -> 286557 bytes
| |  .../ai_usage_report/ai_usage_report.md           |   73 +
| |  .../ai_usage_report/ai_usage_report.pdf          |  Bin 0 -> 1003194 bytes
| |  .../ai_usage_report/images/image_1.jpeg          |  Bin 0 -> 118977 bytes
| |  .../ai_usage_report/images/image_2.jpeg          |  Bin 0 -> 147731 bytes
| |  .../ai_usage_report/images/image_3.png           |  Bin 0 -> 172405 bytes
| |  .../ai_usage_report/images/image_4.jpeg          |  Bin 0 -> 135171 bytes
| |  .../ai_usage_report/images/image_5.png           |  Bin 0 -> 170153 bytes
| |  .../ai_usage_report/images/image_6.png           |  Bin 0 -> 172536 bytes
| |  docs/requirements/PA3-Group05/figures/UC-01.mmd  |   41 +
| |  docs/requirements/PA3-Group05/figures/UC-01.png  |  Bin 0 -> 176683 bytes
| |  docs/requirements/PA3-Group05/figures/UC-02.mmd  |   30 +
| |  docs/requirements/PA3-Group05/figures/UC-02.png  |  Bin 0 -> 118754 bytes
| |  docs/requirements/PA3-Group05/figures/UC-03.mmd  |   26 +
| |  docs/requirements/PA3-Group05/figures/UC-03.png  |  Bin 0 -> 94467 bytes
| |  docs/requirements/PA3-Group05/figures/UC-04.mmd  |   24 +
| |  docs/requirements/PA3-Group05/figures/UC-04.png  |  Bin 0 -> 78380 bytes
| |  docs/requirements/PA3-Group05/figures/UC-05.mmd  |   31 +
| |  docs/requirements/PA3-Group05/figures/UC-05.png  |  Bin 0 -> 115952 bytes
| |  docs/requirements/PA3-Group05/figures/UC-06.mmd  |   24 +
| |  docs/requirements/PA3-Group05/figures/UC-06.png  |  Bin 0 -> 79594 bytes
| |  docs/requirements/PA3-Group05/figures/UC-07.mmd  |   33 +
| |  docs/requirements/PA3-Group05/figures/UC-07.png  |  Bin 0 -> 136543 bytes
| |  .../PA3-Group05/git-graph/backend.md             |  577 ++
| |  .../PA3-Group05/git-graph/backend.pdf            |  Bin 0 -> 51370 bytes
| |  .../PA3-Group05/git-graph/database.md            |  397 ++
| |  .../PA3-Group05/git-graph/database.pdf           |  Bin 0 -> 41092 bytes
| |  .../PA3-Group05/git-graph/frontend.md            |  579 ++
| |  .../PA3-Group05/git-graph/frontend.pdf           |  Bin 0 -> 50882 bytes
| |  docs/requirements/PA3-Group05/git-graph/total.md |  918 +++
| |  .../requirements/PA3-Group05/git-graph/total.pdf |  Bin 0 -> 65924 bytes
| |  docs/requirements/PA3-Group05/proposals/API.md   |  785 +++
| |  .../PA3-Group05/proposals/feature_flow.md        |  173 +
| |  .../proposals/functional_requirement.md          |  577 ++
| |  .../proposals/non_functional_requirement.md      |   59 +
| |  .../PA3-Group05/proposals/overview.md            |  170 +
| |  .../PA3-Group05/proposals/response_code.md       |   79 +
| |  .../PA3-Group05/proposals/screen_flow.md         |   81 +
| |  .../PA3-Group05/proposals/use_case_diagrams.md   |  245 +
| |  .../proposals/use_cases_description.md           |  560 ++
| |  .../PA3-Group05/proposals/use_cases_model.md     |  104 +
| |  .../use_cases_model/UC-01-register-account.md    |   98 +
| |  .../proposals/use_cases_model/UC-02-log-in.md    |   83 +
| |  .../use_cases_model/UC-03-browse-search-forum.md |   79 +
| |  .../UC-04-create-discussion-post.md              |   76 +
| |  .../use_cases_model/UC-05-comment-answer.md      |   85 +
| |  .../UC-06-share-learning-resource.md             |   76 +
| |  .../UC-07-join-create-study-room.md              |   94 +
| |  .../PA3-Group05/proposals/userstory.md           |  721 +++
| |  .../PA3-Group05/prototype/forum_browse.png       |  Bin 0 -> 67675 bytes
| |  .../PA3-Group05/prototype/forum_course.png       |  Bin 0 -> 83587 bytes
| |  .../PA3-Group05/prototype/forum_feed.png         |  Bin 0 -> 81141 bytes
| |  .../PA3-Group05/prototype/forum_post.png         |  Bin 0 -> 79035 bytes
| |  .../requirements/PA3-Group05/prototype/login.png |  Bin 0 -> 100963 bytes
| |  .../PA3-Group05/prototype/lost_password.png      |  Bin 0 -> 98816 bytes
| |  .../PA3-Group05/prototype/new_password.png       |  Bin 0 -> 100268 bytes
| |  docs/requirements/PA3-Group05/prototype/otp.png  |  Bin 0 -> 112497 bytes
| |  docs/requirements/PA3-Group05/prototype/post.png |  Bin 0 -> 77785 bytes
| |  .../PA3-Group05/prototype/post_comment.png       |  Bin 0 -> 71242 bytes
| |  .../PA3-Group05/prototype/post_discussion.png    |  Bin 0 -> 74067 bytes
| |  .../PA3-Group05/prototype/preference.png         |  Bin 0 -> 96063 bytes
| |  .../PA3-Group05/prototype/register.png           |  Bin 0 -> 117486 bytes
| |  .../PA3-Group05/prototype/room_question.png      |  Bin 0 -> 58456 bytes
| |  .../PA3-Group05/prototype/send_email.png         |  Bin 0 -> 117773 bytes
| |  .../revised_software_development_vision.md       |  427 ++
| |  .../revised_software_development_vision.pdf      |  Bin 0 -> 1027362 bytes
| |  .../revised_software_devlopment_plan.md          |  444 ++
| |  .../revised_software_devlopment_plan.pdf         |  Bin 0 -> 416519 bytes
| |  .../PA3-Group05/src/backend/.gitattributes       |    1 +
| |  .../PA3-Group05/src/backend/.gitignore           |   60 +
| |  .../PA3-Group05/src/backend/.oxlintrc.json       |   10 +
| |  .../PA3-Group05/src/backend/.prettierignore      |    5 +
| |  .../PA3-Group05/src/backend/.prettierrc          |    4 +
| |  .../.specify/memory/.constitution-template.json  |    4 +
| |  .../src/backend/.specify/memory/constitution.md  |  385 ++
| |  .../PA3-Group05/src/backend/README.md            |  124 +
| |  .../PA3-Group05/src/backend/nest-cli.json        |    8 +
| |  .../PA3-Group05/src/backend/package-lock.json    | 6001 ++++++++++++++++++
| |  .../PA3-Group05/src/backend/package.json         |   55 +
| |  .../checklists/requirements.md                   |   35 +
| |  .../contracts/auth-registration.openapi.yaml     |  284 +
| |  .../specs/001-user-registration/data-model.md    |  158 +
| |  .../backend/specs/001-user-registration/plan.md  |  125 +
| |  .../specs/001-user-registration/quickstart.md    |  185 +
| |  .../specs/001-user-registration/research.md      |  121 +
| |  .../backend/specs/001-user-registration/spec.md  |  131 +
| |  .../backend/specs/001-user-registration/tasks.md |  234 +
| |  .../002-user-login/checklists/requirements.md    |   36 +
| |  .../contracts/auth-session.openapi.yaml          |  177 +
| |  .../002-user-login/contracts/database-session.md |  143 +
| |  .../backend/specs/002-user-login/data-model.md   |  204 +
| |  .../src/backend/specs/002-user-login/plan.md     |  192 +
| |  .../backend/specs/002-user-login/quickstart.md   |  179 +
| |  .../src/backend/specs/002-user-login/research.md |  223 +
| |  .../src/backend/specs/002-user-login/spec.md     |  161 +
| |  .../src/backend/specs/002-user-login/tasks.md    |  255 +
| |  .../checklists/requirements.md                   |   36 +
| |  .../003-otp-register-activation/contracts/api.md |  154 +
| |  .../003-otp-register-activation/data-model.md    |  118 +
| |  .../specs/003-otp-register-activation/plan.md    |   95 +
| |  .../003-otp-register-activation/quickstart.md    |  159 +
| |  .../003-otp-register-activation/research.md      |  156 +
| |  .../specs/003-otp-register-activation/spec.md    |  123 +
| |  .../specs/003-otp-register-activation/tasks.md   |  227 +
| |  .../PA3-Group05/src/backend/src/app.module.ts    |   11 +
| |  .../src/backend/src/common/exception-factory.ts  |    9 +
| |  .../src/backend/src/common/interceptor.ts        |   27 +
| |  .../src/common/response-code/code.config.ts      |   33 +
| |  .../src/backend/src/common/response.dto.ts       |   30 +
| |  .../src/backend/src/config/app.config.ts         |    1 +
| |  .../PA3-Group05/src/backend/src/main.ts          |   23 +
| |  .../__tests__/auth.controller.spec.ts            |   88 +
| |  .../__tests__/auth.service.mock.ts               |   44 +
| |  .../__tests__/auth.service.spec.ts               |   49 +
| |  .../authentication/__tests__/auth.testcase.ts    |  148 +
| |  .../packages/authentication/auth.controller.ts   |  126 +
| |  .../src/packages/authentication/auth.module.ts   |   14 +
| |  .../src/packages/authentication/auth.service.ts  |  110 +
| |  .../authentication/config/auth.config.ts         |    7 +
| |  .../decorartors/displayname.decorator.ts         |   26 +
| |  .../decorartors/email.decorator.ts               |   27 +
| |  .../decorartors/password.decorator.ts            |   32 +
| |  .../decorartors/username.decorator.ts            |   26 +
| |  .../src/packages/authentication/dto/login.dto.ts |    5 +
| |  .../packages/authentication/dto/logout.dto.ts    |   10 +
| |  .../authentication/dto/otp-response.dto.ts       |   15 +
| |  .../authentication/dto/recover-password.dto.ts   |   22 +
| |  .../authentication/dto/refresh-token.dto.ts      |    3 +
| |  .../packages/authentication/dto/register.dto.ts  |   18 +
| |  .../__tests__/email-sender.service.mock.ts       |    9 +
| |  .../__tests__/email-sender.service.spec.ts       |  135 +
| |  .../src/packages/email-sender/discord.config.ts  |   41 +
| |  .../packages/email-sender/email-sender.config.ts |   13 +
| |  .../packages/email-sender/email-sender.module.ts |    8 +
| |  .../email-sender/email-sender.service.ts         |   68 +
| |  .../email-sender/models/email-sender.model.ts    |   47 +
| |  .../email-sender/models/email-template.model.ts  |   76 +
| |  .../postgres/__tests__/pg.register.testcases.ts  |  741 +++
| |  .../postgres/__tests__/pg.service.mock.ts        |  121 +
| |  .../postgres/__tests__/pg.service.spec.ts        |   84 +
| |  .../packages/postgres/__tests__/pg.testcases.ts  |   98 +
| |  .../src/packages/postgres/__tests__/pool.mock.ts |  107 +
| |  .../src/packages/postgres/dto/SQLSTATE.dto.ts    |   24 +
| |  .../src/packages/postgres/dto/response.dto.ts    |   13 +
| |  .../backend/src/packages/postgres/pg.config.ts   |    9 +
| |  .../backend/src/packages/postgres/pg.module.ts   |    8 +
| |  .../backend/src/packages/postgres/pg.service.ts  |  262 +
| |  .../__tests__/recaptcha.service.mock.ts          |   11 +
| |  .../src/packages/recaptcha/recaptcha.module.ts   |    8 +
| |  .../src/packages/recaptcha/recaptcha.service.ts  |    8 +
| |  .../__test__/sg.service.spec.ts                  |   56 +
| |  .../security-generation/decorators/sg.mock.ts    |   12 +
| |  .../decorators/token-bearer.decorators.ts        |   34 +
| |  .../security-generation/dto/key-response.dto.ts  |   18 +
| |  .../security-generation/dto/secret.dto.ts        |   10 +
| |  .../packages/security-generation/sg.config.ts    |   18 +
| |  .../src/packages/security-generation/sg.guard.ts |    8 +
| |  .../packages/security-generation/sg.module.ts    |   12 +
| |  .../packages/security-generation/sg.service.ts   |  113 +
| |  .../backend/src/packages/web/web.controller.ts   |   29 +
| |  .../src/backend/src/packages/web/web.guard.ts    |   10 +
| |  .../src/backend/src/packages/web/web.module.ts   |   10 +
| |  .../src/backend/src/packages/web/web.service.ts  |   13 +
| |  .../backend/test/auth-registration.e2e-spec.ts   |   98 +
| |  .../PA3-Group05/src/backend/tsconfig.build.json  |   11 +
| |  .../PA3-Group05/src/backend/tsconfig.json        |   23 +
| |  .../PA3-Group05/src/backend/vitest.config.e2e.ts |   10 +
| |  .../PA3-Group05/src/backend/vitest.config.ts     |   12 +
| |  .../PA3-Group05/src/database/.gitignore          |    6 +
| |  .../PA3-Group05/src/database/.specify/.gitignore |   14 +
| |  .../.specify/memory/.constitution-template.json  |    4 +
| |  .../src/database/.specify/memory/constitution.md |  206 +
| |  .../src/database/.specify/memory/mission.md      |   19 +
| |  .../src/database/.specify/memory/roadmap.md      |   39 +
| |  .../src/database/.specify/memory/tech-stack.md   |   31 +
| |  .../PA3-Group05/src/database/README.md           |  260 +
| |  .../src/database/config/database.config.ts       |   17 +
| |  .../PA3-Group05/src/database/package-lock.json   | 1707 +++++
| |  .../PA3-Group05/src/database/package.json        |   28 +
| |  .../001-auth-schema/checklists/requirements.md   |   35 +
| |  .../contracts/authentication-functions.md        |  234 +
| |  .../database/specs/001-auth-schema/data-model.md |  161 +
| |  .../src/database/specs/001-auth-schema/plan.md   |  150 +
| |  .../database/specs/001-auth-schema/quickstart.md |   90 +
| |  .../database/specs/001-auth-schema/research.md   |  147 +
| |  .../src/database/specs/001-auth-schema/spec.md   |  135 +
| |  .../src/database/specs/001-auth-schema/tasks.md  |  218 +
| |  .../src/database/src/definitions/email.init.sql  |    2 +
| |  .../database/src/definitions/username.init.sql   |    2 +
| |  .../src/functions/authentication/_register.sql   |    1 +
| |  .../activate-account.session-check.sql           |   12 +
| |  .../email-validation.ev.account_domain.sql       |   18 +
| |  .../authentication/get-email.account.sql         |    7 +
| |  .../functions/authentication/get-otp.session.sql |    6 +
| |  .../functions/authentication/login.session.sql   |   27 +
| |  .../functions/authentication/logout.session.sql  |   10 +
| |  .../authentication/register.ev_uv_session.sql    |   22 +
| |  .../authentication/remove-otp.session.sql        |   10 +
| |  .../authentication/save-otp.session.sql          |   10 +
| |  .../authentication/session-check.session.sql     |   17 +
| |  .../username-validation.uv.account.sql           |   12 +
| |  .../src/database/src/schemas/_init.sql           |    1 +
| |  .../src/database/src/schemas/init.sql            |    3 +
| |  .../src/tables/account.email_username.sql        |   17 +
| |  .../src/database/src/tables/domain.init.sql      |   20 +
| |  .../src/database/src/tables/session.account.sql  |   15 +
| |  .../authentication/active-account.spec.ts        |  125 +
| |  .../authentication/email-validation.spec.ts      |   67 +
| |  .../functions/authentication/full-flow.spec.ts   |  193 +
| |  .../functions/authentication/get-email.spec.ts   |   96 +
| |  .../functions/authentication/get-otp.spec.ts     |  139 +
| |  .../tests/functions/authentication/helpers.ts    |  108 +
| |  .../tests/functions/authentication/login.spec.ts |  125 +
| |  .../functions/authentication/logout.spec.ts      |  106 +
| |  .../pg.email-validation.testcases.ts             |   79 +
| |  .../authentication/pg.full-flow.testcases.ts     |  105 +
| |  .../authentication/pg.login.testcases.ts         |   72 +
| |  .../authentication/pg.register.testcases.ts      |  799 +++
| |  .../pg.username-validation.testcases.ts          |   29 +
| |  .../authentication/register-session.spec.ts      |   77 +
| |  .../functions/authentication/register.spec.ts    |   39 +
| |  .../functions/authentication/remove-otp.spec.ts  |  108 +
| |  .../functions/authentication/save-otp.spec.ts    |   94 +
| |  .../authentication/session-check.spec.ts         |  104 +
| |  .../authentication/username-validation.spec.ts   |   54 +
| |  .../src/database/tests/migrations/init.spec.ts   |   26 +
| |  .../PA3-Group05/src/database/tsconfig.json       |   45 +
| |  .../PA3-Group05/src/database/vitest.config.ts    |   11 +
| |  .../PA3-Group05/src/frontend/.gitignore          |   25 +
| |  .../.specify/memory/.constitution-template.json  |    4 +
| |  .../src/frontend/.specify/memory/constitution.md |  223 +
| |  .../PA3-Group05/src/frontend/README.md           |   78 +
| |  .../PA3-Group05/src/frontend/eslint.config.js    |   22 +
| |  .../PA3-Group05/src/frontend/index.html          |   13 +
| |  .../PA3-Group05/src/frontend/package-lock.json   | 4006 ++++++++++++
| |  .../PA3-Group05/src/frontend/package.json        |   46 +
| |  .../checklists/requirements.md                   |   41 +
| |  .../contracts/auth-api.md                        |  306 +
| |  .../contracts/auth-routes.md                     |  121 +
| |  .../001-authentication-user-flows/data-model.md  |  263 +
| |  .../specs/001-authentication-user-flows/plan.md  |  290 +
| |  .../001-authentication-user-flows/quickstart.md  |  210 +
| |  .../001-authentication-user-flows/research.md    |  242 +
| |  .../specs/001-authentication-user-flows/spec.md  |  546 ++
| |  .../specs/001-authentication-user-flows/tasks.md |  348 +
| |  .../src/frontend/src/app/App.test.tsx            |   11 +
| |  .../PA3-Group05/src/frontend/src/app/App.tsx     |   15 +
| |  .../src/frontend/src/app/guard/auth-guard.tsx    |   26 +
| |  .../src/frontend/src/app/guard/otp-guard.tsx     |   22 +
| |  .../src/frontend/src/app/guard/public-only.tsx   |   28 +
| |  .../PA3-Group05/src/frontend/src/app/index.css   |  131 +
| |  .../frontend/src/app/layouts/auth/AuthLayout.css |  116 +
| |  .../frontend/src/app/layouts/auth/AuthLayout.tsx |   48 +
| |  .../frontend/src/app/layouts/main/MainLayout.css |  116 +
| |  .../frontend/src/app/layouts/main/MainLayout.tsx |   48 +
| |  .../src/frontend/src/app/main.test.tsx           |   51 +
| |  .../PA3-Group05/src/frontend/src/app/main.tsx    |   16 +
| |  .../src/app/providers/auth/auth-initializer.tsx  |   36 +
| |  .../frontend/src/app/providers/query/index.ts    |    1 +
| |  .../app/providers/query/query-provider.test.tsx  |   51 +
| |  .../src/app/providers/query/query-provider.tsx   |   23 +
| |  .../frontend/src/app/providers/router/index.ts   |    2 +
| |  .../providers/router/router-provider.test.tsx    |   15 +
| |  .../src/app/providers/router/router-provider.tsx |   60 +
| |  .../src/frontend/src/entities/otp/otp-store.ts   |   34 +
| |  .../src/frontend/src/entities/otp/type.ts        |    6 +
| |  .../frontend/src/entities/session/auth-store.ts  |   91 +
| |  .../src/frontend/src/entities/session/type.ts    |   10 +
| |  .../src/features/authentication/login/login.ts   |   40 +
| |  .../src/features/authentication/login/type.ts    |   17 +
| |  .../src/features/authentication/logout/logout.ts |   28 +
| |  .../src/features/authentication/otp/otp.ts       |   55 +
| |  .../src/features/authentication/otp/type.ts      |    8 +
| |  .../features/authentication/register/register.ts |   33 +
| |  .../src/features/authentication/register/type.ts |   14 +
| |  .../frontend/src/pages/auth/login/LoginPage.css  |  122 +
| |  .../src/pages/auth/login/LoginPage.test.tsx      |    0
| |  .../frontend/src/pages/auth/login/LoginPage.tsx  |  207 +
| |  .../src/frontend/src/pages/auth/otp/OtpPage.css  |  111 +
| |  .../frontend/src/pages/auth/otp/OtpPage.test.tsx |    0
| |  .../src/frontend/src/pages/auth/otp/OtpPage.tsx  |  248 +
| |  .../auth/recover_password/RecoverPassword.css    |   83 +
| |  .../recover_password/RecoverPassword.test.tsx    |    0
| |  .../recover_password/RecoverPasswordPage.tsx     |   41 +
| |  .../src/pages/auth/register/RegisterPage.css     |   94 +
| |  .../pages/auth/register/RegisterPage.test.tsx    |    0
| |  .../src/pages/auth/register/RegisterPage.tsx     |  401 ++
| |  .../src/pages/auth/set_password/SetPassword.css  |   83 +
| |  .../pages/auth/set_password/SetPassword.test.tsx |    0
| |  .../src/pages/auth/set_password/SetPassword.tsx  |   47 +
| |  .../src/frontend/src/pages/home/HomePage.tsx     |   31 +
| |  .../frontend/src/pages/loading/LoadingPage.css   |    0
| |  .../frontend/src/pages/loading/LoadingPage.tsx   |    0
| |  .../src/pages/route_error/RouteErrorPage.css     |   15 +
| |  .../src/pages/route_error/RouteErrorPage.tsx     |   22 +
| |  .../src/frontend/src/shared/api/client.ts        |  136 +
| |  .../src/frontend/src/shared/api/error.ts         |   37 +
| |  .../src/frontend/src/shared/api/index.ts         |    1 +
| |  .../src/shared/assets/icon/arrow-right.svg       |    3 +
| |  .../frontend/src/shared/assets/icon/camera.svg   |    3 +
| |  .../src/frontend/src/shared/assets/icon/chat.svg |    3 +
| |  .../src/shared/assets/icon/community.svg         |    3 +
| |  .../frontend/src/shared/assets/icon/error.svg    |    3 +
| |  .../frontend/src/shared/assets/icon/friends.svg  |    3 +
| |  .../src/frontend/src/shared/assets/icon/hide.svg |    3 +
| |  .../frontend/src/shared/assets/icon/house.svg    |    3 +
| |  .../src/frontend/src/shared/assets/icon/key.svg  |   10 +
| |  .../frontend/src/shared/assets/icon/library.svg  |    3 +
| |  .../src/frontend/src/shared/assets/icon/lock.svg |    3 +
| |  .../src/shared/assets/icon/mail-open.svg         |    3 +
| |  .../src/frontend/src/shared/assets/icon/mic.svg  |    3 +
| |  .../frontend/src/shared/assets/icon/profile.svg  |    3 +
| |  .../frontend/src/shared/assets/icon/rooms.svg    |    3 +
| |  .../src/shared/assets/icon/screen-share.svg      |    3 +
| |  .../frontend/src/shared/assets/icon/search.svg   |    3 +
| |  .../frontend/src/shared/assets/icon/settings.svg |    3 +
| |  .../frontend/src/shared/assets/icon/success.svg  |    3 +
| |  .../src/frontend/src/shared/assets/icon/tick.svg |    3 +
| |  .../frontend/src/shared/assets/icon/timer.svg    |    3 +
| |  .../frontend/src/shared/assets/icon/unhide.svg   |    3 +
| |  .../src/shared/assets/icon/university.svg        |    3 +
| |  .../frontend/src/shared/assets/icon/upload.svg   |    3 +
| |  .../src/shared/assets/icon/white_board.svg       |    3 +
| |  .../frontend/src/shared/assets/image/logo.svg    |   18 +
| |  .../src/shared/assets/image/sparkles.svg         |    3 +
| |  .../frontend/src/shared/assets/image/star.svg    |   10 +
| |  .../src/shared/assets/image/study-poster.svg     |   21 +
| |  .../src/shared/ui/button/Button.module.css       |   49 +
| |  .../src/shared/ui/button/Button.test.tsx         |   43 +
| |  .../src/frontend/src/shared/ui/button/Button.tsx |   30 +
| |  .../src/frontend/src/shared/ui/button/index.ts   |    1 +
| |  .../src/shared/ui/input/Input.module.css         |  100 +
| |  .../frontend/src/shared/ui/input/Input.test.tsx  |   54 +
| |  .../src/frontend/src/shared/ui/input/Input.tsx   |   89 +
| |  .../src/frontend/src/shared/ui/input/index.ts    |    1 +
| |  .../shared/ui/select_card/SelectCard.module.css  |   30 +
| |  .../shared/ui/select_card/SelectCard.test.tsx    |   29 +
| |  .../src/shared/ui/select_card/SelectCard.tsx     |   36 +
| |  .../frontend/src/shared/ui/select_card/index.ts  |    1 +
| |  .../src/shared/ui/tick_box/TickBox.module.css    |   25 +
| |  .../src/shared/ui/tick_box/TickBox.test.tsx      |   29 +
| |  .../frontend/src/shared/ui/tick_box/TickBox.tsx  |   33 +
| |  .../src/frontend/src/shared/ui/tick_box/index.ts |    1 +
| |  .../ui/toggle_switch/ToggleSwitch.module.css     |   39 +
| |  .../ui/toggle_switch/ToggleSwitch.test.tsx       |   30 +
| |  .../src/shared/ui/toggle_switch/ToggleSwitch.tsx |   33 +
| |  .../src/shared/ui/toggle_switch/index.ts         |    1 +
| |  .../PA3-Group05/src/frontend/src/test/setup.ts   |    7 +
| |  .../PA3-Group05/src/frontend/tsconfig.app.json   |   26 +
| |  .../src/frontend/tsconfig.deploy.json            |   23 +
| |  .../PA3-Group05/src/frontend/tsconfig.json       |    8 +
| |  .../PA3-Group05/src/frontend/tsconfig.node.json  |   23 +
| |  .../PA3-Group05/src/frontend/vite.config.ts      |   36 +
| |  docs/requirements/PA3-Group05/use_case.md        | 1200 ++++
| |  docs/requirements/PA3-Group05/use_case.pdf       |  Bin 0 -> 2208064 bytes
| |  docs/requirements/PA3-Group05/use_case.tex       | 1776 ++++++
| |  .../weekly_report/images/week1_jira_task.jpeg    |  Bin 0 -> 146837 bytes
| |  .../weekly_report/images/week2_jira_task.jpeg    |  Bin 0 -> 116613 bytes
| |  .../PA3-Group05/weekly_report/weekly_report1.md  |   47 +
| |  .../PA3-Group05/weekly_report/weekly_report1.pdf |  Bin 0 -> 245557 bytes
| |  .../PA3-Group05/weekly_report/weekly_report2.md  |   47 +
| |  .../PA3-Group05/weekly_report/weekly_report2.pdf |  Bin 0 -> 222967 bytes
| |  docs/requirements/PA3-Group05/youtelink.md       |    1 +
| |  docs/requirements/PA3-Group05/youtelink.pdf      |  Bin 0 -> 28314 bytes
| |  365 files changed, 41825 insertions(+)
| |
* | commit 665afdd30c6e865f133e3bdcdc6fa6860e5626f5
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Nov 14 21:10:55 2026 +0700
| |
| |     add: pdf version of revise plan & vision
| |
| |  docs/requirements/PA3-Group-05/Changes.pdf        | Bin 0 -> 286557 bytes
| |  .../revised_software_development_vision.pdf       | Bin 0 -> 1027362 bytes
| |  .../revised_software_devlopment_plan.pdf          | Bin 0 -> 416519 bytes
| |  3 files changed, 0 insertions(+), 0 deletions(-)
| |
* |   commit efc382a532d5dfb1806c57a10186eda94c6005e2
|\ \  Merge: 93a7794 b25664b
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Nov 14 21:08:56 2026 +0700
| | |
| | |     Merge remote-tracking branch 'origin/dev' into dev
| | |
| * | commit b25664b46a01194398a5f6c82fa81c48bcd0ce1e
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Sat Nov 14 20:32:46 2026 +0700
| | |
| | |     docs: revise changes.md, plan and vision document
| | |
| | |  docs/requirements/PA3-Group-05/Changes.md       | 1141 ++++-------------
| | |  .../revised_software_development_vision.md      |  427 ++++++
| | |  .../revised_software_devlopment_plan.md         |  444 +++++++
| | |  3 files changed, 1134 insertions(+), 878 deletions(-)
| | |
* | | commit 93a779459045868e459e5fd41148ca8fd12faac1
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Nov 14 21:08:14 2026 +0700
| | |
| | |     add: use case pdf and frontend src
| | |
| | |  docs/requirements/API.md                        | 1049 -----
| | |  docs/requirements/API.pdf                       |  Bin 622769 -> 0 bytes
| | |  .../{ => proposals}/use_case_diagrams.md        |    0
| | |  .../PA3-Group-05/prototype/forum_browse.png     |  Bin 0 -> 67675 bytes
| | |  .../PA3-Group-05/prototype/forum_course.png     |  Bin 0 -> 83587 bytes
| | |  .../PA3-Group-05/prototype/forum_feed.png       |  Bin 0 -> 81141 bytes
| | |  .../PA3-Group-05/prototype/forum_post.png       |  Bin 0 -> 79035 bytes
| | |  .../PA3-Group-05/prototype/login.png            |  Bin 0 -> 100963 bytes
| | |  .../PA3-Group-05/prototype/lost_password.png    |  Bin 0 -> 98816 bytes
| | |  .../PA3-Group-05/prototype/new_password.png     |  Bin 0 -> 100268 bytes
| | |  .../requirements/PA3-Group-05/prototype/otp.png |  Bin 0 -> 112497 bytes
| | |  .../PA3-Group-05/prototype/post.png             |  Bin 0 -> 77785 bytes
| | |  .../PA3-Group-05/prototype/post_comment.png     |  Bin 0 -> 71242 bytes
| | |  .../PA3-Group-05/prototype/post_discussion.png  |  Bin 0 -> 74067 bytes
| | |  .../PA3-Group-05/prototype/preference.png       |  Bin 0 -> 96063 bytes
| | |  .../PA3-Group-05/prototype/register.png         |  Bin 0 -> 117486 bytes
| | |  .../PA3-Group-05/prototype/room_question.png    |  Bin 0 -> 58456 bytes
| | |  .../PA3-Group-05/prototype/send_email.png       |  Bin 0 -> 117773 bytes
| | |  .../PA3-Group-05/src/frontend/.gitignore        |   25 +
| | |  .../.specify/memory/.constitution-template.json |    4 +
| | |  .../frontend/.specify/memory/constitution.md    |  223 +
| | |  .../PA3-Group-05/src/frontend/README.md         |   78 +
| | |  .../PA3-Group-05/src/frontend/eslint.config.js  |   22 +
| | |  .../PA3-Group-05/src/frontend/index.html        |   13 +
| | |  .../PA3-Group-05/src/frontend/package-lock.json | 4006 +++++++++++++++++
| | |  .../PA3-Group-05/src/frontend/package.json      |   46 +
| | |  .../checklists/requirements.md                  |   41 +
| | |  .../contracts/auth-api.md                       |  306 ++
| | |  .../contracts/auth-routes.md                    |  121 +
| | |  .../001-authentication-user-flows/data-model.md |  263 ++
| | |  .../specs/001-authentication-user-flows/plan.md |  290 ++
| | |  .../001-authentication-user-flows/quickstart.md |  210 +
| | |  .../001-authentication-user-flows/research.md   |  242 +
| | |  .../specs/001-authentication-user-flows/spec.md |  546 +++
| | |  .../001-authentication-user-flows/tasks.md      |  348 ++
| | |  .../src/frontend/src/app/App.test.tsx           |   11 +
| | |  .../PA3-Group-05/src/frontend/src/app/App.tsx   |   15 +
| | |  .../src/frontend/src/app/guard/auth-guard.tsx   |   26 +
| | |  .../src/frontend/src/app/guard/otp-guard.tsx    |   22 +
| | |  .../src/frontend/src/app/guard/public-only.tsx  |   28 +
| | |  .../PA3-Group-05/src/frontend/src/app/index.css |  131 +
| | |  .../src/app/layouts/auth/AuthLayout.css         |  116 +
| | |  .../src/app/layouts/auth/AuthLayout.tsx         |   48 +
| | |  .../src/app/layouts/main/MainLayout.css         |  116 +
| | |  .../src/app/layouts/main/MainLayout.tsx         |   48 +
| | |  .../src/frontend/src/app/main.test.tsx          |   51 +
| | |  .../PA3-Group-05/src/frontend/src/app/main.tsx  |   16 +
| | |  .../src/app/providers/auth/auth-initializer.tsx |   36 +
| | |  .../frontend/src/app/providers/query/index.ts   |    1 +
| | |  .../app/providers/query/query-provider.test.tsx |   51 +
| | |  .../src/app/providers/query/query-provider.tsx  |   23 +
| | |  .../frontend/src/app/providers/router/index.ts  |    2 +
| | |  .../providers/router/router-provider.test.tsx   |   15 +
| | |  .../app/providers/router/router-provider.tsx    |   60 +
| | |  .../src/frontend/src/entities/otp/otp-store.ts  |   34 +
| | |  .../src/frontend/src/entities/otp/type.ts       |    6 +
| | |  .../frontend/src/entities/session/auth-store.ts |   91 +
| | |  .../src/frontend/src/entities/session/type.ts   |   10 +
| | |  .../src/features/authentication/login/login.ts  |   40 +
| | |  .../src/features/authentication/login/type.ts   |   17 +
| | |  .../features/authentication/logout/logout.ts    |   28 +
| | |  .../src/features/authentication/otp/otp.ts      |   55 +
| | |  .../src/features/authentication/otp/type.ts     |    8 +
| | |  .../authentication/register/register.ts         |   33 +
| | |  .../features/authentication/register/type.ts    |   14 +
| | |  .../frontend/src/pages/auth/login/LoginPage.css |  122 +
| | |  .../src/pages/auth/login/LoginPage.test.tsx     |    0
| | |  .../frontend/src/pages/auth/login/LoginPage.tsx |  207 +
| | |  .../src/frontend/src/pages/auth/otp/OtpPage.css |  111 +
| | |  .../src/pages/auth/otp/OtpPage.test.tsx         |    0
| | |  .../src/frontend/src/pages/auth/otp/OtpPage.tsx |  248 +
| | |  .../auth/recover_password/RecoverPassword.css   |   83 +
| | |  .../recover_password/RecoverPassword.test.tsx   |    0
| | |  .../recover_password/RecoverPasswordPage.tsx    |   41 +
| | |  .../src/pages/auth/register/RegisterPage.css    |   94 +
| | |  .../pages/auth/register/RegisterPage.test.tsx   |    0
| | |  .../src/pages/auth/register/RegisterPage.tsx    |  401 ++
| | |  .../src/pages/auth/set_password/SetPassword.css |   83 +
| | |  .../auth/set_password/SetPassword.test.tsx      |    0
| | |  .../src/pages/auth/set_password/SetPassword.tsx |   47 +
| | |  .../src/frontend/src/pages/home/HomePage.tsx    |   31 +
| | |  .../frontend/src/pages/loading/LoadingPage.css  |    0
| | |  .../frontend/src/pages/loading/LoadingPage.tsx  |    0
| | |  .../src/pages/route_error/RouteErrorPage.css    |   15 +
| | |  .../src/pages/route_error/RouteErrorPage.tsx    |   22 +
| | |  .../src/frontend/src/shared/api/client.ts       |  136 +
| | |  .../src/frontend/src/shared/api/error.ts        |   37 +
| | |  .../src/frontend/src/shared/api/index.ts        |    1 +
| | |  .../src/shared/assets/icon/arrow-right.svg      |    3 +
| | |  .../frontend/src/shared/assets/icon/camera.svg  |    3 +
| | |  .../frontend/src/shared/assets/icon/chat.svg    |    3 +
| | |  .../src/shared/assets/icon/community.svg        |    3 +
| | |  .../frontend/src/shared/assets/icon/error.svg   |    3 +
| | |  .../frontend/src/shared/assets/icon/friends.svg |    3 +
| | |  .../frontend/src/shared/assets/icon/hide.svg    |    3 +
| | |  .../frontend/src/shared/assets/icon/house.svg   |    3 +
| | |  .../src/frontend/src/shared/assets/icon/key.svg |   10 +
| | |  .../frontend/src/shared/assets/icon/library.svg |    3 +
| | |  .../frontend/src/shared/assets/icon/lock.svg    |    3 +
| | |  .../src/shared/assets/icon/mail-open.svg        |    3 +
| | |  .../src/frontend/src/shared/assets/icon/mic.svg |    3 +
| | |  .../frontend/src/shared/assets/icon/profile.svg |    3 +
| | |  .../frontend/src/shared/assets/icon/rooms.svg   |    3 +
| | |  .../src/shared/assets/icon/screen-share.svg     |    3 +
| | |  .../frontend/src/shared/assets/icon/search.svg  |    3 +
| | |  .../src/shared/assets/icon/settings.svg         |    3 +
| | |  .../frontend/src/shared/assets/icon/success.svg |    3 +
| | |  .../frontend/src/shared/assets/icon/tick.svg    |    3 +
| | |  .../frontend/src/shared/assets/icon/timer.svg   |    3 +
| | |  .../frontend/src/shared/assets/icon/unhide.svg  |    3 +
| | |  .../src/shared/assets/icon/university.svg       |    3 +
| | |  .../frontend/src/shared/assets/icon/upload.svg  |    3 +
| | |  .../src/shared/assets/icon/white_board.svg      |    3 +
| | |  .../frontend/src/shared/assets/image/logo.svg   |   18 +
| | |  .../src/shared/assets/image/sparkles.svg        |    3 +
| | |  .../frontend/src/shared/assets/image/star.svg   |   10 +
| | |  .../src/shared/assets/image/study-poster.svg    |   21 +
| | |  .../src/shared/ui/button/Button.module.css      |   49 +
| | |  .../src/shared/ui/button/Button.test.tsx        |   43 +
| | |  .../frontend/src/shared/ui/button/Button.tsx    |   30 +
| | |  .../src/frontend/src/shared/ui/button/index.ts  |    1 +
| | |  .../src/shared/ui/input/Input.module.css        |  100 +
| | |  .../frontend/src/shared/ui/input/Input.test.tsx |   54 +
| | |  .../src/frontend/src/shared/ui/input/Input.tsx  |   89 +
| | |  .../src/frontend/src/shared/ui/input/index.ts   |    1 +
| | |  .../shared/ui/select_card/SelectCard.module.css |   30 +
| | |  .../shared/ui/select_card/SelectCard.test.tsx   |   29 +
| | |  .../src/shared/ui/select_card/SelectCard.tsx    |   36 +
| | |  .../frontend/src/shared/ui/select_card/index.ts |    1 +
| | |  .../src/shared/ui/tick_box/TickBox.module.css   |   25 +
| | |  .../src/shared/ui/tick_box/TickBox.test.tsx     |   29 +
| | |  .../frontend/src/shared/ui/tick_box/TickBox.tsx |   33 +
| | |  .../frontend/src/shared/ui/tick_box/index.ts    |    1 +
| | |  .../ui/toggle_switch/ToggleSwitch.module.css    |   39 +
| | |  .../ui/toggle_switch/ToggleSwitch.test.tsx      |   30 +
| | |  .../shared/ui/toggle_switch/ToggleSwitch.tsx    |   33 +
| | |  .../src/shared/ui/toggle_switch/index.ts        |    1 +
| | |  .../PA3-Group-05/src/frontend/src/test/setup.ts |    7 +
| | |  .../PA3-Group-05/src/frontend/tsconfig.app.json |   26 +
| | |  .../src/frontend/tsconfig.deploy.json           |   23 +
| | |  .../PA3-Group-05/src/frontend/tsconfig.json     |    8 +
| | |  .../src/frontend/tsconfig.node.json             |   23 +
| | |  .../PA3-Group-05/src/frontend/vite.config.ts    |   36 +
| | |  docs/requirements/PA3-Group-05/use_case.pdf     |  Bin 0 -> 2208064 bytes
| | |  docs/requirements/PA3-Group-05/use_case.tex     |  114 +-
| | |  145 files changed, 10638 insertions(+), 1051 deletions(-)
| | |
* | | commit ce1b7eda801d344b99b05e511e69ba784d231500
|/ /  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| |   Date:   Sat Nov 14 20:44:39 2026 +0700
| |
| |       add: youtube link, database and backend src
| |
| |    .../ai_usage_report/ai_usage_report.pdf         |  Bin 0 -> 1003194 bytes
| |    .../requirements/PA3-Group-05/figures/UC-01.mmd |   41 +
| |    .../requirements/PA3-Group-05/figures/UC-01.png |  Bin 0 -> 176683 bytes
| |    .../requirements/PA3-Group-05/figures/UC-02.mmd |   30 +
| |    .../requirements/PA3-Group-05/figures/UC-02.png |  Bin 0 -> 118754 bytes
| |    .../requirements/PA3-Group-05/figures/UC-03.mmd |   26 +
| |    .../requirements/PA3-Group-05/figures/UC-03.png |  Bin 0 -> 94467 bytes
| |    .../requirements/PA3-Group-05/figures/UC-04.mmd |   24 +
| |    .../requirements/PA3-Group-05/figures/UC-04.png |  Bin 0 -> 78380 bytes
| |    .../requirements/PA3-Group-05/figures/UC-05.mmd |   31 +
| |    .../requirements/PA3-Group-05/figures/UC-05.png |  Bin 0 -> 115952 bytes
| |    .../requirements/PA3-Group-05/figures/UC-06.mmd |   24 +
| |    .../requirements/PA3-Group-05/figures/UC-06.png |  Bin 0 -> 79594 bytes
| |    .../requirements/PA3-Group-05/figures/UC-07.mmd |   33 +
| |    .../requirements/PA3-Group-05/figures/UC-07.png |  Bin 0 -> 136543 bytes
| |    .../PA3-Group-05/src/backend/.gitattributes     |    1 +
| |    .../PA3-Group-05/src/backend/.gitignore         |   60 +
| |    .../PA3-Group-05/src/backend/.oxlintrc.json     |   10 +
| |    .../PA3-Group-05/src/backend/.prettierignore    |    5 +
| |    .../PA3-Group-05/src/backend/.prettierrc        |    4 +
| |    .../.specify/memory/.constitution-template.json |    4 +
| |    .../src/backend/.specify/memory/constitution.md |  385 ++
| |    .../PA3-Group-05/src/backend/README.md          |  124 +
| |    .../PA3-Group-05/src/backend/nest-cli.json      |    8 +
| |    .../PA3-Group-05/src/backend/package-lock.json  | 6001 +++++++++++++++++
| |    .../PA3-Group-05/src/backend/package.json       |   55 +
| |    .../checklists/requirements.md                  |   35 +
| |    .../contracts/auth-registration.openapi.yaml    |  284 +
| |    .../specs/001-user-registration/data-model.md   |  158 +
| |    .../backend/specs/001-user-registration/plan.md |  125 +
| |    .../specs/001-user-registration/quickstart.md   |  185 +
| |    .../specs/001-user-registration/research.md     |  121 +
| |    .../backend/specs/001-user-registration/spec.md |  131 +
| |    .../specs/001-user-registration/tasks.md        |  234 +
| |    .../002-user-login/checklists/requirements.md   |   36 +
| |    .../contracts/auth-session.openapi.yaml         |  177 +
| |    .../contracts/database-session.md               |  143 +
| |    .../backend/specs/002-user-login/data-model.md  |  204 +
| |    .../src/backend/specs/002-user-login/plan.md    |  192 +
| |    .../backend/specs/002-user-login/quickstart.md  |  179 +
| |    .../backend/specs/002-user-login/research.md    |  223 +
| |    .../src/backend/specs/002-user-login/spec.md    |  161 +
| |    .../src/backend/specs/002-user-login/tasks.md   |  255 +
| |    .../checklists/requirements.md                  |   36 +
| |    .../contracts/api.md                            |  154 +
| |    .../003-otp-register-activation/data-model.md   |  118 +
| |    .../specs/003-otp-register-activation/plan.md   |   95 +
| |    .../003-otp-register-activation/quickstart.md   |  159 +
| |    .../003-otp-register-activation/research.md     |  156 +
| |    .../specs/003-otp-register-activation/spec.md   |  123 +
| |    .../specs/003-otp-register-activation/tasks.md  |  227 +
| |    .../PA3-Group-05/src/backend/src/app.module.ts  |   11 +
| |    .../src/backend/src/common/exception-factory.ts |    9 +
| |    .../src/backend/src/common/interceptor.ts       |   27 +
| |    .../src/common/response-code/code.config.ts     |   33 +
| |    .../src/backend/src/common/response.dto.ts      |   30 +
| |    .../src/backend/src/config/app.config.ts        |    1 +
| |    .../PA3-Group-05/src/backend/src/main.ts        |   23 +
| |    .../__tests__/auth.controller.spec.ts           |   88 +
| |    .../__tests__/auth.service.mock.ts              |   44 +
| |    .../__tests__/auth.service.spec.ts              |   49 +
| |    .../authentication/__tests__/auth.testcase.ts   |  148 +
| |    .../packages/authentication/auth.controller.ts  |  126 +
| |    .../src/packages/authentication/auth.module.ts  |   14 +
| |    .../src/packages/authentication/auth.service.ts |  110 +
| |    .../authentication/config/auth.config.ts        |    7 +
| |    .../decorartors/displayname.decorator.ts        |   26 +
| |    .../decorartors/email.decorator.ts              |   27 +
| |    .../decorartors/password.decorator.ts           |   32 +
| |    .../decorartors/username.decorator.ts           |   26 +
| |    .../packages/authentication/dto/login.dto.ts    |    5 +
| |    .../packages/authentication/dto/logout.dto.ts   |   10 +
| |    .../authentication/dto/otp-response.dto.ts      |   15 +
| |    .../authentication/dto/recover-password.dto.ts  |   22 +
| |    .../authentication/dto/refresh-token.dto.ts     |    3 +
| |    .../packages/authentication/dto/register.dto.ts |   18 +
| |    .../__tests__/email-sender.service.mock.ts      |    9 +
| |    .../__tests__/email-sender.service.spec.ts      |  135 +
| |    .../src/packages/email-sender/discord.config.ts |   41 +
| |    .../email-sender/email-sender.config.ts         |   13 +
| |    .../email-sender/email-sender.module.ts         |    8 +
| |    .../email-sender/email-sender.service.ts        |   68 +
| |    .../email-sender/models/email-sender.model.ts   |   47 +
| |    .../email-sender/models/email-template.model.ts |   76 +
| |    .../postgres/__tests__/pg.register.testcases.ts |  741 ++
| |    .../postgres/__tests__/pg.service.mock.ts       |  121 +
| |    .../postgres/__tests__/pg.service.spec.ts       |   84 +
| |    .../packages/postgres/__tests__/pg.testcases.ts |   98 +
| |    .../packages/postgres/__tests__/pool.mock.ts    |  107 +
| |    .../src/packages/postgres/dto/SQLSTATE.dto.ts   |   24 +
| |    .../src/packages/postgres/dto/response.dto.ts   |   13 +
| |    .../backend/src/packages/postgres/pg.config.ts  |    9 +
| |    .../backend/src/packages/postgres/pg.module.ts  |    8 +
| |    .../backend/src/packages/postgres/pg.service.ts |  262 +
| |    .../__tests__/recaptcha.service.mock.ts         |   11 +
| |    .../src/packages/recaptcha/recaptcha.module.ts  |    8 +
| |    .../src/packages/recaptcha/recaptcha.service.ts |    8 +
| |    .../__test__/sg.service.spec.ts                 |   56 +
| |    .../security-generation/decorators/sg.mock.ts   |   12 +
| |    .../decorators/token-bearer.decorators.ts       |   34 +
| |    .../security-generation/dto/key-response.dto.ts |   18 +
| |    .../security-generation/dto/secret.dto.ts       |   10 +
| |    .../packages/security-generation/sg.config.ts   |   18 +
| |    .../packages/security-generation/sg.guard.ts    |    8 +
| |    .../packages/security-generation/sg.module.ts   |   12 +
| |    .../packages/security-generation/sg.service.ts  |  113 +
| |    .../backend/src/packages/web/web.controller.ts  |   29 +
| |    .../src/backend/src/packages/web/web.guard.ts   |   10 +
| |    .../src/backend/src/packages/web/web.module.ts  |   10 +
| |    .../src/backend/src/packages/web/web.service.ts |   13 +
| |    .../backend/test/auth-registration.e2e-spec.ts  |   98 +
| |    .../src/backend/tsconfig.build.json             |   11 +
| |    .../PA3-Group-05/src/backend/tsconfig.json      |   23 +
| |    .../src/backend/vitest.config.e2e.ts            |   10 +
| |    .../PA3-Group-05/src/backend/vitest.config.ts   |   12 +
| |    .../PA3-Group-05/src/database/.gitignore        |    6 +
| |    .../src/database/.specify/.gitignore            |   14 +
| |    .../.specify/memory/.constitution-template.json |    4 +
| |    .../database/.specify/memory/constitution.md    |  206 +
| |    .../src/database/.specify/memory/mission.md     |   19 +
| |    .../src/database/.specify/memory/roadmap.md     |   39 +
| |    .../src/database/.specify/memory/tech-stack.md  |   31 +
| |    .../PA3-Group-05/src/database/README.md         |  260 +
| |    .../src/database/config/database.config.ts      |   17 +
| |    .../PA3-Group-05/src/database/package-lock.json | 1707 +++++
| |    .../PA3-Group-05/src/database/package.json      |   28 +
| |    .../001-auth-schema/checklists/requirements.md  |   35 +
| |    .../contracts/authentication-functions.md       |  234 +
| |    .../specs/001-auth-schema/data-model.md         |  161 +
| |    .../src/database/specs/001-auth-schema/plan.md  |  150 +
| |    .../specs/001-auth-schema/quickstart.md         |   90 +
| |    .../database/specs/001-auth-schema/research.md  |  147 +
| |    .../src/database/specs/001-auth-schema/spec.md  |  135 +
| |    .../src/database/specs/001-auth-schema/tasks.md |  218 +
| |    .../src/database/src/definitions/email.init.sql |    2 +
| |    .../database/src/definitions/username.init.sql  |    2 +
| |    .../src/functions/authentication/_register.sql  |    1 +
| |    .../activate-account.session-check.sql          |   12 +
| |    .../email-validation.ev.account_domain.sql      |   18 +
| |    .../authentication/get-email.account.sql        |    7 +
| |    .../authentication/get-otp.session.sql          |    6 +
| |    .../functions/authentication/login.session.sql  |   27 +
| |    .../functions/authentication/logout.session.sql |   10 +
| |    .../authentication/register.ev_uv_session.sql   |   22 +
| |    .../authentication/remove-otp.session.sql       |   10 +
| |    .../authentication/save-otp.session.sql         |   10 +
| |    .../authentication/session-check.session.sql    |   17 +
| |    .../username-validation.uv.account.sql          |   12 +
| |    .../src/database/src/schemas/_init.sql          |    1 +
| |    .../src/database/src/schemas/init.sql           |    3 +
| |    .../src/tables/account.email_username.sql       |   17 +
| |    .../src/database/src/tables/domain.init.sql     |   20 +
| |    .../src/database/src/tables/session.account.sql |   15 +
| |    .../authentication/active-account.spec.ts       |  125 +
| |    .../authentication/email-validation.spec.ts     |   67 +
| |    .../functions/authentication/full-flow.spec.ts  |  193 +
| |    .../functions/authentication/get-email.spec.ts  |   96 +
| |    .../functions/authentication/get-otp.spec.ts    |  139 +
| |    .../tests/functions/authentication/helpers.ts   |  108 +
| |    .../functions/authentication/login.spec.ts      |  125 +
| |    .../functions/authentication/logout.spec.ts     |  106 +
| |    .../pg.email-validation.testcases.ts            |   79 +
| |    .../authentication/pg.full-flow.testcases.ts    |  105 +
| |    .../authentication/pg.login.testcases.ts        |   72 +
| |    .../authentication/pg.register.testcases.ts     |  799 +++
| |    .../pg.username-validation.testcases.ts         |   29 +
| |    .../authentication/register-session.spec.ts     |   77 +
| |    .../functions/authentication/register.spec.ts   |   39 +
| |    .../functions/authentication/remove-otp.spec.ts |  108 +
| |    .../functions/authentication/save-otp.spec.ts   |   94 +
| |    .../authentication/session-check.spec.ts        |  104 +
| |    .../authentication/username-validation.spec.ts  |   54 +
| |    .../src/database/tests/migrations/init.spec.ts  |   26 +
| |    .../PA3-Group-05/src/database/tsconfig.json     |   45 +
| |    .../PA3-Group-05/src/database/vitest.config.ts  |   11 +
| |    docs/requirements/PA3-Group-05/use_case.tex     | 1666 +++++
| |    .../PA3-Group-05/use_case_diagrams.md           |  245 +
| |    .../weekly_report/weekly_report1.pdf            |  Bin 0 -> 245557 bytes
| |    .../weekly_report/weekly_report2.pdf            |  Bin 0 -> 222967 bytes
| |    docs/requirements/PA3-Group-05/youtelink.md     |    1 +
| |    docs/requirements/PA3-Group-05/youtelink.pdf    |  Bin 0 -> 28314 bytes
| |    src/backend                                     |    2 +-
| |    182 files changed, 22296 insertions(+), 1 deletion(-)
| |
* |   commit 9790d8fb7f0b5a012214e8a72a8689690bcca600
|\ \  Merge: 6c6ddb8 3106acd
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Nov 14 20:26:29 2026 +0700
| | |
| | |     Merge remote-tracking branch 'origin/dev' into docs/use-cases
| | |
| * |   commit 3106acd55b225ae71bab5b09cd4c36d7f9b74709
| |\ \  Merge: 6651649 51063d7
| | | | Author: Unauthorized user <ntan2419@apcs.fitus.edu.vn>
| | | | Date:   Sat Nov 14 19:51:55 2026 +0700
| | | |
| | | |     Merge pull request #20 from RoundFloor/docs/ai_usage_report
| | | |
| | | |     docs: add ai usage report
| | | |
| | * | commit 51063d7c9fcab17de55383dedcaac70a14b9717d
| |/ /  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | |   Date:   Sat Nov 14 19:50:15 2026 +0700
| | |
| | |       docs: add ai usage report
| | |
| | |    .../ai_usage_report/ai_usage_report.md        |  73 ++++++++++++++++++
| | |    .../ai_usage_report/images/image_1.jpeg       | Bin 0 -> 118977 bytes
| | |    .../ai_usage_report/images/image_2.jpeg       | Bin 0 -> 147731 bytes
| | |    .../ai_usage_report/images/image_3.png        | Bin 0 -> 172405 bytes
| | |    .../ai_usage_report/images/image_4.jpeg       | Bin 0 -> 135171 bytes
| | |    .../ai_usage_report/images/image_5.png        | Bin 0 -> 170153 bytes
| | |    .../ai_usage_report/images/image_6.png        | Bin 0 -> 172536 bytes
| | |    7 files changed, 73 insertions(+)
| | |
| * |   commit 66516491e6dc4ecf5d8cbfb7f7f718f6a233a296
| |\ \  Merge: 4f76542 a61e25f
| | | | Author: Unauthorized user <ntan2419@apcs.fitus.edu.vn>
| | | | Date:   Sat Nov 14 19:00:36 2026 +0700
| | | |
| | | |     Merge pull request #19 from RoundFloor/docs/weekly_report
| | | |
| | | |     docs: add weekly report
| | | |
| | * | commit a61e25fbc6ba853a60184045e5b8a17c21162189
| |/ /  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | |   Date:   Sat Nov 14 18:58:46 2026 +0700
| | |
| | |       docs: add weekly report
| | |
| | |    .../weekly_report/weekly_report2.md           |  14 +++---
| | |    docs/requirements/PA3-Group-05/Changes.md     |   2 +-
| | |    .../weekly_report/images/week1_jira_task.jpeg | Bin 0 -> 146837 bytes
| | |    .../weekly_report/images/week2_jira_task.jpeg | Bin 0 -> 116613 bytes
| | |    .../weekly_report/weekly_report1.md           |  47 ++++++++++++++++++
| | |    .../weekly_report/weekly_report2.md           |  47 ++++++++++++++++++
| | |    6 files changed, 101 insertions(+), 9 deletions(-)
| | |
| * |   commit 4f76542c8b5d022a7941cad51e2d90ba9abf4175
| |\ \  Merge: 888ca8d e72fe9b
| | | | Author: Unauthorized user <ntan2419@apcs.fitus.edu.vn>
| | | | Date:   Sat Nov 14 17:54:07 2026 +0700
| | | |
| | | |     docs: Revise Vision Document
| | | |
| | | |     Revise Vision Document
| | | |
| | * | commit e72fe9b3edce8545795bcc06059de6cdfdcf0c31
| | | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | | Date:   Sat Nov 14 17:01:05 2026 +0700
| | | |
| | | |     docs: Added some environmental constraints in Vision Document
| | | |
| | | |  docs/requirements/PA3-Group-05/Changes.md | 6 ++++--
| | | |  1 file changed, 4 insertions(+), 2 deletions(-)
| | | |
| | * | commit cb00f36e4822f7c47b8215c27a3087b0af461ab2
| | | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | | Date:   Sat Nov 14 16:48:32 2026 +0700
| | | |
| | | |     docs: Added additional authentication-related NFRs for Vision Document
| | | |
| | | |  docs/requirements/PA3-Group-05/Changes.md | 15 +++++++++++----
| | | |  1 file changed, 11 insertions(+), 4 deletions(-)
| | | |
| * | |   commit 888ca8d8e0fd33ddfdf2e70704f6f33142278842
| |\ \ \  Merge: b9cf767 4715976
| | |/ /  Author: Unauthorized user <ntan2006personal@gmail.com>
| |/| |   Date:   Sat Nov 14 17:46:18 2026 +0700
| | | |
| | | |       Merge pull request #17 from RoundFloor/docs/use-cases
| | | |
| | | |       docs: use-case diagram and specification
| | | |
| | * | commit 4715976403bf9879fb3c68aa0f9c783ba82abbcb
| | | | Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| | | | Date:   Sat Nov 14 17:03:40 2026 +0700
| | | |
| | | |     doc: fix use case doc
| | | |
| | | |  docs/requirements/PA3-Group-05/use_case.md | 14 +++++++-------
| | | |  1 file changed, 7 insertions(+), 7 deletions(-)
| | | |
| * | |   commit b9cf767220d5f9ee621716fdcf134b2937700bf2
| |\ \ \  Merge: d35351e 3946ee9
| | | | | Author: Tuan <tuan06nbk@gmail.com>
| | | | | Date:   Sat Nov 14 16:14:02 2026 +0700
| | | | |
| | | | |     Merge branch 'dev' of https://github.com/RoundFloor/Studitopia into dev
| | | | |
| | * | | commit 3946ee9dcf669fc1e0c3f349f1dc81a15feae86b
| | | | | Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| | | | | Date:   Sat Nov 14 16:07:32 2026 +0700
| | | | |
| | | | |     doc: fix development plan for PA3
| | | | |
| | | | |  docs/requirements/PA3-Group-05/Changes.md | 23 +++++++++++----------
| | | | |  1 file changed, 12 insertions(+), 11 deletions(-)
| | | | |
| * | | | commit d35351e52ffd8a383fcde4d641af915097868ddc
| |/ / /  Author: Tuan <tuan06nbk@gmail.com>
| | | |   Date:   Sat Nov 14 16:13:48 2026 +0700
| | | |
| | | |       edit: Give more details about Platform Structure, Target Users and Expected Benefits
| | | |
| | | |    docs/requirements/PA3-Group-05/Changes.md | 41 +++++++++++++++++++++
| | | |    1 file changed, 41 insertions(+)
| | | |
* | | | commit 6c6ddb8a763dac9ce45f0756284f93dcd209b965
| |/ /  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
|/| |   Date:   Sat Nov 14 20:26:20 2026 +0700
| | |
| | |       git graph
| | |
| | |    docs/requirements/PA3-Group-05.md             | 877 -----------------
| | |    .../PA3-Group-05/git-graph/backend.md         | 577 +++++++++++
| | |    .../PA3-Group-05/git-graph/backend.pdf        | Bin 0 -> 51370 bytes
| | |    .../PA3-Group-05/git-graph/database.md        | 397 ++++++++
| | |    .../PA3-Group-05/git-graph/database.pdf       | Bin 0 -> 41092 bytes
| | |    .../PA3-Group-05/git-graph/frontend.md        | 579 +++++++++++
| | |    .../PA3-Group-05/git-graph/frontend.pdf       | Bin 0 -> 50882 bytes
| | |    .../PA3-Group-05/git-graph/total.md           | 918 ++++++++++++++++++
| | |    .../PA3-Group-05/git-graph/total.pdf          | Bin 0 -> 65924 bytes
| | |    src/database                                  |   2 +-
| | |    src/frontend                                  |   2 +-
| | |    11 files changed, 2473 insertions(+), 879 deletions(-)
| | |
* | | commit 21b4c54c5f072c0535247f65490ec5624b0d702f
|/ /  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| |   Date:   Sat Nov 14 16:35:59 2026 +0700
| |
| |       add: use case model and description
| |
| |    .../proposals/use_cases_description.md          |  560 ++++++++
| |    .../PA3-Group-05/proposals/use_cases_model.md   |  104 ++
| |    .../use_cases_model/UC-01-register-account.md   |   98 ++
| |    .../proposals/use_cases_model/UC-02-log-in.md   |   83 ++
| |    .../UC-03-browse-search-forum.md                |   79 ++
| |    .../UC-04-create-discussion-post.md             |   76 ++
| |    .../use_cases_model/UC-05-comment-answer.md     |   85 ++
| |    .../UC-06-share-learning-resource.md            |   76 ++
| |    .../UC-07-join-create-study-room.md             |   94 ++
| |    docs/requirements/PA3-Group-05/use_case.md      | 1200 +++++++++++++++++
| |    10 files changed, 2455 insertions(+)
| |
* | commit 8ecb78166d27636e5113a8d8d9cd37c2c4dd5975
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Nov 14 15:37:15 2026 +0700
| |
| |     add: raw changes log
| |
| |  docs/requirements/PA3-Group-05.md                | 877 +++++++++++++++++++
| |  docs/requirements/PA3-Group-05/Changes.md        | 849 ++++++++++++++++++
| |  docs/requirements/PA3-Group-05/proposals/API.md  | 785 +++++++++++++++++
| |  .../PA3-Group-05/proposals/feature_flow.md       | 173 ++++
| |  .../proposals/functional_requirement.md          | 577 ++++++++++++
| |  .../proposals/non_functional_requirement.md      |  59 ++
| |  .../PA3-Group-05/proposals/overview.md           | 170 ++++
| |  .../PA3-Group-05/proposals/response_code.md      |  79 ++
| |  .../PA3-Group-05/proposals/screen_flow.md        |  81 ++
| |  .../PA3-Group-05/proposals/userstory.md          | 721 +++++++++++++++
| |  src/backend                                      |   2 +-
| |  src/database                                     |   2 +-
| |  src/frontend                                     |   2 +-
| |  13 files changed, 4374 insertions(+), 3 deletions(-)
| |
* | commit a674bf5f869023724747102d05f0908bbb57d0b1
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Nov 7 15:22:59 2026 +0700
| |
| |     update: API of authentication group in backend and database
| |
| |  docs/requirements/API.md  | 1049 +++++++++++++++++++++++++++++++++++++++++
| |  docs/requirements/API.pdf |  Bin 0 -> 622769 bytes
| |  src/database              |    2 +-
| |  3 files changed, 1050 insertions(+), 1 deletion(-)
| |
* | commit 1642f190b673e3955e83202842b2194efbcd94da
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 23:31:56 2026 +0700
| |
| |     docs: compile reference into pdf
| |
| |  docs/requirements/PA2-Group05/git_proof.md       |   2 ++
| |  docs/requirements/PA2-Group05/git_proof.pdf      | Bin 171495 -> 117086 bytes
| |  docs/requirements/PA2-Group05/proposals/API.pdf  | Bin 0 -> 103840 bytes
| |  .../PA2-Group05/proposals/feature_flow.pdf       | Bin 0 -> 29359 bytes
| |  .../proposals/functional_requirement.pdf         | Bin 0 -> 182201 bytes
| |  .../proposals/non_functional_requirement.pdf     | Bin 0 -> 44861 bytes
| |  .../PA2-Group05/proposals/overview.pdf           | Bin 0 -> 76158 bytes
| |  .../PA2-Group05/proposals/response_code.pdf      | Bin 0 -> 39029 bytes
| |  .../PA2-Group05/proposals/screen_flow.pdf        | Bin 0 -> 22235 bytes
| |  .../PA2-Group05/proposals/userstory.pdf          | Bin 0 -> 426406 bytes
| |  10 files changed, 2 insertions(+)
| |
* | commit 69aa4a5ce43fc299238b940288045e1dd9927063
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 31 19:30:15 2026 +0700
| |
| |     docs: final PA2
| |
| |  .gitignore                                        |   2 +-
| |  .../ai_usage_report/ai_usage_report.md            |   0
| |  .../ai_usage_report/ai_usage_report.pdf           | Bin 0 -> 1079033 bytes
| |  .../ai_usage_report/images/image_1.jpeg           | Bin
| |  .../ai_usage_report/images/image_2.jpeg           | Bin
| |  .../ai_usage_report/images/image_3.jpeg           | Bin
| |  .../ai_usage_report/images/image_4.jpeg           | Bin
| |  .../ai_usage_report/images/image_5.png            | Bin
| |  .../ai_usage_report/images/image_6.png            | Bin
| |  .../ai_usage_report/images/image_7.png            | Bin
| |  .../constitutions/backend/constitution.md         |   0
| |  .../constitutions/database/constitution.md        |   0
| |  .../constitutions/frontend/constitution.md        |   0
| |  .../{PA2 => PA2-Group05}/git_proof.md             |   0
| |  .../{PA2 => PA2-Group05}/git_proof.pdf            | Bin
| |  .../{PA2 => PA2-Group05}/proposals/API.md         |   0
| |  .../proposals/feature_flow.md                     |   0
| |  .../proposals/functional_requirement.md           |   0
| |  .../proposals/non_functional_requirement.md       |   0
| |  .../{PA2 => PA2-Group05}/proposals/overview.md    |   0
| |  .../proposals/response_code.md                    |   0
| |  .../{PA2 => PA2-Group05}/proposals/screen_flow.md |   0
| |  .../{PA2 => PA2-Group05}/proposals/userstory.md   |   0
| |  .../software_development_plan.md                  |   0
| |  .../software_development_plan.pdf                 | Bin
| |  .../software_development_plan.tex                 |   0
| |  .../software_development_vision.md                |   0
| |  .../software_development_vision.pdf               | Bin
| |  .../software_development_vision.tex               |   0
| |  .../speckit-training/24125024.png                 | Bin
| |  .../speckit-training/24125025.png                 | Bin
| |  .../speckit-training/24125026.png                 | Bin
| |  .../speckit-training/24125048.png                 | Bin
| |  .../speckit-training/24125100.png                 | Bin
| |  .../weekly_report/images/week1_jira_task.png      | Bin
| |  .../weekly_report/images/week2_jira_task.png      | Bin
| |  .../weekly_report/weekly_report1.md               |   0
| |  .../weekly_report/weekly_report1.pdf              | Bin
| |  .../weekly_report/weekly_report2.md               |   0
| |  .../weekly_report/weekly_report2.pdf              | Bin
| |  40 files changed, 1 insertion(+), 1 deletion(-)
| |
* |   commit fafb50f3a646cf78e04602d71bda26356020d49f
|\ \  Merge: f9d392a 721dae6
| | | Author: Unauthorized user <ntan2006personal@gmail.com>
| | | Date:   Sat Oct 31 19:04:02 2026 +0700
| | |
| | |     Merge pull request #16 from RoundFloor/docs/ai_usage_report
| | |
| | |     docs: add ai usage report
| | |
| * | commit 721dae6c5e78c2d754551c683c7ae302ad05fda3
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Sat Oct 31 19:02:07 2026 +0700
| | |
| | |     docs: add ai usage report
| | |
| | |  .../PA2/ai_usage_report/ai_usage_report.md      |  40 ++++++++++++++++++
| | |  .../PA2/ai_usage_report/images/image_1.jpeg     | Bin 0 -> 115248 bytes
| | |  .../PA2/ai_usage_report/images/image_2.jpeg     | Bin 0 -> 117255 bytes
| | |  .../PA2/ai_usage_report/images/image_3.jpeg     | Bin 0 -> 113286 bytes
| | |  .../PA2/ai_usage_report/images/image_4.jpeg     | Bin 0 -> 144022 bytes
| | |  .../PA2/ai_usage_report/images/image_5.png      | Bin 0 -> 200459 bytes
| | |  .../PA2/ai_usage_report/images/image_6.png      | Bin 0 -> 150463 bytes
| | |  .../PA2/ai_usage_report/images/image_7.png      | Bin 0 -> 150674 bytes
| | |  8 files changed, 40 insertions(+)
| | |
* | | commit f9d392a3f7d6a0b2738e633d4c3978882560e369
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 18:25:31 2026 +0700
| | |
| | |     docs: add git proof
| | |
| | |  docs/requirements/PA2/git_proof.md  | 1477 +++++++++++++++++++++++++++++
| | |  docs/requirements/PA2/git_proof.pdf |  Bin 0 -> 171495 bytes
| | |  2 files changed, 1477 insertions(+)
| | |
* | | commit 5e28a0f25e6e9ddc7e82cf12736cdfe364f76534
|/ /  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| |   Date:   Sat Oct 31 18:10:07 2026 +0700
| |
| |       docs: compile weekly reports and software requirements
| |
| |    .../PA2/{plan => }/software_development_plan.md |   0
| |    .../PA2/software_development_plan.pdf           | Bin 0 -> 342826 bytes
| |    .../PA2/software_development_plan.tex           | 752 ++++++++++++++++++
| |    ...vision.md => software_development_vision.md} |   0
| |    ...sion.pdf => software_development_vision.pdf} | Bin
| |    ...sion.tex => software_development_vision.tex} |   0
| |    .../weekly_report/images/week1_jira_task.png    | Bin 0 -> 184764 bytes
| |    .../weekly_report/images/week2_jira_task.png    | Bin 0 -> 332848 bytes
| |    .../PA2/weekly_report/weekly_report1.md         |   2 +-
| |    .../PA2/weekly_report/weekly_report1.pdf        | Bin 0 -> 230239 bytes
| |    .../PA2/weekly_report/weekly_report2.md         |   2 +-
| |    .../PA2/weekly_report/weekly_report2.pdf        | Bin 0 -> 349883 bytes
| |    12 files changed, 754 insertions(+), 2 deletions(-)
| |
* |   commit b76f856d1d513c1c1a641f7b6b3d4fcbacd56332
|\ \  Merge: bf177f1 916f856
| | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 17:16:58 2026 +0700
| | |
| | |     Merge pull request #15 from RoundFloor/docs/weekly_report
| | |
| | |     docs: add weekly report
| | |
| * | commit 916f8561d52ff9b6d9b1e18b30fbdba4bffacf19
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Sat Oct 31 16:09:27 2026 +0700
| | |
| | |     docs: add weekly report
| | |
| | |  .../PA1/weekly_report/weekly_report1.md         | 107 ------------------
| | |  .../PA2/weekly_report/weekly_report1.md         |  95 ++++++++++++++++
| | |  .../PA2/weekly_report/weekly_report2.md         |  97 ++++++++++++++++
| | |  3 files changed, 192 insertions(+), 107 deletions(-)
| | |
* | | commit bf177f1e5612394fd831f13b1017555c2e4f06e6
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 14:24:50 2026 +0700
| | |
| | |     docs: compile vision.pdf
| | |
| | |  docs/requirements/PA2/vision.md                 | 487 ++++++++++++
| | |  docs/requirements/PA2/vision.pdf                | Bin 0 -> 977654 bytes
| | |  docs/requirements/PA2/vision.tex                | 712 ++++++++++++++++++
| | |  docs/requirements/PA2/vision/0-initials.md      |  44 --
| | |  docs/requirements/PA2/vision/1-introduction.md  |  32 -
| | |  docs/requirements/PA2/vision/2-positioning.md   |  51 --
| | |  .../3-stakeholder-and-user-descriptions.md      |  86 ---
| | |  .../PA2/vision/4-project-overview.md            | 145 ----
| | |  .../PA2/vision/5-product-feature.md             |  98 ---
| | |  .../PA2/vision/6-non-functional-requirement.md  |  29 -
| | |  docs/templates/report_templates.tex             |  14 +-
| | |  11 files changed, 1208 insertions(+), 490 deletions(-)
| | |
* | |   commit 687efb8d0b200f97eeac7752b3d08b9363a086d1
|\ \ \  Merge: 441cdf0 5efbb51
| | | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | | Date:   Sat Oct 31 14:03:16 2026 +0700
| | | |
| | | |     Merge remote-tracking branch 'origin/origin/docs/PA2-SW-dev-Plan' into dev
| | | |
| * | | commit 5efbb5136a109e2b13b9045cd55443f4ec7d8987
| | | | Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| | | | Date:   Sat Oct 31 07:56:35 2026 +0700
| | | |
| | | |     doc: add project organisation to PA2
| | | |
| | | |  docs/requirements/PA2/software_development_plan.md | 12 ++++++------
| | | |  1 file changed, 6 insertions(+), 6 deletions(-)
| | | |
| * | | commit b4b6ff32c0239bb7d9834f798813e9946da30eb5
| | | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | | Date:   Sat Oct 31 00:48:29 2026 +0700
| | | |
| | | |     docs: Add management process in development plan
| | | |
| | | |  .../PA2/software_development_plan.md          | 274 +++++++++++++++---
| | | |  1 file changed, 233 insertions(+), 41 deletions(-)
| | | |
| * | | commit 7eb20bcecea3a7e13b53816bf9bc1505dc6da1d5
| | | | Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| | | | Date:   Fri Oct 30 18:35:05 2026 +0700
| | | |
| | | |     doc: add workflow diagram to PA2
| | | |
| | | |  docs/requirements/PA2/workflow_diagram.md | 57 +++++++++++++++++++++++
| | | |  1 file changed, 57 insertions(+)
| | | |
| * | | commit 02748be8712d9094df7292743b44226fa13c001f
| |/ /  Author: Tuan <tuan06nbk@gmail.com>
| | |   Date:   Thu Oct 29 11:18:04 2026 +0700
| | |
| | |       Add Software Development Plan and related documentation for Studitopia project
| | |
| | |       - Added `software_development_plan.md` detailing the Studitopia project, including purpose, scope, objectives, deliverables, and project organization.
| | |
| | |    docs/requirements/PA2/PA2.md                  |   0
| | |    docs/requirements/PA2/req/PA2-2026 (1).pdf    | Bin 0 -> 222739 bytes
| | |    docs/requirements/PA2/req/dot_strings.txt     | 467 ++++++++++++++++++
| | |    docs/requirements/PA2/req/rup_sdpln_sp.docx   | Bin 0 -> 77312 bytes
| | |    .../PA2/req/rup_sdpln_sp.dot (1).doc          | Bin 0 -> 76288 bytes
| | |    .../PA2/req/rup_vision_sp-example.docx        | Bin 0 -> 30732 bytes
| | |    .../PA2/req/rup_vision_sp-example_doc.xml     |   2 +
| | |    docs/requirements/PA2/req/sdpln_strings.txt   | 389 +++++++++++++++
| | |    .../PA2/software_development_plan.md          | 159 ++++++
| | |    src/backend                                   |   2 +-
| | |    src/database                                  |   2 +-
| | |    src/frontend                                  |   2 +-
| | |    12 files changed, 1020 insertions(+), 3 deletions(-)
| | |
* | |   commit 441cdf09d710cca1714855c3434c0eb533b7c2c5
|\ \ \  Merge: abb3635 010513b
| | | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | | Date:   Sat Oct 31 08:44:48 2026 +0700
| | | |
| | | |     Merge pull request #13 from RoundFloor/docs/PA2/vision-document-p1
| | | |
| | | |     Docs/pa2/vision document p1
| | | |
| * | | commit 010513b705e9c7cdc642ac5bc8495cefe18511d1
| | | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | | Date:   Sat Oct 31 00:52:49 2026 +0700
| | | |
| | | |     docs: Write 0-initials.md of vision document
| | | |
| | | |  docs/requirements/PA2/plan/0-initials.md | 44 ++++++++++++++++++++++++
| | | |  1 file changed, 44 insertions(+)
| | | |
| * | | commit 6d1287bbf6dc2e81b3a5de373acb0c861c9f507c
| | | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | | Date:   Sat Oct 31 00:42:50 2026 +0700
| | | |
| | | |     docs: Write 3-stakeholder-and-user-descriptions.md of vision document
| | | |
| | | |  .../3-stakeholder-and-user-descriptions.md    | 86 +++++++++++++++++++
| | | |  1 file changed, 86 insertions(+)
| | | |
| * | | commit b0a7838daf5321712b15c7aad1a9ea5c98fa80ae
| | | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | | Date:   Sat Oct 31 00:24:36 2026 +0700
| | | |
| | | |     docs: Write 2-positioning.md of vision document
| | | |
| | | |  docs/requirements/PA2/plan/2-positioning.md | 51 +++++++++++++++++++++
| | | |  1 file changed, 51 insertions(+)
| | | |
| * | | commit 2c71eb3412c89d7005c0345bc8250ae064211d1b
| |/ /  Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | |   Date:   Sat Oct 31 00:21:24 2026 +0700
| | |
| | |       docs: Write 1-introduction.md of vision document
| | |
| | |    docs/requirements/PA2/plan/1-introduction.md | 32 ++++++++++++++++++++
| | |    1 file changed, 32 insertions(+)
| | |
* | |   commit abb36350ccebdaff28670fa4d0273532f08db027
|\ \ \  Merge: 7de0139 7e78567
| |/ /  Author: Nah <huynguyenlequoc13@gmail.com>
|/| |   Date:   Sat Oct 31 08:42:40 2026 +0700
| | |
| | |       Merge pull request #12 from RoundFloor/docs/PA2/project-overview
| | |
| | |       Docs/pa2/pdoduct overview
| | |
| * | commit 7e78567ebe36cbf6676634ddcf23fe30830e2ffc
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 08:38:42 2026 +0700
| | |
| | |     docs: add proof of 024 and 026
| | |
| | |  .../PA2/speckit-training/24125024.png            | Bin 0 -> 322256 bytes
| | |  .../PA2/speckit-training/24125026.png            | Bin 0 -> 479383 bytes
| | |  2 files changed, 0 insertions(+), 0 deletions(-)
| | |
| * | commit 9cfb790a63bb76443af765c49317fb342e9e0027
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 00:39:04 2026 +0700
| | |
| | |     docs: add constitutions and speckit training proof
| | |
| | |  .../PA2/constitutions/backend/constitution.md   | 282 ++++++++++++++++
| | |  .../PA2/constitutions/database/constitution.md  | 148 +++++++++
| | |  .../PA2/constitutions/frontend/constitution.md  | 306 ++++++++++++++++++
| | |  .../PA2/speckit-training/24125025.png           | Bin 0 -> 831097 bytes
| | |  .../PA2/speckit-training/24125048.png           | Bin 0 -> 103665 bytes
| | |  .../PA2/speckit-training/24125100.png           | Bin 0 -> 1504603 bytes
| | |  src/backend                                     |   2 +-
| | |  7 files changed, 737 insertions(+), 1 deletion(-)
| | |
| * | commit 8b93cfaf9bed8314b298589bc800b0f868162550
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 00:29:31 2026 +0700
| | |
| | |     docs: reference docs of PA2 plan
| | |
| | |  docs/requirements/PA2/proposals/API.md          | 228 +++++
| | |  docs/requirements/PA2/proposals/feature_flow.md | 112 +++
| | |  .../PA2/proposals/functional_requirement.md     | 289 +++++++
| | |  .../PA2/proposals/non_functional_requirement.md |  50 ++
| | |  docs/requirements/PA2/proposals/overview.md     | 185 ++++
| | |  .../requirements/PA2/proposals/response_code.md |  38 +
| | |  docs/requirements/PA2/proposals/screen_flow.md  |  79 ++
| | |  docs/requirements/PA2/proposals/userstory.md    | 807 ++++++++++++++++++
| | |  8 files changed, 1788 insertions(+)
| | |
| * | commit c532a89741d2ea62220d0c3de7910484b2bbab0e
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 00:26:46 2026 +0700
| | |
| | |     docs: non functional requiremment of PA2 plan
| | |
| | |  .../PA2/plan/6-non-functional-requirement.md    | 29 +++++++++++++++++++
| | |  1 file changed, 29 insertions(+)
| | |
| * | commit 399f61acc5ddc7f193c69cd7347d6c803bf43b37
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 00:07:20 2026 +0700
| | |
| | |     add: product features docs of PA2 plan
| | |
| | |  docs/requirements/PA2/plan/5-product-feature.md | 43 +++++++++++++++++++
| | |  1 file changed, 43 insertions(+)
| | |
| * | commit 59f67380877ec51f2614e40c61f1be9edc377c87
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 31 00:01:35 2026 +0700
| | |
| | |     add: product overview of plan PA2
| | |
| | |  .../requirements/PA2/plan/4-project-overview.md | 145 ++++++++++++++++++
| | |  src/backend                                     |   2 +-
| | |  src/database                                    |   2 +-
| | |  src/frontend                                    |   2 +-
| | |  4 files changed, 148 insertions(+), 3 deletions(-)
| | |
| * | commit 776f1e45092b4c2fb3aeb3e9c965662f5243fed0
|/ /  Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| |   Date:   Sun Oct 18 23:05:55 2026 +0700
| |
| |       docs: add AI-feature proposal
| |
| |    docs/proposal/AI-proposal.md | 55 ++++++++++++++++++++++++++++++++++++++
| |    1 file changed, 55 insertions(+)
| |
* |   commit 7de0139fb8ca9158bdf200486cd11c70be340a44
|\ \  Merge: 35d231f 9581146
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sat Oct 17 23:49:41 2026 +0700
| | |
| | |     Merge remote-tracking branch 'origin/docs/fix-latex' into dev
| | |
| * | commit 9581146034d2bd4e406665fd9d6a09537ac9704f
|/ /  Author: Tuan <tuan06nbk@gmail.com>
| |   Date:   Sat Oct 17 22:23:23 2026 +0700
| |
| |       add: images for contract in pdf
| |
| |    docs/requirements/PA1/PA1.pdf                   |  Bin 7634042 -> 8452854 bytes
| |    docs/requirements/PA1/PA1.tex                   |   20 +-
| |    docs/requirements/PA1/out/PA1.aux               |  138 +++
| |    docs/requirements/PA1/out/PA1.fdb_latexmk       |  171 +++
| |    docs/requirements/PA1/out/PA1.fls               |  471 ++++++++
| |    docs/requirements/PA1/out/PA1.log               | 1026 +++++++++++++++++
| |    docs/requirements/PA1/out/PA1.out               |   45 +
| |    docs/requirements/PA1/out/PA1.pdf               |  Bin 0 -> 8452854 bytes
| |    docs/requirements/PA1/out/PA1.synctex.gz        |  Bin 0 -> 132668 bytes
| |    docs/requirements/PA1/out/PA1.toc               |   46 +
| |    docs/requirements/PA1/screenshot/git-graph.png  |  Bin 0 -> 619147 bytes
| |    .../PA1/screenshot/jira-backlog.png             |  Bin 0 -> 414106 bytes
| |    12 files changed, 1916 insertions(+), 1 deletion(-)
| |
* | commit 35d231ff0a98aae558d217a3ab888e58e716bb65
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Sat Oct 17 13:19:29 2026 +0700
| |
| |     add: final PA1
| |
| |  .gitignore                                       |   1 +
| |  docs/requirements/PA1/PA1-Group05.zip            | Bin 0 -> 14918323 bytes
| |  .../23125026.png                                 | Bin
| |  .../24125025.png                                 | Bin
| |  .../24125048.png                                 | Bin
| |  .../24125100.png                                 | Bin
| |  docs/requirements/proposal.md                    |   4 ----
| |  docs/requirements/proposal/1-overview.md         |   0
| |  docs/requirements/proposal/2-userstory.md        |   0
| |  .../proposal/3-functional-requirement.md         |   0
| |  .../proposal/4-nonfunctional-requirement.md      |   0
| |  11 files changed, 1 insertion(+), 4 deletions(-)
| |
* | commit 0a81aa022f3f38b8076297614767b624e3ea88e7
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Fri Oct 16 19:41:09 2026 +0700
| |
| |     add: pdf version for weekly report
| |
| |  .../PA1/weekly_report/weekly_report1.pdf           | Bin 0 -> 159593 bytes
| |  .../PA1/weekly_report/weekly_report2.pdf           | Bin 0 -> 182653 bytes
| |  2 files changed, 0 insertions(+), 0 deletions(-)
| |
* | commit 9c350940990ed12f00b811d5a897787560a83639
| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Fri Oct 16 19:38:29 2026 +0700
| |
| |     add: pdf version for PA1
| |
| |  docs/requirements/PA1/PA1.pdf                    |  Bin 0 -> 7634042 bytes
| |  docs/requirements/PA1/PA1.tex                    | 1080 ++++++++++++++++++
| |  docs/requirements/PA1/appendix/appendix.tex      |    0
| |  docs/requirements/PA1/features/0-title.md        |    1 -
| |  docs/requirements/PA1/features/1-introduction.md |   10 -
| |  .../PA1/features/3-targetuser-platform.md        |    9 -
| |  docs/requirements/PA1/features/4-key-features.md |   31 -
| |  docs/requirements/PA1/features/5-ai-feature.md   |   10 -
| |  docs/requirements/PA1/img/hcmus-logo.png         |  Bin 0 -> 258629 bytes
| |  docs/templates/img/hcmus-logo.png                |  Bin 0 -> 258629 bytes
| |  docs/templates/report_templates.pdf              |  Bin 0 -> 207367 bytes
| |  docs/templates/report_templates.tex              |  145 +++
| |  12 files changed, 1225 insertions(+), 61 deletions(-)
| |
* |   commit 0fe16bc1eef14ef0aa55bcf9e8f12dc4ccd2b553
|\ \  Merge: 28b3249 525dd89
| | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | Date:   Fri Oct 16 09:59:20 2026 +0700
| | |
| | |     Merge pull request #10 from RoundFloor/PA1/git-repository
| | |
| | |     add: folder structure and gitlog
| | |
| * | commit 525dd8991f98685703e5462ea802fcee632f134d
|/ /  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| |   Date:   Fri Oct 16 09:08:09 2026 +0700
| |
| |       add: folder structure and gitlog
| |
| |    docs/requirements/PA1/git_repository.md | 345 ++++++++++++++++++++++++++
| |    1 file changed, 345 insertions(+)
| |
| | * commit 775dc48a91bdf5f073b9372cb900944e1ad23c3c
| |/| Merge: 28b3249 6cce33a
|/| | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Fri Oct 16 10:06:30 2026 +0700
| | |
| | |     WIP on feature/automation-docs: 28b3249 Merge pull request #9 from RoundFloor/PA1/survey
| | |
| | * commit 6cce33aa01b9efc090b73431e7a8ffd98a30660c
| |/  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
|/|   Date:   Fri Oct 16 10:06:30 2026 +0700
| |
| |       index on feature/automation-docs: 28b3249 Merge pull request #9 from RoundFloor/PA1/survey
| |
| |    .agents/skills/speckit-analyze/SKILL.md       | 259 ++++++
| |    .agents/skills/speckit-checklist/SKILL.md     | 383 ++++++++
| |    .agents/skills/speckit-clarify/SKILL.md       | 291 ++++++
| |    .agents/skills/speckit-constitution/SKILL.md  | 179 ++++
| |    .agents/skills/speckit-converge/SKILL.md      | 283 ++++++
| |    .agents/skills/speckit-implement/SKILL.md     | 226 +++++
| |    .agents/skills/speckit-plan/SKILL.md          | 166 ++++
| |    .agents/skills/speckit-specify/SKILL.md       | 345 +++++++
| |    .agents/skills/speckit-tasks/SKILL.md         | 215 +++++
| |    .agents/skills/speckit-taskstoissues/SKILL.md | 117 +++
| |    .specify/.gitignore                           |  14 +
| |    .specify/init-options.json                    |  10 +
| |    .specify/integration.json                     |  15 +
| |    .specify/integrations/agy.manifest.json       |  17 +
| |    .specify/integrations/speckit.manifest.json   |  19 +
| |    .specify/memory/.constitution-template.json   |   4 +
| |    .specify/memory/constitution.md               |  70 ++
| |    .specify/scripts/bash/check-prerequisites.sh  | 243 +++++
| |    .specify/scripts/bash/common.sh               | 942 ++++++++++++++++++++
| |    .specify/scripts/bash/create-new-feature.sh   | 504 +++++++++++
| |    .specify/scripts/bash/resolve-template.sh     |  57 ++
| |    .specify/scripts/bash/setup-plan.sh           |  85 ++
| |    .specify/scripts/bash/setup-tasks.sh          |  94 ++
| |    .specify/templates/checklist-template.md      |  45 +
| |    .specify/templates/constitution-template.md   |  50 ++
| |    .specify/templates/plan-template.md           | 113 +++
| |    .specify/templates/spec-template.md           | 131 +++
| |    .specify/templates/tasks-template.md          | 252 ++++++
| |    .specify/workflows/speckit/workflow.yml       |  74 ++
| |    .specify/workflows/workflow-registry.json     |  13 +
| |    30 files changed, 5216 insertions(+)
| |
* |   commit 28b3249f271b9ca8a7d0bea41cd0b6ada1e6c338
|\ \  Merge: 17a0be0 54b7781
| | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | Date:   Fri Oct 16 08:43:19 2026 +0700
| | |
| | |     Merge pull request #9 from RoundFloor/PA1/survey
| | |
| | |     Pa1/survey
| | |
| * | commit 54b7781989b8028759038b4e446c28c7aeb692f4
| | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Fri Oct 16 07:48:21 2026 +0700
| | |
| | |     add: document of our enhancement and UI patterns resuse
| | |
| | |  docs/requirements/PA1/survey.md        | 312 +++++++++++++++++++++++++++
| | |  docs/requirements/PA1/survey/survey.md |  49 +++++
| | |  2 files changed, 361 insertions(+)
| | |
| * | commit 5175b9a7d62175db0e9aea579a69b47cbcff3149
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Thu Oct 15 20:59:30 2026 +0700
| | |
| | |     docs(PA1-survey): Review and update survey
| | |
| | |  docs/requirements/PA1/survey/survey.md | 88 ++++++++++++++++------------
| | |  1 file changed, 51 insertions(+), 37 deletions(-)
| | |
| * | commit cebd4b8577513d3873a987eb679ed7328997cb23
| | | Author: bao2434 <ncbao2434@apcs.fitus.edu.vn>
| | | Date:   Sun Oct 11 14:30:48 2026 +0700
| | |
| | |     docs (PA1-survey): add Focusmate content to survey
| | |
| | |  .../PA1/survey/image/Focusmate/book_session.png | Bin 0 -> 117090 bytes
| | |  .../PA1/survey/image/Focusmate/calendar.png     | Bin 0 -> 292086 bytes
| | |  .../PA1/survey/image/Focusmate/join_session.png | Bin 0 -> 43112 bytes
| | |  .../image/Focusmate/pre_session_setup.png       | Bin 0 -> 88149 bytes
| | |  .../PA1/survey/image/Focusmate/session.png      | Bin 0 -> 75615 bytes
| | |  docs/requirements/PA1/survey/survey.md          |  44 +++++++++++++++++-
| | |  6 files changed, 42 insertions(+), 2 deletions(-)
| | |
| * | commit 4ea84f71dfce3eb2f2877bb44d3de1db1361bc70
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Sun Oct 11 00:21:22 2026 +0700
| | |
| | |     docs(PA1): create survey for Lifeat app
| | |
| | |  .../PA1/survey/image/Lifeat/calendar_button.png | Bin 0 -> 2045 bytes
| | |  .../PA1/survey/image/Lifeat/chat.png            | Bin 0 -> 55130 bytes
| | |  .../survey/image/Lifeat/explore_mode_screen.png | Bin 0 -> 1024798 bytes
| | |  .../survey/image/Lifeat/focus_mode_screen.png   | Bin 0 -> 2685300 bytes
| | |  .../PA1/survey/image/Lifeat/invite_button.png   | Bin 0 -> 3264 bytes
| | |  .../PA1/survey/image/Lifeat/invite_friend.png   | Bin 0 -> 12648 bytes
| | |  .../PA1/survey/image/Lifeat/media_button.png    | Bin 0 -> 1637 bytes
| | |  .../PA1/survey/image/Lifeat/media_video.png     | Bin 0 -> 119130 bytes
| | |  .../PA1/survey/image/Lifeat/media_window.png    | Bin 0 -> 28615 bytes
| | |  .../PA1/survey/image/Lifeat/notes_button.png    | Bin 0 -> 1709 bytes
| | |  .../PA1/survey/image/Lifeat/notes_create.png    | Bin 0 -> 10751 bytes
| | |  .../PA1/survey/image/Lifeat/notes_window.png    | Bin 0 -> 8948 bytes
| | |  .../survey/image/Lifeat/plan_mode_screen.png    | Bin 0 -> 23608 bytes
| | |  .../PA1/survey/image/Lifeat/plan_project.png    | Bin 0 -> 17901 bytes
| | |  .../PA1/survey/image/Lifeat/project_create.png  | Bin 0 -> 21159 bytes
| | |  .../PA1/survey/image/Lifeat/project_edit.png    | Bin 0 -> 10461 bytes
| | |  .../PA1/survey/image/Lifeat/project_manager.png | Bin 0 -> 21115 bytes
| | |  .../PA1/survey/image/Lifeat/sound_button.png    | Bin 0 -> 1822 bytes
| | |  .../PA1/survey/image/Lifeat/sound_window.png    | Bin 0 -> 39190 bytes
| | |  .../PA1/survey/image/Lifeat/space_button.png    | Bin 0 -> 2361 bytes
| | |  .../PA1/survey/image/Lifeat/space_favorite.png  | Bin 0 -> 355928 bytes
| | |  .../survey/image/Lifeat/space_favorite_list.png | Bin 0 -> 18982 bytes
| | |  .../PA1/survey/image/Lifeat/space_search.png    | Bin 0 -> 413398 bytes
| | |  .../PA1/survey/image/Lifeat/space_window.png    | Bin 0 -> 372873 bytes
| | |  .../PA1/survey/image/Lifeat/task_button.png     | Bin 0 -> 1384 bytes
| | |  .../PA1/survey/image/Lifeat/task_create.png     | Bin 0 -> 9233 bytes
| | |  .../PA1/survey/image/Lifeat/task_edit.png       | Bin 0 -> 12507 bytes
| | |  .../PA1/survey/image/Lifeat/task_info1.png      | Bin 0 -> 16981 bytes
| | |  .../PA1/survey/image/Lifeat/task_info2.png      | Bin 0 -> 17532 bytes
| | |  .../PA1/survey/image/Lifeat/task_schedule.png   | Bin 0 -> 11137 bytes
| | |  .../PA1/survey/image/Lifeat/task_window.png     | Bin 0 -> 7607 bytes
| | |  .../PA1/survey/image/Lifeat/timer_button.png    | Bin 0 -> 1706 bytes
| | |  .../PA1/survey/image/Lifeat/timer_group.png     | Bin 0 -> 10418 bytes
| | |  .../PA1/survey/image/Lifeat/timer_personal.png  | Bin 0 -> 10241 bytes
| | |  .../PA1/survey/image/Lifeat/timer_task.png      | Bin 0 -> 8268 bytes
| | |  .../PA1/survey/image/Lifeat/timer_task_play.png | Bin 0 -> 65360 bytes
| | |  .../PA1/survey/image/Lifeat/video_call.png      | Bin 0 -> 193776 bytes
| | |  docs/requirements/PA1/survey/survey.md          | 226 ++++++++++++++++++
| | |  38 files changed, 226 insertions(+)
| | |
* | |   commit 17a0be02a9257bfabaa5e9b43464e55f338fe98b
|\ \ \  Merge: 065819c d194c51
| | | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | | Date:   Fri Oct 16 07:59:34 2026 +0700
| | | |
| | | |     Merge pull request #8 from RoundFloor/docs/PA1/screenshot
| | | |
| | | |     docs(PA1): Add screenshot for PA1
| | | |
| * | | commit d194c51f4acefa70b9defe3ec803c60f914a179a
| | | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | | Date:   Thu Oct 15 23:29:21 2026 +0700
| | | |
| | | |     docs(PA1): Add screenshot for PA1
| | | |
| | | |  .../screenshot/AI_coding accounts/23125026.png | Bin 0 -> 169067 bytes
| | | |  .../screenshot/AI_coding accounts/24125025.png | Bin 0 -> 272385 bytes
| | | |  .../screenshot/AI_coding accounts/24125048.png | Bin 0 -> 122823 bytes
| | | |  .../screenshot/AI_coding accounts/24125100.png | Bin 0 -> 104635 bytes
| | | |  .../PA1/screenshot/jira_screenshot.jpeg        | Bin 0 -> 73736 bytes
| | | |  5 files changed, 0 insertions(+), 0 deletions(-)
| | | |
* | | |   commit 065819cf69a690c8c5f99f56f6959c75c653ed5d
|\ \ \ \  Merge: b3c76f9 e5e4279
| | | | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | | | Date:   Fri Oct 16 07:56:33 2026 +0700
| | | | |
| | | | |     Merge pull request #6 from RoundFloor/docs/PA1/weekly_report
| | | | |
| | | | |     docs: Add Sprint 1 weekly report
| | | | |
| * | | | commit e5e42795a20c6e9dfffb3ba8887a1236bf9128ca
| |/ / /  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | |   Date:   Thu Oct 15 23:11:09 2026 +0700
| | | |
| | | |       docs: Add Sprint 1 weekly report
| | | |
| | | |    .../images/week1_jira_task.jpeg              | Bin 0 -> 97267 bytes
| | | |    .../images/week2_jira_task.jpeg              | Bin 0 -> 117716 bytes
| | | |    .../PA1/weekly_report/weekly_report1.md      | 107 +++++++++++++++
| | | |    .../PA1/weekly_report/weekly_report2.md      | 116 +++++++++++++++++
| | | |    4 files changed, 223 insertions(+)
| | | |
* | | |   commit b3c76f99327c9863119a8656c36f8f04a255061b
|\ \ \ \  Merge: 281cd07 8af9c3a
| | | | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | | | Date:   Fri Oct 16 07:50:01 2026 +0700
| | | | |
| | | | |     Merge pull request #5 from RoundFloor/PA1/contract
| | | | |
| | | | |     Pa1/contract
| | | | |
| * | | | commit 8af9c3a1c4441e6488c5504363bd6d4d791c0b33
| | |/ /  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| |/| |   Date:   Thu Oct 15 21:52:00 2026 +0700
| | | |
| | | |       docs: Review and edit Team Contract
| | | |
| | | |    docs/requirements/PA1/contract.md | 80 ++++++++++-------------------
| | | |    1 file changed, 26 insertions(+), 54 deletions(-)
| | | |
| * | | commit 97da91a8def3f41e9cbe80756ca68a4a492a738a
| | | | Author: Tuan <tuan06nbk@gmail.com>
| | | | Date:   Fri Oct 9 10:38:45 2026 +0700
| | | |
| | | |     modify: Review and assign team role and some changes
| | | |
| | | |  docs/requirements/PA1/contract.md | 13 +++++++------
| | | |  1 file changed, 7 insertions(+), 6 deletions(-)
| | | |
| * | | commit 46b28a651fb835aae3f4ad7bb10f40885484d126
| |/ /  Author: Tuan <tuan06nbk@gmail.com>
| | |   Date:   Fri Oct 9 10:12:31 2026 +0700
| | |
| | |       add: Contract for PA1
| | |
| | |    docs/requirements/PA1/contract.md | 259 ++++++++++++++++++++++++++++++
| | |    1 file changed, 259 insertions(+)
| | |
* | |   commit 281cd07341a07ab262b74d987b85abbefa36f1bf
|\ \ \  Merge: be1f0c2 e6b8cf8
| | | | Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | | | Date:   Thu Oct 15 23:29:07 2026 +0700
| | | |
| | | |     Merge remote-tracking branch 'origin/PA1/feature-others' into dev
| | | |
| * | | commit e6b8cf895a7f1bf75003ab68919d63bbb04af057
| |/ /  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
| | |   Date:   Tue Oct 13 09:15:08 2026 +0700
| | |
| | |       add: document of introduction, target users and ai feature
| | |
| | |    docs/requirements/PA1/features.md             | 31 +++++++++++++++++++
| | |    docs/requirements/PA1/features/0-title.md     |  1 +
| | |    .../PA1/features/1-introduction.md            | 10 ++++++
| | |    .../PA1/features/3-targetuser-platform.md     |  9 ++++++
| | |    .../requirements/PA1/features/5-ai-feature.md | 10 ++++++
| | |    5 files changed, 61 insertions(+)
| | |
* | |   commit be1f0c2f7e63a3cf02f879f9856cc32e2bc2517e
|\ \ \  Merge: affe9a2 0697458
| |/ /  Author: Nah <huynguyenlequoc13@gmail.com>
|/| |   Date:   Thu Oct 15 23:26:33 2026 +0700
| | |
| | |       Merge pull request #3 from RoundFloor/PA1/feature-key
| | |
| | |       Pa1/feature key
| | |
| * | commit 06974583dd621e8d0c482905b1f732c5d3f7c974
| | | Author: KanbeMatt <khanhbinh08062006@gmail.com>
| | | Date:   Tue Oct 13 22:18:36 2026 +0700
| | |
| | |     add: document of key features
| | |
| | |  docs/requirements/PA1/features.md               |  1 +
| | |  .../requirements/PA1/features/4-key-features.md | 31 +++++++++++++++++++
| | |  2 files changed, 32 insertions(+)
| | |
| * | commit 56843af1899e7c27479e3ce88eb89120aeb7b49b
|/ /  Author: KanbeMatt <khanhbinh08062006@gmail.com>
| |   Date:   Tue Oct 13 09:19:31 2026 +0700
| |
| |       add: initial key features
| |
| |    docs/requirements/PA1/features/4-key-features.md | 0
| |    1 file changed, 0 insertions(+), 0 deletions(-)
| |
| | * commit 9fd798cdb0f5360ef300b527c333f68deb943ab0
| |/  Author: Wanderer2414 <huynguyenlequoc13@gmail.com>
|/|   Date:   Tue Oct 13 23:12:59 2026 +0700
| |
| |       add: document for selection of backend platform
| |
| |    docs/requirements/backend-platform-selection.md | 937 ++++++++++++++++++
| |    .../1-backend-platform-selection.md             | 461 +++++++++
| |    .../2-backend-comparision.md                    | 477 +++++++++
| |    3 files changed, 1875 insertions(+)
| |
* | commit affe9a2472dad57b8974aeb4c45b2b288ebf4d9b
| | Author: Wanderer2414 <nlqhuy2414@apcs.fitus.edu.vn>
| | Date:   Thu Oct 8 12:58:27 2026 +0700
| |
| |     add: initial docs
| |
| |  .vscode/tasks.json                               | 22 ++++++++++++++++++++
| |  docs/requirements/proposal.md                    |  4 ++++
| |  docs/requirements/proposal/1-overview.md         |  0
| |  docs/requirements/proposal/2-userstory.md        |  0
| |  .../proposal/3-functional-requirement.md         |  0
| |  .../proposal/4-nonfunctional-requirement.md      |  0
| |  6 files changed, 26 insertions(+)
| |
* | commit 13b0b1c3e96246d7e65bcf0e23f0dadd889120ba
|/  Author: Wanderer2414 <nlqhuy2414@apcs.fitus.edu.vn>
|   Date:   Tue Oct 6 18:59:53 2026 +0700
|
|       add: frontend, backend, database modules
|
|    .gitmodules  | 12 ++++++++++++
|    src/backend  |  1 +
|    src/database |  1 +
|    src/frontend |  1 +
|    4 files changed, 15 insertions(+)
|
* commit f7268870c512fb057fdbd20ea5aa29217cdab064
  Author: Nah <huynguyenlequoc13@gmail.com>
  Date:   Tue Oct 6 06:30:07 2026 +0700

      Initial commit

   LICENSE | 373 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
   1 file changed, 373 insertions(+)
```
