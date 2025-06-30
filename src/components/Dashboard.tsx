import React from "react";
import DashboardCard from "../components/DashboardCard";

import { FaUsers, FaCar, FaDollarSign, FaBox } from "react-icons/fa";

const Dashboard: React.FC = () => {
  return (
    <div className=" pt-20 p-6 bg-teal-50 h-screen">
      <h2 className="text-xl font-bold mb-4">Welcome Super</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <DashboardCard
          title="Total Active Customers"
          value="12"
          icon={<FaUsers />}
          bgColor="bg-blue-500"
        />
        <DashboardCard
          title="Total Active Delivery Agents"
          value="7"
          icon={<FaCar />}
          bgColor="bg-green-600"
        />
        <DashboardCard
          title="Total Earnings"
          value="$3.87K"
          icon={<FaDollarSign />}
          bgColor="bg-orange-400"
        />
        <DashboardCard
          title="Total Trip 24"
          value="$862.43 Earn "
          icon={<FaCar />}
          bgColor="bg-green-500"
        />
        <DashboardCard
          title="Total Parcel 22"
          value="$3.01K Earn  "
          icon={<FaBox />}
          bgColor="bg-purple-500"
        />
      </div>
    </div>
  );
};

export default Dashboard;
