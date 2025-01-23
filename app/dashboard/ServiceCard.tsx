// components/ServiceCard.tsx
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Service, deleteService } from "../store/slices/serviceSlice";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

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
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.services);
  const { user } = useSelector((state: RootState) => state.auth);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await dispatch(deleteService(service._id));
    setIsDeleting(false);
  };

  return (
    <div className="card bg-base-100 w-full sm:w-96 shadow-xl">
      <figure className="w-full h-48 overflow-hidden relative">
        <div className="carousel w-full">
          {service.images.length > 0 ? (
            service.images.map((image, index) => (
              <div
                key={image}
                id={`slide${service._id + index}`}
                className="carousel-item relative w-full"
              >
                <img
                  src={image}
                  alt="Shoes"
                  className="object-contain w-full h-full"
                />
                <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
                  <a
                    href={`#slide${
                      index > 0
                        ? service._id +
                          (((index % service.images.length) - 1) %
                            service.images.length)
                        : service._id + (service.images.length - 1)
                    }`}
                    className="btn btn-circle hover:bg-[var(--background)] border-none bg-black/60 text-white hover:text-black"
                  >
                    ❮
                  </a>
                  <a
                    href={`#slide${
                      service._id +
                      (((index % service.images.length) + 1) %
                        service.images.length)
                    }`}
                    className="btn btn-circle hover:bg-[var(--background)] border-none bg-black/60 text-white hover:text-black"
                  >
                    ❯
                  </a>
                </div>
              </div>
            ))
          ) : (
            <img
              src="https://th.bing.com/th/id/R.6df44db06f58f2fd89d70daec16e84cb?rik=AHx4gXK%2bke9fgg&riu=http%3a%2f%2fbarcelona-home.com%2fblog%2fwp-content%2fupload%2f2013%2f09%2fgyms-in-barcelona.jpg&ehk=GLe0juvDrln%2fyyK2q7OJplOKBb4mQokRtqFKV9ZqauA%3d&risl=1&pid=ImgRaw&r=0"
              alt="service"
              className="object-contain w-full h-full"
            />
          )}
        </div>
      </figure>
      <div className="card-body">
        <h2 className="card-title capitalize">
          {service.activityName}
          {/* <div className="badge badge-secondary">NEW</div> */}
        </h2>
        <div className="badge badge-outline">
          <span className="text-secondary text-sm -my-2">
            {service.category}
          </span>
        </div>
        <p className="my-2 text-neutral ">
          <span className="line-clamp-3" title={service.description}>
            {service.description}
          </span>
        </p>
        <div className="text-sm flex flex-col gap-2 ">
          <div className="flex flex-row gap-2 items-center">
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
            <p className="bg-secondary/80 rounded-lg max-w-fit p-3 truncate capitalize">
              {service.availability}
            </p>
          </div>
        </div>
        <div className="card-actions justify-end">
          {user.role === "service_provider" && (
            <button
              className={`btn bg-red-500 border-none text-white hover:bg-red-700 btn-sm ${
                isDeleting ? "loading" : ""
              }`}
              onClick={handleDelete}
              disabled={isDeleting || status === "loading"}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
