import Book from './models/Book.js';
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
// import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';
// import books from './books.js';
const app = express();
// app.use(cors());
app.use(cors())
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();



app.get('/', async (req, res) => {
  try {
    const HomePageBooks = await Book.aggregate([
      { $sample: { size: 6 } }, // Select 6 random books
      { $project: { title: 1, coverImageLink: 1, _id: 1 } } // Include only title, coverImageLink, and _id
    ]);

    res.json(HomePageBooks); // Send the filtered books as a JSON response
  } catch (error) {
    console.error('Error fetching homepage books:', error);
    res.status(500).json({ message: 'Error fetching homepage books' });
  }
});


app.get('/api/bookshelf', async (req, res) => {
  try {
    const books = await Book.find({}, 'title coverImageLink'); // Fetch only specific fields
    res.json(books); // Send the selected fields as the response
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});


app.get('/api/bookshelf/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId, 'title author pdfLink'); // Select specific fields

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    
    res.json(book); // Send the book data as a response
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
});



app.get('/api/bookshelf/:id/details', async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId, 'title author genre publishedYear description pdfLink coverImageLink'); // Select specific fields

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    
    res.json(book); // Send the book data as a response
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
});


app.listen(port, () => console.log(`Server running on port ${port}`));
