type QuestionType =
  | "text"
  | "number"
  | "dropdown"
  | "multi-select"
  | "ranking"
  | "likert"
  | "file";

export interface Question {
  id: number;
  question: string;
  answer?: string;
  answerArr?: string[];
  type: QuestionType;
  options?: string[];
}

interface Section {
  section: string;
  Details: string;
  questions: Question[];
}

export interface Survey {
  module: string;
  focus: string;
  sections: Section[];
}

export interface EmployeeSurvey {
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
  department: string;
  participation: string;
}

export const BaselineSurvey: Survey[] = [
  {
    module: "HR/Administration Survey",
    focus:
      "Corporate-level data like goals, absenteeism, claims, and wellness program expectations.",
    sections: [
      {
        section: "Corporate Details",
        Details:
          "help us customize your dashboard and ensure accurate tracking of progress and outcomes",
        questions: [
          {
            id: 1,
            answer: "",
            question: "What industry does your company operate in?",
            type: "dropdown",
            options: [
              "Public sector",
              "Education",
              "Retail",
              "Hospitality",
              "Health and medical services",
              "Technology",
              "NGO & non-profit organisation",
              "Finance",
              "Other",
            ],
          },
          {
            id: 2,
            answer: "",
            question: "How many employees does your company have?",
            type: "number",
            options: [],
          },
        ],
      },
      {
        section: "Claims and Absenteeism",
        Details:
          "Understanding your current claims and absenteeism rates is vital for calculating potential cost savings and health improvements.",
        questions: [
          {
            id: 3,
            answer: "",
            question:
              "What is the total number of health insurance claims made by employees per year?",
            type: "number",
            options: [],
          },
          {
            id: 4,
            answer: "",
            question:
              "What is the total amount of claims last year?? (Enter approximate amount in USD.)",
            type: "number",
            options: [],
          },
        ],
      },
      {
        section: "Claims and Absenteeism",
        Details:
          "Understanding your current claims and absenteeism rates is vital for calculating potential cost savings and health improvements.",
        questions: [
          {
            id: 5,
            answer: "",
            question:
              "How many days are employees absent each year due to health-related issues?",
            type: "number",
            options: [],
          },
          {
            id: 6,
            answer: "",
            question:
              "What is the approximate average daily compensation (salary + benefits) for your employees?",
            type: "number",
            options: [],
          },
        ],
      },
      {
        section: "Claims and Absenteeism",
        Details:
          "Understanding your current claims and absenteeism rates is vital for calculating potential cost savings and health improvements.",
        questions: [
          {
            id: 7,
            answerArr: [],
            question:
              "What are the most common reasons for health-related absenteeism?",
            type: "multi-select",
            options: ["Chronic illness", "Minor illness", "Stress", "Other"],
          },
        ],
      },
      {
        section: "Wellness Program Expectations",
        Details:
          "Let us know your main goals and preferred wellness initiatives, so we can design a program that aligns with your priorities.",
        questions: [
          {
            id: 8,
            answerArr: [
              "Reduce healthcare costs",
              "Improve employee satisfaction and morale",
              "Increase productivity",
              "Enhance employee retention",
            ],
            question:
              "What are your company’s main goals for a wellness program? (Rank the following in order of importance.)",
            type: "ranking",
            options: [
              "Reduce healthcare costs",
              "Improve employee satisfaction and morale",
              "Increase productivity",
              "Enhance employee retention",
            ],
          },
        ],
      },

      {
        section: "Wellness Program Expectations",
        Details:
          "Let us know your main goals and preferred wellness initiatives, so we can design a program that aligns with your priorities.",
        questions: [
          {
            id: 9,
            answerArr: [],
            question:
              "What types of wellness initiatives would your company prefer?",
            type: "multi-select",
            options: [
              "Fitness programs",
              "Mental health support",
              "Nutrition counseling",
              "Diagnostic services",
              "Community challenges",
              "Other",
            ],
          },
        ],
      },
      {
        section: "Upload employee file",
        Details: "upload an Excel/CSV file containing employee emails.",
        questions: [
          {
            id: 10,
            answer: "upload",
            question: "Upload a file",
            type: "file",
            options: [],
          },
        ],
      },
    ],
  },

  {
    module: "Employee Engagement Survey",
    focus:
      "Satisfaction with organizational leadership, culture, work environment, and benefits.",
    sections: [
      {
        section: "Overall Satisfaction",
        Details: "Tell us about your general feelings toward the organization.",
        questions: [
          {
            id: 1,
            answer: "",
            question: "Overall, how satisfied are you with your employer?",
            type: "likert",
          },
        ],
      },
      {
        section: "Leadership and Planning",
        Details:
          "Leadership sets the tone for culture and strategy. We want to know how well leadership supports you.",
        questions: [
          {
            id: 2,
            answer: "",
            question:
              "I understand the long-term strategy of this organization.",
            type: "likert",
          },
          {
            id: 3,
            answer: "",
            question:
              "I have confidence in the leadership of this organization.",
            type: "likert",
          },
        ],
      },
      {
        section: "Leadership and Planning",
        Details:
          "Leadership sets the tone for culture and strategy. We want to know how well leadership supports you.",
        questions: [
          {
            id: 4,
            answer: "",
            question:
              "The leaders of this organization care about employee well-being.",
            type: "likert",
          },
          {
            id: 5,
            answer: "",
            question: "There is adequate planning of departmental objectives.",
            type: "likert",
          },
        ],
      },
      {
        section: "Corporate Culture",
        Details: "A strong culture fosters collaboration and recognition.",
        questions: [
          {
            id: 6,
            answer: "",
            question:
              "This organization communicates frequently and effectively.",
            type: "likert",
          },
          {
            id: 7,
            answer: "",
            question: "This organization values diversity and inclusion.",
            type: "likert",
          },
          {
            id: 8,
            answer: "",
            question: "I feel recognized for the work I do.",
            type: "likert",
          },
        ],
      },
      {
        section: "Corporate Culture",
        Details: "A strong culture fosters collaboration and recognition.",
        questions: [
          {
            id: 9,
            answer: "",
            question: "Employees are treated as people, not numbers.",
            type: "likert",
          },
          {
            id: 10,
            answer: "",
            question:
              "I feel there is a spirit of cooperation within the organization.",
            type: "likert",
          },
        ],
      },
      {
        section: "Role-Specific Feedback",
        Details:
          "Share how your role and responsibilities impact your engagement.",
        questions: [
          {
            id: 11,
            answer: "",
            question: "I have a clear understanding of my job role.",
            type: "likert",
          },
          {
            id: 12,
            answer: "",
            question: "My job makes good use of my skills and abilities.",
            type: "likert",
          },
        ],
      },
      {
        section: "Role-Specific Feedback",
        Details:
          "Share how your role and responsibilities impact your engagement.",
        questions: [
          {
            id: 13,
            answer: "",
            question: "I feel part of a team working toward shared goals.",
            type: "likert",
          },
          {
            id: 14,
            answer: "",
            question: "I can maintain a reasonable work-life balance.",
            type: "likert",
          },
        ],
      },
      {
        section: "Work Environment",
        Details: "Physical and emotional safety are key to engagement.",
        questions: [
          {
            id: 15,
            answer: "",
            question: "My physical work conditions are comfortable.",
            type: "likert",
          },
          {
            id: 16,
            answer: "",
            question: "I feel safe in my work environment.",
            type: "likert",
          },
        ],
      },
      {
        section: "Supervisor Relationship",
        Details:
          "A supportive supervisor can greatly influence job satisfaction.",
        questions: [
          {
            id: 17,
            answer: "",
            question: "My supervisor treats me with respect and fairness.",
            type: "likert",
          },
          {
            id: 18,
            answer: "",
            question: "My supervisor provides constructive feedback.",
            type: "likert",
          },
        ],
      },
      {
        section: "Training and Development",
        Details: "Opportunities for growth keep you motivated and committed.",
        questions: [
          {
            id: 19,
            answer: "",
            question:
              "I receive adequate training to perform my job effectively.",
            type: "likert",
          },
          {
            id: 20,
            answer: "",
            question:
              "I am encouraged to pursue career growth within the organization.",
            type: "likert",
          },
        ],
      },
      {
        section: "Pay and Benefits",
        Details: "Fair compensation and competitive benefits are essential.",
        questions: [
          {
            id: 21,
            answer: "",
            question: "My pay is fair for the work I perform.",
            type: "likert",
          },
          {
            id: 22,
            answer: "",
            question:
              "I am satisfied with the benefits provided by my organization.",
            type: "likert",
          },
        ],
      },
      {
        section: "Overall Employment Experience",
        Details:
          "Finally, let us know your overall sense of belonging and pride.",
        questions: [
          {
            id: 23,
            answer: "",
            question: "I am proud to work for this organization.",
            type: "likert",
          },
          {
            id: 24,
            answer: "",
            question:
              "I feel this organization has created an environment where I can do my best work.",
            type: "likert",
          },
        ],
      },
      {
        section: "Demographics - User Profile",
        Details: "user profile",
        questions: [
          {
            id: 25,
            answer: "",
            question: "What is your age?",
            type: "dropdown",
            options: ["18-24", "25-34", "35-44", "45-54", "55+"],
          },
          {
            id: 26,
            answer: "",
            question: "What is your gender?",
            type: "dropdown",
            options: ["Male", "Female", "Non-binary", "Prefer not to say"],
          },
        ],
      },
      {
        section: "Program Preferences",
        Details: "Tell us which wellness offerings you’d most likely join.",
        questions: [
          {
            id: 27,
            answerArr: [],
            question: "Which wellness activities interest you the most?",
            type: "multi-select",
            options: [
              "Virtual fitness sessions",
              "Nutrition counseling",
              "Group challenges",
              "Mental health support",
              "Other",
            ],
          },
        ],
      },
      {
        section: "Program Preferences",
        Details: "Tell us which wellness offerings you’d most likely join.",
        questions: [
          {
            id: 28,
            answer: "",
            question: "How often would you participate in wellness activities?",
            type: "dropdown",
            options: ["Daily", "Weekly", "Monthly", "Rarely"],
          },
        ],
      },
    ],
  },
];
