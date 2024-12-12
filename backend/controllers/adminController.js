import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';

// Get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, 'name email isAdmin isBanned createdAt');
  res.json(users);
});

// Delete a user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update user role
export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isAdmin = req.body.isAdmin;
    await user.save();
    res.json({ message: 'User role updated' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Ban or unban a user
export const banUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isBanned = req.body.isBanned;
    await user.save();
    res.json({ message: `User ${req.body.isBanned ? 'banned' : 'unbanned'}` });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
