import { ServiceType, UserData } from "../type";

export function isValidDate(dateString: string): boolean {
  // Try to parse the string as a Date object
  const date = new Date(dateString);

  // Check if it's a valid date
  return !isNaN(date.getTime()) && dateString === date.toISOString();
}

export const calculateTotalBookingsAndSlots = (services: ServiceType[]) => {
  let totalBookings = 0;
  let totalSlots = 0;

  services.forEach((service) => {
    service.sessions.forEach((session) => {
      totalBookings += session.bookedSlots;
      totalSlots += session.slots;
    });
  });

  return { totalBookings, totalSlots };
};

export const calculateServiceBookingsAndSlots = (service: ServiceType) => {
  let totalBookings = 0;
  let totalSlots = 0;

  service.sessions.forEach((session) => {
    totalBookings += session.bookedSlots;
    totalSlots += session.slots;
  });

  const remainingSlots = totalSlots - totalBookings;

  return { totalBookings, totalSlots, remainingSlots };
};

export function getLastDigits(range?: string): number {
  if (!range) return NaN; // Handle undefined or empty input safely
  const parts = range.split("-");
  return parts.length > 1 ? parseInt(parts[1].replace(/,/g, ""), 10) : NaN;
}

export const extractUserInfo = (users: UserData[]) => {
  return users
    .filter((user) => user.email && user.fullname)
    .map((user) => ({
      id: user._id,
      fullname: user.fullname.trim(),
      email: user.email.trim(),
    }));
};
