import { CheckEmployeeStatusAPI } from "../api/userApi/action";
import { decodeJWT } from "./decode";
import { CorporateType } from "./type";

export const IsAuthorised = (user: string): boolean => {
  const token = localStorage.getItem("token") as string;
  if (!token) return false;
  else if (user === "user") {
    const { role } = decodeJWT(token);
    if (!role) return false;
  } else if (user === "corporate") {
    const { corporate } = decodeJWT(token);
    if (!corporate?.role) return false;
  } else {
    return false;
  }
  return true;
};

export const getCorporateDetails = (): CorporateType | null => {
  const token = localStorage.getItem("token") as string;
  if (token) {
    const { corporate } = decodeJWT(token);
    return corporate;
  }
  return null;
};

export const checkEmployeeStatusFn = async (): Promise<boolean> => {
  const token = localStorage.getItem("token") as string;
  const result = decodeJWT(token);
  const { surveyCompletionStatus } = await CheckEmployeeStatusAPI(result._id);
  if (surveyCompletionStatus === "pending") {
    return true;
  }
  return false;
};
