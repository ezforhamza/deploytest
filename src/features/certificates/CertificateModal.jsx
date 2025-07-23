// src/features/certificates/CertificateModal.jsx

import React, { useState } from "react";
import { ArrowLeft, Trash2, Plus, Edit2, Check, X } from "lucide-react";
import { typography } from "../../styles/tokens";
import UploadIcon from "./components/UploadIcon";
import PdfIcon from "./components/PdfIcon";

const CertificateModal = ({
  isOpen,
  onClose,
  onSave,
  certificates = [],
  dragOver = false,
  isLoading = false,
  error = "",
  onRemoveCertificate,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  showAddMore = false,
  onToggleAddMore,
  onEditCertificateName, // New prop for handling name changes
  onBack, // New prop for back button functionality
  showBackButton = false, // New prop to control back button visibility
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const handleFileInputChange = (e) => {
    if (onFileSelect) {
      onFileSelect(e);
    }
  };

  const handleAddMoreClick = () => {
    if (onToggleAddMore) {
      onToggleAddMore(true);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(certificates);
    }
    onClose();
  };

  const handleEditClick = (cert) => {
    setEditingId(cert.id);
    setEditingName(cert.name);
  };

  const handleEditSave = (certId) => {
    if (onEditCertificateName && editingName.trim()) {
      onEditCertificateName(certId, editingName.trim());
    }
    setEditingId(null);
    setEditingName("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleKeyPress = (e, certId) => {
    if (e.key === "Enter") {
      handleEditSave(certId);
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-lg overflow-hidden w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{
          borderRadius: "14px",
          maxWidth: "1080px",
          minHeight: "600px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:px-16 md:py-8 border-b border-gray-100">
          {/* Back Button */}
          <button
            onClick={showBackButton && onBack ? onBack : onClose}
            className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="text-black w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Title */}
          <h1
            className="text-center font-medium text-black"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "clamp(20px, 4vw, 29.44px)",
              lineHeight: typography.lineHeight.normal,
            }}
          >
            Certificate
          </h1>

          {/* Skip Button */}
          <button
            onClick={onClose}
            className="font-medium text-[#0490CF] hover:text-[#0490CF]/80 transition-colors"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "clamp(16px, 3vw, 24px)",
              lineHeight: typography.lineHeight.normal,
            }}
          >
            Skip
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-16">
          {/* Upload Area or Certificate List */}
          {certificates.length === 0 ? (
            /* Initial Upload Area */
            <div
              className={`relative border-2 border-dashed transition-colors w-full mb-6 ${
                dragOver ? "border-[#0490CF] bg-blue-50" : "border-[#9D97B5]"
              }`}
              style={{
                borderRadius: "25.76px",
                minHeight: "200px",
                height: "clamp(200px, 30vh, 252px)",
              }}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
            >
              {/* Upload Icon and Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <UploadIcon />
                  <span
                    className="font-normal text-[#150A33]"
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: "clamp(16px, 2.5vw, 20.61px)",
                      lineHeight: "1.3",
                    }}
                  >
                    Upload Images/PDFs
                  </span>
                </div>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileInputChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          ) : (
            /* Certificate List */
            <div className="space-y-4 md:space-y-6">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-4 p-4 md:p-0 border border-gray-100 rounded-lg md:border-0 md:rounded-none"
                  style={{
                    minHeight: "71px",
                  }}
                >
                  {/* PDF Icon */}
                  <div className="flex-shrink-0">
                    <PdfIcon />
                  </div>

                  {/* Certificate Details */}
                  <div className="flex-1 min-w-0">
                    {/* Certificate Name - Editable */}
                    <div className="mb-1">
                      {editingId === cert.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingName}
                            onChange={(e) => setEditingName(e.target.value)}
                            onKeyDown={(e) => handleKeyPress(e, cert.id)}
                            className="flex-1 px-2 py-1 border border-[#0490CF] rounded-md focus:outline-none focus:ring-2 focus:ring-[#0490CF]/20"
                            style={{
                              fontFamily: typography.fontFamily.primary,
                              fontSize: "clamp(16px, 2.5vw, 19.36px)",
                              lineHeight: "1.3",
                            }}
                            autoFocus
                          />
                          <button
                            onClick={() => handleEditSave(cert.id)}
                            className="flex items-center justify-center hover:bg-green-100 rounded-full transition-colors p-1"
                            style={{
                              width: "28px",
                              height: "28px",
                            }}
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="flex items-center justify-center hover:bg-red-100 rounded-full transition-colors p-1"
                            style={{
                              width: "28px",
                              height: "28px",
                            }}
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="font-normal text-[#150B3D] truncate"
                          style={{
                            fontFamily: typography.fontFamily.primary,
                            fontSize: "clamp(16px, 2.5vw, 19.36px)",
                            lineHeight: "1.3",
                          }}
                        >
                          {cert.name}
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex gap-2">
                      <span
                        className="font-normal text-[#6F6F6F]"
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: "clamp(14px, 2vw, 19.36px)",
                          lineHeight: "1.3",
                        }}
                      >
                        {cert.size}
                      </span>
                      <span
                        className="font-normal text-[#6F6F6F]"
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: "clamp(14px, 2vw, 19.36px)",
                          lineHeight: "1.3",
                        }}
                      >
                        {cert.uploadDate}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Edit Button */}
                    <button
                      onClick={() => handleEditClick(cert)}
                      className="flex items-center justify-center hover:bg-blue-100 rounded-full transition-colors"
                      style={{
                        width: "38.73px",
                        height: "38.73px",
                      }}
                    >
                      <Edit2 className="w-5 h-5 text-[#0490CF]" />
                    </button>

                    {/* Remove Button */}
                    <button
                      onClick={() =>
                        onRemoveCertificate && onRemoveCertificate(cert.id)
                      }
                      className="flex items-center justify-center hover:bg-red-100 rounded-full transition-colors"
                      style={{
                        width: "38.73px",
                        height: "38.73px",
                      }}
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add More Upload Area */}
              {showAddMore && (
                <div
                  className={`relative border-2 border-dashed transition-colors w-full ${
                    dragOver
                      ? "border-[#0490CF] bg-blue-50"
                      : "border-[#9D97B5]"
                  }`}
                  style={{
                    borderRadius: "25.76px",
                    minHeight: "160px",
                    height: "180px",
                  }}
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                >
                  {/* Upload Icon and Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <UploadIcon />
                      <span
                        className="font-normal text-[#150A33]"
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: "clamp(16px, 2.5vw, 20.61px)",
                          lineHeight: "1.3",
                        }}
                      >
                        Upload Images/PDFs
                      </span>
                    </div>
                  </div>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileInputChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}

              {/* Add More Button */}
              {!showAddMore && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleAddMoreClick}
                    className="font-medium text-black hover:text-gray-600 transition-colors flex items-center gap-2"
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: "clamp(16px, 2.5vw, 20px)",
                      lineHeight: typography.lineHeight.normal,
                    }}
                  >
                    <Plus className="w-5 h-5" />
                    Add more
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Upload Instructions */}
          <p
            className="font-normal text-[#585858] mt-6 text-center md:text-left"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "clamp(14px, 2vw, 20px)",
              lineHeight: "1.25",
            }}
          >
            Upload files in PDF format up to 5 MB.
          </p>

          {/* Error Message */}
          {error && (
            <div
              className="font-normal text-red-500 mt-4 text-center md:text-left"
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: "clamp(14px, 2vw, 16px)",
              }}
            >
              {error}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="p-6 md:p-16 pt-0 md:pt-0 flex justify-center md:justify-end">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-[#0490CF] text-white font-medium rounded-lg hover:bg-[#0490CF]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center w-full md:w-auto px-8 py-3"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: "clamp(16px, 2.5vw, 24.09px)",
              lineHeight: typography.lineHeight.normal,
              borderRadius: "14.40px",
              minWidth: "144px",
              minHeight: "56px",
            }}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
