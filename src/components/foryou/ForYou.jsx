// src/components/foryou/ForYou.jsx

import React, { useState } from "react";
import ForYouCard from "./ForYouCard";
import MessageCard from "../messages/MessageCard";

const ForYou = ({ className = "", onProfileClick, filters = {} }) => {
  const [users] = useState([
    {
      id: 1,
      name: "Jerome Bell",
      jobTitle: "UI/UX Designer",
      school: "Spark School",
      location: "London, UK",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
      isFollowing: false,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      jobTitle: "Frontend Developer",
      school: "Tech University",
      location: "New York, US",
      profileImage: "https://images.unsplash.com/photo-1494790108755-2616b9e5c9f2?w=400&h=600&fit=crop&crop=face",
      isFollowing: false,
    },
    {
      id: 3,
      name: "Michael Chen",
      jobTitle: "Product Manager",
      school: "Stanford University",
      location: "San Francisco, US",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face",
      isFollowing: false,
    },
    {
      id: 4,
      name: "Emily Davis",
      jobTitle: "Marketing Specialist",
      school: "Harvard Business School",
      location: "Boston, US",
      profileImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face",
      isFollowing: false,
    },
    {
      id: 5,
      name: "David Wilson",
      jobTitle: "Software Engineer",
      school: "MIT",
      location: "Cambridge, US",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face",
      isFollowing: false,
    },
    {
      id: 6,
      name: "Lisa Anderson",
      jobTitle: "Data Scientist",
      school: "UC Berkeley",
      location: "San Francisco, US",
      profileImage: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400&h=600&fit=crop&crop=face",
      isFollowing: false,
    },
  ]);

  const [removedCards, setRemovedCards] = useState([]);
  const [userStates, setUserStates] = useState(
    users.reduce((acc, user) => ({
      ...acc,
      [user.id]: { isFollowing: user.isFollowing },
    }), {})
  );
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter users based on filter criteria
  const filterUsers = (users, filters) => {
    if (!filters || Object.keys(filters).length === 0) {
      return users;
    }

    return users.filter(user => {
      // School filter
      if (filters.school && !user.school.toLowerCase().includes(filters.school.toLowerCase())) {
        return false;
      }

      // Age filter (assuming we had age data, for now we'll skip this)
      if (filters.age && filters.age !== '') {
        // Skip age filtering for now as mock data doesn't include ages
      }

      // Gender filter (assuming we had gender data, for now we'll skip this)
      if (filters.gender && filters.gender !== '') {
        // Skip gender filtering for now as mock data doesn't include gender
      }

      // Field of work filter
      if (filters.fieldOfWork && filters.fieldOfWork !== '') {
        const jobTitleMatch = user.jobTitle.toLowerCase().includes(filters.fieldOfWork.toLowerCase());
        // You could also map specific field values to job titles
        const fieldMapping = {
          'technology': ['engineer', 'developer', 'designer', 'manager'],
          'healthcare': ['doctor', 'nurse', 'medical'],
          'finance': ['analyst', 'finance', 'accounting'],
          'education': ['teacher', 'professor', 'education'],
          'marketing': ['marketing', 'sales'],
          'engineering': ['engineer', 'developer'],
          'design': ['designer', 'ui', 'ux'],
          'business': ['manager', 'business', 'director']
        };
        
        const fieldKeywords = fieldMapping[filters.fieldOfWork] || [filters.fieldOfWork];
        const fieldMatch = fieldKeywords.some(keyword => 
          user.jobTitle.toLowerCase().includes(keyword.toLowerCase())
        );
        
        if (!jobTitleMatch && !fieldMatch) {
          return false;
        }
      }

      // Location filter
      if (filters.location && !user.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      return true;
    });
  };

  // Reset cards when filters change
  React.useEffect(() => {
    setRemovedCards([]);
  }, [filters]);

  // Apply filters first, then remove swiped cards
  const filteredUsers = filterUsers(users, filters);
  const availableUsers = filteredUsers.filter((_, index) => {
    // Find the original index of this user in the users array
    const originalIndex = users.findIndex(user => user.id === filteredUsers[index].id);
    return !removedCards.includes(originalIndex);
  });
  const visibleUsers = availableUsers.slice(0, 3); // Show up to 3 cards in stack

  const handleFollow = () => {
    const currentUser = availableUsers[0];
    if (currentUser) {
      setUserStates((prev) => ({
        ...prev,
        [currentUser.id]: {
          ...prev[currentUser.id],
          isFollowing: !prev[currentUser.id].isFollowing,
        },
      }));
    }
  };

  const handleSendMessage = () => {
    const currentUser = availableUsers[0];
    if (currentUser) {
      setSelectedUser(currentUser);
      setIsMessageModalOpen(true);
    }
  };

  const handleCloseMessageModal = () => {
    setIsMessageModalOpen(false);
    setSelectedUser(null);
  };

  const handleSwipeLeft = (user) => {
    console.log(`Passed on ${user.name}`);
    removeCurrentCard();
  };

  const handleSwipeRight = (user) => {
    console.log(`Liked ${user.name}`);
    removeCurrentCard();
  };

  const removeCurrentCard = () => {
    const currentIndex = users.findIndex(user => user.id === availableUsers[0]?.id);
    if (currentIndex !== -1) {
      setRemovedCards(prev => [...prev, currentIndex]);
    }
  };

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <div className="relative flex flex-col items-center justify-center">
        {visibleUsers.length > 0 ? (
          <div className="relative" style={{ width: 'min(502px, 90vw)', height: 'min(600px, 75vh)' }}>
            {visibleUsers.map((user, stackIndex) => {
              const isTopCard = stackIndex === 0;
              return (
                <div
                  key={user.id}
                  className="absolute top-0 left-0"
                  style={{
                    zIndex: visibleUsers.length - stackIndex,
                    transform: `translateY(${stackIndex * 8}px) scale(${1 - stackIndex * 0.02})`,
                    opacity: 1 - stackIndex * 0.1
                  }}
                >
                  <ForYouCard
                    user={{
                      ...user,
                      isFollowing: userStates[user.id]?.isFollowing || false,
                    }}
                    onFollow={isTopCard ? handleFollow : undefined}
                    onSendMessage={isTopCard ? handleSendMessage : undefined}
                    onSwipeLeft={isTopCard ? handleSwipeLeft : undefined}
                    onSwipeRight={isTopCard ? handleSwipeRight : undefined}
                    onProfileClick={isTopCard ? onProfileClick : undefined}
                    className={!isTopCard ? 'pointer-events-none' : ''}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-lexend font-medium text-gray-900 mb-2">
              You've seen everyone!
            </h3>
            <p className="text-gray-600">Check back later for new profiles</p>
          </div>
        )}

        {/* Message Modal */}
        <MessageCard
          isOpen={isMessageModalOpen}
          onClose={handleCloseMessageModal}
          user={selectedUser}
        />
      </div>
    </div>
  );
};

export default ForYou;
