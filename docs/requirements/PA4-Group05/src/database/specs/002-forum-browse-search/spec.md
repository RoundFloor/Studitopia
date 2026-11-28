# Feature Specification: Forum Browse and Search

**Feature Branch**: `002-forum-browse-search`

**Created**: 2026-11-28

**Status**: Draft

**Input**: User description: "Specify the university forum browsing feature from functional requirements US-11, US-12, and US-23 version 1.1, using the available source as the baseline: access own and other university forums, browse university/major/course hierarchies with relevant content and context switching, and search posts with fields, filters, ranking, and empty states."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Enter the Default University Forum (Priority: P1)

After signing in, a verified university student lands directly in their own university forum. The forum is the primary destination after login and uses the student's verified academic affiliation as the default context, so the student does not have to choose a university on every visit. If the affiliation maps to more than one forum, the student can select the intended one and that selection becomes the default for subsequent visits.

**Why this priority**: This is the core value proposition of Studitopia: every authenticated session starts in a relevant academic community rather than a generic feed.

**Independent Test**: Can be tested by signing in with a student whose academic affiliation resolves to a single university and confirming the first forum shown is that university's forum; then signing in with an ambiguous affiliation and confirming a selection is requested and remembered.

**Acceptance Scenarios**:

1. **Given** an active student with a single verified university affiliation, **When** the student signs in, **Then** the student's own university forum is shown as the primary forum context without an additional selection step.
2. **Given** an active student whose verified affiliation maps to several university forums, **When** the student selects one of them, **Then** the selected forum becomes the default context shown on later visits.
3. **Given** an unauthenticated or inactive visitor, **When** the visitor attempts to enter a university forum, **Then** forum access is denied until a valid active session is established.
4. **Given** a student whose affiliation cannot be resolved to any university forum, **When** the student signs in, **Then** the system offers an explicit forum selection instead of showing an unrelated default.

---

### User Story 2 - Browse the University, Major, and Course Hierarchy (Priority: P1)

A student can explore forum content by moving from a university to its majors and then to the courses within a major. The system displays the available majors for a selected university and the available courses for a selected major. Intermediate groupings such as faculty, area, and subject may be shown when they help organize the hierarchy, but the university-to-major-to-course path is always available and the student can switch context between levels at any time.

**Why this priority**: The academic hierarchy is the navigation backbone that makes large volumes of discussions discoverable and relevant to a student's program.

**Independent Test**: Can be tested by opening a university forum, listing its majors, opening one major, listing its courses, and returning to the university or switching to another level without losing the ability to continue browsing.

**Acceptance Scenarios**:

1. **Given** a selected university forum, **When** the student requests its major listing, **Then** all majors associated with that university are displayed with their names and current activity summaries.
2. **Given** a selected major, **When** the student requests its course listing, **Then** all courses associated with that major are displayed.
3. **Given** a university, major, or course forum, **When** the student opens a child forum, **Then** the resulting breadcrumb and context show the full path from university to the current level.
4. **Given** a student viewing a course forum, **When** the student switches back to the parent major or university forum, **Then** the newly selected forum becomes the active context immediately.
5. **Given** a university with no majors or a major with no courses, **When** the student opens that forum, **Then** the system shows an informative empty listing without an error.

---

### User Story 3 - View Relevant Content at the Selected Forum Level (Priority: P1)

When a student opens a university, major, or course forum, the system presents posts and learning materials associated with that forum level. Content shown at a broader level includes content relevant to that level, while content shown at a narrower level is limited to that specific major or course. The student can open a post to read its discussion and related tags.

**Why this priority**: Navigation is only useful if the content at each level answers the student's academic need and does not mix unrelated universities or programs.

**Independent Test**: Can be tested by tagging content at different hierarchy levels and confirming that each forum shows the correct content set, including exclusion of content tagged only with an unrelated university or course.

**Acceptance Scenarios**:

1. **Given** posts associated with a selected course, **When** the student opens that course forum, **Then** those posts are displayed and posts associated only with other courses are not displayed.
2. **Given** posts associated with several majors under one university, **When** the student opens the university forum, **Then** the student can see content relevant to the university level, including content from those majors.
3. **Given** a post with associated learning materials, **When** the student opens the post from a forum listing, **Then** the post discussion and its associated materials are available to the student.
4. **Given** a forum level with no associated posts or materials, **When** the student opens that forum, **Then** an informative empty state is displayed.

---

### User Story 4 - Browse Another University's Forum (Priority: P2)

A student can browse forums belonging to other universities when those forums are permitted to be viewed. Browsing is read-only: the student can explore discussions and materials but cannot post, vote, or modify content outside their own university. When a forum is not permitted, the student receives a clear explanation rather than an empty or misleading page.

