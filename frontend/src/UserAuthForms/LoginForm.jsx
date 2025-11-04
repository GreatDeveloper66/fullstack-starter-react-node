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
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div className="space-y-3 sm:space-y-4">
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
            {(useCode && !isRegister) ? null:   (
              <input
                type="email"
                placeholder="Email"
                className={inputClasses}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}

            {isRegister || !forgotPassword ? null : (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Enter your email or phone number to receive a password reset
                code.
              </p>
            )}
            {isRegister && (
              <input
                type="password"
                placeholder="Password"
                className={inputClasses}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: forgotPassword ? "none" : "block" }}
              />
            )}

            {!isRegister && useCode ? (
              <input
                type="tel"
                placeholder="Phone Number"
                className={inputClasses}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : null}

            {!isRegister &&
              (useCode ? (
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 space-y-2 sm:space-y-0">
                  <input
                    type="text"
                    placeholder="Verification Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`${inputClasses} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    className="btn-outline w-full sm:w-auto text-sm sm:text-base"
                  >
                    Send Code
                  </button>
                </div>
              ) : (
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClasses}
                />
              ))}

            {isRegister && (
              <input
                type="password"
                placeholder="Confirm Password"
                className={inputClasses}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            {isRegister && (
              <input
                type="tel"
                placeholder="Phone Number"
                className={inputClasses}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}
          </div>

          <button type="submit" className="btn-primary w-full">
            {isRegister ? "Register" : "Login"}
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
