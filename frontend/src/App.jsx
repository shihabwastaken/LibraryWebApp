// frontend/App.js
import React, { useState, useEffect } from 'react';
import Bookshelf from './components/BookShelf.jsx';
import Navbar from './components/Navbar.jsx';

const App = () => {
  const [books, setBooks] = useState([]); // State to hold books from backend

  useEffect(() => {
    // Fetch books from backend when the component mounts
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/bookshelf');
        const data = await res.json();
        setBooks(data); // Set books to the state
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks(); // Call the function to fetch books
  }, []); // Empty dependency array to run once when the component mounts

  return (
    <div className="App">
      <Navbar />
      <Bookshelf books={books} />
    </div>
  );
};

export default App;
