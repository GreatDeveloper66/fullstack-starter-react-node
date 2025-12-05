import { useState, Fragment } from "react";
import {
  FirstNameInput,
  LastNameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
  PhoneNumberInput,
  RememberMeCheckbox,
  RememberMeCheckboxLight
} from "../Components/FormComponents";

/**
 * LoginForm Component
 * 
 * A React component that provides a unified login and registration form with dark mode support.
 * Users can toggle between login and registration modes, manage form inputs, and persist
 * their "remember me" preference to localStorage.
 * 
 * @component
 * @returns {JSX.Element} A form component with authentication UI
 * 
 * @description
 * Features:
 * - Toggle between login and registration modes
 * - Dark/Light mode theme switching
 * - Form validation for email, password, and phone inputs
 * - "Remember Me" functionality for login mode (persisted to localStorage)
 * - Responsive design with Tailwind CSS
 * - Conditional field rendering based on selected mode
 * 
 * State Management:
 * - darkMode: Boolean controlling theme appearance
 * - mode: String ('login' or 'register') controlling visible form fields
 * - rememberMe: Boolean controlling checkbox state and localStorage persistence
 * - firstName, lastName, email, password, confirmPassword, phone: Form input values
 * 
 * Handlers:
 * - handleRememberMe(): Toggles remember me state and updates localStorage
 * - handleSubmit(e): Validates and logs form submission data based on mode
 * 
 * @example
 * <LoginForm />
 * 
 * @note
 * - Logs form data to console on submission (should be replaced with actual API calls)
 * - Uses custom input components: FirstNameInput, LastNameInput, EmailInput, etc.
 * - Requires RememberMeCheckbox and RememberMeCheckboxLight components
 * - Styling uses Tailwind CSS classes
 */
const LoginForm = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState("register"); // "login" | "register"
  const [rememberMe, setRememberMe] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRememberMe = () => {
    if(rememberMe) {
      localStorage.setItem("rememberMe", "false");
      setRememberMe(false);
    } else {
      localStorage.setItem("rememberMe", "true");
      setRememberMe(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      // Handle login logic
      console.log("Form submitted");
      console.log("Email:", email);
      console.log("Password:", password);
    } else {
      // Handle registration logic
        console.log("Form submitted");
    console.log("FirstName:", firstName);
    console.log("LastName:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Phone Number:", phone);
    }
    // Handle form submission logic here
  };

  const dark = "w-full max-w-md bg-gray-500 dark:bg-gray-500 shadow-2xl rounded-2xl p-8 relative";
  const light = "w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 relative";
  const textDark = "text-sm text-gray-600 dark:text-gray-400 mt-6 text-center";
  const textLight = "text-sm text-white dark:text-gray-200 mt-6 text-center";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className={darkMode ? dark : light}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-blue-500"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
            {mode === "register" ? "Create an Account" : "Welcome Back"}
          </h2>
          {mode === "register" ? (
            <Fragment>
              <FirstNameInput
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <LastNameInput
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Fragment>
          ) : null}
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {mode === "register" ? (
            <Fragment>
              <ConfirmPasswordInput
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <PhoneNumberInput
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Fragment>
          ) : null}
          <button type="submit" className="btn-primary w-full">
            {mode === "register" ? "Register" : "Login"}
          </button>
          {mode === "login" && (
            darkMode ?
              <RememberMeCheckboxLight onClick={handleRememberMe} /> :
            <RememberMeCheckbox
              onClick={handleRememberMe}
            />
            )}
        </form>
        {/* 🔁 Toggle between Login / Register */}
        <p className={darkMode ? textLight : textDark}>
          {mode === "register"
            ? "Already have an account?"
            : "Don’t have an account?"}{" "}
          <button
            className="btn-link"
            type="button"
            onClick={() => setMode(mode === "register" ? "login" : "register")}
          >
            {mode === "register" ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
