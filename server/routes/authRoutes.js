import express from 'express';
import { sendOtp, verifyOtp, logout, checkSession, saveUserInfo } from '../controllers/authController.js';
import { otpRateLimiter } from '../config/rateLimiterConfig.js';

const router = express.Router();

router.post('/', otpRateLimiter, sendOtp);
router.post('/verify', verifyOtp);
router.post('/logout', logout);
router.get('/session', checkSession );
router.post('/resend-otp', otpRateLimiter, sendOtp);
router.post('/userinfo', saveUserInfo );

export default router;
