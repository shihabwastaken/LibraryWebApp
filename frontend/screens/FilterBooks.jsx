import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookDisplay from '../src/components/BookDisplay';
import '../src/styles/FilterBooks.css';
// Filter books. front: screen/FilterBooks back: server.js

const FilterBooks = () => {
    const [authors, setAuthors] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [filteredBooks, setFilteredBooks] = useState([]);  // This will store filtered books
    const [allBooks, setAllBooks] = useState([]); // Store all books here

    // Fetch all books on component mount
    useEffect(() => {
        const fetchAllBooks = async () => {
            try {
                const response = await axios.get('/api/books');
                setAllBooks(response.data);
                setFilteredBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchAllBooks();
    }, []);

    // Fetch dropdown options for authors and genres
    useEffect(() => {
        const fetchDropdownOptions = async () => {
            try {
                const response = await axios.get('/api/books/dropdown-options');
                setAuthors(response.data.authors);
                setGenres(response.data.genres);
            } catch (error) {
                console.error('Error fetching dropdown options:', error);
            }
        };

        fetchDropdownOptions();
    }, []);

    // Apply the filter based on selected author and genre
    const handleFilter = async () => {
        try {
            const response = await axios.get('/api/books/filter', {
                params: {
                    author: selectedAuthor,
                    genre: selectedGenre,
                },
            });

            setFilteredBooks(response.data); // Update the filteredBooks state with filtered data
        } catch (error) {
            console.error('Error fetching filtered books:', error);
        }
    };

    return (
        <div>
            <div className="filter-container">
                <h2>Filter Books by Genre or Author</h2>
                <div className="filter-form">
                    <div className="filter-inputs">
                        <label>Genre:</label>
                        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                            <option value="">Select Genre</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>
                                    {genre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="filter-inputs">
                        <label>Author:</label>
                        <select value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
                            <option value="">Select Author</option>
                            {authors.map((author, index) => (
                                <option key={index} value={author}>
                                    {author}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className="apply-filter-btn" onClick={handleFilter}>Apply Filter</button>
            </div>

            <div className="bookshelf">
                <h1 className="bookshelf-title">{filteredBooks.length > 0 ? "Filter result.." : "Nothing was found.."}</h1>
                <BookDisplay books={filteredBooks.length > 0 ? filteredBooks : allBooks} />
            </div>
        </div>
    );
};

export default FilterBooks;