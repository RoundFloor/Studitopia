# API

## Database

### Forum Group (Primary):

#### 1. List Forum Posts:

```sql
function studitopia.list_forum_posts(
			puniversity_id: uuid,
			pmajor_id: uuid,
			pcourse_id: uuid,
			ptag: string,
			psearch: string,
			psort: string,
			plimit: integer,
			poffset: integer
)
return table(
			post_id: uuid,
			title: string,
			post_type: string,
			author_id: uuid,
			vote_score: integer,
			comment_count: integer,
			solved: boolean,
			created_at: timestamp
)
```

Return error:

- UNKNOWN_ERROR: 45000
- INVALID_POST_TYPE: 48003
- FORBIDDEN: 48010

Requirement:

- Filter posts by university, major, course, tag, and search keyword
- Sort by newest, trending, most voted, or most discussed
- Return only posts visible to the requesting user

#### 2. Get Forum Post:

```sql
function studitopia.get_forum_post(ppost_id: uuid)
return {
			post: record,
			comments: record[],
			true_response: record,
			user_vote: integer,
			saved: boolean
}
```

Return error:

- UNKNOWN_ERROR: 45000
- POST_NOT_FOUND: 48001
- FORBIDDEN: 48010

Requirement:

- Return post details, comments, answers, and true response
- Respect privacy and moderation visibility rules

#### 3. Create Forum Post:

```sql
function studitopia.create_forum_post(
			pauthor_id: uuid,
			puniversity_id: uuid,
			pmajor_id: uuid,
			pcourse_id: uuid,
			ppost_type: string,
			ptitle: string,
			pcontent: string,
			ptags: string[],
			pfiles: jsonb
)
return {post_id: uuid, created_at: timestamp}
```

Return error:

- UNKNOWN_ERROR: 45000
- INVALID_POST_TYPE: 48003
- INVALID_POST_CONTENT: 48004
- FORBIDDEN: 48010

Requirement:

- Post type must be discussion, material, or functional
- Validate title, content, tags, and attached files
- Associate the post with the selected university, major, and course

#### 4. Create Forum Comment:

```sql
function studitopia.create_forum_comment(
			pauthor_id: uuid,
			ppost_id: uuid,
			pcontent: string,
			pparent_comment_id: uuid
)
return {comment_id: uuid, created_at: timestamp}
```

Return error:

- UNKNOWN_ERROR: 45000
- POST_NOT_FOUND: 48001
- COMMENT_NOT_FOUND: 48002
- INVALID_POST_CONTENT: 48004
- FORBIDDEN: 48010

Requirement:

- Validate comment content
- Support comments and answers, including nested replies where applicable

#### 5. Vote on Forum Post or Comment:

```sql
function studitopia.vote_forum_content(
			puser_id: uuid,
			ptarget_type: string,
			ptarget_id: uuid,
			pvote: integer
)
return {vote_score: integer}
```

Return error:

- UNKNOWN_ERROR: 45000
- POST_NOT_FOUND: 48001
- COMMENT_NOT_FOUND: 48002
- INVALID_VOTE: 48005
- DUPLICATED_VOTE: 48006
- FORBIDDEN: 48010

Requirement:

- Target type must be post or comment
- Vote must be upvote, downvote, or removed
- A user can have at most one active vote per target

#### 6. Mark True Response:

```sql
function studitopia.mark_true_response(
			puser_id: uuid,
			ppost_id: uuid,
			pcomment_id: uuid
)
return {solved: boolean}
```

Return error:

- UNKNOWN_ERROR: 45000
- POST_NOT_FOUND: 48001
- COMMENT_NOT_FOUND: 48002
- NOT_POST_OWNER: 48007
- FORBIDDEN: 48010

Requirement:

- Only the post author can mark a true response
- Mark the post as solved and notify the selected answer author

#### 7. Save Forum Post:

```sql
function studitopia.save_forum_post(puser_id: uuid, ppost_id: uuid)
return {saved: boolean}
```

Return error:

- UNKNOWN_ERROR: 45000
- POST_NOT_FOUND: 48001
- FORBIDDEN: 48010

Requirement:

- Save or unsave a post for the requesting user

#### 8. Report Forum Content:

```sql
function studitopia.report_forum_content(
			preporter_id: uuid,
			ptarget_type: string,
			ptarget_id: uuid,
			pcategory: string,
			pdescription: string
)
return {report_id: uuid}
```

Return error:

- UNKNOWN_ERROR: 45000
- POST_NOT_FOUND: 48001
- COMMENT_NOT_FOUND: 48002
- INVALID_REPORT_CATEGORY: 48009
- FORBIDDEN: 48010

Requirement:

