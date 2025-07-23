/**
 * Error Handler Utility
 * Handles API error processing and user-friendly message generation
 */

/**
 * Get user-friendly error message from API error
 * @param {Error} error - API error
 * @returns {string} User-friendly error message
 */
export function getErrorMessage(error) {
  if (error.isNetworkError) {
    return "Network error. Please check your internet connection and try again.";
  }

  if (error.status === 400) {
    return (
      error.data?.message ||
      "Invalid request. Please check your information and try again."
    );
  }

  if (error.status === 401) {
    return "Authentication failed. Please check your credentials.";
  }

  if (error.status === 403) {
    return "Access denied. Please contact support.";
  }

  if (error.status === 409) {
    return "An account with this email already exists. Please try logging in instead.";
  }

  if (error.status === 422) {
    return handleValidationError(error);
  }

  if (error.status >= 500) {
    return "Server error. Please try again later.";
  }

  return error.message || "An unexpected error occurred. Please try again.";
}

/**
 * Handle validation errors (422 status)
 * @param {Error} error - API error with 422 status
 * @returns {string} Formatted validation error message
 */
function handleValidationError(error) {
  // Handle the specific API error format: {"errors": [{"title": "emailAddress", "detail": "Email address is already used", "code": 422}]}
  if (error.data?.errors && Array.isArray(error.data.errors)) {
    const validationErrors = error.data.errors
      .map((err) => err.detail)
      .filter(Boolean);
    return validationErrors.length > 0
      ? validationErrors.join(", ")
      : "Validation failed. Please check your information.";
  }

  // Fallback to other error formats
  if (error.data?.errors && typeof error.data.errors === "object") {
    const validationErrors = Object.values(error.data.errors).flat();
    return validationErrors.length > 0
      ? validationErrors.join(", ")
      : "Validation failed. Please check your information.";
  }

  return (
    error.data?.message ||
    "Validation failed. Please check your information."
  );
}

/**
 * Handle forgot password specific errors
 * @param {Error} error - API error from forgot password request
 * @returns {Object} Formatted error response
 */
export function handleForgotPasswordError(error) {
  // Handle specific forgot password errors
  if (error.data?.errors) {
    const errorDetail = error.data.errors[0]?.detail;
    if (errorDetail) {
      // Handle account verification status
      if (errorDetail.includes("verification by admin")) {
        return {
          success: false,
          error:
            "Your account is under verification by admin. Please wait for approval before resetting your password.",
        };
      }
      return {
        success: false,
        error: errorDetail,
      };
    }
  }

  const errorMessage = getErrorMessage(error);
  return {
    success: false,
    error: errorMessage,
  };
}

/**
 * Handle OTP verification specific errors
 * @param {Error} error - API error from OTP verification
 * @returns {Object} Formatted error response
 */
export function handleOtpError(error) {
  // Handle specific OTP errors
  if (error.data?.errors) {
    const errorDetail =
      error.data.errors[0]?.detail || "Invalid or expired OTP";
    return {
      success: false,
      error: errorDetail,
    };
  }

  const errorMessage = getErrorMessage(error);
  return {
    success: false,
    error: errorMessage,
  };
}

/**
 * Handle password reset specific errors
 * @param {Error} error - API error from password reset
 * @returns {Object} Formatted error response
 */
export function handlePasswordResetError(error) {
  // Handle specific reset password errors
  if (error.data?.errors) {
    const errorDetail =
      error.data.errors[0]?.detail || "Password reset failed";
    return {
      success: false,
      error: errorDetail,
    };
  }

  const errorMessage = getErrorMessage(error);
  return {
    success: false,
    error: errorMessage,
  };
}

/**
 * Handle login specific errors
 * @param {Error} error - API error from login request
 * @returns {Object} Formatted error response
 */
export function handleLoginError(error) {
  // Handle specific login errors
  if (error.data?.errors) {
    const errorDetail = error.data.errors[0]?.detail;
    if (errorDetail) {
      return {
        success: false,
        error: errorDetail,
      };
    }
  }

  const errorMessage = getErrorMessage(error);
  return {
    success: false,
    error: errorMessage,
  };
}