const net = require('net');

let watchConnected = false;

const server = net.createServer(socket => {
  console.log('GPS watch connected');
  watchConnected = true;

  // Handle incoming data from the GPS watch
  socket.on('data', data => {
    const message = data.toString().trim();
    console.log('Received data:', message);

    // Process the received data or send a response if needed
    // ...
  });

  // Handle socket connection errors
  socket.on('error', error => {
    console.error('Socket error:', error);
  });

  // Handle socket connection termination
  socket.on('close', () => {
    console.log('GPS watch disconnected');
    watchConnected = false;
  });
});

// Start the server and listen on the specified IP address and port
const ip = 'localhost'; // Replace with your desired IP address
const port = 8001; // Replace with your desired port number

server.listen(port, ip, () => {
  console.log(`TCP socket server listening on ${ip}:${port}`);
});

// Check if the GPS watch is connected every 5 seconds
setInterval(() => {
  if (watchConnected) {
    console.log('GPS watch is connected');
  } else {
    console.log('GPS watch is not connected');
  }
}, 5000);