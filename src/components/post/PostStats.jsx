// src/components/post/PostStats.jsx

import React from "react";

const PostStats = ({ 
  stats, 
  onLikesClick, 
  onCommentsClick,
  likesData = [],
  commentsData = []
}) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toString();
  };

  return (
    <div className="flex items-center justify-between w-full py-2 px-1 text-xs sm:text-sm text-gray-600">
      {/* Left side - Likes with icon */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border border-white shadow-sm">
            <img 
              src="/icons/like2.svg" 
              alt="Like" 
              className="w-3 h-3 filter brightness-0 invert"
            />
          </div>
          <button
            onClick={onLikesClick}
            className="font-medium text-gray-700 hover:text-blue-600 cursor-pointer transition-colors hover:underline"
          >
            {formatNumber(stats.likes)}
          </button>
        </div>
      </div>

      {/* Right side - Comments and Shares */}
      <div className="flex items-center gap-4">
        <button
          onClick={onCommentsClick}
          className="hover:text-blue-600 cursor-pointer transition-colors hover:underline"
        >
          {formatNumber(stats.comments)} Comment{stats.comments !== 1 ? "s" : ""}
        </button>
        <span className="hover:text-blue-600 cursor-pointer transition-colors">
          {formatNumber(stats.shares)} Share{stats.shares !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
};

export default PostStats;
