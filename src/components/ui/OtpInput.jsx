// src/components/ui/OtpInput.jsx

import React, { useState, useRef, useEffect } from "react";
import { colors, typography, spacing, borderRadius } from "../../styles/tokens";

const OtpInput = ({
  length = 6,
  value = "",
  onChange,
  onComplete,
  placeholder = "",
  disabled = false,
  error = "",
  className = "",
  autoFocus = false, // Add this prop
  ...props
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  useEffect(() => {
    // Update internal state when value prop changes
    if (value !== otp.join("")) {
      const newOtp = value.split("").slice(0, length);
      while (newOtp.length < length) {
        newOtp.push("");
      }
      setOtp(newOtp);
    }
  }, [value, length]);

  // Add auto-focus effect
  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      // Small delay to ensure the component is fully mounted
      setTimeout(() => {
        inputRefs.current[0].focus();
      }, 100);
    }
  }, [autoFocus]);

  const focusInput = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
      setActiveIndex(index);
    }
  };

  const handleInputChange = (index, inputValue) => {
    // Only allow single digit
    const digit = inputValue.replace(/[^0-9]/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Call onChange callback
    if (onChange) {
      onChange(newOtp.join(""));
    }

    // Auto-focus next input
    if (digit && index < length - 1) {
      focusInput(index + 1);
    }

    // Call onComplete when all fields are filled
    if (
      onComplete &&
      newOtp.every((digit) => digit !== "") &&
      newOtp.join("").length === length
    ) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Move to previous input if current is empty
        focusInput(index - 1);
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        if (onChange) onChange(newOtp.join(""));
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    } else if (e.key === "Delete") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (onChange) onChange(newOtp.join(""));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/[^0-9]/g, "");

    if (pastedData) {
      const newOtp = pastedData.split("").slice(0, length);
      while (newOtp.length < length) {
        newOtp.push("");
      }
      setOtp(newOtp);

      if (onChange) onChange(newOtp.join(""));

      // Focus the next empty input or the last input
      const nextEmptyIndex = newOtp.findIndex((digit) => digit === "");
      const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
      focusInput(focusIndex);

      // Call onComplete if all fields are filled
      if (onComplete && newOtp.every((digit) => digit !== "")) {
        onComplete(newOtp.join(""));
      }
    }
  };

  const inputStyles = (index) => ({
    fontFamily: typography.fontFamily.primary,
    fontSize: "1.5rem",
    fontWeight: typography.fontWeight.medium,
    width: "48px",
    height: "48px",
    textAlign: "center",
    border: `1px solid ${
      error ? colors.danger : activeIndex === index ? colors.primary : "#E0E0E0"
    }`,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    color: colors.dark,
    outline: "none",
    transition: "all 0.2s ease",
    margin: "0 4px",
  });

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  };

  const errorStyles = {
    fontSize: typography.fontSize.small,
    color: colors.danger,
    marginTop: spacing.xs,
    textAlign: "center",
  };

  return (
    <div className={`otp-input ${className}`}>
      <div style={containerStyles}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            placeholder={placeholder}
            disabled={disabled}
            style={inputStyles(index)}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onFocus={() => setActiveIndex(index)}
            onPaste={index === 0 ? handlePaste : undefined}
            {...props}
          />
        ))}
      </div>

      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
};

export default OtpInput;
