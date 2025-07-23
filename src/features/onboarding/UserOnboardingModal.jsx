// src/features/onboarding/UserOnboardingModal.jsx

import { useState, useCallback } from "react";
import { User, MapPin, CreditCard } from "lucide-react";
import BusinessCardPreview from "../privacy/BusinessCardPreview";
import CertificateModal from "../certificates/CertificateModal";

const UserOnboardingModal = ({
  isOpen,
  onClose,
  onComplete,
  userType = 'alumni', // 'alumni' | 'school' | 'company'
  initialStep = 'privacy'
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [privacySettings, setPrivacySettings] = useState({
    privateAccount: true,
    showLocation: false,
    businessCard: false,
  });
  const [certificates, setCertificates] = useState([]);
  const [showBusinessCardPreview, setShowBusinessCardPreview] = useState(false);
  
  // Certificate handling state
  const [dragOver, setDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddMore, setShowAddMore] = useState(false);

  if (!isOpen) return null;

  const isAlumni = userType === 'alumni';
  const isSchoolOrCompany = userType === 'school' || userType === 'company';

  const handleToggle = (setting) => {
    setPrivacySettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handlePrivacyNext = () => {
    if (isAlumni) {
      setCurrentStep('certificates');
    } else {
      // For school/company, complete the flow after privacy
      handleComplete();
    }
  };

  const handleCertificatesComplete = (certificateData) => {
    setCertificates(certificateData);
    handleComplete();
  };

  const handleComplete = () => {
    const result = {
      privacySettings,
      ...(isAlumni && { certificates }),
      userType,
      completedSteps: isAlumni ? ['privacy', 'certificates'] : ['privacy']
    };
    
    if (onComplete) {
      onComplete(result);
    }
    onClose();
  };


  const handlePreviewClick = () => {
    setShowBusinessCardPreview(true);
  };

  // Certificate handling functions
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " Kb";
    return Math.round(bytes / (1024 * 1024)) + " MB";
  };

  const formatUploadDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const validateFile = (file) => {
    if (file.type !== "application/pdf") {
      return "Only PDF files are allowed";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "File size must be less than 5MB";
    }
    return null;
  };

  const addCertificate = useCallback((file) => {
    const error = validateFile(file);
    if (error) {
      setError(error);
      return false;
    }

    const newCertificate = {
      id: Date.now() + Math.random(),
      name: file.name.replace(".pdf", ""),
      file: file,
      size: formatFileSize(file.size),
      uploadDate: formatUploadDate(new Date()),
    };

    setCertificates((prev) => [...prev, newCertificate]);
    setError("");
    setShowAddMore(false);
    return true;
  }, []);

  const removeCertificate = useCallback((id) => {
    setCertificates((prev) => prev.filter((cert) => cert.id !== id));
  }, []);

  const editCertificateName = useCallback((id, newName) => {
    setCertificates((prev) =>
      prev.map((cert) =>
        cert.id === id ? { ...cert, name: newName } : cert
      )
    );
  }, []);

  const handleFileUpload = useCallback(
    (files) => {
      setIsLoading(true);
      const fileArray = Array.from(files);

      fileArray.forEach((file) => {
        addCertificate(file);
      });

      setIsLoading(false);
    },
    [addCertificate]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const files = e.dataTransfer.files;
      handleFileUpload(files);
    },
    [handleFileUpload]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        handleFileUpload(files);
      }
    },
    [handleFileUpload]
  );

  const toggleAddMore = useCallback((show) => {
    setShowAddMore(show);
  }, []);

  // Show Business Card Preview if active
  if (showBusinessCardPreview) {
    return (
      <BusinessCardPreview
        isOpen={showBusinessCardPreview}
        onClose={() => setShowBusinessCardPreview(false)}
        onShare={() => {
          console.log("Business card shared successfully");
        }}
        onEnableBusinessCard={() => {
          handleToggle("businessCard");
          console.log("Business card enabled");
        }}
      />
    );
  }

  // Show Certificate Modal for Alumni
  if (currentStep === 'certificates' && isAlumni) {
    return (
      <CertificateModal
        isOpen={true}
        onClose={onClose}
        onSave={handleCertificatesComplete}
        certificates={certificates}
        dragOver={dragOver}
        isLoading={isLoading}
        error={error}
        onRemoveCertificate={removeCertificate}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onFileSelect={handleFileSelect}
        showAddMore={showAddMore}
        onToggleAddMore={toggleAddMore}
        onEditCertificateName={editCertificateName}
        onBack={() => setCurrentStep('privacy')}
        showBackButton={true}
      />
    );
  }

  // Privacy Settings Step
  const ToggleSwitch = ({ isOn, onToggle }) => (
    <div
      className={`relative inline-flex h-6 w-11 md:h-[29.33px] md:w-[46.55px] items-center rounded-full transition-colors cursor-pointer ${
        isOn ? "bg-blue-500" : "bg-gray-300"
      }`}
      onClick={onToggle}
    >
      <span
        className={`inline-block h-4 w-4 md:h-5 md:w-5 transform rounded-full bg-white transition-transform ${
          isOn ? "translate-x-6 md:translate-x-[22px]" : "translate-x-1"
        }`}
      />
    </div>
  );

  const MobileSettingRow = ({ title, subtitle, description, setting, icon: Icon }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6 text-black" strokeWidth={2} />
          <div>
            <span className="font-['Lexend'] font-normal text-lg text-black block">
              {title}
            </span>
            {subtitle && (
              <span className="font-['Lexend'] font-normal text-xs text-[#1090CF]">
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <ToggleSwitch
          isOn={privacySettings[setting]}
          onToggle={() => handleToggle(setting)}
        />
      </div>
      <p className="text-[#58606C] font-['Lexend'] font-normal text-sm leading-6 pl-9">
        {description}
      </p>
    </div>
  );

  // Define settings based on user type
  const getSettings = () => {
    if (isSchoolOrCompany) {
      // For school/company, only show location setting
      return [
        {
          icon: MapPin,
          title: "Show Location",
          subtitle: "(highly recommended)",
          description: "📍 Allow others to see your general location on your profile or posts.",
          setting: "showLocation",
        }
      ];
    }

    // For alumni, show all settings
    return [
      {
        icon: User,
        title: "Private Account",
        description: "🔒 Only approved followers can see your posts and profile.",
        setting: "privateAccount",
      },
      {
        icon: MapPin,
        title: "Show Location",
        subtitle: "(highly recommended)",
        description: "📍 Allow others to see your general location on your profile or posts.",
        setting: "showLocation",
      },
      {
        icon: CreditCard,
        title: "Business card",
        description: "💼 Display your digital business card to others",
        setting: "businessCard",
      }
    ];
  };

  const settings = getSettings();
  const buttonText = isAlumni ? "Next" : "Save";
  const stepText = isAlumni ? "Step 1 of 2" : "Setup";

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[1080px] h-full max-h-[679.85px] bg-white rounded-lg md:rounded-[18.7361px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center pt-8 md:pt-0">
          <h1 className="text-black font-['Lexend'] font-medium text-xl md:text-2xl lg:text-[29.4424px] md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-8">
            Account Privacy
          </h1>
          <p className="text-[#58606C] font-['Lexend'] font-normal text-sm md:text-lg lg:text-[23.1754px] mt-4 px-4 md:px-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-32 md:w-[549px]">
            {isAlumni 
              ? `Manage what information you share with others. (${stepText})`
              : "Manage what information you share with others."
            }
          </p>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden px-6 pt-8 pb-20 space-y-8">
          {settings.map((setting, index) => (
            <MobileSettingRow key={index} {...setting} />
          ))}

          {/* Mobile Buttons */}
          <div className="flex flex-col gap-4 pt-4">
            {isAlumni && (
              <button
                className="w-full h-12 bg-[#0490CF] rounded-lg text-white font-['Lexend'] font-medium text-lg"
                onClick={handlePreviewClick}
              >
                Preview
              </button>
            )}
            <button
              className="w-full h-12 bg-[#0490CF] rounded-lg text-white font-['Lexend'] font-medium text-lg"
              onClick={handlePrivacyNext}
            >
              {buttonText}
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Dynamic settings rendering */}
          {settings.map((setting, index) => {
            const topPosition = 194.29 + (index * 113.52); // Spacing between settings
            const Icon = setting.icon;
            
            return (
              <div key={setting.setting}>
                {/* Setting Row */}
                <div className={`absolute left-[61.56px] flex items-center gap-[13.94px] w-[547.15px]`} style={{ top: `${topPosition}px` }}>
                  <Icon className="w-[30.99px] h-[30.99px] text-black" strokeWidth={2} />
                  <span className="font-['Lexend'] font-normal text-[23.1754px] text-black flex-1">
                    {setting.title}
                    {setting.subtitle && (
                      <span className="font-['Lexend'] font-normal text-[15px] text-[#1090CF] ml-2">
                        {setting.subtitle}
                      </span>
                    )}
                  </span>
                </div>
                
                {/* Toggle Switch */}
                <div className="absolute left-[971px]" style={{ top: `${topPosition + 21.35}px` }}>
                  <ToggleSwitch
                    isOn={privacySettings[setting.setting]}
                    onToggle={() => handleToggle(setting.setting)}
                  />
                </div>
                
                {/* Description */}
                <p 
                  className="absolute left-[106.49px] w-[500.1px] text-[#58606C] font-['Lexend'] font-normal text-[17.7736px] leading-[26px]"
                  style={{ top: `${topPosition + 28}px` }}
                >
                  {setting.description}
                </p>
              </div>
            );
          })}

          {/* Preview Button */}
          {isAlumni && (
            <button
              className="absolute left-[61.56px] top-[513.17px] w-[130.69px] h-[43.56px] bg-[#0490CF] rounded-[6.97003px] text-white font-['Lexend'] font-medium text-[22.3041px]"
              onClick={handlePreviewClick}
            >
              Preview
            </button>
          )}

          {/* Main Action Button */}
          <button
            className="absolute w-[144.54px] h-[56.21px] bg-[#0490CF] rounded-[14.3964px] text-white font-['Lexend'] font-medium text-[24.0892px]"
            style={{
              left: "calc(50% - 144.54px/2 + 406.17px)",
              top: "583.49px",
            }}
            onClick={handlePrivacyNext}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOnboardingModal;