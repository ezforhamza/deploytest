// src/components/post/ShareModal.jsx

import React, { useState } from "react";
import { colors, typography } from "../../styles/tokens";
import Modal from "../ui/Modal";
import GroupsSelectionModal from "./GroupsSelectionModal";

const ShareModal = ({ isOpen, onClose, onShare }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    socialFeed: false,
    chatGroups: false,
    users: false,
  });
  
  const [showGroupsModal, setShowGroupsModal] = useState(false);
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [selectionType, setSelectionType] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Sample data for groups and users
  const sampleGroups = [
    { id: 1, name: "Development Team", avatar: "/common/profile-image.png" },
    { id: 2, name: "Design Team", avatar: "/common/profile-image.png" },
    { id: 3, name: "Marketing Team", avatar: "/common/profile-image.png" },
    { id: 4, name: "Sales Team", avatar: "/common/profile-image.png" },
  ];

  const sampleUsers = [
    { id: 1, name: "John Doe", avatar: "/common/profile-image.png" },
    { id: 2, name: "Jane Smith", avatar: "/common/profile-image.png" },
    { id: 3, name: "Bob Johnson", avatar: "/common/profile-image.png" },
    { id: 4, name: "Alice Brown", avatar: "/common/profile-image.png" },
  ];

  const handleOptionToggle = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  const handleCheckboxClick = (option) => {
    if (option === "chatGroups") {
      // Select all groups
      setSelectedGroups(sampleGroups);
      setSelectedOptions((prev) => ({
        ...prev,
        chatGroups: true,
      }));
      console.log("Selected all groups:", sampleGroups);
    } else if (option === "users") {
      // Select all users
      setSelectedUsers(sampleUsers);
      setSelectedOptions((prev) => ({
        ...prev,
        users: true,
      }));
      console.log("Selected all users:", sampleUsers);
    } else {
      handleOptionToggle(option);
    }
  };

  const handleHeadingClick = (option) => {
    if (option === "chatGroups") {
      setSelectionType("groups");
      setShowGroupsModal(true);
    } else if (option === "users") {
      setSelectionType("users");
      setShowUsersModal(true);
    }
  };

  const handleGroupsSelection = (groups) => {
    setSelectedGroups(groups);
    setSelectedOptions((prev) => ({
      ...prev,
      chatGroups: groups.length > 0,
    }));
    console.log("Selected groups:", groups);
  };

  const handleUsersSelection = (users) => {
    setSelectedUsers(users);
    setSelectedOptions((prev) => ({
      ...prev,
      users: users.length > 0,
    }));
    console.log("Selected users:", users);
  };

  const getFieldName = (type, count) => {
    if (count === 0) {
      return type === "groups" ? "Chat Groups" : "Users";
    }
    
    const totalItems = type === "groups" ? sampleGroups.length : sampleUsers.length;
    
    if (count === totalItems) {
      return "All Selected";
    }
    
    return type === "groups" ? `${count} Groups` : `${count} Users`;
  };

  const handleShare = () => {
    const selectedTargets = Object.keys(selectedOptions).filter(
      (key) => selectedOptions[key]
    );
    
    const shareData = {
      targets: selectedTargets,
      groups: selectedGroups,
      users: selectedUsers,
    };
    
    if (selectedTargets.length > 0) {
      console.log("Sharing post with data:", shareData);
      onShare(shareData);
      onClose();
    }
  };

  const isShareEnabled = Object.values(selectedOptions).some(Boolean);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg w-[663px] max-w-[90vw] mx-auto max-h-[90vh] flex flex-col sm:max-w-[90vw]" style={{ minWidth: '500px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2
            className="text-2xl font-medium text-center flex-1"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            Share Post
          </h2>
          <button
            onClick={onClose}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Share Options */}
        <div className="flex-1 p-6 space-y-6">
          {/* Social Feed Option */}
          <ShareOption
            icon="/icons/socialfeed.svg"
            iconBgColor="rgba(4, 144, 207, 0.15)"
            title="Social Feed"
            isSelected={selectedOptions.socialFeed}
            onToggle={() => handleOptionToggle("socialFeed")}
            clickAnywhere={true}
          />

          {/* Chat Groups Option */}
          <ShareOption
            icon="/icons/groups.svg"
            iconBgColor="rgba(4, 144, 207, 0.15)"
            title={getFieldName("groups", selectedGroups.length)}
            isSelected={selectedOptions.chatGroups}
            onCheckboxClick={() => handleCheckboxClick("chatGroups")}
            onHeadingClick={() => handleHeadingClick("chatGroups")}
            hasDropdown
          />

          {/* Users Option */}
          <ShareOption
            icon="/icons/groups.svg"
            iconBgColor="rgba(4, 144, 207, 0.15)"
            title={getFieldName("users", selectedUsers.length)}
            isSelected={selectedOptions.users}
            onCheckboxClick={() => handleCheckboxClick("users")}
            onHeadingClick={() => handleHeadingClick("users")}
            hasDropdown
          />
        </div>

        {/* Share Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleShare}
            disabled={!isShareEnabled}
            className={`w-full py-4 rounded-lg font-medium text-white transition-colors ${
              isShareEnabled
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            style={{
              backgroundColor: isShareEnabled ? colors.primary : "#E5E5E5",
              fontFamily: typography.fontFamily.primary,
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Share
          </button>
        </div>
      </div>
      
      {/* Groups Selection Modal */}
      <GroupsSelectionModal
        isOpen={showGroupsModal}
        onClose={() => setShowGroupsModal(false)}
        onConfirm={handleGroupsSelection}
        title="Select Groups"
        groups={sampleGroups}
      />
      
      {/* Users Selection Modal */}
      <GroupsSelectionModal
        isOpen={showUsersModal}
        onClose={() => setShowUsersModal(false)}
        onConfirm={handleUsersSelection}
        title="Select Users"
        groups={sampleUsers}
      />
    </Modal>
  );
};

