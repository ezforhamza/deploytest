
const JobCard = ({ 
  jobTitle = "Software Development",
  companyName = "Nam-zim",
  companyLogo,
  workType = "Remote work 🌍",
  jobType = "Full-time 👔",
  level = "Mid-level 🧠",
  datePosted = "April 11, 2025",
  salary = "$2,500/month",
  duration = "Permanent",
  onSave,
  isSaved = false,
  onClick,
  onCompanyClick
}) => {
  return (
    <div 
      className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg p-4 gap-3 w-full min-w-[234px] max-w-md hover:shadow-xl transition-shadow duration-200 cursor-pointer"
      onClick={onClick}
    >
      {/* Header with company info and save button */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          {/* Company Logo */}
          <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex-shrink-0 overflow-hidden">
            {companyLogo ? (
              <img 
                src={companyLogo} 
                alt={`${companyName} logo`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-bold">
                {companyName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          
          {/* Job Title and Company */}
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg text-gray-700 leading-tight">
              {jobTitle}
            </h3>
            <p 
              className="text-sm text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onCompanyClick && onCompanyClick({ name: companyName, logo: companyLogo });
              }}
            >
              {companyName}
            </p>
          </div>
        </div>
        
        {/* Save Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSave();
          }}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill={isSaved ? "#000" : "none"} 
            stroke="currentColor" 
            strokeWidth="1.5"
            className="text-gray-600"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
          </svg>
        </button>
      </div>

      {/* Job Type Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-50 text-gray-700 px-4 py-1.5 rounded-full text-xs font-normal">
          {workType}
        </span>
        <span className="bg-blue-50 text-gray-700 px-4 py-1.5 rounded-full text-xs font-normal">
          {jobType}
        </span>
        <span className="bg-blue-50 text-gray-700 px-4 py-1.5 rounded-full text-xs font-normal">
          {level}
        </span>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Job Details */}
      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-1 px-3 py-1.5">
          <span>📅</span>
          <span>{datePosted}</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5">
          <span>💰</span>
          <span>{salary}</span>
        </div>
        <div className="flex items-center gap-1 px-3 py-1.5">
          <span>📌</span>
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
};

export default JobCard;