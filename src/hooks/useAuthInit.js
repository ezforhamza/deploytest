// src/hooks/useAuthInit.js
import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import authService from "../services/auth/authService";

/**
 * Hook to initialize authentication state on app startup
 * Checks for stored token and restores auth state
 */
export const useAuthInit = () => {
  const { setToken, setUser, clearAuth } = useAuthStore();

  useEffect(() => {
    const initializeAuth = () => {
      // Get token from localStorage via authService
      const token = authService.getAuthToken();
      
      if (token) {
        // Set token in store
        setToken(token);
        
        // If you have user data in localStorage, you could restore it here
        // For now, we'll just set the token and mark as authenticated
        // The user data will be fetched on first API call or you can add a "me" endpoint
        console.log("🔄 Auth token restored from localStorage");
      } else {
        // No token found, ensure auth is cleared
        clearAuth();
        console.log("ℹ️ No auth token found");
      }
    };

    initializeAuth();
  }, [setToken, setUser, clearAuth]);
};

export default useAuthInit;