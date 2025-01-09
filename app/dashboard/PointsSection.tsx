import React from "react";

interface BalanceSectionProps {
  value: number;
  role: string;
}

const PointsSection: React.FC<BalanceSectionProps> = ({ value, role }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-100">
      {" "}
      <p className="text-lg font-semibold">
        {" "}
        {role === "service_provider" ? "Total Scans" : "Points"}{" "}
      </p>{" "}
      <p className="text-4xl my-1 text-secondary font-bold">{value}</p>{" "}
    </div>
  );
};

export default PointsSection;
