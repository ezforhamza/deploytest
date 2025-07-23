// src/components/foryou/ForYouExample.jsx

import React from "react";
import { ForYou } from "./index";
import { colors, typography } from "../../styles/tokens";

const ForYouExample = () => {
  return (
    <div
      className="min-h-screen bg-gray-50 py-8"
      style={{
        fontFamily: typography.fontFamily.primary,
      }}
    >
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1
            className="text-gray-900 font-bold mb-2"
            style={{
              fontSize: typography.fontSize.h2,
              fontWeight: typography.fontWeight.bold,
              color: colors.dark,
            }}
          >
            For You
          </h1>
          <p
            className="text-gray-600 max-w-md mx-auto"
            style={{
              fontSize: typography.fontSize.text,
              color: colors.text,
            }}
          >
            Discover people you might want to connect with. Swipe through
            profiles and make new connections.
          </p>
        </div>

        {/* For You Component */}
        <ForYou className="w-full flex justify-center" />

        {/* Usage Instructions */}
        <div className="mt-12 max-w-2xl mx-auto">
          <h2
            className="text-gray-900 font-semibold mb-4"
            style={{
              fontSize: typography.fontSize.h4,
              fontWeight: typography.fontWeight.semibold,
              color: colors.dark,
            }}
          >
            How to Use
          </h2>
          <div
            className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            style={{
              fontSize: typography.fontSize.text,
              color: colors.text,
            }}
          >
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Use the "Previous" and "Next" buttons to navigate between user
                profiles
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Click the "Follow" button on the profile card to follow/unfollow
                users
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                Click "Send message" to start a conversation (currently logs to
                console)
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                The card shows user details including name, job title, school,
                and location
              </li>
            </ul>
          </div>
        </div>

        {/* Component Structure */}
        <div className="mt-8 max-w-2xl mx-auto">
          <h2
            className="text-gray-900 font-semibold mb-4"
            style={{
              fontSize: typography.fontSize.h4,
              fontWeight: typography.fontWeight.semibold,
              color: colors.dark,
            }}
          >
            Component Structure
          </h2>
          <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm overflow-x-auto">
            <pre>{`src/components/foryou/
├── ForYou.jsx           # Main container component
├── ForYouCard.jsx       # Individual profile card
├── ProfileInfo.jsx      # User information display
├── ActionButton.jsx     # Reusable button component
├── ForYouExample.jsx    # Usage example
└── index.js            # Component exports`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYouExample;
