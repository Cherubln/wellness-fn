export function ExtractDateTime(isoString:string) {
  const dateObj = new Date(isoString);

  // Extract Date
  const date = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD format

  // Extract Time in 24-hour format
  const time24 = dateObj.toTimeString().slice(0, 5); // HH:MM format

  // Convert to 12-hour format
  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12 for 12 AM

  const time12 = `${hours}:${minutes} ${ampm}`;

  return { date, time24, time12 };
}

