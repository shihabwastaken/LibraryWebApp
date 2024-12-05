import React from 'react';
import { FaBook, FaSignInAlt, FaUser, FaFileAlt, FaInfoCircle, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = ({ onBookshelfClick }) => { // Accept a callback prop for the bookshelf link
  const handleNavLinkClick = (linkName) => {
    // Collapse the navbar after clicking on a link
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
    }

    // Call the callback if the Bookshelf link is clicked
    if (linkName === 'bookshelf' && onBookshelfClick) {
      onBookshelfClick();
    }
  };

  return (
    <header className="header navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-xl">
        <a href="/" className="navbar-brand">🕮 LibGen</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/allbooks"
                className="nav-link"
                onClick={() => handleNavLinkClick('bookshelf')}
              >
                <FaBook /> Bookshelf
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/genres"
                className="nav-link"
                onClick={() => handleNavLinkClick('genres')}
              >
                <FaList /> Genres
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link"
                onClick={() => handleNavLinkClick('login')}
              >
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-link"
                onClick={() => handleNavLinkClick('profile')}
              >
                <FaUser /> User Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contract"
                className="nav-link"
                onClick={() => handleNavLinkClick('contract')}
              >
                <FaFileAlt /> Contract
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link"
                onClick={() => handleNavLinkClick('about')}
              >
                <FaInfoCircle /> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
