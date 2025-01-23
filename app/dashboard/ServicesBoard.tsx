import ServiceCard from "./ServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import CreateServiceModal from "./CreateServiceModel";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchServices } from "../store/slices/serviceSlice";

const ServicesBoard = ({
  role,
  providerId,
}: {
  providerId: string;
  role: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { services, status } = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isModalOpen === false)
      dispatch(fetchServices(role !== "user" ? providerId : undefined));
  }, [dispatch, isModalOpen, providerId, role]);

  return (
    <div className="p-4 bg-base-100 ">
      <div className="flex justify-center items-center mb-4 gap-1">
        <h2 className="font-semibold text-center underline underline-offset-8">
          {role === "user" ? "Activities" : "Your Services"}{" "}
        </h2>
        {status !== "loading" && services.length > 0 ? (
          <span className="badge bg-black/50 text-white">
            {services.length}
          </span>
        ) : (
          ""
        )}
      </div>

      {status !== "loading" && services.length > 0 ? (
        <div className="">
          {role !== "user" && (
            <div className="flex justify-end mt-8 mb-4">
              <button
                className="btn bg-secondary/80 hover:bg-secondary text-white btn-sm border-none"
                onClick={() => setIsModalOpen(true)}
              >
                <FaPlus className="" />
                Add Service
              </button>
              <CreateServiceModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
              />
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-4 flex-wrap mt-8">
            {services.map((entry) => (
              <ServiceCard key={entry._id} service={entry} onEdit={() => {}} />
            ))}
          </div>
        </div>
      ) : status === "loading" ? (
        <div className="text-sm my-4 py-10 text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : role !== "user" ? (
        <div className="text-sm my-4 py-10 text-center">
          You have not created any service yet
          <div className="flex justify-center mt-8">
            <button
              className="btn bg-secondary/80 hover:bg-secondary text-white btn-sm border-none"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="" />
              Add service
            </button>
          </div>
        </div>
      ) : (
        <div className="text-sm my-4 py-10 text-center">
          No Services available yet
        </div>
      )}
      <CreateServiceModal isOpen={isModalOpen} onClose={setIsModalOpen} />
    </div>
  );
};

export default ServicesBoard;
