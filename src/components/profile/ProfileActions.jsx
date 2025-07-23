// src/components/profile/ProfileActions.jsx

import React from "react";
import { colors } from "../../styles/tokens";
import MutualFriends from "./MutualFriends";

const ProfileActions = ({
  isFollowLoading,
  isMessageLoading,
  onFollow,
  onMessage,
  mutualFriends,
  totalFollowers,
  followStatus = "follow", // "follow", "following", "requested"
}) => {
  return (
    <div className="flex flex-col items-center w-full mt-4 sm:mt-5 lg:mt-6 mb-4 sm:mb-5 lg:mb-6">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 lg:gap-[22px] justify-center mb-3 sm:mb-4 w-full sm:w-auto">
        {/* Following/Follow Button */}
        <button
          className={`flex flex-row justify-center items-center px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 w-full sm:w-[200px] lg:w-[240px] h-[40px] sm:h-[42px] lg:h-[44px] border-none box-border transition-all duration-200 ease-in-out ${
            isFollowLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
          style={{
            background: colors.primary,
            borderRadius: "9.74px",
          }}
          onClick={onFollow}
          disabled={isFollowLoading}
          onMouseEnter={(e) => {
            if (!isFollowLoading) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0px 6px 20px rgba(0, 0, 0, 0.15)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isFollowLoading) {
              e.target.style.transform = "translateY(0px)";
              e.target.style.boxShadow = "none";
            }
          }}
          aria-label={
            followStatus === "follow" 
              ? "Follow user" 
              : followStatus === "following" 
              ? "Unfollow user" 
              : "Cancel follow request"
          }
        >
          <span 
            className="font-lexend font-semibold leading-[150%] m-0"
            style={{ 
              fontSize: window.innerWidth < 640 ? "14px" : window.innerWidth < 768 ? "15px" : "15.5816px",
              color: colors.white 
            }}
          >
            {isFollowLoading
              ? "Loading..."
              : followStatus === "follow"
              ? "Follow"
              : followStatus === "following"
              ? "Following"
              : "Requested"}
          </span>
        </button>

        {/* Message Button */}
        <button
          className={`flex flex-row justify-center items-center px-4 sm:px-5 lg:px-6 py-2.5 sm:py-3 w-full sm:w-[200px] lg:w-[240px] h-[40px] sm:h-[42px] lg:h-[44px] bg-transparent box-border transition-all duration-200 ease-in-out ${
            isMessageLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
          }`}
          style={{
            border: "1.21731px solid #58606C",
            borderRadius: "9.73847px",
          }}
          onClick={onMessage}
          disabled={isMessageLoading}
          onMouseEnter={(e) => {
            if (!isMessageLoading) {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0px 6px 20px rgba(0, 0, 0, 0.1)";
              e.target.style.borderColor = "#58606C";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMessageLoading) {
              e.target.style.transform = "translateY(0px)";
              e.target.style.boxShadow = "none";
              e.target.style.borderColor = "#58606C";
            }
          }}
          aria-label="Send message to user"
        >
          <span 
            className="font-lexend font-semibold leading-[150%] m-0"
            style={{ 
              fontSize: window.innerWidth < 640 ? "14px" : window.innerWidth < 768 ? "15px" : "15.5816px",
              color: "#58606C" 
            }}
          >
            {isMessageLoading ? "Loading..." : "Message"}
          </span>
        </button>
      </div>

      {/* Mutual Friends */}
      <MutualFriends 
        mutualFriends={mutualFriends}
        totalFollowers={totalFollowers}
      />
    </div>
  );
};

export default ProfileActions;
