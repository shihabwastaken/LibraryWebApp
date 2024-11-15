
const BookCard = ({ book }) => {
    const handleOpenPDF = () => {
      if (book.pdfLink) {
        window.open(book.pdfLink, "_blank"); // Opens the PDF in a new tab
      } else {
        alert("No PDF link available for this book.");
      }
    };
  
    return (
      <div className="book-card" onClick={handleOpenPDF}>
        <img src={book.coverImageLink} alt={book.title} className="book-cover-full" />
      </div>
    );
  };
  
  export default BookCard;
  


  /* AFTER ROUTING*/

  
  /*import { Link } from 'react-router-dom';

const BookCard = ({ index, book }) => {
  return (
    <div key={index} className="book-card">
      <Link to={`/reading/${book._id}`}>
        <img src={book.coverImage} alt={book.title} className="book-cover" />
      </Link>
    </div>
  );
};

export default BookCard;
  */