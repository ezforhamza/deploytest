import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { colors, typography } from '../../../styles/tokens';

const InviteConnectionsSettings = () => {
  const [selectedConnections, setSelectedConnections] = useState({
    0: true,  // Wayne Community College selected
    1: false, // Jerome Bell
    2: false, // Software Development
    3: false, // Ecole de publicité
    4: false, // Balázs Annamária
    5: false, // Universal Technical Institute
    6: false, // UI/UX Design
    7: false, // Trevor G. Browne High School
    8: false, // East Valley Institute
    9: false, // Trevor G. Browne High School (2)
    10: false, // El Camino High School
  });

  const connections = [
    { name: 'Wayne Community College', image: '/common/placeholder-image.png' },
    { name: 'Jerome Bell', image: '/common/placeholder-image.png' },
    { name: 'Software Development', image: '/common/placeholder-image.png' },
    { name: 'Ecole de publicité', image: '/common/placeholder-image.png' },
    { name: 'Balázs Annamária', image: '/common/placeholder-image.png' },
    { name: 'Universal Technical Institute', image: '/common/placeholder-image.png' },
    { name: 'UI/UX Design', image: '/common/placeholder-image.png' },
    { name: 'Trevor G. Browne High School', image: '/common/placeholder-image.png' },
    { name: 'East Valley Institute', image: '/common/placeholder-image.png' },
    { name: 'Trevor G. Browne High School', image: '/common/placeholder-image.png' },
    { name: 'El Camino High School', image: '/common/placeholder-image.png' },
  ];

  const handleConnectionToggle = (index) => {
    setSelectedConnections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSendInvitations = () => {
    console.log('Sending invitations to selected connections');
  };

  return (
    <div className="p-8" style={{ color: colors.text }}>
      <div className="flex items-center justify-center">
        {/* Main Container */}
        <div 
          className="bg-white border-2 border-gray-200 rounded-2xl relative"
          style={{ 
            width: '807px', 
            height: '644px',
            fontFamily: typography.fontFamily.primary 
          }}
        >
          {/* Title */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-6">
            <h1 
              className="text-center font-medium text-black"
              style={{ 
                fontSize: '22px', 
                lineHeight: '150%',
                fontFamily: typography.fontFamily.primary,
                width: '202px',
                height: '33px'
              }}
            >
              Invite connections
            </h1>
          </div>

          {/* Search Bar */}
          <div className="absolute" style={{ left: '100px', top: '87px', width: '563px', height: '50px' }}>
            <div 
              className="relative bg-white border border-gray-200 rounded-full h-full flex items-center px-4"
              style={{ borderRadius: '143.755px' }}
            >
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Search" 
                className="flex-1 outline-none text-black"
                style={{ 
                  fontSize: '17.25px',
                  fontFamily: typography.fontFamily.primary
                }}
              />
            </div>
          </div>

          {/* Connections List */}
          <div className="absolute" style={{ left: '100px', top: '166px', width: '555px', height: '350px' }}>
            <div className="space-y-4 h-full overflow-y-auto">
              {connections.map((connection, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Profile Image */}
                    <div 
                      className="bg-gray-200 rounded-full overflow-hidden"
                      style={{ width: '48px', height: '48px' }}
                    >
                      <img 
                        src={connection.image} 
                        alt={connection.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Name */}
                    <span 
                      className="text-black font-medium"
                      style={{ 
                        fontSize: '14.8px',
                        lineHeight: '150%',
                        fontFamily: typography.fontFamily.primary
                      }}
                    >
                      {connection.name}
                    </span>
                  </div>

                  {/* Checkbox */}
                  <div 
                    className={`border rounded cursor-pointer flex items-center justify-center ${
                      selectedConnections[index] ? 'bg-blue-500 border-blue-500' : 'bg-white border-black'
                    }`}
                    style={{ width: '19px', height: '19px', borderRadius: '3px' }}
                    onClick={() => handleConnectionToggle(index)}
                  >
                    {selectedConnections[index] && (
                      <svg 
                        width="10" 
                        height="7" 
                        viewBox="0 0 10 7" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M1 3L4 6L9 1" 
                          stroke="white" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Send Button */}
          <button 
            className="absolute bg-blue-500 text-white font-medium rounded-lg flex items-center justify-center"
            style={{ 
              width: '108px', 
              height: '42px',
              left: 'calc(50% - 108px/2 + 305.5px)',
              top: '585px',
              fontSize: '18px',
              lineHeight: '150%',
              fontFamily: typography.fontFamily.primary,
              borderRadius: '10.76px',
              backgroundColor: '#0490CF'
            }}
            onClick={handleSendInvitations}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteConnectionsSettings;