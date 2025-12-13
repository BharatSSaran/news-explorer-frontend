// Sample data for development and testing
export const sampleArticles = [
  {
    title: "Scientists Discover New Species of Deep-Sea Creature",
    description:
      "Researchers have identified a previously unknown species of bioluminescent fish in the Pacific Ocean's deepest trenches, shedding new light on marine biodiversity.",
    url: "https://example.com/news/deep-sea-discovery",
    urlToImage:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop",
    publishedAt: "2025-12-13T08:30:00Z",
    source: {
      name: "Science Daily",
    },
    author: "Dr. Marine Johnson",
  },
  {
    title: "Major Breakthrough in Renewable Energy Technology",
    description:
      "A new solar panel design achieves 45% efficiency, potentially revolutionizing clean energy production worldwide and reducing carbon emissions significantly.",
    url: "https://example.com/news/solar-breakthrough",
    urlToImage:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=200&fit=crop",
    publishedAt: "2025-12-13T07:15:00Z",
    source: {
      name: "Green Tech News",
    },
    author: "Sarah Chen",
  },
  {
    title: "Artificial Intelligence Helps Predict Climate Patterns",
    description:
      "Machine learning algorithms are now able to forecast weather patterns with unprecedented accuracy, helping communities prepare for extreme weather events.",
    url: "https://example.com/news/ai-climate-prediction",
    urlToImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
    publishedAt: "2025-12-13T06:45:00Z",
    source: {
      name: "Tech Today",
    },
    author: "Michael Roberts",
  },
  {
    title: "Space Telescope Captures Stunning Images of Distant Galaxy",
    description:
      "The latest images from the space telescope reveal intricate details of a galaxy 13 billion light-years away, offering insights into the early universe.",
    url: "https://example.com/news/space-telescope-galaxy",
    urlToImage:
      "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=200&fit=crop",
    publishedAt: "2025-12-13T05:20:00Z",
    source: {
      name: "Astronomy Weekly",
    },
    author: "Dr. Emma Rodriguez",
  },
  {
    title: "Revolutionary Medical Treatment Shows Promise in Clinical Trials",
    description:
      "A groundbreaking gene therapy treatment has shown remarkable success in treating rare genetic disorders, offering hope to thousands of patients worldwide.",
    url: "https://example.com/news/gene-therapy-breakthrough",
    urlToImage:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop",
    publishedAt: "2025-12-13T04:10:00Z",
    source: {
      name: "Medical News",
    },
    author: "Dr. James Wilson",
  },
  {
    title: "Ancient City Discovered Using Advanced Satellite Technology",
    description:
      "Archaeologists have uncovered a 3,000-year-old city using cutting-edge satellite imagery and ground-penetrating radar, revealing secrets of an ancient civilization.",
    url: "https://example.com/news/ancient-city-discovery",
    urlToImage:
      "https://images.unsplash.com/photo-1539650116574-75c0c6d1c3b5?w=400&h=200&fit=crop",
    publishedAt: "2025-12-13T03:30:00Z",
    source: {
      name: "Archaeology Today",
    },
    author: "Prof. Lisa Martinez",
  },
  {
    title: "Quantum Computing Milestone Achieved by Research Team",
    description:
      "Scientists have successfully demonstrated quantum supremacy in solving complex optimization problems, marking a significant step forward in computing technology.",
    url: "https://example.com/news/quantum-computing-milestone",
    urlToImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop",
    publishedAt: "2025-12-13T02:45:00Z",
    source: {
      name: "Quantum Journal",
    },
    author: "Dr. Kevin Zhang",
  },
  {
    title: "Sustainable Agriculture Innovation Helps Combat Food Security",
    description:
      "New vertical farming techniques are producing 40% more crops while using 95% less water, addressing global food security challenges in urban areas.",
    url: "https://example.com/news/sustainable-agriculture",
    urlToImage:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=200&fit=crop",
    publishedAt: "2025-12-13T01:15:00Z",
    source: {
      name: "AgriTech Review",
    },
    author: "Maria Gonzalez",
  },
  {
    title: "Ocean Conservation Effort Shows Remarkable Success",
    description:
      "A five-year marine protection program has resulted in a 60% increase in coral reef recovery, demonstrating the effectiveness of conservation initiatives.",
    url: "https://example.com/news/ocean-conservation-success",
    urlToImage:
      "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=200&fit=crop",
    publishedAt: "2025-12-12T23:30:00Z",
    source: {
      name: "Ocean Life",
    },
    author: "David Thompson",
  },
];

export const sampleUser = {
  id: 1,
  email: "elise@example.com",
  username: "Elise",
  name: "Elise Johnson",
  savedArticles: [sampleArticles[0], sampleArticles[2], sampleArticles[4]],
};

export const loadingStates = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

export const errorMessages = {
  NETWORK_ERROR:
    "Unable to connect to the news service. Please check your internet connection.",
  API_ERROR:
    "The news service is temporarily unavailable. Please try again later.",
  SEARCH_ERROR:
    "No articles found for your search. Try a different search term.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
};

// Helper function to simulate API delays for development
export const simulateApiDelay = (ms = 1500) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Function to get sample articles with optional filtering
export const getSampleArticles = (query = "", count = 9) => {
  let filteredArticles = sampleArticles;

  if (query) {
    const searchTerm = query.toLowerCase();
    filteredArticles = sampleArticles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchTerm) ||
        article.description.toLowerCase().includes(searchTerm)
    );
  }

  return {
    articles: filteredArticles.slice(0, count),
    totalResults: filteredArticles.length,
  };
};

// Function to simulate different API response scenarios
export const simulateApiResponse = async (query = "", scenario = "success") => {
  await simulateApiDelay(1000);

  switch (scenario) {
    case "success":
      return getSampleArticles(query);

    case "empty":
      return {
        articles: [],
        totalResults: 0,
      };

    case "error":
      throw new Error(errorMessages.API_ERROR);

    case "network_error":
      throw new Error(errorMessages.NETWORK_ERROR);

    default:
      return getSampleArticles(query);
  }
};
