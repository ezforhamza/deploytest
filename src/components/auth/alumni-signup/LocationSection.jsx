import React from "react";
import { Flag, Building2 } from "lucide-react";
import Input from "../../ui/Input";
import Dropdown from "../../ui/Dropdown";
import LocationPicker from "../shared/LocationPicker";
import { validateLocation } from "./validation";

const LocationSection = ({ formData, errors, onInputChange }) => {
  const handleLocationChange = (location) => {
    const error = validateLocation(location);
    onInputChange("location", location, error);
  };

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "pk", label: "Pakistan" },
    { value: "in", label: "India" },
  ];

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
        onChange={(value) => onInputChange("country", value)}
        options={countryOptions}
        icon={<Flag size={20} />}
        error={errors.country}
      />

      <Input
        label="State"
        placeholder="Enter state"
        value={formData.state}
        onChange={(value) => onInputChange("state", value)}
        icon={<Building2 size={20} />}
        error={errors.state}
      />
    </>
  );
};

export default LocationSection;
