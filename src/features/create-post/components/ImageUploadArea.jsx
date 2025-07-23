// src/features/create-post/components/ImageUploadArea.jsx

import React from "react";

const ImageUploadArea = ({
  uploadedImages,
  onImageUpload,
  onRemoveImage,
  fileInputRef
}) => {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      // Create a synthetic event for the upload handler
      onImageUpload({ target: { files } });
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Upload Icon Component
  const UploadIcon = () => (
    <div className="w-[30px] h-[30px] flex items-center justify-center">
      <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
        {/* Image frame */}
        <rect 
          x="1" 
          y="5" 
          width="24" 
          height="16" 
          rx="1" 
          fill="none" 
          stroke="#524B6B" 
          strokeWidth="2"
        />
        {/* Mountain/landscape line */}
        <path 
          d="M6 15L10 11L14 15L20 9L25 14" 
          stroke="#524B6B" 
          strokeWidth="2" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        {/* Sun/circle */}
        <circle 
          cx="19" 
          cy="9" 
          r="2" 
          fill="none" 
          stroke="#524B6B" 
          strokeWidth="2"
        />
        {/* Upload arrow */}
        <path 
          d="M13 1L13 7M13 1L10 4M13 1L16 4" 
          stroke="#524B6B" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  return (
    <div className="mt-6">
      {/* Upload Area */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative w-full h-[170px] border-2 border-dashed border-[#9D97B5] rounded-[18px] flex flex-col items-center justify-center cursor-pointer hover:border-[#7C75A3] transition-colors duration-200 bg-gray-50 hover:bg-gray-100"
      >
        <UploadIcon />
        <p className="mt-4 font-lexend text-[15px] text-[#150B3D]">
          Upload Image
        </p>
        <p className="mt-1 font-lexend text-xs text-[#58606C]">
          Click or drag images here
        </p>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={onImageUpload}
        className="hidden"
      />

      {/* Uploaded Images Preview */}
      {uploadedImages.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {uploadedImages.map((image) => (
            <div key={image.id} className="relative group">
              <img
                src={image.url}
                alt={image.name}
                className="w-[88px] h-[88px] rounded-[5px] object-cover border border-gray-200"
              />
              
              {/* Remove Button */}
              <button
                onClick={() => onRemoveImage(image.id)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-white rounded-full border border-gray-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-50 hover:border-red-300"
              >
                <svg 
                  width="12" 
                  height="12" 
                  viewBox="0 0 12 12" 
                  fill="none"
                  className="w-3 h-3"
                >
                  <path 
                    d="M9 3L3 9M3 3L9 9" 
                    stroke="#666" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploadArea;