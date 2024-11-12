// BookCard.jsx
import React from 'react';

function BookCard({ title, coverImage, author }) {
    return (
        <div className="book-card">
            <img src={coverImage} alt={title} className="book-cover" />
            <p className="book-title">{title}</p>
            <p className="book-author">{author}</p>
        </div>
    );
}

export default BookCard;
