import { useState } from "react";
import "./NewsCard.css";

function NewsCard({ article, onSave, onRemove, isSaved = false }) {
  const [saved, setSaved] = useState(isSaved);
  const [imageError, setImageError] = useState(false);

  const handleSaveClick = () => {
    if (saved) {
      onRemove?.(article);
      setSaved(false);
    } else {
      onSave?.(article);
      setSaved(true);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="newscard fade-in card-hover">
      <div className="newscard__image-container">
        {!imageError && article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="newscard__image smooth-transition"
            onError={handleImageError}
          />
        ) : (
          <div className="newscard__image-placeholder fade-in">
            <span className="newscard__image-placeholder-text">
              No Image Available
            </span>
          </div>
        )}
        <button
          className={`newscard__save-button smooth-transition-fast button-hover-scale ${
            saved ? "newscard__save-button--saved" : ""
          }`}
          onClick={handleSaveClick}
          aria-label={saved ? "Remove article from saved" : "Save article"}
          aria-pressed={saved}
          data-tooltip={saved ? "Remove from saved" : "Save article"}
          title={saved ? "Remove from saved" : "Save article"}
        >
          <svg
            className="newscard__save-icon"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </button>
      </div>

      <div className="newscard__content">
        <time className="newscard__date">
          {formatDate(article.publishedAt)}
        </time>

        <h3 className="newscard__title">{article.title}</h3>

        <p className="newscard__description">{article.description}</p>

        <div className="newscard__source">
          {article.source?.name || "Unknown Source"}
        </div>
      </div>
    </article>
  );
}

export default NewsCard;
