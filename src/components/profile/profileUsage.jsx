// src/components/profile/profileUsage.jsx
// Example usage - src/pages/ProfilePage.jsx or wherever you want to use the Profile component

import React, { useState } from "react";
import Profile from "./Profile";

const ProfilePage = () => {
  const [profileData] = useState({
    user: {
      name: "Jerome Bell",
      avatar: "/common/profile-image.png", // You'll need to add this image
      location: "Coppell, Virginia",
      // partnerInfo is optional - only include if user has partners
      partnerInfo: {
        text: "Partners",
        link: "/partners", // Optional link
      },
      // partners array for the partner modal
      partners: [
        {
          id: 1,
          name: "Sarah Johnson",
          avatar: "/common/partner1-avatar.png",
          profession: "Marketing Director",
          company: "AdTech Solutions",
          isFollowing: false,
        },
        {
          id: 2,
          name: "Michael Chen",
          avatar: "/common/partner2-avatar.png",
          profession: "Product Manager",
          company: "InnovateCorp",
          isFollowing: true,
        },
      ],
      // businessCardLink is optional - only include if user has business card
      businessCardLink: {
        text: "View Business card",
        url: "/business-card", // Optional URL
      },
    },
    userStats: {
      followers: 1250,
      following: 890,
      posts: 45,
    },
    content: {
      // Posts data (can reuse existing Post components)
      posts: [
        {
          id: 1,
          content: "Weekend Shopping Spree 🛍️",
          description:
            "Retail therapy hits different when there's a sale! 😍 What did you guys buy this weekend?",
          hashtags: ["#ShopTillYouDrop", "#HaulTime"],
          image: "/common/shopping-post-image.png",
          date: "30 March 2025",
        },
      ],

      // Certificates data
      certificates: [
        {
          id: 1,
          title: "Foundations of User Experience (UX) Design",
          issuer: "Google",
          icon: "/common/ux-certificate-icon.png",
          date: "2024",
        },
        {
          id: 2,
          title: "UI/UX Design",
          issuer: "Adobe",
          icon: "/common/ui-certificate-icon.png",
          date: "2024",
        },
      ],

      // Work history data
      workHistory: [
        {
          id: 1,
          title: "UI/UX Designer",
          company: "Nam-Zim",
          duration: "Jul 2022 - Present • 2 yrs 11 months",
          description:
            "Lorem ipsum dolor sit amet consectetur. Quis magna etiam consectetur dictum at. Lorem pellentesque praesent vel eu sit ut magna mattis. Quam in bibendum et amet molestie. Sit scelerisque.",
        },
        {
          id: 2,
          title: "UI/UX / Graphic Designer",
          company: "Nam-Zim",
          duration: "Jul 2021 - June 2022 • 1 yr 1 months",
          description:
            "Lorem ipsum dolor sit amet consectetur. Quis magna etiam consectetur dictum at. Lorem pellentesque praesent vel eu sit ut magna mattis. Quam in bibendum et amet molestie. Sit scelerisque.",
        },
      ],

      // Education data
      education: [
        {
          id: 1,
          institution: "University of Punjab",
          degree: "BSCS - UI/UX Design",
          duration: "April 11, 2021 - April 11, 2021",
          description: "UI/UX - Prototype - Wireframing",
        },
      ],
    },
    // API-ready initial states
    initialIsFollowing: false,
  });

  // API-ready handlers (these would make actual API calls)
  const handleFollow = async (isFollowing) => {
    console.log("API: Follow user", isFollowing);
    // Example API call:
    // await api.followUser(userId, isFollowing);
  };

  const handleMessage = async () => {
    console.log("API: Open message conversation");
    // Example API call:
    // await api.openConversation(userId);
    // Or navigate to messages page
    // navigate(`/messages/${userId}`);
  };

  const handleTabChange = (tab) => {
    console.log("Tab changed to:", tab);
    // You could fetch different data based on tab
    // Or update URL parameters
  };

  const handleBack = () => {
    console.log("Navigate back");
    // navigate(-1) or navigate('/')
  };

  const handleMenu = () => {
    console.log("Open profile menu");
    // Open dropdown menu with options like Report, Block, etc.
  };

  return (
    <Profile
      user={profileData.user}
      userStats={profileData.userStats}
      content={profileData.content}
      activeTab="posts" // Can be "posts", "certificates", or "workHistory"
      initialIsFollowing={profileData.initialIsFollowing}
      initialFollowStatus="follow" // "follow", "following", "requested"
      isPrivate={false} // Set to true for private profiles
      onFollow={handleFollow}
      onMessage={handleMessage}
      onTabChange={handleTabChange}
      onBack={handleBack}
      onMenu={handleMenu}
    />
  );
};

export default ProfilePage;
