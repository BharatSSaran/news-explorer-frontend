import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      setError("Please enter a keyword");
      return;
    }

    setError("");
    onSearch(trimmedQuery);
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <input
          type="text"
          className={`search-form__input ${
            error ? "search-form__input--error" : ""
          }`}
          placeholder="Enter topic"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </div>
      {error && (
        <div className="search-form__error">
          <p className="search-form__error-text">{error}</p>
        </div>
      )}
    </form>
  );
}

export default SearchForm;
