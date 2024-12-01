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


app.get('/', (req, res) => {
    res.send('API is running...');
})

// app.get('/api/bookshelf', (req, res)=>{
//     res.json(books);
// })


app.get('/api/bookshelf', async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the collection
    res.json(books); // Send the books as a JSON response
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
});



// app.get('/api/bookshelf/:id', async (req, res) => {
//   try {
//     const book = await Book.findById(req.params.id); // Fetch the book by ID
//     res.json(book); // Send the book as a JSON response
//   } catch (error) {
//     console.error('Error fetching book:', error);
//     res.status(500).json({ message: 'Error fetching book' });
//   }
//   })



app.get('/api/bookshelf/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

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
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }
    
    res.json(book); // Send the book data as a response
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).send({ message: "Server error", error: error.message });
  }
});



// In your Express route handler
// app.get('/api/books/:id', (req, res) => {
//   const bookId = req.params.id;
//   // Fetch the book by ID from the database
//   Book.findById(bookId)
//     .then(book => {
//       if (!book) {
//         return res.status(404).send({ message: "Book not found" });
//       }
//       res.json(book); // Send the book data as response
//     })
//     .catch(err => res.status(500).send({ message: "Server error", error: err }));
// });



// app.use(express.json()); // Middleware to parse JSON bodies
// app.use('/api', bookRoutes); // Use the book routes



app.listen(port, () => console.log(`Server running on port ${port}`));
