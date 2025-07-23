# Authentication Architecture Guide

This document explains the technical architecture and design decisions for the authentication system in the Alumni Privacy application.

## Architecture Overview

The authentication system follows a **hybrid approach** with different state management strategies for different user flows:

```
┌─────────────────────────────────────────────────────────────┐
│                    Authentication System                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐              ┌─────────────────┐      │
│  │  Signup Flow    │              │  Login Flow     │      │
│  │                 │              │                 │      │
│  │ ┌─────────────┐ │              │ ┌─────────────┐ │      │
│  │ │ useAuth     │ │              │ │ useAuthStore│ │      │
│  │ │ (React Hook)│ │              │ │ (Zustand)   │ │      │
│  │ │             │ │              │ │             │ │      │
│  │ │ - Temporary │ │              │ │ - Global    │ │      │
│  │ │ - Form      │ │              │ │ - Persistent│ │      │
│  │ │ - No persist│ │              │ │ - Session   │ │      │
│  │ └─────────────┘ │              │ └─────────────┘ │      │
│  └─────────────────┘              └─────────────────┘      │
│                                                             │
│  ┌─────────────────────────────────────────────────────────┤
│  │              Common Services Layer                      │
│  │                                                         │
│  │  ┌───────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │  │ AuthService   │  │ API Client   │  │ Utilities   │  │
│  │  │               │  │              │  │             │  │
│  │  │ - API calls   │  │ - HTTP layer │  │ - Validators│  │
│  │  │ - Business    │  │ - Error      │  │ - Transform │  │
│  │  │   logic       │  │   handling   │  │ - Errors    │  │
│  │  └───────────────┘  └──────────────┘  └─────────────┘  │
│  └─────────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

## Design Rationale

### Why Hybrid Approach?

**Signup Flow (useAuth Hook)**
- ✅ **Temporary Nature**: Users can't access app until admin verification
- ✅ **Form-focused**: Optimized for multi-step form operations
- ✅ **Lightweight**: No need for global state persistence
- ✅ **Isolated**: Signup errors don't affect logged-in state

**Login Flow (Zustand Store)**
- ✅ **Session Management**: Needs persistent global state
- ✅ **App-wide Access**: Multiple components need auth state
- ✅ **Performance**: Avoids prop drilling
- ✅ **Persistence**: Token survives page refreshes

### File Structure

```
src/
├── stores/
│   └── useAuthStore.js          # Zustand store for login state
├── hooks/
│   └── useAuth.js               # React hook for signup/password reset
├── services/
│   └── auth/
│       ├── authService.js       # Main authentication service
│       ├── index.js             # Export barrel
│       ├── validators/
│       │   └── signupValidator.js
│       ├── transformers/
│       │   └── signupDataTransformer.js
│       └── utils/
│           ├── errorHandler.js
│           └── tokenManager.js
├── pages/
│   ├── SignupPage.jsx           # Uses useAuth hook
│   ├── LoginPage.jsx            # Uses useAuthStore
│   └── ForgotPasswordPage.jsx   # Uses useAuth hook
└── components/
    └── auth/                    # Authentication components
```

## State Management Details

### Zustand Store (useAuthStore)

```javascript
// Global state for authenticated users
export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  // Actions
  login: (userData, token) => {
    set({
      user: userData,
      token: token,
      isAuthenticated: true,
    });
    localStorage.setItem("authToken", token);
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("authToken");
  },

  initializeAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      set({ token, isAuthenticated: true });
    }
  }
}));
```

**Used by:**
- LoginPage.jsx
- Any component needing auth state
- Navigation guards
- API interceptors

### React Hook (useAuth)

```javascript
// Local state for forms and temporary operations
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (userData) => {
    // Signup logic - no persistent state
  };

  const forgotPassword = async (email) => {
    // Password reset logic
  };

  return {
    signup,
    forgotPassword,
    verifyOTP,
    resetPassword,
    isLoading,
    error,
    clearError
  };
};
```

**Used by:**
- SignupPage.jsx
- ForgotPasswordPage.jsx
- Any form needing temporary state

## Service Layer Architecture

### AuthService (Main Orchestrator)

```javascript
class AuthService {
  async signup(userData) {
    // 1. Validate data
    validateSignupData(userData);
    
    // 2. Transform to API format
    const apiPayload = transformSignupData(userData);
    
    // 3. Make API call
    const response = await apiClient.post(ENDPOINTS.AUTH.SIGNUP, apiPayload);
    
    // 4. Handle response
    return this.processResponse(response);
  }

  async login(loginData) {
    // Login implementation
  }
}
```

### Modular Utilities

**Validators** (`validators/signupValidator.js`)
```javascript
export function validateSignupData(userData) {
  // Email validation
  // Password strength
  // Required fields
  // Account type specific validation
}

