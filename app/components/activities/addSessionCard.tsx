import { CreateSession } from "@/app/api/booking/action";
import { useAppContext } from "@/app/context";
import { AllDays, MonToFri } from "@/app/dashboard/CreateServiceModel";
import { IUser, IServiceProvider } from "@/app/store/slices/authSlice";
import { ServiceType } from "@/app/type";
import { ExtractDateTime } from "@/app/utils/convertDate";

import React, { useEffect, useState } from "react";
import Loader from "../loader";
import { IoMdTime } from "react-icons/io";
import { motion } from "framer-motion";
import { MdOutlineLibraryBooks } from "react-icons/md";

const AddSessionCard = ({
  service,
  user,
}: {
  service: ServiceType;
  user: IUser | IServiceProvider;
}) => {
  const [sessionPeriod, setSessionPeriod] = useState(
    "Fixed Session (Days and time)"
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [sessionDateTime, setSessionDateTime] = useState("");
  const [DaysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("");
  const [availability, setAvailability] = useState("");
  const [slots, setSlots] = useState<number>(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setActiveModalId } = useAppContext();
  const [sessionStatus, setSessionStatus] = useState<{
    loading: boolean;
    message?: string;
  }>({ loading: false, message: "" });

  const handleCreateSession = async () => {
    setError(null);
    if (!sessionPeriod || slots <= 0) {
      setError("Please fill in all fields correctly.");
      return;
    }

    setLoading(true);

    const FixedData = {
      serviceId: service._id,
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
      serviceId: service._id,
      sessionDate:
        sessionPeriod !== "Fixed Session (Days and time)" &&
        ExtractDateTime(sessionDateTime).date,
      sessionTime:
        sessionPeriod !== "Fixed Session (Days and time)" &&
        `${ExtractDateTime(sessionDateTime).time12}`,
      slots,
      recurring: false,
    };

    const formData =
      sessionPeriod === "Fixed Session (Days and time)"
        ? FixedData
        : DynamicData;

    setSessionStatus({ loading: true });
    try {
      const response = await CreateSession(formData);

    
      if (response.session) {
        setSessionStatus({
          loading: false,
          message: "Your session is created!",
        });
      } else {
        setSessionStatus({
          loading: false,
          message: "Failed to create a session. Try again!",
        });
      }
    } catch (err) {
      console.error("Error creating session:", err);
      setSessionStatus({
        loading: false,
        message: "Something went wrong. Please try again!",
      });
    } finally {
      setSessionPeriod("");
      setSlots(0);
      setLoading(false);
      setStartTime("");
      setEndTime("");
      setSessionDateTime("");
      setDaysOfWeek([]);
      setFrequency("");
      setAvailability("");
    }
  };

  const handleDeleteDays = (Day: string) => {
    setDaysOfWeek((prevDays) => prevDays.filter((day) => day !== Day));
  };

  useEffect(() => {
    if (availability) {
      setDaysOfWeek((prevDays) => [...prevDays, availability]);
    }
  }, [availability]);


  return (
    <div className="w-full max-w-3xl min-w-96">
      {sessionStatus.loading ? (
        <div className="h-[300px] w-full overflow-hidden items-center justify-center flex">
          <span className="loading loading-ring text-secondary loading-lg"></span>
        </div>
      ) : sessionStatus.message ? (
        <div className="p-6 shadow-lg border rounded-xl bg-white flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
            <IoMdTime className="text-secondary text-2xl" />
            <span>Your have successfully created a session</span>
          </div>

          <p className="text-gray-500 text-base my-2">{sessionStatus.message}</p>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveModalId(null)}
            className={`w-full flex items-center justify-center gap-2 py-2 rounded-full text-lg font-semibold transition-all bg-secondary text-white hover:bg-secondary-dark`}
          >
            <MdOutlineLibraryBooks className="text-xl" />
            Finish
          </motion.button>
        </div>
      ) : (
        <>
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

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <div className="w-full flex items-center justify-center">
            <button
              className={`btn w-4/5 md:w-1/2 mx-auto rounded-full hover:bg-secondary disabled:bg-neutral/40 disabled:text-neutral bg-secondary/50 border-none mt-4`}
              onClick={handleCreateSession}
              disabled={loading || !sessionPeriod || slots <= 0}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddSessionCard;
