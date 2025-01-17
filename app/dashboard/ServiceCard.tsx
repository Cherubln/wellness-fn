import React from "react";
import { Service } from "../store/slices/serviceSlice";
import { FaMapMarkerAlt } from "react-icons/fa";

interface ServiceCardProps {
  service: Service;
  onEdit: () => void;
}

const isLink = (text: string) => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="card shadow-lg border rounded-lg w-full sm:w-96">
      <div className="card-body ">
        <h2 className="card-title text-center capitalize">
          {service.activityName}
        </h2>
        <span className="text-secondary text-sm -my-2">{service.category}</span>
        <p className="my-2 text-neutral ">{service.description}</p>
        <div className="text-sm flex flex-col gap-2 ">
          <div className="flex flex-row gap-2  items-center">
            <div>
              <FaMapMarkerAlt className="inflex w-4 h-4" />
            </div>

            {isLink(service.location) ? (
              <a
                target="_blank"
                href={service.location}
                className="break-words text-blue-500 cursor-pointer hover:underline truncate"
              >
                {service.location}
              </a>
            ) : (
              <p className="">{service.location}</p>
            )}
          </div>
          <div className="flex gap-2">
            <p className="bg-secondary/80 rounded-lg max-w-full p-3 truncate">
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
