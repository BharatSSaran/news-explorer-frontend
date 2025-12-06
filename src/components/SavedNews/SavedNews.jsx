import "./SavedNews.css";

function SavedNews() {
  return (
    <main className="saved-news">
      <section className="saved-news__header">
        <h1 className="saved-news__title">Saved articles</h1>
        <p className="saved-news__subtitle">
          Your saved articles will appear here
        </p>
      </section>
      <section className="saved-news__results">
        <p>No saved articles yet. Start searching and saving news articles!</p>
      </section>
    </main>
  );
}

export default SavedNews;
