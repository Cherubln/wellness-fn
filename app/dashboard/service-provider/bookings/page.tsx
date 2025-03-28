"use client";

import {
  CancelSession,
  GetAllActivitySession,
  PutCloseSession,
} from "@/app/api/activity/action";
import Loader from "@/app/components/loader";
import { ServiceType } from "@/app/type";
import { ExtractDateTime } from "@/app/utils/convertDate";
import { decodeJWT } from "@/app/utils/decode";
import {
  calculateServiceBookingsAndSlots,
  calculateTotalBookingsAndSlots,
} from "@/app/utils/filters";
import { useEffect, useState } from "react";
import { FaTimes, FaFileExport } from "react-icons/fa";
import {
  FaBell,
  FaCalendar,
  FaCheck,
  FaUserCheck,
  FaClock,
  FaUsers,
  FaChartPie,
  FaCheckToSlot,
} from "react-icons/fa6";
// import { saveAs } from "file-saver";

// Mock API calls for fetching data
type ServiceBooking = {
  id: number;
  service: string;
  totalBookings: number;
  totalSlots: number;
  sessions: {
    startDate: string;
    endDate: string;
    bookedSlots: number;
    remainingSlots: number;
    attendees: string[];
    isClosed: boolean;
  }[];
};

type UserBooking = {
  id: number;
  userName: string;
  activity: string;
  createdAt: string;
  status: "Confirmed" | "Pending" | "Cancelled";
};

const fetchUserBookings = async (): Promise<UserBooking[]> => {
  return [
    {
      id: 1,
      userName: "John Doe",
      createdAt: "2025-03-17",
      activity: "Yoga Class",
      status: "Pending",
    },
    {
      id: 2,
      userName: "Jane Smith",
      createdAt: "2025-03-18",
      activity: "Yoga Class",
      status: "Confirmed",
    },
    {
      id: 3,
      userName: "Eric Kawanji",
      createdAt: "2025-03-19",
      activity: "Yoga Class",
      status: "Pending",
    },
    {
      id: 4,
      userName: "Doric Ntota",
      createdAt: "2025-03-17",
      activity: "Yoga Class",
      status: "Cancelled",
    },
    {
      id: 5,
      userName: "Israel",
      createdAt: "2025-03-18",
      activity: "Yoga Class",
      status: "Cancelled",
    },
    {
      id: 6,
      userName: "Nema",
      createdAt: "2025-03-22",
      activity: "Yoga Class",
      status: "Confirmed",
    },
  ];
};

