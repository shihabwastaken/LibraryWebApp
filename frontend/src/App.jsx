import React from 'react';
import Bookshelf from './BookShelf.jsx';
import books from './books.js';

function App() {

  return (
    <div className="App">
      {/* <h1>Library Bookshelf</h1> */}
      <Bookshelf books={books} />
    </div>
  );
}

export default App;
