import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Assuming you're using Axios for API calls
import {getCurrentUserId} from "../../globalUser.js";

const BookCard = ({ book }) => {
  const [finishedBooks, setFinishedBooks] = useState([]);
  const currentUserId = getCurrentUserId(); // Get current user's ID

  // Fetch user data, including finishedBooks, on mount
  useEffect(() => {
    const fetchUserFinishedBooks = async () => {
      try {
        const { data } = await axios.get(`/api/users/${currentUserId}`); // Adjust the endpoint if needed
        setFinishedBooks(data.finishedBooks);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (currentUserId) {
      fetchUserFinishedBooks();
    }
  }, [currentUserId]);

  // Check if the book is in the finishedBooks list
  const isFinished = finishedBooks.some((finishedBook) => finishedBook.bookId === book._id);

  return (
    <div className="book-card">
      <Link to={`/book/${book._id}`}>
        <img src={book.coverImageLink} alt={book.title} className="book-cover-full" />
      </Link>
      {isFinished && (
        <div className="finished-indicator">
          <span>&#10003;</span> {/* Green Tick */}
        </div>
      )}
    </div>
  );
};

export default BookCard;
