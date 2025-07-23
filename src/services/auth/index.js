// Export the main auth service as default
export { default } from './authService.js';

// Export individual utilities for direct usage if needed
export { validateSignupData, isValidEmail, extractEmail, extractPasswords, validateLocation } from './validators/signupValidator.js';
export { transformSignupData } from './transformers/signupDataTransformer.js';
export { getErrorMessage, handleForgotPasswordError, handleOtpError, handlePasswordResetError, handleLoginError } from './utils/errorHandler.js';
export { default as tokenManager } from './utils/tokenManager.js';