import React, { useState } from "react";
import { X, Trash2, Video } from "lucide-react";
import { colors } from "../../styles/tokens";
import UploadIcon from "../../features/certificates/components/UploadIcon";
import Modal from "../ui/Modal";

// Job Application Modal Component

const JobApplicationModal = ({
  isOpen,
  onClose,
  onSubmit,
  jobTitle,
  companyName,
  isLoading = false,
}) => {
  const [cvFile, setCvFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const handleCvFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Please upload PDF files only");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setCvFile(file);
      setError("");
    }
  };

  const handleVideoFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        setError("Please upload video files only");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        setError("Video file size must be less than 50MB");
        return;
      }
      setVideoFile(file);
      setError("");
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.type !== "application/pdf") {
        setError("Please upload PDF files only");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }
      setCvFile(file);
      setError("");
    }
  };

  const handleSubmit = () => {
    if (!cvFile) {
      setError("Please upload your CV");
      return;
    }

    const applicationData = {
      cvFile,
      coverLetter,
      videoFile,
      jobTitle,
      companyName,
    };

    if (onSubmit) {
      onSubmit(applicationData);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl">
      <div
        className="relative bg-white rounded-2xl w-full max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: "663px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-center p-6 relative">
          <h1 className="font-lexend font-medium text-xl md:text-2xl text-black">
            Apply for Job
          </h1>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-6">
          {/* CV Upload Section */}
          <div className="space-y-4">
            {!cvFile ? (
              <div
                className={`relative border-2 border-dashed rounded-2xl transition-colors ${
                  dragOver ? "border-blue-400 bg-blue-50" : "border-[#9D97B5]"
                }`}
                style={{ minHeight: "170px" }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <UploadIcon className="mb-4" />
                  <span className="font-lexend font-normal text-sm md:text-base text-[#150B3D] text-center">
                    Upload CV
                  </span>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleCvFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="border-2 border-[#B6B6B6] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UploadIcon type="pdf" className="w-8 h-8" />
                  <div>
                    <p className="font-lexend font-medium text-[#150B3D] text-sm">
                      {cvFile.name}
                    </p>
                    <p className="font-lexend text-xs text-[#6F6F6F]">
                      {formatFileSize(cvFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCvFile(null)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-red-100 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Video Introduction Section */}
          <div className="space-y-2">
            {!videoFile ? (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Short video introduction (optional)"
                  readOnly
                  className="w-full p-4 border border-[#B6B6B6] rounded-lg font-lexend text-base placeholder-[#A4A4A4] focus:outline-none cursor-pointer"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <Video className="w-6 h-6 text-[#A4A4A4]" />
                </div>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileSelect}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="border border-[#B6B6B6] rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <Video
                      className="w-6 h-6"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <div>
                    <p className="font-lexend font-medium text-[#150B3D] text-sm">
                      {videoFile.name}
                    </p>
                    <p className="font-lexend text-xs text-[#6F6F6F]">
                      {formatFileSize(videoFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setVideoFile(null)}
                  className="w-8 h-8 flex items-center justify-center hover:bg-red-100 rounded-full transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Cover Letter Section */}
          <div className="space-y-2">
            <div className="border border-[#B6B6B6] rounded-lg p-4">
              <label className="block font-lexend text-base text-[#A4A4A4] mb-3">
                Cover letter (optional)
              </label>
              <textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="w-full h-32 resize-none font-lexend text-sm text-[#717171] placeholder-[#A4A4A4] focus:outline-none"
                placeholder="Write your cover letter here..."
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 font-lexend text-sm text-center">
              {error}
            </div>
          )}

          {/* Apply Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="text-white font-lexend font-semibold text-lg px-8 py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: colors.primary,
                minWidth: "180px",
              }}
            >
              {isLoading ? "Applying..." : "Apply now"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default JobApplicationModal;
