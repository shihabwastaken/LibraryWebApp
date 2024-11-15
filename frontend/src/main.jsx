import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Bookshelf.css'
import './Navbar1.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
