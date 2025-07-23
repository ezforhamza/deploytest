import { extractEmail, extractPasswords, validateLocation } from '../validators/signupValidator.js';

/**
 * Signup Data Transformer
 * Handles transformation of form data to API format
 */

/**
 * Transform signup data to API format
 * @param {Object} userData - Form data from signup forms
 * @returns {Object} API-formatted data
 */
export function transformSignupData(userData) {
  const {
    accountType,
    personalInfo,
    locationInfo,
    companyInfo,
    schoolInfo,
    profileImage,
  } = userData;

  // Extract email and password
  const email = extractEmail(userData);
  const { password, confirmPassword } = extractPasswords(userData);

  // Create flat API payload structure (matching Postman format)
  const apiPayload = {
    // Required fields
    roleId: userData.roleId,
    email: email,
    password: password,
    confirmPassword: confirmPassword,

    // Profile image (if uploaded)
    image: profileImage?.fullURL || profileImage?.filename || "",

    // User specific fields (all account types need these)
    firstname: accountType === "alumni" ? personalInfo?.firstName || "" : "",
    lastname: accountType === "alumni" ? personalInfo?.lastName || "" : "",
    phoneNo: extractPhoneNumber(userData),
    dob: accountType === "alumni" ? personalInfo?.dateOfBirth || "" : "",
    age: accountType === "alumni" ? personalInfo?.age || "" : "",
    gender: accountType === "alumni" ? personalInfo?.gender || "" : "",

    // Company/School specific fields
    company: accountType === "company" ? companyInfo?.name || "" : "",
    school: accountType === "school" ? schoolInfo?.name || "" : "",
    website: extractWebsite(userData),
    overview: extractOverview(userData),
    industry: accountType === "company" ? companyInfo?.industry || "" : "",

    // Location fields
    location: validateLocation(locationInfo?.location),
    country: locationInfo?.country || "",
    state: locationInfo?.state || "",

    // Education and experience (for alumni)
    education: transformEducationData(userData),
    workExperience: transformWorkExperienceData(userData),

    // Skills and CV (for alumni)
    skills: transformSkillsData(userData),
    cv: transformCvData(userData),
  };

  // Clean up undefined values
  Object.keys(apiPayload).forEach((key) => {
    if (apiPayload[key] === undefined) {
      apiPayload[key] = "";
    }
  });

  // Additional validation for required fields
  validateApiPayload(apiPayload, accountType);

  return apiPayload;
}

/**
 * Extract phone number based on account type
 * @param {Object} userData - User data
 * @returns {string} Phone number
 */
function extractPhoneNumber(userData) {
  const { accountType, personalInfo, companyInfo, schoolInfo } = userData;

  if (accountType === "alumni") {
    return personalInfo?.phone || "";
  } else if (accountType === "company") {
    return companyInfo?.phone || "";
  } else if (accountType === "school") {
    return schoolInfo?.phone || "";
  }
  return "";
}

/**
 * Extract website based on account type
 * @param {Object} userData - User data
 * @returns {string} Website URL
 */
function extractWebsite(userData) {
  const { accountType, companyInfo, schoolInfo } = userData;

  if (accountType === "company" || accountType === "school") {
    return companyInfo?.website || schoolInfo?.website || "";
  }
  return "";
}

/**
 * Extract overview based on account type
 * @param {Object} userData - User data
 * @returns {string} Overview text
 */
function extractOverview(userData) {
  const { accountType, companyInfo, schoolInfo } = userData;

  if (accountType === "company" || accountType === "school") {
    return companyInfo?.overview || schoolInfo?.overview || "";
  }
  return "";
}

/**
 * Transform education data for API
 * @param {Object} userData - User data
 * @returns {Array} Transformed education array
 */
function transformEducationData(userData) {
  const { accountType, education } = userData;

  if (accountType === "alumni" && education) {
    return education.map((edu) => ({
      degree: edu.degree || "",
      school: edu.school || "",
      fieldOfWork: edu.fieldOfWork || "",
      startDate: edu.startDate || "",
      endDate: edu.endDate || "",
    }));
  }
  return [];
}

/**
 * Transform work experience data for API
 * @param {Object} userData - User data
 * @returns {Array} Transformed work experience array
 */
function transformWorkExperienceData(userData) {
  const { accountType, workExperience } = userData;

  if (accountType === "alumni" && workExperience) {
    return workExperience.map((exp) => ({
      company: exp.company || "",
      jobTitle: exp.jobTitle || "",
      startDate: exp.startDate || "",
      endDate: exp.currentlyWorking ? null : exp.endDate || "",
      currentlyWorking: exp.currentlyWorking || false,
      description: exp.description || "",
    }));
  }
  return [];
}

/**
 * Transform skills data for API
 * @param {Object} userData - User data
 * @returns {Array} Transformed skills array
 */
function transformSkillsData(userData) {
  const { accountType, professionalInfo } = userData;

  if (accountType === "alumni" && professionalInfo?.skills) {
    if (Array.isArray(professionalInfo.skills)) {
      return professionalInfo.skills;
    } else {
      return professionalInfo.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
    }
  }
  return [];
}

/**
 * Transform CV data for API
 * @param {Object} userData - User data
 * @returns {string} CV file URL or filename
 */
function transformCvData(userData) {
  const { accountType, professionalInfo } = userData;

  if (accountType === "alumni" && professionalInfo?.cvFile) {
    return (
      professionalInfo.cvFile.fullURL ||
      professionalInfo.cvFile.filename ||
      ""
    );
  }
  return "";
}

/**
 * Validate the API payload for required fields
 * @param {Object} apiPayload - Transformed API payload
 * @param {string} accountType - Type of account being created
 * @throws {Error} Throws error if validation fails
 */
function validateApiPayload(apiPayload, accountType) {
  if (!apiPayload.email) {
    throw new Error("Email is required");
  }
  if (!apiPayload.password) {
    throw new Error("Password is required");
  }
  if (!apiPayload.roleId) {
    throw new Error("Role ID is required");
  }

  // Company specific validation
  if (accountType === "company" && !apiPayload.company) {
    throw new Error("Company name is required");
  }

  // School specific validation
  if (accountType === "school" && !apiPayload.school) {
    throw new Error("School name is required");
  }

  // Phone number validation (optional but if provided, should be reasonable length)
  if (
    apiPayload.phoneNo &&
    (apiPayload.phoneNo.length < 10 || apiPayload.phoneNo.length > 15)
  ) {
    console.warn("Phone number length might be invalid:", apiPayload.phoneNo);
  }
}