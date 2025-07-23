// src/features/upgrade/UnlockAllFeaturesModal.jsx

import React from "react";
import PaymentForm from "./components/PaymentForm";
import PaymentMethods from "./components/PaymentMethods";
import UpgradeTab from "./components/UpgradeTab";
import ReferralTab from "./components/ReferralTab";
import { useUpgradeModal } from "./hooks/useUpgradeModal";
import "../../components/auth/shared/scrollbar.css";

const UnlockAllFeaturesModal = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handlePaymentSuccess = () => {
    resetModal();
    onClose();
  };

  // Payment Form Page
  if (showPaymentForm) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
        onClick={handleClose}
      >
        <div
          className="relative w-full max-w-[1072px] h-full max-h-[951px] bg-white rounded-lg md:rounded-[18.5973px] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
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

  // Payment Methods Page
  if (showPaymentMethods) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
        onClick={handleClose}
      >
        <div
          className="relative w-full max-w-[1072px] h-full max-h-[951px] bg-white rounded-lg md:rounded-[18.5973px] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <PaymentMethods
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodSelect={handlePaymentMethodSelect}
            onBack={handleBackClick}
          />
        </div>
      </div>
    );
  }

  // Original Modal Content
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-[1072px] h-full max-h-[951px] bg-white rounded-lg md:rounded-[18.5973px] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="relative w-full h-auto md:h-[185px] bg-white rounded-t-lg md:rounded-t-[20px] flex-shrink-0 z-10 px-4 py-4 md:p-0">
          <div className="flex flex-col md:block">
            {/* Title and Skip Button */}
            <div className="flex justify-between items-center mb-4 md:mb-0">
              <h1 className="text-center flex-1 text-black font-['Lexend'] font-medium text-xl md:text-2xl lg:text-[29.2243px] leading-tight md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-8">
                Unlock All Features
              </h1>

              <button
                className="text-[#0490CF] bg-transparent border-none cursor-pointer font-['Lexend'] font-medium text-base md:text-[20px] leading-tight md:absolute md:right-8 md:top-10"
                onClick={handleClose}
              >
                Skip
              </button>
            </div>

            {/* Tabs */}
            <div className="flex justify-center space-x-8 md:space-x-16 mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-24">
              <button
                className={`bg-transparent border-none cursor-pointer font-['Lexend'] font-semibold text-base md:text-[21.254px] leading-tight ${
                  activeTab === "upgrade" ? "text-[#1090CF]" : "text-[#58606C]"
                }`}
                onClick={() => setActiveTab("upgrade")}
              >
                Upgrade Now
              </button>

              <button
                className={`bg-transparent border-none cursor-pointer font-['Lexend'] font-normal text-base md:text-[21.254px] leading-tight ${
                  activeTab === "referral" ? "text-[#1090CF]" : "text-[#58606C]"
                }`}
                onClick={() => setActiveTab("referral")}
              >
                Referral code
              </button>
            </div>

            {/* Tab Indicator */}
            <div className="relative w-full max-w-[704px] mx-auto">
              <div className="w-full h-[2px] bg-[#E2E2E2] md:absolute md:top-40"></div>
              <div
                className={`w-1/2 h-[3px] bg-[#1090CF] transition-transform duration-300 md:absolute md:top-40 ${
                  activeTab === "upgrade" ? "translate-x-0" : "translate-x-full"
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div
          className={`flex-1 w-full overflow-y-auto px-4 md:px-0 ${
            activeTab === "upgrade" ? "custom-scrollbar" : ""
          }`}
        >
          <div className="relative w-full min-h-full">
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
    </div>
  );
};

export default UnlockAllFeaturesModal;
