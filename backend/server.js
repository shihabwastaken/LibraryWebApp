import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();
import books from './books.js';
// import bookRoutes from './routes/bookRoutes.js';


const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.get('/', (req, res) => {
    res.send('API is running...');
})

app.get('/api/bookshelf', (req, res)=>{
    res.json(books);
})

app.get('/api/bookshelf/:title', (req, res)=>{
    const book = books.find((b) => b.id == req.params.id);
    res.json(book);
})

// app.use(express.json()); // Middleware to parse JSON bodies
// app.use('/api', bookRoutes); // Use the book routes



app.listen(port, () => console.log(`Server running on port ${port}`));
