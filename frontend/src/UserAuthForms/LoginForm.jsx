import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

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

 const inputClasses =
  "w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 " +
  "focus:ring-2 focus:ring-blue-400 focus:border-blue-400 " +
  "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 " +
  "placeholder-gray-400 dark:placeholder-gray-500 " +
  "transition duration-200 ease-in-out";


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (useCode) {
      alert(`Logging in with code: ${code}`);
      login({ email, phone, code });
    } else {
      alert(`Logging in with email: ${email}`);
      login({ email, password });
    }
    navigate("/dashboard");
  };

  const handleSendCode = () => {
    alert(`Verification code sent to ${email || phone}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="relative shadow-2xl rounded-2xl bg-white dark:bg-gray-900 p-8 w-full max-w-md transition-colors duration-300">
        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-3 right-3 text-sm px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>

        {!isRegister && (
          // Toggle between password and code login
          <div className="flex justify-center space-x-4 mb-4">
            <button
              type="button"
              className={`px-3 py-2 rounded-lg border transition ${
                !useCode
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
              }`}
              onClick={() => setUseCode(false)}
            >
              Password Login
            </button>
            <button
              type="button"
              className={`px-3 py-2 rounded-lg border transition ${
                useCode
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-100 dark:bg-gray-800 dark:text-gray-300"
              }`}
              onClick={() => setUseCode(true)}
            >
              Code Login
            </button>
          </div>
        )}



        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className={inputClasses}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className={inputClasses}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {useCode ? (
            <>
              <input
                type="text"
                placeholder="Verification Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={inputClasses}
              />
              <button
                type="button"
                onClick={handleSendCode}
                className="text-sm text-blue-500 hover:underline self-start"
              >
                Send Code
              </button>
            </>
          ) : (
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClasses}
            />
          )}

          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              className={inputClasses}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <input
            type="tel"
            placeholder="Phone Number"
            className={inputClasses}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition duration-200 ease-in-out w-full"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {!isRegister && !forgotPassword && (
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Remember Me
            </span>
          </div>
        )}

        {!isRegister && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setForgotPassword(!forgotPassword)}
            >
              {forgotPassword ? "Back to Login" : "Forgot Password?"}
            </button>
          </p>
        )}

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            className="text-blue-500 hover:underline"
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
