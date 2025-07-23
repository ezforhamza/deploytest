// src/components/post/GroupsSelectionModal.jsx

import React, { useState } from "react";
import { colors, typography } from "../../styles/tokens";
import Modal from "../ui/Modal";

const GroupsSelectionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Groups",
  groups = [],
  maxSelection = null,
}) => {
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGroupToggle = (groupId) => {
    setSelectedGroups((prev) => {
      const isSelected = prev.includes(groupId);
      if (isSelected) {
        return prev.filter((id) => id !== groupId);
      } else {
        if (maxSelection && prev.length >= maxSelection) {
          return prev;
        }
        return [...prev, groupId];
      }
    });
  };

  const handleConfirm = () => {
    const selected = groups.filter((group) =>
      selectedGroups.includes(group.id)
    );
    onConfirm(selected);
    onClose();
  };

  const handleRemoveSelected = (groupId) => {
    setSelectedGroups((prev) => prev.filter((id) => id !== groupId));
  };

  const selectedGroupsData = groups.filter((group) =>
    selectedGroups.includes(group.id)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg w-[780px] max-w-[90vw] mx-auto h-[587px] max-h-[90vh] flex flex-col sm:max-w-[90vw] sm:h-[80vh]" style={{ minWidth: '600px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </button>
            <h2
              className="text-2xl font-medium"
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: "24px",
                fontWeight: 500,
              }}
            >
              {title}
            </h2>
          </div>
        </div>

        {/* Search */}
        <div className="p-6 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: "16px",
              }}
            />
          </div>
        </div>

        {/* Selected Groups */}
        {selectedGroups.length > 0 && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-gray-500"
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: "14px",
                }}
              >
                {selectedGroups.length} of {groups.length} selected
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              {selectedGroupsData.map((group) => (
                <div key={group.id} className="flex flex-col items-center">
                  <div className="relative">
                    <div
                      className="w-16 h-16 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${group.avatar})`,
                        backgroundSize: "cover",
                      }}
                    />
                    <button
                      onClick={() => handleRemoveSelected(group.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800"
                    >
                      <svg
                        width="12"
                        height="12"
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
                  <span
                    className="text-center text-sm mt-2 max-w-[80px] truncate"
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: "12px",
                    }}
                  >
                    {group.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 border-t border-gray-200 pt-4"></div>
          </div>
        )}

        {/* Groups Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-7 gap-6">
            {filteredGroups.map((group) => (
              <GroupItem
                key={group.id}
                group={group}
                isSelected={selectedGroups.includes(group.id)}
                onToggle={() => handleGroupToggle(group.id)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleConfirm}
            disabled={selectedGroups.length === 0}
            className={`w-full py-4 rounded-lg font-medium text-white transition-colors ${
              selectedGroups.length > 0
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            style={{
              backgroundColor:
                selectedGroups.length > 0 ? colors.primary : "#E5E5E5",
              fontFamily: typography.fontFamily.primary,
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Confirm Selection
          </button>
        </div>
      </div>
    </Modal>
  );
};

const GroupItem = ({ group, isSelected, onToggle }) => {
  return (
    <div
      className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onToggle}
    >
      <div className="relative">
        <div
          className="w-16 h-16 rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${group.avatar})`,
            backgroundSize: "cover",
          }}
        />
        {isSelected && (
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            </div>
          </div>
        )}
      </div>
      <span
        className="text-center text-sm mt-2 max-w-[80px] truncate"
        style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: "12px",
          fontWeight: 500,
        }}
      >
        {group.name}
      </span>
    </div>
  );
};

export default GroupsSelectionModal;
