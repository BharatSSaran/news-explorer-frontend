// Local storage utilities for persisting user data
// Handles storage of authentication tokens and user preferences

const STORAGE_KEYS = {
  TOKEN: "newsExplorer_authToken",
  USER: "newsExplorer_currentUser",
  SAVED_ARTICLES: "newsExplorer_savedArticles",
  PREFERENCES: "newsExplorer_userPreferences",
};

// Storage utilities
export const storage = {
  // Get item from localStorage with error handling
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage:`, error);
      return null;
    }
  },

  // Set item in localStorage with error handling
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage:`, error);
      return false;
    }
  },

  // Remove item from localStorage
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage:`, error);
      return false;
    }
  },

  // Clear all app-related storage
  clearAll() {
    Object.values(STORAGE_KEYS).forEach((key) => {
      this.remove(key);
    });
  },
};

// Authentication token management
export const tokenManager = {
  // Save authentication token
  saveToken(token) {
    return storage.set(STORAGE_KEYS.TOKEN, token);
  },

  // Get authentication token
  getToken() {
    return storage.get(STORAGE_KEYS.TOKEN);
  },

  // Remove authentication token
  removeToken() {
    return storage.remove(STORAGE_KEYS.TOKEN);
  },

  // Check if token exists
  hasToken() {
    return !!this.getToken();
  },
};

// User data management
export const userManager = {
  // Save current user data
  saveUser(user) {
    return storage.set(STORAGE_KEYS.USER, user);
  },

  // Get current user data
  getUser() {
    return storage.get(STORAGE_KEYS.USER);
  },

  // Remove user data
  removeUser() {
    return storage.remove(STORAGE_KEYS.USER);
  },

  // Update user data
  updateUser(updates) {
    const currentUser = this.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      return this.saveUser(updatedUser);
    }
    return false;
  },
};

// Saved articles management
export const savedArticlesManager = {
  // Save articles list
  saveArticles(articles) {
    return storage.set(STORAGE_KEYS.SAVED_ARTICLES, articles);
  },

  // Get saved articles
  getArticles() {
    return storage.get(STORAGE_KEYS.SAVED_ARTICLES) || [];
  },

  // Add article to saved list
  addArticle(article) {
    const articles = this.getArticles();
    const articleWithTimestamp = {
      ...article,
      savedAt: new Date().toISOString(),
    };

    // Check if article is already saved
    const exists = articles.some((saved) => saved.url === article.url);
    if (!exists) {
      articles.push(articleWithTimestamp);
      return this.saveArticles(articles);
    }
    return false;
  },

  // Remove article from saved list
  removeArticle(articleUrl) {
    const articles = this.getArticles();
    const filteredArticles = articles.filter(
      (article) => article.url !== articleUrl
    );
    return this.saveArticles(filteredArticles);
  },

  // Check if article is saved
  isArticleSaved(articleUrl) {
    const articles = this.getArticles();
    return articles.some((article) => article.url === articleUrl);
  },

  // Clear all saved articles
  clearArticles() {
    return storage.remove(STORAGE_KEYS.SAVED_ARTICLES);
  },
};

// User preferences management
export const preferencesManager = {
  // Save user preferences
  savePreferences(preferences) {
    return storage.set(STORAGE_KEYS.PREFERENCES, preferences);
  },

  // Get user preferences
  getPreferences() {
    return (
      storage.get(STORAGE_KEYS.PREFERENCES) || {
        theme: "light",
        language: "en",
        articlesPerPage: 3,
      }
    );
  },

  // Update specific preference
  updatePreference(key, value) {
    const preferences = this.getPreferences();
    preferences[key] = value;
    return this.savePreferences(preferences);
  },
};

// Session management utilities
export const sessionManager = {
  // Initialize session from storage
  initializeSession() {
    const token = tokenManager.getToken();
    const user = userManager.getUser();

    return {
      isAuthenticated: !!(token && user),
      token,
      user,
      savedArticles: savedArticlesManager.getArticles(),
    };
  },

  // Save session data
  saveSession(token, user) {
    const success = tokenManager.saveToken(token) && userManager.saveUser(user);
    return success;
  },

  // Clear session data
  clearSession() {
    tokenManager.removeToken();
    userManager.removeUser();
    savedArticlesManager.clearArticles();
    return true;
  },

  // Check if session is valid (basic check)
  isSessionValid() {
    const token = tokenManager.getToken();
    const user = userManager.getUser();

    if (!token || !user) {
      return false;
    }

    // Add expiration check if needed
    // const tokenExpiry = this.getTokenExpiry(token);
    // return new Date() < tokenExpiry;

    return true;
  },
};

// Export storage keys for reference
export { STORAGE_KEYS };

export default {
  storage,
  tokenManager,
  userManager,
  savedArticlesManager,
  preferencesManager,
  sessionManager,
};
