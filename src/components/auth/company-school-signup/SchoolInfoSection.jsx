import { GraduationCap, Mail, Phone, Globe } from "lucide-react";
import Input from "../../ui/Input";
import { validateSchoolName, validateEmail, validatePhone, validateWebsite } from "./validation";

const SchoolInfoSection = ({ formData, errors, onInputChange }) => {
  const handleInputChange = (field, value) => {
    let error = "";
    
    switch (field) {
      case "schoolName":
        error = validateSchoolName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "website":
        error = validateWebsite(value);
        break;
      default:
        break;
    }
    
    onInputChange(field, value, error);
  };

  return (
    <>
      <Input
        label="School Name"
        placeholder="Enter school name"
        value={formData.schoolName}
        onChange={(value) => handleInputChange("schoolName", value)}
        icon={<GraduationCap size={20} />}
        error={errors.schoolName}
        required
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter school email"
        value={formData.email}
        onChange={(value) => handleInputChange("email", value)}
        icon={<Mail size={20} />}
        error={errors.email}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="Enter phone number"
        value={formData.phone}
        onChange={(value) => handleInputChange("phone", value)}
        icon={<Phone size={20} />}
        error={errors.phone}
        required
      />

      <Input
        label="Website"
        type="url"
        placeholder="Enter school website (optional)"
        value={formData.website}
        onChange={(value) => handleInputChange("website", value)}
        icon={<Globe size={20} />}
        error={errors.website}
      />
    </>
  );
};

export default SchoolInfoSection;