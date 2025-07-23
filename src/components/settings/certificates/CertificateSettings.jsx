import React, { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, Edit2, Check, X } from 'lucide-react';
import { colors, typography } from '../../../styles/tokens';
import { useAuthStore } from '../../../stores/useAuthStore';
import UploadIcon from '../../../features/certificates/components/UploadIcon';
import PdfIcon from '../../../features/certificates/components/PdfIcon';

const CertificateSettings = () => {
  const { user } = useAuthStore();
  const [certificates, setCertificates] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddMore, setShowAddMore] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');

  // Initialize certificates from user data
  useEffect(() => {
    if (user?.certificates?.length > 0) {
      const userCerts = user.certificates.map((cert, index) => ({
        id: cert.id || cert._id || Date.now() + index,
        name: cert.name || cert.title || `Certificate ${index + 1}`,
        file: cert.file || cert.url || cert.filename,
        size: cert.size || 'Unknown size',
        uploadDate: cert.uploadDate || cert.createdAt || new Date().toLocaleDateString(),
        url: cert.url || cert.filename || ''
      }));
      setCertificates(userCerts);
    }
  }, [user]);

  // File validation and formatting utilities
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + ' Kb';
    return Math.round(bytes / (1024 * 1024)) + ' MB';
  };

  const formatUploadDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const validateFile = (file) => {
    if (file.type !== 'application/pdf') {
      return 'Only PDF files are allowed';
    }
    if (file.size > 5 * 1024 * 1024) {
      return 'File size must be less than 5MB';
    }
    return null;
  };

  // Certificate management functions
  const addCertificate = useCallback((file) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return false;
    }

    const newCertificate = {
      id: Date.now() + Math.random(),
      name: file.name.replace('.pdf', ''),
      file: file,
      size: formatFileSize(file.size),
      uploadDate: formatUploadDate(new Date()),
    };

    setCertificates((prev) => [...prev, newCertificate]);
    setError('');
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

  // File upload handlers
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

  // Edit functionality
  const handleEditClick = (cert) => {
    setEditingId(cert.id);
    setEditingName(cert.name);
  };

  const handleEditSave = (certId) => {
    if (editingName.trim()) {
      editCertificateName(certId, editingName.trim());
    }
    setEditingId(null);
    setEditingName('');
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  const handleKeyPress = (e, certId) => {
    if (e.key === 'Enter') {
      handleEditSave(certId);
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const handleSave = () => {
    // TODO: Implement API call to save certificates
    console.log('Saving certificates:', certificates);
  };

  return (
    <div className="p-8" style={{ color: colors.text }}>
      <div className="space-y-6">
        {/* Upload Area or Certificate List */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          {certificates.length === 0 ? (
            /* Initial Upload Area */
            <div
              className={`relative border-2 border-dashed transition-colors w-full mb-6 ${
                dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              style={{
                borderRadius: '25.76px',
                minHeight: '200px',
                height: '252px',
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Upload Icon and Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <UploadIcon />
                  <span
                    className="font-normal"
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: '20px',
                      lineHeight: '1.3',
                      color: colors.dark,
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
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          ) : (
            /* Certificate List */
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg"
                  style={{
                    minHeight: '71px',
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
                            className="flex-1 px-2 py-1 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            style={{
                              fontFamily: typography.fontFamily.primary,
                              fontSize: '16px',
                              lineHeight: '1.3',
                            }}
                            autoFocus
                          />
                          <button
                            onClick={() => handleEditSave(cert.id)}
                            className="flex items-center justify-center hover:bg-green-100 rounded-full transition-colors p-1"
                            style={{
                              width: '28px',
                              height: '28px',
                            }}
                          >
                            <Check className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={handleEditCancel}
                            className="flex items-center justify-center hover:bg-red-100 rounded-full transition-colors p-1"
                            style={{
                              width: '28px',
                              height: '28px',
                            }}
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ) : (
                        <div
                          className="font-normal truncate"
                          style={{
                            fontFamily: typography.fontFamily.primary,
                            fontSize: '16px',
                            lineHeight: '1.3',
                            color: colors.dark,
                          }}
                        >
                          {cert.name}
                        </div>
                      )}
                    </div>

                    {/* File Info */}
                    <div className="flex gap-2">
                      <span
                        className="font-normal text-gray-500"
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: '14px',
                          lineHeight: '1.3',
                        }}
                      >
                        {cert.size}
                      </span>
                      <span
                        className="font-normal text-gray-500"
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: '14px',
                          lineHeight: '1.3',
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
                        width: '38px',
                        height: '38px',
                      }}
                    >
                      <Edit2 className="w-5 h-5" style={{ color: colors.primary }} />
                    </button>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeCertificate(cert.id)}
                      className="flex items-center justify-center hover:bg-red-100 rounded-full transition-colors"
                      style={{
                        width: '38px',
                        height: '38px',
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
                    dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  style={{
                    borderRadius: '25.76px',
                    minHeight: '160px',
                    height: '180px',
                  }}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {/* Upload Icon and Text */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center gap-4">
                      <UploadIcon />
                      <span
                        className="font-normal"
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: '20px',
                          lineHeight: '1.3',
                          color: colors.dark,
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
                    onChange={handleFileSelect}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              )}

              {/* Add More Button */}
              {!showAddMore && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setShowAddMore(true)}
                    className="font-medium hover:text-gray-600 transition-colors flex items-center gap-2"
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontSize: '18px',
                      lineHeight: typography.lineHeight.normal,
                      color: colors.dark,
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
            className="font-normal text-gray-500 mt-6"
            style={{
              fontFamily: typography.fontFamily.primary,
              fontSize: '16px',
              lineHeight: '1.25',
            }}
          >
            Upload files in PDF format up to 5 MB.
          </p>

          {/* Error Message */}
          {error && (
            <div
              className="font-normal text-red-500 mt-4"
              style={{
                fontFamily: typography.fontFamily.primary,
                fontSize: '14px',
              }}
            >
              {error}
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="px-6 py-3 rounded-lg text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: colors.primary, 
              fontFamily: typography.fontFamily.primary 
            }}
          >
            {isLoading ? 'Saving...' : 'Save Certificate Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateSettings;