# Feature Specification: Browsing Page (University Forum)

**Feature Branch**: `005-browsing-page`

**Created**: 2026-11-28

**Status**: Draft

**Input**: User description: "Run speckit for functional group: browsing page, based on PA4 Browse and Feed requirements (US-11, US-12, US-13, US-23, FR-13.3) and UC-03 Browse and Search the University Forum"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Enter the Own and Other University Forums (Priority: P1)

A university student signs in and opens the Forum entry from the main navigation. The system opens the student's own university forum as the default context. When permitted, the student can select another university and browse that university's forum instead.

**Why this priority**: Access to a university forum is the entry point for every other browsing behavior and is required by FR-11.1–FR-11.4.

**Independent Test**: Can be tested independently by signing in, opening Forum, verifying that the default context is the student's university, then selecting a permitted other university and verifying the context changes.

**Acceptance Scenarios**:

1. **Given** an authenticated student, **When** the student selects Forum from the main navigation, **Then** the system opens the university forum as the primary feature area.
2. **Given** the student has a verified university, **When** the Forum page opens, **Then** the system uses that university as the default forum context.
3. **Given** the student is permitted to view another university forum, **When** the student selects that university, **Then** the system applies it as the active browsing context and shows only content relevant to it.
4. **Given** the student is not permitted to view a selected university forum, **When** the student attempts to open it, **Then** the system denies access and does not expose restricted content.
5. **Given** the student navigates away and returns to Forum, **When** the page reopens, **Then** the system restores a usable forum context without mixing content from an earlier context.

---

### User Story 2 - Browse University, Major, and Course Forums (Priority: P1)

A university student wants to narrow discussions by program. The student selects a university, then a major, then a course, and the browsing page shows the forums available at each level. The student can switch levels directly without losing the chosen context.

**Why this priority**: The university–major–course hierarchy organizes all forum content under FR-12.1–FR-12.6; without it, students cannot find program-relevant discussions.

**Independent Test**: Can be tested independently by selecting a university, confirming its majors, selecting a major, confirming its courses, selecting a course, and then switching back to another level while checking that only relevant content is shown.

**Acceptance Scenarios**:

1. **Given** a university forum is selected, **When** the browsing page loads, **Then** the system displays the majors offered by that university.
2. **Given** a major is selected, **When** the browsing page loads, **Then** the system displays the courses associated with that major.
3. **Given** a course is selected, **When** the browsing page loads, **Then** the system displays the course forum and posts relevant to that course.
4. **Given** the active context is university, major, or course, **When** the student switches to another level, **Then** the system updates the forum list and post list to match the new level.
5. **Given** a university has no majors or a major has no courses, **When** the student opens that level, **Then** the system shows a clear empty state and keeps navigation available.

---

### User Story 3 - View Post Summaries and Open a Post (Priority: P1)

A university student scans the selected forum's post list. Each item shows enough information to decide whether to read it: title, author, post type, timestamp, vote score, comment count, and solved status. The student can open a post and read its full details.

**Why this priority**: The post list and post detail are the primary browsing deliverables under FR-13.1, FR-13.2, FR-13.5, and B4 steps 6, 10–12 of UC-03.

**Independent Test**: Can be tested independently by opening a course forum, verifying each visible summary contains the required fields, opening one post, and verifying the detail contains the post content and permitted read-only information.

**Acceptance Scenarios**:

1. **Given** a forum context has visible posts, **When** the browsing page loads, **Then** the system displays a list of post summaries for that context.
2. **Given** a post summary is shown, **When** the student views it, **Then** the summary includes title, author, post type, timestamp, vote score, comment count, and solved status.
3. **Given** the student selects a post summary, **When** the detail opens, **Then** the system displays the full post content, author, post type, forum context, timestamp, vote score, tags, comments, answers, attachments, and true-response information where present.
4. **Given** the student is not permitted to perform an action on the detail page, **When** the detail opens, **Then** the system does not offer that action.
5. **Given** a selected post is deleted or unavailable, **When** the student opens it, **Then** the system shows a post-unavailable state and offers a return to the post list.

---

### User Story 4 - Sort, Search, and Filter Forum Posts (Priority: P2)

