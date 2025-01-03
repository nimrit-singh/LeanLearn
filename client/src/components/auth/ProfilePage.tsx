import { useUser } from '@/UserContext';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ProfileIcon: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Clear user data and navigate to login page
    setUser(null);
    navigate('/login');
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  if (!user) {
    return null; // If no user is logged in, render nothing or redirect
  }

  return (
    <div className="flex items-center justify-center relative">
      <div
        className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer"
        onClick={handleDropdownToggle}
      >
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="Profile"
            className="h-8 w-8 rounded-full object-cover"
          />
        ) : (
          <span className="text-white text-lg">
            {user?.displayName?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      {dropdownOpen && (
        <div
          className={`absolute top-10 -right-3 text-center bg-[#101010] rounded-lg text-white shadow-md p-2 w-40 transition-all duration-300 ${
            dropdownOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleDropdownToggle}
        >
          <button
            onClick={handleLogout}
            className="text-sm hover:text-gray-900 transition-colors"
          >
            Logout
          </button>
        </div>
      )}
      <div className="ml-2">
        <p className="text-white text-sm">{user.displayName}</p>
      </div>
    </div>
  );
};

export default ProfileIcon;
