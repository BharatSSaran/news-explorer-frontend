// Mock authentication and user management API
// Simulates backend responses for user authentication and article management

class MockAuthAPI {
  constructor() {
    // Sample users database (in real app, this would be backend)
    this.users = [
      {
        id: 1,
        email: "elise@example.com",
        username: "Elise",
        password: "password123", // In real app, this would be hashed
        savedArticles: [
          {
            title: "Everyone Needs a Special 'Sit Spot' in Nature",
            description:
              "Ever since I read Richard Louv's influential book, 'Last Child in the Woods,' the idea of having a special 'sit spot' has stuck with me.",
            url: "https://example.com/nature-sit-spot",
            urlToImage:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop",
            publishedAt: "2020-11-04T00:00:00Z",
            source: { name: "TREEHUGGER" },
            keyword: "Nature",
            savedAt: "2025-12-30T12:00:00Z",
          },
          {
            title: "Nature makes you better",
            description:
              "We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.",
            url: "https://example.com/nature-makes-better",
            urlToImage:
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop",
            publishedAt: "2019-02-19T00:00:00Z",
            source: { name: "NATIONAL GEOGRAPHIC" },
            keyword: "Nature",
            savedAt: "2025-12-30T12:00:00Z",
          },
          {
            title: "Nostalgic Photos of Tourists in U.S. National Parks",
            description:
              "Uri Levavild Golman and Helle Levavild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to America's national parks.",
            url: "https://example.com/national-parks-photos",
            urlToImage:
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
            publishedAt: "2020-10-19T00:00:00Z",
            source: { name: "NATIONAL GEOGRAPHIC" },
            keyword: "Yellowstone",
            savedAt: "2025-12-30T12:00:00Z",
          },
        ],
      },
      {
        id: 2,
        email: "test@example.com",
        username: "TestUser",
        password: "test123",
        savedArticles: [],
      },
    ];

    // Current session storage
    this.currentUser = null;
    this.sessionToken = null;
  }

  // Simulate API delay
  delay(ms = 1000) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Generate mock JWT token
  generateToken(user) {
    return `mock-jwt-${user.id}-${Date.now()}`;
  }

  // Login simulation
  async login(email, password) {
    await this.delay(800); // Simulate network delay

    const user = this.users.find((u) => u.email === email);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.password !== password) {
      throw new Error("Invalid credentials");
    }

    // Simulate successful login
    this.currentUser = { ...user };
    delete this.currentUser.password; // Don't expose password
    this.sessionToken = this.generateToken(user);

    return {
      user: this.currentUser,
      token: this.sessionToken,
      message: "Login successful",
    };
  }

  // Registration simulation
  async register(email, password, username) {
    await this.delay(1000); // Simulate network delay

    // Check if user already exists
    const existingUser = this.users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Check if username is taken
    const existingUsername = this.users.find((u) => u.username === username);
    if (existingUsername) {
      throw new Error("Username is already taken");
    }

    // Create new user
    const newUser = {
      id: this.users.length + 1,
      email,
      username,
      password, // In real app, this would be hashed
      savedArticles: [],
    };

    this.users.push(newUser);

    // Auto-login after registration
    this.currentUser = { ...newUser };
    delete this.currentUser.password;
    this.sessionToken = this.generateToken(newUser);

    return {
      user: this.currentUser,
      token: this.sessionToken,
      message: "Registration successful",
    };
  }

  // Logout simulation
  async logout() {
    await this.delay(300);

    this.currentUser = null;
    this.sessionToken = null;

    return {
      message: "Logout successful",
    };
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!this.currentUser && !!this.sessionToken;
  }

  // Save article for current user
  async saveArticle(article) {
    await this.delay(500);

    if (!this.isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    const user = this.users.find((u) => u.id === this.currentUser.id);
    if (!user) {
      throw new Error("User not found");
    }

    // Check if article is already saved
    const isAlreadySaved = user.savedArticles.some(
      (saved) => saved.url === article.url
    );

    if (isAlreadySaved) {
      throw new Error("Article is already saved");
    }

    // Add article with save metadata
    const savedArticle = {
      ...article,
      savedAt: new Date().toISOString(),
      savedBy: this.currentUser.id,
    };

    user.savedArticles.push(savedArticle);

    // Update current user
    this.currentUser.savedArticles = user.savedArticles;

    return {
      article: savedArticle,
      message: "Article saved successfully",
    };
  }

  // Remove saved article
  async removeArticle(articleUrl) {
    await this.delay(500);

    if (!this.isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    const user = this.users.find((u) => u.id === this.currentUser.id);
    if (!user) {
      throw new Error("User not found");
    }

    // Remove article from saved list
    const initialLength = user.savedArticles.length;
    user.savedArticles = user.savedArticles.filter(
      (article) => article.url !== articleUrl
    );

    if (user.savedArticles.length === initialLength) {
      throw new Error("Article not found in saved list");
    }

    // Update current user
    this.currentUser.savedArticles = user.savedArticles;

    return {
      message: "Article removed successfully",
    };
  }

  // Get saved articles for current user
  async getSavedArticles() {
    await this.delay(600);

    if (!this.isAuthenticated()) {
      throw new Error("User not authenticated");
    }

    const user = this.users.find((u) => u.id === this.currentUser.id);
    if (!user) {
      throw new Error("User not found");
    }

    return {
      articles: user.savedArticles,
      count: user.savedArticles.length,
    };
  }

  // Validate token (simulate token verification)
  async validateToken(token) {
    await this.delay(200);

    if (token !== this.sessionToken) {
      throw new Error("Invalid token");
    }

    return {
      valid: true,
      user: this.currentUser,
    };
  }
}

// Create singleton instance
const mockAuthAPI = new MockAuthAPI();

// Export API functions
export const authAPI = {
  login: (email, password) => mockAuthAPI.login(email, password),
  register: (email, password, username) =>
    mockAuthAPI.register(email, password, username),
  logout: () => mockAuthAPI.logout(),
  getCurrentUser: () => mockAuthAPI.getCurrentUser(),
  isAuthenticated: () => mockAuthAPI.isAuthenticated(),
  saveArticle: (article) => mockAuthAPI.saveArticle(article),
  removeArticle: (articleUrl) => mockAuthAPI.removeArticle(articleUrl),
  getSavedArticles: () => mockAuthAPI.getSavedArticles(),
  validateToken: (token) => mockAuthAPI.validateToken(token),
};

export default authAPI;
