import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import { fetchNewsArticles } from "../../utils/newsApi";
import "./Main.css";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [articles, setArticles] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [displayedCount, setDisplayedCount] = useState(3);

  const handleSearch = async (query) => {
    console.log("Searching for:", query);
    setIsLoading(true);
    setHasSearched(true);
    setSearchQuery(query);
    setError("");
    setDisplayedCount(3); // Reset to show 3 initially

    try {
      const data = await fetchNewsArticles(query, {
        pageSize: 100,
        sortBy: "publishedAt",
      });

      setArticles(data.articles);
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveArticle = (article) => {
    setSavedArticles((prev) => {
      const isAlreadySaved = prev.some((saved) => saved.url === article.url);
      if (!isAlreadySaved) {
        return [...prev, article];
      }
      return prev;
    });
  };

  const handleRemoveArticle = (article) => {
    setSavedArticles((prev) =>
      prev.filter((saved) => saved.url !== article.url)
    );
  };

  const handleShowMore = () => {
    setDisplayedCount((prev) => Math.min(prev + 3, articles.length));
  };

  return (
    <main className="main">
      <section className="search fade-in">
        <h1 className="search__title slide-in-bottom">
          What's going on in the world?
        </h1>
        <p className="search__subtitle slide-in-bottom">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <SearchForm onSearch={handleSearch} />
      </section>

      {isLoading && (
        <Preloader type="skeleton" displayedCount={displayedCount} />
      )}

      {!isLoading && hasSearched && articles.length > 0 && (
        <NewsCardList
          articles={articles.slice(0, displayedCount)}
          onSaveArticle={handleSaveArticle}
          onRemoveArticle={handleRemoveArticle}
          savedArticles={savedArticles}
          title={`Search results for "${searchQuery}"`}
          showMore={displayedCount < articles.length}
          onShowMore={handleShowMore}
        />
      )}

      {!isLoading && hasSearched && error && (
        <section className="news-results">
          <div className="news-results__error">
            <h3>Oops! Something went wrong</h3>
            <p>{error}</p>
            <button
              onClick={() => handleSearch(searchQuery)}
              className="news-results__retry-button"
            >
              Try Again
            </button>
          </div>
        </section>
      )}

      {!isLoading && hasSearched && !error && articles.length === 0 && (
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
