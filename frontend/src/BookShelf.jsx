import React, { useState, useEffect } from 'react';
import './Bookshelf.css';

const Bookshelf = ({ books }) => {
    const [booksPerRow, setBooksPerRow] = useState(Math.floor(window.innerWidth / 120));

    useEffect(() => {
        // Update books per row on window resize
        const handleResize = () => {
            setBooksPerRow(Math.floor(window.innerWidth / 120));
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Split books into rows
    const rows = [];
    for (let i = 0; i < books.length; i += booksPerRow) {
        rows.push(books.slice(i, i + booksPerRow));
    }

    return (
        <div className="bookshelf">
            {/* Loop through each row */}
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="book-row">
                    {/* Loop through each book in the row */}
                    {row.map((book, index) => (
                        <div key={index} className="book-card" onClick={() => alert(`You clicked on ${book.title}`)}>
                            <img src={book.coverImage} alt={book.title} className="book-cover" />
                            <div className="book-title">{book.title}</div>
                            <div className="book-author">{book.author}</div>
                        </div>
                    ))}
                    {/* Horizontal line after each row */}
                    <div className="shelf-line"></div>
                </div>
            ))}
        </div>
    );
};

export default Bookshelf;
