import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HomePage from "../HomePage/HomePage";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import InfoModal from "../InfoModal/InfoModal";
import { fetchNewsArticles } from "../../utils/newsApi";
import "./App.css";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
    buttonText: "OK",
  });

  // SHARED SEARCH STATE
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  // NEW: Shared display count state
  const [displayedCount, setDisplayedCount] = useState(3);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setHasSearched(true);
    setSearchQuery(query);
    setError("");

    // CRITICAL: Reset the count to 3 whenever a new search starts
    setDisplayedCount(3);

    try {
      const data = await fetchNewsArticles(query, {
        pageSize: 100,
        sortBy: "publishedAt",
      });
      setArticles(data.articles);
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetSearch = () => {
    setArticles([]);
    setIsLoading(false);
    setHasSearched(false);
    setSearchQuery("");
    setDisplayedCount(3); // Reset count here as well
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router basename="/news-explorer-frontend">
          <AppContent
            handleSearch={handleSearch}
            articles={articles}
            isLoading={isLoading}
            hasSearched={hasSearched}
            searchQuery={searchQuery}
            error={error}
            resetSearch={resetSearch}
            displayedCount={displayedCount}
            setDisplayedCount={setDisplayedCount}
            modalStates={{
              isLoginModalOpen,
              isSignupModalOpen,
              infoModal,
              setIsLoginModalOpen,
              setIsSignupModalOpen,
              setInfoModal,
            }}
          />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

function AppContent({
  handleSearch,
  articles,
  isLoading,
  hasSearched,
  searchQuery,
  error,
  resetSearch,
  displayedCount,
  setDisplayedCount,
  modalStates,
}) {
  const {
    isLoginModalOpen,
    isSignupModalOpen,
    infoModal,
    setIsLoginModalOpen,
    setIsSignupModalOpen,
    setInfoModal,
  } = modalStates;

  const showInfoModal = (title, message, type = "info", buttonText = "OK") => {
    setInfoModal({
      isOpen: true,
      title,
      message,
      type,
      buttonText,
    });
  };

  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <div className="app">
      <Header
        onLoginClick={() => setIsLoginModalOpen(true)}
        onHomeClick={resetSearch}
      />
      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSearch={handleSearch}
                articles={articles}
                isLoading={isLoading}
                hasSearched={hasSearched}
                searchQuery={searchQuery}
                error={error}
                onLoginClick={() => setIsLoginModalOpen(true)}
                displayedCount={displayedCount}
                setDisplayedCount={setDisplayedCount}
              />
            }
          />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>
      </main>
      <Footer onHomeClick={resetSearch} />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToSignup={handleSwitchToSignup}
        showInfoModal={showInfoModal}
      />
      <SignupModal
        isOpen={isSignupModalOpen}
        onClose={() => setIsSignupModalOpen(false)}
        onSwitchToLogin={handleSwitchToLogin}
        showInfoModal={showInfoModal}
      />

      <InfoModal
        isOpen={infoModal.isOpen}
        onClose={() => setInfoModal({ ...infoModal, isOpen: false })}
        title={infoModal.title}
        message={infoModal.message}
        type={infoModal.type}
        buttonText={infoModal.buttonText}
      />
    </div>
  );
}

export default App;
