# Fullstack Starter – React + Node.js + JWT Auth (MVP)

A minimal fullstack starter project featuring:

- React frontend
- Node.js + Express backend
- JWT-based authentication (register, login, logout)
- Protected routes
- User creation, authorization and authentication
- User profile retrieval & update
- Google OAuth (optional — not yet implemented)

This README reflects the project’s **current functional status**, so you can understand the system before extending it further.

---

## 🚀 Features Implemented (MVP)

### ✅ Authentication (Backend + Frontend)

- User registration
- User login
- User logout (token-based)
- Protected routes using JWT middleware
- Automatic redirect to dashboard after login/register

### 🧑‍💼 User Profile

- Get current logged-in user (`/api/users/me`)
- Update profile (name, email, phone, password)

### 🔐 Token Handling

- Tokens stored **client-side**
- Axios automatically attaches `Authorization: Bearer <token>`

---

## 📁 Project Structure

root
├── client/                 # React frontend
│   ├── src/
│   │   ├── Components/     # Protected Route
│   │   ├── Context/        # AuthContext (global auth state)
│   │   ├── Pages/          # App UI Pages
│   │   ├── UserAuthForms/  # User Authorization Forms
│   │   └── Icons/          # Web Page Pictures
│   └── package.json
│
├── server/               # Node.js backend
│   ├── controllers/      # Auth logic (register, login, logout, me)
│   ├── middleware/       # authMiddleware (JWT protect)
│   ├── models/           # User model (Mongoose)
│   ├── routes/           # /api/auth routes
│   ├── config/           # DB connection, environment loader
│   ├── tests/            # Script Tests
│   └── server.js
│
└── package.json

## Getting Started

1. **Create .env**
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key

2. **Install dependencies, build app and run in production:**

    ```bash
      cd fullstack-starter-react-node
      npm run build
      npm run start
    ```

    Frontend runs on <http://localhost:3000>

🔑 API Endpoints
Auth Routes

Base: /api/auth

| Method | Route             | Protected  | Description              |
| ------ | ----------------- | ---------  | -----------------------  |
| POST   | `/register`       | ❌ No      | Create a new user       |
| POST   | `/login`          | ❌ No      | Login user              |
| POST   | `/logout`         | 🔒 Yes     | Clears auth token state |
| GET    | `/profile`        | 🔒 Yes     | Get current user        |
| PUT    | `/update-profile` | 🔒 Yes     | Update name/email       |
| POST   | `/logout`         | 🔒 Yes     |  Logout User            |

🔐 Authentication Flow
🔹 Login / Register

- User submits form
- Backend returns a JWT
- Token stored in localStorage
- Axios attaches token automatically
- User redirected to Dashboard

🔹 Logout

- Removes token from localStorage
- Clears AuthContext
- Redirects to Login

🧪 Testing the API (Postman)

- To test protected endpoints:
- Login → copy the returned JWT
- In Postman add to Headers:
Authorization: Bearer `<token>`
Do not send the token in JSON — the middleware requires it in the auth header.

🧭 Roadmap (Post-MVP)
🔜 Social Login

- Google OAuth (preferred)
- Facebook OAuth (optional)

🔜 Two-Factor Authentication

- SMS verification (via Twilio or alternative)

🔜 Deployment

- Docker compose
- nginx reverse proxy

CI/CD pipeline

## Conventions

- Keep frontend and backend code in separate folders.
- Use `npm` for dependency management.
- Place shared configs at the root; use subdirectory configs for app-specific needs.
- Document API endpoints and integration contracts in `/docs` or `/api` as needed.

## More Info

---

_This README should be updated as the project evolves.

<!-- # fullstack-starter-react-node

A minimal fullstack starter for React (frontend) and Node.js (backend) development, featuring a basic registration and login form suitable for any Node.js/React application.

## Project Structure

- `/frontend` – React frontend (to be added)
- `/server` – Node.js backend (to be added)
- `package.json` – Root scripts and shared configuration

## Getting Started

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Add frontend/backend apps:**
    - Scaffold React app in `/client`:

      ```bash
      npx create-react-app client
      ```

    - Scaffold Node backend in `/server`:

      ```bash
      mkdir server && cd server && npm init -y
      ```

3. **Update scripts in `package.json`:**
    - Add scripts like `start:client`, `start:server` as you add apps.

## Conventions

- Keep frontend and backend code in separate folders.
- Use `npm` for dependency management.
- Place shared configs at the root; use subdirectory configs for app-specific needs.
- Document API endpoints and integration contracts in `/docs` or `/api` as needed.

## More Info

---

_This README should be updated as the project evolves._ -->
