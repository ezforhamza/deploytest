// src/stores/useAuthStore.js
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  // State
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  // Actions
  setUser: (userData) => {
    set({
      user: userData,
      isAuthenticated: !!userData,
    });
  },

  setToken: (token) => {
    set({ token });
    // Store token in localStorage for persistence
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  login: (userData, token) => {
    set({
      user: userData,
      token: token,
      isAuthenticated: true,
    });
    // Store token in localStorage for persistence
    if (token) {
      localStorage.setItem("authToken", token);
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    // Clear token from localStorage
    localStorage.removeItem("authToken");
  },

  // Initialize auth state from localStorage on app start
  initializeAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      set({
        token,
        isAuthenticated: true,
      });
      // Note: You might want to validate the token with your API here
      // and fetch user data if needed
    }
  },

  // Clear all auth data
  clearAuth: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
    localStorage.removeItem("authToken");
  },
}));
