import React from 'react';
import { FaBook, FaSignInAlt, FaUser, FaFileAlt, FaInfoCircle, FaList } from 'react-icons/fa'; 
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Header = () => {
    return (
        <header className="header navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-xl">
                <a href="/" className="navbar-brand">🕮 LibGen</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/allbooks" className="nav-link"><FaBook /> Bookshelf</Link> {/* Use Link here */}
                        </li>
                        <li className="nav-item">
                            <Link to="/genres" className="nav-link"><FaList /> Genres</Link> {/* Use Link here */}
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link"><FaSignInAlt /> Login</Link> {/* Use Link here */}
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link"><FaUser /> User Profile</Link> {/* Use Link here */}
                        </li>
                        <li className="nav-item">
                            <Link to="/contract" className="nav-link"><FaFileAlt /> Contract</Link> {/* Use Link here */}
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link"><FaInfoCircle /> About</Link> {/* Use Link here */}
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;
