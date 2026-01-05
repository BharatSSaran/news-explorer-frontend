import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./SearchForm.css";

const SearchForm = forwardRef(function SearchForm(
  { onSearch, value = "" },
  ref
) {
  const [query, setQuery] = useState(value);
  const [error, setError] = useState("");

  useImperativeHandle(ref, () => ({
    reset: () => {
      setQuery("");
      setError("");
    },
  }));

  // Update internal state when value prop changes
  useEffect(() => {
    setQuery(value);
    // Also clear any errors when value is reset
    if (value === "") {
      setError("");
    }
  }, [value]);

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
    <form
      className="search-form scale-in"
      onSubmit={handleSubmit}
      role="search"
    >
      <div className="search-form__input-container">
        <label htmlFor="search-input" className="sr-only">
          Search for news
        </label>
        <input
          id="search-input"
          type="text"
          className={`search-form__input smooth-transition focus-ring ${
            error ? "search-form__input--error" : ""
          }`}
          placeholder="Enter topic"
          value={query}
          onChange={handleInputChange}
          aria-describedby={error ? "search-error" : undefined}
          aria-invalid={!!error}
        />
        <button
          type="submit"
          className="search-form__button smooth-transition button-hover-scale pulse-on-hover"
          aria-label="Search for news articles"
        >
          Search
        </button>
      </div>
      {error && (
        <div className="search-form__error slide-in-bottom" role="alert">
          <p id="search-error" className="search-form__error-text">
            {error}
          </p>
        </div>
      )}
    </form>
  );
});

export default SearchForm;
