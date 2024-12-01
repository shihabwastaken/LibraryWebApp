import React from 'react';
import { FaBook, FaSignInAlt, FaUser, FaFileAlt, FaInfoCircle, FaList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  const handleNavLinkClick = () => {
    // Collapse the navbar after clicking on a link
    const navbarCollapse = document.getElementById('navbarNav');
    if (navbarCollapse.classList.contains('show')) {
      navbarCollapse.classList.remove('show');
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
              <Link to="/allbooks" className="nav-link" onClick={handleNavLinkClick}>
                <FaBook /> Bookshelf
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/genres" className="nav-link" onClick={handleNavLinkClick}>
                <FaList /> Genres
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link" onClick={handleNavLinkClick}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link" onClick={handleNavLinkClick}>
                <FaUser /> User Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contract" className="nav-link" onClick={handleNavLinkClick}>
                <FaFileAlt /> Contract
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link" onClick={handleNavLinkClick}>
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