- Record report context and route it to the moderation queue
- Prevent duplicate reports from the same user for the same target within a short window

### Authentication Group:

#### 1. Validate Username:

```sql
function studitopia.validate_username(string): boolean
```

Return error:

- UNKNOWN ERROR: 45000
- INVALID_USERNAME: 45003
- DUPLICATED_USERNAME: 47002

Requirement:

- Valid username format
- Check whether username used

#### 2. Validate Email:

```sql
function studitopia.validate_email(string): boolean
```

Return error:

- UNKNOWN_ERROR: 45000
- INVALID_EMAIL: 45002
- UNREGISTED_EMAIL_DOMAIN: 46001
- DUPPLICATED_EMAIL: 47001

Requirement:

- Check email format
- Validate email domain (which university or faculty matched with this domain)
- Check email used

### 3. Register:

```sql
function studitopia.register(
			displayname: string, 
			username: string, 
			email: string, 
			password: string
)
return {session_id: string, user_id: string, status: number}
```

Return value:

- status is status of user account, include: 0 (inactive), 1(preprofile), 2(active), 3(suspend)

Return error:

- INVALID_DISPLAYNAME
- INVALID_USERNAME
- DUPLICATED_USERNAME
- INVALID_EMAIL
- UNREGISTED_EMAIL_DOMAIN
- DUPPLICATED_EMAIL
- INVALID_PASSWORD

Requirement:

- Use HMAC-SHA256 for refresh_token and access_token
- Account registered must be inactive
- Password must be hashed

## Backend

### Forum (Primary)

#### 1. List Forum Posts:

```tsx
GET /forum/posts
```

#### Query params:

- university_id?: string
- major_id?: string
- course_id?: string
- tag?: string
- search?: string
- sort?: 'newest' | 'trending' | 'most_voted' | 'most_discussed'
- limit?: number
- offset?: number

#### Response:

```tsx
SUCCESS:
	{
		statusCode: 200,
		data: {
			posts: {
				post_id: string,
				title: string,
				post_type: 'discussion' | 'material' | 'functional',
				author: { user_id: string, displayname: string },
				vote_score: number,
				comment_count: number,
				solved: boolean,
				created_at: number
			}[],
			total: number
		}
	}

BAD_REQUEST {
		statusCode: 400
}
UNAUTHORIZED {
		statusCode: 401
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

#### 2. Get Forum Post:

```tsx
GET /forum/posts/:post_id
```

#### Response:

```tsx
SUCCESS:
	{
		statusCode: 200,
		data: {
			post: object,
			comments: object[],
			true_response: object | null,
			user_vote: -1 | 0 | 1,
			saved: boolean
		}
	}

