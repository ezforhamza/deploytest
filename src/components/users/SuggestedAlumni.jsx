// /common/profile-image.png

import React, { useState } from "react";
import { MapPin, X, GraduationCap } from "lucide-react";
import { colors, typography } from "../../styles/tokens";

const SuggestedAlumni = ({
  alumni = [],
  onSeeAllClick = () => {},
  onConnectClick = () => {},
  onAlumniClick = () => {},
  onRemoveAlumni = () => {},
  onFetchNewAlumni = () => [], // Function to fetch new alumni when one is removed
  mode = "column", // "column" or "row"
  className = "",
}) => {
  // Default alumni data if none provided
  const defaultAlumni = [
    {
      id: 1,
      name: "John Peterson",
      graduationYear: "Class of 2018",
      location: "San Francisco, CA",
      image: "/common/person.png",
      isConnected: false,
      major: "Computer Science",
      currentPosition: "Software Engineer at Google",
    },
    {
      id: 2,
      name: "Sarah Williams",
      graduationYear: "Class of 2020",
      location: "New York, NY",
      image: "/common/person.png",
      isConnected: false,
      major: "Business Administration",
      currentPosition: "Product Manager at Meta",
    },
    {
      id: 3,
      name: "Michael Chen",
      graduationYear: "Class of 2019",
      location: "Austin, TX",
      image: "/common/person.png",
      isConnected: false,
      major: "Engineering",
      currentPosition: "Senior Developer at Tesla",
    },
  ];

  const [alumniList, setAlumniList] = useState(
    (alumni.length > 0 ? alumni : defaultAlumni).slice(0, 3)
  );

  const handleRemoveAlumni = async (alumniId) => {
    // Remove the alumni from current list
    const updatedAlumni = alumniList.filter((alumni) => alumni.id !== alumniId);

    // Fetch new alumni to replace the removed one
    try {
      const newAlumni = await onFetchNewAlumni();
      if (newAlumni && newAlumni.length > 0) {
        // Add new alumni to maintain the list size
        const alumniToAdd = newAlumni.slice(0, 1); // Add one new alumni
        setAlumniList([...updatedAlumni, ...alumniToAdd]);
      } else {
        setAlumniList(updatedAlumni);
      }
    } catch (error) {
      console.error("Error fetching new alumni:", error);
      setAlumniList(updatedAlumni);
    }

    onRemoveAlumni(alumniId);
  };

  // Column mode styles
  const columnContainerStyles = {
    position: "relative",
    width: "293px",
    minHeight: "auto",
    backgroundColor: colors.white,
    borderRadius: "10px",
    padding: "16px",
    boxSizing: "border-box",
  };

  // Row mode styles
  const rowContainerStyles = {
    position: "relative",
    width: "554px",
    minHeight: "auto",
    backgroundColor: colors.white,
    borderRadius: "10px",
    padding: "16px",
    boxSizing: "border-box",
  };

  const containerStyles =
    mode === "row" ? rowContainerStyles : columnContainerStyles;

  const handleConnectClick = (e, alumni) => {
    e.stopPropagation();
    onConnectClick(alumni);
  };

  const handleAlumniClick = (alumni) => {
    onAlumniClick(alumni);
  };

  const renderColumnMode = () => (
    <>
      {/* Header */}
      <div className="flex justify-between items-end mb-5 h-[18px]">
        <h3
          style={{
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.medium,
            fontSize: "14px",
            lineHeight: "18px",
            color: colors.dark,
            margin: 0,
          }}
        >
          Suggested Alumni
        </h3>
        <button
          onClick={onSeeAllClick}
          className="text-blue-500 hover:text-blue-600 transition-colors"
          style={{
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.regular,
            fontSize: "14px",
            lineHeight: "18px",
            color: colors.primary,
            border: "none",
            background: "transparent",
            padding: 0,
          }}
        >
          See All
        </button>
      </div>

      {/* Alumni List */}
      <div className="flex flex-col gap-3">
        {alumniList.slice(0, 3).map((alumni, index) => (
          <React.Fragment key={alumni.id || index}>
            <div className="flex items-center gap-2 relative h-[59px]">
              {/* Alumni Image */}
              <div
                onClick={() => handleAlumniClick(alumni)}
                className="w-[59px] h-[59px] rounded-full bg-gray-200 overflow-hidden flex-shrink-0 cursor-pointer"
                style={{ backgroundColor: "rgba(210, 210, 210, 0.2)" }}
              >
                <img
                  src={alumni.image || "/common/person.png"}
                  alt={alumni.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Alumni Info */}
              <div className="flex flex-col gap-0.5 flex-1 ml-2">
                <h4
                  onClick={() => handleAlumniClick(alumni)}
                  className="cursor-pointer"
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "132%",
                    color: colors.text,
                    margin: 0,
                  }}
                >
                  {alumni.name}
                </h4>
                <div className="flex items-center gap-1">
                  <GraduationCap
                    size={9.7}
                    color={colors.text}
                    className="flex-shrink-0"
                  />
                  <p
                    style={{
                      fontFamily: typography.fontFamily.primary,
                      fontWeight: typography.fontWeight.regular,
                      fontSize: "9.81px",
                      lineHeight: "132%",
                      color: colors.text,
                      margin: 0,
                    }}
                  >
                    {alumni.graduationYear}
                  </p>
                </div>
              </div>

              {/* Connect Button */}
              <button
                onClick={(e) => handleConnectClick(e, alumni)}
                className="hover:bg-blue-50 transition-colors flex-shrink-0"
                style={{
                  width: "92px",
                  height: "31px",
                  border: "1.34466px solid #1090CF",
                  borderRadius: "134.466px",
                  backgroundColor: "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: typography.fontWeight.regular,
                    fontSize: "13.7155px",
                    lineHeight: "132%",
                    color: colors.primary,
                    margin: 0,
                  }}
                >
                  {alumni.isConnected ? "Connected" : "Connect"}
                </span>
              </button>
            </div>

            {/* Divider */}
            {index < Math.min(alumniList.length, 3) - 1 && (
              <hr className="w-full h-px bg-gray-200 border-none my-3" />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );

  const renderRowMode = () => (
    <>
      {/* Header */}
      <div className="flex justify-between items-end mb-5 h-[18px]">
        <h3
          style={{
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.medium,
            fontSize: "14px",
            lineHeight: "18px",
            color: colors.dark,
            margin: 0,
          }}
        >
          Suggested Alumni
        </h3>
        <button
          onClick={onSeeAllClick}
          className="text-blue-500 hover:text-blue-600 transition-colors"
          style={{
            fontFamily: typography.fontFamily.primary,
            fontWeight: typography.fontWeight.regular,
            fontSize: "14px",
            lineHeight: "18px",
            color: colors.primary,
            border: "none",
            background: "transparent",
            padding: 0,
          }}
        >
          See All
        </button>
      </div>

      {/* Alumni Cards - Centered like a carousel */}
      <div className="flex justify-center items-start gap-8">
        {alumniList.slice(0, 3).map((alumni) => (
          <div
            key={alumni.id}
            className="relative bg-white border border-gray-400 shadow-md"
            style={{
              width: "147.91px",
              height: "164.05px",
              borderRadius: "10.7573px",
              border: "0.941262px solid #A4A4A4",
              boxShadow: "0px 2.68932px 6.45437px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => handleRemoveAlumni(alumni.id)}
              className="absolute top-2 right-2 w-4 h-4 flex items-center justify-center z-10 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Remove alumni"
            >
              <X size={12} color="#49454F" />
            </button>

            {/* Alumni Image */}
            <div
              onClick={() => handleAlumniClick(alumni)}
              className="cursor-pointer mx-auto mt-2"
              style={{
                width: "76.2px",
                height: "76.2px",
                borderRadius: "50%",
                backgroundColor: "rgba(210, 210, 210, 0.2)",
                overflow: "hidden",
              }}
            >
              <img
                src={alumni.image || "/common/person.png"}
                alt={alumni.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Alumni Info - Positioned to avoid overlap with connect button */}
            <div className="flex flex-col items-center text-center px-2 mt-2">
              <h4
                onClick={() => handleAlumniClick(alumni)}
                className="cursor-pointer mb-1"
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.medium,
                  fontSize: "13.7155px",
                  lineHeight: "120%",
                  letterSpacing: "0.01em",
                  color: "#292D32",
                  margin: 0,
                  width: "112px",
                }}
              >
                {alumni.name}
              </h4>

              <div className="flex items-center justify-center gap-1 mb-4">
                <GraduationCap
                  size={9.7}
                  color={colors.text}
                  className="flex-shrink-0"
                />
                <p
                  style={{
                    fontFamily: typography.fontFamily.primary,
                    fontWeight: typography.fontWeight.regular,
                    fontSize: "7.76158px",
                    lineHeight: "132%",
                    color: colors.text,
                    margin: 0,
                  }}
                >
                  {alumni.graduationYear}
                </p>
              </div>
            </div>

            {/* Connect Button - Positioned at bottom to avoid overlap */}
            <button
              onClick={(e) => handleConnectClick(e, alumni)}
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 hover:bg-blue-50 transition-colors"
              style={{
                width: "126.4px",
                height: "30.93px",
                border: "1.34466px solid #1090CF",
                borderRadius: "134.466px",
                backgroundColor: "transparent",
              }}
            >
              <span
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontWeight: typography.fontWeight.regular,
                  fontSize: "13.7155px",
                  lineHeight: "132%",
                  color: colors.primary,
                  margin: 0,
                }}
              >
                {alumni.isConnected ? "Connected" : "Connect"}
              </span>
            </button>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div style={containerStyles} className={`${className}`}>
      {mode === "row" ? renderRowMode() : renderColumnMode()}
    </div>
  );
};

export default SuggestedAlumni;
