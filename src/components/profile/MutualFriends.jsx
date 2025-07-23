// src/components/profile/MutualFriends.jsx

import React from "react";

const MutualFriends = ({ mutualFriends = [], totalFollowers = 0 }) => {
  // Sample mutual friends data if none provided
  const sampleMutualFriends = [
    { id: 1, name: "Lakeside", avatar: "/common/profile-image.png" },
    { id: 2, name: "Crestwood", avatar: "/common/profile-image.png" },
    { id: 3, name: "John", avatar: "/common/profile-image.png" },
    { id: 4, name: "Sarah", avatar: "/common/profile-image.png" },
  ];

  const friendsData = mutualFriends.length > 0 ? mutualFriends : sampleMutualFriends;
  const displayFriends = friendsData.slice(0, 4); // Show max 4 profile pictures
  const remainingCount = Math.max(0, totalFollowers - 2); // Subtract the 2 named friends

  const getFriendsText = () => {
    if (displayFriends.length === 0) return "";
    
    const namedFriends = displayFriends.slice(0, 2).map(friend => friend.name);
    let text = namedFriends.join(", ");
    
    if (remainingCount > 0) {
      text += ` and ${remainingCount} user${remainingCount > 1 ? 's' : ''} following`;
    } else if (namedFriends.length > 1) {
      text += " following";
    } else {
      text += " following";
    }
    
    return text;
  };

  if (displayFriends.length === 0) return null;

  return (
    <div className="flex flex-row items-center w-full max-w-[554px] px-4 md:px-0 ml-[28px]">
      <div className="relative flex flex-row items-center w-full max-w-[429.38px] h-[32.2px]">
        {/* Profile Pictures Group */}
        <div className="relative flex flex-row items-center h-[32.2px]">
          {displayFriends.map((friend, index) => (
            <div
              key={friend.id}
              className="absolute w-[32.2px] h-[32.2px] bg-[#F6F6F6] rounded-full border-[1.34182px] border-white box-border overflow-hidden"
              style={{
                left: `${index * 13.42}px`,
                zIndex: displayFriends.length - index,
              }}
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>

        {/* Mutual Friends Text */}
        <div className="ml-[80px] flex-1">
          <span 
            className="font-lexend font-normal text-[#58606C]"
            style={{
              fontSize: "16.3702px",
              lineHeight: "150%",
            }}
          >
            {getFriendsText()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MutualFriends;