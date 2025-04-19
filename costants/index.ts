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
  range?: string[];
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
              "What is the total amount of claims last year? (Enter approximate amount in USD.)",
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
              "How many days were employees absent each year due to health-related issues?",
            type: "number",
            options: [],
          },
          {
            id: 6,
            answer: "",
            question:
              "What is the approximate average daily compensation (salary + benefits) for your employees? (Enter approximate amount in USD.)",
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
              "What are the most common reasons for health-related absenteeism? (Select all that apply.)",
            type: "multi-select",
            options: ["Chronic illness", "Minor illness", "Stress", "Other"],
          },
        ],
      },
      {
        section: "Claims and Absenteeism",
        Details:
          "Understanding your current claims and absenteeism rates is vital for calculating potential cost savings and health improvements.",
        questions: [
          {
            id: 8,
            answer: "",
            question:
              "What mental health resources or stress management initiatives does your company currently offer?",
            type: "text",
            options: [],
          },
          {
            id: 9,
            answer: "",
            question:
              "How does the company address workplace stress or mental health challenges?",
            type: "text",
            options: [],
          },
        ],
      },
      {
        section: "Wellness Program Expectations",
        Details:
          "Let us know your main goals and preferred wellness initiatives, so we can design a program that aligns with your priorities.",
        questions: [
          {
            id: 10,
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
            id: 11,
            answerArr: [],
            question:
              "What types of wellness initiatives would your company prefer? (Select all that apply.)",
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
            id: 12,
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
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 3,
            answer: "",
            question:
              "I have confidence in the leadership of this organization.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 5,
            answer: "",
            question: "There is adequate planning of departmental objectives.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 7,
            answer: "",
            question: "This organization values diversity and inclusion.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 8,
            answer: "",
            question: "I feel recognized for the work I do.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 10,
            answer: "",
            question:
              "I feel there is a spirit of cooperation within the organization.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 12,
            answer: "",
            question: "My job makes good use of my skills and abilities.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 14,
            answer: "",
            question: "I can maintain a reasonable work-life balance.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 16,
            answer: "",
            question: "I feel safe in my work environment.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 18,
            answer: "",
            question: "My supervisor provides constructive feedback.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 20,
            answer: "",
            question:
              "I am encouraged to pursue career growth within the organization.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 22,
            answer: "",
            question:
              "I am satisfied with the benefits provided by my organization.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
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
            range: ["Strongly Disagree", "Strongly Agree"],
          },
          {
            id: 24,
            answer: "",
            question:
              "I feel this organization has created an environment where I can do my best work.",
            type: "likert",
            range: ["Strongly Disagree", "Strongly Agree"],
          },
        ],
      },
      {
        section: "Mental Health Section",
        Details:
          "This section helps us understand mental wellness structures , gaps and opportunities at your work place.",
        questions: [
          {
            id: 25,
            answer: "",
            question:
              "How frequently do you experience work-related stress or anxiety?",
            type: "likert",
            range: ["Very Often ", "Never"],
          },
          {
            id: 26,
            answer: "",
            question:
              "What are the primary sources of stress in your work environment?",
            type: "text",
          },
        ],
      },
      {
        section: "Mental Health Section",
        Details:
          "Finally, let us know your overall sense of belonging and pride.",
        questions: [
          {
            id: 27,
            answer: "",
            question:
              "How effective do you find the current mental health support available?",
            type: "likert",
            range: [" No support", "Super supportive"],
          },
          {
            id: 28,
            answer: "",
            question: "How can the company support your mental wellbeing?",
            type: "text",
          },
        ],
      },

      {
        section: "Demographics - User Profile",
        Details: "user profile",
        questions: [
          {
            id: 29,
            answer: "",
            question: "What is your age?",
            type: "dropdown",
            options: ["18-24", "25-34", "35-44", "45-54", "55+"],
          },
          {
            id: 30,
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
            id: 31,
            answerArr: [],
            question:
              "Which wellness activities interest you the most? (Select all that apply.)",
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
            id: 32,
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

export const mockDailySteps = [
  { day: "Mon", steps: 1432, goal: 10000 },
  { day: "Tue", steps: 8567, goal: 10000 },
  { day: "Wed", steps: 7890, goal: 10000 },
  { day: "Thu", steps: 5123, goal: 10000 },
  { day: "Fri", steps: 1456, goal: 10000 },
  { day: "Sat", steps: 6789, goal: 10000 },
  { day: "Sun", steps: 2876, goal: 10000 },
];

export const mockWeeklySteps = [
  { week: "Week 1", steps: 16789 },
  { week: "Week 2", steps: 62345 },
  { week: "Week 3", steps: 48901 },
  { week: "Week 4", steps: 27890 },
];

export const mockMonthlySteps = [
  { month: "Jan", steps: 1456 },
  { month: "Feb", steps: 5678 },
  { month: "Mar", steps: 67890 },
  { month: "Apr", steps: 256789 },
  { month: "May", steps: 178901 },
  { month: "Jun", steps: 289012 },
];

export const mockLeaderboard = [
  {
    id: 1,
    name: "Sarah Johnson",
    steps: 12567,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    steps: 11982,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "You",
    steps: 10567,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 4,
    name: "David Wilson",
    steps: 9876,
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 5,
    name: "Emma Rodriguez",
    steps: 9234,
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
];

export const PackagePeriod = ["Quarterly", "Annually"];

export const PackagePlans = [
  {
    period: "Annually",
    data: [
      {
        name: "Basic Package",
        description: "Best for companies looking for wellness insights",
        popular: true,
        features: [
          "Corporate Wellness Baseline Survey",
          "Results Analysis",
          "Comprehensive Report with key insights",
          "Presentation of Results – Corporate Wellness Index, Employee Engagement Score, and Recommendations",
        ],
        pricing: {
          "1-50 Employees": 1000,
          "51-100 Employees": 2000,
          "101-150 Employees": 3000,
          "150+ Employees": "Custom Pricing",
        },
      },
      {
        name: "Premium Package",
        description:
          "Ideal for companies that want full wellness engagement & employee participation",
        popular: false,
        features: [
          "Everything in Basic Package",
          "Access to BimaFlow Dashboard for real-time insights",
          "Employee Onboarding to The Biggest Health Challenge (Gamified wellness engagement)",
          "Ongoing support & quarterly wellness assessments",
        ],
        pricing: {
          "1-50 Employees": 4000,
          "51-100 Employees": 8000,
          "101-150 Employees": 12000,
          "150+ Employees": "Custom Pricing",
        },
      },
    ],
  },
  {
    period: "Quarterly",
    data: [
      {
        name: "Basic Package",
        description: "Best for companies looking for wellness insights",
        popular: false,
        features: [
          "Corporate Wellness Baseline Survey",
          "Results Analysis",
          "Comprehensive Report with key insights",
          "Presentation of Results – Corporate Wellness Index, Employee Engagement Score, and Recommendations",
        ],
        pricing: {
          "1-50 Employees": 200,
          "51-100 Employees": 200,
          "101-150 Employees": 200,
          // "150+ Employees": "Custom Pricing",
        },
      },
      {
        name: "Premium Package",
        description:
          "Ideal for companies that want full wellness engagement & employee participation",
        popular: true,
        features: [
          "Everything in Basic Package",
          "Access to BimaFlow Dashboard for real-time insights",
          "Employee Onboarding to The Biggest Health Challenge (Gamified wellness engagement)",
          "Ongoing support & quarterly wellness assessments",
        ],
        pricing: {
          "1-50 Employees": 600,
          "51-100 Employees": 1200,
          "101-150 Employees": 1800,
          "150+ Employees": "Custom Pricing",
        },
      },
    ],
  },
];

export const BasicPackage = [
  "HR department will click the Proceed to Signup button below and fill out the first section.",
  "Employees will receive a secure link to complete Modules 2 & 3.",
  "After data collection, a detailed report will be compiled and presented.",
  "Your Corporate Wellness Index and recommendations will be shared.",
  "Click Proceed to complete signup.",
];

export const PremiumPacakage = [
  "HR will proceed to sign up and complete Module 1, and employees will complete Modules 2 & 3.",
  "Your Corporate Wellness Report will be compiled and presented.",
  "You’ll be directed to the BimaFlow Dashboard for live wellness tracking.",
  "We will onboard employees to The Biggest Health Challenge to drive engagement.",
  "Ongoing quarterly assessments and wellness support will be available.",
  "Click Proceed to complete signup.",
];

export const stepMessages = [
  {
    range: [1, 5000],
    message:"➡️ That translates to 20,000 steps per month! That’s like walking the entire perimeter of Karura Forest! 🌳 🌿 Imagine yourself enjoying the fresh air and scenic trails—start today!",
  },
  {
    range: [5000, 10000],
    message:
      "➡️ That’s 40,000 steps per month—equivalent to walking from Nairobi to Lake Elementaita in Naivasha! 🌊 🐦 Picture yourself walking towards a weekend by the lake… start today!",
  },
  {
    range: [10000, 15000],
    message:
      "➡️ Your steps add up to 60,000 in a month—enough to trek from Nairobi to the peak of Mt. Longonot and back! ⛰️ 🔥 One step at a time, and you’ll reach new heights—keep going!",
  },
  {
    range: [15000, 20000],
    message:
      "➡️ That’s 80,000 steps per month—the same as walking from Nairobi to Nanyuki, the base of Mt. Kenya! 🏔️ 🌲 Keep pushing, and soon you’ll be standing tall in your fitness journey!",
  },
  {
    range: [20000, 25000],
    message:
      "➡️ That’s 100,000 steps in a month—enough to walk around the entire shoreline of Lake Naivasha! 🚣‍♂️ 🦩 You’re making waves—stay consistent!",
  },
  {
    range: [25000, 30000],
    message:
      "➡️ 120,000 steps per month could take you from Nairobi to the equator in Nanyuki! 🌍 ☀️ You’re crossing new frontiers—keep moving forward!",
  },
  {
    range: [30000, 35000],
    message:
      "➡️ That’s 140,000 steps in a month—like walking from Nairobi to Amboseli National Park! 🐘 ⛅ Imagine the breathtaking view of Mt. Kilimanjaro as you keep stepping!",
  },
  {
    range: [35000, 40000],
    message:
      "➡️ You’d have walked 160,000 steps—enough to get you from Nairobi to Kisumu’s Lake Victoria shores! 🚤 🐟 Your journey to better health is just as rewarding—keep going!",
  },
  {
    range: [40000, 45000],
    message:
      "➡️ That’s 180,000 steps per month—the same as trekking from Nairobi to the Great Rift Valley viewpoint and back! 🌄 The view from the top is worth it—keep stepping!",
  },
  {
    range: [45000, 50000],
    message:
      "➡️ You’d have covered the distance from Nairobi to Mombasa—on foot! 🏖️ 🌊 A journey of a thousand miles starts with a single step—stay consistent!",
  },
  {
    range: [50001, Infinity],
    message:
      "➡️ Your steps could take you from Kenya to Tanzania’s Serengeti! 🦓 🌿 You’re walking the path of champions—keep it up and explore new limits!",
  },
];