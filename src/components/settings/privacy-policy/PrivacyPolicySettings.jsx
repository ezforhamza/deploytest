import React from 'react';
import { colors, typography } from '../../../styles/tokens';

const PrivacyPolicySettings = () => {
  return (
    <div className="p-8" style={{ color: colors.text }}>
      <div className="flex items-center justify-center">
        {/* Privacy Policy Container - Based on Figma Design */}
        <div 
          className="bg-white border-2 border-gray-200 rounded-2xl relative"
          style={{ 
            width: '807px', 
            height: '737px',
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
                width: '153px',
                height: '33px'
              }}
            >
              Privacy Policy
            </h1>
          </div>

          {/* Main Description */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 text-center text-black font-normal"
            style={{ 
              width: '570px', 
              height: '55px',
              top: '90px',
              fontSize: '18.6434px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary
            }}
          >
            We may collect data like your name, email, location, age, and preferences to enhance your app experience.
          </div>

          {/* How We Use It Section */}
          <div 
            className="absolute text-black font-medium"
            style={{ 
              width: '189.49px', 
              height: '32.09px',
              left: 'calc(50% - 189.49px/2 - 190.75px)',
              top: '169.46px',
              fontSize: '20.3244px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary
            }}
          >
            🔸 How We Use It
          </div>

          {/* Your data helps us */}
          <div 
            className="absolute text-gray-500 font-normal"
            style={{ 
              width: '369.81px', 
              height: '27.51px',
              left: 'calc(50% - 369.81px/2 - 100.59px)',
              top: '207.67px',
              fontSize: '18.6434px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary,
              color: '#8B8B8B'
            }}
          >
            Your data helps us:
          </div>

          {/* Usage list */}
          <div 
            className="absolute text-gray-500 font-normal"
            style={{ 
              width: '472.2px', 
              height: '108.5px',
              left: 'calc(50% - 472.2px/2 - 49.4px)',
              top: '241.29px',
              fontSize: '18.6434px',
              lineHeight: '199%',
              fontFamily: typography.fontFamily.primary,
              color: '#8B8B8B'
            }}
          >
            Suggest better job matches<br/>
            Connect you with relevant alumni<br/>
            Improve app features and performance
          </div>

          {/* Your Control Section */}
          <div 
            className="absolute text-black font-medium"
            style={{ 
              width: '189.49px', 
              height: '32.09px',
              left: 'calc(50% - 189.49px/2 - 190.75px)',
              top: '368.12px',
              fontSize: '20.3244px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary
            }}
          >
            🔸 Your Control
          </div>

          {/* Control description */}
          <div 
            className="absolute text-gray-500 font-normal"
            style={{ 
              width: '550.13px', 
              height: '55.01px',
              left: 'calc(50% - 550.13px/2 - 10.43px)',
              top: '406.33px',
              fontSize: '18.6434px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary,
              color: '#8B8B8B'
            }}
          >
            You can update or delete your information anytime from your profile settings.
          </div>

          {/* Third-Party Sharing Section */}
          <div 
            className="absolute text-black font-medium"
            style={{ 
              width: '250.62px', 
              height: '32.09px',
              left: 'calc(50% - 250.62px/2 - 160.19px)',
              top: '479.68px',
              fontSize: '20.3244px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary
            }}
          >
            🔸 Third-Party Sharing
          </div>

          {/* Third-party description */}
          <div 
            className="absolute text-gray-500 font-normal"
            style={{ 
              width: '550.13px', 
              height: '82.52px',
              left: 'calc(50% - 550.13px/2 - 10.43px)',
              top: '517.88px',
              fontSize: '18.6434px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary,
              color: '#8B8B8B'
            }}
          >
            We never sell your data. We only share it with trusted partners to provide essential services — and only with your consent.
          </div>

          {/* Security Section */}
          <div 
            className="absolute text-black font-medium"
            style={{ 
              width: '250.62px', 
              height: '32.09px',
              left: 'calc(50% - 250.62px/2 - 160.19px)',
              top: '618.74px',
              fontSize: '20.3244px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary
            }}
          >
            🔸 Security
          </div>

          {/* Security description */}
          <div 
            className="absolute text-gray-500 font-normal"
            style={{ 
              width: '550.13px', 
              height: '56.54px',
              left: 'calc(50% - 550.13px/2 - 10.43px)',
              top: '656.94px',
              fontSize: '18.6434px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary,
              color: '#8B8B8B'
            }}
          >
            We use encryption and modern security tools to keep your data safe.
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicySettings;