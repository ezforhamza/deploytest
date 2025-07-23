import React from "react";
import { Zap, Upload } from "lucide-react";
import Dropdown from "../../ui/Dropdown";
import FilePicker from "../../ui/FilePicker";
import { validateFile } from "./validation";

const ProfessionalSection = ({ formData, errors, onInputChange }) => {
  const skillsOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    { value: "design", label: "UI/UX Design" },
    { value: "marketing", label: "Digital Marketing" },
    { value: "management", label: "Project Management" },
  ];

  const handleFileChange = (file) => {
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const error = validateFile(file, allowedTypes, maxSize);
    onInputChange("cvFile", file, error);
  };

  return (
    <>
      <Dropdown
        label="Skills"
        placeholder="Select skills"
        value={formData.skills}
        onChange={(value) => onInputChange("skills", value)}
        options={skillsOptions}
        icon={<Zap size={20} />}
        error={errors.skills}
      />

      <FilePicker
        label="Upload CV"
        placeholder="Choose CV file (optional)"
        value={formData.cvFile}
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
        allowedTypes={[".pdf", ".doc", ".docx"]}
        maxSize={5 * 1024 * 1024}
        icon={<Upload size={20} />}
        error={errors.cvFile}
      />
    </>
  );
};

export default ProfessionalSection;