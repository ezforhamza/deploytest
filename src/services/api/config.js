// src/services/api/config.js

/**
 * API Configuration
 * Centralized configuration for all API endpoints and settings
 */

// Get environment variables (Vite uses import.meta.env)
const getEnvVar = (key, defaultValue) => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env[key] || defaultValue;
  }
  // Fallback for non-Vite environments
  return defaultValue;
};

// Get current environment
const ENV = getEnvVar("VITE_NODE_ENV", "development");
const BASE_URL = getEnvVar("VITE_API_BASE_URL", "http://194.195.92.92/alumni-backend/api/v1");
const FILE_STORAGE_BASE_URL = getEnvVar("VITE_FILE_STORAGE_BASE_URL", "http://194.195.92.92/alumni-backend/api/v1");
const FILE_STORAGE_URL = getEnvVar("VITE_FILE_STORAGE_URL", "http://194.195.92.92/alumni-backend/uploads");

// API Configuration
export const API_CONFIG = {
  BASE_URL,
  FILE_STORAGE_BASE_URL,
  FILE_STORAGE_URL,
  TIMEOUT: 10000, // 10 seconds
  HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  ENV,
};

// API Endpoints
export const ENDPOINTS = {
  // Authentication
  AUTH: {
    ROLES: "/role/list",
    LOGIN: "/auth/login",
    SIGNUP: "/user/sign-up",
    GOOGLE_LOGIN: "/auth/google-login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
  },

  // File uploads
  UPLOADS: {
    IMAGE: "/uploads/image", // For image uploads
    DOCUMENT: "/uploads/document/file", // For document uploads
    DELETE: "/uploads/delete",
  },

  // User management
  USER: {
    PROFILE: "/user/update-profile",
    SETUP_ACCOUNT: "/user/setup-account",
    GET_USER: "/user",
  },
};

// Default role descriptions (fallback)
export const DEFAULT_ROLE_DESCRIPTIONS = {
  alumni: "Join your alumni network",
  company: "Build your professional network",
  school: "For educational institutions",
};
