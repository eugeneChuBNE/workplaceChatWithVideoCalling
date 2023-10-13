const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const { PeerServer } = require('peer');
const sockets = require('./socket.js');
const server = require('./listen.js');

// Ports
const PORT0 = 3000;
const PORT1 = 3001;

// SSL configuration
const sslOptions = {
  key: fs.readFileSync('key.pem', 'utf8'),
  cert: fs.readFileSync('cert.pem', 'utf8')
};

// Setting up express
const app = express();
app.use(cors());

// Create HTTPs server
const httpsServer = https.createServer(sslOptions, app);

// Setting up socket.io
const io = require('socket.io')(httpsServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Handle socket connections and messages
sockets.connect(io, PORT0);

// Start the server
server.listen(httpsServer, PORT0); // Use your custom listen function

// Set up PeerServer
const peerServer = PeerServer({
  port: PORT1,
  path: '/',
  ssl: sslOptions
});

console.log(`Starting SSL PeerServer at: ${PORT1}`);
