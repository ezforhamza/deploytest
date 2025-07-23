// src/components/ui/SearchModal.jsx

import React, { useState } from "react";
import Modal from "./Modal";

const SearchModal = ({ 
  isOpen, 
  onClose, 
  onSearchSelect = () => {},
  className = "" 
}) => {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = [
    { id: "All", label: "All", active: true },
    { id: "Alumni", label: "Alumni", active: false },
    { id: "Companies", label: "Companies", active: false },
    { id: "Schools", label: "Schools", active: false },
    { id: "Jobs", label: "Jobs", active: false }
  ];

  const suggestions = [
    { id: 1, text: "ui designer", icon: "search" },
    { id: 2, text: "ux designer", icon: "search" },
    { id: 3, text: "it", icon: "search" },
    { id: 4, text: "ui ux designer", icon: "search" },
    { id: 5, text: "product designer", icon: "search" }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchSelect(suggestion.text, activeTab);
    onClose();
  };

  const SearchIcon = () => (
    <svg 
      width="15" 
      height="14" 
      viewBox="0 0 15 14" 
      fill="none" 
      className="flex-shrink-0"
    >
      <path 
        d="M1 6.5C1 3.46243 3.46243 1 6.5 1C9.53757 1 12 3.46243 12 6.5C12 9.53757 9.53757 12 6.5 12C3.46243 12 1 9.53757 1 6.5Z" 
        stroke="#8C8C8C" 
        strokeWidth="1.19" 
        fill="none"
      />
      <path 
        d="M10.5 10.5L13.5 13.5" 
        stroke="#8C8C8C" 
        strokeWidth="1.19" 
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`bg-white rounded-2xl shadow-lg max-w-[502px] w-full mx-4 sm:mx-auto ${className}`}
      showBackdrop={true}
    >
      <div className="w-full h-auto min-h-[426px] p-5 sm:p-6">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-6 sm:mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium 
                transition-all duration-200 flex-shrink-0
                ${activeTab === tab.id 
                  ? 'bg-[#1090CF] text-white shadow-sm' 
                  : 'border border-[#8E8E8E] text-[#8E8E8E] hover:border-[#1090CF] hover:text-[#1090CF]'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Suggestions Section */}
        <div className="flex flex-col">
          <h3 className="text-sm sm:text-base font-medium text-black mb-4">
            Try searching for
          </h3>
          
          <div className="flex flex-col gap-4">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="
                  flex items-center gap-3 sm:gap-4 p-2 rounded-lg 
                  hover:bg-gray-50 transition-colors duration-200 
                  text-left w-full group
                "
              >
                <div className="flex-shrink-0 w-[14px] h-[14px] flex items-center justify-center">
                  <SearchIcon />
                </div>
                <span className="text-sm sm:text-base font-normal text-[#58606C] group-hover:text-[#1090CF] transition-colors duration-200">
                  {suggestion.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SearchModal;