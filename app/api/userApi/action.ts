"use server";
import {
  RiddleChallengetype,
  RiddleCompletionResponseType,
  TeamType,
  UserData,
  WonderlandTeamType,
} from "@/app/type";
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
    const response = await axios.get(
      `${apiUrl}/api/user-goals?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const CreateRoles = async (data: string[]): Promise<UserData[]> => {
  try {
    const response = await axios.put(`${apiUrl}/api/users/assign-leader-role`, {
      emails: data,
    });
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetAllUsers = async (): Promise<{
  availableUsers: UserData[];
}> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/groups/available-wonderland-users`
    );

    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetOccupiedColors = async (): Promise<{
  occupiedColors: string[];
}> => {
  try {
    const response = await axios.get(`${apiUrl}/api/groups/occupied-colors`);
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const CreateWonderlandTeam = async (
  data: TeamType
): Promise<UserData[]> => {
  try {
    const response = await axios.post(`${apiUrl}/api/groups`, data);
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const UpdateWonderlandTeam = async (
  groupId: string,
  data: {
    members: string[];
  }
): Promise<UserData[]> => {
  try {
    const response = await axios.put(`${apiUrl}/api/groups/${groupId}`, data);
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetRiddle = async (
  groupId: string
): Promise<RiddleChallengetype> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/groups/${groupId}/generate-riddle`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetMemberGroup = async (
  memberId: string
): Promise<WonderlandTeamType[]> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/groups/wonderland-groups/${memberId}`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetGroupRanking = async (): Promise<WonderlandTeamType[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/groups/wonderland-groups`);
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetGroupRankingTop = async (): Promise<WonderlandTeamType[]> => {
  try {
    const response = await axios.get(`${apiUrl}/api/groups/top-groups`);
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const CompleteTask = async (
  groupId: string,
  data: {
    groupId: string;
    riddleId?: string;
    timeUsed: number;
    taskCompletionCode?: number;
  }
): Promise<RiddleCompletionResponseType> => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/groups/${groupId}/complete-riddle`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};
export const ScanQRCode = async (
  groupId: string,
  data: {
    riddleId: string;
  }
): Promise<{}> => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/groups/${groupId}/scan-riddle-code`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};
