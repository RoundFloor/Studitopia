# Feature Specification: Post Feed

**Feature Branch**: `003-post-feed`

**Created**: 2026-11-28

**Status**: Draft

**Input**: User description: "Specify this feature based on /src and the description # Feed (version 1.1, US-13: View the List of Posts): display a list of posts for the selected university, major, or course forum; show the post title, author, post type, timestamp, vote score, comment count, and solved status; support sorting by newest, top trending, most voted, and most discussed; allow users to open a post from the list to view its full details."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Posts in the Selected Forum (Priority: P1)

A university student opens the feed for the university, major, or course forum currently selected and sees the discussions that belong to that forum. The feed reflects the current forum context, so switching from a university to one of its majors or courses replaces the post list with the content relevant to the new selection. Posts belonging only to unrelated universities, majors, or courses are never mixed into the feed.

**Why this priority**: Discovering relevant discussions in the chosen academic community is the core value of the feed; without a correct forum-scoped list, none of the other capabilities matter.

**Independent Test**: Can be tested by placing posts in several different forums, selecting each forum in turn, and confirming that the feed contains exactly the posts relevant to the selected forum and its child forums.

**Acceptance Scenarios**:

1. **Given** a student viewing a selected course forum that contains posts, **When** the feed is displayed, **Then** the posts associated with that course are listed and posts associated only with other courses are not listed.
2. **Given** a student viewing a university forum, **When** the feed is displayed, **Then** posts relevant to that university, including posts from its majors and courses, are listed.
3. **Given** a student viewing a forum that contains no eligible posts, **When** the feed is displayed, **Then** an informative empty state is shown instead of an error or an unrelated post list.
4. **Given** a post associated with more than one relevant forum, **When** the feed for each of those forums is displayed, **Then** the post appears once per feed and is not duplicated within a feed.
5. **Given** a student who switches from a university forum to a course forum, **When** the new forum finishes loading, **Then** the feed shows only posts relevant to the course and no posts from the previously selected forum remain visible.
6. **Given** a forum with more than 20 eligible posts, **When** the feed is displayed, **Then** the first 20 posts are shown under the active sort and a way to reach the remaining posts is available.

---

### User Story 2 - Understand Each Post at a Glance (Priority: P1)

Each row in the feed gives the student enough information to decide whether a discussion is worth opening: the title, the author, the type of post, when it was created, its current vote score, how many comments it has, and whether it has been solved. The student can compare posts without opening each one.

**Why this priority**: Summary metadata is what makes a list scannable; it is the minimum needed to choose a discussion and is independently valuable even before sorting or detailed views are added.

**Independent Test**: Can be tested by creating posts with distinct authors, types, timestamps, vote counts, comment counts, and solved states, then verifying that each row reports all seven attributes correctly.

**Acceptance Scenarios**:

1. **Given** a post whose votes and replies have changed, **When** the feed is displayed, **Then** the row shows the current vote score and current comment count.
2. **Given** a post with an accepted response, **When** the feed is displayed, **Then** the row indicates that the post is solved; a post without an accepted response is indicated as unsolved.
3. **Given** posts of different types, **When** the feed is displayed, **Then** each row shows the post's type and no row shows a type that the post does not have.
4. **Given** posts created at different times, **When** the feed is displayed, **Then** each row shows its creation time in a consistent format that lets the student tell which post is newer.

---

### User Story 3 - Reorder the Feed (Priority: P2)

A student can sort the feed by newest, top trending, most voted, or most discussed. The selected order applies to the current forum and stays selected while the student moves between pages or switches forum context, so the student can keep looking for high-value discussions without resetting preferences.

**Why this priority**: Sorting turns a chronological list into a discovery tool, helping students surface active, highly rated, or unresolved discussions that would be missed on later pages.

**Independent Test**: Can be tested by creating posts with deliberately different creation times, engagement scores, vote scores, and comment counts, then applying each sort option and verifying the exact resulting order.

**Acceptance Scenarios**:

