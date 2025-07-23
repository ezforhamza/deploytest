// Minimal Profile Usage Example - User without business card or partner info
import React, { useState } from "react";
import Profile from "./Profile";

const MinimalProfilePage = () => {
  const [profileData] = useState({
    user: {
      name: "Jane Smith",
      avatar: "/common/profile-image.png",
      location: "San Francisco, CA",
      // Adding business card and partner info
      partnerInfo: {
        text: "Partners",
        link: "/partners",
      },
      partners: [
        {
          id: 1,
          name: "Alex Rivera",
          avatar: "/common/partner3-avatar.png",
          profession: "Software Engineer",
          company: "DevCorp",
          isFollowing: false,
        },
      ],
      businessCardLink: {
        text: "View Business card",
        url: "/business-card",
      },
    },
    userStats: {
      followers: 850,
      following: 420,
      posts: 23,
    },
    content: {
      posts: [
        {
          id: 1,
          content: "Just finished a great project!",
          description: "Working on innovative solutions in tech.",
          hashtags: ["#TechLife", "#Innovation"],
          image: "/common/post-image.png",
          date: "25 March 2025",
        },
      ],
      certificates: [],
      workHistory: [
        {
          id: 1,
          title: "Software Engineer",
          company: "Tech Corp",
          duration: "Jan 2023 - Present • 2 yrs",
          description: "Building scalable web applications.",
        },
      ],
    },
    initialIsFollowing: false,
  });

  const handleFollow = async (isFollowing) => {
    console.log("API: Follow user", isFollowing);
  };

  const handleMessage = async () => {
    console.log("API: Open message conversation");
  };

  const handleTabChange = (tab) => {
    console.log("Tab changed to:", tab);
  };

  const handleBack = () => {
    console.log("Navigate back");
  };

  return (
    <Profile
      user={profileData.user}
      userStats={profileData.userStats}
      content={profileData.content}
      activeTab="posts"
      initialIsFollowing={profileData.initialIsFollowing}
      initialFollowStatus="follow"
      isPrivate={false}
      onFollow={handleFollow}
      onMessage={handleMessage}
      onTabChange={handleTabChange}
      onBack={handleBack}
    />
  );
};

export default MinimalProfilePage;