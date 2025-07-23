// src/components/foryou/FilterUpgradeToPro.jsx

import React from "react";
import GoPremiumModal from "../ui/GoPremiumModal";

const FilterIcon = () => (
  <div className="w-[125px] h-[125px] flex items-center justify-center">
    <img 
      src="/icons/filter.svg" 
      alt="Filter" 
      className="w-full h-full"
    />
  </div>
);

const FilterUpgradeToPro = ({ isOpen, onClose, onUpgrade }) => {
  return (
    <GoPremiumModal
      isOpen={isOpen}
      onClose={onClose}
      onUpgrade={() => {
        if (onUpgrade) {
          onUpgrade();
        }
        onClose();
      }}
      title="Filter"
      description="The filter feature is for premium users. Go to premium."
      buttonText="Go premium"
      icon={FilterIcon}
    />
  );
};

export default FilterUpgradeToPro;