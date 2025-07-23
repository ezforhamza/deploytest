// src/components/layout/SideNavigation.jsx

import React from "react";
import { MapPin } from "lucide-react";
import { colors, typography, spacing } from "../../styles/tokens";
import useScreenSize from "../../hooks/useScreenSize";

const SideNavigation = ({
  activeItem = "Home",
  onItemClick = () => {},
  userProfile = null,
  className = "",
  navigationItems = [
    {
      id: "Home",
      label: "Home",
      icon: "/icons/home.svg",
    },
    {
      id: "For You",
      label: "For You",
      icon: "/icons/foryou.svg",
    },
    {
      id: "Job Offers",
      label: "Job Offers",
      icon: "/icons/job-offers.svg",
    },
    {
      id: "Schools",
      label: "Schools",
      icon: "/icons/school.svg",
    },
    {
      id: "Profile",
      label: "Profile",
      icon: "/icons/profile.svg",
    },
  ],
  height = "1111px",
  showProfile = true,
  showCurvedBackground = true,
  backgroundColor = "#F8F9FA",
  curvedBackgroundColor = "white",
}) => {
  const { isMobile, isLaptop } = useScreenSize();

  // Calculate the top position for the curved background based on active item
  const getBackgroundPosition = (itemId) => {
    const itemIndex = navigationItems.findIndex((item) => item.id === itemId);
    const baseTop = isLaptop ? 120 : 195; // Reduced for laptop
    const itemSpacing = isLaptop ? 80 : 146; // Reduced spacing for laptop
    return baseTop + itemIndex * itemSpacing;
  };

  const backgroundTopPosition = getBackgroundPosition(activeItem);

  // Responsive width - smaller on mobile and laptop
  const componentWidth = isMobile ? "120px" : isLaptop ? "250px" : "270px";

  const containerStyles = {
    position: "relative",
    width: componentWidth,
    height: height === "auto" ? "min-content" : height,
    minHeight: height === "auto" ? "400px" : height,
    backgroundColor: backgroundColor,
    display: "flex",
    flexDirection: "column",
    overflow: "visible",
  };

  const curvedBackgroundStyles = {
    position: "absolute",
    left: 0,
    top: 0,
    width: componentWidth,
    height: height === "auto" ? "100%" : height,
    zIndex: 1,
  };

  const profileSectionStyles = {
    position: "relative",
    zIndex: 2,
    padding: isMobile
      ? `${spacing.lg} ${spacing.sm}`
      : isLaptop
      ? `${spacing.md} ${spacing.sm}`
      : `${spacing.lg} ${spacing.md}`,
    display: "flex",
    alignItems: "center",
    gap: isMobile ? 0 : isLaptop ? spacing.sm : spacing.md,
    marginBottom: isLaptop ? spacing.md : spacing.xl,
    justifyContent: isMobile ? "center" : "flex-start",
  };

  const profileImageStyles = {
    width: isLaptop ? "70px" : "95px",
    height: isLaptop ? "70px" : "95px",
    borderRadius: "100px",
    backgroundColor: "#808080",
    overflow: "hidden",
    flexShrink: 0,
  };

  const profileInfoStyles = {
    display: isMobile ? "none" : "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const profileNameStyles = {
    fontFamily: typography.fontFamily.primary,
    fontSize: isLaptop ? "14px" : "16px", // Smaller for laptop
    fontWeight: typography.fontWeight.medium, // 500
    lineHeight: "150%",
    letterSpacing: "0%",
    color: colors.dark,
    margin: 0,
  };

  const profileLocationStyles = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    width: "121px",
    height: "18px",
  };

  const locationTextStyles = {
    fontFamily: typography.fontFamily.primary,
    fontSize: "12.2px",
    fontWeight: typography.fontWeight.regular,
    color: colors.text,
    margin: 0,
  };

  const navigationStyles = {
    position: "relative",
    zIndex: 2,
    flex: 1,
    paddingTop: spacing.lg,
    width: componentWidth,
  };

  const navigationItemStyles = () => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: isLaptop ? "20px" : "34px", // Reduced gap for laptop
    padding: isMobile
      ? `${spacing.md} ${spacing.sm}`
      : isLaptop
      ? `${spacing.sm} ${spacing.md}`
      : `${spacing.md} ${spacing.lg}`,
    cursor: "pointer",
    transition: "all 0.2s ease",
    height: isLaptop ? "40px" : "56px", // Reduced height for laptop
    marginBottom: isLaptop ? "50px" : "90px", // Reduced margin for laptop
    width: "100%",
    boxSizing: "border-box",
    justifyContent: isMobile ? "center" : "flex-start",
  });

  const iconContainerStyles = {
    width: isLaptop ? "40px" : "56px",
    height: isLaptop ? "40px" : "56px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  };

  const labelStyles = (isActive) => ({
    fontFamily: typography.fontFamily.primary,
    fontSize: isLaptop ? "16px" : "20px", // Smaller for laptop
    fontWeight: typography.fontWeight.medium, // 500
    lineHeight: "150%",
    letterSpacing: "0%",
    color: isActive ? colors.primary : "#B6B6B6",
    margin: 0,
    display: isMobile ? "none" : "block", // Hide text on mobile
  });

  // Generate the curved SVG path based on active item position
  const generateCurvedPath = (topPosition, width) => {
    const widthNum = parseInt(width);
    const heightNum = parseInt(height);
    const bottomRadius = heightNum - 10;
    return `M0 ${topPosition - 75}C0.000146791 ${
      topPosition - 57.543
    } 10.8643 ${topPosition - 42.102} 27.1514 ${topPosition - 36.257}L67.3633 ${
      topPosition - 21.826
    }C115.044 ${topPosition - 4.716} 115.044 ${topPosition + 62.716} 67.3633 ${
      topPosition + 79.826
    }L27.1514 ${topPosition + 94.257}C10.8643 ${
      topPosition + 100.102
    } 0.000148014 ${topPosition + 115.543} 0 ${
      topPosition + 132.847
    }L0 ${bottomRadius}C0 ${
      bottomRadius + 5.52
    } 4.47715 ${heightNum} 10 ${heightNum}H${widthNum - 10}C${
      widthNum - 4.477
    } ${heightNum} ${widthNum} ${
      bottomRadius + 5.52
    } ${widthNum} ${bottomRadius}L${widthNum} 10C${widthNum} 4.47715 ${
      widthNum - 4.477
    } 0 ${widthNum - 10} 0L10 0C4.47715 0 0 4.47715 0 10L0 ${
      topPosition - 75
    }Z`;
  };

  return (
    <div style={containerStyles} className={`${className} custom-scrollbar`}>
      {/* Curved Background */}
      {showCurvedBackground && (
        <div style={curvedBackgroundStyles}>
          <svg
            width={componentWidth}
            height={height}
            viewBox={`0 0 ${parseInt(componentWidth)} ${parseInt(height)}`}
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d={generateCurvedPath(backgroundTopPosition, componentWidth)}
              fill={curvedBackgroundColor}
            />
          </svg>
        </div>
      )}

      {/* Profile Section */}
      {showProfile && (
        <div style={profileSectionStyles}>
          <div style={profileImageStyles}>
            {userProfile?.image ? (
              <img
                src={userProfile.image}
                alt={userProfile.name || "Profile"}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#D9D9D9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  color: "#666",
                }}
              >
                {userProfile?.name?.charAt(0) || "A"}
              </div>
            )}
          </div>

          <div style={profileInfoStyles}>
            <h3 style={profileNameStyles}>
              {userProfile?.name || "Andrew Ainslay"}
            </h3>
            <div style={profileLocationStyles}>
              <MapPin size={16} color="#A4A4A4" />
              <span style={locationTextStyles}>
                {userProfile?.location || "Coppell, Virginia"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <div style={navigationStyles}>
        {navigationItems.map((item) => {
          return (
            <div
              key={item.id}
              style={navigationItemStyles()}
              onClick={() => onItemClick(item.id)}
            >
              <div style={iconContainerStyles}>
                <img
                  src={item.icon}
                  alt={item.label}
                  style={{
                    width: isLaptop ? "40px" : "56px",
                    height: isLaptop ? "40px" : "56px",
                  }}
                />
              </div>
              <span style={labelStyles(item.id === activeItem)}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SideNavigation;
