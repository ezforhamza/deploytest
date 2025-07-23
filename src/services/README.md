# API Integration Documentation

This document explains the API integration setup for the signup pages.

## Architecture Overview

The API integration follows a clean, modular architecture with the following components:

### 1. **API Client** (`api/apiClient.js`)
- Generic HTTP client with consistent error handling
- Automatic token management
- Support for JSON and file uploads
- Centralized request/response processing

### 2. **Services**
- **AuthService** (`auth/authService.js`): Handles authentication operations
- **UserService** (`user/userService.js`): Manages user profile and account setup
- **RoleService** (`userRole/roleService.js`): Manages user roles and permissions

### 3. **Hooks**
- **useAuth** (`hooks/useAuth.js`): Authentication state management
- **useFileUpload** (`hooks/useFileUpload.js`): File upload operations with progress tracking

### 4. **Configuration**
- **API Config** (`api/config.js`): Centralized API endpoints and configuration

## API Endpoints

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration (universal for all user types)
- `POST /auth/google-login` - Google OAuth login
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/verify-otp` - OTP verification
- `POST /auth/reset-password` - Password reset
- `POST /auth/change-password` - Change password

### User Management Endpoints
- `GET /user` - Get user profile
- `PUT /user/update-profile` - Update user profile
- `PUT /user/setup-account` - Account setup (after registration)

### Role Management
- `GET /role/list` - Get available user roles

### File Upload Endpoints
- `POST /uploads/image` - Upload profile images
- `POST /uploads/document/file` - Upload documents (CV, certificates)
- `DELETE /uploads/delete` - Delete uploaded files

## Signup Flow

### 1. **Role Selection**
```javascript
// Load available roles
const roles = await roleService.fetchRoles();

// Get role ID for selected account type
const roleId = roleService.getRoleId(selectedAccountType);
```

### 2. **User Registration**
```javascript
// Prepare signup data
const signupData = {
  roleId,
  accountType: selectedAccountType,
  // ... form data
};

// Register user
const result = await authService.signup(signupData);
```

### 3. **Account Setup** (Optional)
```javascript
// Setup additional account information
const accountData = {
  accountType,
  education: [...], // For alumni
  workExperience: [...], // For alumni
  // ... other account-specific data
};

const result = await userService.setupAccount(accountData);
```

## Data Structures

### Alumni Signup Data
```javascript
{
  roleId: "6852b9ac15e2faedc470b128",
  accountType: "alumni",
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1234567890",
    dateOfBirth: "1990-01-01",
    age: 33,
    gender: "male"
  },
  locationInfo: {
    location: {
      type: "Point",
      coordinates: [-74.006, 40.7128],
      address: "New York, NY, USA"
    },
    country: "USA",
    state: "NY"
  },
  education: [...],
  workExperience: [...],
  security: {
    password: "password123",
    confirmPassword: "password123"
  }
}
```

### Company Signup Data
```javascript
{
  roleId: "company-role-id",
  accountType: "company",
  companyInfo: {
    name: "Acme Corp",
    email: "info@acme.com",
    phone: "+1234567890",
    industry: "Technology",
    website: "https://acme.com",
    overview: "Leading tech company..."
  },
  locationInfo: {
    location: {...},
    country: "USA",
    state: "CA"
  },
  security: {
    password: "password123",
    confirmPassword: "password123"
  }
}
```

## Error Handling

The system provides comprehensive error handling:

### API Errors
- **Network errors**: Connection issues, timeouts
- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Authentication failures
- **403 Forbidden**: Access denied
- **409 Conflict**: Duplicate email/username
- **422 Unprocessable Entity**: Validation errors
- **500+ Server errors**: Backend issues

### User-Friendly Messages
```javascript
// Example error handling
try {
  const result = await authService.signup(userData);
} catch (error) {
  if (error.status === 409) {
    showError("An account with this email already exists.");
  } else if (error.isNetworkError) {
    showError("Network error. Please check your connection.");
  } else {
    showError("An unexpected error occurred. Please try again.");
  }
}
```

## Loading States

All forms include proper loading states:

- Button text changes: "Create Account" → "Creating Account..."
- Buttons are disabled during API calls
- Loading spinners for long operations
- Progress bars for file uploads

## Security Features

### Token Management
- Automatic token storage in localStorage
- Token included in all authenticated requests
- Token clearing on logout

### Input Validation
- Client-side validation before API calls
- Server-side validation error handling
- Proper error message display

### File Upload Security
- File type validation
- File size limits (5MB for images, 10MB for documents)
- Secure file upload endpoints

## Usage Examples

### Basic Signup
```javascript
import { useAuth } from '../hooks/useAuth';

const SignupComponent = () => {
  const { signup, isLoading, error } = useAuth();

  const handleSubmit = async (formData) => {
    const result = await signup(formData);
    
    if (result.success) {
      // Handle success
      navigate('/dashboard');
    } else {
      // Handle error
      setError(result.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <ErrorMessage message={error} />}
      <Button disabled={isLoading} type="submit">
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};
```

### File Upload
```javascript
import { useFileUpload } from '../hooks/useFileUpload';

const FileUploadComponent = () => {
  const { uploadDocument, isUploading, uploadProgress } = useFileUpload();

  const handleFileUpload = async (file) => {
    const result = await uploadDocument(file, 'cv');
    
    if (result.success) {
      console.log('File uploaded:', result.fileUrl);
    }
  };

  return (
    <div>
      <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])} />
      {isUploading && <progress value={uploadProgress} max="100" />}
    </div>
  );
};
```

## Environment Configuration

Make sure to set up environment variables:

```env
VITE_API_BASE_URL=https://api.example.com/api/v1
VITE_NODE_ENV=production
```

## Testing

The integration includes proper error fallbacks and development mode features:

- Fallback roles when API is unavailable
- Console logging for debugging
- Structured error responses
- Mock data for development

## Future Enhancements

- Add retry mechanisms for failed requests
- Implement request caching
- Add request cancellation
- Implement optimistic updates
- Add offline mode support