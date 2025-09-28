import { useState } from "react";
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login
    login({ email, phone });
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="shadow-2xl rounded-2xl bg-white p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isRegister ? "Create an Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {isRegister && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isRegister && (
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          {isRegister && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          <input
            type="tel"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Verification Code"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 ease-in-out"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition duration-200 ease-in-out w-full"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        {!isRegister && !forgotPassword && (
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <span>Remember Me</span>
          </div>
        )}
        {!isRegister && (
          <p className="text-sm text-gray-600 mt-2 text-center">
            <button
              type="button"
              className="text-blue-500 hover:text-blue-600 font-medium underline underline-offset-2 transition"
              onClick={() => setForgotPassword(!forgotPassword)}
            >
              {forgotPassword ? (
                <div className="mt-4 text-center text-gray-600">
                  <p>We’ll send a reset link to your email.</p>
                </div>
              ) : ("Forgot Password?")
            }
            </button>
          </p>
        )}
        <p className="text-sm text-gray-600 mt-4 text-center">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="button"
            className="text-blue-500 hover:text-blue-600 font-medium underline underline-offset-2 transition"
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
