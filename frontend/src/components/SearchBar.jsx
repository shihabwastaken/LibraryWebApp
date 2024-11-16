import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Searching for:', query);
    }
  };

  return (
    <div className="search-bar d-flex justify-content-center">
      <form className="d-flex w-75" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search for books, authors, genres..."
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn search-button">
          <FaSearch />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
