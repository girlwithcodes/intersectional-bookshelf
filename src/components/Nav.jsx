import { Link, Route } from "react-router-dom";
import '../styles/Nav.css';
function Nav() {
  return (
    <header id="header-and-nav">
      <section id="nav-header-section">
      </section>
      <nav id="nav-bar">
        <ul id="nav-link-list">
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
          <li>
            <Link to="/browse">
              Search/Browse
            </Link>
          </li>
          <li>
            <Link to="/recommend/newRec">
              Make a Recommendation
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default Nav;