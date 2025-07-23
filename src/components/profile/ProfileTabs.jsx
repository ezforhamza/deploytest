// src/components/profile/ProfileTabs.jsx

import { useState } from "react";
import { colors } from "../../styles/tokens";

const ProfileTabs = ({ activeTab, onTabChange, userType = "individual" }) => {
  const [hoveredTab, setHoveredTab] = useState(null);
  
  // Define tabs based on user type
  const getTabsForUserType = (type) => {
    switch (type) {
      case "company":
        return [
          { id: "posts", label: "Posts" },
          { id: "about", label: "About" },
          { id: "jobs", label: "Jobs" },
        ];
      case "school":
        return [
          { id: "posts", label: "Posts" },
          { id: "about", label: "About" },
        ];
      case "individual":
      default:
        return [
          { id: "posts", label: "Posts" },
          { id: "certificates", label: "Certificates" },
          { id: "workHistory", label: "Work History" },
        ];
    }
  };
  
  const tabs = getTabsForUserType(userType);

  return (
    <div className="w-full mt-6 mb-6">
      {/* Clean Tab Container */}
      <div className="relative w-full">
        {/* Background Container */}
        <div className="flex w-full bg-white border-b border-gray-100">
          {/* Tab Buttons */}
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;
            
            return (
              <button
                key={tab.id}
                className="relative flex-1 flex items-center justify-center px-4 py-4 border-none bg-transparent cursor-pointer outline-none transition-all duration-200 ease-in-out"
                onClick={() => onTabChange(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                aria-label={`View ${tab.label.toLowerCase()}`}
              >
                {/* Tab Label */}
                <span 
                  className="font-lexend transition-all duration-200 ease-in-out text-sm sm:text-base"
                  style={{
                    color: isActive 
                      ? colors.primary 
                      : isHovered 
                      ? colors.dark 
                      : colors.text,
                    fontWeight: isActive ? '600' : '500',
                  }}
                >
                  {tab.label}
                </span>
                
                {/* Active Bottom Border */}
                <div 
                  className="absolute bottom-0 left-0 right-0 transition-all duration-200 ease-in-out"
                  style={{
                    height: isActive ? '2px' : '0px',
                    backgroundColor: colors.primary,
                  }}
                />
                
                {/* Hover Effect */}
                {!isActive && isHovered && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 transition-all duration-200 ease-in-out"
                    style={{
                      height: '1px',
                      backgroundColor: colors.text,
                      opacity: 0.3
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;