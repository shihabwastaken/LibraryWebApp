import mongoose from "mongoose";
const Schema = mongoose.Schema;

const borrowRequestSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  requestDate: { type: Date, default: Date.now },
  approved: { type: Boolean, default: false }, // Admin approval status
  dueDate: { type: Date }, // Due date once approved
});

const BorrowRequest = mongoose.model('BorrowRequest', borrowRequestSchema);

export default BorrowRequest;
