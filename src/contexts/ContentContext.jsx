// src/contexts/ContentContext.jsx

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { getDefaultContentState } from '../config/contentRegistry';

const ContentContext = createContext();

// Action types
const CONTENT_ACTIONS = {
  SET_NAVIGATION: 'SET_NAVIGATION',
  SET_CONTENT_STATE: 'SET_CONTENT_STATE',
  SET_CONTENT_DATA: 'SET_CONTENT_DATA',
  NAVIGATE_BACK: 'NAVIGATE_BACK',
  RESET_CONTENT: 'RESET_CONTENT',
  CLEAR_HISTORY: 'CLEAR_HISTORY',
};

// Initial state
const initialState = {
  activeNavigation: 'Home',
  userRole: 'alumni',
  contentStates: {},
  contentData: {},
  history: [],
  isSmartContentEnabled: true,
};

// Reducer
function contentReducer(state, action) {
  switch (action.type) {
    case CONTENT_ACTIONS.SET_NAVIGATION: {
      const { navigation, userRole } = action.payload;
      const defaultState = getDefaultContentState(navigation, userRole);
      
      return {
        ...state,
        activeNavigation: navigation,
        userRole,
        contentStates: {
          ...state.contentStates,
          [navigation]: defaultState,
        },
      };
    }

    case CONTENT_ACTIONS.SET_CONTENT_STATE: {
      const { navigation, contentState, data, addToHistory } = action.payload;
      
      const newHistory = addToHistory && state.isSmartContentEnabled
        ? [...state.history, {
            navigation: state.activeNavigation,
            contentState: state.contentStates[state.activeNavigation],
            data: state.contentData[state.activeNavigation],
            timestamp: Date.now(),
          }]
        : state.history;

      return {
        ...state,
        contentStates: {
          ...state.contentStates,
          [navigation]: contentState,
        },
        contentData: {
          ...state.contentData,
          [navigation]: data,
        },
        history: newHistory,
      };
    }

    case CONTENT_ACTIONS.SET_CONTENT_DATA: {
      const { navigation, data } = action.payload;
      return {
        ...state,
        contentData: {
          ...state.contentData,
          [navigation]: data,
        },
      };
    }

    case CONTENT_ACTIONS.NAVIGATE_BACK: {
      if (state.history.length === 0) return state;

      const previousState = state.history[state.history.length - 1];
      const newHistory = state.history.slice(0, -1);

      return {
        ...state,
        activeNavigation: previousState.navigation,
        contentStates: {
          ...state.contentStates,
          [previousState.navigation]: previousState.contentState,
        },
        contentData: {
          ...state.contentData,
          [previousState.navigation]: previousState.data,
        },
        history: newHistory,
      };
    }

    case CONTENT_ACTIONS.RESET_CONTENT: {
      const { navigation, userRole } = action.payload;
      const defaultState = getDefaultContentState(navigation, userRole);

      return {
        ...state,
        contentStates: {
          ...state.contentStates,
          [navigation]: defaultState,
        },
        contentData: {
          ...state.contentData,
          [navigation]: null,
        },
      };
    }

    case CONTENT_ACTIONS.CLEAR_HISTORY: {
      return {
        ...state,
        history: [],
      };
    }

    default:
      return state;
  }
}

// Context Provider
export const ContentProvider = ({ children, userRole = 'alumni', enableSmartContent = true }) => {
  const [state, dispatch] = useReducer(contentReducer, {
    ...initialState,
    userRole,
    isSmartContentEnabled: enableSmartContent,
  });

  // Actions with useCallback for stable references
  const setNavigation = useCallback((navigation, userRole = state.userRole) => {
    dispatch({
      type: CONTENT_ACTIONS.SET_NAVIGATION,
      payload: { navigation, userRole },
    });
  }, []);

  const setContentState = useCallback((navigation, contentState, data = null, addToHistory = true) => {
    dispatch({
      type: CONTENT_ACTIONS.SET_CONTENT_STATE,
      payload: { navigation, contentState, data, addToHistory },
    });
  }, []);

  const setContentData = useCallback((navigation, data) => {
    dispatch({
      type: CONTENT_ACTIONS.SET_CONTENT_DATA,
      payload: { navigation, data },
    });
  }, []);

  const navigateBack = useCallback(() => {
    dispatch({ type: CONTENT_ACTIONS.NAVIGATE_BACK });
  }, []);

  const resetContent = useCallback((navigation, userRole = state.userRole) => {
    dispatch({
      type: CONTENT_ACTIONS.RESET_CONTENT,
      payload: { navigation, userRole },
    });
  }, []);

  const clearHistory = useCallback(() => {
    dispatch({ type: CONTENT_ACTIONS.CLEAR_HISTORY });
  }, []);

  // Computed values
  const canGoBack = state.history.length > 0;

  const value = {
    // State
    ...state,
    
    // Computed
    canGoBack,
    
    // Actions
    setNavigation,
    setContentState,
    setContentData,
    navigateBack,
    resetContent,
    clearHistory,
  };

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  );
};

// Hook to use the context
export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

export default ContentContext;