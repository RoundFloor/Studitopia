# Feature Specification: Forum Post List

**Feature Branch**: `003-forum-post-list`

**Created**: 2026-11-28

**Status**: Draft

**Input**: User description: "# Feed — US-13: View the List of Posts. As a university student, I want to view a list of posts within the selected forum, so that I can discover relevant discussions. FR-13.1 display posts for selected university, major, or course forum; FR-13.2 show title, author, post type, timestamp, vote score, comment count, solved status; FR-13.4 sort by newest, top trending, most voted, most discussed; FR-13.5 open a post to view full details."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Posts in the Selected Forum (Priority: P1)

As a university student, when I open a university, major, or course forum, I see a list of the posts that belong to that forum. Each entry gives me enough information at a glance to decide whether the discussion is relevant: its title, author, post type, when it was posted or last updated, its vote score, its comment count, and whether it is solved. When the forum has no posts, I see a clear explanation instead of a blank area.

**Why this priority**: Seeing the right posts with useful summaries is the core of post discovery. Without it, none of the other actions in this feature have value.

**Independent Test**: Open a forum known to contain posts and verify that the list shows exactly the posts for that forum and that each entry shows all seven summary details. Then open an empty forum and verify the explanatory empty state. This alone delivers the ability to discover discussions.

**Acceptance Scenarios**:

1. **Given** a student has selected a university forum with posts, **When** the student opens that forum, **Then** a list of posts belonging to that university forum is displayed. (FR-001, FR-002)
2. **Given** a student has selected a major or course forum with posts, **When** the student views that forum, **Then** the list contains posts relevant to that selected forum level and not unrelated posts. (FR-002)
3. **Given** a forum with posts, **When** the list is displayed, **Then** each post entry shows its title, author, post type, timestamp, vote score, comment count, and solved status. (FR-003)
4. **Given** a question post that is marked solved and another that is not, **When** the list is displayed, **Then** the two posts are visibly distinguishable by solved status. (FR-004)
5. **Given** a discussion or material post, **When** the list is displayed, **Then** solved status is shown in a way that does not falsely mark the post as solved or unsolved. (FR-004)
6. **Given** a forum with no posts, **When** the student views that forum, **Then** an explanatory empty state is shown and the student can still change forum context. (FR-011)
7. **Given** a forum whose posts are still being retrieved or cannot be retrieved, **When** the student views that forum, **Then** a progress indication or a clear failure message with a retry option is shown rather than an empty or broken list. (FR-012)

---

### User Story 2 - Open a Post for Full Details (Priority: P2)

As a university student, after spotting an interesting entry in the post list, I can open that post and read its full details. The opened post is the one I selected, and the detail view confirms the same identifying information I saw in the list.

**Why this priority**: A summary only helps discovery if the student can act on it. Opening the exact post completes the discovery journey and is more fundamental than choosing an ordering.

**Independent Test**: From a list with several posts, open one post and verify that its full title, author, type, timestamp, vote score, comment count, solved status, and content are shown; repeat with a different post and verify the details change accordingly.

**Acceptance Scenarios**:

1. **Given** a post entry in the list, **When** the student selects that entry, **Then** the full details of that same post are displayed. (FR-009)
2. **Given** the full details are displayed, **When** the student compares them with the list entry, **Then** the title, author, post type, timestamp, vote score, comment count, and solved status match. (FR-010)
3. **Given** the student is viewing full details, **When** the student returns to the list, **Then** the list is shown again in the same forum context. (FR-009)

---

### User Story 3 - Sort the Post List (Priority: P3)

As a university student, I can reorder the post list by newest, top trending, most voted, or most discussed. The active ordering is always visible so I know how the list is arranged, and I can change it whenever I want.

**Why this priority**: Sorting helps students prioritize what to read in busy forums, but it builds on a working list and working post access. It can be delivered and tested independently once the first two journeys work.

**Independent Test**: Use a forum with posts whose ages, vote scores, and comment counts differ, apply each of the four orderings, and verify that the resulting sequence matches the documented meaning of each ordering and that the active ordering is displayed.

**Acceptance Scenarios**:

1. **Given** a post list, **When** the forum is first opened, **Then** the posts are ordered by newest and the active ordering is visible. (FR-005, FR-007)
2. **Given** a post list, **When** the student selects newest, top trending, most voted, or most discussed, **Then** the list is reordered according to that option and the newly selected option is shown as active. (FR-006, FR-007)
3. **Given** posts with equal values under the selected ordering, **When** the list is displayed, **Then** the tied posts appear in a consistent order with newer posts before older ones. (FR-008)
4. **Given** an ordering was selected previously, **When** the student switches forum context, **Then** the same ordering remains active for the new forum's list. (FR-007, FR-013)
5. **Given** a forum with zero or one post, **When** the student changes the ordering, **Then** the list remains valid and the selected ordering is still shown. (FR-006, FR-011)

---

### Edge Cases

