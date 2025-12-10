// Automatically choose local backend OR deployed backend
export const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://mern-auth-backend-seven-theta.vercel.app";

// Reusable API wrapper
export const api = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    // Try to parse json, avoid crash on HTML error pages
    const data = await response.json().catch(() => ({}));

    return { res: response, data };
  } catch (err) {
    console.error("API Error:", err);
    return {
      res: null,
      data: { message: "Network or server error" },
    };
  }
};

export default API_BASE_URL;