**Why this priority**: Cross-university exploration broadens academic discovery while affiliation-aware access preserves trust and community boundaries.

**Independent Test**: Can be tested by signing in as a student of University A and confirming that a permitted University B forum is browsable in read-only mode while a restricted University C forum is not accessible.

**Acceptance Scenarios**:

1. **Given** an active student and a permitted forum of another university, **When** the student selects that university, **Then** its forum hierarchy and content are displayed in read-only mode.
2. **Given** an active student and a restricted forum of another university, **When** the student attempts to open it, **Then** access is denied with a clear message and no forum content is shown.
3. **Given** a student browsing another university's forum, **When** the student attempts a content-changing action, **Then** the action is rejected and the student's own default forum context remains unchanged.
4. **Given** a student browsing another university, **When** the student chooses to return to their own university, **Then** the original default context is restored.

---

### User Story 5 - Search Forum Posts (Priority: P2)

A student can search forum posts using a keyword and can narrow the results by tags, title, content, author, university, major, and course. The search is case-insensitive and supports partial keyword matching, so a student can find discussions even when the exact title is unknown. Results include enough identifying information for the student to decide which discussion to open.

**Why this priority**: Keyword and field-based search directly addresses the functional requirement for finding academic discussions and materials on demand instead of relying solely on hierarchy navigation.

**Independent Test**: Can be tested by creating posts with distinct titles, content, authors, tags, and forum associations, then running searches for each field and confirming the expected posts are returned while unrelated posts are excluded.

**Acceptance Scenarios**:

1. **Given** posts containing a keyword in the title or content, **When** a student submits that keyword, **Then** matching posts are returned regardless of letter casing.
2. **Given** posts with distinct tags, authors, and forum associations, **When** a student supplies one or more search fields, **Then** only posts matching all supplied fields are returned.
3. **Given** a search field value that does not match any post, **When** the search is submitted, **Then** the system returns zero results rather than unrelated posts.
4. **Given** a student browsing a university, major, or course forum, **When** the student submits a keyword from that forum context, **Then** results can be constrained to that forum and its child levels.

---

### User Story 6 - Filter, Rank, and Recover from Search Results (Priority: P2)

After search results are returned, a student can filter them by post type, solved status, and time range. Results are ordered so that the most relevant and most engaging matches appear first. When no result matches the criteria, the system shows a helpful empty state that explains the active filters and offers a way to broaden the search.

**Why this priority**: Filtering, ranking, and clear empty states reduce the effort needed to find a usable answer and prevent dead ends.

**Independent Test**: Can be tested by producing a result set with varied post types, solved status, engagement levels, and creation times, then applying each filter and confirming both the returned set and the ordering.

**Acceptance Scenarios**:

1. **Given** a result set containing different post types, **When** the student selects one post type, **Then** only posts of that type remain in the results.
2. **Given** a result set containing solved and unsolved posts, **When** the student selects the solved filter, **Then** only solved posts are returned.
3. **Given** posts created at different times, **When** the student selects a time range, **Then** only posts created within that range are returned.
4. **Given** posts with similarly strong keyword matches but different engagement, **When** results are displayed, **Then** the more engaging post appears earlier in the result order.
5. **Given** search criteria that match no posts, **When** the results are displayed, **Then** a clear empty state appears with the active criteria summarized and an option to clear filters.

---

### Edge Cases

