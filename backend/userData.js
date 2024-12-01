import mongoose from "mongoose";
import User from "./models/User.js";  // Import the User model

// Example users array (same as provided)
const users = [
  {
    name: 'Araf Ahmed',
    email: 'araf@gmail.com',
    password: 'Araf123',  // Make sure this is hashed
    role: 'user',
    borrowedBooks: [],
    wishlist: [],
  },
  {
    name: 'Fahim Foysal',
    email: 'fahim@gmail.com',
    password: 'Fahim123',
    role: 'user',
    borrowedBooks: [],
    wishlist: [],
  },
  {
    name: 'Shihab Sarker',
    email: 'shihab@gmail.com',
    password: 'Shihab123',
    role: 'user',
    borrowedBooks: [],
    wishlist: [],
  }
];

const uri = 'mongodb+srv://araf123:araf123@cluster0.chohd.mongodb.net/libraryDB?retryWrites=true&w=majority&appName=Cluster0'

// Function to insert users
async function insertUsers() {
  try {
    // Connect to your MongoDB database
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Insert the users into the database
    await User.create(users);

    console.log("Users inserted successfully!");

    // Close the connection after inserting
    mongoose.connection.close();
  } catch (error) {
    console.error("Error inserting users:", error);
  }
}

// Run the insertUsers function
insertUsers();
