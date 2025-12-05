import { useState } from "react";
import {
  FirstNameInput,
  LastNameInput,
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
  PhoneNumberInput,
} from "../Components/FormComponents";

const LoginForm = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState("register"); // "login" | "register"
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("FirstName:", firstName);
    console.log("LastName:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    console.log("Phone Number:", phone);
    // Handle form submission logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 relative">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-blue-500"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">Register Here</h2>
          <FirstNameInput
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <LastNameInput
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <EmailInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ConfirmPasswordInput
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <PhoneNumberInput
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button type="submit" className="btn-primary w-full">
            {mode === "register"
              ? "Register"
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
