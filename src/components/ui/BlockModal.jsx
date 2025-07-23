// src/components/ui/BlockModal.jsx

import React from "react";
import Modal from "./Modal";

const BlockModal = ({ isOpen, onClose, onBlock, user }) => {
  const handleBlock = () => {
    if (onBlock) {
      onBlock();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative w-[794px] h-[530px] bg-white rounded-[20px] mx-auto my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute w-[33px] h-[33px] right-[30px] top-[30px] cursor-pointer border-none bg-transparent p-0"
          aria-label="Close modal"
        >
          <svg
            width="33"
            height="33"
            viewBox="0 0 33 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.25 8.25L24.75 24.75M8.25 24.75L24.75 8.25"
              stroke="#000000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Block User Icon */}
        <div className="absolute w-[118.92px] h-[118.92px] left-[339.01px] top-[92px]">
          <img
            src="/icons/block-user.svg"
            alt="Block user"
            className="w-full h-full"
          />
        </div>

        {/* Block user? Title */}
        <div className="absolute w-[536.31px] h-[32px] left-[129px] top-[230.27px]">
          <h2 className="font-lexend font-medium text-center m-0" 
            style={{
              fontSize: "25.2381px",
              lineHeight: "32px",
              color: "#000000"
            }}
          >
            Block user?
          </h2>
        </div>

        {/* Description */}
        <div className="absolute w-[392px] h-[64px] left-[200.63px] top-[276.9px]">
          <p className="font-lexend font-normal text-center m-0"
            style={{
              fontSize: "25.2381px",
              lineHeight: "32px",
              color: "#707070"
            }}
          >
            Do you really want to block this user?
          </p>
        </div>

        {/* Block Button */}
        <div className="absolute w-[724px] h-[72px] left-[calc(50%-724px/2)] top-[388px]">
          <button
            onClick={handleBlock}
            className="w-full h-full border-none cursor-pointer rounded-[10.7573px]"
            style={{ backgroundColor: "#0490CF" }}
          >
            <span className="font-lexend font-semibold"
              style={{
                fontSize: "21.5146px",
                lineHeight: "150%",
                color: "#FFFFFF"
              }}
            >
              Block
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BlockModal;