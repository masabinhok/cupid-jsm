import express from 'express';
import { getAllUsers, getUserProfile } from '../controllers/userController.js'; // Fix the import path
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.get('/profile/:id', verifyToken, getUserProfile);

export default router;