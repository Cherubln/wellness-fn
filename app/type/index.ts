export type sessionType = {
  sessionDate?: string | false;
  sessionTime?: string | false;
  slots?: number;
  recurring?: boolean;
  recurringPattern?: {
    daysOfWeek?: string[];
    frequency?: string;
  };
};

type ServiceProvider = {
  _id: string;
  name: string;
  email: string;
  logo: string;
  whatsappLink?: string;
  instagramLink?: string;
};
type RecurringPattern = {
  daysOfWeek: string[];
  startDate: string;
  endDate: string;
  frequency: "daily" | "weekly" | "monthly";
};

export type SessionTypeResponse = {
  _id: string;
  service: string;
  sessionTime: string;
  sessionDate: string;
  slots: number;
  bookedSlots: number;
  status: "open" | "closed";
  recurring: boolean;
  recurringPattern?: RecurringPattern;
  createdAt: string;
  updatedAt: string;
};

export type ServiceType = {
  _id: string;
  activityName: string;
  additionalInfo: string;
  address: string;
  category: string;
  description: string;
  images: string[];
  location: string[];
  price: number;
  priceType: string;
  provider: ServiceProvider;
  sessions: SessionTypeResponse[];
  availability: string;
};

export type BookingDataType = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  numberOfSlots: number;
  dateBooked?: string;
  user: string;
  session: {
    _id: string;
    bookedSlots: number;
    createdAt: string;
    sessionDate: string;
    sessionTime: string;
    slots: number;
    status: string;
    updatedAt: string;
    recurring: boolean;
    recurringPattern?: { daysOfWeek: number[]; frequency?: string };
    service: {
      _id: string;
      activityName: string;
      additionalInfo?: string;
      description: string;
      location: string[];
    };
  };
};

export type UserData = {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  role: "user" | "admin" | string;
  status: "active" | "inactive" | string;
  points: number;
  favoriteActivity: string;
  groups: string[];
  hasScanned: string[];
  teamRole: string;
  surveyCompletionStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TeamType = {
  groupName: string;
  members: string[];
  admin: string;
  teamColor: string;
};

export type RiddleChallengetype = {
  newRiddle: {
    id: string;
    riddle: string;
    hint: string;
    task: {
      description: string;
      type: string;
    };
  };
  startTime: string;
  endTime: string;
};

export type WonderlandTeamType = {
  _id: string;
  admin: string;
  createdAt: string;
  updatedAt: string;
  groupName: string;
  teamColor: string;
  groupPoints: number;
  groupScans: string[];
  riddles: string[];
  members: string[];
  totalRiddles: number;
  currentRiddle: {
    id: string;
    riddle: string;
    hint: string;
    riddleQrCodeUrl: string;
    task: {
      description: string;
      taskCompletionCode: number;
      type: string;
    };
  };
  currentRiddleEndTime: string;
  currentRiddleStartTime: string;
  totalTimeUsed: number;
  __v: number;
};

export type RiddleCompletionResponseType = {
  message: string;
  pointsEarned: number;
  totalPoints: number;
  totalTimeUsed: number;
};
