/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAssignedParcels,
  updateParcelStatus,
} from "../features/agent/agentSlice";
import type { AppDispatch, RootState } from "../redux/store";
import CustomerNavbar from "../components/CustomerNavbar";

const statusOptions = ["Picked Up", "In Transit", "Delivered", "Failed"];

const AgentDashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { parcels } = useSelector((state: RootState) => state.agent);

  useEffect(() => {
    dispatch(fetchAssignedParcels());
  }, [dispatch]);

  const handleStatusChange = (parcelId: string, status: string) => {
    dispatch(updateParcelStatus({ parcelId, status }));
  };

  return (
    <div>
      <div className="bg-white shadow-md sticky top-0">
        <CustomerNavbar />
      </div>

      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Assigned Deliveries</h1>
        {parcels.length === 0 ? (
          <p>No parcels assigned yet.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Delivery Address</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Update Status</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel: any) => (
                <tr key={parcel._id}>
                  <td className="p-2 border">{parcel.deliveryAddress}</td>
                  <td className="p-2 border">{parcel.status}</td>
                  <td className="p-2 border">
                    <select
                      defaultValue={parcel.status}
                      onChange={(e) =>
                        handleStatusChange(parcel._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AgentDashboard;
