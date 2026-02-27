import Lost from "../assets/Lost.png";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found-page">
      <img className="lost-image" src={Lost} />
      <h2>Whoops! This page doesn't exist...</h2>
      <Link to="/">
        <p className="not-found-home-link">Back to home</p>
      </Link>
    </div>
  );
}

export default NotFound;
