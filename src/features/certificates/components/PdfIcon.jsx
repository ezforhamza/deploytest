// src/features/certificates/components/PdfIcon.jsx

import React from "react";

const PdfIcon = ({ className = "" }) => {
  return (
    <div
      className={`relative bg-[#FF4444] rounded-lg flex items-center justify-center ${className}`}
      style={{
        width: "71px",
        height: "71px",
      }}
    >
      {/* PDF Text */}
      <span
        className="absolute text-white font-['Lexend'] font-bold text-center"
        style={{
          fontSize: "14px",
          lineHeight: "1",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        PDF
      </span>

      {/* Optional: You can add a document icon background */}
      <div className="absolute inset-2 border border-white/20 rounded-sm" />
    </div>
  );
};

export default PdfIcon;
