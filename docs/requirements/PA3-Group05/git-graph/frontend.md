```
*   commit 4721f0e8bae1308e2e494090d3110bc23f452ead
|\  Merge: 482fa1a b4b3eee
| | Author: git stash <huynguyenlequoc13@gmail.com>
| | Date:   Sat Nov 14 19:21:13 2026 +0700
| | 
| |     WIP on feature/forum/major-selection: 482fa1a add: browse page of main forum
| | 
| * commit b4b3eeeb04fa0fc9ccbf13cb6299917d70dd0f4c
|/  Author: git stash <huynguyenlequoc13@gmail.com>
|   Date:   Sat Nov 14 19:21:13 2026 +0700
|   
|       index on feature/forum/major-selection: 482fa1a add: browse page of main forum
|   
|    src/pages/forums/forum/ForumPage.tsx     |  3 +-
|    src/pages/forums/forum/feed/FeedPage.css | 72 ++++++++++++++++++++++++++++
|    src/pages/forums/forum/feed/FeedPage.tsx | 31 ++++++++++++
|    src/shared/assets/icon/post.svg          |  3 ++
|    src/shared/assets/icon/save.svg          |  3 ++
|    src/shared/assets/icon/school.svg        |  3 ++
|    6 files changed, 114 insertions(+), 1 deletion(-)
| 
* commit 482fa1aeddb11508da5ad35b9d03a893b4695e35
| Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| Date:   Fri Nov 13 19:18:03 2026 +0700
| 
|     add: browse page of main forum
| 
|  src/app/providers/router/router-provider.tsx |  22 +-
|  src/pages/forums/forum/ForumPage.css         |  30 +++
|  src/pages/forums/forum/ForumPage.tsx         |  23 ++
|  src/pages/forums/forum/LoginPage.test.tsx    |   0
|  src/pages/forums/forum/browse/BrowsePage.css | 341 +++++++++++++++++++++++++
|  src/pages/forums/forum/browse/BrowsePage.tsx | 146 +++++++++++
|  src/pages/home/HomePage.tsx                  |   6 +-
|  7 files changed, 555 insertions(+), 13 deletions(-)
|   
*   commit 515469789d0cefd5770428ee806396d511bd72c5
|\  Merge: db543a4 e5dc3fe
| | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Wed Nov 11 13:50:48 2026 +0700
| | 
| |     Merge origin/feature/auth-ui
| | 
* | commit db543a489fd6422dca372c00c70825340b12b5c9
| | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | Date:   Mon Nov 9 12:42:54 2026 +0700
| | 
| |     feat: basic deploy code
| | 
| |  .gitignore                         |  2 +-
| |  deploy/config.ts                   | 24 +++++++++++++++
| |  deploy/main.ts                     | 29 ++++++++++++++++++
| |  deploy/model.ts                    | 23 ++++++++++++++
| |  deploy/request_analyzer.ts         | 17 +++++++++++
| |  deploy/response_handlers.ts        | 23 ++++++++++++++
| |  deploy/web_director.ts             | 22 +++++++++++++
| |  package.json                       |  3 +-
| |  src/pages/home/HomePage.tsx        | 56 +++++++++++++++++-----------------
| |  src/shared/api/client.ts           |  2 +-
| |  src/shared/ui/input/Input.test.tsx |  2 +-
| |  tsconfig.deploy.json               | 23 ++++++++++++++
| |  tsconfig.json                      |  3 +-
| |  vite.config.ts                     |  1 -
| |  14 files changed, 196 insertions(+), 34 deletions(-)
| |   
* |   commit 6ea217b406706981b4161e3e2f2c800f189e0216
|\ \  Merge: 4e53b07 63edc33
| | | Author: Nah <huynguyenlequoc13@gmail.com>
| | | Date:   Mon Nov 9 09:18:06 2026 +0700
| | | 
| | |     Merge pull request #3 from RoundFloor/feature/login-page
| | |     
| | |     Feature/login page
| | |   
| * |   commit 63edc33e56b8ef2797f4cc2f47cad04341fb9c24
| |\ \  Merge: 8eb8021 4e53b07
| |/ /  Author: Nah <huynguyenlequoc13@gmail.com>
|/| |   Date:   Mon Nov 9 09:17:53 2026 +0700
| | |   
| | |       Merge branch 'dev' into feature/login-page
| | | 
* | | commit 4e53b07bdcdf65c93d247580e8c8091d740aecf6
| | | Author: wanderer2414 <huynguyenlequoc13@gmail.com>
| | | Date:   Sun Oct 25 13:10:16 2026 +0700
| | | 
| | |     update: remove base path because of proxy changing
| | | 
| | |  vite.config.ts | 3 +--
| | |  1 file changed, 1 insertion(+), 2 deletions(-)
| | |   
| | | * commit 3e1b617abd189cde5b5087e4a7270f81a716d7d5
| | | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | | Date:   Fri Nov 13 09:01:46 2026 +0700
| | | | 
| | | |     add: Avoid reset access token when refresh and fix OTP error
| | | | 
| | | |  .gitignore                                    |   1 +
| | | |  src/app/guard/auth-guard.tsx                  |  12 +-
| | | |  src/app/guard/otp-guard.tsx                   |  12 +-
| | | |  src/app/guard/public-only.tsx                 |   6 +-
| | | |  src/app/layouts/main/MainLayout.css           | 116 +++++++++++++++++
| | | |  src/app/layouts/main/MainLayout.tsx           |  48 +++++++
| | | |  src/app/providers/auth/auth-initializer.tsx   |  44 +++----
| | | |  src/app/providers/router/router-provider.tsx  |   2 +-
| | | |  src/entities/session/auth-store.ts            | 123 +++++++++++-------
| | | |  src/entities/session/type.ts                  |  10 ++
| | | |  src/features/authentication/login/login.ts    |  11 +-
| | | |  src/features/authentication/logout/logout.ts  |  28 ++++
| | | |  src/features/authentication/otp/otp.ts        |   6 +-
| | | |  .../authentication/register/register.ts       |  11 +-
| | | |  src/pages/auth/otp/OtpPage.tsx                |  16 ++-
| | | |  src/pages/auth/register/RegisterPage.tsx      |  13 +-
| | | |  src/pages/loading/LoadingPage.css             |   0
| | | |  src/pages/loading/LoadingPage.tsx             |   0
| | | |  src/shared/api/client.ts                      |  42 +++---
| | | |  19 files changed, 364 insertions(+), 137 deletions(-)
| | | | 
| | | * commit 80a5a2a0baba7ef25477856d7ee5b67993d87bdb
| | |/  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | |   Date:   Thu Nov 12 20:18:47 2026 +0700
| | |   
| | |       add: verify otp functionality
| | |   
| | |    src/app/guard/auth-guard.tsx                 |   6 +-
| | |    src/app/guard/otp-guard.tsx                  |   2 -
| | |    src/app/guard/public-only.tsx                |   8 +-
| | |    src/app/providers/router/router-provider.tsx |  15 +-
| | |    src/entities/otp/otp-store.ts                |  11 +-
| | |    src/entities/otp/type.ts                     |   1 -
| | |    src/entities/session/auth-store.ts           |   4 +
| | |    src/features/authentication/login/login.ts   |   1 -
| | |    src/features/authentication/logout/logout.ts |   0
| | |    src/features/authentication/otp/otp.ts       |  49 ++++-
| | |    src/features/authentication/otp/type.ts      |  10 +-
| | |    src/pages/auth/login/LoginPage.tsx           |   6 +-
| | |    src/pages/auth/otp/OtpPage.css               |  18 ++
| | |    src/pages/auth/otp/OtpPage.tsx               | 189 +++++++++++++++++--
| | |    src/pages/route_error/RouteErrorPage.tsx     |   2 -
| | |    src/shared/api/client.ts                     |  25 ++-
| | |    src/shared/api/error.ts                      |   5 +-
| | |    src/shared/ui/input/Input.tsx                | 117 ++++++------
| | |    vite.config.ts                               |   1 -
| | |    19 files changed, 349 insertions(+), 121 deletions(-)
| | | 
| | * commit e5dc3fe759bf4e7d2072ea5c4f076ad4fe2d99eb
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Wed Nov 11 13:43:29 2026 +0700
| | | 
| | |     Add OTP and auth guard
| | | 
| | |  package-lock.json                               |  33 +++-
| | |  package.json                                    |   3 +-
| | |  src/app/App.tsx                                 |   2 +
| | |  src/app/guard/auth-guard.tsx                    |  22 +++
| | |  src/app/guard/otp-guard.tsx                     |  24 +++
| | |  src/app/guard/public-only.tsx                   |  24 +++
| | |  src/app/providers/auth/auth-initializer.tsx     |  38 +++++
| | |  src/app/providers/router/router-provider.tsx    |  54 ++++++-
| | |  src/entities/otp/otp-store.ts                   |  31 ++++
| | |  src/entities/otp/type.ts                        |   7 +
| | |  src/entities/session/auth-store.ts              |  54 +++++++
| | |  src/entities/session/token-store.ts             |  19 ---
| | |  src/entities/session/types.ts                   |   7 -
| | |  src/features/authentication/login/login.ts      |  17 +-
| | |  src/features/authentication/login/type.ts       |   8 +-
| | |  src/features/authentication/otp/otp.ts          |  14 ++
| | |  src/features/authentication/otp/type.ts         |   8 +
| | |  .../authentication/register/register.ts         |  18 ++-
| | |  src/features/authentication/register/type.ts    |   8 +-
| | |  src/pages/{ => auth}/login/LoginPage.css        |  20 ++-
| | |  src/pages/{ => auth}/login/LoginPage.test.tsx   |   0
| | |  src/pages/{ => auth}/login/LoginPage.tsx        | 153 ++++++------------
| | |  src/pages/auth/otp/OtpPage.css                  |  93 +++++++++++
| | |  src/pages/auth/otp/OtpPage.test.tsx             |   0
| | |  src/pages/auth/otp/OtpPage.tsx                  |  87 ++++++++++
| | |  .../auth/recover_password/RecoverPassword.css   |  83 ++++++++++
| | |  .../recover_password/RecoverPassword.test.tsx   |   0
| | |  .../recover_password/RecoverPasswordPage.tsx    |  41 +++++
| | |  src/pages/auth/set_password/SetPassword.css     |  83 ++++++++++
| | |  .../auth/set_password/SetPassword.test.tsx      |   0
| | |  src/pages/auth/set_password/SetPassword.tsx     |  47 ++++++
| | |  src/pages/home/HomePage.tsx                     |   8 +-
| | |  src/pages/route_error/RouteErrorPage.css        |  15 ++
| | |  src/pages/route_error/RouteErrorPage.tsx        |   4 +-
| | |  src/shared/api/client.ts                        |  31 ++--
| | |  src/shared/api/error.ts                         |   2 +
| | |  src/shared/assets/icon/key.svg                  |  10 ++
| | |  src/shared/assets/icon/mail-open.svg            |   3 +
| | |  src/shared/ui/input/Input.test.tsx              |   2 +-
| | |  src/shared/ui/input/Input.tsx                   |   4 +-
| | |  40 files changed, 898 insertions(+), 179 deletions(-)
| | | 
| | * commit bd3cc7005552b8b52717fd00a753de6f53696b52
| |/  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| |   Date:   Wed Nov 11 13:42:32 2026 +0700
| |   
| |       Add OTP and auth guard
| |   
| |    src/pages/auth/register/RegisterPage.css      |  94 +++++
| |    src/pages/auth/register/RegisterPage.test.tsx |   0
| |    src/pages/auth/register/RegisterPage.tsx      | 412 ++++++++++++++++++++
| |    3 files changed, 506 insertions(+)
| | 
| * commit 8eb80213808927874d2cd35b4fd5d1c0ec4fc2c8
| | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | Date:   Mon Nov 2 11:28:24 2026 +0700
| | 
| |     add: implement login page's main functions
| | 
| |  src/app/index.css                                |   7 +
| |  src/app/layouts/auth/AuthLayout.css              |   6 +-
| |  src/features/authentication/login/login.ts       |  17 +-
| |  src/features/authentication/login/use-login.ts   |  15 --
| |  src/features/authentication/register/register.ts |  20 +-
| |  .../authentication/register/use-register.ts      |  14 -
| |  src/pages/home/HomePage.tsx                      |   2 +-
| |  src/pages/login/LoginPage.tsx                    | 264 ++++++++++++++++++-
| |  src/shared/api/error.ts                          |   2 +-
| |  src/shared/assets/icon/unhide.svg                |   2 +-
| |  src/shared/ui/input/Input.module.css             |  27 +-
| |  src/shared/ui/input/Input.tsx                    |  11 +-
| |  src/shared/ui/input/index.ts                     |   2 +-
| |  13 files changed, 334 insertions(+), 55 deletions(-)
| |   
| *   commit 6fa93642414b600b7ac228f8a055bc8a4e77bae8
| |\  Merge: 1578969 de7c612
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Mon Nov 2 10:34:49 2026 +0700
| | | 
| | |     Merge branch 'feature/auth-api' into feature/login-page
| | | 
| | * commit de7c6127e01be48c9e445ff1956c8f98fdc8d044
| | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | Date:   Fri Oct 30 18:35:00 2026 +0700
| | | 
| | |     add: login and register api
| | | 
| | |  src/app/providers/query/index.ts                |   2 +-
| | |  ...rovider.test.tsx => query-provider.test.tsx} |   2 +-
| | |  .../{QueryProvider.tsx => query-provider.tsx}   |   0
| | |  src/app/providers/router/index.ts               |   4 +-
| | |  ...router.test.tsx => router-provider.test.tsx} |   2 +-
| | |  .../router/{router.tsx => router-provider.tsx}  |  28 +++--
| | |  src/entities/session/token-store.ts             |  19 ++++
| | |  src/entities/session/types.ts                   |   7 ++
| | |  src/features/authentication/login/login.ts      |  24 +++++
| | |  src/features/authentication/login/type.ts       |  11 ++
| | |  src/features/authentication/login/use-login.ts  |  15 +++
| | |  .../authentication/register/register.ts         |  18 ++++
| | |  src/features/authentication/register/type.ts    |   8 ++
| | |  .../authentication/register/use-register.ts     |  14 +++
| | |  src/shared/api/client.ts                        | 101 +++++++++++++++++-
| | |  src/shared/api/error.ts                         |  32 ++++++
| | |  16 files changed, 262 insertions(+), 25 deletions(-)
| | |   
| * |   commit 1578969b8f86692723e7cf09de9754473e392ef9
| |\ \  Merge: 63f6bc8 0fda99e
| | | | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | | | Date:   Sun Nov 1 20:18:47 2026 +0700
| | | | 
| | | |     Merge branch 'feature/share-component' into feature/login-page
| | | | 
| * | | commit 63f6bc8901919680a830a4815a35b9adee11e439
| | |/  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| |/|   Date:   Sat Oct 31 16:17:22 2026 +0700
| | |   
| | |       add: render auth layout
| | |   
| | |    src/app/layouts/auth/AuthLayout.css      | 114 +++++++++++++++++++++++
| | |    src/app/layouts/auth/AuthLayout.tsx      |  48 ++++++++++
| | |    src/pages/login/LoginPage.tsx            |   6 ++
| | |    src/shared/assets/image/sparkles.svg     |   3 +
| | |    src/shared/assets/image/star.svg         |  10 ++
| | |    src/shared/assets/image/study-poster.svg |  21 +++++
| | |    6 files changed, 202 insertions(+)
| | |   
| | | * commit 701d03b4657009f6dbfcaf767d6a2242219a736d
| | | | Author: Tuan <tuan06nbk@gmail.com>
| | | | Date:   Mon Nov 2 13:49:29 2026 +0700
| | | | 
| | | |     feat: implement preference page phase 1 layout shell
| | | | 
| | | |  package-lock.json                             | 39 ++++++++++---------
| | | |  src/app/App.test.tsx                          |  8 ++--
| | | |  src/app/index.css                             | 20 ++++++++++
| | | |  src/app/providers/router/router.test.tsx      | 27 +++++++++++--
| | | |  src/app/providers/router/router.tsx           |  6 ++-
| | | |  src/pages/home/HomePage.tsx                   |  1 -
| | | |  src/pages/preference/index.ts                 |  1 +
| | | |  .../preference/ui/preference-page.module.css  | 35 +++++++++++++++++
| | | |  .../preference/ui/preference-page.test.tsx    | 25 ++++++++++++
| | | |  src/pages/preference/ui/preference-page.tsx   | 11 ++++++
| | | |  10 files changed, 144 insertions(+), 29 deletions(-)
| | | | 
| | | * commit 6bfd976d419537428e1506ccf3747dabb29fcfab
| | | | Author: Tuan <tuan06nbk@gmail.com>
| | | | Date:   Mon Nov 2 13:49:22 2026 +0700
| | | | 
| | | |     docs: add preference page layout phase 1 specs
| | | | 
| | | |  .specify/memory/constitution.md               | 268 ++++++-
| | | |  .../2026-11-01-preference-page-layout/plan.md | 171 +++++
| | | |  .../requirements.md                           | 273 +++++++
| | | |  .../validation.md                             | 137 ++++
| | | |  specs/CHANGELOG.md                            |  72 ++
| | | |  specs/branches.md                             |  36 +
| | | |  specs/des-preference-req.md                   |  69 ++
| | | |  specs/mission.md                              |  13 +
| | | |  specs/preference-page-design.md               | 205 ++++++
| | | |  specs/preference-page-investigation.md        | 676 ++++++++++++++++++
| | | |  specs/roadmap.md                              |  33 +
| | | |  specs/skills/changelog-update.md              |  34 +
| | | |  specs/tech-stack.md                           |  24 +
| | | |  13 files changed, 1983 insertions(+), 28 deletions(-)
| | | | 
| | | * commit 1480380f92bb4a04c9a2e0fa9525cbc876c73d70
| | |/  Author: Tuan <tuan06nbk@gmail.com>
| | |   Date:   Sun Nov 1 23:06:28 2026 +0700
| | |   
| | |       Refactor code structure for improved readability and maintainability
| | |   
| | |    src/app/layouts/auth/AuthLayout.css      | 114 +++++++++++++++++++++++
| | |    src/app/layouts/auth/AuthLayout.tsx      |  48 ++++++++++
| | |    src/app/providers/router/router.tsx      |  28 +++---
| | |    src/pages/login/LoginPage.tsx            |   6 ++
| | |    src/shared/assets/icon/unhide.svg        |   2 +-
| | |    src/shared/assets/image/sparkles.svg     |   3 +
| | |    src/shared/assets/image/star.svg         |  10 ++
| | |    src/shared/assets/image/study-poster.svg |  21 +++++
| | |    8 files changed, 217 insertions(+), 15 deletions(-)
| | | 
| | * commit 0fda99ece5329eac9afc2434e06f3c02e0cc8f39
| |/  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| |   Date:   Sun Nov 1 10:58:58 2026 +0700
| |   
| |       add: test for UI components
| |   
| |    src/app/providers/router/router.tsx             | 28 +++++-----
| |    src/pages/home/HomePage.tsx                     | 16 ++++--
| |    src/shared/assets/icon/unhide.svg               |  2 +-
| |    src/shared/ui/button/Button.test.tsx            | 43 +++++++++++++++
| |    src/shared/ui/input/Input.test.tsx              | 54 +++++++++++++++++++
| |    src/shared/ui/input/Input.tsx                   | 21 ++++----
| |    src/shared/ui/select_card/SelectCard.test.tsx   | 29 ++++++++++
| |    src/shared/ui/select_card/SelectCard.tsx        | 14 ++---
| |    src/shared/ui/tick_box/TickBox.test.tsx         | 29 ++++++++++
| |    src/shared/ui/tick_box/TickBox.tsx              | 16 +++---
| |    .../ui/toggle_switch/ToggleSwitch.module.css    | 11 ++--
| |    .../ui/toggle_switch/ToggleSwitch.test.tsx      | 30 +++++++++++
| |    src/shared/ui/toggle_switch/ToggleSwitch.tsx    | 14 ++---
| |    13 files changed, 252 insertions(+), 55 deletions(-)
| | 
| * commit c07045a9740b1f848400acb926f20d20391b2f8b
| | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | Date:   Thu Oct 29 10:35:27 2026 +0700
| | 
| |     add: Common UI component
| | 
| |  index.html                                       |   2 +-
| |  package-lock.json                                |  84 +++++++-
| |  package.json                                     |   4 +-
| |  src/app/App.test.tsx                             |  11 ++
| |  src/app/App.tsx                                  |  11 +-
| |  src/app/index.css                                | 191 ++++++++++---------
| |  src/app/main.test.tsx                            |  51 +++++
| |  src/app/main.tsx                                 |  10 +-
| |  src/app/providers/query/QueryProvider.test.tsx   |  51 +++++
| |  src/app/providers/query/QueryProvider.tsx        |  23 +++
| |  src/app/providers/query/index.ts                 |   1 +
| |  src/app/providers/router/index.ts                |   2 +
| |  src/app/providers/router/router.test.tsx         |  15 ++
| |  src/app/providers/router/router.tsx              |  33 ++++
| |  src/pages/home/HomePage.tsx                      |  23 +++
| |  src/pages/route_error/RouteErrorPage.tsx         |  24 +++
| |  src/shared/api/client.ts                         |  29 +++
| |  src/shared/api/index.ts                          |   1 +
| |  src/shared/assets/icon/camera.svg                |   3 +
| |  src/shared/assets/icon/chat.svg                  |   3 +
| |  src/shared/assets/icon/community.svg             |   3 +
| |  src/shared/assets/icon/error.svg                 |   3 +
| |  src/shared/assets/icon/friends.svg               |   3 +
| |  src/shared/assets/icon/hide.svg                  |   3 +
| |  src/shared/assets/icon/house.svg                 |   3 +
| |  src/shared/assets/icon/library.svg               |   3 +
| |  src/shared/assets/icon/lock.svg                  |   3 +
| |  src/shared/assets/icon/mic.svg                   |   3 +
| |  src/shared/assets/icon/profile.svg               |   3 +
| |  src/shared/assets/icon/rooms.svg                 |   3 +
| |  src/shared/assets/icon/screen-share.svg          |   3 +
| |  src/shared/assets/icon/search.svg                |   3 +
| |  src/shared/assets/icon/settings.svg              |   3 +
| |  src/shared/assets/icon/success.svg               |   3 +
| |  src/shared/assets/icon/tick.svg                  |   3 +
| |  src/shared/assets/icon/timer.svg                 |   3 +
| |  src/shared/assets/icon/unhide.svg                |   3 +
| |  src/shared/assets/icon/upload.svg                |   3 +
| |  src/shared/assets/icon/white_board.svg           |   3 +
| |  src/shared/assets/image/logo.svg                 |  18 ++
| |  src/shared/ui/button/Button.module.css           |  49 +++++
| |  src/shared/ui/button/Button.tsx                  |  30 +++
| |  src/shared/ui/button/index.ts                    |   1 +
| |  src/shared/ui/input/Input.module.css             |  85 +++++++++
| |  src/shared/ui/input/Input.tsx                    |  88 +++++++++
| |  src/shared/ui/input/index.ts                     |   1 +
| |  src/shared/ui/select_card/SelectCard.module.css  |  30 +++
| |  src/shared/ui/select_card/SelectCard.tsx         |  34 ++++
| |  src/shared/ui/select_card/index.ts               |   1 +
| |  src/shared/ui/tick_box/TickBox.module.css        |  25 +++
| |  src/shared/ui/tick_box/TickBox.tsx               |  31 +++
| |  src/shared/ui/tick_box/index.ts                  |   1 +
| |  .../ui/toggle_switch/ToggleSwitch.module.css     |  40 ++++
| |  src/shared/ui/toggle_switch/ToggleSwitch.tsx     |  31 +++
| |  src/shared/ui/toggle_switch/index.ts             |   1 +
| |  vite.config.ts                                   |  11 +-
| |  56 files changed, 1003 insertions(+), 103 deletions(-)
| | 
| * commit 14e2b1ffbafa7fcd0805703b123937aaf9579f17
| | Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
| | Date:   Sun Oct 25 14:37:54 2026 +0700
| | 
| |     fix: include missing project files
| | 
| |  .specify/memory/constitution.md |  135 +---
| |  package-lock.json               | 1212 ++++++++++++++++++++++++++++++++---
| |  package.json                    |   12 +-
| |  public/favicon.svg              |    1 -
| |  public/icons.svg                |   24 -
| |  src/App.css                     |  184 ------
| |  src/App.tsx                     |  122 ----
| |  src/app/App.tsx                 |   12 +
| |  src/{ => app}/index.css         |    0
| |  src/{ => app}/main.tsx          |    0
| |  src/assets/hero.png             |  Bin 13057 -> 0 bytes
| |  src/assets/react.svg            |    1 -
| |  src/assets/vite.svg             |    1 -
| |  src/test/setup.ts               |    7 +
| |  vite.config.ts                  |   11 +-
| |  15 files changed, 1194 insertions(+), 528 deletions(-)
| | 
| * commit 98cfbe0ad79bdb5f5203a428e75ee79845f6057a
|/  Author: Nguyen Thanh An <ntan2419@apcs.fitus.edu.vn>
|   Date:   Sun Oct 25 14:29:30 2026 +0700
|   
|       add: Refactor structure and setup testing
|   
|    docs/architecture/api-catalog.md           | 0
|    docs/architecture/component-catalog.md     | 0
|    docs/architecture/frontend-architecture.md | 0
|    3 files changed, 0 insertions(+), 0 deletions(-)
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