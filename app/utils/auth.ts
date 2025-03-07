import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export const isTokenValid = (): boolean => {
  try {
    const token = localStorage.getItem("token")!;
    if (!token) return false;
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

