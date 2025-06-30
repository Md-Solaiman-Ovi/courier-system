import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React from "react";

interface ParcelMapProps {
  coords: { lat: number; lng: number };
}

const containerStyle = {
  width: "100%",
  height: "300px",
};

const ParcelMap: React.FC<ParcelMapProps> = ({ coords }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={coords} zoom={13}>
      <Marker position={coords} />
    </GoogleMap>
  );
};

export default ParcelMap;
