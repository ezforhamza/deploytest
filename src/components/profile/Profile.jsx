// src/components/profile/Profile.jsx

import React, { useState } from "react";
import { colors } from "../../styles/tokens";
import ProfileHeader from "./ProfileHeader";
import ProfileUserInfo from "./ProfileUserInfo";
import ProfileActions from "./ProfileActions";
import ProfileTabs from "./ProfileTabs";
import ProfileContent from "./ProfileContent";
import PrivateProfile from "./PrivateProfile";
import ReportModal from "../post/ReportModal";
import BlockModal from "../ui/BlockModal";
import MessageCard from "../messages/MessageCard";

const Profile = ({
  user,
  userStats,
  activeTab = "posts",
  content = {},
  // API-ready initial states
  initialIsFollowing = false,
  initialFollowStatus = "follow", // "follow", "following", "requested"
  // Profile privacy
  isPrivate = false,
  // Callback functions for API calls
  onFollow,
  onMessage,
  onTabChange,
  // Profile header actions
  onBack,
  onShare,
  onReport,
  onBlock,
  // Mutual friends data
  mutualFriends,
  totalFollowers,
  // User click handler
  onUserClick,
  // Job navigation handler
  onJobNavigate,
  // User type for different tab configurations
  userType = "individual", // "individual", "company", "school"
  className = "",
}) => {
  // User interaction states (API-ready)
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [followStatus, setFollowStatus] = useState(initialFollowStatus);
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab);

  // Loading states for API calls
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  
  // Modal states
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const handleFollow = async () => {
    if (isFollowLoading) return; // Prevent double-clicks

    const previousIsFollowing = isFollowing;
    const previousFollowStatus = followStatus;

    // Optimistic update based on current status
    setIsFollowLoading(true);
    
    if (followStatus === "follow") {
      // If it's a private profile, set to "requested", otherwise "following"
      const newStatus = isPrivate ? "requested" : "following";
      setFollowStatus(newStatus);
      setIsFollowing(newStatus === "following");
    } else if (followStatus === "following") {
      setFollowStatus("follow");
      setIsFollowing(false);
    } else if (followStatus === "requested") {
      setFollowStatus("follow");
      setIsFollowing(false);
    }

    try {
      // Call API function if provided
      if (onFollow) {
        await onFollow(followStatus);
      }
    } catch (error) {
      // Rollback on error
      console.error("Follow failed:", error);
      setIsFollowing(previousIsFollowing);
      setFollowStatus(previousFollowStatus);
    } finally {
      setIsFollowLoading(false);
    }
  };

  const handleMessage = async () => {
    if (isMessageLoading) return; // Prevent double-clicks

    setIsMessageLoading(true);

    try {
      // Open message modal
      setIsMessageModalOpen(true);
      // Call API function if provided
      if (onMessage) {
        await onMessage();
      }
    } catch (error) {
      console.error("Message failed:", error);
    } finally {
      setIsMessageLoading(false);
    }
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  const handleTabChange = (tab) => {
    setCurrentActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const handleReportSubmit = (reason) => {
    if (onReport) {
      onReport(reason);
    }
    setIsReportModalOpen(false);
  };

  const handleBlockClick = () => {
    setIsBlockModalOpen(true);
  };

  const handleBlockConfirm = () => {
    if (onBlock) {
      onBlock();
    }
    setIsBlockModalOpen(false);
  };

  return (
    <div 
      className={`flex flex-col items-center w-full font-lexend ${className}`}
      style={{ backgroundColor: colors.white }}
    >
      <div 
        className="flex flex-col items-center w-full"
        style={{ backgroundColor: colors.white }}
      >
        {/* Profile Header with back button and menu */}
        <ProfileHeader 
          onBack={onBack}
          onShare={onShare}
          onReport={handleReportClick}
          onBlock={handleBlockClick}
        />

        {/* User Info Section - Avatar, Name, Location, etc */}
        <ProfileUserInfo user={user} userStats={userStats} />

        {/* Action Buttons - Following/Message */}
        <ProfileActions
          isFollowLoading={isFollowLoading}
          isMessageLoading={isMessageLoading}
          onFollow={handleFollow}
          onMessage={handleMessage}
          mutualFriends={mutualFriends}
          totalFollowers={totalFollowers}
          followStatus={followStatus}
        />

        {/* Show private profile message or regular content */}
        {isPrivate && followStatus !== "following" ? (
          <PrivateProfile />
        ) : (
          <>
            {/* Tabs Navigation - Posts, Certificates, Work history */}
            <ProfileTabs
              activeTab={currentActiveTab}
              onTabChange={handleTabChange}
              userType={userType}
            />

            {/* Content based on active tab */}
            <ProfileContent
              activeTab={currentActiveTab}
              content={content}
              user={user}
              onUserClick={onUserClick}
              onJobNavigate={onJobNavigate}
              userType={userType}
            />
          </>
        )}
      </div>

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onReport={handleReportSubmit}
        type="user"
      />

      {/* Block Modal */}
      <BlockModal
        isOpen={isBlockModalOpen}
        onClose={() => setIsBlockModalOpen(false)}
        onBlock={handleBlockConfirm}
        user={user}
      />

      {/* Message Modal */}
      <MessageCard
        isOpen={isMessageModalOpen}
        onClose={handleCloseMessageModal}
        user={user}
      />
    </div>
  );
};

export default Profile;
