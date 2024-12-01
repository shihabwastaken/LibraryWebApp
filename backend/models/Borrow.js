import mongoose from "mongoose";
const Schema = mongoose.Schema;


const borrowSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    borrowDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date }
  }, { timestamps: true });
  
  export default mongoose.model('Borrow', borrowSchema);
  