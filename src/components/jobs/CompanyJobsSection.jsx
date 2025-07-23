// src/components/jobs/CompanyJobsSection.jsx

import { useState } from "react";
import JobsTabs from "./JobsTabs";
import JobCard from "./JobCard";
import JobDetails from "./JobDetails";
import Profile from "../profile/Profile";
import RightSidebar from "../dashboard/RightSidebar";
import { colors } from "../../styles/tokens";
import { getCompanyJobsData } from "./mockJobData";

const CompanyJobsSection = ({
  currentJobs = [],
  pastJobs = [],
  onJobSave = () => {},
  onCloseJob = () => {},
  userRole = "company",
}) => {
  const [activeTab, setActiveTab] = useState("current");
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedJob(null); // Close job details when switching tabs
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  const handleCloseJob = (job) => {
    console.log("Closing job:", job);
    // Call the parent's close job handler to move job to past jobs
    onCloseJob(job);
    // Close the job details view
    setSelectedJob(null);
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      return newSet;
    });
    onJobSave(jobId);
  };

  const displayJobs = activeTab === "current" ? currentJobs : pastJobs;

  // Profile handling functions
  const handleProfileClick = (applicant) => {
    setSelectedProfile(applicant);
  };

  const handleBackFromProfile = () => {
    setSelectedProfile(null);
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

  // Mock profile data helper functions with comprehensive data
  const getMockUserData = (applicant) => ({
    id: applicant.id,
    firstName: applicant.name.split(' ')[0],
    lastName: applicant.name.split(' ').slice(1).join(' ') || "Smith",
    name: applicant.name,
    profilePic: applicant.avatar,
    bio: "Passionate Software Developer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies. Always eager to learn new technologies and contribute to innovative projects that make a difference.",
    location: "Lahore, Pakistan",
    education: "Bachelor's in Computer Science - University of Engineering & Technology",
    currentRole: "Senior Software Developer",
    company: "TechVision Solutions",
    joinDate: "2019-03-15",
    isOnline: applicant.isOnline,
    email: `${applicant.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
    phone: "+92 300 1234567",
    website: "www.portfolio.dev",
    linkedIn: "linkedin.com/in/developer",
    github: "github.com/developer",
    yearsOfExperience: 5,
    totalProjects: 25,
    certifications: ["AWS Certified Developer", "React Professional", "Agile Certified"],
  });

  const getMockUserStats = () => ({
    posts: 156,
    followers: 2847,
    following: 892,
    connections: 1200,
    profileViews: 3420,
    searchAppearances: 890,
  });

  const getMockProfileContent = () => ({
    posts: [
      {
        id: 1,
        content: "🚀 Just deployed our latest project - a real-time collaborative dashboard built with React and WebSockets! The performance improvements are incredible. Special thanks to my amazing team for making this possible. #ReactJS #WebDevelopment #TeamWork",
        timestamp: "2024-01-20T14:30:00Z",
        likes: 89,
        comments: 23,
        shares: 12,
        image: "/crousal/onboarding-slide-1.png",
        type: "project_update"
      },
      {
        id: 2,
        content: "Attended an incredible tech conference today on AI and Machine Learning in Software Development. The future of coding is here! Key takeaways: AI-assisted development, automated testing, and intelligent code reviews. Who else is excited about these developments? 🤖💻",
        timestamp: "2024-01-18T09:15:00Z",
        likes: 156,
        comments: 31,
        shares: 8,
        type: "industry_insight"
      },
      {
        id: 3,
        content: "Mentoring junior developers has been one of the most rewarding experiences in my career. Today, one of my mentees successfully deployed their first full-stack application! Proud moment 👨‍💻✨ #Mentorship #CareerGrowth #SoftwareDevelopment",
        timestamp: "2024-01-15T16:45:00Z",
        likes: 203,
        comments: 45,
        shares: 18,
        type: "achievement"
      },
      {
        id: 4,
        content: "Quick tip for fellow React developers: Always use useMemo and useCallback hooks wisely! Over-optimization can sometimes hurt performance more than help. Profile first, optimize second. What's your go-to performance optimization technique? 🔧",
        timestamp: "2024-01-12T11:20:00Z",
        likes: 124,
        comments: 67,
        shares: 22,
        type: "tech_tip"
      },
      {
        id: 5,
        content: "Grateful to be part of such an innovative team at TechVision Solutions! We're working on some groundbreaking projects that will revolutionize how businesses handle their digital transformation. Stay tuned for more updates! 🌟 #Innovation #TechVision #DigitalTransformation",
        timestamp: "2024-01-08T13:00:00Z",
        likes: 78,
        comments: 15,
        shares: 6,
        type: "company_update"
      }
    ],
    experience: [
      {
        id: 1,
        title: "Senior Software Developer",
        company: "TechVision Solutions",
        duration: "2022 - Present",
        location: "Lahore, Pakistan",
        description: "Leading full-stack development projects using React, Node.js, and AWS. Mentoring junior developers and architecting scalable solutions for enterprise clients. Successfully delivered 15+ projects with 99.9% uptime.",
        achievements: [
          "Led development of a microservices architecture serving 1M+ users",
          "Reduced application load time by 60% through optimization",
          "Mentored 8 junior developers, 6 received promotions",
          "Implemented CI/CD pipeline reducing deployment time by 80%"
        ]
      },
      {
        id: 2,
        title: "Full Stack Developer",
        company: "Digital Innovations Ltd",
        duration: "2020 - 2022",
        location: "Karachi, Pakistan",
        description: "Developed and maintained web applications using MERN stack. Collaborated with cross-functional teams to deliver high-quality software solutions.",
        achievements: [
          "Built 12 responsive web applications from scratch",
          "Improved code quality by implementing automated testing (95% coverage)",
          "Reduced API response time by 40% through database optimization"
        ]
      },
      {
        id: 3,
        title: "Junior Software Developer",
        company: "StartupTech Hub",
        duration: "2019 - 2020",
        location: "Islamabad, Pakistan",
        description: "Started career building modern web applications with React and Express.js. Gained experience in agile development and version control systems.",
        achievements: [
          "Contributed to 8 successful product launches",
          "Implemented responsive designs for mobile-first approach",
          "Participated in code reviews and improved coding standards"
        ]
      }
    ],
    education: [
      {
        id: 1,
        degree: "Bachelor of Science in Computer Science",
        institution: "University of Engineering & Technology",
        duration: "2015 - 2019",
        location: "Lahore, Pakistan",
        grade: "3.8/4.0 GPA",
        achievements: [
          "Dean's List for 6 consecutive semesters",
          "Led final year project on AI-based recommendation system",
          "President of Computer Science Society (2018-2019)"
        ]
      },
      {
        id: 2,
        degree: "Intermediate in Computer Science",
        institution: "Government College",
        duration: "2013 - 2015",
        location: "Lahore, Pakistan",
        grade: "92%",
        achievements: [
          "Top 5% in regional examinations",
          "Winner of inter-college programming competition"
        ]
      }
    ],
    skills: [
      { name: "React.js", level: 95, category: "Frontend" },
      { name: "Node.js", level: 90, category: "Backend" },
      { name: "JavaScript/TypeScript", level: 95, category: "Programming" },
      { name: "Python", level: 85, category: "Programming" },
      { name: "AWS", level: 80, category: "Cloud" },
      { name: "MongoDB", level: 85, category: "Database" },
      { name: "PostgreSQL", level: 80, category: "Database" },
      { name: "Docker", level: 75, category: "DevOps" },
      { name: "Git/GitHub", level: 90, category: "Tools" },
      { name: "Figma", level: 70, category: "Design" },
      { name: "Jest/Testing", level: 85, category: "Testing" },
      { name: "GraphQL", level: 75, category: "API" }
    ],
    projects: [
      {
        id: 1,
        name: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with real-time inventory management",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        duration: "3 months",
        team: "4 developers",
        role: "Lead Developer",
        achievements: [
          "Processed $100K+ in transactions within first month",
          "99.9% uptime with automated scaling",
          "Mobile-responsive design with PWA features"
        ]
      },
      {
        id: 2,
        name: "Healthcare Management System",
        description: "Digital platform for patient records and appointment scheduling",
        technologies: ["React", "Express.js", "PostgreSQL", "Socket.io"],
        duration: "4 months",
        team: "6 developers",
        role: "Frontend Lead",
        achievements: [
          "Served 500+ healthcare providers",
          "Reduced appointment scheduling time by 70%",
          "HIPAA compliant with end-to-end encryption"
        ]
      },
      {
        id: 3,
        name: "Real-time Analytics Dashboard",
        description: "Live data visualization platform for business intelligence",
        technologies: ["React", "D3.js", "WebSockets", "Redis"],
        duration: "2 months",
        team: "3 developers",
        role: "Full Stack Developer",
        achievements: [
          "Handles 10M+ data points in real-time",
          "Sub-second query response time",
          "Interactive charts with drill-down capabilities"
        ]
      }
    ],
    certifications: [
      {
        id: 1,
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023-08-15",
        credentialId: "AWS-SAA-12345",
        expiryDate: "2026-08-15"
      },
      {
        id: 2,
        name: "React Professional Developer",
        issuer: "Meta (Facebook)",
        date: "2023-05-20",
        credentialId: "META-REACT-67890"
      },
      {
        id: 3,
        name: "Certified Kubernetes Administrator",
        issuer: "Cloud Native Computing Foundation",
        date: "2023-03-10",
        credentialId: "CKA-54321",
        expiryDate: "2026-03-10"
      }
    ],
    languages: [
      { name: "English", proficiency: "Fluent" },
      { name: "Urdu", proficiency: "Native" },
      { name: "Punjabi", proficiency: "Native" },
      { name: "Arabic", proficiency: "Basic" }
    ]
  });

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

  // If viewing a user profile, show profile layout with right sidebar
  if (selectedProfile) {
    return (
      <div className="w-full h-full flex gap-6">
        {/* Main Content - Profile */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-[10px] overflow-hidden w-full h-full"
               style={{ boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)" }}>
            <div className="p-4 sm:p-6 lg:p-[27px] pt-4 sm:pt-5 lg:pt-[20px] h-full">
              <Profile
                user={getMockUserData(selectedProfile)}
                userStats={getMockUserStats()}
                content={getMockProfileContent()}
                onBack={handleBackFromProfile}
                onUserClick={handleProfileClick}
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block flex-shrink-0 w-[250px] xl:w-[300px] 2xl:w-[350px]">
          <div className="sticky top-[140px]">
            <RightSidebar userRole={userRole} onUserClick={handleProfileClick} />
          </div>
        </div>
      </div>
    );
  }

  // If viewing a company profile, show company profile layout with right sidebar
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
                onUserClick={handleProfileClick}
                onJobNavigate={handleJobNavigate}
                userType="company"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block flex-shrink-0 w-[250px] xl:w-[300px] 2xl:w-[350px]">
          <div className="sticky top-[140px]">
            <RightSidebar userRole={userRole} onUserClick={handleProfileClick} />
          </div>
        </div>
      </div>
    );
  }

  // Regular jobs view
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ backgroundColor: colors.background || "#F8F9FA" }}
    >
      {/* Tabs */}
      <div className="px-6 ">
        <JobsTabs activeTab={activeTab} onTabChange={handleTabChange} />
      </div>

      {/* Content Area */}
      <div className="w-full h-full flex relative">
        {/* Job Cards - Hidden on screens < 1070px when job is selected */}
        <div
          className={`${
            selectedJob ? "hidden xl:flex xl:w-1/2" : "w-full"
          } h-full p-6 overflow-y-auto transition-all duration-300`}
        >
          <div
            className={`w-full grid gap-6 ${
              selectedJob
                ? "grid-cols-1 xl:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
            }`}
          >
            {displayJobs.length > 0 ? (
              displayJobs.map((job) => (
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
                  isSaved={savedJobs.has(job.id)}
                  onClick={() => handleJobClick(job)}
                  onSave={() => handleSaveJob(job.id)}
                  onCompanyClick={handleCompanyClick}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-500">
                <p className="text-lg font-lexend">
                  {activeTab === "current"
                    ? "No current job openings available."
                    : "No past job postings to display."}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Job Details - Full width on screens < 1070px, half width on larger screens */}
        {selectedJob && (
          <div
            className={`${
              selectedJob ? "w-full xl:w-1/2" : "w-1/2"
            } h-full xl:border-l border-gray-200 bg-white`}
          >
            <JobDetails
              job={selectedJob}
              onClose={handleCloseJobDetails}
              isCompanyView={true}
              onCloseJob={handleCloseJob}
              isCurrentJob={activeTab === "current"}
              onProfileClick={handleProfileClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyJobsSection;
