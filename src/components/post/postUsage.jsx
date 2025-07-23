// Example usage - src/pages/HomePage.jsx or wherever you want to use the Post component

import React, { useState } from "react";
import Post from "./Post";

const HomePage = () => {
  const [posts] = useState([
    {
      id: 1,
      user: {
        companyName: "Tech - Technologies Co.",
        date: "11 April 2025",
        avatar: "/common/profile-image.png", // You'll need to add this image
        isFollowing: false,
        tagine: "Innovating the future with AI",
      },
      content: {
        title: "💼 Frontend Developer (React.js)",
        description:
          "🚀 Hiring React.js Frontend Developer – Remote! Build stunning UIs with a creative team. Click to apply now and grow fast! usag doug asoufgfo usagf ouagsou fgoausgdo uasgdou agsodug asoudgaosd. udsagiud gasiugd iuas",
      },
      tags: ["React", "JavaScript", "RemoteWork", "Frontend", "HiringNow"],

      images: ["/common/profile-image.png"],
      stats: {
        likes: 722230,
        comments: 1432,
        shares: 2323,
      },
      // API-ready initial states (would come from API response)
      initialIsLiked: false,
      initialHasCommented: false,
      initialHasShared: false,
      // Sample data for likes and comments
      likesData: [
        {
          id: 1,
          name: "John Doe",
          avatar: "/common/profile-image.png",
          timeAgo: "2h ago"
        },
        {
          id: 2,
          name: "Jane Smith",
          avatar: "/common/profile-image.png",
          timeAgo: "1h ago"
        }
      ],
      commentsData: [
        {
          id: 1,
          username: "Alice Johnson",
          avatar: "/common/profile-image.png",
          text: "Great opportunity! I'm really interested in this position.",
          timeAgo: "3h ago"
        },
        {
          id: 2,
          username: "Bob Wilson",
          avatar: "/common/profile-image.png",
          text: "This looks like an amazing company to work for. Do you have any remote positions available?",
          timeAgo: "2h ago"
        }
      ],
    },
  ]);

  // API-ready handlers (these would make actual API calls)
  const handleLike = async (isLiked) => {
    console.log("API: Like post", isLiked);
    // Example API call:
    // await api.likePost(postId, isLiked);
  };

  const handleComment = async (commentText) => {
    console.log("API: Comment on post", commentText);
    // Example API call:
    // await api.commentPost(postId, commentText);
  };

  const handleShare = async () => {
    console.log("API: Share post");
    // Example API call:
    // await api.sharePost(postId);
  };

  const handleFollow = (postId) => {
    console.log("Follow company from post:", postId);
    // Implement follow functionality
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {posts.map((post) => (
        <Post
          key={post.id}
          user={post.user}
          content={post.content}
          tags={post.tags}
          images={post.images}
          stats={post.stats}
          initialIsLiked={post.initialIsLiked}
          initialHasCommented={post.initialHasCommented}
          initialHasShared={post.initialHasShared}
          likesData={post.likesData}
          commentsData={post.commentsData}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
          onFollow={() => handleFollow(post.id)}
        />
      ))}
    </div>
  );
};

export default HomePage;
