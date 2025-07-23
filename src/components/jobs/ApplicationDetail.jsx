import { useState } from "react";
import { colors } from "../../styles/tokens";
import { PDFViewer, VideoViewer } from "../file-viewers";

const ApplicationDetail = ({ applicant, onProfileClick }) => {
  // State for file viewers (must be called before any early returns)
  const [isPDFViewerOpen, setIsPDFViewerOpen] = useState(false);
  const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false);

  if (!applicant) return null;

  // Application data with fallback for file information
  const applicationData = {
    ...applicant,
    coverLetter:
      "Lorem ipsum dolor sit amet consectetur. Sed integer vulputate eget tristique at pellentesque etiam. Lectus nulla est eget phasellus. Libero a sem morbi id aliquam. Sed arcu ut nibh mauris sit massa malesuada sollicitudin elementum. Odio sagittis egestas egestas sit. Euismod tempus dictum in nunc facilisi. Curabitur fames morbi et.",
    videoIntroduction: applicant.videoIntroduction || {
      title: "Video Introduction",
      size: "2.1 MB",
      uploadDate: "14 Feb 2022 at 11:30 am",
      url: "/common/sample-video.mp4",
    },
    cv: applicant.cv || {
      filename: "Resume.pdf",
      size: "867 Kb",
      uploadDate: "14 Feb 2022 at 11:30 am",
      url: "/common/sample-pdf.pdf",
    },
    location: "Lahore Pakistan",
  };

  const handleViewVideo = () => {
    setIsVideoViewerOpen(true);
  };

  const handleViewCV = () => {
    setIsPDFViewerOpen(true);
  };

  const handleClosePDFViewer = () => {
    setIsPDFViewerOpen(false);
  };

  const handleCloseVideoViewer = () => {
    setIsVideoViewerOpen(false);
  };

  return (
    <div className="w-full h-full flex flex-col -m-6">
      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Section */}
        <div className="flex flex-col items-center pt-8 pb-6 px-6">
          {/* Avatar */}
          <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden mb-4">
            {applicationData.avatar ? (
              <img
                src={applicationData.avatar}
                alt={`${applicationData.name} avatar`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white font-lexend font-bold text-4xl">
                {applicationData.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>

          {/* Name */}
          <h2
            className="font-lexend font-bold text-xl text-black mb-2 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onProfileClick && onProfileClick(applicant)}
          >
            {applicationData.name}
          </h2>

          {/* Location */}
          <div className="flex items-center text-gray-500 text-base">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mr-2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {applicationData.location}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mx-6 mb-8"></div>

        {/* Application Content */}
        <div className="px-6 pb-6 space-y-8">
          {/* Cover Letter */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-500 text-lg">🔹</span>
              <h3 className="font-lexend font-medium text-base text-gray-800">
                Cover letter:
              </h3>
            </div>
            <div className="ml-6">
              <p className="font-lexend font-normal text-sm leading-5 text-gray-600 opacity-90">
                {applicationData.coverLetter}
              </p>
            </div>
          </div>

          {/* Short Video Introduction */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-500 text-lg">🔹</span>
              <h3 className="font-lexend font-medium text-base text-gray-800">
                Short video introduction:
              </h3>
            </div>
            <div className="ml-6">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                {/* Video Icon */}
                <div className="w-14 h-14 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                  >
                    <path d="M23 7l-7 5 7 5V7z" fill="currentColor" />
                    <rect
                      x="1"
                      y="5"
                      width="15"
                      height="14"
                      rx="2"
                      ry="2"
                      fill="currentColor"
                    />
                  </svg>
                </div>

                {/* Video Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-lexend font-normal text-sm text-black truncate mb-1">
                    {applicationData.videoIntroduction.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 gap-2">
                    <span>{applicationData.videoIntroduction.size}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{applicationData.videoIntroduction.uploadDate}</span>
                  </div>
                </div>

                {/* View Button */}
                <button
                  onClick={handleViewVideo}
                  className="text-white text-xs px-4 py-2 rounded-full font-bold transition-colors"
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
                  View
                </button>
              </div>
            </div>
          </div>

          {/* CV */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-blue-500 text-lg">🔹</span>
              <h3 className="font-lexend font-medium text-base text-gray-800">
                CV:
              </h3>
            </div>
            <div className="ml-6">
              <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                {/* PDF Icon */}
                <div className="w-14 h-14 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 bg-red-300 transform rotate-45 translate-x-2 -translate-y-2"></div>
                  <span className="text-white font-bold text-xs relative z-10">
                    PDF
                  </span>
                </div>

                {/* CV Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-lexend font-normal text-sm text-black truncate mb-1">
                    {applicationData.cv.filename}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 gap-2">
                    <span>{applicationData.cv.size}</span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <span>{applicationData.cv.uploadDate}</span>
                  </div>
                </div>

                {/* View Button */}
                <button
                  onClick={handleViewCV}
                  className="text-white text-xs px-4 py-2 rounded-full font-bold transition-colors"
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
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Bottom Handle */}
      <div className="flex justify-center py-4">
        <div className="w-36 h-1 bg-gray-800 rounded-full"></div>
      </div>

      {/* File Viewers */}
      <PDFViewer
        isOpen={isPDFViewerOpen}
        onClose={handleClosePDFViewer}
        pdfUrl={applicationData.cv.url}
        fileName={applicationData.cv.filename}
      />

      <VideoViewer
        isOpen={isVideoViewerOpen}
        onClose={handleCloseVideoViewer}
        videoUrl={applicationData.videoIntroduction.url}
        fileName={applicationData.videoIntroduction.title}
      />
    </div>
  );
};

export default ApplicationDetail;
