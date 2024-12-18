import express from 'express';
import User from '../models/User.js'; // Adjust the path to your User model

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.route('/').post(registerUser).get(getUsers); // No middleware
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(getUserProfile) // No middleware
  .put(updateUserProfile); // No middleware
router
  .route('/:id')
  .delete(deleteUser) // No middleware
  .get(getUserById) // No middleware
  .put(updateUser); // No middleware

//change user password
// import express from 'express';
// import bcrypt from 'bcryptjs';

// Change Password Endpoint
router.put('/change-password/:userId', async (req, res) => {
  const { userId } = req.params;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    // Validate input
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword; // The 'pre-save' hook will handle hashing
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




export default router;
