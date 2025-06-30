import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const CustomerNavbar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="container mx-auto px-4 py-3 flex justify-between items-center ">
      {/* Brand */}
      <Link to="/customer" className="text-2xl font-bold text-teal-600">
        ParcelPro
      </Link>

      {/* Nav links */}
      <div className="hidden md:flex gap-6">
        <Link
          to="/customer/parcels"
          className="text-gray-700 hover:text-teal-600 font-medium"
        >
          My Parcels
        </Link>
        <Link
          to="/customer/track"
          className="text-gray-700 hover:text-teal-600 font-medium"
        >
          Track
        </Link>
        <Link
          to="/customer/profile"
          className="text-gray-700 hover:text-teal-600 font-medium"
        >
          Profile
        </Link>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
      >
        Logout
      </button>
    </nav>
  );
};

export default CustomerNavbar;
