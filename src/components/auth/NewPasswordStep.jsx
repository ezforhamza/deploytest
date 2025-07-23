// src/components/auth/NewPasswordStep.jsx

import React, { useState } from "react";
import { colors, typography, spacing } from "../../styles/tokens";
import Input from "../ui/Input";
import Button from "../ui/Button";

const NewPasswordStep = ({ onComplete, isLoading, error }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setValidationError("Password must be at least 8 characters");
      return;
    }

    setValidationError("");
    onComplete({ newPassword, confirmPassword });
  };

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

      {/* Middle Container - Icon, Description, and Inputs */}
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

        {/* Main Description Text */}
        <div className="text-center mb-4">
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
            Create New Password
          </p>
        </div>

        {/* Subtitle Text */}
        <div className="text-center mb-6">
          <p
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "12.8px",
              fontWeight: 400,
              lineHeight: "150%",
              letterSpacing: "0%",
              textAlign: "center",
              color: colors.text,
              margin: 0,
              maxWidth: "332px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Please create a new password for your account
          </p>
        </div>

        {/* Password Inputs */}
        <div className="space-y-4">
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={setNewPassword}
            icon="lock"
            label="New Password"
            error={
              validationError && validationError.includes("8 characters")
                ? validationError
                : ""
            }
            required
          />

          <Input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            icon="lock"
            label="Confirm Password"
            error={
              validationError && validationError.includes("match")
                ? validationError
                : ""
            }
            required
          />

          {error && (
            <div
              style={{
                color: colors.danger,
                fontSize: "14px",
                textAlign: "center",
                fontFamily: typography.fontFamily.primary,
              }}
            >
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Container - Button */}
      <div
        style={{
          backgroundColor: colors.white,
          padding: spacing.xl,
          borderRadius: "12px",
        }}
      >
        <Button
          type="submit"
          fullWidth
          disabled={isLoading || !newPassword || !confirmPassword}
          onClick={handleSubmit}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </div>
    </div>
  );
};

export default NewPasswordStep;
