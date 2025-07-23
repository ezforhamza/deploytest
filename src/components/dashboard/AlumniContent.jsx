// src/components/dashboard/AlumniContent.jsx

import React from "react";
import { colors } from "../../styles/tokens";

const AlumniContent = ({ userRole, searchValue }) => {
  return (
    <div className="flex justify-center w-full h-full">
      {/* Main Content */}
      <div className="w-full max-w-[554px]">
        <div 
          className="bg-white rounded-[10px] p-4 sm:p-6 lg:p-8 text-center w-full"
          style={{ 
            boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)" 
          }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 font-lexend">
            Alumni
          </h2>
          <p className="text-gray-600 font-lexend text-sm sm:text-base">
            View and manage your institution's alumni network and their achievements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AlumniContent;