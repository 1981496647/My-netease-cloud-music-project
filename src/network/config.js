export const devBaseURL = "http://localhost:3000";
export const proBaseURL = "https://my-music-api-gold.vercel.app";

export const BASE_URL =
  process.env.NODE_ENV === "development" ? devBaseURL : proBaseURL;
export const TIMEOUT = 5000;
