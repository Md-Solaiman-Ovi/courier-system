// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Navbar from "../components/Navbar";
// import Dashboard from "../components/Dashboard";

// const AdminDashboard: React.FC = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [selectedView, setSelectedView] = useState("overview");
//   const toggleSidebar = () => setIsCollapsed(!isCollapsed);
//   return (
//     <div className="flex">
//       <div>
//         <Sidebar isCollapsed={isCollapsed}  onSelectView={setSelectedView}  />
//       </div>

//       <div
//         className={`flex-1 transition-all duration-300 ${
//           isCollapsed ? "ml-20" : "ml-64"
//         }`}
//       >
//         <Navbar toggleSidebar={toggleSidebar} />
//         <Dashboard  selectedView={selectedView} />
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard"; // this will handle dynamic views
import UserManagement from "../components/UserManagement";
import AgentManagement from "../components/AgentManagement";
import ExportReports from "../components/ExportReports";

const AdminDashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedView, setSelectedView] = useState("dashboard");

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const renderView = () => {
    switch (selectedView) {
      case "dashboard":
        return <Dashboard />;
      case "assignAgents":
        return <AgentManagement />;
      case "usersBookings":
        return <UserManagement />;
      case "reports":
        return <ExportReports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex ">
      <Sidebar
        isCollapsed={isCollapsed}
        onSelectView={(view) => setSelectedView(view)}
        selectedView={selectedView}
      />

      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="bg-teal-50 h-screen">{renderView()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
