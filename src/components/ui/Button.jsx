// src/components/ui/Button.jsx

import React from "react";
import { colors, typography, spacing, borderRadius } from "../../styles/tokens";

const Button = ({
  children,
  variant = "primary",
  size = "default",
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  ...props
}) => {
  const baseStyles = {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.button,
    fontWeight: typography.fontWeight.regular,
    border: "none",
    borderRadius: borderRadius.lg,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textDecoration: "none",
    outline: "none",
    width: fullWidth ? "100%" : "auto",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      backgroundColor: colors.primary,
      color: colors.white,
    },
    secondary: {
      backgroundColor: colors.secondary,
      color: colors.white,
    },
    outline: {
      backgroundColor: "transparent",
      color: colors.primary,
      border: `1px solid ${colors.primary}`,
    },
  };

  const sizes = {
    small: {
      padding: `${spacing.sm} ${spacing.md}`,
      fontSize: typography.fontSize.small,
      minHeight: "36px",
    },
    default: {
      padding: `${spacing.md} ${spacing.lg}`,
      fontSize: typography.fontSize.button,
      minHeight: "48px",
    },
    large: {
      padding: `${spacing.lg} ${spacing.xl}`,
      fontSize: typography.fontSize.text,
      minHeight: "56px",
    },
  };

  const hoverStyles = !disabled
    ? {
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px rgba(16, 144, 207, 0.3)",
      }
    : {};

  const buttonStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
  };

  const handleClick = (e) => {
    if (disabled) return;
    if (onClick) onClick(e);
  };

  return (
    <button
      className={`btn ${className}`}
      style={buttonStyles}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      onMouseEnter={(e) => {
        if (!disabled) {
          Object.assign(e.target.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "none";
        }
      }}
      onFocus={(e) => {
        e.target.style.outline = `2px solid ${colors.primary}`;
        e.target.style.outlineOffset = "2px";
      }}
      onBlur={(e) => {
        e.target.style.outline = "none";
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
