import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaBook, FaSignInAlt, FaUser, FaFileAlt, FaInfoCircle, FaList } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import Loader from './Loader';

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

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="header navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-xl">
        <Link to="/" className="navbar-brand">🕮 LibGen</Link>
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
                to="/filterBooks"
                className="nav-link"
                onClick={() => handleNavLinkClick('genres')}
              >
                <FaList /> Filter Books
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
            <li className="nav-item">
            {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id='username'>
                    <NavDropdown.Item as={Link} to='/profile'>
                    <FaUser /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                    <FaSignInAlt/> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              )}
            </li>
            <li className="nav-item">
              {/* Admin Links */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <NavDropdown.Item as={Link} to='/admin/bookList'>
                    Book List
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/borrowList'>
                    Borrows
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to='/admin/userList'>
                    User List
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
