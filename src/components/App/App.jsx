import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import SavedNews from "../SavedNews/SavedNews";
import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";
import InfoModal from "../InfoModal/InfoModal";
import "./App.css";

function App() {
  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

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
    <Router>
      <div className="app">
        <Header
          onLoginClick={handleLoginClick}
          onSignupClick={handleSignupClick}
          isLoggedIn={isLoggedIn}
          user={user}
        />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/saved-news" element={<SavedNews />} />
        </Routes>

        <Footer />

        {/* Modals */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={handleLoginModalClose}
          onSwitchToSignup={handleSwitchToSignup}
        />

        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={handleSignupModalClose}
          onSwitchToLogin={handleSwitchToLogin}
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
  );
}

export default App;
