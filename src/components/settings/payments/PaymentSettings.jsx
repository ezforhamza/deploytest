import React from 'react';
import { colors, typography } from '../../../styles/tokens';
import PaymentForm from '../../../features/upgrade/components/PaymentForm';
import PaymentMethods from '../../../features/upgrade/components/PaymentMethods';
import UpgradeTab from '../../../features/upgrade/components/UpgradeTab';
import ReferralTab from '../../../features/upgrade/components/ReferralTab';
import { useUpgradeModal } from '../../../features/upgrade/hooks/useUpgradeModal';

const PaymentSettings = () => {
  const {
    activeTab,
    selectedPlan,
    referralCode,
    showPaymentMethods,
    selectedPaymentMethod,
    showPaymentForm,
    isLoading,
    error,
    referralSuccess,
    paymentFormData,
    setActiveTab,
    setSelectedPlan,
    setReferralCode,
    handleUpgradeClick,
    handleBackClick,
    handlePaymentMethodSelect,
    handlePaymentFormInputChange,
    handlePaymentSubmit,
    handleApplyReferral,
    resetModal
  } = useUpgradeModal();

  const handlePaymentSuccess = () => {
    resetModal();
    // Handle success (e.g., show success message, redirect, etc.)
  };

  // Payment Form View
  if (showPaymentForm) {
    return (
      <div className="p-8" style={{ color: colors.text }}>
        <div className="w-full max-w-4xl mx-auto">
          <PaymentForm
            paymentFormData={paymentFormData}
            onInputChange={handlePaymentFormInputChange}
            onBack={handleBackClick}
            onSubmit={(formData) => {
              handlePaymentSubmit(formData);
              handlePaymentSuccess();
            }}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }

  // Payment Methods View
  if (showPaymentMethods) {
    return (
      <div className="p-8" style={{ color: colors.text }}>
        <div className="w-full max-w-4xl mx-auto">
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodSelect={handlePaymentMethodSelect}
            onBack={handleBackClick}
          />
        </div>
      </div>
    );
  }

  // Main Payment & Subscription View
  return (
    <div className="p-8" style={{ color: colors.text }}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 
            className="text-center text-black font-medium text-2xl mb-8"
            style={{ fontFamily: typography.fontFamily.primary }}
          >
            Payment & Subscription
          </h1>

          {/* Tabs */}
          <div className="flex justify-center space-x-16 mb-6">
            <button
              className={`bg-transparent border-none cursor-pointer font-semibold text-lg ${
                activeTab === "upgrade" ? "text-[#1090CF]" : "text-[#58606C]"
              }`}
              style={{ fontFamily: typography.fontFamily.primary }}
              onClick={() => setActiveTab("upgrade")}
            >
              Upgrade Now
            </button>

            <button
              className={`bg-transparent border-none cursor-pointer font-normal text-lg ${
                activeTab === "referral" ? "text-[#1090CF]" : "text-[#58606C]"
              }`}
              style={{ fontFamily: typography.fontFamily.primary }}
              onClick={() => setActiveTab("referral")}
            >
              Referral code
            </button>
          </div>

          {/* Tab Indicator */}
          <div className="relative w-full max-w-md mx-auto">
            <div className="w-full h-0.5 bg-[#E2E2E2]"></div>
            <div
              className={`w-1/2 h-0.5 bg-[#1090CF] transition-transform duration-300 ${
                activeTab === "upgrade" ? "translate-x-0" : "translate-x-full"
              }`}
            ></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full">
          {activeTab === "upgrade" && (
            <UpgradeTab
              selectedPlan={selectedPlan}
              onPlanSelect={setSelectedPlan}
              onUpgradeClick={handleUpgradeClick}
              isLoading={isLoading}
            />
          )}

          {activeTab === "referral" && (
            <ReferralTab
              referralCode={referralCode}
              onReferralCodeChange={setReferralCode}
              onApplyReferral={handleApplyReferral}
              isLoading={isLoading}
              error={error}
              success={referralSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSettings;