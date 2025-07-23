import { useState, useCallback } from 'react';

export const useUpgradeModal = () => {
  const [activeTab, setActiveTab] = useState("upgrade");
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [referralCode, setReferralCode] = useState("");
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [referralSuccess, setReferralSuccess] = useState(false);

  const [paymentFormData, setPaymentFormData] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleUpgradeClick = useCallback(() => {
    setShowPaymentMethods(true);
  }, []);

  const handleBackClick = useCallback(() => {
    setError(null);
    if (showPaymentForm) {
      setShowPaymentForm(false);
    } else {
      setShowPaymentMethods(false);
    }
  }, [showPaymentForm]);

  const handlePaymentMethodSelect = useCallback((method) => {
    console.log('🔍 Payment Method Selected:', method);
    setSelectedPaymentMethod(method);
    setShowPaymentForm(true);
  }, []);

  const handlePaymentFormInputChange = useCallback((field, value) => {
    setPaymentFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handlePaymentSubmit = useCallback((formData) => {
    const paymentData = {
      ...formData,
      paymentMethod: selectedPaymentMethod,
      plan: selectedPlan,
      referralCode: referralCode || null
    };

    console.log('🔄 Processing Payment:', paymentData);
    console.log('✅ Payment Processed Successfully');
    
    return { success: true, data: paymentData };
  }, [selectedPaymentMethod, selectedPlan, referralCode]);

  const handleApplyReferral = useCallback((code) => {
    console.log('🎁 Applying Referral Code:', code);
    
    const validCodes = ['SAVE20', 'FRIEND10', 'WELCOME'];
    const isValid = validCodes.includes(code.trim().toUpperCase());

    if (!isValid) {
      console.log('❌ Invalid Referral Code');
      setError('Invalid referral code');
      setReferralSuccess(false);
    } else {
      console.log('✅ Referral Code Applied Successfully');
      setReferralSuccess(true);
      setReferralCode(code);
      setError(null);
    }
  }, []);

  const resetModal = useCallback(() => {
    setActiveTab("upgrade");
    setSelectedPlan("monthly");
    setReferralCode("");
    setShowPaymentMethods(false);
    setSelectedPaymentMethod(null);
    setShowPaymentForm(false);
    setIsLoading(false);
    setError(null);
    setReferralSuccess(false);
    setPaymentFormData({
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    });
  }, []);

  return {
    // State
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

    // Actions
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
  };
};