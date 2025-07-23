// src/components/dashboard/ProfileContent.jsx

import React from "react";

import Profile from "../profile/Profile";

const ProfileContent = () => {
  // Mock user data - replace with actual user data
  const mockUser = {
    avatar: "/common/profile-image.png",
    name: "Andrew Ainslay",
    location: "Coppell, Virginia",
    partnerInfo: {
      text: "Partner at Tech Corp",
    },
    businessCardLink: {
      text: "View Business card",
    },
    partners: [
      {
        id: 1,
        name: "Tech Corp",
        avatar: "/common/profile-image.png",
        role: "Partner",
      },
    ],
  };

  const mockUserStats = {
    followers: 1234,
    following: 567,
    posts: 89,
  };

  const mockContent = {
    posts: [],
    certificates: [],
    workHistory: [],
  };

  return (
    <div className="flex justify-center w-full h-full">
      {/* Profile Component - Centered */}
      <div className="w-full max-w-[554px] px-4 sm:px-0">
        <Profile
          user={mockUser}
          userStats={mockUserStats}
          activeTab="posts"
          content={mockContent}
          initialIsFollowing={false}
          initialFollowStatus="follow"
          isPrivate={false}
          onFollow={(status) => console.log("Follow status:", status)}
          onMessage={() => console.log("Message clicked")}
          onTabChange={(tab) => console.log("Tab changed:", tab)}
          onBack={() => console.log("Back clicked")}
          onShare={() => console.log("Share clicked")}
          onReport={(reason) => console.log("Report:", reason)}
          onBlock={() => console.log("Block clicked")}
          mutualFriends={[]}
          totalFollowers={1234}
        />
      </div>
    </div>
  );
};

export default ProfileContent;
