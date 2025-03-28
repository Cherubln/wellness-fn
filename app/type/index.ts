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
