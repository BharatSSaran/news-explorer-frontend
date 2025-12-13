import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  onLoginClick,
  onSignupClick,
  isLoggedIn = false,
  user = null,
}) {
  const handleSignOut = () => {
    // TODO: Implement sign out functionality
    console.log("Sign out clicked");
  };

  return (
    <nav className="navigation">
      <NavLink to="/" className="navigation__link">
        Home
      </NavLink>

      <NavLink to="/saved-news" className="navigation__link">
        Saved articles
      </NavLink>

      {isLoggedIn ? (
        <div className="navigation__user">
          <span className="navigation__username">
            {user?.username || "Elise"}
          </span>
          <button className="navigation__signout" onClick={handleSignOut}>
            <svg className="navigation__signout-icon" viewBox="0 0 24 24">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5z" />
              <path d="M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
            </svg>
          </button>
        </div>
      ) : (
        <button className="navigation__signin" onClick={onLoginClick}>
          Sign in
        </button>
      )}
    </nav>
  );
}

export default Navigation;
