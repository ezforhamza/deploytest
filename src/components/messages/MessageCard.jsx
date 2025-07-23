// src/components/messages/MessageCard.jsx

import React, { useState, useRef, useEffect } from "react";
import Modal from "../ui/Modal";
import TextArea from "../ui/TextArea";
import { Send, X, UserPlus, UserCheck } from "lucide-react";
import { colors, typography, spacing, borderRadius, shadows } from "../../styles/tokens";

const MessageCard = ({ isOpen, onClose, user }) => {
  const [message, setMessage] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now(),
        text: message.trim(),
        timestamp: new Date(),
        sender: "me"
      };
      setMessages(prev => [...prev, newMessage]);
      setMessage("");
      
      // Auto-resize textarea back to original size
      if (textareaRef.current) {
        textareaRef.current.style.height = "52px";
      }
    }
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTextareaChange = (value) => {
    setMessage(value);
  };

  const formatTime = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      className="max-w-md mx-4"
    >
      <div 
        className="w-full max-w-md mx-auto flex flex-col overflow-hidden"
        style={{ 
          backgroundColor: colors.white, 
          borderRadius: borderRadius.xl,
          boxShadow: shadows.xl
        }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between border-b"
          style={{ 
            padding: spacing.md, 
            backgroundColor: colors.white,
            borderColor: '#E5E7EB'
          }}
        >
          <div className="flex items-center flex-1" style={{ gap: spacing.sm }}>
            {/* Profile Image */}
            <div className="relative">
              <div 
                className="w-12 h-12 rounded-full overflow-hidden"
                style={{ 
                  backgroundColor: '#F3F4F6'
                }}
              >
                <img 
                  src={user?.profileImage || "/default-avatar.png"} 
                  alt={user?.name || "User"}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Online Status Indicator */}
              <div 
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2"
                style={{ 
                  backgroundColor: colors.success, 
                  borderColor: colors.white 
                }}
              ></div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <h3 
                className="truncate"
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.h6,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.dark
                }}
              >
                {user?.name || "Szekeres Dalma"}
              </h3>
              <p 
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.subtitle,
                  fontWeight: typography.fontWeight.regular,
                  color: colors.success
                }}
              >
                Online now
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center" style={{ gap: spacing.xs }}>
            {/* Follow Button */}
            <button
              onClick={handleFollowToggle}
              className="flex items-center rounded-full transition-all duration-200 hover:opacity-90"
              style={{
                gap: spacing.xs,
                padding: `${spacing.xs} ${spacing.md}`,
                backgroundColor: isFollowing ? '#F3F4F6' : colors.primary,
                color: isFollowing ? colors.text : colors.white,
                fontFamily: typography.fontFamily.primary,
                fontSize: typography.fontSize.button,
                fontWeight: typography.fontWeight.medium
              }}
            >
              {isFollowing ? (
                <>
                  <UserCheck size={14} />
                  Following
                </>
              ) : (
                <>
                  <UserPlus size={14} />
                  Follow
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="rounded-full hover:bg-gray-100 transition-colors duration-200"
              style={{ 
                padding: spacing.xs 
              }}
              aria-label="Close message"
            >
              <X size={18} style={{ color: colors.text }} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          className="flex-1 min-h-[300px] max-h-[400px] overflow-y-auto"
          style={{ 
            padding: spacing.md,
            backgroundColor: colors.white
          }}
        >
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: '#F9FAFB',
                  border: `2px solid #F3F4F6`,
                  marginBottom: spacing.md
                }}
              >
                <Send size={32} style={{ color: colors.text }} />
              </div>
              <h4 
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.h5,
                  fontWeight: typography.fontWeight.semibold,
                  color: colors.dark,
                  marginBottom: spacing.xs
                }}
              >
                No messages yet
              </h4>
              <p 
                style={{
                  fontFamily: typography.fontFamily.primary,
                  fontSize: typography.fontSize.text,
                  color: colors.text
                }}
              >
                Start the conversation with {user?.name?.split(' ')[0] || 'them'}
              </p>
            </div>
          ) : (
            <div style={{ gap: spacing.sm }} className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="flex justify-end">
                  <div className="max-w-[80%]">
                    <div 
                      className="rounded-2xl rounded-tr-md"
                      style={{
                        backgroundColor: colors.primary,
                        color: colors.white,
                        padding: `${spacing.sm} ${spacing.md}`
                      }}
                    >
                      <p 
                        className="leading-relaxed"
                        style={{
                          fontFamily: typography.fontFamily.primary,
                          fontSize: typography.fontSize.subtitle
                        }}
                      >
                        {msg.text}
                      </p>
                    </div>
                    <p 
                      className="mt-1 text-right"
                      style={{
                        fontFamily: typography.fontFamily.primary,
                        fontSize: typography.fontSize.small,
                        color: colors.text
                      }}
                    >
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Message Input */}
        <div 
          className="border-t"
          style={{ 
            padding: spacing.md,
            backgroundColor: colors.white,
            borderColor: '#E5E7EB'
          }}
        >
          <div className="flex items-end" style={{ gap: spacing.sm }}>
            <div className="flex-1">
              <TextArea
                placeholder="Type your message..."
                value={message}
                onChange={handleTextareaChange}
                rows={1}
                className="mb-0"
                onKeyPress={handleKeyPress}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="rounded-full transition-all duration-200"
              style={{
                padding: spacing.md,
                backgroundColor: message.trim() ? colors.primary : '#F3F4F6',
                color: message.trim() ? colors.white : colors.text,
                cursor: message.trim() ? 'pointer' : 'not-allowed',
                boxShadow: message.trim() ? shadows.md : 'none',
                marginBottom: spacing.md
              }}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MessageCard;