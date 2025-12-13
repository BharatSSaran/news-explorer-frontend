import NewsCard from "../NewsCard/NewsCard";
import "./NewsCardList.css";

function NewsCardList({
  articles = [],
  onSaveArticle,
  onRemoveArticle,
  savedArticles = [],
  title = "Search Results",
  showTitle = true,
  showMore = false,
  onShowMore,
}) {
  // Check if an article is saved
  const isArticleSaved = (article) => {
    return savedArticles.some(
      (saved) => saved.url === article.url || saved.title === article.title
    );
  };

  // Handle empty state
  if (articles.length === 0) {
    return (
      <section className="news-card-list">
        {showTitle && (
          <div className="news-card-list__header">
            <h2 className="news-card-list__title">{title}</h2>
          </div>
        )}
        <div className="news-card-list__empty">
          <p className="news-card-list__empty-text">
            No articles found. Try a different search term.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="news-card-list">
      {showTitle && (
        <div className="news-card-list__header">
          <h2 className="news-card-list__title">{title}</h2>
          <p className="news-card-list__count">
            {articles.length} {articles.length === 1 ? "result" : "results"}
          </p>
        </div>
      )}

      <div className="news-card-list__grid">
        {articles.map((article, index) => (
          <NewsCard
            key={article.url || index}
            article={article}
            onSave={onSaveArticle}
            onRemove={onRemoveArticle}
            isSaved={isArticleSaved(article)}
          />
        ))}
      </div>

      {showMore && (
        <div className="news-card-list__show-more">
          <button
            className="news-card-list__show-more-button"
            onClick={onShowMore}
          >
            Show More
          </button>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
