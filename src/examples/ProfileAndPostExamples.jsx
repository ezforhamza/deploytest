// src/examples/ProfileAndPostExamples.jsx
// Comprehensive examples of all profile types and post variations

import React, { useState } from "react";
import Profile from "../components/profile/Profile";
import Post from "../components/post/Post";

// Mock data for likes and comments (define first to avoid reference errors)
const mockLikesData = [
  {
    id: 1,
    username: "Sarah Williams",
    avatar: "/common/profile-image.png",
    profession: "Product Manager"
  },
  {
    id: 2,
    username: "Michael Chen",
    avatar: "/common/profile-image.png",
    profession: "Software Engineer"
  },
  {
    id: 3,
    username: "Emma Davis",
    avatar: "/common/profile-image.png",
    profession: "UX Designer"
  }
];

const mockCommentsData = [
  {
    id: 1,
    username: "Sarah Williams",
    avatar: "/common/profile-image.png",
    text: "Great post! Thanks for sharing your insights.",
    timeAgo: "2 hours ago",
    likes: 5
  },
  {
    id: 2,
    username: "Michael Chen",
    avatar: "/common/profile-image.png",
    text: "This is exactly what I was looking for. Very helpful!",
    timeAgo: "1 hour ago",
    likes: 3
  }
];

// =============================================================================
// PROFILE EXAMPLES
// =============================================================================

// Base user data structure
const baseUser = {
  id: 1,
  name: "John Peterson",
  profession: "Senior Software Engineer",
  location: "San Francisco, CA",
  avatar: "/common/profile-image.png",
  backgroundImage: "/common/profile-bg.jpg",
  isVerified: true,
  bio: "Passionate about technology and innovation. Building the future one line of code at a time.",
  company: "Tech Solutions Inc.",
  education: "Computer Science, MIT",
  website: "https://johnpeterson.dev",
  followers: 5842,
  following: 1205,
  posts: 152
};

const baseUserStats = {
  posts: 152,
  following: 1205,
  followers: 5842
};

