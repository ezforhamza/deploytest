import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { colors, typography, spacing } from "../../../styles/tokens";
import Button from "../../ui/Button";
import FormHeader from "./FormHeader";
import StepIndicator from "./StepIndicator";
import PersonalInfoSection from "./PersonalInfoSection";
import LocationSection from "./LocationSection";
import EducationSection from "./EducationSection";
import WorkExperienceSection from "./WorkExperienceSection";
import SecuritySection from "./SecuritySection";
import TermsSection from "./TermsSection";
import { useFileUpload } from "../../../hooks/useFileUpload";
import "../shared/scrollbar.css";

const AlumniSignupForm = ({ onBack, onSubmit, isLoading = false, error = null }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { uploadProfileImage, uploadDocument, isUploading } = useFileUpload();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    location: null,
    country: "",
    state: "",
    skills: "",
    cvFile: null,
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [showEducationSection, setShowEducationSection] = useState(true);
  const [educationList, setEducationList] = useState([{
    id: Date.now(),
    school: "",
    degree: "",
    fieldOfWork: "",
    startDate: "",
    endDate: "",
  }]);
  const [workExperiences, setWorkExperiences] = useState([{
    id: Date.now(),
    jobTitle: "",
    company: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
    description: ""
  }]);

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

  const addFirstEducation = () => {
    const newEducation = {
      id: Date.now(),
      school: "",
      degree: "",
      fieldOfWork: "",
      startDate: "",
      endDate: "",
    };
    setEducationList([newEducation]);
    setShowEducationSection(true);
  };

  const addNewEducationEntry = () => {
    const newEducation = {
      id: Date.now(),
      school: "",
      degree: "",
      fieldOfWork: "",
      startDate: "",
      endDate: "",
    };
    setEducationList([...educationList, newEducation]);
  };

  const updateEducation = (id, field, value) => {
    setEducationList(
      educationList.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id) => {
    const updatedList = educationList.filter((edu) => edu.id !== id);
    setEducationList(updatedList);

    if (updatedList.length === 0) {
      setShowEducationSection(false);
    }
  };

  const addWorkExperience = () => {
    const newExperience = {
      id: Date.now(),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: ""
    };
    setWorkExperiences([...workExperiences, newExperience]);
  };

  const updateWorkExperience = (id, field, value) => {
    setWorkExperiences(
      workExperiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const updateCurrentlyWorking = (id, isCurrentlyWorking) => {
    setWorkExperiences(
      workExperiences.map((exp) =>
        exp.id === id ? { 
          ...exp, 
          currentlyWorking: isCurrentlyWorking,
          endDate: isCurrentlyWorking ? "" : exp.endDate
        } : exp
      )
    );
  };


  const removeWorkExperience = (id) => {
    const updatedExperiences = workExperiences.filter((exp) => exp.id !== id);
    setWorkExperiences(updatedExperiences);
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (step) => {
    setCurrentStep(step);
  };

  const validateCurrentStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.age) newErrors.age = "Age is required";
    } else if (currentStep === 3) {
      if (!formData.password) newErrors.password = "Password is required";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.dateOfBirth) newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.age) newErrors.age = "Age is required";
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
      if (profileImage && profileImage instanceof File) {
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

      // Upload CV file if provided - MUST complete before form submission
      let uploadedCvFile = null;
      if (formData.cvFile) {
        console.log("📄 Uploading CV file...");
        try {
          const cvResult = await uploadDocument(formData.cvFile);
          if (cvResult.success) {
            uploadedCvFile = { filename: cvResult.filename, fullURL: cvResult.fullURL };
            console.log("✅ CV file uploaded:", cvResult.filename);
          } else {
            console.warn("⚠️ CV file upload failed, continuing without file");
          }
        } catch (uploadError) {
          console.warn("⚠️ CV file upload failed:", uploadError.message);
        }
      }

      // Ensure all uploads are complete before proceeding
      console.log("📋 All uploads completed, proceeding with form submission...");

      // Create structured data object
      const alumniData = {
        accountType: "alumni",
        timestamp: new Date().toISOString(),
        personalInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          fullName: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          age: parseInt(formData.age),
          gender: formData.gender
        },
        locationInfo: {
          location: formData.location,
          country: formData.country,
          state: formData.state
        },
        education: educationList.map(edu => ({
          id: edu.id,
          school: edu.school,
          degree: edu.degree,
          fieldOfWork: edu.fieldOfWork,
          startDate: edu.startDate,
          endDate: edu.endDate
        })),
        workExperience: workExperiences.map(exp => ({
          id: exp.id,
          jobTitle: exp.jobTitle,
          company: exp.company,
          startDate: exp.startDate,
          endDate: exp.endDate,
          currentlyWorking: exp.currentlyWorking,
          description: exp.description
        })),
        professionalInfo: {
          skills: formData.skills,
          cvFile: uploadedCvFile
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
          formVersion: "2.0",
          educationCount: educationList.length,
          workExperienceCount: workExperiences.length,
          completedFields: Object.keys(formData).filter(key => 
            formData[key] !== "" && formData[key] !== null && formData[key] !== false
          ).length,
          totalFields: Object.keys(formData).length
        }
      };

      // Log the structured data to console
      console.group("🎓 Alumni Signup Data");
      console.log("Complete Alumni Registration Data:", alumniData);
      console.log("Personal Info:", alumniData.personalInfo);
      console.log("Education History:", alumniData.education);
      console.log("Work Experience:", alumniData.workExperience);
      console.log("Professional Info:", alumniData.professionalInfo);
      console.log("Metadata:", alumniData.metadata);
      console.groupEnd();

      if (onSubmit) {
        await onSubmit(alumniData);
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

      <StepIndicator currentStep={currentStep} totalSteps={3} onStepClick={handleStepClick} />

      <div className="flex-1 overflow-y-auto custom-scrollbar form-scrollable">
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentStep === 1 && (
            <>
              <FormHeader 
                title="Create Account" 
                subtitle="It only takes a moment to get started" 
              />

              <PersonalInfoSection
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
                profileImage={profileImage}
                onImageUpload={setProfileImage}
              />

              <LocationSection
                formData={formData}
                errors={errors}
                onInputChange={handleInputChange}
              />

              <Button 
                type="button" 
                variant="primary"
                size="default"
                fullWidth 
                disabled={isLoading}
                onClick={() => {
                  if (validateCurrentStep()) {
                    handleNext();
                  }
                }}
              >
                Next →
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <FormHeader 
                title="Your Education" 
                subtitle="It only takes a moment to get started" 
              />

              <EducationSection
                showEducationSection={showEducationSection}
                educationList={educationList}
                onAddFirstEducation={addFirstEducation}
                onAddNewEducation={addNewEducationEntry}
                onUpdateEducation={updateEducation}
                onRemoveEducation={removeEducation}
                formData={formData}
                onInputChange={handleInputChange}
                errors={errors}
              />

              <Button 
                type="button" 
                variant="primary"
                size="default"
                fullWidth
                disabled={isLoading}
                onClick={handleNext}
              >
                Next →
              </Button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <FormHeader 
                title="Work Experience" 
              />

              <WorkExperienceSection
                workExperiences={workExperiences}
                onAddWorkExperience={addWorkExperience}
                onUpdateWorkExperience={updateWorkExperience}
                onUpdateCurrentlyWorking={updateCurrentlyWorking}
                onRemoveWorkExperience={removeWorkExperience}
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
                variant="primary"
                size="default"
                fullWidth
                disabled={!formData.agreeToTerms || isLoading || isUploading}
              >
                {isUploading ? "Uploading files..." : isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </>
          )}

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

export default AlumniSignupForm;