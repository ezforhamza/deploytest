// src/components/dashboard/DashboardContent.jsx

import { useEffect } from "react";
import { useContent } from "../../contexts/ContentContext";
import SmartContentContainer from "./SmartContentContainer";

// Import existing content components for fallback
import HomeContent from "./HomeContent";
import ForYouContent from "./ForYouContent";
import JobOffersContent from "./JobOffersContent";
import SchoolsContent from "./SchoolsContent";
import ProfileSettings from "../settings/ProfileSettings";
import PostJobsContent from "./PostJobsContent";
import AlumniNetworkContent from "./AlumniNetworkContent";
import AlumniContent from "./AlumniContent";
import CompaniesContent from "./CompaniesContent";

/**
 * Smart Dashboard Content - 3-Layer Architecture Implementation
 *
 * Layer 1: Content Registry (contentRegistry.js)
 * Layer 2: State Management (ContentContext.jsx)
 * Layer 3: Smart Containers (SmartContentContainer.jsx)
 */
const DashboardContent = ({
  activeNav,
  userRole,
  searchValue,
  selectedProfile,
  onProfileClick,
  onBackToHome,
  userPosts = [],
  onForYouFilterChange,
  forYouFilters = {},
  showJobFilters,
  onCloseJobFilters,
  createdJobs = [],
}) => {
  const { setNavigation } = useContent();

  // Update content context when navigation changes
  useEffect(() => {
    setNavigation(activeNav, userRole);
  }, [activeNav, userRole]); // Remove setNavigation from deps to avoid infinite loop

  // Prepare common props for all content
  const commonProps = {
    userRole,
    searchValue,
    selectedProfile,
    onProfileClick,
    onBackToHome,
    userPosts,
    onForYouFilterChange,
    forYouFilters,
    showJobFilters,
    onCloseJobFilters,
    createdJobs,
  };

  // Get original component for fallback
  const getOriginalComponent = () => {
    switch (activeNav) {
      case "Home":
        return HomeContent;
      case "For You":
        return ForYouContent;
      case "Job Offers":
      case "Jobs":
      case "Post Jobs":
        return activeNav === "Job Offers" ? JobOffersContent : PostJobsContent;
      case "Schools":
        return SchoolsContent;
      case "Profile":
        return ProfileSettings;
      case "Alumni Network":
        return AlumniNetworkContent;
      case "Alumni":
        return AlumniContent;
      case "Companies":
        return CompaniesContent;
      default:
        return HomeContent;
    }
  };

  return (
    <div className="w-full h-full">
      {/* Smart Content Container with 3-Layer Architecture */}
      <SmartContentContainer
        navigation={activeNav}
        userRole={userRole}
        originalComponent={getOriginalComponent()}
        fallbackProps={commonProps}
        {...commonProps}
      />
    </div>
  );
};

export default DashboardContent;
