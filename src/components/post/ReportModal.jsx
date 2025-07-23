// src/components/post/ReportModal.jsx

import React, { useState } from "react";
import { colors, typography } from "../../styles/tokens";
import Modal from "../ui/Modal";

const ReportModal = ({ isOpen, onClose, onReport, post }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const reportReasons = [
    { id: "fake-account", label: "Fake Account" },
    { id: "hateful-speech", label: "Hateful speech" },
    { id: "spam", label: "Spam" },
    { id: "misinformation", label: "Misinformation" },
    { id: "self-harm", label: "self-harm" },
  ];

  const handleReasonSelect = (reasonId) => {
    setSelectedReason(reasonId);
  };

  const handleReport = () => {
    if (selectedReason) {
      setShowConfirmation(true);
    }
  };

  const handleConfirmReport = () => {
    onReport(selectedReason);
    setShowConfirmation(false);
    setSelectedReason("");
    onClose();
  };

  const handleBackToReasons = () => {
    setShowConfirmation(false);
  };

  const handleCloseModal = () => {
    setShowConfirmation(false);
    setSelectedReason("");
    onClose();
  };

  if (showConfirmation) {
    return (
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div className="bg-white rounded-lg w-[554px] max-w-[90vw] mx-auto flex flex-col sm:max-w-[90vw]" style={{ minWidth: '400px' }}>
          {/* Header */}
          <div className="flex items-center justify-between p-6">
            <button
              onClick={handleBackToReasons}
              className="text-gray-500 hover:text-gray-700"
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
            <div className="flex-1"></div>
            <button
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-col items-center px-6 pb-8">
            {/* Flag Icon */}
            <div className="mb-8">
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                className="text-blue-500"
              >
                <path
                  d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <line
                  x1="4"
                  y1="22"
                  x2="4"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>

            {/* Title */}
            <h2
              className="text-2xl font-medium text-black mb-4 text-center"
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: "24px",
                fontWeight: 500,
              }}
            >
              Report?
            </h2>

            {/* Description */}
            <p
              className="text-gray-500 text-center mb-8 leading-relaxed px-4"
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: "16px",
                lineHeight: "1.5",
              }}
            >
              Do you really want to Report this Post?
            </p>
          </div>

          {/* Report Button */}
          <div className="p-6">
            <button
              onClick={handleConfirmReport}
              className="w-full py-4 rounded-lg font-medium text-white transition-colors"
              style={{
                backgroundColor: colors.primary,
                fontFamily: typography.fontFamily.primary,
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              Report
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <div className="bg-white rounded-lg w-[554px] max-w-[90vw] mx-auto flex flex-col sm:max-w-[90vw]" style={{ minWidth: '400px' }}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2
            className="text-2xl font-medium text-center flex-1"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            Report
          </h2>
          <button
            onClick={handleCloseModal}
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Report Reasons */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {reportReasons.map((reason) => (
              <ReportOption
                key={reason.id}
                reason={reason}
                isSelected={selectedReason === reason.id}
                onSelect={() => handleReasonSelect(reason.id)}
              />
            ))}
          </div>
        </div>

        {/* Report Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={handleReport}
            disabled={!selectedReason}
            className={`w-full py-4 rounded-lg font-medium text-white transition-colors ${
              selectedReason ? "hover:bg-blue-600" : "cursor-not-allowed"
            }`}
            style={{
              backgroundColor: selectedReason ? colors.primary : "#E5E5E5",
              fontFamily: typography.fontFamily.primary,
              fontSize: "16px",
              fontWeight: 500,
            }}
          >
            Report
          </button>
        </div>
      </div>
    </Modal>
  );
};

const ReportOption = ({ reason, isSelected, onSelect }) => {
  return (
    <div
      className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
      onClick={onSelect}
    >
      {/* Radio Button */}
      <div className="relative">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            isSelected ? "border-blue-500" : "border-gray-300"
          }`}
        >
          {isSelected && (
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors.primary }}
            />
          )}
        </div>
      </div>

      {/* Label */}
      <span
        className={`text-lg ${isSelected ? "text-black" : "text-gray-500"}`}
        style={{
          fontFamily: typography.fontFamily.primary,
          fontSize: "18px",
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {reason.label}
      </span>
    </div>
  );
};

export default ReportModal;
