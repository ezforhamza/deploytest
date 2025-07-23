// src/hooks/useAuth.js

import { useState } from "react";
import authService from "../services/auth/authService";

/**
 * Custom hook for signup and password reset operations
 * Note: Login state is managed by Zustand store (useAuthStore)
 */
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Clear error state
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Sign up a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Signup result
   */
  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.signup(userData);
      
      if (result.success) {
        return {
          success: true,
          user: result.user,
          message: result.message,
        };
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || "Signup failed. Please try again.";
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };




  /**
   * Forgot password
   * @param {string} email - User email
   * @returns {Promise<Object>} Result
   */
  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.forgotPassword(email);
      
      return {
        success: result.success,
        message: result.data?.message || "Password reset email sent!",
      };
    } catch (err) {
      const errorMessage = err.message || "Failed to send reset email. Please try again.";
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Verify OTP
   * @param {string} email - User email
   * @param {string} otp - OTP code
   * @returns {Promise<Object>} Result
   */
  const verifyOTP = async (email, otp) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.verifyOtp(email, otp);
      
      return {
        success: result.success,
        message: result.data?.message || "OTP verified successfully!",
      };
    } catch (err) {
      const errorMessage = err.message || "OTP verification failed. Please try again.";
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Reset password
   * @param {string} email - User email
   * @param {string} otp - OTP code
   * @param {string} password - New password
   * @param {string} confirmPassword - Confirm new password
   * @returns {Promise<Object>} Result
   */
  const resetPassword = async (email, otp, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.resetPassword(email, otp, password, confirmPassword);
      
      return {
        success: result.success,
        message: result.data?.message || "Password reset successful!",
      };
    } catch (err) {
      const errorMessage = err.message || "Password reset failed. Please try again.";
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Change password
   * @param {Object} passwordData - Password change data
   * @returns {Promise<Object>} Result
   */
  const changePassword = async (passwordData) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.changePassword(passwordData);
      
      return {
        success: result.success,
        message: result.data?.message || "Password changed successfully!",
      };
    } catch (err) {
      const errorMessage = err.message || "Password change failed. Please try again.";
      setError(errorMessage);
      
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    isLoading,
    error,

    // Actions
    signup,
    forgotPassword,
    verifyOTP,
    resetPassword,
    changePassword,
    clearError,
  };
};