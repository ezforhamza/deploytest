import React, { useState } from 'react';
import { colors, typography } from '../../styles/tokens';

// Import all settings components
import AccountPrivacySettings from './account-privacy/AccountPrivacySettings';
import ProfileSetupSettings from './profile-setup/ProfileSetupSettings';
import CertificateSettings from './certificates/CertificateSettings';
import PasswordSettings from './password/PasswordSettings';
import InviteConnectionsSettings from './invite-connections/InviteConnectionsSettings';
import ReferralSettings from './referral/ReferralSettings';
import PaymentSettings from './payments/PaymentSettings';
import PrivacyPolicySettings from './privacy-policy/PrivacyPolicySettings';
import HelpSupportSettings from './help-support/HelpSupportSettings';

const ProfileSettings = ({ userRole = "alumni" }) => {
  const [activeTab, setActiveTab] = useState('Account Privacy');

  const getTabsForRole = (role) => {
    switch (role) {
      case 'alumni':
        return [
          'Account Privacy',
          'Profile setup',
          'Certificate',
          'Change Password',
          'Referral code',
          'Payment & Subscription',
          'Privacy Policy',
          'Help & Support'
        ];
      case 'company':
        return [
          'Account Privacy',
          'Profile setup',
          'Change Password',
          'Referral code',
          'Payment & Subscription',
          'Privacy Policy',
          'Help & Support'
        ];
      case 'school':
        return [
          'Account Privacy',
          'Profile Setup',
          'Invite Connections',
          'Change Password',
          'Privacy Policy',
          'Help & Support'
        ];
      default:
        return [
          'Account Privacy',
          'Profile setup',
          'Change Password',
          'Referral code',
          'Payment & Subscription',
          'Privacy Policy',
          'Help & Support'
        ];
    }
  };

  const tabs = getTabsForRole(userRole);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account Privacy':
        return <AccountPrivacySettings userRole={userRole} />;
      case 'Profile setup':
      case 'Profile Setup':
        return <ProfileSetupSettings userRole={userRole} />;
      case 'Certificate':
        return <CertificateSettings />;
      case 'Change Password':
        return <PasswordSettings />;
      case 'Invite Connections':
        return <InviteConnectionsSettings />;
      case 'Referral code':
        return <ReferralSettings />;
      case 'Payment & Subscription':
        return <PaymentSettings />;
      case 'Privacy Policy':
        return <PrivacyPolicySettings />;
      case 'Help & Support':
        return <HelpSupportSettings />;
      default:
        return (
          <div className="p-6 sm:p-8" style={{ color: colors.text }}>
            <h3 className="text-xl font-semibold mb-6" style={{ color: colors.dark, fontFamily: typography.fontFamily.primary }}>Select a Tab</h3>
            <p style={{ color: colors.text }}>Choose a settings category from the tabs above.</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-120px)]">
      {/* Modern Settings Container */}
      <div 
        className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-full overflow-hidden"
        style={{ 
          boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)",
          minHeight: "calc(100vh - 140px)"
        }}
      >
        {/* Header Section */}
        <div className="border-b border-gray-100 bg-gray-50/50">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <h1 
              className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900"
              style={{ fontFamily: typography.fontFamily.primary }}
            >
              Settings
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Manage your account preferences and privacy settings
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="px-4 sm:px-6 lg:px-8 pb-4">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;
                  
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`
                        relative px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-medium font-lexend whitespace-nowrap
                        rounded-full transition-all duration-200 ease-in-out border
                        ${isActive 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200/50' 
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-800 hover:border-gray-300'
                        }
                      `}
                      style={{
                        backgroundColor: isActive ? colors.primary : 'white',
                        color: isActive ? 'white' : colors.text,
                        borderColor: isActive ? colors.primary : '#E5E7EB'
                      }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0">
          <div 
            className="h-full overflow-y-auto custom-scrollbar"
            style={{
              maxHeight: "calc(100vh - 280px)",
              minHeight: "400px"
            }}
          >
            <div className="p-4 sm:p-6 lg:p-8">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;