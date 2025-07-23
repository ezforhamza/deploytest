// Private Profile Test - Example usage
import React from "react";
import Profile from "./Profile";

const PrivateProfileTest = () => {
  const privateProfileData = {
    user: {
      name: "John Doe",
      avatar: "/common/profile-image.png",
      location: "New York, NY",
      partnerInfo: {
        text: "Partners",
        link: "/partners",
      },
      businessCardLink: {
        text: "View Business card",
        url: "/business-card",
      },
    },
    userStats: {
      followers: 1250,
      following: 890,
      posts: 45,
    },
    content: {
      posts: [],
      certificates: [],
      workHistory: [],
    },
  };

  const handleFollow = async (currentStatus) => {
    console.log("Follow action with status:", currentStatus);
    // API call would go here
  };

  const handleMessage = async () => {
    console.log("Message action");
    // API call would go here
  };

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>Private Profile Test</h2>
      
      {/* Test Case 1: Private profile with "follow" status */}
      <div>
        <h3>Case 1: Private profile - Not following</h3>
        <Profile
          user={privateProfileData.user}
          userStats={privateProfileData.userStats}
          content={privateProfileData.content}
          activeTab="posts"
          initialIsFollowing={false}
          initialFollowStatus="follow"
          isPrivate={true}
          onFollow={handleFollow}
          onMessage={handleMessage}
        />
      </div>

      {/* Test Case 2: Private profile with "requested" status */}
      <div>
        <h3>Case 2: Private profile - Request sent</h3>
        <Profile
          user={privateProfileData.user}
          userStats={privateProfileData.userStats}
          content={privateProfileData.content}
          activeTab="posts"
          initialIsFollowing={false}
          initialFollowStatus="requested"
          isPrivate={true}
          onFollow={handleFollow}
          onMessage={handleMessage}
        />
      </div>

      {/* Test Case 3: Private profile with "following" status */}
      <div>
        <h3>Case 3: Private profile - Following (shows content)</h3>
        <Profile
          user={privateProfileData.user}
          userStats={privateProfileData.userStats}
          content={privateProfileData.content}
          activeTab="posts"
          initialIsFollowing={true}
          initialFollowStatus="following"
          isPrivate={true}
          onFollow={handleFollow}
          onMessage={handleMessage}
        />
      </div>

      {/* Test Case 4: Public profile */}
      <div>
        <h3>Case 4: Public profile (normal behavior)</h3>
        <Profile
          user={privateProfileData.user}
          userStats={privateProfileData.userStats}
          content={privateProfileData.content}
          activeTab="posts"
          initialIsFollowing={false}
          initialFollowStatus="follow"
          isPrivate={false}
          onFollow={handleFollow}
          onMessage={handleMessage}
        />
      </div>
    </div>
  );
};

export default PrivateProfileTest;