const baseContent = {
  posts: [
    {
      id: 1,
      content: "🚀 Just finished working on an amazing project using React and Node.js! The scalability improvements we achieved were incredible - 50% faster load times and 30% better performance. \n\nKey technologies used:\n• React 18 with Concurrent Features\n• Node.js with Express\n• MongoDB with aggregation pipelines\n• Redis for caching\n\nExcited to share more details about the architecture decisions we made. What's your favorite tech stack for full-stack development?",
      tags: ["React", "NodeJS", "MongoDB", "Performance", "WebDevelopment"],
      images: ["/common/project-screenshot.jpg"],
      date: "2 days ago",
      likes: 234,
      comments: 45,
      shares: 12,
      isLiked: false,
      hasCommented: false,
      hasShared: false,
      likesData: mockLikesData,
      commentsData: mockCommentsData
    },
    {
      id: 2,
      content: "🎤 Excited to announce that I'll be speaking at the upcoming Tech Conference 2024! My talk will be about \"Building Scalable React Applications: Lessons from the Trenches\"\n\n📅 Date: March 15-17, 2024\n📍 Location: San Francisco Convention Center\n🎫 Registration: link in bio\n\nLooking forward to sharing insights from real-world projects and connecting with fellow developers. Who else is attending?",
      tags: ["TechConference", "React", "Speaking", "SanFrancisco", "Networking"],
      images: ["/common/conference-banner.jpg"],
      date: "1 week ago",
      likes: 456,
      comments: 78,
      shares: 34,
      isLiked: true,
      hasCommented: false,
      hasShared: false,
      likesData: mockLikesData,
      commentsData: mockCommentsData
    },
    {
      id: 3,
      content: "📚 Just completed my AWS Solutions Architect certification! 🎉\n\nThe journey was challenging but incredibly rewarding. Spent 3 months studying cloud architecture patterns, security best practices, and cost optimization strategies.\n\nKey takeaways:\n• Microservices architecture is powerful but complex\n• Security should be built-in, not bolted-on\n• Cost optimization is an ongoing process\n• Monitoring and observability are crucial\n\nNext goal: AWS DevOps Engineer certification. Thanks to everyone who supported me on this journey!",
      tags: ["AWS", "Certification", "CloudArchitecture", "Achievement", "Learning"],
      images: ["/common/aws-certificate.jpg"],
      date: "2 weeks ago",
      likes: 567,
      comments: 89,
      shares: 23,
      isLiked: false,
      hasCommented: true,
      hasShared: false,
      likesData: mockLikesData,
      commentsData: mockCommentsData
    },
    {
      id: 4,
      content: "💡 Quick tip for React developers: Use React.memo wisely!\n\nI see many developers either overusing or underusing React.memo. Here's when to use it:\n\n✅ Use React.memo when:\n• Component receives the same props frequently\n• Component is expensive to render\n• Component is in a frequently updated parent\n\n❌ Don't use React.memo when:\n• Props change frequently\n• Component is already fast\n• You're just guessing it will help\n\nRemember: Measure first, optimize second! Use React DevTools Profiler to identify actual performance bottlenecks.\n\nWhat's your experience with React performance optimization?",
      tags: ["React", "Performance", "TipsAndTricks", "WebDevelopment", "Optimization"],
      images: [],
      date: "3 weeks ago",
      likes: 789,
      comments: 134,
      shares: 67,
      isLiked: true,
      hasCommented: true,
      hasShared: true,
      likesData: mockLikesData,
      commentsData: mockCommentsData
    },
    {
      id: 5,
      content: "🌟 Team appreciation post! 🌟\n\nJust wrapped up an incredible sprint with my amazing team. We delivered a complex feature 2 days ahead of schedule while maintaining 100% test coverage.\n\nShoutout to:\n• Sarah for her brilliant UX insights\n• Mike for solving that tricky algorithm problem\n• Lisa for keeping us organized and motivated\n• The entire QA team for their thorough testing\n\nGreat products are built by great teams. Feeling grateful to work with such talented people! 🙏",
      tags: ["TeamWork", "Gratitude", "ProjectSuccess", "Leadership", "Collaboration"],
      images: ["/common/team-celebration.jpg"],
      date: "1 month ago",
      likes: 345,
      comments: 56,
      shares: 18,
      isLiked: false,
      hasCommented: false,
      hasShared: false,
      likesData: mockLikesData,
      commentsData: mockCommentsData
    }
  ],
  certificates: [
    {
      id: 1,
      title: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2024",
      image: "/common/aws-cert.png"
    },
    {
      id: 2,
      title: "React Advanced Certification",
      issuer: "Meta",
      date: "2023",
      image: "/common/react-cert.png"
    }
  ],
  workHistory: [
    {
      id: 1,
      position: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      duration: "2022 - Present",
      location: "San Francisco, CA",
      description: "Leading development of scalable web applications"
    },
    {
      id: 2,
      position: "Software Engineer",
      company: "StartupXYZ",
      duration: "2020 - 2022",
      location: "Remote",
      description: "Full-stack development using React and Node.js"
    }
  ]
};

const mockMutualFriends = [
  {
    id: 1,
    name: "Sarah Williams",
    avatar: "/common/profile-image.png"
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/common/profile-image.png"
  },
  {
    id: 3,
    name: "Emma Davis",
    avatar: "/common/profile-image.png"
  }
];

// =============================================================================
// PROFILE TYPE EXAMPLES
// =============================================================================

// 1. PUBLIC PROFILE - Not Following
export const PublicProfileNotFollowing = () => (
  <Profile
    user={baseUser}
    userStats={baseUserStats}
    content={baseContent}
    initialIsFollowing={false}
    initialFollowStatus="follow"
    isPrivate={false}
    mutualFriends={mockMutualFriends}
    totalFollowers={baseUserStats.followers}
    onFollow={(status) => console.log("Follow action:", status)}
    onMessage={() => console.log("Message clicked")}
    onTabChange={(tab) => console.log("Tab changed:", tab)}
    onBack={() => console.log("Back clicked")}
    onShare={() => console.log("Share profile")}
    onReport={(reason) => console.log("Report:", reason)}
    onBlock={() => console.log("Block user")}
    onUserClick={(user) => console.log("Profile user clicked:", user)}
  />
);

