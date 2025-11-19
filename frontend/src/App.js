import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import LoginForm from "./UserAuthForms/LoginForm";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import "./App.css";

/**
 * Main application component that defines the routing structure for the frontend.
 */
function App() {
  return (
    <div className="App">
      <Router future={{ v7_startTransition: true }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Add more as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
