import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import NewsCardList from "../NewsCardList/NewsCardList";
import "./SavedNews.css";

function SavedNews() {
  const { savedArticles, user, removeArticle } = useAuth();
  const articleCount = savedArticles.length;

  // Handle removing an article
  const handleRemoveArticle = async (article) => {
    try {
      await removeArticle(article.url);
    } catch (error) {
      console.error("Error removing article:", error);
    }
  };

  const getKeywordsSummary = () => {
    if (!savedArticles || savedArticles.length === 0) {
      return "no keywords";
    }

    // Count the frequency of each keyword
    const keywordCounts = savedArticles.reduce((acc, article) => {
      if (article.keyword) {
        const keyword = article.keyword.trim();
        acc[keyword] = (acc[keyword] || 0) + 1;
      }
      return acc;
    }, {});

    // Sort keywords by frequency in descending order
    const sortedKeywords = Object.keys(keywordCounts).sort(
      (a, b) => keywordCounts[b] - keywordCounts[a]
    );

    const numKeywords = sortedKeywords.length;

    if (numKeywords === 0) return "no keywords";
    if (numKeywords <= 2) return sortedKeywords.join(", ");

    const topTwo = sortedKeywords.slice(0, 2).join(", ");
    const remaining = numKeywords - 2;

    if (numKeywords === 3) {
      return `${topTwo}, and ${sortedKeywords[2]}`;
    }

    return `${topTwo}, and ${remaining} others`;
  };

  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <div className="saved-news__header-content">
          <p className="saved-news__label">Saved articles</p>
          <h1 className="saved-news__title">
            {user?.username || user?.name || "User"}, you have {articleCount}{" "}
            saved articles
          </h1>
          <p className="saved-news__keywords">
            By keywords:{" "}
            <span className="saved-news__keywords-list">
              {getKeywordsSummary()}
            </span>
          </p>
        </div>
      </section>
      <section className="saved-news__results">
        {articleCount > 0 ? (
          <NewsCardList
            articles={savedArticles}
            onRemoveArticle={handleRemoveArticle}
            savedArticles={savedArticles}
            title=""
            isSavedNewsPage={true}
            showTitle={false}
            showMore={false}
            showKeyword={true}
          />
        ) : (
          <div className="saved-news__empty">
            <p>
              No saved articles yet. Start searching and saving news articles!
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default SavedNews;
