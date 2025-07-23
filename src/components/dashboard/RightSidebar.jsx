// src/components/dashboard/RightSidebar.jsx

import React from "react";
import FeaturedJobs from "../jobs/FeaturedJobs";
import SuggestedForYou from "../users/SuggestedForYou";
import SuggestedAlumni from "../users/SuggestedAlumni";

const RightSidebar = ({ userRole, onUserClick }) => {
  const renderSidebarContent = () => {
    switch (userRole) {
      case "alumni":
        return (
          <>
            <div className="mb-5">
              <FeaturedJobs />
            </div>
            <div>
              <SuggestedForYou onUserClick={onUserClick} />
            </div>
          </>
        );
      case "company":
        return (
          <>
            <div className="mb-5">
              <FeaturedJobs />
            </div>
            <div>
              <SuggestedForYou onUserClick={onUserClick} />
            </div>
          </>
        );
      case "school":
        return (
          <div>
            <SuggestedAlumni onAlumniClick={onUserClick} />
          </div>
        );
      default:
        return (
          <>
            <div className="mb-5">
              <FeaturedJobs />
            </div>
            <div>
              <SuggestedForYou onUserClick={onUserClick} />
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 h-auto">
      {renderSidebarContent()}
    </div>
  );
};

export default RightSidebar;