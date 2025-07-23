// src/components/ui/ErrorMessage.jsx

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { colors, typography } from "../../styles/tokens";
import Button from "./Button";

const ErrorMessage = ({
  title = "Error",
  message,
  onRetry,
  showRetryButton = true,
  className = "",
}) => {
  return (
    <div
      className={`p-6 bg-red-50 border border-red-200 rounded-lg ${className}`}
      style={{ fontFamily: typography.fontFamily.primary }}
    >
      {/* Error Icon and Title */}
      <div className="flex items-center mb-3">
        <AlertCircle size={20} className="text-red-500 mr-2 flex-shrink-0" />
        <h3
          className="font-medium"
          style={{
            color: colors.text.primary,
            fontSize: typography.fontSize.heading,
          }}
        >
          {title}
        </h3>
      </div>

      {/* Error Message */}
      <p
        className="mb-4"
        style={{
          color: colors.text.secondary,
          fontSize: typography.fontSize.text,
          lineHeight: "1.5",
        }}
      >
        {message}
      </p>

      {/* Retry Button */}
      {showRetryButton && onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="small"
          className="inline-flex items-center"
        >
          <RefreshCw size={16} className="mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
};

export default ErrorMessage;
