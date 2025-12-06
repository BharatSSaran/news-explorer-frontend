import { useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import "./Main.css";

function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (query) => {
    console.log("Searching for:", query);
    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Implement actual search functionality with News API
    }, 2000);
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
      <section className="news-results">
        {isLoading && <Preloader />}
        {!isLoading && hasSearched && <p>News results will appear here...</p>}
        {!isLoading && !hasSearched && (
          <p>Enter a search term to find news articles.</p>
        )}
      </section>
    </main>
  );
}

export default Main;
