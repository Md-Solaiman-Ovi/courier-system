// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAllParcels,
//   fetchAllUsers,
//   fetchDashboardMetrics,
//   assignAgent,
// } from "../features/adminSlice";
// import type { AppDispatch, RootState } from "../redux/store";

// const AgentManagement: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { parcels, users } = useSelector((state: RootState) => state.admin);

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
//     <div className="  h-screen">
//       <div className="container mx-auto p-6 space-y-6">
//         <h1 className="text-2xl font-bold mb-6">Assign Agents</h1>

//         <table className="w-full border mb-6 bg-white shadow-lg ">
//           <thead>
//             <tr className="bg-teal-200">
//               <th className="p-2 border">Parcel From</th>
//               <th className="p-2 border">Parcel To</th>
//               <th className="p-2 border">Status</th>
//               <th className="p-2 border">Customer</th>
//               <th className="p-2 border">Assign Agent</th>
//             </tr>
//           </thead>
//           <tbody>
//             {parcels.map((parcel: any) => (
//               <tr key={parcel._id}>
//                 <td className="p-2 border">{parcel.pickupAddress}</td>
//                 <td className="p-2 border">{parcel.deliveryAddress}</td>
//                 <td className="p-2 border text-center">{parcel.status}</td>
//                 <td className="p-2 border">{parcel.customer?.email}</td>
//                 <td className="p-2 border text-center">
//                   <select
//                     onChange={(e) => handleAssign(parcel._id, e.target.value)}
//                     defaultValue={parcel.assignedTo?._id || ""}
//                     className="border cursor-pointer rounded px-2 py-1"
//                   >
//                     <option value="" disabled>
//                       Select agent
//                     </option>
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
//       </div>
//     </div>
//   );
// };

// export default AgentManagement;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllParcels, assignAgent } from "../features/adminSlice";
import type { AppDispatch, RootState } from "../redux/store";

const AgentManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { parcels, users } = useSelector((state: RootState) => state.admin);

  // Track which parcel is being edited
  const [editingParcelId, setEditingParcelId] = useState<string | null>(null);
  // Track selected agent for currently edited parcel
  const [selectedAgent, setSelectedAgent] = useState<{
    [parcelId: string]: string;
  }>({});

  useEffect(() => {
    dispatch(fetchAllParcels());
  }, [dispatch]);

  const handleEditClick = (parcelId: string, currentAgentId: string) => {
    setEditingParcelId(parcelId);
    setSelectedAgent((prev) => ({ ...prev, [parcelId]: currentAgentId || "" }));
  };

  const handleSaveClick = (parcelId: string) => {
    const agentId = selectedAgent[parcelId];
    if (agentId) {
      dispatch(assignAgent({ parcelId, agentId }));
    }
    setEditingParcelId(null); // Exit edit mode
  };

  const agents = users.filter((u: any) => u.role === "agent");

  return (
    <div className="h-screen">
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Assign Agents</h1>

        <table className="w-full border mb-6 bg-white shadow-lg">
          <thead>
            <tr className="bg-teal-200">
              <th className="p-2 border">Parcel From</th>
              <th className="p-2 border">Parcel To</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Assigned Agent</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel: any) => {
              const isEditing = editingParcelId === parcel._id;
              const currentSelected =
                selectedAgent[parcel._id] ?? parcel.assignedTo?._id ?? "";

              return (
                <tr key={parcel._id}>
                  <td className="p-2 border">{parcel.pickupAddress}</td>
                  <td className="p-2 border">{parcel.deliveryAddress}</td>
                  <td className="p-2 border text-center">{parcel.status}</td>
                  <td className="p-2 border">{parcel.customer?.email}</td>
                  <td className="p-2 border text-center">
                    <select
                      disabled={!isEditing}
                      value={currentSelected}
                      onChange={(e) =>
                        setSelectedAgent((prev) => ({
                          ...prev,
                          [parcel._id]: e.target.value,
                        }))
                      }
                      className={`border rounded px-2 py-1 ${
                        !isEditing
                          ? "bg-gray-100 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      <option value="" disabled>
                        Select agent
                      </option>
                      {agents.map((a: any) => (
                        <option key={a._id} value={a._id}>
                          {a.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 border text-center">
                    {!isEditing ? (
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() =>
                          handleEditClick(
                            parcel._id,
                            parcel.assignedTo?._id || ""
                          )
                        }
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        onClick={() => handleSaveClick(parcel._id)}
                      >
                        Save
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentManagement;
