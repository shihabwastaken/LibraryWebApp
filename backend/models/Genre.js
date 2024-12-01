//optional//

import mongoose from 'mongoose';

// Define the Genre schema
const genreSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Genre name
  description: { type: String }, // Optional description of the genre
});

// Export the Genre model
const Genre = mongoose.model('Genre', genreSchema);
export default Genre;
