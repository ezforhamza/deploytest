import React from "react";
import Modal from "./Modal";
import { X } from "lucide-react";

const GoPremiumModal = ({
  isOpen,
  onClose,
  onUpgrade,
  title = "Unlock More Opportunities!",
  description = "Free accounts allow up to 12 active applications. Want more? Upgrade for unlimited access to offers.",
  buttonText = "Go premium",
  icon: CustomIcon,
  className = "",
}) => {
  const DefaultIcon = () => (
    <svg
      className="w-32 h-24 text-[#1090CF]"
      viewBox="0 0 131 106"
      fill="currentColor"
    >
      <path d="M65.5 0L131 106H0L65.5 0Z" />
    </svg>
  );

  const IconComponent = CustomIcon || DefaultIcon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`max-w-none w-full ${className}`}
    >
      <div className="bg-white rounded-[20px] relative w-full max-w-[794px] h-auto md:h-[530px] mx-auto p-6 md:p-8 lg:p-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 w-8 h-8 flex items-center justify-center text-black hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Content Container */}
        <div className="flex flex-col items-center text-center h-full pt-8 md:pt-12">
          {/* Icon */}
          <div className="mb-8 md:mb-12">
            <IconComponent />
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-2xl lg:text-[25px] font-medium text-black mb-4 md:mb-6 max-w-[536px] leading-tight">
            {title}
          </h2>

          {/* Description */}
          <p className="text-base md:text-lg lg:text-[25px] font-normal text-[#707070] leading-8 max-w-[608px] mb-8 md:mb-12 lg:mb-16">
            {description}
          </p>

          {/* Go Premium Button */}
          <div className="mt-auto w-full max-w-[724px]">
            <button
              onClick={onUpgrade}
              className="w-full bg-[#0490CF] hover:bg-[#0380B8] text-white font-semibold text-lg md:text-xl lg:text-[21.5px] py-4 md:py-5 px-6 rounded-[11px] transition-colors duration-200 leading-6"
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GoPremiumModal;
