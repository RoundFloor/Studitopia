# Data Model: Trending Page (Forum Recommendations)

**Created**: 2026-11-28

## Entities

### Student

- `student_id`: unique identifier of the authenticated student.
- `university_id`: default academic context.
- `learning_preferences`: optional collection of courses, subjects, interests, learning goals, and preferred study times.
- **Rules**: Must be authenticated before recommendations are produced. Preferences may be empty; academic context is still required.

### AcademicContext

- `university_id`, `major_id`, `course_id`: hierarchical forum scope; later levels refine earlier levels.
- `context_token`: opaque identifier used by existing forum navigation to represent the active scope.
- **Rules**: Only one context is active at a time. A change of context invalidates recommendations from the previous context.

### LearningPreference

- `course_ids`: courses the student follows.
- `subject_tags`: subject tags of interest.
- `interest_tags`: free-form interest tags.
- `learning_goals`: stated learning objectives.
- `preferred_study_times`: preferred study windows.
- **Rules**: Values are optional; absence reduces matching signals but does not block recommendations.

### ForumPost

- `post_id`: unique post identifier.
- `title`: short post title.
- `post_type`: discussion, material, or functional.
- `author`: post author summary.
- `vote_score`: engagement signal.
- `comment_count`: engagement signal.
- `solved`: whether the post has an accepted/true response.
- `created_at`: creation timestamp used for recency.
- `tags`: optional context and topic tags.
- `visibility`: existing forum/privacy rules governing whether the student may see the post.
- **Rules**: Only posts visible to the requesting student may enter any recommendation collection.

### Recommendation

- `post_id`: referenced forum post.
- `category`: `relevant | trending | unsolved`.
- `reason`: short text explaining the academic-context or interest match.
- `rank`: deterministic ordering within the category.
- **Rules**: A post appears at most once per category. A post in the `unsolved` category must have `solved = false`. A `reason` must be derived from an actual matching signal.

### DismissedRecommendation

- `post_id`: recommendation hidden by the student.
- `scope`: the current Trending view session.
- **Rules**: Applies only to the current recommendation view; it is not persisted beyond that view. A refresh or context change creates a fresh view.

## Relationships

- A `Student` has one active `AcademicContext` and zero or more `LearningPreference` values.
- An `AcademicContext` contains zero or more visible `ForumPost` records.
- Each `ForumPost` may yield zero or more `Recommendation` entries, one per matching category.
- A `DismissedRecommendation` references one `Recommendation` in the current view.

## State Transitions

1. Context opened or changed → recommendations are rebuilt from the new `AcademicContext`.
2. Preferences changed and refresh requested → recommendations are rebuilt using updated `LearningPreference` values.
3. Recommendation dismissed → matching `DismissedRecommendation` is added to the current view and the item is hidden.
4. Recommendation data load failure → view keeps the normal forum state and offers retry; no partial or stale recommendations are shown.
