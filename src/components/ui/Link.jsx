// src/components/ui/Link.jsx

import React from "react";
import { colors, typography } from "../../styles/tokens";

const Link = ({
  children,
  href = "#",
  onClick,
  variant = "primary",
  size = "default",
  underline = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.regular,
    textDecoration: underline ? "underline" : "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    border: "none",
    background: "none",
    padding: 0,
    outline: "none",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      color: colors.primary,
    },
    secondary: {
      color: colors.secondary,
    },
    muted: {
      color: colors.text,
    },
    dark: {
      color: colors.dark,
    },
  };

  const sizes = {
    small: {
      fontSize: typography.fontSize.small,
    },
    default: {
      fontSize: typography.fontSize.text,
    },
    large: {
      fontSize: typography.fontSize.h6,
    },
  };

  const hoverStyles = !disabled
    ? {
        opacity: 0.8,
        textDecoration: "underline",
      }
    : {};

  const linkStyles = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size],
  };

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick(e);
    }
  };

  // If it's a button-like link (has onClick but no href), render as button
  if (onClick && !href) {
    return (
      <button
        className={`link ${className}`}
        style={linkStyles}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        onMouseEnter={(e) => {
          if (!disabled) {
            Object.assign(e.target.style, hoverStyles);
          }
        }}
        onMouseLeave={(e) => {
          if (!disabled) {
            e.target.style.opacity = "1";
            e.target.style.textDecoration = underline ? "underline" : "none";
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
  }

  // Regular link
  return (
    <a
      className={`link ${className}`}
      href={disabled ? undefined : href}
      style={linkStyles}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (!disabled) {
          Object.assign(e.target.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.opacity = "1";
          e.target.style.textDecoration = underline ? "underline" : "none";
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
    </a>
  );
};

export default Link;
