import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Define the structure of the user object
interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

const Profile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Access user data from state, typing it as User | undefined
  const user = location.state?.user as User | undefined;

  if (!user) {
    return <div>User data not found</div>; // Handle case when user is not passed
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src={user.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-3xl font-semibold text-gray-800">{user.displayName || "User"}</h1>
          <p className="text-gray-600 mb-6">{user.email || "Email not available"}</p>
        </div>

        <div className="flex justify-center mt-8">
          <button
            className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            onClick={
                () => {
                    navigate("/select-mentor")
                }
            }
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
