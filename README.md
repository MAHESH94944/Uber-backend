# Backend API

## POST /users/register

Registers a new user, hashes the password, creates the user, and returns a JWT token and the created user.

- URL: /users/register
- Method: POST
- Headers:
  - Content-Type: application/json

### Request Body

- email: string, required, must be a valid email (min length 5 in model)
- password: string, required, min length 6
- fullname.firstname: string, required, min length 3
- fullname.lastname: string, optional, min length 3 if provided

Example:

```json
{
  "email": "jane.doe@example.com",
  "password": "secret123",
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  }
}
```

### Success Response

- Status: 201 Created
- Body:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "<mongo-id>",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com"
    // ...other non-sensitive fields
  }
}
```

### Error Responses

- 400 Bad Request
  - When validation fails (invalid email, short password, or firstname too short).
  - Body:
    ```json
    {
      "errors": [
        {
          "msg": "Please enter a valid email address",
          "path": "email",
          "...": "..."
        },
        {
          "msg": "First name must be at least 3 characters long",
          "path": "fullname.firstname",
          "...": "..."
        },
        {
          "msg": "Password must be at least 6 characters long",
          "path": "password",
          "...": "..."
        }
      ]
    }
    ```
- 500 Internal Server Error
  - On unexpected server/database errors.

### cURL Example

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.doe@example.com",
    "password": "secret123",
    "fullname": { "firstname": "Jane", "lastname": "Doe" }
  }'
```

Notes:

- Passwords are hashed using bcrypt before being saved.
- JWTs are signed using the JWT_SECRET environment variable.
