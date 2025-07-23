import React, { useState } from "react";
import ProfileImageUpload from '../ui/ProfileImageUpload';
import Input from '../ui/Input';
import Dropdown from '../ui/Dropdown';
import TextArea from '../ui/TextArea';
import LocationPicker from '../auth/shared/LocationPicker';
import { colors } from '../../styles/tokens';

const CreateJob = ({ onBack, onSave }) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: null, // Will store location object with coordinates and address
    jobType: "",
    jobCategory: "",
    experienceLevel: "",
    applicationMethod: "",
    publicationDate: "",
    salary: "",
    contactPerson: "",
    contactNumber: "",
    skills: "",
    perks: "",
    language: "",
    startDate: "",
    duration: "",
    description: "",
    companyLogo: null,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleImageUpload = (file, error) => {
    if (error) {
      setErrors((prev) => ({ ...prev, companyLogo: error }));
    } else {
      setFormData((prev) => ({
        ...prev,
        companyLogo: file,
      }));
      setErrors((prev) => ({ ...prev, companyLogo: "" }));
    }
  };

  const handleLocationChange = (locationObj) => {
    setFormData((prev) => ({
      ...prev,
      location: locationObj,
    }));
    // Clear location error when a location is selected
    if (errors.location) {
      setErrors((prev) => ({
        ...prev,
        location: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }

    if (!formData.location) {
      newErrors.location = "Job location is required";
    }

    if (!formData.jobType) {
      newErrors.jobType = "Job type is required";
    }

    if (!formData.jobCategory) {
      newErrors.jobCategory = "Job category is required";
    }

    if (!formData.experienceLevel) {
      newErrors.experienceLevel = "Experience level is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateJobId = () => {
    return `job-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      // Scroll to first error field
      const firstErrorField = document.querySelector('.input-field input, .dropdown-field, .textarea-field textarea, .location-picker-field');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Create job object
    const newJob = {
      id: generateJobId(),
      title: formData.jobTitle.trim(),
      company: "Your Company", // This would come from user's company profile
      companyLogo: formData.companyLogo,
      location: formData.location,
      type: formData.jobType,
      category: formData.jobCategory,
      experience: formData.experienceLevel,
      applicationMethod: formData.applicationMethod.trim() || "Apply on website",
      publicationDate: formData.publicationDate || new Date().toISOString().split('T')[0],
      salary: formData.salary.trim() || "Competitive",
      contactPerson: formData.contactPerson.trim(),
      contactNumber: formData.contactNumber.trim(),
      skills: formData.skills || [],
      perks: formData.perks.trim(),
      language: formData.language.trim(),
      startDate: formData.startDate,
      duration: formData.duration.trim() || "Permanent",
      description: formData.description.trim(),
      datePosted: new Date().toISOString(),
      status: "active",
      applicants: [],
      views: 0,
      // Additional fields for JobCard compatibility
      workType: formData.location?.address?.includes('Remote') ? 'Remote work 🌍' : 'Office 🏢',
      jobType: formData.jobType === 'full-time' ? 'Full-time 👔' : 
                formData.jobType === 'part-time' ? 'Part-time ⏰' :
                formData.jobType === 'contract' ? 'Contract 📝' : 'Internship 🎓',
      level: formData.experienceLevel === 'entry' ? 'Entry-level 🌱' :
             formData.experienceLevel === 'mid' ? 'Mid-level 🧠' :
             formData.experienceLevel === 'senior' ? 'Senior-level 🚀' : 'Executive 👑',
      companyName: "Your Company" // This would come from user's company profile
    };

    // Add to mock data (this would normally be an API call)
    console.log("Creating new job:", newJob);
    
    // In a real app, you would make an API call here
    // await createJobAPI(newJob);
    
    if (onSave) {
      onSave(newJob);
    }
  };

  // Dropdown options
  const jobTypeOptions = [
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
    { label: "Contract", value: "contract" },
    { label: "Internship", value: "internship" },
  ];

  const jobCategoryOptions = [
    { label: "Technology", value: "technology" },
    { label: "Marketing", value: "marketing" },
    { label: "Design", value: "design" },
    { label: "Sales", value: "sales" },
    { label: "Finance", value: "finance" },
    { label: "Human Resources", value: "hr" },
    { label: "Operations", value: "operations" },
    { label: "Customer Service", value: "customer-service" },
  ];

  const experienceLevelOptions = [
    { label: "Entry Level", value: "entry" },
    { label: "Mid Level", value: "mid" },
    { label: "Senior Level", value: "senior" },
    { label: "Executive", value: "executive" },
  ];

  const skillsOptions = [
    { label: "JavaScript", value: "javascript" },
    { label: "React", value: "react" },
    { label: "Node.js", value: "nodejs" },
    { label: "Python", value: "python" },
    { label: "Design", value: "design" },
    { label: "Project Management", value: "project-management" },
    { label: "Data Analysis", value: "data-analysis" },
    { label: "Digital Marketing", value: "digital-marketing" },
  ];

  return (
    <div 
      className="w-full max-w-4xl mx-auto rounded-t-lg rounded-bl-lg rounded-br-none p-4 sm:p-6 lg:p-8 font-lexend relative min-h-screen sm:min-h-0"
      style={{ backgroundColor: colors.background || "#F8F9FA" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="w-8 h-8 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="sm:w-6 sm:h-6"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-lg sm:text-xl font-medium text-black absolute left-1/2 transform -translate-x-1/2">
          Create Job
        </h1>

        {/* Save Button */}
        <button
          onClick={handleSubmit}
          className="px-4 py-2 sm:px-6 sm:py-3 bg-[#0490CF] text-white font-semibold text-sm sm:text-base rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Save
        </button>
      </div>

      {/* Company Logo Section */}
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <ProfileImageUpload
          value={formData.companyLogo}
          onChange={handleImageUpload}
          label="Company Logo"
          error={errors.companyLogo}
          className="flex flex-col items-center"
        />
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {/* Job Title */}
        <div className="lg:col-span-1">
          <Input
            type="text"
            label="Job Title"
            placeholder="Software Development"
            value={formData.jobTitle}
            onChange={(value) => handleInputChange("jobTitle", value)}
            error={errors.jobTitle}
            required
          />
        </div>

        {/* Location */}
        <div className="lg:col-span-1">
          <LocationPicker
            label="Job Location"
            placeholder="Enter job location"
            value={formData.location}
            onChange={handleLocationChange}
            error={errors.location}
            required
          />
        </div>

        {/* Job Type */}
        <div className="lg:col-span-1">
          <Dropdown
            label="Job Type"
            placeholder="Select job type"
            value={formData.jobType}
            onChange={(value) => handleInputChange("jobType", value)}
            options={jobTypeOptions}
            error={errors.jobType}
            required
          />
        </div>

        {/* Job Category */}
        <div className="lg:col-span-1">
          <Dropdown
            label="Job Category"
            placeholder="Select job category"
            value={formData.jobCategory}
            onChange={(value) => handleInputChange("jobCategory", value)}
            options={jobCategoryOptions}
            error={errors.jobCategory}
            required
          />
        </div>

        {/* Experience Level */}
        <div className="lg:col-span-1">
          <Dropdown
            label="Experience Level"
            placeholder="Select experience level"
            value={formData.experienceLevel}
            onChange={(value) => handleInputChange("experienceLevel", value)}
            options={experienceLevelOptions}
            error={errors.experienceLevel}
            required
          />
        </div>

        {/* Application Method */}
        <div className="lg:col-span-1">
          <Input
            type="text"
            label="Application Method"
            placeholder="Email, Website, etc."
            value={formData.applicationMethod}
            onChange={(value) => handleInputChange("applicationMethod", value)}
            error={errors.applicationMethod}
          />
        </div>

        {/* Publication Date */}
        <div className="lg:col-span-1">
          <Input
            type="date"
            label="Publication Date"
            value={formData.publicationDate}
            onChange={(value) => handleInputChange("publicationDate", value)}
            error={errors.publicationDate}
          />
        </div>

        {/* Salary */}
        <div className="lg:col-span-1">
          <Input
            type="text"
            label="Salary"
            placeholder="e.g., $50,000 - $70,000"
            value={formData.salary}
            onChange={(value) => handleInputChange("salary", value)}
            error={errors.salary}
          />
        </div>

        {/* Contact Person */}
        <div className="lg:col-span-1">
          <Input
            type="text"
            label="Contact Person"
            placeholder="@Jerome Bell"
            value={formData.contactPerson}
            onChange={(value) => handleInputChange("contactPerson", value)}
            error={errors.contactPerson}
          />
        </div>

        {/* Contact Number */}
        <div className="lg:col-span-1">
          <Input
            type="tel"
            label="Contact Number (Optional)"
            placeholder="Phone number"
            value={formData.contactNumber}
            onChange={(value) => handleInputChange("contactNumber", value)}
            error={errors.contactNumber}
            icon="phone"
          />
        </div>

        {/* Skills */}
        <div className="lg:col-span-1">
          <Dropdown
            label="Skills (Optional)"
            placeholder="Select required skills"
            value={formData.skills}
            onChange={(value) => handleInputChange("skills", value)}
            options={skillsOptions}
            error={errors.skills}
          />
        </div>

        {/* Perks */}
        <div className="lg:col-span-1">
          <Input
            type="text"
            label="Perks (Optional)"
            placeholder="Health insurance, Remote work, etc."
            value={formData.perks}
            onChange={(value) => handleInputChange("perks", value)}
            error={errors.perks}
          />
        </div>

        {/* Language */}
        <div className="lg:col-span-1">
          <Input
            type="text"
            label="Language (Optional)"
            placeholder="English, Spanish, etc."
            value={formData.language}
            onChange={(value) => handleInputChange("language", value)}
            error={errors.language}
          />
        </div>

        {/* Start Date */}
        <div className="lg:col-span-1">
          <Input
            type="date"
            label="Desired Start Date (Optional)"
            value={formData.startDate}
            onChange={(value) => handleInputChange("startDate", value)}
            error={errors.startDate}
          />
        </div>

        {/* Duration */}
        <div className="lg:col-span-1">
          <Input
            type="text"
            label="Duration (Optional)"
            placeholder="6 months, 1 year, Permanent, etc."
            value={formData.duration}
            onChange={(value) => handleInputChange("duration", value)}
            error={errors.duration}
          />
        </div>

        {/* Description */}
        <div className="lg:col-span-1">
          <TextArea
            label="Job Description"
            placeholder="Describe the job responsibilities, requirements, and qualifications..."
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
            error={errors.description}
            rows={6}
            maxLength={2000}
            showCharCount={true}
            icon="text"
            required
          />
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
