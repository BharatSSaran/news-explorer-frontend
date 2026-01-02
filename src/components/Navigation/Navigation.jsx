import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Navigation.css";

function Navigation({
  onLoginClick,
  onSignupClick,
  onHomeClick,
  isMobileMenu = false,
  isOpen = false,
  onClose,
}) {
  const { isAuthenticated, user, logout } = useAuth();

  const handleHomeClick = () => {
    if (onHomeClick) {
      onHomeClick();
    }
    if (isMobileMenu && onClose) {
      onClose();
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Error signing out:", error);
    }
    if (isMobileMenu && onClose) {
      onClose();
    }
  };

  const handleLinkClick = () => {
    if (isMobileMenu && onClose) {
      onClose();
    }
  };

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    }
    if (isMobileMenu && onClose) {
      onClose();
    }
  };

  // Mobile menu render
  if (isMobileMenu) {
    return (
      <nav className={`navigation--mobile ${isOpen ? "navigation--open" : ""}`}>
        <div className="navigation__header">
          <a href="/" className="navigation__logo">
            NewsExplorer
          </a>
          <button
            className="navigation__close"
            onClick={onClose}
            aria-label="Close navigation menu"
          >
            ×
          </button>
        </div>

        <div className="navigation__items">
          <NavLink
            to="/"
            className="navigation__link"
            onClick={handleHomeClick}
          >
            Home
          </NavLink>

          {isAuthenticated && (
            <NavLink
              to="/saved-news"
              className="navigation__link"
              onClick={handleLinkClick}
            >
              Saved articles
            </NavLink>
          )}
        </div>

        {isAuthenticated ? (
          <div className="navigation__user-mobile">
            <span className="navigation__username">
              {user?.username || "Elise"}
            </span>
            <button
              className="navigation__signout-mobile"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        ) : (
          <button className="navigation__signin" onClick={handleLoginClick}>
            Sign in
          </button>
        )}
      </nav>
    );
  }

  // Regular desktop navigation
  return (
    <nav className="navigation">
      <NavLink to="/" className="navigation__link" onClick={handleHomeClick}>
        Home
      </NavLink>

      {isAuthenticated && (
        <NavLink to="/saved-news" className="navigation__link">
          Saved articles
        </NavLink>
      )}

      {isAuthenticated ? (
        <div className="navigation__user fade-in">
          <span className="navigation__username smooth-transition">
            {user?.username || "Elise"}
          </span>
          <button
            className="navigation__signout smooth-transition button-hover-scale focus-ring"
            onClick={handleSignOut}
          >
            <svg
              className="navigation__signout-icon smooth-transition"
              viewBox="0 0 24 24"
            >
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5z" />
              <path d="M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
          </button>
        </div>
      ) : (
        <button
          className="navigation__signin smooth-transition button-hover-scale focus-ring scale-in"
          onClick={onLoginClick}
        >
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
