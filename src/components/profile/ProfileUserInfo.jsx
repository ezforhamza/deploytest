// src/components/profile/ProfileUserInfo.jsx

import { useState } from "react";
import { colors } from "../../styles/tokens";
import BusinessCardPreview from "../../features/privacy/BusinessCardPreview";
import PartnerModal from "../ui/PartnerModal";

const ProfileUserInfo = ({ user }) => {
  const [isBusinessCardOpen, setIsBusinessCardOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  // SVG for location icon
  const LocationIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C5.24 0 3 2.24 3 5C3 8.5 8 16 8 16S13 8.5 13 5C13 2.24 10.76 0 8 0ZM8 6.5C7.17 6.5 6.5 5.83 6.5 5S7.17 3.5 8 3.5S9.5 4.17 9.5 5S8.83 6.5 8 6.5Z"
        fill={colors.text}
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4 w-full">
      {/* User Avatar */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-[147.29px] lg:h-[147.29px] relative">
        <img
          src={user.avatar}
          alt={`${user.name}'s profile`}
          className="w-full h-full rounded-full object-cover"
          style={{
            border: `3px solid ${colors.white}`,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
          onError={(e) => {
            // Fallback image
            e.target.src = "/common/default-avatar.png";
          }}
        />
      </div>

      {/* User Name */}
      <h2 
        className="font-lexend font-semibold text-lg sm:text-xl lg:text-2xl leading-[150%] text-center m-0"
        style={{ color: colors.dark }}
      >
        {user.name}
      </h2>

      {/* Location */}
      {user.location && (
        <div className="flex flex-row items-center gap-1.5 sm:gap-2">
          <LocationIcon />
          <p 
            className="font-lexend font-normal text-sm sm:text-base leading-[150%] m-0"
            style={{ color: colors.text }}
          >
            {user.location}
          </p>
        </div>
      )}

      {/* Partner/Company Info */}
      {user.partnerInfo && (
        <button
          className="font-lexend font-semibold text-center m-0 cursor-pointer no-underline border-none bg-transparent"
          style={{ 
            fontSize: window.innerWidth < 640 ? "14px" : window.innerWidth < 768 ? "15px" : "15.58px",
            lineHeight: "150%",
            color: colors.primary 
          }}
          onClick={() => setIsPartnerModalOpen(true)}
        >
          {user.partnerInfo.text}
        </button>
      )}

      {/* Business Card Link */}
      {user.businessCardLink && (
        <button
          className="font-lexend font-semibold text-center m-0 cursor-pointer no-underline mt-1 border-none bg-transparent"
          style={{ 
            fontSize: window.innerWidth < 640 ? "14px" : window.innerWidth < 768 ? "15px" : "15.58px",
            lineHeight: "150%",
            color: colors.primary 
          }}
          onClick={() => setIsBusinessCardOpen(true)}
        >
          {user.businessCardLink.text || "View Business card"}
        </button>
      )}

      {/* Business Card Modal */}
      <BusinessCardPreview
        isOpen={isBusinessCardOpen}
        onClose={() => setIsBusinessCardOpen(false)}
        onShare={() => {
          // Handle share functionality
          console.log("Share business card");
        }}
        onEnableBusinessCard={() => {
          // Handle enable business card functionality
          console.log("Enable business card");
        }}
      />

      {/* Partner Modal */}
      <PartnerModal
        isOpen={isPartnerModalOpen}
        onClose={() => setIsPartnerModalOpen(false)}
        partners={user.partners || []}
        onFollow={(partnerId) => {
          // Handle follow functionality
          console.log("Follow partner:", partnerId);
        }}
        onProfileClick={(partner) => {
          // Handle profile click - navigate to user's profile
          console.log("View profile:", partner);
          // You can add navigation logic here
          // e.g., navigate(`/profile/${partner.id}`);
        }}
      />
    </div>
  );
};

export default ProfileUserInfo;