const ShareOption = ({
  icon,
  iconBgColor,
  title,
  isSelected,
  onToggle,
  onCheckboxClick,
  onHeadingClick,
  hasDropdown = false,
  clickAnywhere = false,
}) => {
  const handleClick = (e) => {
    if (onToggle) {
      onToggle();
    }
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    if (onCheckboxClick) {
      onCheckboxClick();
    }
  };

  const handleHeadingClick = (e) => {
    e.stopPropagation();
    if (onHeadingClick) {
      onHeadingClick();
    }
  };

  return (
    <div 
      className={`flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors ${
        clickAnywhere ? 'cursor-pointer' : ''
      }`}
      onClick={clickAnywhere ? handleClick : undefined}
    >
      {/* Left Section - Icon and Title */}
      <div className="flex items-center gap-6">
        {/* Icon Container */}
        <div
          className="w-[70px] h-[70px] rounded-full flex items-center justify-center"
          style={{
            backgroundColor: iconBgColor,
            borderRadius: "135px",
          }}
        >
          <img src={icon} alt={title} className="w-8 h-8" />
        </div>

        {/* Title and Dropdown */}
        <div 
          className={`flex items-center gap-2 ${!clickAnywhere ? 'cursor-pointer' : ''}`}
          onClick={!clickAnywhere ? (hasDropdown ? handleHeadingClick : handleClick) : undefined}
        >
          <span
            className="text-black font-medium"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "21.6px",
              fontWeight: 500,
              lineHeight: "150%",
            }}
          >
            {title}
          </span>
          {hasDropdown && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="6,9 12,15 18,9"></polyline>
            </svg>
          )}
        </div>
      </div>

      {/* Right Section - Checkbox */}
      <div className="flex items-center">
        <div
          className={`w-7 h-7 rounded border-2 flex items-center justify-center transition-colors ${
            !clickAnywhere ? 'cursor-pointer' : ''
          } ${
            isSelected ? "bg-blue-500 border-blue-500" : "bg-white border-black"
          }`}
          style={{
            borderColor: isSelected ? colors.primary : "#000000",
            backgroundColor: isSelected ? colors.primary : "white",
            borderRadius: "5px",
          }}
          onClick={!clickAnywhere ? handleCheckboxClick : undefined}
        >
          {isSelected && (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <polyline points="20,6 9,17 4,12"></polyline>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
