import React from 'react';
import { FaBook, FaSignInAlt, FaUser, FaFileAlt, FaInfoCircle } from 'react-icons/fa'; // Importing icons from react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import '../Header.css'; // Custom CSS (optional)

const Header = () => {
    return (
        <header className="header navbar navbar-expand-lg navbar-dark bg-dark" >
            <div className="container-xl">
                <a href="/" className="navbar-brand">🕮 LibTurd</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a href="/bookshelf" className="nav-link"><FaBook /> Bookshelf</a> {/* Book icon */}
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link"><FaSignInAlt /> Login</a> {/* Login icon */}
                        </li>
                        <li className="nav-item">
                            <a href="/profile" className="nav-link"><FaUser /> User Profile</a> {/* User icon */}
                        </li>
                        <li className="nav-item">
                            <a href="/contract" className="nav-link"><FaFileAlt /> Contract</a> {/* Contract icon */}
                        </li>
                        <li className="nav-item">
                            <a href="/about" className="nav-link"><FaInfoCircle /> About</a> {/* Info icon */}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
