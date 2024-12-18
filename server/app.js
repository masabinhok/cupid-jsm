import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/corsConfig.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();
connectToDB();

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
})


// app
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Cupid Backend Server');
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);


// socket.io
io.on('connection', (socket)=>{
  console.log('A user connected');

  socket.on('disconnect', ()=>{
    console.log('User disconnected');
  })
})

// server
server.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})
