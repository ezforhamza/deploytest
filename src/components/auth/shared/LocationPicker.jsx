import { useState, useRef, useEffect } from "react";
import { MapPin, Loader2, Navigation, Edit3 } from "lucide-react";
import {
  colors,
  typography,
  spacing,
  borderRadius,
} from "../../../styles/tokens";
import {
  getCurrentLocationWithAddress,
  forwardGeocode,
} from "../../../utils/locationService";

const LocationPicker = ({
  value = null, // Expected format: { type: "Point", coordinates: [lng, lat], address: "string" }
  onChange,
  label = "Location",
  placeholder = "Enter your address",
  error = "",
  disabled = false,
  required = false,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [isManualEntry, setIsManualEntry] = useState(false);
  const [manualAddress, setManualAddress] = useState("");
  const inputRef = useRef(null);
  const [locationPermission, setLocationPermission] = useState(null);

  // Show floating label when field has content or is focused
  const showFloatingLabel = value || isFocused || isManualEntry;

  // Check location permission status and device capabilities on mount
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setLocationPermission(result.state);

        // If location is denied, start with manual entry
        if (result.state === "denied") {
          setIsManualEntry(true);
        }

        result.onchange = () => {
          setLocationPermission(result.state);
          // Auto-switch to manual entry if permission is denied
          if (result.state === "denied") {
            setIsManualEntry(true);
          }
        };
      });
    }

    // Check if we're on a desktop/laptop device (less reliable location)
    const isDesktop =
      !("ontouchstart" in window) && navigator.maxTouchPoints === 0;
    const isLowAccuracy =
      !navigator.geolocation ||
      navigator.userAgent.includes("Mac") ||
      navigator.userAgent.includes("Windows");

    // For desktop devices, start with manual entry as default
    if (isDesktop || isLowAccuracy) {
      setIsManualEntry(true);
    }
  }, []);

  // Initialize manual address if value exists
  useEffect(() => {
    if (value && value.address) {
      setManualAddress(value.address);
    }
  }, [value]);

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
    paddingLeft: "3rem", // Space for icon
    paddingRight: isLoading ? "3rem" : spacing.md, // Space for loading icon
    border: `1px solid ${
      error || locationError
        ? colors.danger
        : isFocused
        ? colors.primary
        : "#E0E0E0"
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
    position: "relative",
  };

  const floatingLabelStyles = {
    position: "absolute",
    left: "2.5rem",
    top: showFloatingLabel ? "-8px" : "50%",
    transform: showFloatingLabel ? "translateY(0)" : "translateY(-50%)",
    fontSize: showFloatingLabel
      ? typography.fontSize.small
      : typography.fontSize.text,
    fontWeight: typography.fontWeight.medium,
    color:
      error || locationError
        ? colors.danger
        : isFocused
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

  const loadingIconStyles = {
    position: "absolute",
    right: spacing.md,
    top: "50%",
    transform: "translateY(-50%)",
    color: colors.primary,
    zIndex: 2,
  };

  const errorStyles = {
    fontSize: typography.fontSize.small,
    color: colors.danger,
    marginTop: spacing.xs,
  };

  const getCurrentLocation = async () => {
    setIsLoading(true);
    setLocationError("");

    try {
      const options = {
        enableHighAccuracy: false, // Use network-based location for faster response
        timeout: 6000, // Reduce timeout to 6 seconds
        maximumAge: 600000, // Cache location for 10 minutes
      };

      const locationObj = await getCurrentLocationWithAddress(options);

      if (onChange) {
        onChange(locationObj);
      }
      setIsManualEntry(false);
    } catch (error) {
      console.error("Location error:", error);

      // Check error types and provide appropriate messages
      const isTimeoutError =
        error.message.includes("timed out") ||
        error.message.includes("timeout");
      const isPermissionError =
        error.message.includes("denied") || error.message.includes("access");
      const isUnavailableError =
        error.message.includes("unavailable") ||
        error.message.includes("unknown");

      let userMessage = "";

      if (isPermissionError) {
        userMessage =
          "Location access denied. Please enter your address manually.";
      } else if (isTimeoutError) {
        userMessage =
          "Location detection timed out. Please enter your address manually.";
      } else if (isUnavailableError) {
        userMessage =
          "Location services unavailable on this device. Please enter your address manually.";
      } else {
        userMessage =
          "Unable to detect location. Please enter your address manually.";
      }

      // Always switch to manual entry for any location error
      setIsManualEntry(true);
      setLocationError(userMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualAddressSubmit = async () => {
    if (!manualAddress.trim()) {
      setLocationError("Please enter an address");
      return;
    }

    setIsLoading(true);
    setLocationError("");

    try {
      const locationObj = await forwardGeocode(manualAddress);

      if (onChange) {
        onChange(locationObj);
      }
      setIsManualEntry(false);
    } catch (error) {
      console.error("Geocoding error:", error);
      setLocationError("Could not find location. Please check your address.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualAddressChange = (e) => {
    setManualAddress(e.target.value);
    setLocationError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && isManualEntry) {
      e.preventDefault();
      handleManualAddressSubmit();
    }
  };

  const switchToManualEntry = () => {
    setIsManualEntry(true);
    setLocationError("");
    setManualAddress(value?.address || "");
  };

  const switchToGeolocation = () => {
    setIsManualEntry(false);
    setLocationError("");
  };

  const handleClick = () => {
    if (!disabled && !isLoading) {
      if (isManualEntry) {
        inputRef.current?.focus();
      } else {
        getCurrentLocation();
      }
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getDisplayText = () => {
    if (isManualEntry) {
      return manualAddress;
    }
    if (value && value.address) {
      return value.address;
    }
    if (isLoading) {
      return "Getting your location...";
    }
    if (locationPermission === "denied") {
      return "Enter your address";
    }
    return placeholder;
  };

  const getLocationButtonText = () => {
    if (locationPermission === "denied") {
      return "Location denied";
    }
    if (isLoading) {
      return "Getting location...";
    }
    return "Try auto-location";
  };

  return (
    <div
      className={`location-picker-field ${className}`}
      style={containerStyles}
    >
      {/* Floating Label */}
      {label && (
        <label style={floatingLabelStyles}>
          {label} {required && <span style={{ color: colors.danger }}>*</span>}
        </label>
      )}

      <div style={{ position: "relative" }}>
        <div style={iconStyles}>
          <MapPin size={20} />
        </div>

        {isManualEntry ? (
          <input
            ref={inputRef}
            type="text"
            value={manualAddress}
            onChange={handleManualAddressChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder="Enter your address"
            style={{
              ...baseStyles,
              border: `1px solid ${
                error || locationError
                  ? colors.danger
                  : isFocused
                  ? colors.primary
                  : "#E0E0E0"
              }`,
            }}
            disabled={disabled}
            {...props}
          />
        ) : (
          <div
            ref={inputRef}
            style={baseStyles}
            onClick={handleClick}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={disabled ? -1 : 0}
            role="button"
            aria-label={label || placeholder}
            {...props}
          >
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                color: value ? colors.dark : colors.text,
                flex: 1,
              }}
            >
              {getDisplayText()}
            </span>
          </div>
        )}

        {isLoading && (
          <div style={loadingIconStyles}>
            <Loader2 size={16} className="animate-spin" />
          </div>
        )}
      </div>

      {/* Control buttons */}
      <div
        style={{
          display: "flex",
          gap: spacing.xs,
          marginTop: spacing.xs,
          alignItems: "center",
        }}
      >
        {isManualEntry ? (
          <>
            <button
              type="button"
              onClick={handleManualAddressSubmit}
              disabled={disabled || isLoading || !manualAddress.trim()}
              style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                backgroundColor: colors.primary,
                color: colors.white,
                border: "none",
                borderRadius: borderRadius.sm,
                fontSize: typography.fontSize.small,
                cursor: disabled || isLoading ? "not-allowed" : "pointer",
                opacity:
                  disabled || isLoading || !manualAddress.trim() ? 0.5 : 1,
              }}
            >
              Search
            </button>
            <button
              type="button"
              onClick={switchToGeolocation}
              disabled={disabled || isLoading}
              style={{
                padding: `${spacing.xs} ${spacing.sm}`,
                backgroundColor: "transparent",
                color: colors.primary,
                border: `1px solid ${colors.primary}`,
                borderRadius: borderRadius.sm,
                fontSize: typography.fontSize.small,
                cursor: disabled || isLoading ? "not-allowed" : "pointer",
                opacity: disabled || isLoading ? 0.5 : 1,
                display: "flex",
                alignItems: "center",
                gap: spacing.xs,
              }}
            >
              <Navigation size={12} />
              {getLocationButtonText()}
            </button>
          </>
        ) : locationPermission === "denied" ? (
          <button
            type="button"
            onClick={switchToManualEntry}
            disabled={disabled}
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              backgroundColor: colors.secondary,
              color: colors.white,
              border: "none",
              borderRadius: borderRadius.sm,
              fontSize: typography.fontSize.small,
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              gap: spacing.xs,
            }}
          >
            <Edit3 size={12} />
            Enter address manually
          </button>
        ) : (
          <button
            type="button"
            onClick={switchToManualEntry}
            disabled={disabled}
            style={{
              padding: `${spacing.xs} ${spacing.sm}`,
              backgroundColor: "transparent",
              color: colors.text,
              border: `1px solid #E0E0E0`,
              borderRadius: borderRadius.sm,
              fontSize: typography.fontSize.small,
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.5 : 1,
              display: "flex",
              alignItems: "center",
              gap: spacing.xs,
            }}
          >
            <Edit3 size={12} />
            Enter manually
          </button>
        )}
      </div>

      {(error || locationError) && (
        <div style={errorStyles}>{error || locationError}</div>
      )}
    </div>
  );
};

export default LocationPicker;
