import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaEnvelope, FaUserCircle, FaBars } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-16 bg-white shadow flex justify-between items-center px-6 sticky left-0 right-0 top-0 z-10 ml-[var(--sidebar-width)] transition-all duration-300">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 focus:outline-none"
        >
          <FaBars />
        </button>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="relative flex items-center space-x-4">
        <FaEnvelope className="text-gray-600 text-xl" />
        <FaBell className="text-gray-600 text-xl" />
        <div className="relative mt-1" ref={dropdownRef}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <FaUserCircle className="text-gray-600 text-xl" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-20">
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                onClick={() => alert("Navigate to Profile")}
              >
                Profile
              </button>
              <button
                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
