const express = require('express');
const { Server } = require("socket.io");
const http = require('http');
const cors = require('cors');
const port = 3001;

const app = express();
const server = http.createServer(app);

app.use(cors()); // Use cors middleware

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('User connected ', socket.id);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected :', socket.id);
  });
});

server.listen(4000, () => {
  console.log('listening on *:4000');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
