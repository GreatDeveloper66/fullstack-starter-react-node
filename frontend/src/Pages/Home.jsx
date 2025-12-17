import { useAuth } from "../Context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function Home() {
    const { user } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
            {user ? (

                <p className="text-lg">Hello, {user.email || user.phone || "Nobody"}!</p>
            ) : (
                <div>
                    <p className="text-lg mb-4">You are not logged in.</p>
                    <p className="text-lg">Please log in or register to continue.</p>
                    <button className="btn-primary to-blue-950" onClick = {() => navigate("/login")}>Login</button>
                </div>
                
            )}
        </div>
    );
}

export default Home;