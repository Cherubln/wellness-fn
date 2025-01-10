// components/CreateTeamModal.tsx
"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
// import { fetchAllUsers } from "@/app/store/slices/usersSlice";
import { createService } from "@/app/store/slices/serviceSlice";
import { RootState } from "@/app/store";

interface CreateServiceModalProps {
  isOpen: boolean;
  onClose: (boole: boolean) => void;
}
const serviceCategories = [
  { id: 1, name: "Physical Activities" },
  { id: 2, name: "Diagnostic services" },
  { id: 3, name: "Mental wellness" },
  { id: 4, name: "Reward partners" },
  { id: 5, name: "Nutrition" },
];

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [availability, setAvailability] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] =
    useState<string>("");

  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.services);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleCreateService = async () => {
    await dispatch(
      createService({
        activityName: serviceName,
        location,
        availability,
        description,
        category: selectedServiceCategory,
        provider: user._id!,
      })
    );
    if (status === "succeeded") onClose(false);
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open ">
          <div className="modal-box relative bg-[var(--background)]">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => onClose(false)}
            >
              <FaTimes />
            </button>
            <h3 className="text-lg font-bold mb-4">Create a Service</h3>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Service Name</span>
              </label>
              <input
                type="text"
                placeholder="Service Name"
                className="input input-bordered"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <input
                type="text"
                placeholder="Description"
                className="input input-bordered"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <input
                type="text"
                placeholder="Availability"
                className="input input-bordered"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="A google map link to your location"
                className="input input-bordered"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">
                    Service Category <span className="text-red-400">*</span>
                  </span>
                </div>
                <select
                  id="groupmembers"
                  name="groupmembers"
                  // className="border-2 rounded-xl p-2 py-3 w-full text-black mt-2
                  className="select select-bordered"
                  onChange={(e) => setSelectedServiceCategory(e.target.value)}
                  defaultValue={""}
                >
                  <option value="" disabled>
                    choose a service
                  </option>
                  {serviceCategories.map((serviceCategory) => (
                    <option
                      key={serviceCategory.id}
                      value={serviceCategory.name}
                      className="text-black"
                    >
                      {serviceCategory.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <p className="text-red-500 text-center">{error}</p>
            <div className="modal-action">
              <button
                className={`btn btn-sm hover:bg-secondary disabled:bg-neutral/40 disabled:text-neutral bg-secondary/50 border-none`}
                onClick={handleCreateService}
                disabled={
                  !selectedServiceCategory ||
                  !serviceName ||
                  !location ||
                  !availability ||
                  status === "loading"
                }
              >
                {status === "loading" ? "Creating" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateServiceModal;
