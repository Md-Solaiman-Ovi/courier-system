import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AdminDashboard from "../pages/AdminDashboard";
import CustomerDashboard from "../pages/CustomerDashboard";
import AgentDashboard from "../pages/AgentDashboard";
import ProtectedRoute from "./ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserAndBookings from "../pages/UserAndBookings";

const AppRouter = () => {
  return (
    <>
      <Router>
        <ToastContainer theme="light" position="top-center" autoClose={3000} />
        <Routes>
          {/* Public */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected - Admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/users-bookings" element={<UserAndBookings />} />
          </Route>

          {/* Protected - Customer */}
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route path="/customer" element={<CustomerDashboard />} />
          </Route>

          {/* Protected - Agent */}
          <Route element={<ProtectedRoute allowedRoles={["agent"]} />}>
            <Route path="/agent" element={<AgentDashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
