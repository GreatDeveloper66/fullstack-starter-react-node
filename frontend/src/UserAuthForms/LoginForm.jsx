import { useState } from "react";
import { useAuth } from "../Context/AuthContext";

function LoginForm() {
  const { login } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock login
    login({ email, phone });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="shadow-2xl rounded-2xl bg-white p-8 w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border rounded-lg p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isRegister && (
            <input
              type="password"
              placeholder="Password"
              className="border rounded-lg p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}
          <input
            type="tel"
            placeholder="Phone Number"
            className="border rounded-lg p-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Verification Code"
            className="border rounded-lg p-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-2"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className="text-sm text-gray-600 mt-4 text-center">
          {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            className="text-blue-500 underline"
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
