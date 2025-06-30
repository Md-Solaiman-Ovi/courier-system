import ParcelBookingForm from "../components/parcel/ParcelBookingForm";
import BookingHistory from "../components/parcel/BookingHistory";
import LiveTracking from "../components/parcel/LiveTracking";
import CustomerNavbar from "../components/CustomerNavbar";

const CustomerDashboard = () => {
  const parcelId = "replace-with-latest-active-parcel-id"; // Logic will be dynamic

  return (
    <div>
      <div className="bg-white shadow-md sticky top-0">
        <CustomerNavbar />
      </div>

      <div className="container mx-auto p-6 space-y-6">
        <ParcelBookingForm />
        <BookingHistory />
        <LiveTracking parcelId={parcelId} />
      </div>
    </div>
  );
};

export default CustomerDashboard;
