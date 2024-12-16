import { generateOTP, verifyOTP } from '../utils/otpUtils.js';
import { encrypt, decrypt } from '../utils/cryptoUtils.js';
import { transporter } from '../config/emailConfig.js';
import jwt from 'jsonwebtoken';
import User from '../models/auth.model.js';
import { logoutToken } from '../middleware/authMiddleware.js';
import logger from '../utils/logger.js'; // Add a logger utility

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email });

    const { OTP, secret } = generateOTP();
    user.secret = encrypt(secret);
    user.otpGeneratedAt = Date.now();
    await user.save();

    await transporter.sendMail({
      from: '"Cupid APP" <your-email@gmail.com>',
      to: email,
      subject: 'OTP for Authentication',
      text: `Your OTP is: ${OTP}. It will expire in 60 seconds.`,
    });
    res.status(200).json({ message: 'OTP sent to email.', isSent: true });
  } catch (error) {
    logger.error(`Error in sendOtp: ${error.message}`);
    res.status(500).json({ message: 'Failed to send OTP. Please try again later.' });
  }
};

export const verifyOtp = async (req, res) => {
  const { otp, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    if( Date.now() - user.otpGeneratedAt > 120000) {
      return res.status(400).json({ message: 'OTP expired. Resend OTP? .' }); 
    }
    const isValid = verifyOTP(otp, decrypt(user.secret));
    if (!isValid ) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.status(200).json({ message: 'OTP verified successfully!', token });
  } catch (error) {
    logger.error(`Error in verifyOtp: ${error.message}`);
    res.status(500).json({ message: 'Error verifying OTP. Please try again later.' });
  }
};

export const logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    logoutToken(token);
    res.status(200).json({ message: 'Logged out successfully.' });
  } catch (error) {
    logger.error(`Error in logout: ${error.message}`);
    res.status(500).json({ message: 'Error logging out. Please try again later.' });
  }
};


export const checkSession = async (req, res)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message: 'Unauthorized'});

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if(!user) return res.status(404).json({message: 'User not found.'});
      res.status(200).json({message: 'Session active.',  user, isAuthenticated: true});
    }
    catch(error){
      logger.error(`Error in checkSession: ${error.message}`);
      res.status(401).json({message: 'Session expired. Please login again.'});
    }
}

export const saveUserInfo = async (req, res) => {
  const { 
    firstName, 
    lastName, 
    dateOfBirth, 
    gender, 
    middleName, 
    profilePicture, 
    phone, 
    email, 
    bio, 
    interests, 
    location, 
    preferenceGender, 
    preferenceCaste, 
    preferenceDistance, 
    preferenceAgeRange, 
    preferenceInterest, 
    socialLinks 
  } = req.body;




  try {
    // Find the user by email and update their information
    const newUser = await User.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        middleName,
        gender,
        dateOfBirth,
        profilePicture,
        bio,
        interests,
        location: {
          city: location.city,
          country: location.country,
          coordinates: {
            type: 'Point',
            coordinates: location.coordinates, // Correctly extract coordinates from location
          }
        },
        preference: {
          gender: preferenceGender,
          ageRange: {
            min: preferenceAgeRange.min,
            max: preferenceAgeRange.max
          },
          maxDistance: preferenceDistance,
          caste: preferenceCaste,
          interests: preferenceInterest
        },
        socialLinks,
        phone
      },
      { new: true }
    );

    // Return success response
    res.status(200).json({ message: 'User info saved successfully.', user: newUser });
  } catch (error) {
    // Log error and return failure response
    logger.error(`Error in saveUserInfo: ${error.message}`);
    res.status(500).json({ message: 'Error saving user info. Please try again later.', error: error.message });
  }
};
