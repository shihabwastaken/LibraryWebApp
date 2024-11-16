import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="book-card">
      {/* Update the link to match the route in App.js */}
      <Link to={`/book/${book._id}`}>
        <img src={book.coverImageLink} alt={book.title} className="book-cover-full" />
      </Link>
    </div>
  );
};

export default BookCard;
