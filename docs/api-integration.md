# API Integration Documentation

This document provides comprehensive documentation for the authentication API integration in the Alumni Privacy application.

## Table of Contents

1. [Overview](#overview)
2. [API Configuration](#api-configuration)
3. [Authentication Flows](#authentication-flows)
   - [Signup Flow](#signup-flow)
   - [Signin Flow](#signin-flow)
   - [Forgot Password Flow](#forgot-password-flow)
4. [Data Models](#data-models)
5. [Error Handling](#error-handling)
6. [State Management](#state-management)

## Overview

The application uses a RESTful API architecture with centralized authentication management. The authentication system is split into two main approaches:

- **Signup Flow**: Uses React hook (`useAuth`) for temporary state management
- **Signin Flow**: Uses Zustand store (`useAuthStore`) for persistent global state
- **Password Reset**: Uses React hook (`useAuth`) for form operations

### Base Configuration

```javascript
Base URL: http://194.195.92.92/alumni-backend/api/v1
Timeout: 10 seconds
Content-Type: application/json
```

## API Configuration

The API configuration is centralized in `src/services/api/config.js`:

```javascript
export const ENDPOINTS = {
  AUTH: {
    ROLES: "/role/list",
    LOGIN: "/auth/login",
    SIGNUP: "/user/sign-up",
    GOOGLE_LOGIN: "/auth/google-login",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    CHANGE_PASSWORD: "/auth/change-password",
  }
};
```

## Authentication Flows

### Signup Flow

The signup process involves user registration with admin verification before login access.

#### Data Flow Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   SignupPage    │    │   useAuth Hook   │    │  AuthService    │
│                 │    │                  │    │                 │
│ 1. User fills   │───▶│ 2. Validates     │───▶│ 3. Transforms   │
│    form data    │    │    signup data   │    │    to API       │
│                 │    │                  │    │    format       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                                         │
┌─────────────────┐    ┌──────────────────┐             │
│   Success UI    │    │   API Response   │             │
│                 │    │                  │             │
│ 6. Show success │◀───│ 5. Returns       │◀────────────┘
│    modal        │    │    response      │    4. POST /user/sign-up
│                 │    │                  │
└─────────────────┘    └──────────────────┘
```

#### Implementation Details

**Step 1: Form Data Collection**
- Location: `src/pages/SignupPage.jsx`
- User selects account type (alumni, company, school)
- Fills respective form (AlumniSignupForm, CompanySignupForm, SchoolSignupForm)

**Step 2: Data Validation**
- Location: `src/services/auth/validators/signupValidator.js`
- Validates required fields, email format, password strength
- Extracts email and passwords based on account type

**Step 3: Data Transformation**
- Location: `src/services/auth/transformers/signupDataTransformer.js`
- Transforms form data to flat API structure
- Handles different account types with specific fields

**Step 4: API Request**
- Endpoint: `POST /user/sign-up`
- Location: `src/services/auth/authService.js`

**Step 5: Response Handling**
- Success: User account created (awaiting admin verification)
- Error: User-friendly error messages displayed

#### API Request Example

```javascript
// POST /user/sign-up
{
  "roleId": "alumni_role_id",
  "email": "user@example.com",
  "password": "password123",
  "confirmPassword": "password123",
  "firstname": "John",
  "lastname": "Doe",
  "phoneNo": "1234567890",
  "dob": "1990-01-01",
  "age": "33",
  "gender": "male",
  "location": {
    "type": "Point",
    "coordinates": [-74.006, 40.7128],
    "address": "New York, NY"
  },
  "country": "United States",
  "state": "New York",
  "education": [
    {
      "degree": "Bachelor's",
      "school": "NYU",
      "fieldOfWork": "Computer Science",
      "startDate": "2008",
      "endDate": "2012"
    }
  ],
  "workExperience": [
    {
      "company": "Tech Corp",
      "jobTitle": "Software Engineer",
      "startDate": "2012",
      "endDate": "2020",
      "currentlyWorking": false,
      "description": "Developed web applications"
    }
  ],
  "skills": ["JavaScript", "React", "Node.js"],
  "cv": "path/to/cv.pdf",
  "image": "path/to/profile.jpg"
}
```

#### API Response Example

```javascript
// Success Response
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstname": "John",
      "lastname": "Doe",
      "role": {
        "id": "role_id",
        "name": "alumni"
      }
    },
    "token": "jwt_token_here",
    "message": "Account created successfully!"
  }
}

// Error Response
{
  "success": false,
  "errors": [
    {
      "title": "emailAddress",
      "detail": "Email address is already used",
      "code": 422
    }
  ]
}
```

---

### Signin Flow

The signin process manages user authentication and session persistence.

#### Data Flow Diagram

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   LoginPage     │    │  useAuthStore    │    │  AuthService    │
│                 │    │   (Zustand)      │    │                 │
│ 1. User enters  │───▶│ 2. Calls login   │───▶│ 3. API call     │
│    credentials  │    │    function      │    │    /auth/login  │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                 ▲                       │
┌─────────────────┐             │              ┌─────────────────┐
│   Dashboard     │             │              │   API Response  │
│                 │             │              │                 │
│ 6. Navigate to  │             │              │ 4. Returns user │
│    role-based   │             │              │    & token data │
│    dashboard    │             │              │                 │
└─────────────────┘             │              └─────────────────┘
                                │                       │
                       ┌────────┴────────┐              │
                       │ 5. Store user   │◀─────────────┘
                       │    & token in   │
                       │    global state │
                       │    & localStorage│
                       └─────────────────┘
```

#### Implementation Details

**Step 1: Credential Input**
- Location: `src/pages/LoginPage.jsx`
- User enters email and password
- Form validation for required fields

**Step 2: Zustand Store Action**
- Location: `src/stores/useAuthStore.js`
- Calls AuthService login method
- Manages loading and error states

**Step 3: API Authentication**
- Endpoint: `POST /auth/login`
- Location: `src/services/auth/authService.js`

**Step 4: Response Processing**
- Extracts user data and access token
- Handles error responses with specific messages

**Step 5: State Persistence**
- Stores user object in Zustand global state
- Persists token in localStorage
- Sets authentication flag

**Step 6: Navigation**
- Role-based navigation to appropriate dashboard
- Alumni → `/dashboard/alumni`
- Company → `/dashboard/company`
- School → `/dashboard/school`

#### API Request Example

```javascript
// POST /auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### API Response Example

```javascript
// Success Response
{
  "success": true,
  "data": {
    "data": {
      "accessToken": "jwt_access_token_here",
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "firstname": "John",
        "lastname": "Doe",
        "role": {
          "id": "role_id",
          "name": "alumni"
        },
        "isVerified": true,
        "profile": { /* user profile data */ }
      }
    }
  }
}

// Error Response
{
  "success": false,
  "errors": [
    {
      "detail": "Invalid email or password",
      "code": 401
    }
  ]
}
```

---

### Forgot Password Flow

Multi-step password recovery process with OTP verification.

#### Data Flow Diagram

```
Step 1: Request OTP
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ ForgotPassword  │    │   useAuth Hook   │    │  AuthService    │
│     Page        │    │                  │    │                 │
│ 1. Enter email  │───▶│ 2. Validate      │───▶│ 3. POST         │
│                 │    │    email format  │    │ /auth/forgot-   │
│                 │    │                  │    │ password        │
└─────────────────┘    └──────────────────┘    └─────────────────┘

Step 2: Verify OTP
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ ForgotPassword  │    │   useAuth Hook   │    │  AuthService    │
│     Page        │    │                  │    │                 │
│ 1. Enter OTP    │───▶│ 2. Validate      │───▶│ 3. POST         │
│                 │    │    6-digit OTP   │    │ /auth/verify-   │
│                 │    │                  │    │ otp             │
└─────────────────┘    └──────────────────┘    └─────────────────┘

Step 3: Reset Password
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ ForgotPassword  │    │   useAuth Hook   │    │  AuthService    │
│     Page        │    │                  │    │                 │
│ 1. New password │───▶│ 2. Validate      │───▶│ 3. POST         │
│    confirmation │    │    passwords     │    │ /auth/reset-    │
│                 │    │    match         │    │ password        │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

#### Implementation Details

**Step 1: Email Submission**
- Component: EmailStep.jsx
- Validates email format
- Sends OTP to user's email

**Step 2: OTP Verification**
- Component: OtpStep.jsx
- 6-digit OTP input validation
- Confirms user identity

**Step 3: Password Reset**
- Component: NewPasswordStep.jsx
- New password and confirmation
- Password strength validation

#### API Examples

**Step 1: Request OTP**
```javascript
// POST /auth/forgot-password
{
  "email": "user@example.com"
}

// Response
{
  "success": true,
  "data": "Forget Password OTP sent successfully"
}
```

**Step 2: Verify OTP**
```javascript
// POST /auth/verify-otp
{
  "email": "user@example.com",
  "otp": "123456"
}

// Response
{
  "success": true,
  "message": "OTP verified successfully"
}
```

**Step 3: Reset Password**
```javascript
// POST /auth/reset-password
{
  "email": "user@example.com",
  "otp": "123456",
  "password": "newPassword123",
  "confirmPassword": "newPassword123"
}

// Response
{
  "success": true,
  "message": "Password reset successfully"
}
```

## Data Models

### User Signup Data Model

```typescript
interface SignupData {
  // Required fields
  roleId: string;
  email: string;
  password: string;
  confirmPassword: string;
  
  // Profile image
  image?: string;
  
  // Alumni specific
  firstname?: string;
  lastname?: string;
  phoneNo?: string;
  dob?: string;
  age?: string;
  gender?: string;
  
  // Company/School specific
  company?: string;
  school?: string;
  website?: string;
  overview?: string;
  industry?: string;
  
  // Location
  location: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
    address: string;
  };
  country: string;
  state: string;
  
  // Alumni education & experience
  education: EducationItem[];
  workExperience: WorkExperienceItem[];
  skills: string[];
  cv?: string;
}

interface EducationItem {
  degree: string;
  school: string;
  fieldOfWork: string;
  startDate: string;
  endDate: string;
}

interface WorkExperienceItem {
  company: string;
  jobTitle: string;
  startDate: string;
  endDate: string | null;
  currentlyWorking: boolean;
  description: string;
}
```

### User Login Response Model

```typescript
interface LoginResponse {
  success: boolean;
  data: {
    data: {
      accessToken: string;
      user: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
        role: {
          id: string;
          name: "alumni" | "company" | "school";
        };
        isVerified: boolean;
        profile: object;
      };
    };
  };
}
```

## Error Handling

The application uses a centralized error handling system located in `src/services/auth/utils/errorHandler.js`.

### Error Response Format

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

### Common Error Codes

- **400**: Bad Request - Invalid request data
- **401**: Unauthorized - Invalid credentials
- **403**: Forbidden - Access denied
- **409**: Conflict - Email already exists
- **422**: Validation Error - Form validation failed
- **500+**: Server Error - Internal server issues

### Error Handling Flow

```javascript
try {
  const result = await authService.signup(userData);
  // Handle success
} catch (error) {
  // Error is processed by errorHandler utility
  // Returns user-friendly message
  const friendlyMessage = getErrorMessage(error);
  setError(friendlyMessage);
}
```

## State Management

### Signup State (useAuth Hook)

- **Purpose**: Temporary state for signup process
- **Scope**: Component-level
- **Persistence**: None (user can't access app until verified)

```javascript
const {
  signup,
  isLoading,
  error,
  forgotPassword,
  verifyOTP,
  resetPassword,
  clearError
} = useAuth();
```

### Login State (Zustand Store)

- **Purpose**: Global authentication state
- **Scope**: Application-wide
- **Persistence**: localStorage for token

```javascript
const {
  user,
  token,
  isAuthenticated,
  login,
  logout,
  setUser,
  setToken
} = useAuthStore();
```

### State Synchronization

```javascript
// Login sets both service and store state
const response = await authService.login(credentials);
if (response.success) {
  // Store in Zustand for global access
  useAuthStore.getState().login(response.user, response.token);
  
  // Store in AuthService for API calls
  authService.setAuthToken(response.token);
}
```

---

## Integration Examples

### Complete Signup Integration

```javascript
// In SignupPage.jsx
const { signup, isLoading, error } = useAuth();

const handleSignup = async (formData) => {
  try {
    const result = await signup(formData);
    if (result.success) {
      setShowSuccessModal(true);
      // User will need admin verification before login
    } else {
      setError(result.error);
    }
  } catch (err) {
    setError("Signup failed. Please try again.");
  }
};
```

### Complete Login Integration

```javascript
// In LoginPage.jsx
const { login } = useAuthStore();

const handleLogin = async () => {
  try {
    const result = await authService.login({ email, password });
    if (result.success) {
      // Store in global state
      login(result.user, result.token);
      
      // Navigate based on role
      if (result.user.role?.name === "alumni") {
        navigate("/dashboard/alumni");
      }
      // ... other role navigation
    }
  } catch (err) {
    setError("Login failed. Please try again.");
  }
};
```

### Complete Password Reset Integration

```javascript
// In ForgotPasswordPage.jsx
const { forgotPassword, verifyOTP, resetPassword } = useAuth();

// Step 1: Send OTP
const handleSendOTP = async (email) => {
  const result = await forgotPassword(email);
  if (result.success) {
    setCurrentStep(2); // Move to OTP step
  }
};

// Step 2: Verify OTP
const handleVerifyOTP = async (email, otp) => {
  const result = await verifyOTP(email, otp);
  if (result.success) {
    setCurrentStep(3); // Move to password reset step
  }
};

// Step 3: Reset Password
const handleResetPassword = async (email, otp, password, confirmPassword) => {
  const result = await resetPassword(email, otp, password, confirmPassword);
  if (result.success) {
    navigate("/login"); // Redirect to login
  }
};
```

This documentation provides a comprehensive overview of the authentication API integration, data flows, and implementation details for the Alumni Privacy application.