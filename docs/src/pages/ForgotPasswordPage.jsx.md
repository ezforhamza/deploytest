# ForgotPasswordPage

**File Path:** `src/pages/ForgotPasswordPage.jsx`

## 📋 Purpose

Main page component that orchestrates the 3-step forgot password flow with carousel on desktop.

## 🎯 What It Contains

### 1. **Step Management**

- Tracks current step (1-3)
- Manages form data across steps
- Handles navigation between steps

### 2. **Three Steps**

- **Step 1**: Email input (EmailStep)
- **Step 2**: OTP verification (OtpStep)
- **Step 3**: New password creation (NewPasswordStep)

### 3. **State Management**

- Form data (email, otp)
- Loading states
- Error handling
- Resend code timer

## 🚀 Features

### Layout:

- **Desktop**: Carousel on left, form on right
- **Mobile**: Full-width form only

### API Integration:

- Mock API calls with simulated responses
- Error handling for network failures
- Loading states during API calls

### Navigation:

- Auto-progression through steps
- Back to login functionality
- Success redirect to login page

## 🔧 Step Flow

1. **Email Submission**: Validates email and sends reset code
2. **OTP Verification**: Validates 6-digit code with resend option
3. **Password Reset**: Creates new password with confirmation

## 📝 Mock API Behavior

- **Email Step**: 70% success rate simulation
- **OTP Step**: Accepts "123456" or 60% random success
- **Password Step**: 80% success rate simulation
- **Resend Code**: 30-second countdown timer

## 🎨 Design

- Same carousel as login page
- Consistent spacing and typography
- Responsive layout with proper breakpoints
- Clean step transitions
