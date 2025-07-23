// src/services/user/userService.js

import apiClient, { ApiError } from "../api/apiClient";
import { ENDPOINTS } from "../api/config";

/**
 * User Service
 * Handles user profile and account setup operations
 */
class UserService {
  constructor() {
    this.currentUser = null;
  }

  /**
   * Setup user account with additional information
   * @param {Object} accountData - Account setup data
   * @returns {Promise<Object>} Response
   */
  async setupAccount(accountData) {
    try {
      // Validate account data
      this.validateAccountData(accountData);

      // Transform data to API format
      const apiPayload = this.transformAccountData(accountData);

      console.log("🚀 Sending account setup request:", apiPayload);

      const response = await apiClient.put(ENDPOINTS.USER.SETUP_ACCOUNT, apiPayload);

      if (response.success) {
        console.log("✅ Account setup successful:", response.data);
        
        // Update current user data
        this.currentUser = { ...this.currentUser, ...response.data.user };

        return {
          success: true,
          user: response.data.user,
          message: response.data.message || "Account setup completed successfully!",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Account setup failed:", error);
      throw new ApiError(
        this.getErrorMessage(error),
        error.status,
        error.data
      );
    }
  }

  /**
   * Update user profile
   * @param {Object} profileData - Profile update data
   * @returns {Promise<Object>} Response
   */
  async updateProfile(profileData) {
    try {
      const response = await apiClient.put(ENDPOINTS.USER.PROFILE, profileData);

      if (response.success) {
        console.log("✅ Profile updated successfully:", response.data);
        
        // Update current user data
        this.currentUser = { ...this.currentUser, ...response.data.user };

        return {
          success: true,
          user: response.data.user,
          message: response.data.message || "Profile updated successfully!",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Profile update failed:", error);
      throw new ApiError(
        this.getErrorMessage(error),
        error.status,
        error.data
      );
    }
  }

  /**
   * Get user profile
   * @returns {Promise<Object>} User profile data
   */
  async getProfile() {
    try {
      const response = await apiClient.get(ENDPOINTS.USER.GET_USER);

      if (response.success) {
        this.currentUser = response.data.user;
        return {
          success: true,
          user: response.data.user,
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Failed to get profile:", error);
      throw new ApiError(
        this.getErrorMessage(error),
        error.status,
        error.data
      );
    }
  }

  /**
   * Upload user documents (CV, certificates, etc.)
   * @param {File} file - File to upload
   * @param {string} type - Document type (cv, certificate, etc.)
   * @returns {Promise<Object>} Upload response
   */
  async uploadDocument(file, type = "document") {
    try {
      const response = await apiClient.uploadFile(
        ENDPOINTS.UPLOADS.DOCUMENT,
        file,
        type
      );

      if (response.success) {
        console.log("✅ Document uploaded successfully:", response.data);
        
        return {
          success: true,
          fileUrl: response.data.fileUrl,
          fileName: response.data.fileName,
          message: response.data.message || "Document uploaded successfully!",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Document upload failed:", error);
      throw new ApiError(
        this.getErrorMessage(error),
        error.status,
        error.data
      );
    }
  }

  /**
   * Upload profile image
   * @param {File} file - Image file
   * @returns {Promise<Object>} Upload response
   */
  async uploadProfileImage(file) {
    try {
      const response = await apiClient.uploadFile(
        ENDPOINTS.UPLOADS.IMAGE,
        file,
        "image"
      );

      if (response.success) {
        console.log("✅ Profile image uploaded successfully:", response.data);
        
        return {
          success: true,
          imageUrl: response.data.imageUrl,
          message: response.data.message || "Profile image uploaded successfully!",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ Profile image upload failed:", error);
      throw new ApiError(
        this.getErrorMessage(error),
        error.status,
        error.data
      );
    }
  }

  /**
   * Delete uploaded file
   * @param {string} fileUrl - File URL to delete
   * @returns {Promise<Object>} Response
   */
  async deleteFile(fileUrl) {
    try {
      const response = await apiClient.delete(ENDPOINTS.UPLOADS.DELETE, { fileUrl });

      if (response.success) {
        console.log("✅ File deleted successfully");
        return {
          success: true,
          message: response.data.message || "File deleted successfully!",
        };
      }

      return response;
    } catch (error) {
      console.error("❌ File deletion failed:", error);
      throw new ApiError(
        this.getErrorMessage(error),
        error.status,
        error.data
      );
    }
  }

  /**
   * Validate account setup data
   * @param {Object} accountData - Account data to validate
   */
  validateAccountData(accountData) {
    const { accountType } = accountData;

    if (!accountType) {
      throw new Error("Account type is required");
    }

    // Alumni-specific validation
    if (accountType === "alumni") {
      const { education, workExperience } = accountData;

      if (!education || !Array.isArray(education)) {
        throw new Error("Education information is required for alumni accounts");
      }

      if (!workExperience || !Array.isArray(workExperience)) {
        throw new Error("Work experience information is required for alumni accounts");
      }

      // Validate education entries
      education.forEach((edu, index) => {
        if (!edu.school || !edu.degree) {
          throw new Error(`Education entry ${index + 1} must have school and degree`);
        }
      });
    }

    // Company-specific validation
    if (accountType === "company") {
      const { companyInfo } = accountData;

      if (!companyInfo?.overview) {
        throw new Error("Company overview is required");
      }
    }
  }

  /**
   * Transform account data to API format
   * @param {Object} accountData - Form data from account setup
   * @returns {Object} API-formatted data
   */
  transformAccountData(accountData) {
    const { accountType, education, workExperience, professionalInfo } = accountData;

    const basePayload = {
      accountType,
    };

    // Add account type specific fields
    if (accountType === "alumni") {
      return {
        ...basePayload,
        education: education?.map((edu) => ({
          school: edu.school,
          degree: edu.degree,
          fieldOfWork: edu.fieldOfWork,
          startDate: edu.startDate,
          endDate: edu.endDate,
        })),
        workExperience: workExperience?.map((exp) => ({
          company: exp.company,
          jobTitle: exp.jobTitle,
          startDate: exp.startDate,
          endDate: exp.currentlyWorking ? undefined : exp.endDate,
          currentlyWorking: exp.currentlyWorking,
          description: exp.description,
        })),
        skills: professionalInfo?.skills || [],
        cv: professionalInfo?.cvFile?.name,
      };
    } else if (accountType === "company") {
      return {
        ...basePayload,
        overview: accountData.companyInfo?.overview,
        website: accountData.companyInfo?.website,
      };
    } else if (accountType === "school") {
      return {
        ...basePayload,
        overview: accountData.companyInfo?.overview,
        website: accountData.companyInfo?.website,
      };
    }

    return basePayload;
  }

  /**
   * Get current user
   * @returns {Object|null} Current user data
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Set current user
   * @param {Object} user - User data
   */
  setCurrentUser(user) {
    this.currentUser = user;
  }

  /**
   * Clear current user
   */
  clearCurrentUser() {
    this.currentUser = null;
  }

  /**
   * Get user-friendly error message
   * @param {Error} error - API error
   * @returns {string} User-friendly error message
   */
  getErrorMessage(error) {
    if (error.isNetworkError) {
      return "Network error. Please check your internet connection and try again.";
    }

    if (error.status === 400) {
      return error.data?.message || "Invalid request. Please check your information and try again.";
    }

    if (error.status === 401) {
      return "Authentication failed. Please login again.";
    }

    if (error.status === 403) {
      return "Access denied. Please contact support.";
    }

    if (error.status === 413) {
      return "File too large. Please choose a smaller file.";
    }

    if (error.status === 422) {
      return error.data?.message || "Validation failed. Please check your information.";
    }

    if (error.status >= 500) {
      return "Server error. Please try again later.";
    }

    return error.message || "An unexpected error occurred. Please try again.";
  }
}

// Export singleton instance
export default new UserService();