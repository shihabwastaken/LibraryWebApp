import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const BookDetails = () => {
  const { id } = useParams(); // Retrieve the book id from the URL params
  const [book, setBook] = useState(null);

  // Fetch book details from backend
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bookshelf/${id}/details`);
        setBook(response.data); // Set book details to the state
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!book) {
    return <div className="loading">Loading...</div>; // Display a loading state while the book data is being fetched
  }

  return (
    <div className="book-details-container">
      <div className="book-info-details">
        <div className="book-cover-container">
          {/* Book Cover Image */}
          <img src={book.coverImageLink} alt={book.title} className="book-cover" />
        </div>

        {/* Book Details Section */}
        <div className="book-details-content">
          <div class="title-author-combo">
            
          <h1 className="book-title-details">{book.title}</h1>
          <h3 className="book-author-details">{book.author}</h3>
          </div>
          <div className="book-meta">
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Published on:</strong> {book.publishedYear || 'N/A'}</p> {/* Handle case when the published date is missing */}
          </div>

          <div className="book-description">
            <h4>Description:</h4>
            <p>{book.description}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="button">Borrow this book</button>
        <button className="button">Add to Wishlist</button>
      </div>
    </div>
  );
};

export default BookDetails;
