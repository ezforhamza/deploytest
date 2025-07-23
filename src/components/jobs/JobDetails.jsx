import { useState } from "react";
import { colors } from "../../styles/tokens";
import JobApplicationModal from "./JobApplicationModal";
import ApplicationDetail from "./ApplicationDetail";

const JobDetails = ({
  job,
  onClose,
  isCompanyView = false,
  onCloseJob = () => {},
  isCurrentJob = false,
  onProfileClick = () => {},
}) => {
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [viewMode, setViewMode] = useState("details"); // 'details', 'applicants', or 'application-detail'
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  if (!job) return "/crousal/onboarding-slide-1.png";

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const handleApplyClick = () => {
    setShowApplicationModal(true);
  };

  const handleCloseJobClick = () => {
    onCloseJob(job);
    console.log("Job closed:", job);
  };

  const handleApplicationSubmit = (applicationData) => {
    console.log("Application submitted:", applicationData);
    setShowApplicationModal(false);
    // Here you would typically send the data to your backend
  };

  // Sample applicants data
  const sampleApplicants = [
    {
      id: 1,
      name: "Katona Beatrix",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
      cv: {
        filename: "Katona_Beatrix_CV.pdf",
        size: "867 Kb",
        uploadDate: "14 Feb 2022 at 11:30 am",
        url: "/common/sample-pdf.pdf"
      },
      videoIntroduction: {
        title: "UI/UX Designer Introduction",
        size: "2.1 MB",
        uploadDate: "14 Feb 2022 at 11:30 am",
        url: "/common/sample-video.mp4"
      },
    },
    {
      id: 2,
      name: "Mitchell",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
      cv: {
        filename: "Mitchell_Resume.pdf",
        size: "1.2 MB",
        uploadDate: "15 Feb 2022 at 09:45 am",
        url: "/common/sample-pdf.pdf"
      },
      videoIntroduction: {
        title: "Software Developer Introduction",
        size: "3.5 MB",
        uploadDate: "15 Feb 2022 at 09:45 am",
        url: "/common/sample-video.mp4"
      },
    },
    {
      id: 3,
      name: "Veres Panna",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
      cv: {
        filename: "Veres_Panna_Portfolio.pdf",
        size: "956 Kb",
        uploadDate: "16 Feb 2022 at 02:15 pm",
        url: "/common/sample-pdf.pdf"
      },
      videoIntroduction: {
        title: "Product Manager Introduction",
        size: "2.8 MB",
        uploadDate: "16 Feb 2022 at 02:15 pm",
        url: "/common/sample-video.mp4"
      },
    },
    {
      id: 4,
      name: "Balázs Annamária",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
    },
    {
      id: 5,
      name: "László Cintia",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
    },
    {
      id: 6,
      name: "Philip",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
    },
    {
      id: 7,
      name: "Philip",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
    },
    {
      id: 8,
      name: "Takács Bianka",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
    },
    {
      id: 9,
      name: "Bruce",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
    },
    {
      id: 10,
      name: "Török Melinda",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
    },
    {
      id: 11,
      name: "Marvin",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: false,
    },
    {
      id: 12,
      name: "Nagy Tímea",
      avatar: "/crousal/onboarding-slide-1.png",
      isOnline: true,
    },
  ];

  const displayApplicants = job.applicants || sampleApplicants;

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <button
          onClick={() => {
            if (viewMode === "application-detail") {
              setViewMode("applicants");
              setSelectedApplicant(null);
            } else if (viewMode === "applicants") {
              setViewMode("details");
            } else {
              onClose();
            }
          }}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-900">
          {viewMode === "application-detail" 
            ? "Application Details" 
            : viewMode === "applicants" 
            ? "Applications" 
            : "Job Details"}
        </h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {viewMode === "application-detail" ? (
          /* Application Detail View */
          <ApplicationDetail 
            applicant={selectedApplicant}
            onBack={() => {
              setViewMode("applicants");
              setSelectedApplicant(null);
            }}
            onProfileClick={onProfileClick}
          />
        ) : viewMode === "applicants" ? (
          /* Applicants View */
          <div className="space-y-4">
            {displayApplicants.map((applicant) => (
              <div
                key={applicant.id}
                className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-gray-100"
                onClick={() => {
                  setSelectedApplicant(applicant);
                  setViewMode("application-detail");
                }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                    {applicant.avatar ? (
                      <img
                        src={applicant.avatar}
                        alt={`${applicant.name} avatar`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white font-lexend font-medium text-lg">
                        {applicant.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>

                  {/* Online Status Indicator */}
                  {applicant.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-2 h-2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-lexend font-medium text-base text-black truncate">
                    {applicant.name}
                  </h3>
                </div>

                {/* Action Button */}
                <button className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="9,18 15,12 9,6"></polyline>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        ) : (
          /* Job Details View */
          <>
            {/* Company Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                  {job.companyLogo ? (
                    <img
                      src={job.companyLogo}
                      alt={`${job.companyName} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-2xl font-bold">
                      {job.companyName.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {job.companyName}
                  </h2>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="mr-1"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Lahore pakistan
                  </div>
                </div>
              </div>
              {isCompanyView ? (
                isCurrentJob && (
                  <button
                    onClick={handleCloseJobClick}
                    className="text-white px-8 py-3 rounded-lg font-medium transition-colors bg-red-600 hover:bg-red-700"
                    onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.target.style.opacity = "1")}
                  >
                    Close Job
                  </button>
                )
              ) : (
                <button
                  onClick={handleApplyClick}
                  className="text-white px-8 py-3 rounded-lg font-medium transition-colors"
                  style={{
                    backgroundColor: colors.primary,
                    "&:hover": {
                      backgroundColor: colors.primaryRgb
                        ? `rgb(${colors.primaryRgb})`
                        : colors.primary,
                    },
                  }}
                  onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.target.style.opacity = "1")}
                >
                  Apply now
                </button>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="bg-blue-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                {job.workType.includes("Remote")
                  ? "🌍"
                  : job.workType.includes("Hybrid")
                  ? "🏢"
                  : "🏢"}{" "}
                {job.workType.replace(/🌍|🏢/gu, "").trim()}
              </span>
              <span className="bg-blue-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                📄 {job.jobType.replace(/👔|⏰|📝/gu, "").trim()}
              </span>
              <span className="bg-blue-50 text-gray-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                🧠 {job.level.replace(/🚀|🧠|🌱|📌/gu, "").trim()}
              </span>
            </div>

            {/* Analytics Section - Only for Company View */}
            {isCompanyView && (
              <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <h3 className="font-lexend font-medium text-xl leading-[150%] text-black">
                    Analytics
                  </h3>
                </div>
                <button
                  onClick={() => setViewMode("applicants")}
                  className="flex items-center justify-between w-full hover:bg-gray-100 rounded-lg p-2 -m-2 transition-colors"
                >
                  <div>
                    <h4 className="font-lexend font-normal text-base leading-[150%] text-black mb-1">
                      Applications
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-lexend font-normal text-sm leading-[150%] text-black">
                      {job.applicationCount || 20}
                    </span>
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.26"
                      className="transform rotate-90"
                    >
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              </div>
            )}

            {/* Job Details */}
            <div>
              {/* Job Title */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Job Title:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  {job.jobTitle}
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Description:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  We are looking for a passionate and skilled Software Developer
                  to join our growing team. In this role, you will be
                  responsible for designing, developing, and maintaining
                  high-quality software applications. You'll collaborate with
                  cross-functional teams to deliver innovative digital solutions
                  that meet business and user needs.
                </p>
              </div>

              {/* Contract Type */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Contract type:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  {job.duration}
                </p>
              </div>

              {/* Job Category */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Job category:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  {job.jobTitle.toLowerCase().includes("design") ||
                  job.jobTitle.toLowerCase().includes("ui") ||
                  job.jobTitle.toLowerCase().includes("ux")
                    ? "Design"
                    : "Development"}
                </p>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Experience:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  {job.level.includes("Senior")
                    ? "Senior"
                    : job.level.includes("Mid")
                    ? "Mid-level"
                    : "Junior"}
                </p>
              </div>

              {/* Publication Date */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Publication date:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  {formatDate(job.datePosted)}
                </p>
              </div>

              {/* Salary */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Salary:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  {job.salary} per month
                </p>
              </div>

              {/* Perks */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Perks:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  Meal vouchers
                </p>
              </div>

              {/* Language */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Language:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  English
                </p>
              </div>

              {/* Desired Start Date */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-500 text-lg">💼</span>
                  <h3 className="font-lexend font-medium text-base sm:text-lg tracking-wide text-[#242424] opacity-90">
                    Desired start date:
                  </h3>
                </div>
                <p className="font-lexend font-normal text-sm sm:text-base leading-4 tracking-wide text-[#717171] opacity-90 ml-7">
                  20/04/25
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Job Application Modal */}
      <JobApplicationModal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        onSubmit={handleApplicationSubmit}
        jobTitle={job.jobTitle}
        companyName={job.companyName}
      />
    </div>
  );
};

export default JobDetails;
