// src/components/dashboard/PostJobsContent.jsx

import React from "react";
import CompanyJobsSection from "../jobs/CompanyJobsSection";

const PostJobsContent = ({ userRole, searchValue, createdJobs = [] }) => {
  const [currentJobsList, setCurrentJobsList] = React.useState([]);
  const [pastJobsList, setPastJobsList] = React.useState([]);
  // Mock data for demonstration - merge with created jobs
  const mockCurrentJobs = [
    {
      id: 1,
      jobTitle: "Senior Software Engineer",
      companyName: "Your Company",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=face",
      workType: "Remote work 🌍",
      jobType: "Full-time 👔",
      level: "Senior-level 🚀",
      datePosted: "January 15, 2025",
      salary: "$80,000 - $120,000",
      duration: "Permanent",
      applicationCount: 24,
      isSaved: false
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      companyName: "Your Company",
      companyLogo: "https://images.unsplash.com/photo-1494790108755-2616c640967e?w=80&h=80&fit=crop&crop=face",
      workType: "Hybrid work 🏢",
      jobType: "Full-time 👔",
      level: "Mid-level 🧠",
      datePosted: "January 10, 2025",
      salary: "$70,000 - $90,000",
      duration: "Permanent",
      applicationCount: 18,
      isSaved: false
    }
  ];

  const mockPastJobs = [
    {
      id: 3,
      jobTitle: "Frontend Developer",
      companyName: "Your Company",
      companyLogo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&crop=face",
      workType: "Remote work 🌍",
      jobType: "Full-time 👔",
      level: "Junior-level 🌱",
      datePosted: "December 1, 2024",
      salary: "$50,000 - $65,000",
      duration: "Permanent",
      applicationCount: 32,
      isSaved: false
    }
  ];

  // Transform created jobs to match the expected format and add to current jobs
  const transformedCreatedJobs = createdJobs.map(job => ({
    id: job.id,
    jobTitle: job.title,
    companyName: job.companyName || "Your Company",
    companyLogo: job.companyLogo || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&crop=face",
    workType: job.workType,
    jobType: job.jobType,
    level: job.level,
    datePosted: new Date(job.datePosted).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    salary: job.salary,
    duration: job.duration,
    applicationCount: job.applicants?.length || 0,
    isSaved: false,
    // Keep original job data for details
    originalJobData: job
  }));

  // Initialize job lists when component mounts or createdJobs change
  React.useEffect(() => {
    // Combine created jobs with mock data (created jobs first)
    const allCurrentJobs = [...transformedCreatedJobs, ...mockCurrentJobs];
    setCurrentJobsList(allCurrentJobs);
    setPastJobsList(mockPastJobs);
  }, [createdJobs]);

  const handleJobClick = (job) => {
    console.log("Job clicked:", job);
    // Handle job click - navigate to job details, etc.
  };

  const handleJobSave = (job) => {
    console.log("Job saved:", job);
    // Handle job save functionality
  };

  const handleCloseJob = (jobToClose) => {
    console.log("Closing job:", jobToClose);
    
    // Find the job in current jobs list
    const jobIndex = currentJobsList.findIndex(job => job.id === jobToClose.id);
    
    if (jobIndex !== -1) {
      // Remove from current jobs
      const updatedCurrentJobs = [...currentJobsList];
      const [closedJob] = updatedCurrentJobs.splice(jobIndex, 1);
      
      // Update the job status to closed and add closed date
      const closedJobData = {
        ...closedJob,
        status: 'closed',
        closedDate: new Date().toISOString(),
        datePosted: closedJob.datePosted || new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        // Update original job data if it exists
        originalJobData: closedJob.originalJobData ? {
          ...closedJob.originalJobData,
          status: 'closed',
          closedDate: new Date().toISOString()
        } : undefined
      };
      
      // Update both lists
      setCurrentJobsList(updatedCurrentJobs);
      setPastJobsList(prevPastJobs => [closedJobData, ...prevPastJobs]);
      
      console.log("Job moved to past jobs successfully");
    }
  };

  return (
    <CompanyJobsSection
      currentJobs={currentJobsList}
      pastJobs={pastJobsList}
      onJobSave={handleJobSave}
      onCloseJob={handleCloseJob}
      userRole={userRole}
    />
  );
};

export default PostJobsContent;