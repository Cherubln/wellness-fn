"use server";
import { BookingDataType, SessionTypeResponse } from "@/app/type";
import axios, { AxiosError } from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface BookingData {
  sessionId: string;
  userId: string | undefined;
  sessionDate: string;
  numberOfSlots: number;
}

// booking api
interface bookingResponse {
  data?: {
    error?: string;
  };
  booking: {
    _id: string;
    session: string;
    user: string;
    numberOfSlots: number;
    status: "confirmed" | "pending" | "canceled";
  };
}
export const CreateBooking = async (
  data: BookingData
): Promise<bookingResponse> => {
  try {
    const response = await axios.post(`${apiUrl}/api/bookings/`, data);
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetUserBookings = async (userId: string): Promise<{bookings:BookingDataType[]}> => {
  try {
    const response = await axios.get(`${apiUrl}/api/bookings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const CancellBookings = async (bookingId: string): Promise<{}> => {
  try {
    const response = await axios.patch(
      `${apiUrl}/api/bookings/${bookingId}/cancel`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

// session api

type RecurringPattern = {
  daysOfWeek: string[];
  frequency: string;
};

type SessionData = {
  serviceId?: string;
  sessionDate?: string | false;
  sessionTime?: string | false;
  slots: number;
  recurring: boolean;
  recurringPattern?: RecurringPattern;
};

type SessionRep = {
  data?: {
    error?: string;
  };
  session: SessionTypeResponse;
};

export const CreateSession = async (data: SessionData): Promise<SessionRep> => {
  try {
    const response = await axios.post(`${apiUrl}/api/sessions/`, data);

    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};
