/**
 * Signup Data Validator
 * Handles validation logic for user signup data
 */

/**
 * Validate signup data
 * @param {Object} userData - User data to validate
 * @throws {Error} Throws error if validation fails
 */
export function validateSignupData(userData) {

  // Check required fields
  if (!userData.roleId) {
    throw new Error("Role is required");
  }

  // Extract email based on account type
  const email = extractEmail(userData);
  if (!email) {
    throw new Error("Email is required");
  }

  // Extract password based on structure
  const { password, confirmPassword } = extractPasswords(userData);

  if (!password) {
    throw new Error("Password is required");
  }

  if (!confirmPassword) {
    throw new Error("Password confirmation is required");
  }

  // Check password match
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  // Check email format
  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  // Check password strength
  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }
}

/**
 * Extract email from user data based on account type
 * @param {Object} userData - User registration data
 * @returns {string|null} Extracted email
 */
export function extractEmail(userData) {
  const { accountType, personalInfo, companyInfo, schoolInfo } = userData;

  if (accountType === "alumni") {
    return personalInfo?.email;
  } else if (accountType === "company") {
    return companyInfo?.email;
  } else if (accountType === "school") {
    return schoolInfo?.email;
  } else {
    return userData.email;
  }
}

/**
 * Extract passwords from user data
 * @param {Object} userData - User registration data
 * @returns {Object} Object containing password and confirmPassword
 */
export function extractPasswords(userData) {
  const { security } = userData;

  if (security) {
    return {
      password: security.password,
      confirmPassword: security.confirmPassword,
    };
  } else {
    return {
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    };
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate location coordinates
 * @param {Object} location - Location object
 * @returns {Object} Validated location object
 */
export function validateLocation(location) {
  if (
    !location ||
    !location.coordinates ||
    !Array.isArray(location.coordinates)
  ) {
    return {
      type: "Point",
      coordinates: [0, 0],
      address: "",
    };
  }

  const [longitude, latitude] = location.coordinates;

  // Validate longitude (-180 to 180) and latitude (-90 to 90)
  const validLongitude = Math.max(-180, Math.min(180, longitude || 0));
  const validLatitude = Math.max(-90, Math.min(90, latitude || 0));

  return {
    type: "Point",
    coordinates: [validLongitude, validLatitude],
    address: location.address || "",
  };
}