// 2. PUBLIC PROFILE - Following
export const PublicProfileFollowing = () => (
  <Profile
    user={{
      ...baseUser,
      name: "Sarah Williams",
      profession: "Product Manager at Meta",
      location: "New York, NY"
    }}
    userStats={{
      ...baseUserStats,
      followers: 8932,
      following: 1456
    }}
    content={baseContent}
    initialIsFollowing={true}
    initialFollowStatus="following"
    isPrivate={false}
    mutualFriends={mockMutualFriends}
    totalFollowers={8932}
    onFollow={(status) => console.log("Unfollow action:", status)}
    onMessage={() => console.log("Message clicked")}
    onTabChange={(tab) => console.log("Tab changed:", tab)}
    onBack={() => console.log("Back clicked")}
    onShare={() => console.log("Share profile")}
    onReport={(reason) => console.log("Report:", reason)}
    onBlock={() => console.log("Block user")}
    onUserClick={(user) => console.log("Profile user clicked:", user)}
  />
);

// 3. PRIVATE PROFILE - Follow Requested
export const PrivateProfileRequested = () => (
  <Profile
    user={{
      ...baseUser,
      name: "Michael Chen",
      profession: "Senior Developer at Tesla",
      location: "Austin, TX"
    }}
    userStats={{
      ...baseUserStats,
      followers: 3421,
      following: 892
    }}
    content={baseContent}
    initialIsFollowing={false}
    initialFollowStatus="requested"
    isPrivate={true}
    mutualFriends={mockMutualFriends}
    totalFollowers={3421}
    onFollow={(status) => console.log("Cancel request:", status)}
    onMessage={() => console.log("Message clicked")}
    onTabChange={(tab) => console.log("Tab changed:", tab)}
    onBack={() => console.log("Back clicked")}
    onShare={() => console.log("Share profile")}
    onReport={(reason) => console.log("Report:", reason)}
    onBlock={() => console.log("Block user")}
    onUserClick={(user) => console.log("Profile user clicked:", user)}
  />
);

// 4. PRIVATE PROFILE - Not Following
export const PrivateProfileNotFollowing = () => (
  <Profile
    user={{
      ...baseUser,
      name: "Emma Davis",
      profession: "UX Designer at Apple",
      location: "Cupertino, CA"
    }}
    userStats={{
      ...baseUserStats,
      followers: 2156,
      following: 654
    }}
    content={baseContent}
    initialIsFollowing={false}
    initialFollowStatus="follow"
    isPrivate={true}
    mutualFriends={mockMutualFriends}
    totalFollowers={2156}
    onFollow={(status) => console.log("Send request:", status)}
    onMessage={() => console.log("Message clicked")}
    onTabChange={(tab) => console.log("Tab changed:", tab)}
    onBack={() => console.log("Back clicked")}
    onShare={() => console.log("Share profile")}
    onReport={(reason) => console.log("Report:", reason)}
    onBlock={() => console.log("Block user")}
    onUserClick={(user) => console.log("Profile user clicked:", user)}
  />
);

