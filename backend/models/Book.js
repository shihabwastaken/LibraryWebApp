import mongoose from "mongoose";
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String },
    publishedYear: { type: Number },
    description: { type: String },
    availableCopies: { type: Number, required: true },
    totalCopies: { type: Number, required: true },
    categories: [{ type: String }],
    pdfLink: { type: String }, // Link to the PDF file for preview
    coverImageLink: { type: String } // Link to the cover image of the book
  }, { timestamps: true });
  
const Book = mongoose.model('Book', bookSchema);

  export default Book;
  