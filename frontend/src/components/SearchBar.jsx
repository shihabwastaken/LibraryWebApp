import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing a search icon from react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SearchBar = () => {
  const [query, setQuery] = useState(''); // State to hold the input value

  // Handle input changes
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle form submission (could be an API call or search logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Searching for:', query); // You can replace this with a real search function
    }
  };

  return (
    <div className="search-bar d-flex justify-content-center align-items-center my-5">
      <form className="d-flex w-75" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search for books, authors, genres..."
          value={query}
          onChange={handleInputChange}
          aria-label="Search"
        />
        <button type="submit" className="btn search-button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
