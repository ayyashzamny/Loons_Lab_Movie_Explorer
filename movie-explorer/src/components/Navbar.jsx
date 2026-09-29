
import { Link } from 'react-router-dom';

import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  const {
    user,
    logout,
  } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">

      <div className="container">

        <Link
          className="navbar-brand fw-bold"
          to="/"
        >
          Movie Explorer
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >

          <ul className="navbar-nav ms-auto align-items-lg-center">

            {user && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/favorites"
                  >
                    Favorites
                  </Link>
                </li>

                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <span className="navbar-text me-3">
                    Hi, {user.username}
                  </span>
                </li>

                <li className="nav-item mt-2 mt-lg-0">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            <li className="nav-item ms-lg-3 mt-2 mt-lg-0">

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleTheme}
              >
                {theme === 'light'
                  ? 'Dark Mode'
                  : 'Light Mode'}
              </button>

            </li>

          </ul>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;

