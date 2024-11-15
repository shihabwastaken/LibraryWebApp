import Book from './models/Book.js';
import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
// import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';
// import books from './books.js';

const port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use(cors());
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



app.get('/api/bookshelf/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); // Fetch the book by ID
    res.json(book); // Send the book as a JSON response
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ message: 'Error fetching book' });
  }
  })



// app.get('/api/bookshelf/:title', (req, res)=>{
//     const book = Book.find((b) => b.id == req.params.id);
//     res.json(book);
// })

// app.use(express.json()); // Middleware to parse JSON bodies
// app.use('/api', bookRoutes); // Use the book routes



app.listen(port, () => console.log(`Server running on port ${port}`));
