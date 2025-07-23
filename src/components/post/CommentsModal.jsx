// src/components/post/CommentsModal.jsx

import React, { useState } from "react";
import { colors, typography } from "../../styles/tokens";
import Modal from "../ui/Modal";

const CommentsModal = ({ isOpen, onClose, comments = [], onSubmitComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onSubmitComment(newComment);
      setNewComment("");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white rounded-lg w-[663px] max-w-[90vw] mx-auto h-[768px] max-h-[90vh] flex flex-col sm:max-w-[90vw] sm:h-[80vh]" style={{ minWidth: '500px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2
            className="text-xl font-medium text-center flex-1"
            style={{ fontFamily: typography.fontFamily.primary }}
          >
            Comment
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

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {comments.map((comment, index) => (
            <CommentItem key={index} comment={comment} />
          ))}
        </div>

        {/* Comment Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your message"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 pr-12"
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: "14px",
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmitComment();
                  }
                }}
              />
            </div>
            <button
              onClick={handleSubmitComment}
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const CommentItem = ({ comment }) => {
  return (
    <div className="flex items-start gap-3">
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-full bg-gray-200 bg-cover bg-center flex-shrink-0"
        style={{
          backgroundImage: `url(${comment.avatar})`,
          borderRadius: "50%",
        }}
      />

      {/* Comment Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="font-medium text-black"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            {comment.username}
          </span>
          <span
            className="text-gray-500 text-sm"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "12px",
            }}
          >
            {comment.timeAgo}
          </span>
        </div>

        <p
          className="text-gray-600 leading-relaxed"
          style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: "14px",
            lineHeight: "1.5",
            color: colors.text,
          }}
        >
          {comment.text}
        </p>
      </div>
    </div>
  );
};

export default CommentsModal;
