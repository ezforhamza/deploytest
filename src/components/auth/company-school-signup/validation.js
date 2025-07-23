export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter";
  if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number";
  return "";
};

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return "";
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone)) return "Please enter a valid phone number";
  if (phone.replace(/\D/g, '').length < 10) return "Phone number must be at least 10 digits";
  return "";
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === "") {
    return `${fieldName} is required`;
  }
  return "";
};

export const validateCompanyName = (name) => {
  if (!name) return "Company name is required";
  if (name.length < 2) return "Company name must be at least 2 characters long";
  if (name.length > 100) return "Company name must be less than 100 characters";
  return "";
};

export const validateSchoolName = (name) => {
  if (!name) return "School name is required";
  if (name.length < 2) return "School name must be at least 2 characters long";
  if (name.length > 100) return "School name must be less than 100 characters";
  return "";
};

export const validateWebsite = (website) => {
  if (!website) return ""; // Website is optional
  
  const websiteRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  if (!websiteRegex.test(website)) {
    return "Please enter a valid website URL";
  }
  return "";
};

export const validateLocation = (location) => {
  if (!location) return "Location is required";
  
  // Check if it's a valid location object
  if (typeof location !== 'object' || !location.coordinates || !location.address) {
    return "Please select a valid location";
  }
  
  // Check if coordinates are valid
  if (!Array.isArray(location.coordinates) || location.coordinates.length !== 2) {
    return "Invalid location coordinates";
  }
  
  const [longitude, latitude] = location.coordinates;
  if (typeof longitude !== 'number' || typeof latitude !== 'number') {
    return "Invalid location coordinates";
  }
  
  // Check if coordinates are within valid ranges
  if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
    return "Location coordinates are out of range";
  }
  
  return "";
};

export const validateState = (state) => {
  if (!state) return "State is required";
  if (state.length < 2) return "State must be at least 2 characters long";
  if (state.length > 50) return "State must be less than 50 characters";
  return "";
};

export const validateOverview = (overview) => {
  if (!overview) return ""; // Overview is optional
  if (overview.length > 1000) return "Overview must be less than 1000 characters";
  return "";
};