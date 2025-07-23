// src/components/layout/TopNavbar.jsx

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { colors } from "../../styles/tokens";

const TopNavbar = ({
  onSearchChange = () => {},
  onCreatePost = () => {},
  onNotificationClick = () => {},
  onMessageClick = () => {},
  onMenuClick = () => {},
  onFilterClick = () => {},
  searchValue = "",
  notificationCount = 0,
  className = "",
  // Dynamic navbar props
  activeNav = "",
  userRole = "",
  showFilterIcon = false,
  createButtonText = "Create Post",
  createButtonIcon = "plus",
  // Filter dropdown
  filterDropdown = null,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div 
      className={`relative w-full h-[60px] flex items-center justify-between ${className}`}
      style={{ backgroundColor: colors.background || "#F8F9FA" }}
    >
      {/* Left Section - Menu, Logo and Brand */}
      <div className="flex items-center gap-2 sm:gap-4 w-auto sm:w-[230px] h-[55px]">
        <button
          className="w-[30px] h-[30px] border-none bg-transparent cursor-pointer p-0 flex items-center justify-center"
          onClick={onMenuClick}
          aria-label="Menu"
        >
          <img
            src="/icons/4dots.svg"
            alt="Menu"
            className="w-[30px] h-[30px]"
          />
        </button>

        <div className="flex items-center gap-2">
          <img 
            src="/icons/logo.svg" 
            alt="AIumni Logo" 
            className="w-[55px] h-[55px] flex-shrink-0" 
          />
          <h1 
            className="m-0 font-lexend font-semibold text-lg sm:text-2xl lg:text-3xl leading-[31px] tracking-[0.01em] text-black"
            style={{ 
              fontFeatureSettings: "'pnum' on, 'lnum' on",
              fontSize: "clamp(20px, 4vw, 30.8765px)"
            }}
          >
            AIumni
          </h1>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 flex justify-center max-w-[554px] mx-2 sm:mx-4 lg:mx-8">
        <div className="relative w-full max-w-[554px] h-[60px]">
          <Search 
            size={19} 
            className="absolute left-[20px] top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full h-[60px] bg-white border border-sky-600 rounded-full pl-[50px] pr-4 sm:pr-6 font-lexend text-sm sm:text-base leading-[19px] text-gray-900 outline-none transition-all duration-200 focus:shadow-md"
            placeholder="Search"
          />
          {!searchValue && !searchFocused && (
            <span className="absolute left-[50px] top-1/2 transform -translate-y-1/2 font-lexend text-sm sm:text-base leading-[19px] text-gray-900 pointer-events-none opacity-100 transition-opacity duration-200">
              Search
            </span>
          )}
        </div>
      </div>

      {/* Right Section - Icons and Action Button */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Filter Button (conditional) */}
        {showFilterIcon && (
          <div className="relative">
            <button
              className="w-[30px] h-[30px] border-none bg-transparent cursor-pointer p-0 flex items-center justify-center relative"
              onClick={onFilterClick}
              aria-label="Filter"
            >
              <img
                src="/icons/nav-filter.svg"
                alt="Filter"
                className="w-[30px] h-[30px]"
              />
            </button>
          </div>
        )}

        {/* Notification Button */}
        <button
          className="w-[30px] h-[30px] border-none bg-transparent cursor-pointer p-0 flex items-center justify-center relative"
          onClick={onNotificationClick}
          aria-label="Notifications"
        >
          <img
            src="/icons/notification.svg"
            alt="Notifications"
            className="w-[30px] h-[30px]"
          />
          {notificationCount > 0 && (
            <span className="absolute -top-[2px] -right-[2px] w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-semibold">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        {/* Message Button */}
        <button
          className="w-[30px] h-[30px] border-none bg-transparent cursor-pointer p-0 flex items-center justify-center relative"
          onClick={onMessageClick}
          aria-label="Messages"
        >
          <img
            src="/icons/message.svg"
            alt="Messages"
            className="w-[30px] h-[30px]"
          />
        </button>

        {/* Dynamic Action Button */}
        <button 
          className="w-[90px] sm:w-[129px] h-[44px] bg-sky-600 hover:bg-sky-700 rounded-lg border-none cursor-pointer flex items-center justify-center gap-1 sm:gap-2 transition-all duration-200"
          onClick={onCreatePost}
        >
          <Plus size={16} color="white" />
          <span className="font-lexend font-normal text-sm sm:text-base leading-[20px] text-white">
            <span className="hidden sm:inline">{createButtonText}</span>
            <span className="sm:hidden">{createButtonText.split(' ')[1] || createButtonText}</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopNavbar;
