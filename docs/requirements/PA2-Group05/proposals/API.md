# API

## Database

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