export function extractEmail(userData) {
  // Extract email based on account type
}
```

**Transformers** (`transformers/signupDataTransformer.js`)
```javascript
export function transformSignupData(userData) {
  // Convert form data to API format
  // Handle different account types
  // Clean undefined values
  // Apply business rules
}
```

**Error Handlers** (`utils/errorHandler.js`)
```javascript
export function getErrorMessage(error) {
  // Convert API errors to user-friendly messages
  // Handle different error codes
  // Format validation errors
}

export function handleLoginError(error) {
  // Login-specific error handling
}
```

**Token Manager** (`utils/tokenManager.js`)
```javascript
class TokenManager {
  setAuthToken(token) {
    this.authToken = token;
    localStorage.setItem("authToken", token);
  }
  
  getAuthToken() {
    return this.authToken || localStorage.getItem("authToken");
  }
}
```

## API Integration Layer

### API Client (`api/apiClient.js`)

```javascript
class APIClient {
  async post(endpoint, data) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(data)
      });
      
      return this.handleResponse(response);
    } catch (error) {
      throw new ApiError(error.message, error.status);
    }
  }

  getHeaders() {
    const headers = { ...API_CONFIG.HEADERS };
    const token = tokenManager.getAuthToken();
    
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }
}
```

### Configuration (`api/config.js`)

```javascript
export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/user/sign-up",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password"
  }
};
```

## Data Flow Examples

### Signup Data Flow

```
1. User Input (SignupPage)
   └── Form data collection
   
2. Validation (signupValidator)
   ├── Email format check
   ├── Password strength
   └── Required fields
   
3. Transformation (signupDataTransformer)
   ├── Extract email by account type
   ├── Flatten nested objects
   ├── Format arrays (education, experience)
   └── Clean undefined values
   
4. API Request (authService + apiClient)
   ├── POST /user/sign-up
   ├── Include auth headers
   └── Handle timeout
   
5. Response Processing (errorHandler)
   ├── Success: Return user data
   └── Error: User-friendly message
   
6. UI Update (useAuth hook)
   ├── Success: Show success modal
   └── Error: Display error message
```

### Login Data Flow

```
1. User Input (LoginPage)
   └── Email + password
   
2. Store Action (useAuthStore)
   └── Call authService.login()
   
3. API Request (authService)
   ├── POST /auth/login
   └── Receive user + token
   
4. State Update (useAuthStore)
   ├── Store user in global state
   ├── Store token in localStorage
   └── Set isAuthenticated = true
   
5. Navigation
   ├── Check user role
   └── Navigate to role-specific dashboard
```

### Password Reset Data Flow

```
Step 1: Email → OTP
1. Email input (ForgotPasswordPage)
2. Validation (useAuth)
3. API call (POST /auth/forgot-password)
4. Success: Move to OTP step

Step 2: OTP Verification
1. OTP input (6 digits)
2. Validation (useAuth)
3. API call (POST /auth/verify-otp)
4. Success: Move to password step

Step 3: Password Reset
1. New password + confirmation
2. Validation (password match, strength)
3. API call (POST /auth/reset-password)
4. Success: Navigate to login
```

## Security Considerations

### Token Management
- JWT tokens stored in localStorage
- Automatic token inclusion in API headers
- Token cleared on logout
- Token validated on app initialization

### Password Security
- Minimum 6 character requirement
- Password confirmation validation
- No password storage in components
- Secure transmission to API

### Error Handling
- No sensitive information in error messages
- Generic messages for security errors
- Detailed validation for user experience
- Centralized error logging

### API Security
- HTTPS enforcement
- Request timeout protection
- CORS handling
- Authentication headers

## Performance Optimizations

### Code Splitting
- Lazy loading of auth components
- Separate bundles for signup/login flows
- Dynamic imports for heavy utilities

### State Management
- Minimal re-renders with Zustand
- Local state for temporary operations
- Memoized validation functions
- Debounced form validation

### API Efficiency
- Request deduplication
- Proper error boundary handling
- Optimistic UI updates where appropriate
- Minimal payload sizes

## Testing Strategy

### Unit Tests
- Validator functions
- Transformer functions
- Error handlers
- Token manager

### Integration Tests
- API service methods
- Store actions
- Hook behaviors
- Error scenarios

### E2E Tests
- Complete signup flow
- Login and logout
- Password reset flow
- Error handling paths

## Migration Guide

If you need to change the architecture:

### To Full Zustand
1. Move useAuth logic to store
2. Update component imports
3. Add store persistence
4. Test all flows

### To Full React Hooks
1. Remove Zustand dependencies
2. Add context providers
3. Update login page
4. Handle persistence manually

## Troubleshooting

### Common Issues

**Token not persisting**
- Check localStorage in browser dev tools
- Verify tokenManager.setAuthToken() calls
- Ensure initializeAuth() is called on app start

**State not updating**
- Check Zustand store subscriptions
- Verify component re-renders
- Check for state mutation issues

**API calls failing**
- Check network tab for request details
- Verify endpoint configurations
- Check authentication headers

**Form validation errors**
- Check validator function implementations
- Verify error message handling
- Test edge cases

This architecture provides a robust, scalable foundation for authentication while maintaining clear separation of concerns and optimal performance.