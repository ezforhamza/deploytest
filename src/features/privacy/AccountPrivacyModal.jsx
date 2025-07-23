// src/features/privacy/AccountPrivacyModal.jsx

import React, { useState } from "react";
import { User, MapPin, CreditCard } from "lucide-react";
import BusinessCardPreview from "./BusinessCardPreview";

const AccountPrivacyModal = ({ isOpen, onClose, onNext }) => {
  const [privacySettings, setPrivacySettings] = useState({
    privateAccount: true,
    showLocation: false,
    businessCard: false,
  });
  const [showBusinessCardPreview, setShowBusinessCardPreview] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (setting) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleNext = () => {
    if (onNext) {
      onNext(privacySettings);
    }
  };

  const handlePreviewClick = () => {
    setShowBusinessCardPreview(true);
  };

  // Show Business Card Preview if active
  if (showBusinessCardPreview) {
    return (
      <BusinessCardPreview
        isOpen={showBusinessCardPreview}
        onClose={() => setShowBusinessCardPreview(false)}
        onShare={() => {
          console.log("Business card shared successfully");
        }}
        onEnableBusinessCard={() => {
          handleToggle("businessCard");
          console.log("Business card enabled");
        }}
      />
    );
  }

  // Toggle Switch Component
  const ToggleSwitch = ({ isOn, onToggle }) => (
    <div
      className={`relative inline-flex h-6 w-11 md:h-[29.33px] md:w-[46.55px] items-center rounded-full transition-colors cursor-pointer ${
        isOn ? "bg-blue-500" : "bg-gray-300"
      }`}
      onClick={onToggle}
    >
      <span
        className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white transition-transform ${
          isOn ? "translate-x-6 md:translate-x-[22px]" : "translate-x-1"
        }`}
      />
    </div>
  );

  // Privacy Setting Row Component for Mobile
  const MobileSettingRow = ({ title, subtitle, description, setting }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <span className="font-['Lexend'] font-normal text-lg text-black block">
              {title}
            </span>
            {subtitle && (
              <span className="font-['Lexend'] font-normal text-xs text-[#1090CF]">
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <ToggleSwitch
          isOn={privacySettings[setting]}
          onToggle={() => handleToggle(setting)}
        />
      </div>
      <p className="text-[#58606C] font-['Lexend'] font-normal text-sm leading-6 pl-9">
        {description}
      </p>
    </div>
  );

  const settings = [
    {
      icon: User,
      title: "Private Account",
      description: "🔒 Only approved followers can see your posts and profile.",
      setting: "privateAccount",
    },
    {
      icon: MapPin,
      title: "Show Location",
      subtitle: "(highly recommended)",
      description:
        "📍 Allow others to see your general location on your profile or posts.",
      setting: "showLocation",
    },
    {
      icon: CreditCard,
      title: "Business card",
      description: "💼 Display your digital business card to others",
      setting: "businessCard",
    },
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[1080px] h-full max-h-[679.85px] bg-white rounded-lg md:rounded-[18.7361px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center pt-8 md:pt-0">
          <h1 className="text-black font-['Lexend'] font-medium text-xl md:text-2xl lg:text-[29.4424px] md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-8">
            Account Privacy
          </h1>
          <p className="text-[#58606C] font-['Lexend'] font-normal text-sm md:text-lg lg:text-[23.1754px] mt-4 px-4 md:px-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-32 md:w-[549px]">
            Manage what information you share with others.
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden px-6 pt-8 pb-20 space-y-8">
          {settings.map((setting, index) => (
            <MobileSettingRow key={index} {...setting} />
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            <button
              className="w-full h-12 bg-[#0490CF] rounded-lg text-white font-['Lexend'] font-medium text-lg"
              onClick={handlePreviewClick}
            >
              Preview
            </button>
            <button
              className="w-full h-12 bg-[#0490CF] rounded-lg text-white font-['Lexend'] font-medium text-lg"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Private Account */}
          <div className="absolute left-[61.56px] top-[194.29px] flex items-center gap-[13.94px] w-[547.15px]">
            <User
              className="w-[30.99px] h-[30.99px] text-black"
              strokeWidth={2}
            />
            <span className="font-['Lexend'] font-normal text-[23.1754px] text-black flex-1">
              Private Account
            </span>
          </div>
          <div className="absolute left-[971px] top-[215.64px]">
            <ToggleSwitch
              isOn={privacySettings.privateAccount}
              onToggle={() => handleToggle("privateAccount")}
            />
          </div>
          <p className="absolute left-[106.49px] top-[222.17px] w-[500.1px] text-[#58606C] font-['Lexend'] font-normal text-[17.7736px] leading-[44px]">
            🔒 Only approved followers can see your posts and profile.
          </p>

          {/* Show Location */}
          <div className="absolute left-[61.56px] top-[307.81px] flex items-center gap-[13.94px] w-[547.15px]">
            <MapPin
              className="w-[30.99px] h-[30.99px] text-black"
              strokeWidth={2}
            />
            <span className="font-['Lexend'] font-normal text-[23.1754px] text-black flex-1">
              Show Location
              <span className="font-['Lexend'] font-normal text-[15px] text-[#1090CF] ml-2">
                (highly recommended)
              </span>
            </span>
          </div>
          <div className="absolute left-[971px] top-[337.03px]">
            <ToggleSwitch
              isOn={privacySettings.showLocation}
              onToggle={() => handleToggle("showLocation")}
            />
          </div>
          <p className="absolute left-[106.49px] top-[342.66px] w-[512.3px] text-[#58606C] font-['Lexend'] font-normal text-[17.7736px] leading-[26px]">
            📍 Allow others to see your general location on your profile or
            posts.
          </p>

          {/* Business Card */}
          <div className="absolute left-[61.56px] top-[436.49px] flex items-center gap-[13.94px] w-[547.15px]">
            <CreditCard
              className="w-[30.99px] h-[30.99px] text-black"
              strokeWidth={2}
            />
            <span className="font-['Lexend'] font-normal text-[23.1754px] text-black flex-1">
              Business card
            </span>
          </div>
          <div className="absolute left-[971px] top-[448.32px]">
            <ToggleSwitch
              isOn={privacySettings.businessCard}
              onToggle={() => handleToggle("businessCard")}
            />
          </div>
          <p className="absolute left-[106.49px] top-[471.35px] w-[534.95px] text-[#58606C] font-['Lexend'] font-normal text-[17.7736px] leading-[26px]">
            💼 Display your digital business card to others
          </p>

          {/* Preview Button */}
          <button
            className="absolute left-[61.56px] top-[513.17px] w-[130.69px] h-[43.56px] bg-[#0490CF] rounded-[6.97003px] text-white font-['Lexend'] font-medium text-[22.3041px]"
            onClick={handlePreviewClick}
          >
            Preview
          </button>

          {/* Next Button */}
          <button
            className="absolute w-[144.54px] h-[56.21px] bg-[#0490CF] rounded-[14.3964px] text-white font-['Lexend'] font-medium text-[24.0892px]"
            style={{
              left: "calc(50% - 144.54px/2 + 406.17px)",
              top: "583.49px",
            }}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPrivacyModal;
