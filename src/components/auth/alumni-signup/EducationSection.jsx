import React from "react";
import {
  GraduationCap,
  Award,
  Briefcase,
  Calendar,
  Plus,
  Minus,
  Zap,
  Upload,
} from "lucide-react";
import Input from "../../ui/Input";
import Dropdown from "../../ui/Dropdown";
import FilePicker from "../../ui/FilePicker";
import { colors, typography, spacing } from "../../../styles/tokens";

const EducationSection = ({
  showEducationSection,
  educationList,
  onAddFirstEducation,
  onAddNewEducation,
  onUpdateEducation,
  onRemoveEducation,
  formData,
  onInputChange,
  errors,
}) => {
  const fieldOfWorkOptions = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "marketing", label: "Marketing" },
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "business", label: "Business" },
  ];

  const skillsOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "react", label: "React" },
    { value: "nodejs", label: "Node.js" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "swift", label: "Swift" },
    { value: "kotlin", label: "Kotlin" },
    { value: "design", label: "UI/UX Design" },
    { value: "marketing", label: "Digital Marketing" },
    { value: "management", label: "Project Management" },
    { value: "dataanalysis", label: "Data Analysis" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "devops", label: "DevOps" },
    { value: "mobiledevelopment", label: "Mobile Development" },
    { value: "webdevelopment", label: "Web Development" },
    { value: "databases", label: "Database Management" },
    { value: "cloudcomputing", label: "Cloud Computing" },
    { value: "machinelearning", label: "Machine Learning" },
  ];

  const handleFileChange = (file) => {
    const allowedTypes = [".pdf", ".doc", ".docx"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    let error = "";
    if (file) {
      // Check file size
      if (file.size > maxSize) {
        error = `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
      }
      
      // Check file type
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        error = `File type must be one of: ${allowedTypes.join(", ")}`;
      }
    }
    
    onInputChange("cvFile", file, error);
  };

  return (
    <>
      {showEducationSection && (
        <>
          {educationList.map((education) => (
            <div
              key={education.id}
              style={{
                position: "relative",
                marginBottom: spacing.lg,
              }}
            >
              {educationList.length > 1 && (
                <button
                  type="button"
                  onClick={() => onRemoveEducation(education.id)}
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "10px",
                    backgroundColor: colors.danger,
                    color: colors.white,
                    border: "none",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "12px",
                    zIndex: 10,
                  }}
                >
                  <Minus size={14} />
                </button>
              )}

              <Input
                label="School"
                placeholder="School"
                value={education.school}
                onChange={(value) =>
                  onUpdateEducation(education.id, "school", value)
                }
                icon={<GraduationCap size={20} />}
              />

              <Input
                label="Degree"
                placeholder="Degree"
                value={education.degree}
                onChange={(value) =>
                  onUpdateEducation(education.id, "degree", value)
                }
                icon={<Award size={20} />}
              />

              <Dropdown
                label="Field of Work"
                placeholder="Field of work"
                value={education.fieldOfWork}
                onChange={(value) =>
                  onUpdateEducation(education.id, "fieldOfWork", value)
                }
                options={fieldOfWorkOptions}
                icon={<Briefcase size={20} />}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start Date"
                  type="date"
                  placeholder="Start date"
                  value={education.startDate}
                  onChange={(value) =>
                    onUpdateEducation(education.id, "startDate", value)
                  }
                  icon={<Calendar size={20} />}
                />
                <Input
                  label="End Date"
                  type="date"
                  placeholder="End date (Optional)"
                  value={education.endDate}
                  onChange={(value) =>
                    onUpdateEducation(education.id, "endDate", value)
                  }
                  icon={<Calendar size={20} />}
                />
              </div>
            </div>
          ))}
        </>
      )}

      <div className="text-center">
        <button
          type="button"
          onClick={
            showEducationSection ? onAddNewEducation : onAddFirstEducation
          }
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: spacing.xs,
            backgroundColor: "transparent",
            border: "none",
            color: colors.primary,
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize.text,
            cursor: "pointer",
            margin: "0 auto",
            transition: "color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.color = colors.secondary;
          }}
          onMouseLeave={(e) => {
            e.target.style.color = colors.primary;
          }}
        >
          <Plus size={16} />
          Add education
        </button>
      </div>

      {/* Skills and CV Upload - Outside education loop, appears only once */}
      {showEducationSection && (
        <div style={{ marginTop: spacing.lg }}>
          <Dropdown
            label="Skills"
            placeholder="Select your skills"
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
        </div>
      )}
    </>
  );
};

export default EducationSection;
