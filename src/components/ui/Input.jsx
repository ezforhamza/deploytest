// src/components/ui/Input.jsx

import React, { useState } from "react";
import { colors, typography, spacing, borderRadius } from "../../styles/tokens";

const Input = ({
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  label = "",
  icon = null,
  error = "",
  disabled = false,
  required = false,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  // Show floating label when field has content or is focused
  const showFloatingLabel = value || isFocused;

  const containerStyles = {
    position: "relative",
    marginBottom: spacing.md,
  };

  const baseStyles = {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.text,
    fontWeight: typography.fontWeight.regular,
    width: "100%",
    padding: `${spacing.md} ${spacing.md}`,
    paddingLeft: icon ? "3rem" : spacing.md,
    paddingRight: isPasswordType ? "3rem" : spacing.md,
    border: `1px solid ${
      error ? colors.danger : isFocused ? colors.primary : "#E0E0E0"
    }`,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    color: colors.text,
    outline: "none",
    transition: "all 0.2s ease",
    minHeight: "48px",
  };

  const floatingLabelStyles = {
    position: "absolute",
    left: icon ? "2.5rem" : "12px",
    top: showFloatingLabel ? "-8px" : "50%",
    transform: showFloatingLabel ? "translateY(0)" : "translateY(-50%)",
    fontSize: showFloatingLabel
      ? typography.fontSize.small
      : typography.fontSize.text,
    fontWeight: typography.fontWeight.medium,
    color: error ? colors.danger : isFocused ? colors.primary : colors.text,
    backgroundColor: colors.white,
    padding: showFloatingLabel ? "0 4px" : "0",
    transition: "all 0.2s ease",
    pointerEvents: "none",
    opacity: showFloatingLabel ? 1 : 0,
    zIndex: 1,
  };

  const iconStyles = {
    position: "absolute",
    left: spacing.md,
    top: "50%",
    transform: "translateY(-50%)",
    color: colors.text,
    opacity: 0.6,
    pointerEvents: "none",
    zIndex: 2,
  };

  const eyeIconStyles = {
    position: "absolute",
    right: spacing.md,
    top: "50%",
    transform: "translateY(-50%)",
    color: colors.text,
    opacity: 0.6,
    cursor: "pointer",
    padding: "4px",
    zIndex: 2,
  };

  const errorStyles = {
    fontSize: typography.fontSize.small,
    color: colors.danger,
    marginTop: spacing.xs,
  };

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  // Simple SVG icons
  const EyeIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

  const MailIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const LockIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <circle cx="12" cy="16" r="1" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );

  const getIcon = () => {
    if (typeof icon === "string") {
      switch (icon) {
        case "mail":
        case "email":
          return <MailIcon />;
        case "lock":
        case "password":
          return <LockIcon />;
        case "phone":
          return <PhoneIcon />;
        default:
          return null;
      }
    }
    return icon;
  };

  return (
    <div className={`input-field ${className}`} style={containerStyles}>
      {/* Floating Label */}
      {label && (
        <label style={floatingLabelStyles}>
          {label} {required && <span style={{ color: colors.danger }}>*</span>}
        </label>
      )}

      <div style={{ position: "relative" }}>
        {icon && <div style={iconStyles}>{getIcon()}</div>}

        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          style={baseStyles}
          {...props}
        />

        {isPasswordType && (
          <div
            style={eyeIconStyles}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </div>
        )}
      </div>

      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
};

export default Input;