// 5. BUSINESS CARD PROFILE (Company)
export const BusinessCardProfile = () => (
  <Profile
    user={{
      ...baseUser,
      name: "Tech Solutions Inc.",
      profession: "Technology Solutions Provider",
      location: "San Francisco, CA",
      avatar: "/common/company-logo.png",
      bio: "Leading provider of innovative technology solutions for enterprises worldwide.",
      company: "Tech Solutions Inc.",
      website: "https://techsolutions.com",
      isVerified: true
    }}
    userStats={{
      posts: 234,
      following: 156,
      followers: 15642
    }}
    content={{
      posts: [
        {
          id: 1,
          content: "🚀 We're hiring! Multiple positions available in our engineering team. Join us in building the future of technology!",
          tags: ["Hiring", "Engineering", "Technology", "Careers"],
          images: ["/common/hiring-banner.jpg"],
          date: "1 day ago",
          likes: 156,
          comments: 23,
          shares: 45
        }
      ],
      about: {
        description: "Tech Solutions Inc. is a leading technology company providing innovative solutions for enterprises worldwide. We specialize in cloud computing, AI/ML, and scalable web applications.",
        founded: "2015",
        industry: "Technology",
        size: "500-1000 employees",
        headquarters: "San Francisco, CA",
        website: "https://techsolutions.com",
        specialties: ["Cloud Computing", "AI/ML", "Web Development", "DevOps", "Cybersecurity"]
      },
      jobs: [
        {
          title: "Senior React Developer",
          department: "Engineering",
          location: "San Francisco, CA (Hybrid)",
          type: "Full-time",
          salary: "$130,000 - $180,000",
          description: "We're looking for a skilled React developer to join our frontend team. You'll work on building scalable web applications and mentoring junior developers."
        },
        {
          title: "DevOps Engineer",
          department: "Infrastructure",
          location: "Remote",
          type: "Full-time",
          salary: "$120,000 - $160,000",
          description: "Join our DevOps team to build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure system reliability."
        }
      ]
    }}
    initialIsFollowing={false}
    initialFollowStatus="follow"
    isPrivate={false}
    mutualFriends={[]}
    totalFollowers={15642}
    userType="company"
    onFollow={(status) => console.log("Follow company:", status)}
    onMessage={() => console.log("Contact company")}
    onTabChange={(tab) => console.log("Tab changed:", tab)}
    onBack={() => console.log("Back clicked")}
    onShare={() => console.log("Share company profile")}
    onReport={(reason) => console.log("Report company:", reason)}
    onBlock={() => console.log("Block company")}
  />
);

// 6. PARTNER PROFILE (Special status)
export const PartnerProfile = () => (
  <Profile
    user={{
      ...baseUser,
      name: "LinkedIn Learning",
      profession: "Educational Platform Partner",
      location: "Global",
      avatar: "/common/partner-logo.png",
      bio: "Official educational partner providing professional development courses.",
      company: "LinkedIn Learning",
      website: "https://linkedin.com/learning",
      isVerified: true
    }}
    userStats={{
      posts: 892,
      following: 234,
      followers: 125842
    }}
    content={{
      posts: [
        {
          id: 1,
          type: "post",
          content: "📚 New course available: Advanced React Patterns and Best Practices",
          date: "3 hours ago",
          likes: 445,
          comments: 67,
          images: ["/common/course-banner.jpg"]
        }
      ],
      certificates: [],
      workHistory: []
    }}
    initialIsFollowing={true}
    initialFollowStatus="following"
    isPrivate={false}
    mutualFriends={[]}
    totalFollowers={125842}
    onFollow={(status) => console.log("Follow partner:", status)}
    onMessage={() => console.log("Contact partner")}
    onTabChange={(tab) => console.log("Tab changed:", tab)}
    onBack={() => console.log("Back clicked")}
    onShare={() => console.log("Share partner profile")}
    onReport={(reason) => console.log("Report partner:", reason)}
    onBlock={() => console.log("Block partner")}
  />
);

