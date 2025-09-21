import { Routes, Route } from 'react-router-dom';
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  )
};

export default App;

