// src/components/foryou/ActionButton.jsx

import React from "react";
import { colors, typography, spacing, borderRadius } from "../../styles/tokens";
import Icon from "./Icon";

const ActionButton = ({
  variant = "follow", // 'follow' | 'message'
  onClick = () => {},
  icon = null,
  label = "",

  disabled = false,
  className = "",
}) => {
  // Button variants
  const variants = {
    follow: {
      backgroundColor: "transparent",
      color: colors.white,
      border: "none",
      fontSize: "16px",
      fontWeight: typography.fontWeight.medium,
      padding: `${spacing.sm} ${spacing.md}`,
      borderRadius: borderRadius.lg,
      height: "auto",
      width: "auto",
    },
    message: {
      backgroundColor: colors.primary,
      color: colors.white,
      border: "none",
      fontSize: "16px",
      fontWeight: typography.fontWeight.semibold,
      padding: `${spacing.lg} ${spacing.xl}`,
      borderRadius: borderRadius.lg,
      height: "56px",
      width: "100%",
    },
  };

  const buttonStyle = {
    fontFamily: typography.fontFamily.primary,
    lineHeight: "150%",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    transition: "all 0.2s ease",
    opacity: disabled ? 0.6 : 1,
    ...variants[variant],
  };

  // Icon configurations
  const iconConfigs = {
    follow: {
      size: 20,
      color: colors.white,
    },
    message: {
      size: 20,
      color: colors.white,
    },
  };

  const iconConfig = iconConfigs[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`hover:opacity-90 transition-opacity ${className}`}
      style={buttonStyle}
    >
      {icon && iconConfig && (
        <Icon name={icon} size={iconConfig.size} color={iconConfig.color} />
      )}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
