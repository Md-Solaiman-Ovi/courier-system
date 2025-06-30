import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { type RootState } from "../redux/store";

interface ProtectedRouteProps {
  allowedRoles: ("admin" | "customer" | "agent")[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
  redirectTo = "/login",
}) => {
  const user = useSelector((state: RootState) => state.auth.user);
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

// components/ProtectedRoute.tsx
// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import type { RootState } from "../redux/store";

// interface Props {
//   allowedRoles: string[];
// }

// const ProtectedRoute = ({ allowedRoles }: Props) => {
//   const { user } = useSelector((state: RootState) => state.auth);

//   if (!user) return <Navigate to="/login" replace />;

//   return allowedRoles.includes(user.role) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default ProtectedRoute;
