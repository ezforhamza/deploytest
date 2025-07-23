// src/components/dashboard/JobOffersContent.jsx

import { useState } from "react";
import { colors } from "../../styles/tokens";
import JobCard from "../jobs/JobCard";
import JobFilters from "../jobs/JobFilters";
import JobDetails from "../jobs/JobDetails";
import Profile from "../profile/Profile";
import RightSidebar from "./RightSidebar";
import { mockJobs, getCompanyJobsData } from "../jobs/mockJobData";

const JobOffersContent = ({ searchValue, showJobFilters, onCloseJobFilters, userRole = "alumni" }) => {
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  // Company profile handling functions
  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const handleBackFromCompany = () => {
    setSelectedCompany(null);
  };

  // Handle navigation from company profile to main jobs view
  const handleJobNavigate = (jobData) => {
    // Close company profile
    setSelectedCompany(null);
    // Select the job in the main view
    setSelectedJob(jobData);
  };

  // Mock company profile data
  const getMockCompanyData = (company) => ({
    id: Math.random().toString(36).substr(2, 9),
    name: company.name,
    profilePic: company.logo,
    avatar: company.logo,
    bio: "Leading technology company specializing in innovative software solutions and digital transformation services. We empower businesses worldwide with cutting-edge technology and exceptional talent.",
    location: "Lahore, Pakistan",
    profession: "Information Technology & Services",
    company: company.name,
    isOnline: true,
  });

  const getMockCompanyStats = () => ({
    posts: 87,
    followers: 15200,
    following: 245,
    connections: 1500,
  });

  const getMockCompanyContent = (companyName) => ({
    posts: [
      {
        id: 1,
        content: "🚀 We're excited to announce the launch of our new AI-powered analytics platform! This cutting-edge solution helps businesses make data-driven decisions faster than ever before. Proud of our amazing development team for making this vision a reality. #Innovation #AI #DataAnalytics #TechVision",
        date: "2 days ago",
        likes: 245,
        comments: 38,
        shares: 22,
        images: ["/crousal/onboarding-slide-2.png"],
      },
      {
        id: 2,
        content: "🌟 Meet our Employee of the Month - Sarah Ahmed, Senior Full Stack Developer! Sarah led the development of our healthcare management system that's now being used by 500+ clinics nationwide. Her dedication to excellence and mentoring junior developers makes her an invaluable team member! #EmployeeSpotlight #TeamAppreciation #HealthTech",
        date: "5 days ago",
        likes: 189,
        comments: 56,
        shares: 15,
      },
      {
        id: 3,
        content: "📈 2023 was an incredible year for TechVision! Key achievements: ✅ 150+ successful projects delivered ✅ 200 new talented team members joined ✅ Expanded to 3 new cities ✅ 99.9% client satisfaction rate ✅ Launched 5 innovative products Thank you to our amazing team and loyal clients for making this possible! Here's to an even better 2024! 🎉",
        date: "1 week ago",
        likes: 467,
        comments: 89,
        shares: 45,
      },
      {
        id: 4,
        content: "💡 Tech Tip Tuesday: The future of software development is here with AI-assisted coding! Our development teams are now using AI tools to: • Automate repetitive tasks • Generate unit tests • Review code quality • Optimize performance This has increased our productivity by 40% while maintaining the highest quality standards. How is your team leveraging AI in development? #TechTips #AIDevelopment #Productivity",
        date: "2 weeks ago",
        likes: 156,
        comments: 78,
        shares: 34,
      },
      {
        id: 5,
        content: "🌱 Giving back to the community! Our team volunteered at the local coding bootcamp, teaching web development fundamentals to 50 aspiring developers. It's incredible to see the passion and dedication of the next generation of tech talent. We're committed to nurturing Pakistan's tech ecosystem! #CommunityService #TechEducation #GivingBack #FutureOfTech",
        date: "3 weeks ago",
        likes: 234,
        comments: 42,
        shares: 28,
      }
    ],
    about: {
      description: "TechVision Solutions is a leading technology company specializing in innovative software solutions and digital transformation services. Founded in 2018, we empower businesses worldwide with cutting-edge technology and exceptional talent. Our mission is to bridge the gap between traditional business processes and modern technological solutions.",
      founded: "2018",
      industry: "Information Technology & Services",
      size: "201-500 employees",
      headquarters: "Lahore, Pakistan",
      website: "www.techvision.com",
      specialties: [
        "Software Development",
        "Cloud Solutions", 
        "AI/ML",
        "Digital Transformation",
        "Mobile App Development",
        "DevOps & Infrastructure"
      ]
    },
    jobs: getCompanyJobsData(companyName)
  });

  const filteredJobs = mockJobs.filter(job => 
    searchValue ? 
      job.jobTitle.toLowerCase().includes(searchValue.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchValue.toLowerCase()) ||
      job.workType.toLowerCase().includes(searchValue.toLowerCase()) ||
      job.level.toLowerCase().includes(searchValue.toLowerCase())
    : true
  );

  // If viewing a company profile, show profile layout with right sidebar
  if (selectedCompany) {
    return (
      <div className="w-full h-full flex gap-6">
        {/* Main Content - Company Profile */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-[10px] overflow-hidden w-full h-full"
               style={{ boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)" }}>
            <div className="p-4 sm:p-6 lg:p-[27px] pt-4 sm:pt-5 lg:pt-[20px] h-full">
              <Profile
                user={getMockCompanyData(selectedCompany)}
                userStats={getMockCompanyStats()}
                content={getMockCompanyContent(selectedCompany?.name || "TechVision Solutions")}
                onBack={handleBackFromCompany}
                onJobNavigate={handleJobNavigate}
                userType="company"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block flex-shrink-0 w-[250px] xl:w-[300px] 2xl:w-[350px]">
          <div className="sticky top-[140px]">
            <RightSidebar userRole={userRole} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-full flex relative"
      style={{ backgroundColor: colors.background || "#F8F9FA" }}
    >
      {/* Job Cards - Hidden on screens < 1070px when job is selected */}
      <div className={`${
        selectedJob 
          ? 'hidden xl:flex xl:w-1/2' 
          : 'w-full'
      } h-full p-6 overflow-y-auto transition-all duration-300`}>
        <div className={`w-full grid gap-6 ${selectedJob 
          ? 'grid-cols-1 xl:grid-cols-2' 
          : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
        }`}>
          {filteredJobs.map(job => (
            <JobCard
              key={job.id}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              companyLogo={job.companyLogo}
              workType={job.workType}
              jobType={job.jobType}
              level={job.level}
              datePosted={job.datePosted}
              salary={job.salary}
              duration={job.duration}
              onSave={() => handleSaveJob(job.id)}
              isSaved={savedJobs.has(job.id)}
              onClick={() => handleJobClick(job)}
              onCompanyClick={handleCompanyClick}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 font-lexend">
              No jobs found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {/* Job Details - Full width on screens < 1070px, half width on larger screens */}
      {selectedJob && (
        <div className={`${
          selectedJob 
            ? 'w-full xl:w-1/2' 
            : 'w-1/2'
        } h-full xl:border-l border-gray-200 bg-white`}>
          <JobDetails 
            job={selectedJob} 
            onClose={handleCloseJobDetails}
          />
        </div>
      )}

      {/* Filter Modal - Positioned on right side with backdrop */}
      {showJobFilters && (
        <div 
          className="fixed inset-0 z-40 flex items-start justify-end p-6"
          onClick={onCloseJobFilters}
        >
          <div 
            className="mt-16 mr-4"
            onClick={(e) => e.stopPropagation()}
          >
            <JobFilters
              isOpen={showJobFilters}
              onClose={onCloseJobFilters}
              className="relative"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default JobOffersContent;