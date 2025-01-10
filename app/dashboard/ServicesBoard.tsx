import ServiceCard from "./ServiceCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import CreateServiceModal from "./CreateServiceModel";
import { FaPlus } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchServices } from "../store/slices/serviceSlice";

const ServicesBoard = ({ providerId }: { providerId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { services, status } = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isModalOpen === false) dispatch(fetchServices(providerId));
  }, [dispatch, isModalOpen, providerId]);

  return (
    <div className="p-4 bg-base-100 ">
      <h2 className="text-lg font-semibold mb-4 text-center underline underline-offset-8">
        Your Services
      </h2>

      {services.length > 0 ? (
        <div className="">
          <div className="flex justify-end mt-8 mb-4">
            <button
              className="btn bg-secondary/80 hover:bg-secondary text-white btn-sm border-none"
              onClick={() => setIsModalOpen(true)}
            >
              <FaPlus className="" />
              Add Service
            </button>
            <CreateServiceModal isOpen={isModalOpen} onClose={setIsModalOpen} />
          </div>
          <div className="flex flex-col gap-4">
            {services.map((entry) => (
              <ServiceCard key={entry._id} service={entry} onEdit={() => {}} />
            ))}
          </div>
        </div>
      ) : status === "loading" ? (
        <div className="text-sm my-4 py-10 text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : (
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
            <CreateServiceModal isOpen={isModalOpen} onClose={setIsModalOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesBoard;