// 7. SCHOOL PROFILE
export const SchoolProfile = () => (
  <Profile
    user={{
      ...baseUser,
      name: "Stanford University",
      profession: "Private Research University",
      location: "Stanford, CA",
      avatar: "/common/stanford-logo.png",
      bio: "Leading research university dedicated to finding solutions to the world's most pressing challenges.",
      company: "Stanford University",
      website: "https://stanford.edu",
      isVerified: true
    }}
    userStats={{
      posts: 456,
      following: 128,
      followers: 89234
    }}
    content={{
      posts: [
        {
          id: 1,
          content: "🎓 Congratulations to our graduating class of 2024! 4,000+ students are ready to make their mark on the world.",
          tags: ["Graduation", "Class2024", "Stanford", "Education"],
          images: ["/common/graduation-ceremony.jpg"],
          date: "2 days ago",
          likes: 2456,
          comments: 234,
          shares: 89
        }
      ],
      about: {
        description: "Stanford University is a private research university in Stanford, California. Known for its academic strength, wealth, and proximity to Silicon Valley, Stanford is one of the world's leading universities.",
        founded: "1885",
        industry: "Higher Education",
        size: "16,000+ students",
        headquarters: "Stanford, CA",
        website: "https://stanford.edu",
        specialties: ["Computer Science", "Engineering", "Business", "Medicine", "Law", "Education"]
      }
    }}
    initialIsFollowing={false}
    initialFollowStatus="follow"
    isPrivate={false}
    mutualFriends={[]}
    totalFollowers={89234}
    userType="school"
    onFollow={(status) => console.log("Follow school:", status)}
    onMessage={() => console.log("Contact school")}
    onTabChange={(tab) => console.log("Tab changed:", tab)}
    onBack={() => console.log("Back clicked")}
    onShare={() => console.log("Share school profile")}
    onReport={(reason) => console.log("Report school:", reason)}
    onBlock={() => console.log("Block school")}
    onUserClick={(user) => console.log("Profile user clicked:", user)}
  />
);

// =============================================================================
// POST EXAMPLES
// =============================================================================

// Base post data
const basePostStats = {
  likes: 70,
  comments: 12,
  shares: 3
};

// 1. SIMPLE TEXT POST
export const SimpleTextPost = () => (
  <Post
    user={{
      avatar: "/common/profile-image.png",
      companyName: "John Peterson",
      tagline: "Software Engineer at Google",
      date: "2 hours ago",
      isFollowing: false
    }}
    content="Just finished an amazing project using React and Node.js! Excited to share what I've learned about building scalable web applications."
    tags={["React", "NodeJS", "WebDevelopment", "JavaScript", "TechTips"]}
    images={[]}
    stats={basePostStats}
    initialIsLiked={false}
    initialHasCommented={false}
    initialHasShared={false}
    likesData={mockLikesData}
    commentsData={mockCommentsData}
    onLike={(isLiked) => console.log("Like:", isLiked)}
    onComment={(text) => console.log("Comment:", text)}
    onShare={(targets) => console.log("Share:", targets)}
    onFollow={() => console.log("Follow user")}
    onUserClick={(user) => console.log("User clicked:", user)}
  />
);

// 2. POST WITH SINGLE IMAGE
export const PostWithImage = () => (
  <Post
    user={{
      avatar: "/common/profile-image.png",
      companyName: "Sarah Williams",
      tagline: "Product Manager at Meta",
      date: "4 hours ago",
      isFollowing: true
    }}
    content="Beautiful sunset from our office today! 🌅 Sometimes it's important to take a moment and appreciate the little things in life."
    tags={["Sunset", "OfficeLife", "Gratitude", "WorkLifeBalance"]}
    images={["/common/sunset-image.jpg"]}
    stats={{
      likes: 156,
      comments: 23,
      shares: 8
    }}
    initialIsLiked={true}
    initialHasCommented={false}
    initialHasShared={false}
    likesData={mockLikesData}
    commentsData={mockCommentsData}
    onLike={(isLiked) => console.log("Like:", isLiked)}
    onComment={(text) => console.log("Comment:", text)}
    onShare={(targets) => console.log("Share:", targets)}
    onFollow={() => console.log("Follow user")}
    onUserClick={(user) => console.log("User clicked:", user)}
  />
);

// 3. POST WITH MULTIPLE IMAGES
export const PostWithMultipleImages = () => (
  <Post
    user={{
      avatar: "/common/profile-image.png",
      companyName: "Michael Chen",
      tagline: "Senior Developer at Tesla",
      date: "1 day ago",
      isFollowing: false
    }}
    content="Had an amazing weekend hiking in Yosemite! 🏔️ The views were absolutely breathtaking. Here are some of my favorite shots from the trip."
    tags={["Hiking", "Yosemite", "Nature", "Weekend", "Photography"]}
    images={[
      "/common/hiking-1.jpg",
      "/common/hiking-2.jpg",
      "/common/hiking-3.jpg",
      "/common/hiking-4.jpg"
    ]}
    stats={{
      likes: 234,
      comments: 45,
      shares: 12
    }}
    initialIsLiked={false}
    initialHasCommented={true}
    initialHasShared={false}
    likesData={mockLikesData}
    commentsData={mockCommentsData}
    onLike={(isLiked) => console.log("Like:", isLiked)}
    onComment={(text) => console.log("Comment:", text)}
    onShare={(targets) => console.log("Share:", targets)}
    onFollow={() => console.log("Follow user")}
    onUserClick={(user) => console.log("User clicked:", user)}
  />
);

