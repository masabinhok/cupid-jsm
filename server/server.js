import dotenv from 'dotenv';
import app from './app.js';
import { connectToDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectToDB();

// Start the Server
app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
