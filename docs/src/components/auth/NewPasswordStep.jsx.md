# NewPasswordStep Component

**File Path:** `src/components/auth/NewPasswordStep.jsx`

## 📋 Purpose

The final step in the forgot password flow. Allows users to create a new password with confirmation.

## 🚀 How to Use

### Import:

```javascript
import NewPasswordStep from "./components/auth/NewPasswordStep";
```

### Basic Usage:

```javascript
<NewPasswordStep
  onComplete={handlePasswordReset}
  isLoading={isLoading}
  error={error}
/>
```

## 🎨 Available Props

| Prop         | Type     | Description                   |
| ------------ | -------- | ----------------------------- |
| `onComplete` | function | Called with new password data |
| `isLoading`  | boolean  | Loading state for API calls   |
| `error`      | string   | Error message to display      |

## 🎯 Features

- **Password Validation**: Minimum 8 characters required
- **Password Confirmation**: Ensures passwords match
- **Lock Icon**: Visual indicator for security
- **Real-time Validation**: Shows errors as user types
- **Update Button**: Disabled until valid passwords entered

## 📝 Validation Rules

- **Minimum Length**: 8 characters required
- **Password Match**: New password and confirmation must match
- **Error Display**: Clear error messages for validation failures

## 💡 Callback Data

The `onComplete` callback receives an object with:

```javascript
{
  newPassword: string,
  confirmPassword: string
}
```

## 📝 Design

- Lock icon in bordered container
- Two password input fields with floating labels
- Centered layout with consistent spacing
- Uses design system colors and typography
