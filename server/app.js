import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/corsConfig.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import detectFaceRoutes from './routes/detectFaceRoutes.js';
import dotenv from 'dotenv';
import { connectToDB } from './config/db.js';
import http from 'http';
import { Server } from 'socket.io';
import Message from './models/message.model.js';

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
app.use('/message', messageRoutes);
app.use('/detect-face',detectFaceRoutes )

app.use(errorHandler);


// socket.io
const onlineUsers = new Set();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('userConnected', ({ userId }) => {
    console.log(`User connected: ${userId}`);

    // Add userId to onlineUsers Set
    onlineUsers.add(userId);

    // Store userId on the socket object
    socket.userId = userId;

    console.log(`${userId} is online with socket ID ${socket.id}`);
  });

  socket.on('message', async ({ senderId, receiverId, text }) => {
    try {
      console.log(`Message received from ${senderId} to ${receiverId}: ${text}`);

      const newMessage = await Message.create({
        chatId: [senderId, receiverId].sort().join('_'),
        senderId: senderId,
        receiverId: receiverId,
        text,
        timestamp: Date.now()
      })

      if (onlineUsers.has(receiverId)) {
        // Find the socket corresponding to receiverId
        for (let [id, connectedSocket] of io.of("/").sockets) {
          if (connectedSocket.userId === receiverId) {
            connectedSocket.emit('receiveMessage', { senderId, text });
            break;
          }
        }
      }
    } catch (error) {
      console.log('Error sending message: ', error.message);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);

    // Remove userId from onlineUsers Set
    if (socket.userId) {
      onlineUsers.delete(socket.userId);
      console.log(`${socket.userId} is offline`);
    }
  });
});

process.on('SIGINT', () => {
  console.log('Server shutting down');
  io.close(() => {
    console.log('Socket.io server closed');
    process.exit(0);
  })
})

// server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
