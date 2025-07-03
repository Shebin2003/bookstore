
##  Installation


-git clone https://github.com/your-username/bookstore-api.git
-cd bookstore-api
-npm install

## Testing the API with Postman

You can easily test this API using [Postman](https://www.postman.com/)


### 1.Register a new user
- **Endpoint:** `POST /api/register`
- **Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "pass123"
}
``` 
### 2.Login to get a JWT token
To access protected `/api/books` routes, you must first login and get a token.

- **Endpoint:** `POST /api/login`
- **Body (JSON):**
```json
{
  "email": "test@example.com",
  "password": "pass123"
}
``` 
