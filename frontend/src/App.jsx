import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookshelf from './components/BookShelf.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import AllBooks from "../screens/AllBooks.jsx";
// import SearchBar from './components/SearchBar.jsx';
import HomePage from "../screens/HomePage.jsx";
import PdfReader from '../screens/PdfReader.jsx';
import BookDetails from "../screens/BookDetails.jsx";
import Book from "../../backend/models/Book.js";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* <SearchBar /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<PdfReader />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/book/:id/details" element={<BookDetails />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
