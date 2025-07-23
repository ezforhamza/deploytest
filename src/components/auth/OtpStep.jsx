// src/components/auth/OtpStep.jsx

import React from "react";
import { colors, typography, spacing } from "../../styles/tokens";
import OtpInput from "../ui/OtpInput";
import Button from "../ui/Button";
import Link from "../ui/Link";

const OtpStep = ({
  otp,
  setOtp,
  onNext,
  onResendCode,
  isLoading,
  error,
  canResend = true,
  resendTimer = 0,
}) => {
  const handleOtpComplete = (code) => {
    setOtp(code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
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

      {/* Middle Container - Icon, Description, and OTP Input */}
      <div
        style={{
          backgroundColor: colors.white,
          padding: spacing.xl,
          borderRadius: "12px",
          marginBottom: spacing.xl,
        }}
      >
        {/* Email Icon */}
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
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
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
              width: "348px",
              maxWidth: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Enter the verification code we just sent on your Email
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
              width: "348px",
              maxWidth: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Enter the 6-digit verification code
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            onComplete={handleOtpComplete}
            error={error}
            length={6}
            autoFocus={true}
          />
        </div>
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
          disabled={isLoading || otp.length !== 6}
          onClick={handleSubmit}
        >
          {isLoading ? "Verifying..." : "Next →"}
        </Button>

        {/* Resend Code */}
        <div className="text-center">
          <span
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: typography.fontSize.text,
              color: colors.text,
            }}
          >
            Didn't receive a code?{" "}
            {canResend ? (
              <Link
                onClick={onResendCode}
                variant="primary"
                disabled={isLoading}
              >
                Resend code
              </Link>
            ) : (
              <span style={{ color: colors.text }}>
                Resend code in {resendTimer}s
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtpStep;