// 4. JOB POSTING
export const JobPostingPost = () => (
  <Post
    user={{
      avatar: "/common/company-logo.png",
      companyName: "Tech Solutions Inc.",
      tagline: "We're hiring! Join our team",
      date: "3 hours ago",
      isFollowing: false
    }}
    content="🚀 We're looking for a Senior React Developer to join our growing team!\n\n📍 Location: San Francisco, CA (Hybrid)\n💰 Salary: $130k - $180k\n⏰ Full-time\n\n✨ What you'll do:\n• Build scalable web applications\n• Collaborate with design and backend teams\n• Mentor junior developers\n\n🎯 Requirements:\n• 5+ years React experience\n• Strong TypeScript skills\n• Experience with Node.js\n\nReady to make an impact? Apply now! 👇"
    tags={["Hiring", "React", "JavaScript", "SanFrancisco", "TechJobs", "FullTime"]}
    images={["/common/job-posting-banner.jpg"]}
    stats={{
      likes: 89,
      comments: 34,
      shares: 67
    }}
    initialIsLiked={false}
    initialHasCommented={false}
    initialHasShared={true}
    likesData={mockLikesData}
    commentsData={mockCommentsData}
    onLike={(isLiked) => console.log("Like:", isLiked)}
    onComment={(text) => console.log("Comment:", text)}
    onShare={(targets) => console.log("Share:", targets)}
    onFollow={() => console.log("Follow company")}
    onUserClick={(user) => console.log("User clicked:", user)}
  />
);

// 5. EDUCATIONAL POST
export const EducationalPost = () => (
  <Post
    user={{
      avatar: "/common/profile-image.png",
      companyName: "Emma Davis",
      tagline: "UX Designer & Educator",
      date: "6 hours ago",
      isFollowing: true
    }}
    content="📚 5 Essential UX Design Principles Every Developer Should Know:\n\n1️⃣ User-Centered Design\n• Always prioritize user needs over business requirements\n• Conduct user research before making design decisions\n\n2️⃣ Consistency\n• Maintain consistent UI patterns throughout your app\n• Use design systems and style guides\n\n3️⃣ Accessibility\n• Design for all users, including those with disabilities\n• Follow WCAG guidelines\n\n4️⃣ Feedback\n• Provide clear feedback for user actions\n• Use loading states and error messages\n\n5️⃣ Simplicity\n• Remove unnecessary elements\n• Focus on core functionality\n\nWhich principle do you find most challenging to implement? Let me know in the comments! 👇"
    tags={["UXDesign", "DesignPrinciples", "UserExperience", "Education", "WebDesign"]}
    images={["/common/ux-principles-infographic.jpg"]}
    stats={{
      likes: 345,
      comments: 67,
      shares: 89
    }}
    initialIsLiked={true}
    initialHasCommented={false}
    initialHasShared={false}
    likesData={mockLikesData}
    commentsData={mockCommentsData}
    onLike={(isLiked) => console.log("Like:", isLiked)}
    onComment={(text) => console.log("Comment:", text)}
    onShare={(targets) => console.log("Share:", targets)}
    onFollow={() => console.log("Follow user")}
    onUserClick={(user) => console.log("User clicked:", user)}
  />
);

