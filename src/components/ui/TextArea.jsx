import { useState } from "react";
import { colors, typography, spacing, borderRadius } from "../../styles/tokens";

const TextArea = ({
  placeholder = "",
  value = "",
  onChange,
  label = "",
  icon = null,
  error = "",
  disabled = false,
  required = false,
  className = "",
  rows = 4,
  maxLength = null,
  showCharCount = false,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

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
    paddingTop: showFloatingLabel ? "1.5rem" : spacing.md,
    border: `1px solid ${
      error ? colors.danger : isFocused ? colors.primary : "#E0E0E0"
    }`,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.white,
    color: colors.text,
    outline: "none",
    transition: "all 0.2s ease",
    minHeight: `${rows * 1.5 + 2}rem`,
    resize: "vertical",
    lineHeight: "1.5",
  };

  const floatingLabelStyles = {
    position: "absolute",
    left: icon ? "2.5rem" : "12px",
    top: showFloatingLabel ? "8px" : "50%",
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
    top: showFloatingLabel ? "2.5rem" : "50%",
    transform: showFloatingLabel ? "translateY(-50%)" : "translateY(-50%)",
    color: colors.text,
    opacity: 0.6,
    pointerEvents: "none",
    zIndex: 2,
    transition: "all 0.2s ease",
  };

  const errorStyles = {
    fontSize: typography.fontSize.small,
    color: colors.danger,
    marginTop: spacing.xs,
  };

  const charCountStyles = {
    fontSize: typography.fontSize.small,
    color: colors.text,
    opacity: 0.6,
    marginTop: spacing.xs,
    textAlign: "right",
  };

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  // Simple SVG icons
  const FileTextIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14,2 14,8 20,8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10,9 9,9 8,9" />
    </svg>
  );

  const getIcon = () => {
    if (typeof icon === "string") {
      switch (icon) {
        case "text":
        case "filetext":
          return <FileTextIcon />;
        default:
          return null;
      }
    }
    return icon;
  };

  return (
    <div className={`textarea-field ${className}`} style={containerStyles}>
      {/* Floating Label */}
      {label && (
        <label style={floatingLabelStyles}>
          {label} {required && <span style={{ color: colors.danger }}>*</span>}
        </label>
      )}

      <div style={{ position: "relative" }}>
        {icon && <div style={iconStyles}>{getIcon()}</div>}

        <textarea
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          style={baseStyles}
          {...props}
        />
      </div>

      {error && <div style={errorStyles}>{error}</div>}
      
      {showCharCount && maxLength && (
        <div style={charCountStyles}>
          {value.length}/{maxLength} characters
        </div>
      )}
    </div>
  );
};

export default TextArea;