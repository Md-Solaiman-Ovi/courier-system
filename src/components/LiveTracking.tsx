/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ParcelMap from "./ParcelMap";

const socket = io(
  import.meta.env.VITE_API_BASE_URL ||
    "https://courier-system-backend.vercel.app"
);

const LiveTracking: React.FC<{ parcelId: string }> = ({ parcelId }) => {
  const [coords, setCoords] = useState({ lat: 23.7806, lng: 90.4074 }); // default: Dhaka

  useEffect(() => {
    socket.on("parcel-status-update", (data: any) => {
      if (data._id === parcelId && data.location?.lat && data.location?.lng) {
        setCoords({ lat: data.location.lat, lng: data.location.lng });
      }
    });

    return () => {
      socket.off("parcel-status-update");
    };
  }, [parcelId]);

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-2">Live Parcel Location</h3>
      <ParcelMap coords={coords} />
    </div>
  );
};

export default LiveTracking;
