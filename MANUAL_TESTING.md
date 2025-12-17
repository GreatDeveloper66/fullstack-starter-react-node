# Manual Testing Guide for Fullstack Starter React/Node App

---

## 1. App Launch

- Open the app in your browser at `http://localhost:3000` (frontend) or the deployed URL.
- Ensure the homepage loads without errors.

---

## 2. User Registration

Steps to test user registration:

1. Navigate to the **Register** page.
2. Fill in the registration form:
   1. Enter a valid username.
   2. Enter a valid email address.
   3. Enter a password.
   4. Confirm the password.
   5. (Optional) Check "Remember Me" if available.
3. Click **Register**.
4. Verify:
   - User is redirected to the **Dashboard** or welcome page.
   - Registration confirmation is shown.
   - User data is stored in the database (if accessible).

---

## 3. User Login

Steps to test login:

1. Navigate to the **Login** page.
2. Enter credentials for an existing user:
   1. Username or email.
   2. Password.
   3. (Optional) Check "Remember Me".
3. Click **Login**.
4. Verify:
   - User is redirected to the **Dashboard**.
   - Login session persists (with "Remember Me").
   - Protected pages are accessible.

---

## 4. Protected Routes

- Attempt to access **Dashboard**, **Profile**, or **Forgot Password** without logging in.
- Verify:
  - User is redirected to **Login** if not authenticated.
  - After logging in, protected pages are accessible.

---

## 5. Logout

Steps to test logout:

1. Click the **Logout** button.
2. Verify:
   - User is redirected to the **Login** page.
   - Protected routes are no longer accessible.

---

## 6. Flow Diagram

```mermaid
flowchart TD
    A[Open App] --> B[Go to Login / Register]
    B --> C{Existing User?}
    C -->|Yes| D[Login Page]
    C -->|No| E[Register Page]
    D --> F[Dashboard / Protected Page]
    E --> F
    F --> G[Logout]
    G --> B
