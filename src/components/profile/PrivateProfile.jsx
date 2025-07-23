// src/components/profile/PrivateProfile.jsx

import React from "react";

const PrivateProfile = () => {
  return (
    <div className="flex flex-row items-center gap-[21.47px] w-full max-w-[398.52px] h-[83.19px] px-4 md:px-0">
      {/* Lock Icon Container */}
      <div className="w-[83.19px] h-[83.19px] bg-[#F4F4F4] rounded-full flex items-center justify-center flex-shrink-0">
        <img
          src="/icons/lock.svg"
          alt="Private Account"
          className="w-[35.65px] h-[35.65px]"
        />
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-start gap-[2.68px] w-full max-w-[293.86px] h-[59.68px]">
        {/* Main Text */}
        <h3 className="font-lexend font-medium text-black w-full"
          style={{
            fontSize: "21.4691px",
            lineHeight: "150%",
          }}
        >
          This account is private
        </h3>

        {/* Subtitle */}
        <p className="font-lexend font-normal text-[#58606C] w-full"
          style={{
            fontSize: "16.3702px",
            lineHeight: "150%",
          }}
        >
          Follow this account to see their posts
        </p>
      </div>
    </div>
  );
};

export default PrivateProfile;