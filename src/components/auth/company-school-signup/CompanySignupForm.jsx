import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { colors, typography, spacing } from "../../../styles/tokens";
import Button from "../../ui/Button";
import FormHeader from "./FormHeader";
import ProfileImageUpload from "./ProfileImageUpload";
import CompanyInfoSection from "./CompanyInfoSection";
import LocationSection from "./LocationSection";
import OverviewSection from "./OverviewSection";
import SecuritySection from "./SecuritySection";
import TermsSection from "./TermsSection";
import { useFileUpload } from "../../../hooks/useFileUpload";
import "../shared/scrollbar.css";

const CompanySignupForm = ({ onBack, onSubmit, isLoading = false, error = null }) => {
  const { uploadProfileImage, isUploading } = useFileUpload();
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    industry: "",
    location: null,
    country: "",
    state: "",
    website: "",
    overview: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value, error = "") => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }

    if (error) {
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Check if there are any validation errors
    Object.keys(errors).forEach(key => {
      if (errors[key]) {
        newErrors[key] = errors[key];
      }
    });

    // Check required fields
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.industry) newErrors.industry = "Industry is required";
    if (!formData.location || !formData.location.address) newErrors.location = "Location is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Upload profile image if provided - MUST complete before form submission
      let uploadedProfileImage = null;
      if (profileImage && typeof profileImage !== 'string') {
        console.log("🖼️ Uploading profile image...", {
          fileName: profileImage.name,
          fileSize: profileImage.size,
          fileType: profileImage.type
        });
        try {
          const imageResult = await uploadProfileImage(profileImage);
          console.log("🖼️ Upload result:", imageResult);
          if (imageResult.success) {
            uploadedProfileImage = { filename: imageResult.filename, fullURL: imageResult.fullURL };
            console.log("✅ Profile image uploaded:", imageResult.filename);
            console.log("✅ Full URL:", imageResult.fullURL);
          } else {
            console.warn("⚠️ Profile image upload failed, continuing without image");
          }
        } catch (uploadError) {
          console.warn("⚠️ Profile image upload failed:", uploadError.message);
        }
      } else {
        console.log("ℹ️ No profile image to upload:", { profileImage, type: typeof profileImage });
      }

      // Ensure all uploads are complete before proceeding
      console.log("📋 All uploads completed, proceeding with form submission...");

      // Create structured data object
      const companyData = {
      accountType: "company",
      timestamp: new Date().toISOString(),
      companyInfo: {
        name: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        industry: formData.industry,
        website: formData.website || null,
        overview: formData.overview || null,
        overviewLength: formData.overview ? formData.overview.length : 0
      },
      locationInfo: {
        location: formData.location,
        country: formData.country,
        state: formData.state,
        fullAddress: `${formData.location?.address || ''}, ${formData.state}, ${formData.country}`
      },
      security: {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        passwordLength: formData.password.length,
        passwordsMatch: formData.password === formData.confirmPassword
      },
      profileImage: uploadedProfileImage,
      agreements: {
        termsAccepted: formData.agreeToTerms,
        acceptedAt: formData.agreeToTerms ? new Date().toISOString() : null
      },
      metadata: {
        formVersion: "1.0",
        hasWebsite: !!formData.website,
        hasOverview: !!formData.overview,
        hasProfileImage: !!profileImage,
        completedFields: Object.keys(formData).filter(key => 
          formData[key] !== "" && formData[key] !== null && formData[key] !== false
        ).length,
        totalFields: Object.keys(formData).length,
        completionPercentage: Math.round(
          (Object.keys(formData).filter(key => 
            formData[key] !== "" && formData[key] !== null && formData[key] !== false
          ).length / Object.keys(formData).length) * 100
        )
      },
      contactInfo: {
        primaryEmail: formData.email,
        primaryPhone: formData.phone,
        businessAddress: {
          city: formData.location,
          state: formData.state,
          country: formData.country
        }
      }
    };

    // Log the structured data to console
    console.group("🏢 Company Signup Data");
    console.log("Complete Company Registration Data:", companyData);
    console.log("Company Info:", companyData.companyInfo);
    console.log("Location Info:", companyData.locationInfo);
    console.log("Contact Info:", companyData.contactInfo);
    console.log("Metadata:", companyData.metadata);
    console.groupEnd();

      if (onSubmit) {
        await onSubmit(companyData);
      }
    } catch (error) {
      console.error("❌ Form submission failed:", error);
      alert(`Form submission failed: ${error.message}`);
    }
  };

  return (
    <div className="w-full h-full flex flex-col form-container">
      {/* Back Button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize.text,
            padding: spacing.sm,
            marginLeft: "-8px",
          }}
        >
          <ArrowLeft size={20} />
          Back to account type
        </button>
      </div>

      <FormHeader 
        title="Create Company Account"
        subtitle="Join our network of professionals"
      />

      <div className="flex-1 overflow-y-auto custom-scrollbar form-scrollable">
        <form onSubmit={handleSubmit} className="space-y-4">
          <ProfileImageUpload
            profileImage={profileImage}
            onImageUpload={setProfileImage}
          />

          <CompanyInfoSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <LocationSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <OverviewSection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <SecuritySection
            formData={formData}
            errors={errors}
            onInputChange={handleInputChange}
          />

          <TermsSection
            formData={formData}
            onInputChange={handleInputChange}
          />

          {/* Error display */}
          {error && (
            <div style={{ 
              color: colors.danger, 
              fontSize: typography.fontSize.small,
              backgroundColor: '#fee',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #fcc',
              marginBottom: '16px'
            }}>
              {error}
            </div>
          )}

          {errors.agreeToTerms && (
            <div style={{ color: colors.danger, fontSize: typography.fontSize.small }}>
              {errors.agreeToTerms}
            </div>
          )}

          <Button 
            type="submit" 
            fullWidth 
            disabled={!formData.agreeToTerms || isLoading || isUploading}
          >
            {isUploading ? "Uploading files..." : isLoading ? "Creating Account..." : "Create Company Account"}
          </Button>

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
                type="button"
                onClick={onBack}
                className="hover:underline border-none bg-transparent cursor-pointer"
                style={{
                  color: colors.primary,
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.text,
                }}
              >
                Log in
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanySignupForm;