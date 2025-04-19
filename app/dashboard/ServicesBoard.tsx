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
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { services, status } = useSelector(
    (state: RootState) => state.services
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isModalOpen === false)
      dispatch(fetchServices(role !== "user" ? providerId : undefined));
  }, [dispatch, isModalOpen, providerId, role]);

  const filteredServices = services.filter(
    (service) =>
      service.activityName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter ? service.category === categoryFilter : true)
  );

  const serviceCategories = [
    { id: 1, name: "Physical Activities" },
    { id: 2, name: "Diagnostic services" },
    { id: 3, name: "Mental wellness" },
    { id: 4, name: "Reward partners" },
    { id: 5, name: "Nutrition" },
  ];

  return (
    <div className="p-4 bg-base-100 ">
      <div className="flex flex-col ">
        <div className="flex  justify-center items-center mb-4 gap-1">
          <h2 className="font-semibold text-center underline-offset-8">
            {role === "user" ? "Activities" : "Your Services"}{" "}
          </h2>
          {status !== "loading" && services.length > 0 ? (
            <>
              <span className="badge w-8 h-8 bg-black/50 text-white">
                {services.length}
              </span>
            </>
          ) : (
            ""
          )}
        </div>
        {role === "user" && (
          <p className="text-center text-slate-500 w-4/5 mx-auto">
            Prioritize your health and wellness with exciting fitness activities
            and affordable diagnostic services. From energizing workouts to
            convenient health check-ups, there's something for everyone—book now
            and take the first step towards a healthier you!
          </p>
        )}
      </div>

      {status !== "loading" && services.length > 0 ? (
        <div className="">
          {role !== "user" && (
            <div className="flex justify-end mt-4 mb-4">
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
          <div className="flex flex-col  gap-4 flex-wrap mt-8">
            <div className="flex  gap-2 justify-between items-center">
              {/* Search by name input */}
              <input
                type="text"
                placeholder="Search by name"
                className="input input-bordered mb-4 w-1/2 "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {/* Filter by category select element */}
              <select
                className="select select-bordered mb-4 w-1/2 "
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {serviceCategories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-wrap justify-center gap-4 w-full">
              {filteredServices.length > 0 ? (
                filteredServices.map((entry) => (
                  <ServiceCard
                    key={entry._id}
                    service={entry}
                    onEdit={() => {}}
                  />
                ))
              ) : (
                <div className="my-1 py-10 text-center">No activites found</div>
              )}
            </div>
          </div>
        </div>
      ) : status === "loading" ? (
        <div className="text-sm my-4 py-10 text-center">
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : role !== "user" ? (
        <div className="text-sm my-4 py-10 text-center">
          You have not created any service yet
          <div className="flex justify-center mt-4">
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