1. **Given** posts created at different times, **When** the student selects the newest sort, **Then** posts are listed from most recently created to oldest.
2. **Given** posts with different engagement scores, **When** the student selects the top trending sort, **Then** posts are listed from highest engagement to lowest.
3. **Given** posts with different vote scores, **When** the student selects the most voted sort, **Then** posts are listed from highest score to lowest.
4. **Given** posts with different comment counts, **When** the student selects the most discussed sort, **Then** posts are listed from most commented to least commented.
5. **Given** two or more posts tie under the selected sort, **When** the feed is displayed, **Then** those posts appear in a consistent, repeatable order determined by creation time and then by a stable post identifier.
6. **Given** a student who selected a sort option and then changes forum or page, **When** the new feed is displayed, **Then** the same sort option remains active.
7. **Given** a student who has not chosen a sort option, **When** the feed is displayed, **Then** posts are ordered newest first.

---

### User Story 4 - Open a Post for Full Details (Priority: P2)

A student selects a post from the feed and sees its full content and discussion context, including the complete body, author information, associated forum classifications, engagement information, comment thread, and any accepted response. The student can tell from the detail view whether the discussion answers their question.

**Why this priority**: Opening a post is the natural next step after discovery and delivers the actual academic content the student came for.

**Independent Test**: Can be tested by opening a post from the feed and confirming that the detail view matches the selected post's title and summary values and exposes its full body and discussion context.

**Acceptance Scenarios**:

1. **Given** a post displayed in the feed, **When** the student opens it, **Then** the detail view shows that post's title, complete body content, author, creation time, vote score, comment count, solved status, and forum classifications.
2. **Given** a post with comments, **When** the student opens it, **Then** the discussion thread is available with the accepted response clearly identifiable when one exists.
3. **Given** a post whose identifier does not exist or cannot be viewed under the current access rules, **When** the student attempts to open it, **Then** a not-found or access-denied message is shown and no post content is disclosed.
4. **Given** a student who opens a post and then returns to the feed, **When** the feed is redisplayed, **Then** the previous forum context, page, and sort option are preserved.

---

### Edge Cases

- **Empty forum**: A forum with no posts shows a clear empty state and keeps the forum navigation available.
- **No matching posts after filtering**: When forum scope yields no posts, the system does not silently substitute posts from a parent, sibling, or unrelated forum.
- **Tied sort values**: Posts with equal values under any sort option appear in a deterministic order (newest first, then a stable post identifier) and do not change position between page loads.
- **Zero engagement**: Posts with no votes and no comments are included in the feed and sort correctly under every option.
- **Stale summary values**: Counters and solved indicators shown in the feed reflect the latest state, including after votes, comments, or an accepted response are recorded.
- **Multiple forum associations**: A post linked to several forums is shown once in each relevant forum, never duplicated within a single feed.
- **Very long titles or content**: Long text is presented without breaking the feed layout, and the detail view exposes the complete content.
- **Missing author display name**: The feed still identifies the author with a readable fallback rather than a blank author field.
- **Invalid or removed post**: Opening a post that no longer exists or is outside the permitted forum scope produces a clear not-found message.
- **Context change during sorting**: Switching forum while a non-default sort is active re-applies the same sort to the new forum rather than retaining the old forum's order.
- **Restricted forum**: A student cannot see feed rows or details from a forum that the student is not permitted to view.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display a list of posts for the selected university, major, or course forum. (US-13 / FR-13.1)
- **FR-002**: System MUST restrict the feed to posts associated with the selected forum and its relevant child forums and MUST exclude posts belonging only to unrelated forums. (US-13 / FR-13.1)
- **FR-003**: System MUST show an informative empty state when the selected forum has no eligible posts. (US-13 / FR-13.1)
- **FR-004**: System MUST apply the same forum access rules to the feed that apply to the selected forum, so no restricted post, summary, or detail is disclosed. (US-13 / FR-13.1)
- **FR-005**: System MUST present each feed row exactly once. (US-13 / FR-13.1)
- **FR-006**: System MUST show the post title in each feed row. (US-13 / FR-13.2)
- **FR-007**: System MUST show the post author's display identity in each feed row. (US-13 / FR-13.2)
- **FR-008**: System MUST show the post type in each feed row. (US-13 / FR-13.2)
- **FR-009**: System MUST show the post creation timestamp in a consistent format in each feed row. (US-13 / FR-13.2)
- **FR-010**: System MUST show the post's current vote score in each feed row. (US-13 / FR-13.2)
- **FR-011**: System MUST show the post's current comment count in each feed row. (US-13 / FR-13.2)
- **FR-012**: System MUST show whether the post is solved in each feed row. (US-13 / FR-13.2)
- **FR-013**: System MUST support sorting the feed by newest, with most recently created posts first. (US-13 / FR-13.4)
- **FR-014**: System MUST support sorting the feed by top trending, with the highest engagement posts first. (US-13 / FR-13.4)
- **FR-015**: System MUST support sorting the feed by most voted, with the highest vote score first. (US-13 / FR-13.4)
- **FR-016**: System MUST support sorting the feed by most discussed, with the highest comment count first. (US-13 / FR-13.4)
- **FR-017**: System MUST use newest as the default sort when no other option has been chosen. (US-13 / FR-13.4)
- **FR-018**: System MUST resolve ties in every sort option by creation time and then by a stable post identifier so the order is repeatable. (US-13 / FR-13.4)
- **FR-019**: System MUST preserve the selected sort option when the student changes page or forum context. (US-13 / FR-13.4)
- **FR-020**: System MUST allow a student to open a post from the feed to view its full details. (US-13 / FR-13.5)
- **FR-021**: System MUST show the selected post's complete body content, author, creation time, vote score, comment count, solved status, and forum classifications in the detail view. (US-13 / FR-13.5)
- **FR-022**: System MUST make the post's discussion thread available in the detail view and identify the accepted response when one exists. (US-13 / FR-13.5)
- **FR-023**: System MUST show a not-found or access-denied result and disclose no post content when a post cannot be found or is outside the student's permitted forum scope. (US-13 / FR-13.5)
- **FR-024**: System MUST return the feed in pages of a fixed size and MUST apply the selected sort consistently across all pages. (US-13 / FR-13.1, FR-13.4)