// 6. ACHIEVEMENT POST
export const AchievementPost = () => (
  <Post
    user={{
      avatar: "/common/profile-image.png",
      companyName: "David Johnson",
      tagline: "Full Stack Developer",
      date: "12 hours ago",
      isFollowing: false
    }}
    content="🎉 Excited to share that I just received my AWS Solutions Architect certification! \n\nThis journey has been incredible - spent 3 months studying, built several projects, and finally passed the exam with a score of 892/1000!\n\n💪 Key study resources that helped me:\n• AWS Official Training\n• A Cloud Guru courses\n• Hands-on labs and projects\n• Practice exams\n\nNext goal: AWS DevOps Engineer certification! 🚀\n\nFor anyone preparing for AWS certs, feel free to reach out if you have questions!"
    tags={["AWS", "Certification", "CloudComputing", "Achievement", "StudyTips"]}
    images={["/common/aws-certificate.jpg"]}
    stats={{
      likes: 234,
      comments: 45,
      shares: 23
    }}
    initialIsLiked={false}
    initialHasCommented={false}
    initialHasShared={false}
    likesData={mockLikesData}
    commentsData={mockCommentsData}
    onLike={(isLiked) => console.log("Like:", isLiked)}
    onComment={(text) => console.log("Comment:", text)}
    onShare={(targets) => console.log("Share:", targets)}
    onFollow={() => console.log("Follow user")}
    onUserClick={(user) => console.log("User clicked:", user)}
  />
);

// 7. TAGGED POST (with tagline)
export const TaggedPost = () => (
  <Post
    user={{
      avatar: "/common/profile-image.png",
      companyName: "Alex Rodriguez",
      tagline: "with Sarah Williams and 3 others",
      taggedUsers: [
        { id: 1, name: "Sarah Williams" },
        { id: 2, name: "Michael Chen" },
        { id: 3, name: "Emma Davis" },
        { id: 4, name: "David Johnson" }
      ],
      date: "8 hours ago",
      isFollowing: true
    }}
    content="Amazing team dinner last night! 🍽️ Great to catch up with everyone and celebrate our recent project success. Looking forward to working on more exciting challenges together!"
    tags={["TeamDinner", "Celebration", "Teamwork", "Success"]}
    images={["/common/team-dinner.jpg"]}
    stats={{
      likes: 67,
      comments: 18,
      shares: 5
    }}
    initialIsLiked={true}
    initialHasCommented={true}
    initialHasShared={false}
    likesData={mockLikesData}
    commentsData={mockCommentsData}
    onLike={(isLiked) => console.log("Like:", isLiked)}
    onComment={(text) => console.log("Comment:", text)}
    onShare={(targets) => console.log("Share:", targets)}
    onFollow={() => console.log("Follow user")}
    onUserClick={(user) => console.log("User clicked:", user)}
  />
);

// 8. VIRAL POST (High engagement)
export const ViralPost = () => (
  <Post
    user={{
      avatar: "/common/profile-image.png",
      companyName: "Jessica Brown",
      tagline: "Tech Influencer & Speaker",
      date: "2 days ago",
      isFollowing: false
    }}
    content="🔥 UNPOPULAR OPINION: Learning to code is NOT enough to become a successful developer.\n\nHere's what actually matters:\n\n🧠 Problem-solving skills\n🤝 Communication abilities\n📈 Continuous learning mindset\n⚡ Adaptability to new technologies\n👥 Collaboration and teamwork\n🎯 Understanding business needs\n\nYou can memorize all the syntax in the world, but if you can't solve real problems or work with others, you'll struggle.\n\nThe best developers I know are great communicators who understand the 'why' behind what they're building.\n\nWhat do you think? Agree or disagree? 👇"
    tags={["TechCareer", "SoftSkills", "Programming", "CareerAdvice", "Controversial"]}
    images={[]}
    stats={{
      likes: 15420,
      comments: 892,
      shares: 2341
    }}
    initialIsLiked={false}
    initialHasCommented={false}
    initialHasShared={false}
    likesData={mockLikesData}
    commentsData={mockCommentsData}
    onLike={(isLiked) => console.log("Like:", isLiked)}
    onComment={(text) => console.log("Comment:", text)}
    onShare={(targets) => console.log("Share:", targets)}
    onFollow={() => console.log("Follow user")}
    onUserClick={(user) => console.log("User clicked:", user)}
  />
);

