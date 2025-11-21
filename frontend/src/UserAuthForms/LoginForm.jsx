import { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Fields } from "./FormFields.jsx";
import axios from "axios";

function LoginForm() {
  const { login, register, setUser } = useAuth();
  const navigate = useNavigate();

  // 🌙 Theme & Preferences
  const [darkMode, setDarkMode] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // 🔁 Form Mode: "login" | "register" | "code" | "forgot"
  const [mode, setMode] = useState("login");

  // 🧠 Form Data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");

  // useEffect(() => {
  //   // 🌗 Toggle dark mode
  //   document.documentElement.classList.toggle("dark", darkMode);

  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     axios
  //       .get("/api/auth/profile")
  //       .then((res) => setUser(res.data.user))
  //       .catch(() => {
  //         // Token invalid or expired → clear it
  //         localStorage.removeItem("token");
  //         delete axios.defaults.headers.common["Authorization"];
  //       })
  //       .finally(() => {
  //         navigate("/dashboard");
  //       });
  //   } else {
  //     navigate("/login");
  //   }
  // },[ darkMode, navigate, setUser ]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const checkUser = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const res = await axios.get("/api/auth/profile");
        setUser(res.data.user);
        navigate("/dashboard");
      } catch {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      }
    };

    checkUser();
  }, []); // <-- remove dependencies

  // ✉️ Send verification code mock
  const handleSendCode = async () => {
    try {
      const res = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      alert(data.message || "Code sent!");
    } catch (err) {
      alert("Error sending code");
    }
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let payload = {};

      // 🧠 Build payload depending on mode
      if (mode === "register") {
        payload = { firstName, lastName, email, password, phone };
        await register(payload);
      } else if (mode === "code") {
        payload = { email, phone, code };
        await login(payload); // backend will handle one-time code verification
      } else if (mode === "login") {
        payload = { email, password };
        await login(payload);
      } else if (mode === "forgot") {
        payload = { email };
        // optionally call a forgotPassword() function
        console.log("Password reset request sent", payload);
      }

      // ✅ Navigate only if authentication succeeded
      if (mode !== "forgot") navigate("/profile");
    } catch (err) {
      // show a meaningful error message
      console.error(err);
      alert(
        err?.response?.data?.message || err?.message || "Authentication failed"
      );
    }
  };

  const handleRememberMe = (checked) => {
    setRememberMe(checked);
    // Persist the user's preference; do not attempt to store a token here (token ownership handled after auth)
    if (checked) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
  };

  // 🔗 Handlers and state to pass to Fields
  const state = {
    mode,
    email,
    phone,
    password,
    confirmPassword,
    firstName,
    lastName,
    code,
  };
  const handlers = {
    setEmail,
    setPhone,
    setPassword,
    setConfirmPassword,
    setFirstName,
    setLastName,
    setCode,
    handleSendCode,
  };

  // 🧩 Mode Titles
  const titles = {
    login: "Welcome Back",
    register: "Create an Account",
    forgot: "Reset Password",
    code: "Verify Code",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 relative">
        {/* 🌗 Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-blue-500"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        {/* 🏷️ Form Title */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">
          {titles[mode]}
        </h2>

        {/* 🔄 Toggle login methods (password/code) */}
        {(mode === "login" || mode === "code") && (
          <div className="flex justify-center mb-5">
            <button
              type="button"
              onClick={() => setMode(mode === "code" ? "login" : "code")}
              className="btn-secondary text-sm"
            >
              {mode === "code" ? "Use Password Instead" : "Use One-Time Code"}
            </button>
          </div>
        )}

        {/* 🧠 Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {Fields(state, handlers)}

          <button type="submit" className="btn-primary w-full">
            {mode === "register"
              ? "Register"
              : mode === "forgot"
              ? "Send Reset Code"
              : "Login"}
          </button>
        </form>

        {/* 🧩 Remember Me / Forgot Password */}
        {mode === "login" && (
          <div className="flex justify-between items-center mt-4 text-sm">
            <label className="flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => handleRememberMe(!rememberMe)}
                className="mr-2"
              />
              Remember Me
            </label>

            <button
              className="btn-link"
              onClick={() => setMode("forgot")}
              type="button"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* 🔁 Toggle between Login / Register */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 text-center">
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
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300 dark:border-gray-700" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            className="btn-outline flex items-center justify-center space-x-2"
            onClick={() => (window.location.href = "api/auth/google")}
          >
            {/* <img src="/icons/google.svg" alt="Google" className="w-5 h-5" /> */}
            {/* <span>Google</span> */}
            <p>GOOGLE</p>
          </button>
          <button
            className="btn-outline flex items-center justify-center space-x-2"
            onClick={() => (window.location.href = "/auth/github")}
          >
            {/* <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" /> */}
            {/* <span>Facebook</span> */}
            <p>FACEBOOK</p>
          </button>
          <button
            className="btn-outline flex items-center justify-center space-x-2"
            onClick={() => (window.location.href = "/auth/linkedin")}
          >
            {/* <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" /> */}
            {/* <span>LinkedIn</span> */}
            <p>LINKEDIN</p>
          </button>
          <button
            className="btn-outline flex items-center justify-center space-x-2"
            onClick={() => (window.location.href = "/auth/twitter")}
          >
            {/* <img src="/icons/twitter.svg" alt="Twitter" className="w-5 h-5" /> */}
            {/* <span>Twitter</span> */}
            <p>TWITTER</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
