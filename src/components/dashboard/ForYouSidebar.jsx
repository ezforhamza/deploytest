// src/components/dashboard/ForYouSidebar.jsx

import React from "react";
import ForYouFilter from "../foryou/ForYouFilter";

const ForYouSidebar = ({ onFilterChange }) => {
  return (
    <div className="w-full flex flex-col gap-5 h-auto">
      {/* For You Filter */}
      <div className="w-full">
        <ForYouFilter
          onFilterChange={onFilterChange}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default ForYouSidebar;