import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthContext";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import InfoModal from "../InfoModal/InfoModal";
import "./App.css";

function App() {
  // Modal state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info",
  });

  // Modal handlers
  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleSignupClick = () => {
    setIsSignupModalOpen(true);
  };

  const handleLoginModalClose = () => {
    setIsLoginModalOpen(false);
  };

  const handleSignupModalClose = () => {
    setIsSignupModalOpen(false);
  };

  const handleSwitchToSignup = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const showInfoModal = (title, message, type = "info") => {
    setInfoModal({
      isOpen: true,
      title,
      message,
      type,
    });
  };

  const closeInfoModal = () => {
    setInfoModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router basename="/news-explorer-frontend">
          <div className="app respect-motion">
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <Header
              onLoginClick={handleLoginClick}
              onSignupClick={handleSignupClick}
            />

            <ErrorBoundary>
              <div id="main-content">
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/saved-news" element={<SavedNews />} />
                </Routes>
              </div>
            </ErrorBoundary>

            <Footer />

            {/* Modals */}
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={handleLoginModalClose}
              onSwitchToSignup={handleSwitchToSignup}
              showInfoModal={showInfoModal}
            />

            <SignupModal
              isOpen={isSignupModalOpen}
              onClose={handleSignupModalClose}
              onSwitchToLogin={handleSwitchToLogin}
              showInfoModal={showInfoModal}
            />

            <InfoModal
              isOpen={infoModal.isOpen}
              onClose={closeInfoModal}
              title={infoModal.title}
              message={infoModal.message}
              type={infoModal.type}
            />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
