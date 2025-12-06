import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/" className="navigation__link">
        Home
      </NavLink>
      <NavLink to="/saved-news" className="navigation__link">
        Saved articles
      </NavLink>
      <button className="navigation__signin">Sign in</button>
    </nav>
  );
}

export default Navigation;
