import { createContext, useState, useContext } from "react";

import axios from "axios";

const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Register
  // Register
  const register = async (userData) => {
    try {
      const res = await axios.post("/api/auth/register", userData);
      const { user, token } = res.data;
      setUser(user);
      localStorage.setItem("token", token); // save token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return res.data;
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  // Login
  const login = async (credentials) => {
    try {
      const res = await axios.post("/api/auth/login", credentials);
      setUser(res.data.user);
      const token = res.data.token;
      localStorage.setItem("token", token); // save token
       // Set default header for all requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return res.data;
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };

  const getUserProfile = async () => {
    try {
      const res = await axios.get("/api/auth/profile"); 
      setUser(res.data.user);
    } catch (error) {
      console.error("Fetching profile failed:", error.response?.data || error.message);
      throw error;
    } 
  };

  // Logout
  const logout = async () => {
    try {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      // navigate("/login");
      await axios.post("/api/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
      throw error;
    } finally {
      setUser(null);
    }
  };

  //Remember Me Functionality can be handled in the login component by storing token in localStorage or sessionStorage based on user preference.
  const 

  return (
    <AuthContext.Provider value={{ user, register, login, logout, getUserProfile, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
