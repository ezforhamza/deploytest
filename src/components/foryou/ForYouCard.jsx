// src/components/foryou/ForYouCard.jsx

import React, { useState, useRef, useEffect, useCallback } from "react";
import ProfileInfo from "./ProfileInfo";
import ActionButton from "./ActionButton";

const ForYouCard = ({
  user = {
    name: "Jerome Bell",
    jobTitle: "UI/UX Designer",
    school: "Spark School",
    location: "London, UK",
    profileImage: null,
    isFollowing: false,
  },
  onFollow = () => {},
  onSendMessage = () => {},
  onSwipeLeft = () => {},
  onSwipeRight = () => {},
  onProfileClick = () => {},
  className = "",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [cardTransform, setCardTransform] = useState({ x: 0, rotate: 0 });
  const cardRef = useRef(null);

  const handleStart = useCallback((clientX) => {
    setIsDragging(true);
    setStartX(clientX);
    setCurrentX(clientX);
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!isDragging) return;
    
    setCurrentX(clientX);
    const deltaX = clientX - startX;
    const rotation = deltaX * 0.1;
    
    setCardTransform({
      x: deltaX,
      rotate: Math.max(-15, Math.min(15, rotation))
    });
  }, [isDragging, startX]);

  const handleEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    const deltaX = currentX - startX;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        // Swipe right - like
        onSwipeRight?.(user);
      } else {
        // Swipe left - pass
        onSwipeLeft?.(user);
      }
    }
    
    // Reset position
    setCardTransform({ x: 0, rotate: 0 });
  }, [isDragging, currentX, startX, onSwipeLeft, onSwipeRight, user]);

  const handleMouseDown = useCallback((e) => {
    e.preventDefault();
    handleStart(e.clientX);
  }, [handleStart]);

  const handleMouseMove = useCallback((e) => {
    e.preventDefault();
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseUp = useCallback((e) => {
    e.preventDefault();
    handleEnd();
  }, [handleEnd]);

  const handleTouchStart = useCallback((e) => {
    handleStart(e.touches[0].clientX);
  }, [handleStart]);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  }, [handleMove]);

  const handleTouchEnd = useCallback((e) => {
    e.preventDefault();
    handleEnd();
  }, [handleEnd]);

  // Add global mouse event listeners when dragging
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e) => handleMouseMove(e);
      const handleGlobalMouseUp = (e) => handleMouseUp(e);
      
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
  return (
    <div className={`relative ${className}`}>
      {/* Main Card */}
      <div
        ref={cardRef}
        className="relative overflow-hidden cursor-grab select-none"
        style={{
          width: "min(502px, 90vw)",
          height: "min(543px, 70vh)",
          borderRadius: "31px",
          background: user.profileImage 
            ? `url(${user.profileImage}) center/cover no-repeat`
            : "linear-gradient(180deg, #C4C4C4 0%, #666666 100%)",
          transform: `translateX(${cardTransform.x}px) rotate(${cardTransform.rotate}deg)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Profile Information at Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 p-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
          }}
        >
          <ProfileInfo 
            user={user} 
            onFollow={onFollow} 
            onProfileClick={onProfileClick}
          />
        </div>

        {/* Swipe Indicators */}
        {isDragging && (
          <>
            {/* Like indicator (swipe right) */}
            {cardTransform.x > 50 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-green-500 rounded-full p-8 shadow-lg">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
              </div>
            )}
            
            {/* Pass indicator (swipe left) */}
            {cardTransform.x < -50 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-red-500 rounded-full p-8 shadow-lg">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m15 9-6 6"/>
                    <path d="m9 9 6 6"/>
                  </svg>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Send Message Button */}
      <div
        className="mt-4 w-full"
        style={{
          maxWidth: "min(502px, 90vw)",
        }}
      >
        <ActionButton
          variant="message"
          onClick={onSendMessage}
          icon="message"
          label="Send message"
        />
      </div>
    </div>
  );
};

export default ForYouCard;
