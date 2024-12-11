import dotenv from 'dotenv';

dotenv.config();

export const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    
    // Allow requests with no origin (e.g., Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: process.env.ALLOWED_METHODS || 'GET,POST,PUT',
  allowedHeaders: process.env.ALLOWED_HEADERS || 'Content-Type,Authorization',
  credentials: process.env.CREDENTIALS === 'true',
};
