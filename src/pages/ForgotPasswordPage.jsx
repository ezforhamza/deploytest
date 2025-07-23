// src/pages/ForgotPasswordPage.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/ui/Carousel";
import EmailStep from "../components/auth/EmailStep";
import OtpStep from "../components/auth/OtpStep";
import NewPasswordStep from "../components/auth/NewPasswordStep";
import authService from "../services/auth/authService";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  // Step management
  const [currentStep, setCurrentStep] = useState(1);

  // Form data
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Resend code timer
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  // Carousel images (same as login page)
  const carouselImages = [
    "/crousal/onboarding-slide-1.png",
    "/crousal/onboarding-slide-2.png",
    "/crousal/onboarding-slide-3.png",
  ];

  // Step 1: Handle email submission
  const handleEmailSubmit = async () => {
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await authService.forgotPassword(email);

      if (result.success) {
        console.log("Password reset email sent to:", email);
        setCurrentStep(2);
      } else {
        setError(result.error || "Failed to send reset email. Please try again.");
      }
    } catch (err) {
      console.error("Error sending reset email:", err);
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Handle OTP verification
  const handleOtpSubmit = async () => {
    if (otp.length !== 6) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await authService.verifyOtp(email, otp);

      if (result.success) {
        console.log("OTP verified successfully:", otp);
        setCurrentStep(3);
      } else {
        setError(result.error || "Invalid verification code. Please try again.");
      }
    } catch (err) {
      setError("Failed to verify code. Please try again.");
      console.error("Error verifying OTP:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 3: Handle password reset
  const handlePasswordReset = async ({ newPassword, confirmPassword }) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.resetPassword(email, otp, newPassword, confirmPassword);

      if (result.success) {
        console.log("Password updated successfully");

        // Show success message and redirect to login
        alert(
          "Password updated successfully! Please log in with your new password."
        );
        navigate("/login");
      } else {
        setError(result.error || "Failed to update password. Please try again.");
      }
    } catch (err) {
      setError("Failed to update password. Please try again.");
      console.error("Error updating password:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend code
  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await authService.forgotPassword(email);

      if (result.success) {
        console.log("Resend code to:", email);

        // Start countdown timer
        setCanResend(false);
        setResendTimer(30);

        const countdown = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(result.error || "Failed to resend code. Please try again.");
      }
    } catch (err) {
      console.error("Error resending code:", err);
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back to login
  const handleBackToLogin = () => {
    navigate("/login");
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <EmailStep
            email={email}
            setEmail={setEmail}
            onNext={handleEmailSubmit}
            onBackToLogin={handleBackToLogin}
            isLoading={isLoading}
            error={error}
          />
        );

      case 2:
        return (
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
        );

      case 3:
        return (
          <NewPasswordStep
            onComplete={handlePasswordReset}
            isLoading={isLoading}
            error={error}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Carousel */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br items-center justify-center">
        <Carousel images={carouselImages} />
      </div>

      {/* Right Side - Current Step */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {renderStep()}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
