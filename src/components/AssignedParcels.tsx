/* eslint-disable @typescript-eslint/no-explicit-any */
// components/AssignedParcels.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { fetchParcelsByAgent } from "../features/agentSlice"; // or userSlice if you're managing roles there

const AssignedParcels: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { assignedParcels } = useSelector((state: RootState) => state.agent); // assuming state.agent.assignedParcels

  useEffect(() => {
    dispatch(fetchParcelsByAgent());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Assigned Parcels</h2>

      <table className="w-full border bg-white shadow">
        <thead>
          <tr className="bg-sky-200">
            <th className="p-2 border">From</th>
            <th className="p-2 border">To</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Customer</th>
          </tr>
        </thead>
        <tbody>
          {assignedParcels.map((parcel: any) => (
            <tr key={parcel._id}>
              <td className="p-2 border">{parcel.pickupAddress}</td>
              <td className="p-2 border">{parcel.deliveryAddress}</td>
              <td className="p-2 border text-center">{parcel.status}</td>
              <td className="p-2 border">{parcel.customer?.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignedParcels;
