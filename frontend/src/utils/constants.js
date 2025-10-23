// backend/api/constants.js or frontend/src/utils/constants.js

// Base API URL (adjust depending on your setup)
export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5173/api";

// Token key for localStorage
export const TOKEN_KEY = "echelon_auth_token";

// Common messages
export const SUCCESS_MSG = "Operation completed successfully.";
export const ERROR_MSG = "Something went wrong. Please try again.";

// Time constants (optional)
export const TOKEN_EXPIRY_DAYS = 1;
