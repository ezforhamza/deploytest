// src/features/certificates/CertificateExample.jsx

import React from "react";
import CertificateModal from "./CertificateModal";
import { useCertificateModal } from "./hooks/useCertificateModal";

const CertificateExample = () => {
  const {
    certificates,
    isModalOpen,
    dragOver,
    isLoading,
    error,
    showAddMore,
    removeCertificate,
    editCertificateName,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    toggleAddMore,
    openModal,
    closeModal,
  } = useCertificateModal();

  const handleSave = (certificateList) => {
    console.log("Saved certificates:", certificateList);
    // Here you would typically send the data to your backend
    // or update your application state
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Certificate Management</h1>

      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Add Certificates
      </button>

      {certificates.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Current Certificates:</h2>
          <div className="space-y-2">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded"
              >
                <div>
                  <span className="font-medium">{cert.name}</span>
                  <span className="text-gray-500 ml-2">({cert.size})</span>
                </div>
                <span className="text-sm text-gray-400">{cert.uploadDate}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <CertificateModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        certificates={certificates}
        dragOver={dragOver}
        isLoading={isLoading}
        error={error}
        showAddMore={showAddMore}
        onRemoveCertificate={removeCertificate}
        onEditCertificateName={editCertificateName}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onFileSelect={handleFileSelect}
        onToggleAddMore={toggleAddMore}
      />
    </div>
  );
};

export default CertificateExample;
