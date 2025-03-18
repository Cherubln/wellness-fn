"use server";
import { WellnessDataType } from "@/app/utils/type";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface EmployeeGoalsData {
  physicalActivity: string[];
  otherPhysicalActivity: string;
  mentalWellness: string[];
  otherMentalWellness: string;
  nutrition: string;
  otherNutrition: string;
  annualCheckup: string;
  deworming: string;
  physicalActivityGoal: string;
  mentalWellnessGoal: string;
  nutritionGoal: string;
  diagnosticsGoal: string;
}

export const CheckEmployeeStatusAPI = async (
  userId?: string
): Promise<{ surveyCompletionStatus: string }> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/users/survey-completion-status?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const PostEmployeeSetGoals = async (
  data: EmployeeGoalsData,
  userId?: string
): Promise<WellnessDataType> => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/user-goals?userId=${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetEmployeeSetGoals = async (
  userId?: string
): Promise<WellnessDataType[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/user-goals?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};
