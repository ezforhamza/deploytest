// src/config/contentRegistry.js

// Content State Types - Define all possible content states
export const CONTENT_STATES = {
  // Job-related content states
  JOB_BROWSE: 'job_browse',
  JOB_DETAILS: 'job_details', 
  JOB_APPLICATION: 'job_application',
  JOB_MANAGEMENT: 'job_management',
  JOB_CREATE: 'job_create',
  JOB_ANALYTICS: 'job_analytics',
  
  // Profile-related states
  PROFILE_VIEW: 'profile_view',
  PROFILE_EDIT: 'profile_edit',
  PROFILE_SETTINGS: 'profile_settings',
  
  // Alumni-related states
  ALUMNI_NETWORK: 'alumni_network',
  ALUMNI_DIRECTORY: 'alumni_directory',
  ALUMNI_DETAILS: 'alumni_details',
  
  // School-related states  
  SCHOOL_BROWSE: 'school_browse',
  SCHOOL_DETAILS: 'school_details',
  SCHOOL_MANAGEMENT: 'school_management',

  // For You states
  FOR_YOU_FEED: 'for_you_feed',
  FOR_YOU_FILTERS: 'for_you_filters',

  // Home states
  HOME_FEED: 'home_feed',
  HOME_PROFILE_VIEW: 'home_profile_view',
};

// Import existing components to avoid breaking changes
import HomeContent from '../components/dashboard/HomeContent';
import ForYouContent from '../components/dashboard/ForYouContent';
import JobOffersContent from '../components/dashboard/JobOffersContent';
import SchoolsContent from '../components/dashboard/SchoolsContent';
import ProfileContent from '../components/dashboard/ProfileContent';
import PostJobsContent from '../components/dashboard/PostJobsContent';
import AlumniNetworkContent from '../components/dashboard/AlumniNetworkContent';
import AlumniContent from '../components/dashboard/AlumniContent';
import CompaniesContent from '../components/dashboard/CompaniesContent';
import ProfileSettings from '../components/settings/ProfileSettings';

// Content Registry - Maps Navigation → Role → State → Component
// 🚧 READY FOR SMART CONTENT IMPLEMENTATION
// Currently uses existing components as fallback, ready for role-specific components
export const CONTENT_REGISTRY = {
  'Home': {
    alumni: {
      [CONTENT_STATES.HOME_FEED]: HomeContent,
      [CONTENT_STATES.HOME_PROFILE_VIEW]: HomeContent,
    },
    company: {
      [CONTENT_STATES.HOME_FEED]: HomeContent,
      [CONTENT_STATES.HOME_PROFILE_VIEW]: HomeContent,
    },
    school: {
      [CONTENT_STATES.HOME_FEED]: HomeContent,
      [CONTENT_STATES.HOME_PROFILE_VIEW]: HomeContent,
    }
  },

  'For You': {
    alumni: {
      [CONTENT_STATES.FOR_YOU_FEED]: ForYouContent,
      [CONTENT_STATES.FOR_YOU_FILTERS]: ForYouContent,
    },
    company: {
      [CONTENT_STATES.FOR_YOU_FEED]: ForYouContent,
      [CONTENT_STATES.FOR_YOU_FILTERS]: ForYouContent,
    },
    school: {
      [CONTENT_STATES.FOR_YOU_FEED]: ForYouContent,
      [CONTENT_STATES.FOR_YOU_FILTERS]: ForYouContent,
    }
  },
  
  // 🎯 JOB SECTION - Ready for role-specific implementation
  'Job Offers': {
    alumni: {
      [CONTENT_STATES.JOB_BROWSE]: JobOffersContent, // 👈 Replace with AlumniJobBrowser
      [CONTENT_STATES.JOB_DETAILS]: JobOffersContent, // 👈 Replace with JobDetails
      [CONTENT_STATES.JOB_APPLICATION]: JobOffersContent, // 👈 Replace with JobApplication
    },
    company: {
      [CONTENT_STATES.JOB_MANAGEMENT]: PostJobsContent, // 👈 Replace with CompanyJobManagement
      [CONTENT_STATES.JOB_CREATE]: PostJobsContent, // 👈 Replace with CreateJobPosting
      [CONTENT_STATES.JOB_ANALYTICS]: PostJobsContent, // 👈 Replace with JobAnalytics
    },
    school: {
      [CONTENT_STATES.SCHOOL_BROWSE]: JobOffersContent, // 👈 Replace with SchoolJobPartnership
      [CONTENT_STATES.JOB_DETAILS]: JobOffersContent, // 👈 Replace with JobDetails
    }
  },

  'Jobs': {
    company: {
      [CONTENT_STATES.JOB_MANAGEMENT]: PostJobsContent, // 👈 Replace with CompanyJobManagement
      [CONTENT_STATES.JOB_CREATE]: PostJobsContent, // 👈 Replace with CreateJobPosting
      [CONTENT_STATES.JOB_ANALYTICS]: PostJobsContent, // 👈 Replace with JobAnalytics
    }
  },

  'Post Jobs': {
    company: {
      [CONTENT_STATES.JOB_CREATE]: PostJobsContent, // 👈 Replace with CreateJobPosting
      [CONTENT_STATES.JOB_MANAGEMENT]: PostJobsContent, // 👈 Replace with CompanyJobManagement
    }
  },

  // 🎯 ALUMNI SECTION - Ready for role-specific implementation
  'Alumni Network': {
    company: {
      [CONTENT_STATES.ALUMNI_DIRECTORY]: AlumniNetworkContent, // 👈 Replace with CompanyAlumniDirectory
      [CONTENT_STATES.ALUMNI_DETAILS]: AlumniNetworkContent, // 👈 Replace with AlumniDetailsView
    }
  },

  'Alumni': {
    school: {
      [CONTENT_STATES.ALUMNI_NETWORK]: AlumniContent, // 👈 Replace with SchoolAlumniManagement
      [CONTENT_STATES.ALUMNI_DETAILS]: AlumniContent, // 👈 Replace with AlumniDetailsView
    }
  },

  // 🎯 SCHOOLS SECTION - Ready for role-specific implementation  
  'Schools': {
    alumni: {
      [CONTENT_STATES.SCHOOL_BROWSE]: SchoolsContent, // 👈 Replace with AlumniSchoolBrowser
      [CONTENT_STATES.SCHOOL_DETAILS]: SchoolsContent, // 👈 Replace with SchoolDetailsView
    },
    company: {
      [CONTENT_STATES.SCHOOL_BROWSE]: SchoolsContent, // 👈 Replace with CompanySchoolBrowser
      [CONTENT_STATES.SCHOOL_DETAILS]: SchoolsContent, // 👈 Replace with SchoolDetailsView
    },
    school: {
      [CONTENT_STATES.SCHOOL_MANAGEMENT]: SchoolsContent, // 👈 Replace with SchoolManagement
    }
  },

  'Companies': {
    school: {
      [CONTENT_STATES.JOB_BROWSE]: CompaniesContent, // 👈 Replace with SchoolCompanyBrowser
    }
  },

  'Profile': {
    alumni: {
      [CONTENT_STATES.PROFILE_SETTINGS]: ProfileSettings,
    },
    company: {
      [CONTENT_STATES.PROFILE_SETTINGS]: ProfileSettings,
    },
    school: {
      [CONTENT_STATES.PROFILE_SETTINGS]: ProfileSettings,
    }
  }
};

