# fullstack-starter-react-node

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

_This README should be updated as the project evolves._
