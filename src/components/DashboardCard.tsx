import React from "react";

interface DashboardCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  bgColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  bgColor,
}) => {
  return (
    <div className={`flex items-center p-4 rounded shadow bg-white w-full`}>
      <div className={`p-3 text-white rounded ${bgColor ?? "bg-blue-500"}`}>
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-lg font-bold">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
