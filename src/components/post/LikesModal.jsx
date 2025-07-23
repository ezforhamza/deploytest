// src/components/post/LikesModal.jsx

import React from "react";
import { colors, typography } from "../../styles/tokens";
import Modal from "../ui/Modal";

const LikesModal = ({ isOpen, onClose, likes = [] }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg w-[663px] max-w-[90vw] mx-auto h-[768px] max-h-[90vh] flex flex-col sm:max-w-[90vw] sm:h-[80vh]" style={{ minWidth: '500px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2
            className="text-xl font-medium text-center flex-1"
            style={{ fontFamily: typography.fontFamily.primary }}
          >
            Likes
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

        {/* Likes List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {likes.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500" style={{ fontFamily: typography.fontFamily.primary }}>
                  No likes yet
                </p>
              </div>
            ) : (
              likes.map((like, index) => (
                <LikeItem key={index} user={like} />
              ))
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const LikeItem = ({ user }) => {
  return (
    <div className="flex items-center justify-between w-full h-16 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors">
      {/* Left Section - User Info */}
      <div className="flex items-center gap-5">
        {/* Avatar Container */}
        <div className="relative">
          <div
            className="w-16 h-16 rounded-full bg-gray-200 bg-cover bg-center"
            style={{
              backgroundImage: `url(${user.avatar})`,
              borderRadius: "60px",
            }}
          />
          {/* Like Icon Badge */}
          <div
            className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
            style={{
              backgroundColor: "#378FE9",
              borderRadius: "42px",
            }}
          >
            <img
              src="/icons/like2.svg"
              alt="Like"
              className="w-4 h-4"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </div>

        {/* User Name */}
        <span
          className="text-black font-medium"
          style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: "19.5px",
            lineHeight: "150%",
            fontWeight: 500,
          }}
        >
          {user.name}
        </span>
      </div>

      {/* Right Section - Action Button */}
      <div className="flex items-center">
        <button
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: colors.primary }}
        >
          <img
            src="/icons/like2.svg"
            alt="Like"
            className="w-6 h-6"
            style={{ transform: "scaleX(-1)" }}
          />
        </button>
      </div>
    </div>
  );
};

export default LikesModal;
