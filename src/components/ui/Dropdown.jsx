// src/components/ui/Dropdown.jsx

import React, { useState, useRef, useEffect } from "react";
import { colors, typography, spacing, borderRadius } from "../../styles/tokens";

const Dropdown = ({
  options = [],
  value = "",
  onChange,
  label = "",
  placeholder = "Select an option",
  icon = null,
  error = "",
  disabled = false,
  required = false,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);

  // Show floating label when field has content or is focused
  const showFloatingLabel = value || isFocused || isOpen;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    paddingRight: "3rem", // Space for dropdown arrow
    border: `1px solid ${
      error ? colors.danger : isFocused || isOpen ? colors.primary : "#E0E0E0"
    }`,
    borderRadius: borderRadius.lg,
    backgroundColor: disabled ? "#F9F9F9" : colors.white,
    color: value ? colors.dark : colors.text,
    outline: "none",
    transition: "all 0.2s ease",
    minHeight: "48px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
    color: error
      ? colors.danger
      : isFocused || isOpen
      ? colors.primary
      : colors.text,
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

  const arrowStyles = {
    position: "absolute",
    right: spacing.md,
    top: "50%",
    transform: `translateY(-50%) ${isOpen ? "rotate(180deg)" : "rotate(0deg)"}`,
    color: colors.text,
    opacity: 0.6,
    pointerEvents: "none",
    zIndex: 2,
    transition: "transform 0.2s ease",
  };

  const dropdownListStyles = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    border: `1px solid ${colors.primary}`,
    borderRadius: borderRadius.lg,
    marginTop: "4px",
    zIndex: 10,
    maxHeight: "200px",
    overflowY: "auto",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  };

  const optionStyles = (isSelected, isHovered) => ({
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.text,
    padding: `${spacing.sm} ${spacing.md}`,
    cursor: "pointer",
    backgroundColor: isSelected
      ? colors.primary
      : isHovered
      ? "#F8F9FA"
      : colors.white,
    color: isSelected ? colors.white : colors.dark,
    transition: "all 0.15s ease",
    borderBottom: "1px solid #F0F0F0",
  });

  const errorStyles = {
    fontSize: typography.fontSize.small,
    color: colors.danger,
    marginTop: spacing.xs,
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  const handleOptionSelect = (optionValue) => {
    if (onChange) onChange(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  // Find selected option label
  const selectedOption = options.find((option) => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Custom arrow icon
  const ArrowIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );

  return (
    <div
      className={`dropdown-field ${className}`}
      style={containerStyles}
      ref={dropdownRef}
    >
      {/* Floating Label */}
      {label && (
        <label style={floatingLabelStyles}>
          {label} {required && <span style={{ color: colors.danger }}>*</span>}
        </label>
      )}

      {/* Dropdown Button */}
      <div
        style={baseStyles}
        onClick={handleToggle}
        onFocus={() => setIsFocused(true)}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleToggle();
          }
        }}
        {...props}
      >
        {icon && <div style={iconStyles}>{icon}</div>}

        <span
          style={{
            color: value ? colors.dark : colors.text,
            flex: 1,
            textAlign: "left",
          }}
        >
          {displayText}
        </span>

        <div style={arrowStyles}>
          <ArrowIcon />
        </div>
      </div>

      {/* Dropdown List */}
      {isOpen && !disabled && (
        <div style={dropdownListStyles}>
          {options.map((option, index) => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                style={optionStyles(isSelected, false)}
                onClick={() => handleOptionSelect(option.value)}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.target.style.backgroundColor = "#F8F9FA";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.target.style.backgroundColor = colors.white;
                  }
                }}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}

      {error && <div style={errorStyles}>{error}</div>}
    </div>
  );
};

export default Dropdown;
