const User = require("../model/User");


const updateLocation = async (io,socket,data) => {
    console.log(`Location update from user ${socket.userId}:`, data);
    try {
      const updatedUser = await User.findByIdAndUpdate(
        socket.userId, 
        { $set: { 'location.latitude': data.latitude, 'location.longitude': data.longitude }},
        { new: true }
      );

      if (updatedUser) {
        console.log('User location updated in MongoDB:', updatedUser.location);
        io.emit('locationUpdated', {
          userId: socket.userId,
          location: updatedUser.location,
        });
      } else {
        console.log('User not found for location update');
      }
    } catch (err) {
      console.log('Error updating location:', err);
    }
  }

module.exports = {updateLocation};