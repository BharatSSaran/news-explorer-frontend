import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./NewsCard.css";

const ImagePlaceholderIcon = () => (
  <svg
    width="96"
    height="96"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z"
      fill="#B6BCBF"
    />
  </svg>
);

const BookmarkIcon = ({ className }) => (
  <svg
    width="14"
    height="19"
    viewBox="0 0 14 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "block", flexShrink: 0 }}
  >
    <path
      d="M13 1V16.9424L7.61816 12.7139L7 12.2285L6.38184 12.7139L1 16.9424V1H13Z"
      stroke="#B6BCBF"
      strokeWidth="2"
    />
  </svg>
);

const BookmarkHoverIcon = ({ className }) => (
  <svg
    width="14"
    height="19"
    viewBox="0 0 14 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "block", flexShrink: 0 }}
  >
    <path
      d="M13 1V16.9424L7.61816 12.7139L7 12.2285L6.38184 12.7139L1 16.9424V1H13Z"
      stroke="#1A1B22"
      strokeWidth="2"
    />
  </svg>
);

const BookmarkSavedIcon = ({ className }) => (
  <svg
    width="14"
    height="19"
    viewBox="0 0 14 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "block", flexShrink: 0 }}
  >
    <path
      d="M13 1V16.9424L7.61816 12.7139L7 12.2285L6.38184 12.7139L1 16.9424V1H13Z"
      fill="#2F71E5"
    />
  </svg>
);

const TrashIcon = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "block", flexShrink: 0 }}
  >
    <path
      d="M16 6V5.2C16 4.08 16 3.52 15.782 3.092C15.59 2.715 15.285 2.41 14.908 2.218C14.48 2 13.92 2 12.8 2H11.2C10.08 2 9.52 2 9.092 2.218C8.715 2.41 8.41 2.715 8.218 3.092C8 3.52 8 4.08 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.88 19 19.72 18.673 20.362C18.385 20.927 17.927 21.385 17.362 21.673C16.72 22 15.88 22 14.2 22H9.8C8.12 22 7.28 22 6.638 21.673C6.073 21.385 5.615 20.927 5.327 20.362C5 19.72 5 18.88 5 17.2V6"
      stroke="#B6BCBF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TrashHoverIcon = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ display: "block", flexShrink: 0 }}
  >
    <path
      d="M16 6V5.2C16 4.08 16 3.52 15.782 3.092C15.59 2.715 15.285 2.41 14.908 2.218C14.48 2 13.92 2 12.8 2H11.2C10.08 2 9.52 2 9.092 2.218C8.715 2.41 8.41 2.715 8.218 3.092C8 3.52 8 4.08 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.88 19 19.72 18.673 20.362C18.385 20.927 17.927 21.385 17.362 21.673C16.72 22 15.88 22 14.2 22H9.8C8.12 22 7.28 22 6.638 21.673C6.073 21.385 5.615 20.927 5.327 20.362C5 19.72 5 18.88 5 17.2V6"
      stroke="#1A1B22"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function NewsCard({
  article,
  onSave,
  onRemove,
  isSaved = false,
  onLoginClick,
  isSavedNewsPage = false,
  showKeyword = false,
}) {
  const { isAuthenticated } = useAuth();
  const [saved, setSaved] = useState(isSaved);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showRemoveTooltip, setShowRemoveTooltip] = useState(false);
  let tooltipTimeout;

  useEffect(() => {
    return () => clearTimeout(tooltipTimeout);
  }, []);

  const handleSaveClick = (e) => {
    e.preventDefault();

    if (isSavedNewsPage) {
      onRemove?.(article);
      return;
    }

    if (!isAuthenticated) {
      onLoginClick?.();
      return;
    }
    if (saved) {
      onRemove?.(article);
      setSaved(false);
    } else {
      onSave?.(article);
      setSaved(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isSavedNewsPage) {
      setShowRemoveTooltip(true);
    } else if (!isAuthenticated) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isSavedNewsPage) {
      setShowRemoveTooltip(false);
    } else {
      setShowTooltip(false);
    }
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
    <article className="newscard">
      <div className="newscard__image-container">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="newscard__image"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.classList.add(
                "newscard__image-container--no-image"
              );
            }}
          />
        ) : (
          <div className="newscard__image-placeholder">
            <ImagePlaceholderIcon />
          </div>
        )}

        {showKeyword && article.keyword && (
          <div className="newscard__keyword-tag">{article.keyword}</div>
        )}

        <div
          className="newscard__button-wrapper"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showTooltip && !isSavedNewsPage && (
            <div className="newscard__signin-tooltip" onClick={onLoginClick}>
              <span className="newscard__signin-tooltip-text">
                Sign in to save articles
              </span>
            </div>
          )}

          {showRemoveTooltip && isSavedNewsPage && (
            <div className="newscard__remove-tooltip">
              <span className="newscard__remove-tooltip-text">
                Remove from saved
              </span>
            </div>
          )}

          <button
            className={
              isSavedNewsPage
                ? "newscard__trash-button"
                : "newscard__save-button"
            }
            onClick={handleSaveClick}
          >
            {isSavedNewsPage ? (
              isHovered ? (
                <TrashHoverIcon className="newscard__trash-icon" />
              ) : (
                <TrashIcon className="newscard__trash-icon" />
              )
            ) : saved ? (
              <BookmarkSavedIcon className="newscard__icon" />
            ) : isHovered ? (
              <BookmarkHoverIcon className="newscard__icon" />
            ) : (
              <BookmarkIcon className="newscard__icon" />
            )}
          </button>
        </div>
      </div>

      <div className="newscard__content">
        <time className="newscard__date">
          {formatDate(article.publishedAt)}
        </time>
        <h3 className="newscard__title">{article.title}</h3>
        <p className="newscard__description">{article.description}</p>
        <div className="newscard__source">{article.source?.name}</div>
      </div>
    </article>
  );
}

export default NewsCard;
