// components/CreateServiceModal.tsx
"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
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
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] =
    useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.services);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files!);
    const validFiles: File[] = [];
    let invalidFile = false;

    files.forEach((file) => {
      if (errorMessage) {
        setImageFiles([]);
        setErrorMessage(null);
      }
      if (file.size <= 2 * 1024 * 1024) {
        validFiles.push(file);
      } else {
        invalidFile = true;
      }
    });

    if (invalidFile) {
      setErrorMessage(
        "Some files exceeded the 2MB size limit and were not added."
      );
    } else {
      setErrorMessage(null);
    }

    if (validFiles.length + imageFiles.length <= 3) {
      setImageFiles([...imageFiles, ...validFiles]);
    } else {
      alert("You can only upload up to 3 images.");
    }
  };

  const handleCreateService = async () => {
    const readerPromises = imageFiles.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            resolve(reader.result as string);
          } else {
            reject("Failed to read file.");
          }
        };
        reader.readAsDataURL(file);
      });
    });

    try {
      const base64Images = await Promise.all(readerPromises);
      await dispatch(
        createService({
          activityName: serviceName,
          location: location.trim().split(",").filter(Boolean),
          availability,
          description,
          category: selectedServiceCategory,
          provider: user._id!,
          images: base64Images,
          price,
        })
      );
      if (status === "succeeded") {
        resetFields();
        onClose(false);
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const resetFields = () => {
    setServiceName("");
    setAvailability("");
    setLocation("");
    setDescription("");
    setSelectedServiceCategory("");
    setImageFiles([]);
    setErrorMessage(null);
    setPrice(undefined);
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative bg-[var(--background)]">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => {
                // reset all fields here before closing the modal
                resetFields();
                 onClose(false);
              }}
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
                required
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
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Price(KES)</span>
              </label>
              <input
                type="number"
                placeholder="Price in KES"
                className="input input-bordered"
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="A Google Map link to your location"
                className="input input-bordered"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Upload Images (Max 2MB each)</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/*"
                multiple
                onChange={handleFileChange}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
            </div>
            <div className="w-full">
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text">
                    Service Category <span className="text-red-400">*</span>
                  </span>
                </div>
                <select
                  id="groupmembers"
                  name="groupmembers"
                  className="select select-bordered"
                  onChange={(e) => setSelectedServiceCategory(e.target.value)}
                  defaultValue={""}
                  required
                >
                  <option value="" disabled>
                    Choose a service
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
                  status === "loading" ||
                  imageFiles.length === 0 ||
                  !!errorMessage
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
