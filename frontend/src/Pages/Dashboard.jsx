import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Dashboard() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
            <p className="text-lg">This is a protected dashboard page.</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleLogout()}>Logout</button>
        </div>
    );
}   

export default Dashboard;