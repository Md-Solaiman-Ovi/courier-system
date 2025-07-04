import React from "react";
import { FaHome, FaUserShield, FaUsers, FaFileExport } from "react-icons/fa";

interface SidebarProps {
  isCollapsed: boolean;
  onSelectView: (view: string) => void;
  selectedView: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onSelectView,
  selectedView,
}) => {
  const buttonClass = (view: string) =>
    `w-full text-left flex items-center gap-2 p-2 rounded transition ${
      selectedView === view
        ? "bg-teal-600 text-white"
        : "text-slate-600 hover:bg-teal-100 hover:text-black"
    } ${isCollapsed ? "text-3xl justify-center" : "text-base"}`;

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
            <div className="mt-4 bg-teal-600 text-white p-3 rounded">
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
        <button
          onClick={() => onSelectView("dashboard")}
          className={buttonClass("dashboard")}
        >
          <FaHome /> {!isCollapsed && "Dashboard"}
        </button>
        <button
          onClick={() => onSelectView("assignAgents")}
          className={buttonClass("assignAgents")}
        >
          <FaUserShield /> {!isCollapsed && "Assign Agents"}
        </button>
        <button
          onClick={() => onSelectView("usersBookings")}
          className={buttonClass("usersBookings")}
        >
          <FaUsers /> {!isCollapsed && "Users & Bookings"}
        </button>
        <button
          onClick={() => onSelectView("reports")}
          className={buttonClass("reports")}
        >
          <FaFileExport /> {!isCollapsed && "Export Reports"}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
