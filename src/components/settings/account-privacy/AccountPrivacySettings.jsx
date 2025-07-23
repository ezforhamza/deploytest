import React, { useState } from 'react';
import { User, MapPin, CreditCard } from 'lucide-react';
import { colors, typography } from '../../../styles/tokens';
import BusinessCardPreview from '../../../features/privacy/BusinessCardPreview';

const AccountPrivacySettings = ({ userRole = "alumni" }) => {
  const [privacySettings, setPrivacySettings] = useState({
    privateAccount: true,
    showLocation: false,
    businessCard: false,
  });
  const [showBusinessCardPreview, setShowBusinessCardPreview] = useState(false);

  const handleToggle = (setting) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePreviewClick = () => {
    setShowBusinessCardPreview(true);
  };

  // Toggle Switch Component
  const ToggleSwitch = ({ isOn, onToggle }) => (
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
        isOn ? "bg-blue-500" : "bg-gray-300"
      }`}
      onClick={onToggle}
      style={{ backgroundColor: isOn ? colors.primary : '#D1D5DB' }}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </div>
  );

  // Privacy Setting Row Component
  const SettingRow = ({ icon: Icon, title, subtitle, description, setting }) => (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Icon className="w-6 h-6 text-gray-600" strokeWidth={2} />
          <div>
            <span className="font-medium text-lg" style={{ color: colors.dark, fontFamily: typography.fontFamily.primary }}>
              {title}
            </span>
            {subtitle && (
              <span className="ml-2 text-sm" style={{ color: colors.primary }}>
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
      <p className="text-sm leading-6 ml-10" style={{ color: colors.text }}>
        {description}
      </p>
    </div>
  );

  // Get settings based on user role
  const getSettingsForRole = (role) => {
    const baseSettings = [
      {
        icon: MapPin,
        title: "Show Location",
        subtitle: "(highly recommended)",
        description: "📍 Allow others to see your general location on your profile or posts.",
        setting: "showLocation",
      }
    ];

    if (role === 'alumni') {
      return [
        {
          icon: User,
          title: "Private Account",
          description: "🔒 Only approved followers can see your posts and profile.",
          setting: "privateAccount",
        },
        ...baseSettings,
        {
          icon: CreditCard,
          title: "Business card",
          description: "💼 Display your digital business card to others",
          setting: "businessCard",
        }
      ];
    }

    // Company and School only get location setting
    return baseSettings;
  };

  const settings = getSettingsForRole(userRole);

  // Show Business Card Preview if active
  if (showBusinessCardPreview) {
    return (
      <div className="p-8">
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
      </div>
    );
  }

  return (
    <div className="p-8" style={{ color: colors.text }}>
      <div className="space-y-6">
        {settings.map((setting, index) => (
          <SettingRow key={index} {...setting} />
        ))}

        {/* Preview Button - only show for alumni with business card */}
        {userRole === 'alumni' && (
          <div className="pt-4">
            <button
              className="px-6 py-3 rounded-lg text-white font-medium"
              style={{ backgroundColor: colors.primary, fontFamily: typography.fontFamily.primary }}
              onClick={handlePreviewClick}
            >
              Preview Business Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountPrivacySettings;