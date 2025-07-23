// src/components/ui/ComingSoon.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Code } from "lucide-react";
import Button from "./Button";
import { H1, Text } from "./Typography";
import { colors } from "../../styles/tokens";

const ComingSoon = ({ 
  title = "Coming Soon", 
  message = "This page is yet to be implemented", 
  showBackButton = true,
  backPath = "/" 
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (backPath === "back") {
      navigate(-1); // Go back to previous page
    } else {
      navigate(backPath);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div 
            className="p-6 rounded-full shadow-lg"
            style={{ backgroundColor: colors.primary + "20" }}
          >
            <Clock 
              size={48} 
              style={{ color: colors.primary }}
            />
          </div>
        </div>

        {/* Title */}
        <H1 className="mb-4" style={{ color: colors.text.primary }}>
          {title}
        </H1>

        {/* Message */}
        <Text 
          size="large" 
          color="muted" 
          className="mb-8 leading-relaxed"
        >
          {message}
        </Text>

        {/* Development Status */}
        <div 
          className="p-4 rounded-lg mb-8 border-l-4"
          style={{ 
            backgroundColor: colors.warning + "10",
            borderLeftColor: colors.warning 
          }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Code size={20} style={{ color: colors.warning }} />
            <Text 
              weight="medium" 
              style={{ color: colors.warning }}
            >
              In Development
            </Text>
          </div>
          <Text 
            size="small" 
            color="muted"
          >
            Our team is working hard to bring you this feature
          </Text>
        </div>

        {/* Back Button */}
        {showBackButton && (
          <Button
            variant="outline"
            onClick={handleGoBack}
            className="inline-flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>
        )}

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <Text size="small" color="muted">
            Thank you for your patience!
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;