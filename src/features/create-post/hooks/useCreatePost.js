// src/features/create-post/hooks/useCreatePost.js

import { useState } from 'react';

export const useCreatePost = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openCreatePostModal = () => setIsCreatePostModalOpen(true);
  const closeCreatePostModal = () => setIsCreatePostModalOpen(false);

  const createPost = async (postData) => {
    setIsLoading(true);
    try {
      // Here you would typically make an API call to create the post
      console.log('Creating post:', postData);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, just log the post data
      // In a real app, you'd send this to your backend
      return postData;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isCreatePostModalOpen,
    isLoading,
    openCreatePostModal,
    closeCreatePostModal,
    createPost
  };
};