// src/components/post/PostHeader.jsx

import React from "react";
import { colors, typography } from "../../styles/tokens";
import MoreOptionsMenu from "../ui/MoreOptionsMenu";

const PostHeader = ({ user, onFollow, onReport, onSave, onTaglineClick, onUserClick }) => {
  // Post menu options
  const postMenuOptions = [
    {
      label: "Save",
      icon: "/icons/save.svg",
      action: "save"
    },
    {
      label: "Report",
      icon: "/icons/report.svg",
      action: "report"
    }
  ];

  const handleMenuOptionClick = (option) => {
    switch (option.action) {
      case "save":
        onSave ? onSave() : console.log("Save clicked");
        break;
      case "report":
        onReport && onReport();
        break;
      default:
        console.log("Unknown option:", option.action);
    }
  };

  // Function to format Facebook-style tagline
  const formatTagline = (tagline) => {
    if (!tagline) return null;

    // Parse tagline like "with John Doe and 4 others"
    const withMatch = tagline.match(/with\s+(.+?)\s+and\s+(\d+)\s+others?/i);
    if (withMatch) {
      const [, name, count] = withMatch;
      return (
        <span className="hover:underline cursor-pointer">
          with <span className="font-medium">{name}</span> and <span className="font-medium">{count} others</span>
        </span>
      );
    }

    // Parse tagline like "with John Doe and Jane Smith"
    const withNamesMatch = tagline.match(/with\s+(.+)/i);
    if (withNamesMatch) {
      const names = withNamesMatch[1];
      return (
        <span className="hover:underline cursor-pointer">
          with <span className="font-medium">{names}</span>
        </span>
      );
    }

    // Default case - just return the tagline as clickable
    return (
      <span className="hover:underline cursor-pointer">
        {tagline}
      </span>
    );
  };

  const handleTaglineClick = () => {
    if (onTaglineClick) {
      onTaglineClick(user.tagline, user.taggedUsers);
    }
  };

  return (
    <div className="flex h-[69.92px] items-center justify-between relative w-full">
      {/* User Info Section */}
      <div className="inline-flex items-center gap-[13.45px] relative flex-[0_0_auto]">
        <div
          className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-[69.92px] lg:h-[69.92px] rounded-full bg-cover bg-center flex-shrink-0"
          style={{ backgroundImage: `url(${user.avatar})` }}
        />
        <div className="flex flex-col items-start relative">
          <div
            className="font-medium text-black text-sm sm:text-base lg:text-[21.5px] tracking-[0] leading-tight sm:leading-normal cursor-pointer hover:underline"
            style={{ fontFamily: typography.fontFamily.primary }}
            onClick={() => onUserClick && onUserClick(user)}
          >
            {user.companyName}
          </div>
          {user.tagline && (
            <div
              className="font-normal text-xs sm:text-sm tracking-[0] leading-tight mt-1"
              style={{
                fontFamily: typography.fontFamily.primary,
                color: "#65676B",
              }}
              onClick={handleTaglineClick}
            >
              {formatTagline(user.tagline)}
            </div>
          )}
          <div
            className="font-normal text-xs sm:text-sm tracking-[0] leading-tight mt-1"
            style={{
              fontFamily: typography.fontFamily.primary,
              color: colors.text,
            }}
          >
            {user.date}
          </div>
        </div>
      </div>

      {/* More Options Menu */}
      <div className="relative w-6 h-6 sm:w-8 sm:h-8 lg:w-[32.27px] lg:h-[32.27px] flex items-center justify-center flex-shrink-0">
        <MoreOptionsMenu
          options={postMenuOptions}
          onOptionClick={handleMenuOptionClick}
          buttonClassName="w-6 h-6 sm:w-8 sm:h-8 lg:w-[32.27px] lg:h-[32.27px]"
        />
      </div>

      {/* Follow Button - Only show if not following */}
      {!user.isFollowing && (
        <div
          className="inline-flex items-center justify-center gap-1 sm:gap-2 absolute top-2 sm:top-4 lg:top-[19px] right-8 sm:right-12 lg:right-[50px] cursor-pointer"
          onClick={onFollow}
        >
          <div className="relative w-4 h-4 sm:w-5 sm:h-5 lg:w-[21.51px] lg:h-[21.51px]">
            <img
              className="w-full h-full"
              alt="Follow"
              src="/icons/follow.svg"
            />
          </div>
          <div
            className="relative w-fit font-medium text-xs sm:text-sm lg:text-[17.2px] tracking-[0] leading-tight whitespace-nowrap hidden sm:block"
            style={{
              fontFamily: typography.fontFamily.primary,
              color: colors.primary,
            }}
          >
            Follow
          </div>
        </div>
      )}
    </div>
  );
};

export default PostHeader;
