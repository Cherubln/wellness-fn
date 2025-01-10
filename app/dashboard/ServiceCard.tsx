import React from "react";
import { Service } from "../store/slices/serviceSlice";
import { FaMapMarkerAlt } from "react-icons/fa";

interface ServiceCardProps {
  service: Service;
  onEdit: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="card shadow-lg border rounded-lg w-full ">
      <div className="card-body">
        <h2 className="card-title text-center capitalize">
          {service.activityName}
        </h2>
        <span className="text-secondary text-sm -my-2">{service.category}</span>
        <p className="my-2 text-neutral ">{service.description}</p>
        <div className="text-sm flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt />
            <p className="">{service.location}</p>
          </div>
          <div className="flex gap-2">
            <p className="bg-secondary/80 rounded-lg max-w-max p-3">
              {service.availability}
            </p>
          </div>
        </div>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={onEdit}>
            Edit
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ServiceCard;