export default function SessionManagement() {
  const [serviceBookings, setServiceBookings] = useState<ServiceType[]>([]);
  const [userBookings, setUserBookings] = useState<UserBooking[]>([]);
  const [loading, setloading] = useState(false);
  const token = localStorage.getItem("token") as string;
  const providerId = decodeJWT(token);
  useEffect(() => {
    getAllMyActivities();
    const loadBookings = async () => {
      const users = await fetchUserBookings();
      setUserBookings(users);
    };
    loadBookings();
  }, []);

  const updateUserBookingStatus = (
    id: number,
    newStatus: "Confirmed" | "Cancelled"
  ) => {
    setUserBookings((prev) =>
      prev.map((booking) =>
        booking.id === id ? { ...booking, status: newStatus } : booking
      )
    );
  };

  // const exportAttendeeList = (session: {
  //   startDate: string;
  //   endDate: string;
  //   attendees: string[];
  // }) => {
  //   const csvContent = `Attendees for session on ${
  //     session.startDate
  //   }\n${session.attendees.join("\n")}`;
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   // saveAs(blob, `Attendees_${session.date}.csv`);
  // };

  const closeBooking = async (sessionId: string) => {
    try {
      const result = await PutCloseSession(sessionId);
      if (result) getAllMyActivities();
    } catch (error) {}
  };

  const cancelSession = async (sessionId: string) => {
    const result = await CancelSession(sessionId);
    if (result) getAllMyActivities();
  };

  const getAllMyActivities = async () => {
    setloading(true);
    try {
      const result = await GetAllActivitySession(providerId._id);
      setServiceBookings(result);
    } catch (error) {
    } finally {
      setloading(false);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-slate-800">
        <FaBell size={25} /> Session & Attendee Management
      </h2>

      {/* Activity Details & Analytics */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="p-5 bg-slate-100 shadow-lg rounded-lg flex items-start gap-3">
          <FaCheckToSlot size={40} className="text-yellow-500" />
          <div>
            <h3 className="text-xl font-semibold">Total Slots</h3>
            <p className="text-lg text-center">
              {calculateTotalBookingsAndSlots(serviceBookings).totalSlots}
            </p>
          </div>
        </div>
        <div className="p-5 bg-slate-100 shadow-lg rounded-lg flex items-center gap-3">
          <FaChartPie size={40} className="text-blue-500" />
          <div>
            <h3 className="text-xl font-semibold">Total Bookings</h3>
            <p className="text-lg text-center">
              {calculateTotalBookingsAndSlots(serviceBookings).totalBookings}
            </p>
          </div>
        </div>
        <div className="p-5 bg-slate-100 shadow-lg rounded-lg flex items-center gap-3">
          <FaUsers size={40} className="text-green-500" />
          <div>
            <h3 className="text-xl font-semibold">Total Services</h3>
            <p className="text-lg text-center">{serviceBookings.length}</p>
          </div>
        </div>
      </div>

      {/* Session Bookings */}
      <div className="grid md:grid-cols-2 gap-6">
        {serviceBookings.map((booking) => (
          <div key={booking._id} className="p-5 bg-white shadow-lg rounded-lg">
            <h3 className="text-xl font-semibold flex items-center gap-2 border-b-2 pb-3">
              <FaUserCheck size={24} /> {booking.activityName}
            </h3>
            <div className="text-sm pt-4 ">
              <p className="">
                <span className="font-bold text-slate-800">Total Slots:</span>{" "}
                {calculateServiceBookingsAndSlots(booking).totalSlots}
              </p>
              <p>
                <span className="font-bold text-slate-800">
                  Total Bookings:
                </span>{" "}
                {calculateServiceBookingsAndSlots(booking).totalBookings}
              </p>
              <p className="">
                <span className="font-bold text-slate-800">
                  Remaining Slots:
                </span>{" "}
                {calculateServiceBookingsAndSlots(booking).remainingSlots}
              </p>
            </div>
            <div className="mt-2">
              <h4 className="text-sm py-2 font-bold flex items-center gap-2">
                <FaCalendar size={18} /> Upcoming Sessions:{" "}
                {booking.sessions.length}
              </h4>
              <div className="max-h-[300px] overflow-y-scroll bg-slate-100 rounded-lg p-4">
                {booking.sessions.length < 1 ? (
                  <div className="h-40 text-slate-500 font-bold flex items-center justify-center text-center w-full">
                    No session Available now
                  </div>
                ) : (
                  booking.sessions.map((session, index) => (
                    <section key={index}>
                      {session.recurring ? (
                        <div className="mt-3 bg-white shadow-sm p-3 space-y-2 rounded-md">
                          <p className="text-gray-800 text-sm flex items-center gap-1">
                            <span className="flex items-center gap-1">
                              <FaClock />{" "}
                              {session.recurringPattern?.daysOfWeek[0]}
                            </span>

                            <span className="flex items-center gap-1">
                              -
                              <FaClock />{" "}
                              {
                                session.recurringPattern?.daysOfWeek?.[
                                  session.recurringPattern?.daysOfWeek?.length -
                                    1
                                ]
                              }
                            </span>
                          </p>
                          <p className="text-gray-700 text-sm">
                            {session.bookedSlots} booked,{" "}
                            {session.slots - session.bookedSlots} remaining
                          </p>

                          <div className="w-full py-2 flex flex-wrap gap-2">
                            <button
                              onClick={() => closeBooking(session._id)}
                              className=" bg-yellow-500 text-white px-3 py-1 rounded"
                              disabled={session.status === "closed"}
                            >
                              {session.status === "closed"
                                ? "Bookings Closed"
                                : "Close Booking"}
                            </button>
                            <button
                              onClick={() => cancelSession(session._id)}
                              className=" bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Cancel Session
                            </button>
                          </div>
                          {/* <button
                            onClick={() =>
                              exportAttendeeList(session.recurringPattern)
                            }
                            className=" bg-stone-500 font-bold text-white px-3 py-2 rounded flex items-center gap-1"
                          >
                            <FaFileExport /> Export Attendees
                          </button> */}
                        </div>
                      ) : (
                        <div className="mt-3 bg-white shadow-sm p-3 space-y-2 rounded-md">
                          <p className="text-gray-800 text-sm flex items-center gap-1">
                            <span className="flex items-center gap-1">
                              <FaClock />{" "}
                              {ExtractDateTime(session.sessionDate).date}
                            </span>
                          </p>
                          <p className="text-gray-700 text-sm">
                            {session.bookedSlots} booked,{" "}
                            {session.slots - session.bookedSlots} remaining
                          </p>

                          <div className="w-full py-2 flex flex-wrap gap-2">
                            <button
                              onClick={() => closeBooking(session._id)}
                              className={
                                session.status === "closed"
                                  ? "bg-stone-500 text-white px-3 py-1 rounded"
                                  : " bg-yellow-500 text-white px-3 py-1 rounded"
                              }
                              disabled={session.status === "closed"}
                            >
                              {session.status === "closed"
                                ? "Bookings Closed"
                                : "Close Booking"}
                            </button>
                            <button
                              onClick={() => cancelSession(session._id)}
                              className=" bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Cancel Session
                            </button>
                          </div>
                          {/* <button
                            onClick={() =>
                              exportAttendeeList(session.recurringPattern)
                            }
                            className=" bg-stone-500 font-bold text-white px-3 py-2 rounded flex items-center gap-1"
                          >
                            <FaFileExport /> Export Attendees
                          </button> */}
                        </div>
                      )}
                    </section>
                  ))
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* User Bookings Table */}
      {/* <div className="p-6 bg-white shadow-md rounded-md mt-8 ">
        <h2 className="text-xl font-bold mb-4">Session Bookings</h2>
        <div className=" min-w-full overflow-x-scroll">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">#</th>
                <th className="border p-2">User Name</th>
                <th className="border p-2">Activity</th>
                <th className="border p-2">Created At</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {userBookings.map(
                ({ id, userName, createdAt, activity, status }) => (
                  <tr
                    key={id}
                    className="text-center text-sm text-nowrap hover:bg-slate-100"
                  >
                    <td className="border p-2">{id}</td>
                    <td className="border p-2">{userName}</td>
                    <td className="border p-2">{activity}</td>
                    <td className="border p-2">{createdAt}</td>

                    <td className="border p-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            updateUserBookingStatus(id, "Confirmed")
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-1"
                        >
                          <FaCheck /> reminder
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
