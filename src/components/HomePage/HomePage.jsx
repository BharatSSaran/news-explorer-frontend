import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import Main from "../Main/Main";
import About from "../About/About";
import "./HomePage.css";

function HomePage({
  onSearch,
  articles,
  isLoading,
  hasSearched,
  searchQuery,
  error,
  onLoginClick,
  displayedCount,
  setDisplayedCount,
}) {
  return (
    <div className="homepage">
      <div className="hero-wrapper">
        <section className="search">
          <h1 className="search__title">What's going on in the world?</h1>
          <p className="search__subtitle">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearch={onSearch} value={searchQuery} />
        </section>
      </div>

      {/* Conditionally render the results section */}
      {hasSearched && (
        <div className="results-container">
          <Main
            articles={articles}
            isLoading={isLoading}
            hasSearched={hasSearched}
            searchQuery={searchQuery}
            error={error}
            onLoginClick={onLoginClick}
            displayedCount={displayedCount}
            setDisplayedCount={setDisplayedCount}
          />
        </div>
      )}

      <div className="about-section-wrapper">
        <div className="about-container">
          <About />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
