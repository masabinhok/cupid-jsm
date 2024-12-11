import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/corsConfig.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Cupid Backend Server');
});

// Routes
app.use('/auth', authRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
