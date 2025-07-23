// src/features/upgrade/SubscriptionCard.jsx

import React from "react";
import { colors } from "../../styles/tokens";
import BgSvg from "./bg-svg"; // Import the default export

const SubscriptionCard = ({ className = "", ...props }) => {
  const features = [
    "Filter swipes by school, age, gender, location, etc.",
    "Browse profiles in your area with advanced filters.",
    "Change your visible location to any city or country.",
    "Message any alumni, regardless of connection status.",
    "Apply to an unlimited number of active job offers.",
    "Subscribe monthly.",
    "Save with our yearly discount!",
  ];

  const DiamondIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L10.5 5.5L8 14L5.5 5.5L8 2Z" fill="currentColor" />
    </svg>
  );

  return (
    <div
      className={`relative w-[704px] h-[468.92px] bg-blue-500 rounded-[31.88px] text-white font-['Lexend'] overflow-hidden max-w-full ${className}`}
      style={{ backgroundColor: colors.primary }}
      {...props}
    >
      {/* Background SVG */}
      <div className="absolute inset-0 opacity-10 z-10">
        <BgSvg />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full h-full">
        {/* Monthly Price */}
        <div
          className="absolute flex items-center text-center text-white"
          style={{
            width: "127.52px",
            height: "49px",
            left: "calc(50% - 127.52px/2 - 260.36px)",
            top: "21.25px",
          }}
        >
          <span
            className="font-['Lexend'] font-normal text-center"
            style={{
              fontSize: "26.57px",
              lineHeight: "48.18px",
              letterSpacing: "0%",
            }}
          >
            $16.5
          </span>
          <span
            className="font-['Lexend'] font-light text-center"
            style={{
              fontSize: "15.94px",
              lineHeight: "48.18px",
              letterSpacing: "0%",
            }}
          >
            /month
          </span>
        </div>

        {/* Yearly Price */}
        <div
          className="absolute flex items-center text-center text-white"
          style={{
            width: "77.05px",
            height: "49px",
            left: "calc(50% - 77.05px/2 + 286.93px)",
            top: "21.25px",
          }}
        >
          <span
            className="font-['Lexend'] font-normal text-center"
            style={{
              fontSize: "21.25px",
              lineHeight: "48.18px",
              letterSpacing: "0%",
            }}
          >
            $199
          </span>
          <span
            className="font-['Lexend'] font-light text-center"
            style={{
              fontSize: "10.63px",
              lineHeight: "48.18px",
              letterSpacing: "0%",
            }}
          >
            /year
          </span>
        </div>

        {/* Title */}
        <div
          className="absolute flex items-center text-center text-white font-['Lexend'] font-normal"
          style={{
            width: "187.3px",
            height: "27px",
            left: "calc(50% - 187.3px/2 - 230.47px)",
            top: "83.69px",
            fontSize: "21.254px",
            lineHeight: "27px",
          }}
        >
          Shied Annual Plan
        </div>

        {/* Description */}
        <div
          className="absolute flex items-center text-white font-['Lexend'] font-light"
          style={{
            width: "482.2px",
            height: "27px",
            left: "calc(50% - 482.2px/2 - 83.02px)",
            top: "116.9px",
            fontSize: "15.9405px",
            lineHeight: "27px",
          }}
        >
          Enjoy complete access to Alumni planner feature for a full year.
        </div>

        {/* Section Title */}
        <div
          className="absolute flex items-center text-center text-white font-['Lexend'] font-normal"
          style={{
            width: "143.46px",
            height: "27px",
            left: "calc(50% - 143.46px/2 - 252.39px)",
            top: "156.75px",
            fontSize: "21.254px",
            lineHeight: "27px",
          }}
        >
          This plan gets
        </div>

        {/* White Features Container */}
        <div
          className="absolute bg-white rounded-[13.28px] p-5 box-border"
          style={{
            width: "642.934326171875px",
            height: "253.71995544433594px",
            left: "27.9px",
            top: "193.94px",
          }}
        >
          <div className="w-full h-full overflow-y-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start mb-3 text-sm leading-relaxed text-black"
              >
                <div className="mr-3 mt-0.5 flex-shrink-0 text-black">
                  <DiamondIcon />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
