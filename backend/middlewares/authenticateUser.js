const jwt=require('jsonwebtoken');

//Authentication of user
const authenticateUser=(socket,token) => {
    jwt.verify(token, 'graviti', (err, decoded) => {
      if (err) {
        console.log('Authentication failed : ', err);
        socket.emit('error', 'Authentication failed');
        socket.disconnect();
      } else {
        console.log('Authenticated user:', decoded.userId);
        socket.userId = decoded.userId;
      }
    });
  }

module.exports={authenticateUser}