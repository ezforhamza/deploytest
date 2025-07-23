// src/components/common/StepIndicator/StepIndicator.jsx
import { colors, typography, spacing } from "../../../styles/tokens";

const StepIndicator = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, label: "Personal Information" },
    { number: 2, label: "Education" },
    { number: 3, label: "Work experience" },
  ];

  return (
    <div className="w-full mb-8">
      <div className="relative">
        {/* Container for circles with proper spacing */}
        <div className="flex justify-between items-center relative">
          {/* Background connecting line - positioned to connect circle centers */}
          <div
            className="absolute"
            style={{
              top: "25.5px", // Half of circle height (51px/2)
              left: "36px", // Half of circle width to start from center of first circle
              right: "36px", // Half of circle width to end at center of last circle
              height: "11.47px",
              backgroundColor: colors.white,
              border: "1.65px solid #D9D9D9",
              borderRadius: "21.425px",
              transform: "translateY(-50%)", // Center the line vertically
              zIndex: 1,
            }}
          />

          {/* Progress line */}
          <div
            className="absolute transition-all duration-300"
            style={{
              top: "25.5px", // Same as background line
              left: "36px",

              height: "11.47px",
              backgroundColor: colors.primary,
              borderRadius: "21.425px",
              transform: "translateY(-50%)",
              width:
                currentStep === 1
                  ? "0px"
                  : currentStep === 2
                  ? "calc((100% - 51px) / 2)" // Half the distance between centers
                  : "calc(100% - 74px)", // Full distance between first and last circle centers
              zIndex: 2,
            }}
          />

          {/* Steps */}
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center relative z-10"
            >
              {/* Circle */}
              <div
                className={`flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                  onStepClick && step.number <= currentStep
                    ? "cursor-pointer"
                    : "cursor-default"
                }`}
                style={{
                  width: "51px",
                  height: "51px",
                  backgroundColor:
                    step.number <= currentStep ? colors.primary : colors.white,
                  border: `1.65px solid ${
                    step.number <= currentStep ? colors.primary : "#D9D9D9"
                  }`,
                  borderRadius: "50%",
                  flexShrink: 0, // Prevent circles from shrinking
                }}
                onClick={() => {
                  if (onStepClick && step.number <= currentStep) {
                    onStepClick(step.number);
                  }
                }}
              >
                <span
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: "15.29px",
                    fontWeight: typography.fontWeight.regular,
                    color:
                      step.number <= currentStep ? colors.white : "#666666",
                    lineHeight: "1",
                    userSelect: "none",
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Label */}
              <div
                className="mt-2 text-center"
                style={{
                  marginTop: spacing.sm,
                  maxWidth: "120px",
                  minWidth: "100px",
                  height: "48.42px", // Fixed height for 2 lines (24.21px * 2)
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontSize: "15.29px",
                    fontWeight:
                      step.number === currentStep
                        ? typography.fontWeight.medium
                        : typography.fontWeight.regular,
                    lineHeight: "24.21px",
                    textAlign: "center",
                    color: step.number <= currentStep ? colors.text : "#A4A4A4",
                    letterSpacing: "0px",
                    display: "block",
                  }}
                >
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
