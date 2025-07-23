// src/components/foryou/ProfileInfo.jsx

import React from "react";
import { typography } from "../../styles/tokens";
import ActionButton from "./ActionButton";
import Icon from "./Icon";

const ProfileInfo = ({ user, onFollow = () => {}, onProfileClick = () => {} }) => {
  const {
    name = "Jerome Bell",
    jobTitle = "UI/UX Designer",
    school = "Spark School",
    location = "London, UK",
    isFollowing = false,
  } = user;

  return (
    <div className="relative">
      {/* Name and Job Title */}
      <div className="mb-4">
        <h2
          className="text-white font-medium mb-1 cursor-pointer hover:opacity-80 transition-opacity"
          style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: "32px",
            fontWeight: typography.fontWeight.medium,
            lineHeight: "1.2",
          }}
          onClick={() => onProfileClick(user)}
        >
          {name}
        </h2>
        <p
          className="text-white font-normal"
          style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: "16px",
            fontWeight: typography.fontWeight.regular,
            opacity: 0.9,
          }}
        >
          {jobTitle}
        </p>
      </div>

      {/* Info Row with Icons */}
      <div className="flex items-center gap-6">
        {/* School */}
        <div className="flex items-center gap-2">
          <Icon name="school" size={18} color="rgba(255, 255, 255, 0.8)" />
          <span
            className="text-white font-normal"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "14px",
              fontWeight: typography.fontWeight.regular,
              opacity: 0.8,
            }}
          >
            {school}
          </span>
        </div>

        {/* Company/Work */}
        <div className="flex items-center gap-2">
          <Icon name="briefcase" size={18} color="rgba(255, 255, 255, 0.8)" />
          <span
            className="text-white font-normal"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "14px",
              fontWeight: typography.fontWeight.regular,
              opacity: 0.8,
            }}
          >
            Looking for opportunities
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <Icon name="location" size={18} color="rgba(255, 255, 255, 0.8)" />
          <span
            className="text-white font-normal"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "14px",
              fontWeight: typography.fontWeight.regular,
              opacity: 0.8,
            }}
          >
            {location}
          </span>
        </div>
      </div>

      {/* Follow Button */}
      <div className="absolute top-0 right-0">
        <ActionButton
          variant="follow"
          onClick={onFollow}
          icon="userAdd"
          label={isFollowing ? "Following" : "Follow"}
          isActive={isFollowing}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
