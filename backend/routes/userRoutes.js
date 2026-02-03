import express from 'express';
import {
  mobile_register
} from '../controllers/userController.js';

const router = express.Router();

// Protected routes (require authentication)
router.post('/register_mobile', mobile_register);

export default router;
