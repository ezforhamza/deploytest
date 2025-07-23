// src/features/create-post/components/TaggedUsers.jsx

import React, { useState } from "react";
import TagPersonModal from "./TagPersonModal";

const TaggedUsers = ({ taggedUsers, onUpdateTaggedUsers }) => {
  const [showTagPersonModal, setShowTagPersonModal] = useState(false);

  const handleSelectUsers = (selectedUsers) => {
    onUpdateTaggedUsers(selectedUsers);
  };

  const handleRemoveTag = (userId) => {
    onUpdateTaggedUsers(taggedUsers.filter(tagged => tagged.id !== userId));
  };

  const getDisplayText = () => {
    if (taggedUsers.length === 0) return "Tag people";
    if (taggedUsers.length === 1) return `${taggedUsers[0].name}`;
    if (taggedUsers.length === 2) return `${taggedUsers[0].name} and ${taggedUsers[1].name}`;
    return `${taggedUsers[0].name}, ${taggedUsers[1].name} and ${taggedUsers.length - 2} more`;
  };

  return (
    <div className="px-6 py-4">
      {/* Tag Users Button */}
      <div className="relative">
        <button
          onClick={() => setShowTagPersonModal(true)}
          className="flex items-center gap-3 px-4 py-2 bg-[rgba(16,144,207,0.15)] rounded-[4px] hover:bg-[rgba(16,144,207,0.25)] transition-colors duration-200"
        >
          {/* Tag Icon */}
          <div className="w-[19px] h-[19px] flex items-center justify-center">
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path
                d="M2 7L7 2C7.53043 1.46957 8.23478 1.17082 8.96967 1.17082C9.70457 1.17082 10.4089 1.46957 10.9393 2L17 8.06066C17.5304 8.59109 17.8292 9.29544 17.8292 10.0303C17.8292 10.7652 17.5304 11.4696 17 12L12 17C11.4696 17.5304 10.7652 17.8292 10.0303 17.8292C9.29544 17.8292 8.59109 17.5304 8.06066 17L2 10.9393C1.46957 10.4089 1.17082 9.70457 1.17082 8.96967C1.17082 8.23478 1.46957 7.53043 2 7Z"
                stroke="#1090CF"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="12" cy="7" r="1.5" fill="#1090CF"/>
            </svg>
          </div>

          <span className="font-lexend font-medium text-[12px] text-black flex-1 text-left">
            {getDisplayText()}
          </span>

          {/* Arrow Icon */}
          <div className="w-3 h-3">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path 
                d="M3 4.5L6 7.5L9 4.5" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      {/* Tag Person Modal */}
      <TagPersonModal
        isOpen={showTagPersonModal}
        onClose={() => setShowTagPersonModal(false)}
        onSelectUsers={handleSelectUsers}
        selectedUsers={taggedUsers}
      />

      {/* Tagged Users Display */}
      {taggedUsers.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {taggedUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-lexend"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover"
              />
              <span>{user.name}</span>
              <button
                onClick={() => handleRemoveTag(user.id)}
                className="ml-1 hover:text-blue-600"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path 
                    d="M9 3L3 9M3 3L9 9" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaggedUsers;