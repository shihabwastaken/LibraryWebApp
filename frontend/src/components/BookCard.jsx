// // frontend/components/BookCard.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BookCard = () => {
//   const [books, setBooks] = useState([]);

//   // Fetch books from backend
//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/books') // Update the URL with your backend endpoint
//       .then((response) => {
//         console.log(response.data)
//         setBooks(response.data); // Set the fetched books data
//       })
//       .catch((error) => {
//         console.error('Error fetching books:', error);
//       });
//   }, []);

//   return (
//     <div className="book-list">
//       {books.map((book) => (
//         <div className="book-card" key={book._id}>
//           <img src={book.cover} alt={book.title} className="book-cover" />
//           <h3>{book.title}</h3>
//           <p>{book.author}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookCard;
