# Feature Specification: Trending Page (Forum Recommendations)

**Feature Branch**: `004-trending-page`

**Created**: 2026-11-28

**Status**: Draft

**Input**: User description: "Run speckit for functional group: trending page, based on PA4 functional requirements for Suggestions and Filters (FR-24.1–FR-24.5) and the Trending flow in screen_flow.md / list_post.md"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Discover Relevant Posts (Priority: P1)

A university student opens the Trending page from the forum home. The page presents posts that match the student's university, major, courses, and saved learning interests, so the student can quickly find discussions connected to their academic context. Each recommendation explains why it was suggested and can be opened for full detail.

**Why this priority**: Relevant discovery is the core value of the Trending page and is required by FR-24.1. Without it, the page provides no more value than the ordinary forum list.

**Independent Test**: Can be tested independently by signing in as a student with known academic context and interests, opening the Trending page, and verifying that the visible recommendations are limited to posts matching that context and that each item can be opened.

**Acceptance Scenarios**:

1. **Given** an authenticated student with a selected university forum and configured courses and interests, **When** the student opens the Trending page, **Then** the system displays posts relevant to the student's university, major, courses, and interests.
2. **Given** a recommendation has a matching academic or interest signal, **When** the recommendation is displayed, **Then** the system shows a short reason that identifies the matching context or interest.
3. **Given** a student opens a recommended post, **When** the detail view loads, **Then** the system displays that post with the same content and metadata available from the forum list.
4. **Given** a post in the academic context is restricted or unavailable to the student, **When** recommendations are built, **Then** the system omits that post and never exposes restricted content.
5. **Given** no post matches the student's context or interests, **When** the Trending page opens, **Then** the system displays an empty state and keeps the forum list usable.

---

### User Story 2 - See Trending Posts in the Academic Context (Priority: P1)

A university student wants to see which discussions are currently active in their own academic context. The Trending page highlights posts with high engagement from the selected university, major, or course forum, so the student can join conversations that matter to their program.

**Why this priority**: Trending recommendations are the defining behavior of the Trending page under FR-24.2 and the named Trending flow. They are independently valuable even if the other recommendation categories are unavailable.

**Independent Test**: Can be tested independently by preparing posts with different engagement levels in one academic context, opening the Trending page for that context, and verifying that the higher-engagement posts are presented as trending.

**Acceptance Scenarios**:

1. **Given** several visible posts exist in the selected academic context, **When** the Trending page loads, **Then** the system includes a trending section containing posts ranked by recent engagement.
2. **Given** the student switches from a university context to a major or course context, **When** the Trending page refreshes, **Then** the trending section contains only posts from the newly selected context.
3. **Given** the selected context has no posts with meaningful engagement, **When** the Trending page loads, **Then** the system omits the trending section or shows an empty state without inventing recommendations.
4. **Given** a trending recommendation is displayed, **When** the student selects it, **Then** the system opens the corresponding post detail.

---

### User Story 3 - Find Unsolved Questions the Student Can Help With (Priority: P2)

A university student wants to help other students in subjects they know. The Trending page shows unsolved questions from the student's academic context that may match their courses or interests, giving the student a clear way to contribute.

**Why this priority**: This expands discovery beyond popular posts and directly supports peer help under FR-24.3, but it depends on the basic recommendation context established by the higher-priority stories.

**Independent Test**: Can be tested independently by preparing solved and unsolved questions in the same context, opening the Trending page, and verifying that only unsolved questions appear in the unsolved section.

**Acceptance Scenarios**:

1. **Given** unsolved questions exist in the selected academic context, **When** the Trending page loads, **Then** the system includes those questions in an unsolved-questions section.
2. **Given** a question is already marked solved, **When** recommendations are built, **Then** the system does not present it as an unsolved question.
3. **Given** the student has course or interest preferences, **When** unsolved questions are selected, **Then** questions matching those preferences are preferred over unrelated unsolved questions.
4. **Given** no unsolved question is available, **When** the Trending page loads, **Then** the system omits the section without affecting the other recommendation sections.

---

### User Story 4 - Dismiss and Refresh Recommendations (Priority: P2)

A student occasionally sees a recommendation that is not useful. The student can dismiss it from the current recommendation view, and can refresh recommendations after changing learning preferences or switching forum context so that the page reflects the latest inputs.

**Why this priority**: Dismissal and refresh improve recommendation quality under FR-24.4 and FR-24.5. They are valuable refinements but not required for the first useful Trending page.

**Independent Test**: Can be tested independently by opening the Trending page, dismissing one recommendation and verifying it disappears from the current view, then changing preferences or context and verifying that recommendations update.

**Acceptance Scenarios**:

1. **Given** a recommendation is visible, **When** the student selects the dismiss control for that item, **Then** the item is hidden from the current recommendation view and the remaining recommendations stay in place.
2. **Given** the student updates learning preferences, **When** the student requests a refresh, **Then** the system rebuilds recommendations using the updated preferences.
3. **Given** the student changes the active university, major, or course forum, **When** the Trending page updates, **Then** recommendations are rebuilt for the new academic context.
4. **Given** recommendations are being refreshed, **When** the refresh completes, **Then** the system shows the latest recommendations without duplicating dismissed items in the current view.
5. **Given** a refresh fails, **When** the system reports the failure, **Then** the student can retry without losing the normal forum state.

