import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import "./Main.css";

// Mock data for testing NewsCard display
const mockArticles = [
  {
    title: "Breaking: Major Technology Breakthrough Announced",
    description: "Scientists have made a significant breakthrough in quantum computing that could revolutionize the tech industry. This development promises faster processing speeds and enhanced security measures.",
    url: "https://example.com/tech-breakthrough",
    urlToImage: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
    publishedAt: "2025-12-06T10:00:00Z",
    source: { name: "Tech News Today" }
  },
  {
    title: "Climate Summit Reaches Historic Agreement",
    description: "World leaders have reached a consensus on new climate policies that aim to reduce global emissions by 50% over the next decade. The agreement includes funding for renewable energy projects.",
    url: "https://example.com/climate-summit",
    urlToImage: "https://images.unsplash.com/photo-1569163139394-de4e5f43e4e3?w=400",
    publishedAt: "2025-12-06T08:30:00Z",
    source: { name: "Global News Network" }
  },
  {
    title: "Space Exploration Mission Launches Successfully",
    description: "The latest Mars exploration mission has launched successfully, carrying advanced instruments to study the planet's geological composition and search for signs of ancient life.",
    url: "https://example.com/space-mission",
    urlToImage: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400",
    publishedAt: "2025-12-05T16:45:00Z",
    source: { name: "Space Chronicle" }
  }
];

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    setIsLoading(true);
    setHasSearched(true);
    setSearchQuery(query);

    // Simulate API call with mock data
    setTimeout(() => {
      setIsLoading(false);
      setArticles(mockArticles);
      // TODO: Replace with actual News API call
      // fetchNewsArticles(query).then(setArticles)
    }, 2000);
  };

  const handleSaveArticle = (article) => {
    setSavedArticles(prev => {
      const isAlreadySaved = prev.some(saved => saved.url === article.url);
      if (!isAlreadySaved) {
        return [...prev, article];
      }
      return prev;
    });
  };

  const handleRemoveArticle = (article) => {
    setSavedArticles(prev => 
      prev.filter(saved => saved.url !== article.url)
    );
  };

  return (
    <main className="main">
      <section className="search">
        <h1 className="search__title">What's going on in the world?</h1>
        <p className="search__subtitle">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearch={handleSearch} />
      </section>
      
      {isLoading && (
        <section className="news-results">
          <Preloader />
        </section>
      )}
      
      {!isLoading && hasSearched && articles.length > 0 && (
        <NewsCardList
          articles={articles}
          onSaveArticle={handleSaveArticle}
          onRemoveArticle={handleRemoveArticle}
          savedArticles={savedArticles}
          title={`Search results for "${searchQuery}"`}
        />
      )}
      
      {!isLoading && hasSearched && articles.length === 0 && (
        <section className="news-results">
          <div className="news-results__empty">
            <p>No articles found for your search. Try a different term.</p>
          </div>
        </section>
      )}
      
      {!isLoading && !hasSearched && (
        <section className="news-results">
          <div className="news-results__prompt">
            <p>Enter a search term to find the latest news articles.</p>
          </div>
        </section>
      )}
    </main>
  );
}

export default Main;
