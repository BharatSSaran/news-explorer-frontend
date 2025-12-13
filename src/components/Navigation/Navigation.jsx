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

      {isLoggedIn && (
        <NavLink to="/saved-news" className="navigation__link">
          Saved articles
        </NavLink>
      )}

      {isLoggedIn ? (
        <div className="navigation__user">
          <span className="navigation__username">
            {user?.username || user?.email || "User"}
          </span>
          <button className="navigation__signout" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      ) : (
        <div className="navigation__auth">
          <button className="navigation__signup" onClick={onSignupClick}>
            Sign up
          </button>
          <button className="navigation__signin" onClick={onLoginClick}>
            Sign in
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navigation;
