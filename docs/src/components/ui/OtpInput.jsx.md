# OTP Input Component

**File Path:** `src/components/ui/OtpInput.jsx`

## 📋 Purpose

A specialized input component for entering verification codes (OTP - One Time Password). Designed for the 6-digit verification code step in the forgot password flow, with automatic focus management and paste support.

## 🚀 How to Use

### Import:

```javascript
import OtpInput from "./components/ui/OtpInput";
```

### Basic Usage:

```javascript
const [code, setCode] = useState("");

<OtpInput
  value={code}
  onChange={setCode}
  onComplete={(completeCode) => {
    console.log("Code entered:", completeCode);
  }}
/>;
```

### With Error Handling:

```javascript
const [code, setCode] = useState("");
const [error, setError] = useState("");

<OtpInput
  value={code}
  onChange={(newCode) => {
    setCode(newCode);
    setError(""); // Clear error when user types
  }}
  onComplete={handleVerification}
  error={error}
/>;
```

### Custom Length:

```javascript
<OtpInput length={4} value={code} onChange={setCode} onComplete={handleCode} />
```

## 🎨 Available Props

| Prop          | Type     | Default | Description                       |
| ------------- | -------- | ------- | --------------------------------- |
| `length`      | number   | 6       | Number of input fields            |
| `value`       | string   | ''      | Current OTP value                 |
| `onChange`    | function | -       | Called when any digit changes     |
| `onComplete`  | function | -       | Called when all fields are filled |
| `placeholder` | string   | ''      | Placeholder for empty fields      |
| `disabled`    | boolean  | false   | Disable all inputs                |
| `error`       | string   | ''      | Error message                     |
| `className`   | string   | ''      | Additional CSS classes            |

## ✨ Features

### Smart Navigation:

- **Auto-focus next**: Automatically moves to next field when digit is entered
- **Backspace handling**: Moves to previous field when backspace on empty field
- **Arrow key navigation**: Left/right arrows move between fields
- **Click to focus**: Click any field to start typing there

### Paste Support:

- **Smart paste**: Paste a complete code and it distributes across fields
- **Number filtering**: Only accepts numeric characters from paste
- **Auto-complete**: Calls `onComplete` after successful paste

### Input Validation:

- **Numbers only**: Only accepts numeric input (0-9)
- **Single digit**: Each field accepts only one character
- **Length control**: Configurable number of fields

### Visual States:

- **Focus indication**: Active field shows blue border
- **Error state**: Red borders when error prop is provided
- **Consistent styling**: Matches design system

## 🔧 Common Use Cases

### Email Verification:

```javascript
const [verificationCode, setVerificationCode] = useState("");
const [isVerifying, setIsVerifying] = useState(false);
const [error, setError] = useState("");

const handleVerification = async (code) => {
  setIsVerifying(true);
  setError("");

  try {
    await verifyEmailCode(code);
    // Success - redirect or next step
  } catch (err) {
    setError("Invalid verification code. Please try again.");
  } finally {
    setIsVerifying(false);
  }
};

<OtpInput
  value={verificationCode}
  onChange={setVerificationCode}
  onComplete={handleVerification}
  error={error}
  disabled={isVerifying}
/>;
```

### Phone Verification:

```javascript
<OtpInput
  value={phoneCode}
  onChange={setPhoneCode}
  onComplete={(code) => {
    verifyPhoneNumber(code);
  }}
  placeholder=""
/>
```

### Custom Length Code:

```javascript
// For 4-digit PIN
<OtpInput length={4} value={pin} onChange={setPin} onComplete={handlePin} />
```

## 🎨 Design Integration

### Matches Figma Design:

- **48px × 48px fields** - Perfect touch targets
- **Centered layout** - Visually balanced
- **Proper spacing** - Consistent gaps between fields
- **Focus states** - Blue borders matching primary color
- **Typography** - Larger font size for better readability

### Design System Colors:

- **Border**: Light gray (#E0E0E0) for default state
- **Focus**: Primary blue (#1090CF) for active field
- **Error**: Danger red (#EB5757) for error state
- **Background**: White for input fields

## 📱 Mobile Optimization

- **Numeric keypad**: `inputMode="numeric"` shows number pad on mobile
- **Touch-friendly**: 48px minimum touch target size
- **Proper spacing**: Easy to tap individual fields
- **Paste support**: Works with mobile paste functionality

## 🎯 Keyboard Accessibility

- **Tab navigation**: Use Tab to move between fields
- **Arrow keys**: Left/Right arrows for navigation
- **Backspace**: Smart backspace behavior
- **Delete**: Clear current field
- **Enter**: Submit when complete (if form handles it)

## 📝 Integration Examples

### With Form Validation:

```javascript
const [formData, setFormData] = useState({
  email: "",
  verificationCode: "",
});

<OtpInput
  value={formData.verificationCode}
  onChange={(code) => {
    setFormData((prev) => ({
      ...prev,
      verificationCode: code,
    }));
  }}
  onComplete={(code) => {
    if (code.length === 6) {
      submitForm({ ...formData, verificationCode: code });
    }
  }}
/>;
```

### With Timer/Resend:

```javascript
<div>
  <OtpInput
    value={code}
    onChange={setCode}
    onComplete={verifyCode}
    error={error}
  />

  <div style={{ textAlign: "center", marginTop: "1rem" }}>
    <span>Didn't receive a code? </span>
    <button onClick={resendCode} disabled={timeLeft > 0}>
      {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend code"}
    </button>
  </div>
</div>
```

## 📝 Notes

- Automatically clears error state when user starts typing
- Supports both controlled and uncontrolled usage patterns
- Optimized for both desktop and mobile experiences
- Follows WCAG accessibility guidelines
- Perfect for verification flows in signup/signin processes
