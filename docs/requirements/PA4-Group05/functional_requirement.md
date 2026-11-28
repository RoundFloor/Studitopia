# Functional Requirements

**Version:** `1.1`

**Performed by:** [Nguyen Le Quoc Huy] | **Edited by:** [Nguyen Le Quoc Huy]

> This file is the index for the split functional requirements. The full requirement tables are grouped by functional area under [`functional_requirements/`](functional_requirements/).

> Scope note: The requirement files describe product requirements for the Studitopia platform. The Status column reflects current implementation evidence in `src/frontend`, `src/backend`, and `src/database`; it does not remove unimplemented product scope.

> Current-code status: `Complete` means source-backed implementation exists. `Partial` means UI, DTO, SQL, or related support exists but the full end-to-end requirement is not implemented. `Not implemented` means no source-backed implementation was found.

> Current implementation baseline: authentication, OTP, account read/avatar, forum browsing, post/tag/file read, Vite development hosting on `8999`, and production SPA delivery through the backend NestJS Web package are implemented. Friends, rooms, notifications, moderation, privacy settings, full resource management, create post/comment/vote flows, backend search, CAPTCHA, and Google OAuth are not implemented.

## Revision History

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 1.0 | 2026-10-27 | Nguyen Le Quoc Huy | Initial functional requirements derived from the grouped use cases. |
| 1.1 | 2026-11-28 | Nguyen Le Quoc Huy | Added current-code implementation statuses. |
| 1.1 | 2026-11-28 | Nguyen Le Quoc Huy | Split the requirement tables into functional-group files. |
| 1.1 | 2026-11-28 | Nguyen Le Quoc Huy | Split the forum group into browse, feed, and post groups. |
| 1.1 | 2026-11-28 | Nguyen Le Quoc Huy | Moved suggestions and post filtering into their own group. |

## Functional Requirement Groups

| Functional group | Use cases | Requirement file |
| --- | --- | --- |
| Authentication and Account | US-01–US-07 | [`authentications/requirements.md`](functional_requirements/authentications/requirements.md) |
| Profile and University Identity | US-08–US-10 | [`profiles_and_university_identity/requirements.md`](functional_requirements/profiles_and_university_identity/requirements.md) |
| Browse | US-11, US-12, US-23 | [`browse/requirements.md`](functional_requirements/browse/requirements.md) |
| Feed | US-13 (except FR-13.3) | [`feeds/requirements.md`](functional_requirements/feeds/requirements.md) |
| Suggestions and Filters | FR-13.3, US-24 | [`suggestions_and_filters/requirements.md`](functional_requirements/suggestions_and_filters/requirements.md) |
| Posts | US-14–US-22 | [`posts/requirements.md`](functional_requirements/posts/requirements.md) |
| Learning Resource Library | US-25–US-29 | [`learning_resource_library/requirements.md`](functional_requirements/learning_resource_library/requirements.md) |
| Friends and Social Networking | US-30–US-33 | [`friends_and_social_networking/requirements.md`](functional_requirements/friends_and_social_networking/requirements.md) |
| Supporting Meeting Rooms (Secondary) | US-34–US-37 | [`meeting_rooms/requirements.md`](functional_requirements/meeting_rooms/requirements.md) |
| Notifications and Safety | US-38–US-40 | [`notifications_and_safety/requirements.md`](functional_requirements/notifications_and_safety/requirements.md) |
