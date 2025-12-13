// News API service for fetching articles
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL =
  import.meta.env.VITE_NEWS_API_BASE_URL || "https://newsapi.org/v2";

/**
 * Fetches news articles from News API
 * @param {string} query - Search query for news articles
 * @param {object} options - Additional options (page, pageSize, sortBy, etc.)
 * @returns {Promise<object>} Promise that resolves to articles data
 */
export const fetchNewsArticles = async (query, options = {}) => {
  // Check if API key is configured
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error(
      "News API key not configured. Please add VITE_NEWS_API_KEY to your .env file."
    );
  }

  const {
    page = 1,
    pageSize = 12,
    sortBy = "publishedAt",
    language = "en",
  } = options;

  // Build URL with parameters
  const params = new URLSearchParams({
    q: query,
    page: page.toString(),
    pageSize: pageSize.toString(),
    sortBy,
    language,
    apiKey: API_KEY,
  });

  const url = `${BASE_URL}/everything?${params}`;

  try {
    const response = await fetch(url);

    // Handle HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      switch (response.status) {
        case 400:
          throw new Error(
            "Invalid search query. Please try a different search term."
          );
        case 401:
          throw new Error(
            "Invalid API key. Please check your News API configuration."
          );
        case 429:
          throw new Error(
            "Too many requests. Please wait a moment and try again."
          );
        case 500:
          throw new Error(
            "News service temporarily unavailable. Please try again later."
          );
        default:
          throw new Error(
            errorData.message || `HTTP Error: ${response.status}`
          );
      }
    }

    const data = await response.json();

    // Handle API-specific errors
    if (data.status === "error") {
      throw new Error(data.message || "An error occurred while fetching news.");
    }

    // Filter out articles with missing essential data
    const filteredArticles = (data.articles || []).filter(
      (article) =>
        article.title &&
        article.description &&
        article.url &&
        article.title !== "[Removed]" &&
        article.description !== "[Removed]"
    );

    return {
      articles: filteredArticles,
      totalResults: data.totalResults || 0,
      page,
      pageSize,
    };
  } catch (error) {
    // Re-throw our custom errors
    if (
      error.message.includes("API key") ||
      error.message.includes("search query") ||
      error.message.includes("requests") ||
      error.message.includes("service")
    ) {
      throw error;
    }

    // Handle network errors
    if (error.name === "TypeError" && error.message.includes("fetch")) {
      throw new Error(
        "Unable to connect to news service. Please check your internet connection."
      );
    }

    // Generic error fallback
    throw new Error("Failed to fetch news articles. Please try again.");
  }
};

/**
 * Get top headlines for a specific category or country
 * @param {object} options - Options for top headlines
 * @returns {Promise<object>} Promise that resolves to headlines data
 */
export const fetchTopHeadlines = async (options = {}) => {
  if (!API_KEY || API_KEY === "your_api_key_here") {
    throw new Error("News API key not configured.");
  }

  const { country = "us", category, pageSize = 12 } = options;

  const params = new URLSearchParams({
    country,
    pageSize: pageSize.toString(),
    apiKey: API_KEY,
  });

  if (category) {
    params.append("category", category);
  }

  const url = `${BASE_URL}/top-headlines?${params}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
    };
  } catch (error) {
    throw new Error("Failed to fetch top headlines.");
  }
};
