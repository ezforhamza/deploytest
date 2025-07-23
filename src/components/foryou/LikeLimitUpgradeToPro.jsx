// src/components/foryou/LikeLimitUpgradeToPro.jsx

import React from "react";
import Modal from "../ui/Modal";

const LikeLimitUpgradeToPro = ({ isOpen, onClose, onUpgrade }) => {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-4xl"
    >
      <div 
        className="bg-white rounded-[20px] w-full max-w-[794px] h-[530px] relative overflow-hidden"
        style={{ boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[30px] right-[35px] w-[33px] h-[33px] flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 z-10"
        >
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 16 16" 
            fill="none"
            className="w-4 h-4"
          >
            <path 
              d="M12 4L4 12M4 4L12 12" 
              stroke="currentColor" 
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Brand Logo */}
        <div className="absolute top-[80px] left-1/2 transform -translate-x-1/2">
          <div className="w-[104px] h-[104px] flex items-center justify-center">
            <img 
              src="/Brand-Guideline-2025-5.png" 
              alt="Brand Logo" 
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Title */}
        <div className="absolute top-[221px] left-[129px]">
          <h2 
            className="font-lexend font-medium text-[25.24px] leading-[32px] text-center text-black w-[536px]"
          >
            You've reached your daily limit!
          </h2>
        </div>

        {/* Description */}
        <div className="absolute top-[268px] left-1/2 transform -translate-x-1/2">
          <p 
            className="font-lexend font-normal text-[25.24px] leading-[32px] text-center text-[#707070] w-[558px] h-[128px]"
          >
            You can like 10 profiles on the free plan. Upgrade to Premium for unlimited profile likes and more features!
          </p>
        </div>

        {/* Go Premium Button */}
        <div className="absolute top-[388px] left-1/2 transform -translate-x-1/2">
          <button
            onClick={() => {
              if (onUpgrade) {
                onUpgrade();
              }
              onClose();
            }}
            className="w-[724px] h-[72px] bg-[#0490CF] hover:bg-[#0376a3] rounded-[10.76px] flex items-center justify-center transition-colors duration-200"
          >
            <span className="font-lexend font-semibold text-[21.5px] leading-[150%] text-white">
              Go premium
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LikeLimitUpgradeToPro;