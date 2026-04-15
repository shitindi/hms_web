import { Link } from "react-router-dom";
import "../css/NoMatch.css"; // we’ll add styles below

export default function NotFoundPage() {
  return (
    <div className="notfound-wrapper">
      <div className="notfound-content">
        <h1>404</h1>
        <p className="title">Page Not Found</p>
        <p className="desc">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>
        <Link to="/" className="home-btn">
          Go Home
        </Link>
      </div>
    </div>
  );
}
