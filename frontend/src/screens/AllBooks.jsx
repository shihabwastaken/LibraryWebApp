import React, { useState, useEffect } from 'react';
import BookDisplay from '../components/BookDisplay.jsx';

const AllBooks = () => {
    const [books, setBooks] = useState([]); // State to hold books from the backend
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch books from the backend
        const fetchBooks = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/bookshelf'); // Replace with your API endpoint
                if (!res.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await res.json();
                setBooks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading books...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="bookshelf">
            <h1 className="bookshelf-title">All Books</h1>
            <BookDisplay books={books} />
        </div>
    );
};

export default AllBooks;
