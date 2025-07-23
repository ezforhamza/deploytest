// src/components/dashboard/Dashboard.jsx

import React, { useState } from "react";
import { colors } from "../../styles/tokens";
import SideNavigation from "../layout/SideNavigation";
import TopNavbar from "../layout/TopNavbar";
import DashboardContent from "./DashboardContent";
import RightSidebar from "./RightSidebar";
import ForYouSidebar from "./ForYouSidebar";
import { CreatePostModal, useCreatePost } from "../../features/create-post";
import { ContentProvider } from "../../contexts/ContentContext";
import CreateJob from "../jobs/CreateJob";

const Dashboard = ({ userRole = "alumni" }) => {
  const [activeNav, setActiveNav] = useState("Home");
  const [searchValue, setSearchValue] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [forYouFilters, setForYouFilters] = useState({});
  const [showJobFilters, setShowJobFilters] = useState(false);
  const [showCreateJobForm, setShowCreateJobForm] = useState(false);
  const [createdJobs, setCreatedJobs] = useState([]);

  
  // Create Post Modal hook
  const {
    isCreatePostModalOpen,
    openCreatePostModal,
    closeCreatePostModal,
    createPost
  } = useCreatePost();
  
  // Mock user data - replace with actual auth hook
  const mockUser = {
    name: "Andrew Ainslay",
    location: "Coppell, Virginia",
    image: "/common/profile-image.png",
    role: { name: userRole }
  };

  // Navigation items based on user role
  const getNavigationItems = (role) => {
    const baseItems = [
      {
        id: "Home",
        label: "Home",
        icon: "/icons/home.svg",
      },
      {
        id: "For You",
        label: "For You",
        icon: "/icons/foryou.svg",
      },
      {
        id: "Profile",
        label: "Profile",
        icon: "/icons/profile.svg",
      },
    ];

    // Add role-specific items
    if (role === "alumni") {
      return [
        ...baseItems.slice(0, 2),
        {
          id: "Job Offers",
          label: "Job Offers",
          icon: "/icons/job-offers.svg",
        },
        {
          id: "Schools",
          label: "Schools",
          icon: "/icons/school.svg",
        },
        baseItems[2], // Profile
      ];
    } else if (role === "company") {
      return [
        ...baseItems.slice(0, 2),
        {
          id: "Jobs",
          label: "Jobs",
          icon: "/icons/job-offers.svg",
        },
        {
          id: "Schools",
          label: "Schools",
          icon: "/icons/school.svg",
        },
        baseItems[2], // Profile
      ];
    } else if (role === "school") {
      return [
        ...baseItems.slice(0, 2),
        {
          id: "Companies",
          label: "Companies",
          icon: "/icons/job-offers.svg",
        },
        {
          id: "Schools",
          label: "Schools",
          icon: "/icons/school.svg",
        },
        baseItems[2], // Profile
      ];
    }

    return baseItems;
  };

  const handleNavItemClick = (itemId) => {
    setActiveNav(itemId);
    setSelectedProfile(null); // Clear profile when switching tabs
  };

  const handleProfileClick = (user) => {
    setSelectedProfile(user);
  };

  const handleBackToHome = () => {
    setSelectedProfile(null);
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const handleCreatePost = () => {
    openCreatePostModal();
  };

  const handleCreateJob = () => {
    setShowCreateJobForm(true);
  };

  const handleBackFromCreateJob = () => {
    setShowCreateJobForm(false);
  };

  const handleSaveJob = (jobData) => {
    console.log('Job created:', jobData);
    
    // Add the new job to our created jobs list
    setCreatedJobs(prevJobs => [jobData, ...prevJobs]);
    
    // Close the create job form
    setShowCreateJobForm(false);
    
    // Show success message (you could add a toast notification here)
    console.log('Job successfully created and added to jobs list');
    
    // Optionally redirect to Jobs tab to see the new job
    if (activeNav !== "Jobs") {
      setActiveNav("Jobs");
    }
  };

  const handleCreatePostSubmit = async (postData) => {
    try {
      await createPost(postData);
      
      // Convert the post data to the format expected by the feed
      const newPost = {
        ...postData,
        user: {
          avatar: postData.user.avatar,
          companyName: postData.user.name,
          tagline: postData.user.tagline || `${userRole === 'alumni' ? 'Alumni' : userRole === 'company' ? 'Company Representative' : 'School Representative'}`,
          date: "Just now",
          isFollowing: false
        },
        stats: {
          likes: 0,
          comments: 0,
          shares: 0
        },
        initialIsLiked: false,
        initialHasCommented: false,
        initialHasShared: false
      };
      
      // Add the new post to the beginning of userPosts array
      setUserPosts(prevPosts => [newPost, ...prevPosts]);
      
      console.log('Post created successfully:', postData);
    } catch (error) {
      console.error('Failed to create post:', error);
      // Handle error (show error message, etc.)
    }
  };

  const handleNotificationClick = () => {
    console.log("Notification clicked");
    // Handle notification functionality
  };

  const handleMessageClick = () => {
    console.log("Message clicked");
    // Handle message functionality
  };

  const handleMenuClick = () => {
    console.log("Menu clicked");
    // Handle menu functionality
  };

  const handleFilterClick = () => {
    console.log("Filter clicked, toggling filters from", showJobFilters, "to", !showJobFilters);
    setShowJobFilters(!showJobFilters);
  };

  const handleCloseJobFilters = () => {
    console.log("Close filters called");
    setShowJobFilters(false);
  };

  const handleForYouFilterChange = (filters) => {
    setForYouFilters(filters);
    console.log("ForYou filters changed:", filters);
  };

  // Dynamic navbar configuration based on current context
  const getNavbarConfig = () => {
    // Filter icon for alumni in job offers
    const showFilterIcon = userRole === "alumni" && activeNav === "Job Offers";
    
    // Dynamic create button text and action
    let createButtonText = "Create Post";
    let createAction = handleCreatePost;
    
    if (userRole === "company") {
      if (activeNav === "Jobs" || activeNav === "Post Jobs") {
        createButtonText = "Create Job";
        createAction = handleCreateJob; // Now uses the separate job handler
      }
    }
    
    return {
      showFilterIcon,
      createButtonText,
      createAction,
    };
  };

  const navbarConfig = getNavbarConfig();

  const DashboardLayout = () => (
    <div 
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: colors.background || "#F8F9FA" }}
    >
      {/* Top Navigation */}
      <div 
        className="fixed top-0 left-0 right-0 z-20 w-full"
        style={{ 
          paddingTop: "20px",
          backgroundColor: colors.background || "#F8F9FA"
        }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <TopNavbar
            onSearchChange={handleSearchChange}
            onCreatePost={navbarConfig.createAction}
            onNotificationClick={handleNotificationClick}
            onMessageClick={handleMessageClick}
            onMenuClick={handleMenuClick}
            onFilterClick={handleFilterClick}
            searchValue={searchValue}
            notificationCount={3}
            // Dynamic navbar props
            activeNav={activeNav}
            userRole={userRole}
            showFilterIcon={navbarConfig.showFilterIcon}
            createButtonText={navbarConfig.createButtonText}
            // Filter dropdown (now rendered in JobOffersContent)
            filterDropdown={null}
          />
        </div>
      </div>

      {/* Main Container */}
      <div 
        className="flex-1 w-full"
        style={{ paddingTop: "100px" }}
      >
        <div className="w-full flex px-4 sm:px-6 lg:px-8 gap-4 lg:gap-6">
          {/* Left Column - Side Navigation */}
          <div className="hidden lg:block flex-shrink-0 w-[200px] xl:w-[250px] 2xl:w-[280px]">
            <div className="sticky top-[140px] overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
              <SideNavigation
                activeItem={activeNav}
                onItemClick={handleNavItemClick}
                userProfile={mockUser}
                navigationItems={getNavigationItems(userRole)}
                height="auto"
                showProfile={true}
                showCurvedBackground={true}
                backgroundColor="white"
                curvedBackgroundColor="#F8F9FA"
              />
            </div>
          </div>

          {/* Center Column - Main Content (grows/shrinks dynamically) */}
          <div className="flex-1 min-w-0 w-full lg:w-auto custom-scrollbar">
            <div className="sticky top-[140px] overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar" style={{ backgroundColor: colors.background || "#F8F9FA" }}>
              {showCreateJobForm ? (
                <CreateJob 
                  onBack={handleBackFromCreateJob}
                  onSave={handleSaveJob}
                />
              ) : (
                <DashboardContent
                  activeNav={activeNav}
                  userRole={userRole}
                  searchValue={searchValue}
                  selectedProfile={selectedProfile}
                  onProfileClick={handleProfileClick}
                  onBackToHome={handleBackToHome}
                  userPosts={userPosts}
                  onForYouFilterChange={handleForYouFilterChange}
                  forYouFilters={forYouFilters}
                  showJobFilters={showJobFilters}
                  onCloseJobFilters={handleCloseJobFilters}
                  createdJobs={createdJobs}
                />
              )}
            </div>
          </div>

          {/* Right Column - Conditional Sidebar */}
          {!showCreateJobForm && activeNav !== "Profile" && !["Job Offers", "Jobs", "Post Jobs"].includes(activeNav) && (
            <div className="hidden lg:block flex-shrink-0 w-[250px] xl:w-[300px] 2xl:w-[350px]">
              <div className="sticky top-[140px]">
                <RightSidebar userRole={userRole} onUserClick={handleProfileClick} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-white border-t border-gray-200">
        <div className="flex justify-around items-center py-2">
          {getNavigationItems(userRole).map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavItemClick(item.id)}
              className={`flex flex-col items-center p-2 ${
                activeNav === item.id ? 'text-sky-600' : 'text-gray-400'
              }`}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-6 h-6 mb-1"
              />
              <span className="text-xs font-lexend">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={closeCreatePostModal}
        onCreatePost={handleCreatePostSubmit}
        currentUser={{
          avatar: mockUser.image,
          name: mockUser.name,
          tagline: `${userRole === 'alumni' ? 'Alumni' : userRole === 'company' ? 'Company Representative' : 'School Representative'}`
        }}
      />
    </div>
  );

  // Return Dashboard Layout wrapped in ContentProvider
  return (
    <ContentProvider userRole={userRole} enableSmartContent={true}>
      <DashboardLayout />
    </ContentProvider>
  );
};

export default Dashboard;