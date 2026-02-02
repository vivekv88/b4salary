import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  mobile_register
} from '../controllers/userController.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllUsers);
router.get('/:id', getUserById);

// Protected routes (require authentication)
router.post('/', verifyToken, createUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.post('/register_mobile', mobile_register);

export default router;