- A forum has no posts: show an explanatory empty state, not a blank list, and keep forum navigation available.
- A post has a negative vote score or zero comments: show the actual numbers without hiding the post.
- Solved status does not apply to a post type: present it neutrally rather than implying the post is unsolved.
- Two or more posts tie under the selected ordering: use a consistent tie-break so the list does not jump unpredictably.
- A post has no author name available: show a clear placeholder instead of a blank author field.
- The student switches university, major, or course while viewing the list: show posts belonging to the new forum and make the new context clear.
- The student lacks permission for a post or forum: omit that content and show an access notice rather than displaying restricted details.
- A forum has more posts than fit on one screen: every post remains reachable through normal browsing.
- Post data cannot be retrieved: show a failure message with a retry action rather than an empty list that suggests the forum has no posts.
- A selected post is no longer available when opened: show a clear message and a way back to the list.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST display a list of posts when a student opens a university, major, or course forum. (FR-13.1)
- **FR-002**: The system MUST limit the displayed list to posts relevant to the currently selected university, major, or course forum level. (FR-13.1)
- **FR-003**: The system MUST show the title, author, post type, timestamp, vote score, comment count, and solved status for each post in the list. (FR-13.2)
- **FR-004**: The system MUST show solved status as a positive or negative state only where it applies, and as not applicable for other post types. (FR-13.2)
- **FR-005**: The system MUST order the post list by newest when the student first opens a forum. (FR-13.4)
- **FR-006**: The system MUST offer newest, top trending, most voted, and most discussed as ordering options. (FR-13.4)
- **FR-007**: The system MUST visibly indicate the active ordering and preserve it when the student changes forum context. (FR-13.4)
- **FR-008**: The system MUST break ordering ties by showing newer posts before older ones. (FR-13.4)
- **FR-009**: The system MUST let a student open a post from the list and return to the same forum list afterward. (FR-13.5)
- **FR-010**: The system MUST show the full details of the selected post, including the same title, author, post type, timestamp, vote score, comment count, and solved status shown in the list. (FR-13.5)
- **FR-011**: The system MUST show an explanatory empty state when the selected forum has no posts, and MUST keep forum navigation available. (FR-13.1)
- **FR-012**: The system MUST show a progress indication while posts are being retrieved and a clear retryable message when retrieval fails. (FR-13.1)
- **FR-013**: The system MUST refresh the list to match the new forum when the student changes the selected university, major, or course. (FR-13.1)
- **FR-014**: The system MUST omit posts the student is not permitted to view from the list and detail view. (FR-13.1, FR-13.5)

### Key Entities *(include if feature involves data)*

- **Forum Context**: The selected university, major, or course that determines which posts are listed.
- **Post**: A forum item with a title, author, post type, timestamp, content, vote score, comment count, and solved status where applicable.
- **Post Summary**: The compact representation of a post in the list, containing the seven details required for at-a-glance assessment.
- **Ordering Option**: One of newest, top trending, most voted, or most discussed, with newest as the default.
- **Student**: An authenticated university student who can browse forum posts and open their details according to access permissions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 95% of students can identify a relevant post from the list within 60 seconds of opening a forum.
- **SC-002**: 100% of sampled post entries show all seven required summary details, with solved status shown as not applicable where it does not apply.
- **SC-003**: At least 95% of forum visits show the post list within 2 seconds for forums of up to 200 posts under normal conditions.
- **SC-004**: In 100% of ordering checks, the displayed sequence matches the selected ordering definition, and at least 95% of students can identify the active ordering without assistance.
- **SC-005**: 100% of sampled list selections open the matching post's full details in one action, with details consistent with the list entry.
- **SC-006**: 100% of empty forums show the explanatory empty state and 100% of failed retrievals show the retryable failure message.
- **SC-007**: At least 90% of participants complete a "find and open a discussion about a chosen topic" task within 2 minutes in an unmoderated task test.
- **SC-008**: Participants rate the ease of discovering relevant forum discussions at least 4 out of 5 on average.
- **SC-009**: At least 95% of forum-context changes show the new forum's posts within 2 seconds.

## Assumptions

- The student is authenticated and has already selected the university, major, or course forum whose posts are being viewed.
- Post types are discussion, question, and material; solved status is a meaningful state only for questions.
- Newest ordering uses the post's displayed timestamp in descending order; most voted uses vote score in descending order; most discussed uses comment count in descending order.
- Top trending ranks posts by combined vote and comment activity from the last 7 days, with newer activity preferred when activity levels are equal.
- The default ordering is newest, and the same ordering preference is reused when the student switches forum context.
- Vote scores may be negative, and comment counts may be zero; both are shown as recorded.
- Timestamps are shown in a readable form that indicates the post's age and allows the exact time to be identified.
- Full post details are shown in an existing post detail view; this feature defines the list-to-detail journey and the consistency of displayed information, not the authoring of new detail content.
- Creating, editing, or deleting posts, casting votes, adding comments, and searching or filtering posts are outside this feature's scope.
- Only posts the student is permitted to view are included in the list and detail view.
- Reasonable empty, failure, and unavailable-post states use plain language and always provide a path back to the list.
