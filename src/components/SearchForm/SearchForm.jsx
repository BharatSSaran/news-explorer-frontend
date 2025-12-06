import { useState } from "react";
import "./SearchForm.css";

function SearchForm({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-form__input-container">
        <input
          type="text"
          className="search-form__input"
          placeholder="Enter topic"
          value={query}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="search-form__button">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
