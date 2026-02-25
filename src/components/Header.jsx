import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="nav-offset">
      <nav className="navbar">
        <Link to="/">
          <h1>NC NEWS</h1>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
