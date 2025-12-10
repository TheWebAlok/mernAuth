import axios from "axios";

// Auto-select backend (local OR vercel)
export const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://mern-auth-backend-seven-theta.vercel.app";

// Axios instance
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// AUTH APIs
export const signup = (username, email, password) => {
  return API.post("/api/auth/register", { username, email, password });
};

export const login = (email, password) => {
  return API.post("/api/auth/login", { email, password });
};

export const forgotPassword = (emailOrUsername) => {
  return API.post("/api/auth/forgot-password", { emailOrUsername });
};

export const resetPassword = (userId, newPassword) => {
  return API.post("/api/auth/reset-password", { userId, newPassword });
};

export default API_BASE_URL;
