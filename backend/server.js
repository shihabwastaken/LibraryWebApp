import Book from './models/Book.js';
import User from './models/User.js';
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
// import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';
// import books from './books.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Allow requests only from the frontend
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  credentials: true, // Allow sending cookies if needed
}));


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes)

app.use(cors())
dotenv.config();
const port = process.env.PORT || 5000;
// const port = 1516;
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

// app.get('/api/search', async (req, res) => {
//   try {
//     const { query } = req.query;
//     const books = await Book.find({
//       $or: [
//         { title: { $regex: query, $options: 'i' } },
//         { author: { $regex: query, $options: 'i' } }
//       ]
//     }, 'title author coverImageLink');
//     res.json(books);
//   } catch (error) {
//     console.error("Error searching books:", error);
//     res.status(500).send({ message: "Server error", error: error.message });
//   }
// });


app.get('/api/bookshelf', async (req, res) => {
  try {
    // const books = await Book.find({}, 'title coverImageLink'); // Fetch only specific fields
    const books = await Book.find();
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


// app.get('/api/userDashboard', async (req, res) => {
//   try {
//     // Get all users or just one user based on your needs
//     const users = await User.find({}, { password: 0 }); // Exclude password field

//     // Send the user details without password
//     res.json(users);
//   } catch (error) {
//     console.error('Error fetching user details:', error);
//     res.status(500).json({ message: 'Error fetching user details' });
//   }
// });


app.get('/api/books/filter', async (req, res) => {
  try {
      const { author, genre } = req.query;
      const filter = {};

      if (author) {
          filter.author = new RegExp(author, 'i'); // Case-insensitive match
      }

      if (genre) {
          filter.genre = genre;
      }

      const books = await Book.find(filter);
      res.status(200).json(books);
  } catch (error) {
      res.status(500).json({ message: 'Error filtering books', error });
  }
});


app.get('/api/books/dropdown-options', async (req, res) => {
  try {
      const authors = await Book.distinct('author'); // Get unique authors
      const genres = await Book.distinct('genre');   // Get unique genres

      res.status(200).json({ authors, genres });
  } catch (error) {
      res.status(500).json({ message: 'Error fetching dropdown options', error });
  }
});


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));
