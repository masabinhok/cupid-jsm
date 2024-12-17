import express from 'express';
import { getAllUsers, getUserProfile, toggleLike, updateUserProfile } from '../controllers/userController.js'; // Fix the import path
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllUsers);
router.get('/profile/:id', verifyToken, getUserProfile);
router.post('/like/:id', verifyToken, toggleLike);
router.put('/profile', verifyToken, updateUserProfile);

export default router;