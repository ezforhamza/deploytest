import React from "react";
import { colors } from "../../../styles/tokens";

const FormHeader = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h1
        className="mb-2"
        style={{
          fontFamily: 'Lexend',
          fontWeight: 600,
          fontSize: "30.88px",
          lineHeight: "30.88px",
          letterSpacing: "1%",
          color: colors.dark,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            fontFamily: 'Lexend',
            fontWeight: 400,
            fontSize: "19.76px",
            lineHeight: "30.88px",
            letterSpacing: "1%",
            color: colors.text,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default FormHeader;