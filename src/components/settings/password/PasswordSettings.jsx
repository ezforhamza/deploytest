import React, { useState } from 'react';
import { colors, typography } from '../../../styles/tokens';
import { useAuthStore } from '../../../stores/useAuthStore';
import Input from '../../ui/Input';
import OtpStep from '../../auth/OtpStep';
import NewPasswordStep from '../../auth/NewPasswordStep';
import authService from '../../../services/auth/authService';

const PasswordSettings = () => {
  const { user } = useAuthStore();
  
  // Password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Forgot password state
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(2); // Skip email step for logged-in users
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(user?.email || '');
  const [forgotPasswordOtp, setForgotPasswordOtp] = useState('');
  const [canResend, setCanResend] = useState(true);
  const [resendTimer, setResendTimer] = useState(0);

  // Handle password change
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // TODO: Implement API call to change password
      await new Promise(resolve => setTimeout(resolve, 1000)); // Mock API call
      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password handlers
  const handleForgotPasswordClick = async () => {
    if (!user?.email) {
      setError('User email not found. Please log in again.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await authService.forgotPassword(user.email);
      if (result.success) {
        setForgotPasswordEmail(user.email);
        setForgotPasswordStep(2); // Start at OTP step
        setShowForgotPassword(true);
      } else {
        setError(result.error || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleForgotPasswordOtpSubmit = async () => {
    if (forgotPasswordOtp.length !== 6) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await authService.verifyOtp(forgotPasswordEmail, forgotPasswordOtp);
      if (result.success) {
        setForgotPasswordStep(3);
      } else {
        setError(result.error || 'Invalid verification code. Please try again.');
      }
    } catch (err) {
      setError('Failed to verify code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordReset = async ({ newPassword, confirmPassword }) => {
    setIsLoading(true);
    setError('');

    try {
      const result = await authService.resetPassword(forgotPasswordEmail, forgotPasswordOtp, newPassword, confirmPassword);
      if (result.success) {
        setSuccess('Password updated successfully!');
        setShowForgotPassword(false);
        setForgotPasswordStep(2); // Reset to OTP step for logged-in users
        setForgotPasswordEmail(user?.email || '');
        setForgotPasswordOtp('');
      } else {
        setError(result.error || 'Failed to update password. Please try again.');
      }
    } catch (err) {
      setError('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setIsLoading(true);
    setError('');

    try {
      const emailToUse = forgotPasswordEmail || user?.email;
      const result = await authService.forgotPassword(emailToUse);
      if (result.success) {
        setCanResend(false);
        setResendTimer(30);

        const countdown = setInterval(() => {
          setResendTimer((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);
              setCanResend(true);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(result.error || 'Failed to resend code. Please try again.');
      }
    } catch (err) {
      setError('Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render forgot password steps
  const renderForgotPasswordStep = () => {
    switch (forgotPasswordStep) {
      case 2:
        return (
          <OtpStep
            otp={forgotPasswordOtp}
            setOtp={setForgotPasswordOtp}
            onNext={handleForgotPasswordOtpSubmit}
            onResendCode={handleResendCode}
            isLoading={isLoading}
            error={error}
            canResend={canResend}
            resendTimer={resendTimer}
          />
        );
      case 3:
        return (
          <NewPasswordStep
            onComplete={handleForgotPasswordReset}
            isLoading={isLoading}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  if (showForgotPassword) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[600px]">
        <div className="w-full max-w-md">
          {renderForgotPasswordStep()}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8" style={{ color: colors.text }}>
      <div className="flex items-center justify-center">
        {/* Password Change Container - Based on Figma Design */}
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
              Change Password
            </h2>
          </div>

          {/* Current Password Field */}
          <div 
            className="absolute"
            style={{ 
              width: '743px', 
              left: '30px', 
              top: '87px' 
            }}
          >
            <Input
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="Enter current password"
              label="Current Password"
              icon="lock"
              required
            />
          </div>

          {/* Forgot Password Link */}
          <button
            onClick={handleForgotPasswordClick}
            className="absolute text-right"
            style={{
              width: '383px',
              height: '25px',
              left: '390px',
              top: '133px',
              fontSize: '12.8px',
              fontFamily: typography.fontFamily.primary,
              lineHeight: '25px',
              color: '#0490CF',
              textAlign: 'right'
            }}
          >
            Forgot Password?
          </button>

          {/* New Password Field */}
          <div 
            className="absolute"
            style={{ 
              width: '743px', 
              left: '30px', 
              top: '178px' 
            }}
          >
            <Input
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              placeholder="Enter new password"
              label="New Password"
              icon="lock"
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div 
            className="absolute"
            style={{ 
              width: '743px', 
              left: '30px', 
              top: '238px' 
            }}
          >
            <Input
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm new password"
              label="Confirm New Password"
              icon="lock"
              required
            />
          </div>

          {/* Update Button */}
          <button
            onClick={handlePasswordChange}
            disabled={isLoading}
            className="absolute bg-blue-500 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              width: '108px',
              height: '42px',
              left: 'calc(50% - 54px + 319.5px)',
              top: '454px',
              backgroundColor: '#0490CF',
              borderRadius: '10.7573px',
              fontSize: '18px',
              fontFamily: typography.fontFamily.primary,
              lineHeight: '150%'
            }}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>

          {/* Error/Success Messages */}
          {error && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[320px] text-red-500 text-sm text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-[320px] text-green-500 text-sm text-center">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordSettings;