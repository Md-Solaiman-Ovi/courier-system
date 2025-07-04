import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getParcelsByUser } from "../features/parcelSlice"; // your async thunk
import type { AppDispatch, RootState } from "../redux/store";

const BookingHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myParcels, loading, error } = useSelector(
    (state: RootState) => state.parcel
  );

  useEffect(() => {
    dispatch(getParcelsByUser());
    // .unwrap()
    // .then((data) => console.log("Fetched parcels:", data))
    // .catch((err) => console.error("Failed to fetch parcels:", err));
  }, [dispatch]);
  // console.log("Booking parcel list:", myParcels);

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Booking History</h2>

      {loading && <p>Loading parcels...</p>}

      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && myParcels.length === 0 && (
        <p>No bookings found for the logged-in user.</p>
      )}

      {!loading && !error && myParcels.length > 0 && (
        <ul className="divide-y">
          {myParcels.map((parcel) => (
            <li key={parcel._id} className="py-2">
              <p>
                <strong>Status:</strong> {parcel.status}
              </p>
              <p>
                <strong>Pickup Address:</strong> {parcel.pickupAddress}
              </p>
              <p>
                <strong>Delivery Address:</strong> {parcel.deliveryAddress}
              </p>
              <p>
                <strong>Parcel Type:</strong> {parcel.parcelType}
              </p>
              <p className="text-sm text-gray-500">
                Booked on: {new Date(parcel.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
