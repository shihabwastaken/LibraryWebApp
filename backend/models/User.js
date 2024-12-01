import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  borrowedBooks: [{
    bookId: { type: Schema.Types.ObjectId, ref: 'Book' },
    dueDate: { type: Date }
  }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Book' }]
}, { timestamps: true });



const User = mongoose.model('User', userSchema);

export default User;