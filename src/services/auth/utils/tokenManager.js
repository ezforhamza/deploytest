/**
 * Token Manager Utility
 * Handles authentication token operations
 */

class TokenManager {
  constructor() {
    this.authToken = null;
  }

  /**
   * Set authentication token
   * @param {string} token - Auth token
   */
  setAuthToken(token) {
    this.authToken = token;
    localStorage.setItem("authToken", token);
  }

  /**
   * Get authentication token
   * @returns {string|null} Auth token
   */
  getAuthToken() {
    return this.authToken || localStorage.getItem("authToken");
  }

  /**
   * Clear authentication token
   */
  clearAuthToken() {
    this.authToken = null;
    localStorage.removeItem("authToken");
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  isAuthenticated() {
    return !!this.getAuthToken();
  }

  /**
   * Initialize token from localStorage on app start
   */
  initializeToken() {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      this.authToken = storedToken;
    }
  }
}

// Export singleton instance
export default new TokenManager();