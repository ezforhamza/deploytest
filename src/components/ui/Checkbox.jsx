import React, { useState } from "react";
import { colors, typography, spacing, borderRadius } from "../../styles/tokens";

const Checkbox = ({
  label = "",
  checked = false,
  onChange,
  disabled = false,
  required = false,
  error = "",
  className = "",
  size = "default",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const containerStyles = {
    position: "relative",
    marginBottom: spacing.md,
    display: "flex",
    alignItems: "flex-start",
    gap: spacing.sm,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    outline: "none",
  };

  const checkboxSizes = {
    small: {
      width: "16px",
      height: "16px",
    },
    default: {
      width: "20px",
      height: "20px",
    },
    large: {
      width: "24px",
      height: "24px",
    },
  };

  const checkboxStyles = {
    position: "relative",
    width: checkboxSizes[size].width,
    height: checkboxSizes[size].height,
    minWidth: checkboxSizes[size].width,
    minHeight: checkboxSizes[size].height,
    border: `2px solid ${
      error ? colors.danger : checked ? colors.primary : "#E0E0E0"
    }`,
    borderRadius: borderRadius.sm,
    backgroundColor: checked ? colors.primary : colors.white,
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    outline: isFocused ? `2px solid ${colors.primary}` : "none",
    outlineOffset: "2px",
  };

  const labelStyles = {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.text,
    fontWeight: typography.fontWeight.regular,
    color: error ? colors.danger : colors.text,
    lineHeight: typography.lineHeight.normal,
    userSelect: "none",
    flex: 1,
    paddingTop: "1px", // Small adjustment to align with checkbox
  };

  const errorStyles = {
    fontSize: typography.fontSize.small,
    color: colors.danger,
    marginTop: spacing.xs,
    marginLeft: `calc(${checkboxSizes[size].width} + ${spacing.sm})`,
  };


  const handleClick = () => {
    if (disabled) return;
    if (onChange) onChange(!checked);
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      if (onChange) onChange(!checked);
    }
  };

  // Checkmark SVG icon
  const CheckIcon = () => (
    <svg
      width={size === "small" ? "10" : size === "large" ? "14" : "12"}
      height={size === "small" ? "10" : size === "large" ? "14" : "12"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      style={{ color: colors.white }}
    >
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );

  return (
    <div className={`checkbox-field ${className}`}>
      <div
        style={containerStyles}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={disabled ? -1 : 0}
        role="checkbox"
        aria-checked={checked}
        aria-disabled={disabled}
        aria-required={required}
        aria-invalid={!!error}
      >
        
        <div style={checkboxStyles}>
          {checked && <CheckIcon />}
        </div>

        {label && (
          <label style={labelStyles}>
            {label} {required && <span style={{ color: colors.danger }}>*</span>}
          </label>
        )}
      </div>

      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
};

export default Checkbox;