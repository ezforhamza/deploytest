import { Plus, Minus } from "lucide-react";
import { colors, typography, spacing } from "../../../styles/tokens";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

const WorkExperienceSection = ({
  workExperiences,
  onAddWorkExperience,
  onUpdateWorkExperience,
  onUpdateCurrentlyWorking,
  onRemoveWorkExperience,
}) => {
  const handleRemove = (id) => {
    onRemoveWorkExperience(id);
  };

  return (
    <div className="space-y-4">
      {workExperiences.map((experience) => (
        <div
          key={experience.id}
          className="space-y-4 relative"
          style={{
            position: "relative",
            marginBottom: spacing.lg,
          }}
        >
          {workExperiences.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(experience.id)}
              style={{
                position: "absolute",
                top: "0",
                right: "0",
                background: colors.danger,
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

          <div className="space-y-4">
            <Input
              label="Job Title (Optional)"
              placeholder="UI/UX Designer"
              value={experience.jobTitle}
              onChange={(value) =>
                onUpdateWorkExperience(experience.id, "jobTitle", value)
              }
              icon="💼"
            />

            <Input
              label="Company"
              type="text"
              placeholder="Nam-Zim"
              value={experience.company}
              onChange={(value) =>
                onUpdateWorkExperience(experience.id, "company", value)
              }
              icon="🏢"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start date"
                type="date"
                value={experience.startDate}
                onChange={(value) =>
                  onUpdateWorkExperience(experience.id, "startDate", value)
                }
                icon="📅"
              />

              <Input
                label="End date"
                type="date"
                value={experience.currentlyWorking ? "" : experience.endDate}
                onChange={(value) =>
                  onUpdateWorkExperience(experience.id, "endDate", value)
                }
                disabled={experience.currentlyWorking}
                icon="📅"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
              <input
                type="checkbox"
                id={`currently-working-${experience.id}`}
                checked={experience.currentlyWorking || false}
                onChange={(e) => {
                  onUpdateCurrentlyWorking(experience.id, e.target.checked);
                }}
                style={{
                  width: "18px",
                  height: "18px",
                  accentColor: colors.primary,
                  cursor: "pointer",
                }}
              />
              <label
                htmlFor={`currently-working-${experience.id}`}
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.text,
                  color: colors.text,
                  cursor: "pointer",
                }}
              >
                Currently working here
              </label>
            </div>

            <div>
              <label
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.text,
                  color: colors.text,
                  fontWeight: "500",
                  marginBottom: spacing.xs,
                  display: "block",
                }}
              >
                Description
              </label>
              <textarea
                placeholder="Lorem ipsum dolor sit amet consectetur. Quis magna etiam consectetur dictum et. Lorem pellentesque praesent vel eu sit ut magna mattis. Quam in bibendum et amet molestie. Sit scelerisque."
                value={experience.description}
                onChange={(e) =>
                  onUpdateWorkExperience(
                    experience.id,
                    "description",
                    e.target.value
                  )
                }
                rows={4}
                style={{
                  width: "100%",
                  padding: spacing.sm,
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.text,
                  color: colors.text,
                  backgroundColor: "white",
                  resize: "vertical",
                  minHeight: "100px",
                }}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="text-center">
        <button
          type="button"
          onClick={onAddWorkExperience}
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
          }}
        >
          <Plus size={16} />
          Add work experience
        </button>
      </div>
    </div>
  );
};

export default WorkExperienceSection;
