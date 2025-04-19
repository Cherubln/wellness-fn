import { BookingDataType } from "@/app/type";
import { ExtractDateTime } from "@/app/utils/convertDate";
import React, { useState } from "react";

const BookingsTable = ({ bookings }: { bookings: BookingDataType[] }) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCancel = async (id: string) => {
    setLoadingId(id);
    try {
      //   await onCancelBooking(id);
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
    setLoadingId(null);
  };

  return (
    <div className="overflow-x-auto">
      {bookings.length <= 0 ? (
        <div className="w-full flex items-center justify-center text-center py-4 min-h-[400px] text-gray-500">
          No bookings available.
        </div>
      ) : (
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-2">Service Name</th>
              <th className="px-4 py-2">Session Date</th>
              <th className="px-4 py-2">Session Time</th>

              <th className="px-4 py-2">Booked Slots</th>

              <th className="px-4 py-2">Status</th>
              {/* <th className="px-4 py-2">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-t test-sm text-slate-600 font-light"
              >
                <td className="px-4 py-2">
                  {booking.session.service.activityName}
                </td>
                <td className="px-4 py-2">
                  {ExtractDateTime(booking.dateBooked!).date}
                </td>
                <td className="px-4 py-2">{booking.session.sessionTime}</td>

                <td className="px-4 py-2">{booking.session.bookedSlots}</td>

                <td className="px-4 py-2 capitalize text-green-800 font-semibold">
                  {booking.status}
                </td>
                {/* <td className="px-4 py-2">
                <button
                  onClick={() => handleCancel(booking._id)}
                  disabled={loadingId === booking._id}
                  className={`px-4 py-2 text-white text rounded ${
                    loadingId === booking._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {loadingId === booking._id ? "Canceling..." : "Cancel"}
                </button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingsTable;
