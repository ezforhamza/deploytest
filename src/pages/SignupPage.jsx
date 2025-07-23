// src/pages/SignupPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/ui/Carousel";
import AccountTypeCard from "../components/ui/AccountTypeCard";
import AlumniSignupForm from "../components/auth/alumni-signup";
import CompanySignupForm from "../components/auth/company-school-signup";
import SchoolSignupForm from "../components/auth/company-school-signup/SchoolSignupForm";
import Button from "../components/ui/Button";
import SuccessModal from "../components/ui/SuccessModal";
import { colors, typography } from "../styles/tokens";
import roleService from "../services/userRole/roleService";
import { useAuth } from "../hooks/useAuth";

const SignupPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // 1 = account selection, 2 = form
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Auth hook for signup operations
  const {
    signup,
    isLoading: isSignupLoading,
    error: signupError,
    clearError,
  } = useAuth();

  // API State
  const [accountTypes, setAccountTypes] = useState([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [rolesError, setRolesError] = useState(null);

  // Carousel images (same as login page)
  const carouselImages = [
    "/crousal/onboarding-slide-1.png",
    "/crousal/onboarding-slide-2.png",
    "/crousal/onboarding-slide-3.png",
  ];

  // Fallback account types with hardcoded descriptions
  const fallbackAccountTypes = [
    {
      type: "alumni",
      title: "Alumni",
      description: "Join your alumni",
    },
    {
      type: "company",
      title: "Company",
      description: "Build your professional network",
    },
    {
      type: "school",
      title: "School",
      description: "For educational instructions",
    },
  ];

  /**
   * Load roles from API on component mount
   */
  useEffect(() => {
    loadRoles();
  }, []);

  /**
   * Fetch roles from API
   */
  const loadRoles = async () => {
    try {
      setIsLoadingRoles(true);
      setRolesError(null);

      const roles = await roleService.fetchRoles();

      // Map API roles to match your existing structure with hardcoded descriptions
      const mappedRoles = roles.map((role) => {
        const fallback = fallbackAccountTypes.find((f) => f.type === role.type);
        return {
          id: role.id,
          type: role.type,
          title: role.title,
          description: fallback?.description || role.description, // Use hardcoded descriptions
        };
      });

      setAccountTypes(mappedRoles);
    } catch (error) {
      console.error("Failed to load roles:", error);
      setRolesError(error.message || "Failed to load account types");

      // Use fallback roles if API fails
      setAccountTypes(fallbackAccountTypes);
    } finally {
      setIsLoadingRoles(false);
    }
  };

  const handleAccountTypeSelect = (type) => {
    setSelectedAccountType(type);
  };

  const handleNext = () => {
    if (selectedAccountType) {
      setCurrentStep(2);
    }
  };

  const handleBackToAccountSelection = () => {
    setCurrentStep(1);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  const handleFormSubmit = async (formData) => {
    try {
      // Clear any previous errors
      clearError();

      // Get roleId for selected account type
      const roleId = roleService.getRoleId(selectedAccountType);

      if (!roleId) {
        throw new Error(
          `Role ID not found for account type: ${selectedAccountType}`
        );
      }

      // Prepare signup data with roleId
      const signupData = {
        roleId,
        accountType: selectedAccountType,
        ...formData,
      };

      console.log("🚀 Submitting signup data:", {
        accountType: selectedAccountType,
        roleId,
        data: signupData,
      });

      // Call signup API
      const result = await signup(signupData);

      if (result.success) {
        console.log("✅ Signup successful:", result);

        // Show success modal
        setShowSuccessModal(true);
      } else {
        console.error("❌ Signup failed:", result.error);
        // Error will be displayed in the form through the error prop
      }
    } catch (error) {
      console.error("Signup failed:", error);
      // Error will be displayed in the form through the error prop
    }
  };

  const renderRightSide = () => {
    if (currentStep === 1) {
      // Account Type Selection - Keep original styling
      return (
        <div className="w-full max-w-lg">
          {/* Show loading state */}
          {isLoadingRoles && (
            <div className="text-center mb-4">
              <div className="inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <p
                className="mt-2 text-gray-600"
                style={{ fontFamily: typography.fontFamily.primary }}
              >
                Loading account types...
              </p>
            </div>
          )}

          {/* Show error if API failed but still show fallback options */}
          {rolesError && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
              Using offline mode. Some features may be limited.
            </div>
          )}

          {/* Account Type Cards */}
          {!isLoadingRoles && (
            <div className="space-y-4 mb-8">
              {accountTypes.map((account) => (
                <AccountTypeCard
                  key={account.type}
                  type={account.type}
                  title={account.title}
                  description={account.description}
                  isSelected={selectedAccountType === account.type}
                  onClick={() => handleAccountTypeSelect(account.type)}
                />
              ))}
            </div>
          )}

          {/* Next Button */}
          {!isLoadingRoles && (
            <div className="mb-4">
              <Button
                fullWidth
                disabled={!selectedAccountType}
                onClick={handleNext}
              >
                Next →
              </Button>
            </div>
          )}

          {/* Back to Login */}
          {!isLoadingRoles && (
            <div className="text-center">
              <span
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.text,
                  color: colors.text,
                }}
              >
                Already have an account?{" "}
                <button
                  onClick={handleBackToLogin}
                  style={{
                    color: colors.primary,
                    textDecoration: "none",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: typography.fontFamily.primary,
                    fontSize: typography.fontSize.text,
                  }}
                >
                  Login
                </button>
              </span>
            </div>
          )}
        </div>
      );
    } else if (currentStep === 2) {
      // Show form based on selected account type - Apply height constraints here
      if (selectedAccountType === "alumni") {
        return (
          <AlumniSignupForm
            onBack={handleBackToAccountSelection}
            onSubmit={handleFormSubmit}
            isLoading={isSignupLoading}
            error={signupError}
          />
        );
      } else if (selectedAccountType === "company") {
        return (
          <CompanySignupForm
            onBack={handleBackToAccountSelection}
            onSubmit={handleFormSubmit}
            isLoading={isSignupLoading}
            error={signupError}
          />
        );
      } else if (selectedAccountType === "school") {
        return (
          <SchoolSignupForm
            onBack={handleBackToAccountSelection}
            onSubmit={handleFormSubmit}
            isLoading={isSignupLoading}
            error={signupError}
          />
        );
      }

      return <div>Form for {selectedAccountType} coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Carousel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <Carousel images={carouselImages} />
      </div>

      {/* Right Side - Dynamic Content */}
      {currentStep === 1 ? (
        // Original container styling for account selection
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          {renderRightSide()}
        </div>
      ) : (
        // Modified container styling for form with height constraints
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div
            className="w-full max-w-lg"
            style={{
              height: "741px", // Same height as carousel
              overflow: "hidden",
            }}
          >
            {renderRightSide()}
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Account Creation Successfully"
        message="Your account is under review. We will notify you via email once your account is approved."
        buttonText="Done"
      />
    </div>
  );
};

export default SignupPage;
