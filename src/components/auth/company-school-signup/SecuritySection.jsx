import { Lock } from "lucide-react";
import Input from "../../ui/Input";
import { validatePassword, validateConfirmPassword } from "./validation";

const SecuritySection = ({ formData, errors, onInputChange }) => {
  const handlePasswordChange = (value) => {
    const error = validatePassword(value);
    onInputChange("password", value, error);
    
    // Re-validate confirm password if it exists
    if (formData.confirmPassword) {
      const confirmError = validateConfirmPassword(value, formData.confirmPassword);
      onInputChange("confirmPassword", formData.confirmPassword, confirmError);
    }
  };

  const handleConfirmPasswordChange = (value) => {
    const error = validateConfirmPassword(formData.password, value);
    onInputChange("confirmPassword", value, error);
  };

  return (
    <>
      <Input
        label="Password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handlePasswordChange}
        icon={<Lock size={20} />}
        error={errors.password}
        required
      />

      <Input
        label="Confirm Password"
        type="password"
        placeholder="Confirm password"
        value={formData.confirmPassword}
        onChange={handleConfirmPasswordChange}
        icon={<Lock size={20} />}
        error={errors.confirmPassword}
        required
      />
    </>
  );
};

export default SecuritySection;