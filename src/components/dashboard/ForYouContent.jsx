// src/components/dashboard/ForYouContent.jsx

import React from "react";
import { ForYou } from "../foryou";
import Profile from "../profile/Profile";

const ForYouContent = ({ userRole, searchValue, selectedProfile, onProfileClick, onBackToHome, onFilterChange, filters = {} }) => {
  // Mock user data for profile view
  const getMockUserData = (user) => ({
    id: user.id || 1,
    name: user.name || user.companyName,
    profession: user.jobTitle || "Professional",
    location: user.location || "New York, NY",
    avatar: user.profileImage || user.image,
    backgroundImage: "/common/profile-bg.jpg",
    isVerified: true,
    bio: user.bio || "Passionate about technology and innovation. Building the future one line of code at a time.",
    company: user.company || "Tech Solutions Inc.",
    education: user.education || user.school || "Computer Science, MIT",
    website: user.website || "https://example.com"
  });

  const getMockUserStats = () => ({
    posts: 152,
    following: 1205,
    followers: 5842
  });

  const getMockProfileContent = () => ({
    posts: [
      {
        id: 1,
        content: "🚀 Just completed a major project milestone! Our team successfully launched a new feature that improved user engagement by 40%. The journey involved:\n\n• Extensive user research and testing\n• Modern React architecture with hooks\n• Optimized performance and accessibility\n• Comprehensive testing suite\n\nProud of what we accomplished together! 💪",
        tags: ["ProjectSuccess", "React", "TeamWork", "UserExperience", "Achievement"],
        images: ["/common/project-milestone.jpg"],
        date: "3 days ago",
        likes: 156,
        comments: 23,
        shares: 8,
        isLiked: false,
        hasCommented: false,
        hasShared: false,
        likesData: [],
        commentsData: []
      }
    ],
    certificates: [
      {
        id: 1,
        title: "AWS Certified Developer",
        issuer: "Amazon Web Services", 
        date: "2024",
        icon: "/common/aws-cert-icon.png"
      }
    ],
    workHistory: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "2022 - Present",
        location: "San Francisco, CA",
        description: "Leading development of scalable web applications using React, Node.js, and cloud technologies."
      }
    ]
  });

  // If viewing a profile, show profile view
  if (selectedProfile) {
    return (
      <div className="w-full h-full">
        <div 
          className="bg-white rounded-[10px] overflow-hidden w-full"
          style={{ 
            boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)" 
          }}
        >
          <div className="p-4 sm:p-6 lg:p-[27px] pt-4 sm:pt-5 lg:pt-[20px]">
            <Profile
              user={getMockUserData(selectedProfile)}
              userStats={getMockUserStats()}
              content={getMockProfileContent()}
              onBack={onBackToHome}
              onUserClick={onProfileClick}
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* Main Content */}
      <div 
        className="bg-white rounded-[10px] overflow-hidden w-full h-full"
        style={{ 
          boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)" 
        }}
      >
        <div className="p-4 sm:p-6 lg:p-[27px] pt-4 sm:pt-5 lg:pt-[20px] h-full">
          <ForYou 
            className="w-full h-full"
            onProfileClick={onProfileClick}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
};

export default ForYouContent;