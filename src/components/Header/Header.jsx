import { Link, useLocation } from "react-router-dom";
import React from "react";
import { useState } from "react";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ onLoginClick, onHomeClick }) {
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogoClick = () => {
    if (onHomeClick) {
      onHomeClick();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`header ${isSavedNewsPage ? "header--saved-news" : ""}`}
      >
        <div className="header__container">
          <Link to="/" className="header__logo" onClick={handleLogoClick}>
            NewsExplorer
          </Link>
          <Navigation onLoginClick={onLoginClick} onHomeClick={onHomeClick} />
          <button
            className="header__menu-button"
            onClick={toggleMobileMenu}
            aria-label="Open navigation menu"
          >
            <span className="header__menu-icon"></span>
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <Navigation
          onLoginClick={onLoginClick}
          onHomeClick={onHomeClick}
          isMobileMenu={true}
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
        />
      )}
    </>
  );
}

export default Header;
