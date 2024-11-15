import React from 'react';
import Bookshelf from './components/BookShelf.jsx';
import books from './books.js';
// import BookCard from './components/BookCard.jsx';
import Navbar from './components/Navbar.jsx';
// import Header from './components/Header.jsx';

const test = 100;

function App() {

  return (
    <div className="App">
      {/* <Header className="App-header"/> */}
      {/* <h1>Library Bookshelf</h1> */}
      <Navbar />
      <Bookshelf books={books.slice(0, test)} />
    </div>
  );
}

export default App;