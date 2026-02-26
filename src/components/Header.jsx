import { Link, NavLink } from "react-router-dom";
import grumpy from "../assets/Mr-Grumpy-3A.PNG.webp";

function Header() {
  return (
    <div className="nav-offset">
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="header-and-links">
            <Link to="/" className="nc-link">
              <h1 className="nc-title">NC NEWS</h1>
            </Link>

            <div className="nav-links">
              <NavLink to="/" end className="nav-link">
                All
              </NavLink>
              <NavLink to="/topics/coding" className="nav-link">
                Coding
              </NavLink>
              <NavLink to="/topics/cooking" className="nav-link">
                Cooking
              </NavLink>
              <NavLink to="/topics/football" className="nav-link">
                Football
              </NavLink>
            </div>
          </div>

          <div className="logged-in-badge">
            <span className="logged-in-text">Logged in:</span>
            <img className="logged-in-avatar" src={grumpy} alt="grumpy19" />
            <span className="logged-in-username">grumpy19</span>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
