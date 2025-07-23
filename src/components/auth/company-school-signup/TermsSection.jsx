import { useState } from "react";
import { colors, typography } from "../../../styles/tokens";
import TermsModal from "../../ui/TermsModal";

const TermsSection = ({ formData, onInputChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTermsClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleAgreeFromModal = () => {
    onInputChange("agreeToTerms", true);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={formData.agreeToTerms}
          onChange={(e) => onInputChange("agreeToTerms", e.target.checked)}
          className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
          style={{ accentColor: colors.primary }}
        />
        <label
          htmlFor="terms"
          className="cursor-pointer"
          style={{
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize.text,
            color: colors.text,
          }}
        >
          I agree to the{" "}
          <span
            className="cursor-pointer hover:underline"
            style={{ color: colors.primary }}
            onClick={handleTermsClick}
          >
            terms and conditions
          </span>
        </label>
      </div>

      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAgree={handleAgreeFromModal}
      />
    </>
  );
};

export default TermsSection;