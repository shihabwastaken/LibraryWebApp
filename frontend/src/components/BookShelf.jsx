import React, { useState, useEffect } from 'react';
import BookCard from './BookCard.jsx';

const Bookshelf = () => {
    const [books, setBooks] = useState([]); // State to hold books from backend

    useEffect(() => {
    // Fetch books from backend when the component mounts
        const fetchBooks = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/bookshelf');
            const data = await res.json();
            setBooks(data); // Set books to the state
        } catch (error) {
            console.error('Error fetching books:', error);
        }
        };

        fetchBooks(); // Call the function to fetch books
    }, []);





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
                        <BookCard index={index} book={book} />
                    ))}
                    <div className="shelf-line"></div>
                </div>
            ))}
        </div>
    );
};

export default Bookshelf;
