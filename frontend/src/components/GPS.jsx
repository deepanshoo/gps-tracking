import { useEffect } from 'react';
import { io } from 'socket.io-client';

const BACKEND_URL = 'http://localhost:3100'; 

const GPS = () => {
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (!storedToken) {
      console.log('No token found, cannot connect to socket.');
      return; 
    }
    const socket = io(BACKEND_URL, {
      auth: { token: storedToken }
    });
    socket.emit('authenticate', storedToken); 
    const generateRandomLocation = () => {
      const updatedLatitude = 30 + Math.random() * 10; 
      const updatedLongitude = 45 + Math.random() * 10; 
      return { latitude: updatedLatitude, longitude: updatedLongitude };
    };

    const sendLocation = () => {
      const { latitude, longitude } = generateRandomLocation();
      socket.emit('locationUpdate', { latitude, longitude });
    };

    const interval = setInterval(sendLocation, 4000);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, []); 

  return <div><h2>Your Location is being shared</h2></div>;
};

export default GPS;
