// src/components/profile/ProfileContent.jsx

import React, { useState } from "react";
import { colors } from "../../styles/tokens";
import Post from "../post/Post";
import JobCard from "../jobs/JobCard";

const ProfileContent = ({ activeTab, content, user, onUserClick, userType = "individual", onJobNavigate }) => {
  // State for saved jobs (used in Jobs tab)
  const [savedJobs, setSavedJobs] = useState(new Set());

  // Posts Tab Content
  const PostsContent = () => {
    if (!content.posts || content.posts.length === 0) {
      return (
        <div className="flex justify-center items-center w-full min-h-[200px] font-lexend"
          style={{ color: colors.text }}
        >
          No posts yet
        </div>
      );
    }

    return (
      <div className="w-full space-y-[10px]">
        {content.posts.map((post, index) => (
          <Post
            key={post.id || index}
            user={{
              avatar: user.avatar,
              companyName: user.name,
              tagline: user.profession,
              date: post.date || "Recently",
              isFollowing: true // Since this is their own profile
            }}
            content={post.content}
            tags={post.tags || []}
            images={post.images || []}
            stats={{
              likes: post.likes || 0,
              comments: post.comments || 0,
              shares: post.shares || 0
            }}
            initialIsLiked={post.isLiked || false}
            initialHasCommented={post.hasCommented || false}
            initialHasShared={post.hasShared || false}
            likesData={post.likesData || []}
            commentsData={post.commentsData || []}
            onLike={(isLiked) => console.log("Like:", isLiked)}
            onComment={(text) => console.log("Comment:", text)}
            onShare={(targets) => console.log("Share:", targets)}
            onFollow={() => console.log("Follow user")}
            onUserClick={onUserClick}
            className="w-full"
          />
        ))}
      </div>
    );
  };

  // Certificates Tab Content
  const CertificatesContent = () => {
    if (!content.certificates || content.certificates.length === 0) {
      return (
        <div className="flex justify-center items-center w-full min-h-[200px] font-lexend"
          style={{ color: colors.text }}
        >
          No certificates yet
        </div>
      );
    }

    return (
      <div className="w-full px-4 sm:px-6 lg:px-[26px]">
        {content.certificates.map((cert, index) => (
          <div key={index}>
            <div className="flex flex-row items-center py-3 sm:py-4 gap-3 sm:gap-4 w-full">
              {/* Certificate Icon */}
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[60px] lg:h-[60px] rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: colors.secondary + "20",
                }}
              >
                <img
                  src={cert.icon || "/common/certificate-icon.png"}
                  alt="Certificate"
                  className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 object-cover"
                  onError={(e) => {
                    // Fallback: show a generic certificate icon
                    const target = e.target;
                    const parent = target?.parentElement;
                    
                    if (target && target.style) {
                      target.style.display = "none";
                    }
                    
                    if (parent && parent.style) {
                      parent.innerHTML = "📜";
                      parent.style.fontSize = "24px";
                    }
                  }}
                />
              </div>

              {/* Certificate Info */}
              <div className="flex flex-col gap-1 flex-1">
                <h4
                  className="font-lexend font-semibold text-sm sm:text-base leading-[150%] m-0"
                  style={{ color: colors.dark }}
                >
                  {cert.title}
                </h4>
                {cert.issuer && (
                  <p
                    className="font-lexend text-xs sm:text-sm m-0"
                    style={{ color: colors.text }}
                  >
                    {cert.issuer}
                  </p>
                )}
              </div>
            </div>

            {/* Separator Line */}
            {index < content.certificates.length - 1 && (
              <div className="w-full h-px bg-[#E2E2E2] m-0" />
            )}
          </div>
        ))}
      </div>
    );
  };

  // Work History Tab Content
  const WorkHistoryContent = () => {
    if (!content.workHistory || content.workHistory.length === 0) {
      return (
        <div className="flex justify-center items-center w-full min-h-[200px] font-lexend"
          style={{ color: colors.text }}
        >
          No work history yet
        </div>
      );
    }

    return (
      <div className="w-full px-4 sm:px-6 lg:px-[26px]">
        {content.workHistory.map((work, index) => (
          <div key={index}>
            <div className="relative w-full min-h-[172.87px] mb-5">
              {/* Job Title */}
              <h3 className="font-lexend font-medium m-0 w-full h-6 opacity-90"
                style={{
                  fontSize: "19.0291px",
                  lineHeight: "24px",
                  letterSpacing: "0.01em",
                  color: "#242424",
                }}
              >
                {work.title}
              </h3>

              {/* Company Name */}
              {work.company && (
                <p className="font-lexend font-normal m-0 w-full h-[21px] opacity-90"
                  style={{
                    fontSize: "16.6505px",
                    lineHeight: "21px",
                    letterSpacing: "0.01em",
                    color: "#58606C",
                    marginTop: "4.54px",
                  }}
                >
                  {work.company}
                </p>
              )}

              {/* Duration */}
              {work.duration && (
                <p className="font-lexend font-normal m-0 w-full h-[21px] opacity-90"
                  style={{
                    fontSize: "16.6505px",
                    lineHeight: "21px",
                    letterSpacing: "0.01em",
                    color: "#58606C",
                    marginTop: "4.46px",
                  }}
                >
                  {work.duration}
                </p>
              )}

              {/* Description */}
              {work.description && (
                <p className="font-lexend font-normal m-0 w-full opacity-90"
                  style={{
                    fontSize: "15.2233px",
                    lineHeight: "150%",
                    color: "#58606C",
                    marginTop: "26.87px",
                  }}
                >
                  {work.description}
                </p>
              )}
            </div>

            {/* Separator Line */}
            {index < content.workHistory.length - 1 && (
              <div className="w-full h-px bg-[#E2E2E2] my-5" />
            )}
          </div>
        ))}

        {/* Education Section (if present) */}
        {content.education && content.education.length > 0 && (
          <div className="mt-[60px]">
            <h3 className="font-lexend font-medium m-0 mb-8 opacity-90"
              style={{
                fontSize: "19.0291px",
                lineHeight: "24px",
                letterSpacing: "0.01em",
                color: "#242424",
              }}
            >
              Education
            </h3>

            {content.education.map((edu, index) => (
              <div
                key={index}
                className={`relative w-full min-h-[140px] ${
                  index < content.education.length - 1 ? "mb-10" : "mb-0"
                }`}
              >
                <h4 className="font-lexend font-medium m-0 w-full h-6 opacity-90"
                  style={{
                    fontSize: window.innerWidth < 640 ? "16px" : window.innerWidth < 768 ? "17px" : "19.0291px",
                    lineHeight: window.innerWidth < 640 ? "20px" : window.innerWidth < 768 ? "22px" : "24px",
                    letterSpacing: "0.01em",
                    color: "#242424",
                  }}
                >
                  {edu.institution}
                </h4>

                {edu.degree && (
                  <p className="font-lexend font-normal m-0 w-full h-[21px] opacity-90"
                    style={{
                      fontSize: "16.6505px",
                      lineHeight: "21px",
                      letterSpacing: "0.01em",
                      color: "#58606C",
                      marginTop: "4.54px",
                    }}
                  >
                    {edu.degree}
                  </p>
                )}

                {edu.duration && (
                  <p className="font-lexend font-normal m-0 w-full h-[21px] opacity-90"
                    style={{
                      fontSize: "16.6505px",
                      lineHeight: "21px",
                      letterSpacing: "0.01em",
                      color: "#58606C",
                      marginTop: "4.46px",
                    }}
                  >
                    {edu.duration}
                  </p>
                )}

                {edu.description && (
                  <p className="font-lexend font-normal m-0 w-full opacity-90"
                    style={{
                      fontSize: "15.2233px",
                      lineHeight: "150%",
                      color: "#58606C",
                      marginTop: "26.87px",
                    }}
                  >
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // About Tab Content
  const AboutContent = () => {
    const aboutData = content.about || {};
    
    return (
      <div className="w-full px-4 sm:px-6 lg:px-[26px]">
        {/* Company/School Description */}
        {aboutData.description && (
          <div className="mb-8">
            <h3 className="font-lexend font-semibold text-base sm:text-lg mb-3 sm:mb-4" style={{ color: colors.dark }}>
              {userType === "company" ? "About Company" : "About School"}
            </h3>
            <p className="font-lexend text-xs sm:text-sm leading-[150%] opacity-90" style={{ color: colors.text }}>
              {aboutData.description}
            </p>
          </div>
        )}

        {/* Founded/Established */}
        {aboutData.founded && (
          <div className="mb-6">
            <h4 className="font-lexend font-medium text-sm sm:text-base mb-2" style={{ color: colors.dark }}>
              {userType === "company" ? "Founded" : "Established"}
            </h4>
            <p className="font-lexend text-xs sm:text-sm opacity-90" style={{ color: colors.text }}>
              {aboutData.founded}
            </p>
          </div>
        )}

        {/* Industry/Type */}
        {aboutData.industry && (
          <div className="mb-6">
            <h4 className="font-lexend font-medium text-sm sm:text-base mb-2" style={{ color: colors.dark }}>
              {userType === "company" ? "Industry" : "Type"}
            </h4>
            <p className="font-lexend text-xs sm:text-sm opacity-90" style={{ color: colors.text }}>
              {aboutData.industry}
            </p>
          </div>
        )}

        {/* Size/Students */}
        {aboutData.size && (
          <div className="mb-6">
            <h4 className="font-lexend font-medium text-sm sm:text-base mb-2" style={{ color: colors.dark }}>
              {userType === "company" ? "Company Size" : "Student Population"}
            </h4>
            <p className="font-lexend text-xs sm:text-sm opacity-90" style={{ color: colors.text }}>
              {aboutData.size}
            </p>
          </div>
        )}

        {/* Headquarters/Campus */}
        {aboutData.headquarters && (
          <div className="mb-6">
            <h4 className="font-lexend font-medium text-sm sm:text-base mb-2" style={{ color: colors.dark }}>
              {userType === "company" ? "Headquarters" : "Campus Location"}
            </h4>
            <p className="font-lexend text-xs sm:text-sm opacity-90" style={{ color: colors.text }}>
              {aboutData.headquarters}
            </p>
          </div>
        )}

        {/* Website */}
        {aboutData.website && (
          <div className="mb-6">
            <h4 className="font-lexend font-medium text-sm sm:text-base mb-2" style={{ color: colors.dark }}>
              Website
            </h4>
            <a 
              href={aboutData.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-lexend text-sm opacity-90 hover:opacity-100 transition-opacity"
              style={{ color: colors.primary }}
            >
              {aboutData.website}
            </a>
          </div>
        )}

        {/* Specialties */}
        {aboutData.specialties && aboutData.specialties.length > 0 && (
          <div className="mb-6">
            <h4 className="font-lexend font-medium text-sm sm:text-base mb-2" style={{ color: colors.dark }}>
              {userType === "company" ? "Specialties" : "Programs"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {aboutData.specialties.map((specialty, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full border font-lexend text-xs"
                  style={{ 
                    borderColor: colors.border || "#E2E2E2",
                    backgroundColor: colors.background || "#F8F9FA",
                    color: colors.text
                  }}
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Jobs Tab Content (for companies)
  const JobsContent = () => {
    const jobsData = content.jobs || [];
    
    if (jobsData.length === 0) {
      return (
        <div className="flex justify-center items-center w-full min-h-[200px] font-lexend"
          style={{ color: colors.text }}
        >
          No job openings at the moment
        </div>
      );
    }

    // Transform job data to match JobCard props
    const transformJobData = (job) => ({
      jobTitle: job.title,
      companyName: user.name, // Use the company name from user
      companyLogo: user.avatar || user.profilePic,
      workType: job.location || "Office 🏢",
      jobType: job.type || "Full-time 👔",
      level: job.experience || "Entry-level 🌱",
      datePosted: job.postedDate || "Recently",
      salary: job.salary || "Competitive",
      duration: "Permanent",
    });

    const handleSaveJob = (jobId, jobTitle) => {
      const newSavedJobs = new Set(savedJobs);
      if (savedJobs.has(jobId)) {
        newSavedJobs.delete(jobId);
        console.log("Removed job from saved:", jobTitle);
        // Here you would typically make an API call to remove from saved jobs
        // Example: await unsaveJob(jobId);
      } else {
        newSavedJobs.add(jobId);
        console.log("Saved job:", jobTitle);
        // Here you would typically make an API call to save the job
        // Example: await saveJob(jobId);
      }
      setSavedJobs(newSavedJobs);
    };

    return (
      <div className="w-full px-4 sm:px-6 lg:px-[26px]">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3">
          {jobsData.map((job, index) => (
            <JobCard
              key={job.id || index}
              {...transformJobData(job)}
              onSave={() => handleSaveJob(job.id || index, job.title)}
              isSaved={savedJobs.has(job.id || index)}
              onClick={() => {
                if (onJobNavigate && job.originalJobData) {
                  // Navigate to main jobs view with the selected job
                  onJobNavigate(job.originalJobData);
                } else {
                  console.log("View job details:", job.title);
                }
              }}
              onCompanyClick={() => {}} // Disable company click since we're already on the company profile
            />
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "posts":
        return <PostsContent />;
      case "about":
        return <AboutContent />;
      case "jobs":
        return <JobsContent />;
      case "certificates":
        return <CertificatesContent />;
      case "workHistory":
        return <WorkHistoryContent />;
      default:
        return <PostsContent />;
    }
  };

  return <div className="flex flex-col items-start w-full min-h-[200px] sm:min-h-[250px] lg:min-h-[300px]">{renderContent()}</div>;
};

export default ProfileContent;
