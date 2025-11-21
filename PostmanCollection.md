

(This will render as a proper diagram on GitHub.)

---

## ✅ Postman Collection (JSON)

Here is a **complete Postman collection** for your backend API **ready to import**.

👉 Copy the JSON below into a file:  
`fullstack-starter.postman_collection.json`  
Then import into Postman.

---

## **📦 Postman Collection JSON**

```json
{
  "info": {
    "name": "Fullstack Starter API",
    "_postman_id": "f9c5bb62-e814-4c17-9ad4-bc93972e93a1",
    "description": "Postman collection for Node.js + JWT Auth",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Register User",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"firstName\": \"John\",\n  \"lastName\": \"Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\",\n  \"phone\": \"1234567890\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/auth/register",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "auth", "register"]
        }
      }
    },
    {
      "name": "Login User",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/auth/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "auth", "login"]
        }
      }
    },
    {
      "name": "Logout User",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "url": {
          "raw": "http://localhost:5000/api/auth/logout",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "auth", "logout"]
        }
      }
    },
    {
      "name": "Get Current User (Protected)",
      "request": {
        "method": "GET",
        "header": [
          {
            "key": "Authorization",
            "value": "Bearer {{token}}",
            "type": "text"
          }
        ],
        "url": {
          "raw": "http://localhost:5000/api/users/me",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "users", "me"]
        }
      }
    },
    {
      "name": "Update User (Protected)",
      "request": {
        "method": "PUT",
        "header": [
          { "key": "Content-Type", "value": "application/json" },
          {
            "key": "Authorization",
            "value": "Bearer {{token}}",
            "type": "text"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"firstName\": \"Updated\",\n  \"lastName\": \"User\",\n  \"email\": \"updated@example.com\",\n  \"phone\": \"9876543210\"\n}"
        },
        "url": {
          "raw": "http://localhost:5000/api/users/me",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["api", "users", "me"]
        }
      }
    }
  ]
}
