# OtpStep Component

**File Path:** `src/components/auth/OtpStep.jsx`

## 📋 Purpose

The second step in the forgot password flow. Handles 6-digit OTP verification from email.

## 🚀 How to Use

### Import:

```javascript
import OtpStep from "./components/auth/OtpStep";
```

### Basic Usage:

```javascript
<OtpStep
  otp={otp}
  setOtp={setOtp}
  onNext={handleOtpSubmit}
  onResendCode={handleResendCode}
  isLoading={isLoading}
  error={error}
  canResend={canResend}
  resendTimer={resendTimer}
/>
```

## 🎨 Available Props

| Prop           | Type     | Default | Description                       |
| -------------- | -------- | ------- | --------------------------------- |
| `otp`          | string   | -       | Current OTP input value           |
| `setOtp`       | function | -       | OTP state setter function         |
| `onNext`       | function | -       | Called when Next button clicked   |
| `onResendCode` | function | -       | Called when resend code clicked   |
| `isLoading`    | boolean  | -       | Loading state for API calls       |
| `error`        | string   | -       | Error message to display          |
| `canResend`    | boolean  | true    | Whether resend code is available  |
| `resendTimer`  | number   | 0       | Countdown timer for resend option |

## 🎯 Features

- **6-Digit OTP Input**: Auto-focus and smart navigation
- **Email Icon**: Visual indicator for email verification
- **Resend Code**: With countdown timer functionality
- **Auto-complete**: Button enables when all 6 digits entered
- **Error Handling**: Displays verification errors

## 📝 Design

- Email icon in bordered container
- Centered OTP input with 6 fields
- Resend code with timer display
- Consistent spacing and typography
