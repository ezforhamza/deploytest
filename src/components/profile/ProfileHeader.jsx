// src/components/profile/ProfileHeader.jsx

import React from "react";
import { colors } from "../../styles/tokens";
import MoreOptionsMenu from "../ui/MoreOptionsMenu";

const ProfileHeader = ({ onBack, onShare, onReport, onBlock }) => {
  // SVG for back arrow
  const BackIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke={colors.dark}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  // Profile menu options
  const profileMenuOptions = [
    {
      label: "Share Profile",
      icon: "/icons/share.svg",
      action: "share"
    },
    {
      label: "Report",
      icon: "/icons/report.svg",
      action: "report"
    },
    {
      label: "Block",
      icon: "/icons/block.svg",
      action: "block"
    }
  ];

  const handleMenuOptionClick = (option) => {
    switch (option.action) {
      case "share":
        onShare && onShare();
        break;
      case "report":
        onReport && onReport();
        break;
      case "block":
        onBlock && onBlock();
        break;
      default:
        console.log("Unknown option:", option.action);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center px-4 sm:px-6 lg:px-[26px] py-3 sm:py-4 lg:py-5 w-full h-[60px] sm:h-[65px] lg:h-[70px] box-border">
      <button 
        className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer border-none bg-transparent p-0 flex items-center justify-center"
        onClick={onBack} 
        aria-label="Go back"
      >
        <BackIcon />
      </button>

      <h1 
        className="font-lexend font-medium text-lg sm:text-xl leading-[150%] m-0"
        style={{ color: colors.dark }}
      >
        Profile
      </h1>

      <MoreOptionsMenu
        options={profileMenuOptions}
        onOptionClick={handleMenuOptionClick}
      />
    </div>
  );
};

export default ProfileHeader;
