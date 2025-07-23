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

export const validateAge = (age) => {
  if (!age) return "Age is required";
  const numAge = parseInt(age);
  if (isNaN(numAge) || numAge < 16 || numAge > 120) return "Please enter a valid age (16-120)";
  return "";
};

export const validateDateOfBirth = (dateOfBirth) => {
  if (!dateOfBirth) return "Date of birth is required";
  const date = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  if (age < 16) return "You must be at least 16 years old";
  if (age > 120) return "Please enter a valid date of birth";
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

export const validateRequired = (value, fieldName) => {
  if (!value || value.toString().trim() === "") {
    return `${fieldName} is required`;
  }
  return "";
};

export const validateName = (name, fieldName) => {
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!name) return `${fieldName} is required`;
  if (!nameRegex.test(name)) return `${fieldName} can only contain letters, spaces, apostrophes, and hyphens`;
  if (name.length < 2) return `${fieldName} must be at least 2 characters long`;
  if (name.length > 50) return `${fieldName} must be less than 50 characters`;
  return "";
};

export const validateFile = (file, allowedTypes, maxSize) => {
  if (!file) return "";
  
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
  if (!allowedTypes.includes(fileExtension)) {
    return `Only ${allowedTypes.join(', ')} files are allowed`;
  }
  
  if (file.size > maxSize) {
    return `File size must be less than ${Math.round(maxSize / (1024 * 1024))}MB`;
  }
  
  return "";
};