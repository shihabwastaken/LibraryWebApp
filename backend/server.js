import Book from './models/Book.js';
import BorrowRequest from './models/BorrowRequest.js';
import ReturnRequest from './models/ReturnRequest.js';
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
import borrowRequestRoutes from "./routes/borrowRequestRoutes.js";
import borrowRoutes from "./routes/borrowRoutes.js";
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
app.use('/api/admin', adminRoutes);

app.use("/api/borrowRequests", borrowRequestRoutes);


// app.use(cors());
dotenv.config();
const port = process.env.PORT || 5000;
// const port = 1516;
connectDB();



app.get('/api', async (req, res) => {
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

// app.delete('/users/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const user = await User.findByIdAndDelete(userId); // Ensure you're using the correct database query

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' }); // Handle case where user doesn't exist
//     }

//     res.status(200).json({ message: 'User deleted successfully' }); // Respond with success message
//   } catch (err) {
//     console.error('Error deleting user:', err); // Log error for debugging
//     res.status(500).json({ message: 'Failed to delete user', error: err.message }); // Return a detailed error message
//   }
// });

app.post("/api/borrow", async (req, res) => {
  const { bookId, userId } = req.body;

  try {
    if (!bookId || !userId) {
      return res.status(400).json({ message: "Missing bookId or userId" });
    }
    const borrowRecord = await BorrowRequest.findOne({ bookId, userId });
    if (borrowRecord){
      return res.status(403).json({ message: "User is banned and cannot borrow books." });
    }
    const user = await User.findById(userId);

    // Check if the user exists
    // if (!user) {
    //   return res.status(404).json({ message: "User not found." });
    // }

    // Check if the user is banned
    if (user.isBanned) {
      return res.status(403).json({ message: "User is banned and cannot borrow books." });
    }

    // Create a new borrow request
    const borrowRequest = new BorrowRequest({
      bookId,
      userId,
      approved: false,
      rejected: false,
      requestDate: new Date(),
    });

    await borrowRequest.save(); // Save the request to the database

    res.status(201).json({ message: "Borrow request created successfully", borrowRequest });
  } catch (error) {
    console.error("Error creating borrow request:", error);
    res.status(500).json({ message: "Failed to create borrow request." });
  }
});


app.get('/api/borrow/:bookId/status', async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.query;

  const borrowRecord = await Borrow.findOne({ bookId, userId });
  if (borrowRecord) {
    res.json({ isBorrowed: true });
  } else {
    res.json({ isBorrowed: false });
  }
});

app.delete('/api/borrow/:bookId', async (req, res) => {
  const { bookId } = req.params;
  const { userId } = req.body;

  try {
    await Borrow.deleteOne({ bookId, userId });
    res.json({ message: "Borrow request canceled successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel borrow request." });
  }
});

//Dashboard routes
// Get user profile by ID
app.get('/api/users/profile/:id', async (req, res) => {
  const { id } = req.params; // Extract ID from route parameters
  try {
    const user = await User.findById(id); // Fetch user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return relevant user information
    res.json({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBanned: user.isBanned,
      borrowedBooks: user.borrowedBooks,
      wishlist: user.wishlist,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Update user profile
// Update user profile by ID
app.put('/api/users/profile/:id', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;

    // Hash password if it's being updated
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isGodAdmin: updatedUser.isGodAdmin,
      isBanned: updatedUser.isBanned,
      createdAt: updatedUser.createdAt,
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});


//Dashboard routes end



app.use("/api/borrow", borrowRoutes);

// app.get('/api/borrowedBooks/overdue/:userId', async (req, res) => {
//   const { userId } = req.params;
  
//   // Example logic to fetch overdue books
//   const overdueBooks = await BorrowedBook.find({ userId, returnDate: { $lt: new Date() }, returned: false });
  
//   res.json(overdueBooks);
// });


//overdue book notification
app.get('/api/users/overdueBooks/:id', async (req, res) => {
  const userId = req.params.id; // Fetch the user ID from the route parameter
  // console.log('User ID from params:', userId);

  try {
    // Find the user by ID and populate borrowed books
    const user = await User.findById(userId).populate('borrowedBooks.bookId');
    // console.log('Fetched User:', user); // Debugging log for fetched user

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Filter for overdue books
    const currentDate = new Date();
    const overdueBooks = user.borrowedBooks.filter((borrowedBook) => {
      // console.log('Borrowed Book:', borrowedBook); // Log each borrowed book
      if (!borrowedBook.dueDate) {
        console.log('No due date for this book, skipping...');
        return false; // Skip if dueDate is not set
      }

      const dueDate = new Date(borrowedBook.dueDate);
      const isOverdue = dueDate < currentDate && !borrowedBook.isReturned;
      // console.log(`Book ${borrowedBook.bookId}: Due Date: ${dueDate}, Is Overdue: ${isOverdue}`);
      return isOverdue;
    });

    // console.log('Overdue Books:', overdueBooks); // Debugging log for overdue books
    res.json({ overdueBooks });
  } catch (error) {
    console.error('Error in /api/users/overdueBooks/:id:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Return book apis
//get user borrowed books
app.get('/api/borrowed-books/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('borrowedBooks.bookId', 'title author coverImageLink');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user.borrowedBooks);
  } catch (err) {
    res.status(500).send('Failed to fetch borrowed books');
  }
});

// Submit return request
app.post("/api/return-request", async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    
    if (!userId || !bookId) {
      return res.status(400).json({ message: "User ID and Book ID are required." });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if the book is already in borrowedBooks for the user
    const borrowedBook = user.borrowedBooks.find((book) => book.bookId.toString() === bookId.toString());
    if (!borrowedBook) {
      return res.status(404).json({ message: "This book is not borrowed by the user." });
    }

    // Create a new return request
    const returnRequest = new ReturnRequest({
      userId,
      bookId,
    });
    await returnRequest.save();

    res.status(200).json({ message: "Return request submitted successfully!" });
  } catch (error) {
    console.error("Error in return-request endpoint:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});




//get all return request
// Get all return requests
app.get('/api/return-requests', async (req, res) => {
  try {
    const requests = await ReturnRequest.find()
      .populate('userId', 'name')
      .populate('bookId', 'title author coverImageLink');

    res.status(200).json(requests);
  } catch (error) {
    console.error('Error fetching return requests:', error);
    res.status(500).json({ message: "Failed to fetch return requests." });
  }
});



// Approve return request
app.put('/api/return-requests/:id/approve', async (req, res) => {
  const { id } = req.params;

  try {
    // Step 1: Find the return request
    const returnRequest = await ReturnRequest.findById(id);
    if (!returnRequest) {
      return res.status(404).json({ message: 'Return request not found' });
    }

    // Step 2: Find the user who made the request
    const user = await User.findById(returnRequest.userId).populate('borrowedBooks.bookId');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 3: Find the specific borrowed book in the user's borrowedBooks array
    const borrowedBookIndex = user.borrowedBooks.findIndex(
      (book) => book.bookId._id.toString() === returnRequest.bookId.toString()
    );

    if (borrowedBookIndex === -1) {
      return res.status(404).json({ message: 'Book not found in user\'s borrowed books' });
    }

    // Step 4: Remove the book from the user's borrowedBooks
    user.borrowedBooks.splice(borrowedBookIndex, 1);
    await user.save();

    // Step 5: Remove the return request from the ReturnRequest collection
    await ReturnRequest.findByIdAndDelete(id);

    // Step 6: Optional: Update the book's available copies count if you have this field
    const book = await Book.findById(returnRequest.bookId);
    if (book) {
      book.availableCopies += 1; // Assuming a field 'availableCopies' exists in the Book model
      await book.save();
    }

    res.status(200).json({ message: 'Return request approved and book removed from borrowed list' });
  } catch (error) {
    console.error('Error handling return approval:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});






// Reject return request
app.delete('/api/return-requests/:id/reject', async (req, res) => {
  const { id } = req.params;

  try {
    const request = await ReturnRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Return request not found." });
    }

    // Use deleteOne() instead of remove()
    await request.deleteOne();
    res.status(200).json({ message: "Return request rejected." });
  } catch (error) {
    console.error('Error rejecting return request:', error);
    res.status(500).json({ message: "Failed to reject return request." });
  }
});






app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server running on port ${port}`));
