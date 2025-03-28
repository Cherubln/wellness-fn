"use client";
import React, { useEffect, useState } from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { DetailBox } from "./detailsDropDown";
import { AddingDetailBox } from "./detailsAdding";
import Link from "next/link";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { CreateBooking } from "@/app/api/booking/action";
import { IServiceProvider, IUser } from "@/app/store/slices/authSlice";
import { motion } from "framer-motion";
import { ServiceType } from "@/app/type";
import { isValidDate } from "@/app/utils/filters";
import ButtonComp from "../home/button";
import { useRouter } from "next/navigation";

export const BookingCard = ({
  service,
  user,
}: {
  service: ServiceType;
  user: IUser | IServiceProvider;
}) => {
  const router = useRouter();
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [timeSelected, setTimeSelected] = useState("");
  const [totalSelected, setTotalSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState(false);
  const [bookingError, setBookingError] = useState({
    error: false,
    message: "",
  });
  const [recurring, setRecurring] = useState(false);

  const HandleBooking = async () => {
    setLoading(true);
    setBookingError({ error: false, message: "" });

    const formData = {
      sessionId: selectedSessionId,
      userId: user._id,
      sessionDate: timeSelected || selectedSession,
      numberOfSlots: totalSelected,
    };

    try {
      const result = await CreateBooking(formData);

      if (result.booking) {
        setBookingStatus(true);
      } else {
        setBookingError({
          error: true,
          message: "Failed to create booking. Please try again!",
        });
        setBookingStatus(false);
      }
    } catch (error) {
      // console.error("Error creating booking:", error);
      setBookingError({
        error: true,
        message: "Something went wrong. Please try again later!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setRecurring(isValidDate(selectedSession));
  }, [selectedSession]);

  return (
    <div className="md:min-w-[500px] md:max-w-xl w-full bg-white rounded-2xl py-6 md:px-6 space-y-4">
      {bookingStatus ? (
        <>
          {bookingError.error ? (
            <div className="h-40 text-red-500">
              {" "}
              {bookingError.message}
              <span
                onClick={() => setBookingError({ error: false, message: "" })}
              >
                <ButtonComp title="Book Again" />
              </span>
            </div>
          ) : (
            <div className="p-6 shadow-lg border rounded-xl bg-white flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-gray-700 text-lg font-semibold">
                <IoMdTime className="text-secondary text-2xl" />
                <span>Your have successfully Booked this session</span>
              </div>

              <p className="text-gray-500 text-sm mt-2">
                Your booking is confirmed! You'll receive an email with the
                details soon.
              </p>

              <Link href="/dashboard" className="w-full mt-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={HandleBooking}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-full text-lg font-semibold transition-all bg-secondary text-white hover:bg-secondary-dark`}
                >
                  <MdOutlineLibraryBooks className="text-xl" />
                  Finish
                </motion.button>
              </Link>
            </div>
          )}
        </>
      ) : service.sessions.length <= 0 ? (
        <div className="flex flex-col items-center gap-2 justify-center p-6 bg-gray-100 rounded-lg shadow-md">
          <div className="overflow-hidden w-full">
            <img
              src={service.images[0]}
              alt="No Session Available"
              className="w-full h-64 mb-4 hover:scale-110 duration-300"
            />
          </div>
          <h2 className="text-xl font-semibold text-slate-800">
            No Active Session Found!
          </h2>
          <p className="text-slate-600 text-center mt-2">
            This activity does not currently have an available session. To
            participate, please explore other activities that have an active
            session.
          </p>
          <span onClick={() => router.push("/dashboard")}>
            <ButtonComp title={" Find an Activity"} />
          </span>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-lg font-semibold">
            {service.price !== 0 ? (
              <span className="text-xl font-bold">
                KES {service.price?.toLocaleString()}
                {service.priceType && `/${service.priceType.toLocaleString()}`}
              </span>
            ) : (
              <span className="text-xl font-bold">Free of Charge</span>
            )}
          </div>
          <p className="text-gray-600">
            Book a session with <strong>{service.activityName}</strong>
          </p>
          {/* Details Section */}
          <div className="space-y-3">
            <DetailBox
              title="Select a Session"
              setSelectedSession={setSelectedSession}
              setSelectedSessionId={setSelectedSessionId}
              content={service.sessions}
            />
            {!recurring && (
              <div className="border rounded-lg p-2 bg-gray-50 space-y-2">
                <h1 className="text-sm text-slate-500">Select a Date</h1>
                <input
                  type="date"
                  onChange={(e) => setTimeSelected(e.target.value)}
                  name=""
                  id=""
                  className="w-full p-1"
                />
              </div>
            )}
            <AddingDetailBox
              title="Participants"
              setTotalSelected={setTotalSelected}
            />
          </div>

          {timeSelected.length > 0 && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm font-semibold">
                Booking breakdown
              </p>
              <div className="flex flex-col justify-between text-sm text-gray-700 mt-3">
                <span>Activity Time</span>

                <span>{service.sessions[0].sessionTime}</span>
              </div>

              <div className="mt-2 border-t pt-2">
                <BreakdownItem
                  label={`Total People: ${totalSelected}`}
                  price={service?.price?.toLocaleString()}
                />
              </div>
              <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Total price</span>
                <span>
                  KES{" "}
                  {(
                    service?.price && service?.price * totalSelected
                  )?.toLocaleString()}
                </span>
              </div>
            </div>
          )}
          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={HandleBooking}
            disabled={!selectedSessionId || !totalSelected}
            className={`  ${
              !selectedSessionId || !totalSelected
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : " bg-secondary text-white "
            } w-full py-3 rounded-full text-lg font-semibold`}
          >
            {loading ? "Booking..." : "Book"}
          </motion.button>
          <div className="flex items-center justify-between text-gray-500 text-sm">
            <hr className="w-1/4 border-gray-300" />
            <span>Or</span>
            <hr className="w-1/4 border-gray-300" />
          </div>
          <div className="text-center text-gray-700 font-semibold">
            call to book{" "}
            <span className="text-black font-bold">+254 799 999 999</span>
            <div className="">
              {service?.provider?.whatsappLink ||
              service?.provider?.instagramLink ? (
                <p className="font-semibold my-2">Social Accounts</p>
              ) : (
                ""
              )}
              <div className="flex items-center justify-center gap-1">
                {service?.provider?.whatsappLink && (
                  <span>
                    <a
                      href={service?.provider?.whatsappLink}
                      target="_blank"
                      className="text-green-500"
                    >
                      <FaWhatsapp className="w-6 h-6" />
                    </a>
                  </span>
                )}
                {service?.provider?.instagramLink && (
                  <span>
                    <a
                      href={service?.provider?.instagramLink}
                      target="_blank"
                      className="text-pink-500"
                    >
                      <FaInstagram className="w-6 h-6" />
                    </a>
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const BreakdownItem = ({ label, price }: { label: string; price?: string }) => (
  <div className="flex justify-between text-sm text-gray-700">
    <span>{label}</span>
    <span>KES {price}</span>
  </div>
);

export default BookingCard;
