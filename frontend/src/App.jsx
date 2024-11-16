import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bookshelf from './components/BookShelf.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import PdfReader from './components/PdfReader.jsx';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        {/* <SearchBar /> */}

        <Routes>
          <Route path="/" element={<Bookshelf />} />
          <Route path="/book/:id" element={<PdfReader />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
