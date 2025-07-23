// src/components/dashboard/HomeContent.jsx

import React, { useState } from "react";
import Post from "../post/Post";
import RightSidebar from "./RightSidebar";
import Profile from "../profile/Profile";

// Utility function to generate random Unsplash URLs

const getRandomProfileImage = () => {
  // Array of different professional portrait photo IDs from Unsplash
  const profilePhotoIds = [
    "photo-1507003211169-0a1dd7228f2d", // Original photo
    "photo-1472099645785-5658abf4ff4e", // Professional man
    "photo-1494790108755-2616c9777a7e", // Professional woman
    "photo-1519085360753-af0119f7cbe7", // Business man
    "photo-1438761681033-6461ffad8d80", // Business woman
    "photo-1500648767791-00dcc994a43e", // Young professional
    "photo-1573496359142-b8d87734a5a2", // Professional woman 2
    "photo-1560250097-0b93528c311a", // Professional man 2
    "photo-1580489944761-15a19d654956", // Professional woman 3
    "photo-1607990281513-2c110a25bd8c", // Professional man 3
  ];

  const randomPhotoId =
    profilePhotoIds[Math.floor(Math.random() * profilePhotoIds.length)];
  return `https://images.unsplash.com/${randomPhotoId}?w=400&h=600&fit=crop&crop=face&random=${Math.floor(
    Math.random() * 1000
  )}`;
};

