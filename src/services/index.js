// src/services/index.js

// Authentication services
export { default as authService } from "./auth/authService";
export { default as userService } from "./user/userService";
export { default as roleService } from "./userRole/roleService";
export { default as fileUploadService } from "./upload/fileUploadService";

// API utilities
export { default as apiClient, ApiError } from "./api/apiClient";
export { API_CONFIG, ENDPOINTS } from "./api/config";

// Hooks
export { useAuth } from "../hooks/useAuth";
export { useFileUpload } from "../hooks/useFileUpload";