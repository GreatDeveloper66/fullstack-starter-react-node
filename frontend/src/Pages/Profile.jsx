// const Profile = () => {
//   return (
//     <div>
//         <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
//         <p>This is the profile page. User details will be displayed here.</p>
//     </div>
//     );
// };

// export default Profile;

// import { useEffect, useState } from "react";

// export default function Profile() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     getUserProfile().then(data => setUser(data.user));
//   }, []);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div>
//       <h1>Profile</h1>
//       <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Phone:</strong> {user.phone}</p>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext.jsx";

const Profile = () => {
  const { user, getUserProfile } = useAuth();
  const [localUser, setLocalUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!user) {
      getUserProfile().then((data) => setLocalUser(data.user)).catch((err) => setError(err));
    } else {
      setLocalUser(user);
    }
  }, [user, getUserProfile]);

  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (!localUser) return <p>Loading...</p>;
  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <p className="mb-2"><strong>Name:</strong> {localUser.firstName} {localUser.lastName}</p>
      <p className="mb-2"><strong>Email:</strong> {localUser.email}</p>
      <p className="mb-2"><strong>Phone:</strong> {localUser.phoneNumber || "N/A"}</p>
    </div>
  );
};

export default Profile;