const HomeContent = ({
  searchValue,
  selectedProfile,
  onProfileClick,
  onBackToHome,
  newPosts = [],
}) => {
  // Use props for profile state management if provided, otherwise use local state
  const [localCurrentView, setLocalCurrentView] = useState("posts");
  const [localSelectedUser, setLocalSelectedUser] = useState(null);

  const currentView = selectedProfile ? "profile" : localCurrentView;
  const selectedUser = selectedProfile || localSelectedUser;
  // Mock posts data - replace with API call
  const mockPosts = [
    {
      id: 1,
      user: {
        avatar: getRandomProfileImage(),
        companyName: "Tech - Technologies Co.",
        tagline: "Leading tech solutions provider",
        date: "11 April 2025",
        isFollowing: false,
      },
      content:
        "💼 Frontend Developer (React.js)\n\n🚀 Hiring React.js Frontend Developer – Remote! Build stunning UIs with a creative team. Click to apply now and grow fast!",
      tags: ["React", "JavaScript", "RemoteWork", "Frontend", "HiringNow"],
      images: [
        `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
      ],
      stats: {
        likes: 70,
        comments: 1,
        shares: 2,
      },
      initialIsLiked: false,
      initialHasCommented: false,
      initialHasShared: false,
    },
    {
      id: 2,
      user: {
        avatar: getRandomProfileImage(),
        companyName: "Esther Howard",
        tagline: "Software Engineer at Microsoft",
        date: "30 March 2025",
        isFollowing: false,
      },
      content:
        "Weekend Shopping Spree 🛒\n\nRetail therapy hits different when there's a sale! 😍 What did you guys buy this weekend?",
      tags: ["ShopTillYouDrop", "HaulTime"],
      images: [
        `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
        `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
      ],
      stats: {
        likes: 70,
        comments: 1,
        shares: 2,
      },
      initialIsLiked: false,
      initialHasCommented: false,
      initialHasShared: false,
    },
    {
      id: 3,
      user: {
        avatar: getRandomProfileImage(),
        companyName: "Esther Howard",
        tagline: "Software Engineer at Microsoft",
        date: "30 March 2025",
        isFollowing: true,
      },
      content:
        "Weekend Shopping Spree 🛒\n\nRetail therapy hits different when there's a sale! 😍 What did you guys buy this weekend?",
      tags: ["ShopTillYouDrop", "HaulTime"],
      images: [
        `https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
        `https://images.unsplash.com/photo-1525904097878-94fb15835963?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
        `https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
      ],
      stats: {
        likes: 57200,
        comments: 1,
        shares: 2,
      },
      initialIsLiked: true,
      initialHasCommented: false,
      initialHasShared: false,
    },
    {
      id: 4,
      user: {
        avatar: getRandomProfileImage(),
        companyName: "Alex Chen",
        tagline: "UX Designer at Google",
        date: "1 week ago",
        isFollowing: false,
      },
      content:
        "Just finished designing a new mobile app interface! 📱✨\n\nThe challenge was creating an intuitive user experience while maintaining visual consistency across different screen sizes. Love how the final prototype turned out!",
      tags: [
        "UXDesign",
        "MobileApp",
        "Prototyping",
        "DesignSystem",
        "UserInterface",
      ],
      images: [
        `https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
      ],
      stats: {
        likes: 123,
        comments: 8,
        shares: 4,
      },
      initialIsLiked: false,
      initialHasCommented: false,
      initialHasShared: false,
    },
    {
      id: 5,
      user: {
        avatar: getRandomProfileImage(),
        companyName: "Sarah Johnson",
        tagline: "Marketing Director at Tesla",
        date: "3 days ago",
        isFollowing: true,
      },
      content:
        "Amazing team lunch today! 🍽️👥\n\nNothing beats good food and great conversations with colleagues. These are the moments that make work feel like family. #TeamBuilding",
      tags: ["TeamBuilding", "Company", "Culture", "Networking", "WorkLife"],
      images: [
        `https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
        `https://images.unsplash.com/photo-1529192163734-5fc9ca8d8721?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
      ],
      stats: {
        likes: 89,
        comments: 12,
        shares: 3,
      },
      initialIsLiked: true,
      initialHasCommented: false,
      initialHasShared: false,
    },
    {
      id: 6,
      user: {
        avatar: getRandomProfileImage(),
        companyName: "David Rodriguez",
        tagline: "Data Scientist at Netflix",
        date: "5 days ago",
        isFollowing: false,
      },
      content:
        "Conference season is here! 📊🎤\n\nJust wrapped up my presentation on machine learning trends at #DataCon2025. Great to see so many passionate data professionals in one place. The future of AI looks incredibly promising!",
      tags: [
        "DataScience",
        "MachineLearning",
        "Conference",
        "AI",
        "Presentation",
      ],
      images: [
        `https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
        `https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
        `https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
        `https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop&random=${Math.floor(
          Math.random() * 1000
        )}`,
      ],
      stats: {
        likes: 234,
        comments: 18,
        shares: 15,
      },
      initialIsLiked: false,
      initialHasCommented: true,
      initialHasShared: false,
    },
  ];

  // Combine new posts with mock posts (new posts first)
  const allPosts = [...newPosts, ...mockPosts];

  // Filter posts based on search
  const filteredPosts = allPosts.filter((post) => {
    if (!searchValue) return true;

    const content = post.content?.toLowerCase() || "";
    const userName = (
      post.user?.companyName ||
      post.user?.name ||
      ""
    ).toLowerCase();
    const tags = post.tags || [];

    return (
      content.includes(searchValue.toLowerCase()) ||
      userName.includes(searchValue.toLowerCase()) ||
      tags.some((tag) => tag.toLowerCase().includes(searchValue.toLowerCase()))
    );
  });

  const handleLike = async (postId, isLiked) => {
    console.log(`Post ${postId} ${isLiked ? "liked" : "unliked"}`);
    // API call to like/unlike post
  };

  const handleComment = async (postId, commentText) => {
    console.log(`Comment on post ${postId}: ${commentText}`);
    // API call to add comment
  };

  const handleShare = async (postId, shareTargets) => {
    console.log(`Share post ${postId} to:`, shareTargets);
    // API call to share post
  };

  const handleFollow = async (postId, userId) => {
    console.log(`Follow user ${userId} from post ${postId}`);
    // API call to follow user
  };

  const handleUserClick = (user) => {
    if (onProfileClick) {
      onProfileClick(user);
    } else {
      setLocalSelectedUser(user);
      setLocalCurrentView("profile");
    }
  };

  const handleBackToFeed = () => {
    if (onBackToHome) {
      onBackToHome();
    } else {
      setLocalCurrentView("posts");
      setLocalSelectedUser(null);
    }
  };

  // Mock user data for profile view
  const getMockUserData = (user) => ({
    id: user.id || 1,
    name: user.name || user.companyName,
    profession:
      user.tagline ||
      user.graduationYear ||
      user.currentPosition ||
      "Professional",
    location: user.location || "New York, NY",
    avatar: user.avatar || user.image || getRandomProfileImage(),
    backgroundImage: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop&random=${Math.floor(
      Math.random() * 1000
    )}`,
    isVerified: true,
    bio:
      user.bio ||
      "Passionate about technology and innovation. Building the future one line of code at a time.",
    company: user.company || "Tech Solutions Inc.",
    education: user.education || user.major || "Computer Science, MIT",
    website: user.website || "https://example.com",
  });

  const getMockUserStats = () => ({
    posts: 152,
    following: 1205,
    followers: 5842,
  });

  const getMockProfileContent = () => ({
    posts: [
      {
        id: 1,
        content:
          "🚀 Just completed a major project milestone! Our team successfully launched a new feature that improved user engagement by 40%. The journey involved:\n\n• Extensive user research and testing\n• Modern React architecture with hooks\n• Optimized performance and accessibility\n• Comprehensive testing suite\n\nProud of what we accomplished together! 💪",
        tags: [
          "ProjectSuccess",
          "React",
          "TeamWork",
          "UserExperience",
          "Achievement",
        ],
        images: [
          `https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&random=${Math.floor(
            Math.random() * 1000
          )}`,
        ],
        date: "3 days ago",
        likes: 156,
        comments: 23,
        shares: 8,
        isLiked: false,
        hasCommented: false,
        hasShared: false,
        likesData: [
          {
            id: 1,
            username: "Sarah Williams",
            avatar: getRandomProfileImage(),
            profession: "Product Manager",
          },
        ],
        commentsData: [
          {
            id: 1,
            username: "Michael Chen",
            avatar: getRandomProfileImage(),
            text: "Congratulations! Great achievement for the team!",
            timeAgo: "2 hours ago",
            likes: 3,
          },
        ],
      },
      {
        id: 2,
        content:
          "📚 Sharing some insights from my recent deep dive into GraphQL performance optimization:\n\n1. Use DataLoader for N+1 problem resolution\n2. Implement query complexity analysis\n3. Cache at multiple levels (Redis, CDN, application)\n4. Monitor query performance with Apollo Studio\n\nGraphQL is powerful but requires careful optimization. What are your favorite GraphQL performance tips?",
        tags: [
          "GraphQL",
          "Performance",
          "BackendDevelopment",
          "TechTips",
          "Optimization",
        ],
        images: [],
        date: "1 week ago",
        likes: 89,
        comments: 15,
        shares: 12,
        isLiked: true,
        hasCommented: false,
        hasShared: false,
        likesData: [],
        commentsData: [],
      },
      {
        id: 3,
        content:
          "🎉 Excited to share that I'll be mentoring at the upcoming hackathon! Looking forward to working with talented developers and helping them bring their ideas to life.\n\nEvent details:\n📅 This weekend\n📍 Tech Hub Downtown\n🏆 $10k in prizes\n\nIf you're participating, come find me! I'll be focusing on web development and UI/UX mentorship.",
        tags: [
          "Hackathon",
          "Mentorship",
          "WebDevelopment",
          "Community",
          "TechEvent",
        ],
        images: [
          `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop&random=${Math.floor(
            Math.random() * 1000
          )}`,
        ],
        date: "2 weeks ago",
        likes: 67,
        comments: 8,
        shares: 5,
        isLiked: false,
        hasCommented: true,
        hasShared: false,
        likesData: [],
        commentsData: [],
      },
    ],
    certificates: [
      {
        id: 1,
        title: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2024",
        icon: "/common/aws-cert-icon.png",
      },
      {
        id: 2,
        title: "Google Cloud Professional",
        issuer: "Google Cloud",
        date: "2023",
        icon: "/common/gcp-cert-icon.png",
      },
    ],
    workHistory: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        duration: "2022 - Present",
        location: "San Francisco, CA",
        description:
          "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting microservices solutions.",
      },
      {
        id: 2,
        title: "Full Stack Developer",
        company: "StartupXYZ",
        duration: "2020 - 2022",
        location: "Remote",
        description:
          "Built and maintained full-stack applications using modern JavaScript frameworks. Implemented CI/CD pipelines and improved application performance by 60%.",
      },
    ],
  });

  if (currentView === "profile" && selectedUser) {
    return (
      <div className="w-full h-full">
        {/* Profile View */}
        <div
          className="bg-white rounded-[10px] overflow-hidden w-full"
          style={{
            boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)",
          }}
        >
          <div className="p-4 sm:p-6 lg:p-[27px] pt-4 sm:pt-5 lg:pt-[20px]">
            <Profile
              user={getMockUserData(selectedUser)}
              userStats={getMockUserStats()}
              content={getMockProfileContent()}
              onBack={handleBackToFeed}
              onUserClick={handleUserClick}
              className="w-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {/* Main Content - Posts Feed */}
      <div
        className="bg-white rounded-[10px] overflow-hidden w-full"
        style={{
          boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)",
        }}
      >
        <div className="p-4 sm:p-6 lg:p-[27px] pt-4 sm:pt-5 lg:pt-[20px] space-y-[10px]">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Post
                key={post.id}
                user={post.user}
                content={post.content}
                tags={post.tags}
                images={post.images}
                stats={post.stats}
                initialIsLiked={post.initialIsLiked}
                initialHasCommented={post.initialHasCommented}
                initialHasShared={post.initialHasShared}
                onLike={(isLiked) => handleLike(post.id, isLiked)}
                onComment={(commentText) => handleComment(post.id, commentText)}
                onShare={(shareTargets) => handleShare(post.id, shareTargets)}
                onFollow={() => handleFollow(post.id, post.user.id)}
                onUserClick={handleUserClick}
                className="w-full"
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg font-lexend">
                {searchValue
                  ? "No posts found matching your search."
                  : "No posts available."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