### Key Entities *(include if feature involves data)*

- **Forum**: An academic context at university, major, or course level, with optional intermediate groupings, that determines which posts belong in the feed.
- **Post**: A student-authored discussion with a title, full body, author, forum classifications, type, creation time, and engagement indicators.
- **Post Summary**: The compact representation of a post in the feed containing its title, author, type, timestamp, vote score, comment count, and solved status.
- **Author**: The student who created the post, identified by a display name and optional profile image.
- **Engagement Indicators**: The vote score, comment count, and trending measure used in summaries and sorting.
- **Post Type**: The classification of a post as a discussion, question, or material for display and comparison.
- **Discussion Thread**: The comments belonging to a post, including an optional accepted response that determines solved status.
- **Sort Option**: One of newest, top trending, most voted, or most discussed, together with its tie-breaking rule.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 95% of feed views show all seven required summary attributes for every listed post in validation checks.
- **SC-002**: At least 95% of tested students can identify a relevant post from the feed and open it within 30 seconds.
- **SC-003**: At least 95% of feed views become visible within 2 seconds under normal network conditions.
- **SC-004**: 100% of feed-order checks match the selected sort option, including tie cases, across every forum level.
- **SC-005**: 100% of listed posts belong to the selected forum or its relevant child forums in scope validation, with zero posts from unrelated or restricted forums.
- **SC-006**: At least 90% of tested students correctly identify which of four sort options would surface the newest, most engaging, most voted, and most discussed posts.
- **SC-007**: At least 85% of tested students rate the feed summary information as sufficient to decide which post to open, at 4 out of 5 or higher.
- **SC-008**: 100% of empty and not-found cases show the dedicated message rather than an error or unrelated content.

## Assumptions

- The existing academic classification identifies universities, faculties, majors, areas, subjects, and courses; university, major, and course are the primary feed contexts, and intermediate groupings are used only where the hierarchy requires them.
- The selected forum's feed includes posts associated directly with it and posts associated with its child forums; it excludes posts associated only with unrelated forums.
- Post type is limited to discussion, question, and material, derived from the classifications already available on posts.
- Vote score is the number of upvotes minus the number of downvotes recorded for a post.
- Comment count is the number of replies in the post's discussion thread.
- Solved status means an accepted response has been selected for the post; without one the post is unsolved.
- The trending measure reflects accumulated post engagement from votes and replies and is not limited to a recent time window.
- Newest is the default sort, and ties under any sort are resolved newest first and then by a stable post identifier.
- The feed is presented in pages of 20 posts.
- Existing authentication, active-account checks, and forum access rules are reused; the feed does not define a new sign-in mechanism.
- Author identity is shown using the account's display name, with a readable fallback when no display name is available.
- Opening a post reuses the existing discussion thread and accepted-response information rather than defining new comment behavior.
