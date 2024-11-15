const BookCard = ({ index, book }) => {
    return (
      <div key={index} className="book-card" onClick={() => alert(`You clicked on ${book.title}`)}>
        <img src={book.coverImage} alt={book.title} className="book-cover" />
        <div className="book-title">{book.title}</div>
        <div className="book-author">{book.author}</div>
      </div>
    );
  };
  
  export default BookCard;
  