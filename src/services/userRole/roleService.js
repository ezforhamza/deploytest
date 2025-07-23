// src/services/roleService.js

import apiClient from "..//api/apiClient";
import { ENDPOINTS, DEFAULT_ROLE_DESCRIPTIONS } from "../api/config";

/**
 * Role Service
 * Handles all role-related API operations
 */
class RoleService {
  constructor() {
    this.roles = null;
    this.loading = false;
    this.error = null;
  }

  /**
   * Fetch all available roles from API
   * @returns {Promise<Array>} Array of role objects
   */
  async fetchRoles() {
    // Return cached roles if available
    if (this.roles) {
      return this.roles;
    }

    // Prevent multiple simultaneous requests
    if (this.loading) {
      return new Promise((resolve, reject) => {
        const checkLoading = () => {
          if (!this.loading) {
            if (this.error) {
              reject(this.error);
            } else {
              resolve(this.roles);
            }
          } else {
            setTimeout(checkLoading, 100);
          }
        };
        checkLoading();
      });
    }

    this.loading = true;
    this.error = null;

    try {
      const response = await apiClient.get(ENDPOINTS.AUTH.ROLES);
      console.log(response);

      // Transform API response to match our UI needs
      const transformedRoles = this.transformRoles(response.data);
      console.log(transformedRoles);

      this.roles = transformedRoles;
      this.loading = false;

      return transformedRoles;
    } catch (error) {
      this.loading = false;
      this.error = error;

      console.error("Failed to fetch roles:", error);

      // Return fallback roles for development/offline mode
      const isDevelopment =
        import.meta.env?.VITE_NODE_ENV === "development" ||
        import.meta.env?.MODE === "development";

      if (isDevelopment) {
        console.warn("Using fallback roles for development");
        return this.getFallbackRoles();
      }

      throw error;
    }
  }

  /**
   * Transform API roles to UI format
   * @param {Array|Object} apiRoles - Raw roles from API (array or response object)
   * @returns {Array} Transformed roles
   */
  transformRoles(apiRoles) {
    // Handle API response object format
    const rolesArray = Array.isArray(apiRoles) ? apiRoles : apiRoles?.data;
    
    if (!Array.isArray(rolesArray)) {
      throw new Error("Invalid roles data received from API");
    }

    return rolesArray.map((role) => {
      // Fix API typo: "aIumni" should be "alumni"
      const roleName = role.name || role.type;
      const normalizedRoleName = roleName === "aIumni" ? "alumni" : roleName?.toLowerCase();
      
      return {
        id: role.id || role._id,
        type: normalizedRoleName,
        title: role.displayName || role.title || this.capitalizeFirst(normalizedRoleName),
        description: this.getRoleDescription(normalizedRoleName),
        apiData: role, // Keep original API data for reference
      };
    });
  }

  /**
   * Get role description with fallback
   * @param {string} roleType - Role type (alumni, company, school)
   * @returns {string} Role description
   */
  getRoleDescription(roleType) {
    return (
      DEFAULT_ROLE_DESCRIPTIONS[roleType] ||
      `Join as ${this.capitalizeFirst(roleType)}`
    );
  }

  /**
   * Get role ID by type
   * @param {string} roleType - Role type (alumni, company, school)
   * @returns {string|null} Role ID
   */
  getRoleId(roleType) {
    if (!this.roles) {
      throw new Error("Roles not loaded. Call fetchRoles() first.");
    }

    const role = this.roles.find((r) => r.type === roleType?.toLowerCase());
    return role?.id || null;
  }

  /**
   * Get role by type
   * @param {string} roleType - Role type
   * @returns {Object|null} Role object
   */
  getRole(roleType) {
    if (!this.roles) {
      throw new Error("Roles not loaded. Call fetchRoles() first.");
    }

    return this.roles.find((r) => r.type === roleType?.toLowerCase()) || null;
  }

  /**
   * Check if roles are loaded
   * @returns {boolean} True if roles are loaded
   */
  isLoaded() {
    return this.roles !== null;
  }

  /**
   * Check if currently loading roles
   * @returns {boolean} True if loading
   */
  isLoading() {
    return this.loading;
  }

  /**
   * Get current error
   * @returns {Error|null} Current error or null
   */
  getError() {
    return this.error;
  }

  /**
   * Clear cached roles (force refresh on next fetch)
   */
  clearCache() {
    this.roles = null;
    this.error = null;
  }

  /**
   * Get fallback roles for development/offline mode
   * @returns {Array} Fallback roles
   */
  getFallbackRoles() {
    return [
      {
        id: "fallback-alumni",
        type: "alumni",
        title: "Alumni",
        description: DEFAULT_ROLE_DESCRIPTIONS.alumni,
        apiData: { name: "alumni", fallback: true },
      },
      {
        id: "fallback-company",
        type: "company",
        title: "Company",
        description: DEFAULT_ROLE_DESCRIPTIONS.company,
        apiData: { name: "company", fallback: true },
      },
      {
        id: "fallback-school",
        type: "school",
        title: "School",
        description: DEFAULT_ROLE_DESCRIPTIONS.school,
        apiData: { name: "school", fallback: true },
      },
    ];
  }

  /**
   * Capitalize first letter
   * @param {string} str - String to capitalize
   * @returns {string} Capitalized string
   */
  capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

// Export singleton instance
export default new RoleService();
