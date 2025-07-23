import React, { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { X, Search } from "lucide-react";

const TagPersonModal = ({ 
  isOpen, 
  onClose, 
  onSelectUsers, 
  selectedUsers = [],
  className = "" 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelectedUsers, setTempSelectedUsers] = useState(selectedUsers);

  // Mock users for tagging - expanded list based on Figma design
  const mockUsers = [
    {
      id: 1,
      name: "Wayne Community College",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      type: "school"
    },
    {
      id: 2,
      name: "Jerome Bell",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c9777a7e?w=400&h=400&fit=crop&crop=face",
      type: "person"
    },
    {
      id: 3,
      name: "Software Company",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      type: "company"
    },
    {
      id: 4,
      name: "Ecole de publicité",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
      type: "school"
    },
    {
      id: 5,
      name: "Balázs Annamária",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      type: "person"
    },
    {
      id: 6,
      name: "Universal Technical Institute",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=400&h=400&fit=crop&crop=face",
      type: "school"
    },
    {
      id: 7,
      name: "UI/UX Design",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      type: "company"
    },
    {
      id: 8,
      name: "Marvin",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      type: "person"
    },
    {
      id: 9,
      name: "Trevor G. Browne High School",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      type: "school"
    },
    {
      id: 10,
      name: "East Valley Institute",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c9777a7e?w=400&h=400&fit=crop&crop=face",
      type: "school"
    },
    {
      id: 11,
      name: "El Camino High School",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      type: "school"
    }
  ];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleUser = (user) => {
    const isAlreadySelected = tempSelectedUsers.some(selected => selected.id === user.id);
    
    if (isAlreadySelected) {
      setTempSelectedUsers(tempSelectedUsers.filter(selected => selected.id !== user.id));
    } else {
      setTempSelectedUsers([...tempSelectedUsers, user]);
    }
  };

  const handleConfirm = () => {
    onSelectUsers(tempSelectedUsers);
    onClose();
  };

  const handleClose = () => {
    setTempSelectedUsers(selectedUsers);
    setSearchTerm("");
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      className={`max-w-none w-full ${className}`}
    >
      <div className="bg-white rounded-[14px] relative w-full max-w-[663px] h-auto max-h-[756px] mx-auto flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 relative flex items-center justify-center py-6 px-6 border-b border-gray-100">
          <h2 className="font-medium text-[22px] leading-[150%] text-black">
            Partners
          </h2>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center text-black hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-shrink-0 px-6 pt-6 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search size={20} className="text-[#8C8C8C]" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by alumni, schools and company"
              className="w-full h-16 pl-14 pr-4 border border-[#ECECEC] rounded-full bg-white text-[#151515] text-lg font-normal focus:outline-none focus:border-[#1090CF] transition-colors"
            />
          </div>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-1">
            {filteredUsers.map((user) => {
              const isSelected = tempSelectedUsers.some(selected => selected.id === user.id);
              
              return (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                  onClick={() => handleToggleUser(user)}
                >
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name */}
                  <div className="flex-1">
                    <p className="font-medium text-[17px] leading-[150%] text-black">
                      {user.name}
                    </p>
                  </div>

                  {/* Checkbox */}
                  <div className="flex-shrink-0">
                    <div className={`w-5 h-5 border border-black rounded-sm flex items-center justify-center ${
                      isSelected ? 'bg-[#1090CF] border-[#1090CF]' : 'bg-white'
                    }`}>
                      {isSelected && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path 
                            d="M2 6L4.5 8.5L10 3" 
                            stroke="white" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No results */}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No users found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Gradient Overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[185px] pointer-events-none bg-gradient-to-t from-white to-transparent" />

        {/* Action Button */}
        <div className="flex-shrink-0 px-6 py-4 bg-white relative z-10">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#0490CF] hover:bg-[#0380B8] text-white font-semibold text-lg py-4 px-6 rounded-[11px] transition-colors duration-200"
          >
            Done ({tempSelectedUsers.length} selected)
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TagPersonModal;