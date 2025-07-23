import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { colors, typography } from '../../../styles/tokens';
import { useAuthStore } from '../../../stores/useAuthStore';
import Input from '../../ui/Input';
import Dropdown from '../../ui/Dropdown';
import ProfileImageUpload from '../../ui/ProfileImageUpload';
import LocationPicker from '../../auth/shared/LocationPicker';
import FilePicker from '../../ui/FilePicker';

const ProfileSetupSettings = ({ userRole = "alumni" }) => {
  const { user } = useAuthStore();
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});

  // Helper function to format dates for input fields
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toISOString().split('T')[0];
    } catch (error) {
      return "";
    }
  };

  // Initialize form data based on user role
  const getInitialFormData = (role, userData) => {
    const baseData = {
      email: userData?.email || "",
      phone: userData?.phoneNo || "",
      location: userData?.location || null,
      country: userData?.country || "",
      state: userData?.state || "",
    };

    switch (role) {
      case 'alumni':
        return {
          ...baseData,
          firstName: userData?.firstname || "",
          lastName: userData?.lastname || "",
          dateOfBirth: formatDate(userData?.dob),
          gender: userData?.gender?.toLowerCase() || "",
          skills: Array.isArray(userData?.skills) ? userData.skills[0] || "" : userData?.skills || "",
          cvFile: userData?.cv || null,
        };
      case 'company':
        return {
          ...baseData,
          companyName: userData?.company || "",
          industry: userData?.industry || "",
        };
      case 'school':
        return {
          ...baseData,
          schoolName: userData?.school || "",
        };
      default:
        return baseData;
    }
  };

  const [formData, setFormData] = useState(() => getInitialFormData(userRole, user));
  const [educationList, setEducationList] = useState([]);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [isLoadingEducation, setIsLoadingEducation] = useState(false);
  const [isLoadingWorkExp, setIsLoadingWorkExp] = useState(false);

  // Fetch education details by IDs
  const fetchEducationDetails = async (educationIds) => {
    if (!educationIds || educationIds.length === 0) return [];
    
    setIsLoadingEducation(true);
    try {
      // Mock API call - replace with actual API endpoint
      const promises = educationIds.map(async (id) => {
        // Replace this with your actual API call
        // const response = await fetch(`/api/education/${id}`);
        // const data = await response.json();
        // return data;
        
        // For now, return mock data structure
        return {
          id: id,
          school: "University Name",
          degree: "Bachelor's Degree", 
          fieldOfWork: "Computer Science",
          startDate: "2020-09-01",
          endDate: "2024-06-01"
        };
      });
      
      const educationData = await Promise.all(promises);
      return educationData;
    } catch (error) {
      console.error('Failed to fetch education details:', error);
      return [];
    } finally {
      setIsLoadingEducation(false);
    }
  };

  // Fetch work experience details by IDs
  const fetchWorkExperienceDetails = async (workExpIds) => {
    if (!workExpIds || workExpIds.length === 0) return [];
    
    setIsLoadingWorkExp(true);
    try {
      // Mock API call - replace with actual API endpoint
      const promises = workExpIds.map(async (id) => {
        // Replace this with your actual API call
        // const response = await fetch(`/api/work-experience/${id}`);
        // const data = await response.json();
        // return data;
        
        // For now, return mock data structure
        return {
          id: id,
          jobTitle: "Software Engineer",
          company: "Tech Company",
          startDate: "2024-07-01",
          endDate: "",
          currentlyWorking: true,
          description: "Working on web applications"
        };
      });
      
      const workExpData = await Promise.all(promises);
      return workExpData;
    } catch (error) {
      console.error('Failed to fetch work experience details:', error);
      return [];
    } finally {
      setIsLoadingWorkExp(false);
    }
  };

  // Skills dropdown options
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
    { value: "flutter", label: "Flutter" },
    { value: "marketing", label: "Marketing" },
    { value: "design", label: "Design" },
    { value: "sales", label: "Sales" },
    { value: "management", label: "Management" },
    { value: "finance", label: "Finance" },
    { value: "accounting", label: "Accounting" },
    { value: "hr", label: "Human Resources" },
    { value: "consulting", label: "Consulting" },
  ];

  // Industry options for company
  const industryOptions = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "consulting", label: "Consulting" },
    { value: "real-estate", label: "Real Estate" },
    { value: "marketing", label: "Marketing" },
    { value: "automotive", label: "Automotive" },
    { value: "aerospace", label: "Aerospace" },
    { value: "agriculture", label: "Agriculture" },
    { value: "construction", label: "Construction" },
    { value: "energy", label: "Energy" },
    { value: "entertainment", label: "Entertainment" },
    { value: "food-beverage", label: "Food & Beverage" },
    { value: "government", label: "Government" },
    { value: "hospitality", label: "Hospitality" },
    { value: "insurance", label: "Insurance" },
    { value: "legal", label: "Legal" },
    { value: "media", label: "Media" },
    { value: "nonprofit", label: "Non-Profit" },
    { value: "pharmaceutical", label: "Pharmaceutical" },
    { value: "transportation", label: "Transportation" },
    { value: "other", label: "Other" },
  ];

  // Gender options
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
    { value: "prefer-not-to-say", label: "Prefer not to say" },
  ];

  // Update form data when user data changes
  useEffect(() => {
    const initializeData = async () => {
      setFormData(getInitialFormData(userRole, user));
      
      // Handle education array
      if (user?.education?.length > 0) {
        if (typeof user.education[0] === 'object') {
          // If education contains full objects
          setEducationList(
            user.education.map((edu, index) => ({ 
              ...edu, 
              id: edu.id || edu._id || Date.now() + index,
              startDate: formatDate(edu.startDate),
              endDate: formatDate(edu.endDate)
            }))
          );
        } else {
          // If education contains only IDs, fetch the full data
          const educationData = await fetchEducationDetails(user.education);
          setEducationList(educationData);
        }
      } else {
        setEducationList([]);
      }
      
      // Handle work experience array
      if (user?.workExperience?.length > 0) {
        if (typeof user.workExperience[0] === 'object') {
          // If workExperience contains full objects
          setWorkExperiences(
            user.workExperience.map((exp, index) => ({ 
              ...exp, 
              id: exp.id || exp._id || Date.now() + index + 1000,
              startDate: formatDate(exp.startDate),
              endDate: formatDate(exp.endDate)
            }))
          );
        } else {
          // If workExperience contains only IDs, fetch the full data
          const workExpData = await fetchWorkExperienceDetails(user.workExperience);
          setWorkExperiences(workExpData);
        }
      } else {
        setWorkExperiences([]);
      }
      
      // Handle profile image
      if (user?.image) {
        setProfileImage(user.image);
      }
    };

    if (user) {
      initializeData();
    }
  }, [user, userRole]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addEducation = () => {
    const newEducation = {
      id: Date.now(),
      school: "",
      degree: "",
      fieldOfWork: "",
      startDate: "",
      endDate: "",
    };
    setEducationList([...educationList, newEducation]);
  };

  const updateEducation = (id, field, value) => {
    setEducationList(educationList.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  const removeEducation = (id) => {
    setEducationList(educationList.filter(edu => edu.id !== id));
  };

  const addWorkExperience = () => {
    const newExperience = {
      id: Date.now(),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: ""
    };
    setWorkExperiences([...workExperiences, newExperience]);
  };

  const updateWorkExperience = (id, field, value) => {
    setWorkExperiences(workExperiences.map(exp =>
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const removeWorkExperience = (id) => {
    setWorkExperiences(workExperiences.filter(exp => exp.id !== id));
  };

  const handleSave = () => {
    // TODO: Implement API call to save profile data
    console.log('Saving profile data:', { formData, educationList, workExperiences });
  };

  return (
    <div className="p-8" style={{ color: colors.text }}>
      <div className="space-y-6">
        {/* Profile Image */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h4 className="font-medium mb-4" style={{ color: colors.dark }}>Profile Picture</h4>
          <ProfileImageUpload
            value={profileImage}
            onChange={setProfileImage}
          />
        </div>

        {/* Role-specific forms */}
        {userRole === 'alumni' && (
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium mb-4" style={{ color: colors.dark }}>Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  value={formData.firstName}
                  onChange={(value) => handleInputChange('firstName', value)}
                  placeholder="Enter first name"
                  required
                />
                <Input
                  label="Last Name"
                  value={formData.lastName}
                  onChange={(value) => handleInputChange('lastName', value)}
                  placeholder="Enter last name"
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  icon="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  placeholder="Enter email"
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  icon="phone"
                  value={formData.phone}
                  onChange={(value) => handleInputChange('phone', value)}
                  placeholder="Enter phone number"
                  required
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(value) => handleInputChange('dateOfBirth', value)}
                  required
                />
                <Dropdown
                  label="Gender"
                  value={formData.gender}
                  onChange={(value) => handleInputChange('gender', value)}
                  options={genderOptions}
                  placeholder="Select gender"
                />
              </div>
            </div>

            {/* Education Form */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium" style={{ color: colors.dark }}>Education</h4>
                <button
                  onClick={addEducation}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg"
                  style={{ backgroundColor: colors.primary, color: colors.white }}
                >
                  <Plus size={16} /> Add Education
                </button>
              </div>
              <div className="space-y-4">
                {isLoadingEducation && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">Loading education data...</p>
                  </div>
                )}
                {educationList.map((edu) => (
                  <div key={edu.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium">Education Entry</h5>
                      <button
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        label="School/University"
                        value={edu.school}
                        onChange={(value) => updateEducation(edu.id, 'school', value)}
                        placeholder="School/University"
                      />
                      <Input
                        label="Degree"
                        value={edu.degree}
                        onChange={(value) => updateEducation(edu.id, 'degree', value)}
                        placeholder="Degree"
                      />
                      <Input
                        label="Field of Study"
                        value={edu.fieldOfWork}
                        onChange={(value) => updateEducation(edu.id, 'fieldOfWork', value)}
                        placeholder="Field of Study"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          label="Start Date"
                          type="date"
                          value={edu.startDate}
                          onChange={(value) => updateEducation(edu.id, 'startDate', value)}
                        />
                        <Input
                          label="End Date"
                          type="date"
                          value={edu.endDate}
                          onChange={(value) => updateEducation(edu.id, 'endDate', value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Dropdown */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium mb-4" style={{ color: colors.dark }}>Skills</h4>
              <Dropdown
                label="Select Skills"
                value={formData.skills}
                onChange={(value) => handleInputChange('skills', value)}
                options={skillsOptions}
                placeholder="Select your skills"
              />
            </div>

            {/* Upload CV */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="font-medium mb-4" style={{ color: colors.dark }}>CV/Resume</h4>
              <FilePicker
                value={formData.cvFile}
                onChange={(value) => handleInputChange('cvFile', value)}
                accept=".pdf,.doc,.docx"
                label="Upload CV/Resume"
                placeholder="Choose your CV file"
              />
            </div>

            {/* Work Experience Form */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium" style={{ color: colors.dark }}>Work Experience</h4>
                <button
                  onClick={addWorkExperience}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg"
                  style={{ backgroundColor: colors.primary, color: colors.white }}
                >
                  <Plus size={16} /> Add Experience
                </button>
              </div>
              <div className="space-y-4">
                {isLoadingWorkExp && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">Loading work experience data...</p>
                  </div>
                )}
                {workExperiences.map((exp) => (
                  <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-3">
                      <h5 className="font-medium">Work Experience</h5>
                      <button
                        onClick={() => removeWorkExperience(exp.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Input
                        label="Job Title"
                        value={exp.jobTitle}
                        onChange={(value) => updateWorkExperience(exp.id, 'jobTitle', value)}
                        placeholder="Job Title"
                      />
                      <Input
                        label="Company"
                        value={exp.company}
                        onChange={(value) => updateWorkExperience(exp.id, 'company', value)}
                        placeholder="Company"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          label="Start Date"
                          type="date"
                          value={exp.startDate}
                          onChange={(value) => updateWorkExperience(exp.id, 'startDate', value)}
                        />
                        <Input
                          label="End Date"
                          type="date"
                          value={exp.endDate}
                          onChange={(value) => updateWorkExperience(exp.id, 'endDate', value)}
                          disabled={exp.currentlyWorking}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={exp.currentlyWorking}
                            onChange={(e) => updateWorkExperience(exp.id, 'currentlyWorking', e.target.checked)}
                          />
                          <span className="text-sm">Currently working here</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {userRole === 'company' && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-4" style={{ color: colors.dark }}>Company Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                value={formData.companyName}
                onChange={(value) => handleInputChange('companyName', value)}
                placeholder="Enter company name"
                required
              />
              <Input
                label="Email"
                type="email"
                icon="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder="Enter email"
                required
              />
              <Input
                label="Phone"
                type="tel"
                icon="phone"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                placeholder="Enter phone number"
                required
              />
              <Dropdown
                label="Industry"
                value={formData.industry}
                onChange={(value) => handleInputChange('industry', value)}
                options={industryOptions}
                placeholder="Select industry"
                required
              />
              <div className="md:col-span-2">
                <LocationPicker
                  label="Location"
                  value={formData.location}
                  onChange={(value) => handleInputChange('location', value)}
                  placeholder="Enter company location"
                />
              </div>
              <Input
                label="Country"
                value={formData.country}
                onChange={(value) => handleInputChange('country', value)}
                placeholder="Enter country"
                required
              />
            </div>
          </div>
        )}

        {userRole === 'school' && (
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-4" style={{ color: colors.dark }}>School Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="School Name"
                value={formData.schoolName}
                onChange={(value) => handleInputChange('schoolName', value)}
                placeholder="Enter school name"
                required
              />
              <Input
                label="Email"
                type="email"
                icon="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder="Enter email"
                required
              />
              <Input
                label="Phone"
                type="tel"
                icon="phone"
                value={formData.phone}
                onChange={(value) => handleInputChange('phone', value)}
                placeholder="Enter phone number"
                required
              />
              <div className="md:col-span-2">
                <LocationPicker
                  label="Location"
                  value={formData.location}
                  onChange={(value) => handleInputChange('location', value)}
                  placeholder="Enter school location"
                />
              </div>
              <Input
                label="Country"
                value={formData.country}
                onChange={(value) => handleInputChange('country', value)}
                placeholder="Enter country"
                required
              />
              <Input
                label="State"
                value={formData.state}
                onChange={(value) => handleInputChange('state', value)}
                placeholder="Enter state"
                required
              />
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-lg text-white font-medium"
            style={{ backgroundColor: colors.primary, fontFamily: typography.fontFamily.primary }}
          >
            Save Profile Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetupSettings;