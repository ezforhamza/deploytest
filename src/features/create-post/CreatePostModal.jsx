// src/features/create-post/CreatePostModal.jsx

import React, { useState, useRef } from "react";
import Modal from "../../components/ui/Modal";
import { colors } from "../../styles/tokens";
import ImageUploadArea from "./components/ImageUploadArea";
import TaggedUsers from "./components/TaggedUsers";

const CreatePostModal = ({
  isOpen,
  onClose,
  onCreatePost,
  currentUser = {
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    name: "John Doe"
  }
}) => {
  const [postContent, setPostContent] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [taggedUsers, setTaggedUsers] = useState([]);
  const [extractedTags, setExtractedTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_CHARACTERS = 500;
  const remainingChars = MAX_CHARACTERS - postContent.length;

  // Extract hashtags from post content
  const extractHashtags = (text) => {
    const hashtagRegex = /#([a-zA-Z0-9_]+)/g;
    const matches = text.match(hashtagRegex) || [];
    return matches.map(tag => tag.slice(1)); // Remove the # symbol
  };

  // Update extracted tags when post content changes
  const handleContentChange = (e) => {
    const content = e.target.value;
    setPostContent(content);
    
    const tags = extractHashtags(content);
    setExtractedTags(tags);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [...prev, {
            id: Date.now() + Math.random(),
            file,
            url: e.target.result,
            name: file.name
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleRemoveImage = (imageId) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId));
  };

  const handleCreatePost = async () => {
    if (!postContent.trim() && uploadedImages.length === 0) {
      return;
    }

    setIsLoading(true);
    try {
      const newPost = {
        id: Date.now(),
        content: postContent.trim(),
        images: uploadedImages.map(img => img.url),
        tags: extractedTags,
        taggedUsers,
        createdAt: new Date().toISOString(),
        user: currentUser
      };

      await onCreatePost?.(newPost);
      
      // Reset form
      setPostContent("");
      setUploadedImages([]);
      setTaggedUsers([]);
      setExtractedTags([]);
      onClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setPostContent("");
      setUploadedImages([]);
      setTaggedUsers([]);
      setExtractedTags([]);
      onClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      className="max-w-2xl"
    >
      <div 
        className="bg-white rounded-[14px] w-full max-w-[663px] max-h-[90vh] flex flex-col overflow-hidden"
        style={{ boxShadow: "0px 5px 59.1px -6px rgba(0,0,0,0.25)" }}
      >
        {/* Fixed Header */}
        <div className="flex-shrink-0 relative flex items-center justify-center py-6 px-6 border-b border-gray-100">
          <h2 
            className="font-lexend font-medium text-[22px] leading-[150%] text-black"
          >
            Create Post
          </h2>
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
          >
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
              className="w-4 h-4"
            >
              <path 
                d="M12 4L4 12M4 4L12 12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Tagged Users Section */}
          <TaggedUsers 
            taggedUsers={taggedUsers}
            onUpdateTaggedUsers={setTaggedUsers}
          />

          <div className="px-6 pb-8">
          {/* Image Upload Area */}
          <ImageUploadArea
            uploadedImages={uploadedImages}
            onImageUpload={handleImageUpload}
            onRemoveImage={handleRemoveImage}
            fileInputRef={fileInputRef}
          />

          {/* Post Content Textarea */}
          <div className="mt-6 relative">
            <label className="absolute -top-3 left-4 px-2 bg-white text-[#58606C] text-sm font-lexend">
              What's on your mind?
            </label>
            <textarea
              value={postContent}
              onChange={handleContentChange}
              placeholder="🚀 Hiring React.js Frontend Developer – Remote! Build stunning UIs with a creative team. Click to apply now and grow fast! #React #JavaScript #RemoteWork #Frontend #HiringNow"
              className="w-full h-[169px] p-4 border border-[#B6B6B6] rounded-[10px] resize-none outline-none focus:border-blue-500 font-lexend text-[18px] leading-[150%] text-[#58606C] placeholder:text-[#58606C]"
              maxLength={MAX_CHARACTERS}
            />
          </div>

          {/* Character Counter */}
          <div className="mt-2 text-right">
            <span 
              className={`text-sm font-lexend ${
                remainingChars < 50 ? 'text-red-500' : 'text-[#1090CF]'
              }`}
            >
              {postContent.length}/{MAX_CHARACTERS}
            </span>
          </div>

          {/* Extracted Hashtags Display */}
          {extractedTags.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-lexend text-[#58606C] mb-2">
                Tags found:
              </p>
              <div className="flex flex-wrap gap-2">
                {extractedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block px-3 py-1 bg-[rgba(16,144,207,0.15)] text-[#1090CF] text-sm font-lexend rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Fixed Footer with Create Post Button */}
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-100 bg-white">
          <div className="flex justify-end">
            <button
              onClick={handleCreatePost}
              disabled={isLoading || (!postContent.trim() && uploadedImages.length === 0)}
              className="bg-[#0490CF] hover:bg-[#0376a3] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-lexend font-semibold text-[21.5px] leading-[150%] px-8 py-4 rounded-[10px] transition-colors duration-200 min-w-[180px] flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
              ) : null}
              {isLoading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;