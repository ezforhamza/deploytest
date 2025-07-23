// src/hooks/useFileUpload.js

import { useState } from "react";
import fileUploadService from "../services/upload/fileUploadService";

/**
 * Custom hook for file upload operations
 * Handles document and image uploads with progress tracking
 */
export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  /**
   * Clear error state
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Clear upload state
   */
  const clearUpload = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setError(null);
  };

  /**
   * Upload document file
   * @param {File} file - Document file to upload
   * @param {string} type - Document type (cv, certificate, etc.)
   * @returns {Promise<Object>} Upload result
   */
  const uploadDocument = async (file, type = "document") => {
    if (!file) {
      setError("Please select a file to upload");
      return { success: false, error: "No file selected" };
    }

    // Validate file using the file upload service
    const validation = fileUploadService.validateFile(file, "document");
    if (!validation.isValid) {
      setError(validation.error);
      return { success: false, error: validation.error };
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const result = await fileUploadService.uploadDocument(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success) {
        setUploadedFile({
          name: result.originalName,
          filename: result.filename,
          type: result.type,
          size: result.size,
          uploadType: type,
        });

        return {
          success: true,
          filename: result.filename,
          originalName: result.originalName,
          fullURL: result.fullURL,
          message: "Document uploaded successfully!",
        };
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || "Document upload failed. Please try again.";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Upload profile image
   * @param {File} file - Image file to upload
   * @returns {Promise<Object>} Upload result
   */
  const uploadProfileImage = async (file) => {
    if (!file) {
      setError("Please select an image to upload");
      return { success: false, error: "No file selected" };
    }

    // Validate file using the file upload service
    const validation = fileUploadService.validateFile(file, "image");
    if (!validation.isValid) {
      setError(validation.error);
      return { success: false, error: validation.error };
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 200);

      const result = await fileUploadService.uploadImage(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (result.success) {
        setUploadedFile({
          name: result.originalName,
          filename: result.filename,
          type: result.type,
          size: result.size,
          uploadType: "image",
        });

        return {
          success: true,
          filename: result.filename,
          originalName: result.originalName,
          fullURL: result.fullURL,
          message: "Profile image uploaded successfully!",
        };
      }

      return result;
    } catch (err) {
      const errorMessage = err.message || "Image upload failed. Please try again.";
      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsUploading(false);
    }
  };

  /**
   * Delete uploaded file (remove from state)
   * @returns {Object} Deletion result
   */
  const deleteFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setError(null);

    return {
      success: true,
      message: "File removed successfully",
    };
  };

  /**
   * Validate file before upload
   * @param {File} file - File to validate
   * @param {string} type - File type (document, image)
   * @returns {Object} Validation result
   */
  const validateFile = (file, type = "document") => {
    return fileUploadService.validateFile(file, type);
  };

  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted file size
   */
  const formatFileSize = (bytes) => {
    return fileUploadService.formatFileSize(bytes);
  };

  return {
    // State
    isUploading,
    uploadProgress,
    error,
    uploadedFile,

    // Actions
    uploadDocument,
    uploadProfileImage,
    deleteFile,
    validateFile,
    formatFileSize,
    clearError,
    clearUpload,
  };
};