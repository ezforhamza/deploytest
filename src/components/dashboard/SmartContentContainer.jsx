// src/components/dashboard/SmartContentContainer.jsx

import React, { Suspense } from 'react';
import { useContent } from '../../contexts/ContentContext';
import { getContentComponent, hasSmartContent } from '../../config/contentRegistry';
import LoadingSpinner from '../ui/LoadingSpinner';

/**
 * Smart Content Container - Handles dynamic content switching
 * Falls back to original behavior if smart content is not available/enabled
 */
const SmartContentContainer = ({ 
  navigation,
  userRole,
  originalComponent: OriginalComponent = null,
  fallbackProps = {},
  loadingComponent: LoadingComponent = LoadingSpinner,
  ...additionalProps 
}) => {
  const { 
    contentStates, 
    contentData, 
    isSmartContentEnabled,
    setContentState,
    setContentData,
    navigateBack,
    canGoBack 
  } = useContent();
  
  const currentContentState = contentStates[navigation];
  const currentContentData = contentData[navigation];
  
  // Check if this navigation/role combination has smart content available
  const hasSmartContentAvailable = hasSmartContent(navigation, userRole);
  
  // If smart content is disabled or not available, use original component
  if (!isSmartContentEnabled || !hasSmartContentAvailable || !currentContentState) {
    if (OriginalComponent) {
      return <OriginalComponent {...fallbackProps} {...additionalProps} />;
    }
    
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Content not available for {userRole} role</p>
      </div>
    );
  }
  
  // Get the appropriate component for current state
  const ContentComponent = getContentComponent(navigation, userRole, currentContentState);
  
  if (!ContentComponent) {
    // Fallback to original component if smart component not found
    if (OriginalComponent) {
      return <OriginalComponent {...fallbackProps} {...additionalProps} />;
    }
    
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Content component not found</p>
      </div>
    );
  }
  
  // Enhanced props for smart content components
  const smartContentProps = {
    navigation,
    userRole,
    contentState: currentContentState,
    contentData: currentContentData,
    
    // Content state management functions
    setContentState: (newState, data = null) => setContentState(navigation, newState, data),
    setContentData: (data) => setContentData(navigation, data),
    navigateBack,
    canGoBack,
    
    // Original props
    ...fallbackProps,
    ...additionalProps,
  };
  
  return (
    <div className="smart-content-container">
      {/* Back button for navigation history */}
      {canGoBack && (
        <div className="mb-4">
          <button
            onClick={navigateBack}
            className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded transition-colors"
          >
            ← Back
          </button>
        </div>
      )}
      
      {/* Dynamic content */}
      <Suspense fallback={<LoadingComponent />}>
        <ContentComponent {...smartContentProps} />
      </Suspense>
    </div>
  );
};

export default SmartContentContainer;