NOT_FOUND {
		statusCode: 404,
		data: (POST_NOT_FOUND)[]
}
UNAUTHORIZED {
		statusCode: 401
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

#### 3. Create Forum Post:

```tsx
POST /forum/posts
```

#### Body:

```tsx
{
	university_id: string,
	major_id?: string,
	course_id?: string,
	post_type: 'discussion' | 'material' | 'functional',
	title: string,
	content: string,
	tags?: string[],
	files?: File[]
}
```

#### Response:

```tsx
SUCCESS:
	{
		statusCode: 201,
		data: {
			post_id: string,
			created_at: number
		}
	}

BAD_REQUEST {
		statusCode: 400,
		data: (INVALID_POST_TYPE | INVALID_POST_CONTENT)[]
}
UNAUTHORIZED {
		statusCode: 401
}
FORBIDDEN {
		statusCode: 403,
		data: (FORBIDDEN)[]
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

#### 4. Create Forum Comment:

```tsx
POST /forum/posts/:post_id/comments
```

#### Body:

```tsx
{
	content: string,
	parent_comment_id?: string
}
```

#### Response:

```tsx
SUCCESS:
	{
		statusCode: 201,
		data: {
			comment_id: string,
			created_at: number
		}
	}

BAD_REQUEST {
		statusCode: 400,
		data: (INVALID_POST_CONTENT)[]
}
NOT_FOUND {
		statusCode: 404,
		data: (POST_NOT_FOUND | COMMENT_NOT_FOUND)[]
}
UNAUTHORIZED {
		statusCode: 401
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

#### 5. Vote on Forum Content:

```tsx
POST /forum/votes
```

#### Body:

```tsx
{
	target_type: 'post' | 'comment',
	target_id: string,
	vote: 1 | 0 | -1
}
```

#### Response:

```tsx
SUCCESS:
	{
		statusCode: 200,
		data: {
			vote_score: number
		}
	}

BAD_REQUEST {
		statusCode: 400,
		data: (INVALID_VOTE)[]
}
CONFLICT {
		statusCode: 409,
		data: (DUPLICATED_VOTE)[]
}
NOT_FOUND {
		statusCode: 404,
		data: (POST_NOT_FOUND | COMMENT_NOT_FOUND)[]
}
UNAUTHORIZED {
		statusCode: 401
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

#### 6. Mark True Response:

```tsx
PATCH /forum/posts/:post_id/true-response
```

#### Body:

```tsx
{
	comment_id: string
}
```

#### Response:

```tsx
SUCCESS:
	{
		statusCode: 200,
		data: {
			solved: boolean
		}
	}

NOT_FOUND {
		statusCode: 404,
		data: (POST_NOT_FOUND | COMMENT_NOT_FOUND)[]
}
FORBIDDEN {
		statusCode: 403,
		data: (NOT_POST_OWNER | FORBIDDEN)[]
}
UNAUTHORIZED {
		statusCode: 401
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

#### 7. Save or Unsave Forum Post:

```tsx
POST /forum/posts/:post_id/save
```

#### Response:

```tsx
SUCCESS:
	{
		statusCode: 200,
		data: {
			saved: boolean
		}
	}

NOT_FOUND {
		statusCode: 404,
		data: (POST_NOT_FOUND)[]
}
UNAUTHORIZED {
		statusCode: 401
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

#### 8. Report Forum Content:

```tsx
POST /forum/reports
```

#### Body:

```tsx
{
	target_type: 'post' | 'comment',
	target_id: string,
	category: string,
	description?: string
}
```

#### Response:

```tsx
SUCCESS:
	{
		statusCode: 201,
		data: {
			report_id: string
		}
	}

BAD_REQUEST {
		statusCode: 400,
		data: (INVALID_REPORT_CATEGORY)[]
}
NOT_FOUND {
		statusCode: 404,
		data: (POST_NOT_FOUND | COMMENT_NOT_FOUND)[]
}
UNAUTHORIZED {
		statusCode: 401
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

### Authentication

#### 1. Validation: (Temporarily Disabled)

```tsx
GET /auth/validate
```

#### Query params:

- username?: string
- email?: string
- displayname?: string
- password?: string (not reccommended)

#### Response:

```tsx
SUCCESS:
	{
		statusCode: 204
	}

BAD_REQUEST {
		statusCode: 400
	}
CONFLICT {
	statusCode: 409,
	data: (DUPPLICATED_USERNAME | DUPLICATED_EMAIL | UNREGISTED_EMAIL_DOMAIN)[]
}
UNPROCESSABLE {
	statusCode: 422,
	data: (INVALID_DISPLAYNAME | INVALID_USERNAME | INVALID_EMAIL | INVALID_PASSWORD)[]
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

#### 2. Register:

```php
POST /auth/register
```

#### Body:

```tsx
{
	displayname: string,
	username: string,
	email: string,
	password: string
}

```

#### Response:

```tsx
SUCCESS: {
		statusCode: 201,
		data: {
				access_token: {
						token: string,
						created: number,
						expired: number
				}
	}
BAD_REQUEST {
		statusCode: 400
	}
CONFLICT {
	statusCode: 409,
	data: (DUPPLICATED_USERNAME | DUPLICATED_EMAIL | UNREGISTED_EMAIL_DOMAIN)[]
}
UNPROCESSABLE {
	statusCode: 422,
	data: (INVALID_DISPLAYNAME | INVALID_USERNAME | INVALID_EMAIL | INVALID_PASSWORD)[]
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```

#### 3. Login:

```php
POST /auth/login
```

#### Query:

- type: 'token' | 'username' | 'email'

#### Body:

```tsx
type: 'token'
	{}
type: 'username' | 'email'
	{
		identifier: string,
		password: string
	}
```

#### Response:

```tsx
SUCCESS: 
	type: 'token' {
		successCode: 200,
		data: {
			access_token: string,
			created: number,
			expired: number
		}
	}
	type: 'username' | 'email'
	{
		successCode: 201,
		data: {
				access_token: {
						token: string,
						created: number,
						expired: number
				}
		}
	}
	
BAD_REQUEST {
		statusCode: 400
	}
UNAUTHORIZED {
	statusCode: 401
}
CONFLICT {
	statusCode: 409,
	data: (DUPPLICATED_USERNAME | DUPLICATED_EMAIL | UNREGISTED_EMAIL_DOMAIN)[]
}
UNPROCESSABLE {
	statusCode: 422,
	data: (INVALID_USERNAME | INVALID_EMAIL | INVALID_PASSWORD)[]
}
INTERNAL_SERVER_ERROR {
		statusCode: 500,
		data: (DATABASE_ERROR | UNKNOWN_ERROR)[]
}
```
