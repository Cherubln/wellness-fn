import { Survey } from "@/costants";

export const updateSurveyAnswer = (
  surveys: Survey[],
  newAnswer: string,
  questionId?: number
): Survey[] => {
  return surveys.map((survey) => ({
    ...survey,
    sections: survey.sections.map((section) => ({
      ...section,
      questions: section.questions.map((question) =>
        question.id === questionId
          ? { ...question, answer: newAnswer }
          : question
      ),
    })),
  }));
};

export const updateSurveyAnswerArr = (
  surveys: Survey[],
  newAnswer?: string[],
  questionId?: number
): Survey[] => {
  return surveys.map((survey) => ({
    ...survey,
    sections: survey.sections.map((section) => ({
      ...section,
      questions: section.questions.map((question) =>
        question.id === questionId
          ? { ...question, answerArr: newAnswer }
          : question
      ),
    })),
  }));
};

interface HrSurveyResponse {
  industry: string;
  employeeCount: number;
  avgHealthInsuranceClaims: number;
  avgCostPerClaim: number;
  avgAbsentDays: number;
  dailyCompensation: number;
  commonReasonsForAbsenteeism: string[];
  wellnessGoals: string[];
  preferredWellnessInitiatives: string[];
}

interface EmployeeSurveyResponse {
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
  age: string;
  gender: string;
  wellnessActivitiesInterest: string[];
  participateWellnessActivities: string;
}

export const HrSurveyAnswers = (survey: Survey[]): HrSurveyResponse => {
  const hrSurvey =
    survey
      .find((s) => s.module === "HR/Administration Survey")
      ?.sections.flatMap((section) => section.questions) || [];

  return {
    industry: hrSurvey.find((q) => q.id === 1)?.answer || "",
    employeeCount: Number(hrSurvey.find((q) => q.id === 2)?.answer) || 0,
    avgHealthInsuranceClaims:
      Number(hrSurvey.find((q) => q.id === 3)?.answer) || 0,
    avgCostPerClaim: Number(hrSurvey.find((q) => q.id === 4)?.answer) || 0,
    avgAbsentDays: Number(hrSurvey.find((q) => q.id === 5)?.answer) || 0,
    dailyCompensation: Number(hrSurvey.find((q) => q.id === 6)?.answer) || 0,
    commonReasonsForAbsenteeism:
      hrSurvey.find((q) => q.id === 7)?.answerArr || [],
    wellnessGoals: hrSurvey.find((q) => q.id === 8)?.answerArr || [],
    preferredWellnessInitiatives:
      hrSurvey.find((q) => q.id === 9)?.answerArr || [],
  };
};

export const EmployeeSurveyAnswers = (
  survey: Survey[]
): EmployeeSurveyResponse => {
  const employeeSurvey =
    survey
      .find((s) => s.module === "Employee Engagement Survey")
      ?.sections.flatMap((section) => section.questions) || [];

  return {
    overallSatisfaction: employeeSurvey.find((q) => q.id === 1)?.answer || "",
    understandStrategy: employeeSurvey.find((q) => q.id === 2)?.answer || "",
    confidenceInLeadership:
      employeeSurvey.find((q) => q.id === 3)?.answer || "",
    leadershipCares: employeeSurvey.find((q) => q.id === 4)?.answer || "",
    planningOfObjectives: employeeSurvey.find((q) => q.id === 5)?.answer || "",
    effectiveCommunication:
      employeeSurvey.find((q) => q.id === 6)?.answer || "",
    valuesDiversity: employeeSurvey.find((q) => q.id === 7)?.answer || "",
    recognizedForWork: employeeSurvey.find((q) => q.id === 8)?.answer || "",
    treatedAsPeople: employeeSurvey.find((q) => q.id === 9)?.answer || "",
    spiritOfCooperation: employeeSurvey.find((q) => q.id === 10)?.answer || "",
    clearJobRole: employeeSurvey.find((q) => q.id === 11)?.answer || "",
    goodUseOfSkills: employeeSurvey.find((q) => q.id === 12)?.answer || "",
    partOfTeam: employeeSurvey.find((q) => q.id === 13)?.answer || "",
    workLifeBalance: employeeSurvey.find((q) => q.id === 14)?.answer || "",
    comfortableWorkConditions:
      employeeSurvey.find((q) => q.id === 15)?.answer || "",
    safeWorkEnvironment: employeeSurvey.find((q) => q.id === 16)?.answer || "",
    respectfulSupervisor: employeeSurvey.find((q) => q.id === 17)?.answer || "",
    constructiveFeedback: employeeSurvey.find((q) => q.id === 18)?.answer || "",
    adequateTraining: employeeSurvey.find((q) => q.id === 19)?.answer || "",
    encouragedCareerGrowth:
      employeeSurvey.find((q) => q.id === 20)?.answer || "",
    fairPay: employeeSurvey.find((q) => q.id === 21)?.answer || "",
    satisfiedWithBenefits:
      employeeSurvey.find((q) => q.id === 22)?.answer || "",
    proudToWorkHere: employeeSurvey.find((q) => q.id === 23)?.answer || "",
    environmentForBestWork:
      employeeSurvey.find((q) => q.id === 24)?.answer || "",
    age: employeeSurvey.find((q) => q.id === 25)?.answer || "",
    gender: employeeSurvey.find((q) => q.id === 26)?.answer || "",
    wellnessActivitiesInterest:
      employeeSurvey.find((q) => q.id === 27)?.answerArr || [],
    participateWellnessActivities:
      employeeSurvey.find((q) => q.id === 28)?.answer || "",
  };
};

export const isHRModuleCompleted = (survey: Survey[]): boolean => {
  const hrModule = survey.find(
    (module) => module.module === "HR/Administration Survey"
  );

  if (!hrModule) return false;

  const result = hrModule.sections.every((section) =>
    section.questions.every((question) => {
      if (question.type === "multi-select" || question.type === "ranking") {
        return question?.answerArr?.length! > 0;
      }
      return question?.answer?.trim() !== "";
    })
  );
  return result;
};

export const isEmployeeModuleCompleted = (survey: Survey[]): boolean => {
  const employeeModule = survey.find(
    (module) => module.module === "Employee Engagement Survey"
  );

  if (!employeeModule) return false;

  const result = employeeModule.sections.every((section) =>
    section.questions.every((question) => {
      if (question.type === "multi-select") {
        return question?.answerArr?.length! > 0;
      }
      return question?.answer?.trim() !== "";
    })
  );
  return result;
};
