const { updateLocation } = require('../controllers/locationController');
const { authenticateUser } = require('../middlewares/authenticateUser');

const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('New connection:', socket.id);
    // Authentication middleware for WebSocket
    socket.on('authenticate', (token) => {
      authenticateUser(socket, token);
    });
    // Updates the location 
    socket.on('locationUpdate', async (data) => {
      await updateLocation(io, socket, data);
    });

    // Disconnects the socket
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = { setupSocket };
