import express from 'express';
import { getAllUsers } from '../controllers/dashboardController.js'; // Fix the import path
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getAllUsers);

export default router;