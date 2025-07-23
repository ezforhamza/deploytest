import { colors, typography } from "../../../styles/tokens";

const FormHeader = ({ 
  title = "Create Account", 
  subtitle = "It only takes a moment to get started" 
}) => {
  return (
    <div className="text-center mb-8">
      <h1
        className="mb-2"
        style={{
          fontFamily: typography.fontFamily.primary,
          fontWeight: 600,
          fontSize: "30.88px",
          lineHeight: "30.88px",
          letterSpacing: "1%",
          color: colors.dark,
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontFamily: typography.fontFamily.primary,
          fontWeight: 400,
          fontSize: "19.76px",
          lineHeight: "30.88px",
          letterSpacing: "1%",
          color: colors.text,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default FormHeader;