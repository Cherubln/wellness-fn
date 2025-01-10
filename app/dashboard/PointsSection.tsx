import React from "react";

interface BalanceSectionProps {
  user: {
    points?: number;
  };
}

const PointsSection: React.FC<BalanceSectionProps> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-100">
      <p className="text-lg font-semibold">Points</p>
      <p className="text-4xl my-1 text-secondary font-bold">{user.points}</p>
    </div>
  );
};

export default PointsSection;
