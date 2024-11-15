// import React from 'react';
// import { Navbar, Nav, Container, NavDropdown, Button, Form, FormControl } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';

// const Header = ({ user, onLogout }) => {
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     const query = e.target.search.value;
//     navigate(`/search?query=${query}`);
//   };

//   return (
//     <header>
//       <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
//         <Container>
//           {/* Brand Logo */}
//           <Navbar.Brand as={Link} to="/">
//             Bookshelf
//           </Navbar.Brand>

//           {/* Toggle Button for Mobile View */}
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
            
//             {/* Search Form */}
//             <Form className="d-flex ms-auto" onSubmit={handleSearch}>
//               <FormControl
//                 type="search"
//                 name="search"
//                 placeholder="Search books..."
//                 className="me-2"
//                 aria-label="Search"
//               />
//               <Button variant="outline-light" type="submit">Search</Button>
//             </Form>
            
//             {/* Navigation Links */}
//             <Nav className="ms-auto">
//               <Nav.Link as={Link} to="/books">Books</Nav.Link>
//               <Nav.Link as={Link} to="/library">My Library</Nav.Link>
//               <Nav.Link as={Link} to="/wishlist">Wishlist</Nav.Link>
//               <Nav.Link as={Link} to="/borrowed">Borrowed Books</Nav.Link>

//               {/* Account Dropdown */}
//               {user ? (
//                 <NavDropdown title="Account" id="account-dropdown">
//                   <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
//                   <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
//                   <NavDropdown.Divider />
//                   <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
//                 </NavDropdown>
//               ) : (
//                 <>
//                   <Nav.Link as={Link} to="/login">Login</Nav.Link>
//                   <Nav.Link as={Link} to="/register">Sign Up</Nav.Link>
//                 </>
//               )}
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;
