import React, { useState } from 'react';

const ProfileModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Account Privacy');

  const tabs = [
    'Account Privacy',
    'Profile setup', 
    'Change Password',
    'Referral code',
    'Payment & Subscription',
    'Privacy Policy',
    'Help & Support'
  ];

  if (!isOpen) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Account Privacy':
        return <div className="tab-content">Account Privacy content goes here</div>;
      case 'Profile setup':
        return <div className="tab-content">Profile setup content goes here</div>;
      case 'Change Password':
        return <div className="tab-content">Change Password content goes here</div>;
      case 'Referral code':
        return <div className="tab-content">Referral code content goes here</div>;
      case 'Payment & Subscription':
        return <div className="tab-content">Payment & Subscription content goes here</div>;
      case 'Privacy Policy':
        return <div className="tab-content">Privacy Policy content goes here</div>;
      case 'Help & Support':
        return <div className="tab-content">Help & Support content goes here</div>;
      default:
        return <div className="tab-content">Select a tab</div>;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg shadow-lg"
        style={{ width: '866px', height: '760px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        <div 
          className="relative"
          style={{ 
            width: '846px', 
            height: '38px', 
            left: '30px', 
            top: '30px' 
          }}
        >
          {tabs.map((tab, index) => {
            const isActive = activeTab === tab;
            const tabPositions = {
              'Account Privacy': { left: '30px', width: '133px' },
              'Profile setup': { left: '187px', width: '73px' },
              'Change Password': { left: '284px', width: '104px' },
              'Referral code': { left: '412px', width: '79px' },
              'Payment & Subscription': { left: '515px', width: '141px' },
              'Privacy Policy': { left: '680px', width: '82px' },
              'Help & Support': { left: '786px', width: '90px' }
            };

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`absolute flex items-center justify-center text-xs font-normal font-lexend leading-[18px] transition-all duration-200 hover:bg-opacity-80 ${
                  isActive ? 'bg-sky-600 text-white rounded-full' : 'bg-transparent text-black'
                }`}
                style={{
                  position: 'absolute',
                  width: isActive ? '133px' : tabPositions[tab].width,
                  height: '38px',
                  left: isActive ? '30px' : tabPositions[tab].left,
                  top: '0px',
                  padding: isActive ? '10px 19px' : '10px 5px',
                  borderRadius: isActive ? '34px' : '0px',
                  backgroundColor: isActive ? '#0490CF' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  lineHeight: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div 
          className="absolute bg-gray-50 rounded-lg p-6 overflow-auto"
          style={{
            left: '30px',
            top: '100px',
            width: '806px',
            height: '620px'
          }}
        >
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;