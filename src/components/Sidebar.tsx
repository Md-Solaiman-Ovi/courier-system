import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUserShield, FaUsers, FaFileExport } from "react-icons/fa";

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  return (
    <aside
      className={`h-screen bg-white p-4 shadow-md fixed top-0 left-0 z-20 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
      style={
        {
          "--sidebar-width": isCollapsed ? "5rem" : "16rem",
        } as React.CSSProperties
      }
    >
      <div className="mb-1">
        {!isCollapsed && (
          <>
            <h1 className="text-2xl font-bold text-teal-700">ParcelPro</h1>
            <div className="mt-4 bg-green-600 text-white p-3 rounded">
              <p className="text-sm">a****@gmail.com</p>
              <p className="text-xs">super-admin</p>
            </div>
          </>
        )}
      </div>
      {!isCollapsed && (
        <input
          type="text"
          placeholder="Search Here"
          className="w-full p-2 mb-4 rounded border"
        />
      )}
      <nav className="space-y-4 text-sm">
        <NavLink
          to="/admin"
          className={`text-teal-700 hover:text-black flex items-center gap-2 hover:bg-teal-100 p-2 rounded  ${
            isCollapsed ? "text-3xl text-center justify-center" : " text-base "
          }`}
        >
          <FaHome /> {!isCollapsed && "Dashboard"}
        </NavLink>

        <NavLink
          to="/assign-agent"
          className={`text-slate-500  hover:text-black flex items-center gap-2 hover:bg-teal-100 p-2 rounded  ${
            isCollapsed ? "text-3xl text-center justify-center" : " text-base "
          }`}
        >
          <FaUserShield /> {!isCollapsed && "Assign Agents"}
        </NavLink>
        <NavLink
          to="/users-bookings"
          className={`text-slate-500  hover:text-black flex items-center gap-2 hover:bg-teal-100 p-2 rounded  ${
            isCollapsed ? "text-3xl text-center justify-center" : " text-base "
          }`}
        >
          <FaUsers /> {!isCollapsed && "Users & Bookings"}
        </NavLink>
        <NavLink
          to="/reports"
          className={`text-slate-500  hover:text-black flex items-center gap-2 hover:bg-teal-100 p-2 rounded  ${
            isCollapsed ? "text-3xl text-center justify-center" : " text-base "
          }`}
        >
          <FaFileExport /> {!isCollapsed && "Export Reports"}
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
