import { useAuth } from "../Context/AuthContext";

function Home() {
    const { user } = useAuth();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Home Page</h1>
            {user ? (

                <p className="text-lg">Hello, {user.email || user.phone || "Nobody"}!</p>
            ) : (
                <p className="text-lg">You are not logged in.</p>
            )}
        </div>
    );
}

export default Home;