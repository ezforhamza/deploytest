// src/services/upload/fileUploadService.js

import { API_CONFIG, ENDPOINTS } from "../api/config";

/**
 * File Upload Service
 * Handles file uploads to the dedicated file storage server
 */
class FileUploadService {
  constructor() {
    this.storageBaseURL = API_CONFIG.FILE_STORAGE_BASE_URL;
    this.fileStorageURL = API_CONFIG.FILE_STORAGE_URL;
    console.log("🔧 FileUploadService initialized:", {
      storageBaseURL: this.storageBaseURL,
      fileStorageURL: this.fileStorageURL
    });
  }

  /**
   * Upload file to storage server
   * @param {File} file - File to upload
   * @param {string} endpoint - Upload endpoint (e.g., '/uploads/image')
   * @param {string} fieldName - Form field name (default: 'file')
   * @returns {Promise<Object>} Upload response with filename
   */
  async uploadFile(file, endpoint, fieldName = "file") {
    if (!file) {
      throw new Error("No file provided");
    }

    const uploadURL = `${this.storageBaseURL}${endpoint}`;
    console.log("📤 Uploading file to:", uploadURL);

    const formData = new FormData();
    formData.append(fieldName, file);

    try {
      const response = await fetch(uploadURL, {
        method: "POST",
        body: formData,
      });

      console.log("📥 Upload response status:", response.status);

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("📥 Upload response data:", result);
      
      // Expected response format: { "data": { "image": "filename.png" } } or { "data": { "file": "filename.pdf" } }
      if (result.data) {
        const filename = result.data.image || result.data.file || result.data.document;
        
        if (!filename) {
          throw new Error("No filename returned from upload server");
        }
        
        const fullURL = `${API_CONFIG.FILE_STORAGE_URL}/${filename}`;
        console.log("🔗 Constructing fullURL:", { 
          filename, 
          fullURL, 
          FILE_STORAGE_URL: API_CONFIG.FILE_STORAGE_URL 
        });
        
        const uploadResult = {
          success: true,
          filename: filename,
          originalName: file.name,
          size: file.size,
          type: file.type,
          fullURL: fullURL,
        };
        
        console.log("📤 Final upload result:", uploadResult);
        return uploadResult;
      }

      throw new Error("Invalid response format from upload server");
    } catch (error) {
      console.error("File upload failed:", error);
      throw new Error(`File upload failed: ${error.message}`);
    }
  }

  /**
   * Upload profile image
   * @param {File} file - Image file
   * @returns {Promise<Object>} Upload response
   */
  async uploadImage(file) {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      throw new Error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      throw new Error("Image size must be less than 5MB");
    }

    return this.uploadFile(file, ENDPOINTS.UPLOADS.IMAGE, "image");
  }

  /**
   * Upload document (CV, certificates, etc.)
   * @param {File} file - Document file
   * @returns {Promise<Object>} Upload response
   */
  async uploadDocument(file) {
    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Please select a valid document file (PDF, DOC, DOCX, TXT)");
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new Error("Document size must be less than 10MB");
    }

    return this.uploadFile(file, ENDPOINTS.UPLOADS.DOCUMENT, "file");
  }

  /**
   * Validate file before upload
   * @param {File} file - File to validate
   * @param {string} type - File type (image, document)
   * @returns {Object} Validation result
   */
  validateFile(file, type = "document") {
    if (!file) {
      return { isValid: false, error: "No file selected" };
    }

    if (type === "image") {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        return {
          isValid: false,
          error: "Please select a valid image file (JPEG, PNG, GIF, WebP)",
        };
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        return {
          isValid: false,
          error: "Image size must be less than 5MB",
        };
      }
    } else if (type === "document") {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        return {
          isValid: false,
          error: "Please select a valid document file (PDF, DOC, DOCX, TXT)",
        };
      }

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        return {
          isValid: false,
          error: "Document size must be less than 10MB",
        };
      }
    }

    return { isValid: true };
  }

  /**
   * Format file size for display
   * @param {number} bytes - File size in bytes
   * @returns {string} Formatted file size
   */
  formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }
}

// Export singleton instance
export default new FileUploadService();