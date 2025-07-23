// src/features/certificates/hooks/useCertificateModal.js

import { useState, useCallback } from "react";

export const useCertificateModal = () => {
  const [certificates, setCertificates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAddMore, setShowAddMore] = useState(false);

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
      name: file.name.replace(".pdf", ""), // Use filename as title
      file: file,
      size: formatFileSize(file.size),
      uploadDate: formatUploadDate(new Date()),
    };

    setCertificates((prev) => [...prev, newCertificate]);
    setError("");
    setShowAddMore(false); // Hide add more area after upload
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

  const openModal = useCallback(() => {
    setIsModalOpen(true);
    setError("");
    setShowAddMore(false);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setError("");
    setShowAddMore(false);
  }, []);

  const saveCertificates = useCallback(
    (onSave) => {
      if (typeof onSave === "function") {
        onSave(certificates);
      }
      closeModal();
    },
    [certificates, closeModal]
  );

  const clearAll = useCallback(() => {
    setCertificates([]);
    setError("");
    setShowAddMore(false);
  }, []);

  return {
    // State
    certificates,
    isModalOpen,
    dragOver,
    isLoading,
    error,
    showAddMore,

    // Actions
    addCertificate,
    removeCertificate,
    editCertificateName,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    toggleAddMore,
    openModal,
    closeModal,
    saveCertificates,
    clearAll,
  };
};
