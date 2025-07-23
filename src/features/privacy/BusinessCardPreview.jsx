// src/features/privacy/BusinessCardPreview.jsx

import React from "react";
import {
  MapPin,
  Mail,
  Briefcase,
  Phone,
  GraduationCap,
  School,
  ArrowLeft,
} from "lucide-react";
import "../../components/auth/shared/scrollbar.css";

const BusinessCardPreview = ({
  isOpen,
  onClose,
  onShare,
  onEnableBusinessCard,
}) => {
  if (!isOpen) return null;

  const userInfo = {
    name: "Andrew Ainslay",
    location: "London, UK",
    currentJob: "UI/UX Designer",
    email: "andrew-ainsley@yourdomain.com",
    phone: "+92 304 345464574",
    schools: [
      { name: "University of punjab", degree: "BSCS" },
      { name: "University of punjab", degree: "Computer Science" },
    ],
    fieldOfWork: "UI/UX Designer",
  };

  const InfoSection = ({ label, value, className = "" }) => (
    <div
      className={`flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ${className}`}
    >
      <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm"></div>
      <div className="flex-1 min-w-0">
        <h4 className="font-['Lexend'] font-medium text-sm text-gray-700 mb-1">
          {label}
        </h4>
        <p className="font-['Lexend'] font-normal text-base text-gray-900 break-words">
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-[#0490CF] px-6 py-4 md:py-6">
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            onClick={onClose}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <div className="text-center">
            <h1 className="text-white font-['Lexend'] font-semibold text-xl md:text-2xl">
              Business Card
            </h1>
            <p className="text-blue-100 font-['Lexend'] text-sm mt-1">
              Digital Profile Preview
            </p>
          </div>

          <div className="hidden md:flex absolute right-6 top-1/2 transform -translate-y-1/2 items-center gap-3">
            <img
              src="/common/logo.png"
              alt="Alumni Logo"
              className="w-10 h-10 rounded-lg"
            />
            <span className="text-white font-['Lexend'] font-semibold text-lg">
              AIumni
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-6 md:p-8">
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-5 md:gap-8">
              {/* Business Card - Left Side */}
              <div className="col-span-2">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 sticky top-0">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src="/common/profile-image.png"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h2 className="font-['Lexend'] font-bold text-2xl text-gray-900 mb-2">
                      {userInfo.name}
                    </h2>
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="font-['Lexend'] text-sm">
                        {userInfo.location}
                      </span>
                    </div>
                    <div className="mt-4 px-4 py-2 bg-[#0490CF] bg-opacity-10 rounded-lg">
                      <p className="font-['Lexend'] font-medium text-[#0490CF] text-sm">
                        {userInfo.currentJob}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Information - Right Side */}
              <div className="col-span-3 space-y-4">
                <div className="grid gap-4">
                  {/* Contact Information */}
                  <div className="space-y-3">
                    <h3 className="font-['Lexend'] font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                      Contact Information
                    </h3>
                    <div className="grid gap-3">
                      <InfoSection
                        icon={Mail}
                        label="Email Address"
                        value={userInfo.email}
                      />
                      <InfoSection
                        icon={Phone}
                        label="Phone Number"
                        value={userInfo.phone}
                      />
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-3">
                    <h3 className="font-['Lexend'] font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                      Education
                    </h3>
                    <div className="grid gap-3">
                      {userInfo.schools.map((school, index) => (
                        <div key={index} className="grid grid-cols-2 gap-3">
                          <InfoSection
                            icon={School}
                            label="Institution"
                            value={school.name}
                          />
                          <InfoSection
                            icon={GraduationCap}
                            label="Degree"
                            value={school.degree}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Work Information */}
                  <div className="space-y-3">
                    <h3 className="font-['Lexend'] font-semibold text-lg text-gray-900 border-b border-gray-200 pb-2">
                      Professional
                    </h3>
                    <InfoSection
                      icon={Briefcase}
                      label="Field of Work"
                      value={userInfo.fieldOfWork}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-6">
              {/* Business Card */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/common/profile-image.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h2 className="font-['Lexend'] font-bold text-xl text-gray-900 mb-2">
                    {userInfo.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span className="font-['Lexend'] text-sm">
                      {userInfo.location}
                    </span>
                  </div>
                  <div className="px-4 py-2 bg-[#0490CF] bg-opacity-10 rounded-lg">
                    <p className="font-['Lexend'] font-medium text-[#0490CF] text-sm">
                      {userInfo.currentJob}
                    </p>
                  </div>
                </div>
              </div>

              {/* Information Sections */}
              <div className="space-y-6">
                {/* Contact */}
                <div className="space-y-3">
                  <h3 className="font-['Lexend'] font-semibold text-lg text-gray-900">
                    Contact
                  </h3>
                  <div className="space-y-3">
                    <InfoSection
                      icon={Mail}
                      label="Email"
                      value={userInfo.email}
                    />
                    <InfoSection
                      icon={Phone}
                      label="Phone"
                      value={userInfo.phone}
                    />
                  </div>
                </div>

                {/* Education */}
                <div className="space-y-3">
                  <h3 className="font-['Lexend'] font-semibold text-lg text-gray-900">
                    Education
                  </h3>
                  <div className="space-y-4">
                    {userInfo.schools.map((school, index) => (
                      <div key={index} className="space-y-2">
                        <InfoSection
                          icon={School}
                          label="School"
                          value={school.name}
                        />
                        <InfoSection
                          icon={GraduationCap}
                          label="Degree"
                          value={school.degree}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Professional */}
                <div className="space-y-3">
                  <h3 className="font-['Lexend'] font-semibold text-lg text-gray-900">
                    Professional
                  </h3>
                  <InfoSection
                    icon={Briefcase}
                    label="Field of Work"
                    value={userInfo.fieldOfWork}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Share Button */}
        <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
          <button
            className="w-full bg-[#0490CF] hover:bg-[#0480BF] text-white font-['Lexend'] font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
            onClick={() => {
              if (onEnableBusinessCard) {
                onEnableBusinessCard();
              }
              if (onShare) {
                onShare();
              }
              onClose();
            }}
          >
            <span>Share Business Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardPreview;
