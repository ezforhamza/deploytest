// src/components/ui/TermsModal.jsx

import React from "react";
import { colors, typography, spacing, borderRadius } from "../../styles/tokens";
import Modal from "./Modal";
import Button from "./Button";

const TermsModal = ({ isOpen, onClose, onAgree }) => {
  const modalStyle = {
    width: "1080px",
    height: "706px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    borderRadius: "18.73px",
    border: `2.68px solid ${colors.primary}`,
    backgroundColor: colors.white,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  };

  const headerStyle = {
    padding: "32px 40px 24px 40px",
    flexShrink: 0,
    position: "relative",
  };

  const backButtonStyle = {
    position: "absolute",
    top: "32px",
    left: "40px",
    width: "40px",
    height: "40px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    transition: "background-color 0.2s ease",
  };

  const titleStyle = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: 500,
    fontSize: "29.44px",
    lineHeight: "150%",
    letterSpacing: "0%",
    color: colors.dark,
    textAlign: "center",
    margin: 0,
  };

  const contentStyle = {
    flex: 1,
    overflow: "auto",
    padding: "24px 40px",
  };

  const textStyle = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: 400,
    fontSize: "24px",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: colors.text,
    margin: 0,
    marginBottom: "24px",
  };

  const footerStyle = {
    padding: "24px 40px 32px 40px",
    flexShrink: 0,
    display: "flex",
    justifyContent: "flex-end",
  };

  const BackIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={colors.dark}
      strokeWidth="2"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );

  const handleAgree = () => {
    if (onAgree) {
      onAgree();
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div style={modalStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <button
            style={backButtonStyle}
            onClick={onClose}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#F5F5F5";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            <BackIcon />
          </button>
          <h1 style={titleStyle}>Term & conditions</h1>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          <p style={textStyle}>
            Lorem ipsum dolor sit amet consectetur. Pharetra et felis nulla
            pellentesque tristique sed. Orci neque lorem rutrum pellentesque
            facilisis pulvinar in. Tortor ut a rhoncus arcu mauris. Nisl tortor
            mattis eget scelerisque. Ut leo sit ultrices eu dictum purus fames
            lorem sagittis. Ultricies integer curabitur tristique auctor. Felis
            potenti massa vitae adipiscing ultrices consequat quis mattis
            viverra. Et amet non diam commodo tristique commodo. Nisl massa
            maecenas mauris neque. Scelerisque gravida tincidunt habitant
            senectus quisque maecenas volutpat. Non elementum placerat magna sed
            pharetra aliquet risus imperdiet neque. At sagittis nunc diam
            dignissim. Pretium in ornare aenean felis consectetur feugiat eu
            dolor. At quis lacus pharetra sem.
          </p>
          <p style={textStyle}>
            Eros aliquam sed orci leo tellus orci odio ipsum integer. Dui proin
            aliquam gravida vulputate. Neque volutpat ultrices pretium
            convallis. Ipsum suspendisse est egestas vitae turpis venenatis diam
            odio lectus. Porta mi pulvinar accumsan neque dictumst in
            pellentesque. In sollicitudin consectetur.
          </p>
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <Button
            variant="primary"
            size="default"
            onClick={handleAgree}
            style={{
              minWidth: "120px",
            }}
          >
            I Agree
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TermsModal;
