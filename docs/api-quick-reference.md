# API Quick Reference Guide

Quick reference for authentication API endpoints and usage patterns.

## Endpoints Summary

| Endpoint | Method | Purpose | State Management |
|----------|--------|---------|------------------|
| `/user/sign-up` | POST | User registration | useAuth hook |
| `/auth/login` | POST | User authentication | useAuthStore |
| `/auth/forgot-password` | POST | Request password reset OTP | useAuth hook |
| `/auth/verify-otp` | POST | Verify OTP code | useAuth hook |
| `/auth/reset-password` | POST | Reset password with OTP | useAuth hook |
| `/auth/change-password` | POST | Change password (logged in) | useAuth hook |
| `/role/list` | GET | Get available user roles | Direct API call |

## Quick Usage Examples

### Signup Implementation

```javascript
// In component
import { useAuth } from '../hooks/useAuth';

const { signup, isLoading, error } = useAuth();

const handleSubmit = async (formData) => {
  try {
    const result = await signup(formData);
    if (result.success) {
      // Show success message
      setShowSuccessModal(true);
    }
  } catch (err) {
    // Error handled automatically
  }
};
```

### Login Implementation

```javascript
// In component
import { useAuthStore } from '../stores/useAuthStore';
import authService from '../services/auth/authService';

const { login } = useAuthStore();

const handleLogin = async (email, password) => {
  const result = await authService.login({ email, password });
  if (result.success) {
    login(result.user, result.token);
    navigate('/dashboard');
  }
};
```

### Password Reset Implementation

```javascript
// In component
import { useAuth } from '../hooks/useAuth';

const { forgotPassword, verifyOTP, resetPassword } = useAuth();

// Step 1: Send OTP
const handleSendOTP = async (email) => {
  const result = await forgotPassword(email);
  if (result.success) setStep(2);
};

// Step 2: Verify OTP
const handleVerifyOTP = async (email, otp) => {
  const result = await verifyOTP(email, otp);
  if (result.success) setStep(3);
};

// Step 3: Reset Password
const handleResetPassword = async (email, otp, password, confirmPassword) => {
  const result = await resetPassword(email, otp, password, confirmPassword);
  if (result.success) navigate('/login');
};
```

## Request/Response Formats

### Signup Request

```javascript
{
  "roleId": "role_id",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "firstname": "John",
  "lastname": "Doe",
  "phoneNo": "1234567890",
  "location": {
    "type": "Point",
    "coordinates": [-74.006, 40.7128],
    "address": "New York, NY"
  },
  "education": [
    {
      "degree": "Bachelor's",
      "school": "NYU",
      "fieldOfWork": "Computer Science",
      "startDate": "2008",
      "endDate": "2012"
    }
  ],
  "skills": ["JavaScript", "React"]
}
```

### Login Request

```javascript
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Standard Success Response

```javascript
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "token": "jwt_token",
    "message": "Operation successful"
  }
}
```

### Standard Error Response

```javascript
{
  "success": false,
  "errors": [
    {
      "title": "field_name",
      "detail": "Human readable error message",
      "code": 422
    }
  ]
}
```

## Import Statements

```javascript
// For signup, password reset
import { useAuth } from '../hooks/useAuth';

// For login state management
import { useAuthStore } from '../stores/useAuthStore';

// For direct API calls
import authService from '../services/auth/authService';

// For utilities
import { validateSignupData, isValidEmail } from '../services/auth/validators/signupValidator';
import { transformSignupData } from '../services/auth/transformers/signupDataTransformer';
import { getErrorMessage } from '../services/auth/utils/errorHandler';
```

## Common Patterns

### Error Handling

```javascript
// Automatic error handling with useAuth
const { signup, error } = useAuth();

// Manual error handling
try {
  const result = await authService.login(data);
} catch (error) {
  const friendlyMessage = getErrorMessage(error);
  setError(friendlyMessage);
}
```

### Loading States

```javascript
const { isLoading } = useAuth();

// In JSX
<Button disabled={isLoading}>
  {isLoading ? 'Signing up...' : 'Sign Up'}
</Button>
```

### State Management

```javascript
// Check authentication status
const { isAuthenticated, user } = useAuthStore();

// Get current user
const currentUser = authService.getCurrentUser();

// Check if user is logged in
const isLoggedIn = authService.isAuthenticated();
```

## Validation Rules

### Email
- Must be valid email format
- Required for all operations

### Password
- Minimum 6 characters
- Must match confirmation password
- Required for signup and reset

### OTP
- Exactly 6 digits
- Required for password reset verification

### Role
- Must be valid role ID from `/role/list`
- Required for signup

## Environment Variables

```javascript
// In .env file
VITE_API_BASE_URL=http://194.195.92.92/alumni-backend/api/v1
VITE_FILE_STORAGE_URL=http://194.195.92.92/alumni-backend/uploads
```

## File Structure Quick Reference

```
src/
├── stores/useAuthStore.js          # Login state (Zustand)
├── hooks/useAuth.js                # Signup/password reset (React)
├── services/auth/
│   ├── authService.js              # Main API service
│   ├── validators/signupValidator.js    # Data validation
│   ├── transformers/signupDataTransformer.js  # Data transformation
│   └── utils/
│       ├── errorHandler.js         # Error processing
│       └── tokenManager.js         # Token management
├── pages/
│   ├── SignupPage.jsx              # Uses useAuth
│   ├── LoginPage.jsx               # Uses useAuthStore
│   └── ForgotPasswordPage.jsx      # Uses useAuth
└── components/auth/                # Auth components
```

## Debugging Tips

### Check Network Tab
- Verify API endpoints are correct
- Check request/response format
- Look for authentication headers

### Check Console
- Look for validation errors
- Check state updates
- Monitor API responses

### Check Local Storage
- Verify token persistence
- Check for token expiration
- Ensure proper cleanup on logout

### State Debugging
```javascript
// Check Zustand store state
console.log(useAuthStore.getState());

// Check hook state
const { isLoading, error } = useAuth();
console.log({ isLoading, error });
```

## Common Error Codes

| Code | Meaning | Common Causes |
|------|---------|---------------|
| 400 | Bad Request | Invalid request format |
| 401 | Unauthorized | Invalid credentials |
| 403 | Forbidden | Access denied |
| 409 | Conflict | Email already exists |
| 422 | Validation Error | Form validation failed |
| 500+ | Server Error | Backend issues |

## Testing Commands

```bash
# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build

# Development server
npm run dev
```

This quick reference provides everything needed for rapid development and troubleshooting of authentication features.