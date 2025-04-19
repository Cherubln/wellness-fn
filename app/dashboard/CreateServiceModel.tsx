// components/CreateServiceModal.tsx
"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import { createService } from "@/app/store/slices/serviceSlice";
import { RootState } from "@/app/store";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { ExtractDateTime } from "../utils/convertDate";
import { Session } from "inspector/promises";

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
export const AllDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const MonToFri = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

const CreateServiceModal: React.FC<CreateServiceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [serviceName, setServiceName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [priceType, setPriceType] = useState("");
  const [description, setDescription] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] =
    useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.services);
  const { user } = useSelector((state: RootState) => state.auth);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const [sessionPeriod, setSessionPeriod] = useState(
    "Fixed Session (Days and time)"
  );
  const [slots, setSlots] = useState<number>(0);
  const [startTime, setStartTime] = useState("");
  const [availability, setAvailability] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sessionDateTime, setSessionDateTime] = useState("");
  const [DaysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("");

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

      const FixedData = {
        sessionTime: `${startTime} - ${endTime}`,
        slots,
        recurring: true,
        recurringPattern: {
          daysOfWeek:
            frequency === "All Days"
              ? AllDays
              : frequency === "Custom Days"
              ? DaysOfWeek
              : MonToFri,
          frequency: "weekly",
        },
      };
      const DynamicData = {
        sessionDate:
          sessionPeriod !== "Fixed Session (Days and time)" &&
          ExtractDateTime(sessionDateTime).date,
        sessionTime:
          sessionPeriod !== "Fixed Session (Days and time)" &&
          `${ExtractDateTime(sessionDateTime).time12}`,
        slots,
        recurring: false,
      };

      const commonData = {
        activityName: serviceName,
        category: selectedServiceCategory,
        description,
        images: base64Images,
        price,
        priceType,
        additionalInfo,
        location: location.trim().split(",").filter(Boolean),
        address,
        provider: user._id!,
        sessionData:
          sessionPeriod === "Fixed Session (Days and time)"
            ? FixedData
            : DynamicData,
      };

      await dispatch(createService(commonData));

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
    setSlots(0);
    setDaysOfWeek([]);
    setAdditionalInfo("");
    setSessionDateTime("");
    setSessionPeriod("Fixed Session (Days and time)");
    setStartTime("");
    setEndTime("");
    setFrequency("");
    setPriceType("");
    setAddress("");
  };

  useEffect(() => {
    if (availability) {
      setDaysOfWeek((prevDays) => [...prevDays, availability]);
    }
  }, [availability]);

  const handleDeleteDays = (Day: string) => {
    setDaysOfWeek((prevDays) => prevDays.filter((day) => day !== Day));
  };

  return (
    <>
      {isOpen && (
        <div className="modal modal-open ">
          <div className="modal-box relative w-full max-w-3xl bg-[var(--background)]">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="form-control">
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

              <div className="form-control">
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

              <div className="form-control ">
                <label className="label">
                  <span className="label-text">
                    Upload Images activity Gallery (Max 2MB each)
                  </span>
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

              {/* Pricing */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price type</span>
                </label>
                <select
                  onChange={(e) => setPriceType(e.target.value)}
                  defaultValue="Select option"
                  className="select border border-black rounded-md "
                >
                  <option disabled={true}>Select option</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Montly</option>
                  <option>Person</option>
                  <option>Session</option>
                </select>
              </div>

              <div className="form-control">
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

              {/* additional information */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Additional information </span>
                </label>
                <input
                  type="text"
                  placeholder="Guide your client on session prep."
                  className="input input-bordered"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                />
              </div>

              {/* location and address */}
              <div className="form-control">
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Share with you client your address"
                  className="input input-bordered"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </div>
            {/* availability */}
            <div className="w-full p-4 border rounded-md mt-3">
              <h1 className="font-bold">Availability</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                {/* session type */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text"> Session type</span>
                  </label>
                  <select
                    onChange={(e) => setSessionPeriod(e.target.value)}
                    defaultValue="Select option"
                    className="select border border-black rounded-md "
                  >
                    <option disabled={true}>Select option</option>
                    <option>Fixed Session (Days and time)</option>
                    <option>Time and Date depend on session</option>
                  </select>
                </div>
                {/* number of slots */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Number of Slots </span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    placeholder="Enter number of slots available for service"
                    className="input input-bordered"
                    onChange={(e) => setSlots(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              {sessionPeriod === "Fixed Session (Days and time)" ? (
                <div>
                  <div className="flex flex-wrap items-stretch gap-4">
                    {/* frequency */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Frequency</span>
                      </label>
                      <select
                        onChange={(e) => setFrequency(e.target.value)}
                        value={frequency}
                        className="select border border-black rounded-md "
                      >
                        <option>Select Frequency</option>
                        <option>All Days</option>
                        <option>Monday-Friday</option>
                        <option>Custom Days</option>
                      </select>
                    </div>
                    {/* custom days */}
                    {frequency === "Custom Days" && (
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Availability</span>
                        </label>
                        <select
                          onChange={(e) => setAvailability(e.target.value)}
                          value={availability}
                          className="select border border-black rounded-md "
                        >
                          <option>Select Days</option>
                          <option>Monday</option>
                          <option>Tuesday</option>
                          <option>Wednesday</option>
                          <option>Thursday</option>
                          <option>Friday</option>
                          <option>Saturday</option>
                          <option>Sunday</option>
                        </select>
                      </div>
                    )}
                    {/* from and to time */}
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm">From</span>
                      </label>

                      <input
                        type="time"
                        onChange={(e) => setStartTime(e.target.value)}
                        value={startTime}
                        className="border w-fit p-2 rounded-md border-black focus-within:outline-none"
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-sm">To</span>
                      </label>

                      <input
                        type="time"
                        onChange={(e) => setEndTime(e.target.value)}
                        value={endTime}
                        className="border w-fit p-2 rounded-md border-black focus-within:outline-none"
                      />
                    </div>
                  </div>

                  <span className="flex gap-2 mt-2">
                    {DaysOfWeek.map((items, index) => (
                      <span
                        key={index}
                        className="relative bg-slate-100 py-1 text-xs px-4 rounded-lg"
                      >
                        {items}
                        <span
                          onClick={() => handleDeleteDays(items)}
                          className="absolute -top-1 -right-1 border cursor-pointer text-xs w-2 h-2 bg-slate-200 rounded-full p-2 flex items-center justify-center"
                        >
                          x
                        </span>
                      </span>
                    ))}
                  </span>
                </div>
              ) : (
                <>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Session Date & time</span>
                    </label>

                    <input
                      aria-label="Date and time"
                      onChange={(e) => setSessionDateTime(e.target.value)}
                      value={sessionDateTime}
                      type="datetime-local"
                      className="border w-fit border-black p-2 rounded-md"
                    />
                  </div>
                </>
              )}
            </div>

            <p className="text-red-500 text-center">{error}</p>
            <div className="modal-action">
              <button
                className={`btn w-4/5 md:w-1/2 mx-auto rounded-full hover:bg-secondary disabled:bg-neutral/40 disabled:text-neutral bg-secondary/50 border-none`}
                onClick={handleCreateService}
                disabled={
                  !selectedServiceCategory ||
                  !serviceName ||
                  !location ||
                  !sessionPeriod ||
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
