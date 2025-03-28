"use server";

import { ServiceType } from "@/app/type";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const GetAllActivity = async () => {
  const url = `${apiUrl}/api/services`;
  const response = await axios.get(url);
  return response.data as ServiceType[];
};

export const GetAllActivitySession = async (
  providerId: string
): Promise<ServiceType[]> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/services/provider/${providerId}`
    );
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const CancelSession = async (
  sessionId: string
): Promise<ServiceType[]> => {
  try {
    const response = await axios.delete(`${apiUrl}/api/sessions/${sessionId}`);
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const PutCloseSession = async (
  sessionId: string
): Promise<ServiceType[]> => {
  try {
    const response = await axios.put(`${apiUrl}/api/sessions/${sessionId}`, {
      status: "closed",
    });
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};


export const GetAllUserBookedSession = async (
  providerId: string
): Promise<ServiceType[]> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/services/provider/${providerId}`
    );
    const result = response.data;
    return result;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};