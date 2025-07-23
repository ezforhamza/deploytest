# EmailStep Component

**File Path:** `src/components/auth/EmailStep.jsx`

## 📋 Purpose

The first step in the forgot password flow. Allows users to enter their email address to receive a password reset code.

## 🚀 How to Use

### Import:

```javascript
import EmailStep from "./components/auth/EmailStep";
```

### Basic Usage:

```javascript
<EmailStep
  email={email}
  setEmail={setEmail}
  onNext={handleEmailSubmit}
  onBackToLogin={handleBackToLogin}
  isLoading={isLoading}
  error={error}
/>
```

## 🎨 Available Props

| Prop            | Type     | Description                     |
| --------------- | -------- | ------------------------------- |
| `email`         | string   | Current email input value       |
| `setEmail`      | function | Email state setter function     |
| `onNext`        | function | Called when Next button clicked |
| `onBackToLogin` | function | Called when back link clicked   |
| `isLoading`     | boolean  | Loading state for API calls     |
| `error`         | string   | Error message to display        |

## 🎯 Features

- **Email Validation**: Built-in email format validation
- **Lock Icon**: Visual indicator for security
- **Next Button**: Disabled until valid email entered
- **Back to Login**: Navigation link to return to login
- **Error Handling**: Displays API and validation errors

## 📝 Design

- White containers with 12px border radius
- Lock icon in bordered container
- Centered layout with consistent spacing
- Uses design system typography and colors
