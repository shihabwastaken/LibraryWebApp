import React, { useState, useEffect } from 'react';
// import BookCard from './BookCard.jsx';



const Bookshelf = ({ books }) => {
    const calculateBooksPerRow = () => Math.max(1, Math.floor(window.innerWidth / 150)); // Minimum of 1 book per row

    const [booksPerRow, setBooksPerRow] = useState(calculateBooksPerRow());



    
    useEffect(() => {
        const handleResize = () => {
            setBooksPerRow(calculateBooksPerRow());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const rows = [];
    for (let i = 0; i < books.length; i += booksPerRow) {
        rows.push(books.slice(i, i + booksPerRow));
    }

    return (
        <div className="bookshelf">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="book-row">
                    {row.map((book, index) => (
                        <div key={index} className="book-card" onClick={() => alert(`You clicked on ${book.title}`)}>
                            <img src={book.coverImage} alt={book.title} className="book-cover" />
                            <div className="book-title">{book.title}</div>
                            <div className="book-author">{book.author}</div>
                           
                        </div>
                    ))}
                    <div className="shelf-line"></div>
                </div>
            ))}
        </div>
    );
};

export default Bookshelf;
