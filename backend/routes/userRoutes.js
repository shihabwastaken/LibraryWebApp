import express from 'express';
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

export default router;
