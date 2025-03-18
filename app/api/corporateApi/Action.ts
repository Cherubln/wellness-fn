"use server";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const linkUrl = process.env.NEXT_PUBLIC_LINK_URL as string;

interface CorporateData {
  companyName: string;
  email: string;
  password: string;
  packageSelection: {
    packagename: string;
    price: string;
    packageSize: string;
    packageDuration: string;
  };
}

export type PackageSelectionType = {
  packagename: string;
  price: string;
  packageSize: string;
  packageDuration: string;
};

interface hrData {
  industry: string;
  employeeCount: number;
  avgHealthInsuranceClaims: number;
  avgCostPerClaim: number;
  avgAbsentDays: number;
  commonReasonsForAbsenteeism: string[];
  wellnessGoals: string[];
  preferredWellnessInitiatives: string[];
}

interface EmployeeData {
  overallSatisfaction: string;
  understandStrategy: string;
  confidenceInLeadership: string;
  leadershipCares: string;
  planningOfObjectives: string;
  effectiveCommunication: string;
  valuesDiversity: string;
  recognizedForWork: string;
  treatedAsPeople: string;
  spiritOfCooperation: string;
  clearJobRole: string;
  goodUseOfSkills: string;
  partOfTeam: string;
  workLifeBalance: string;
  comfortableWorkConditions: string;
  safeWorkEnvironment: string;
  respectfulSupervisor: string;
  constructiveFeedback: string;
  adequateTraining: string;
  encouragedCareerGrowth: string;
  fairPay: string;
  satisfiedWithBenefits: string;
  proudToWorkHere: string;
  environmentForBestWork: string;
  name?: string;
  email?: string;
}

interface EmployeeEmails {
  employeeList: string[];
  linkUrl: string;
}

type employees = {
  employees: [{ id: number; email: string; status: string }];
};

export type basicEmployeeData = {
  name: string;
  email: string;
};

export interface CorporateAccountType {
  message: string;
}

export const PostCorporateData = async (
  data: CorporateData
): Promise<{ message: string; token: string }> => {
  try {
    const response = await axios.post(`${apiUrl}/api/corporate/register`, data);

    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const PostHRResponseData = async (
  data: hrData,
  userId: string
): Promise<CorporateAccountType> => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/corporate/baseline-survey?userId=${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const PostEmployeeResponseData = async (
  data: EmployeeData,
  userId: string
): Promise<{}> => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/users/baseline-survey?userId=${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const PostEmployeeResponseBasicData = async (
  data: EmployeeData,
  userId: string
): Promise<{}> => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/corporate/employee-survey?corporate=${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const PostEmployeEmails = async (
  data: EmployeeEmails,
  userId: string
): Promise<{}> => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/corporate/upload-employee-list?userId=${userId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetTotalEmployees = async (
  userId?: string
): Promise<{
  totalNumberOfemployees: number;
}> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/corporate/total-employees?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetCompletedSurvey = async (
  userId?: string
): Promise<{
  totalEmployeeCompletedSurveys: number;
}> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/corporate/total-completed-surveys?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetPendingSurvey = async (
  userId?: string
): Promise<{
  totalPendingEmployeeSurveys: number;
}> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/corporate/total-pending-surveys?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetCorporateEmployees = async (
  userId?: string
): Promise<employees> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/corporate/employees?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const GetCorporateSurveyProgress = async (
  userId?: string
): Promise<{
  progress: {
    module1Completed: boolean;
    employeeListUploaded: boolean;
    surveyCompletionRate: number;
  };
}> => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/corporate/progress?userId=${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};

export const PostReminderEmails = async (
  userId?: string
): Promise<{ message: string }> => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/corporate/send-reminder-emails?userId=${userId}`,
      {
        reminderLinkUrl: linkUrl,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong on our side:", error);
    throw error;
  }
};
