import Bookshelf from './components/BookShelf.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';

const App = () => {
  return (
    <div className="App">
      <Header />
      <SearchBar />
      <Bookshelf />
      <Footer />
    </div>
  );
};

export default App;
