// src/components/ui/LoadingSpinner.jsx

import React from "react";
import { colors } from "../../styles/tokens";

const LoadingSpinner = ({
  size = "medium",
  color = colors.primary.main,
  className = "",
}) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  };

  return (
    <div className={`inline-block ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-solid border-current border-r-transparent`}
        style={{
          color,
          borderTopColor: color,
          borderLeftColor: color,
          borderBottomColor: color,
        }}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