A university student wants to find specific academic content quickly. The student can sort posts by newest, top trending, most voted, or most discussed, search by keyword and academic fields, and apply filters such as My Post, area, university, major, course, tags, post type, solved status, and time range.

**Why this priority**: Search and filtering substantially improve discovery under FR-13.3, FR-13.4, and FR-23.1–FR-23.5, but the browsing page remains useful without them.

**Independent Test**: Can be tested independently by applying each sort order, searching by a known keyword or tag, applying a filter combination, and verifying that the result set and ranking match the query while respecting the active context.

**Acceptance Scenarios**:

1. **Given** posts with different timestamps and engagement levels, **When** the student selects each sort option, **Then** the system orders the post list according to the selected sort.
2. **Given** a keyword matching post titles or content, **When** the student submits a search, **Then** the system returns matching posts from the selected context.
3. **Given** tags, author, university, major, or course search fields are supplied, **When** the search runs, **Then** the system matches posts on those fields.
4. **Given** My Post, area, university, major, course, tags, post type, solved status, or time-range filters are applied, **When** results are shown, **Then** each result satisfies every active filter.
5. **Given** a search returns multiple matches, **When** results are displayed, **Then** the system ranks them by relevance and engagement.
6. **Given** no post matches the query or filters, **When** results are shown, **Then** the system displays a clear empty state with a way to clear filters or change terms.
7. **Given** a filter combination is invalid, **When** the student submits it, **Then** the system shows validation feedback and preserves the usable parts of the query.

---

### User Story 5 - Recover from Browsing Failures Safely (Priority: P2)

A university student encounters a temporarily unavailable forum feed, a restricted post, or a failed search. The browsing page explains the problem, offers recovery, and never shows partial, stale, or unauthorized content.

**Why this priority**: Safe failure handling is required by UC-03 exception flows E1–E4 and by the privacy and authorization rules in the PA4 non-functional requirements.

**Independent Test**: Can be tested independently by simulating a forum load failure, a restricted post, and an invalid query, then verifying the corresponding error state and that no restricted content is exposed.

**Acceptance Scenarios**:

1. **Given** forum content cannot be loaded, **When** the browsing page handles the failure, **Then** the system displays an error state with a retry option and no partial or stale content.
2. **Given** a post is private or restricted to another group, **When** the post list or search results are built, **Then** the system omits that post.
3. **Given** the student opens a restricted post directly, **When** access is checked, **Then** the system shows an access-denied state without revealing post content.
4. **Given** a search or filter request fails, **When** the failure is reported, **Then** the system keeps the normal forum state and allows the student to retry.

---

### Edge Cases

