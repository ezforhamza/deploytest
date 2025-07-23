// src/components/ui/FilePicker.jsx

import React, { useState, useRef } from "react";
import { colors, typography, spacing, borderRadius } from "../../styles/tokens";
import { Upload, X, File } from "lucide-react";

const FilePicker = ({
  value = null, // File object or null
  onChange,
  label = "",
  placeholder = "Choose file",
  accept = "*/*",
  icon = null,
  error = "",
  disabled = false,
  required = false,
  className = "",
  maxSize = null, // in bytes
  allowedTypes = [], // array of file extensions like ['.pdf', '.doc']
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

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
    paddingRight: value ? "3rem" : spacing.md, // Space for clear button if file selected
    border: `1px solid ${
      error
        ? colors.danger
        : isFocused || isDragOver
        ? colors.primary
        : "#E0E0E0"
    }`,
    borderRadius: borderRadius.lg,
    backgroundColor: disabled
      ? "#F9F9F9"
      : isDragOver
      ? "#F0F9FF"
      : colors.white,
    color: value ? colors.dark : colors.text,
    outline: "none",
    transition: "all 0.2s ease",
    minHeight: "48px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    position: "relative",
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

  const clearButtonStyles = {
    position: "absolute",
    right: spacing.md,
    top: "50%",
    transform: "translateY(-50%)",
    color: colors.text,
    opacity: 0.6,
    cursor: "pointer",
    zIndex: 2,
    padding: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const errorStyles = {
    fontSize: typography.fontSize.small,
    color: colors.danger,
    marginTop: spacing.xs,
  };

  const hiddenInputStyles = {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    border: 0,
  };

  const validateFile = (file) => {
    let validationError = "";

    // Check file size
    if (maxSize && file.size > maxSize) {
      validationError = `File size must be less than ${(
        maxSize /
        1024 /
        1024
      ).toFixed(1)}MB`;
      return validationError;
    }

    // Check file type
    if (allowedTypes.length > 0) {
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        validationError = `File type must be one of: ${allowedTypes.join(
          ", "
        )}`;
        return validationError;
      }
    }

    return validationError;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        if (onChange) onChange(null, validationError);
        return;
      }
      if (onChange) onChange(file, "");
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    if (onChange) onChange(null, "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    if (disabled) return;

    const file = e.dataTransfer.files[0];
    if (file) {
      const validationError = validateFile(file);
      if (validationError) {
        if (onChange) onChange(null, validationError);
        return;
      }
      if (onChange) onChange(file, "");
    }
  };

  const getDisplayText = () => {
    if (value) {
      return value.name;
    }
    return placeholder;
  };

  return (
    <div className={`file-picker-field ${className}`} style={containerStyles}>
      {/* Floating Label */}
      {label && (
        <label style={floatingLabelStyles}>
          {label} {required && <span style={{ color: colors.danger }}>*</span>}
        </label>
      )}

      <div style={{ position: "relative" }}>
        {icon && <div style={iconStyles}>{icon}</div>}

        <div
          style={baseStyles}
          onClick={handleClick}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-label={label || placeholder}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              overflow: "hidden",
            }}
          >
            {value && (
              <File
                size={16}
                color={colors.primary}
                style={{ marginRight: spacing.xs, flexShrink: 0 }}
              />
            )}
            <span
              style={{
                truncate: "ellipsis",
                overflow: "hidden",
                whiteSpace: "nowrap",
                color: value ? colors.dark : colors.text,
              }}
            >
              {getDisplayText()}
            </span>
          </div>
        </div>

        {value && !disabled && (
          <div style={clearButtonStyles} onClick={handleClear}>
            <X size={16} />
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          style={hiddenInputStyles}
          {...props}
        />
      </div>

      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
};

export default FilePicker;
