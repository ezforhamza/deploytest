// src/components/ui/Modal.jsx

import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  showBackdrop = true,
  ...props
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const backdropStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
    zIndex: 10000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
    overflowY: "auto",
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && showBackdrop) {
      onClose();
    }
  };

  return createPortal(
    <div style={backdropStyle} onClick={handleBackdropClick}>
      <div className={`modal-content w-full max-w-lg mx-auto my-8 ${className}`} {...props}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
