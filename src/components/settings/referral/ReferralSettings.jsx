import React, { useState } from 'react';
import { colors, typography } from '../../../styles/tokens';

const ReferralSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');
  
  // Mock referral code - in real app, this would come from user data
  const referralCode = 'ILUMNI2024';
  const referralLink = `https://ilumni.com/signup?ref=${referralCode}`;

  const handleShareLink = async () => {
    setIsLoading(true);
    setSuccess('');
    
    try {
      // Try to use native sharing API if available
      if (navigator.share) {
        await navigator.share({
          title: 'Join Ilumni - Get Premium Free!',
          text: 'Join me on Ilumni and get 1 year of Premium access for free!',
          url: referralLink
        });
        setSuccess('Share link opened!');
      } else {
        // Fallback to clipboard
        await navigator.clipboard.writeText(referralLink);
        setSuccess('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share failed:', err);
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(referralLink);
        setSuccess('Link copied to clipboard!');
      } catch (clipboardErr) {
        console.error('Clipboard failed:', clipboardErr);
      }
    } finally {
      setIsLoading(false);
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  return (
    <div className="p-8" style={{ color: colors.text }}>
      <div className="flex items-center justify-center">
        {/* Referral Code Container */}
        <div 
          className="bg-white border-2 border-gray-200 rounded-2xl relative"
          style={{ 
            width: '807px', 
            height: '533px',
            maxWidth: '100%',
            fontFamily: typography.fontFamily.primary 
          }}
        >
          {/* Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-6">
            <h2 
              className="text-center font-medium text-black"
              style={{ 
                fontSize: '22px', 
                lineHeight: '150%',
                fontFamily: typography.fontFamily.primary 
              }}
            >
              Referral Code
            </h2>
          </div>

          {/* Gift Icon */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-16">
            <img 
              src="/icons/gift.svg" 
              alt="Gift icon" 
              className="w-24 h-24"
              style={{ filter: 'hue-rotate(200deg) saturate(1.5)' }}
            />
          </div>

          {/* Main Content Box */}
          <div 
            className="absolute bg-gray-100 rounded-xl overflow-hidden"
            style={{ 
              width: '557px', 
              height: '288px', 
              left: '125px', 
              top: '141px' 
            }}
          >
            {/* Header */}
            <div 
              className="absolute text-center text-black font-medium"
              style={{ 
                left: '178px', 
                top: '50px',
                fontSize: '12px',
                fontFamily: typography.fontFamily.primary,
                lineHeight: '1.2'
              }}
            >
              🎉 Invite Friends & Get 1 Year of <br/>Premium – FREE!
            </div>

            {/* Divider */}
            <div 
              className="absolute border-t border-gray-300"
              style={{ 
                width: '288px', 
                left: '139px', 
                top: '96px' 
              }}
            />

            {/* Description */}
            <div 
              className="absolute text-center text-gray-600 font-medium"
              style={{ 
                width: '384px',
                left: '58px', 
                top: '106px',
                fontSize: '12px',
                fontFamily: typography.fontFamily.primary,
                lineHeight: '1.1'
              }}
            >
              Want to unlock 1 full year of Premium access without spending a dime?
            </div>

            <div 
              className="absolute text-center text-gray-600 font-medium"
              style={{ 
                width: '384px',
                left: '68px', 
                top: '127px',
                fontSize: '12px',
                fontFamily: typography.fontFamily.primary,
                lineHeight: '1.1'
              }}
            >
              It's simple: Invite your friends using your personal referral link. Once 5 friends sign up, you get Premium for FREE!
            </div>

            {/* Benefits Title */}
            <div 
              className="absolute text-center text-black font-medium"
              style={{ 
                left: '183px', 
                top: '166px',
                fontSize: '12px',
                fontFamily: typography.fontFamily.primary,
                lineHeight: '1.2'
              }}
            >
              Your Premium Benefits Include:
            </div>

            {/* Benefits List */}
            <div 
              className="absolute text-gray-600 font-medium"
              style={{ 
                width: '320px',
                left: '161px', 
                top: '192px',
                fontSize: '12px',
                fontFamily: typography.fontFamily.primary,
                lineHeight: '1.1'
              }}
            >
              ✨ Unlimited access to all premium features
            </div>

            <div 
              className="absolute text-gray-600 font-medium"
              style={{ 
                width: '208px',
                left: '161px', 
                top: '213px',
                fontSize: '12px',
                fontFamily: typography.fontFamily.primary,
                lineHeight: '1.1'
              }}
            >
              ⚡ Priority customer support
            </div>

            <div 
              className="absolute text-gray-600 font-medium"
              style={{ 
                width: '320px',
                left: '161px', 
                top: '233px',
                fontSize: '12px',
                fontFamily: typography.fontFamily.primary,
                lineHeight: '1.1'
              }}
            >
              🚀 Early access to upcoming tools & updates
            </div>

            <div 
              className="absolute text-gray-600 font-medium"
              style={{ 
                width: '320px',
                left: '161px', 
                top: '254px',
                fontSize: '12px',
                fontFamily: typography.fontFamily.primary,
                lineHeight: '1.1'
              }}
            >
              Start sharing – your free Premium awaits!
            </div>
          </div>

          {/* Share Link Button */}
          <button
            onClick={handleShareLink}
            disabled={isLoading}
            className="absolute bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{
              width: '144px',
              height: '40px',
              left: '636px',
              top: '463px',
              backgroundColor: '#0490CF',
              fontSize: '18px',
              fontFamily: typography.fontFamily.primary,
              lineHeight: '1.5'
            }}
          >
            {isLoading ? 'Sharing...' : 'Share link'}
          </button>

          {/* Bottom Message */}
          <div 
            className="absolute text-center text-black font-medium"
            style={{
              left: '277px',
              top: '433px',
              fontSize: '12px',
              fontFamily: typography.fontFamily.primary,
              lineHeight: '1.1'
            }}
          >
            Let's grow together – and win together! 💫
          </div>

          {/* Success Message */}
          {success && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[380px] text-green-500 text-sm text-center">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReferralSettings;