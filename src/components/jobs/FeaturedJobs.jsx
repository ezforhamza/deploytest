// src/components/jobs/FeaturedJobs.jsx

import React from "react";
import { colors, typography } from "../../styles/tokens";

const FeaturedJobs = ({
  jobs = [],
  onSeeAllClick = () => {},
  onJobClick = () => {},
  className = "",
}) => {
  // Default jobs data if none provided (limited to 3 rows)
  const defaultJobs = [
    {
      id: 1,
      title: "Software Development",
      company: "Nam-zim",
      image: "/common/profile-image.png",
    },
    {
      id: 2,
      title: "UI/UX Designer",
      company: "Lexiqvolax",
      image: "/common/profile-image.png",
    },
    {
      id: 3,
      title: "Backend Developer",
      company: "Treequote",
      image: "/common/profile-image.png",
    },
  ];

  const jobsToRender = (jobs.length > 0 ? jobs : defaultJobs).slice(0, 3);

  const containerStyles = {
    position: "relative",
    width: "293px",
    minHeight: "auto",
    backgroundColor: colors.white,
    borderRadius: "10px",
    padding: "16px",
    boxSizing: "border-box",
  };

  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "20px",
    height: "18px",
  };

  const titleStyles = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.medium, // 500
    fontSize: "14px",
    lineHeight: "18px",
    color: colors.dark,
    margin: 0,
  };

  const seeAllStyles = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.regular, // 400
    fontSize: "14px",
    lineHeight: "18px",
    color: colors.primary,
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    background: "transparent",
    padding: 0,
  };

  const jobsListStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  const jobItemStyles = {
    display: "flex",
    alignItems: "center",
    gap: "7.69px",
    cursor: "pointer",
    transition: "opacity 0.2s ease",
  };

  const jobImageStyles = {
    width: "59px",
    height: "59px",
    borderRadius: "55px",
    backgroundColor: "rgba(210, 210, 210, 0.2)",
    overflow: "hidden",
    flexShrink: 0,
  };

  const jobInfoStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "1.92px",
    flex: 1,
  };

  const jobTitleStyles = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: 600,
    fontSize: "14px",
    lineHeight: "132%", // 18px
    color: colors.text,
    margin: 0,
  };

  const jobCompanyStyles = {
    fontFamily: typography.fontFamily.primary,
    fontWeight: typography.fontWeight.regular, // 400
    fontSize: "9.8092px",
    lineHeight: "132%", // 13px
    color: colors.text,
    margin: 0,
  };

  const dividerStyles = {
    width: "100%",
    height: "1px",
    backgroundColor: "#E2E2E2",
    border: "none",
    margin: "12px 0",
  };

  return (
    <div style={containerStyles} className={className}>
      {/* Header */}
      <div style={headerStyles}>
        <h3 style={titleStyles}>Featured Jobs</h3>
        <button style={seeAllStyles} onClick={onSeeAllClick}>
          See All
        </button>
      </div>

      {/* Jobs List */}
      <div style={jobsListStyles}>
        {jobsToRender.map((job, index) => (
          <React.Fragment key={job.id || index}>
            <div
              style={jobItemStyles}
              onClick={() => onJobClick(job)}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              {/* Job Image */}
              <div style={jobImageStyles}>
                <img
                  src={job.image || "/common/profile-image.png"}
                  alt={job.company}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Job Info */}
              <div style={jobInfoStyles}>
                <h4 style={jobTitleStyles}>{job.title}</h4>
                <p style={jobCompanyStyles}>{job.company}</p>
              </div>
            </div>

            {/* Divider (except for last item) */}
            {index < jobsToRender.length - 1 && <hr style={dividerStyles} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
