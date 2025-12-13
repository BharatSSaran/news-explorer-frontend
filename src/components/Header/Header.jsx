import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({
  onLoginClick,
  onSignupClick,
  isLoggedIn = false,
  user = null,
}) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        NewsExplorer
      </Link>
      <Navigation
        onLoginClick={onLoginClick}
        onSignupClick={onSignupClick}
        isLoggedIn={isLoggedIn}
        user={user}
      />
    </header>
  );
}

export default Header;
