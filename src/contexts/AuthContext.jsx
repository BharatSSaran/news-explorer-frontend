// Authentication context for global state management
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { authAPI } from "../utils/authAPI";
import { sessionManager, savedArticlesManager } from "../utils/storage";

// Initial auth state
const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
  token: null,
  savedArticles: [],
  error: null,
};

// Auth actions
const AUTH_ACTIONS = {
  INITIALIZE_SESSION: "INITIALIZE_SESSION",
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  REGISTER_START: "REGISTER_START",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: "REGISTER_FAILURE",
  LOGOUT: "LOGOUT",
  SAVE_ARTICLE: "SAVE_ARTICLE",
  REMOVE_ARTICLE: "REMOVE_ARTICLE",
  SET_SAVED_ARTICLES: "SET_SAVED_ARTICLES",
  CLEAR_ERROR: "CLEAR_ERROR",
  SET_LOADING: "SET_LOADING",
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.INITIALIZE_SESSION:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        token: action.payload.token,
        savedArticles: action.payload.savedArticles || [],
      };

    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        savedArticles: action.payload.user.savedArticles || [],
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...initialState,
        isLoading: false,
      };

    case AUTH_ACTIONS.SAVE_ARTICLE:
      return {
        ...state,
        savedArticles: [...state.savedArticles, action.payload],
      };

    case AUTH_ACTIONS.REMOVE_ARTICLE:
      return {
        ...state,
        savedArticles: state.savedArticles.filter(
          (article) => article.url !== action.payload
        ),
      };

    case AUTH_ACTIONS.SET_SAVED_ARTICLES:
      return {
        ...state,
        savedArticles: action.payload,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}

// Create context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize session on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const sessionData = sessionManager.initializeSession();

        if (sessionData.isAuthenticated && sessionData.token) {
          // Validate token with mock API
          try {
            await authAPI.validateToken(sessionData.token);
            dispatch({
              type: AUTH_ACTIONS.INITIALIZE_SESSION,
              payload: sessionData,
            });
          } catch (error) {
            // Token invalid, clear session
            sessionManager.clearSession();
            dispatch({
              type: AUTH_ACTIONS.INITIALIZE_SESSION,
              payload: {
                isAuthenticated: false,
                user: null,
                token: null,
                savedArticles: [],
              },
            });
          }
        } else {
          dispatch({
            type: AUTH_ACTIONS.INITIALIZE_SESSION,
            payload: {
              isAuthenticated: false,
              user: null,
              token: null,
              savedArticles: [],
            },
          });
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        dispatch({
          type: AUTH_ACTIONS.INITIALIZE_SESSION,
          payload: {
            isAuthenticated: false,
            user: null,
            token: null,
            savedArticles: [],
          },
        });
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    try {
      const response = await authAPI.login(email, password);

      // Save session to localStorage
      sessionManager.saveSession(response.token, response.user);
      savedArticlesManager.saveArticles(response.user.savedArticles || []);

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response,
      });

      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };

  // Register function
  const register = async (email, password, username) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    try {
      const response = await authAPI.register(email, password, username);

      // Save session to localStorage
      sessionManager.saveSession(response.token, response.user);
      savedArticlesManager.saveArticles(response.user.savedArticles || []);

      dispatch({
        type: AUTH_ACTIONS.REGISTER_SUCCESS,
        payload: response,
      });

      return response;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.REGISTER_FAILURE,
        payload: error.message,
      });
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await authAPI.logout();
      sessionManager.clearSession();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      console.error("Error during logout:", error);
      // Still clear local session even if API call fails
      sessionManager.clearSession();
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Save article function
  const saveArticle = async (article) => {
    try {
      const response = await authAPI.saveArticle(article);
      savedArticlesManager.addArticle(response.article);

      dispatch({
        type: AUTH_ACTIONS.SAVE_ARTICLE,
        payload: response.article,
      });

      return response;
    } catch (error) {
      console.error("Error saving article:", error);
      throw error;
    }
  };

  // Remove article function
  const removeArticle = async (articleUrl) => {
    try {
      await authAPI.removeArticle(articleUrl);
      savedArticlesManager.removeArticle(articleUrl);

      dispatch({
        type: AUTH_ACTIONS.REMOVE_ARTICLE,
        payload: articleUrl,
      });
    } catch (error) {
      console.error("Error removing article:", error);
      throw error;
    }
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Context value
  const value = {
    ...state,
    login,
    register,
    logout,
    saveArticle,
    removeArticle,
    clearError,
    isArticleSaved: (articleUrl) =>
      state.savedArticles.some((article) => article.url === articleUrl),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
