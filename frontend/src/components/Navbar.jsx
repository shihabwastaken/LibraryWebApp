import React from "react";
// import "./Navbar.css"; // Optional: For external styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Library App</div>
      <div className="links">
        <a href="#home">Home</a>
        <a href="#books">Books</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
