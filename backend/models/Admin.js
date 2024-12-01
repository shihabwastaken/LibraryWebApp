import mongoose from 'mongoose';

// Define the Admin schema (extends User model's functionality if necessary)
const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // You can add any admin-specific fields here, like admin dashboard preferences
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Export the Admin model
const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
