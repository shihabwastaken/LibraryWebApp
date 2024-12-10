import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import AllBooks from "../screens/AllBooks.jsx";
import HomePage from "../screens/HomePage.jsx";
import PdfReader from '../screens/PdfReader.jsx';
import BookDetails from "../screens/BookDetails.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";
import LoginScreen from "../screens/LoginScreen.jsx";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./slices/authSlice.js";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);


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
          <Route path="/login" element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/forgot-password' element={<ForgotPasswordScreen />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
