// api.js
import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export const api = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
    const data = await response.json().catch(() => ({}));
    return { res: response, data };
  } catch (err) {
    console.error("API Error:", err);
    return { res: null, data: { message: "Network or server error" } };
  }
};

export const signup = (username, email, password) => {
  return api("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
  });
};

export const login = (email, password) => {
  return api("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
