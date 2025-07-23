import React, { useState } from "react";
import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";
import Button from "../ui/Button";
import FilterUpgradeToPro from "./FilterUpgradeToPro";

const ForYouFilter = ({ onFilterChange, className = "" }) => {
  const [filters, setFilters] = useState({
    school: "",
    age: "",
    gender: "",
    fieldOfWork: "",
    location: "",
    range: 0,
    distanceUnit: "km"
  });

  // Premium filter state - locked by default
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" }
  ];

  const fieldOfWorkOptions = [
    { value: "", label: "Select Field" },
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "marketing", label: "Marketing" },
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
    { value: "other", label: "Other" }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    // Don't auto-apply filters, wait for Apply button click
  };

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    handleFilterChange("range", value);
  };


  const handleApplyFilters = () => {
    // Only apply filters if premium is unlocked
    if (isPremiumUnlocked && onFilterChange) {
      onFilterChange(filters);
    }
  };

  const togglePremiumLock = () => {
    if (!isPremiumUnlocked) {
      // Show upgrade modal instead of unlocking
      setShowUpgradeModal(true);
    } else {
      // Allow locking if already unlocked (for testing)
      setIsPremiumUnlocked(false);
      // Clear applied filters when locking
      if (onFilterChange) {
        onFilterChange({});
      }
    }
  };

  const handleUpgrade = () => {
    // For demo purposes, just unlock the filters
    // In real app, this would handle actual premium upgrade
    setIsPremiumUnlocked(true);
    console.log("User upgraded to premium");
  };

  const SchoolIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  );

  const AgeIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  );

  const GenderIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="9" r="9"/>
      <path d="M14.5 4.5L21 11M21 3h-6M21 3v6"/>
    </svg>
  );

  const WorkIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );

  const LocationIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 w-full max-w-sm ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-medium text-black">Filter</h3>
        
        {/* Premium Lock/Unlock Toggle */}
        <button
          onClick={togglePremiumLock}
          className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
            isPremiumUnlocked 
              ? 'bg-green-100 hover:bg-green-200' 
              : 'bg-amber-50 hover:bg-amber-100 border border-amber-200'
          }`}
          title={isPremiumUnlocked ? 'Premium filters unlocked' : 'Premium filters locked - Click to unlock'}
        >
          {isPremiumUnlocked ? (
            <svg 
              className="w-4 h-4 text-green-600" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <circle cx="12" cy="16" r="1"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          ) : (
            <img 
              src="/icons/lock.svg" 
              alt="Locked" 
              className="w-4 h-4 text-amber-600"
            />
          )}
        </button>
      </div>


      {/* Filter Fields */}
      <div className="space-y-4">
        {/* School Name */}
        <Input
          label="School"
          placeholder="School name"
          value={filters.school}
          onChange={(value) => handleFilterChange("school", value)}
          icon={<SchoolIcon />}
          className="mb-4"
          disabled={!isPremiumUnlocked}
        />

        {/* Age */}
        <Input
          label="Age"
          type="number"
          placeholder="Age"
          value={filters.age}
          onChange={(value) => handleFilterChange("age", value)}
          icon={<AgeIcon />}
          className="mb-4"
          disabled={!isPremiumUnlocked}
        />

        {/* Gender */}
        <Dropdown
          label="Gender"
          options={genderOptions}
          value={filters.gender}
          onChange={(value) => handleFilterChange("gender", value)}
          icon={<GenderIcon />}
          className="mb-4"
          disabled={!isPremiumUnlocked}
        />

        {/* Field of Work */}
        <Dropdown
          label="Field of work"
          options={fieldOfWorkOptions}
          value={filters.fieldOfWork}
          onChange={(value) => handleFilterChange("fieldOfWork", value)}
          icon={<WorkIcon />}
          className="mb-4"
          disabled={!isPremiumUnlocked}
        />

        {/* Location */}
        <Input
          label="Location"
          placeholder="Location"
          value={filters.location}
          onChange={(value) => handleFilterChange("location", value)}
          icon={<LocationIcon />}
          className="mb-6"
          disabled={!isPremiumUnlocked}
        />

        {/* Distance Range */}
        <div className={`mb-6 ${!isPremiumUnlocked ? 'opacity-50 pointer-events-none' : ''}`}>
          <label className="text-xs font-medium text-gray-500 mb-3 block">
            Distance Range
          </label>
          
          {/* Range Slider */}
          <div className="relative mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.range}
              onChange={handleRangeChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
            />
            {/* Custom thumb styling will be handled by CSS */}
          </div>

          {/* Range Value Display */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-black">
                {filters.range}
              </span>
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => handleFilterChange("distanceUnit", "km")}
                  className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                    filters.distanceUnit === "km"
                      ? "bg-[#0490CF] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  km
                </button>
                <button
                  onClick={() => handleFilterChange("distanceUnit", "miles")}
                  className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                    filters.distanceUnit === "miles"
                      ? "bg-[#0490CF] text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  mi
                </button>
              </div>
            </div>
            
            {/* Distance presets */}
            <div className="flex gap-1">
              {[25, 50, 100].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleFilterChange("range", preset)}
                  className={`px-2 py-1 text-xs rounded-md border transition-all duration-200 ${
                    filters.range === preset
                      ? "bg-[#0490CF] text-white border-[#0490CF]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Range Labels */}
          <div className="flex justify-between text-xs text-gray-400">
            <span>Nearby</span>
            <span>Anywhere</span>
          </div>
        </div>

        {/* Apply Button */}
        <Button
          variant={isPremiumUnlocked ? "primary" : "secondary"}
          fullWidth
          onClick={isPremiumUnlocked ? handleApplyFilters : () => setShowUpgradeModal(true)}
          className="mt-6"
          disabled={false}
        >
          {isPremiumUnlocked ? 'Apply now' : '🔒 Unlock Premium Filters'}
        </Button>
      </div>

      <style jsx>{`
        .range-slider {
          background: linear-gradient(to right, #0490CF 0%, #0490CF ${filters.range}%, #E5E7EB ${filters.range}%, #E5E7EB 100%);
        }
        
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0490CF;
          border: 3px solid #FFFFFF;
          box-shadow: 0px 2px 6px rgba(4, 144, 207, 0.3);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0px 3px 8px rgba(4, 144, 207, 0.4);
        }
        
        .range-slider::-webkit-slider-thumb:active {
          transform: scale(1.05);
        }
        
        .range-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0490CF;
          border: 3px solid #FFFFFF;
          box-shadow: 0px 2px 6px rgba(4, 144, 207, 0.3);
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        
        .range-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
        
        .range-slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
        }
        
        .range-slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: #E5E7EB;
        }
        
        .range-slider:focus {
          outline: none;
        }
        
        .range-slider:focus::-webkit-slider-thumb {
          box-shadow: 0px 2px 6px rgba(4, 144, 207, 0.3), 0 0 0 3px rgba(4, 144, 207, 0.1);
        }
      `}</style>

      {/* Upgrade to Pro Modal */}
      <FilterUpgradeToPro
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
};

export default ForYouFilter;