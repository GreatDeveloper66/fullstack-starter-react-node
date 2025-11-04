import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Fields } from "./FormFields.jsx";

function LoginForm() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [useCode, setUseCode] = useState(false);
  const navigate = useNavigate();

  // --- Effects ---
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // --- Handlers ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = useCode ? { email, phone, code } : { email, password };

    login(payload);
    navigate("/dashboard");
  };
  const handleSendCode = () => {
    alert(`Verification code sent to ${email || phone}`);
  };

  // --- State groups ---
  const state = {
    isRegister,
    useCode,
    forgotPassword,
    email,
    password,
    confirmPassword,
    phone,
    code,
    firstName,
    lastName,
  };
  const handlers = {
    setEmail,
    setPassword,
    setConfirmPassword,
    setPhone,
    setCode,
    setFirstName,
    setLastName,
    handleSendCode,
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8 md:p-10 relative">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-500 dark:text-gray-300 hover:text-blue-500 transition"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* Heading */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6 sm:mb-8">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>

        {/* Toggle Login Method */}
        {!isRegister && (
          <div className="flex justify-center mb-4 sm:mb-6">
            <button
              type="button"
              onClick={() => setUseCode(!useCode)}
              className="btn-secondary w-full sm:w-auto text-sm sm:text-base"
            >
              {useCode ? "Use Password Instead" : "Use One-Time Code"}
            </button>
          </div>
        )}

        {/* Form */}
        {/* --- Form --- */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* The dynamic fields generator */}
          <div className="space-y-3 sm:space-y-4">
            {Fields(state, handlers)}
          </div>

          {/* Submit button */}
          <button type="submit" className="btn-primary w-full">
            {isRegister
              ? "Register"
              : forgotPassword
              ? "Send Reset Code"
              : "Login"}
          </button>
        </form>

        {/* Remember Me + Forgot Password */}
        {!isRegister && (
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 sm:mt-5 text-sm sm:text-base space-y-2 sm:space-y-0">
            <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2 rounded"
              />
              Remember Me
            </label>

            <button
              className="btn-link text-center sm:text-right"
              onClick={() => setForgotPassword(!forgotPassword)}
            >
              {forgotPassword ? "Back to Login" : "Forgot Password?"}
            </button>
          </div>
        )}

        {/* Toggle Register/Login */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-6 text-center">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            className="btn-link"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;

// const inputClasses =
//   "w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 " +
//   "focus:ring-2 focus:ring-blue-400 focus:border-blue-400 " +
//   "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 " +
//   "placeholder-gray-400 dark:placeholder-gray-500 " +
//   "transition duration-200 ease-in-out";
