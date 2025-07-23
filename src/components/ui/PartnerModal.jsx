// src/components/ui/PartnerModal.jsx

import React, { useState } from "react";
import Modal from "./Modal";

const PartnerModal = ({ isOpen, onClose, partners = [], onFollow, onProfileClick }) => {
  const [activeTab, setActiveTab] = useState("followers");
  
  // Sample partner data - replace with actual data
  const samplePartners = [
    { id: 1, name: "Jerome Bell", avatar: "/common/profile-image.png", isFollowing: true },
    { id: 2, name: "Mitchell", avatar: "/common/profile-image.png", isFollowing: false },
    { id: 3, name: "Veres Panna", avatar: "/common/profile-image.png", isFollowing: false },
    { id: 4, name: "Balázs Annamária", avatar: "/common/profile-image.png", isFollowing: false },
    { id: 5, name: "László Cintia", avatar: "/common/profile-image.png", isFollowing: false },
    { id: 6, name: "Philip", avatar: "/common/profile-image.png", isFollowing: false },
    { id: 7, name: "Philip", avatar: "/common/profile-image.png", isFollowing: false },
    { id: 8, name: "Takács Bianka", avatar: "/common/profile-image.png", isFollowing: false },
    { id: 9, name: "Bruce", avatar: "/common/profile-image.png", isFollowing: false },
    { id: 10, name: "Török Melinda", avatar: "/common/profile-image.png", isFollowing: false },
    { id: 11, name: "Marvin", avatar: "/common/profile-image.png", isFollowing: false },
  ];

  const partnersData = partners.length > 0 ? partners : samplePartners;

  const handleFollowToggle = (partnerId) => {
    if (onFollow) {
      onFollow(partnerId);
    }
  };

  const handleProfileClick = (partner) => {
    if (onProfileClick) {
      onProfileClick(partner);
    }
  };

  const PartnerItem = ({ partner }) => (
    <div className="flex flex-row justify-between items-center w-full h-[50px] md:h-[57.17px] mb-4 md:mb-[22px]">
      {/* User Info - Clickable */}
      <div 
        className="flex flex-row items-center gap-3 md:gap-[17.59px] flex-1 min-w-0 cursor-pointer hover:bg-gray-50 rounded-lg p-2 -ml-2 transition-colors"
        onClick={() => handleProfileClick(partner)}
      >
        {/* Avatar */}
        <div className="w-[50px] h-[50px] md:w-[57.17px] md:h-[57.17px] bg-[#C9C9C9] rounded-full flex justify-end items-end overflow-hidden flex-shrink-0">
          <img
            src={partner.avatar}
            alt={partner.name}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
        
        {/* Name */}
        <span className="font-lexend font-medium text-black text-base md:text-[17.5914px] truncate"
          style={{
            lineHeight: "150%",
          }}
        >
          {partner.name}
        </span>
      </div>

      {/* Follow Button */}
      <button
        className="flex flex-col items-start px-2 md:px-[8.7957px] py-1 md:py-[4.39785px] gap-[8.8px] w-[90px] md:w-[109.95px] h-[28px] md:h-[29.8px] rounded-[20px] md:rounded-[46.1774px] border-none cursor-pointer flex-shrink-0 hover:opacity-90 transition-opacity"
        style={{ backgroundColor: "#1090CF" }}
        onClick={(e) => {
          e.stopPropagation();
          handleFollowToggle(partner.id);
        }}
      >
        <div className="flex flex-row justify-center items-center gap-[4.4px] w-full h-full">
          <span className="font-lexend font-medium text-white text-sm md:text-[14.0731px]"
            style={{
              lineHeight: "150%",
            }}
          >
            {partner.isFollowing ? "Following" : "Follow"}
          </span>
        </div>
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative w-full max-w-[663px] h-full max-h-[90vh] md:max-h-[768px] md:h-[768px] bg-white rounded-[14px] mx-auto my-auto m-4 md:m-0 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-4 md:px-6 py-4 md:py-6">
          {/* Title */}
          <h2 className="font-lexend font-medium text-black text-center text-lg md:text-[22px]"
            style={{
              lineHeight: "150%",
            }}
          >
            Partners
          </h2>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 md:w-[33px] md:h-[33px] cursor-pointer border-none bg-transparent p-0"
            aria-label="Close modal"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.25 8.25L24.75 24.75M8.25 24.75L24.75 8.25"
                stroke="#000000"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="relative px-4 md:px-6">
          <div className="flex justify-center gap-8 md:gap-[305.52px] mb-4">
            {/* Followers Tab */}
            <button
              className={`font-lexend font-semibold ${
                activeTab === "followers" ? "text-[#0490CF]" : "text-[#58606C]"
              } text-base md:text-[18.9825px]`}
              style={{
                lineHeight: "24px",
              }}
              onClick={() => setActiveTab("followers")}
            >
              Followers
            </button>

            {/* Following Tab */}
            <button
              className={`font-lexend font-normal text-center ${
                activeTab === "following" ? "text-[#0490CF]" : "text-[#58606C]"
              } text-base md:text-[18.9825px]`}
              style={{
                lineHeight: "24px",
              }}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
          </div>

          {/* Tab Underline */}
          <div className="relative">
            <div className="w-full h-[1.48301px] bg-[#E2E2E2]"></div>
            <div 
              className={`absolute top-0 w-1/2 h-[2.96602px] bg-[#0490CF] transition-all duration-300 ${
                activeTab === "followers" ? "left-0" : "left-1/2"
              }`}
            ></div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-6 py-4 md:py-6 flex-1 overflow-y-auto">
          <div className="w-full">
            {partnersData.map((partner) => (
              <PartnerItem key={partner.id} partner={partner} />
            ))}
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default PartnerModal;