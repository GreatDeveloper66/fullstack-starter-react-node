import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import LoginForm from './UserAuthForms/LoginForm';
import Dashboard from './Pages/Dashboard';
import './App.css';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;