- A student's university is not yet verified; the Forum entry falls back to a usable state without implying an unverified default university.
- A university, major, or course exists but has no visible posts; the post-list empty state is shown without hiding the hierarchy navigation.
- A filter references a tag or forum level removed since the page was opened; results are rebuilt without showing stale context labels.
- Search terms contain only whitespace; the system treats the request as filter-only browsing rather than an empty keyword search.
- Two posts have identical engagement and timestamps; sort order uses a stable secondary order so results do not jump between refreshes.
- A post is marked solved while the student is viewing an unsolved-filtered list; the refreshed result set reflects the new solved status.
- The active context changes while a search request is pending; results from the old context are discarded.
- Pagination reaches beyond the last available page; the system shows the final available page or an empty state rather than an error.
- A student navigates back after switching context; the previous forum level and usable result state are restored where supported.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a dedicated university forum as the primary feature area after login.
- **FR-002**: The system MUST use the student's verified university as the default forum context.
- **FR-003**: The system MUST allow a student to select and enter their own university forum.
- **FR-004**: The system MUST allow a student to browse another university forum when permitted.
- **FR-005**: The system MUST apply the selected university as the active browsing context and show only content relevant to that context.
- **FR-006**: The system MUST organize forum content by university, major, and course.
- **FR-007**: The system MUST display the majors offered within the selected university.
- **FR-008**: The system MUST display the courses associated with the selected major.
- **FR-009**: The system MUST let the student navigate from university to major to course forum.
- **FR-010**: The system MUST let the student switch between university, major, and course forum contexts.
- **FR-011**: The system MUST display posts and materials relevant to the selected forum level.
- **FR-012**: The system MUST display a post list for the selected university, major, or course forum.
- **FR-013**: The system MUST show title, author, post type, timestamp, vote score, comment count, and solved status in each post summary.
- **FR-014**: The system MUST support sorting posts by newest, top trending, most voted, and most discussed.
- **FR-015**: The system MUST allow a student to open a post from the list or search results to view its full details.
- **FR-016**: The system MUST show full post content, metadata, discussion, attachments, true-response information, and functional tools where present when a post is opened.
- **FR-017**: The system MUST allow keyword search across post content and title.
- **FR-018**: The system MUST support search by tags, title, content, author, university, major, and course.
- **FR-019**: The system MUST support filtering by My Post, area, university, major, course, tags, and post type.
- **FR-020**: The system MUST support filtering search results by post type, solved status, and time range.
- **FR-021**: The system MUST rank search results by relevance and engagement.
- **FR-022**: The system MUST display a clear empty state when no posts or search results match.
- **FR-023**: The system MUST allow the student to clear filters or change search terms from the empty state.
- **FR-024**: The system MUST show a retryable error state when forum content or search results cannot be loaded.
- **FR-025**: The system MUST exclude posts the student is not permitted to see from lists, search results, and detail views.
- **FR-026**: The system MUST display only actions permitted by the student's permissions on post detail.
- **FR-027**: The system MUST preserve usable query parts when an invalid search or filter combination is submitted.

### Key Entities

- **University Student**: An authenticated user with a verified university and a set of permissions that determine which forums, posts, and actions are available.
- **University Forum**: A forum representing a university; may be the student's own university or another university that the student is permitted to browse.
- **Major**: A program offered within a university, used as the second level of forum hierarchy.
- **Course**: A subject offered within a major, used as the third level of forum hierarchy.
- **Forum Context**: The active university, major, or course scope that constrains the hierarchy, post list, search, and filters.
- **Post Summary**: A compact view of a forum post containing title, author, post type, timestamp, vote score, comment count, and solved status.
- **Post Detail**: The full post content and metadata, discussion, attachments, true-response information, functional tools, and permitted actions.
- **Search Query**: Keyword plus optional tag, title, content, author, university, major, and course criteria.
- **Filter Set**: My Post, area, university, major, course, tags, post type, solved status, time range, and selected sort order.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of authenticated students opening Forum see their verified university as the default context.
- **SC-002**: 100% of visible post summaries include all seven required summary fields.
- **SC-003**: A forum post list loads within 2 seconds under normal operating conditions.
- **SC-004**: Post detail and its comments display within 2 seconds under normal operating conditions.
- **SC-005**: Common forum search results return within 2 seconds under normal operating conditions.
- **SC-006**: At least 95% of results for a given filter combination satisfy every active filter.
- **SC-007**: 100% of restricted posts are omitted from lists, search results, and detail access for unauthorized students.
- **SC-008**: At least 90% of students who open a forum list can identify a relevant post or a clear empty state within one minute.

## Assumptions

- Forum browsing is a read-oriented feature; creating posts, comments, answers, votes, saved-post changes, reports, and moderation actions belong to other functional groups.
- The Trending page and recommendation sections belong to the separate trending feature and are not duplicated here.
- Authentication and a verified university are available before the Forum page is opened; if verification is absent, the page falls back to a usable non-university-specific state.
- The existing forum data provides university, major, course, post summary, and post detail records for the selected context.
- Sorting, search fields, filters, and error behavior follow the PA4 API notes and UC-03; unspecified page sizes and pagination limits are implementation choices.
- Privacy, forum access, and permission rules already defined for forum posts continue to apply to every browsing path.

---

Requirement traceability: FR-11.1–FR-11.4, FR-12.1–FR-12.6, FR-13.1–FR-13.5, FR-23.1–FR-23.5 in `docs/requirements/PA4-Group05/functional_requirements/` and UC-03 in `docs/requirements/PA4-Group05/use_cases/social-forum-management/UC-03-browse-search-forum.md`.
