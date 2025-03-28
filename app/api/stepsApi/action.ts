"use server";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export type MessageType = {
  message: string;
  user: {
    id: string;
    stepsGoal: string;
  };
};

export const GetUserStepsData = async (
  period: string,
  code: string | null,
  userId?: string
): Promise<{ steps: number }> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/users/google-fit/user-steps/${userId}?period=${period}&${
        code ? `code=${code}` : ""
      }`
    );

    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const CreateStepsGoal = async (
  userId: string,
  stepsGoal: string
): Promise<MessageType> => {
  try {
    const response = await axios.post(`${apiUrl}/api/users/steps-goal/`, {
      userId,
      stepsGoal,
    });
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};
