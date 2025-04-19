export type CorporateType = {
  companyName: string;
  email: string;
  employeeInvitations: string[];
  employees: string[];
  hrAdminName: string;
  profilePicture: string;
  progress: {
    employeeListUploaded: boolean;
    module1Completed: boolean;
    surveyCompletionRate: number;
  };
  _id: string;
  role: string;
  __v: number;
  exp: number;
  iat: number;
};

export type WellnessFormDataType = {
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
};

export type UserType = {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  surveyCompletionStatus: string;
  groups: string[];
  role: string;
  points: number;
  favoriteActivity: string;
  hasScanned: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  corporateMembership: string;
  iat: number;
  exp: number;
  steps: number;
  rank?: number;
  stepsGoal: string;
};

export type WellnessDataType = {
  userId: string;
  physicalActivity: string[];
  otherPhysicalActivity: string | null;
  mentalWellness: string[];
  otherMentalWellness: string | null;
  nutrition: string;
  otherNutrition: string | null;
  annualCheckup: string;
  deworming: string;
  physicalActivityGoal: string[];
  mentalWellnessGoal: string;
  nutritionGoal: string;
  diagnosticsGoal: string;
};
