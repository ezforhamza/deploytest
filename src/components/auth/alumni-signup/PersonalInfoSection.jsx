import { User, Mail, Phone, Calendar, Hash, Users } from "lucide-react";
import Input from "../../ui/Input";
import Dropdown from "../../ui/Dropdown";
import ProfileImageUpload from "../company-school-signup/ProfileImageUpload";
import { validateName, validateEmail, validatePhone, validateAge, validateDateOfBirth } from "./validation";

const PersonalInfoSection = ({ formData, errors, onInputChange, profileImage, onImageUpload }) => {
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
  ];

  const handleInputChange = (field, value) => {
    let error = "";
    
    switch (field) {
      case "firstName":
        error = validateName(value, "First name");
        break;
      case "lastName":
        error = validateName(value, "Last name");
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhone(value);
        break;
      case "age":
        error = validateAge(value);
        break;
      case "dateOfBirth":
        error = validateDateOfBirth(value);
        break;
      default:
        break;
    }
    
    onInputChange(field, value, error);
  };

  return (
    <>
      <ProfileImageUpload
        profileImage={profileImage}
        onImageUpload={onImageUpload}
      />

      <Input
        label="First Name"
        placeholder="Enter First name"
        value={formData.firstName}
        onChange={(value) => handleInputChange("firstName", value)}
        icon={<User size={20} />}
        error={errors.firstName}
        required
      />

      <Input
        label="Last Name"
        placeholder="Enter Last name"
        value={formData.lastName}
        onChange={(value) => handleInputChange("lastName", value)}
        icon={<User size={20} />}
        error={errors.lastName}
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

      <Input
        label="Date of Birth"
        type="date"
        placeholder="Enter Date of birth"
        value={formData.dateOfBirth}
        onChange={(value) => handleInputChange("dateOfBirth", value)}
        icon={<Calendar size={20} />}
        error={errors.dateOfBirth}
        required
      />

      <Input
        label="Age"
        type="number"
        placeholder="Enter age"
        value={formData.age}
        onChange={(value) => handleInputChange("age", value)}
        icon={<Hash size={20} />}
        error={errors.age}
        required
      />

      <Dropdown
        label="Gender"
        placeholder="Select gender"
        value={formData.gender}
        onChange={(value) => handleInputChange("gender", value)}
        options={genderOptions}
        icon={<Users size={20} />}
        error={errors.gender}
      />
    </>
  );
};

export default PersonalInfoSection;