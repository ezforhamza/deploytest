// src/services/auth/authService.js

import apiClient, { ApiError } from "../api/apiClient";
import { ENDPOINTS } from "../api/config";
import { validateSignupData, isValidEmail } from "./validators/signupValidator.js";
import { transformSignupData } from "./transformers/signupDataTransformer.js";
import {
  getErrorMessage,
  handleForgotPasswordError,
  handleOtpError,
  handlePasswordResetError,
  handleLoginError,
} from "./utils/errorHandler.js";
import tokenManager from "./utils/tokenManager.js";

/**
 * Authentication Service
 * Handles all authentication-related API operations
 */
class AuthService {
  constructor() {
    this.currentUser = null;
    // Initialize token from localStorage
    tokenManager.initializeToken();
  }

  /**
   * Sign up a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Signup response
   */
  async signup(userData) {
    try {
      // Validate required fields
      validateSignupData(userData);

      // Transform form data to API format
      const apiPayload = transformSignupData(userData);

      console.log("🚀 Sending signup request:", apiPayload);
      console.log("🔍 Request details:", {
        url: ENDPOINTS.AUTH.SIGNUP,
        method: "POST",
        payload: apiPayload,
      });

      const response = await apiClient.post(ENDPOINTS.AUTH.SIGNUP, apiPayload);

      // Handle successful signup
      if (response.success) {
        console.log("✅ Signup successful:", response.data);

        // Store auth token if provided
        if (response.data.token) {
          tokenManager.setAuthToken(response.data.token);
        }

        // Store user data
        this.currentUser = response.data.user;

        return {
          success: true,
          user: response.data.user,
          token: response.data.token,
          message: response.data.message || "Account created successfully!",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Signup failed:", error);
      console.error("❌ Error details:", {
        status: error.status,
        message: error.message,
        data: error.data,
      });

      // Transform API error to user-friendly message
      const errorMessage = getErrorMessage(error);

      throw new ApiError(errorMessage, error.status, error.data);
    }
  }

  /**
   * Login user
   * @param {Object} loginData - Login credentials
   * @returns {Promise<Object>} Login response
   */
  async login(loginData) {
    try {
      console.log("🔄 Sending login request for:", loginData.email);

      const response = await apiClient.post(ENDPOINTS.AUTH.LOGIN, loginData);

      console.log("📥 Login response:", response);

      if (response.success && response.data?.data) {
        // Store auth token (it's called accessToken in the API response)
        const token = response.data.data.accessToken;
        const user = response.data.data.user;

        tokenManager.setAuthToken(token);
        this.currentUser = user;

        console.log("✅ Login successful for user:", user.email);

        return {
          success: true,
          user: user,
          token: token,
          message: "Login successful!",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Login failed:", error);
      return handleLoginError(error);
    }
  }

  /**
   * Google login
   * @param {Object} googleData - Google auth data
   * @returns {Promise<Object>} Login response
   */
  async googleLogin(googleData) {
    try {
      const response = await apiClient.post(
        ENDPOINTS.AUTH.GOOGLE_LOGIN,
        googleData
      );

      if (response.success) {
        tokenManager.setAuthToken(response.data.token);
        this.currentUser = response.data.user;

        return {
          success: true,
          user: response.data.user,
          token: response.data.token,
          message: response.data.message || "Google login successful!",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Google login failed:", error);
      throw new ApiError(getErrorMessage(error), error.status, error.data);
    }
  }

  /**
   * Change password
   * @param {Object} passwordData - Password change data
   * @returns {Promise<Object>} Response
   */
  async changePassword(passwordData) {
    try {
      const response = await apiClient.post(
        ENDPOINTS.AUTH.CHANGE_PASSWORD,
        passwordData
      );
      return response;
    } catch (error) {
      console.error("❌ Password change failed:", error);
      throw new ApiError(getErrorMessage(error), error.status, error.data);
    }
  }

  /**
   * Logout user
   */
  logout() {
    tokenManager.clearAuthToken();
    this.currentUser = null;
  }

  /**
   * Set authentication token
   * @param {string} token - Auth token
   */
  setAuthToken(token) {
    tokenManager.setAuthToken(token);
  }

  /**
   * Get authentication token
   * @returns {string|null} Auth token
   */
  getAuthToken() {
    return tokenManager.getAuthToken();
  }

  /**
   * Clear authentication token
   */
  clearAuthToken() {
    tokenManager.clearAuthToken();
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  isAuthenticated() {
    return tokenManager.isAuthenticated();
  }

  /**
   * Get current user
   * @returns {Object|null} Current user data
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Send forgot password OTP
   * @param {string} email - User email
   * @returns {Promise<Object>} API response
   */
  async forgotPassword(email) {
    try {
      if (!email) {
        throw new Error("Email is required");
      }

      // Validate email format
      if (!isValidEmail(email)) {
        throw new Error("Invalid email format");
      }

      console.log("🔄 Sending forgot password request for:", email);

      const response = await apiClient.post(ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email: email,
      });

      if (response.success) {
        console.log("✅ Forgot password OTP sent successfully");
        return {
          success: true,
          message: response.data || "Forget Password OTP sent successfully",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Forgot password failed:", error);
      return handleForgotPasswordError(error);
    }
  }

  /**
   * Verify OTP
   * @param {string} email - User email
   * @param {string} otp - OTP code
   * @returns {Promise<Object>} API response
   */
  async verifyOtp(email, otp) {
    try {
      if (!email || !otp) {
        throw new Error("Email and OTP are required");
      }

      if (otp.length !== 6) {
        throw new Error("OTP must be 6 digits");
      }

      console.log("🔄 Verifying OTP for:", email);

      const response = await apiClient.post(ENDPOINTS.AUTH.VERIFY_OTP, {
        email: email,
        otp: otp,
      });

      if (response.success) {
        console.log("✅ OTP verified successfully");
        return {
          success: true,
          message: "OTP verified successfully",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ OTP verification failed:", error);
      return handleOtpError(error);
    }
  }

  /**
   * Reset password
   * @param {string} email - User email
   * @param {string} otp - OTP code
   * @param {string} password - New password
   * @param {string} confirmPassword - Confirm new password
   * @returns {Promise<Object>} API response
   */
  async resetPassword(email, otp, password, confirmPassword) {
    try {
      if (!email || !otp || !password || !confirmPassword) {
        throw new Error("All fields are required");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      if (otp.length !== 6) {
        throw new Error("OTP must be 6 digits");
      }

      console.log("🔄 Resetting password for:", email);

      const response = await apiClient.post(ENDPOINTS.AUTH.RESET_PASSWORD, {
        email: email,
        otp: otp,
        password: password,
        confirmPassword: confirmPassword,
      });

      if (response.success) {
        console.log("✅ Password reset successfully");
        return {
          success: true,
          message: "Password reset successfully",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Password reset failed:", error);
      return handlePasswordResetError(error);
    }
  }
}

// Export singleton instance
export default new AuthService();