import { useState } from "react";
import "./NewsCard.css";

function NewsCard({ article, onSave, onRemove, isSaved = false }) {
  const [saved, setSaved] = useState(isSaved);

  const handleSaveClick = () => {
    if (saved) {
      onRemove?.(article);
      setSaved(false);
    } else {
      onSave?.(article);
      setSaved(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <article className="newscard">
      <div className="newscard__image-container">
        <img 
          src={article.urlToImage || '/images/placeholder-news.jpg'} 
          alt={article.title}
          className="newscard__image"
          onError={(e) => {
            e.target.src = '/images/placeholder-news.jpg';
          }}
        />
        <button 
          className={`newscard__save-button ${saved ? 'newscard__save-button--saved' : ''}`}
          onClick={handleSaveClick}
          title={saved ? 'Remove from saved' : 'Save article'}
        >
          <svg className="newscard__save-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
          </svg>
        </button>
      </div>
      
      <div className="newscard__content">
        <time className="newscard__date">
          {formatDate(article.publishedAt)}
        </time>
        
        <h3 className="newscard__title">
          {article.title}
        </h3>
        
        <p className="newscard__description">
          {article.description}
        </p>
        
        <div className="newscard__source">
          {article.source?.name || 'Unknown Source'}
        </div>
      </div>
    </article>
  );
}

export default NewsCard;