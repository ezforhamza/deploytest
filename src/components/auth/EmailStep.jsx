// src/components/auth/EmailStep.jsx

import React from "react";
import { colors, typography, spacing } from "../../styles/tokens";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "../ui/Link";

const EmailStep = ({
  email,
  setEmail,
  onNext,
  onBackToLogin,
  isLoading,
  error,
}) => {
  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidEmail(email)) {
      onNext();
    }
  };

  // Check if email is valid for button state
  const isEmailValid = email && isValidEmail(email);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Top Container - Forgot Password Title */}
      <div className="text-center mb-8">
        <h1
          style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize.h4,
            fontWeight: 600,
            lineHeight: "33px",
            letterSpacing: "1%",
            color: colors.dark,
            margin: 0,
            textAlign: "center",
          }}
        >
          Forgot Password
        </h1>
      </div>

      {/* Middle Container - Icon, Description, and Input */}
      <div
        style={{
          backgroundColor: colors.white,
          padding: spacing.xl,
          borderRadius: "12px",
          marginBottom: spacing.xl,
        }}
      >
        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: colors.white,
              borderRadius: "12px",
              border: `2px solid ${colors.primary}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.primary}
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <circle cx="12" cy="16" r="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>

        {/* Description Text */}
        <div className="text-center mb-6">
          <p
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "25px",
              fontWeight: 600,
              lineHeight: "33px",
              letterSpacing: "1%",
              textAlign: "center",
              color: colors.dark,
              margin: 0,
              maxWidth: "332px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Please enter the email address linked with your account
          </p>
        </div>

        {/* Email Input */}
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={setEmail}
          icon="mail"
          error={
            error ||
            (email && !isValidEmail(email)
              ? "Please enter a valid email address"
              : "")
          }
          required
        />
      </div>

      {/* Bottom Container - Buttons */}
      <div
        style={{
          backgroundColor: colors.white,
          padding: spacing.xl,
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          gap: spacing.md,
        }}
      >
        {/* Next Button */}
        <Button
          type="submit"
          fullWidth
          disabled={isLoading || !isEmailValid}
          onClick={handleSubmit}
        >
          {isLoading ? "Sending..." : "Next →"}
        </Button>

        {/* Back to Login */}
        <div className="text-center">
          <Link onClick={onBackToLogin} variant="muted">
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmailStep;
