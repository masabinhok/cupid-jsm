import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
const allowedMethods = process.env.ALLOWED_METHODS || 'GET,POST,PUT';
const allowedHeaders = process.env.ALLOWED_HEADERS || 'Content-Type,Authorization';
const allowCredentials = process.env.CREDENTIALS === 'true';

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like Postman or server-to-server communication)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`CORS Error: Origin ${origin} not allowed`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: allowedMethods,
  allowedHeaders: allowedHeaders,
  credentials: allowCredentials,
};
