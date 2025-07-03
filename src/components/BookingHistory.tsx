import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyParcels } from "../features/parcelSlice";
import type { AppDispatch, RootState } from "../redux/store";

const BookingHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { myParcels, loading } = useSelector(
    (state: RootState) => state.parcel
  );

  useEffect(() => {
    dispatch(getMyParcels());
  }, [dispatch]);
  console.log("parcel infor:", myParcels);
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Booking History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="divide-y">
          {myParcels.map((parcel) => (
            <li key={parcel._id} className="py-2">
              <p>
                <strong>Status:</strong> {parcel.status}
              </p>
              <p>
                <strong>Delivery:</strong> {parcel.deliveryAddress}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(parcel.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
