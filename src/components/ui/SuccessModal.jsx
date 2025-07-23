// src/components/ui/SuccessModal.jsx

import React from "react";
import { Check } from "lucide-react";
import { typography } from "../../styles/tokens";

const SuccessModal = ({
  isOpen,
  onClose,
  title = "Congratulations!",
  message = "You've successfully unlocked free access to the app using your referral code. Enjoy all premium features — completely free, no subscription needed!",
  buttonText = "Done",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg w-full max-w-2xl mx-auto"
        style={{
          borderRadius: "20px",
          maxWidth: "794px",
          minHeight: "543px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main decorative illustration area */}
          <div
            className="absolute"
            style={{
              width: "196.59px",
              height: "163px",
              left: "50%",
              top: "47px",
              transform: "translateX(-50%)",
            }}
          >
            {/* Background blur circle */}
            <div
              className="absolute bg-[#0490CF] opacity-10 rounded-full"
              style={{
                width: "120.31px",
                height: "120.31px",
                left: "50%",
                top: "42.69px",
                transform: "translateX(-50%)",
              }}
            />

            {/* Decorative elements */}
            {/* Top left small circle */}
            <div
              className="absolute bg-[#0490CF] rounded-full"
              style={{
                width: "7.76px",
                height: "7.76px",
                left: "28.13px",
                top: "53.36px",
              }}
            />

            {/* Top center circle */}
            <div
              className="absolute bg-[#0490CF] rounded-full"
              style={{
                width: "16.49px",
                height: "16.49px",
                left: "97.02px",
                top: "6.79px",
              }}
            />

            {/* Right circle */}
            <div
              className="absolute bg-[#0490CF] rounded-full"
              style={{
                width: "15.52px",
                height: "15.52px",
                left: "171.73px",
                top: "84.41px",
              }}
            />

            {/* Small top circle */}
            <div
              className="absolute bg-[#0490CF] rounded-full"
              style={{
                width: "3.88px",
                height: "3.88px",
                left: "94.11px",
                top: "0.97px",
              }}
            />

            {/* Small rectangle */}
            <div
              className="absolute bg-[#0490CF]"
              style={{
                width: "6.79px",
                height: "6.79px",
                left: "169.79px",
                top: "71.8px",
                borderRadius: "1.94px",
              }}
            />

            {/* Decorative curved lines */}
            <svg
              className="absolute"
              style={{
                left: "0px",
                top: "70.83px",
                width: "22.32px",
                height: "17.46px",
              }}
              viewBox="0 0 23 18"
              fill="none"
            >
              <path
                d="M2 15C8 8 15 2 21 8"
                stroke="#0490CF"
                strokeWidth="2.91"
                fill="none"
              />
            </svg>

            <svg
              className="absolute"
              style={{
                left: "32.99px",
                top: "0px",
                width: "37.35px",
                height: "8.83px",
                transform: "rotate(28.98deg)",
              }}
              viewBox="0 0 38 9"
              fill="none"
            >
              <path
                d="M2 7C12 2 25 2 36 4"
                stroke="#0490CF"
                strokeWidth="2.91"
                fill="none"
              />
            </svg>

            <svg
              className="absolute"
              style={{
                left: "177.55px",
                top: "124.19px",
                width: "11.44px",
                height: "18.43px",
                transform: "rotate(-29.52deg)",
              }}
              viewBox="0 0 12 19"
              fill="none"
            >
              <path
                d="M2 2C4 8 6 12 10 17"
                stroke="#0490CF"
                strokeWidth="2.91"
                fill="none"
              />
            </svg>

            <svg
              className="absolute"
              style={{
                left: "172.7px",
                top: "21.35px",
                width: "17.46px",
                height: "15.8px",
                transform: "rotate(16.17deg)",
              }}
              viewBox="0 0 18 16"
              fill="none"
            >
              <path
                d="M2 8C6 3 12 3 16 8"
                stroke="#0490CF"
                strokeWidth="2.91"
                fill="none"
              />
            </svg>

            {/* Stars */}
            <svg
              className="absolute"
              style={{
                width: "15.52px",
                height: "15.52px",
                left: "137.77px",
                top: "4.85px",
              }}
              viewBox="0 0 16 16"
              fill="#0490CF"
            >
              <path d="M8 0L9.798 5.52H15.616L10.909 8.944L12.707 14.464L8 11.04L3.293 14.464L5.091 8.944L0.384 5.52H6.202L8 0Z" />
            </svg>

            <svg
              className="absolute"
              style={{
                width: "20.38px",
                height: "20.38px",
                left: "18.44px",
                top: "113.52px",
              }}
              viewBox="0 0 21 21"
              fill="#0490CF"
            >
              <path d="M10.5 0L12.795 7.205H20.5L14.352 11.59L16.647 18.795L10.5 14.41L4.353 18.795L6.648 11.59L0.5 7.205H8.205L10.5 0Z" />
            </svg>
          </div>
        </div>

        {/* Success Icon */}
        <div className="flex justify-center pt-12 md:pt-16">
          <div
            className="relative flex items-center justify-center"
            style={{
              width: "97.02px",
              height: "97.02px",
            }}
          >
            <div
              className="absolute inset-0 bg-[#F5F5FF] border-[7.76px] border-[#0490CF] rounded-full"
              style={{
                borderRadius: "23.29px",
              }}
            />
            <Check
              className="text-[#0490CF] relative z-10"
              style={{
                width: "40px",
                height: "40px",
                strokeWidth: 3,
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-16 pt-8 pb-6">
          {/* Title */}
          <h1
            className="text-center font-medium text-black mb-6"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "clamp(20px, 3vw, 25.24px)",
              lineHeight: "32px",
              fontWeight: "500",
            }}
          >
            {title}
          </h1>

          {/* Message */}
          <p
            className="text-center text-[#707070] mb-8 md:mb-12"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "clamp(16px, 2.5vw, 25.24px)",
              lineHeight: "32px",
              fontWeight: "400",
            }}
          >
            {message}
          </p>
        </div>

        {/* Done Button */}
        <div className="px-6 md:px-16 pb-6 md:pb-8">
          <button
            onClick={onClose}
            className="w-full bg-[#0490CF] text-white font-semibold rounded-lg hover:bg-[#0490CF]/90 transition-colors flex items-center justify-center"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "clamp(16px, 2.5vw, 21.51px)",
              lineHeight: "150%",
              fontWeight: "600",
              borderRadius: "10.76px",
              height: "72px",
              maxWidth: "724px",
              margin: "0 auto",
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