- **Ambiguous university affiliation**: When a verified academic affiliation maps to multiple university forums, the system requires an explicit selection and persists it as the default instead of guessing.
- **Unresolvable affiliation**: When no university forum matches the affiliation, the system offers manual selection and does not expose another university as an implicit default.
- **Restricted cross-university browsing**: When a forum is not permitted for the current student, no post, material, major, or course detail from that forum is disclosed.
- **Empty hierarchy branches**: When a university has no majors, or a major has no courses, the listing is empty but still navigable back to the parent context.
- **Special characters and very short keywords**: Search terms with punctuation, symbols, or a single character are normalized safely; single-character searches return exact field matches only or prompt for a longer term.
- **Conflicting filters**: When filters cannot be satisfied together, the system returns an empty state and retains the filter choices so the student can adjust them.
- **Stale context**: When a student switches forum levels, search results and filters from the previous context are not silently retained unless the student explicitly keeps them.
- **Missing material association**: When a post has no associated materials, the post remains fully readable and no broken resource entry is displayed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a dedicated university forum as the primary forum destination immediately after a student signs in. (US-11 / FR-11.1)
- **FR-002**: System MUST allow an active student to select and enter their own university forum, including when the verified affiliation maps to more than one forum. (US-11 / FR-11.2)
- **FR-003**: System MUST allow active students to browse permitted forums of other universities in read-only mode. (US-11 / FR-11.3)
- **FR-004**: System MUST use the verified academic affiliation, or the student's explicit selection when needed, as the default forum context on subsequent visits. (US-11 / FR-11.4)
- **FR-005**: System MUST organize forum content by university, major, and course, with optional intermediate groupings where the existing hierarchy requires them. (US-12 / FR-12.1)
- **FR-006**: System MUST display the majors available within a selected university. (US-12 / FR-12.2)
- **FR-007**: System MUST display the courses available within a selected major. (US-12 / FR-12.3)
- **FR-008**: System MUST allow students to navigate from a university to a major and then to a course forum, with a visible path to each parent level. (US-12 / FR-12.4)
- **FR-009**: System MUST display posts and materials relevant to the selected university, major, or course forum level and exclude content belonging only to unrelated forums. (US-12 / FR-12.5)
- **FR-010**: System MUST allow students to switch between university, major, and course forum contexts without leaving the browsing experience. (US-12 / FR-12.6)
- **FR-011**: System MUST allow students to search posts by keyword. (US-23 / FR-23.1)
- **FR-012**: System MUST support search by tags, title, content, author, university, major, and course. (US-23 / FR-23.2)
- **FR-013**: System MUST filter search results by post type, solved status, and time range. (US-23 / FR-23.3)
- **FR-014**: System MUST order search results by relevance to the search criteria first and engagement second. (US-23 / FR-23.4)
- **FR-015**: System MUST display an appropriate empty state when no results match the search criteria, including a summary of active criteria and a way to clear them. (US-23 / FR-23.5)
- **FR-016**: System MUST apply forum access rules consistently to hierarchy listings, content listings, and search results so no restricted forum content is disclosed.
- **FR-017**: System MUST prevent content-changing actions in forums that are not the student's own university.
- **FR-018**: System MUST preserve a student's selected default forum context across separate visits until the student changes it or the affiliation changes.

### Key Entities *(include if feature involves data)*

- **Student Affiliation**: The verified academic identity of a student, including the university, faculty, and major associated with the student's academic identity; used to determine the default forum context.
- **Forum**: A named academic context at university, faculty, major, area, subject, or course level. Each forum has a category, a display name, a description, and activity summaries.
- **Forum Hierarchy**: The parent-to-child relationships between forums that allow a student to move from a university to a major and then to a course, including optional intermediate groupings.
- **Post**: A student-authored discussion with a title, body content, author, associated forum tags, solved status, post type, creation time, and engagement indicators.
- **Material**: A learning resource associated with forum content and available to students who can view that content.
- **Search Query**: The student's keyword, selected search fields, chosen filters, and active forum context at the time of the search.
- **Search Result**: A post or material matched by a search query, including the information needed to identify its forum path, author, type, solved status, and engagement.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 95% of active students land in their own university forum on the first screen after sign-in without an extra selection step.
- **SC-002**: At least 90% of tested students can navigate from a university forum to a specific course forum in three interactions or fewer.
- **SC-003**: At least 95% of forum and search result views become visible within 2 seconds under normal network conditions.
- **SC-004**: At least 90% of tested students find a known target discussion within the first two pages of search results.
- **SC-005**: 100% of forum listings and search results respect the student's permitted forum scope, with zero disclosed items from restricted universities in validation checks.
- **SC-006**: 100% of zero-result searches display the dedicated empty state and allow the student to clear or adjust criteria in one action.
- **SC-007**: At least 80% of top-ten search results are judged relevant by students in a moderated relevance review.
- **SC-008**: At least 85% of tested students report that the forum hierarchy and search filters make it easy to find academic discussions, rated 4 out of 5 or higher.

## Assumptions

- The existing verified academic affiliation associated with a student's account is the authoritative source for that student's own university, faculty, and major.
- The existing academic forum taxonomy already classifies forums as universities, faculties, majors, areas, subjects, and courses; university, major, and course are the primary browsing levels and intermediate groupings are displayed only where they organize the hierarchy.
- Posts are associated with forums through their forum classifications; materials are treated as resources attached to forum content, and a post without materials remains valid browse and search content.
- "When permitted" means all active verified students may browse other university forums in read-only mode by default, while platform governance may restrict specific universities; content-changing actions remain limited to the student's own university.
- Keyword search is case-insensitive and supports partial matching; a single-character keyword is treated as a low-signal term and returns only exact field matches or prompts for a longer term.
- Solved status corresponds to a post having an accepted or correct response; post types are limited to discussion, question, and material for filtering purposes.
- Time range filter options are last 24 hours, last 7 days, last 30 days, and all time.
- Search results are presented in pages of 20 items, with relevance evaluated first and engagement used to break comparable relevance ties.
- A student's selected default forum persists across visits until the student changes it or the verified affiliation changes.
- Authentication and account activation are existing capabilities and are reused rather than redefined by this feature.
