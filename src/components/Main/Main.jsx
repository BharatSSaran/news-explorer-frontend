import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/Preloader";
import searchNotFoundIcon from "../../assets/icons/search-not-found-icon.svg";
import { useAuth } from "../../contexts/AuthContext";
import "./Main.css";

function Main({
  onLoginClick,
  articles = [],
  isLoading,
  hasSearched,
  searchQuery,
  error,
  displayedCount,
  setDisplayedCount,
}) {
  const { savedArticles, saveArticle, removeArticle } = useAuth();

  const handleShowMore = () => setDisplayedCount((prev) => prev + 3);

  const handleSaveArticle = async (article) => {
    try {
      const articleWithKeyword = {
        ...article,
        keyword: searchQuery,
      };
      await saveArticle(articleWithKeyword);
    } catch (error) {
      console.error("Error saving article:", error);
    }
  };

  const handleRemoveArticle = async (article) => {
    try {
      await removeArticle(article.url);
    } catch (error) {
      console.error("Error removing article:", error);
    }
  };

  return (
    <div className="main-content">
      {isLoading && <Preloader type="skeleton" />}

      {!isLoading && articles.length > 0 && (
        <NewsCardList
          articles={articles.slice(0, displayedCount)}
          title="Search results"
          showMore={displayedCount < articles.length}
          onShowMore={handleShowMore}
          onLoginClick={onLoginClick}
          onSaveArticle={handleSaveArticle}
          onRemoveArticle={handleRemoveArticle}
          savedArticles={savedArticles}
        />
      )}

      {!isLoading && articles.length === 0 && hasSearched && !error && (
        <div className="news-results__empty">
          <img src={searchNotFoundIcon} alt="Not found" />
          <h3>Nothing found</h3>
          <p>Sorry, but nothing matched your search terms.</p>
        </div>
      )}

      {!isLoading && error && (
        <div className="news-results__error">
          <p
            style={{
              color: "#b6bcbf",
              textAlign: "center",
              padding: "40px",
            }}
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
}

export default Main;
