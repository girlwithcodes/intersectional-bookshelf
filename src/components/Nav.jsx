import { Link, Route } from "react-router-dom";
import '../styles/Nav.css';
function Nav() {
  return (
    <nav id="nav-bar">
      <ul id="nav-link-list">
        <li>
          <Link to="/">
            Home
          </Link>
        </li>
        <li>
          <Link to="/browse">
            Browse
          </Link>
        </li>
        <li>
          <Link to="/recommend">
            Make a Recommendation
          </Link>
        </li>
      </ul>
    </nav>
  )
}
export default Nav;