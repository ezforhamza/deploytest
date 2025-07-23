// src/components/post/PostActions.jsx

import React from "react";

const PostActions = ({ 
  onLike, 
  onComment, 
  onShare, 
  isLiked = false, 
  hasCommented = false,
  hasShared = false,
  isLiking = false,
  isCommenting = false,
  isSharing = false
}) => {
  return (
    <>
      <style jsx>{`
        @keyframes likeAnimation {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1.1); }
        }
        @keyframes commentAnimation {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1.1); }
        }
      `}</style>
      <div className="flex items-center justify-between px-2 sm:px-4 lg:px-6 py-2 w-full gap-1 sm:gap-2">
      {/* Like Button */}
      <button 
        onClick={onLike}
        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 flex-1 justify-center ${
          isLiked ? 'text-blue-600' : 'text-gray-600'
        }`}
      >
        <img 
          src={isLiked ? "/icons/liked.svg" : "/icons/like1.svg"} 
          alt="Like" 
          className={`w-5 h-5 transition-transform duration-200 ${
            isLiked ? 'animate-pulse scale-110' : 'scale-100'
          }`}
          style={{
            animation: isLiked ? 'likeAnimation 0.3s ease-in-out' : 'none'
          }}
        />
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">Like</span>
      </button>

      {/* Comment Button */}
      <button 
        onClick={onComment}
        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 flex-1 justify-center ${
          hasCommented ? 'text-blue-600' : 'text-gray-600'
        }`}
      >
        <img 
          src={hasCommented ? "/icons/commented.svg" : "/icons/comment.svg"} 
          alt="Comment" 
          className={`w-5 h-5 transition-transform duration-200 ${
            hasCommented ? 'animate-pulse scale-110' : 'scale-100'
          }`}
          style={{
            animation: hasCommented ? 'commentAnimation 0.3s ease-in-out' : 'none'
          }}
        />
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">Comment</span>
      </button>

      {/* Share Button */}
      <button 
        onClick={onShare}
        disabled={isSharing}
        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 hover:bg-gray-100 flex-1 justify-center ${
          hasShared ? 'text-blue-600' : 'text-gray-600'
        } ${isSharing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <img 
          src="/icons/share.svg" 
          alt="Share" 
          className={`w-5 h-5 transition-transform duration-200 ${
            hasShared ? 'animate-pulse scale-110' : 'scale-100'
          }`}
        />
        <span className="text-xs sm:text-sm font-medium hidden sm:inline">
          {isSharing ? 'Sharing...' : 'Share'}
        </span>
      </button>
      </div>
    </>
  );
};

export default PostActions;
