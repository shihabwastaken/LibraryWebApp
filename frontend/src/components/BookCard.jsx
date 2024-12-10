import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
const BookCard = ({ book }) => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="book-card">
      {/* Update the link to match the route in App.js */}
      {/* <Link to={`/book/${book._id}`}>
        <img src={book.coverImageLink} alt={book.title} className="book-cover-full" />
      </Link> */}
      {userInfo ? (
        <>
        {/* <img src={book.coverImageLink} alt={book.title} className="book-cover-full" /> */}
    <Link to={`/book/${book._id}`}>
      <img src={book.coverImageLink} alt={book.title} className="book-cover-full" />
    </Link>
  </>
) : (
  <Link to={'/login'}>
    <img src={book.coverImageLink} alt={book.title} className="book-cover-full" />
    </Link>
)}

    </div>
  );
};

export default BookCard;




// {userInfo ? (
//   <>
//     <Link to={`/book/${book._id}`}>
//       <img src={book.coverImageLink} alt={book.title} className="book-cover-full" />
//     </Link>
//   </>
// ) : (
//   <Link to={'/login'}>
//     </Link>
// )}
