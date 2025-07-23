// src/components/post/Post.jsx

import React, { useState, useRef, useEffect } from "react";
import { colors } from "../../styles/tokens";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostStats from "./PostStats";
import PostActions from "./PostActions";
import CommentsModal from "./CommentsModal";
import LikesModal from "./LikesModal";
import ShareModal from "./ShareModal";
import ReportModal from "./ReportModal";

const Post = ({
  user,
  content,
  tags = [],
  images = [],
  stats,
  // API-ready initial states
  initialIsLiked = false,
  initialHasCommented = false,
  initialHasShared = false,
  // Data for likes and comments modals
  likesData = [],
  commentsData = [],
  // Callback functions for API calls
  onLike,
  onComment,
  onShare,
  onFollow,
  onUserClick,
  className = "",
}) => {
  // User interaction states (API-ready)
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [hasCommented, setHasCommented] = useState(initialHasCommented);
  const [hasShared, setHasShared] = useState(initialHasShared);
  
  // UI states
  const [showCommentField, setShowCommentField] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  
  // Stats management
  const [currentStats, setCurrentStats] = useState(stats);
  const [currentCommentsData, setCurrentCommentsData] = useState(commentsData);
  
  // Loading states for API calls
  const [isLiking, setIsLiking] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  const commentInputRef = useRef(null);

  const handleLike = async () => {
    if (isLiking) return; // Prevent double-clicks
    
    const previousIsLiked = isLiked;
    const previousStats = currentStats;
    
    // Optimistic update
    setIsLiking(true);
    setIsLiked(!isLiked);
    setCurrentStats(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }));
    
    try {
      // Call API function if provided
      if (onLike) {
        await onLike(!isLiked);
      }
    } catch (error) {
      // Rollback on error
      console.error('Like failed:', error);
      setIsLiked(previousIsLiked);
      setCurrentStats(previousStats);
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentClick = () => {
    setShowCommentField(!showCommentField);
  };

  useEffect(() => {
    if (showCommentField && commentInputRef.current) {
      commentInputRef.current.focus();
    }
  }, [showCommentField]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim() || isCommenting) return;
    
    const previousStats = currentStats;
    const previousHasCommented = hasCommented;
    
    // Optimistic update
    setIsCommenting(true);
    const newComment = commentText.trim();
    setCurrentStats(prev => ({
      ...prev,
      comments: prev.comments + 1
    }));
    setHasCommented(true);
    setCommentText("");
    setShowCommentField(false);
    
    try {
      // Call API function if provided
      if (onComment) {
        await onComment(newComment);
      }
      console.log("Comment submitted:", newComment);
    } catch (error) {
      // Rollback on error
      console.error('Comment failed:', error);
      setCurrentStats(previousStats);
      setHasCommented(previousHasCommented);
      setCommentText(newComment);
      setShowCommentField(true);
    } finally {
      setIsCommenting(false);
    }
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const handleShare = async (shareTargets) => {
    if (isSharing) return;
    
    const previousHasShared = hasShared;
    const previousStats = currentStats;
    
    // Optimistic update
    setIsSharing(true);
    setHasShared(true);
    setCurrentStats(prev => ({
      ...prev,
      shares: prev.shares + 1
    }));
    
    try {
      // Call API function if provided
      if (onShare) {
        await onShare(shareTargets);
      }
      console.log("Post shared to:", shareTargets);
    } catch (error) {
      // Rollback on error
      console.error('Share failed:', error);
      setHasShared(previousHasShared);
      setCurrentStats(previousStats);
    } finally {
      setIsSharing(false);
    }
  };

  const handleLikesClick = () => {
    console.log("Show likes modal", likesData);
    setShowLikesModal(true);
  };

  const handleCommentsClick = () => {
    setShowCommentsModal(true);
  };

  const handleModalCommentSubmit = async (commentText) => {
    const newComment = {
      id: Date.now(),
      username: "Current User", // This would come from auth context
      avatar: "/common/profile-image.png",
      text: commentText,
      timeAgo: "just now"
    };

    // Optimistic update
    setCurrentCommentsData(prev => [...prev, newComment]);
    setCurrentStats(prev => ({
      ...prev,
      comments: prev.comments + 1
    }));
    setHasCommented(true);

    try {
      if (onComment) {
        await onComment(commentText);
      }
      console.log("Comment submitted:", commentText);
    } catch (error) {
      console.error('Comment failed:', error);
      // Rollback on error
      setCurrentCommentsData(prev => prev.filter(c => c.id !== newComment.id));
      setCurrentStats(prev => ({
        ...prev,
        comments: prev.comments - 1
      }));
    }
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };

  const handleTaglineClick = (tagline, taggedUsers) => {
    // Handle tagline click - could show modal with tagged users
    console.log("Tagline clicked:", tagline, taggedUsers);
    // You can implement a modal or navigate to tagged users list
  };

  const handleReport = (reason) => {
    console.log("Post reported with reason:", reason);
    console.log("Reported post data:", { user, content, stats: currentStats });
    // Here you would typically send the report to your API
  };


  return (
    <div 
      className={`flex flex-col items-start gap-2 w-full font-lexend ${className}`}
      style={{ backgroundColor: colors.white }}
    >
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex flex-col items-start gap-2 w-full">
          <div className="flex flex-col items-start gap-[11px] w-full">
            <PostHeader user={user} onFollow={onFollow} onReport={handleReportClick} onTaglineClick={handleTaglineClick} onUserClick={onUserClick} />
            <PostContent content={content} tags={tags} images={images} />
            <PostStats 
              stats={currentStats} 
              onLikesClick={handleLikesClick}
              onCommentsClick={handleCommentsClick}
              likesData={likesData}
              commentsData={currentCommentsData}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-0 border-t border-[#E2E2E2] self-stretch" />
      <PostActions
        stats={currentStats}
        isLiked={isLiked}
        hasCommented={hasCommented}
        hasShared={hasShared}
        isLiking={isLiking}
        isCommenting={isCommenting}
        isSharing={isSharing}
        onLike={handleLike}
        onComment={handleCommentClick}
        onShare={handleShareClick}
      />
      
      {/* Comment Field */}
      {showCommentField && (
        <div className="relative w-full pl-[26px] pt-2 pb-4">
          <input
            ref={commentInputRef}
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write a comment..."
            className="w-full h-[44px] bg-[#F2F2F2] rounded-[22px] px-4 py-3 border-none outline-none text-sm font-lexend"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleCommentSubmit();
              }
            }}
          />
        </div>
      )}
      
      {/* Comments Modal */}
      <CommentsModal
        isOpen={showCommentsModal}
        onClose={() => setShowCommentsModal(false)}
        comments={currentCommentsData}
        onSubmitComment={handleModalCommentSubmit}
      />
      
      {/* Likes Modal */}
      <LikesModal
        isOpen={showLikesModal}
        onClose={() => setShowLikesModal(false)}
        likes={likesData}
      />
      
      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        onShare={handleShare}
      />
      
      {/* Report Modal */}
      <ReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onReport={handleReport}
        post={{ user, content, stats: currentStats }}
      />
    </div>
  );
};

export default Post;
