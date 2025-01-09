import React from "react";
import { FaEdit, FaEllipsisV } from "react-icons/fa";

interface ServiceCardProps {
  serviceName: string;
  onEdit: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ serviceName, onEdit }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-400 rounded-lg shadow-md mx-4 my-2 text-black">
      <div className="flex items-center">
        <FaEdit className="text-xl text-secondary mr-2" />
        <p className="text-lg font-semibold">{serviceName}</p>
      </div>
      <FaEllipsisV
        className="text-xl text-secondary cursor-pointer"
        onClick={onEdit}
      />
    </div>
  );
};

export default ServiceCard;
