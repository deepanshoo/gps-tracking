const express = require('express');
const cors = require('cors');
const socketIo = require('socket.io');
const http = require('http');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const connectDB = require('./utils/connectDB');
const { setupSocket } = require('./utils/socketHandler');

// Initialize the app and create HTTP server
const app = express();
const server = http.createServer(app);

// Initialize the WebSocket
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'], 
  credentials: true 
}))

// Connect to MongoDB
connectDB()

// Auth Routes
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes); 

// WebSocket for Location Tracking
setupSocket(io)
// Start server
const PORT = process.env.PORT || 3100;
server.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