---

### Edge Cases

- A student has no configured learning preferences; recommendations are based only on the selected university, major, or course context.
- The selected forum context changes while the Trending page is open; stale recommendations from the previous context are not shown.
- All candidate posts are restricted to other users; the Trending page shows an empty state rather than disclosing titles or metadata.
- A recommended post is deleted or becomes unavailable after recommendations are displayed; selecting it leads to the normal unavailable-post state instead of broken content.
- Two recommendations refer to the same post through different reasons; the post is shown once with an appropriate reason.
- A student dismisses every visible recommendation; the page remains usable and offers a refresh or navigation back to the forum list.
- Engagement data is missing or zero for all posts; the trending section is omitted rather than presenting arbitrary posts as trending.
- A concurrent preference update and forum-context change occur; the refreshed recommendations reflect a consistent set of inputs rather than a mixture of old and new context.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST show a Trending area that is reachable from the forum home and presents forum-post recommendations before or alongside the general post list.
- **FR-002**: The system MUST identify the active university, major, or course forum context whenever recommendations are produced.
- **FR-003**: The system MUST use available learning preferences, including courses, subjects, interests, learning goals, and preferred study times, when selecting recommendations.
- **FR-004**: The system MUST recommend posts relevant to the student's university, major, courses, and interests.
- **FR-005**: The system MUST present a readable reason for each recommendation that identifies the academic context or interest used to select it.
- **FR-006**: The system MUST recommend trending posts within the selected academic context.
- **FR-007**: The system MUST rank trending recommendations using post engagement available in the forum post data.
- **FR-008**: The system MUST recommend unsolved questions from the selected academic context where the student may be able to help.
- **FR-009**: The system MUST exclude solved posts from the unsolved-questions recommendations.
- **FR-010**: The system MUST allow a student to dismiss an irrelevant recommendation so that it is no longer shown in the current recommendation view.
- **FR-011**: The system MUST refresh recommendations when the student's learning preferences change.
- **FR-012**: The system MUST refresh recommendations when the active university, major, or course forum context changes.
- **FR-013**: The system MUST allow every displayed recommendation to be opened as a forum post detail.
- **FR-014**: The system MUST exclude posts the student is not permitted to see from every recommendation category.
- **FR-015**: The system MUST show an empty state, or omit an unavailable recommendation category, when no eligible recommendations exist.
- **FR-016**: The system MUST show a retryable error state when recommendations cannot be produced and MUST NOT display partial or stale restricted content.

### Key Entities

- **Student**: An authenticated university student whose academic context and learning preferences determine which recommendations are relevant.
- **Academic Context**: The active university, major, or course forum used to constrain recommendations.
- **Learning Preference**: Student-configured courses, subjects, interests, learning goals, and preferred study times used as recommendation signals.
- **Forum Post**: An existing discussion, material, or functional post that can be recommended; has a title, type, author, timestamp, engagement indicators, solved status, and visibility rules.
- **Recommendation**: A forum post selected for a student together with a short reason explaining the academic or interest match.
- **Dismissed Recommendation**: A user action that hides a specific recommendation from the current Trending view.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 90% of recommendations shown to a student with configured preferences match the student's active university, major, courses, or interests.
- **SC-002**: 100% of recommendations respect the student's existing forum visibility rules; no restricted post title, summary, or metadata is exposed.
- **SC-003**: 100% of displayed unsolved-question recommendations are unsolved at the time of display.
- **SC-004**: The Trending page and its recommendations appear within 2 seconds under normal operating conditions.
- **SC-005**: At least 95% of dismissed recommendations disappear from the current view immediately after the student dismisses them.
- **SC-006**: After a preference or forum-context change, at least 95% of refreshed recommendations reflect the new inputs on the next display.
- **SC-007**: At least 90% of students who open the Trending page can identify at least one recommendation they consider relevant to their academic context.

## Assumptions

- The Trending page is a discovery layer over existing forum posts; it does not introduce a new post type and does not replace browsing, searching, or opening posts.
- Library resource recommendations and meeting-room recommendations are outside this feature's scope.
- An authenticated session and a selected forum context are available before the Trending page is opened.
- Learning preferences may be absent; in that case the academic context alone is used as the recommendation signal.
- Recommendation count, ranking weights, dismissal persistence beyond the current view, and a dedicated recommendation record are product decisions not specified in the PA4 sources; this feature treats them as implementation choices constrained by the stated behavior.
- Existing forum visibility and privacy rules continue to apply to all recommendation categories.
- The general forum-list empty and error states apply when the Trending page has no candidates or cannot load recommendations.

---

Requirement traceability: FR-24.1–FR-24.5 in `docs/requirements/PA4-Group05/functional_requirements/suggestions_and_filters/requirements.md` and UC-21 in `docs/requirements/PA4-Group05/use_cases/forum-search-and-recommendation/UC-21-forum-recommendations.md`.
