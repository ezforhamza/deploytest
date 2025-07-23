import { FileText } from "lucide-react";
import TextArea from "../../ui/TextArea";
import { validateOverview } from "./validation";

const OverviewSection = ({ formData, errors, onInputChange }) => {
  const handleInputChange = (value) => {
    const error = validateOverview(value);
    onInputChange("overview", value, error);
  };

  return (
    <TextArea
      label="Overview"
      placeholder="Tell us about your organization (optional)"
      value={formData.overview}
      onChange={handleInputChange}
      icon={<FileText size={20} />}
      error={errors.overview}
      rows={4}
      maxLength={1000}
      showCharCount={true}
    />
  );
};

export default OverviewSection;