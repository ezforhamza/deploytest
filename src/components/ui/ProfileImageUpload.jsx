import React, { useState, useRef } from "react";
import { colors, typography, spacing } from "../../styles/tokens";
import { Camera, X, User } from "lucide-react";

const ProfileImageUpload = ({
  value = null,
  onChange,
  label = "Profile Picture",
  error = "",
  disabled = false,
  required = false,
  className = "",
  maxSize = 5 * 1024 * 1024, // 5MB default
  ...props
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const allowedTypes = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

  const containerStyles = {
    position: "relative",
    marginBottom: spacing.md,
  };

  const uploadAreaStyles = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: `2px dashed ${
      error ? colors.danger : isDragOver ? colors.primary : "#E0E0E0"
    }`,
    backgroundColor: isDragOver ? "#F0F9FF" : colors.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    opacity: disabled ? 0.6 : 1,
    position: "relative",
    overflow: "hidden",
    margin: "0 auto",
  };

  const imageStyles = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "50%",
  };

  const labelStyles = {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.text,
    fontWeight: typography.fontWeight.medium,
    color: error ? colors.danger : colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
    display: "block",
  };

  const errorStyles = {
    fontSize: typography.fontSize.small,
    color: colors.danger,
    marginTop: spacing.xs,
    textAlign: "center",
  };

  const overlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    opacity: 0,
    transition: "opacity 0.2s ease",
  };

  const removeButtonStyles = {
    position: "absolute",
    top: "8px",
    right: "8px",
    backgroundColor: colors.danger,
    color: colors.white,
    border: "none",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "12px",
    zIndex: 10,
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
      validationError = `Image size must be less than ${(
        maxSize /
        1024 /
        1024
      ).toFixed(1)}MB`;
      return validationError;
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes(fileExtension)) {
      validationError = `Image type must be one of: ${allowedTypes.join(", ")}`;
      return validationError;
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

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      if (onChange) onChange(file, "");
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
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

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      if (onChange) onChange(file, "");
    }
  };

  const displayUrl =
    previewUrl || (value && typeof value === "string" ? value : null);

  return (
    <div
      className={`profile-image-upload ${className}`}
      style={containerStyles}
    >
      {label && (
        <label style={labelStyles}>
          {label} {required && <span style={{ color: colors.danger }}>*</span>}
        </label>
      )}

      <div
        style={uploadAreaStyles}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onMouseEnter={(e) => {
          if (displayUrl) {
            e.target.querySelector(".overlay").style.opacity = "1";
          }
        }}
        onMouseLeave={(e) => {
          if (displayUrl) {
            e.target.querySelector(".overlay").style.opacity = "0";
          }
        }}
      >
        {displayUrl ? (
          <>
            <img src={displayUrl} alt="Profile preview" style={imageStyles} />
            <div className="overlay" style={overlayStyles}>
              <Camera size={24} color={colors.white} />
            </div>
            {!disabled && (
              <button
                type="button"
                onClick={handleRemove}
                style={removeButtonStyles}
                aria-label="Remove image"
              >
                <X size={12} />
              </button>
            )}
          </>
        ) : (
          <>
            <User
              size={32}
              color="#E0E0E0"
              style={{ marginBottom: spacing.xs }}
            />
            <Camera
              size={20}
              color={colors.primary}
              style={{ marginBottom: spacing.xs }}
            />
            <span
              style={{
                fontSize: typography.fontSize.small,
                color: colors.text,
                textAlign: "center",
                lineHeight: "1.2",
              }}
            >
              Click to upload
              <br />
              or drag & drop
            </span>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        style={hiddenInputStyles}
        {...props}
      />

      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
};

export default ProfileImageUpload;