// =============================================================================
// DEMO COMPONENT
// =============================================================================

const ProfileAndPostExamples = () => {
  const [selectedExample, setSelectedExample] = useState("PublicProfileNotFollowing");

  const examples = {
    // Profile Examples
    PublicProfileNotFollowing: {
      title: "Public Profile - Not Following",
      component: <PublicProfileNotFollowing />
    },
    PublicProfileFollowing: {
      title: "Public Profile - Following",
      component: <PublicProfileFollowing />
    },
    PrivateProfileRequested: {
      title: "Private Profile - Request Sent",
      component: <PrivateProfileRequested />
    },
    PrivateProfileNotFollowing: {
      title: "Private Profile - Not Following",
      component: <PrivateProfileNotFollowing />
    },
    BusinessCardProfile: {
      title: "Business Card Profile",
      component: <BusinessCardProfile />
    },
    PartnerProfile: {
      title: "Partner Profile",
      component: <PartnerProfile />
    },
    SchoolProfile: {
      title: "School Profile",
      component: <SchoolProfile />
    },
    
    // Post Examples
    SimpleTextPost: {
      title: "Simple Text Post",
      component: <SimpleTextPost />
    },
    PostWithImage: {
      title: "Post with Single Image",
      component: <PostWithImage />
    },
    PostWithMultipleImages: {
      title: "Post with Multiple Images",
      component: <PostWithMultipleImages />
    },
    JobPostingPost: {
      title: "Job Posting",
      component: <JobPostingPost />
    },
    EducationalPost: {
      title: "Educational Post",
      component: <EducationalPost />
    },
    AchievementPost: {
      title: "Achievement Post",
      component: <AchievementPost />
    },
    TaggedPost: {
      title: "Tagged Post",
      component: <TaggedPost />
    },
    ViralPost: {
      title: "Viral Post (High Engagement)",
      component: <ViralPost />
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile & Post Examples</h1>
        
        {/* Example Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Example:
          </label>
          <select
            value={selectedExample}
            onChange={(e) => setSelectedExample(e.target.value)}
            className="block w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500"
          >
            <optgroup label="Profile Examples">
              <option value="PublicProfileNotFollowing">Public Profile - Not Following</option>
              <option value="PublicProfileFollowing">Public Profile - Following</option>
              <option value="PrivateProfileRequested">Private Profile - Request Sent</option>
              <option value="PrivateProfileNotFollowing">Private Profile - Not Following</option>
              <option value="BusinessCardProfile">Business Card Profile</option>
              <option value="PartnerProfile">Partner Profile</option>
              <option value="SchoolProfile">School Profile</option>
            </optgroup>
            <optgroup label="Post Examples">
              <option value="SimpleTextPost">Simple Text Post</option>
              <option value="PostWithImage">Post with Single Image</option>
              <option value="PostWithMultipleImages">Post with Multiple Images</option>
              <option value="JobPostingPost">Job Posting</option>
              <option value="EducationalPost">Educational Post</option>
              <option value="AchievementPost">Achievement Post</option>
              <option value="TaggedPost">Tagged Post</option>
              <option value="ViralPost">Viral Post (High Engagement)</option>
            </optgroup>
          </select>
        </div>

        {/* Example Display */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {examples[selectedExample].title}
          </h2>
          <div className="flex justify-center">
            {examples[selectedExample].component}
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Usage Instructions</h3>
          <div className="text-blue-800">
            <p className="mb-2">This file contains comprehensive examples of:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Profile Types:</strong> Public, Private, Business Card, Partner profiles</li>
              <li><strong>Profile States:</strong> Following, Not Following, Request Sent</li>
              <li><strong>Post Variations:</strong> Text, Images, Job Postings, Educational content</li>
              <li><strong>Engagement Levels:</strong> Low, Medium, High engagement examples</li>
              <li><strong>All Props:</strong> Complete usage of all available props and callbacks</li>
            </ul>
            <p className="mt-4">
              Use these examples as reference for implementing different profile and post types in your application.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndPostExamples;