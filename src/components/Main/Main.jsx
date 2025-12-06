import SearchForm from "../SearchForm/SearchForm";
import "./Main.css";

function Main() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    // TODO: Implement actual search functionality with News API
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
        <p>News results will appear here...</p>
      </section>
    </main>
  );
}

export default Main;
