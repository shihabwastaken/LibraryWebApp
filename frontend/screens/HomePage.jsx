import React, { useState, useEffect } from 'react';
import BookDisplay from '../src/components/BookDisplay.jsx';
import SearchBar from '../src/components/SearchBar.jsx';

const HomePage = () => {
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

    return (
        <>
        <h1 class="home-welcome">Welcome to our Library</h1>
        <SearchBar />
        <div className="bookshelf">
        <h1 className="bookshelf-title">Our Newest Arrivals!</h1>
            <BookDisplay books={books.slice(0,5)} />
        </div>
        </>
    );
};

export default HomePage;
