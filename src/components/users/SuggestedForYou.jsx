// src/components/users/SuggestedForYou.jsx

import React, { useState } from "react";
import { MapPin, X } from "lucide-react";
import { colors, typography } from "../../styles/tokens";

const SuggestedForYou = ({
  users = [],
  onSeeAllClick = () => {},
  onFollowClick = () => {},
  onUserClick = () => {},
  onRemoveUser = () => {},
  onFetchNewUsers = () => [], // Function to fetch new users when one is removed
  mode = "column", // "column" or "row"
  className = "",
}) => {
  // Default users data if none provided
  const defaultUsers = [
    {
      id: 1,
      name: "Lakeside Middle",
      location: "Coppell, Virginia",
      image: "/common/profile-image.png",
      isFollowing: false,
    },
    {
      id: 2,
      name: "Crestwood",
      location: "Lansing, Illinois",
      image: "/common/profile-image.png",
      isFollowing: false,
    },
    {
      id: 3,
      name: "Riverside",
      location: "Kent, Utah",
      image: "/common/profile-image.png",
      isFollowing: false,
    },
  ];

  const [usersList, setUsersList] = useState(
    (users.length > 0 ? users : defaultUsers).slice(0, 3)
  );

  const handleRemoveUser = async (userId) => {
    // Remove the user from current list
    const updatedUsers = usersList.filter((user) => user.id !== userId);

    // Fetch new users to replace the removed one (like FB/Instagram)
    try {
      const newUsers = await onFetchNewUsers();
      if (newUsers && newUsers.length > 0) {
        // Add new users to maintain the list size
        const usersToAdd = newUsers.slice(0, 1); // Add one new user
        setUsersList([...updatedUsers, ...usersToAdd]);
      } else {
        setUsersList(updatedUsers);
      }
    } catch (error) {
      console.error("Error fetching new users:", error);
      setUsersList(updatedUsers);
    }

    onRemoveUser(userId);
  };

  // Column mode styles
  const columnContainerStyles = {
    position: "relative",
    width: "293px",
    minHeight: "auto",
    backgroundColor: colors.white,
    borderRadius: "10px",
    padding: "16px",
    boxSizing: "border-box",
  };

  // Row mode styles
  const rowContainerStyles = {
    position: "relative",
    width: "554px",
    minHeight: "auto",
    backgroundColor: colors.white,
    borderRadius: "10px",
    padding: "16px",
    boxSizing: "border-box",
  };

  const containerStyles =
    mode === "row" ? rowContainerStyles : columnContainerStyles;

  const handleFollowClick = (e, user) => {
    e.stopPropagation();
    onFollowClick(user);
  };

  const handleUserClick = (user) => {
    onUserClick(user);
  };

  const renderColumnMode = () => (
    <>
      {/* Header */}
      <div className="flex justify-between items-end mb-5 h-[18px]">
        <h3
          style={{
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.medium,
            fontSize: "14px",
            lineHeight: "18px",
            color: colors.dark,
            margin: 0,
          }}
        >
          Suggested for you
        </h3>
        <button
          onClick={onSeeAllClick}
          className="text-blue-500 hover:text-blue-600 transition-colors"
          style={{
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.regular,
            fontSize: "14px",
            lineHeight: "18px",
            color: colors.primary,
            border: "none",
            background: "transparent",
            padding: 0,
          }}
        >
          See All
        </button>
      </div>

      {/* Users List */}
      <div className="flex flex-col gap-3">
        {usersList.map((user, index) => (
          <React.Fragment key={user.id || index}>
            <div className="flex items-center gap-2 relative h-[59px]">
              {/* User Image */}
              <div
                onClick={() => handleUserClick(user)}
                className="w-[59px] h-[59px] rounded-full bg-gray-200 overflow-hidden flex-shrink-0 cursor-pointer"
                style={{ backgroundColor: "rgba(210, 210, 210, 0.2)" }}
              >
                <img
                  src={user.image || "/common/profile-image.png"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info */}
              <div className="flex flex-col gap-0.5 flex-1 ml-2">
                <h4
                  onClick={() => handleUserClick(user)}
                  className="cursor-pointer"
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "132%",
                    color: colors.text,
                    margin: 0,
                  }}
                >
                  {user.name}
                </h4>
                <div className="flex items-center gap-1">
                  <MapPin
                    size={9.7}
                    color={colors.text}
                    className="flex-shrink-0"
                  />
                  <p
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontWeight: typography.fontWeight.regular,
                      fontSize: "9.81px",
                      lineHeight: "132%",
                      color: colors.text,
                      margin: 0,
                    }}
                  >
                    {user.location}
                  </p>
                </div>
              </div>

              {/* Follow Button */}
              <button
                onClick={(e) => handleFollowClick(e, user)}
                className="hover:bg-blue-50 transition-colors flex-shrink-0"
                style={{
                  width: "92px",
                  height: "31px",
                  border: "1.34466px solid #1090CF",
                  borderRadius: "134.466px",
                  backgroundColor: "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: typography.fontWeight.regular,
                    fontSize: "13.7155px",
                    lineHeight: "132%",
                    color: colors.primary,
                    margin: 0,
                  }}
                >
                  {user.isFollowing ? "Following" : "Follow"}
                </span>
              </button>
            </div>

            {/* Divider */}
            {index < usersList.length - 1 && (
              <hr className="w-full h-px bg-gray-200 border-none my-3" />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );

  const renderRowMode = () => (
    <>
      {/* Header */}
      <div className="flex justify-between items-end mb-5 h-[18px]">
        <h3
          style={{
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.medium,
            fontSize: "14px",
            lineHeight: "18px",
            color: colors.dark,
            margin: 0,
          }}
        >
          Suggested for you
        </h3>
        <button
          onClick={onSeeAllClick}
          className="text-blue-500 hover:text-blue-600 transition-colors"
          style={{
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.regular,
            fontSize: "14px",
            lineHeight: "18px",
            color: colors.primary,
            border: "none",
            background: "transparent",
            padding: 0,
          }}
        >
          See All
        </button>
      </div>

      {/* Users Cards - Centered like a carousel */}
      <div className="flex justify-center items-start gap-8">
        {usersList.slice(0, 3).map((user) => (
          <div
            key={user.id}
            className="relative bg-white border border-gray-400 shadow-md"
            style={{
              width: "147.91px",
              height: "164.05px",
              borderRadius: "10.7573px",
              border: "0.941262px solid #A4A4A4",
              boxShadow: "0px 2.68932px 6.45437px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => handleRemoveUser(user.id)}
              className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center z-10 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Remove user"
            >
              <X size={12} color="#49454F" />
            </button>

            {/* User Image */}
            <div
              onClick={() => handleUserClick(user)}
              className="cursor-pointer mx-auto mt-2"
              style={{
                width: "76.2px",
                height: "76.2px",
                borderRadius: "50%",
                backgroundColor: "rgba(210, 210, 210, 0.2)",
                overflow: "hidden",
              }}
            >
              <img
                src={user.image || "/common/profile-image.png"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* User Info - Positioned to avoid overlap with follow button */}
            <div className="flex flex-col items-center text-center px-2 mt-2">
              <h4
                onClick={() => handleUserClick(user)}
                className="cursor-pointer mb-1"
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.medium,
                  fontSize: "13.7155px",
                  lineHeight: "120%",
                  letterSpacing: "0.01em",
                  color: "#292D32",
                  margin: 0,
                  width: "112px",
                }}
              >
                {user.name}
              </h4>

              <div className="flex items-center justify-center gap-1 mb-4">
                <MapPin
                  size={9.7}
                  color={colors.text}
                  className="flex-shrink-0"
                />
                <p
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: typography.fontWeight.regular,
                    fontSize: "7.76158px",
                    lineHeight: "132%",
                    color: colors.text,
                    margin: 0,
                  }}
                >
                  {user.location}
                </p>
              </div>
            </div>

            {/* Follow Button - Positioned at bottom to avoid overlap */}
            <button
              onClick={(e) => handleFollowClick(e, user)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 hover:bg-blue-50 transition-colors"
              style={{
                width: "126.4px",
                height: "30.93px",
                border: "1.34466px solid #1090CF",
                borderRadius: "134.466px",
                backgroundColor: "transparent",
              }}
            >
              <span
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.regular,
                  fontSize: "13.7155px",
                  lineHeight: "132%",
                  color: colors.primary,
                  margin: 0,
                }}
              >
                {user.isFollowing ? "Following" : "Follow"}
              </span>
            </button>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div style={containerStyles} className={`${className}`}>
      {mode === "row" ? renderRowMode() : renderColumnMode()}
    </div>
  );
};

export default SuggestedForYou;
