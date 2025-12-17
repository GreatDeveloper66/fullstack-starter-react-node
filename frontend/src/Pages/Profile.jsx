import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";

const Profile = () => {
  const { user, getUserProfile, logout } = useAuth();
  const [localUser, setLocalUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      getUserProfile().then((data) => setLocalUser(data.user)).catch((err) => setError(err));
    } else {
      setLocalUser(user);
    }
  }, [user, getUserProfile]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!localUser) return <p>Loading...</p>;
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p className="mb-2"><strong>Name:</strong> {localUser.firstName} {localUser.lastName}</p>
      <p className="mb-2"><strong>Email:</strong> {localUser.email}</p>
      <p className="mb-2"><strong>Phone:</strong> {localUser.phoneNumber || "N/A"}</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleLogout()}>Logout</button>
    </div>
  );
};

export default Profile;
