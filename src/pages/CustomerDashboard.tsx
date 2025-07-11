import ParcelBookingForm from "../components/ParcelBookingForm";
import BookingHistory from "../components/BookingHistory";
// import LiveTracking from "../components/LiveTracking";
import CustomerNavbar from "../components/CustomerNavbar";

const CustomerDashboard = () => {
  // const parcelId = "replace-with-latest-active-parcel-id"; // Logic will be dynamic

  return (
    <div className="bg-teal-50">
      <div className="bg-white shadow-md sticky top-0">
        <CustomerNavbar />
      </div>

      <div className="container mx-auto p-6 space-y-6">
        <ParcelBookingForm />
        <BookingHistory />
        {/* <LiveTracking parcelId={parcelId} /> */}
      </div>
    </div>
  );
};

export default CustomerDashboard;
