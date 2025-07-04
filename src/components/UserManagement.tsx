/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../features/adminSlice";

const UserManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: RootState) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const agents = users.filter((u: any) => u.role === "agent");
  const customers = users.filter((u: any) => u.role === "customer");

  const renderTable = (data: any[], title: string) => (
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border bg-white shadow-lg">
          <thead>
            <tr className="bg-teal-500 text-white">
              <th className="p-3 border text-center">User ID</th>
              <th className="p-3 border text-center">Name</th>
              <th className="p-3 border text-center">Email</th>
              <th className="p-3 border text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user: any) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 transition-colors"
              >
                <td className="p-3 border text-center">{user._id}</td>
                <td className="p-3 border text-center">{user.name}</td>
                <td className="p-3 border text-center">{user.email}</td>
                <td className="p-3 border text-center capitalize">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {renderTable(users, "All Users")}
      {renderTable(customers, "Customers")}
      {renderTable(agents, "Agents")}
    </div>
  );
};

export default UserManagement;
