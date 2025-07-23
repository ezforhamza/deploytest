import { useState } from "react";
import {
  Briefcase,
  Building,
  Settings,
  MapPin,
  DollarSign,
  Languages,
  Users,
  Calendar,
  GraduationCap,
  Globe,
  X,
} from "lucide-react";
import Input from "../ui/Input";
import Dropdown from "../ui/Dropdown";

const JobFilters = ({ isOpen, onClose, className = "" }) => {
  const [filters, setFilters] = useState({
    jobTitle: "",
    jobType: "",
    company: "",
    skills: "",
    location: "",
    distanceRange: 0,
    distanceUnit: "km",
    salaryRange: "",
    requiredLanguages: "",
    friendsAtCompany: "",
    dateOfPublication: "",
    requiredExperience: "",
    workMode: "",
  });

  const handleInputChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    handleInputChange("distanceRange", value);
  };

  const handleApply = () => {
    console.log("Filters applied:", filters);
    handleClose();
  };

  const handleClose = () => {
    console.log("JobFilters: Close button clicked, calling onClose");
    onClose();
  };

  // Custom DateInput component that shows placeholder and becomes date picker on focus
  const DateInput = ({
    name,
    id,
    label,
    placeholder,
    value,
    onChange,
    icon,
    className,
  }) => {
    const [inputType, setInputType] = useState("text");

    const handleFocus = () => {
      setInputType("date");
    };

    const handleBlur = () => {
      if (!value) {
        setInputType("text");
      }
    };

    const handleChange = (newValue) => {
      onChange(newValue);
      // Keep as date type if there's a value
      if (!newValue) {
        setInputType("text");
      }
    };

    // Use the Input component but with custom type handling
    return (
      <div className="relative">
        <Input
          name={name}
          id={id}
          label={label}
          type={inputType}
          placeholder={inputType === "text" ? placeholder : ""}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          icon={icon}
          className={className}
        />
      </div>
    );
  };

  // Dropdown options
  const dropdownOptions = {
    jobType: [
      { value: "full-time", label: "Full-time" },
      { value: "part-time", label: "Part-time" },
      { value: "contract", label: "Contract" },
      { value: "freelance", label: "Freelance" },
      { value: "internship", label: "Internship" },
    ],
    skills: [
      { value: "javascript", label: "JavaScript" },
      { value: "react", label: "React" },
      { value: "python", label: "Python" },
      { value: "java", label: "Java" },
      { value: "nodejs", label: "Node.js" },
      { value: "ui-ux", label: "UI/UX Design" },
      { value: "project-management", label: "Project Management" },
    ],
    workMode: [
      { value: "remote", label: "Remote" },
      { value: "on-site", label: "On-site" },
      { value: "hybrid", label: "Hybrid" },
    ],
  };

  if (!isOpen) return null;

  return (
    <div
      className={`bg-white mt-9 rounded-2xl shadow-xl border border-gray-200 w-80 sm:w-96 max-h-[80vh] z-50 ${className}`}
    >
      <div className="flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-900">Filter</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 min-h-0">
          <div className="mb-0">
            <Input
              name="jobTitle"
              id="jobTitle"
              label="Job title"
              placeholder="Job title"
              value={filters.jobTitle}
              onChange={(value) => handleInputChange("jobTitle", value)}
              icon={<Briefcase size={20} />}
              className="mb-0"
            />
          </div>

          <div className="mb-0">
            <Dropdown
              name="jobType"
              id="jobType"
              label="Job type"
              placeholder="Job type"
              value={filters.jobType}
              onChange={(value) => handleInputChange("jobType", value)}
              options={dropdownOptions.jobType}
              icon={<Briefcase size={20} />}
              className="mb-0"
            />
          </div>

          <div className="mb-0">
            <Input
              name="company"
              id="company"
              label="Company"
              placeholder="Company"
              value={filters.company}
              onChange={(value) => handleInputChange("company", value)}
              icon={<Building size={20} />}
              className="mb-0"
            />
          </div>

          <div className="mb-0">
            <Dropdown
              name="skills"
              id="skills"
              label="Skills"
              placeholder="Skills"
              value={filters.skills}
              onChange={(value) => handleInputChange("skills", value)}
              options={dropdownOptions.skills}
              icon={<Settings size={20} />}
              className="mb-0"
            />
          </div>

          <div className="mb-0">
            <Input
              name="location"
              id="location"
              label="Location"
              placeholder="Location"
              value={filters.location}
              onChange={(value) => handleInputChange("location", value)}
              icon={<MapPin size={20} />}
              className="mb-0"
            />
          </div>

          {/* Distance Range */}
          <div className="mb-0">
            <label className="text-xs font-medium text-gray-500 mb-3 block">
              Distance Range
            </label>
            
            {/* Range Slider */}
            <div className="relative mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={filters.distanceRange}
                onChange={handleRangeChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider"
              />
            </div>

            {/* Range Value Display */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-black">
                  {filters.distanceRange}
                </span>
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleInputChange("distanceUnit", "km")}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                      filters.distanceUnit === "km"
                        ? "bg-sky-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    km
                  </button>
                  <button
                    onClick={() => handleInputChange("distanceUnit", "miles")}
                    className={`px-2 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                      filters.distanceUnit === "miles"
                        ? "bg-sky-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    mi
                  </button>
                </div>
              </div>
              
              {/* Distance presets */}
              <div className="flex gap-1">
                {[25, 50, 100].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleInputChange("distanceRange", preset)}
                    className={`px-2 py-1 text-xs rounded-md border transition-all duration-200 ${
                      filters.distanceRange === preset
                        ? "bg-sky-600 text-white border-sky-600"
                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Range Labels */}
            <div className="flex justify-between text-xs text-gray-400 mb-3">
              <span>Nearby</span>
              <span>Anywhere</span>
            </div>
          </div>

          <div className="mb-0">
            <Input
              name="salaryRange"
              id="salaryRange"
              label="Salary range"
              placeholder="Salary range"
              value={filters.salaryRange}
              onChange={(value) => handleInputChange("salaryRange", value)}
              icon={<DollarSign size={20} />}
              className="mb-0"
            />
          </div>

          <div className="mb-0">
            <Input
              name="requiredLanguages"
              id="requiredLanguages"
              label="Required languages"
              placeholder="Required languages"
              value={filters.requiredLanguages}
              onChange={(value) =>
                handleInputChange("requiredLanguages", value)
              }
              icon={<Languages size={20} />}
              className="mb-0"
            />
          </div>

          <div className="mb-0">
            <Input
              name="friendsAtCompany"
              id="friendsAtCompany"
              label="Friends who have worked at the company"
              placeholder="Friends who have worked at the company"
              value={filters.friendsAtCompany}
              onChange={(value) => handleInputChange("friendsAtCompany", value)}
              icon={<Users size={20} />}
              className="mb-0"
            />
          </div>

          <div className="mb-0">
            <DateInput
              name="dateOfPublication"
              id="dateOfPublication"
              label="Date of publication"
              placeholder="Date of publication"
              value={filters.dateOfPublication}
              onChange={(value) =>
                handleInputChange("dateOfPublication", value)
              }
              icon={<Calendar size={20} />}
              className="mb-0"
            />
          </div>

          <div className="mb-0">
            <Input
              name="requiredExperience"
              id="requiredExperience"
              label="Required experience"
              placeholder="Required experience"
              value={filters.requiredExperience}
              onChange={(value) =>
                handleInputChange("requiredExperience", value)
              }
              icon={<GraduationCap size={20} />}
              className="mb-0"
            />
          </div>

          <div className="mb-0">
            <Dropdown
              name="workMode"
              id="workMode"
              label="Remote or on-site work"
              placeholder="Remote or on-site work"
              value={filters.workMode}
              onChange={(value) => handleInputChange("workMode", value)}
              options={dropdownOptions.workMode}
              icon={<Globe size={20} />}
              className="mb-0"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handleApply}
            className="w-full px-4 py-3 text-base font-medium text-white bg-sky-600 rounded-xl hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2 transition-all duration-200"
          >
            Apply
          </button>
        </div>
      </div>

      <style jsx>{`
        .range-slider {
          background: linear-gradient(to right, #0284c7 0%, #0284c7 ${filters.distanceRange}%, #E5E7EB ${filters.distanceRange}%, #E5E7EB 100%);
        }
        
        .range-slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0284c7;
          border: 3px solid #FFFFFF;
          box-shadow: 0px 2px 6px rgba(2, 132, 199, 0.3);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .range-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0px 3px 8px rgba(2, 132, 199, 0.4);
        }
        
        .range-slider::-webkit-slider-thumb:active {
          transform: scale(1.05);
        }
        
        .range-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #0284c7;
          border: 3px solid #FFFFFF;
          box-shadow: 0px 2px 6px rgba(2, 132, 199, 0.3);
          cursor: pointer;
          border: none;
          transition: all 0.2s ease;
        }
        
        .range-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
        }
        
        .range-slider::-webkit-slider-track {
          height: 8px;
          border-radius: 4px;
        }
        
        .range-slider::-moz-range-track {
          height: 8px;
          border-radius: 4px;
          background: #E5E7EB;
        }
        
        .range-slider:focus {
          outline: none;
        }
        
        .range-slider:focus::-webkit-slider-thumb {
          box-shadow: 0px 2px 6px rgba(2, 132, 199, 0.3), 0 0 0 3px rgba(2, 132, 199, 0.1);
        }
      `}</style>
    </div>
  );
};

export default JobFilters;
