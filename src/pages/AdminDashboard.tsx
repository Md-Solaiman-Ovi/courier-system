// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllParcels,
//   fetchAllUsers,
//   fetchDashboardMetrics,
//   assignAgent,
// } from "../features/admin/adminSlice";
// import type { AppDispatch, RootState } from "../redux/store";
// import CustomerNavbar from "../components/CustomerNavbar";

// const AdminDashboard: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { parcels, users, metrics } = useSelector(
//     (state: RootState) => state.admin
//   );

//   useEffect(() => {
//     dispatch(fetchAllParcels());
//     dispatch(fetchAllUsers());
//     dispatch(fetchDashboardMetrics());
//   }, [dispatch]);

//   const handleAssign = (parcelId: string, agentId: string) => {
//     dispatch(assignAgent({ parcelId, agentId }));
//   };

//   const agents = users.filter((u: any) => u.role === "agent");

//   return (
//     <div className=" bg-gradient-to-br from-teal-200 to-teal-900 h-screen">
//       <div className="bg-teal-100 shadow-md sticky top-0">
//         <CustomerNavbar />
//       </div>

//       <div className="container mx-auto p-6 space-y-6">
//         <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

//         {/* Metrics */}
//         {metrics && (
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div className="bg-blue-100 p-4 rounded">
//               {/* 📦 Total Bookings: {metrics.totalParcels} */}
//               📦 Total Bookings: {metrics}
//             </div>
//             <div className="bg-green-100 p-4 rounded">
//               {/* 💵 COD Total: ৳ {metrics.codAmount} */}
//               💵 COD Total: ৳ {metrics}
//             </div>
//             <div className="bg-red-100 p-4 rounded">
//               {/* ❌ Failed: {metrics.failedDeliveries} */}❌ Failed: {metrics}
//             </div>
//           </div>
//         )}

//         {/* Parcel Management */}
//         <h2 className="text-xl font-semibold mb-2">Manage Parcels</h2>
//         <table className="w-full border mb-6">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-2 border">Parcel</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border">Customer</th>
//               <th className="p-2 border">Assign Agent</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parcels.map((parcel: any) => (
//               <tr key={parcel._id}>
//                 <td className="p-2 border">{parcel.deliveryAddress}</td>
//                 <td className="p-2 border">{parcel.status}</td>
//                 <td className="p-2 border">{parcel.customer?.email}</td>
//                 <td className="p-2 border">
//                   <select
//                     onChange={(e) => handleAssign(parcel._id, e.target.value)}
//                     defaultValue={parcel.assignedTo?._id || ""}
//                     className="border rounded px-2 py-1"
//                   >
//                     <option value="">Select agent</option>
//                     {agents.map((a: any) => (
//                       <option key={a._id} value={a._id}>
//                         {a.name}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Users */}
//         <h2 className="text-xl font-semibold mb-2">All Users</h2>
//         <ul className="list-disc pl-5">
//           {users.map((u: any) => (
//             <li key={u._id}>
//               {u.name} - {u.email} ({u.role})
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";

const AdminDashboard: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  return (
    <div className="flex">
      <div>
        <Sidebar isCollapsed={isCollapsed} />
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Navbar toggleSidebar={toggleSidebar} />
        <Dashboard />
      </div>
    </div>
  );
};

export default AdminDashboard;
