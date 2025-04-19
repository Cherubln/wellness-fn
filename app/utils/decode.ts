export const decodeJWT = (token: string) => {
  try {
    const payload = token.split(".")[1];
    if (!payload) throw new Error("Invalid JWT format");

    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    
    const decodedPayload = JSON.parse(
      Buffer.from(base64, "base64").toString("utf-8")
    );
    return decodedPayload;
  } catch (error) {
    console.error("Invalid JWT Token", error);
    return null;
  }
};
