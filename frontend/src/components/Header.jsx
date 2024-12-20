import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaBook, FaSignInAlt, FaUser, FaFileAlt, FaInfoCircle, FaList, FaBell } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import Loader from './Loader';
import { clearCurrentUserId, getCurrentUserId } from '../../globalUser';

const Header = ({ onBookshelfClick }) => {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      clearCurrentUserId();
      setOverdueBooks([]); // Clear overdue books on logout
      navigate('/');
      console.log('User logged out.');
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch overdue books for the current user whenever userInfo changes
  useEffect(() => {
    const fetchOverdueBooks = async () => {
      if (userInfo) {
        const userId = getCurrentUserId();
        if (!userId) return;

        try {
          const response = await fetch(`/api/users/overdueBooks/${userId}`);
          const data = await response.json();
          setOverdueBooks(data.overdueBooks || []);
        } catch (error) {
          console.error('Error fetching overdue books:', error);
        }
      } else {
        setOverdueBooks([]); // Reset overdue books when no user is logged in
      }
    };

    fetchOverdueBooks();
  }, [userInfo]); // Dependency on userInfo

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);
  };

  const handleReturnBookClick = () => {
    navigate('/returnBook');
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
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">
                    <FaUser /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/history">
                     Borrow History
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/returnBook">
                  Return Book
                </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    <FaSignInAlt /> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                <FaUser /> Sign In
              </Nav.Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <NavDropdown.Item as={Link} to="/admin/bookList">
                  Book List
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/borrowRequest">
                  Borrow Request
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/borrowList">
                  Borrow List
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/approveReturn">
                  Approve Book Return
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/userList">
                  User List
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {/* Overdue Books Notification */}
            {overdueBooks.length > 0 && (
              <li className="nav-item">
                <div className="nav-link position-relative">
                  <FaBell
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={handleNotificationClick}
                  />
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {overdueBooks.length}
                  </Badge>
                  {showNotification && (
                    <div className="dropdown-menu show p-2" style={{ position: 'absolute', right: 0 }}>
                      <p>
                        You have overdue books. Please return them.
                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={handleReturnBookClick}
                        >
                          Return Books
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
