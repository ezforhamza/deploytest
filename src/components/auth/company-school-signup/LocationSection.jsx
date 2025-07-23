import { Flag, Building2, Globe } from "lucide-react";
import Input from "../../ui/Input";
import Dropdown from "../../ui/Dropdown";
import LocationPicker from "../shared/LocationPicker";
import { validateLocation, validateState, validateWebsite } from "./validation";

const LocationSection = ({ formData, errors, onInputChange }) => {
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "pk", label: "Pakistan" },
    { value: "in", label: "India" },
    { value: "jp", label: "Japan" },
    { value: "kr", label: "South Korea" },
    { value: "sg", label: "Singapore" },
    { value: "ae", label: "United Arab Emirates" },
  ];

  const handleLocationChange = (location) => {
    const error = validateLocation(location);
    onInputChange("location", location, error);
  };

  const handleInputChange = (field, value) => {
    let error = "";

    switch (field) {
      case "state":
        error = validateState(value);
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
      <LocationPicker
        label="Location"
        placeholder="Enter your address"
        value={formData.location}
        onChange={handleLocationChange}
        error={errors.location}
        required
      />

      <Dropdown
        label="Country"
        placeholder="Select country"
        value={formData.country}
        onChange={(value) => handleInputChange("country", value)}
        options={countryOptions}
        icon={<Flag size={20} />}
        error={errors.country}
        required
      />

      <Input
        label="State"
        placeholder="Enter state"
        value={formData.state}
        onChange={(value) => handleInputChange("state", value)}
        icon={<Building2 size={20} />}
        error={errors.state}
        required
      />

      <Input
        label="Website"
        type="url"
        placeholder="Enter website (optional)"
        value={formData.website}
        onChange={(value) => handleInputChange("website", value)}
        icon={<Globe size={20} />}
        error={errors.website}
      />
    </>
  );
};

export default LocationSection;
