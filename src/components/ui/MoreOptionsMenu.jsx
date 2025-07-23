// src/components/ui/MoreOptionsMenu.jsx

import React, { useState, useEffect, useRef } from "react";

const MoreOptionsMenu = ({ 
  options = [], 
  onOptionClick = () => {},
  buttonClassName = "",
  menuClassName = ""
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleOptionClick = (option) => {
    onOptionClick(option);
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // 3-dot menu icon using the existing SVG file
  const MoreIcon = () => (
    <img
      src="/icons/more-options.svg"
      alt="More options"
      className="w-6 h-6"
    />
  );

  return (
    <div className="relative">
      {/* More Options Button */}
      <button
        ref={buttonRef}
        className={`w-6 h-6 cursor-pointer border-none bg-transparent p-0 flex items-center justify-center ${buttonClassName}`}
        onClick={toggleMenu}
        aria-label="More options"
      >
        <MoreIcon />
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className={`absolute top-8 right-0 bg-white shadow-[0px_7.45px_7.45px_#00000040] z-10 min-w-[117px] ${menuClassName}`}
          style={{ minHeight: `${options.length * 40}px` }}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option.icon && (
                <img 
                  src={option.icon} 
                  alt={option.label} 
                  className="w-4 h-4" 
                />
              )}
              <span className="text-sm font-lexend">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoreOptionsMenu;