import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { colors, typography } from '../../../styles/tokens';

const HelpSupportSettings = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const helpItems = [
    {
      title: "How do I update my profile?",
      content: "Go to Profile Settings → Profile Setup to update your personal and professional information. You can change your name, contact details, work experience, education, and profile picture."
    },
    {
      title: "How do I change my privacy settings?",
      content: "Navigate to Profile Settings → Account Privacy to manage who can see your profile and contact information. You can control your account visibility, location sharing, and business card display."
    },
    {
      title: "How do I reset my password?",
      content: "Go to Profile Settings → Change Password or use the 'Forgot Password' link on the login page. You'll receive an OTP to verify your identity and set a new password."
    },
    {
      title: "How do I connect with alumni?",
      content: "Use the search feature to find alumni by school, location, or profession. You can send connection requests, view their profiles, and message them directly through the platform."
    },
    {
      title: "How do I upload my certificates?",
      content: "Navigate to Profile Settings → Certificate to upload your academic and professional certificates. Only PDF files up to 5MB are supported."
    },
    {
      title: "How do I contact support?",
      content: "You can reach our support team by emailing support@ilumni.com or using the contact form in the Help & Support section. We typically respond within 24 hours."
    }
  ];

  const DropdownItem = ({ item, index, isOpen }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => toggleDropdown(index)}
        className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span 
          className="font-medium text-black"
          style={{ 
            fontSize: '16px',
            fontFamily: typography.fontFamily.primary
          }}
        >
          {item.title}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        )}
      </button>
      {isOpen && (
        <div 
          className="px-4 pb-4 text-gray-600"
          style={{ 
            fontSize: '14px',
            lineHeight: '1.5',
            fontFamily: typography.fontFamily.primary
          }}
        >
          {item.content}
        </div>
      )}
    </div>
  );

  return (
    <div className="p-8" style={{ color: colors.text }}>
      <div className="flex items-center justify-center">
        {/* Help & Support Container - Based on Figma Design */}
        <div 
          className="bg-white border-2 border-gray-200 rounded-2xl relative"
          style={{ 
            width: '807px', 
            height: '568px',
            maxWidth: '100%',
            fontFamily: typography.fontFamily.primary 
          }}
        >
          {/* Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-6">
            <h1 
              className="text-center font-medium text-black"
              style={{ 
                fontSize: '22px', 
                lineHeight: '150%',
                fontFamily: typography.fontFamily.primary,
                width: '167px',
                height: '33px'
              }}
            >
              Help & Support
            </h1>
          </div>

          {/* Dropdown Items Container */}
          <div 
            className="absolute left-8 right-8 overflow-y-auto"
            style={{ 
              top: '80px',
              height: 'calc(100% - 120px)'
            }}
          >
            <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden">
              {helpItems.map((item, index) => (
                <DropdownItem
                  key={index}
                  item={item}
                  index={index}
                  isOpen={openDropdown === index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSupportSettings;