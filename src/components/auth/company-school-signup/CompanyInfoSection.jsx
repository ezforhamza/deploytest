import { Building, Mail, Phone, Briefcase } from "lucide-react";
import Input from "../../ui/Input";
import Dropdown from "../../ui/Dropdown";
import { validateCompanyName, validateEmail, validatePhone } from "./validation";

const CompanyInfoSection = ({ formData, errors, onInputChange }) => {
  const industryOptions = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "retail", label: "Retail" },
    { value: "consulting", label: "Consulting" },
    { value: "media", label: "Media & Entertainment" },
    { value: "real-estate", label: "Real Estate" },
    { value: "non-profit", label: "Non-Profit" },
    { value: "government", label: "Government" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (field, value) => {
    let error = "";
    
    switch (field) {
      case "companyName":
        error = validateCompanyName(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      default:
        break;
    }
    
    onInputChange(field, value, error);
  };

  return (
    <>
      <Input
        label="Company Name"
        placeholder="Enter company name"
        value={formData.companyName}
        onChange={(value) => handleInputChange("companyName", value)}
        icon={<Building size={20} />}
        error={errors.companyName}
        required
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter email"
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

      <Dropdown
        label="Industry"
        placeholder="Select industry"
        value={formData.industry}
        onChange={(value) => handleInputChange("industry", value)}
        options={industryOptions}
        icon={<Briefcase size={20} />}
        error={errors.industry}
        required
      />
    </>
  );
};

export default CompanyInfoSection;