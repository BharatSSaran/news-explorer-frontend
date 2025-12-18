import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import "./Header.css";

function Header({ onLoginClick, onSignupClick }) {
  return (
    <header className="header">
      <Link to="/" className="header__logo">
        NewsExplorer
      </Link>
      <Navigation onLoginClick={onLoginClick} onSignupClick={onSignupClick} />
    </header>
  );
}

export default Header;