// Default content states for each navigation/role combination
export const DEFAULT_CONTENT_STATES = {
  'Home': {
    alumni: CONTENT_STATES.HOME_FEED,
    company: CONTENT_STATES.HOME_FEED,
    school: CONTENT_STATES.HOME_FEED,
  },
  'For You': {
    alumni: CONTENT_STATES.FOR_YOU_FEED,
    company: CONTENT_STATES.FOR_YOU_FEED,
    school: CONTENT_STATES.FOR_YOU_FEED,
  },
  'Job Offers': {
    alumni: CONTENT_STATES.JOB_BROWSE,
    company: CONTENT_STATES.JOB_MANAGEMENT,
    school: CONTENT_STATES.SCHOOL_BROWSE,
  },
  'Jobs': {
    company: CONTENT_STATES.JOB_MANAGEMENT,
  },
  'Post Jobs': {
    company: CONTENT_STATES.JOB_CREATE,
  },
  'Alumni Network': {
    company: CONTENT_STATES.ALUMNI_DIRECTORY,
  },
  'Alumni': {
    school: CONTENT_STATES.ALUMNI_NETWORK,
  },
  'Schools': {
    alumni: CONTENT_STATES.SCHOOL_BROWSE,
    company: CONTENT_STATES.SCHOOL_BROWSE,
    school: CONTENT_STATES.SCHOOL_MANAGEMENT,
  },
  'Companies': {
    school: CONTENT_STATES.JOB_BROWSE,
  },
  'Profile': {
    alumni: CONTENT_STATES.PROFILE_SETTINGS,
    company: CONTENT_STATES.PROFILE_SETTINGS,
    school: CONTENT_STATES.PROFILE_SETTINGS,
  }
};

// Helper function to get component
export const getContentComponent = (navigation, userRole, contentState) => {
  return CONTENT_REGISTRY[navigation]?.[userRole]?.[contentState] || null;
};

// Helper function to get default state
export const getDefaultContentState = (navigation, userRole) => {
  return DEFAULT_CONTENT_STATES[navigation]?.[userRole] || null;
};

// Fallback to existing behavior for backward compatibility
export const hasSmartContent = (navigation, userRole) => {
  return CONTENT_REGISTRY[navigation]?.[userRole] !== undefined;
};