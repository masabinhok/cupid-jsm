import express from 'express';
import { getAllUsers, getUserProfile, toggleLike } from '../controllers/userController.js'; // Fix the import path
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.get('/profile/:id', verifyToken, getUserProfile);
router.post('/like/:id', verifyToken, toggleLike);

export default router;